import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	InterfaceDefinition,
	LookupDefinition,
	UtilityDefinition,
} from '../../core/types'

// Internal Recipe interface for extraction
interface RecipeItem {
	itemHrid: string
	count: number
}

interface Recipe {
	hrid: string
	function: string
	type: string
	category: string
	name: string
	baseTimeCost: number
	experienceGain: { skillHrid: string; value: number } | null
	levelRequirement: { skillHrid: string; level: number } | null
	inputItems: RecipeItem[] | null
	outputItems: RecipeItem[] | null
	upgradeItemHrid?: string
	retainAllEnhancement?: boolean
	sortIndex?: number
}

export class ModularRecipesGenerator extends ModularBaseGenerator<Recipe> {
	private sourceData: any = {}

	constructor() {
		super({
			entityName: 'Recipe',
			entityNamePlural: 'Recipes',
			sourceKey: 'actionDetailMap',
			outputPath: 'src/generated/recipes',

			// Import shared types from SharedTypes module
			sharedTypes: ['LevelRequirement', 'ExperienceGain'],

			// No standard utility templates - all custom
			utilityTemplates: [],

			// Disable data cleaning to preserve null values
			applyDataCleaning: false,
		})
	}

	/**
	 * Override to provide sourceData for lookup generation
	 */
	override async generate(sourcePath: string): Promise<void> {
		// Store source data for use in defineLookups
		const sourceReader = new (
			await import('../../core/source-reader')
		).SourceReader()
		this.sourceData = await sourceReader.readJSON(sourcePath)

		// Call parent generate
		await super.generate(sourcePath)
	}

