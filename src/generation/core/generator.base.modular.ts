import { ModuleBuilder } from './module-builder'
import { SourceReader } from './source-reader'
import { generateFromTemplates } from './utility-templates'

import type {
	CategoryFilter,
	ConstantDefinition,
	GeneratorConfig,
	InterfaceDefinition,
	LookupDefinition,
	UtilityDefinition,
	UtilityTemplate,
} from './types'

export type { GeneratorConfig } from './types'

/**
 * ModularBaseGenerator - Enhanced base class with hook system for extensible generation
 *
 * Key Features:
 * - Configuration-driven generation with feature flags
 * - Hook system for customization without full overrides
 * - Utility templates for common patterns
 * - Record-based collections with Map utilities
 * - Tree-shaking optimized output
 *
 * @see ARCHITECTURE.md for full documentation
 */
export abstract class ModularBaseGenerator<TEntity> {
	public config: GeneratorConfig
	protected sourceReader: SourceReader
	protected moduleBuilder!: ModuleBuilder // Will be initialized in generate()
	protected entities: Record<string, TEntity> = {}

	protected uniqueTypes: Set<string> = new Set()
	protected uniqueCategories: Set<string> = new Set()
	protected relatedHrids: Map<string, Set<string>> = new Map()

	constructor(config: GeneratorConfig) {
		// Apply defaults for feature flags
		this.config = {
			generateHrids: true,
			generateCollection: true,
			generateConstants: true,
			generateUtils: true,
			generateLookups: true,
			applyDataCleaning: true,
			...config,
		}

		this.sourceReader = new SourceReader()

		// ModuleBuilder will be created fresh in generate() to avoid duplication
	}

	async generate(sourcePath: string): Promise<void> {
		console.log(`🔧 Generating ${this.config.entityNamePlural} (modular)...`)

		// Create fresh ModuleBuilder for each generation to avoid duplication
		// This ensures that multiple generate() calls don't append to the same files
		const basePath = './src/generated'
		const moduleName = this.config.entityNamePlural.toLowerCase()

		this.moduleBuilder = new ModuleBuilder({
			basePath,
			moduleName,
			enableLazyData: this.config.generateCollection,
			enableStaticLookups: this.config.generateLookups,
		})

		// Lifecycle hook: before generation
		this.beforeGenerate?.()

		const sourceData = await this.sourceReader.readJSON(sourcePath)
		this.entities = this.extractEntities(sourceData)

		const entityCount = Object.keys(this.entities).length
		if (entityCount === 0) {
			console.log(`⚠️  No ${this.config.entityNamePlural} found to generate`)
			return
		}

		// Generate with hooks and configuration
		this.generateWithHooks(this.entities)

		// Save all files
		await this.moduleBuilder.save()

		// Lifecycle hook: after generation
		this.afterGenerate?.()

		console.log(
			`✅ Generated ${entityCount} ${this.config.entityNamePlural} with modular structure`,
		)
	}

	/**
	 * Generate all module components using hooks and configuration
	 */
	private generateWithHooks(entities: Record<string, TEntity>): void {
		// 1. Generate types (always needed)
		this.processTypes(entities)

		// 2. Generate constants (if enabled)
		if (this.config.generateConstants) {
			this.processConstants(entities)
		}

		// 3. Generate data collection (if enabled)
		if (this.config.generateCollection) {
			this.processDataCollection(entities)
		}

		// 4. Generate lookups (if enabled)
		if (this.config.generateLookups) {
			this.processLookups(entities)
		}

		// 5. Generate utilities (if enabled)
		if (this.config.generateUtils) {
			this.processUtilities(entities)
		}
	}

	/**
	 * Extract entities from source data
	 * Default implementation that uses sourceKey from config
	 * Can be overridden for complex extraction logic
	 */
	public extractEntities(sourceData: any): Record<string, TEntity> {
		const entities: Record<string, TEntity> = {}
		const sourceMap = sourceData[this.config.sourceKey] || {}

		for (const [key, rawEntity] of Object.entries(sourceMap)) {
			// Apply transformation hook if provided
			const transformed = this.transformEntity
				? this.transformEntity(rawEntity)
				: (rawEntity as TEntity)

			// Apply filter hook if provided
			if (this.shouldIncludeEntity && !this.shouldIncludeEntity(transformed)) {
				continue
			}

			entities[key] = transformed
		}

		return entities
	}

