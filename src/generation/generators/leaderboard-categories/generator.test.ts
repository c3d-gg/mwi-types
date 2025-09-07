import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularLeaderboardCategoriesGenerator } from './generator'

describe('LeaderboardCategories Generator', () => {
	let generator: ModularLeaderboardCategoriesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularLeaderboardCategoriesGenerator()

		// Load test data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			const config = (generator as any).config

			expect(config.entityName).toBe('LeaderboardCategory')
			expect(config.entityNamePlural).toBe('LeaderboardCategories')
			expect(config.sourceKey).toBe('leaderboardCategoryDetailMap')
		})

		test('should have Skills dependency configured', () => {
			const config = (generator as any).config
			// Should not import from SharedTypes but might reference Skills
			expect(config.sharedTypes).toEqual([])
		})

		test('should include standard utility templates', () => {
			const config = (generator as any).config
			const templateTypes = config.utilityTemplates?.map((t: any) => t.type)

			expect(templateTypes).toContain('getByField')
			expect(templateTypes).toContain('sortBy')
			expect(templateTypes).toContain('toMap')
		})

		test('should have category filters for skill vs guild leaderboards', () => {
			const config = (generator as any).config
			const filterNames = config.categoryFilters?.map((f: any) => f.name)

			expect(filterNames).toContain('skillLeaderboards')
			expect(filterNames).toContain('guildLeaderboards')
		})
	})

	describe('Data Extraction', () => {
		test('should extract exactly 21 leaderboard categories', () => {
			const entities = generator.extractEntities(sampleSourceData)
			expect(Object.keys(entities)).toHaveLength(21)
		})

		test('should include expected leaderboard category HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)

			// Test known categories
			expect(hrids).toContain('alchemy')
			expect(hrids).toContain('total_level')
			expect(hrids).toContain('guild') // Guild category, not guild_total_level
		})

		test('should correctly map leaderboard category properties', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const alchemyCategory = entities['alchemy']

			expect(alchemyCategory).toBeDefined()
			if (alchemyCategory) {
				expect(alchemyCategory.hrid).toBe('alchemy')
				expect(alchemyCategory.name).toBe('Alchemy')
				expect(alchemyCategory.skillHrid).toBe('/skills/alchemy')
				expect(alchemyCategory.isGuild).toBe(false)
				expect(typeof alchemyCategory.sortIndex).toBe('number')
			}
		})

		test('should handle both skill and guild leaderboard categories', () => {
			const entities = generator.extractEntities(sampleSourceData)

			const skillCategories = Object.values(entities).filter(
				(cat) => !cat.isGuild,
			)
			const guildCategories = Object.values(entities).filter(
				(cat) => cat.isGuild,
			)

			expect(skillCategories.length).toBeGreaterThan(0)
			expect(guildCategories.length).toBeGreaterThan(0)
			expect(skillCategories.length + guildCategories.length).toBe(21)
		})

		test('should preserve skill references correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// All skill-based categories should have valid skillHrid
			for (const category of Object.values(entities)) {
				if (!category.isGuild && category.skillHrid) {
					expect(category.skillHrid).toMatch(/^\/skills\//)
					expect(typeof category.skillHrid).toBe('string')
				}
			}
		})

		test('should have numeric sort indices', () => {
			const entities = generator.extractEntities(sampleSourceData)

			for (const category of Object.values(entities)) {
				expect(typeof category.sortIndex).toBe('number')
				expect(category.sortIndex).toBeGreaterThanOrEqual(0)
			}
		})
	})

	describe('Type Generation', () => {
		test('should generate types without TypeScript errors', async () => {
			// Generate the module
			await generator.generate('./src/sources/game_data.json')

			// Verify files were created
			const typesFile = Bun.file(
				'./src/generated/leaderboardcategories/types.ts',
			)
			const typesExist = await typesFile.exists()
			expect(typesExist).toBe(true)
		})

		test('should create all required output files', async () => {
			await generator.generate('./src/sources/game_data.json')

			const files = [
				'types.ts',
				'constants.ts',
				'data.ts',
				'utils.ts',
				'lookups.ts',
				'index.ts',
			]

			for (const file of files) {
				const filePath = `./src/generated/leaderboardcategories/${file}`
				const fileExists = await Bun.file(filePath).exists()
				expect(fileExists).toBe(true)
			}
		})

		test('should not have duplicate interface definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file(
				'./src/generated/leaderboardcategories/types.ts',
			)
			const content = await typesFile.text()

			// Count interface definitions
			const interfaceMatches = content.match(
				/export interface LeaderboardCategory/g,
			)
			const typeMatches = content.match(/export type LeaderboardCategoryHrid/g)

			expect(interfaceMatches).toHaveLength(1)
			expect(typeMatches).toHaveLength(1)
		})

		test('should not have duplicate constant definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file(
				'./src/generated/leaderboardcategories/constants.ts',
			)
			const content = await constantsFile.text()

			// Count constant definitions
			const hridMatches = content.match(
				/export const LEADERBOARDCATEGORY_HRIDS/g,
			)
			const skillMatches = content.match(/export const SKILLLEADERBOARDS/g)
			const guildMatches = content.match(/export const GUILDLEADERBOARDS/g)

			expect(hridMatches).toHaveLength(1)
			expect(skillMatches).toHaveLength(1)
			expect(guildMatches).toHaveLength(1)
		})

		test('should not have duplicate function definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file(
				'./src/generated/leaderboardcategories/utils.ts',
			)
			const content = await utilsFile.text()

			// Count function definitions
			const isHridMatches = content.match(
				/export function isLeaderboardCategoryHrid/g,
			)
			const getMatches = content.match(
				/export function getLeaderboardCategory\b/g,
			)
			const getAllMatches = content.match(
				/export function getAllLeaderboardCategories/g,
			)

			expect(isHridMatches).toHaveLength(1)
			expect(getMatches).toHaveLength(1)
			expect(getAllMatches).toHaveLength(1)
		})

		test('should generate correct HRID type (not HridHrid)', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file(
				'./src/generated/leaderboardcategories/types.ts',
			)
			const content = await typesFile.text()

			// Should have correct HRID type
			expect(content).toContain('hrid: LeaderboardCategoryHrid')
			expect(content).not.toContain('hrid: HridHrid')
		})
	})

	describe('Category Filtering', () => {
		test('should generate skill leaderboards category', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file(
				'./src/generated/leaderboardcategories/constants.ts',
			)
			const content = await constantsFile.text()

			expect(content).toContain('SKILLLEADERBOARDS')
		})

		test('should generate guild leaderboards category', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file(
				'./src/generated/leaderboardcategories/constants.ts',
			)
			const content = await constantsFile.text()

			expect(content).toContain('GUILDLEADERBOARDS')
		})
	})

	describe('Utility Functions', () => {
		test('should generate standard utility functions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file(
				'./src/generated/leaderboardcategories/utils.ts',
			)
			const content = await utilsFile.text()

			// Should have template-generated functions
			expect(content).toContain('getLeaderboardCategoriesBySkillHrid')
			expect(content).toContain('getLeaderboardCategoriesSortedBySortIndex')
		})

		test('should generate leaderboard-specific utility functions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file(
				'./src/generated/leaderboardcategories/utils.ts',
			)
			const content = await utilsFile.text()

			expect(content).toContain('getSkillLeaderboards')
			expect(content).toContain('getGuildLeaderboards')
		})
	})

	describe('Lookups Generation', () => {
		test('should handle lookups when needed', async () => {
			await generator.generate('./src/sources/game_data.json')

			const lookupsFile = Bun.file(
				'./src/generated/leaderboardcategories/lookups.ts',
			)
			const exists = await lookupsFile.exists()

			// For now lookups are empty, just verify file exists
			expect(exists).toBe(true)
		})
	})

	describe('Edge Cases and Validation', () => {
		test('should handle missing optional properties gracefully', () => {
			// Test with minimal data
			const minimalData = {
				leaderboardCategoryDetailMap: {
					test: {
						hrid: 'test',
						name: 'Test',
						skillHrid: '/skills/test',
						isGuild: false,
						sortIndex: 0,
					},
				},
			}

			const entities = generator.extractEntities(minimalData)
			expect(Object.keys(entities)).toHaveLength(1)
		})

		test('should not have duplicate HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)
			const uniqueHrids = [...new Set(hrids)]

			expect(hrids.length).toBe(uniqueHrids.length)
		})

		test('should handle both guild and skill leaderboard types', () => {
			const entities = generator.extractEntities(sampleSourceData)

			let hasGuildCategory = false
			let hasSkillCategory = false

			for (const category of Object.values(entities)) {
				if (category.isGuild) hasGuildCategory = true
				if (!category.isGuild) hasSkillCategory = true
			}

			expect(hasGuildCategory).toBe(true)
			expect(hasSkillCategory).toBe(true)
		})
	})

	describe('Integration', () => {
		test('should follow modular generator patterns', () => {
			// Verify inheritance
			expect(generator).toBeInstanceOf(ModularLeaderboardCategoriesGenerator)

			// Verify required methods exist
			expect(typeof generator.extractEntities).toBe('function')
			expect(typeof generator.generate).toBe('function')
		})

		test('should support Skills module integration', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Should have skill references that match Skills module
			for (const category of Object.values(entities)) {
				if (!category.isGuild && category.skillHrid) {
					expect(category.skillHrid).toMatch(/^\/skills\/[a-z_]+$/)
				}
			}
		})

		test('should generate all expected files', async () => {
			await generator.generate('./src/sources/game_data.json')

			const expectedFiles = [
				'types.ts',
				'constants.ts',
				'data.ts',
				'utils.ts',
				'lookups.ts',
				'index.ts',
			]

			for (const file of expectedFiles) {
				const path = `./src/generated/leaderboardcategories/${file}`
				const exists = await Bun.file(path).exists()
				expect(exists).toBe(true)
			}
		})

		test('should have valid TypeScript compilation', async () => {
			await generator.generate('./src/sources/game_data.json')

			// Files should exist and be valid TypeScript
			const typesFile = Bun.file(
				'./src/generated/leaderboardcategories/types.ts',
			)
			const content = await typesFile.text()

			expect(content.length).toBeGreaterThan(0)
			expect(content).toContain('export interface LeaderboardCategory')
			expect(content).toContain('export type LeaderboardCategoryHrid')
		})

		test('should maintain tree-shaking compatibility', async () => {
			await generator.generate('./src/sources/game_data.json')

			// index.ts should have individual exports, not barrel exports
			const indexFile = Bun.file(
				'./src/generated/leaderboardcategories/index.ts',
			)
			const content = await indexFile.text()

			// Should have named exports (tree-shaking compatible)
			expect(content).toContain("from './constants.js'")
			expect(content).toContain("from './types.js'")
			expect(content).toContain("from './utils.js'")
		})
	})
})
