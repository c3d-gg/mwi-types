import { ModularBaseGenerator } from '../core/generator.base.modular'

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

export class ShopItemsGeneratorModular extends ModularBaseGenerator<ShopItem> {
	private shopCategories: Set<string> = new Set()
	private currencyItems: Set<string> = new Set()
	private itemHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'ShopItem',
			entityNamePlural: 'ShopItems',
			sourceKey: 'shopItemDetailMap',
			outputPath: './src/generated/shop-items',
			generateConstants: true,
			generateUtils: true,
		} as GeneratorConfig)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ShopItem> {
		const entities: Record<string, ShopItem> = {}

		// Extract shop items
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
		const cleaned = this.cleanEntityData(data)
		return {
			hrid: cleaned.hrid || '',
			category: cleaned.category || '',
			itemHrid: cleaned.itemHrid || '',
			costs: cleaned.costs || [],
			sortIndex: typeof cleaned.sortIndex === 'number' ? cleaned.sortIndex : 0,
		}
	}

	private collectShopItemValues(item: ShopItem): void {
		this.shopCategories.add(item.category)
		this.itemHrids.add(item.itemHrid)
		item.costs.forEach((cost) => {
			this.currencyItems.add(cost.itemHrid)
		})
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment about temporary type aliases
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import ItemHrid from items module since it's modular now
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)

		// Generate Cost interface
		typesBuilder.addInterface('Cost', [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'count', type: 'number', optional: false },
		])

		// Import constants for type derivation
		typesBuilder.addImport(
			'./constants',
			['SHOPITEM_HRIDS', 'SHOP_CATEGORIES'],
			false,
		)

		// Generate type aliases
		typesBuilder.addType('ShopItemHrid', 'typeof SHOPITEM_HRIDS[number]')
		typesBuilder.addType('ShopItemCategory', 'typeof SHOP_CATEGORIES[number]')

		// Generate ShopItem interface
		typesBuilder.addInterface('ShopItem', [
			{ name: 'hrid', type: 'ShopItemHrid', optional: false },
			{ name: 'category', type: 'ShopItemCategory', optional: false },
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'costs', type: 'Cost[]', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'ShopItem', 'type')
		this.moduleBuilder.addExport('types', 'ShopItemHrid', 'type')
		this.moduleBuilder.addExport('types', 'ShopItemCategory', 'type')
		this.moduleBuilder.addExport('types', 'Cost', 'type')
	}

	protected override generateConstants(
		entities: Record<string, ShopItem>,
	): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate shop item HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('SHOPITEM_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'SHOPITEM_HRIDS', 'const')

		// Generate shop categories
		const categories = Array.from(this.shopCategories).sort()
		constantsBuilder.addConstArray('SHOP_CATEGORIES', categories, true)
		this.moduleBuilder.addExport('constants', 'SHOP_CATEGORIES', 'const')

		// Generate currency items
		const currencies = Array.from(this.currencyItems).sort()
		constantsBuilder.addConstArray('CURRENCY_ITEMS', currencies, true)
		this.moduleBuilder.addExport('constants', 'CURRENCY_ITEMS', 'const')
	}

	protected override generateLazyData(
		entities: Record<string, ShopItem>,
	): void {
		const dataBuilder = this.moduleBuilder.getFile('data')

		// Import types
		dataBuilder.addImport('./types', ['ShopItem', 'ShopItemHrid', 'Cost'], true)
		dataBuilder.addImport('../items/types', ['ItemHrid'], true)

		// Generate lazy map
		const entries = Object.entries(entities).map(
			([hrid, item]): [string, any] => {
				// Format costs properly
				const costs = item.costs.map((cost) => ({
					itemHrid: cost.itemHrid,
					count: cost.count,
				}))

				return [
					hrid,
					{
						...item,
						costs: costs,
					},
				]
			},
		)

		dataBuilder.addLazyMap(
			'SHOPITEMS',
			'getShopItemsMap',
			'loadShopItems',
			'ShopItemHrid',
			'ShopItem',
			entries,
		)

		this.moduleBuilder.addExport('data', 'getShopItemsMap')
	}

	protected override generateLookups(entities: Record<string, ShopItem>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['ShopItemHrid', 'ShopItemCategory'], true)
		lookupsBuilder.addImport('../items/types', ['ItemHrid'], true)

		// Shop items by category
		const byCategory: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			if (!byCategory[item.category]) {
				byCategory[item.category] = []
			}
			byCategory[item.category]!.push(hrid)
		})

		lookupsBuilder.addConstVariable(
			'SHOP_ITEMS_BY_CATEGORY',
			'Partial<Record<ShopItemCategory, readonly ShopItemHrid[]>>',
			byCategory,
		)
		this.moduleBuilder.addExport('lookups', 'SHOP_ITEMS_BY_CATEGORY')

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

		lookupsBuilder.addConstVariable(
			'SHOP_ITEMS_BY_CURRENCY',
			'Partial<Record<ItemHrid, readonly ShopItemHrid[]>>',
			byCurrency,
		)
		this.moduleBuilder.addExport('lookups', 'SHOP_ITEMS_BY_CURRENCY')

		// Shop items by item sold
		const byItemSold: Record<string, string[]> = {}
		Object.entries(entities).forEach(([hrid, item]) => {
			if (!byItemSold[item.itemHrid]) {
				byItemSold[item.itemHrid] = []
			}
			byItemSold[item.itemHrid]!.push(hrid)
		})

		lookupsBuilder.addConstVariable(
			'SHOP_ITEMS_BY_ITEM_SOLD',
			'Partial<Record<ItemHrid, readonly ShopItemHrid[]>>',
			byItemSold,
		)
		this.moduleBuilder.addExport('lookups', 'SHOP_ITEMS_BY_ITEM_SOLD')
	}

	protected override generateUtilities(): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types
		utilsBuilder.addImport(
			'./types',
			['ShopItem', 'ShopItemHrid', 'ShopItemCategory'],
			true,
		)
		utilsBuilder.addImport('../items/types', ['ItemHrid'], true)
		utilsBuilder.addImport('./data', ['getShopItemsMap'], false)
		utilsBuilder.addImport(
			'./constants',
			['SHOPITEM_HRIDS', 'SHOP_CATEGORIES'],
			false,
		)
		utilsBuilder.addImport(
			'./lookups',
			[
				'SHOP_ITEMS_BY_CATEGORY',
				'SHOP_ITEMS_BY_CURRENCY',
				'SHOP_ITEMS_BY_ITEM_SOLD',
			],
			false,
		)

		// Type guard
		utilsBuilder.addFunction(
			'isShopItemHrid',
			[{ name: 'value', type: 'string' }],
			'value is ShopItemHrid',
			(writer) => {
				writer.writeLine(
					'return SHOPITEM_HRIDS.includes(value as ShopItemHrid)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'isShopItemHrid')

		// Basic getters
		utilsBuilder.addFunction(
			'getShopItem',
			[{ name: 'hrid', type: 'ShopItemHrid' }],
			'ShopItem | undefined',
			(writer) => {
				writer.writeLine('return getShopItemsMap().get(hrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getShopItem')

		utilsBuilder.addFunction(
			'requireShopItem',
			[{ name: 'hrid', type: 'ShopItemHrid' }],
			'ShopItem',
			(writer) => {
				writer.writeLine('const shopItem = getShopItemsMap().get(hrid)')
				writer.writeLine('if (!shopItem) {')
				writer.writeLine(`  throw new Error(\`ShopItem not found: \${hrid}\`)`)
				writer.writeLine('}')
				writer.writeLine('return shopItem')
			},
		)
		this.moduleBuilder.addExport('utils', 'requireShopItem')

		utilsBuilder.addFunction('getAllShopItems', [], 'ShopItem[]', (writer) => {
			writer.writeLine('return Array.from(getShopItemsMap().values())')
		})
		this.moduleBuilder.addExport('utils', 'getAllShopItems')

		// Get shop items by category
		utilsBuilder.addFunction(
			'getShopItemsByCategory',
			[{ name: 'category', type: 'ShopItemCategory' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine('const hrids = SHOP_ITEMS_BY_CATEGORY[category] || []')
				writer.writeLine(
					'return hrids.map(hrid => getShopItemsMap().get(hrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getShopItemsByCategory')

		// Get shop items by currency
		utilsBuilder.addFunction(
			'getShopItemsByCurrency',
			[{ name: 'currency', type: 'ItemHrid' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine('const hrids = SHOP_ITEMS_BY_CURRENCY[currency] || []')
				writer.writeLine(
					'return hrids.map(hrid => getShopItemsMap().get(hrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getShopItemsByCurrency')

		// Get shop items that sell a specific item
		utilsBuilder.addFunction(
			'getShopItemsForItem',
			[{ name: 'itemHrid', type: 'ItemHrid' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine(
					'const hrids = SHOP_ITEMS_BY_ITEM_SOLD[itemHrid] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => getShopItemsMap().get(hrid)!).filter(Boolean)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getShopItemsForItem')

		// Check if player can afford shop item
		utilsBuilder.addFunction(
			'canAffordShopItem',
			[
				{ name: 'item', type: 'ShopItem' },
				{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('return item.costs.every(cost =>')
				writer.writeLine('  (inventory[cost.itemHrid] || 0) >= cost.count')
				writer.writeLine(')')
			},
		)
		this.moduleBuilder.addExport('utils', 'canAffordShopItem')

		// Calculate total cost for multiple shop items
		utilsBuilder.addFunction(
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
				writer.writeLine('    const currency = cost.itemHrid')
				writer.writeLine(
					'    totalCost[currency] = (totalCost[currency] || 0) + cost.count',
				)
				writer.writeLine('  })')
				writer.writeLine('})')
				writer.writeLine('')
				writer.writeLine('return totalCost')
			},
		)
		this.moduleBuilder.addExport('utils', 'calculateTotalShopCost')

		// Find cheapest shop item for an item hrid
		utilsBuilder.addFunction(
			'findCheapestShopItem',
			[
				{ name: 'itemHrid', type: 'ItemHrid' },
				{
					name: 'preferredCurrency',
					type: 'ItemHrid | undefined',
					default: undefined,
				},
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
		this.moduleBuilder.addExport('utils', 'findCheapestShopItem', 'function')

		// Sort shop items by sort index
		utilsBuilder.addFunction(
			'sortShopItemsByIndex',
			[{ name: 'items', type: 'ShopItem[]' }],
			'ShopItem[]',
			(writer) => {
				writer.writeLine(
					'return [...items].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'sortShopItemsByIndex', 'function')

		// Group shop items by category
		utilsBuilder.addFunction(
			'groupShopItemsByCategory',
			[],
			'Map<ShopItemCategory, ShopItem[]>',
			(writer) => {
				writer.writeLine('const grouped = new Map<ShopItemCategory, ShopItem[]>()')
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
		this.moduleBuilder.addExport(
			'utils',
			'groupShopItemsByCategory',
			'function',
		)
	}
}
