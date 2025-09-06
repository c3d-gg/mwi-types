/**
 * @fileoverview ModularItemCategoriesGenerator - generates ItemCategory types and utilities
 */

import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	ConstantDefinition,
	InterfaceDefinition,
	UtilityDefinition,
} from '../../core/types'

export interface ItemCategory {
	hrid: string
	name: string
	pluralName: string
	sortIndex: number
}

export class ModularItemCategoriesGenerator extends ModularBaseGenerator<ItemCategory> {
	constructor() {
		super({
			entityName: 'ItemCategory',
			entityNamePlural: 'ItemCategories',
			sourceKey: 'itemCategoryDetailMap',
			outputPath: './src/generated/itemcategories',
			sharedTypes: [],
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],
		})
	}

	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'ItemCategory',
				properties: [
					{ name: 'hrid', type: 'ItemCategoryHrid', optional: false },
					{ name: 'name', type: 'string', optional: false },
					{ name: 'pluralName', type: 'string', optional: false },
					{ name: 'sortIndex', type: 'number', optional: false },
				],
			},
		]
	}

	protected override defineUtilities(): UtilityDefinition[] {
		// Let the utility templates handle standard utilities
		return []
	}

	protected override defineConstants(): ConstantDefinition[] {
		// Let the base generator handle standard constants
		return []
	}

	protected override transformEntity(rawData: any): ItemCategory {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			pluralName: rawData.pluralName,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required for dev CLI to run this generator standalone
if (import.meta.main) {
	const generator = new ModularItemCategoriesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
