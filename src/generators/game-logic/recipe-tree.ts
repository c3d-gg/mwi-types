import { readFileSync } from 'fs'
import { join } from 'path'
import { PATHS } from '../../config/paths.js'
import { BaseGenerator } from '../base/base-generator.js'
import type { BaseEntity, GeneratorConfig } from '../base/types.js'

interface RecipeTreeEntity extends BaseEntity {
  hrid: string
  inputItems?: Array<{ itemHrid: string; count: number }>
  outputItems?: Array<{ itemHrid: string; count: number }>
  levelRequirement?: { skillHrid: string; level: number }
  [key: string]: any
}

interface ItemEntity extends BaseEntity {
  hrid: string
  name: string
  categoryHrid: string
  itemLevel?: number
  sellPrice?: number
  [key: string]: any
}

export class RecipeTreeGenerator extends BaseGenerator<RecipeTreeEntity> {
  private items: Record<string, ItemEntity> = {}
  private recipes: Record<string, RecipeTreeEntity> = {}

  constructor() {
    const config: GeneratorConfig = {
      entityName: 'recipe-tree',
      entityNamePlural: 'recipe-trees',
      sourceKey: 'actionDetailMap',
      outputFilename: 'recipe-tree',
      generateZodSchema: false,
      generateTypeboxSchema: false,
      generateHrids: false,
    }
    super(config)
  }

  protected extractEntities(): Record<string, RecipeTreeEntity> {
    // Load items
    const gameData = JSON.parse(readFileSync(PATHS.sourceData, 'utf-8'))
    this.items = gameData.itemDetailMap || {}

    // Extract recipes (actions with input and output items)
    const actionData = this.getEntitiesFromGameData() as Record<string, any>
    const recipeEntities: Record<string, RecipeTreeEntity> = {}

    Object.entries(actionData).forEach(([hrid, action]) => {
      if (
        action.inputItems !== null &&
        action.inputItems !== undefined &&
        action.outputItems !== null &&
        action.outputItems !== undefined &&
        Array.isArray(action.inputItems) &&
        Array.isArray(action.outputItems) &&
        action.inputItems.length > 0 &&
        action.outputItems.length > 0
      ) {
        recipeEntities[hrid] = action as RecipeTreeEntity
      }
    })

    this.recipes = recipeEntities
    return recipeEntities
  }

  protected defineSchemaProperties(): any[] {
    return []
  }

