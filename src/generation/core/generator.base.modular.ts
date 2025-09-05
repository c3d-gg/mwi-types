import { ModuleBuilder } from './module-builder'
import { SourceReader } from './source-reader'

import type { GeneratorConfig } from './types'

export type { GeneratorConfig } from './types'

/**
 * ModularBaseGenerator - New base class for generators with tree-shaking optimizations
 * Generates multiple files per entity type for optimal bundling
 */
export abstract class ModularBaseGenerator<TEntity> {
	protected config: GeneratorConfig
	protected sourceReader: SourceReader
	protected moduleBuilder: ModuleBuilder
	protected entities: Record<string, TEntity> = {}

	protected uniqueTypes: Set<string> = new Set()
	protected uniqueCategories: Set<string> = new Set()
	protected relatedHrids: Map<string, Set<string>> = new Map()

	constructor(config: GeneratorConfig) {
		this.config = config
		this.sourceReader = new SourceReader()

		// Initialize module builder with modular structure
		// For modular output, we want src/generated as base path, not src/generated/items
		const basePath = './src/generated'
		const moduleName = config.entityNamePlural.toLowerCase()

		this.moduleBuilder = new ModuleBuilder({
			basePath,
			moduleName,
			enableLazyData: config.generateUtils !== false,
			enableStaticLookups: true,
		})
	}

	async generate(sourcePath: string): Promise<void> {
		console.log(`🔧 Generating ${this.config.entityNamePlural} (modular)...`)

		const sourceData = await this.sourceReader.readJSON(sourcePath)
		this.entities = this.extractEntities(sourceData)

		const entityCount = Object.keys(this.entities).length
		if (entityCount === 0) {
			console.log(`⚠️  No ${this.config.entityNamePlural} found to generate`)
			return
		}

		// Generate types first (always needed)
		this.generateTypes(this.entities)

		// Generate constants
		if (this.config.generateConstants) {
			this.generateConstants(this.entities)
		}

		// Generate lazy-loaded data
		this.generateLazyData(this.entities)

		// Generate static lookups
		this.generateLookups(this.entities)

		// Generate utilities
		if (this.config.generateUtils) {
			this.generateUtilities(this.entities)
		}

		// Save all files
		await this.moduleBuilder.save()

		console.log(
			`✅ Generated ${entityCount} ${this.config.entityNamePlural} with modular structure`,
		)
	}

	/**
	 * Extract entities from source data
	 */
	protected abstract extractEntities(sourceData: any): Record<string, TEntity>

	/**
	 * Generate TypeScript interfaces/types (types.ts)
	 */
	protected abstract generateTypes(entities: Record<string, TEntity>): void

	/**
	 * Generate static lookup tables (lookups.ts)
	 * Override to add entity-specific lookups
	 */
	protected generateLookups(entities: Record<string, TEntity>): void {
		// Default: no lookups
		// Override in subclasses to add entity-specific lookup tables
	}

	/**
	 * Collect unique values for lookups (optional)
	 */
	protected collectUniqueValues?(entity: TEntity): void

	/**
	 * Clean entity data (remove empty values)
	 * Note: Preserves empty strings for 'description' field as it's required
	 */
	protected cleanEntityData(data: any, parentKey?: string): any {
		if (data === null || data === undefined) {
			return undefined
		}

		if (typeof data === 'string') {
			// Preserve empty strings for description field
			if (parentKey === 'description' && data === '') {
				return data
			}
			return data === '' ? undefined : data
		}

		if (Array.isArray(data)) {
			return data.length === 0
				? null
				: data.map((item) => this.cleanEntityData(item))
		}

		if (typeof data === 'object') {
			const cleaned: any = {}
			for (const [key, value] of Object.entries(data)) {
				const cleanedValue = this.cleanEntityData(value, key)
				// Keep description field even if it's undefined or empty string
				if (key === 'description') {
					cleaned[key] = cleanedValue === undefined ? '' : cleanedValue
				} else if (cleanedValue !== undefined) {
					cleaned[key] = cleanedValue
				}
			}
			return Object.keys(cleaned).length === 0 ? null : cleaned
		}

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

		// Import the constant in types.ts before using it
		const typesBuilder = this.moduleBuilder.getFile('types')
		typesBuilder.addImport('./constants', [constName], false)

		// Add type derived from constant
		this.moduleBuilder.addType(
			`${entityName}Hrid`,
			`typeof ${constName}[number]`,
		)
	}

	/**
	 * Generate lazy-loaded data Map (data.ts)
	 */
	protected generateLazyData(entities: Record<string, TEntity>): void {
		const typeName = this.config.entityName
		const hridType = `${typeName}Hrid`

		// Clean entity data before adding
		const cleanedEntries = Object.entries(entities).map(([key, value]) => [
			key,
			this.cleanEntityData(value),
		]) as Array<[string, TEntity]>

		this.moduleBuilder.addLazyData(
			this.config.entityNamePlural,
			cleanedEntries,
			hridType,
			typeName,
		)
	}

	/**
	 * Generate utility functions (utils.ts)
	 */
	protected generateUtilities(entities: Record<string, TEntity>): void {
		const typeName = this.config.entityName
		const pluralName = this.config.entityNamePlural
		const hridType = `${typeName}Hrid`
		const constName = `${typeName.toUpperCase()}_HRIDS`
		const getMapName = `get${pluralName}Map`

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
		)

		// Getter function
		this.moduleBuilder.addUtilityFunction(
			`get${typeName}`,
			[{ name: 'hrid', type: hridType }],
			`${typeName} | undefined`,
			(writer) => {
				writer.writeLine(`return ${getMapName}().get(hrid)`)
			},
			[
				{ from: './data', names: [getMapName] },
				{ from: './types', names: [typeName, hridType], isType: true },
			],
		)

		// Require function
		this.moduleBuilder.addUtilityFunction(
			`require${typeName}`,
			[{ name: 'hrid', type: hridType }],
			typeName,
			(writer) => {
				writer.writeLine(
					`const ${typeName.toLowerCase()} = ${getMapName}().get(hrid)`,
				)
				writer.writeLine(`if (!${typeName.toLowerCase()}) {`)
				writer.writeLine(
					`  throw new Error(\`${typeName} not found: \${hrid}\`)`,
				)
				writer.writeLine(`}`)
				writer.writeLine(`return ${typeName.toLowerCase()}`)
			},
			[
				{ from: './data', names: [getMapName] },
				{ from: './types', names: [typeName, hridType], isType: true },
			],
		)

		// Get all function
		this.moduleBuilder.addUtilityFunction(
			`getAll${pluralName}`,
			[],
			`${typeName}[]`,
			(writer) => {
				writer.writeLine(`return Array.from(${getMapName}().values())`)
			},
			[
				{ from: './data', names: [getMapName] },
				{ from: './types', names: [typeName], isType: true },
			],
		)
	}

	/**
	 * Helper to sort and deduplicate items
	 */
	protected sortAndDeduplicate(items: string[]): string[] {
		return Array.from(new Set(items)).sort()
	}
}
