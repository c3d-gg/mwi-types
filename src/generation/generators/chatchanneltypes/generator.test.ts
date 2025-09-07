import { describe, expect, test } from 'bun:test'

import { ModularChatChannelTypesGenerator } from './generator'

describe('ModularChatChannelTypesGenerator', () => {
	const generator = new ModularChatChannelTypesGenerator()

	const sampleSourceData = {
		chatChannelTypeDetailMap: {
			'/chat_channel_types/global': {
				hrid: '/chat_channel_types/global',
				name: 'Global',
				isPrivate: false,
				sortIndex: 0,
			},
			'/chat_channel_types/trade': {
				hrid: '/chat_channel_types/trade',
				name: 'Trade',
				isPrivate: false,
				sortIndex: 1,
			},
			'/chat_channel_types/arabic': {
				hrid: '/chat_channel_types/arabic',
				name: 'العربية',
				isPrivate: true,
				sortIndex: 9,
			},
		},
	}

	describe('extractEntities', () => {
		test('should extract all chat channel types', () => {
			const result = generator.extractEntities(sampleSourceData)

			expect(Object.keys(result)).toHaveLength(3)
			expect(result['/chat_channel_types/global']).toBeDefined()
			expect(result['/chat_channel_types/trade']).toBeDefined()
			expect(result['/chat_channel_types/arabic']).toBeDefined()
		})

		test('should transform chat channel type data correctly', () => {
			const result = generator.extractEntities(sampleSourceData)
			const globalChannel = result['/chat_channel_types/global']

			expect(globalChannel?.hrid).toBe('/chat_channel_types/global')
			expect(globalChannel?.name).toBe('Global')
			expect(globalChannel?.isPrivate).toBe(false)
			expect(globalChannel?.sortIndex).toBe(0)
		})

		test('should handle private channels', () => {
			const result = generator.extractEntities(sampleSourceData)
			const arabicChannel = result['/chat_channel_types/arabic']

			expect(arabicChannel?.isPrivate).toBe(true)
			expect(arabicChannel?.name).toBe('العربية')
		})
	})

	describe('defineInterfaces', () => {
		test('should define ChatChannelType interface with correct properties', () => {
			const interfaces = generator['defineInterfaces']()

			expect(interfaces).toHaveLength(1)

			const chatChannelTypeInterface = interfaces[0]
			expect(chatChannelTypeInterface?.name).toBe('ChatChannelType')

			const properties = chatChannelTypeInterface?.properties || []
			expect(properties).toHaveLength(4)

			expect(properties.find((p) => p.name === 'hrid')).toEqual({
				name: 'hrid',
				type: 'ChatChannelTypeHrid',
			})
			expect(properties.find((p) => p.name === 'name')).toEqual({
				name: 'name',
				type: 'string',
			})
			expect(properties.find((p) => p.name === 'isPrivate')).toEqual({
				name: 'isPrivate',
				type: 'boolean',
			})
			expect(properties.find((p) => p.name === 'sortIndex')).toEqual({
				name: 'sortIndex',
				type: 'number',
			})
		})
	})

	describe('defineUtilities', () => {
		test('should define custom utility functions', () => {
			const utilities = generator['defineUtilities']()

			expect(utilities.length).toBeGreaterThan(0)

			// Check for privacy filter utility
			const privacyUtil = utilities.find(
				(u: any) => u.name === 'getChatChannelTypesByPrivacy',
			)
			expect(privacyUtil).toBeDefined()
			expect(privacyUtil?.parameters).toHaveLength(1)
			expect(privacyUtil?.parameters[0]).toEqual({
				name: 'isPrivate',
				type: 'boolean',
			})
		})
	})

	describe('configuration', () => {
		test('should have correct entity configuration', () => {
			expect(generator['config'].entityName).toBe('ChatChannelType')
			expect(generator['config'].entityNamePlural).toBe('ChatChannelTypes')
			expect(generator['config'].sourceKey).toBe('chatChannelTypeDetailMap')
			expect(generator['config'].outputPath).toBe(
				'src/generated/chatchanneltypes',
			)
		})

		test('should have utility templates configured', () => {
			const templates = generator['config'].utilityTemplates || []

			// Should have sortBy template
			const sortTemplate = templates.find((t) => t.type === 'sortBy')
			expect(sortTemplate).toBeDefined()
			expect(sortTemplate?.field).toBe('sortIndex')

			// Should have toMap template
			const toMapTemplate = templates.find((t) => t.type === 'toMap')
			expect(toMapTemplate).toBeDefined()
		})

		test('should have category filters for public/private channels', () => {
			const filters = generator['config'].categoryFilters || []

			const publicFilter = filters.find((f) => f.name === 'public')
			expect(publicFilter).toBeDefined()

			const privateFilter = filters.find((f) => f.name === 'private')
			expect(privateFilter).toBeDefined()
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
