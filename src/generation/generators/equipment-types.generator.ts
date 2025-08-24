import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface EquipmentType {
	hrid: string
	name: string
	sortIndex: number
}

export class EquipmentTypesGenerator extends BaseGenerator<EquipmentType> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'EquipmentType',
			entityNamePlural: 'EquipmentTypes',
			sourceKey: 'equipmentTypeDetailMap',
			outputPath: 'src/generated/types/equipment-types.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, EquipmentType> {
		const equipmentTypes: Record<string, EquipmentType> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const typeData = data as any
			const equipmentType: EquipmentType = {
				hrid: typeData.hrid,
				name: typeData.name || '',
				sortIndex: typeData.sortIndex || 0,
			}
			equipmentTypes[hrid] = equipmentType
		}

		return equipmentTypes
	}

	protected override generateInterfaces(
		_equipmentTypes: Record<string, EquipmentType>,
	): void {
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'EquipmentTypeHrid',
				optional: false,
				description: 'Unique identifier for the equipment type',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the equipment type',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]
		this.builder.addInterface('EquipmentType', properties)
	}

	protected override generateUtilities(
		equipmentTypes: Record<string, EquipmentType>,
	): void {
		super.generateUtilities(equipmentTypes)

		this.builder.addFunction(
			'sortEquipmentTypesByIndex',
			[{ name: 'types', type: 'EquipmentType[]' }],
			'EquipmentType[]',
			(writer) => {
				writer.writeLine(
					'return [...types].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
	}
}
