import { join } from 'path'
import { PATHS } from '../../config/paths.js'
import { BaseGenerator } from '../base/base-generator.js'
import type { GeneratorConfig } from '../base/types.js'

/**
 * Recipe Calculator Generator
 *
 * Generates functions to calculate recipe requirements considering player data:
 * - Inventory items already owned
 * - Tool enhancements affecting crafting speed
 * - Buffs affecting efficiency and speed
 * - Drop rates for gathering materials
 */
export class RecipeCalculatorGenerator extends BaseGenerator<any> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'recipe-calculator',
      entityNamePlural: 'recipe-calculators',
      sourceKey: 'actionDetailMap',
      outputFilename: 'recipe-calculator',
      generateZodSchema: false,
      generateTypeboxSchema: false,
      generateHrids: false,
    }
    super(config)
  }

  protected extractEntities(): Record<string, any> {
    // This generator doesn't extract entities, it creates utility functions
    return {}
  }

  protected defineSchemaProperties(): any[] {
    return []
  }

  protected override async generateGameLogicFile(): Promise<void> {
    const content = `
/**
 * Recipe Calculator with Player Data Support
 * @module
 */

import type { RecipeTreeNode, RecipeTreeStats } from './recipe-tree.js'
import type { Recipe } from './recipes.js'
import type { Item, ItemHrid } from './items.js'
import type { Action, ActionHrid } from './actions.js'
import type { SkillHrid } from './skills.js'
import type { 
  PlayerData,
  CharacterSkill,
  CharacterItem,
  CharacterHouseRoom,
  Buff
} from '../schemas/zod/player-data.js'
import { buildRecipeTree, calculateRecipeTreeStats } from './recipe-tree.js'
import { getItem } from './items.js'
import { getAction } from './actions.js'

/**
 * Time modifiers from player data
 */
export interface TimeModifiers {
  /** Efficiency bonus from skill level (0-99%) */
  efficiency: number
  /** Speed bonus from tools (percentage) */
  toolSpeed: number
  /** Speed bonus from tea/consumables (percentage) */
  teaSpeed: number
  /** Efficiency bonus from tea/consumables (percentage) */
  teaEfficiency: number
  /** Haste bonus (percentage) */
  haste: number
  /** Task speed bonus (percentage) */
  taskSpeed: number
  /** House room bonuses */
  houseBonus: number
  /** Guild/community buffs */
  guildBonus: number
}

/**
 * Gathering estimation for a material
 */
export interface GatheringEstimate {
  /** The item being gathered */
  itemHrid: ItemHrid
  /** Optimal action to gather this item */
  actionHrid: ActionHrid
  /** Min items per action */
  minPerAction: number
  /** Max items per action */
  maxPerAction: number
  /** Average items per action */
  avgPerAction: number
  /** Base time per action (seconds) */
  baseTimeSeconds: number
  /** Modified time per action with player bonuses (seconds) */
  modifiedTimeSeconds: number
  /** Estimated total time to gather required quantity (seconds) */
  totalTimeSeconds: number
  /** Number of actions needed */
  actionsNeeded: number
  /** Items per hour with player bonuses */
  itemsPerHour: number
}

/**
 * Enhanced recipe node with player data
 */
export interface EnhancedRecipeNode extends RecipeTreeNode {
  /** Quantity already in inventory */
  inventoryQuantity: number
  /** Quantity still needed (after inventory) */
  quantityNeeded: number
  /** Base crafting time (seconds) */
  baseCraftingTime?: number
  /** Modified crafting time with player bonuses (seconds) */
  modifiedCraftingTime?: number
  /** Time improvement percentage */
  timeImprovement?: number
  /** Gathering estimate if this is a base material */
  gatheringEstimate?: GatheringEstimate
  /** Enhanced children */
  children: EnhancedRecipeNode[]
}

/**
 * Enhanced recipe statistics
 */
export interface EnhancedRecipeStats extends RecipeTreeStats {
  /** Total crafting time with player bonuses (seconds) */
  totalModifiedCraftingTime: number
  /** Total gathering time estimate (seconds) */
  totalGatheringTime: number
  /** Total time (crafting + gathering) */
  totalTimeEstimate: number
  /** Materials already in inventory */
  inventoryMaterials: Array<{
    itemHrid: ItemHrid
    item: Item
    quantity: number
  }>
  /** Materials still needed */
  materialsNeeded: Array<{
    itemHrid: ItemHrid
    item: Item
    quantityNeeded: number
    gatheringEstimate?: GatheringEstimate
  }>
}

/**
 * Calculate time modifiers from player data
 */
export function calculateTimeModifiers(
  playerData: PlayerData,
  skillHrid?: SkillHrid,
  actionType?: string
): TimeModifiers {
  const modifiers: TimeModifiers = {
    efficiency: 0,
    toolSpeed: 0,
    teaSpeed: 0,
    teaEfficiency: 0,
    haste: 0,
    taskSpeed: 0,
    houseBonus: 0,
    guildBonus: 0
  }

  // Calculate skill efficiency (1% per level over 1, capped at 99%)
  if (skillHrid && playerData.characterSkills) {
    const skill = playerData.characterSkills.find(s => s.skillHrid === skillHrid)
    if (skill) {
      modifiers.efficiency = Math.min(99, Math.max(0, skill.level - 1))
    }
  }

  // Calculate tool bonuses
  if (playerData.characterItems) {
    const tools = playerData.characterItems.filter((item: CharacterItem) => 
      item.itemLocationHrid && item.itemLocationHrid.includes('_tool')
    )
    
    // Each tool enhancement level gives bonus speed (this is simplified)
    tools.forEach((tool: CharacterItem) => {
      const enhancementLevel = tool.enhancementLevel || 0
      // Assume 5% speed per enhancement level (adjust based on actual game data)
      modifiers.toolSpeed += enhancementLevel * 5
    })
  }

  // Calculate buff bonuses from various sources
  const buffMaps = [
    playerData.mooPassActionTypeBuffsMap,
    playerData.communityActionTypeBuffsMap,
    playerData.houseActionTypeBuffsMap,
    playerData.consumableActionTypeBuffsMap,
    playerData.equipmentActionTypeBuffsMap
  ]
  
  buffMaps.forEach(buffMap => {
    if (buffMap && actionType && buffMap[actionType]) {
      const buffs = buffMap[actionType]
      if (Array.isArray(buffs)) {
        buffs.forEach((buff: Buff) => {
          // Speed buffs
          if (buff.typeHrid === '/buff_types/action_speed' || 
              buff.typeHrid === '/buff_types/task_action_speed') {
            modifiers.teaSpeed += buff.value || 0
          }
          // Efficiency buffs
          if (buff.typeHrid === '/buff_types/efficiency') {
            modifiers.teaEfficiency += buff.value || 0
          }
          // Note: Haste and task_speed buff types may not exist in the actual buff types
          // This is simplified for the calculator purposes
        })
      }
    }
  })

  // Calculate house room bonuses
  if (playerData.characterHouseRoomMap) {
    Object.values(playerData.characterHouseRoomMap).forEach((room: CharacterHouseRoom) => {
      // Simplified: each room level gives 2% efficiency
      modifiers.houseBonus += room.level * 2
    })
  }

  return modifiers
}

/**
 * Calculate modified action time with player bonuses
 */
export function calculateModifiedTime(
  baseTimeSeconds: number,
  modifiers: TimeModifiers
): number {
  // Apply efficiency (multiplicative, reduces time)
  const totalEfficiency = Math.min(99, 
    modifiers.efficiency + modifiers.teaEfficiency + modifiers.houseBonus + modifiers.guildBonus
  )
  const efficiencyMultiplier = 1 - totalEfficiency / 100

  // Apply speed bonuses (multiplicative, reduces time)
  const toolMultiplier = modifiers.toolSpeed > 0 ? 1 - modifiers.toolSpeed / 100 : 1
  const teaMultiplier = modifiers.teaSpeed > 0 ? 1 - modifiers.teaSpeed / 100 : 1
  
  // Apply haste and task speed (additive speed bonuses)
  const combinedSpeed = modifiers.haste + modifiers.taskSpeed
  const speedMultiplier = combinedSpeed > 0 ? 1 / (1 + combinedSpeed / 100) : 1

  // Calculate final time
  let finalTime = baseTimeSeconds
  finalTime *= efficiencyMultiplier
  finalTime *= toolMultiplier
  finalTime *= teaMultiplier
  finalTime *= speedMultiplier

  // Minimum time cap (3 seconds)
  return Math.max(3, finalTime)
}

/**
 * Find the best gathering action for an item
 */
export function findBestGatheringAction(itemHrid: ItemHrid): Action | null {
  // This is a simplified version - in reality you'd search all actions
  // that have this item in their drop table
  // For now, we'll return null and let the user specify
  return null
}

/**
 * Estimate gathering time for a material
 */
export function estimateGatheringTime(
  itemHrid: ItemHrid,
  quantityNeeded: number,
  playerData?: PlayerData,
  actionHrid?: ActionHrid
): GatheringEstimate | null {
  // If no action specified, try to find the best one
  const action = actionHrid ? getAction(actionHrid) : findBestGatheringAction(itemHrid)
  
  if (!action) {
    return null
  }

  // Get drop rates from action (simplified - assuming it's in dropTable)
  const dropInfo = action.dropTable?.find(drop => drop.itemHrid === itemHrid)
  
  if (!dropInfo) {
    return null
  }

  const minPerAction = dropInfo.minCount || 1
  const maxPerAction = dropInfo.maxCount || 1
  const avgPerAction = (minPerAction + maxPerAction) / 2

  // Calculate base time
  const baseTimeSeconds = (action.baseTimeCost || 10000000000) / 1000000000

  // Calculate modified time if player data provided
  let modifiedTimeSeconds = baseTimeSeconds
  if (playerData) {
    const modifiers = calculateTimeModifiers(
      playerData,
      action.levelRequirement?.skillHrid as SkillHrid,
      action.type
    )
    modifiedTimeSeconds = calculateModifiedTime(baseTimeSeconds, modifiers)
  }

  // Calculate actions needed
  const actionsNeeded = Math.ceil(quantityNeeded / avgPerAction)
  const totalTimeSeconds = actionsNeeded * modifiedTimeSeconds
  const itemsPerHour = (avgPerAction * 3600) / modifiedTimeSeconds

  return {
    itemHrid,
    actionHrid: action.hrid,
    minPerAction,
    maxPerAction,
    avgPerAction,
    baseTimeSeconds,
    modifiedTimeSeconds,
    totalTimeSeconds,
    actionsNeeded,
    itemsPerHour
  }
}

/**
 * Get item quantity in player inventory
 */
export function getInventoryQuantity(
  playerData: PlayerData,
  itemHrid: ItemHrid
): number {
  let total = 0
  
  // Check all character items
  if (playerData.characterItems) {
    playerData.characterItems.forEach((item: CharacterItem) => {
      if (item.itemHrid === itemHrid) {
        total += item.count
      }
    })
  }

  return total
}

/**
 * Enhance a recipe tree with player data
 */
export function enhanceRecipeTree(
  tree: RecipeTreeNode,
  playerData?: PlayerData,
  useInventory: boolean = false
): EnhancedRecipeNode {
  const inventoryQuantity = playerData && useInventory 
    ? getInventoryQuantity(playerData, tree.itemHrid)
    : 0

  const quantityNeeded = Math.max(0, tree.quantity - inventoryQuantity)

  let baseCraftingTime: number | undefined
  let modifiedCraftingTime: number | undefined
  let timeImprovement: number | undefined
  let gatheringEstimate: GatheringEstimate | undefined

  if (tree.recipe) {
    // Calculate crafting times
    baseCraftingTime = (tree.recipe.baseTimeCost || 0) / 1000000000
    
    if (playerData) {
      const modifiers = calculateTimeModifiers(
        playerData,
        tree.recipe.levelRequirement?.skillHrid as SkillHrid | undefined,
        tree.recipe.type
      )
      modifiedCraftingTime = calculateModifiedTime(baseCraftingTime, modifiers)
      
      // Calculate how many times we need to craft
      const outputCount = tree.recipe.outputItems.find(o => o.itemHrid === tree.itemHrid)?.count || 1
      const craftingIterations = Math.ceil(quantityNeeded / outputCount)
      modifiedCraftingTime *= craftingIterations
      
      timeImprovement = ((baseCraftingTime - modifiedCraftingTime) / baseCraftingTime) * 100
    }
  } else if (tree.isBaseMaterial && quantityNeeded > 0) {
    // Estimate gathering time for base materials
    gatheringEstimate = estimateGatheringTime(
      tree.itemHrid,
      quantityNeeded,
      playerData
    ) || undefined
  }

  // Recursively enhance children
  const enhancedChildren = tree.children.map(child => 
    enhanceRecipeTree(child, playerData, useInventory)
  )

  return {
    ...tree,
    inventoryQuantity,
    quantityNeeded,
    baseCraftingTime,
    modifiedCraftingTime,
    timeImprovement,
    gatheringEstimate,
    children: enhancedChildren
  }
}

/**
 * Calculate enhanced statistics for a recipe tree
 */
export function calculateEnhancedStats(
  tree: EnhancedRecipeNode
): EnhancedRecipeStats {
  const baseStats = calculateRecipeTreeStats(tree)
  
  let totalModifiedCraftingTime = 0
  let totalGatheringTime = 0
  const inventoryMaterials: Array<{ itemHrid: ItemHrid; item: Item; quantity: number }> = []
  const materialsNeeded: Array<{ 
    itemHrid: ItemHrid; 
    item: Item; 
    quantityNeeded: number;
    gatheringEstimate?: GatheringEstimate 
  }> = []

  function traverse(node: EnhancedRecipeNode) {
    // Track crafting time
    if (node.modifiedCraftingTime) {
      totalModifiedCraftingTime += node.modifiedCraftingTime
    }

    // Track gathering time
    if (node.gatheringEstimate) {
      totalGatheringTime += node.gatheringEstimate.totalTimeSeconds
    }

    // Track inventory usage
    if (node.inventoryQuantity > 0) {
      const existing = inventoryMaterials.find(m => m.itemHrid === node.itemHrid)
      if (existing) {
        existing.quantity += node.inventoryQuantity
      } else {
        inventoryMaterials.push({
          itemHrid: node.itemHrid,
          item: node.item,
          quantity: node.inventoryQuantity
        })
      }
    }

    // Track materials still needed
    if (node.quantityNeeded > 0 && node.isBaseMaterial) {
      const existing = materialsNeeded.find(m => m.itemHrid === node.itemHrid)
      if (existing) {
        existing.quantityNeeded += node.quantityNeeded
      } else {
        materialsNeeded.push({
          itemHrid: node.itemHrid,
          item: node.item,
          quantityNeeded: node.quantityNeeded,
          gatheringEstimate: node.gatheringEstimate
        })
      }
    }

    // Traverse children
    node.children.forEach(traverse)
  }

  traverse(tree)

  return {
    ...baseStats,
    totalModifiedCraftingTime,
    totalGatheringTime,
    totalTimeEstimate: totalModifiedCraftingTime + totalGatheringTime,
    inventoryMaterials,
    materialsNeeded
  }
}

/**
 * Main function to calculate recipe requirements with player data
 */
export function calculateRecipeWithPlayerData(
  itemHrid: ItemHrid,
  quantity: number = 1,
  playerData?: PlayerData,
  options: {
    useInventory?: boolean
    gatheringActions?: Map<ItemHrid, ActionHrid>
  } = {}
): {
  tree: EnhancedRecipeNode
  stats: EnhancedRecipeStats
  summary: {
    totalTime: string
    craftingTime: string
    gatheringTime: string
    inventorySavings: number
    materialsFromInventory: string[]
    materialsToGather: string[]
  }
} | null {
  // Build base recipe tree
  const baseTree = buildRecipeTree(itemHrid, quantity)
  
  if (!baseTree) {
    return null
  }

  // Enhance with player data
  const enhancedTree = enhanceRecipeTree(
    baseTree,
    playerData,
    options.useInventory || false
  )

  // Calculate statistics
  const stats = calculateEnhancedStats(enhancedTree)

  // Format times
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    const parts = []
    if (hours > 0) parts.push(\`\${hours}h\`)
    if (minutes > 0) parts.push(\`\${minutes}m\`)
    if (secs > 0) parts.push(\`\${secs}s\`)
    
    return parts.join(' ') || '0s'
  }

  // Calculate inventory savings
  const inventorySavings = stats.inventoryMaterials.reduce((total, mat) => {
    return total + mat.quantity
  }, 0)

  // Create summary
  const summary = {
    totalTime: formatTime(stats.totalTimeEstimate),
    craftingTime: formatTime(stats.totalModifiedCraftingTime),
    gatheringTime: formatTime(stats.totalGatheringTime),
    inventorySavings,
    materialsFromInventory: stats.inventoryMaterials.map(m => 
      \`\${m.item.name} x\${m.quantity}\`
    ),
    materialsToGather: stats.materialsNeeded.map(m => 
      \`\${m.item.name} x\${m.quantityNeeded}\`
    )
  }

  return {
    tree: enhancedTree,
    stats,
    summary
  }
}

/**
 * Find all recipes that can be crafted with current inventory
 */
export function findCraftableRecipes(
  playerData: PlayerData,
  recipes: Recipe[]
): Array<{
  recipe: Recipe
  canCraft: boolean
  timesToCraft: number
  missingItems: Array<{ itemHrid: ItemHrid; needed: number; have: number }>
}> {
  const results = []
  
  for (const recipe of recipes) {
    const missingItems: Array<{ itemHrid: ItemHrid; needed: number; have: number }> = []
    let canCraft = true
    let maxCrafts = Infinity

    // Check each input item
    for (const input of recipe.inputItems) {
      const have = getInventoryQuantity(playerData, input.itemHrid)
      const needed = input.count
      
      if (have < needed) {
        canCraft = false
        missingItems.push({ itemHrid: input.itemHrid, needed, have })
      } else {
        maxCrafts = Math.min(maxCrafts, Math.floor(have / needed))
      }
    }

    // Check upgrade item if required
    if (recipe.upgradeItemHrid) {
      const have = getInventoryQuantity(playerData, recipe.upgradeItemHrid as ItemHrid)
      if (have < 1) {
        canCraft = false
        missingItems.push({ itemHrid: recipe.upgradeItemHrid as ItemHrid, needed: 1, have })
      } else {
        maxCrafts = Math.min(maxCrafts, have)
      }
    }

    results.push({
      recipe,
      canCraft,
      timesToCraft: canCraft ? maxCrafts : 0,
      missingItems
    })
  }

  return results
}

/**
 * Export pre-calculated recipe data for common items
 */
export const COMMON_RECIPE_CALCULATIONS = {
  celestial_brush: (playerData?: PlayerData) => 
    calculateRecipeWithPlayerData('/items/celestial_brush' as ItemHrid, 1, playerData),
  holy_cheese: (playerData?: PlayerData) => 
    calculateRecipeWithPlayerData('/items/holy_cheese' as ItemHrid, 1, playerData),
  rainbow_cheese: (playerData?: PlayerData) => 
    calculateRecipeWithPlayerData('/items/rainbow_cheese' as ItemHrid, 1, playerData)
}
`

    // Write the file
    const { writeGeneratedFile } = await import('../base/file-writer.js')
    const outputPath = join(PATHS.gameLogic, `${this.config.outputFilename}.ts`)
    await writeGeneratedFile(outputPath, content, { format: false })
  }
}