	/**
	 * Generate default interface from entity structure
	 * Used when no custom interfaces provided by hooks
	 */
	private generateDefaultInterface(entities: Record<string, TEntity>): void {
		const entityName = this.config.entityName
		const sampleEntity = Object.values(entities)[0]

		if (sampleEntity) {
			const properties = Object.keys(sampleEntity).map((key) => ({
				name: key,
				type: this.inferType(
					sampleEntity[key as keyof typeof sampleEntity],
					key,
				),
				optional: false,
			}))

			this.moduleBuilder.addInterface(entityName, properties)
			this.moduleBuilder.addExport({
				name: entityName,
				source: './types',
				isType: true,
			})
		}
	}

	/**
	 * Infer TypeScript type from value
	 */
	private inferType(value: any, key: string): string {
		if (key.toLowerCase().includes('hrid')) {
			// HRID fields reference other entities
			const entityType = key.replace('Hrid', '').replace(/s$/, '')
			return `${entityType.charAt(0).toUpperCase()}${entityType.slice(1)}Hrid`
		}

		switch (typeof value) {
			case 'boolean':
				return 'boolean'
			case 'number':
				return 'number'
			case 'string':
				return 'string'
			case 'object':
				if (value === null) return 'null'
				if (Array.isArray(value)) return 'any[]' // Can be refined
				return 'any' // Can be refined
			default:
				return 'any'
		}
	}

	/**
	 * Generate static lookup tables (lookups.ts)
	 * Override to add entity-specific lookups
	 */
	protected generateLookups(_entities: Record<string, TEntity>): void {
		// Default: no lookups
		// Override in subclasses to add entity-specific lookup tables
	}

	/**
	 * Collect unique values for lookups (optional)
	 */
	protected collectUniqueValues?(entity: TEntity): void

	/**
	 * Clean entity data (remove empty values and convert nulls to undefined where appropriate)
	 * This method can be overridden by generators for custom cleaning logic
	 *
	 * IMPORTANT: This cleaning is applied automatically during data generation
	 * unless explicitly disabled via config.applyDataCleaning = false
	 *
	 * Default behavior:
	 * - Converts null to undefined for TypeScript optional fields (null !== undefined in TS strict mode)
	 * - Preserves empty strings for 'description' and 'name' fields
	 * - Removes empty arrays and objects (converts to undefined)
	 * - Recursively cleans nested objects and arrays
	 * - Preserves the data structure as transformed by the generator
	 *
	 * Why null to undefined conversion?
	 * - TypeScript strict mode distinguishes between null and undefined
	 * - Optional properties in interfaces expect undefined, not null
	 * - Source data from JSON contains null values, but TypeScript prefers undefined
	 * - This prevents "Type 'null' is not assignable to type 'T | undefined'" errors
	 *
	 * Generators should NOT manually handle null conversion in extractEntities()
	 * Let the framework handle it via this method for consistency.
	 *
	 * @param data The data to clean
	 * @param parentKey The parent key for context (used to preserve empty strings for specific fields)
	 * @returns The cleaned data with nulls converted to undefined
	 */
	protected cleanEntityData(data: any, parentKey?: string): any {
		// If the generator has already handled null conversion, preserve it
		if (data === undefined) {
			return undefined
		}

		// Convert null to undefined by default (for TypeScript optional fields)
		// Generators should handle their own null preservation if needed
		if (data === null) {
			return undefined
		}

		if (typeof data === 'string') {
			// Preserve empty strings for description and name fields
			if (
				parentKey &&
				['description', 'name'].includes(parentKey) &&
				data === ''
			) {
				return data
			}
			// Convert other empty strings to undefined
			return data === '' ? undefined : data
		}

		if (Array.isArray(data)) {
			// Remove empty arrays (convert to undefined)
			if (data.length === 0) {
				return undefined
			}
			// Recursively clean array items
			const cleaned = data.map((item) => this.cleanEntityData(item))
			// If all items were cleaned to undefined, return undefined
			const hasContent = cleaned.some((item) => item !== undefined)
			return hasContent ? cleaned : undefined
		}

		if (typeof data === 'object') {
			const cleaned: any = {}
			for (const [key, value] of Object.entries(data)) {
				const cleanedValue = this.cleanEntityData(value, key)
				// Only include defined values
				if (cleanedValue !== undefined) {
					cleaned[key] = cleanedValue
				}
			}
			// If object is empty after cleaning, return undefined
			return Object.keys(cleaned).length === 0 ? undefined : cleaned
		}

		// Return primitive values as-is (numbers, booleans, etc.)
		return data
	}

