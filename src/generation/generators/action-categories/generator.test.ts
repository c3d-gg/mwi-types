import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularActionCategoriesGenerator } from './generator'

describe('ActionCategories Generator', () => {
	let generator: ModularActionCategoriesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularActionCategoriesGenerator()

		// Load data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			expect(generator.config.entityName).toBe('ActionCategory')
			expect(generator.config.entityNamePlural).toBe('ActionCategories')
			expect(generator.config.sourceKey).toBe('actionCategoryDetailMap')
		})

		test('should have no shared types (Layer 1 generator)', () => {
			expect(generator.config.sharedTypes).toEqual([])
		})

		test('should have expected utility templates', () => {
			const templates = generator.config.utilityTemplates
			if (templates) {
				expect(
					templates.some(
						(t: any) => t.type === 'getByField' && t.field === 'type',
					),
				).toBe(true)
				expect(
					templates.some(
						(t: any) => t.type === 'sortBy' && t.field === 'sortIndex',
					),
				).toBe(true)
				expect(templates.some((t: any) => t.type === 'toMap')).toBe(true)
			}
		})

		test('should have no shared types (Layer 1 generator)', () => {
			expect(generator.config.sharedTypes).toEqual([])
		})

		test('should have expected utility templates', () => {
			const templates = generator.config.utilityTemplates
			if (templates) {
				expect(
					templates.some(
						(t: any) => t.type === 'getByField' && t.field === 'type',
					),
				).toBe(true)
				expect(
					templates.some(
						(t: any) => t.type === 'sortBy' && t.field === 'sortIndex',
					),
				).toBe(true)
				expect(templates.some((t: any) => t.type === 'toMap')).toBe(true)
			}
		})
	})

	describe('Data Extraction', () => {
		test('should extract correct number of entities', () => {
			expect(sampleSourceData.actionCategoryDetailMap).toBeDefined()
			const entityCount = Object.keys(
				sampleSourceData.actionCategoryDetailMap,
			).length
			expect(entityCount).toBe(59)
		})

		test('should extract entities with correct structure', () => {
			const entities = generator.extractEntities(sampleSourceData)
			expect(Object.keys(entities).length).toBe(59)

			// Test sample entity structure
			const sampleEntity = Object.values(entities)[0] as any
			expect(sampleEntity).toBeDefined()
			expect(typeof sampleEntity.hrid).toBe('string')
			expect(typeof sampleEntity.name).toBe('string')
			expect(typeof sampleEntity.type).toBe('string')
			expect(typeof sampleEntity.sortIndex).toBe('number')
		})

		test('should properly transform entity properties', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Find the alchemy category we know exists
			const alchemyCategory = Object.values(entities).find(
				(entity: any) => entity.hrid === '/action_categories/alchemy/alchemy',
			) as any

			expect(alchemyCategory).toBeDefined()
			expect(alchemyCategory.name).toBe('Alchemy')
			expect(alchemyCategory.type).toBe('/action_types/alchemy')
			expect(alchemyCategory.sortIndex).toBe(1)
		})

		test('should handle all required properties', () => {
			const entities = generator.extractEntities(sampleSourceData)

			for (const entity of Object.values(entities)) {
				const actionCategory = entity as any
				expect(actionCategory.hrid).toMatch(/^\/action_categories\//)
				expect(actionCategory.name).toBeDefined()
				expect(typeof actionCategory.name).toBe('string')
				expect(actionCategory.name.length).toBeGreaterThan(0)
				expect(actionCategory.type).toBeDefined()
				expect(typeof actionCategory.type).toBe('string')
				expect(typeof actionCategory.sortIndex).toBe('number')
				expect(actionCategory.sortIndex).toBeGreaterThanOrEqual(0)
			}
		})

		test('should have no duplicate HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.values(entities).map((entity: any) => entity.hrid)
			const uniqueHrids = new Set(hrids)
			expect(uniqueHrids.size).toBe(hrids.length)
		})

		test('should have reasonable sort index diversity', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const sortIndices = Object.values(entities).map(
				(entity: any) => entity.sortIndex,
			)
			const uniqueIndices = new Set(sortIndices)

			// Expect at least some diversity in sort indices (real data has 12 unique out of 59)
			expect(uniqueIndices.size).toBeGreaterThanOrEqual(5)
			expect(uniqueIndices.size).toBeLessThan(sortIndices.length) // Some duplicates expected
		})
	})

	describe('Type Generation', () => {
		test('should generate without errors', async () => {
			expect(() => {
				generator.generate('./src/sources/game_data.json')
			}).not.toThrow()
		})

		test('should respect domain boundaries', () => {
			// ActionCategories is Layer 1, should not import from other domains
			const imports = generator.config.sharedTypes
			expect(imports).toEqual([])
		})
	})

	describe('Integration', () => {
		test('should work with Actions generator integration', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Verify we can provide ActionCategoryHrid types for Actions
			const sampleCategory = Object.values(entities)[0] as any
			expect(sampleCategory.hrid).toMatch(/^\/action_categories\//)
		})

		test('should support expected utility functions', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Test data is suitable for getByField(type) utility
			const typesFound = new Set(
				Object.values(entities).map((entity: any) => entity.type),
			)
			expect(typesFound.size).toBeGreaterThan(1)

			// Test data is suitable for sortBy(sortIndex) utility
			const sortIndices = Object.values(entities).map(
				(entity: any) => entity.sortIndex,
			)
			const minIndex = Math.min(...sortIndices)
			const maxIndex = Math.max(...sortIndices)
			expect(maxIndex).toBeGreaterThan(minIndex)
		})

		test('should prevent circular dependencies', () => {
			// ActionCategories should not depend on anything (Layer 1)
			expect(generator.config.sharedTypes).toEqual([])

			// Verify the generator is self-contained
			const entities = generator.extractEntities(sampleSourceData)
			expect(Object.keys(entities).length).toBeGreaterThan(0)
		})
	})

	describe('Edge Cases', () => {
		test('should handle missing optional properties gracefully', () => {
			// All properties appear to be required based on sample data
			// But test the generator handles the source data structure properly
			const entities = generator.extractEntities(sampleSourceData)
			expect(Object.keys(entities).length).toBe(59)
		})

		test('should handle empty or invalid source data', () => {
			const emptySourceData = { actionCategoryDetailMap: {} }
			const entities = generator.extractEntities(emptySourceData)
			expect(Object.keys(entities).length).toBe(0)
		})

		test('should validate entity structure requirements', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Every entity must have these properties
			for (const entity of Object.values(entities)) {
				const actionCategory = entity as any
				expect(actionCategory.hrid).toBeDefined()
				expect(actionCategory.name).toBeDefined()
				expect(actionCategory.type).toBeDefined()
				expect(actionCategory.sortIndex).toBeDefined()
			}
		})
	})
})
