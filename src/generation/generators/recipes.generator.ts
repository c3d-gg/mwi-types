import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

interface RecipeItem {
	itemHrid: string
	count: number
}

// Special case: Recipes define their own LevelRequirement and ExperienceGain
// because recipes are a derived type that doesn't exist in game data
interface LevelRequirement {
	skillHrid: string
	level: number
}

interface ExperienceGain {
	skillHrid: string
	value: number
}

interface Recipe {
	hrid: string
	function: string
	type: string
	category: string
	name: string
	baseTimeCost: number
	experienceGain: ExperienceGain | null
	levelRequirement: LevelRequirement | null
	inputItems: RecipeItem[] | null
	outputItems: RecipeItem[] | null
	upgradeItemHrid?: string
	retainAllEnhancement?: boolean
	sortIndex?: number
}

export class RecipesGenerator extends BaseGenerator<Recipe> {
	// We no longer collect action metadata - it comes from Actions module

	constructor(outputPath: string) {
		super({
			entityName: 'Recipe',
			entityNamePlural: 'Recipes',
			sourceKey: 'actionDetailMap',
			outputPath,
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected extractEntities(sourceData: any): Record<string, Recipe> {
		const recipes: Record<string, Recipe> = {}
		const actionMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(actionMap)) {
			// Only include actions that are recipes (have input/output items)
			if (this.isRecipe(data)) {
				const recipe = this.extractRecipe(hrid, data as any)
				recipes[hrid] = recipe
				this.collectUniqueValues(recipe)
			}
		}

		return recipes
	}

	private isRecipe(data: any): boolean {
		return !!(data.inputItems || data.outputItems)
	}

	private extractRecipe(hrid: string, data: any): Recipe {
		return {
			hrid,
			function: data.function || '',
			type: data.type || '',
			category: data.category || '',
			name: data.name || '',
			baseTimeCost: data.baseTimeCost || 0,
			experienceGain: this.extractExperienceGain(data.experienceGain),
			levelRequirement: this.extractLevelRequirement(data.levelRequirement),
			inputItems: this.extractItems(data.inputItems),
			outputItems: this.extractItems(data.outputItems),
			upgradeItemHrid:
				data.upgradeItemHrid && data.upgradeItemHrid !== ''
					? data.upgradeItemHrid
					: undefined,
			retainAllEnhancement: data.retainAllEnhancement || undefined,
			sortIndex: data.sortIndex || undefined,
		}
	}

	private extractItems(items: any): RecipeItem[] | null {
		if (!items || !Array.isArray(items) || items.length === 0) {
			return null
		}
		return items.map((item) => ({
			itemHrid: item.itemHrid || '',
			count: item.count || 1,
		}))
	}

	private extractLevelRequirement(req: any): LevelRequirement | null {
		if (!req || typeof req !== 'object') {
			return null
		}
		return {
			skillHrid: req.skillHrid || '',
			level: req.level || 0,
		}
	}

	private extractExperienceGain(exp: any): ExperienceGain | null {
		if (!exp || typeof exp !== 'object') {
			return null
		}
		return {
			skillHrid: exp.skillHrid || '',
			value: exp.value || 0,
		}
	}

	protected override collectUniqueValues(recipe: Recipe): void {
		// Action metadata is no longer collected here - comes from Actions module
	}

	protected generateInterfaces(entities: Record<string, Recipe>): void {
		// Add imports from other generated files
		this.builder.addImport('./items', ['ItemHrid'], true)
		this.builder.addImport('./skills', ['SkillHrid'], true)
		this.builder.addImport('./actions', ['ActionFunction', 'ActionType'], true)
		this.builder.addImport('./action-categories', ['ActionCategoryHrid'], true)

		// Don't generate action types - they come from Actions module

		// Then generate interfaces using those types
		const recipeItemProps: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid' },
			{ name: 'count', type: 'number' },
		]
		this.builder.addInterface('RecipeItem', recipeItemProps)

		// LevelRequirement and ExperienceGain interfaces - Special case for recipes
		// Recipes defines internal versions but uses the actions module types
		// to avoid export conflicts while maintaining recipe-specific structure
		this.builder.addImport(
			'./actions',
			['LevelRequirement', 'ExperienceGain'],
			true,
		)

		const recipeProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'RecipeHrid' },
			{ name: 'function', type: 'ActionFunction' },
			{ name: 'type', type: 'ActionType' },
			{ name: 'category', type: 'ActionCategoryHrid' },
			{ name: 'name', type: 'string' },
			{ name: 'baseTimeCost', type: 'number' },
			{ name: 'experienceGain', type: 'ExperienceGain | null' },
			{ name: 'levelRequirement', type: 'LevelRequirement | null' },
			{ name: 'inputItems', type: 'RecipeItem[] | null' },
			{ name: 'outputItems', type: 'RecipeItem[] | null' },
			{ name: 'upgradeItemHrid', type: 'ItemHrid', optional: true },
			{ name: 'retainAllEnhancement', type: 'boolean', optional: true },
			{ name: 'sortIndex', type: 'number', optional: true },
		]
		this.builder.addInterface('Recipe', recipeProps)
	}

	// Action types are now imported from Actions module, not generated here

	protected override generateUtilities(entities: Record<string, Recipe>): void {
		// Generate base utilities
		super.generateUtilities(entities)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(entities: Record<string, Recipe>): void {
		// Group recipes by skill
		const recipesBySkill: Record<string, string[]> = {}
		for (const [hrid, recipe] of Object.entries(entities)) {
			if (recipe.levelRequirement) {
				const skillHrid = recipe.levelRequirement.skillHrid
				if (!recipesBySkill[skillHrid]) {
					recipesBySkill[skillHrid] = []
				}
				recipesBySkill[skillHrid].push(hrid)
			}
		}

		// Generate RECIPES_BY_SKILL constant
		this.builder.addComment('Lookup map: Recipes grouped by skill requirement')
		this.builder.addConstArray('RECIPES_BY_SKILL_ENTRIES', [])
		this.builder.getSourceFile().addVariableStatement({
			isExported: true,
			declarationKind: 'const' as any,
			declarations: [
				{
					name: 'RECIPES_BY_SKILL',
					type: 'Partial<Record<SkillHrid, readonly RecipeHrid[]>>',
					initializer: (writer) => {
						writer.write('{')
						writer.newLine()
						Object.entries(recipesBySkill).forEach(
							([skill, recipes], index, arr) => {
								writer.indent(() => {
									writer.write(`'${skill}': [`)
									recipes.forEach((r, i) => {
										writer.write(`'${r}'`)
										if (i < recipes.length - 1) writer.write(', ')
									})
									writer.write(']')
									if (index < arr.length - 1) writer.write(',')
									writer.newLine()
								})
							},
						)
						writer.write('}')
					},
				},
			],
		})

		// Group recipes by type
		const recipesByType: Record<string, string[]> = {}
		for (const [hrid, recipe] of Object.entries(entities)) {
			if (!recipesByType[recipe.type]) {
				recipesByType[recipe.type] = []
			}
			recipesByType[recipe.type]!.push(hrid)
		}

		// Generate RECIPES_BY_TYPE constant
		this.builder.addComment('Lookup map: Recipes grouped by action type')
		this.builder.getSourceFile().addVariableStatement({
			isExported: true,
			declarationKind: 'const' as any,
			declarations: [
				{
					name: 'RECIPES_BY_TYPE',
					type: 'Partial<Record<ActionType, readonly RecipeHrid[]>>',
					initializer: (writer) => {
						writer.write('{')
						writer.newLine()
						Object.entries(recipesByType).forEach(
							([type, recipes], index, arr) => {
								writer.indent(() => {
									writer.write(`'${type}': [`)
									recipes.forEach((r, i) => {
										writer.write(`'${r}'`)
										if (i < recipes.length - 1) writer.write(', ')
									})
									writer.write(']')
									if (index < arr.length - 1) writer.write(',')
									writer.newLine()
								})
							},
						)
						writer.write('}')
					},
				},
			],
		})

		// Group recipes by output item
		const recipesByOutput: Record<string, string[]> = {}
		for (const [hrid, recipe] of Object.entries(entities)) {
			if (recipe.outputItems) {
				recipe.outputItems.forEach((item) => {
					if (!recipesByOutput[item.itemHrid]) {
						recipesByOutput[item.itemHrid] = []
					}
					recipesByOutput[item.itemHrid]!.push(hrid)
				})
			}
		}

		// Generate RECIPES_BY_OUTPUT constant
		this.builder.addComment('Lookup map: Recipes grouped by output item')
		this.builder.getSourceFile().addVariableStatement({
			isExported: true,
			declarationKind: 'const' as any,
			declarations: [
				{
					name: 'RECIPES_BY_OUTPUT',
					type: 'Partial<Record<ItemHrid, readonly RecipeHrid[]>>',
					initializer: (writer) => {
						writer.write('{')
						writer.newLine()
						Object.entries(recipesByOutput).forEach(
							([item, recipes], index, arr) => {
								writer.indent(() => {
									writer.write(`'${item}': [`)
									recipes.forEach((r, i) => {
										writer.write(`'${r}'`)
										if (i < recipes.length - 1) writer.write(', ')
									})
									writer.write(']')
									if (index < arr.length - 1) writer.write(',')
									writer.newLine()
								})
							},
						)
						writer.write('}')
					},
				},
			],
		})
	}

	private generateSpecializedUtils(): void {
		// getRecipesBySkill
		this.builder.addFunction(
			'getRecipesBySkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_SKILL[skillHrid] || []')
				writer.writeLine(
					'return hrids.map(hrid => RECIPES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// getRecipesByType
		this.builder.addFunction(
			'getRecipesByType',
			[{ name: 'type', type: 'ActionType' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_TYPE[type] || []')
				writer.writeLine(
					'return hrids.map(hrid => RECIPES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// getRecipesByCategory
		this.builder.addFunction(
			'getRecipesByCategory',
			[{ name: 'category', type: 'ActionCategoryHrid' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine(
					'return Array.from(RECIPES.values()).filter(r => r.category === category)',
				)
			},
		)

		// getRecipesForOutput
		this.builder.addFunction(
			'getRecipesForOutput',
			[{ name: 'itemHrid', type: 'ItemHrid' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_OUTPUT[itemHrid] || []')
				writer.writeLine(
					'return hrids.map(hrid => RECIPES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// canCraftRecipe
		this.builder.addFunction(
			'canCraftRecipe',
			[
				{ name: 'recipe', type: 'Recipe' },
				{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('if (!recipe.inputItems) return true')
				writer.writeLine('return recipe.inputItems.every(input =>')
				writer.writeLine('  (inventory[input.itemHrid] || 0) >= input.count')
				writer.writeLine(')')
			},
		)

		// Generate Recipe Tree functionality
		this.generateRecipeTreeFunctions()

		// Generate Recipe Calculator functionality
		this.generateRecipeCalculatorFunctions()
	}

	private generateRecipeTreeFunctions(): void {
		// Add RecipeTreeNode interface
		const treeNodeProps: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid' },
			{ name: 'quantity', type: 'number' },
			{ name: 'recipe', type: 'Recipe', optional: true },
			{
				name: 'skillRequirement',
				type: '{ skillHrid: SkillHrid; level: number }',
				optional: true,
			},
			{ name: 'totalQuantityNeeded', type: 'number' },
			{ name: 'children', type: 'RecipeTreeNode[]' },
			{ name: 'depth', type: 'number' },
			{ name: 'isBaseMaterial', type: 'boolean' },
			{ name: 'totalCraftingTime', type: 'number', optional: true },
		]
		this.builder.addInterface('RecipeTreeNode', treeNodeProps)

		// Add RecipeTreeStats interface
		const treeStatsProps: PropertyDefinition[] = [
			{ name: 'totalUniqueItems', type: 'number' },
			{ name: 'totalQuantity', type: 'number' },
			{ name: 'maxDepth', type: 'number' },
			{
				name: 'baseMaterials',
				type: 'Array<{ itemHrid: ItemHrid; totalQuantity: number }>',
			},
			{
				name: 'requiredSkills',
				type: 'Array<{ skillHrid: SkillHrid; minLevel: number }>',
			},
			{ name: 'totalCraftingTime', type: 'number' },
			{ name: 'recipesBySkill', type: 'Partial<Record<SkillHrid, Recipe[]>>' },
		]
		this.builder.addInterface('RecipeTreeStats', treeStatsProps)

		// Add memoization cache and statistics
		this.builder.addConstVariable(
			'RECIPE_TREE_CACHE',
			'Map<string, RecipeTreeNode>',
			'new Map<string, RecipeTreeNode>()',
		)

		// Cache statistics variables (using let for mutation)
		this.builder.addComment('Cache statistics for monitoring performance')
		// We'll track hits/misses inside the cache itself
		this.builder.addConstVariable(
			'RECIPE_TREE_CACHE_STATS',
			'{ hits: number; misses: number }',
			'{ hits: 0, misses: 0 }',
		)

		// Cache management functions
		this.builder.addFunction(
			'getRecipeTreeCacheStats',
			[],
			'{ hits: number; misses: number; size: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  hits: RECIPE_TREE_CACHE_STATS.hits,')
				writer.writeLine('  misses: RECIPE_TREE_CACHE_STATS.misses,')
				writer.writeLine('  size: RECIPE_TREE_CACHE.size')
				writer.writeLine('}')
			},
		)

		this.builder.addFunction('clearRecipeTreeCache', [], 'void', (writer) => {
			writer.writeLine('RECIPE_TREE_CACHE.clear()')
			writer.writeLine('RECIPE_TREE_CACHE_STATS.hits = 0')
			writer.writeLine('RECIPE_TREE_CACHE_STATS.misses = 0')
		})

		// buildRecipeTree function with memoization and better duplicate handling
		this.builder.addFunction(
			'buildRecipeTree',
			[
				{ name: 'itemHrid', type: 'ItemHrid' },
				{ name: 'quantity', type: 'number = 1' },
				{ name: 'depth', type: 'number = 0' },
				{ name: 'pathVisited', type: 'Set<string> = new Set()' },
				{ name: 'maxDepth', type: 'number = 10' },
			],
			'RecipeTreeNode | null',
			(writer) => {
				writer.writeLine(
					'// Check cache first for massive performance gains on complex trees',
				)
				writer.writeLine('const cacheKey = `${itemHrid}:${quantity}`')
				writer.writeLine('')
				writer.writeLine(
					'// Only use cache for sub-trees (depth > 0) to avoid caching root variations',
				)
				writer.writeLine('if (depth > 0 && RECIPE_TREE_CACHE.has(cacheKey)) {')
				writer.writeLine('  RECIPE_TREE_CACHE_STATS.hits++')
				writer.writeLine('  const cached = RECIPE_TREE_CACHE.get(cacheKey)!')
				writer.writeLine(
					'  // Return a shallow copy with updated depth to maintain tree structure',
				)
				writer.writeLine('  return { ...cached, depth }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('RECIPE_TREE_CACHE_STATS.misses++')
				writer.writeLine('')
				writer.writeLine('// Prevent infinite recursion with max depth')
				writer.writeLine('if (depth >= maxDepth) {')
				writer.writeLine('  return {')
				writer.writeLine('    itemHrid,')
				writer.writeLine('    quantity,')
				writer.writeLine('    totalQuantityNeeded: quantity,')
				writer.writeLine('    children: [],')
				writer.writeLine('    depth,')
				writer.writeLine('    isBaseMaterial: true,')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine(
					'// Check for circular dependencies in current path only',
				)
				writer.writeLine('if (pathVisited.has(itemHrid)) {')
				writer.writeLine('  return {')
				writer.writeLine('    itemHrid,')
				writer.writeLine('    quantity,')
				writer.writeLine('    totalQuantityNeeded: quantity,')
				writer.writeLine('    children: [],')
				writer.writeLine('    depth,')
				writer.writeLine('    isBaseMaterial: true,')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('// Create new path visited set for this branch')
				writer.writeLine('const newPathVisited = new Set(pathVisited)')
				writer.writeLine('newPathVisited.add(itemHrid)')
				writer.writeLine('')
				writer.writeLine('// Find recipes that produce this item')
				writer.writeLine('const recipes = getRecipesForOutput(itemHrid)')
				writer.writeLine('')
				writer.writeLine('// If no recipe exists, this is a base material')
				writer.writeLine('if (recipes.length === 0) {')
				writer.writeLine('  const baseResult = {')
				writer.writeLine('    itemHrid,')
				writer.writeLine('    quantity,')
				writer.writeLine('    totalQuantityNeeded: quantity,')
				writer.writeLine('    children: [],')
				writer.writeLine('    depth,')
				writer.writeLine('    isBaseMaterial: true,')
				writer.writeLine('  }')
				writer.writeLine('  // Cache base materials too')
				writer.writeLine('  if (depth > 0) {')
				writer.writeLine('    RECIPE_TREE_CACHE.set(cacheKey, baseResult)')
				writer.writeLine('  }')
				writer.writeLine('  return baseResult')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('// Use the first recipe')
				writer.writeLine('const recipe = recipes[0]!')
				writer.writeLine(
					'const outputCount = recipe.outputItems?.find(o => o.itemHrid === itemHrid)?.count || 1',
				)
				writer.writeLine(
					'const craftingIterations = Math.ceil(quantity / outputCount)',
				)
				writer.writeLine('')
				writer.writeLine('// Build child nodes')
				writer.writeLine('const children: RecipeTreeNode[] = []')
				writer.writeLine('')
				writer.writeLine(
					'// Add upgrade item if needed (critical for tools/equipment)',
				)
				writer.writeLine('if (recipe.upgradeItemHrid) {')
				writer.writeLine('  const upgradeNode = buildRecipeTree(')
				writer.writeLine('    recipe.upgradeItemHrid,')
				writer.writeLine('    craftingIterations,')
				writer.writeLine('    depth + 1,')
				writer.writeLine('    newPathVisited,')
				writer.writeLine('    maxDepth')
				writer.writeLine('  )')
				writer.writeLine('  if (upgradeNode) children.push(upgradeNode)')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('// Add input items')
				writer.writeLine('if (recipe.inputItems) {')
				writer.writeLine('  for (const input of recipe.inputItems) {')
				writer.writeLine('    const childNode = buildRecipeTree(')
				writer.writeLine('      input.itemHrid,')
				writer.writeLine('      input.count * craftingIterations,')
				writer.writeLine('      depth + 1,')
				writer.writeLine('      newPathVisited,')
				writer.writeLine('      maxDepth')
				writer.writeLine('    )')
				writer.writeLine('    if (childNode) children.push(childNode)')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('const result = {')
				writer.writeLine('  itemHrid,')
				writer.writeLine('  quantity,')
				writer.writeLine('  totalQuantityNeeded: quantity,')
				writer.writeLine('  recipe,')
				writer.writeLine(
					'  skillRequirement: recipe.levelRequirement || undefined,',
				)
				writer.writeLine('  children,')
				writer.writeLine('  depth,')
				writer.writeLine('  isBaseMaterial: false,')
				writer.writeLine(
					'  totalCraftingTime: recipe.baseTimeCost * craftingIterations,',
				)
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine(
					'// Cache the result for future use (only for sub-trees)',
				)
				writer.writeLine('if (depth > 0) {')
				writer.writeLine('  RECIPE_TREE_CACHE.set(cacheKey, result)')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('return result')
			},
		)

		// calculateRecipeTreeStats function
		this.builder.addFunction(
			'calculateRecipeTreeStats',
			[{ name: 'node', type: 'RecipeTreeNode' }],
			'RecipeTreeStats',
			(writer) => {
				writer.writeLine('const stats: RecipeTreeStats = {')
				writer.writeLine('  totalUniqueItems: 0,')
				writer.writeLine('  totalQuantity: 0,')
				writer.writeLine('  maxDepth: 0,')
				writer.writeLine('  baseMaterials: [],')
				writer.writeLine('  requiredSkills: [],')
				writer.writeLine('  totalCraftingTime: 0,')
				writer.writeLine('  recipesBySkill: {},')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('const itemQuantities = new Map<ItemHrid, number>()')
				writer.writeLine(
					'const baseMaterialQuantities = new Map<ItemHrid, number>()',
				)
				writer.writeLine(
					'const skillRequirements = new Map<SkillHrid, number>()',
				)
				writer.writeLine('')
				writer.writeLine('function traverse(n: RecipeTreeNode): void {')
				writer.writeLine('  // Update quantities')
				writer.writeLine(
					'  const current = itemQuantities.get(n.itemHrid) || 0',
				)
				writer.writeLine(
					'  itemQuantities.set(n.itemHrid, current + n.quantity)',
				)
				writer.writeLine('  stats.totalQuantity += n.quantity')
				writer.writeLine('  stats.maxDepth = Math.max(stats.maxDepth, n.depth)')
				writer.writeLine('')
				writer.writeLine('  // Track base materials')
				writer.writeLine('  if (n.isBaseMaterial) {')
				writer.writeLine(
					'    const baseCurrent = baseMaterialQuantities.get(n.itemHrid) || 0',
				)
				writer.writeLine(
					'    baseMaterialQuantities.set(n.itemHrid, baseCurrent + n.quantity)',
				)
				writer.writeLine('  }')
				writer.writeLine('')
				writer.writeLine('  // Track skills')
				writer.writeLine('  if (n.skillRequirement) {')
				writer.writeLine(
					'    const currentLevel = skillRequirements.get(n.skillRequirement.skillHrid) || 0',
				)
				writer.writeLine(
					'    skillRequirements.set(n.skillRequirement.skillHrid, Math.max(currentLevel, n.skillRequirement.level))',
				)
				writer.writeLine('  }')
				writer.writeLine('')
				writer.writeLine('  // Track crafting time')
				writer.writeLine('  if (n.totalCraftingTime) {')
				writer.writeLine('    stats.totalCraftingTime += n.totalCraftingTime')
				writer.writeLine('  }')
				writer.writeLine('')
				writer.writeLine('  // Track recipes by skill')
				writer.writeLine('  if (n.recipe && n.skillRequirement) {')
				writer.writeLine('    const skill = n.skillRequirement.skillHrid')
				writer.writeLine('    if (!stats.recipesBySkill[skill]) {')
				writer.writeLine('      stats.recipesBySkill[skill] = []')
				writer.writeLine('    }')
				writer.writeLine(
					'    if (!stats.recipesBySkill[skill]!.find(r => r.hrid === n.recipe!.hrid)) {',
				)
				writer.writeLine('      stats.recipesBySkill[skill]!.push(n.recipe)')
				writer.writeLine('    }')
				writer.writeLine('  }')
				writer.writeLine('')
				writer.writeLine('  // Traverse children')
				writer.writeLine('  for (const child of n.children) {')
				writer.writeLine('    traverse(child)')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('traverse(node)')
				writer.writeLine('')
				writer.writeLine('// Convert maps to arrays')
				writer.writeLine('stats.totalUniqueItems = itemQuantities.size')
				writer.writeLine(
					'stats.baseMaterials = Array.from(baseMaterialQuantities.entries()).map(([itemHrid, totalQuantity]) => ({',
				)
				writer.writeLine('  itemHrid,')
				writer.writeLine('  totalQuantity,')
				writer.writeLine('}))')
				writer.writeLine(
					'stats.requiredSkills = Array.from(skillRequirements.entries()).map(([skillHrid, minLevel]) => ({',
				)
				writer.writeLine('  skillHrid,')
				writer.writeLine('  minLevel,')
				writer.writeLine('}))')
				writer.writeLine('')
				writer.writeLine('return stats')
			},
		)
	}

	private generateRecipeCalculatorFunctions(): void {
		// Add TimeModifiers interface
		const timeModProps: PropertyDefinition[] = [
			{ name: 'efficiency', type: 'number' },
			{ name: 'toolSpeed', type: 'number' },
			{ name: 'teaSpeed', type: 'number' },
			{ name: 'teaEfficiency', type: 'number' },
			{ name: 'haste', type: 'number' },
			{ name: 'taskSpeed', type: 'number' },
			{ name: 'houseBonus', type: 'number' },
			{ name: 'guildBonus', type: 'number' },
		]
		this.builder.addInterface('TimeModifiers', timeModProps)

		// calculateModifiedTime function
		this.builder.addFunction(
			'calculateModifiedTime',
			[
				{ name: 'baseTime', type: 'number' },
				{ name: 'modifiers', type: 'TimeModifiers' },
			],
			'number',
			(writer) => {
				writer.writeLine('// Apply efficiency (reduces time by percentage)')
				writer.writeLine(
					'let time = baseTime * (1 - modifiers.efficiency / 100)',
				)
				writer.writeLine('')
				writer.writeLine('// Apply speed bonuses (multiplicative)')
				writer.writeLine('const totalSpeedBonus = 1 + (')
				writer.writeLine('  modifiers.toolSpeed +')
				writer.writeLine('  modifiers.teaSpeed +')
				writer.writeLine('  modifiers.haste +')
				writer.writeLine('  modifiers.taskSpeed +')
				writer.writeLine('  modifiers.houseBonus +')
				writer.writeLine('  modifiers.guildBonus')
				writer.writeLine(') / 100')
				writer.writeLine('')
				writer.writeLine('time = time / totalSpeedBonus')
				writer.writeLine('')
				writer.writeLine('// Apply tea efficiency (additional reduction)')
				writer.writeLine('time = time * (1 - modifiers.teaEfficiency / 100)')
				writer.writeLine('')
				writer.writeLine('return Math.max(1, Math.floor(time))')
			},
		)

		// getTotalMaterials function
		this.builder.addFunction(
			'getTotalMaterials',
			[{ name: 'node', type: 'RecipeTreeNode' }],
			'Map<ItemHrid, number>',
			(writer) => {
				writer.writeLine('const materials = new Map<ItemHrid, number>()')
				writer.writeLine('')
				writer.writeLine('function collectMaterials(n: RecipeTreeNode): void {')
				writer.writeLine('  if (n.isBaseMaterial) {')
				writer.writeLine('    const current = materials.get(n.itemHrid) || 0')
				writer.writeLine('    materials.set(n.itemHrid, current + n.quantity)')
				writer.writeLine('  }')
				writer.writeLine('  for (const child of n.children) {')
				writer.writeLine('    collectMaterials(child)')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('collectMaterials(node)')
				writer.writeLine('return materials')
			},
		)

		// getMissingMaterials function
		this.builder.addFunction(
			'getMissingMaterials',
			[
				{ name: 'node', type: 'RecipeTreeNode' },
				{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
			],
			'Map<ItemHrid, number>',
			(writer) => {
				writer.writeLine('const totalNeeded = getTotalMaterials(node)')
				writer.writeLine('const missing = new Map<ItemHrid, number>()')
				writer.writeLine('')
				writer.writeLine('for (const [itemHrid, needed] of totalNeeded) {')
				writer.writeLine('  const have = inventory[itemHrid] || 0')
				writer.writeLine('  if (have < needed) {')
				writer.writeLine('    missing.set(itemHrid, needed - have)')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('return missing')
			},
		)

		// getCraftingPath function
		this.builder.addFunction(
			'getCraftingPath',
			[{ name: 'node', type: 'RecipeTreeNode' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const path: Recipe[] = []')
				writer.writeLine('const visited = new Set<string>()')
				writer.writeLine('')
				writer.writeLine('function traverse(n: RecipeTreeNode): void {')
				writer.writeLine(
					'  // First process all children (depth-first, post-order)',
				)
				writer.writeLine('  for (const child of n.children) {')
				writer.writeLine('    traverse(child)')
				writer.writeLine('  }')
				writer.writeLine(
					'  // Then add this recipe if it exists and not already added',
				)
				writer.writeLine('  if (n.recipe && !visited.has(n.recipe.hrid)) {')
				writer.writeLine('    path.push(n.recipe)')
				writer.writeLine('    visited.add(n.recipe.hrid)')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('traverse(node)')
				writer.writeLine('return path')
			},
		)
	}
}
