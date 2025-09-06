import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

interface BuffType {
	hrid: string
	name: string
	description: string
	debuffDescription: string
	isCombat: boolean
	sortIndex: number
}

/**
 * Generator for BuffTypes module
 *
 * This is a Layer 1 (simple) generator with no dependencies.
 * Generates types and utilities for buff types with combat/non-combat categorization.
 *
 * Hook-based architecture:
 * - Uses defineInterfaces() hook for explicit interface definition
 * - Uses transformEntity() hook for simple data transformation
 * - Uses category filters for combat vs non-combat buffs
 *
 * @see ARCHITECTURE.md for hook system documentation
 */
export class ModularBuffTypesGenerator extends ModularBaseGenerator<BuffType> {
	constructor() {
		super({
			entityName: 'BuffType',
			entityNamePlural: 'BuffTypes',
			sourceKey: 'buffTypeDetailMap',
			outputPath: 'src/generated/bufftypes',

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
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' }, // Convert Record to Map
			],

			// Category filters for auto-generating constant arrays
			categoryFilters: [
				{
					name: 'combat',
					condition: (buffType: any) => buffType.isCombat === true,
				},
				{
					name: 'nonCombat',
					condition: (buffType: any) => buffType.isCombat === false,
				},
			],
		})
	}

	/**
	 * Define the BuffType interface explicitly to ensure correct HRID type generation
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'BuffType',
				properties: [
					{ name: 'hrid', type: 'BuffTypeHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'description', type: 'string' },
					{ name: 'debuffDescription', type: 'string' },
					{ name: 'isCombat', type: 'boolean' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	/**
	 * Transform entity from source data - using the transformEntity hook for simple cases
	 */
	protected override transformEntity(rawData: any): BuffType {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			description: rawData.description,
			debuffDescription: rawData.debuffDescription,
			isCombat: rawData.isCombat,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required main block for dev CLI support
if (import.meta.main) {
	const generator = new ModularBuffTypesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
