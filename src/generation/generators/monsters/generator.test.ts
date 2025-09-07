import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularMonstersGenerator } from './generator'

describe('Monsters Generator', () => {
	let generator: ModularMonstersGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularMonstersGenerator()

		// Load source data using Bun APIs
		const sourceFile = Bun.file('./src/sources/game_data.json')
		sampleSourceData = await sourceFile.json()
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			const config = (generator as any).config
			expect(config.entityName).toBe('Monster')
			expect(config.entityNamePlural).toBe('Monsters')
			expect(config.sourceKey).toBe('combatMonsterDetailMap')
		})

		test('should import required shared types', () => {
			const config = (generator as any).config
			expect(config.sharedTypes).toContain('DropTable')
		})

		test('should have correct utility templates', () => {
			const config = (generator as any).config
			const templateTypes = config.utilityTemplates.map((t: any) => t.type)
			expect(templateTypes).toContain('toMap')
			expect(templateTypes).toContain('getByField')
			expect(templateTypes).toContain('sortBy')
		})
	})

	describe('Data Extraction', () => {
		test('should extract monsters from combatMonsterDetailMap', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Should have 77 monsters
			expect(Object.keys(entities)).toHaveLength(77)
		})

		test('should extract monster with correct structure', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abyssalImp = entities['/monsters/abyssal_imp']

			expect(abyssalImp).toBeDefined()
			if (abyssalImp) {
				expect(abyssalImp.hrid).toBe('/monsters/abyssal_imp')
				expect(abyssalImp.name).toBe('Abyssal Imp')
				expect(abyssalImp.enrageTime).toBe(180000000000)
				expect(abyssalImp.experience).toBe(240)
			}
		})

		test('should extract combat details correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abyssalImp = entities['/monsters/abyssal_imp']

			expect(abyssalImp.combatDetails).toBeDefined()
			expect(abyssalImp.combatDetails.maxHitpoints).toBe(1800)
			expect(abyssalImp.combatDetails.combatLevel).toBe(156)
			expect(abyssalImp.combatDetails.combatStats).toBeDefined()
			expect(abyssalImp.combatDetails.combatStats.combatStyleHrids).toContain(
				'/combat_styles/magic',
			)
			expect(abyssalImp.combatDetails.combatStats.damageType).toBe(
				'/damage_types/fire',
			)
		})

		test('should extract abilities correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abyssalImp = entities['/monsters/abyssal_imp']

			expect(abyssalImp.abilities).toHaveLength(3)
			expect(abyssalImp.abilities[0].abilityHrid).toBe('/abilities/quick_aid')
			expect(abyssalImp.abilities[0].level).toBe(1)
			expect(abyssalImp.abilities[0].minDifficultyTier).toBe(0)
		})

		test('should extract drop tables correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abyssalImp = entities['/monsters/abyssal_imp']

			expect(abyssalImp.dropTable).toHaveLength(7)
			expect(abyssalImp.dropTable[0].itemHrid).toBe('/items/coin')
			expect(abyssalImp.dropTable[0].dropRate).toBe(0.8)
			expect(abyssalImp.dropTable[0].minCount).toBe(500)
			expect(abyssalImp.dropTable[0].maxCount).toBe(2500)

			expect(abyssalImp.rareDropTable).toHaveLength(1)
			expect(abyssalImp.rareDropTable[0].itemHrid).toBe(
				'/items/large_treasure_chest',
			)
		})

		test('should handle all monsters without errors', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Test all monsters have required fields
			Object.values(entities).forEach((monster: any) => {
				expect(monster.hrid).toMatch(/^\/monsters\//)
				expect(monster.name).toBeTruthy()
				expect(typeof monster.enrageTime).toBe('number')
				expect(typeof monster.experience).toBe('number')
				expect(monster.combatDetails).toBeDefined()
				expect(Array.isArray(monster.abilities)).toBe(true)
				expect(Array.isArray(monster.dropTable)).toBe(true)
				expect(Array.isArray(monster.rareDropTable)).toBe(true)
			})
		})

		test('should validate HRID format', () => {
			const entities = generator.extractEntities(sampleSourceData)

			Object.keys(entities).forEach((hrid) => {
				expect(hrid).toMatch(/^\/monsters\/[a-z_]+$/)
			})
		})
	})

	describe('Type Generation', () => {
		test('should generate Monster interface without errors', async () => {
			// This test ensures the generator can create TypeScript interfaces
			expect(() => {
				const interfaces = generator.defineInterfaces()
				expect(Array.isArray(interfaces)).toBe(true)
			}).not.toThrow()
		})

		test('should define custom interfaces for complex nested structures', () => {
			const interfaces = generator.defineInterfaces()
			const interfaceNames = interfaces.map((i) => i.name)

			// Should define nested interfaces
			expect(interfaceNames).toContain('CombatDetails')
			expect(interfaceNames).toContain('CombatStats')
			expect(interfaceNames).toContain('MonsterAbility')
		})
	})

	describe('Utilities Generation', () => {
		test('should generate standard utility functions', () => {
			const utilities = generator.defineUtilities()
			const utilityNames = utilities.map((u) => u.name)

			// Note: getMonstersRecord is created by base generator, not in defineUtilities()
			// The toMap template doesn't create a function in defineUtilities either

			// Custom monster-specific utilities
			expect(utilityNames).toContain('getMonstersByDamageType')
			expect(utilityNames).toContain('getMonstersByCombatLevel')
			expect(utilityNames).toContain('getMonstersWithAbility')
		})

		test('should define custom utilities with correct signatures', () => {
			const utilities = generator.defineUtilities()
			const damageTypeUtility = utilities.find(
				(u) => u.name === 'getMonstersByDamageType',
			)

			expect(damageTypeUtility).toBeDefined()
			expect(damageTypeUtility?.returnType).toBe('Monster[]')
			expect(damageTypeUtility?.parameters).toHaveLength(1)
			expect(damageTypeUtility?.parameters[0].name).toBe('damageType')
		})
	})

	describe('Integration Tests', () => {
		test('should handle dependency imports correctly', () => {
			// Test that the generator can reference types from other modules
			const entities = generator.extractEntities(sampleSourceData)
			const monster = Object.values(entities)[0] as any

			// These should be typed as HRIDs from their respective modules
			expect(monster.combatDetails.combatStats.damageType).toMatch(
				/^\/damage_types\//,
			)
			expect(monster.abilities[0].abilityHrid).toMatch(/^\/abilities\//)
			expect(monster.dropTable[0].itemHrid).toMatch(/^\/items\//)
		})

		test('should not duplicate shared types', () => {
			const interfaces = generator.defineInterfaces()
			const interfaceNames = interfaces.map((i) => i.name)

			// Should NOT redefine DropTable (comes from shared types)
			expect(interfaceNames).not.toContain('DropTable')
		})
	})

	describe('Edge Cases', () => {
		test('should handle monsters with empty abilities array', () => {
			// Find a monster with no abilities (if any exist)
			const entities = generator.extractEntities(sampleSourceData)
			const monstersWithNoAbilities = Object.values(entities).filter(
				(monster: any) => monster.abilities.length === 0,
			)

			if (monstersWithNoAbilities.length > 0) {
				const monster = monstersWithNoAbilities[0] as any
				expect(monster.abilities).toEqual([])
			}
		})

		test('should handle monsters with empty drop tables', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const monstersWithNoDrops = Object.values(entities).filter(
				(monster: any) => monster.dropTable.length === 0,
			)

			if (monstersWithNoDrops.length > 0) {
				const monster = monstersWithNoDrops[0] as any
				expect(monster.dropTable).toEqual([])
			}
		})

		test('should handle optional combat stats fields', () => {
			const entities = generator.extractEntities(sampleSourceData)

			// Test that optional fields are handled correctly
			Object.values(entities).forEach((monster: any) => {
				const combatStats = monster.combatDetails.combatStats
				// Some fields might be optional/undefined - shouldn't throw
				expect(() => {
					JSON.stringify(combatStats)
				}).not.toThrow()
			})
		})
	})

	describe('Performance', () => {
		test('should extract all monsters efficiently', () => {
			const startTime = performance.now()
			generator.extractEntities(sampleSourceData)
			const endTime = performance.now()

			// Should complete in reasonable time (< 100ms for 77 entities)
			expect(endTime - startTime).toBeLessThan(100)
		})
	})
})
