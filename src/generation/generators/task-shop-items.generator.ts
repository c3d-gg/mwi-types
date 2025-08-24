import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'
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

export class TaskShopItemsGenerator extends BaseGenerator<TaskShopItem> {
	private taskCurrencyItems: Set<string> = new Set()
	private itemHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'TaskShopItem',
			entityNamePlural: 'TaskShopItems',
			sourceKey: 'taskShopItemDetailMap',
			outputPath: './src/generated/types/task-shop-items.ts',
			generateConstants: true,
			generateUtils: true,
		} as GeneratorConfig)
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
				const taskShopItem = this.extractTaskShopItem(data as any)
				entities[hrid] = taskShopItem
				this.collectTaskShopItemValues(taskShopItem)
			}
		}

		return entities
	}

	private extractTaskShopItem(data: any): TaskShopItem {
		return {
			hrid: data.hrid,
			name: data.name,
			itemHrid: data.itemHrid,
			cost: data.cost,
			sortIndex: data.sortIndex || 0,
		}
	}

	private collectTaskShopItemValues(item: TaskShopItem): void {
		this.itemHrids.add(item.itemHrid)
		if (item.cost) {
			this.taskCurrencyItems.add(item.cost.itemHrid)
		}
	}

	protected override generateConstants(
		entities: Record<string, TaskShopItem>,
	): void {
		// Generate task shop item HRIDs
		const hrids = Object.keys(entities).sort()
		this.builder.addConstArray('TASKSHOPITEM_HRIDS', hrids, true)
		this.builder.addTypeAlias(
			'TaskShopItemHrid',
			'typeof TASKSHOPITEM_HRIDS[number]',
		)

		// Generate task currencies (usually just task points)
		const currencies = Array.from(this.taskCurrencyItems).sort()
		this.builder.addConstArray('TASK_CURRENCIES', currencies, true)
		this.builder.addTypeAlias('TaskCurrency', 'typeof TASK_CURRENCIES[number]')
	}

	protected override generateInterfaces(
		_entities: Record<string, TaskShopItem>,
	): void {
		// Import ItemHrid from items generator
		this.builder.addImport('./items', ['ItemHrid'], true)

		// Generate TaskShopCost interface
		const costProperties: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'count', type: 'number', optional: false },
		]
		this.builder.addInterface('TaskShopCost', costProperties)

		// Generate TaskShopItem interface
		const taskShopItemProperties: PropertyDefinition[] = [
			{ name: 'hrid', type: 'TaskShopItemHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'cost', type: 'TaskShopCost', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		]
		this.builder.addInterface('TaskShopItem', taskShopItemProperties)
	}

	protected override generateDataMap(
		entities: Record<string, TaskShopItem>,
	): void {
		// Generate task shop items map
		const entries = Object.entries(entities)
		this.builder.addTypedMap(
			'TASKSHOPITEMS',
			'TaskShopItemHrid',
			'TaskShopItem',
			entries,
		)
	}

	protected override generateUtilities(
		entities: Record<string, TaskShopItem>,
	): void {
		// Generate type guards
		this.builder.addTypeGuard(
			'isTaskShopItemHrid',
			'value',
			'string',
			'TaskShopItemHrid',
			'TASKSHOPITEM_HRIDS.includes(value as TaskShopItemHrid)',
		)

		// Task shop item getters
		this.builder.addFunction(
			'getTaskShopItem',
			[{ name: 'hrid', type: 'TaskShopItemHrid' }],
			'TaskShopItem | undefined',
			(writer) => {
				writer.writeLine('return TASKSHOPITEMS.get(hrid)')
			},
		)

		this.builder.addFunction(
			'requireTaskShopItem',
			[{ name: 'hrid', type: 'TaskShopItemHrid' }],
			'TaskShopItem',
			(writer) => {
				writer.writeLine('const taskshopitem = TASKSHOPITEMS.get(hrid)')
				writer.writeLine('if (!taskshopitem) {')
				writer.writeLine(
					`  throw new Error(\`TaskShopItem not found: \${hrid}\`)`,
				)
				writer.writeLine('}')
				writer.writeLine('return taskshopitem')
			},
		)

		// Get all functions
		this.builder.addFunction(
			'getAllTaskShopItems',
			[],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('return Array.from(TASKSHOPITEMS.values())')
			},
		)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate utility functions
		this.generateTaskShopUtilities()
	}

	private generateLookupMaps(entities: Record<string, TaskShopItem>): void {
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

		this.builder.addConstVariable(
			'TASK_SHOP_ITEMS_BY_CURRENCY',
			'Partial<Record<TaskCurrency, readonly TaskShopItemHrid[]>>',
			Object.entries(byCurrency).reduce(
				(acc, [currency, hrids]) => {
					acc[currency] = hrids.sort()
					return acc
				},
				{} as Record<string, string[]>,
			),
		)

		// Task shop items by item sold
		const byItemSold: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			if (!byItemSold[item.itemHrid]) {
				byItemSold[item.itemHrid] = []
			}
			byItemSold[item.itemHrid]!.push(hrid)
		})

		this.builder.addConstVariable(
			'TASK_SHOP_ITEMS_BY_ITEM_SOLD',
			'Partial<Record<ItemHrid, readonly TaskShopItemHrid[]>>',
			Object.entries(byItemSold).reduce(
				(acc, [itemHrid, hrids]) => {
					acc[itemHrid] = hrids.sort()
					return acc
				},
				{} as Record<string, string[]>,
			),
		)
	}

	private generateTaskShopUtilities(): void {
		// Get task shop items by currency
		this.builder.addFunction(
			'getTaskShopItemsByCurrency',
			[{ name: 'currency', type: 'TaskCurrency' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine(
					'const hrids = TASK_SHOP_ITEMS_BY_CURRENCY[currency] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => TASKSHOPITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Get task shop items that sell a specific item
		this.builder.addFunction(
			'getTaskShopItemsForItem',
			[{ name: 'itemHrid', type: 'ItemHrid' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine(
					'const hrids = TASK_SHOP_ITEMS_BY_ITEM_SOLD[itemHrid] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => TASKSHOPITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Check if player can afford task shop item
		this.builder.addFunction(
			'canAffordTaskShopItem',
			[
				{ name: 'item', type: 'TaskShopItem' },
				{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('if (!item.cost) return true')
				writer.writeLine(
					'return (inventory[item.cost.itemHrid as ItemHrid] || 0) >= item.cost.count',
				)
			},
		)

		// Calculate total task points cost
		this.builder.addFunction(
			'calculateTotalTaskCost',
			[{ name: 'items', type: 'TaskShopItem[]' }],
			'Partial<Record<ItemHrid, number>>',
			(writer) => {
				writer.writeLine(
					'const totalCost: Partial<Record<ItemHrid, number>> = {}',
				)
				writer.writeLine('')
				writer.writeLine('items.forEach(item => {')
				writer.writeLine('  if (item.cost) {')
				writer.writeLine('    const currency = item.cost.itemHrid as ItemHrid')
				writer.writeLine(
					'    totalCost[currency] = (totalCost[currency] || 0) + item.cost.count',
				)
				writer.writeLine('  }')
				writer.writeLine('})')
				writer.writeLine('')
				writer.writeLine('return totalCost')
			},
		)

		// Sort task shop items by sort index
		this.builder.addFunction(
			'sortTaskShopItemsByIndex',
			[{ name: 'items', type: 'TaskShopItem[]' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine(
					'return [...items].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// Get task shop item by name
		this.builder.addFunction(
			'getTaskShopItemByName',
			[{ name: 'name', type: 'string' }],
			'TaskShopItem | undefined',
			(writer) => {
				writer.writeLine('return getAllTaskShopItems().find(')
				writer.writeLine(
					'  item => item.name.toLowerCase() === name.toLowerCase()',
				)
				writer.writeLine(')')
			},
		)

		// Search task shop items by name
		this.builder.addFunction(
			'searchTaskShopItems',
			[{ name: 'query', type: 'string' }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('return getAllTaskShopItems().filter(')
				writer.writeLine(
					'  item => item.name.toLowerCase().includes(lowerQuery)',
				)
				writer.writeLine(')')
			},
		)

		// Get most expensive task shop items
		this.builder.addFunction(
			'getMostExpensiveTaskShopItems',
			[{ name: 'limit', type: 'number', default: 10 }],
			'TaskShopItem[]',
			(writer) => {
				writer.writeLine('return getAllTaskShopItems()')
				writer.writeLine(
					'  .sort((a, b) => (b.cost?.count || 0) - (a.cost?.count || 0))',
				)
				writer.writeLine('  .slice(0, limit)')
			},
		)

		// Calculate task points saved by buying multiple items
		this.builder.addFunction(
			'calculateTaskPointsSaved',
			[
				{ name: 'items', type: 'TaskShopItem[]' },
				{ name: 'bulkDiscount', type: 'number', default: 0 },
			],
			'number',
			(writer) => {
				writer.writeLine('const totalCost = items.reduce((sum, item) =>')
				writer.writeLine('  sum + (item.cost?.count || 0), 0')
				writer.writeLine(')')
				writer.writeLine('')
				writer.writeLine('if (bulkDiscount > 0 && bulkDiscount < 1) {')
				writer.writeLine(
					'  const discountedCost = totalCost * (1 - bulkDiscount)',
				)
				writer.writeLine('  return Math.floor(totalCost - discountedCost)')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('return 0')
			},
		)

		// Group task shop items by price range
		this.builder.addFunction(
			'groupTaskShopItemsByPriceRange',
			[],
			'{ cheap: TaskShopItem[], medium: TaskShopItem[], expensive: TaskShopItem[] }',
			(writer) => {
				writer.writeLine('const cheap: TaskShopItem[] = []')
				writer.writeLine('const medium: TaskShopItem[] = []')
				writer.writeLine('const expensive: TaskShopItem[] = []')
				writer.writeLine('')
				writer.writeLine('getAllTaskShopItems().forEach(item => {')
				writer.writeLine('  const cost = item.cost?.count || 0')
				writer.writeLine('  if (cost <= 10) {')
				writer.writeLine('    cheap.push(item)')
				writer.writeLine('  } else if (cost <= 50) {')
				writer.writeLine('    medium.push(item)')
				writer.writeLine('  } else {')
				writer.writeLine('    expensive.push(item)')
				writer.writeLine('  }')
				writer.writeLine('})')
				writer.writeLine('')
				writer.writeLine('return {')
				writer.writeLine('  cheap: sortTaskShopItemsByIndex(cheap),')
				writer.writeLine('  medium: sortTaskShopItemsByIndex(medium),')
				writer.writeLine('  expensive: sortTaskShopItemsByIndex(expensive),')
				writer.writeLine('}')
			},
		)
	}
}
