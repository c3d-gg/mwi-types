import { ASTBuilder } from './ast-builder'

import type { PropertyDefinition } from './ast-builder'

export interface ModuleFile {
	name: string
	builder: ASTBuilder
}

export interface ModuleConfig {
	basePath: string
	moduleName: string
	enableLazyData?: boolean
	enableStaticLookups?: boolean
}

export interface ModuleExport {
	name: string
	source: string
	isType?: boolean
}

/**
 * ModuleBuilder orchestrates multi-file module generation for optimal tree-shaking
 * Creates separate files for types, data, utils, constants, and lookups
 */
export class ModuleBuilder {
	private files: Map<string, ASTBuilder> = new Map()
	private exports: ModuleExport[] = []

	constructor(private config: ModuleConfig) {
		this.initializeFiles()
	}

	private initializeFiles(): void {
		const modulePath = `${this.config.basePath}/${this.config.moduleName}`

		// Core files for every module
		this.files.set('types', new ASTBuilder(`${modulePath}/types.ts`))
		this.files.set(
			'constants',
			new ASTBuilder(`${modulePath}/constants.ts`),
		)
		this.files.set('utils', new ASTBuilder(`${modulePath}/utils.ts`))
		this.files.set('index', new ASTBuilder(`${modulePath}/index.ts`))

		// Optional files based on config
		if (this.config.enableLazyData) {
			this.files.set('data', new ASTBuilder(`${modulePath}/data.ts`))
		}

		if (this.config.enableStaticLookups) {
			this.files.set(
				'lookups',
				new ASTBuilder(`${modulePath}/lookups.ts`),
			)
		}
	}

	/**
	 * Get a specific file builder
	 */
	getFile(name: string): ASTBuilder {
		const builder = this.files.get(name)
		if (!builder) {
			throw new Error(
				`File ${name} not found in module ${this.config.moduleName}`,
			)
		}
		return builder
	}

	/**
	 * Add type definitions to types.ts
	 */
	addInterface(name: string, properties: PropertyDefinition[]): void {
		this.getFile('types').addInterface(name, properties)
		this.addExport({ name, source: './types', isType: true })
	}

	/**
	 * Add type alias to types.ts
	 */
	addType(name: string, type: string): void {
		this.getFile('types').addType(name, type)
		this.addExport({ name, source: './types', isType: true })
	}

	/**
	 * Add constants to constants.ts
	 */
	addConstArray(name: string, values: string[], asConst: boolean = true): void {
		this.getFile('constants').addConstArray(name, values, asConst)
		this.addExport({ name, source: './constants' })
	}

	/**
	 * Add lazy-loaded data as a Record to data.ts
	 * @param entityName - The name of the entity collection
	 * @param entries - The key-value pairs to include
	 * @param keyType - The TypeScript type for keys
	 * @param valueType - The TypeScript type for values
	 */
	addLazyDataRecord<K extends string, V>(
		entityName: string,
		entries: Array<[K, V]>,
		keyType: string,
		valueType: string,
	): void {
		if (!this.config.enableLazyData) {
			throw new Error('Lazy data is not enabled for this module')
		}

		const dataBuilder = this.getFile('data')

		// Add type imports to data file
		dataBuilder.addImport(`./types`, [valueType, keyType], true)

		// Add the lazy record
		const recordName = `_${entityName.toLowerCase()}Record`
		const getterName = `get${entityName}Record`
		const dataFunctionName = `get${entityName}Data`

		dataBuilder.addLazyRecord(
			recordName,
			getterName,
			dataFunctionName,
			keyType,
			valueType,
			entries,
		)

		this.addExport({ name: getterName, source: './data' })
	}

	/**
	 * Add lazy-loaded data to data.ts
	 * @deprecated Use addLazyDataRecord instead for better DX
	 */
	addLazyData<K extends string, V>(
		entityName: string,
		entries: Array<[K, V]>,
		keyType: string,
		valueType: string,
	): void {
		if (!this.config.enableLazyData) {
			throw new Error('Lazy data is not enabled for this module')
		}

		const dataBuilder = this.getFile('data')

		// Add type imports to data file
		dataBuilder.addImport(`./types`, [valueType, keyType], true)

		// Add the lazy map
		const mapName = `_${entityName.toLowerCase()}Map`
		const getterName = `get${entityName}Map`
		const dataFunctionName = `get${entityName}Data`

		dataBuilder.addLazyMap(
			mapName,
			getterName,
			dataFunctionName,
			keyType,
			valueType,
			entries,
		)

		this.addExport({ name: getterName, source: './data' })
	}

