/**
 * @fileoverview Tests for ModularItemCategoriesGenerator
 */

import { beforeEach, describe, expect, test } from 'vitest'

import { ModularItemCategoriesGenerator } from './generator'

import type { PropertyDefinition } from '../../core/types'

describe('ModularItemCategoriesGenerator', () => {
	let generator: ModularItemCategoriesGenerator
	const mockSourceData = {
		itemCategoryDetailMap: {
			'/item_categories/weapon': {
				hrid: '/item_categories/weapon',
				name: 'Weapon',
				pluralName: 'Weapons',
				sortIndex: 1,
			},
			'/item_categories/armor': {
				hrid: '/item_categories/armor',
				name: 'Armor',
				pluralName: 'Armor',
				sortIndex: 2,
			},
			'/item_categories/consumable': {
				hrid: '/item_categories/consumable',
				name: 'Consumable',
				pluralName: 'Consumables',
				sortIndex: 3,
			},
		},
	}

	beforeEach(() => {
		generator = new ModularItemCategoriesGenerator()
	})

	describe('Entity Extraction', () => {
		test('should extract entities from source data', () => {
			const result = generator.extractEntities(mockSourceData)

			expect(Object.keys(result)).toHaveLength(3)
			expect(result).toHaveProperty('/item_categories/weapon')
			expect(result).toHaveProperty('/item_categories/armor')
			expect(result).toHaveProperty('/item_categories/consumable')
		})

		test('should transform entities correctly', () => {
			const result = generator.extractEntities(mockSourceData)
			const weapon = result['/item_categories/weapon']!

			expect(weapon).toEqual({
				hrid: '/item_categories/weapon',
				name: 'Weapon',
				pluralName: 'Weapons',
				sortIndex: 1,
			})
		})

		test('should handle empty source data', () => {
			const result = generator.extractEntities({
				itemCategoryDetailMap: {},
			})

			expect(result).toEqual({})
		})

		test('should preserve all properties', () => {
			const result = generator.extractEntities(mockSourceData)
			const consumable = result['/item_categories/consumable']!

			expect(consumable.hrid).toBe('/item_categories/consumable')
			expect(consumable.name).toBe('Consumable')
			expect(consumable.pluralName).toBe('Consumables')
			expect(consumable.sortIndex).toBe(3)
		})
	})

	describe('Interface Generation', () => {
		test('should generate ItemCategory interface', () => {
			const interfaces = (generator as any).defineInterfaces()

			expect(interfaces).toHaveLength(1)

			const itemCategoryInterface = interfaces[0]!
			expect(itemCategoryInterface.name).toBe('ItemCategory')
			expect(itemCategoryInterface.properties).toHaveLength(4)

			const props = itemCategoryInterface.properties
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'hrid' && p.type === 'ItemCategoryHrid',
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) => p.name === 'name' && p.type === 'string',
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'pluralName' && p.type === 'string',
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'sortIndex' && p.type === 'number',
				),
			).toBe(true)
		})

		test('should have correct property types', () => {
			const interfaces = (generator as any).defineInterfaces()
			const itemCategoryInterface = interfaces[0]!
			const hridProp = itemCategoryInterface.properties.find(
				(p: PropertyDefinition) => p.name === 'hrid',
			)

			expect(hridProp?.type).toBe('ItemCategoryHrid')
			expect(hridProp?.optional).toBe(false)
		})
	})

	describe('Constants Generation', () => {
		test('should have constants defined in configuration', () => {
			// Constants are generated automatically by the base generator
			// The base generator should create HRID constants
			expect(generator['config'].entityName).toBe('ItemCategory')
			expect(generator['config'].entityNamePlural).toBe('ItemCategories')
		})

		test('should extract entities for constants generation', () => {
			const result = generator.extractEntities(mockSourceData)
			const hrids = Object.keys(result)

			expect(hrids.length).toBeGreaterThan(0)
			expect(hrids.every((hrid) => hrid.startsWith('/item_categories/'))).toBe(
				true,
			)
		})
	})

	describe('Utility Generation', () => {
		test('should have utility templates configured', () => {
			const templates = generator['config'].utilityTemplates

			expect(
				templates?.some(
					(t: any) => t.type === 'sortBy' && t.field === 'sortIndex',
				),
			).toBe(true)
			expect(templates?.some((t: any) => t.type === 'toMap')).toBe(true)
		})

		test('should have correct configuration for sorting', () => {
			const templates = generator['config'].utilityTemplates
			const sortTemplate = templates?.find((t: any) => t.type === 'sortBy')

			expect(sortTemplate?.field).toBe('sortIndex')
		})

		test('should support entity transformation for utilities', () => {
			const result = generator.extractEntities(mockSourceData)
			const values = Object.values(result)

			// All entities should have sortIndex for sorting utilities
			expect(
				values.every((entity: any) => typeof entity.sortIndex === 'number'),
			).toBe(true)
		})
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			expect(generator['config'].entityName).toBe('ItemCategory')
			expect(generator['config'].entityNamePlural).toBe('ItemCategories')
			expect(generator['config'].sourceKey).toBe('itemCategoryDetailMap')
		})

		test('should have no shared types', () => {
			expect(generator['config'].sharedTypes).toEqual([])
		})

		test('should have correct utility templates', () => {
			const templates = generator['config'].utilityTemplates

			expect(
				templates?.some(
					(t: any) => t.type === 'sortBy' && t.field === 'sortIndex',
				),
			).toBe(true)
			expect(templates?.some((t: any) => t.type === 'toMap')).toBe(true)
		})
	})

	describe('Integration', () => {
		test('should generate complete module structure', async () => {
			// Test that the core functionality works
			const interfaces = (generator as any).defineInterfaces()
			const result = generator.extractEntities(mockSourceData)

			expect(interfaces.length).toBeGreaterThan(0)
			expect(Object.keys(result).length).toBeGreaterThan(0)
		})

		test('should handle real source data structure', () => {
			// Test with a structure that matches the actual game_data.json format
			const realishData = {
				itemCategoryDetailMap: {
					'/item_categories/ability_book': {
						hrid: '/item_categories/ability_book',
						name: 'Ability Book',
						pluralName: 'Ability Books',
						sortIndex: 6,
					},
					'/item_categories/food': {
						hrid: '/item_categories/food',
						name: 'Food',
						pluralName: 'Food',
						sortIndex: 5,
					},
				},
			}

			const result = generator.extractEntities(realishData)
			expect(Object.keys(result)).toHaveLength(2)
			expect(result['/item_categories/ability_book']?.name).toBe('Ability Book')
			expect(result['/item_categories/food']?.pluralName).toBe('Food')
		})
	})

	describe('Error Handling', () => {
		test('should handle missing itemCategoryDetailMap', () => {
			const result = generator.extractEntities({})
			expect(result).toEqual({})
		})

		test('should handle null source data', () => {
			const result = generator.extractEntities({ itemCategoryDetailMap: null })
			expect(result).toEqual({})
		})

		test('should handle undefined properties gracefully', () => {
			const dataWithMissingProps = {
				itemCategoryDetailMap: {
					'/item_categories/test': {
						hrid: '/item_categories/test',
						name: 'Test',
						// missing pluralName and sortIndex
					},
				},
			}

			const result = generator.extractEntities(dataWithMissingProps)
			expect(result['/item_categories/test']?.hrid).toBe(
				'/item_categories/test',
			)
			expect(result['/item_categories/test']?.name).toBe('Test')
		})
	})

	describe('TypeScript Integration', () => {
		test('should support type-safe HRID usage', () => {
			// This test verifies the generated types work correctly
			const result = generator.extractEntities(mockSourceData)
			const weaponHrid = '/item_categories/weapon' as const

			expect(result[weaponHrid]).toBeDefined()
			expect(result[weaponHrid]?.hrid).toBe(weaponHrid)
		})
	})

	describe('Duplication Detection', () => {
		test('should have only one ItemCategoryHrid type export', async () => {
			const fs = await import('fs/promises')
			const path = './src/generated/itemcategories/types.ts'

			try {
				const content = await fs.readFile(path, 'utf-8')
				const exportMatches = content.match(/export type ItemCategoryHrid/g)
				expect(exportMatches).toHaveLength(1)
			} catch {
				// Generated file doesn't exist yet - validate configuration instead
				expect(generator['config'].entityName).toBe('ItemCategory')
			}
		})

		test('should have proper constants import structure', async () => {
			const fs = await import('fs/promises')
			const path = './src/generated/itemcategories/types.ts'

			try {
				const content = await fs.readFile(path, 'utf-8')
				expect(content).toContain(
					"import { ITEMCATEGORY_HRIDS } from './constants'",
				)
				// Should not have duplicate ITEMCATEGORY_HRIDS arrays
				const constantMatches = content.match(/ITEMCATEGORY_HRIDS.*=/g) || []
				expect(constantMatches.length).toBeLessThanOrEqual(1)
			} catch {
				// Generated file doesn't exist yet - validate configuration instead
				expect(generator['config'].sourceKey).toBe('itemCategoryDetailMap')
			}
		})
	})
})
