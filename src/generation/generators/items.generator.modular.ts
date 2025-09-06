import { ModularBaseGenerator } from '../core/generator.base.modular'
import type { PropertyDefinition } from '../core/ast-builder'

// Shared types - these interfaces are defined in the shared module
// They will be properly imported in generateTypes() method
interface LevelRequirement {
	skillHrid: string
	level: number
}
interface ItemCost {
	itemHrid: string
	count: number
}
interface Stats {
	[key: string]: number
}

interface AlchemyDetail {
	bulkMultiplier: number
	isCoinifiable: boolean
	decomposeItems?: ItemCost[]
	transmuteSuccessRate?: number
	transmuteDropTable?: Array<{
		itemHrid: string
		dropRate: number
		minCount: number
		maxCount: number
	}>
}

interface EquipmentDetail {
	type: string
	levelRequirements?: LevelRequirement[]
	combatStats?: Stats
	noncombatStats?: Stats
	combatEnhancementBonuses?: Stats
	noncombatEnhancementBonuses?: Stats
}

interface Item {
	hrid: string
	name: string
	description: string
	categoryHrid: string
	sellPrice: number
	isTradable: boolean
	itemLevel: number
	sortIndex: number
	enhancementCosts?: ItemCost[]
	protectionItemHrids?: string[]
	alchemyDetail?: AlchemyDetail
	equipmentDetail?: EquipmentDetail
}

