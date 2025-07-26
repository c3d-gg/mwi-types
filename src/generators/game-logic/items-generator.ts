import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

// Define all the item-related interfaces
interface ItemDropTableEntry {
  itemHrid: string
  dropRate: number
  minCount: number
  maxCount: number
  minEliteTier: number
}

interface AlchemyDetail {
  bulkMultiplier: number
  isCoinifiable: boolean
  decomposeItems: Array<{ itemHrid: string; count: number }> | null
  transmuteSuccessRate: number
  transmuteDropTable: ItemDropTableEntry[] | null
}

interface CombatStats {
  [key: string]: number  // Various combat stat modifiers
}

interface NonCombatStats {
  [key: string]: number  // Various non-combat stat modifiers
}

interface EquipmentDetail {
  type: string  // References equipment types
  levelRequirements: Array<{
    skillHrid: string
    level: number
  }>
  combatStats: CombatStats
  noncombatStats: NonCombatStats
  combatEnhancementBonuses?: CombatStats
  noncombatEnhancementBonuses?: NonCombatStats
}

interface CombatTrigger {
  dependencyHrid: string
  conditionHrid: string
  comparatorHrid?: string
  value?: number
}

interface ConsumableDetail {
  cooldownDuration: number
  usableInActionTypeMap?: Record<string, boolean>
  hitpointRestore: number
  manapointRestore: number
  recoveryDuration: number
  buffs: any[] | null  // Complex buff structure
  defaultCombatTriggers?: CombatTrigger[]
}

interface AbilityBookDetail {
  abilityHrid: string
  levelRequirements: Array<{
    skillHrid: string
    level: number
  }>
}

interface ItemDetail extends BaseEntity {
  hrid: string
  name: string
  description: string
  categoryHrid: string
  sellPrice: number
  isTradable: boolean
  itemLevel: number
  sortIndex: number
  enhancementCosts?: Array<{ itemHrid: string; count: number }>
  protectionItemHrids?: string[]
  alchemyDetail?: AlchemyDetail
  equipmentDetail?: EquipmentDetail
  consumableDetail?: ConsumableDetail
  abilityBookDetail?: AbilityBookDetail
}

/**
 * Generator for item types and constants
 */
