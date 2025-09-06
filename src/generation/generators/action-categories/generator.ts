import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

interface ActionCategory {
	hrid: string
	name: string
	type: string
	sortIndex: number
}

/**
 * Generator for ActionCategories module
 *
 * This is a Layer 1 (simple) generator with no dependencies.
 * Generates types and utilities for action categories (Alchemy, Brewing, Combat, etc.)
 *
 * Hook-based architecture:
 * - Uses default hooks for interfaces, constants, and utilities
 * - Uses transformEntity() hook for simple data transformation
 * - No custom hooks needed due to simple structure
 *
 * @see ARCHITECTURE.md for hook system documentation
 */
export class ModularActionCategoriesGenerator extends ModularBaseGenerator<ActionCategory> {
	constructor() {
		super({
			entityName: 'ActionCategory',
			entityNamePlural: 'ActionCategories',
			sourceKey: 'actionCategoryDetailMap',
			outputPath: 'src/generated/actioncategories',

			// Feature flags (all true by default)
			generateHrids: true,
			generateCollection: true,
			generateConstants: true,
			generateUtils: true,
			generateLookups: true,

			// No shared types needed (Layer 1 generator)
			sharedTypes: [],

			// Standard utility templates to include
			utilityTemplates: [
				{ type: 'getByField', field: 'type' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' }, // Convert Record to Map
			],

			// No category filters needed for this simple generator
			categoryFilters: [],
		})
	}

	/**
	 * Define the ActionCategory interface explicitly to fix HRID type generation
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'ActionCategory',
				properties: [
					{ name: 'hrid', type: 'ActionCategoryHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'type', type: 'string' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	/**
	 * Transform entity from source data - using the transformEntity hook for simple cases
	 */
	protected override transformEntity(rawData: any): ActionCategory {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			type: rawData.type,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required main block for dev CLI support
if (import.meta.main) {
	const generator = new ModularActionCategoriesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