	/**
	 * Generate constants (constants.ts)
	 */
	protected generateConstants(entities: Record<string, TEntity>): void {
		const hrids = Object.keys(entities).sort()
		const entityName = this.config.entityName
		const constName = `${entityName.toUpperCase()}_HRIDS`

		// Add HRIDS constant array
		this.moduleBuilder.addConstArray(constName, hrids, true)
	}

	/**
	 * Generate lazy-loaded data Record (data.ts)
	 * Uses Record instead of Map for better DX and TypeScript support
	 */
	protected generateLazyData(entities: Record<string, TEntity>): void {
		const typeName = this.config.entityName
		const hridType = `${typeName}Hrid`

		// Apply data cleaning if enabled (default: true)
		// Generators can disable this if they handle null conversion themselves
		const entriesToAdd =
			this.config.applyDataCleaning !== false
				? (Object.entries(entities).map(([key, value]) => [
						key,
						this.cleanEntityData(value),
					]) as Array<[string, TEntity]>)
				: Object.entries(entities)

		this.moduleBuilder.addLazyDataRecord(
			this.config.entityNamePlural,
			entriesToAdd,
			hridType,
			typeName,
		)
	}

	/**
	 * Generate utility functions (utils.ts)
	 * Updated to work with Records instead of Maps for better developer experience
	 */
	protected generateUtilities(_entities: Record<string, TEntity>): void {
		const typeName = this.config.entityName
		const pluralName = this.config.entityNamePlural
		const hridType = `${typeName}Hrid`
		const constName = `${typeName.toUpperCase()}_HRIDS`
		const getRecordName = `get${pluralName}Record`

		// Only generate HRID-based utilities if HRIDs are enabled
		if (this.config.generateHrids !== false) {
			// Type guard
			this.moduleBuilder.addUtilityFunction(
				`is${typeName}Hrid`,
				[{ name: 'value', type: 'string' }],
				`value is ${hridType}`,
				(writer) => {
					writer.writeLine(`return ${constName}.includes(value as ${hridType})`)
				},
				[
					{ from: './constants', names: [constName] },
					{ from: './types', names: [hridType], isType: true },
				],
				{
					description: `Type guard to check if a value is a valid ${typeName}Hrid.`,
					params: [{ name: 'value', description: 'The string value to check' }],
					returns: `true if the value is a valid ${typeName}Hrid, false otherwise`,
					examples: [
						`\nif (is${typeName}Hrid(someValue)) {\n  // someValue is now typed as ${typeName}Hrid\n  const ${typeName.toLowerCase()} = get${typeName}(someValue)\n}`,
					],
				},
			)
		}

		// Only generate collection-based utilities if collection is enabled
		if (this.config.generateCollection !== false) {
			// Getter function
			this.moduleBuilder.addUtilityFunction(
				`get${typeName}`,
				[{ name: 'hrid', type: hridType }],
				`${typeName} | undefined`,
				(writer) => {
					writer.writeLine(`return ${getRecordName}()[hrid]`)
				},
				[
					{ from: './data', names: [getRecordName] },
					{ from: './types', names: [typeName, hridType], isType: true },
				],
				{
					description: `Gets a ${typeName} by its HRID.`,
					params: [
						{ name: 'hrid', description: `The ${typeName}Hrid to look up` },
					],
					returns: `The ${typeName} if found, undefined otherwise`,
					examples: [
						`\nconst ${typeName.toLowerCase()} = get${typeName}('/${typeName.toLowerCase()}s/example')\nif (${typeName.toLowerCase()}) {\n  console.log(${typeName.toLowerCase()}.name)\n}`,
					],
				},
			)

			// Require function
			this.moduleBuilder.addUtilityFunction(
				`require${typeName}`,
				[{ name: 'hrid', type: hridType }],
				typeName,
				(writer) => {
					writer.writeLine(
						`const ${typeName.toLowerCase()} = ${getRecordName}()[hrid]`,
					)
					writer.writeLine(`if (!${typeName.toLowerCase()}) {`)
					writer.writeLine(
						`  throw new Error(\`${typeName} not found: \${hrid}\`)`,
					)
					writer.writeLine(`}`)
					writer.writeLine(`return ${typeName.toLowerCase()}`)
				},
				[
					{ from: './data', names: [getRecordName] },
					{ from: './types', names: [typeName, hridType], isType: true },
				],
				{
					description: `Gets a ${typeName} by its HRID or throws an error if not found.\nUseful when you know the ${typeName} exists and want TypeScript to narrow the type.`,
					params: [
						{ name: 'hrid', description: `The ${typeName}Hrid to look up` },
					],
					returns: `The ${typeName}`,
					examples: [
						`\n// This will throw if the ${typeName.toLowerCase()} doesn't exist\nconst ${typeName.toLowerCase()} = require${typeName}('/${typeName.toLowerCase()}s/example')\nconsole.log(${typeName.toLowerCase()}.name) // TypeScript knows this is defined`,
					],
				},
			)

			// Get all function
			this.moduleBuilder.addUtilityFunction(
				`getAll${pluralName}`,
				[],
				`${typeName}[]`,
				(writer) => {
					writer.writeLine(`return Object.values(${getRecordName}())`)
				},
				[
					{ from: './data', names: [getRecordName] },
					{ from: './types', names: [typeName], isType: true },
				],
				{
					description: `Gets all ${pluralName} as an array.`,
					returns: `Array of all ${typeName} entities`,
					examples: [
						`\nconst all${pluralName} = getAll${pluralName}()\nconsole.log(\`Found \${all${pluralName}.length} ${pluralName.toLowerCase()}\`)\n\n// Filter or map over all ${pluralName.toLowerCase()}\nconst filtered = all${pluralName}.filter(item => item.level > 10)`,
					],
				},
			)

			// Generic toMap utility function
			this.moduleBuilder.addUtilityFunction(
				'toMap',
				[{ name: 'record', type: `Record<${hridType}, ${typeName}>` }],
				`Map<${hridType}, ${typeName}>`,
				(writer) => {
					writer.writeLine(
						`return new Map(Object.entries(record) as [${hridType}, ${typeName}][])`,
					)
				},
				[{ from: './types', names: [typeName, hridType], isType: true }],
				{
					description: `Converts a ${typeName} record to a Map for O(1) lookups.\\nUseful for performance-critical code that needs frequent lookups.`,
					params: [
						{ name: 'record', description: `The record to convert to a Map` },
					],
					returns: `Map with ${hridType} keys and ${typeName} values`,
					examples: [
						`\nconst record = ${getRecordName}()\nconst map = toMap(record)\nconst entity = map.get('/path/to/entity') // O(1) lookup`,
					],
				},
			)

			// Convenience function that combines getRecord + toMap
			this.moduleBuilder.addUtilityFunction(
				`get${pluralName}Map`,
				[],
				`Map<${hridType}, ${typeName}>`,
				(writer) => {
					writer.writeLine(`return toMap(${getRecordName}())`)
				},
				[
					{ from: './data', names: [getRecordName] },
					{ from: './types', names: [typeName, hridType], isType: true },
				],
				{
					description: `Gets all ${pluralName} as a Map for O(1) lookups.\\nConvenience function that combines ${getRecordName}() + toMap().`,
					returns: `Map with ${hridType} keys and ${typeName} values`,
					examples: [
						`\nconst map = get${pluralName}Map()\nconst entity = map.get('/path/to/entity') // Fast O(1) lookup\nif (entity) console.log(entity.name)`,
					],
				},
			)
		}
	}

