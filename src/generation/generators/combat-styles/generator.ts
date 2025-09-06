import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

export interface CombatStyle {
	hrid: string
	name: string
	skillExpMap: Record<string, boolean> | null
	sortIndex: number
}

export class ModularCombatStylesGenerator extends ModularBaseGenerator<CombatStyle> {
	constructor() {
		super({
			entityName: 'CombatStyle',
			entityNamePlural: 'CombatStyles',
			sourceKey: 'combatStyleDetailMap',
			outputPath: 'src/generated/combat-styles',

			// Disable data cleaning since CombatStyle interface has explicit null fields
			applyDataCleaning: false,

			// No shared types needed - this is a simple generator
			sharedTypes: [],

			// Standard utility templates
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],
		})
	}

	/**
	 * Define the CombatStyle interface
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'CombatStyle',
				properties: [
					{
						name: 'hrid',
						type: 'string',
						description: 'Unique identifier for the combat style',
					},
					{
						name: 'name',
						type: 'string',
						description: 'Display name of the combat style',
					},
					{
						name: 'skillExpMap',
						type: 'Record<string, boolean> | null',
						description: 'Skill experience mapping flags (null for heal style)',
					},
					{
						name: 'sortIndex',
						type: 'number',
						description: 'Sort order index',
					},
				],
			},
		]
	}

	/**
	 * Transform raw data into CombatStyle entities
	 */
	protected override transformEntity(rawData: any): CombatStyle {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			skillExpMap: rawData.skillExpMap,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required main block for dev CLI
if (import.meta.main) {
	const generator = new ModularCombatStylesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
