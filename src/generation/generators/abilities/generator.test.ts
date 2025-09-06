import path from 'path'

import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularAbilitiesGenerator } from './generator'

import type { Ability, AbilityEffect, CombatTrigger } from './generator'

describe('Abilities Generator', () => {
	let generator: ModularAbilitiesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularAbilitiesGenerator()

		// Load sample source data for testing using Bun APIs
		const sourcePath = path.join(process.cwd(), 'src/sources/game_data.json')
		sampleSourceData = await Bun.file(sourcePath).json()
	})

	describe('Configuration', () => {
		test('should have correct configuration', () => {
			expect(generator.config.entityName).toBe('Ability')
			expect(generator.config.entityNamePlural).toBe('Abilities')
			expect(generator.config.sourceKey).toBe('abilityDetailMap')
			expect(generator.config.outputPath).toBe('src/generated/abilities')
		})

		test('should have required dependencies configured', () => {
			const sharedTypes = generator.config.sharedTypes
			expect(sharedTypes).toContain('CombatStyleHrid')
			expect(sharedTypes).toContain('DamageTypeHrid')
			expect(sharedTypes).toContain('Buff')
		})

		test('should disable data cleaning for null handling', () => {
			expect(generator.config.applyDataCleaning).toBe(false)
		})

		test('should have utility templates configured', () => {
			const templates = generator.config.utilityTemplates
			expect(templates).toBeDefined()
			expect(templates?.length).toBeGreaterThan(0)
		})

		test('should have category filters for special abilities', () => {
			const filters = generator.config.categoryFilters
			expect(filters).toBeDefined()
			expect(filters?.some((f) => f.name === 'special')).toBe(true)
		})
	})

	describe('Data Extraction', () => {
		test('should extract abilities from source data', () => {
			const entities = generator.extractEntities(sampleSourceData)

			expect(Object.keys(entities).length).toBeGreaterThan(0)
			expect(Object.keys(entities).length).toBe(57) // Based on analysis
		})

		test('should extract ability properties correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilityHrids = Object.keys(entities)
			expect(abilityHrids.length).toBeGreaterThan(0)

			const abilityHrid = abilityHrids[0]!
			const ability: Ability = entities[abilityHrid]!

			expect(ability).toBeDefined()
			expect(ability.hrid).toBe(abilityHrid)
			expect(ability.name).toBeDefined()
			expect(typeof ability.name).toBe('string')
			expect(ability.description).toBeDefined()
			expect(typeof ability.description).toBe('string')
			expect(typeof ability.isSpecialAbility).toBe('boolean')
			expect(typeof ability.manaCost).toBe('number')
			expect(typeof ability.cooldownDuration).toBe('number')
			expect(typeof ability.castDuration).toBe('number')
			expect(typeof ability.sortIndex).toBe('number')
			expect(ability.hrid).toMatch(/^\/abilities\//)
		})

		test('should handle abilityEffects array correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			// Find an ability with effects
			const abilityWithEffects = abilities.find(
				(a) => a.abilityEffects.length > 0,
			)
			expect(abilityWithEffects).toBeDefined()

			const effect = abilityWithEffects!.abilityEffects[0]!
			expect(effect).toBeDefined()
			expect(effect.targetType).toBeDefined()
			expect(effect.effectType).toBeDefined()

			// Check combat style and damage type references
			if (effect.combatStyleHrid) {
				expect(effect.combatStyleHrid).toMatch(/^\/combat_styles\//)
			}
			if (effect.damageType) {
				expect(effect.damageType).toMatch(/^\/damage_types\//)
			}
		})

		test('should handle defaultCombatTriggers array correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			// Find an ability with triggers
			const abilityWithTriggers = abilities.find(
				(a) => a.defaultCombatTriggers.length > 0,
			)
			expect(abilityWithTriggers).toBeDefined()

			const trigger = abilityWithTriggers!.defaultCombatTriggers[0]!
			expect(trigger).toBeDefined()
			expect(trigger.dependencyHrid).toBeDefined()
			expect(trigger.conditionHrid).toBeDefined()
			expect(trigger.comparatorHrid).toBeDefined()
			expect(typeof trigger.value).toBe('number')
		})

		test('should use HRID as key in entities record', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)

			hrids.forEach((hrid) => {
				expect(hrid).toMatch(/^\/abilities\//)
				expect(entities[hrid]!.hrid).toBe(hrid)
			})
		})
	})

	describe('Complex Data Structures', () => {
		test('should properly type ability effects', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			// Find ability with multiple effects
			const complexAbility = abilities.find((a) => a.abilityEffects.length > 0)
			expect(complexAbility).toBeDefined()

			complexAbility!.abilityEffects.forEach((effect: AbilityEffect) => {
				expect(effect.targetType).toBeDefined()
				expect(effect.effectType).toBeDefined()
				expect(typeof effect.baseDamageFlat).toBe('number')
				expect(typeof effect.baseDamageRatio).toBe('number')

				// Optional fields
				if (effect.combatStyleHrid) {
					expect(typeof effect.combatStyleHrid).toBe('string')
				}
				if (effect.damageType) {
					expect(typeof effect.damageType).toBe('string')
				}
			})
		})

		test('should properly type combat triggers', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			const abilityWithTriggers = abilities.find(
				(a) => a.defaultCombatTriggers.length > 0,
			)
			expect(abilityWithTriggers).toBeDefined()

			abilityWithTriggers!.defaultCombatTriggers.forEach(
				(trigger: CombatTrigger) => {
					expect(typeof trigger.dependencyHrid).toBe('string')
					expect(typeof trigger.conditionHrid).toBe('string')
					expect(typeof trigger.comparatorHrid).toBe('string')
					expect(typeof trigger.value).toBe('number')
				},
			)
		})

		test('should handle null buffs in ability effects', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			// Most abilities should have null buffs
			const abilityWithNullBuffs = abilities.find((a) =>
				a.abilityEffects.some((e) => e.buffs === null),
			)
			expect(abilityWithNullBuffs).toBeDefined()

			const effectWithNullBuffs = abilityWithNullBuffs!.abilityEffects.find(
				(e) => e.buffs === null,
			)
			expect(effectWithNullBuffs!.buffs).toBeNull()
		})
	})

	describe('Ability Categories', () => {
		test('should correctly identify special vs regular abilities', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			const specialAbilities = abilities.filter((a) => a.isSpecialAbility)
			const regularAbilities = abilities.filter((a) => !a.isSpecialAbility)

			expect(specialAbilities.length + regularAbilities.length).toBe(
				abilities.length,
			)
			expect(specialAbilities.length).toBeGreaterThanOrEqual(0)
			expect(regularAbilities.length).toBeGreaterThan(0)
		})

		test('should have abilities with different combat styles', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			const combatStyles = new Set<string>()
			abilities.forEach((ability) => {
				ability.abilityEffects.forEach((effect) => {
					if (effect.combatStyleHrid) {
						combatStyles.add(effect.combatStyleHrid)
					}
				})
			})

			expect(combatStyles.size).toBeGreaterThan(1) // Should have multiple combat styles
		})

		test('should have abilities with different damage types', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			const damageTypes = new Set<string>()
			abilities.forEach((ability) => {
				ability.abilityEffects.forEach((effect) => {
					if (effect.damageType) {
						damageTypes.add(effect.damageType)
					}
				})
			})

			expect(damageTypes.size).toBeGreaterThan(1) // Should have multiple damage types
		})
	})

	describe('Validation', () => {
		test('should not have duplicate HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)
			const uniqueHrids = [...new Set(hrids)]

			expect(hrids.length).toBe(uniqueHrids.length)
		})

		test('should not have empty names or descriptions', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			abilities.forEach((ability: Ability) => {
				expect(ability.name).toBeTruthy()
				expect(typeof ability.name).toBe('string')
				expect(ability.name.length).toBeGreaterThan(0)

				expect(ability.description).toBeTruthy()
				expect(typeof ability.description).toBe('string')
				expect(ability.description.length).toBeGreaterThan(0)
			})
		})

		test('should have consistent HRID format', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)

			hrids.forEach((hrid) => {
				expect(hrid).toMatch(/^\/abilities\/[a-z_]+$/)
			})
		})

		test('should have positive durations and costs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			abilities.forEach((ability: Ability) => {
				expect(ability.manaCost).toBeGreaterThanOrEqual(0)
				expect(ability.cooldownDuration).toBeGreaterThanOrEqual(0)
				expect(ability.castDuration).toBeGreaterThanOrEqual(0)
				expect(ability.sortIndex).toBeGreaterThan(0)
			})
		})
	})

	describe('Edge Cases', () => {
		test('should handle missing abilityDetailMap gracefully', () => {
			const emptyData = {}
			expect(() => generator.extractEntities(emptyData)).not.toThrow()

			const entities = generator.extractEntities(emptyData)
			expect(entities).toEqual({})
		})

		test('should handle abilities with no effects', () => {
			const testData = {
				abilityDetailMap: {
					'/abilities/test': {
						hrid: '/abilities/test',
						name: 'Test',
						description: 'Test ability',
						isSpecialAbility: false,
						manaCost: 0,
						cooldownDuration: 0,
						castDuration: 0,
						abilityEffects: [],
						defaultCombatTriggers: [],
						sortIndex: 1,
					},
				},
			}

			const entities = generator.extractEntities(testData)
			expect(entities['/abilities/test']!.abilityEffects).toEqual([])
		})

		test('should handle abilities with no triggers', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const abilities = Object.values(entities)

			// Should handle abilities with empty trigger arrays
			abilities.forEach((ability) => {
				expect(Array.isArray(ability.defaultCombatTriggers)).toBe(true)
			})
		})
	})
})