/**
 * Modular Items Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularItemsGenerator extends ModularBaseGenerator<Item> {
	// Collect unique values for lookups
	private itemsByCategory: Map<string, string[]> = new Map()
	private itemsByEquipmentType: Map<string, string[]> = new Map()
	private itemsByLevel: Map<number, string[]> = new Map()
	private itemsByMarketplaceCategory: Map<string, string[]> = new Map()
	private tradableItems: string[] = []
	private nonTradableItems: string[] = []
	private protectionItems: string[] = []
	private enhancementItems: string[] = []
	private equipmentItems: string[] = []
	private alchemicalItems: string[] = []

	constructor() {
		super({
			entityName: 'Item',
			entityNamePlural: 'Items',
			sourceKey: 'itemDetailMap',
			outputPath: './src/generated/items/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Item> {
		const items: Record<string, Item> = {}
		const itemDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(itemDetailMap)) {
			const item = this.extractItem(hrid as string, data as any)
			items[hrid] = item
			this.collectForLookups(item)
		}

		console.log(`  📦 Extracted ${Object.keys(items).length} items`)
		console.log(`  📊 ${this.itemsByCategory.size} categories`)
		console.log(`  ⚔️ ${this.itemsByEquipmentType.size} equipment types`)
		console.log(`  💰 ${this.tradableItems.length} tradable items`)

		return items
	}

	private extractItem(hrid: string, data: any): Item {
		const item: Item = {
			hrid,
			name: data.name || '',
			description: data.description || '',
			categoryHrid: data.categoryHrid,
			sellPrice: typeof data.sellPrice === 'number' ? data.sellPrice : 0,
			isTradable: data.isTradable === true,
			itemLevel: typeof data.itemLevel === 'number' ? data.itemLevel : 0,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}

		// Optional enhancement costs
		if (data.enhancementCosts && data.enhancementCosts.length > 0) {
			item.enhancementCosts = data.enhancementCosts.map((cost: any) => ({
				itemHrid: cost.itemHrid,
				count: typeof cost.count === 'number' ? cost.count : 0,
			}))
		}

		// Optional protection items
		if (data.protectionItemHrids && data.protectionItemHrids.length > 0) {
			item.protectionItemHrids = data.protectionItemHrids
		}

		// Optional alchemy details
		if (data.alchemyDetail) {
			const alchemy = data.alchemyDetail
			item.alchemyDetail = {
				bulkMultiplier:
					typeof alchemy.bulkMultiplier === 'number'
						? alchemy.bulkMultiplier
						: 1,
				isCoinifiable: alchemy.isCoinifiable === true,
				decomposeItems:
					alchemy.decomposeItems && alchemy.decomposeItems.length > 0
						? alchemy.decomposeItems.map((di: any) => ({
								itemHrid: di.itemHrid,
								count: typeof di.count === 'number' ? di.count : 0,
							}))
						: undefined,
				transmuteSuccessRate:
					typeof alchemy.transmuteSuccessRate === 'number'
						? alchemy.transmuteSuccessRate
						: 0,
				transmuteDropTable:
					alchemy.transmuteDropTable && alchemy.transmuteDropTable.length > 0
						? alchemy.transmuteDropTable.map((drop: any) => ({
								itemHrid: drop.itemHrid,
								dropRate: typeof drop.dropRate === 'number' ? drop.dropRate : 0,
								minCount: typeof drop.minCount === 'number' ? drop.minCount : 1,
								maxCount: typeof drop.maxCount === 'number' ? drop.maxCount : 1,
							}))
						: undefined,
			}
		}

		// Optional equipment details
		if (data.equipmentDetail) {
			const equip = data.equipmentDetail
			item.equipmentDetail = {
				type: equip.type,
				levelRequirements:
					equip.levelRequirements && equip.levelRequirements.length > 0
						? equip.levelRequirements.map((req: any) => ({
								skillHrid: req.skillHrid,
								level: typeof req.level === 'number' ? req.level : 0,
							}) as LevelRequirement)
						: undefined,
				combatStats: this.extractStats(equip.combatStats),
				noncombatStats: this.extractStats(equip.noncombatStats),
				combatEnhancementBonuses: this.extractStats(
					equip.combatEnhancementBonuses,
				),
				noncombatEnhancementBonuses: this.extractStats(
					equip.noncombatEnhancementBonuses,
				),
			}
		}

		return item
	}

	private extractStats(stats: any): Stats | undefined {
		if (!stats || Object.keys(stats).length === 0) return undefined

		const result: any = {}
		for (const [key, value] of Object.entries(stats)) {
			if (typeof value === 'number' && value !== 0) {
				result[key] = value
			}
		}

		return Object.keys(result).length > 0 ? result : undefined
	}

	private collectForLookups(item: Item): void {
		// By category
		if (!this.itemsByCategory.has(item.categoryHrid)) {
			this.itemsByCategory.set(item.categoryHrid, [])
		}
		this.itemsByCategory.get(item.categoryHrid)!.push(item.hrid)

		// By equipment type
		if (item.equipmentDetail?.type) {
			if (!this.itemsByEquipmentType.has(item.equipmentDetail.type)) {
				this.itemsByEquipmentType.set(item.equipmentDetail.type, [])
			}
			this.itemsByEquipmentType.get(item.equipmentDetail.type)!.push(item.hrid)
			// Also add to equipment items
			this.equipmentItems.push(item.hrid)
		}

		// By level
		if (!this.itemsByLevel.has(item.itemLevel)) {
			this.itemsByLevel.set(item.itemLevel, [])
		}
		this.itemsByLevel.get(item.itemLevel)!.push(item.hrid)

		// Tradable/Non-tradable
		if (item.isTradable) {
			this.tradableItems.push(item.hrid)
		} else {
			this.nonTradableItems.push(item.hrid)
		}

		// Protection items (items that can be used as protection)
		if (
			item.hrid.includes('protection_stone') ||
			item.hrid.includes('augment_stone') ||
			item.hrid.includes('divine_blessing')
		) {
			this.protectionItems.push(item.hrid)
		}

		// Enhancement items (items used for enhancement)
		if (item.enhancementCosts && item.enhancementCosts.length > 0) {
			// Items that can be enhanced typically use enhancement stones
			item.enhancementCosts.forEach((cost) => {
				if (!this.enhancementItems.includes(cost.itemHrid)) {
					this.enhancementItems.push(cost.itemHrid)
				}
			})
		}

		// Alchemical items (items with alchemy details)
		if (item.alchemyDetail) {
			this.alchemicalItems.push(item.hrid)
		}

		// Marketplace categorization (simplified based on category and type)
		const marketplaceCategory = this.getMarketplaceCategory(item)
		if (!this.itemsByMarketplaceCategory.has(marketplaceCategory)) {
			this.itemsByMarketplaceCategory.set(marketplaceCategory, [])
		}
		this.itemsByMarketplaceCategory.get(marketplaceCategory)!.push(item.hrid)
	}

	private getMarketplaceCategory(item: Item): string {
		// Map item categories to marketplace categories
		if (item.equipmentDetail) {
			if (item.equipmentDetail.type.includes('accessory')) {
				return 'Accessories'
			}
			if (item.equipmentDetail.type.includes('tool')) {
				return 'Tools'
			}
			return 'Equipment'
		}

		const categoryHrid = item.categoryHrid
		if (categoryHrid.includes('resource')) return 'Resources'
		if (categoryHrid.includes('consumable')) return 'Consumables'
		if (categoryHrid.includes('book')) return 'Books'
		if (categoryHrid.includes('key')) return 'Keys'

		// Default to Resources
		return 'Resources'
	}

	protected override generateTypes(entities: Record<string, Item>): void {
		// Import dependencies
		const typesBuilder = this.moduleBuilder.getFile('types')
		// Import types from other modules (DO NOT re-export - domain boundary)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		typesBuilder.addImport('../equipmenttypes/types', ['EquipmentTypeHrid'], true)
		typesBuilder.addImport('../itemcategories/types', ['ItemCategoryHrid'], true)

		// Marketplace categories
		typesBuilder.addType(
			'MarketplaceCategory',
			"'Resources' | 'Consumables' | 'Books' | 'Keys' | 'Equipment' | 'Accessories' | 'Tools'",
		)

		// Import shared types from shared module
		typesBuilder.addImport('../sharedtypes/types', ['LevelRequirement', 'ItemCost', 'Stats'], true)
		
		// Re-export ItemCost since it's used in utils
		typesBuilder.addComment('Re-export ItemCost for use in utils')
		typesBuilder.addNamedExports({
			'ItemCost': { from: '../sharedtypes/types', isType: true }
		})

		// AlchemyDetail interface
		const alchemyProps: PropertyDefinition[] = [
			{ name: 'bulkMultiplier', type: 'number', optional: false },
			{ name: 'isCoinifiable', type: 'boolean', optional: false },
			{
				name: 'decomposeItems',
				type: 'ItemCost[] | undefined',
				optional: true,
			},
			{ name: 'transmuteSuccessRate', type: 'number', optional: true },
			{
				name: 'transmuteDropTable',
				type: 'Array<{ itemHrid: ItemHrid; dropRate: number; minCount: number; maxCount: number }> | undefined',
				optional: true,
			},
		]
		this.moduleBuilder.addInterface('AlchemyDetail', alchemyProps)

		// EquipmentDetail interface
		const equipmentProps: PropertyDefinition[] = [
			{ name: 'type', type: 'EquipmentTypeHrid', optional: false },
			{
				name: 'levelRequirements',
				type: 'LevelRequirement[] | undefined',
				optional: true,
			},
			{ name: 'combatStats', type: 'Stats | undefined', optional: true },
			{ name: 'noncombatStats', type: 'Stats | undefined', optional: true },
			{
				name: 'combatEnhancementBonuses',
				type: 'Stats | undefined',
				optional: true,
			},
			{
				name: 'noncombatEnhancementBonuses',
				type: 'Stats | undefined',
				optional: true,
			},
		]
		this.moduleBuilder.addInterface('EquipmentDetail', equipmentProps)

		// Item interface
		const itemProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'ItemHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'description', type: 'string', optional: false },
			{ name: 'categoryHrid', type: 'ItemCategoryHrid', optional: false },
			{ name: 'sellPrice', type: 'number', optional: false },
			{ name: 'isTradable', type: 'boolean', optional: false },
			{ name: 'itemLevel', type: 'number', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
			{
				name: 'enhancementCosts',
				type: 'ItemCost[] | undefined',
				optional: true,
			},
			{
				name: 'protectionItemHrids',
				type: 'ItemHrid[] | undefined',
				optional: true,
			},
			{
				name: 'alchemyDetail',
				type: 'AlchemyDetail | undefined',
				optional: true,
			},
			{
				name: 'equipmentDetail',
				type: 'EquipmentDetail | undefined',
				optional: true,
			},
		]
		this.moduleBuilder.addInterface('Item', itemProps)
		
		// Re-export ItemCost from shared types since it's used in the utils
		this.moduleBuilder.addExport({
			name: 'ItemCost',
			source: './types',
			isType: true,
		})
	}

	protected override generateLookups(entities: Record<string, Item>): void {
		// Items by category
		const categoryLookup: Record<string, readonly string[]> = {}
		this.itemsByCategory.forEach((items, category) => {
			categoryLookup[category] = items.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'ITEMS_BY_CATEGORY',
			categoryLookup,
			'string',
			'readonly ItemHrid[]',
		)

		// Items by equipment type
		const equipmentLookup: Record<string, readonly string[]> = {}
		this.itemsByEquipmentType.forEach((items, type) => {
			equipmentLookup[type] = items.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'ITEMS_BY_EQUIPMENT_TYPE',
			equipmentLookup,
			'string',
			'readonly ItemHrid[]',
		)

		// Tradable items - add to lookups file instead of constants
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')
		lookupsBuilder.addImport(
			'./types',
			['ItemHrid', 'MarketplaceCategory'],
			true,
		)
		lookupsBuilder.addConstArray(
			'TRADABLE_ITEM_HRIDS',
			this.tradableItems.sort(),
			true,
		)
		// Export from module
		this.moduleBuilder.addExport({
			name: 'TRADABLE_ITEM_HRIDS',
			source: './lookups',
		})

		// Non-tradable items
		lookupsBuilder.addConstArray(
			'NON_TRADABLE_ITEM_HRIDS',
			this.nonTradableItems.sort(),
			true,
		)
		this.moduleBuilder.addExport({
			name: 'NON_TRADABLE_ITEM_HRIDS',
			source: './lookups',
		})

		// Protection items
		lookupsBuilder.addConstArray(
			'PROTECTION_ITEM_HRIDS',
			this.protectionItems.sort(),
			true,
		)
		this.moduleBuilder.addExport({
			name: 'PROTECTION_ITEM_HRIDS',
			source: './lookups',
		})

		// Enhancement items
		lookupsBuilder.addConstArray(
			'ENHANCEMENT_ITEM_HRIDS',
			this.enhancementItems.sort(),
			true,
		)
		this.moduleBuilder.addExport({
			name: 'ENHANCEMENT_ITEM_HRIDS',
			source: './lookups',
		})

		// Equipment items
		lookupsBuilder.addConstArray(
			'EQUIPMENT_ITEM_HRIDS',
			this.equipmentItems.sort(),
			true,
		)
		this.moduleBuilder.addExport({
			name: 'EQUIPMENT_ITEM_HRIDS',
			source: './lookups',
		})

		// Alchemical items
		lookupsBuilder.addConstArray(
			'ALCHEMICAL_ITEM_HRIDS',
			this.alchemicalItems.sort(),
			true,
		)
		this.moduleBuilder.addExport({
			name: 'ALCHEMICAL_ITEM_HRIDS',
			source: './lookups',
		})
	}

	protected override generateUtilities(entities: Record<string, Item>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Add item-specific utilities
		const getMapName = 'getItemsMap'

		// Get items by category
		this.moduleBuilder.addUtilityFunction(
			'getItemsByCategory',
			[{ name: 'categoryHrid', type: 'string' }],
			'Item[]',
			(writer) => {
				writer.writeLine(
					'const itemHrids = ITEMS_BY_CATEGORY[categoryHrid] || []',
				)
				writer.writeLine(
					'return itemHrids.map(hrid => getItem(hrid)).filter(Boolean) as Item[]',
				)
			},
			[
				{ from: './lookups', names: ['ITEMS_BY_CATEGORY'] },
				// No need to import getItem - it's in the same file
				{ from: './types', names: ['Item'], isType: true },
			],
		)

		// Get items by equipment type
		this.moduleBuilder.addUtilityFunction(
			'getItemsByEquipmentType',
			[{ name: 'type', type: 'string' }],
			'Item[]',
			(writer) => {
				writer.writeLine(
					'const itemHrids = ITEMS_BY_EQUIPMENT_TYPE[type] || []',
				)
				writer.writeLine(
					'return itemHrids.map(hrid => getItem(hrid)).filter(Boolean) as Item[]',
				)
			},
			[
				{ from: './lookups', names: ['ITEMS_BY_EQUIPMENT_TYPE'] },
				// No need to import getItem - it's in the same file
				{ from: './types', names: ['Item'], isType: true },
			],
		)

		// Get tradable items
		this.moduleBuilder.addUtilityFunction(
			'getTradableItems',
			[],
			'Item[]',
			(writer) => {
				writer.writeLine(
					'return TRADABLE_ITEM_HRIDS.map(hrid => getItem(hrid)).filter(Boolean) as Item[]',
				)
			},
			[
				{ from: './lookups', names: ['TRADABLE_ITEM_HRIDS'] },
				// No need to import getItem - it's in the same file
				{ from: './types', names: ['Item'], isType: true },
			],
		)

		// Sort items by index
		this.moduleBuilder.addUtilityFunction(
			'sortItemsByIndex',
			[{ name: 'items', type: 'Item[]' }],
			'Item[]',
			(writer) => {
				writer.writeLine(
					'return [...items].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
			[{ from: './types', names: ['Item'], isType: true }],
		)

		// Search items by name
		this.moduleBuilder.addUtilityFunction(
			'searchItemsByName',
			[{ name: 'query', type: 'string' }],
			'Item[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('return getAllItems().filter(item => ')
				writer.writeLine('  item.name.toLowerCase().includes(lowerQuery) ||')
				writer.writeLine(
					'  item.description.toLowerCase().includes(lowerQuery)',
				)
				writer.writeLine(')')
			},
			[
				// No need to import getAllItems - it's in the same file
				{ from: './types', names: ['Item'], isType: true },
			],
		)

		// Check if item is equipment
		this.moduleBuilder.addUtilityFunction(
			'isEquipment',
			[{ name: 'item', type: 'Item' }],
			'boolean',
			(writer) => {
				writer.writeLine('return item.equipmentDetail !== undefined')
			},
			[{ from: './types', names: ['Item'], isType: true }],
		)

		// Check if item is tradable
		this.moduleBuilder.addUtilityFunction(
			'isTradable',
			[{ name: 'item', type: 'Item' }],
			'boolean',
			(writer) => {
				writer.writeLine('return item.isTradable')
			},
			[{ from: './types', names: ['Item'], isType: true }],
		)

		// Get items for a specific skill
		this.moduleBuilder.addUtilityFunction(
			'getItemsForSkill',
			[{ name: 'skillHrid', type: 'string' }],
			'Item[]',
			(writer) => {
				writer.writeLine('return getAllItems().filter(item => {')
				writer.writeLine('  if (item.equipmentDetail?.levelRequirements) {')
				writer.writeLine(
					'    return item.equipmentDetail.levelRequirements.some(req => req.skillHrid === skillHrid)',
				)
				writer.writeLine('  }')
				writer.writeLine('  return false')
				writer.writeLine('})')
			},
			[{ from: './types', names: ['Item'], isType: true }],
		)

		// Calculate enhancement cost at level
		this.moduleBuilder.addUtilityFunction(
			'calculateEnhancementCost',
			[
				{ name: 'item', type: 'Item' },
				{ name: 'level', type: 'number' },
			],
			'ItemCost[] | undefined',
			(writer) => {
				writer.writeLine(
					'if (!item.enhancementCosts || level <= 0) return undefined',
				)
				writer.writeLine('// Enhancement costs typically scale with level')
				writer.writeLine('return item.enhancementCosts.map(cost => ({')
				writer.writeLine('  itemHrid: cost.itemHrid,')
				writer.writeLine('  count: cost.count * level')
				writer.writeLine('}))')
			},
			[{ from: './types', names: ['Item', 'ItemCost'], isType: true }],
		)

		// Get item value for sorting/comparison
		this.moduleBuilder.addUtilityFunction(
			'getItemValue',
			[{ name: 'item', type: 'Item' }],
			'number',
			(writer) => {
				writer.writeLine('// Calculate item value based on various factors')
				writer.writeLine('let value = item.sellPrice')
				writer.writeLine('if (item.itemLevel > 0) value += item.itemLevel * 10')
				writer.writeLine('if (item.equipmentDetail) value += 100')
				writer.writeLine('if (item.alchemyDetail) value += 50')
				writer.writeLine('return value')
			},
			[{ from: './types', names: ['Item'], isType: true }],
		)

		// Get marketplace category for an item
		this.moduleBuilder.addUtilityFunction(
			'getMarketplaceCategory',
			[{ name: 'item', type: 'Item' }],
			'MarketplaceCategory',
			(writer) => {
				writer.writeLine('if (item.equipmentDetail) {')
				writer.writeLine(
					'  if (item.equipmentDetail.type.includes("accessory")) return "Accessories"',
				)
				writer.writeLine(
					'  if (item.equipmentDetail.type.includes("tool")) return "Tools"',
				)
				writer.writeLine('  return "Equipment"')
				writer.writeLine('}')
				writer.writeLine('const categoryHrid = item.categoryHrid')
				writer.writeLine(
					'if (categoryHrid.includes("resource")) return "Resources"',
				)
				writer.writeLine(
					'if (categoryHrid.includes("consumable")) return "Consumables"',
				)
				writer.writeLine('if (categoryHrid.includes("book")) return "Books"')
				writer.writeLine('if (categoryHrid.includes("key")) return "Keys"')
				writer.writeLine('return "Resources" // Default')
			},
			[
				{
					from: './types',
					names: ['Item', 'MarketplaceCategory'],
					isType: true,
				},
			],
		)
	}
}
