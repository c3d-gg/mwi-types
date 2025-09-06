import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

interface TaskShopCost {
	itemHrid: string
	count: number
}

interface TaskShopItem {
	hrid: string
	name: string
	itemHrid: string
	cost: TaskShopCost
	sortIndex: number
}

export class TaskShopItemsGeneratorModular extends ModularBaseGenerator<TaskShopItem> {
	private taskCurrencyItems: Set<string> = new Set()
	private itemHrids: Set<string> = new Set()

	constructor() {
		const config: GeneratorConfig = {
			entityName: 'TaskShopItem',
			entityNamePlural: 'TaskShopItems',
			sourceKey: 'taskShopItemDetailMap',
			outputPath: './src/generated/task-shop-items',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, TaskShopItem> {
		const entities: Record<string, TaskShopItem> = {}

		// Extract task shop items
		if (sourceData.taskShopItemDetailMap) {
			for (const [hrid, data] of Object.entries(
				sourceData.taskShopItemDetailMap,
			)) {
				const cleanData = this.cleanEntityData(data as any)
				const taskShopItem = this.extractTaskShopItem(cleanData)
				entities[hrid] = taskShopItem
				this.collectTaskShopItemValues(taskShopItem)
			}
		}

		return entities
	}

	private extractTaskShopItem(data: any): TaskShopItem {
		return {
			hrid: data.hrid || '',
			name: data.name || '',
			itemHrid: data.itemHrid || '',
			cost: data.cost ? {
				itemHrid: data.cost.itemHrid || '',
				count: typeof data.cost.count === 'number' ? data.cost.count : 0,
			} : {
				itemHrid: '',
				count: 0,
			},
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	private collectTaskShopItemValues(item: TaskShopItem): void {
		this.itemHrids.add(item.itemHrid)
		if (item.cost) {
			this.taskCurrencyItems.add(item.cost.itemHrid)
		}
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['TASKSHOPITEM_HRIDS', 'TASK_CURRENCIES'], false)

		// Generate type aliases
		typesBuilder.addType('TaskShopItemHrid', 'typeof TASKSHOPITEM_HRIDS[number]')
		typesBuilder.addType('TaskCurrency', 'typeof TASK_CURRENCIES[number]')

		// Import types from other modules (DO NOT re-export - domain boundary)
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)

		// Generate TaskShopCost interface
		typesBuilder.addInterface('TaskShopCost', [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'count', type: 'number', optional: false },
		])

		// Generate TaskShopItem interface
		typesBuilder.addInterface('TaskShopItem', [
			{ name: 'hrid', type: 'TaskShopItemHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'cost', type: 'TaskShopCost', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'TaskShopItem', 'type')
		this.moduleBuilder.addExport('types', 'TaskShopItemHrid', 'type')
		this.moduleBuilder.addExport('types', 'TaskShopCost', 'type')
		this.moduleBuilder.addExport('types', 'TaskCurrency', 'type')
	}

	protected override generateConstants(entities: Record<string, TaskShopItem>): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('TASKSHOPITEM_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'TASKSHOPITEM_HRIDS', 'const')

		// Generate task currencies (usually just task points)
		const currencies = Array.from(this.taskCurrencyItems).sort()
		constantsBuilder.addConstArray('TASK_CURRENCIES', currencies, true)
		this.moduleBuilder.addExport('constants', 'TASK_CURRENCIES', 'const')
	}

	protected override generateLazyData(entities: Record<string, TaskShopItem>): void {
		const dataBuilder = this.moduleBuilder.getFile('data')

		// Import types
		dataBuilder.addImport('./types', ['TaskShopItem', 'TaskShopItemHrid'], true)

		// Generate lazy map
		const entries = Object.entries(entities)
		dataBuilder.addLazyMap(
			'TASKSHOPITEMS',
			'getTaskShopItemsMap',
			'loadTaskShopItems',
			'TaskShopItemHrid',
			'TaskShopItem',
			entries,
		)

		this.moduleBuilder.addExport('data', 'getTaskShopItemsMap')
	}

	protected override generateLookups(entities: Record<string, TaskShopItem>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['TaskShopItemHrid', 'TaskCurrency'], true)
		lookupsBuilder.addImport('../items/types', ['ItemHrid'], true)

		// Task shop items by currency
		const byCurrency: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			if (item.cost) {
				const currency = item.cost.itemHrid
				if (!byCurrency[currency]) {
					byCurrency[currency] = []
				}
				byCurrency[currency]!.push(hrid)
			}
		})

		lookupsBuilder.addStaticLookup(
			'TASK_SHOP_ITEMS_BY_CURRENCY',
			'TaskCurrency',
			'readonly TaskShopItemHrid[]',
			byCurrency,
			true, // isPartial
		)
		this.moduleBuilder.addExport('lookups', 'TASK_SHOP_ITEMS_BY_CURRENCY', 'const')

		// Task shop items by item sold
		const byItemSold: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			if (!byItemSold[item.itemHrid]) {
				byItemSold[item.itemHrid] = []
			}
			byItemSold[item.itemHrid]!.push(hrid)
		})

