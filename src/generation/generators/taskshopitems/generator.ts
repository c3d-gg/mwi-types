import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { ItemHrid } from '../../../generated/items/types'

export interface TaskShopItemCost {
	itemHrid: ItemHrid
	count: number
}

export interface TaskShopItem {
	hrid: TaskShopItemHrid
	name: string
	itemHrid: ItemHrid
	cost: TaskShopItemCost
	sortIndex: number
}

export type TaskShopItemHrid = string & { __brand: 'TaskShopItemHrid' }

export class ModularTaskShopItemsGenerator extends ModularBaseGenerator<TaskShopItem> {
	constructor() {
		super({
			entityName: 'TaskShopItem',
			entityNamePlural: 'TaskShopItems',
			sourceKey: 'taskShopItemDetailMap',
			outputPath: 'src/generated/taskshopitems',

			// Simple utilities for task shop items
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],
		})
	}

	// Transform task shop item data
	protected override transformEntity(rawData: any): TaskShopItem {
		return {
			hrid: rawData.hrid as TaskShopItemHrid,
			name: rawData.name,
			itemHrid: rawData.itemHrid as ItemHrid,
			cost: {
				itemHrid: rawData.cost.itemHrid as ItemHrid,
				count: rawData.cost.count,
			},
			sortIndex: rawData.sortIndex,
		}
	}
}

// Main execution block for dev CLI
if (import.meta.main) {
	const generator = new ModularTaskShopItemsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
