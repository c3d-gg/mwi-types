import { ModularBaseGenerator } from '../core/generator.base.modular'
// Shared types - these interfaces are defined in the shared module
// They will be properly imported in generateTypes() method
interface LevelRequirement {
	skillHrid: string
	level: number
}
interface ExperienceGain {
	skillHrid: string
	value: number
}
interface ItemCost {
	itemHrid: string
	count: number
}

import type { PropertyDefinition } from '../core/ast-builder'

// Alias ItemCost as RecipeItem since they have the same structure
type RecipeItem = ItemCost

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

/**
 * Modular Recipes Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularRecipesGenerator extends ModularBaseGenerator<Recipe> {
	// Collect unique values for lookups
	private recipesBySkill: Map<string, string[]> = new Map()
	private recipesByType: Map<string, string[]> = new Map()
	private recipesByCategory: Map<string, string[]> = new Map()
	private recipesByOutput: Map<string, string[]> = new Map()
	private recipesByInput: Map<string, string[]> = new Map()
	private recipeFunctions: Set<string> = new Set()
	private recipeTypes: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'Recipe',
			entityNamePlural: 'Recipes',
			sourceKey: 'actionDetailMap',
			outputPath: './src/generated/recipes/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Recipe> {
		const recipes: Record<string, Recipe> = {}
		const actionMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(actionMap)) {
			// Only include actions that are recipes (have input/output items)
			if (this.isRecipe(data)) {
				const recipe = this.extractRecipe(hrid, data as any)
				recipes[hrid] = recipe
				this.collectForLookups(recipe)
			}
		}

		console.log(`  📦 Extracted ${Object.keys(recipes).length} recipes`)
		console.log(`  🔧 ${this.recipesBySkill.size} skills with recipes`)
		console.log(`  📊 ${this.recipeTypes.size} recipe types`)
		console.log(`  🎯 ${this.recipeFunctions.size} recipe functions`)

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
			baseTimeCost: typeof data.baseTimeCost === 'number' ? data.baseTimeCost : 0,
			experienceGain: this.extractExperienceGain(data.experienceGain),
			levelRequirement: this.extractLevelRequirement(data.levelRequirement),
			inputItems: this.extractItems(data.inputItems),
			outputItems: this.extractItems(data.outputItems),
			upgradeItemHrid:
				data.upgradeItemHrid && data.upgradeItemHrid !== ''
					? data.upgradeItemHrid
					: undefined,
			retainAllEnhancement: data.retainAllEnhancement === true ? true : undefined,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : undefined,
		}
	}

	private extractItems(items: any): RecipeItem[] | null {
		if (!items || !Array.isArray(items) || items.length === 0) {
			return null
		}
		return items.map((item) => ({
			itemHrid: item.itemHrid || '',
			count: typeof item.count === 'number' ? item.count : 1,
		}) as RecipeItem)
	}

	private extractLevelRequirement(req: any): LevelRequirement | null {
		if (!req || typeof req !== 'object') {
			return null
		}
		return {
			skillHrid: req.skillHrid || '',
			level: typeof req.level === 'number' ? req.level : 0,
		} as LevelRequirement
	}

	private extractExperienceGain(exp: any): ExperienceGain | null {
		if (!exp || typeof exp !== 'object') {
			return null
		}
		return {
			skillHrid: exp.skillHrid || '',
			value: typeof exp.value === 'number' ? exp.value : 0,
		} as ExperienceGain
	}

	private collectForLookups(recipe: Recipe): void {
		// Collect functions and types
		this.recipeFunctions.add(recipe.function)
		this.recipeTypes.add(recipe.type)

		// By skill
		if (recipe.levelRequirement) {
			const skillHrid = recipe.levelRequirement.skillHrid
			if (!this.recipesBySkill.has(skillHrid)) {
				this.recipesBySkill.set(skillHrid, [])
			}
			this.recipesBySkill.get(skillHrid)!.push(recipe.hrid)
		}

		// By type
		if (!this.recipesByType.has(recipe.type)) {
			this.recipesByType.set(recipe.type, [])
		}
		this.recipesByType.get(recipe.type)!.push(recipe.hrid)

		// By category
		if (!this.recipesByCategory.has(recipe.category)) {
			this.recipesByCategory.set(recipe.category, [])
		}
		this.recipesByCategory.get(recipe.category)!.push(recipe.hrid)

		// By output items
		if (recipe.outputItems) {
			recipe.outputItems.forEach((item) => {
				if (!this.recipesByOutput.has(item.itemHrid)) {
					this.recipesByOutput.set(item.itemHrid, [])
				}
				this.recipesByOutput.get(item.itemHrid)!.push(recipe.hrid)
			})
		}

		// By input items
		if (recipe.inputItems) {
			recipe.inputItems.forEach((item) => {
				if (!this.recipesByInput.has(item.itemHrid)) {
					this.recipesByInput.set(item.itemHrid, [])
				}
				this.recipesByInput.get(item.itemHrid)!.push(recipe.hrid)
			})
		}
	}

	protected override generateTypes(entities: Record<string, Recipe>): void {
		// Import dependencies
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import types from other modules (DO NOT re-export - domain boundary)
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		typesBuilder.addImport('../actioncategories/types', ['ActionCategoryHrid'], true)
		typesBuilder.addImport('../actions/types', ['ActionFunction', 'ActionType'], true)
		// Import shared types
		typesBuilder.addImport('../sharedtypes/types', ['LevelRequirement', 'ExperienceGain', 'ItemCost'], true)

		// RecipeItem type alias for ItemCost
		typesBuilder.addType('RecipeItem', 'ItemCost')

		// Recipe interface
		const recipeProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'RecipeHrid', optional: false },
			{ name: 'function', type: 'ActionFunction', optional: false },
			{ name: 'type', type: 'ActionType', optional: false },
			{ name: 'category', type: 'ActionCategoryHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'baseTimeCost', type: 'number', optional: false },
			{ name: 'experienceGain', type: 'ExperienceGain | null', optional: false },
			{ name: 'levelRequirement', type: 'LevelRequirement | null', optional: false },
			{ name: 'inputItems', type: 'RecipeItem[] | null', optional: false },
			{ name: 'outputItems', type: 'RecipeItem[] | null', optional: false },
			{ name: 'upgradeItemHrid', type: 'ItemHrid', optional: true },
			{ name: 'retainAllEnhancement', type: 'boolean', optional: true },
			{ name: 'sortIndex', type: 'number', optional: true },
		]
		this.moduleBuilder.addInterface('Recipe', recipeProps)

		// Recipe Tree interfaces for advanced functionality
		const treeNodeProps: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'quantity', type: 'number', optional: false },
			{ name: 'recipe', type: 'Recipe | undefined', optional: true },
			{ name: 'skillRequirement', type: '{ skillHrid: SkillHrid; level: number } | undefined', optional: true },
			{ name: 'totalQuantityNeeded', type: 'number', optional: false },
			{ name: 'children', type: 'RecipeTreeNode[]', optional: false },
			{ name: 'depth', type: 'number', optional: false },
			{ name: 'isBaseMaterial', type: 'boolean', optional: false },
			{ name: 'totalCraftingTime', type: 'number', optional: true },
		]
		this.moduleBuilder.addInterface('RecipeTreeNode', treeNodeProps)

		const treeStatsProps: PropertyDefinition[] = [
			{ name: 'totalUniqueItems', type: 'number', optional: false },
			{ name: 'totalQuantity', type: 'number', optional: false },
			{ name: 'maxDepth', type: 'number', optional: false },
			{ name: 'baseMaterials', type: 'Array<{ itemHrid: ItemHrid; totalQuantity: number }>', optional: false },
			{ name: 'requiredSkills', type: 'Array<{ skillHrid: SkillHrid; minLevel: number }>', optional: false },
			{ name: 'totalCraftingTime', type: 'number', optional: false },
			{ name: 'recipesBySkill', type: 'Partial<Record<SkillHrid, Recipe[]>>', optional: false },
		]
		this.moduleBuilder.addInterface('RecipeTreeStats', treeStatsProps)
	}

	protected override generateConstants(entities: Record<string, Recipe>): void {
		// Call base to generate RECIPE_HRIDS
		super.generateConstants(entities)

		// Add recipe-specific constants to constants file
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate RECIPE_FUNCTIONS constant
		constantsBuilder.addConstArray(
			'RECIPE_FUNCTIONS',
			Array.from(this.recipeFunctions).sort(),
			true
		)
		this.moduleBuilder.addExport({ name: 'RECIPE_FUNCTIONS', source: './constants' })
		
		// Generate type from const
		constantsBuilder.addType(
			'RecipeFunction', 
			'(typeof RECIPE_FUNCTIONS)[number]'
		)
		this.moduleBuilder.addExport({ name: 'RecipeFunction', source: './constants', isType: true })

		// Generate RECIPE_TYPES constant
		constantsBuilder.addConstArray(
			'RECIPE_TYPES',
			Array.from(this.recipeTypes).sort(),
			true
		)
		this.moduleBuilder.addExport({ name: 'RECIPE_TYPES', source: './constants' })

		// Generate type from const
		constantsBuilder.addType(
			'RecipeType',
			'(typeof RECIPE_TYPES)[number]'
		)
		this.moduleBuilder.addExport({ name: 'RecipeType', source: './constants', isType: true })
	}

	protected override generateLookups(entities: Record<string, Recipe>): void {
		// Add necessary imports to lookups file
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')
		lookupsBuilder.addImport('./types', ['RecipeHrid'], true)
		lookupsBuilder.addImport('../items/types', ['ItemHrid'], true)
		lookupsBuilder.addImport('../skills/types', ['SkillHrid'], true)
		lookupsBuilder.addImport('../actioncategories/types', ['ActionCategoryHrid'], true)
		lookupsBuilder.addImport('../actions/types', ['ActionType'], true)
		
		// Recipes by skill
		const skillLookup: Record<string, readonly string[]> = {}
		this.recipesBySkill.forEach((recipes, skill) => {
			skillLookup[skill] = recipes.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'RECIPES_BY_SKILL',
			skillLookup,
			'string',
			'readonly RecipeHrid[]'
		)

		// Recipes by type  
		const typeLookup: Record<string, readonly string[]> = {}
		this.recipesByType.forEach((recipes, type) => {
			typeLookup[type] = recipes.sort()
		})
		// Use Partial<Record> to handle missing keys
		lookupsBuilder.addConstVariable(
			'RECIPES_BY_TYPE',
			'Partial<Record<ActionType, readonly RecipeHrid[]>>',
			JSON.stringify(typeLookup, null, '\t')
		)
		this.moduleBuilder.addExport({ name: 'RECIPES_BY_TYPE', source: './lookups' })

		// Recipes by category
		const categoryLookup: Record<string, readonly string[]> = {}
		this.recipesByCategory.forEach((recipes, category) => {
			categoryLookup[category] = recipes.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'RECIPES_BY_CATEGORY',
			categoryLookup,
			'string',
			'readonly RecipeHrid[]'
		)

		// Recipes by output item
		const outputLookup: Record<string, readonly string[]> = {}
		this.recipesByOutput.forEach((recipes, item) => {
			outputLookup[item] = recipes.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'RECIPES_BY_OUTPUT',
			outputLookup,
			'string',
			'readonly RecipeHrid[]'
		)

		// Recipes by input item
		const inputLookup: Record<string, readonly string[]> = {}
		this.recipesByInput.forEach((recipes, item) => {
			inputLookup[item] = recipes.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'RECIPES_BY_INPUT',
			inputLookup,
			'string',
			'readonly RecipeHrid[]'
		)
	}

	protected override generateUtilities(entities: Record<string, Recipe>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Get recipes by skill
		this.moduleBuilder.addUtilityFunction(
			'getRecipesBySkill',
			[{ name: 'skillHrid', type: 'string' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_SKILL[skillHrid] || []')
				writer.writeLine(
					'return hrids.map(hrid => getRecipe(hrid)).filter(Boolean) as Recipe[]'
				)
			},
			[
				{ from: './lookups', names: ['RECIPES_BY_SKILL'] },
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Get recipes by type
		this.moduleBuilder.addUtilityFunction(
			'getRecipesByType',
			[{ name: 'type', type: 'ActionType' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_TYPE[type] || []')
				writer.writeLine(
					'return hrids.map(hrid => getRecipe(hrid)).filter(Boolean) as Recipe[]'
				)
			},
			[
				{ from: './lookups', names: ['RECIPES_BY_TYPE'] },
				{ from: '../actions/types', names: ['ActionType'], isType: true },
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Get recipes by category
		this.moduleBuilder.addUtilityFunction(
			'getRecipesByCategory',
			[{ name: 'category', type: 'string' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_CATEGORY[category] || []')
				writer.writeLine(
					'return hrids.map(hrid => getRecipe(hrid)).filter(Boolean) as Recipe[]'
				)
			},
			[
				{ from: './lookups', names: ['RECIPES_BY_CATEGORY'] },
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Get recipes for output
		this.moduleBuilder.addUtilityFunction(
			'getRecipesForOutput',
			[{ name: 'itemHrid', type: 'string' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_OUTPUT[itemHrid] || []')
				writer.writeLine(
					'return hrids.map(hrid => getRecipe(hrid)).filter(Boolean) as Recipe[]'
				)
			},
			[
				{ from: './lookups', names: ['RECIPES_BY_OUTPUT'] },
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Get recipes using input
		this.moduleBuilder.addUtilityFunction(
			'getRecipesUsingInput',
			[{ name: 'itemHrid', type: 'string' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('const hrids = RECIPES_BY_INPUT[itemHrid] || []')
				writer.writeLine(
					'return hrids.map(hrid => getRecipe(hrid)).filter(Boolean) as Recipe[]'
				)
			},
			[
				{ from: './lookups', names: ['RECIPES_BY_INPUT'] },
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Can craft recipe - Check if inventory has required items
		this.moduleBuilder.addUtilityFunction(
			'canCraftRecipe',
			[
				{ name: 'recipe', type: 'Recipe' },
				{ name: 'inventory', type: 'Partial<Record<string, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('if (!recipe.inputItems) return true')
				writer.writeLine('return recipe.inputItems.every(input =>')
				writer.writeLine('  (inventory[input.itemHrid] || 0) >= input.count')
				writer.writeLine(')')
			},
			[
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Calculate crafting output
		this.moduleBuilder.addUtilityFunction(
			'calculateCraftingOutput',
			[
				{ name: 'recipe', type: 'Recipe' },
				{ name: 'multiplier', type: 'number' },
			],
			'Array<{ itemHrid: string; count: number }>',
			(writer) => {
				writer.writeLine('if (!recipe.outputItems) return []')
				writer.writeLine('return recipe.outputItems.map(output => ({')
				writer.writeLine('  itemHrid: output.itemHrid,')
				writer.writeLine('  count: output.count * multiplier')
				writer.writeLine('}))')
			},
			[
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Calculate required inputs
		this.moduleBuilder.addUtilityFunction(
			'calculateRequiredInputs',
			[
				{ name: 'recipe', type: 'Recipe' },
				{ name: 'multiplier', type: 'number' },
			],
			'Array<{ itemHrid: string; count: number }>',
			(writer) => {
				writer.writeLine('if (!recipe.inputItems) return []')
				writer.writeLine('return recipe.inputItems.map(input => ({')
				writer.writeLine('  itemHrid: input.itemHrid,')
				writer.writeLine('  count: input.count * multiplier')
				writer.writeLine('}))')
			},
			[
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Sort recipes by index
		this.moduleBuilder.addUtilityFunction(
			'sortRecipesByIndex',
			[{ name: 'recipes', type: 'Recipe[]' }],
			'Recipe[]',
			(writer) => {
				writer.writeLine('return [...recipes].sort((a, b) => {')
				writer.writeLine('  const aIndex = a.sortIndex ?? Number.MAX_SAFE_INTEGER')
				writer.writeLine('  const bIndex = b.sortIndex ?? Number.MAX_SAFE_INTEGER')
				writer.writeLine('  return aIndex - bIndex')
				writer.writeLine('})')
			},
			[
				{ from: './types', names: ['Recipe'], isType: true },
			]
		)

		// Recipe tree utilities
		this.generateRecipeTreeUtilities()
	}

	private generateRecipeTreeUtilities(): void {
		// Recipe tree cache management
		const utilsBuilder = this.moduleBuilder.getFile('utils')
		
		// Add cache variables
		utilsBuilder.addConstVariable(
			'RECIPE_TREE_CACHE',
			'Map<string, RecipeTreeNode>',
			'new Map<string, RecipeTreeNode>()'
		)
		
		utilsBuilder.addConstVariable(
			'RECIPE_TREE_CACHE_STATS',
			'{ hits: number; misses: number }',
			'{ hits: 0, misses: 0 }'
		)

		// Get cache stats
		this.moduleBuilder.addUtilityFunction(
			'getRecipeTreeCacheStats',
			[],
			'{ hits: number; misses: number; size: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  ...RECIPE_TREE_CACHE_STATS,')
				writer.writeLine('  size: RECIPE_TREE_CACHE.size')
				writer.writeLine('}')
			},
			[]
		)

		// Clear cache
		this.moduleBuilder.addUtilityFunction(
			'clearRecipeTreeCache',
			[],
			'void',
			(writer) => {
				writer.writeLine('RECIPE_TREE_CACHE.clear()')
				writer.writeLine('RECIPE_TREE_CACHE_STATS.hits = 0')
				writer.writeLine('RECIPE_TREE_CACHE_STATS.misses = 0')
			},
			[]
		)

		// Build recipe tree
		this.moduleBuilder.addUtilityFunction(
			'buildRecipeTree',
			[
				{ name: 'itemHrid', type: 'string' },
				{ name: 'quantity', type: 'number' },
				{ name: 'maxDepth', type: 'number' },
				{ name: 'currentDepth', type: 'number' },
			],
			'RecipeTreeNode',
			(writer) => {
				// Handle default values
				writer.writeLine('const depth = currentDepth ?? 0')
				writer.writeLine('const maxD = maxDepth ?? 10')
				writer.writeLine('')
				
				// Cache key
				writer.writeLine('const cacheKey = `${itemHrid}:${quantity}:${maxD}:${depth}`')
				writer.writeLine('')
				
				// Check cache
				writer.writeLine('if (RECIPE_TREE_CACHE.has(cacheKey)) {')
				writer.writeLine('  RECIPE_TREE_CACHE_STATS.hits++')
				writer.writeLine('  return structuredClone(RECIPE_TREE_CACHE.get(cacheKey)!)')
				writer.writeLine('}')
				writer.writeLine('RECIPE_TREE_CACHE_STATS.misses++')
				writer.writeLine('')
				
				// Find recipes for item
				writer.writeLine('const recipes = getRecipesForOutput(itemHrid)')
				writer.writeLine('const primaryRecipe = recipes[0] // Use first recipe if multiple exist')
				writer.writeLine('')
				
				// Build node
				writer.writeLine('const node: RecipeTreeNode = {')
				writer.writeLine('  itemHrid: itemHrid as any, // Type assertion needed since itemHrid is string')
				writer.writeLine('  quantity,')
				writer.writeLine('  recipe: primaryRecipe,')
				writer.writeLine('  skillRequirement: primaryRecipe?.levelRequirement ? {')
				writer.writeLine('    skillHrid: primaryRecipe.levelRequirement.skillHrid,')
				writer.writeLine('    level: primaryRecipe.levelRequirement.level')
				writer.writeLine('  } : undefined,')
				writer.writeLine('  totalQuantityNeeded: quantity,')
				writer.writeLine('  children: [],')
				writer.writeLine('  depth: depth,')
				writer.writeLine('  isBaseMaterial: !primaryRecipe || depth >= maxD,')
				writer.writeLine('  totalCraftingTime: primaryRecipe ? primaryRecipe.baseTimeCost * quantity : 0')
				writer.writeLine('}')
				writer.writeLine('')
				
				// Build children recursively
				writer.writeLine('if (primaryRecipe && primaryRecipe.inputItems && depth < maxD) {')
				writer.writeLine('  node.children = primaryRecipe.inputItems.map(input => ')
				writer.writeLine('    buildRecipeTree(input.itemHrid, input.count * quantity, maxD, depth + 1)')
				writer.writeLine('  )')
				writer.writeLine('')
				writer.writeLine('  // Calculate total crafting time including children')
				writer.writeLine('  const childrenTime = node.children.reduce((sum, child) => ')
				writer.writeLine('    sum + (child.totalCraftingTime || 0), 0')
				writer.writeLine('  )')
				writer.writeLine('  node.totalCraftingTime = (node.totalCraftingTime || 0) + childrenTime')
				writer.writeLine('}')
				writer.writeLine('')
				
				// Cache result
				writer.writeLine('RECIPE_TREE_CACHE.set(cacheKey, structuredClone(node))')
				writer.writeLine('return node')
			},
			[
				{ from: './types', names: ['RecipeTreeNode'], isType: true },
			]
		)

		// Calculate recipe tree stats
		this.moduleBuilder.addUtilityFunction(
			'calculateRecipeTreeStats',
			[{ name: 'tree', type: 'RecipeTreeNode' }],
			'RecipeTreeStats',
			(writer) => {
				writer.writeLine('const baseMaterials = new Map<ItemHrid, number>()')
				writer.writeLine('const requiredSkills = new Map<SkillHrid, number>()')
				writer.writeLine('const recipesBySkill: Partial<Record<SkillHrid, Recipe[]>> = {}')
				writer.writeLine('let totalQuantity = 0')
				writer.writeLine('let maxDepth = 0')
				writer.writeLine('')
				
				writer.writeLine('function traverse(node: RecipeTreeNode): void {')
				writer.writeLine('  totalQuantity += node.totalQuantityNeeded')
				writer.writeLine('  maxDepth = Math.max(maxDepth, node.depth)')
				writer.writeLine('')
				writer.writeLine('  if (node.isBaseMaterial) {')
				writer.writeLine('    const current = baseMaterials.get(node.itemHrid) || 0')
				writer.writeLine('    baseMaterials.set(node.itemHrid, current + node.totalQuantityNeeded)')
				writer.writeLine('  }')
				writer.writeLine('')
				writer.writeLine('  if (node.skillRequirement) {')
				writer.writeLine('    const { skillHrid, level } = node.skillRequirement')
				writer.writeLine('    const current = requiredSkills.get(skillHrid) || 0')
				writer.writeLine('    requiredSkills.set(skillHrid, Math.max(current, level))')
				writer.writeLine('')
				writer.writeLine('    if (node.recipe) {')
				writer.writeLine('      if (!recipesBySkill[skillHrid]) {')
				writer.writeLine('        recipesBySkill[skillHrid] = []')
				writer.writeLine('      }')
				writer.writeLine('      if (!recipesBySkill[skillHrid]!.includes(node.recipe)) {')
				writer.writeLine('        recipesBySkill[skillHrid]!.push(node.recipe)')
				writer.writeLine('      }')
				writer.writeLine('    }')
				writer.writeLine('  }')
				writer.writeLine('')
				writer.writeLine('  node.children.forEach(traverse)')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('traverse(tree)')
				writer.writeLine('')
				writer.writeLine('return {')
				writer.writeLine('  totalUniqueItems: baseMaterials.size,')
				writer.writeLine('  totalQuantity,')
				writer.writeLine('  maxDepth,')
				writer.writeLine('  baseMaterials: Array.from(baseMaterials.entries()).map(([itemHrid, totalQuantity]) => ({')
				writer.writeLine('    itemHrid,')
				writer.writeLine('    totalQuantity')
				writer.writeLine('  })),')
				writer.writeLine('  requiredSkills: Array.from(requiredSkills.entries()).map(([skillHrid, minLevel]) => ({')
				writer.writeLine('    skillHrid,')
				writer.writeLine('    minLevel')
				writer.writeLine('  })),')
				writer.writeLine('  totalCraftingTime: tree.totalCraftingTime || 0,')
				writer.writeLine('  recipesBySkill')
				writer.writeLine('}')
			},
			[
				{ from: './types', names: ['RecipeTreeNode', 'RecipeTreeStats', 'Recipe'], isType: true },
				{ from: '../items/types', names: ['ItemHrid'], isType: true },
				{ from: '../skills/types', names: ['SkillHrid'], isType: true },
			]
		)
	}
}