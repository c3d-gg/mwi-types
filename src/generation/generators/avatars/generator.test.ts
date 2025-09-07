// ✅ ALWAYS use bun:test (NOT vitest, jest, etc.)
import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularAvatarsGenerator } from './generator'

describe('Avatars Generator', () => {
	let generator: ModularAvatarsGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularAvatarsGenerator()

		// ✅ Load data using Bun APIs (NOT Node.js fs APIs)
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			expect((generator as any).config.entityName).toBe('Avatar')
			expect((generator as any).config.entityNamePlural).toBe('Avatars')
			expect((generator as any).config.sourceKey).toBe('avatarDetailMap')
		})

		test('should have no shared types (no dependencies)', () => {
			const sharedTypes = (generator as any).config.sharedTypes
			expect(sharedTypes).toEqual([])
		})

		test('should have appropriate utility templates', () => {
			const utilityTemplates = (generator as any).config.utilityTemplates
			expect(utilityTemplates).toContainEqual({
				type: 'sortBy',
				field: 'sortIndex',
			})
			expect(utilityTemplates).toContainEqual({ type: 'toMap' })
		})

		test('should have category filters for seasonal avatars', () => {
			const categoryFilters = (generator as any).config.categoryFilters
			expect(categoryFilters).toBeDefined()
			expect(categoryFilters.length).toBeGreaterThan(0)
		})
	})

	describe('Data Extraction', () => {
		test('should extract avatars from avatarDetailMap', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Should have 85 avatars based on our analysis
			expect(Object.keys(entities)).toHaveLength(85)

			// Check a known avatar exists
			expect(entities['/avatars/blue_person_1']).toBeDefined()
		})

		test('should properly transform avatar entities', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const sampleAvatar = entities['/avatars/blue_person_1']

			// Verify all required properties exist and have correct types
			expect(sampleAvatar).toBeDefined()
			expect(sampleAvatar?.hrid).toBe('/avatars/blue_person_1')
			expect(typeof sampleAvatar?.cowbellCost).toBe('number')
			expect(typeof sampleAvatar?.isSeasonal).toBe('boolean')
			expect(typeof sampleAvatar?.sortIndex).toBe('number')
		})

		test('should handle all avatars without errors', () => {
			const entities = generator.extractEntities(sampleSourceData)

			Object.values(entities).forEach((avatar: any) => {
				// All avatars should have required properties
				expect(avatar.hrid).toBeDefined()
				expect(typeof avatar.hrid).toBe('string')
				expect(avatar.hrid).toMatch(/^\/avatars\//)

				expect(avatar.cowbellCost).toBeDefined()
				expect(typeof avatar.cowbellCost).toBe('number')
				expect(avatar.cowbellCost).toBeGreaterThanOrEqual(0) // Some custom avatars are free

				expect(avatar.isSeasonal).toBeDefined()
				expect(typeof avatar.isSeasonal).toBe('boolean')

				expect(avatar.sortIndex).toBeDefined()
				expect(typeof avatar.sortIndex).toBe('number')
			})
		})

		test('should extract seasonal and regular avatars correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const avatars = Object.values(entities)

			const seasonal = avatars.filter((a: any) => a.isSeasonal)
			const regular = avatars.filter((a: any) => !a.isSeasonal)

			// Should have both types
			expect(seasonal.length).toBeGreaterThan(0)
			expect(regular.length).toBeGreaterThan(0)
			expect(seasonal.length + regular.length).toBe(85)
		})
	})

	describe('Type Generation', () => {
		test('should generate files without errors', async () => {
			// Clean first to ensure fresh generation
			await Bun.$`rm -rf ./src/generated/avatars`

			await expect(
				generator.generate('./src/sources/game_data.json'),
			).resolves.toBeUndefined()
		})

		// ✅ MANDATORY: Duplication detection tests
		test('should not have duplicate interface definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/avatars/types.ts')
			const content = await typesFile.text()

			const interfaceMatches = content.match(/export interface Avatar\b/g)
			const typeMatches = content.match(/export type AvatarHrid/g)

			expect(interfaceMatches).toHaveLength(1) // ✅ Must be exactly 1
			expect(typeMatches).toHaveLength(1) // ✅ Must be exactly 1
		})

		test('should not have duplicate constant definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/avatars/constants.ts')
			const content = await constantsFile.text()

			const hridMatches = content.match(/export const AVATAR_HRIDS/g)
			const seasonalMatches = content.match(/export const SEASONAL/g)
			const regularMatches = content.match(/export const REGULAR/g)

			expect(hridMatches).toHaveLength(1) // ✅ Must be exactly 1
			expect(seasonalMatches).toHaveLength(1) // ✅ Must be exactly 1
			expect(regularMatches).toHaveLength(1) // ✅ Must be exactly 1
		})

		test('should not have duplicate function definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/avatars/utils.ts')
			const content = await utilsFile.text()

			const getAvatarMatches = content.match(/export function getAvatar\b/g)
			const isHridMatches = content.match(/export function isAvatarHrid/g)
			const toMapMatches = content.match(/export function toMap\b/g)

			expect(getAvatarMatches).toHaveLength(1) // ✅ Must be exactly 1
			expect(isHridMatches).toHaveLength(1) // ✅ Must be exactly 1
			expect(toMapMatches).toHaveLength(1) // ✅ Must be exactly 1
		})

		test('should generate correct HRID type (not HridHrid)', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/avatars/types.ts')
			const content = await typesFile.text()

			// ✅ Must show AvatarHrid, not HridHrid
			expect(content).toMatch(/hrid: AvatarHrid/)
			expect(content).not.toMatch(/hrid: HridHrid/)
			expect(content).toMatch(/export type AvatarHrid = /)
		})

		test('should generate all expected files', async () => {
			await generator.generate('./src/sources/game_data.json')

			// Check all expected files exist
			const expectedFiles = [
				'./src/generated/avatars/types.ts',
				'./src/generated/avatars/constants.ts',
				'./src/generated/avatars/data.ts',
				'./src/generated/avatars/utils.ts',
				'./src/generated/avatars/lookups.ts',
				'./src/generated/avatars/index.ts',
			]

			for (const filePath of expectedFiles) {
				const file = Bun.file(filePath)
				expect(await file.exists()).toBe(true)
			}
		})
	})

	describe('Generated Content Validation', () => {
		test('should generate correct interface structure', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/avatars/types.ts')
			const content = await typesFile.text()

			// Check interface has all expected properties
			expect(content).toMatch(/interface Avatar/)
			expect(content).toMatch(/hrid: AvatarHrid/)
			expect(content).toMatch(/cowbellCost: number/)
			expect(content).toMatch(/isSeasonal: boolean/)
			expect(content).toMatch(/sortIndex: number/)
		})

		test('should generate appropriate constants', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/avatars/constants.ts')
			const content = await constantsFile.text()

			// Should have main HRID array and category arrays
			expect(content).toMatch(/AVATAR_HRIDS/)
			expect(content).toMatch(/SEASONAL/)
			expect(content).toMatch(/REGULAR/)
		})

		test('should generate utility functions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/avatars/utils.ts')
			const content = await utilsFile.text()

			// Check expected utility functions exist
			expect(content).toMatch(/function getAvatar/)
			expect(content).toMatch(/function isAvatarHrid/)
			expect(content).toMatch(/function toMap/)
			expect(content).toMatch(/function getAvatarsSortedBySortIndex/)
		})
	})

	describe('Integration', () => {
		test('should compile TypeScript without errors', async () => {
			await generator.generate('./src/sources/game_data.json')

			// Test TypeScript compilation
			const result =
				await Bun.$`bun tsc --noEmit --skipLibCheck ./src/generated/avatars/*.ts`.nothrow()
			expect(result.exitCode).toBe(0)
		})

		test('should support tree-shaking (individual imports)', async () => {
			await generator.generate('./src/sources/game_data.json')

			const indexFile = Bun.file('./src/generated/avatars/index.ts')
			const content = await indexFile.text()

			// Should export individual items (named exports for tree-shaking)
			expect(content).toMatch(/export type \{ Avatar, AvatarHrid \}/)
			expect(content).toMatch(/export \{ AVATAR_HRIDS/)
			expect(content).toMatch(/from '\.\/utils/)
		})

		test('should work with modular imports', async () => {
			await generator.generate('./src/sources/game_data.json')

			// Test that we can import specific functions
			const { getAvatar } = await import('../../../generated/avatars/utils')
			const { AVATAR_HRIDS } = await import(
				'../../../generated/avatars/constants'
			)

			// Should be able to use imported functions
			expect(typeof getAvatar).toBe('function')
			expect(Array.isArray(AVATAR_HRIDS)).toBe(true)
			expect(AVATAR_HRIDS.length).toBe(85)
		})
	})
})
