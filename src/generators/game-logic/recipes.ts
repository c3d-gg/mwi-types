import { BaseGenerator } from '../base/base-generator'
import type { GeneratorConfig, BaseEntity, PropertyDefinition } from '../base/types'
import { join } from 'path'
import { PATHS } from '../../config/paths'

// Recipe entity extends from Action but filtered to only those with input/output items
interface RecipeEntity extends BaseEntity {
  hrid: string
  inputItems: Array<{ itemHrid: string; count: number }>
  outputItems: Array<{ itemHrid: string; count: number }>
  [key: string]: any // Allow other action properties
}

export class RecipesGenerator extends BaseGenerator<RecipeEntity> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'recipe',
      entityNamePlural: 'recipes',
      sourceKey: 'actionDetailMap',
      outputFilename: 'recipes',
      generateZodSchema: false, // We use Action schema
      generateTypeboxSchema: false, // We use Action schema
      generateHrids: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, RecipeEntity> {
    const actionData = this.getEntitiesFromGameData() as Record<string, any>
    const recipeEntities: Record<string, RecipeEntity> = {}
    
    // Filter actions to only include those with inputItems and outputItems
    Object.entries(actionData).forEach(([hrid, action]) => {
      if (action.inputItems !== null && 
          action.inputItems !== undefined && 
          action.outputItems !== null && 
          action.outputItems !== undefined &&
          Array.isArray(action.inputItems) &&
          Array.isArray(action.outputItems) &&
          action.inputItems.length > 0 &&
          action.outputItems.length > 0) {
        recipeEntities[hrid] = action as RecipeEntity
      }
    })
    
    return recipeEntities
  }

  protected defineSchemaProperties(entity: RecipeEntity): PropertyDefinition[] {
    // Recipes use the same schema as actions, so we return empty array
    // The schema is imported from actions
    return []
  }

  protected override async generateGameLogicFile(entities: Record<string, RecipeEntity>): Promise<void> {
    const recipeHrids = Object.keys(entities).sort()
    
    const content = `import { type Action, ActionHridEnum } from './actions'
import { type ItemHrid } from './items'
import { type SkillHrid } from './skills'
import { z } from 'zod'

// Recipe is a specialized type for actions that have input and output items
export interface RecipeItem {
  itemHrid: ItemHrid
  count: number
}

export interface Recipe extends Action {
  inputItems: RecipeItem[]
  outputItems: RecipeItem[]
}

// Re-export the schema from actions since recipes use the same structure
export { ActionSchema as RecipeSchema } from '../schemas/zod/actions'

// Recipe HRIDs are a subset of Action HRIDs
export const RecipeHridEnum = z.enum([
${recipeHrids.map(hrid => `  '${hrid}'`).join(',\n')}
] as const)

export type RecipeHrid = z.infer<typeof RecipeHridEnum>

// All recipes (actions with input and output items)
export const RECIPES: Record<RecipeHrid, Recipe> = {
${Object.entries(entities).map(([hrid, action]) => `  '${hrid}': ${JSON.stringify(action, null, 2).split('\n').join('\n  ')}`).join(',\n')}
} as const satisfies Record<RecipeHrid, Recipe>

// Organize recipes by skill
export const RECIPES_BY_SKILL: Record<SkillHrid, readonly RecipeHrid[]> = Object.entries(RECIPES).reduce((acc, [hrid, recipe]) => {
  const skillHrid = recipe.levelRequirement?.skillHrid
  if (skillHrid) {
    if (!acc[skillHrid as SkillHrid]) {
      acc[skillHrid as SkillHrid] = []
    }
    ;(acc[skillHrid as SkillHrid] as RecipeHrid[]).push(hrid as RecipeHrid)
  }
  return acc
}, {} as Record<SkillHrid, RecipeHrid[]>) as Record<SkillHrid, readonly RecipeHrid[]>

// Organize recipes by output item
export const RECIPES_BY_OUTPUT_ITEM: Record<string, readonly RecipeHrid[]> = Object.entries(RECIPES).reduce((acc, [hrid, recipe]) => {
  recipe.outputItems.forEach(output => {
    if (!acc[output.itemHrid]) {
      acc[output.itemHrid] = []
    }
    ;(acc[output.itemHrid] as RecipeHrid[]).push(hrid as RecipeHrid)
  })
  return acc
}, {} as Record<string, RecipeHrid[]>) as Record<string, readonly RecipeHrid[]>

// Utility functions
export function getRecipe(hrid: RecipeHrid): Recipe {
  return RECIPES[hrid]
}

export function getRecipesBySkill(skillHrid: SkillHrid): readonly Recipe[] {
  return (RECIPES_BY_SKILL[skillHrid] || []).map(hrid => RECIPES[hrid])
}

export function getRecipesProducingItem(itemHrid: ItemHrid): readonly Recipe[] {
  return (RECIPES_BY_OUTPUT_ITEM[itemHrid] || []).map(hrid => RECIPES[hrid])
}

export function getRecipesRequiringItem(itemHrid: ItemHrid): readonly Recipe[] {
  return Object.values(RECIPES).filter(recipe =>
    recipe.inputItems.some(input => input.itemHrid === itemHrid)
  )
}

export function getRecipesByMinLevel(minLevel: number): readonly Recipe[] {
  return Object.values(RECIPES).filter(recipe =>
    recipe.levelRequirement && recipe.levelRequirement.level >= minLevel
  )
}

export function canCraftRecipe(recipe: Recipe, inventory: Record<ItemHrid, number>): boolean {
  return recipe.inputItems.every(input =>
    (inventory[input.itemHrid as ItemHrid] || 0) >= input.count
  )
}

export function getRecipeOutputCount(recipe: Recipe, itemHrid: ItemHrid): number {
  const output = recipe.outputItems.find(o => o.itemHrid === itemHrid)
  return output?.count || 0
}

export function getRecipeInputCount(recipe: Recipe, itemHrid: ItemHrid): number {
  const input = recipe.inputItems.find(i => i.itemHrid === itemHrid)
  return input?.count || 0
}

// Export recipe count for summary
export const RECIPE_COUNT = ${Object.keys(entities).length}
`

    // Write the file
    const { writeGeneratedFile } = await import('../base/file-writer')
    const outputPath = join(PATHS.gameLogic, `${this.config.outputFilename}.ts`)
    await writeGeneratedFile(outputPath, content, { format: false })
  }
}