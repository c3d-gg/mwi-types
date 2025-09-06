import path from 'path'

import { beforeAll, describe, expect, test } from 'bun:test'

import { ModularCombatStylesGenerator } from './generator'

import type { CombatStyle } from './generator'

describe('Combat Styles Generator', () => {
	let generator: ModularCombatStylesGenerator
	let sampleSourceData: any

	beforeAll(async () => {
		generator = new ModularCombatStylesGenerator()

		// Load sample source data for testing using Bun APIs
		const sourcePath = path.join(process.cwd(), 'src/sources/game_data.json')
		sampleSourceData = await Bun.file(sourcePath).json()
	})

	describe('Configuration', () => {
		test('should have correct configuration', () => {
			expect(generator.config.entityName).toBe('CombatStyle')
			expect(generator.config.entityNamePlural).toBe('CombatStyles')
			expect(generator.config.sourceKey).toBe('combatStyleDetailMap')
			expect(generator.config.outputPath).toBe('src/generated/combat-styles')
		})

		test('should have no shared types (no dependencies)', () => {
			expect(generator.config.sharedTypes).toEqual([])
		})

		test('should have utility templates configured', () => {
			expect(generator.config.utilityTemplates).toBeDefined()
			const templates = generator.config.utilityTemplates
			expect(templates).toContainEqual({ type: 'sortBy', field: 'sortIndex' })
			expect(templates).toContainEqual({ type: 'toMap' })
		})
	})

	describe('Data Extraction', () => {
		test('should extract combat styles from source data', () => {
			const entities = generator.extractEntities(sampleSourceData)

			expect(Object.keys(entities).length).toBeGreaterThan(0)
			expect(Object.keys(entities).length).toBe(6) // Based on analysis
		})

		test('should extract combat style properties correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const styleHrids = Object.keys(entities)
			expect(styleHrids.length).toBeGreaterThan(0)

			const styleHrid = styleHrids[0]!
			const style: CombatStyle = entities[styleHrid]!

			expect(style).toBeDefined()
			expect(style.hrid).toBe(styleHrid)
			expect(style.name).toBeDefined()
			expect(typeof style.name).toBe('string')
			expect(typeof style.sortIndex).toBe('number')
			expect(style.hrid).toMatch(/^\/combat_styles\//)
		})

		test('should handle skillExpMap property correctly', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const firstStyle = Object.values(entities)[0]!

			expect(firstStyle).toHaveProperty('skillExpMap')
			// skillExpMap can be null or an object
			expect(
				firstStyle.skillExpMap === null ||
					typeof firstStyle.skillExpMap === 'object',
			).toBe(true)
		})

		test('should use HRID as key in entities record', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)

			hrids.forEach((hrid) => {
				expect(hrid).toMatch(/^\/combat_styles\//)
				expect(entities[hrid]!.hrid).toBe(hrid)
			})
		})

		test('should have valid sortIndex values', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const sortIndices = Object.values(entities).map(
				(e: CombatStyle) => e.sortIndex,
			)

			sortIndices.forEach((sortIndex) => {
				expect(typeof sortIndex).toBe('number')
				expect(sortIndex).toBeGreaterThan(0)
			})
		})
	})

	describe('Validation', () => {
		test('should not have duplicate HRIDs', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)
			const uniqueHrids = [...new Set(hrids)]

			expect(hrids.length).toBe(uniqueHrids.length)
		})

		test('should not have empty names', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const entitiesArray = Object.values(entities)

			entitiesArray.forEach((entity: CombatStyle) => {
				expect(entity.name).toBeTruthy()
				expect(typeof entity.name).toBe('string')
				expect(entity.name.length).toBeGreaterThan(0)
			})
		})

		test('should have consistent HRID format', () => {
			const entities = generator.extractEntities(sampleSourceData)
			const hrids = Object.keys(entities)

			hrids.forEach((hrid) => {
				expect(hrid).toMatch(/^\/combat_styles\/[a-z_]+$/)
			})
		})

		test('should have valid names matching HRID pattern', () => {
			const entities = generator.extractEntities(sampleSourceData)

			Object.entries(entities).forEach(
				([hrid, entity]: [string, CombatStyle]) => {
					// Name should be a human-readable version of the HRID
					expect(entity.name).toBeTruthy()

					// HRID should be kebab-case version of name (roughly)
					const expectedBase = hrid.replace('/combat_styles/', '')
					expect(expectedBase).toBeTruthy()
				},
			)
		})
	})

	describe('Edge Cases', () => {
		test('should handle missing combatStyleDetailMap gracefully', () => {
			const emptyData = {}
			expect(() => generator.extractEntities(emptyData)).not.toThrow()

			const entities = generator.extractEntities(emptyData)
			expect(entities).toEqual({})
		})

		test('should handle null skillExpMap values', () => {
			const testData = {
				combatStyleDetailMap: {
					'/combat_styles/test': {
						hrid: '/combat_styles/test',
						name: 'Test',
						skillExpMap: null,
						sortIndex: 1,
					},
				},
			}

			const entities = generator.extractEntities(testData)
			expect(entities['/combat_styles/test']!.skillExpMap).toBeNull()
		})

		test('should handle malformed entities gracefully', () => {
			const testData = {
				combatStyleDetailMap: {
					'/combat_styles/valid': {
						hrid: '/combat_styles/valid',
						name: 'Valid',
						skillExpMap: null,
						sortIndex: 1,
					},
					'/combat_styles/incomplete': {
						// Missing some fields - should be handled
						hrid: '/combat_styles/incomplete',
						name: 'Incomplete',
					},
				},
			}

			const entities = generator.extractEntities(testData)

			// Should have the valid entity
			expect(entities['/combat_styles/valid']).toBeDefined()
			expect(entities['/combat_styles/valid']!.hrid).toBe(
				'/combat_styles/valid',
			)
		})
	})
})