	/**
	 * Helper to sort and deduplicate items
	 */
	protected sortAndDeduplicate(items: string[]): string[] {
		return Array.from(new Set(items)).sort()
	}

	// ============================================================================
	// HOOK SYSTEM - New Methods for v1.0
	// ============================================================================

	/**
	 * Process types generation with hooks-only architecture
	 */
	private processTypes(entities: Record<string, TEntity>): void {
		// Import shared types if configured
		if (this.config.sharedTypes && this.config.sharedTypes.length > 0) {
			const typesBuilder = this.moduleBuilder.getFile('types')
			typesBuilder.addImport(
				'../sharedtypes/types',
				this.config.sharedTypes,
				true,
			)
		}

		// Apply hook for custom interfaces
		const customInterfaces = this.defineInterfaces?.()
		if (customInterfaces) {
			customInterfaces.forEach((def) => {
				this.moduleBuilder.addInterface(def.name, def.properties)
				this.moduleBuilder.addExport({
					name: def.name,
					source: './types',
					isType: true,
				})
			})
		}

		// If no custom interfaces provided, generate default interface
		const mainInterfaceName = this.config.entityName
		const hasMainInterface = customInterfaces?.some(
			(def) => def.name === mainInterfaceName,
		)
		if (!hasMainInterface) {
			this.generateDefaultInterface(entities)
		}

		// Only generate HRID type if HRIDs are enabled
		if (this.config.generateHrids !== false) {
			const hrids = Object.keys(entities).sort()
			if (hrids.length > 0) {
				// Import the constants array needed for HRID type
				const constantName = `${mainInterfaceName.toUpperCase()}_HRIDS`
				const typesBuilder = this.moduleBuilder.getFile('types')
				typesBuilder.addImport('./constants', [constantName], false)

				this.moduleBuilder.addType(
					`${mainInterfaceName}Hrid`,
					`(typeof ${constantName})[number]`,
				)
			}
		}

		// Add custom interfaces from configuration
		if (this.config.interfaces) {
			this.config.interfaces.forEach((interfaceConfig) => {
				this.moduleBuilder.addInterface(
					interfaceConfig.name,
					interfaceConfig.properties,
				)
				if (interfaceConfig.export !== false) {
					this.moduleBuilder.addExport({
						name: interfaceConfig.name,
						source: './types',
						isType: true,
					})
				}
			})
		}

		// Extension hook for modifying types
		this.extendTypes?.()
	}