	/**
	 * Extract recipes from actions that have input or output items
	 */
	public override extractEntities(sourceData: any): Record<string, Recipe> {
		const recipes: Record<string, Recipe> = {}
		const actionMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(actionMap)) {
			// Only include actions that are recipes (have input/output items)
			if (this.isRecipe(data)) {
				const recipe = this.extractRecipe(hrid, data as any)
				recipes[hrid] = recipe
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

	private extractLevelRequirement(
		req: any,
	): { skillHrid: string; level: number } | null {
		if (!req || typeof req !== 'object') {
			return null
		}
		return {
			skillHrid: req.skillHrid || '',
			level: req.level || 0,
		}
	}

	private extractExperienceGain(
		exp: any,
	): { skillHrid: string; value: number } | null {
		if (!exp || typeof exp !== 'object') {
			return null
		}
		return {
			skillHrid: exp.skillHrid || '',
			value: exp.value || 0,
		}
	}

	/**
	 * Define all recipe-related interfaces
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			// RecipeItem interface
			{
				name: 'RecipeItem',
				properties: [
					{ name: 'itemHrid', type: 'ItemHrid', optional: false },
					{ name: 'count', type: 'number', optional: false },
				],
			},
			// Main Recipe interface
			{
				name: 'Recipe',
				properties: [
					{ name: 'hrid', type: 'RecipeHrid', optional: false },
					{ name: 'function', type: 'ActionFunction', optional: false },
					{ name: 'type', type: 'ActionType', optional: false },
					{ name: 'category', type: 'ActionCategoryHrid', optional: false },
					{ name: 'name', type: 'string', optional: false },
					{ name: 'baseTimeCost', type: 'number', optional: false },
					{
						name: 'experienceGain',
						type: 'ExperienceGain | null',
						optional: false,
					},
					{
						name: 'levelRequirement',
						type: 'LevelRequirement | null',
						optional: false,
					},
					{ name: 'inputItems', type: 'RecipeItem[] | null', optional: false },
					{ name: 'outputItems', type: 'RecipeItem[] | null', optional: false },
					{ name: 'upgradeItemHrid', type: 'ItemHrid', optional: true },
					{ name: 'retainAllEnhancement', type: 'boolean', optional: true },
					{ name: 'sortIndex', type: 'number', optional: true },
				],
			},
			// RecipeTreeNode interface for tree structure
			{
				name: 'RecipeTreeNode',
				properties: [
					{ name: 'itemHrid', type: 'ItemHrid', optional: false },
					{ name: 'quantity', type: 'number', optional: false },
					{ name: 'recipe', type: 'Recipe', optional: true },
					{
						name: 'skillRequirement',
						type: '{ skillHrid: SkillHrid; level: number }',
						optional: true,
					},
					{ name: 'totalQuantityNeeded', type: 'number', optional: false },
					{ name: 'children', type: 'RecipeTreeNode[]', optional: false },
					{ name: 'depth', type: 'number', optional: false },
					{ name: 'isBaseMaterial', type: 'boolean', optional: false },
					{ name: 'totalCraftingTime', type: 'number', optional: true },
				],
			},
			// RecipeTreeStats interface for analytics
			{
				name: 'RecipeTreeStats',
				properties: [
					{ name: 'totalUniqueItems', type: 'number', optional: false },
					{ name: 'totalQuantity', type: 'number', optional: false },
					{ name: 'maxDepth', type: 'number', optional: false },
					{
						name: 'baseMaterials',
						type: 'Array<{ itemHrid: ItemHrid; totalQuantity: number }>',
						optional: false,
					},
					{
						name: 'requiredSkills',
						type: 'Array<{ skillHrid: SkillHrid; minLevel: number }>',
						optional: false,
					},
					{ name: 'totalCraftingTime', type: 'number', optional: false },
					{
						name: 'recipesBySkill',
						type: 'Partial<Record<SkillHrid, Recipe[]>>',
						optional: false,
					},
				],
			},
			// TimeModifiers interface for crafting time calculations
			{
				name: 'TimeModifiers',
				properties: [
					{ name: 'efficiency', type: 'number', optional: false },
					{ name: 'toolSpeed', type: 'number', optional: false },
					{ name: 'teaSpeed', type: 'number', optional: false },
					{ name: 'teaEfficiency', type: 'number', optional: false },
					{ name: 'haste', type: 'number', optional: false },
					{ name: 'taskSpeed', type: 'number', optional: false },
					{ name: 'houseBonus', type: 'number', optional: false },
					{ name: 'guildBonus', type: 'number', optional: false },
				],
			},
		]
	}

	/**
	 * Override to add imports to types file
	 */
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add imports for types from other modules
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport(
			'../actions/types',
			['ActionFunction', 'ActionType'],
			true,
		)
		typesBuilder.addImport(
			'../actioncategories/types',
			['ActionCategoryHrid'],
			true,
		)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
	}

	/**
	 * Override to add imports to utils file
	 */
	protected override extendUtilities(): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Add imports for types from other modules
		utilsBuilder.addImport(
			'./types',
			[
				'Recipe',
				'RecipeTreeNode',
				'RecipeTreeStats',
				'TimeModifiers',
				'RecipeHrid',
			],
			true,
		)
		utilsBuilder.addImport('../items/types', ['ItemHrid'], true)
		utilsBuilder.addImport('../actions/types', ['ActionType'], true)
		utilsBuilder.addImport(
			'../actioncategories/types',
			['ActionCategoryHrid'],
			true,
		)
		utilsBuilder.addImport('../skills/types', ['SkillHrid'], true)

		// Add imports for lookup constants
		utilsBuilder.addImport(
			'./lookups',
			[
				'RECIPES_BY_SKILL',
				'RECIPES_BY_TYPE',
				'RECIPES_BY_OUTPUT',
				'RECIPES_BY_INPUT',
			],
			false,
		)
		utilsBuilder.addImport('./data', ['getRecipesRecord'], false)

		// Add the cache variables at the top of the file
		utilsBuilder
			.getSourceFile()
			.insertStatements(0, [
				'// Recipe tree cache for performance optimization',
				'const RECIPE_TREE_CACHE = new Map<string, RecipeTreeNode>()',
				'',
				'// Cache statistics for monitoring',
				'const RECIPE_TREE_CACHE_STATS = { hits: 0, misses: 0 }',
				'',
			])
	}

