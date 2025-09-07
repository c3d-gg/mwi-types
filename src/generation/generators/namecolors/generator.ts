import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

export interface NameColor {
	hrid: string
	name: string
	cowbellCost: number
	isSeasonal: boolean
	sortIndex: number
}

export class ModularNameColorsGenerator extends ModularBaseGenerator<NameColor> {
	constructor() {
		super({
			entityName: 'NameColor',
			entityNamePlural: 'NameColors',
			sourceKey: 'nameColorDetailMap',
			outputPath: 'src/generated/namecolors',

			// Utility templates
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'sortBy', field: 'cowbellCost' },
				{ type: 'toMap' },
			],

			// Category filters for seasonal colors
			categoryFilters: [
				{
					name: 'seasonal',
					condition: (entity: any) => entity.isSeasonal,
				},
				{
					name: 'regular',
					condition: (entity: any) => !entity.isSeasonal,
				},
			],
		})
	}

	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'NameColor',
				properties: [
					{ name: 'hrid', type: 'NameColorHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'cowbellCost', type: 'number' },
					{ name: 'isSeasonal', type: 'boolean' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	protected override transformEntity(rawData: any): NameColor {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			cowbellCost: rawData.cowbellCost,
			isSeasonal: rawData.isSeasonal,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required for dev CLI generate:single command
if (import.meta.main) {
	const generator = new ModularNameColorsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
