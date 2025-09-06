import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

interface DamageType {
	hrid: string
	name: string
	sortIndex: number
}

/**
 * Modular DamageTypes Generator using the hook system
 *
 * This generator creates TypeScript definitions for damage types (fire, nature, physical, water).
 * It follows the v1.0 architecture principles:
 * - Uses defineInterfaces() hook for type generation
 * - Uses configuration for standard utilities
 * - Uses transformEntity() for simple data transformation
 * - No dependencies (Layer 1 generator)
 *
 * This is a critical prerequisite that unblocks Monsters and Abilities generators.
 *
 * @see ARCHITECTURE.md for hook system documentation
 */
export class ModularDamageTypesGenerator extends ModularBaseGenerator<DamageType> {
	constructor() {
		super({
			entityName: 'DamageType',
			entityNamePlural: 'DamageTypes',
			sourceKey: 'damageTypeDetailMap',
			outputPath: 'src/generated/damagetypes',

			// Feature flags (all true by default, being explicit)
			generateHrids: true,
			generateCollection: true,
			generateConstants: true,
			generateUtils: true,
			generateLookups: true,

			// No shared types needed - all properties are primitives
			sharedTypes: [],

			// Standard utility templates for simple entity
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' }, // getDamageTypesSortedByIndex()
				{ type: 'toMap' }, // Convert Record to Map for O(1) combat lookups
			],

			// No category filters needed - simple 4-item dataset
			categoryFilters: [],
		})
	}

	/**
	 * Define interfaces using the hook system
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		const interfaces: InterfaceDefinition[] = []

		// Main DamageType interface
		interfaces.push({
			name: 'DamageType',
			properties: [
				{ name: 'hrid', type: 'DamageTypeHrid', optional: false },
				{ name: 'name', type: 'string', optional: false },
				{ name: 'sortIndex', type: 'number', optional: false },
			],
		})

		return interfaces
	}

	/**
	 * Transform raw damage type data to DamageType interface
	 * Since this is a simple entity, we can use transformEntity() instead of extractEntities()
	 */
	protected override transformEntity(rawData: any): DamageType {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			sortIndex: rawData.sortIndex,
		}
	}
}
