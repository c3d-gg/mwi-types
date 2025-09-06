import { ModularBaseGenerator } from '../core/generator.base.modular'
import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface DamageType {
	hrid: string
	name: string
	sortIndex: number
}

export class DamageTypesModularGenerator extends ModularBaseGenerator<DamageType> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'DamageType',
			entityNamePlural: 'DamageTypes',
			sourceKey: 'damageTypeDetailMap',
			outputPath: 'src/generated/damage-types',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, DamageType> {
		const damageTypes: Record<string, DamageType> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const typeData = data as any
			const damageType: DamageType = {
				hrid: typeData.hrid,
				name: typeData.name || '',
				sortIndex: typeData.sortIndex || 0,
			}
			damageTypes[hrid] = damageType
		}

		return damageTypes
	}

	protected override generateTypes(
		_damageTypes: Record<string, DamageType>,
	): void {
		const typesFile = this.moduleBuilder.getFile('types')

		// Add JSDoc header
		typesFile.addComment('Damage type definitions')

		// Generate DamageType interface
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'DamageTypeHrid',
				optional: false,
				description: 'Unique identifier for the damage type',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the damage type',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		typesFile.addInterface('DamageType', properties)

		// Import constants for type derivation
		typesFile.addImport('./constants', ['DAMAGETYPE_HRIDS'], false)
		
		// Export the hrid type derived from constants
		typesFile.addType('DamageTypeHrid', '(typeof DAMAGETYPE_HRIDS)[number]')

		// Add module exports
		this.moduleBuilder.addExport('types', 'DamageType', 'type')
		this.moduleBuilder.addExport('types', 'DamageTypeHrid', 'type')
	}

	protected override generateConstants(
		entities: Record<string, DamageType>,
	): void {
		const constantsFile = this.moduleBuilder.getFile('constants')

		// Generate DAMAGETYPE_HRIDS array
		const hrids = Object.keys(entities).sort()
		constantsFile.addConstArray('DAMAGETYPE_HRIDS', hrids, true)

		// Export the constants
		this.moduleBuilder.addExport('constants', 'DAMAGETYPE_HRIDS')
	}

	protected override generateLazyData(
		entities: Record<string, DamageType>,
	): void {
		// Clean entity data before adding
		const cleanedEntries = Object.entries(entities)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([key, value]) => [
				key,
				this.cleanEntityData(value),
			]) as Array<[string, DamageType]>

		// Use the moduleBuilder's addLazyData method which handles everything
		this.moduleBuilder.addLazyData(
			'DamageTypes',
			cleanedEntries,
			'DamageTypeHrid',
			'DamageType',
		)
	}

	protected override generateLookups(
		entities: Record<string, DamageType>,
	): void {
		const lookupsFile = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsFile.addImport('./types', ['DamageType', 'DamageTypeHrid'], true)

		// Create lookup for damage types sorted by index
		const sortedTypes = Object.keys(entities)
			.sort((a, b) => entities[a]!.sortIndex - entities[b]!.sortIndex)

		lookupsFile.addConstArray('DAMAGE_TYPES_BY_INDEX', sortedTypes, true)

		// Create element types mapping (common damage types)
		const elementTypes: string[] = []
		for (const [hrid, type] of Object.entries(entities)) {
			// Common element damage types
			if (type.name && ['Fire', 'Water', 'Nature', 'Physical'].includes(type.name)) {
				elementTypes.push(hrid)
			}
		}

		if (elementTypes.length > 0) {
			lookupsFile.addConstArray('ELEMENT_DAMAGE_TYPES', elementTypes, true)
		}

		// Export the lookups
		this.moduleBuilder.addExport('lookups', 'DAMAGE_TYPES_BY_INDEX')
		if (elementTypes.length > 0) {
			this.moduleBuilder.addExport('lookups', 'ELEMENT_DAMAGE_TYPES')
		}
	}

	protected override generateUtilities(
		_entities: Record<string, DamageType>,
	): void {
		const utilsFile = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsFile.addImport('./types', ['DamageType', 'DamageTypeHrid'], true)
		utilsFile.addImport('./constants', ['DAMAGETYPE_HRIDS'])
		utilsFile.addImport('./data', ['getDamageTypesMap'])

		// Type guard
		utilsFile.addFunction(
			'isDamageTypeHrid',
			[{ name: 'value', type: 'string' }],
			'value is DamageTypeHrid',
			(writer) => {
				writer.writeLine('return DAMAGETYPE_HRIDS.includes(value as DamageTypeHrid)')
			}
		)

		// Getter
		utilsFile.addFunction(
			'getDamageType',
			[{ name: 'hrid', type: 'DamageTypeHrid' }],
			'DamageType | undefined',
			(writer) => {
				writer.writeLine('return getDamageTypesMap().get(hrid)')
			}
		)

		// Require getter
		utilsFile.addFunction(
			'requireDamageType',
			[{ name: 'hrid', type: 'DamageTypeHrid' }],
			'DamageType',
			(writer) => {
				writer.writeLine('const type = getDamageTypesMap().get(hrid)')
				writer.writeLine('if (!type) {')
				writer.indent(() => {
					writer.writeLine('throw new Error(`Damage type not found: ${hrid}`)')
				})
				writer.writeLine('}')
				writer.writeLine('return type')
			}
		)

		// Get all
		utilsFile.addFunction(
			'getAllDamageTypes',
			[],
			'DamageType[]',
			(writer) => {
				writer.writeLine('return Array.from(getDamageTypesMap().values())')
			}
		)

		// Sort by sortIndex
		utilsFile.addFunction(
			'sortDamageTypesByIndex',
			[{ name: 'types', type: 'DamageType[]' }],
			'DamageType[]',
			(writer) => {
				writer.writeLine('return [...types].sort((a, b) => a.sortIndex - b.sortIndex)')
			}
		)

		// Get damage type by name
		utilsFile.addFunction(
			'getDamageTypeByName',
			[{ name: 'name', type: 'string' }],
			'DamageType | undefined',
			(writer) => {
				writer.writeLine('return getAllDamageTypes().find(type => type.name === name)')
			}
		)

		// Export utilities
		this.moduleBuilder.addExport('utils', 'isDamageTypeHrid')
		this.moduleBuilder.addExport('utils', 'getDamageType')
		this.moduleBuilder.addExport('utils', 'requireDamageType')
		this.moduleBuilder.addExport('utils', 'getAllDamageTypes')
		this.moduleBuilder.addExport('utils', 'sortDamageTypesByIndex')
		this.moduleBuilder.addExport('utils', 'getDamageTypeByName')
	}
}