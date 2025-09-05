import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

interface EquipmentType {
	hrid: string
	name: string
	sortIndex: number
}

/**
 * Modular EquipmentTypes Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularEquipmentTypesGenerator extends ModularBaseGenerator<EquipmentType> {
	constructor() {
		super({
			entityName: 'EquipmentType',
			entityNamePlural: 'EquipmentTypes',
			sourceKey: 'equipmentTypeDetailMap',
			outputPath: './src/generated/equipment-types/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, EquipmentType> {
		const equipmentTypes: Record<string, EquipmentType> = {}
		const typeMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(typeMap)) {
			const equipmentType = this.extractEquipmentType(hrid, data as any)
			equipmentTypes[hrid] = equipmentType
		}

		console.log(`  ⚙️ Extracted ${Object.keys(equipmentTypes).length} equipment types`)

		return equipmentTypes
	}

	private extractEquipmentType(hrid: string, data: any): EquipmentType {
		return {
			hrid,
			name: data.name || '',
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	protected override generateTypes(entities: Record<string, EquipmentType>): void {
		// Main EquipmentType interface
		const typeProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'EquipmentTypeHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		]
		this.moduleBuilder.addInterface('EquipmentType', typeProps)
		
		// Export the EquipmentType interface
		this.moduleBuilder.addExport({ name: 'EquipmentType', source: './types', isType: true })
	}

	protected override generateLookups(entities: Record<string, EquipmentType>): void {
		// Equipment types are simple, no special lookups needed beyond the base constants
		// The base generator already creates EQUIPMENT_TYPE_HRIDS constant array
	}

	protected override generateUtilities(entities: Record<string, EquipmentType>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Add equipment type-specific utilities
		
		// Sort equipment types by index
		this.moduleBuilder.addUtilityFunction(
			'sortEquipmentTypesByIndex',
			[{ name: 'types', type: 'EquipmentType[]' }],
			'EquipmentType[]',
			(writer) => {
				writer.writeLine('return [...types].sort((a, b) => a.sortIndex - b.sortIndex)')
			},
			[
				{ from: './types', names: ['EquipmentType'], isType: true },
			]
		)

		// Get all types sorted
		this.moduleBuilder.addUtilityFunction(
			'getEquipmentTypesSortedByIndex',
			[],
			'EquipmentType[]',
			(writer) => {
				writer.writeLine('return sortEquipmentTypesByIndex(getAllEquipmentTypes())')
			},
			[
				{ from: './types', names: ['EquipmentType'], isType: true },
			]
		)

		// Get type by name
		this.moduleBuilder.addUtilityFunction(
			'getEquipmentTypeByName',
			[{ name: 'name', type: 'string' }],
			'EquipmentType | undefined',
			(writer) => {
				writer.writeLine('return getAllEquipmentTypes().find(type => type.name.toLowerCase() === name.toLowerCase())')
			},
			[
				{ from: './types', names: ['EquipmentType'], isType: true },
			]
		)
	}
}