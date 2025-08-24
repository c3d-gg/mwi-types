import { ASTBuilder } from './ast-builder'
import { SourceReader } from './source-reader'

import type { GeneratorConfig } from './types'

export type { GeneratorConfig } from './types'

export abstract class BaseGenerator<TEntity> {
	protected config: GeneratorConfig
	protected sourceReader: SourceReader
	protected builder: ASTBuilder
	protected entities: Record<string, TEntity> = {}

	protected uniqueTypes: Set<string> = new Set()
	protected uniqueCategories: Set<string> = new Set()
	protected relatedHrids: Map<string, Set<string>> = new Map()

	constructor(config: GeneratorConfig) {
		this.config = config
		this.sourceReader = new SourceReader()
		this.builder = new ASTBuilder(config.outputPath)
	}

	async generate(sourcePath: string): Promise<void> {
		console.log(`🔧 Generating ${this.config.entityNamePlural}...`)

		const sourceData = await this.sourceReader.readJSON(sourcePath)
		this.entities = this.extractEntities(sourceData)

		const entityCount = Object.keys(this.entities).length
		if (entityCount === 0) {
			console.log(`⚠️  No ${this.config.entityNamePlural} found to generate`)
			return
		}

		if (this.config.generateConstants) {
			this.generateConstants(this.entities)
		}

		this.generateInterfaces(this.entities)
		this.generateDataMap(this.entities)

		if (this.config.generateUtils) {
			this.generateUtilities(this.entities)
		}

		await this.builder.save()

		console.log(
			`✅ Generated ${entityCount} ${this.config.entityNamePlural} to ${this.config.outputPath}`,
		)
	}

	protected abstract extractEntities(sourceData: any): Record<string, TEntity>
	protected abstract generateInterfaces(entities: Record<string, TEntity>): void

	protected collectUniqueValues?(entity: TEntity): void

	protected cleanEntityData(data: any): any {
		if (data === null || data === undefined) {
			return undefined
		}

		if (typeof data === 'string') {
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
				const cleanedValue = this.cleanEntityData(value)
				if (cleanedValue !== undefined) {
					cleaned[key] = cleanedValue
				}
			}
			return Object.keys(cleaned).length === 0 ? null : cleaned
		}

		return data
	}

	protected generateConstants(entities: Record<string, TEntity>): void {
		const hrids = Object.keys(entities).sort()
		const entityName = this.config.entityName

		this.builder.addConstArray(`${entityName.toUpperCase()}_HRIDS`, hrids, true)

		this.builder.addTypeFromConst(
			`${entityName}Hrid`,
			`${entityName.toUpperCase()}_HRIDS`,
		)
	}

	protected generateDataMap(entities: Record<string, TEntity>): void {
		const typeName = this.config.entityName
		const hridType = `${typeName}Hrid`

		this.builder.addTypedMap(
			this.config.entityNamePlural.toUpperCase(),
			hridType,
			typeName,
			Object.entries(entities),
		)
	}

	protected generateUtilities(entities: Record<string, TEntity>): void {
		const typeName = this.config.entityName
		const pluralName = this.config.entityNamePlural
		const dataName = pluralName.toUpperCase()
		const hridType = `${typeName}Hrid`
		const constName = `${typeName.toUpperCase()}_HRIDS`

		this.builder.addTypeGuard(
			`is${typeName}Hrid`,
			'value',
			'string',
			hridType,
			`${constName}.includes(value as ${hridType})`,
		)

		this.builder.addFunction(
			`get${typeName}`,
			[{ name: 'hrid', type: hridType }],
			`${typeName} | undefined`,
			(writer) => {
				writer.writeLine(`return ${dataName}.get(hrid)`)
			},
		)

		this.builder.addFunction(
			`require${typeName}`,
			[{ name: 'hrid', type: hridType }],
			typeName,
			(writer) => {
				writer.writeLine(
					`const ${typeName.toLowerCase()} = ${dataName}.get(hrid)`,
				)
				writer.writeLine(`if (!${typeName.toLowerCase()}) {`)
				writer.writeLine(
					`  throw new Error(\`${typeName} not found: \${hrid}\`)`,
				)
				writer.writeLine(`}`)
				writer.writeLine(`return ${typeName.toLowerCase()}`)
			},
		)

		this.builder.addFunction(
			`getAll${pluralName}`,
			[],
			`${typeName}[]`,
			(writer) => {
				writer.writeLine(`return Array.from(${dataName}.values())`)
			},
		)
	}

	protected sortAndDeduplicate(items: string[]): string[] {
		return Array.from(new Set(items)).sort()
	}
}