	/**
	 * Process constants generation with hooks
	 */
	private processConstants(entities: Record<string, TEntity>): void {
		// Generate base constants if HRIDs are enabled
		if (this.config.generateHrids) {
			this.generateConstants(entities)
		}

		// Generate category filters from configuration
		if (this.config.categoryFilters) {
			this.generateCategoryConstants(entities, this.config.categoryFilters)
		}

		// Apply hook for additional constants
		const customConstants = this.defineConstants?.()
		if (customConstants) {
			customConstants.forEach((def) => {
				// If value is a function, call it with entities, otherwise use as-is
				const value = typeof def.value === 'function' ? def.value(entities) : def.value
				this.moduleBuilder.addConstArray(def.name, value, def.asConst)
				this.moduleBuilder.addExport({ name: def.name, source: './constants' })
			})
		}

		// Extension hook for modifying constants
		this.extendConstants?.()
	}

	/**
	 * Process data collection generation
	 */
	private processDataCollection(entities: Record<string, TEntity>): void {
		this.generateLazyData(entities)
		this.extendDataCollection?.(entities)
	}

	/**
	 * Process lookups generation with hooks
	 */
	private processLookups(entities: Record<string, TEntity>): void {
		// Generate base lookups (may be overridden)
		this.generateLookups(entities)

		// Apply hook for additional lookups
		const customLookups = this.defineLookups?.()
		if (customLookups) {
			customLookups.forEach((def) => {
				this.moduleBuilder.addStaticLookup(
					def.name,
					def.data,
					def.keyType,
					def.valueType,
					def.isPartial,
				)
				this.moduleBuilder.addExport({ name: def.name, source: './lookups' })
			})
		}

		// Extension hook for modifying lookups
		this.extendLookups?.()
	}

