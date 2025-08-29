import { BaseGenerator } from '../core/generator.base'

/**
 * Items are the core entities in the game - resources, equipment, food, drinks, etc.
 * This generator extracts all 894 items with full type safety for categories,
 * equipment types, and cross-references to skills and other items.
 */
export class ItemsGenerator extends BaseGenerator<Item> {
	// Collect unique values for maximum type safety
	private itemCategories: Set<string> = new Set()
	private equipmentTypes: Set<string> = new Set()
	private itemHrids: Set<string> = new Set()
	private protectionItemHrids: Set<string> = new Set()
	private enhancementItemHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'Item',
			entityNamePlural: 'Items',
			sourceKey: 'itemDetailMap',
			outputPath: './src/generated/types/items.ts',
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
			this.collectUniqueValues(item)
		}

		console.log(`  📦 Extracted ${Object.keys(items).length} items`)
		console.log(`  📊 ${this.itemCategories.size} categories`)
		console.log(`  ⚔️ ${this.equipmentTypes.size} equipment types`)
		console.log(`  🔗 ${this.itemHrids.size} item cross-references`)

		return items
	}

	private extractItem(hrid: string, data: any): Item {
		const item: Item = {
			hrid: hrid as ItemHrid,
			name: data.name || '',
			description: data.description || '',
			categoryHrid: data.categoryHrid as ItemCategoryHrid,
			sellPrice: data.sellPrice || 0,
			isTradable: data.isTradable || false,
			itemLevel: data.itemLevel || 0,
			sortIndex: data.sortIndex || 0,
		}

		// Optional enhancement costs
		if (data.enhancementCosts && data.enhancementCosts.length > 0) {
			item.enhancementCosts = data.enhancementCosts.map((cost: any) => ({
				itemHrid: cost.itemHrid as ItemHrid,
				count: cost.count || 0,
			}))
		}

		// Optional protection items
		if (data.protectionItemHrids && data.protectionItemHrids.length > 0) {
			item.protectionItemHrids = data.protectionItemHrids as ItemHrid[]
		}

		// Optional alchemy details
		if (data.alchemyDetail) {
			const alchemy = data.alchemyDetail
			item.alchemyDetail = {
				bulkMultiplier: alchemy.bulkMultiplier || 1,
				isCoinifiable: alchemy.isCoinifiable || false,
				decomposeItems:
					alchemy.decomposeItems && alchemy.decomposeItems.length > 0
						? alchemy.decomposeItems.map((di: any) => ({
								itemHrid: di.itemHrid as ItemHrid,
								count: di.count || 0,
							}))
						: undefined,
				transmuteSuccessRate: alchemy.transmuteSuccessRate || 0,
				transmuteDropTable:
					alchemy.transmuteDropTable && alchemy.transmuteDropTable.length > 0
						? alchemy.transmuteDropTable.map((drop: any) => ({
								itemHrid: drop.itemHrid as ItemHrid,
								dropRate: drop.dropRate || 0,
								minCount: drop.minCount || 1,
								maxCount: drop.maxCount || 1,
							}))
						: undefined,
			}
		}

		// Optional equipment details
		if (data.equipmentDetail) {
			const equip = data.equipmentDetail
			item.equipmentDetail = {
				type: equip.type as EquipmentTypeHrid,
				levelRequirements:
					equip.levelRequirements && equip.levelRequirements.length > 0
						? equip.levelRequirements.map((req: any) => ({
								skillHrid: req.skillHrid as SkillHrid,
								level: req.level || 0,
							}))
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
			if (value !== 0 && value !== null && value !== undefined) {
				result[key] = value
			}
		}

		return Object.keys(result).length > 0 ? result : undefined
	}

	protected override collectUniqueValues(item: Item): void {
		// Collect item HRID
		this.itemHrids.add(item.hrid)

		// Collect category
		this.itemCategories.add(item.categoryHrid)

		// Collect enhancement items
		if (item.enhancementCosts) {
			for (const cost of item.enhancementCosts) {
				this.enhancementItemHrids.add(cost.itemHrid)
				this.itemHrids.add(cost.itemHrid)
			}
		}

		// Collect protection items
		if (item.protectionItemHrids) {
			for (const protHrid of item.protectionItemHrids) {
				this.protectionItemHrids.add(protHrid)
				this.itemHrids.add(protHrid)
			}
		}

		// Collect alchemy items
		if (item.alchemyDetail) {
			if (item.alchemyDetail.decomposeItems) {
				for (const di of item.alchemyDetail.decomposeItems) {
					this.itemHrids.add(di.itemHrid)
				}
			}
			if (item.alchemyDetail.transmuteDropTable) {
				for (const drop of item.alchemyDetail.transmuteDropTable) {
					this.itemHrids.add(drop.itemHrid)
				}
			}
		}

		// Collect equipment details
		if (item.equipmentDetail) {
			this.equipmentTypes.add(item.equipmentDetail.type)
			// Skill requirements are now imported from skills.ts
		}
	}

	protected override generateInterfaces(items: Record<string, Item>): void {
		// Add imports from other generated files
		this.builder.addImport('./skills', ['SkillHrid'], true)
		this.builder.addImport('./actions', ['LevelRequirement'], true)
		this.builder.addImport('./equipment-types', ['EquipmentTypeHrid'], true)
		this.builder.addImport('./item-categories', ['ItemCategoryHrid'], true)

		// First generate all the type constants
		this.generateTypeConstants()

		// Item cost interface (for enhancement and decompose)
		this.builder.addInterface('ItemCost', [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'count', type: 'number', optional: false },
		])

		// Drop table entry interface
		this.builder.addInterface('DropTableEntry', [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'dropRate', type: 'number', optional: false },
			{ name: 'minCount', type: 'number', optional: false },
			{ name: 'maxCount', type: 'number', optional: false },
		])

		// Alchemy detail interface
		this.builder.addInterface('AlchemyDetail', [
			{ name: 'bulkMultiplier', type: 'number', optional: false },
			{ name: 'isCoinifiable', type: 'boolean', optional: false },
			{
				name: 'decomposeItems',
				type: 'ItemCost[] | undefined',
				optional: true,
			},
			{
				name: 'transmuteSuccessRate',
				type: 'number',
				optional: false,
			},
			{
				name: 'transmuteDropTable',
				type: 'DropTableEntry[] | undefined',
				optional: true,
			},
		])

		// LevelRequirement interface is imported from actions.ts

		// Stats interface (flexible for combat and noncombat stats)
		this.builder.addInterface('Stats', [
			{ name: '[key: string]', type: 'any', optional: false },
		])

		// Equipment detail interface
		this.builder.addInterface('EquipmentDetail', [
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
		])

		// Marketplace Category type (7 official marketplace categories)
		this.builder.addTypeAlias(
			'MarketplaceCategory',
			"'Resources' | 'Consumables' | 'Books' | 'Keys' | 'Equipment' | 'Accessories' | 'Tools'",
		)

		// Main Item interface
		this.builder.addInterface('Item', [
			{
				name: 'hrid',
				type: 'ItemHrid',
				optional: false,
				description: 'Human readable ID for the item',
			},
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
		])
	}

	private generateTypeConstants(): void {
		// Item categories are imported from item-categories.ts

		// Equipment types are imported from equipment-types.ts

		// Protection items
		const protectionItems = Array.from(this.protectionItemHrids).sort()
		this.builder.addConstArray('PROTECTION_ITEM_HRIDS', protectionItems)

		// Enhancement items
		const enhancementItems = Array.from(this.enhancementItemHrids).sort()
		this.builder.addConstArray('ENHANCEMENT_ITEM_HRIDS', enhancementItems)
	}

	protected override generateUtilities(items: Record<string, Item>): void {
		super.generateUtilities(items)

		// Generate lookup maps
		this.generateLookupMaps(items)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private getMarketplaceCategoryForItem(item: Item): string {
		// First check if it's equipment-based (Equipment, Accessories, Tools)
		if (item.equipmentDetail) {
			const equipType = item.equipmentDetail.type.toLowerCase()

			// Tools: equipment types containing "tool"
			if (equipType.includes('tool')) {
				return 'Tools'
			}

			// Accessories: equipment types for jewelry and accessories
			if (
				equipType.includes('neck') ||
				equipType.includes('ring') ||
				equipType.includes('ear') ||
				equipType.includes('charm') ||
				equipType.includes('amulet') ||
				equipType.includes('necklace') ||
				equipType.includes('earring')
			) {
				return 'Accessories'
			}

			// Everything else with equipmentDetail is Equipment
			return 'Equipment'
		}

		// Non-equipment items categorized by exact categoryHrid match
		switch (item.categoryHrid) {
			case '/item_categories/ability_book':
				return 'Books'
			case '/item_categories/key':
				return 'Keys'
			case '/item_categories/food':
			case '/item_categories/drink':
				return 'Consumables'
			case '/item_categories/resource':
			case '/item_categories/loot':
			case '/item_categories/currency':
			default:
				return 'Resources'
		}
	}

	private generateLookupMaps(items: Record<string, Item>): void {
		// Items by category
		const byCategory: Record<string, string[]> = {}
		for (const item of Object.values(items)) {
			if (!byCategory[item.categoryHrid]) {
				byCategory[item.categoryHrid] = []
			}
			byCategory[item.categoryHrid]!.push(item.hrid)
		}
		this.builder.addConstVariable(
			'ITEMS_BY_CATEGORY',
			'Partial<Record<ItemCategoryHrid, readonly ItemHrid[]>>',
			JSON.stringify(byCategory, null, 2),
		)

		// Equipment by type
		const byEquipType: Record<string, string[]> = {}
		for (const item of Object.values(items)) {
			if (item.equipmentDetail) {
				const type = item.equipmentDetail.type
				if (!byEquipType[type]) {
					byEquipType[type] = []
				}
				byEquipType[type].push(item.hrid)
			}
		}
		this.builder.addConstVariable(
			'ITEMS_BY_EQUIPMENT_TYPE',
			'Partial<Record<EquipmentTypeHrid, readonly ItemHrid[]>>',
			JSON.stringify(byEquipType, null, 2),
		)

		// Tradable items
		const tradableItems = Object.values(items)
			.filter((item) => item.isTradable)
			.map((item) => item.hrid)
		this.builder.addConstArray('TRADABLE_ITEM_HRIDS', tradableItems)

		// Equipment items
		const equipmentItems = Object.values(items)
			.filter((item) => item.equipmentDetail)
			.map((item) => item.hrid)
		this.builder.addConstArray('EQUIPMENT_ITEM_HRIDS', equipmentItems)

		// Alchemical items
		const alchemicalItems = Object.values(items)
			.filter((item) => item.alchemyDetail)
			.map((item) => item.hrid)
		this.builder.addConstArray('ALCHEMICAL_ITEM_HRIDS', alchemicalItems)

		// Items by marketplace category
		const byMarketplaceCategory: Record<string, string[]> = {
			Resources: [],
			Consumables: [],
			Books: [],
			Keys: [],
			Equipment: [],
			Accessories: [],
			Tools: [],
		}

		for (const item of Object.values(items)) {
			const category = this.getMarketplaceCategoryForItem(item)
			if (byMarketplaceCategory[category]) {
				byMarketplaceCategory[category].push(item.hrid)
			}
		}

		this.builder.addConstVariable(
			'ITEMS_BY_MARKETPLACE_CATEGORY',
			'Record<MarketplaceCategory, readonly ItemHrid[]>',
			JSON.stringify(byMarketplaceCategory, null, 2),
		)
	}

	private generateSpecializedUtils(): void {
		// Get items by category
		this.builder.addFunction(
			'getItemsByCategory',
			[{ name: 'category', type: 'ItemCategoryHrid' }],
			'Item[]',
			(writer) => {
				writer.writeLine('const hrids = ITEMS_BY_CATEGORY[category] || []')
				writer.writeLine(
					'return hrids.map(hrid => ITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Get equipment by type
		this.builder.addFunction(
			'getEquipmentByType',
			[{ name: 'type', type: 'EquipmentTypeHrid' }],
			'Item[]',
			(writer) => {
				writer.writeLine('const hrids = ITEMS_BY_EQUIPMENT_TYPE[type] || []')
				writer.writeLine(
					'return hrids.map(hrid => ITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Check if item is equipment
		this.builder.addFunction(
			'isEquipment',
			[{ name: 'item', type: 'Item' }],
			'boolean',
			(writer) => {
				writer.writeLine('return item.equipmentDetail !== undefined')
			},
		)

		// Check if item is tradable
		this.builder.addFunction(
			'isTradable',
			[{ name: 'item', type: 'Item' }],
			'boolean',
			(writer) => {
				writer.writeLine('return item.isTradable')
			},
		)

		// Get items for skill requirement
		this.builder.addFunction(
			'getItemsForSkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'Item[]',
			(writer) => {
				writer.writeLine('return getAllItems().filter(item => {')
				writer.writeLine(
					'  if (!item.equipmentDetail?.levelRequirements) return false',
				)
				writer.writeLine(
					'  return item.equipmentDetail.levelRequirements.some(req => req.skillHrid === skillHrid)',
				)
				writer.writeLine('})')
			},
		)

		// Calculate enhancement cost
		this.builder.addFunction(
			'calculateEnhancementCost',
			[
				{ name: 'item', type: 'Item' },
				{ name: 'level', type: 'number' },
			],
			'ItemCost[] | undefined',
			(writer) => {
				writer.writeLine('if (!item.enhancementCosts) return undefined')
				writer.writeLine('return item.enhancementCosts.map(cost => ({')
				writer.writeLine('  itemHrid: cost.itemHrid,')
				writer.writeLine('  count: cost.count * level')
				writer.writeLine('}))')
			},
		)

		// Get item value (for sorting/comparison)
		this.builder.addFunction(
			'getItemValue',
			[{ name: 'item', type: 'Item' }],
			'number',
			(writer) => {
				writer.writeLine('// Base value is sell price')
				writer.writeLine('let value = item.sellPrice')
				writer.writeLine('// Equipment adds item level as factor')
				writer.writeLine('if (item.equipmentDetail) {')
				writer.writeLine('  value += item.itemLevel * 1000')
				writer.writeLine('}')
				writer.writeLine('return value')
			},
		)

		// Get marketplace category for an item
		this.builder.addFunction(
			'getMarketplaceCategory',
			[{ name: 'item', type: 'Item' }],
			'MarketplaceCategory',
			(writer) => {
				writer.writeLine(
					"// First check if it's equipment-based (Equipment, Accessories, Tools)",
				)
				writer.writeLine('if (item.equipmentDetail) {')
				writer.writeLine(
					'  const equipType = item.equipmentDetail.type.toLowerCase()',
				)
				writer.writeLine('  ')
				writer.writeLine('  // Tools: equipment types containing "tool"')
				writer.writeLine("  if (equipType.includes('tool')) {")
				writer.writeLine("    return 'Tools'")
				writer.writeLine('  }')
				writer.writeLine('  ')
				writer.writeLine(
					'  // Accessories: equipment types for jewelry and accessories',
				)
				writer.writeLine('  if (')
				writer.writeLine("    equipType.includes('neck') ||")
				writer.writeLine("    equipType.includes('ring') ||")
				writer.writeLine("    equipType.includes('ear') ||")
				writer.writeLine("    equipType.includes('charm') ||")
				writer.writeLine("    equipType.includes('amulet') ||")
				writer.writeLine("    equipType.includes('necklace') ||")
				writer.writeLine("    equipType.includes('earring')")
				writer.writeLine('  ) {')
				writer.writeLine("    return 'Accessories'")
				writer.writeLine('  }')
				writer.writeLine('  ')
				writer.writeLine(
					'  // Everything else with equipmentDetail is Equipment',
				)
				writer.writeLine("  return 'Equipment'")
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine(
					'// Non-equipment items categorized by exact categoryHrid match',
				)
				writer.writeLine('switch (item.categoryHrid) {')
				writer.writeLine("  case '/item_categories/ability_book':")
				writer.writeLine("    return 'Books'")
				writer.writeLine("  case '/item_categories/key':")
				writer.writeLine("    return 'Keys'")
				writer.writeLine("  case '/item_categories/food':")
				writer.writeLine("  case '/item_categories/drink':")
				writer.writeLine("    return 'Consumables'")
				writer.writeLine("  case '/item_categories/resource':")
				writer.writeLine("  case '/item_categories/loot':")
				writer.writeLine("  case '/item_categories/currency':")
				writer.writeLine('  default:')
				writer.writeLine("    return 'Resources'")
				writer.writeLine('}')
			},
		)

		// Get items by marketplace category
		this.builder.addFunction(
			'getItemsByMarketplaceCategory',
			[{ name: 'category', type: 'MarketplaceCategory' }],
			'Item[]',
			(writer) => {
				writer.writeLine(
					'const hrids = ITEMS_BY_MARKETPLACE_CATEGORY[category] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => ITEMS.get(hrid)!).filter(Boolean)',
				)
			},
		)
	}
}

// Type definitions that will be generated
type ItemHrid = string
type ItemCategoryHrid = string
type EquipmentTypeHrid = string
type SkillHrid = string

interface ItemCost {
	itemHrid: ItemHrid
	count: number
}

interface DropTableEntry {
	itemHrid: ItemHrid
	dropRate: number
	minCount: number
	maxCount: number
}

interface AlchemyDetail {
	bulkMultiplier: number
	isCoinifiable: boolean
	decomposeItems?: ItemCost[]
	transmuteSuccessRate: number
	transmuteDropTable?: DropTableEntry[]
}

interface LevelRequirement {
	skillHrid: SkillHrid
	level: number
}

interface Stats {
	[key: string]: number
}

interface EquipmentDetail {
	type: EquipmentTypeHrid
	levelRequirements?: LevelRequirement[]
	combatStats?: Stats
	noncombatStats?: Stats
	combatEnhancementBonuses?: Stats
	noncombatEnhancementBonuses?: Stats
}

interface Item {
	hrid: ItemHrid
	name: string
	description: string
	categoryHrid: ItemCategoryHrid
	sellPrice: number
	isTradable: boolean
	itemLevel: number
	sortIndex: number
	enhancementCosts?: ItemCost[]
	protectionItemHrids?: ItemHrid[]
	alchemyDetail?: AlchemyDetail
	equipmentDetail?: EquipmentDetail
}
