import { writeFile } from 'fs/promises'
import { join } from 'path'

import type { GameData, ItemDetail } from '../../types/source-data'

/**
 * Filters and generates optimized item data with Zod schemas
 */
export async function generateItems(gameData: GameData, outputDir: string) {
	console.log('📦 Generating items...')

	// Collect all item categories
	const allCategories = new Set<string>()
	for (const item of Object.values(gameData.itemDetailMap)) {
		allCategories.add(item.categoryHrid)
	}

	// Get craftable items from recipes
	const craftableItems = new Set<string>()
	for (const action of Object.values(gameData.actionDetailMap)) {
		if (action.outputItems) {
			action.outputItems.forEach((output) => craftableItems.add(output.itemHrid))
		}
		if (action.inputItems) {
			action.inputItems.forEach((input) => craftableItems.add(input.itemHrid))
		}
	}

	// Filter items to only include:
	// 1. Tradeable items (for market)
	// 2. Items used in recipes
	// 3. Equipment items
	// 4. Consumables
	const relevantItems: Record<string, any> = {}
	const itemsByCategory: Record<string, string[]> = {}
	const itemsByLevel: Record<number, string[]> = {}

	for (const [itemHrid, item] of Object.entries(gameData.itemDetailMap)) {
		// Include if tradeable, craftable, equipment, or consumable
		const isRelevant =
			item.isTradable ||
			craftableItems.has(itemHrid) ||
			item.categoryHrid === '/item_categories/equipment' ||
			item.categoryHrid === '/item_categories/food' ||
			item.categoryHrid === '/item_categories/drink'

		if (!isRelevant) continue

		// Create minimal item data
		const itemData: any = {
			hrid: itemHrid,
			name: item.name,
			categoryHrid: item.categoryHrid,
			sellPrice: item.sellPrice,
			itemLevel: item.itemLevel ?? 0,
			isTradable: item.isTradable ?? false,
			sortIndex: item.sortIndex
		}

		// Add equipment details if present
		if (item.equipmentDetail) {
			itemData.equipmentDetail = {
				type: item.equipmentDetail.type,
				levelRequirements: item.equipmentDetail.levelRequirements
			}
		}

		// Add consumable details if present
		if (item.consumableDetail) {
			itemData.consumableDetail = {
				cooldownDuration: item.consumableDetail.cooldownDuration,
				usableInActionTypeMap: item.consumableDetail.usableInActionTypeMap,
				buffs: item.consumableDetail.buffs
			}
		}

		relevantItems[itemHrid] = itemData

		// Build category index
		const category = item.categoryHrid
		if (!itemsByCategory[category]) {
			itemsByCategory[category] = []
		}
		itemsByCategory[category].push(itemHrid)

		// Build level index
		const level = getItemLevel(item)
		if (!itemsByLevel[level]) {
			itemsByLevel[level] = []
		}
		itemsByLevel[level].push(itemHrid)
	}

	// Sort arrays for consistent output
	const sortedCategories = Array.from(allCategories).sort()
	for (const items of Object.values(itemsByCategory)) {
		items.sort()
	}
	for (const items of Object.values(itemsByLevel)) {
		items.sort()
	}

	// Generate TypeScript content with imports from source of truth
	const content = `/**
 * Auto-generated item data with Zod schemas - DO NOT EDIT
 * Generated from game data on ${new Date().toISOString()}
 */

import { z } from 'zod/v4'
import type { ItemHrid } from './types'

// Import schemas from the source of truth
import {
	ItemCategoryHridSchema,
	EquipmentDetailSchema,
	ConsumableDetailSchema,
	BuffSchema,
	EquipmentTypeHridSchema,
	ActionTypeHridSchema,
	type ItemCategoryHrid,
	type EquipmentDetail,
	type ConsumableDetail,
	type Buff,
	type EquipmentTypeHrid,
	type ActionTypeHrid
} from '../../types/source-data'

// Re-export for convenience
export {
	ItemCategoryHridSchema as ItemCategoryEnum,
	type ItemCategoryHrid as ItemCategory
}

import { SkillHridEnum, type SkillHrid } from './skills'

/**
 * Simplified equipment detail for generated data
 */
export const MinimalEquipmentDetailSchema = z.object({
	type: EquipmentTypeHridSchema,
	levelRequirements: z.array(z.object({
		skillHrid: SkillHridEnum,
		level: z.number()
	}))
})

/**
 * Buff schema for generated data (uses string dates for JSON)
 */
export const GeneratedBuffSchema = z.object({
	uniqueHrid: z.string(),
	typeHrid: z.string(),
	ratioBoost: z.number(),
	ratioBoostLevelBonus: z.number(),
	flatBoost: z.number(),
	flatBoostLevelBonus: z.number(),
	startTime: z.string(), // ISO date string that will be coerced by BuffSchema
	duration: z.number()
})

/**
 * Simplified consumable detail for generated data
 */
export const MinimalConsumableDetailSchema = z.object({
	cooldownDuration: z.number(),
	usableInActionTypeMap: z.record(z.string(), z.boolean()),
	buffs: z.array(GeneratedBuffSchema).nullable()
})

/**
 * Item schema
 */
export const ItemSchema = z.object({
	hrid: z.string(),
	name: z.string(),
	categoryHrid: ItemCategoryHridSchema,
	sellPrice: z.number(),
	itemLevel: z.number(),
	isTradable: z.boolean(),
	sortIndex: z.number(),
	equipmentDetail: MinimalEquipmentDetailSchema.optional(),
	consumableDetail: MinimalConsumableDetailSchema.optional()
})

export type Item = z.infer<typeof ItemSchema>

/**
 * Relevant items for market and crafting operations
 */
export const ITEMS: Record<string, Item> = ${JSON.stringify(relevantItems, null, 2)}

/**
 * Items grouped by category
 */
export const ITEMS_BY_CATEGORY = ${JSON.stringify(itemsByCategory, null, 2)} as const

/**
 * Items grouped by level requirement
 */
export const ITEMS_BY_LEVEL = ${JSON.stringify(itemsByLevel, null, 2)} as const

// Type exports
export type ItemId = keyof typeof ITEMS
export type ItemData = typeof ITEMS[ItemId]

/**
 * Get item by HRID with validation
 * @param itemHrid - The item HRID to retrieve
 * @returns The parsed Item object if found, undefined otherwise
 * @example
 * \`\`\`ts
 * const milk = getItem('/items/milk')
 * if (milk) {
 *   console.log(milk.sellPrice)
 * }
 * \`\`\`
 */
export function getItem(itemHrid: string): Item | undefined {
	const item = ITEMS[itemHrid as ItemId]
	return item ? ItemSchema.parse(item) : undefined
}

/**
 * Get all items in a category
 * @param categoryHrid - The category HRID from ItemCategoryEnum
 * @returns Array of item HRIDs in the specified category
 * @example
 * \`\`\`ts
 * const equipment = getItemsByCategory('/item_categories/equipment')
 * const food = getItemsByCategory('/item_categories/food')
 * \`\`\`
 */
export function getItemsByCategory(categoryHrid: ItemCategoryHrid): string[] {
	const items = ITEMS_BY_CATEGORY[categoryHrid as keyof typeof ITEMS_BY_CATEGORY]
	return items ? [...items] : []
}

/**
 * Get all items at a specific level
 * @param level - The item level requirement (1-200)
 * @returns Array of item HRIDs available at the specified level
 * @example
 * \`\`\`ts
 * const level10Items = getItemsByLevel(10)
 * const endgameItems = getItemsByLevel(200)
 * \`\`\`
 */
export function getItemsByLevel(level: number): string[] {
	const items = ITEMS_BY_LEVEL[level.toString() as keyof typeof ITEMS_BY_LEVEL]
	return items ? [...items] : []
}

/**
 * Get all items in a level range
 * @param minLevel - The minimum level (inclusive)
 * @param maxLevel - The maximum level (inclusive)
 * @returns Array of item HRIDs within the specified level range
 * @example
 * \`\`\`ts
 * const midGameItems = getItemsByLevelRange(50, 100)
 * const earlyGameItems = getItemsByLevelRange(1, 20)
 * \`\`\`
 */
export function getItemsByLevelRange(minLevel: number, maxLevel: number): string[] {
	const results: string[] = []
	for (let level = minLevel; level <= maxLevel; level++) {
		const items = ITEMS_BY_LEVEL[level.toString() as keyof typeof ITEMS_BY_LEVEL]
		if (items) {
			results.push(...items)
		}
	}
	return results
}

/**
 * Check if an item exists
 * @param itemHrid - The item HRID to check
 * @returns True if the item exists, false otherwise
 * @example
 * \`\`\`ts
 * if (itemExists('/items/milk')) {
 *   console.log('Milk is available!')
 * }
 * \`\`\`
 */
export function itemExists(itemHrid: string): boolean {
	return itemHrid in ITEMS
}

/**
 * Get all tradeable items
 * @returns Array of item HRIDs that can be traded
 * @example
 * \`\`\`ts
 * const marketItems = getTradeableItems()
 * console.log(\`\${marketItems.length} items available for trading\`)
 * \`\`\`
 */
export function getTradeableItems(): string[] {
	return Object.entries(ITEMS)
		.filter(([_, item]) => item.isTradable)
		.map(([hrid]) => hrid)
}

/**
 * Validate an item HRID and return it as a typed ItemHrid
 * @param hrid - The item HRID string to validate
 * @returns The validated ItemHrid
 * @throws Error if the HRID is not a valid item
 * @example
 * \`\`\`ts
 * try {
 *   const itemHrid = validateItemHrid('/items/milk')
 *   // itemHrid is now typed as ItemHrid
 * } catch (error) {
 *   console.error('Invalid item HRID')
 * }
 * \`\`\`
 */
export function validateItemHrid(hrid: string): ItemHrid {
	if (!(hrid in ITEMS)) {
		throw new Error(\`Invalid item: \${hrid}\`)
	}
	return hrid as ItemHrid
}

/**
 * Helper to check item category
 * @param item - The item object (Item or ItemData)
 * @param category - The category to check against
 * @returns True if the item belongs to the specified category
 * @example
 * \`\`\`ts
 * const milk = getItem('/items/milk')
 * if (milk && isItemCategory(milk, '/item_categories/food')) {
 *   console.log('Milk is a food item')
 * }
 * \`\`\`
 */
export function isItemCategory(item: Item | ItemData, category: ItemCategoryHrid): boolean {
	return item.categoryHrid === category
}

/**
 * Get equipment items
 * @returns Array of item HRIDs for all equipment items
 * @example
 * \`\`\`ts
 * const allEquipment = getEquipmentItems()
 * console.log(\`Found \${allEquipment.length} equipment items\`)
 * \`\`\`
 */
export function getEquipmentItems(): string[] {
	const items = ITEMS_BY_CATEGORY['/item_categories/equipment' as keyof typeof ITEMS_BY_CATEGORY]
	return items ? [...items] : []
}

/**
 * Get consumable items (food + drink)
 * @returns Array of item HRIDs for all consumable items
 * @example
 * \`\`\`ts
 * const consumables = getConsumableItems()
 * // Process all food and drink items
 * \`\`\`
 */
export function getConsumableItems(): string[] {
	const food = ITEMS_BY_CATEGORY['/item_categories/food' as keyof typeof ITEMS_BY_CATEGORY] || []
	const drink = ITEMS_BY_CATEGORY['/item_categories/drink' as keyof typeof ITEMS_BY_CATEGORY] || []
	return [...food, ...drink]
}
`

	// Write the file
	const outputPath = join(outputDir, 'items.ts')
	await writeFile(outputPath, content, 'utf-8')

	console.log(`✅ Generated ${Object.keys(relevantItems).length} items`)
	console.log(`   - ${Object.keys(itemsByCategory).length} categories`)
	console.log(`   - ${Object.keys(itemsByLevel).length} level groups`)
	console.log(`   - ${sortedCategories.length} category enums`)

	return {
		itemCount: Object.keys(relevantItems).length,
		categoryCount: Object.keys(itemsByCategory).length
	}
}

/**
 * Get the effective level requirement for an item
 */
function getItemLevel(item: ItemDetail): number {
	// For equipment, use the highest skill requirement
	if (item.equipmentDetail?.levelRequirements) {
		const levels = item.equipmentDetail.levelRequirements.map((req: any) => req.level)
		return levels.length > 0 ? Math.max(...levels) : (item.itemLevel ?? 0)
	}

	// Default to item level
	return item.itemLevel ?? 0
}