  protected override async generateGameLogicFile(
    entities: Record<string, RecipeTreeEntity>
  ): Promise<void> {
    const content = `
/**
 * Recipe tree generator for building complete item dependency trees
 * @module
 */

import type { Recipe, RecipeHrid } from './recipes.js'
import type { Item, ItemHrid } from './items.js'
import type { SkillHrid } from './skills.js'
import { RECIPES, getRecipesProducingItem } from './recipes.js'
import { ITEMS, getItem } from './items.js'

/**
 * Represents a node in the recipe dependency tree
 */
export interface RecipeTreeNode {
  /** The item HRID */
  itemHrid: ItemHrid
  /** Full item details */
  item: Item
  /** Quantity required at this level */
  quantity: number
  /** Recipe that produces this item (if any) */
  recipe?: Recipe
  /** Skill requirement for crafting */
  skillRequirement?: {
    skillHrid: SkillHrid
    level: number
  }
  /** Total quantity needed considering all parent requirements */
  totalQuantityNeeded: number
  /** Child dependencies (ingredients) */
  children: RecipeTreeNode[]
  /** Depth in the tree (0 for root) */
  depth: number
  /** Whether this is a base material (no recipe) */
  isBaseMaterial: boolean
  /** Total crafting time in nanoseconds */
  totalCraftingTime?: number
}

/**
 * Statistics about the recipe tree
 */
export interface RecipeTreeStats {
  /** Total unique items in the tree */
  totalUniqueItems: number
  /** Total quantity of all items needed */
  totalQuantity: number
  /** Maximum tree depth */
  maxDepth: number
  /** Base materials required (items with no recipe) */
  baseMaterials: Array<{
    itemHrid: ItemHrid
    item: Item
    totalQuantity: number
  }>
  /** All unique skills required */
  requiredSkills: Array<{
    skillHrid: SkillHrid
    minLevel: number
  }>
  /** Total crafting time for all recipes */
  totalCraftingTime: number
  /** Recipes by skill */
  recipesBySkill: Partial<Record<SkillHrid, Recipe[]>>
}

/**
 * Cache for recipe trees to avoid recalculation
 */
const recipeTreeCache = new Map<string, RecipeTreeNode>()

/**
 * Build a complete recipe tree for an item
 * @param itemHrid The item to build the tree for
 * @param quantity The quantity needed (default: 1)
 * @param depth Current depth in the tree (used internally)
 * @param visitedItems Set of visited items to prevent infinite loops
 * @returns The recipe tree node or null if item doesn't exist
 */
export function buildRecipeTree(
  itemHrid: ItemHrid,
  quantity: number = 1,
  depth: number = 0,
  visitedItems: Set<string> = new Set()
): RecipeTreeNode | null {
  // Get item details
  const item = getItem(itemHrid)
  if (!item) {
    return null
  }

  // Check for circular dependencies
  if (visitedItems.has(itemHrid)) {
    console.warn(\`Circular dependency detected for item: \${itemHrid}\`)
    return {
      itemHrid,
      item,
      quantity,
      totalQuantityNeeded: quantity,
      children: [],
      depth,
      isBaseMaterial: true,
      recipe: undefined,
      skillRequirement: undefined
    }
  }

  // Add to visited items
  const newVisitedItems = new Set(visitedItems)
  newVisitedItems.add(itemHrid)

  // Find recipes that produce this item
  const recipes = getRecipesProducingItem(itemHrid)
  
  // If no recipe exists, this is a base material
  if (recipes.length === 0) {
    return {
      itemHrid,
      item,
      quantity,
      totalQuantityNeeded: quantity,
      children: [],
      depth,
      isBaseMaterial: true,
      recipe: undefined,
      skillRequirement: undefined
    }
  }

  // Use the first recipe (you could implement logic to choose the best recipe)
  const recipe = recipes[0] as Recipe
  
  // Calculate how many times we need to craft
  const outputCount = recipe.outputItems.find(o => o.itemHrid === itemHrid)?.count || 1
  const craftingIterations = Math.ceil(quantity / outputCount)
  
  // Build child nodes for each input item
  const children: RecipeTreeNode[] = []
  
  // Check if this recipe requires an upgrade item first
  if (recipe.upgradeItemHrid && recipe.upgradeItemHrid !== '') {
    // Add the upgrade item as a dependency
    const upgradeNode = buildRecipeTree(
      recipe.upgradeItemHrid as ItemHrid,
      1 * craftingIterations, // Usually need 1 upgrade item per craft
      depth + 1,
      newVisitedItems
    )
    if (upgradeNode) {
      children.push(upgradeNode)
    }
  }
  
  // Add regular input items
  for (const input of recipe.inputItems) {
    const childNode = buildRecipeTree(
      input.itemHrid as ItemHrid,
      input.count * craftingIterations,
      depth + 1,
      newVisitedItems
    )
    if (childNode) {
      children.push(childNode)
    }
  }

  return {
    itemHrid,
    item,
    quantity,
    totalQuantityNeeded: quantity,
    recipe,
    skillRequirement: recipe.levelRequirement ? {
      skillHrid: recipe.levelRequirement.skillHrid as SkillHrid,
      level: recipe.levelRequirement.level
    } : undefined,
    children,
    depth,
    isBaseMaterial: false,
    totalCraftingTime: recipe.baseTimeCost * craftingIterations
  }
}

/**
 * Get or build a recipe tree for an item (with caching)
 * @param itemHrid The item to get the recipe tree for
 * @param quantity The quantity needed
 * @returns The recipe tree or null if item doesn't exist
 */
export function getItemRecipeTree(itemHrid: ItemHrid, quantity: number = 1): RecipeTreeNode | null {
  const cacheKey = \`\${itemHrid}:\${quantity}\`
  
  if (!recipeTreeCache.has(cacheKey)) {
    const tree = buildRecipeTree(itemHrid, quantity)
    if (tree) {
      recipeTreeCache.set(cacheKey, tree)
    }
    return tree
  }
  
  return recipeTreeCache.get(cacheKey) || null
}

/**
 * Calculate statistics for a recipe tree
 * @param tree The recipe tree node
 * @returns Statistics about the tree
 */
export function calculateRecipeTreeStats(tree: RecipeTreeNode): RecipeTreeStats {
  const uniqueItems = new Map<ItemHrid, number>()
  const baseMaterials = new Map<ItemHrid, number>()
  const requiredSkills = new Map<SkillHrid, number>()
  const recipesBySkill: Partial<Record<SkillHrid, Recipe[]>> = {}
  let totalCraftingTime = 0
  let maxDepth = 0

  function traverse(node: RecipeTreeNode) {
    // Track unique items
    uniqueItems.set(
      node.itemHrid,
      (uniqueItems.get(node.itemHrid) || 0) + node.quantity
    )

    // Track max depth
    maxDepth = Math.max(maxDepth, node.depth)

    // Track base materials
    if (node.isBaseMaterial) {
      baseMaterials.set(
        node.itemHrid,
        (baseMaterials.get(node.itemHrid) || 0) + node.quantity
      )
    }

    // Track required skills
    if (node.skillRequirement) {
      const currentLevel = requiredSkills.get(node.skillRequirement.skillHrid) || 0
      requiredSkills.set(
        node.skillRequirement.skillHrid,
        Math.max(currentLevel, node.skillRequirement.level)
      )

      // Track recipes by skill
      if (node.recipe) {
        const skillHrid = node.skillRequirement.skillHrid
        if (!recipesBySkill[skillHrid]) {
          recipesBySkill[skillHrid] = []
        }
        const skillRecipes = recipesBySkill[skillHrid]
        if (skillRecipes && !skillRecipes.includes(node.recipe)) {
          skillRecipes.push(node.recipe)
        }
      }
    }

    // Track crafting time
    if (node.totalCraftingTime) {
      totalCraftingTime += node.totalCraftingTime
    }

    // Traverse children
    for (const child of node.children) {
      traverse(child)
    }
  }

  traverse(tree)

  return {
    totalUniqueItems: uniqueItems.size,
    totalQuantity: Array.from(uniqueItems.values()).reduce((sum, q) => sum + q, 0),
    maxDepth,
    baseMaterials: Array.from(baseMaterials.entries()).map(([hrid, quantity]) => ({
      itemHrid: hrid,
      item: getItem(hrid)!,
      totalQuantity: quantity
    })),
    requiredSkills: Array.from(requiredSkills.entries()).map(([hrid, level]) => ({
      skillHrid: hrid,
      minLevel: level
    })),
    totalCraftingTime,
    recipesBySkill
  }
}

/**
 * Find all recipes that use an item (at any depth)
 * @param itemHrid The item to search for
 * @returns Array of recipes that use this item
 */
export function getRecipesUsingItem(itemHrid: ItemHrid): Recipe[] {
  const recipesUsingItem = new Set<Recipe>()
  
  // Check all recipes
  for (const recipe of Object.values(RECIPES)) {
    // Direct usage
    if (recipe.inputItems.some(input => input.itemHrid === itemHrid)) {
      recipesUsingItem.add(recipe)
      continue
    }
    
    // Check if any output item's recipe tree contains this item
    for (const output of recipe.outputItems) {
      const tree = buildRecipeTree(output.itemHrid as ItemHrid)
      if (tree && treeContainsItem(tree, itemHrid)) {
        recipesUsingItem.add(recipe)
        break
      }
    }
  }
  
  return Array.from(recipesUsingItem)
}

/**
 * Check if a recipe tree contains a specific item
 * @param tree The recipe tree to search
 * @param itemHrid The item to search for
 * @returns True if the item is found in the tree
 */
function treeContainsItem(tree: RecipeTreeNode, itemHrid: ItemHrid): boolean {
  if (tree.itemHrid === itemHrid) {
    return true
  }
  
  for (const child of tree.children) {
    if (treeContainsItem(child, itemHrid)) {
      return true
    }
  }
  
  return false
}

/**
 * Get all items that are eventually used to craft an item
 * @param itemHrid The final item
 * @returns Map of item HRIDs to total quantities needed
 */
export function getAllRequiredMaterials(itemHrid: ItemHrid, quantity: number = 1): Map<ItemHrid, number> {
  const materials = new Map<ItemHrid, number>()
  const tree = buildRecipeTree(itemHrid, quantity)
  
  if (!tree) {
    return materials
  }
  
  function collectMaterials(node: RecipeTreeNode) {
    // Only collect base materials or add the item itself if no recipe
    if (node.isBaseMaterial) {
      materials.set(
        node.itemHrid,
        (materials.get(node.itemHrid) || 0) + node.quantity
      )
    }
    
    // Traverse children
    for (const child of node.children) {
      collectMaterials(child)
    }
  }
  
  collectMaterials(tree)
  return materials
}

/**
 * Get a simplified recipe path (just the item chain)
 * @param itemHrid The target item
 * @returns Array of item HRIDs from base materials to target
 */
export function getRecipePath(itemHrid: ItemHrid): ItemHrid[] {
  const tree = buildRecipeTree(itemHrid)
  if (!tree) {
    return []
  }
  
  const path: ItemHrid[] = []
  
  function findLongestPath(node: RecipeTreeNode, currentPath: ItemHrid[]): ItemHrid[] {
    const newPath = [...currentPath, node.itemHrid]
    
    if (node.children.length === 0) {
      return newPath
    }
    
    let longestChildPath = newPath
    for (const child of node.children) {
      const childPath = findLongestPath(child, [])
      if (childPath.length > longestChildPath.length - newPath.length) {
        longestChildPath = [...childPath, ...newPath]
      }
    }
    
    return longestChildPath
  }
  
  return findLongestPath(tree, [])
}

/**
 * Export all recipe tree data for a given list of items
 * Useful for pre-generating recipe trees
 */
export function exportRecipeTrees(itemHrids: ItemHrid[]): Record<ItemHrid, RecipeTreeNode | null> {
  const trees: Record<ItemHrid, RecipeTreeNode | null> = {} as any
  
  for (const hrid of itemHrids) {
    trees[hrid] = buildRecipeTree(hrid)
  }
  
  return trees
}

/**
 * Clear the recipe tree cache
 */
export function clearRecipeTreeCache(): void {
  recipeTreeCache.clear()
}

// Pre-generate trees for common high-tier items
export const COMMON_RECIPE_TREES = {
  celestial_brush: () => getItemRecipeTree('/items/celestial_brush' as ItemHrid),
  celestial_hammer: () => getItemRecipeTree('/items/celestial_hammer' as ItemHrid),
  celestial_needle: () => getItemRecipeTree('/items/celestial_needle' as ItemHrid),
  celestial_hatchet: () => getItemRecipeTree('/items/celestial_hatchet' as ItemHrid),
  holy_cheese: () => getItemRecipeTree('/items/holy_cheese' as ItemHrid),
  rainbow_cheese: () => getItemRecipeTree('/items/rainbow_cheese' as ItemHrid)
}
`

    // Write the file
    const { writeGeneratedFile } = await import('../base/file-writer.js')
    const outputPath = join(PATHS.gameLogic, `${this.config.outputFilename}.ts`)
    await writeGeneratedFile(outputPath, content, { format: false })
  }
}