	/**
	 * Process utilities generation with hooks and templates
	 */
	private processUtilities(entities: Record<string, TEntity>): void {
		// Generate base utilities (standard get, require, getAll, etc.)
		this.generateUtilities(entities)

		// Generate utility templates from configuration
		if (this.config.utilityTemplates) {
			this.generateUtilityTemplates(this.config.utilityTemplates)
		}

		// Generate custom utilities from configuration
		if (this.config.customUtilities) {
			this.config.customUtilities.forEach((util) => {
				this.moduleBuilder.addUtilityFunction(
					util.name,
					util.parameters,
					util.returnType,
					util.implementation,
					util.imports,
					{
						description: util.description,
						params: util.parameters.map((p) => ({
							name: p.name,
							description: '',
						})),
						returns: util.returnType,
						examples: util.examples,
					},
				)
			})
		}

		// Apply hook for additional utilities
		const customUtilities = this.defineUtilities?.()
		if (customUtilities) {
			customUtilities.forEach((def) => {
				this.moduleBuilder.addUtilityFunction(
					def.name,
					def.parameters,
					def.returnType,
					def.implementation,
					def.imports,
					def.jsDoc,
				)
			})
		}

		// Extension hook for modifying utilities
		this.extendUtilities?.()
	}

	/**
	 * Generate category constants from filters
	 */
	private generateCategoryConstants(
		entities: Record<string, TEntity>,
		filters: CategoryFilter[],
	): void {
		filters.forEach((filter) => {
			const matchingHrids: string[] = []

			Object.entries(entities).forEach(([hrid, entity]) => {
				let matches = false

				if (filter.condition) {
					matches = filter.condition(entity)
				} else if (filter.field && filter.value !== undefined) {
					matches = (entity as any)[filter.field] === filter.value
				} else if (filter.field && filter.exists) {
					matches =
						(entity as any)[filter.field] !== undefined &&
						(entity as any)[filter.field] !== null
				}

				if (matches) {
					matchingHrids.push(hrid)
				}
			})

			const constantName = filter.name.toUpperCase()
			this.moduleBuilder.addConstArray(constantName, matchingHrids.sort(), true)
			this.moduleBuilder.addExport({
				name: constantName,
				source: './constants',
			})
		})
	}

	/**
	 * Generate utility functions from templates
	 */
	private generateUtilityTemplates(templates: UtilityTemplate[]): void {
		const utilities = generateFromTemplates(
			templates,
			this.config.entityName,
			this.config.entityNamePlural,
		)

		utilities.forEach((util) => {
			this.moduleBuilder.addUtilityFunction(
				util.name,
				util.parameters,
				util.returnType,
				util.implementation,
				util.imports,
				util.jsDoc,
			)
		})
	}

	// ============================================================================
	// HOOK METHODS - Override these for customization
	// ============================================================================

	/**
	 * Lifecycle hook: called before generation starts
	 */
	protected beforeGenerate?(): void

	/**
	 * Lifecycle hook: called after generation completes
	 */
	protected afterGenerate?(): void

	/**
	 * Definition hook: return additional interfaces to generate
	 */
	protected defineInterfaces?(): InterfaceDefinition[]

	/**
	 * Definition hook: return additional constants to generate
	 */
	protected defineConstants?(): ConstantDefinition[]

	/**
	 * Definition hook: return additional lookups to generate
	 */
	protected defineLookups?(): LookupDefinition[]

	/**
	 * Definition hook: return additional utilities to generate
	 */
	protected defineUtilities?(): UtilityDefinition[]

	/**
	 * Extension hook: modify types after base generation
	 */
	protected extendTypes?(): void

	/**
	 * Extension hook: modify constants after base generation
	 */
	protected extendConstants?(): void

	/**
	 * Extension hook: modify data collection after base generation
	 */
	protected extendDataCollection?(entities: Record<string, TEntity>): void

	/**
	 * Extension hook: modify lookups after base generation
	 */
	protected extendLookups?(): void

	/**
	 * Extension hook: modify utilities after base generation
	 */
	protected extendUtilities?(): void

	/**
	 * Data transformation hook: transform raw entity data
	 */
	protected transformEntity?(raw: any): TEntity

	/**
	 * Filter hook: determine if entity should be included
	 */
	protected shouldIncludeEntity?(entity: TEntity): boolean
}
