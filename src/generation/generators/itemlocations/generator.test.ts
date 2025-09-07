import { describe, expect, test } from 'bun:test'

import { ModularItemLocationsGenerator } from './generator'

describe('ModularItemLocationsGenerator', () => {
	const generator = new ModularItemLocationsGenerator()

	const sampleSourceData = {
		itemLocationDetailMap: {
			'/item_locations/weapon': {
				hrid: '/item_locations/weapon',
				name: 'Weapon',
				type: '/item_location_types/equipment',
				isTool: false,
				isMultiItem: false,
				conflictingOtherItemLocationHrids: ['/item_locations/weapon'],
			},
			'/item_locations/alchemy_tool': {
				hrid: '/item_locations/alchemy_tool',
				name: 'Alchemy Tool',
				type: '/item_location_types/equipment',
				isTool: true,
				isMultiItem: false,
				conflictingOtherItemLocationHrids: ['/item_locations/alchemy_tool'],
			},
			'/item_locations/consumables': {
				hrid: '/item_locations/consumables',
				name: 'Consumables',
				type: '/item_location_types/consumables',
				isTool: false,
				isMultiItem: true,
				conflictingOtherItemLocationHrids: [],
			},
		},
	}

	describe('extractEntities', () => {
		test('should extract all item locations', () => {
			const result = generator.extractEntities(sampleSourceData)

			expect(Object.keys(result)).toHaveLength(3)
			expect(result['/item_locations/weapon']).toBeDefined()
			expect(result['/item_locations/alchemy_tool']).toBeDefined()
			expect(result['/item_locations/consumables']).toBeDefined()
		})

		test('should transform item location data correctly', () => {
			const result = generator.extractEntities(sampleSourceData)
			const weapon = result['/item_locations/weapon']

			expect(weapon?.hrid).toBe('/item_locations/weapon')
			expect(weapon?.name).toBe('Weapon')
			expect(weapon?.type).toBe('/item_location_types/equipment')
			expect(weapon?.isTool).toBe(false)
			expect(weapon?.isMultiItem).toBe(false)
			expect(weapon?.conflictingOtherItemLocationHrids).toEqual([
				'/item_locations/weapon',
			])
		})

		test('should handle tool locations', () => {
			const result = generator.extractEntities(sampleSourceData)
			const alchemyTool = result['/item_locations/alchemy_tool']

			expect(alchemyTool?.isTool).toBe(true)
			expect(alchemyTool?.name).toBe('Alchemy Tool')
		})

		test('should handle multi-item locations', () => {
			const result = generator.extractEntities(sampleSourceData)
			const consumables = result['/item_locations/consumables']

			expect(consumables?.isMultiItem).toBe(true)
			expect(consumables?.conflictingOtherItemLocationHrids).toEqual([])
		})
	})

	describe('defineInterfaces', () => {
		test('should define ItemLocation interface with correct properties', () => {
			const interfaces = generator['defineInterfaces']()

			expect(interfaces).toHaveLength(1)

			const itemLocationInterface = interfaces[0]
			expect(itemLocationInterface?.name).toBe('ItemLocation')

			const properties = itemLocationInterface?.properties || []
			expect(properties).toHaveLength(6)

			expect(properties.find((p: any) => p.name === 'hrid')).toEqual({
				name: 'hrid',
				type: 'ItemLocationHrid',
			})
			expect(properties.find((p: any) => p.name === 'name')).toEqual({
				name: 'name',
				type: 'string',
			})
			expect(properties.find((p: any) => p.name === 'type')).toEqual({
				name: 'type',
				type: 'string',
			})
			expect(properties.find((p: any) => p.name === 'isTool')).toEqual({
				name: 'isTool',
				type: 'boolean',
			})
			expect(properties.find((p: any) => p.name === 'isMultiItem')).toEqual({
				name: 'isMultiItem',
				type: 'boolean',
			})
			expect(
				properties.find(
					(p: any) => p.name === 'conflictingOtherItemLocationHrids',
				),
			).toEqual({
				name: 'conflictingOtherItemLocationHrids',
				type: 'ItemLocationHrid[]',
			})
		})
	})

	describe('defineUtilities', () => {
		test('should define custom utility functions', () => {
			const utilities = generator['defineUtilities']()

			expect(utilities.length).toBeGreaterThan(0)

			// Check for tool filter utility
			const toolUtil = utilities.find(
				(u: any) => u.name === 'getItemLocationsByTool',
			)
			expect(toolUtil).toBeDefined()

			// Check for multi-item filter utility
			const multiUtil = utilities.find(
				(u: any) => u.name === 'getItemLocationsByMultiItem',
			)
			expect(multiUtil).toBeDefined()
		})
	})

	describe('configuration', () => {
		test('should have correct entity configuration', () => {
			expect(generator['config'].entityName).toBe('ItemLocation')
			expect(generator['config'].entityNamePlural).toBe('ItemLocations')
			expect(generator['config'].sourceKey).toBe('itemLocationDetailMap')
			expect(generator['config'].outputPath).toBe('src/generated/itemlocations')
		})

		test('should have utility templates configured', () => {
			const templates = generator['config'].utilityTemplates || []

			// Should have toMap template
			const toMapTemplate = templates.find((t: any) => t.type === 'toMap')
			expect(toMapTemplate).toBeDefined()
		})

		test('should have category filters for tools and multi-items', () => {
			const filters = generator['config'].categoryFilters || []

			const toolFilter = filters.find((f: any) => f.name === 'tool')
			expect(toolFilter).toBeDefined()

			const multiFilter = filters.find((f: any) => f.name === 'multiItem')
			expect(multiFilter).toBeDefined()
		})
	})

	describe('duplicate prevention', () => {
		test('should not duplicate entities on multiple generations', () => {
			const result1 = generator.extractEntities(sampleSourceData)
			const result2 = generator.extractEntities(sampleSourceData)

			expect(Object.keys(result1)).toHaveLength(3)
			expect(Object.keys(result2)).toHaveLength(3)
			expect(result1).toEqual(result2)
		})
	})
})
