import { ModularBaseGenerator } from '../../core/generator.base.modular'
import type { InterfaceDefinition } from '../../core/types'

import type { ItemHrid } from '../../../generated/items/types'
import type { ShopCategoryHrid } from '../../../generated/shopcategories/types'

// Internal interfaces for TypeScript typing (NOT exported)
interface ShopItemCost {
	itemHrid: ItemHrid
	count: number
}

interface ShopItem {
	hrid: string
	category: ShopCategoryHrid
	itemHrid: ItemHrid
	costs: ShopItemCost[]
	sortIndex: number
}

export class ModularShopItemsGenerator extends ModularBaseGenerator<ShopItem> {
	constructor() {
		super({
			entityName: 'ShopItem',
			entityNamePlural: 'ShopItems',
			sourceKey: 'shopItemDetailMap',
			outputPath: 'src/generated/shopitems',

			// Standard utilities for shop items
			utilityTemplates: [
				{ type: 'getByField', field: 'category' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],
		})
	}

	// MANDATORY: Explicit interface definitions to prevent HridHrid bug
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'ShopItem',
				properties: [
					{ name: 'hrid', type: 'ShopItemHrid' }, // ✅ EXPLICIT HRID TYPE!
					{ name: 'category', type: 'ShopCategoryHrid' },
					{ name: 'itemHrid', type: 'ItemHrid' },
					{ name: 'costs', type: 'ShopItemCost[]' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
			{
				name: 'ShopItemCost',
				properties: [
					{ name: 'itemHrid', type: 'ItemHrid' },
					{ name: 'count', type: 'number' },
				],
			},
		]
	}

	// Transform shop item data
	protected override transformEntity(rawData: any): ShopItem {
		return {
			hrid: rawData.hrid,
			category: rawData.category as ShopCategoryHrid,
			itemHrid: rawData.itemHrid as ItemHrid,
			costs: rawData.costs?.map(this.transformCost.bind(this)) || [],
			sortIndex: rawData.sortIndex,
		}
	}

	private transformCost(rawCost: any): ShopItemCost {
		return {
			itemHrid: rawCost.itemHrid as ItemHrid,
			count: rawCost.count,
		}
	}

	// Extension hook: Add imports needed for types
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		// Import types from other domains
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../shopcategories/types', ['ShopCategoryHrid'], true)
	}
}

// Main execution block for dev CLI
if (import.meta.main) {
	const generator = new ModularShopItemsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
