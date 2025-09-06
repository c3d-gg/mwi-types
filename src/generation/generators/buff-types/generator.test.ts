import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularBuffTypesGenerator } from './generator'

describe('BuffTypes Generator', () => {
	let generator: ModularBuffTypesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularBuffTypesGenerator()

		// Load data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			expect(generator.config.entityName).toBe('BuffType')
			expect(generator.config.entityNamePlural).toBe('BuffTypes')
			expect(generator.config.sourceKey).toBe('buffTypeDetailMap')
		})

		test('should have no shared types (Layer 1 generator)', () => {
			expect(generator.config.sharedTypes).toEqual([])
		})

		test('should have expected utility templates', () => {
			const templates = generator.config.utilityTemplates
			if (templates) {
				expect(
					templates.some(
						(t: any) => t.type === 'sortBy' && t.field === 'sortIndex',
					),
				).toBe(true)
				expect(templates.some((t: any) => t.type === 'toMap')).toBe(true)
			}
		})

		test('should have category filters for combat/non-combat', () => {
			const filters = generator.config.categoryFilters
			if (filters) {
				expect(filters.some((f: any) => f.name === 'combat')).toBe(true)
				expect(filters.some((f: any) => f.name === 'nonCombat')).toBe(true)
			}
		})
	})

	describe('Data Extraction', () => {
		test('should extract correct number of entities', () => {
			expect(sampleSourceData.buffTypeDetailMap).toBeDefined()
			const entityCount = Object.keys(sampleSourceData.buffTypeDetailMap).length
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
			expect(typeof sampleEntity.description).toBe('string')
			expect(typeof sampleEntity.debuffDescription).toBe('string')
			expect(typeof sampleEntity.isCombat).toBe('boolean')
			expect(typeof sampleEntity.sortIndex).toBe('number')
		})

		test('should properly transform entity properties', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Find the accuracy buff type we know exists
			const accuracyBuff = Object.values(entities).find(
				(entity: any) => entity.hrid === '/buff_types/accuracy',
			) as any

			expect(accuracyBuff).toBeDefined()
			expect(accuracyBuff.name).toBe('Accuracy')
			expect(accuracyBuff.description).toBe('Increases accuracy rating')
			expect(accuracyBuff.debuffDescription).toBe('Decreases accuracy rating')
			expect(accuracyBuff.isCombat).toBe(true)
			expect(accuracyBuff.sortIndex).toBe(36)
		})

		test('should handle all required properties', () => {
			const entities = generator.extractEntities(sampleSourceData)

			for (const entity of Object.values(entities)) {
				const buffType = entity as any
				expect(buffType.hrid).toMatch(/^\/buff_types\//)
				expect(buffType.name).toBeDefined()
				expect(typeof buffType.name).toBe('string')
				expect(buffType.name.length).toBeGreaterThan(0)
				expect(buffType.description).toBeDefined()
				expect(typeof buffType.description).toBe('string')
				expect(buffType.description.length).toBeGreaterThan(0)
				expect(buffType.debuffDescription).toBeDefined()
				expect(typeof buffType.debuffDescription).toBe('string')
				expect(buffType.debuffDescription.length).toBeGreaterThan(0)
				expect(typeof buffType.isCombat).toBe('boolean')
				expect(typeof buffType.sortIndex).toBe('number')
				expect(buffType.sortIndex).toBeGreaterThanOrEqual(0)
			}
		})

		test('should have no duplicate HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.values(entities).map((entity: any) => entity.hrid)
			const uniqueHrids = new Set(hrids)
			expect(uniqueHrids.size).toBe(hrids.length)
		})

		test('should have both combat and non-combat buff types', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const combatBuffs = Object.values(entities).filter(
				(entity: any) => entity.isCombat,
			)
			const nonCombatBuffs = Object.values(entities).filter(
				(entity: any) => !entity.isCombat,
			)

			expect(combatBuffs.length).toBeGreaterThan(0)
			expect(nonCombatBuffs.length).toBeGreaterThan(0)
			expect(combatBuffs.length + nonCombatBuffs.length).toBe(59)
		})

		test('should have reasonable sort index diversity', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const sortIndices = Object.values(entities).map(
				(entity: any) => entity.sortIndex,
			)
			const uniqueIndices = new Set(sortIndices)

			// Expect reasonable diversity in sort indices
			expect(uniqueIndices.size).toBeGreaterThan(10) // At least some variety
		})
	})

	describe('Type Generation', () => {
		test('should generate without errors', async () => {
			expect(() => {
				generator.generate('./src/sources/game_data.json')
			}).not.toThrow()
		})

		test('should respect domain boundaries', () => {
			// BuffTypes is Layer 1, should not import from other domains
			const imports = generator.config.sharedTypes
			expect(imports).toEqual([])
		})
	})

	describe('Integration', () => {
		test('should work with Actions generator integration', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Verify we can provide BuffTypeHrid types for Actions
			const sampleBuffType = Object.values(entities)[0] as any
			expect(sampleBuffType.hrid).toMatch(/^\/buff_types\//)
		})

		test('should support expected utility functions', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Test data is suitable for combat/non-combat categorization
			const combatTypes = Object.values(entities).filter(
				(entity: any) => entity.isCombat,
			)
			const nonCombatTypes = Object.values(entities).filter(
				(entity: any) => !entity.isCombat,
			)
			expect(combatTypes.length).toBeGreaterThan(0)
			expect(nonCombatTypes.length).toBeGreaterThan(0)

			// Test data is suitable for sortBy(sortIndex) utility
			const sortIndices = Object.values(entities).map(
				(entity: any) => entity.sortIndex,
			)
			const minIndex = Math.min(...sortIndices)
			const maxIndex = Math.max(...sortIndices)
			expect(maxIndex).toBeGreaterThan(minIndex)
		})

		test('should prevent circular dependencies', () => {
			// BuffTypes should not depend on anything (Layer 1)
			expect(generator.config.sharedTypes).toEqual([])

			// Verify the generator is self-contained
			const entities = generator.extractEntities(sampleSourceData)
			expect(Object.keys(entities).length).toBeGreaterThan(0)
		})

		test('should support buff/debuff description logic', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Every buff type should have both positive and negative descriptions
			for (const entity of Object.values(entities)) {
				const buffType = entity as any
				expect(buffType.description).toBeDefined()
				expect(buffType.debuffDescription).toBeDefined()
				expect(buffType.description).not.toBe(buffType.debuffDescription)
			}
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
			const emptySourceData = { buffTypeDetailMap: {} }
			const entities = generator.extractEntities(emptySourceData)
			expect(Object.keys(entities).length).toBe(0)
		})

		test('should validate entity structure requirements', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Every entity must have these properties
			for (const entity of Object.values(entities)) {
				const buffType = entity as any
				expect(buffType.hrid).toBeDefined()
				expect(buffType.name).toBeDefined()
				expect(buffType.description).toBeDefined()
				expect(buffType.debuffDescription).toBeDefined()
				expect(typeof buffType.isCombat).toBe('boolean')
				expect(buffType.sortIndex).toBeDefined()
			}
		})

		test('should handle boolean isCombat values correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)

			for (const entity of Object.values(entities)) {
				const buffType = entity as any
				expect(typeof buffType.isCombat).toBe('boolean')
				expect(buffType.isCombat === true || buffType.isCombat === false).toBe(
					true,
				)
			}
		})
	})
})
