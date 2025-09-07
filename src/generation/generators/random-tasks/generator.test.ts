import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularRandomTasksGenerator } from './generator'

describe('RandomTasks Generator', () => {
	let generator: ModularRandomTasksGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularRandomTasksGenerator()

		// Load data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			const config = generator['config']
			expect(config.entityName).toBe('RandomTaskType')
			expect(config.entityNamePlural).toBe('RandomTaskTypes')
			expect(config.sourceKey).toBe('randomTaskTypeDetailMap')
		})
	})

	describe('Data Extraction', () => {
		test('should extract all random task types', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			expect(Object.keys(entities).length).toBe(9)
		})

		test('should properly transform random task data', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			const brewing = entities['/random_task_types/brewing']

			expect(brewing).toBeDefined()
			expect(brewing.hrid).toBe('/random_task_types/brewing')
			expect(brewing.isCombat).toBe(false)
			expect(brewing.skillHrid).toBe('/skills/brewing')
			expect(brewing.sortIndex).toBe(8)
		})

		test('should handle combat tasks correctly', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			const combatTasks = Object.values(entities).filter(t => t.isCombat)
			const skillTasks = Object.values(entities).filter(t => !t.isCombat)

			expect(combatTasks.length).toBeGreaterThan(0)
			expect(skillTasks.length).toBeGreaterThan(0)
			expect(combatTasks.length + skillTasks.length).toBe(9)
		})

		test('should handle null skillHrid for combat tasks', () => {
			const entities = generator['extractEntities'](sampleSourceData)
			const combatTasks = Object.values(entities).filter(t => t.isCombat)

			// Combat tasks typically don't have skillHrid
			combatTasks.forEach(task => {
				if (!task.skillHrid) {
					expect(task.skillHrid).toBeNull()
				}
			})
		})
	})

	describe('Type Generation', () => {
		test('should generate without errors', async () => {
			await expect(async () => {
				await generator.generate('./src/sources/game_data.json')
			}).not.toThrow()
		})

		test('should not have duplicate interface definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/randomtasktypes/types.ts')
			const content = await typesFile.text()

			const interfaceMatches = content.match(/export interface RandomTaskType/g)
			const typeMatches = content.match(/export type RandomTaskTypeHrid/g)

			expect(interfaceMatches).toHaveLength(1)
			expect(typeMatches).toHaveLength(1)
		})

		test('should not have duplicate constant definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/randomtasktypes/constants.ts')
			const content = await constantsFile.text()

			const hridMatches = content.match(/export const RANDOMTASKTYPE_HRIDS/g)
			expect(hridMatches).toHaveLength(1)

			// Check for category constants
			const combatMatches = content.match(/export const COMBAT_RANDOMTASKTYPES/g)
			const skillMatches = content.match(/export const SKILL_RANDOMTASKTYPES/g)
			expect(combatMatches).toHaveLength(1)
			expect(skillMatches).toHaveLength(1)
		})

		test('should not have duplicate function definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/randomtasktypes/utils.ts')
			const content = await utilsFile.text()

			const getMatches = content.match(/export function getRandomTaskType\(/g)
			const isHridMatches = content.match(/export function isRandomTaskTypeHrid/g)
			const getCombatMatches = content.match(/export function getCombatRandomTasks/g)
			const getSkillMatches = content.match(/export function getSkillRandomTasks/g)

			expect(getMatches).toHaveLength(1)
			expect(isHridMatches).toHaveLength(1)
			expect(getCombatMatches).toHaveLength(1)
			expect(getSkillMatches).toHaveLength(1)
		})
	})

	describe('Category Filters', () => {
		test('should generate combat and skill category constants', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/randomtasktypes/constants.ts')
			const content = await constantsFile.text()

			expect(content).toContain('export const COMBAT_RANDOMTASKTYPES')
			expect(content).toContain('export const SKILL_RANDOMTASKTYPES')
		})
	})

	describe('Utility Functions', () => {
		test('should generate custom utility functions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/randomtasktypes/utils.ts')
			const content = await utilsFile.text()

			expect(content).toContain('export function getCombatRandomTasks')
			expect(content).toContain('export function getSkillRandomTasks')
			expect(content).toContain('export function getRandomTasksBySkill')
		})
	})

	describe('Integration', () => {
		test('should import SkillHrid from skills module', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/randomtasktypes/types.ts')
			const content = await typesFile.text()

			expect(content).toContain("import type { SkillHrid } from '../skills/types'")
		})

		test('should handle all 9 random task types', async () => {
			await generator.generate('./src/sources/game_data.json')

			const dataFile = Bun.file('./src/generated/randomtasktypes/data.ts')
			const content = await dataFile.text()

			// Count the number of task entries
			const taskMatches = content.match(/\/random_task_types\/\w+/g)
			expect(taskMatches?.length).toBeGreaterThanOrEqual(9)
		})
	})
})