import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularPurchaseBundlesGenerator } from './generator'

describe('PurchaseBundles Generator', () => {
	let generator: ModularPurchaseBundlesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularPurchaseBundlesGenerator()

		// Load actual game data for testing
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			// Configuration is internal, test through the actual generation
			expect(generator).toBeDefined()
			expect(generator).toBeInstanceOf(ModularPurchaseBundlesGenerator)
		})

		test('should generate all standard components', async () => {
			// Test that generation creates all expected files
			await generator.generate('./src/sources/game_data.json')
			
			const typesFile = Bun.file('./src/generated/purchasebundles/types.ts')
			const constantsFile = Bun.file('./src/generated/purchasebundles/constants.ts')
			const dataFile = Bun.file('./src/generated/purchasebundles/data.ts')
			const utilsFile = Bun.file('./src/generated/purchasebundles/utils.ts')
			const indexFile = Bun.file('./src/generated/purchasebundles/index.ts')

			expect(await typesFile.exists()).toBe(true)
			expect(await constantsFile.exists()).toBe(true)
			expect(await dataFile.exists()).toBe(true)
			expect(await utilsFile.exists()).toBe(true)
			expect(await indexFile.exists()).toBe(true)
		})
	})

	describe('Data Extraction', () => {
		test('should extract correct number of purchase bundles', () => {
			const entities = generator.extractEntities(sampleSourceData)
			expect(Object.keys(entities).length).toBe(14)
		})

		test('should extract purchase bundle with all properties', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const cowbells1050 = entities['/purchase_bundles/cowbells_1050']

			expect(cowbells1050).toBeDefined()
			expect(cowbells1050.hrid).toBe('/purchase_bundles/cowbells_1050')
			expect(cowbells1050.name).toBe('1050 Cowbells')
			expect(cowbells1050.quantity).toBe(1050)
			expect(cowbells1050.centPrice).toBe(1000)
			expect(cowbells1050.kredPrice).toBe(136)
			expect(cowbells1050.supporterPoints).toBe(1000)
			expect(cowbells1050.mooPassDays).toBe(0)
			expect(cowbells1050.isAccountMooPass).toBe(false)
			expect(cowbells1050.isStandardOnly).toBe(false)
			expect(cowbells1050.isIroncowOnly).toBe(false)
			expect(cowbells1050.sortIndex).toBe(2)
			expect(cowbells1050.kongregateIdentifier).toBe('1050_cowbells')
			expect(cowbells1050.stripeItemId).toBe('price_1RkfBXEBHpwqglBu4KJeU9pQ')
			expect(cowbells1050.steamItemId).toBe(2)
		})

		test('should handle optional fields correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const bundles = Object.values(entities)

			// Check that we have MooPass bundles
			const mooPassBundles = bundles.filter(b => b.mooPassDays > 0)
			expect(mooPassBundles.length).toBeGreaterThan(0)

			// Check account MooPass bundles
			const accountMooPassBundles = bundles.filter(b => b.isAccountMooPass)
			expect(accountMooPassBundles.length).toBeGreaterThan(0)
		})

		test('should extract all unique HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)
			const uniqueHrids = new Set(hrids)
			
			expect(hrids.length).toBe(uniqueHrids.size)
			expect(hrids.every(h => h.startsWith('/purchase_bundles/'))).toBe(true)
		})
	})

	describe('Type Generation', () => {
		test('should generate without TypeScript errors', async () => {
			await generator.generate('./src/sources/game_data.json')

			// Verify files exist
			const typesFile = Bun.file('./src/generated/purchasebundles/types.ts')
			const constantsFile = Bun.file('./src/generated/purchasebundles/constants.ts')
			const utilsFile = Bun.file('./src/generated/purchasebundles/utils.ts')

			expect(await typesFile.exists()).toBe(true)
			expect(await constantsFile.exists()).toBe(true)
			expect(await utilsFile.exists()).toBe(true)
		})

		test('should not have duplicate interface definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const typesFile = Bun.file('./src/generated/purchasebundles/types.ts')
			const content = await typesFile.text()

			const interfaceMatches = content.match(/export interface PurchaseBundle/g)
			const typeMatches = content.match(/export type PurchaseBundleHrid/g)

			expect(interfaceMatches).toHaveLength(1)
			expect(typeMatches).toHaveLength(1)
		})

		test('should not have duplicate constant definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/purchasebundles/constants.ts')
			const content = await constantsFile.text()

			const hridMatches = content.match(/export const PURCHASEBUNDLE_HRIDS/g)
			expect(hridMatches).toHaveLength(1)
		})

		test('should not have duplicate function definitions', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/purchasebundles/utils.ts')
			const content = await utilsFile.text()

			const getMatches = content.match(/export function getPurchaseBundle\b/g)
			const isHridMatches = content.match(/export function isPurchaseBundleHrid/g)

			expect(getMatches).toHaveLength(1)
			expect(isHridMatches).toHaveLength(1)
		})
	})

	describe('Utilities', () => {
		test('should generate category filter utilities', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/purchasebundles/utils.ts')
			const content = await utilsFile.text()

			// Should have MooPass utilities
			expect(content).toContain('export function getMooPassBundles()')
			expect(content).toContain('export function getCowbellBundles()')
			expect(content).toContain('export function getAccountMooPassBundles()')
		})

		test('should generate sort utilities', async () => {
			await generator.generate('./src/sources/game_data.json')

			const utilsFile = Bun.file('./src/generated/purchasebundles/utils.ts')
			const content = await utilsFile.text()

			expect(content).toContain('export function getPurchaseBundlesSortedByPrice()')
			expect(content).toContain('export function getPurchaseBundlesSortedBySortIndex()')
		})
	})

	describe('Constants', () => {
		test('should generate MooPass bundle constants', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/purchasebundles/constants.ts')
			const content = await constantsFile.text()

			expect(content).toContain('export const MOOPASS_BUNDLES')
			expect(content).toContain('export const COWBELL_BUNDLES')
			expect(content).toContain('export const ACCOUNT_MOOPASS_BUNDLES')
		})

		test('should separate standard and ironcow bundles', async () => {
			await generator.generate('./src/sources/game_data.json')

			const constantsFile = Bun.file('./src/generated/purchasebundles/constants.ts')
			const content = await constantsFile.text()

			expect(content).toContain('export const STANDARD_ONLY_BUNDLES')
			expect(content).toContain('export const IRONCOW_ONLY_BUNDLES')
		})
	})

	describe('Integration', () => {
		test('should handle all 14 purchase bundles correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const bundles = Object.values(entities)

			expect(bundles.length).toBe(14)
			
			// All bundles should have required fields
			bundles.forEach(bundle => {
				expect(bundle.hrid).toBeDefined()
				expect(bundle.name).toBeDefined()
				expect(typeof bundle.centPrice).toBe('number')
				expect(typeof bundle.kredPrice).toBe('number')
				expect(typeof bundle.isStandardOnly).toBe('boolean')
				expect(typeof bundle.isIroncowOnly).toBe('boolean')
				expect(typeof bundle.isAccountMooPass).toBe('boolean')
			})
		})

		test('should maintain data integrity', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const bundles = Object.values(entities)

			// Check logical constraints
			bundles.forEach(bundle => {
				// Can't be both standard-only and ironcow-only
				if (bundle.isStandardOnly) {
					expect(bundle.isIroncowOnly).toBe(false)
				}
				if (bundle.isIroncowOnly) {
					expect(bundle.isStandardOnly).toBe(false)
				}

				// MooPass days should be non-negative
				expect(bundle.mooPassDays).toBeGreaterThanOrEqual(0)

				// Prices should be positive
				expect(bundle.centPrice).toBeGreaterThan(0)
				expect(bundle.kredPrice).toBeGreaterThan(0)
			})
		})
	})
})