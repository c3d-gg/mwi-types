import { writeFile } from 'fs/promises'
import { join } from 'path'

import type { GameData } from '../../types/source-data'

/**
 * Generates TypeScript code for all recipes in the game with Zod schemas
 */
export async function generateRecipes(gameData: GameData, outputDir: string) {
	console.log('🔧 Generating recipes...')

	const recipes: Record<string, any> = {}
	const recipesByAction: Record<string, string> = {}
	const recipesBySkill: Record<string, Record<number, string[]>> = {}
	const craftableItems = new Set<string>()
	const allSkills = new Set<string>()
	const allActionCategories = new Set<string>()

	// Process all actions to find recipes
	for (const [actionHrid, action] of Object.entries(gameData.actionDetailMap)) {
		// Collect all skills and categories
		allSkills.add(action.levelRequirement.skillHrid)
		allActionCategories.add(action.category)

		// Skip non-production actions
		if (
			action.function !== '/action_functions/production' ||
			!action.outputItems ||
			action.outputItems.length === 0
		) {
			continue
		}

		const outputItem = action.outputItems[0]
		if (!outputItem || !action.inputItems || action.inputItems.length === 0) {
			continue
		}

		const itemHrid = outputItem.itemHrid
		craftableItems.add(itemHrid)

		// Build recipe object
		recipes[itemHrid] = {
			inputs: action.inputItems.map((input) => ({
				item: input.itemHrid,
				count: input.count
			})),
			output: {
				item: itemHrid,
				count: outputItem.count
			},
			skill: action.levelRequirement.skillHrid,
			level: action.levelRequirement.level,
			action: actionHrid,
			time: Math.floor(action.baseTimeCost / 1000000), // Convert nanoseconds to milliseconds
			experience: action.experienceGain.value,
			category: action.category.split('/').pop() || 'unknown'
		}

		// Build reverse lookup
		recipesByAction[actionHrid] = itemHrid

		// Build skill-based grouping
		const skillHrid = action.levelRequirement.skillHrid
		const level = action.levelRequirement.level
		if (!recipesBySkill[skillHrid]) {
			recipesBySkill[skillHrid] = {}
		}
		if (!recipesBySkill[skillHrid][level]) {
			recipesBySkill[skillHrid][level] = []
		}
		recipesBySkill[skillHrid][level].push(itemHrid)
	}

	// Sort arrays
	const sortedSkills = Array.from(allSkills).sort()
	const sortedCategories = Array.from(allActionCategories).sort()

	for (const skill of Object.values(recipesBySkill)) {
		for (const items of Object.values(skill)) {
			items.sort()
		}
	}

	// Generate TypeScript content with imports from source of truth
	const content = `/**
 * Auto-generated recipe data with Zod schemas - DO NOT EDIT
 * Generated from game data on ${new Date().toISOString()}
 */

import { z } from 'zod/v4'
import type { ItemHrid } from './types'

// Import schemas from the source of truth
import {
	ItemQuantitySchema,
	type ItemQuantity
} from '../../types/source-data'

// Import skill enum from skills generator (will be available after skills are generated)
import { SkillHridEnum, type SkillHrid } from './skills'

/**
 * Action category enum for recipes (simplified to last segment)
 */
export const RecipeCategoryEnum = z.enum([
${sortedCategories.map((cat) => `\t'${cat.split('/').pop()}'`).join(',\n')}
])
export type RecipeCategory = z.infer<typeof RecipeCategoryEnum>

/**
 * Recipe schema using ItemQuantity from game_data.ts
 */
export const RecipeSchema = z.object({
	inputs: z.array(ItemQuantitySchema),
	output: ItemQuantitySchema,
	skill: SkillHridEnum,
	level: z.number(),
	action: z.string(),
	time: z.number(),
	experience: z.number(),
	category: z.string()
})

export type Recipe = z.infer<typeof RecipeSchema>

/**
 * All crafting recipes indexed by output item HRID
 */
export const RECIPES = ${JSON.stringify(recipes, null, 2)} as const

/**
 * Reverse lookup: action HRID to output item HRID
 */
export const RECIPES_BY_ACTION = ${JSON.stringify(recipesByAction, null, 2)} as const

/**
 * Recipes grouped by skill and level
 */
export const RECIPES_BY_SKILL = ${JSON.stringify(recipesBySkill, null, 2)} as const

/**
 * Set of all craftable item HRIDs
 */
export const CRAFTABLE_ITEMS = new Set(${JSON.stringify(
		Array.from(craftableItems).sort(),
		null,
		2
	)})

// Type exports
export type RecipeId = keyof typeof RECIPES
export type RecipeData = typeof RECIPES[RecipeId]

/**
 * Get recipe for a specific item
 * @param itemHrid - The item HRID to get the recipe for
 * @returns The parsed Recipe object if the item can be crafted, undefined otherwise
 * @example
 * \`\`\`ts
 * const milkRecipe = getRecipe('/items/milk')
 * if (milkRecipe) {
 *   console.log(\`Requires \${milkRecipe.inputs.length} ingredients\`)
 * }
 * \`\`\`
 */
export function getRecipe(itemHrid: string): Recipe | undefined {
	const recipe = RECIPES[itemHrid as RecipeId]
	return recipe ? RecipeSchema.parse(recipe) : undefined
}

/**
 * Check if an item can be crafted
 * @param itemHrid - The item HRID to check
 * @returns True if the item has a crafting recipe, false otherwise
 * @example
 * \`\`\`ts
 * if (isCraftable('/items/milk')) {
 *   console.log('Milk can be crafted!')
 * }
 * \`\`\`
 */
export function isCraftable(itemHrid: string): boolean {
	return CRAFTABLE_ITEMS.has(itemHrid)
}

/**
 * Find all recipes that use an item as input
 * @param itemHrid - The item HRID to search for in recipe inputs
 * @returns Array of Recipe objects that require this item as an ingredient
 * @example
 * \`\`\`ts
 * const recipesUsingMilk = findRecipesUsingItem('/items/milk')
 * console.log(\`Milk is used in \${recipesUsingMilk.length} recipes\`)
 * \`\`\`
 */
export function findRecipesUsingItem(itemHrid: string): Recipe[] {
	const results: Recipe[] = []
	for (const recipe of Object.values(RECIPES)) {
		if (recipe.inputs.some(input => input.item === itemHrid)) {
			results.push(RecipeSchema.parse(recipe))
		}
	}
	return results
}

/**
 * Get all recipes for a specific skill at or below a level
 * @param skillHrid - The skill HRID from SkillHridEnum
 * @param maxLevel - The maximum skill level (inclusive)
 * @returns Array of item HRIDs that can be crafted at or below the specified level
 * @example
 * \`\`\`ts
 * const cookingRecipes = getRecipesForSkillLevel('/skills/cooking', 50)
 * console.log(\`Can craft \${cookingRecipes.length} items with Cooking level 50\`)
 * \`\`\`
 */
export function getRecipesForSkillLevel(skillHrid: SkillHrid, maxLevel: number): string[] {
	const skillRecipes = RECIPES_BY_SKILL[skillHrid as keyof typeof RECIPES_BY_SKILL]
	if (!skillRecipes) return []
	
	const items: string[] = []
	for (const [level, levelItems] of Object.entries(skillRecipes)) {
		if (parseInt(level) <= maxLevel) {
			items.push(...(levelItems as readonly string[]))
		}
	}
	return items
}

/**
 * Validate an item HRID for recipes
 * @param hrid - The item HRID to validate
 * @returns The validated ItemHrid
 * @throws Error if the item is not involved in any recipes (neither as output nor input)
 * @example
 * \`\`\`ts
 * try {
 *   const validItem = validateRecipeItem('/items/milk')
 *   // validItem is now typed as ItemHrid and guaranteed to be recipe-related
 * } catch (error) {
 *   console.error('Item not found in any recipes')
 * }
 * \`\`\`
 */
export function validateRecipeItem(hrid: string): ItemHrid {
	if (!(hrid in RECIPES) && !CRAFTABLE_ITEMS.has(hrid)) {
		// Check if it's used as an input in any recipe
		const usedAsInput = Object.values(RECIPES).some(recipe => 
			recipe.inputs.some(input => input.item === hrid)
		)
		if (!usedAsInput) {
			throw new Error(\`Invalid recipe item: \${hrid}\`)
		}
	}
	return hrid as ItemHrid
}
`

	// Write the file
	const outputPath = join(outputDir, 'recipes.ts')
	await writeFile(outputPath, content, 'utf-8')

	console.log(`✅ Generated ${Object.keys(recipes).length} recipes`)
	console.log(`   - ${craftableItems.size} craftable items`)
	console.log(`   - ${Object.keys(recipesBySkill).length} skills with recipes`)
	console.log(`   - ${sortedSkills.length} skill enums`)

	return {
		recipeCount: Object.keys(recipes).length,
		craftableItemCount: craftableItems.size,
		skillCount: sortedSkills.length
	}
}
