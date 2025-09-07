import { ModularBaseGenerator } from '../../core/generator.base.modular'
import type { InterfaceDefinition } from '../../core/types'

import type { ItemHrid } from '../../../generated/items/types'

// Internal interfaces for TypeScript typing (NOT exported)
interface TaskShopItemCost {
	itemHrid: ItemHrid
	count: number
}

interface TaskShopItem {
	hrid: string
	name: string
	itemHrid: ItemHrid
	cost: TaskShopItemCost
	sortIndex: number
}

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

	// MANDATORY: Explicit interface definitions to prevent HridHrid bug
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'TaskShopItem',
				properties: [
					{ name: 'hrid', type: 'TaskShopItemHrid' }, // ✅ EXPLICIT HRID TYPE!
					{ name: 'name', type: 'string' },
					{ name: 'itemHrid', type: 'ItemHrid' },
					{ name: 'cost', type: 'TaskShopItemCost' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
			{
				name: 'TaskShopItemCost',
				properties: [
					{ name: 'itemHrid', type: 'ItemHrid' },
					{ name: 'count', type: 'number' },
				],
			},
		]
	}

	// Transform task shop item data
	protected override transformEntity(rawData: any): TaskShopItem {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			itemHrid: rawData.itemHrid as ItemHrid,
			cost: {
				itemHrid: rawData.cost.itemHrid as ItemHrid,
				count: rawData.cost.count,
			},
			sortIndex: rawData.sortIndex,
		}
	}

	// Extension hook: Add imports needed for types
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		// Import types from other domains
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
	}
}

// Main execution block for dev CLI
if (import.meta.main) {
	const generator = new ModularTaskShopItemsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
