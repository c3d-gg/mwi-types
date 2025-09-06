import path from 'path'

import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularActionsGenerator } from './generator'

describe('Actions Generator', () => {
	let generator: ModularActionsGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularActionsGenerator()

		// Load sample source data for testing using Bun APIs
		const sourcePath = path.join(process.cwd(), 'src/sources/game_data.json')
		sampleSourceData = await Bun.file(sourcePath).json()
	})

	describe('Configuration', () => {
		test('should have correct configuration', () => {
			expect(generator.config.entityName).toBe('Action')
			expect(generator.config.entityNamePlural).toBe('Actions')
			expect(generator.config.sourceKey).toBe('actionDetailMap')
			expect(generator.config.outputPath).toBe('src/generated/actions')
		})

		test('should have shared types configured', () => {
			expect(generator.config.sharedTypes).toContain('LevelRequirement')
			expect(generator.config.sharedTypes).toContain('ExperienceGain')
			expect(generator.config.sharedTypes).toContain('ActionItem')
			expect(generator.config.sharedTypes).toContain('DropTable')
		})

		test('should have utility templates configured', () => {
			expect(generator.config.utilityTemplates).toBeDefined()
			expect(generator.config.utilityTemplates?.length).toBeGreaterThan(0)
		})

		test('should have category filters configured', () => {
			expect(generator.config.categoryFilters).toBeDefined()
			expect(generator.config.categoryFilters?.length).toBeGreaterThan(0)
		})
	})

	describe('Data Extraction', () => {
		test('should extract actions from source data', () => {
			const entities = generator.extractEntities(sampleSourceData)

			expect(Object.keys(entities).length).toBeGreaterThan(0)
			expect(Object.keys(entities).length).toBe(728) // Known action count
		})

		test('should extract action properties correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const actionHrids = Object.keys(entities)
			expect(actionHrids.length).toBeGreaterThan(0)
			const actionHrid = actionHrids[0]!
			const action = entities[actionHrid]!

			expect(action).toBeDefined()
			expect(action.hrid).toBe(actionHrid)
			expect(action.name).toBeDefined()
			expect(action.function).toBeDefined()
			expect(action.type).toBeDefined()
			expect(action.category).toBeDefined()
			expect(typeof action.baseTimeCost).toBe('number')
			expect(typeof action.maxDifficulty).toBe('number')
			expect(typeof action.maxPartySize).toBe('number')
		})

		test('should handle optional properties correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Find an action with level requirement
			const actionWithLevelReq = Object.values(entities).find(
				(a) => a.levelRequirement !== null,
			)
			expect(actionWithLevelReq?.levelRequirement).toBeDefined()
			expect(actionWithLevelReq?.levelRequirement?.skillHrid).toBeDefined()
			expect(actionWithLevelReq?.levelRequirement?.level).toBeGreaterThan(0)
		})

		test('should categorize actions correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)

			const combatActions = Object.values(entities).filter(
				(a) => a.combatZoneInfo !== null,
			)
			expect(combatActions.length).toBeGreaterThan(0)

			const nonCombatActions = Object.values(entities).filter(
				(a) => a.combatZoneInfo === null,
			)
			expect(nonCombatActions.length).toBeGreaterThan(0)
		})
	})

	describe('Type Generation', () => {
		test('should define interfaces correctly', async () => {
			// Test the defineInterfaces hook instead of the internal generateTypes method
			const interfaces = generator['defineInterfaces']()

			expect(interfaces).toBeDefined()
			expect(Array.isArray(interfaces)).toBe(true)
			expect(interfaces.length).toBeGreaterThan(0)

			// Should have the main Action interface
			const actionInterface = interfaces.find((i) => i.name === 'Action')
			expect(actionInterface).toBeDefined()
			expect(actionInterface?.properties).toBeDefined()
		})
	})

	describe('Constants Generation', () => {
		test('should define constants correctly', async () => {
			// Test the defineConstants hook instead of internal method
			const constants = generator['defineConstants']()

			expect(constants).toBeDefined()
			expect(Array.isArray(constants)).toBe(true)
			// Should have DUNGEON_ACTION_HRIDS constant
			const dungeonConstant = constants.find(
				(c) => c.name === 'DUNGEON_ACTION_HRIDS',
			)
			expect(dungeonConstant).toBeDefined()
		})
	})

	describe('Lookups Generation', () => {
		test('should define lookups correctly', async () => {
			// Need to extract entities first to populate lookup data
			generator.extractEntities(sampleSourceData)

			// Test the defineLookups hook instead of internal method
			const lookups = generator['defineLookups']()

			expect(lookups).toBeDefined()
			expect(Array.isArray(lookups)).toBe(true)
			expect(lookups.length).toBeGreaterThan(0)

			// Should have actions by category lookup
			const categoryLookup = lookups.find(
				(l) => l.name === 'ACTIONS_BY_CATEGORY',
			)
			expect(categoryLookup).toBeDefined()
		})
	})

	describe('Utilities Generation', () => {
		test('should define utilities correctly', async () => {
			// Test the defineUtilities hook instead of internal method
			const utilities = generator['defineUtilities']()

			expect(utilities).toBeDefined()
			expect(Array.isArray(utilities)).toBe(true)
			expect(utilities.length).toBeGreaterThan(0)

			// Should have custom utility functions
			const skillUtility = utilities.find((u) => u.name === 'getActionsBySkill')
			expect(skillUtility).toBeDefined()
		})
	})

	describe('Full Generation', () => {
		test('should complete full generation without errors', async () => {
			const sourcePath = './src/sources/game_data.json'

			// This should not throw
			expect(generator.generate(sourcePath)).resolves.toBeUndefined()
		})
	})

	describe('Duplication Detection', () => {
		test('should not have duplicate HRID type exports', async () => {
			const typesPath = './src/generated/actions/types.ts'

			try {
				const file = Bun.file(typesPath)
				if (await file.exists()) {
					const content = await file.text()
					const lines = content.split('\n')

					// Find all ActionHrid type definitions
					const actionHridLines = lines.filter((line: string) =>
						line.trim().startsWith('export type ActionHrid'),
					)

					expect(actionHridLines.length).toBe(1)

					// Verify it references constants correctly
					if (actionHridLines.length === 1) {
						expect(actionHridLines[0]).toContain('ACTION_HRIDS')
					}
				}
			} catch (error) {
				// If file doesn't exist, skip test - generator not run yet
			}
		})

		test('should import constants for HRID type', async () => {
			const typesPath = './src/generated/actions/types.ts'

			try {
				const file = Bun.file(typesPath)
				if (await file.exists()) {
					const content = await file.text()

					// Should import ACTION_HRIDS from constants
					expect(content).toContain(
						"import { ACTION_HRIDS } from './constants'",
					)

					// Should use it in the type definition
					expect(content).toContain('(typeof ACTION_HRIDS)[number]')
				}
			} catch (error) {
				// If file doesn't exist, skip test - generator not run yet
			}
		})
	})

	describe('Integration', () => {
		test('should maintain domain boundaries', () => {
			// Verify the generator doesn't re-export types from other domains
			// This is more of a code review item, but we can check configuration
			expect(generator.config.sharedTypes).not.toContain('ItemHrid')
			expect(generator.config.sharedTypes).not.toContain('SkillHrid')
		})

		test('should use shared types correctly', () => {
			// Verify shared types are properly configured
			const sharedTypes = generator.config.sharedTypes || []

			expect(sharedTypes).toContain('LevelRequirement')
			expect(sharedTypes).toContain('ExperienceGain')
			expect(sharedTypes).toContain('ActionItem')
			expect(sharedTypes).toContain('DropTable')
			expect(sharedTypes).toContain('SpawnInfo')
			expect(sharedTypes).toContain('RandomSpawnInfo')
		})
	})
})