export class ItemsGenerator extends BaseGenerator<ItemDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'Item',
      entityNamePlural: 'Items',
      sourceKey: 'itemDetailMap',
      outputFilename: 'items',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, ItemDetail> {
    return this.getEntitiesFromGameData() as Record<string, ItemDetail>
  }

  protected defineSchemaProperties(_entity: ItemDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'ItemHridEnum',
        description: 'The unique human-readable ID of the item'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the item'
      },
      {
        name: 'description',
        type: 'string',
        description: 'Flavor text or description of the item'
      },
      {
        name: 'categoryHrid',
        type: 'string',  // TODO: Change to ref when supported
        description: 'The category this item belongs to'
      },
      {
        name: 'sellPrice',
        type: 'number',
        description: 'Price when selling to NPC shops'
      },
      {
        name: 'isTradable',
        type: 'boolean',
        optional: true,
        description: 'Whether this item can be traded between players'
      },
      {
        name: 'itemLevel',
        type: 'number',
        optional: true,
        description: 'Level of the item for scaling purposes'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for displaying items'
      },
      {
        name: 'isOpenable',
        type: 'boolean',
        optional: true,
        description: 'Whether this item can be opened (like chests)'
      },
      {
        name: 'openKeyItemHrid',
        type: 'string',
        optional: true,
        description: 'The item required to open this item (for chests)'
      },
      // Optional enhancement costs array
      {
        name: 'enhancementCosts',
        type: 'array',
        optional: true,
        items: {
          name: 'itemCost',  // Dummy name for array item
          type: 'object',
          properties: [
            { name: 'itemHrid', type: 'string' },
            { name: 'count', type: 'number' }
          ]
        },
        description: 'Items required to enhance this item'
      },
      // Optional protection item HRIDs
      {
        name: 'protectionItemHrids',
        type: 'array',
        optional: true,
        items: { name: 'protectionItem', type: 'string' },  // Dummy name for array item
        description: 'Items that can protect this item from loss'
      },
      // Optional alchemy detail
      {
        name: 'alchemyDetail',
        type: 'object',
        optional: true,
        properties: [
          { name: 'bulkMultiplier', type: 'number' },
          { name: 'isCoinifiable', type: 'boolean' },
          {
            name: 'decomposeItems',
            type: 'array',
            nullable: true,
            items: {
              name: 'decomposeItem',  // Dummy name for array item
              type: 'object',
              properties: [
                { name: 'itemHrid', type: 'string' },
                { name: 'count', type: 'number' }
              ]
            }
          },
          { name: 'transmuteSuccessRate', type: 'number' },
          {
            name: 'transmuteDropTable',
            type: 'array',
            nullable: true,
            items: {
              name: 'dropTableEntry',  // Dummy name for array item
              type: 'object',
              properties: [
                { name: 'itemHrid', type: 'string' },
                { name: 'dropRate', type: 'number' },
                { name: 'minCount', type: 'number' },
                { name: 'maxCount', type: 'number' },
                { name: 'minEliteTier', type: 'number' }
              ]
            }
          }
        ],
        description: 'Alchemy-related properties for transmutation and decomposition'
      },
      // Optional equipment detail
      {
        name: 'equipmentDetail',
        type: 'object',
        optional: true,
        properties: [
          { name: 'type', type: 'string' },  // TODO: Change to ref when equipment-types generator is created
          {
            name: 'levelRequirements',
            type: 'array',
            items: {
              name: 'levelRequirement',  // Dummy name for array item
              type: 'object',
              properties: [
                { name: 'skillHrid', type: 'string' },  // TODO: Change to ref when supported
                { name: 'level', type: 'number' }
              ]
            }
          },
          { 
            name: 'combatStats', 
            type: 'object',
            properties: [
              // Combat system properties
              { name: 'combatStyleHrids', type: 'array', items: { name: 'combatStyleHrid', type: 'string' }, optional: true },
              { name: 'damageType', type: 'string', optional: true },
              { name: 'attackInterval', type: 'number', optional: true },
              // Common combat stats (all optional since not all items have all stats)
              { name: 'attackSpeed', type: 'number', optional: true },
              { name: 'rangedAccuracy', type: 'number', optional: true },
              { name: 'magicAccuracy', type: 'number', optional: true },
              { name: 'stabAccuracy', type: 'number', optional: true },
              { name: 'slashAccuracy', type: 'number', optional: true },
              { name: 'smashAccuracy', type: 'number', optional: true },
              { name: 'rangedDamage', type: 'number', optional: true },
              { name: 'magicDamage', type: 'number', optional: true },
              { name: 'stabDamage', type: 'number', optional: true },
              { name: 'slashDamage', type: 'number', optional: true },
              { name: 'smashDamage', type: 'number', optional: true },
              { name: 'stabEvasion', type: 'number', optional: true },
              { name: 'slashEvasion', type: 'number', optional: true },
              { name: 'smashEvasion', type: 'number', optional: true },
              { name: 'rangedEvasion', type: 'number', optional: true },
              { name: 'magicEvasion', type: 'number', optional: true },
              { name: 'waterResistance', type: 'number', optional: true },
              { name: 'natureResistance', type: 'number', optional: true },
              { name: 'fireResistance', type: 'number', optional: true },
              { name: 'tenacity', type: 'number', optional: true },
              { name: 'armor', type: 'number', optional: true },
              { name: 'hp', type: 'number', optional: true },
              { name: 'mp', type: 'number', optional: true },
              // Additional combat stats found in the data
              { name: 'taskDamage', type: 'number', optional: true },
              { name: 'autoAttackDamage', type: 'number', optional: true },
              { name: 'threat', type: 'number', optional: true },
              // Resource stats
              { name: 'maxHitpoints', type: 'number', optional: true },
              { name: 'maxManapoints', type: 'number', optional: true },
              { name: 'hpRegenPer10', type: 'number', optional: true },
              { name: 'mpRegenPer10', type: 'number', optional: true },
              { name: 'foodSlots', type: 'number', optional: true },
              { name: 'drinkSlots', type: 'number', optional: true },
              { name: 'foodHaste', type: 'number', optional: true },
              { name: 'drinkConcentration', type: 'number', optional: true },
              // Amplify properties
              { name: 'fireAmplify', type: 'number', optional: true },
              { name: 'waterAmplify', type: 'number', optional: true },
              { name: 'natureAmplify', type: 'number', optional: true },
              { name: 'healingAmplify', type: 'number', optional: true },
              // Penetration properties
              { name: 'firePenetration', type: 'number', optional: true },
              { name: 'waterPenetration', type: 'number', optional: true },
              { name: 'naturePenetration', type: 'number', optional: true },
              { name: 'armorPenetration', type: 'number', optional: true },
              // Special combat effects
              { name: 'lifeSteal', type: 'number', optional: true },
              { name: 'manaLeech', type: 'number', optional: true },
              { name: 'blaze', type: 'number', optional: true },
              { name: 'bloom', type: 'number', optional: true },
              { name: 'ripple', type: 'number', optional: true },
              { name: 'curse', type: 'number', optional: true },
              { name: 'fury', type: 'number', optional: true },
              { name: 'weaken', type: 'number', optional: true },
              { name: 'mayhem', type: 'number', optional: true },
              { name: 'parry', type: 'number', optional: true },
              { name: 'pierce', type: 'number', optional: true },
              // Combat enhancement
              { name: 'criticalRate', type: 'number', optional: true },
              { name: 'criticalDamage', type: 'number', optional: true },
              { name: 'abilityHaste', type: 'number', optional: true },
              { name: 'castSpeed', type: 'number', optional: true },
              // Thorns effects
              { name: 'elementalThorns', type: 'number', optional: true },
              { name: 'physicalThorns', type: 'number', optional: true },
              // Combat experience/drop stats
              { name: 'combatExperience', type: 'number', optional: true },
              { name: 'combatRareFind', type: 'number', optional: true },
              { name: 'combatDropRate', type: 'number', optional: true },
              // Gathering/skilling stats that may appear in combatStats
              { name: 'skillingEfficiency', type: 'number', optional: true },
              { name: 'skillingEssenceFind', type: 'number', optional: true },
              { name: 'alchemySpeed', type: 'number', optional: true },
              { name: 'brewingSpeed', type: 'number', optional: true },
              { name: 'cookingSpeed', type: 'number', optional: true },
              { name: 'woodcuttingSpeed', type: 'number', optional: true },
              { name: 'miningSpeed', type: 'number', optional: true },
              { name: 'fishingSpeed', type: 'number', optional: true },
              { name: 'foragingSpeed', type: 'number', optional: true }
            ],
            description: 'Combat stat modifiers and configuration'
          },
          { 
            name: 'noncombatStats', 
            type: 'record',
            keyType: { name: 'key', type: 'string' },
            valueType: { name: 'value', type: 'number' },
            description: 'Non-combat stat modifiers'
          },
          { 
            name: 'combatEnhancementBonuses', 
            type: 'record',
            keyType: { name: 'key', type: 'string' },
            valueType: { name: 'value', type: 'number' },
            optional: true,
            description: 'Combat enhancement bonuses per level'
          },
          { 
            name: 'noncombatEnhancementBonuses', 
            type: 'record',
            keyType: { name: 'key', type: 'string' },
            valueType: { name: 'value', type: 'number' },
            optional: true,
            description: 'Non-combat enhancement bonuses per level'
          }
        ],
        description: 'Equipment-specific properties including stats and requirements'
      },
      // Optional consumable detail
      {
        name: 'consumableDetail',
        type: 'object',
        optional: true,
        properties: [
          { name: 'cooldownDuration', type: 'number' },
          { 
            name: 'usableInActionTypeMap', 
            type: 'record',
            keyType: { name: 'key', type: 'string' },
            valueType: { name: 'value', type: 'boolean' },
            optional: true,
            description: 'Map of action types this consumable can be used in'
          },
          { name: 'hitpointRestore', type: 'number' },
          { name: 'manapointRestore', type: 'number' },
          { name: 'recoveryDuration', type: 'number' },
          {
            name: 'buffs',
            type: 'array',
            items: {
              name: 'buff',
              type: 'object',
              properties: [
                { name: 'uniqueHrid', type: 'string' },
                { name: 'typeHrid', type: 'string' },
                { name: 'ratioBoost', type: 'number' },
                { name: 'ratioBoostLevelBonus', type: 'number' },
                { name: 'flatBoost', type: 'number' },
                { name: 'flatBoostLevelBonus', type: 'number' },
                { name: 'startTime', type: 'string' },
                { name: 'duration', type: 'number' }
              ]
            },
            nullable: true
          },
          { 
            name: 'defaultCombatTriggers', 
            type: 'array',
            nullable: true,
            items: {
              name: 'combatTrigger',  // Dummy name for array item
              type: 'object',
              properties: [
                { name: 'dependencyHrid', type: 'string' },
                { name: 'conditionHrid', type: 'string' },
                { name: 'comparatorHrid', type: 'string', optional: true },
                { name: 'value', type: 'number', optional: true }
              ]
            }
          }
        ],
        description: 'Consumable-specific properties including restoration and buffs'
      },
      // Optional ability book detail
      {
        name: 'abilityBookDetail',
        type: 'object',
        optional: true,
        properties: [
          { name: 'abilityHrid', type: 'string' },  // TODO: Change to ref when abilities generator is created
          {
            name: 'levelRequirements',
            type: 'array',
            items: {
              name: 'levelRequirement',  // Dummy name for array item
              type: 'object',
              properties: [
                { name: 'skillHrid', type: 'string' },  // TODO: Change to ref when supported
                { name: 'level', type: 'number' }
              ]
            }
          },
          { name: 'experienceGain', type: 'number', optional: true }
        ],
        description: 'Ability book properties for items that grant abilities'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, ItemDetail>): string[] {
    // Group items by category
    const itemsByCategory: Record<string, string[]> = {}
    
    for (const [hrid, item] of Object.entries(entities)) {
      const category = item.categoryHrid
      if (!itemsByCategory[category]) {
        itemsByCategory[category] = []
      }
      itemsByCategory[category].push(hrid)
    }
    
    // Group items by level
    const itemsByLevel: Record<number, string[]> = {}
    
    for (const [hrid, item] of Object.entries(entities)) {
      const level = item.itemLevel
      if (level !== undefined) {
        if (!itemsByLevel[level]) {
          itemsByLevel[level] = []
        }
        itemsByLevel[level].push(hrid)
      }
    }
    
    // Sort categories, levels, and items for consistent output
    const sortedCategories = Object.keys(itemsByCategory).sort()
    for (const category of sortedCategories) {
      itemsByCategory[category]?.sort()
    }
    
    const sortedLevels = Object.keys(itemsByLevel).map(Number).sort((a, b) => a - b)
    for (const level of sortedLevels) {
      itemsByLevel[level]?.sort()
    }
    
    return [
      `/**
 * Items organized by category
 */
export const ITEMS_BY_CATEGORY = ${JSON.stringify(itemsByCategory, null, 2)} as const`,
      
      `/**
 * Items organized by level
 */
export const ITEMS_BY_LEVEL = ${JSON.stringify(itemsByLevel, null, 2)} as const as Record<string, readonly ItemHrid[]>`,
      
      `/**
 * Get all items in a specific category
 * @param categoryHrid - The category HRID to filter by
 * @returns Array of item HRIDs in the category
 * @example
 * \`\`\`ts
 * const equipmentItems = getItemsByCategory('/item_categories/equipment')
 * // ['/items/iron_sword', '/items/iron_shield', ...]
 * \`\`\`
 */
export function getItemsByCategory(categoryHrid: z.infer<typeof ItemCategoryHridEnum>): ItemHrid[] {
  return [...(ITEMS_BY_CATEGORY[categoryHrid] || [])] as ItemHrid[]
}`,
      
      `/**
 * Get all equipment items
 * @returns Array of equipment item HRIDs
 * @example
 * \`\`\`ts
 * const equipment = getEquipmentItems()
 * // ['/items/iron_sword', '/items/iron_shield', ...]
 * \`\`\`
 */
export function getEquipmentItems(): ItemHrid[] {
  return Object.entries(ITEMS)
    .filter(([_, item]) => item.equipmentDetail !== undefined)
    .map(([hrid]) => hrid as ItemHrid)
}`,
      
      `/**
 * Get all consumable items
 * @returns Array of consumable item HRIDs
 * @example
 * \`\`\`ts
 * const consumables = getConsumableItems()
 * // ['/items/health_potion', '/items/mana_potion', ...]
 * \`\`\`
 */
export function getConsumableItems(): ItemHrid[] {
  return Object.entries(ITEMS)
    .filter(([_, item]) => item.consumableDetail !== undefined)
    .map(([hrid]) => hrid as ItemHrid)
}`,
      
      `/**
 * Get all ability book items
 * @returns Array of ability book item HRIDs
 * @example
 * \`\`\`ts
 * const abilityBooks = getAbilityBookItems()
 * // ['/items/aqua_arrow', '/items/fireball', ...]
 * \`\`\`
 */
export function getAbilityBookItems(): ItemHrid[] {
  return Object.entries(ITEMS)
    .filter(([_, item]) => item.abilityBookDetail !== undefined)
    .map(([hrid]) => hrid as ItemHrid)
}`,
      
      `/**
 * Get items by minimum level requirement
 * @param minLevel - Minimum item level
 * @returns Array of item HRIDs that meet the level requirement
 * @example
 * \`\`\`ts
 * const highLevelItems = getItemsByMinLevel(50)
 * // Items with itemLevel >= 50
 * \`\`\`
 */
export function getItemsByMinLevel(minLevel: number): ItemHrid[] {
  return Object.entries(ITEMS)
    .filter(([_, item]) => item.itemLevel !== undefined && item.itemLevel >= minLevel)
    .map(([hrid]) => hrid as ItemHrid)
}`,
      
      `/**
 * Get tradeable items
 * @returns Array of tradeable item HRIDs
 * @example
 * \`\`\`ts
 * const tradeableItems = getTradeableItems()
 * // All items where isTradable === true
 * \`\`\`
 */
export function getTradeableItems(): ItemHrid[] {
  return Object.entries(ITEMS)
    .filter(([_, item]) => item.isTradable === true)
    .map(([hrid]) => hrid as ItemHrid)
}`,
      
      `/**
 * Check if an item is equipment
 * @param itemHrid - The item HRID to check
 * @returns True if the item has equipment details
 * @example
 * \`\`\`ts
 * if (isEquipment('/items/iron_sword')) {
 *   console.log('This is equipment')
 * }
 * \`\`\`
 */
export function isEquipment(itemHrid: ItemHrid): boolean {
  const item = ITEMS[itemHrid]
  return item?.equipmentDetail !== undefined
}`,
      
      `/**
 * Check if an item is consumable
 * @param itemHrid - The item HRID to check
 * @returns True if the item has consumable details
 * @example
 * \`\`\`ts
 * if (isConsumable('/items/health_potion')) {
 *   console.log('This is consumable')
 * }
 * \`\`\`
 */
export function isConsumable(itemHrid: ItemHrid): boolean {
  const item = ITEMS[itemHrid]
  return item?.consumableDetail !== undefined
}`,
      
      `/**
 * Check if an item is an ability book
 * @param itemHrid - The item HRID to check
 * @returns True if the item has ability book details
 * @example
 * \`\`\`ts
 * if (isAbilityBook('/items/aqua_arrow')) {
 *   console.log('This is an ability book')
 * }
 * \`\`\`
 */
export function isAbilityBook(itemHrid: ItemHrid): boolean {
  const item = ITEMS[itemHrid]
  return item?.abilityBookDetail !== undefined
}`,
      
      `/**
 * Get items by exact level
 * @param level - The exact item level to filter by
 * @returns Array of item HRIDs at the specified level
 * @example
 * \`\`\`ts
 * const level10Items = getItemsByLevel(10)
 * // All items with itemLevel === 10
 * \`\`\`
 */
export function getItemsByLevel(level: number): ItemHrid[] {
  return [...(ITEMS_BY_LEVEL[level.toString()] || [])] as ItemHrid[]
}`,
      
      `/**
 * Get items within a level range (inclusive)
 * @param minLevel - Minimum item level (inclusive)
 * @param maxLevel - Maximum item level (inclusive)
 * @returns Array of item HRIDs within the level range
 * @example
 * \`\`\`ts
 * const midLevelItems = getItemsByLevelRange(10, 20)
 * // All items with itemLevel between 10 and 20 (inclusive)
 * \`\`\`
 */
export function getItemsByLevelRange(minLevel: number, maxLevel: number): ItemHrid[] {
  const result: ItemHrid[] = []
  for (let level = minLevel; level <= maxLevel; level++) {
    const itemsAtLevel = ITEMS_BY_LEVEL[level.toString()]
    if (itemsAtLevel) {
      result.push(...itemsAtLevel)
    }
  }
  return result
}`,
      
      `/**
 * Check if a string is a valid item category HRID
 * @param categoryHrid - The category HRID to check
 * @returns True if the category HRID is valid
 * @example
 * \`\`\`ts
 * if (isItemCategory('/item_categories/equipment')) {
 *   console.log('Valid item category')
 * }
 * \`\`\`
 */
export function isItemCategory(categoryHrid: string): categoryHrid is z.infer<typeof ItemCategoryHridEnum> {
  return Object.keys(ITEMS_BY_CATEGORY).includes(categoryHrid)
}`
    ]
  }

  // Add type imports to the generated files
  protected override generateImports(): string {
    return `/**
 * Item data and utilities for Milky Way Idle
 * @module
 */

import { z } from 'zod'
import type { Item } from '../schemas/zod/items'
import { ItemHridEnum } from '../schemas/zod/items'
import type { ItemCategoryHridEnum, ItemCategory } from '../schemas/zod/item-categories'
import type { SkillHridEnum } from '../schemas/zod/skills'
// Re-export ItemCategoryHridEnum as ItemCategoryEnum for backward compatibility
export { ItemCategoryHridEnum as ItemCategoryEnum } from '../schemas/zod/item-categories'
export type { ItemCategory } from '../schemas/zod/item-categories'
// TODO: Add these imports when generators are created
// import type { EquipmentTypeHridEnum } from '../schemas/zod/equipment-types'
// import type { AbilityHridEnum } from '../schemas/zod/abilities'
`
  }
}