	/**
	 * Add static lookup table to lookups.ts
	 */
	addStaticLookup<K extends string, V>(
		name: string,
		data: Record<K, V>,
		keyType: string,
		valueType: string,
		isPartial = false,
	): void {
		if (!this.config.enableStaticLookups) {
			throw new Error('Static lookups are not enabled for this module')
		}

		const lookupsBuilder = this.getFile('lookups')

		// Add type imports if needed (only for custom types, not primitives)
		const primitiveTypes = ['string', 'number', 'boolean', 'object']
		if (!primitiveTypes.includes(keyType)) {
			lookupsBuilder.addImport('./types', [keyType], true)
		}

		// Extract base type from value type (handles 'readonly X[]', 'X[]', or plain 'X')
		let baseValueType = valueType
		if (valueType.includes('[]') || valueType.startsWith('readonly ')) {
			baseValueType = valueType
				.replace('readonly ', '')
				.replace('[]', '')
				.trim()
		}
		if (!primitiveTypes.includes(baseValueType)) {
			lookupsBuilder.addImport('./types', [baseValueType], true)
		}

		lookupsBuilder.addStaticLookup(name, keyType, valueType, data, isPartial)
		this.addExport({ name, source: './lookups' })
	}

	/**
	 * Add utility function to utils.ts with optional JSDoc
	 * @param name - Function name
	 * @param params - Function parameters
	 * @param returnType - Return type
	 * @param body - Function body writer
	 * @param imports - Required imports
	 * @param jsDoc - Optional JSDoc configuration
	 */
	addUtilityFunction(
		name: string,
		params: Array<{ name: string; type: string }>,
		returnType: string,
		body: (writer: any) => void,
		imports?: { from: string; names: string[]; isType?: boolean }[],
		jsDoc?: {
			description?: string
			params?: Array<{ name: string; description: string }>
			returns?: string
			examples?: string[]
		}
	): void {
		const utilsBuilder = this.getFile('utils')

		// Add necessary imports
		if (imports) {
			imports.forEach((imp) => {
				utilsBuilder.addImport(imp.from, imp.names, imp.isType)
			})
		}

		utilsBuilder.addFunction(name, params, returnType, body, true, jsDoc)
		this.addExport({ name, source: './utils' })
	}

	/**
	 * Track an export for the index file
	 */
	addExport(exp: ModuleExport): void
	addExport(
		source: string,
		name: string,
		exportType?: 'type' | 'const' | 'function',
	): void
	addExport(
		expOrSource: ModuleExport | string,
		name?: string,
		exportType?: 'type' | 'const' | 'function',
	): void {
		let exp: ModuleExport

		if (typeof expOrSource === 'string') {
			// Called with individual parameters
			exp = {
				name: name!,
				source: `./${expOrSource}`,
				isType: exportType === 'type',
			}
		} else {
			// Called with object parameter
			exp = expOrSource
		}

		// Skip undefined exports
		if (!exp.name || exp.name === 'undefined') {
			console.warn(`Skipping undefined export from ${exp.source}`)
			return
		}

		// Avoid duplicate exports
		if (
			!this.exports.find((e) => e.name === exp.name && e.source === exp.source)
		) {
			this.exports.push(exp)
		}
	}

	/**
	 * Generate the index.ts with named exports only
	 */
	generateIndex(): void {
		const indexBuilder = this.getFile('index')

		// Add comment at the top of the file
		indexBuilder.addComment(
			'This file uses named exports only to enable tree-shaking.\n' +
				'DO NOT use export * as it breaks tree-shaking!',
		)

		// Group exports by source
		const exportsBySource = new Map<
			string,
			{ types: string[]; values: string[] }
		>()

		this.exports.forEach((exp) => {
			if (!exportsBySource.has(exp.source)) {
				exportsBySource.set(exp.source, { types: [], values: [] })
			}
			const group = exportsBySource.get(exp.source)!
			if (exp.isType) {
				group.types.push(exp.name)
			} else {
				group.values.push(exp.name)
			}
		})

		// Add grouped exports to index
		exportsBySource.forEach((exports, source) => {
			if (exports.types.length > 0) {
				indexBuilder.addNamedExports(
					Object.fromEntries(
						exports.types.map((name) => [
							name,
							{ from: `${source}.js`, isType: true },
						]),
					),
				)
			}
			if (exports.values.length > 0) {
				indexBuilder.addNamedExports(
					Object.fromEntries(
						exports.values.map((name) => [
							name,
							{ from: `${source}.js`, isType: false },
						]),
					),
				)
			}
		})
	}

	/**
	 * Save all module files
	 */
	async save(): Promise<void> {
		// Generate index before saving
		this.generateIndex()

		// Save all files in parallel for better performance
		const builders = Array.from(this.files.values())
		await ASTBuilder.saveAll(builders, {
			format: true,
			organizeImports: true,
			fixUnusedIdentifiers: false
		})

		console.log(
			`✅ Generated module: ${this.config.moduleName} with ${this.files.size} files`,
		)
		
		// Log performance metrics if in development
		if (process.env.NODE_ENV === 'development') {
			const report = ASTBuilder.getPerformanceReport()
			console.log('📊 Performance Report:', report)
		}
	}
}
