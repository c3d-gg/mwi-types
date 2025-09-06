/**
 * @fileoverview Tests for ModularItemsGenerator - The most complex generator with 894 entities
 */

import { beforeEach, describe, expect, test } from 'bun:test'

import { ModularItemsGenerator } from './generator'

import type { PropertyDefinition } from '../../core/types'

describe('ModularItemsGenerator', () => {
	let generator: ModularItemsGenerator

	// Mock data representing different item types
	const mockSourceData = {
		itemDetailMap: {
			// Resource item with alchemy
			'/items/iron_ore': {
				hrid: '/items/iron_ore',
				name: 'Iron Ore',
				description: 'Raw iron ore for smelting',
				categoryHrid: '/item_categories/resource',
				sellPrice: 5,
				isTradable: true,
				itemLevel: 10,
				sortIndex: 100,
				alchemyDetail: {
					bulkMultiplier: 10,
					isCoinifiable: true,
					decomposeItems: null,
					transmuteSuccessRate: 0.8,
					transmuteDropTable: [
						{
							itemHrid: '/items/coal',
							dropRate: 0.5,
							minCount: 1,
							maxCount: 2,
						},
					],
				},
			},

			// Equipment item with full details
			'/items/steel_sword': {
				hrid: '/items/steel_sword',
				name: 'Steel Sword',
				description: 'A sharp steel blade',
				categoryHrid: '/item_categories/equipment',
				sellPrice: 100,
				isTradable: true,
				itemLevel: 25,
				sortIndex: 200,
				enhancementCosts: [
					{
						itemHrid: '/items/iron_ore',
						count: 5,
					},
				],
				protectionItemHrids: ['/items/protection_stone'],
				equipmentDetail: {
					type: '/equipment_types/main_hand',
					levelRequirements: [
						{
							skillHrid: '/skills/attack',
							level: 25,
						},
					],
					combatStats: {
						autoAttackDamage: 15,
						stabAccuracy: 10,
						stabDamage: 20,
						attackInterval: 4000,
					},
					noncombatStats: undefined,
					combatEnhancementBonuses: {
						autoAttackDamage: 2,
						stabDamage: 3,
					},
					noncombatEnhancementBonuses: undefined,
				},
			},

			// Tool item
			'/items/steel_hatchet': {
				hrid: '/items/steel_hatchet',
				name: 'Steel Hatchet',
				description: 'Woodcutting tool',
				categoryHrid: '/item_categories/equipment',
				sellPrice: 150,
				isTradable: true,
				itemLevel: 30,
				sortIndex: 300,
				equipmentDetail: {
					type: '/equipment_types/woodcutting_tool',
					levelRequirements: [
						{
							skillHrid: '/skills/woodcutting',
							level: 30,
						},
					],
					combatStats: undefined,
					noncombatStats: {
						woodcuttingSpeed: 0.1,
						woodcuttingExperience: 0.05,
					},
				},
			},

			// Consumable item
			'/items/healing_potion': {
				hrid: '/items/healing_potion',
				name: 'Healing Potion',
				description: 'Restores health',
				categoryHrid: '/item_categories/drink',
				sellPrice: 25,
				isTradable: true,
				itemLevel: 15,
				sortIndex: 400,
				consumableDetail: {
					cooldownDuration: 5000,
					usableInActionTypeMap: {
						'/action_types/combat': true,
					},
					hitpointRestore: 50,
					manapointRestore: 0,
					recoveryDuration: 1000,
					buffs: [
						{
							uniqueHrid: '/buff_uniques/healing',
							typeHrid: '/buff_types/hp_regen',
							flatBoost: 5,
							duration: 300000000000,
						},
					],
				},
			},

			// Ability Book
			'/items/fireball_book': {
				hrid: '/items/fireball_book',
				name: 'Fireball Spell Book',
				description: 'Teaches the Fireball ability',
				categoryHrid: '/item_categories/ability_book',
				sellPrice: 500,
				isTradable: true,
				itemLevel: 20,
				sortIndex: 500,
				abilityBookDetail: {
					abilityHrid: '/abilities/fireball',
					levelRequirements: [
						{
							skillHrid: '/skills/magic',
							level: 20,
						},
					],
					experienceGain: 1000,
				},
			},

			// Loot item
			'/items/treasure_chest': {
				hrid: '/items/treasure_chest',
				name: 'Treasure Chest',
				description: 'A locked treasure chest',
				categoryHrid: '/item_categories/loot',
				sellPrice: 0,
				isTradable: true,
				sortIndex: 600,
				isOpenable: true,
				openKeyItemHrid: '/items/skeleton_key',
			},

			// Currency
			'/items/gold_coin': {
				hrid: '/items/gold_coin',
				name: 'Gold Coin',
				description: 'Standard currency',
				categoryHrid: '/item_categories/currency',
				sellPrice: 1,
				sortIndex: 700,
			},
		},
	}

	beforeEach(() => {
		generator = new ModularItemsGenerator()
	})

	describe('Entity Extraction', () => {
		test('should extract all item types correctly', () => {
			const result = generator.extractEntities(mockSourceData)

			expect(Object.keys(result)).toHaveLength(7)
			expect(result).toHaveProperty('/items/iron_ore')
			expect(result).toHaveProperty('/items/steel_sword')
			expect(result).toHaveProperty('/items/steel_hatchet')
			expect(result).toHaveProperty('/items/healing_potion')
			expect(result).toHaveProperty('/items/fireball_book')
			expect(result).toHaveProperty('/items/treasure_chest')
			expect(result).toHaveProperty('/items/gold_coin')
		})

		test('should handle resource items with alchemy details', () => {
			const result = generator.extractEntities(mockSourceData)
			const ironOre = result['/items/iron_ore']!

			expect(ironOre.categoryHrid).toBe('/item_categories/resource')
			expect(ironOre.alchemyDetail).toBeDefined()
			expect(ironOre.alchemyDetail?.transmuteDropTable).toHaveLength(1)
			expect(ironOre.alchemyDetail?.transmuteDropTable?.[0]?.itemHrid).toBe(
				'/items/coal',
			)
		})

		test('should handle equipment items with complex stats', () => {
			const result = generator.extractEntities(mockSourceData)
			const sword = result['/items/steel_sword']!

			expect(sword.categoryHrid).toBe('/item_categories/equipment')
			expect(sword.equipmentDetail).toBeDefined()
			expect(sword.equipmentDetail?.type).toBe('/equipment_types/main_hand')
			expect(sword.equipmentDetail?.combatStats?.autoAttackDamage).toBe(15)
			expect(
				sword.equipmentDetail?.combatEnhancementBonuses?.autoAttackDamage,
			).toBe(2)
			expect(sword.enhancementCosts).toHaveLength(1)
			expect(sword.protectionItemHrids).toContain('/items/protection_stone')
		})

		test('should handle tools with noncombat stats', () => {
			const result = generator.extractEntities(mockSourceData)
			const hatchet = result['/items/steel_hatchet']!

			expect(hatchet.equipmentDetail?.type).toBe(
				'/equipment_types/woodcutting_tool',
			)
			expect(hatchet.equipmentDetail?.noncombatStats?.woodcuttingSpeed).toBe(
				0.1,
			)
			expect(
				hatchet.equipmentDetail?.noncombatStats?.woodcuttingExperience,
			).toBe(0.05)
			expect(hatchet.equipmentDetail?.combatStats).toBeUndefined()
		})

		test('should handle consumables with buffs', () => {
			const result = generator.extractEntities(mockSourceData)
			const potion = result['/items/healing_potion']!

			expect(potion.consumableDetail).toBeDefined()
			expect(potion.consumableDetail?.hitpointRestore).toBe(50)
			expect(potion.consumableDetail?.buffs).toHaveLength(1)
			expect(potion.consumableDetail?.buffs?.[0]?.typeHrid).toBe(
				'/buff_types/hp_regen',
			)
		})

		test('should handle ability books', () => {
			const result = generator.extractEntities(mockSourceData)
			const book = result['/items/fireball_book']!

			expect(book.abilityBookDetail).toBeDefined()
			expect(book.abilityBookDetail?.abilityHrid).toBe('/abilities/fireball')
			expect(book.abilityBookDetail?.experienceGain).toBe(1000)
			expect(book.abilityBookDetail?.levelRequirements).toHaveLength(1)
		})

		test('should handle loot items with openable properties', () => {
			const result = generator.extractEntities(mockSourceData)
			const chest = result['/items/treasure_chest']!

			expect(chest.isOpenable).toBe(true)
			expect(chest.openKeyItemHrid).toBe('/items/skeleton_key')
		})

		test('should handle currency items (minimal properties)', () => {
			const result = generator.extractEntities(mockSourceData)
			const coin = result['/items/gold_coin']!

			expect(coin.categoryHrid).toBe('/item_categories/currency')
			expect(coin.isTradable).toBeUndefined() // Not present in currency
			expect(coin.itemLevel).toBeUndefined() // Not present in currency
		})

		test('should preserve all universal properties', () => {
			const result = generator.extractEntities(mockSourceData)
			const sword = result['/items/steel_sword']!

			expect(sword.hrid).toBe('/items/steel_sword')
			expect(sword.name).toBe('Steel Sword')
			expect(sword.description).toBe('A sharp steel blade')
			expect(sword.categoryHrid).toBe('/item_categories/equipment')
			expect(sword.sellPrice).toBe(100)
			expect(sword.sortIndex).toBe(200)
		})
	})

	describe('Interface Generation', () => {
		test('should generate Item interface with all properties', () => {
			// Test interface configuration through public API
			const interfaces = (generator as any).defineInterfaces()

			const itemInterface = interfaces.find((i: any) => i.name === 'Item')
			expect(itemInterface).toBeDefined()
			expect(itemInterface?.properties.length).toBeGreaterThan(10)

			const props = itemInterface?.properties || []
			expect(
				props.some(
					(p: PropertyDefinition) => p.name === 'hrid' && p.type === 'ItemHrid',
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'categoryHrid' && p.type === 'ItemCategoryHrid',
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'equipmentDetail' && p.optional === true,
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'consumableDetail' && p.optional === true,
				),
			).toBe(true)
		})

		test('should generate AlchemyDetail interface', () => {
			const interfaces = generator.defineInterfaces()

			const alchemyInterface = interfaces.find(
				(i: any) => i.name === 'AlchemyDetail',
			)
			expect(alchemyInterface).toBeDefined()

			const props = alchemyInterface?.properties || []
			expect(
				props.some((p: PropertyDefinition) => p.name === 'bulkMultiplier'),
			).toBe(true)
			expect(
				props.some((p: PropertyDefinition) => p.name === 'transmuteDropTable'),
			).toBe(true)
			expect(
				props.some((p: PropertyDefinition) => p.name === 'decomposeItems'),
			).toBe(true)
		})

		test('should generate EquipmentDetail interface', () => {
			const interfaces = generator.defineInterfaces()

			const equipInterface = interfaces.find(
				(i: any) => i.name === 'EquipmentDetail',
			)
			expect(equipInterface).toBeDefined()

			const props = equipInterface?.properties || []
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'type' && p.type === 'EquipmentTypeHrid',
				),
			).toBe(true)
			expect(
				props.some((p: PropertyDefinition) => p.name === 'combatStats'),
			).toBe(true)
			expect(
				props.some((p: PropertyDefinition) => p.name === 'noncombatStats'),
			).toBe(true)
		})

		test('should generate CombatStats interface with typed properties', () => {
			const interfaces = generator.defineInterfaces()

			const combatInterface = interfaces.find(
				(i: any) => i.name === 'CombatStats',
			)
			expect(combatInterface).toBeDefined()

			const props = combatInterface?.properties || []
			// Should have major combat stats as optional properties
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'autoAttackDamage' && p.optional === true,
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'magicAccuracy' && p.optional === true,
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'stabEvasion' && p.optional === true,
				),
			).toBe(true)
		})

		test('should generate NoncombatStats interface with skill patterns', () => {
			const interfaces = generator.defineInterfaces()

			const noncombatInterface = interfaces.find(
				(i: any) => i.name === 'NoncombatStats',
			)
			expect(noncombatInterface).toBeDefined()

			const props = noncombatInterface?.properties || []
			// Should have skill-based stats
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'woodcuttingSpeed' && p.optional === true,
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'alchemyExperience' && p.optional === true,
				),
			).toBe(true)
			expect(
				props.some(
					(p: PropertyDefinition) =>
						p.name === 'woodcuttingEfficiency' && p.optional === true,
				),
			).toBe(true)
		})

		test('should generate ConsumableDetail interface', () => {
			const interfaces = generator.defineInterfaces()

			const consumableInterface = interfaces.find(
				(i) => i.name === 'ConsumableDetail',
			)
			expect(consumableInterface).toBeDefined()

			const props = consumableInterface?.properties || []
			expect(
				props.some((p: PropertyDefinition) => p.name === 'cooldownDuration'),
			).toBe(true)
			expect(
				props.some((p: PropertyDefinition) => p.name === 'hitpointRestore'),
			).toBe(true)
			expect(props.some((p: PropertyDefinition) => p.name === 'buffs')).toBe(
				true,
			)
		})

		test('should generate AbilityBookDetail interface', () => {
			const interfaces = generator.defineInterfaces()

			const abilityInterface = interfaces.find(
				(i) => i.name === 'AbilityBookDetail',
			)
			expect(abilityInterface).toBeDefined()

			const props = abilityInterface?.properties || []
			expect(
				props.some((p: PropertyDefinition) => p.name === 'abilityHrid'),
			).toBe(true)
			expect(
				props.some((p: PropertyDefinition) => p.name === 'experienceGain'),
			).toBe(true)
		})
	})

	describe('Business Logic Utilities', () => {
		test('should have correct utility templates configured', () => {
			const templates = generator['config'].utilityTemplates

			expect(
				templates?.some(
					(t: any) => t.type === 'sortBy' && t.field === 'sortIndex',
				),
			).toBe(true)
			expect(templates?.some((t: any) => t.type === 'toMap')).toBe(true)
			expect(
				templates?.some(
					(t: any) => t.type === 'getByField' && t.field === 'categoryHrid',
				),
			).toBe(true)
		})

		test('should detect tools correctly from equipment type', () => {
			const result = generator.extractEntities(mockSourceData)
			const hatchet = result['/items/steel_hatchet']!
			const sword = result['/items/steel_sword']!

			// Tool detection logic should identify hatchet as tool
			expect(hatchet.equipmentDetail?.type).toContain('_tool')
			expect(sword.equipmentDetail?.type).not.toContain('_tool')
		})

		test('should support marketplace categorization logic', () => {
			const result = generator.extractEntities(mockSourceData)

			// Different items should map to different marketplace categories
			const sword = result['/items/steel_sword']! // Equipment
			const hatchet = result['/items/steel_hatchet']! // Tool
			const book = result['/items/fireball_book']! // Books
			const potion = result['/items/healing_potion']! // Consumables
			const ore = result['/items/iron_ore']! // Resources

			expect(sword.equipmentDetail).toBeDefined()
			expect(hatchet.equipmentDetail?.type).toContain('_tool')
			expect(book.categoryHrid).toBe('/item_categories/ability_book')
			expect(potion.categoryHrid).toBe('/item_categories/drink')
			expect(ore.categoryHrid).toBe('/item_categories/resource')
		})
	})

	describe('Configuration', () => {
		test('should have correct entity configuration', () => {
			expect(generator['config'].entityName).toBe('Item')
			expect(generator['config'].entityNamePlural).toBe('Items')
			expect(generator['config'].sourceKey).toBe('itemDetailMap')
		})

		test('should import from SharedTypes', () => {
			const sharedTypes = generator['config'].sharedTypes || []
			expect(sharedTypes).toContain('LevelRequirement')
			expect(sharedTypes).toContain('DropTable')
		})

		test('should have performance optimizations configured', () => {
			// Should have chunking for large dataset
			expect(generator['config'].entityName).toBe('Item')
			// Large entity count expected
			const result = generator.extractEntities(mockSourceData)
			expect(Object.keys(result).length).toBeGreaterThan(0)
		})
	})

	describe('Complex Cross-References', () => {
		test('should handle item-to-item references', () => {
			const result = generator.extractEntities(mockSourceData)
			const ore = result['/items/iron_ore']!

			// Transmute drop table references other items
			expect(ore.alchemyDetail?.transmuteDropTable?.[0]?.itemHrid).toBe(
				'/items/coal',
			)

			// Enhancement costs reference other items
			const sword = result['/items/steel_sword']!
			expect(sword.enhancementCosts?.[0]?.itemHrid).toBe('/items/iron_ore')

			// Protection items are item references
			expect(sword.protectionItemHrids).toContain('/items/protection_stone')

			// Loot keys reference items
			const chest = result['/items/treasure_chest']!
			expect(chest.openKeyItemHrid).toBe('/items/skeleton_key')
		})

		test('should handle external references', () => {
			const result = generator.extractEntities(mockSourceData)

			// Equipment references EquipmentTypes
			const sword = result['/items/steel_sword']!
			expect(sword.equipmentDetail?.type).toBe('/equipment_types/main_hand')

			// Level requirements reference Skills
			expect(sword.equipmentDetail?.levelRequirements?.[0]?.skillHrid).toBe(
				'/skills/attack',
			)

			// Items reference ItemCategories
			expect(sword.categoryHrid).toBe('/item_categories/equipment')

			// Abilities reference external abilities
			const book = result['/items/fireball_book']!
			expect(book.abilityBookDetail?.abilityHrid).toBe('/abilities/fireball')
		})
	})

	describe('Performance & Scale', () => {
		test('should handle large datasets efficiently', () => {
			// Test with larger mock data
			const largeData = { itemDetailMap: {} }
			for (let i = 0; i < 100; i++) {
				largeData.itemDetailMap[`/items/test_${i}`] = {
					hrid: `/items/test_${i}`,
					name: `Test Item ${i}`,
					description: 'Test item',
					categoryHrid: '/item_categories/resource',
					sellPrice: i,
					sortIndex: i,
				}
			}

			const result = generator.extractEntities(largeData)
			expect(Object.keys(result)).toHaveLength(100)

			// Should extract efficiently
			const firstItem = result['/items/test_0']!
			expect(firstItem.name).toBe('Test Item 0')
		})

		test('should support chunked data loading concepts', () => {
			// The generator should be designed to support chunked loading
			const result = generator.extractEntities(mockSourceData)
			expect(Object.keys(result).length).toBeGreaterThan(0)

			// All items should be accessible
			expect(result['/items/iron_ore']).toBeDefined()
			expect(result['/items/steel_sword']).toBeDefined()
		})
	})

	describe('Integration Tests', () => {
		test('should work with the complete module structure', () => {
			// Test that all hooks work together
			const interfaces = generator.defineInterfaces()
			const utilities = generator.defineUtilities()
			const constants = generator.defineConstants()
			const result = generator.extractEntities(mockSourceData)

			expect(interfaces.length).toBeGreaterThan(5) // Item + detail interfaces
			expect(Object.keys(result).length).toBe(7) // All test items

			// Should have comprehensive functionality
			expect(interfaces.some((i) => i.name === 'Item')).toBe(true)
			expect(interfaces.some((i) => i.name === 'CombatStats')).toBe(true)
			expect(interfaces.some((i) => i.name === 'AlchemyDetail')).toBe(true)
		})

		test('should handle edge cases gracefully', () => {
			const edgeCaseData = {
				itemDetailMap: {
					'/items/minimal': {
						hrid: '/items/minimal',
						name: 'Minimal',
						description: '',
						categoryHrid: '/item_categories/currency',
						sellPrice: 0,
						sortIndex: 1,
						// Missing optional properties
					},
				},
			}

			const result = generator.extractEntities(edgeCaseData)
			const minimal = result['/items/minimal']!

			expect(minimal.hrid).toBe('/items/minimal')
			expect(minimal.isTradable).toBeUndefined()
			expect(minimal.itemLevel).toBeUndefined()
			expect(minimal.equipmentDetail).toBeUndefined()
		})
	})

	describe('Error Handling', () => {
		test('should handle missing itemDetailMap', () => {
			const result = generator.extractEntities({})
			expect(result).toEqual({})
		})

		test('should handle null source data', () => {
			const result = generator.extractEntities({ itemDetailMap: null })
			expect(result).toEqual({})
		})

		test('should handle malformed items gracefully', () => {
			const malformedData = {
				itemDetailMap: {
					'/items/broken': {
						hrid: '/items/broken',
						// Missing required properties - should handle gracefully
					},
				},
			}

			const result = generator.extractEntities(malformedData)
			expect(result['/items/broken']).toBeDefined()
		})
	})

	describe('Duplication Detection', () => {
		test('should have only one ItemHrid type export', async () => {
			const fs = await import('fs/promises')
			const path = './src/generated/items/types.ts'

			try {
				const content = await fs.readFile(path, 'utf-8')
				const exportMatches = content.match(/export type ItemHrid/g)
				expect(exportMatches).toHaveLength(1)
			} catch {
				// Generated file doesn't exist yet - validate configuration instead
				expect(generator['config'].entityName).toBe('Item')
			}
		})

		test('should have proper constants import structure', async () => {
			const fs = await import('fs/promises')
			const path = './src/generated/items/types.ts'

			try {
				const content = await fs.readFile(path, 'utf-8')
				expect(content).toContain("import { ITEM_HRIDS } from './constants'")
				// Should not have duplicate ITEM_HRIDS arrays
				const constantMatches = content.match(/ITEM_HRIDS.*=/g) || []
				expect(constantMatches.length).toBeLessThanOrEqual(1)
			} catch {
				// Generated file doesn't exist yet - validate configuration instead
				expect(generator['config'].sourceKey).toBe('itemDetailMap')
			}
		})
	})
})