		lookupsBuilder.addStaticLookup(
			'TASK_SHOP_ITEMS_BY_ITEM_SOLD',
			'string',
			'readonly TaskShopItemHrid[]',
			byItemSold,
			true, // isPartial
		)
		this.moduleBuilder.addExport('lookups', 'TASK_SHOP_ITEMS_BY_ITEM_SOLD', 'const')

		// Price ranges
		const cheap: string[] = []
		const medium: string[] = []
		const expensive: string[] = []

		Object.entries(entities).forEach(([hrid, item]) => {
			const cost = item.cost?.count || 0
			if (cost <= 10) {
				cheap.push(hrid)
			} else if (cost <= 50) {
				medium.push(hrid)
			} else {
				expensive.push(hrid)
			}
		})

		// Use const arrays for simple arrays
		lookupsBuilder.addConstArray('CHEAP_TASK_SHOP_ITEMS', cheap, true)
		lookupsBuilder.addConstArray('MEDIUM_TASK_SHOP_ITEMS', medium, true)
		lookupsBuilder.addConstArray('EXPENSIVE_TASK_SHOP_ITEMS', expensive, true)

		this.moduleBuilder.addExport('lookups', 'CHEAP_TASK_SHOP_ITEMS', 'const')
		this.moduleBuilder.addExport('lookups', 'MEDIUM_TASK_SHOP_ITEMS', 'const')
		this.moduleBuilder.addExport('lookups', 'EXPENSIVE_TASK_SHOP_ITEMS', 'const')
	}

	protected override generateUtilities(entities: Record<string, TaskShopItem>): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsBuilder.addImport('./types', ['TaskShopItem', 'TaskShopItemHrid', 'TaskCurrency'], true)
		utilsBuilder.addImport('../items/types', ['ItemHrid'], true)
		utilsBuilder.addImport('./data', ['getTaskShopItemsMap'], false)
		utilsBuilder.addImport('./constants', ['TASKSHOPITEM_HRIDS'], false)
		utilsBuilder.addImport(
			'./lookups',
			['TASK_SHOP_ITEMS_BY_CURRENCY', 'TASK_SHOP_ITEMS_BY_ITEM_SOLD', 'CHEAP_TASK_SHOP_ITEMS', 'MEDIUM_TASK_SHOP_ITEMS', 'EXPENSIVE_TASK_SHOP_ITEMS'],
			false
		)

		// Generate standard utilities
		
		// Type guard
		utilsBuilder.addFunction(
			'isTaskShopItemHrid',
			[{ name: 'value', type: 'string' }],
			'value is TaskShopItemHrid',
			(writer) => {
				writer.writeLine('return TASKSHOPITEM_HRIDS.includes(value as TaskShopItemHrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'isTaskShopItemHrid')
		
		// Getter functions
		utilsBuilder.addFunction(
			'getTaskShopItem',
			[{ name: 'hrid', type: 'TaskShopItemHrid' }],
			'TaskShopItem | undefined',
			(writer) => {
				writer.writeLine('return getTaskShopItemsMap().get(hrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getTaskShopItem')
		
		utilsBuilder.addFunction(
			'requireTaskShopItem',
			[{ name: 'hrid', type: 'TaskShopItemHrid' }],
			'TaskShopItem',
			(writer) => {
				writer.writeLine('const entity = getTaskShopItemsMap().get(hrid)')
				writer.writeLine('if (!entity) {')
				writer.writeLine('  throw new Error(`TaskShopItem not found: ${hrid}`)')
				writer.writeLine('}')
				writer.writeLine('return entity')
			},
		)
		this.moduleBuilder.addExport('utils', 'requireTaskShopItem')
		
		utilsBuilder.addFunction(
			'getAllTaskShopItems',
			[],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('return Array.from(getTaskShopItemsMap().values())')
			},
		)
		this.moduleBuilder.addExport('utils', 'getAllTaskShopItems')

		// Get task shop items by currency
		utilsBuilder.addFunction(
			'getTaskShopItemsByCurrency',
			[{ name: 'currency', type: 'TaskCurrency' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('const hrids = TASK_SHOP_ITEMS_BY_CURRENCY[currency] || []')
				writer.writeLine('const map = getTaskShopItemsMap()')
				writer.writeLine('return hrids.map(hrid => map.get(hrid)!).filter(Boolean)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getTaskShopItemsByCurrency')

		// Get task shop items that sell a specific item
		utilsBuilder.addFunction(
			'getTaskShopItemsForItem',
			[{ name: 'itemHrid', type: 'string' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('const hrids = TASK_SHOP_ITEMS_BY_ITEM_SOLD[itemHrid] || []')
				writer.writeLine('const map = getTaskShopItemsMap()')
				writer.writeLine('return hrids.map(hrid => map.get(hrid)!).filter(Boolean)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getTaskShopItemsForItem')

		// Check if player can afford task shop item
		utilsBuilder.addFunction(
			'canAffordTaskShopItem',
			[
				{ name: 'item', type: 'TaskShopItem' },
				{ name: 'inventory', type: 'Partial<Record<string, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('if (!item.cost) return true')
				writer.writeLine('return (inventory[item.cost.itemHrid] || 0) >= item.cost.count')
			},
		)
		this.moduleBuilder.addExport('utils', 'canAffordTaskShopItem')

		// Calculate total task points cost
		utilsBuilder.addFunction(
			'calculateTotalTaskCost',
			[{ name: 'items', type: 'TaskShopItem[]' }],
			'Partial<Record<string, number>>',
			(writer) => {
				writer.writeLine('const totalCost: Partial<Record<string, number>> = {}')
				writer.writeLine('')
				writer.writeLine('items.forEach(item => {')
				writer.writeLine('  if (item.cost) {')
				writer.writeLine('    const currency = item.cost.itemHrid')
				writer.writeLine('    totalCost[currency] = (totalCost[currency] || 0) + item.cost.count')
				writer.writeLine('  }')
				writer.writeLine('})')
				writer.writeLine('')
				writer.writeLine('return totalCost')
			},
		)
		this.moduleBuilder.addExport('utils', 'calculateTotalTaskCost')

		// Sort task shop items by sort index
		utilsBuilder.addFunction(
			'sortTaskShopItemsByIndex',
			[{ name: 'items', type: 'TaskShopItem[]' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('return items.slice().sort((a, b) => a.sortIndex - b.sortIndex)')
			},
		)
		this.moduleBuilder.addExport('utils', 'sortTaskShopItemsByIndex')

		// Get task shop item by name
		utilsBuilder.addFunction(
			'getTaskShopItemByName',
			[{ name: 'name', type: 'string' }],
			'TaskShopItem | undefined',
			(writer) => {
				writer.writeLine('const map = getTaskShopItemsMap()')
				writer.writeLine('return Array.from(map.values()).find(')
				writer.writeLine('  item => item.name.toLowerCase() === name.toLowerCase()')
				writer.writeLine(')')
			},
		)
		this.moduleBuilder.addExport('utils', 'getTaskShopItemByName')

		// Search task shop items by name
		utilsBuilder.addFunction(
			'searchTaskShopItems',
			[{ name: 'query', type: 'string' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('const map = getTaskShopItemsMap()')
				writer.writeLine('return Array.from(map.values()).filter(')
				writer.writeLine('  item => item.name.toLowerCase().includes(lowerQuery)')
				writer.writeLine(')')
			},
		)
		this.moduleBuilder.addExport('utils', 'searchTaskShopItems')

		// Get most expensive task shop items
		utilsBuilder.addFunction(
			'getMostExpensiveTaskShopItems',
			[{ name: 'limit', type: 'number', default: 10 }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('const map = getTaskShopItemsMap()')
				writer.writeLine('return Array.from(map.values())')
				writer.writeLine('  .sort((a, b) => (b.cost?.count || 0) - (a.cost?.count || 0))')
				writer.writeLine('  .slice(0, limit)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getMostExpensiveTaskShopItems')

		// Group task shop items by price range
		utilsBuilder.addFunction(
			'groupTaskShopItemsByPriceRange',
			[],
			'{ cheap: TaskShopItem[], medium: TaskShopItem[], expensive: TaskShopItem[] }',
			(writer) => {
				writer.writeLine('const map = getTaskShopItemsMap()')
				writer.writeLine('return {')
				writer.writeLine('  cheap: sortTaskShopItemsByIndex(CHEAP_TASK_SHOP_ITEMS.map(hrid => map.get(hrid)!)),')
				writer.writeLine('  medium: sortTaskShopItemsByIndex(MEDIUM_TASK_SHOP_ITEMS.map(hrid => map.get(hrid)!)),')
				writer.writeLine('  expensive: sortTaskShopItemsByIndex(EXPENSIVE_TASK_SHOP_ITEMS.map(hrid => map.get(hrid)!))')
				writer.writeLine('}')
			},
		)
		this.moduleBuilder.addExport('utils', 'groupTaskShopItemsByPriceRange')
	}
}