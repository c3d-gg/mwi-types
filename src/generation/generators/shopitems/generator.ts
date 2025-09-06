import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { ItemHrid } from '../../../generated/items/types'
import type { ShopCategoryHrid } from '../../../generated/shopcategories/types'

export interface ShopItemCost {
	itemHrid: ItemHrid
	count: number
}

export interface ShopItem {
	hrid: ShopItemHrid
	category: ShopCategoryHrid
	itemHrid: ItemHrid
	costs: ShopItemCost[]
	sortIndex: number
}

export type ShopItemHrid = string & { __brand: 'ShopItemHrid' }

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

	// Transform shop item data
	protected override transformEntity(rawData: any): ShopItem {
		return {
			hrid: rawData.hrid as ShopItemHrid,
			category: rawData.category as ShopCategoryHrid,
			itemHrid: rawData.itemHrid as ItemHrid,
			costs: rawData.costs?.map(this.transformCost) || [],
			sortIndex: rawData.sortIndex,
		}
	}

	private transformCost(rawCost: any): ShopItemCost {
		return {
			itemHrid: rawCost.itemHrid as ItemHrid,
			count: rawCost.count,
		}
	}
}

// Main execution block for dev CLI
if (import.meta.main) {
	const generator = new ModularShopItemsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
