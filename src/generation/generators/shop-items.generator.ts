import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'
import type { GeneratorConfig } from '../core/types'

interface Cost {
	itemHrid: string
	count: number
}

interface ShopItem {
	hrid: string
	category: string
	itemHrid: string
	costs: Cost[]
	sortIndex: number
}

export class ShopItemsGenerator extends BaseGenerator<ShopItem> {
	private shopCategories: Set<string> = new Set()
	private currencyItems: Set<string> = new Set()
	private itemHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'ShopItem',
			entityNamePlural: 'ShopItems',
			sourceKey: 'shopItemDetailMap',
			outputPath: './src/generated/types/shop-items.ts',
			generateConstants: true,
			generateUtils: true,
		} as GeneratorConfig)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ShopItem> {
		const entities: Record<string, ShopItem> = {}

		// Extract regular shop items
		if (sourceData.shopItemDetailMap) {
			for (const [hrid, data] of Object.entries(sourceData.shopItemDetailMap)) {
				const shopItem = this.extractShopItem(data as any)
				entities[hrid] = shopItem
				this.collectShopItemValues(shopItem)
			}
		}

		return entities
	}

	private extractShopItem(data: any): ShopItem {
		return {
			hrid: data.hrid,
			category: data.category,
			itemHrid: data.itemHrid,
			costs: data.costs || [],
			sortIndex: data.sortIndex || 0,
		}
	}

	private collectShopItemValues(item: ShopItem): void {
		this.shopCategories.add(item.category)
		this.itemHrids.add(item.itemHrid)
		item.costs.forEach((cost) => {
			this.currencyItems.add(cost.itemHrid)
		})
	}

	protected override generateConstants(
		entities: Record<string, ShopItem>,
	): void {
		// Generate shop item HRIDs
		const hrids = Object.keys(entities).sort()
		this.builder.addConstArray('SHOPITEM_HRIDS', hrids, true)
		this.builder.addTypeAlias('ShopItemHrid', 'typeof SHOPITEM_HRIDS[number]')

		// Generate shop categories
		const categories = Array.from(this.shopCategories).sort()
		this.builder.addConstArray('SHOP_CATEGORIES', categories, true)
		this.builder.addTypeAlias('ShopCategory', 'typeof SHOP_CATEGORIES[number]')

		// Generate currency items
		const currencies = Array.from(this.currencyItems).sort()
		this.builder.addConstArray('CURRENCY_ITEMS', currencies, true)
		this.builder.addTypeAlias('CurrencyItem', 'typeof CURRENCY_ITEMS[number]')
	}

	protected override generateInterfaces(
		_entities: Record<string, ShopItem>,
	): void {
		// Import ItemHrid from items generator
		this.builder.addImport('./items', ['ItemHrid'], true)

		// Generate Cost interface
		const costProperties: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'count', type: 'number', optional: false },
		]
		this.builder.addInterface('Cost', costProperties)

		// Generate ShopItem interface
		const shopItemProperties: PropertyDefinition[] = [
			{ name: 'hrid', type: 'ShopItemHrid', optional: false },
			{ name: 'category', type: 'ShopCategory', optional: false },
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'costs', type: 'Cost[]', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		]
		this.builder.addInterface('ShopItem', shopItemProperties)
	}

	protected override generateDataMap(entities: Record<string, ShopItem>): void {
		// Generate shop items map
		const entries = Object.entries(entities)
		this.builder.addTypedMap('SHOPITEMS', 'ShopItemHrid', 'ShopItem', entries)
	}

	protected override generateUtilities(
		entities: Record<string, ShopItem>,
	): void {
		// Generate type guards
		this.builder.addTypeGuard(
			'isShopItemHrid',
			'value',
			'string',
			'ShopItemHrid',
			'SHOPITEM_HRIDS.includes(value as ShopItemHrid)',
		)

		// Shop item getters
		this.builder.addFunction(
			'getShopItem',
			[{ name: 'hrid', type: 'ShopItemHrid' }],
			'ShopItem | undefined',
			(writer) => {
				writer.writeLine('return SHOPITEMS.get(hrid)')
			},
		)

		this.builder.addFunction(
			'requireShopItem',
			[{ name: 'hrid', type: 'ShopItemHrid' }],
			'ShopItem',
			(writer) => {
				writer.writeLine('const shopitem = SHOPITEMS.get(hrid)')
				writer.writeLine('if (!shopitem) {')
				writer.writeLine(`  throw new Error(\`ShopItem not found: \${hrid}\`)`)
				writer.writeLine('}')
				writer.writeLine('return shopitem')
			},
		)

		// Get all functions
		this.builder.addFunction('getAllShopItems', [], 'ShopItem[]', (writer) => {
			writer.writeLine('return Array.from(SHOPITEMS.values())')
		})

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate utility functions
		this.generateShopUtilities()
	}

	private generateLookupMaps(entities: Record<string, ShopItem>): void {
		// Shop items by category
		const byCategory: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			if (!byCategory[item.category]) {
				byCategory[item.category] = []
			}
			byCategory[item.category]!.push(hrid)
		})

		this.builder.addConstVariable(
			'SHOP_ITEMS_BY_CATEGORY',
			'Partial<Record<ShopCategory, readonly ShopItemHrid[]>>',
			Object.entries(byCategory).reduce(
				(acc, [category, hrids]) => {
					acc[category] = hrids.sort()
					return acc
				},
				{} as Record<string, string[]>,
			),
		)

		// Shop items by currency
		const byCurrency: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			item.costs.forEach((cost) => {
				if (!byCurrency[cost.itemHrid]) {
					byCurrency[cost.itemHrid] = []
				}
				if (!byCurrency[cost.itemHrid]!.includes(hrid)) {
					byCurrency[cost.itemHrid]!.push(hrid)
				}
			})
		})

		this.builder.addConstVariable(
			'SHOP_ITEMS_BY_CURRENCY',
			'Partial<Record<CurrencyItem, readonly ShopItemHrid[]>>',
			Object.entries(byCurrency).reduce(
				(acc, [currency, hrids]) => {
					acc[currency] = hrids.sort()
					return acc
				},
				{} as Record<string, string[]>,
			),
		)

		// Shop items by item sold
		const byItemSold: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			if (!byItemSold[item.itemHrid]) {
				byItemSold[item.itemHrid] = []
			}
			byItemSold[item.itemHrid]!.push(hrid)
		})

		this.builder.addConstVariable(
			'SHOP_ITEMS_BY_ITEM_SOLD',
			'Partial<Record<ItemHrid, readonly ShopItemHrid[]>>',
			Object.entries(byItemSold).reduce(
				(acc, [itemHrid, hrids]) => {
					acc[itemHrid] = hrids.sort()
					return acc
				},
				{} as Record<string, string[]>,
			),
		)
	}

	private generateShopUtilities(): void {
		// Get shop items by category
		this.builder.addFunction(
			'getShopItemsByCategory',
			[{ name: 'category', type: 'ShopCategory' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine('const hrids = SHOP_ITEMS_BY_CATEGORY[category] || []')
				writer.writeLine(
					'return hrids.map(hrid => SHOPITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Get shop items by currency
		this.builder.addFunction(
			'getShopItemsByCurrency',
			[{ name: 'currency', type: 'CurrencyItem' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine('const hrids = SHOP_ITEMS_BY_CURRENCY[currency] || []')
				writer.writeLine(
					'return hrids.map(hrid => SHOPITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Get shop items that sell a specific item
		this.builder.addFunction(
			'getShopItemsForItem',
			[{ name: 'itemHrid', type: 'ItemHrid' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine(
					'const hrids = SHOP_ITEMS_BY_ITEM_SOLD[itemHrid] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => SHOPITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Check if player can afford shop item
		this.builder.addFunction(
			'canAffordShopItem',
			[
				{ name: 'item', type: 'ShopItem' },
				{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('return item.costs.every(cost =>')
				writer.writeLine(
					'  (inventory[cost.itemHrid as ItemHrid] || 0) >= cost.count',
				)
				writer.writeLine(')')
			},
		)

		// Calculate total cost for multiple shop items
		this.builder.addFunction(
			'calculateTotalShopCost',
			[{ name: 'items', type: 'ShopItem[]' }],
			'Partial<Record<ItemHrid, number>>',
			(writer) => {
				writer.writeLine(
					'const totalCost: Partial<Record<ItemHrid, number>> = {}',
				)
				writer.writeLine('')
				writer.writeLine('items.forEach(item => {')
				writer.writeLine('  item.costs.forEach(cost => {')
				writer.writeLine('    const currency = cost.itemHrid as ItemHrid')
				writer.writeLine(
					'    totalCost[currency] = (totalCost[currency] || 0) + cost.count',
				)
				writer.writeLine('  })')
				writer.writeLine('})')
				writer.writeLine('')
				writer.writeLine('return totalCost')
			},
		)

		// Find cheapest shop item for an item hrid
		this.builder.addFunction(
			'findCheapestShopItem',
			[
				{ name: 'itemHrid', type: 'ItemHrid' },
				{ name: 'preferredCurrency', type: 'ItemHrid | undefined' },
			],
			'ShopItem | undefined',
			(writer) => {
				writer.writeLine('const shopItems = getShopItemsForItem(itemHrid)')
				writer.writeLine('')
				writer.writeLine('if (shopItems.length === 0) return undefined')
				writer.writeLine('if (shopItems.length === 1) return shopItems[0]')
				writer.writeLine('')
				writer.writeLine(
					'// If preferred currency specified, filter to those first',
				)
				writer.writeLine('if (preferredCurrency) {')
				writer.writeLine('  const preferred = shopItems.filter(item =>')
				writer.writeLine(
					'    item.costs.some(c => c.itemHrid === preferredCurrency)',
				)
				writer.writeLine('  )')
				writer.writeLine('  if (preferred.length > 0) {')
				writer.writeLine(
					'    // Sort by cost amount for the preferred currency',
				)
				writer.writeLine('    return preferred.sort((a, b) => {')
				writer.writeLine(
					'      const aCost = a.costs.find(c => c.itemHrid === preferredCurrency)?.count || 0',
				)
				writer.writeLine(
					'      const bCost = b.costs.find(c => c.itemHrid === preferredCurrency)?.count || 0',
				)
				writer.writeLine('      return aCost - bCost')
				writer.writeLine('    })[0]')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('// Return first item by sort index as fallback')
				writer.writeLine(
					'return shopItems.sort((a, b) => a.sortIndex - b.sortIndex)[0]',
				)
			},
		)

		// Sort shop items by sort index
		this.builder.addFunction(
			'sortShopItemsByIndex',
			[{ name: 'items', type: 'ShopItem[]' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine(
					'return [...items].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// Group shop items by category
		this.builder.addFunction(
			'groupShopItemsByCategory',
			[],
			'Map<ShopCategory, ShopItem[]>',
			(writer) => {
				writer.writeLine('const grouped = new Map<ShopCategory, ShopItem[]>()')
				writer.writeLine('')
				writer.writeLine('for (const category of SHOP_CATEGORIES) {')
				writer.writeLine('  const items = getShopItemsByCategory(category)')
				writer.writeLine('  if (items.length > 0) {')
				writer.writeLine(
					'    grouped.set(category, sortShopItemsByIndex(items))',
				)
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('return grouped')
			},
		)
	}
}
