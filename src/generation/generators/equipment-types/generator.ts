import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

interface EquipmentType {
	hrid: string
	name: string
	itemLocationHrid: string
	sortIndex: number
}

/**
 * Modular EquipmentTypes Generator using the hook system
 *
 * This generator creates TypeScript definitions for equipment types (head, body, main_hand, ring, tools, etc.).
 * It follows the v1.0 architecture principles:
 * - Uses defineInterfaces() hook for type generation
 * - Uses configuration for standard utilities
 * - Uses transformEntity() for simple data transformation
 * - No dependencies (Layer 1 generator)
 *
 * This is a critical prerequisite that is required for Items generator.
 *
 * @see ARCHITECTURE.md for hook system documentation
 */
export class ModularEquipmentTypesGenerator extends ModularBaseGenerator<EquipmentType> {
	constructor() {
		super({
			entityName: 'EquipmentType',
			entityNamePlural: 'EquipmentTypes',
			sourceKey: 'equipmentTypeDetailMap',
			outputPath: 'src/generated/equipmenttypes',

			// Feature flags (all true by default, being explicit)
			generateHrids: true,
			generateCollection: true,
			generateConstants: true,
			generateUtils: true,
			generateLookups: false, // Simple module like Skills

			// No shared types needed - all properties are primitives
			sharedTypes: [],

			// Standard utility templates for simple entity
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' }, // getEquipmentTypesSortedByIndex()
				{ type: 'toMap' }, // Convert Record to Map for O(1) equipment lookups
			],

			// No category filters needed - manageable 25-item dataset
			categoryFilters: [],
		})
	}

	/**
	 * Define interfaces using the hook system
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		const interfaces: InterfaceDefinition[] = []

		// Main EquipmentType interface
		interfaces.push({
			name: 'EquipmentType',
			properties: [
				{ name: 'hrid', type: 'EquipmentTypeHrid', optional: false },
				{ name: 'name', type: 'string', optional: false },
				{ name: 'itemLocationHrid', type: 'string', optional: false },
				{ name: 'sortIndex', type: 'number', optional: false },
			],
		})

		return interfaces
	}

	/**
	 * Transform raw equipment type data to EquipmentType interface
	 * Since this is a simple entity, we can use transformEntity() instead of extractEntities()
	 */
	protected override transformEntity(rawData: any): EquipmentType {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			itemLocationHrid: rawData.itemLocationHrid,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required for dev CLI to run this generator standalone
if (import.meta.main) {
	const generator = new ModularEquipmentTypesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
