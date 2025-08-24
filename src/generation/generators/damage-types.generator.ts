import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface DamageType {
	hrid: string
	name: string
	sortIndex: number
}

export class DamageTypesGenerator extends BaseGenerator<DamageType> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'DamageType',
			entityNamePlural: 'DamageTypes',
			sourceKey: 'damageTypeDetailMap',
			outputPath: 'src/generated/types/damage-types.ts',
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

	protected override generateInterfaces(
		_damageTypes: Record<string, DamageType>,
	): void {
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
		this.builder.addInterface('DamageType', properties)
	}

	protected override generateUtilities(
		damageTypes: Record<string, DamageType>,
	): void {
		super.generateUtilities(damageTypes)

		this.builder.addFunction(
			'sortDamageTypesByIndex',
			[{ name: 'types', type: 'DamageType[]' }],
			'DamageType[]',
			(writer) => {
				writer.writeLine(
					'return [...types].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
	}
}