	/**
	 * Override to add imports to lookups file
	 */
	protected override extendLookups(): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Add imports for types from other modules
		lookupsBuilder.addImport('./types', ['RecipeHrid'], true)
		lookupsBuilder.addImport('../actions/types', ['ActionType'], true)
		lookupsBuilder.addImport('../items/types', ['ItemHrid'], true)
		lookupsBuilder.addImport('../skills/types', ['SkillHrid'], true)
	}

	/**
	 * Define lookup tables
	 */
	protected override defineLookups(): LookupDefinition[] {
		const entities = this.extractEntities(this.sourceData)
		const lookups: LookupDefinition[] = []

		// Group recipes by skill
		const recipesBySkill: Record<string, string[]> = {}
		for (const [hrid, recipe] of Object.entries(entities)) {
			if (recipe.levelRequirement) {
				const skillHrid = recipe.levelRequirement.skillHrid
				if (!recipesBySkill[skillHrid]) {
					recipesBySkill[skillHrid] = []
				}
				recipesBySkill[skillHrid]!.push(hrid)
			}
		}

		if (Object.keys(recipesBySkill).length > 0) {
			lookups.push({
				name: 'RECIPES_BY_SKILL',
				keyType: 'SkillHrid',
				valueType: 'readonly RecipeHrid[]',
				data: recipesBySkill,
				isPartial: true,
			})
		}

		// Group recipes by type
		const recipesByType: Record<string, string[]> = {}
		for (const [hrid, recipe] of Object.entries(entities)) {
			if (!recipesByType[recipe.type]) {
				recipesByType[recipe.type] = []
			}
			recipesByType[recipe.type]!.push(hrid)
		}

		if (Object.keys(recipesByType).length > 0) {
			lookups.push({
				name: 'RECIPES_BY_TYPE',
				keyType: 'ActionType',
				valueType: 'readonly RecipeHrid[]',
				data: recipesByType,
				isPartial: true,
			})
		}

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

		if (Object.keys(recipesByOutput).length > 0) {
			lookups.push({
				name: 'RECIPES_BY_OUTPUT',
				keyType: 'ItemHrid',
				valueType: 'readonly RecipeHrid[]',
				data: recipesByOutput,
				isPartial: true,
			})
		}

		// Group recipes by input item
		const recipesByInput: Record<string, string[]> = {}
		for (const [hrid, recipe] of Object.entries(entities)) {
			if (recipe.inputItems) {
				recipe.inputItems.forEach((item) => {
					if (!recipesByInput[item.itemHrid]) {
						recipesByInput[item.itemHrid] = []
					}
					recipesByInput[item.itemHrid]!.push(hrid)
				})
			}
		}

		if (Object.keys(recipesByInput).length > 0) {
			lookups.push({
				name: 'RECIPES_BY_INPUT',
				keyType: 'ItemHrid',
				valueType: 'readonly RecipeHrid[]',
				data: recipesByInput,
				isPartial: true,
			})
		}

		return lookups
	}

	/**
	 * Define all utility functions including tree operations
	 */
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			// Basic recipe lookups
			{
				name: 'getRecipesBySkill',
				parameters: [{ name: 'skillHrid', type: 'SkillHrid' }],
				returnType: 'Recipe[]',
				implementation: (writer: any) => {
					writer.writeLine('const hrids = RECIPES_BY_SKILL?.[skillHrid] || []')
					writer.writeLine(
						'return hrids.map(hrid => getRecipesRecord()[hrid]).filter(Boolean)',
					)
				},
			},
			{
				name: 'getRecipesByType',
				parameters: [{ name: 'type', type: 'ActionType' }],
				returnType: 'Recipe[]',
				implementation: (writer: any) => {
					writer.writeLine('const hrids = RECIPES_BY_TYPE?.[type] || []')
					writer.writeLine(
						'return hrids.map(hrid => getRecipesRecord()[hrid]).filter(Boolean)',
					)
				},
			},
			{
				name: 'getRecipesForOutput',
				parameters: [{ name: 'itemHrid', type: 'ItemHrid' }],
				returnType: 'Recipe[]',
				implementation: (writer: any) => {
					writer.writeLine('const hrids = RECIPES_BY_OUTPUT?.[itemHrid] || []')
					writer.writeLine(
						'return hrids.map(hrid => getRecipesRecord()[hrid]).filter(Boolean)',
					)
				},
			},
			{
				name: 'getRecipesForInput',
				parameters: [{ name: 'itemHrid', type: 'ItemHrid' }],
				returnType: 'Recipe[]',
				implementation: (writer: any) => {
					writer.writeLine('const hrids = RECIPES_BY_INPUT?.[itemHrid] || []')
					writer.writeLine(
						'return hrids.map(hrid => getRecipesRecord()[hrid]).filter(Boolean)',
					)
				},
			},
			{
				name: 'getRecipesByCategory',
				parameters: [{ name: 'category', type: 'ActionCategoryHrid' }],
				returnType: 'Recipe[]',
				implementation: (writer: any) => {
					writer.writeLine(
						'return Object.values(getRecipesRecord()).filter(r => r.category === category)',
					)
				},
			},
			{
				name: 'canCraftRecipe',
				parameters: [
					{ name: 'recipe', type: 'Recipe' },
					{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
				],
				returnType: 'boolean',
				implementation: (writer: any) => {
					writer.writeLine('if (!recipe.inputItems) return true')
					writer.writeLine('return recipe.inputItems.every(input =>')
					writer.writeLine('  (inventory[input.itemHrid] || 0) >= input.count')
					writer.writeLine(')')
				},
			},

			// Cache management functions
			{
				name: 'getRecipeTreeCacheStats',
				parameters: [],
				returnType: '{ hits: number; misses: number; size: number }',
				implementation: (writer: any) => {
					writer.writeLine('return {')
					writer.writeLine('  hits: RECIPE_TREE_CACHE_STATS.hits,')
					writer.writeLine('  misses: RECIPE_TREE_CACHE_STATS.misses,')
					writer.writeLine('  size: RECIPE_TREE_CACHE.size')
					writer.writeLine('}')
				},
			},
			{
				name: 'clearRecipeTreeCache',
				parameters: [],
				returnType: 'void',
				implementation: (writer: any) => {
					writer.writeLine('RECIPE_TREE_CACHE.clear()')
					writer.writeLine('RECIPE_TREE_CACHE_STATS.hits = 0')
					writer.writeLine('RECIPE_TREE_CACHE_STATS.misses = 0')
				},
			},

			// Core recipe tree builder
			{
				name: 'buildRecipeTree',
				parameters: [
					{ name: 'itemHrid', type: 'ItemHrid' },
					{ name: 'quantity', type: 'number = 1' },
					{ name: 'depth', type: 'number = 0' },
					{ name: 'pathVisited', type: 'Set<string> = new Set()' },
					{ name: 'maxDepth', type: 'number = 10' },
				],
				returnType: 'RecipeTreeNode | null',
				implementation: (writer: any) => {
					writer.writeLine('// Check cache first')
					writer.writeLine('const cacheKey = `${itemHrid}:${quantity}`')
					writer.writeLine('')
					writer.writeLine(
						'if (depth > 0 && RECIPE_TREE_CACHE.has(cacheKey)) {',
					)
					writer.writeLine('  RECIPE_TREE_CACHE_STATS.hits++')
					writer.writeLine('  const cached = RECIPE_TREE_CACHE.get(cacheKey)!')
					writer.writeLine('  return { ...cached, depth }')
					writer.writeLine('}')
					writer.writeLine('')
					writer.writeLine('RECIPE_TREE_CACHE_STATS.misses++')
					writer.writeLine('')
					writer.writeLine('// Prevent infinite recursion')
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
					writer.writeLine('// Check for circular dependencies')
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
					writer.writeLine('// Create new path visited set')
					writer.writeLine('const newPathVisited = new Set(pathVisited)')
					writer.writeLine('newPathVisited.add(itemHrid)')
					writer.writeLine('')
					writer.writeLine('// Find recipes that produce this item')
					writer.writeLine('const recipes = getRecipesForOutput(itemHrid)')
					writer.writeLine('')
					writer.writeLine('// Base material if no recipe exists')
					writer.writeLine('if (recipes.length === 0) {')
					writer.writeLine('  const baseResult = {')
					writer.writeLine('    itemHrid,')
					writer.writeLine('    quantity,')
					writer.writeLine('    totalQuantityNeeded: quantity,')
					writer.writeLine('    children: [],')
					writer.writeLine('    depth,')
					writer.writeLine('    isBaseMaterial: true,')
					writer.writeLine('  }')
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
					writer.writeLine('// Add upgrade item if needed')
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
					writer.writeLine('// Cache the result')
					writer.writeLine('if (depth > 0) {')
					writer.writeLine('  RECIPE_TREE_CACHE.set(cacheKey, result)')
					writer.writeLine('}')
					writer.writeLine('')
					writer.writeLine('return result')
				},
			},

			// Recipe tree statistics calculator
			{
				name: 'calculateRecipeTreeStats',
				parameters: [{ name: 'node', type: 'RecipeTreeNode' }],
				returnType: 'RecipeTreeStats',
				implementation: (writer: any) => {
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
					writer.writeLine(
						'  const current = itemQuantities.get(n.itemHrid) || 0',
					)
					writer.writeLine(
						'  itemQuantities.set(n.itemHrid, current + n.quantity)',
					)
					writer.writeLine('  stats.totalQuantity += n.quantity')
					writer.writeLine(
						'  stats.maxDepth = Math.max(stats.maxDepth, n.depth)',
					)
					writer.writeLine('')
					writer.writeLine('  if (n.isBaseMaterial) {')
					writer.writeLine(
						'    const baseCurrent = baseMaterialQuantities.get(n.itemHrid) || 0',
					)
					writer.writeLine(
						'    baseMaterialQuantities.set(n.itemHrid, baseCurrent + n.quantity)',
					)
					writer.writeLine('  }')
					writer.writeLine('')
					writer.writeLine('  if (n.skillRequirement) {')
					writer.writeLine(
						'    const currentLevel = skillRequirements.get(n.skillRequirement.skillHrid) || 0',
					)
					writer.writeLine(
						'    skillRequirements.set(n.skillRequirement.skillHrid, Math.max(currentLevel, n.skillRequirement.level))',
					)
					writer.writeLine('  }')
					writer.writeLine('')
					writer.writeLine('  if (n.totalCraftingTime) {')
					writer.writeLine('    stats.totalCraftingTime += n.totalCraftingTime')
					writer.writeLine('  }')
					writer.writeLine('')
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
					writer.writeLine('  for (const child of n.children) {')
					writer.writeLine('    traverse(child)')
					writer.writeLine('  }')
					writer.writeLine('}')
					writer.writeLine('')
					writer.writeLine('traverse(node)')
					writer.writeLine('')
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
			},

			// Time modifiers calculator
			{
				name: 'calculateModifiedTime',
				parameters: [
					{ name: 'baseTime', type: 'number' },
					{ name: 'modifiers', type: 'TimeModifiers' },
				],
				returnType: 'number',
				implementation: (writer: any) => {
					writer.writeLine('// Apply efficiency')
					writer.writeLine(
						'let time = baseTime * (1 - modifiers.efficiency / 100)',
					)
					writer.writeLine('')
					writer.writeLine('// Apply speed bonuses')
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
					writer.writeLine('// Apply tea efficiency')
					writer.writeLine('time = time * (1 - modifiers.teaEfficiency / 100)')
					writer.writeLine('')
					writer.writeLine('return Math.max(1, Math.floor(time))')
				},
			},

			// Material calculators
			{
				name: 'getTotalMaterials',
				parameters: [{ name: 'node', type: 'RecipeTreeNode' }],
				returnType: 'Map<ItemHrid, number>',
				implementation: (writer: any) => {
					writer.writeLine('const materials = new Map<ItemHrid, number>()')
					writer.writeLine('')
					writer.writeLine(
						'function collectMaterials(n: RecipeTreeNode): void {',
					)
					writer.writeLine('  if (n.isBaseMaterial) {')
					writer.writeLine('    const current = materials.get(n.itemHrid) || 0')
					writer.writeLine(
						'    materials.set(n.itemHrid, current + n.quantity)',
					)
					writer.writeLine('  }')
					writer.writeLine('  for (const child of n.children) {')
					writer.writeLine('    collectMaterials(child)')
					writer.writeLine('  }')
					writer.writeLine('}')
					writer.writeLine('')
					writer.writeLine('collectMaterials(node)')
					writer.writeLine('return materials')
				},
			},
			{
				name: 'getMissingMaterials',
				parameters: [
					{ name: 'node', type: 'RecipeTreeNode' },
					{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
				],
				returnType: 'Map<ItemHrid, number>',
				implementation: (writer: any) => {
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
			},

			// Crafting path calculator
			{
				name: 'getCraftingPath',
				parameters: [{ name: 'node', type: 'RecipeTreeNode' }],
				returnType: 'Recipe[]',
				implementation: (writer: any) => {
					writer.writeLine('const path: Recipe[] = []')
					writer.writeLine('const visited = new Set<string>()')
					writer.writeLine('')
					writer.writeLine('function traverse(n: RecipeTreeNode): void {')
					writer.writeLine(
						'  // Process children first (depth-first, post-order)',
					)
					writer.writeLine('  for (const child of n.children) {')
					writer.writeLine('    traverse(child)')
					writer.writeLine('  }')
					writer.writeLine('  // Add recipe if exists and not already added')
					writer.writeLine('  if (n.recipe && !visited.has(n.recipe.hrid)) {')
					writer.writeLine('    path.push(n.recipe)')
					writer.writeLine('    visited.add(n.recipe.hrid)')
					writer.writeLine('  }')
					writer.writeLine('}')
					writer.writeLine('')
					writer.writeLine('traverse(node)')
					writer.writeLine('return path')
				},
			},
		]
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularRecipesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
