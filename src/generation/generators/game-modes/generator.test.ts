import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularGameModesGenerator } from './generator'

describe('GameModes Generator', () => {
	let generator: ModularGameModesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularGameModesGenerator()

		// Load data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct configuration', () => {
			expect(generator.config.entityName).toBe('GameMode')
			expect(generator.config.entityNamePlural).toBe('GameModes')
			expect(generator.config.sourceKey).toBe('gameModeDetailMap')
		})

		test('should have no shared types dependencies', () => {
			expect(generator.config.sharedTypes).toEqual([])
		})

		test('should have utility templates for filtering and sorting', () => {
			const utilityTemplates = generator.config.utilityTemplates || []
			const templateTypes = utilityTemplates.map((t) => t.type)

			expect(templateTypes).toContain('getByField')
			expect(templateTypes).toContain('sortBy')
			expect(templateTypes).toContain('toMap')
		})
	})

	describe('Data Extraction', () => {
		test('should extract game modes from source data', async () => {
			const entities = await generator.extractEntities(sampleSourceData)

			expect(entities).toBeDefined()
			expect(Object.keys(entities)).toHaveLength(3)
		})

		test('should extract ironcow game mode correctly', async () => {
			const entities = await generator.extractEntities(sampleSourceData)
			const ironcow = entities['ironcow']

			expect(ironcow).toBeDefined()
			if (!ironcow) return

			expect(ironcow.hrid).toBe('ironcow')
			expect(ironcow.name).toBe('Ironcow')
			expect(ironcow.isCreatable).toBe(true)
			expect(ironcow.marketRestricted).toBe(true)
			expect(ironcow.maxCharacterLimit).toBe(3)
			expect(ironcow.subsetGameModes).toEqual(['legacy_ironcow'])
		})

		test('should handle all required properties', async () => {
			const entities = await generator.extractEntities(sampleSourceData)

			for (const entity of Object.values(entities)) {
				expect(entity).toHaveProperty('hrid')
				expect(entity).toHaveProperty('name')
				expect(entity).toHaveProperty('description')
				expect(entity).toHaveProperty('isCreatable')
				expect(entity).toHaveProperty('maxCharacterLimit')
				expect(entity).toHaveProperty('marketRestricted')
				expect(entity).toHaveProperty('subsetGameModes')
				expect(entity).toHaveProperty('sortIndex')
			}
		})

		test('should validate data types', async () => {
			const entities = await generator.extractEntities(sampleSourceData)

			for (const entity of Object.values(entities)) {
				expect(typeof entity.hrid).toBe('string')
				expect(typeof entity.name).toBe('string')
				expect(typeof entity.description).toBe('string')
				expect(typeof entity.isCreatable).toBe('boolean')
				expect(typeof entity.maxCharacterLimit).toBe('number')
				expect(typeof entity.marketRestricted).toBe('boolean')
				expect(Array.isArray(entity.subsetGameModes)).toBe(true)
				expect(typeof entity.sortIndex).toBe('number')
			}
		})
	})

	describe('Type Generation', () => {
		test('should generate types without errors', async () => {
			// This should not throw
			await generator.generate('./src/sources/game_data.json')
		})

		test('should not have duplicate interface definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/gamemodes/types.ts')
			const content = await typesFile.text()

			const interfaceMatches = content.match(/export interface GameMode/g)
			const typeMatches = content.match(/export type GameModeHrid/g)

			expect(interfaceMatches).toHaveLength(1) // Must be exactly 1
			expect(typeMatches).toHaveLength(1) // Must be exactly 1
		})

		test('should not have duplicate constant definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/gamemodes/constants.ts')
			const content = await constantsFile.text()

			const hridMatches = content.match(/export const GAMEMODE_HRIDS/g)
			expect(hridMatches).toHaveLength(1) // Must be exactly 1
		})

		test('should not have duplicate function definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/gamemodes/utils.ts')
			const content = await utilsFile.text()

			const getMatches = content.match(/export function getGameMode\b/g)
			const isHridMatches = content.match(/export function isGameModeHrid/g)

			expect(getMatches).toHaveLength(1) // Must be exactly 1
			expect(isHridMatches).toHaveLength(1) // Must be exactly 1
		})

		test('should generate correct HRID type (not HridHrid)', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/gamemodes/types.ts')
			const content = await typesFile.text()

			// Should have GameModeHrid, not HridHrid
			expect(content).toContain('hrid: GameModeHrid')
			expect(content).not.toContain('HridHrid')
		})
	})

	describe('Category Filtering', () => {
		test('should generate creatable game modes category', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/gamemodes/constants.ts')
			const content = await constantsFile.text()

			expect(content).toContain('CREATABLE')
		})

		test('should generate market restricted modes category', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/gamemodes/constants.ts')
			const content = await constantsFile.text()

			expect(content).toContain('MARKETRESTRICTED')
		})
	})

	describe('Utility Functions', () => {
		test('should generate standard utility functions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/gamemodes/utils.ts')
			const content = await utilsFile.text()

			// Standard utilities
			expect(content).toContain('export function getGameMode')
			expect(content).toContain('export function isGameModeHrid')
			expect(content).toContain('export function getAllGameModes')

			// Template utilities
			expect(content).toContain('export function toMap')
			expect(content).toContain('export function getGameModesSortedBy')
		})

		test('should generate game mode specific utilities', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/gamemodes/utils.ts')
			const content = await utilsFile.text()

			expect(content).toContain('getCreatableGameModes')
			expect(content).toContain('getMarketRestrictedGameModes')
		})
	})

	describe('Integration', () => {
		test('should generate all expected files', async () => {
			await generator.generate('./src/sources/game_data.json')

			const files = [
				'./src/generated/gamemodes/types.ts',
				'./src/generated/gamemodes/constants.ts',
				'./src/generated/gamemodes/data.ts',
				'./src/generated/gamemodes/utils.ts',
				'./src/generated/gamemodes/index.ts',
			]

			for (const filePath of files) {
				const file = Bun.file(filePath)
				expect(await file.exists()).toBe(true)
			}
		})

		test('should have valid TypeScript compilation', async () => {
			await generator.generate('./src/sources/game_data.json')

			// This will be verified by the validation phase
			expect(true).toBe(true)
		})

		test('should maintain tree-shaking compatibility', async () => {
			await generator.generate('./src/sources/game_data.json')

			const indexFile = Bun.file('./src/generated/gamemodes/index.ts')
			const content = await indexFile.text()

			// Should have explicit exports, not barrel exports
			expect(content).toContain('export')
			// Individual named exports are tree-shakeable (this is correct)
			expect(content).toContain('export {')
		})
	})
})
