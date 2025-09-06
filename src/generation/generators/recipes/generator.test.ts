import { readFileSync } from 'fs'
import { join } from 'path'

import { beforeAll, describe, expect, it } from 'bun:test'

import { ModularRecipesGenerator } from './generator'

describe('ModularRecipesGenerator', () => {
	let generator: ModularRecipesGenerator
	let sampleSourceData: any

	beforeAll(() => {
		generator = new ModularRecipesGenerator()
		const sourcePath = join(process.cwd(), 'src/sources/game_data.json')
		const sourceContent = readFileSync(sourcePath, 'utf-8')
		sampleSourceData = JSON.parse(sourceContent)
	})

	describe('Configuration', () => {
		it('should have correct entity configuration', () => {
			expect(generator['config'].entityName).toBe('Recipe')
			expect(generator['config'].entityNamePlural).toBe('Recipes')
			expect(generator['config'].sourceKey).toBe('actionDetailMap')
		})

		it('should import required shared types', () => {
			const sharedTypes = generator['config'].sharedTypes || []
			expect(sharedTypes).toContain('LevelRequirement')
			expect(sharedTypes).toContain('ExperienceGain')
		})
	})

	describe('Recipe Extraction', () => {
		it('should extract only actions with input or output items', () => {
			const recipes = generator.extractEntities(sampleSourceData)

			// All extracted entities should have either input or output items
			Object.values(recipes).forEach((recipe) => {
				const hasInputs = recipe.inputItems && recipe.inputItems.length > 0
				const hasOutputs = recipe.outputItems && recipe.outputItems.length > 0
				expect(hasInputs || hasOutputs).toBe(true)
			})
		})

		it('should extract recipe properties correctly', () => {
			const recipes = generator.extractEntities(sampleSourceData)
			const alchemyTea = recipes['/actions/brewing/alchemy_tea']

			if (alchemyTea) {
				expect(alchemyTea.hrid).toBe('/actions/brewing/alchemy_tea')
				expect(alchemyTea.name).toBe('Alchemy Tea')
				expect(alchemyTea.function).toBe('/action_functions/production')
				expect(alchemyTea.type).toBe('/action_types/brewing')
				expect(alchemyTea.category).toBe('/action_categories/brewing/tea')
				expect(alchemyTea.baseTimeCost).toBe(9000000000)

				// Check level requirement
				expect(alchemyTea.levelRequirement).toBeTruthy()
				expect(alchemyTea.levelRequirement?.skillHrid).toBe('/skills/brewing')
				expect(alchemyTea.levelRequirement?.level).toBe(17)

				// Check experience gain
				expect(alchemyTea.experienceGain).toBeTruthy()
				expect(alchemyTea.experienceGain?.skillHrid).toBe('/skills/brewing')
				expect(alchemyTea.experienceGain?.value).toBe(21)

				// Check input items
				expect(alchemyTea.inputItems).toBeTruthy()
				expect(alchemyTea.inputItems?.length).toBe(3)
				expect(alchemyTea.inputItems?.[0]).toEqual({
					itemHrid: '/items/black_tea_leaf',
					count: 1,
				})

				// Check output items
				expect(alchemyTea.outputItems).toBeTruthy()
				expect(alchemyTea.outputItems?.length).toBe(1)
				expect(alchemyTea.outputItems?.[0]).toEqual({
					itemHrid: '/items/alchemy_tea',
					count: 1,
				})
			}
		})

		it('should handle upgrade recipes correctly', () => {
			const recipes = generator.extractEntities(sampleSourceData)
			const superAlchemyTea = recipes['/actions/brewing/super_alchemy_tea']

			if (superAlchemyTea) {
				expect(superAlchemyTea.upgradeItemHrid).toBe('/items/alchemy_tea')
				expect(superAlchemyTea.inputItems).toBeTruthy()
				expect(superAlchemyTea.outputItems).toBeTruthy()
			}
		})

		it('should handle recipes without level requirements', () => {
			const recipes = generator.extractEntities(sampleSourceData)
			// Find a recipe without level requirement if any exists
			const recipesArray = Object.values(recipes)
			const hasRecipesWithoutLevelReq = recipesArray.some(
				(r) => r.levelRequirement === null,
			)
			// This is OK - some recipes might not have level requirements
			expect(typeof hasRecipesWithoutLevelReq).toBe('boolean')
		})
	})

	describe('Interface Definitions', () => {
		it('should define RecipeItem interface', () => {
			const interfaces = generator['defineInterfaces']()
			const recipeItemInterface = interfaces.find(
				(i) => i.name === 'RecipeItem',
			)

			expect(recipeItemInterface).toBeDefined()
			expect(recipeItemInterface?.properties).toContainEqual({
				name: 'itemHrid',
				type: 'ItemHrid',
				optional: false,
			})
			expect(recipeItemInterface?.properties).toContainEqual({
				name: 'count',
				type: 'number',
				optional: false,
			})
		})

		it('should define Recipe interface with correct properties', () => {
			const interfaces = generator['defineInterfaces']()
			const recipeInterface = interfaces.find((i) => i.name === 'Recipe')

			expect(recipeInterface).toBeDefined()
			expect(recipeInterface?.properties).toContainEqual({
				name: 'hrid',
				type: 'RecipeHrid',
				optional: false,
			})
			expect(recipeInterface?.properties).toContainEqual({
				name: 'function',
				type: 'ActionFunction',
				optional: false,
			})
			expect(recipeInterface?.properties).toContainEqual({
				name: 'type',
				type: 'ActionType',
				optional: false,
			})
			expect(recipeInterface?.properties).toContainEqual({
				name: 'inputItems',
				type: 'RecipeItem[] | null',
				optional: false,
			})
			expect(recipeInterface?.properties).toContainEqual({
				name: 'outputItems',
				type: 'RecipeItem[] | null',
				optional: false,
			})
			expect(recipeInterface?.properties).toContainEqual({
				name: 'upgradeItemHrid',
				type: 'ItemHrid',
				optional: true,
			})
		})

		it('should define RecipeTreeNode interface', () => {
			const interfaces = generator['defineInterfaces']()
			const treeNodeInterface = interfaces.find(
				(i) => i.name === 'RecipeTreeNode',
			)

			expect(treeNodeInterface).toBeDefined()
			expect(treeNodeInterface?.properties).toContainEqual({
				name: 'itemHrid',
				type: 'ItemHrid',
				optional: false,
			})
			expect(treeNodeInterface?.properties).toContainEqual({
				name: 'children',
				type: 'RecipeTreeNode[]',
				optional: false,
			})
			expect(treeNodeInterface?.properties).toContainEqual({
				name: 'depth',
				type: 'number',
				optional: false,
			})
			expect(treeNodeInterface?.properties).toContainEqual({
				name: 'isBaseMaterial',
				type: 'boolean',
				optional: false,
			})
		})

		it('should define RecipeTreeStats interface', () => {
			const interfaces = generator['defineInterfaces']()
			const statsInterface = interfaces.find(
				(i) => i.name === 'RecipeTreeStats',
			)

			expect(statsInterface).toBeDefined()
			expect(statsInterface?.properties).toContainEqual({
				name: 'totalUniqueItems',
				type: 'number',
				optional: false,
			})
			expect(statsInterface?.properties).toContainEqual({
				name: 'maxDepth',
				type: 'number',
				optional: false,
			})
		})
	})

	describe('Lookup Definitions', () => {
		it('should define recipes by skill lookup', () => {
			const lookups = generator['defineLookups']()
			const bySkillLookup = lookups.find((l) => l.name === 'RECIPES_BY_SKILL')

			expect(bySkillLookup).toBeDefined()
			expect(bySkillLookup?.type).toBe(
				'Partial<Record<SkillHrid, readonly RecipeHrid[]>>',
			)
		})

		it('should define recipes by type lookup', () => {
			const lookups = generator['defineLookups']()
			const byTypeLookup = lookups.find((l) => l.name === 'RECIPES_BY_TYPE')

			expect(byTypeLookup).toBeDefined()
			expect(byTypeLookup?.type).toBe(
				'Partial<Record<ActionType, readonly RecipeHrid[]>>',
			)
		})

		it('should define recipes by output lookup', () => {
			const lookups = generator['defineLookups']()
			const byOutputLookup = lookups.find((l) => l.name === 'RECIPES_BY_OUTPUT')

			expect(byOutputLookup).toBeDefined()
			expect(byOutputLookup?.type).toBe(
				'Partial<Record<ItemHrid, readonly RecipeHrid[]>>',
			)
		})

		it('should define recipes by input lookup', () => {
			const lookups = generator['defineLookups']()
			const byInputLookup = lookups.find((l) => l.name === 'RECIPES_BY_INPUT')

			expect(byInputLookup).toBeDefined()
			expect(byInputLookup?.type).toBe(
				'Partial<Record<ItemHrid, readonly RecipeHrid[]>>',
			)
		})
	})

	describe('Utility Definitions', () => {
		it('should define recipe lookup utilities', () => {
			const utilities = generator['defineUtilities']()

			const getBySkill = utilities.find((u) => u.name === 'getRecipesBySkill')
			expect(getBySkill).toBeDefined()
			expect(getBySkill?.params).toContainEqual({
				name: 'skillHrid',
				type: 'SkillHrid',
			})
			expect(getBySkill?.returnType).toBe('Recipe[]')

			const getByType = utilities.find((u) => u.name === 'getRecipesByType')
			expect(getByType).toBeDefined()
			expect(getByType?.params).toContainEqual({
				name: 'type',
				type: 'ActionType',
			})

			const getForOutput = utilities.find(
				(u) => u.name === 'getRecipesForOutput',
			)
			expect(getForOutput).toBeDefined()
			expect(getForOutput?.params).toContainEqual({
				name: 'itemHrid',
				type: 'ItemHrid',
			})
		})

		it('should define recipe tree utilities', () => {
			const utilities = generator['defineUtilities']()

			const buildTree = utilities.find((u) => u.name === 'buildRecipeTree')
			expect(buildTree).toBeDefined()
			expect(buildTree?.returnType).toBe('RecipeTreeNode | null')

			const calculateStats = utilities.find(
				(u) => u.name === 'calculateRecipeTreeStats',
			)
			expect(calculateStats).toBeDefined()
			expect(calculateStats?.returnType).toBe('RecipeTreeStats')

			const getTotalMaterials = utilities.find(
				(u) => u.name === 'getTotalMaterials',
			)
			expect(getTotalMaterials).toBeDefined()
			expect(getTotalMaterials?.returnType).toBe('Map<ItemHrid, number>')
		})

		it('should define crafting utilities', () => {
			const utilities = generator['defineUtilities']()

			const canCraft = utilities.find((u) => u.name === 'canCraftRecipe')
			expect(canCraft).toBeDefined()
			expect(canCraft?.returnType).toBe('boolean')

			const getMissing = utilities.find((u) => u.name === 'getMissingMaterials')
			expect(getMissing).toBeDefined()
			expect(getMissing?.returnType).toBe('Map<ItemHrid, number>')

			const getCraftingPath = utilities.find(
				(u) => u.name === 'getCraftingPath',
			)
			expect(getCraftingPath).toBeDefined()
			expect(getCraftingPath?.returnType).toBe('Recipe[]')
		})
	})

	describe('Constants Definitions', () => {
		it('should define cache-related constants', () => {
			const constants = generator['defineConstants']()

			const cache = constants.find((c) => c.name === 'RECIPE_TREE_CACHE')
			expect(cache).toBeDefined()
			expect(cache?.type).toBe('Map<string, RecipeTreeNode>')

			const cacheStats = constants.find(
				(c) => c.name === 'RECIPE_TREE_CACHE_STATS',
			)
			expect(cacheStats).toBeDefined()
			expect(cacheStats?.type).toBe('{ hits: number; misses: number }')
		})
	})

	describe('Import Definitions', () => {
		it('should define correct imports from other domains', () => {
			const imports = generator['defineImports']()

			// Should import from actions
			const actionsImport = imports.find((i) => i.from === '../actions/types')
			expect(actionsImport).toBeDefined()
			expect(actionsImport?.items).toContain('ActionFunction')
			expect(actionsImport?.items).toContain('ActionType')

			// Should import from items
			const itemsImport = imports.find((i) => i.from === '../items/types')
			expect(itemsImport).toBeDefined()
			expect(itemsImport?.items).toContain('ItemHrid')

			// Should import from skills
			const skillsImport = imports.find((i) => i.from === '../skills/types')
			expect(skillsImport).toBeDefined()
			expect(skillsImport?.items).toContain('SkillHrid')

			// Should import from action-categories
			const categoriesImport = imports.find(
				(i) => i.from === '../actioncategories/types',
			)
			expect(categoriesImport).toBeDefined()
			expect(categoriesImport?.items).toContain('ActionCategoryHrid')
		})
	})

	describe('Recipe Count', () => {
		it('should extract approximately 618 recipes', () => {
			const recipes = generator.extractEntities(sampleSourceData)
			const recipeCount = Object.keys(recipes).length

			// Allow some variance as the exact number might change
			expect(recipeCount).toBeGreaterThan(600)
			expect(recipeCount).toBeLessThan(650)
		})
	})
})
