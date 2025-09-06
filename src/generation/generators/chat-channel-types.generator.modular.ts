import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

interface ChatChannelType {
	hrid: string
	name: string
	isPrivate: boolean
	sortIndex: number
}

export class ChatChannelTypesGeneratorModular extends ModularBaseGenerator<ChatChannelType> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ChatChannelType',
			entityNamePlural: 'ChatChannelTypes',
			sourceKey: 'chatChannelTypeDetailMap',
			outputPath: './src/generated/chat-channel-types',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ChatChannelType> {
		const channelTypes: Record<string, ChatChannelType> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const channelData = this.cleanEntityData(data as any)
			const channelType: ChatChannelType = {
				hrid: channelData.hrid || '',
				name: channelData.name || '',
				isPrivate: channelData.isPrivate ?? true,
				sortIndex:
					typeof channelData.sortIndex === 'number' ? channelData.sortIndex : 0,
			}

			channelTypes[hrid] = channelType
		}

		return channelTypes
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['CHATCHANNELTYPE_HRIDS'], false)

		// Generate type alias
		typesBuilder.addType(
			'ChatChannelTypeHrid',
			'typeof CHATCHANNELTYPE_HRIDS[number]',
		)

		// Generate interface
		typesBuilder.addInterface('ChatChannelType', [
			{ name: 'hrid', type: 'ChatChannelTypeHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'isPrivate', type: 'boolean', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'ChatChannelType', 'type')
		this.moduleBuilder.addExport('types', 'ChatChannelTypeHrid', 'type')
	}

	protected override generateConstants(
		entities: Record<string, ChatChannelType>,
	): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('CHATCHANNELTYPE_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'CHATCHANNELTYPE_HRIDS', 'const')

		// Generate category constants
		const publicChannels = Object.values(entities).filter((c) => !c.isPrivate)
		const privateChannels = Object.values(entities).filter((c) => c.isPrivate)
		const languageChannels = Object.values(entities).filter(
			(c) =>
				c.isPrivate &&
				![
					'/chat_channel_types/general',
					'/chat_channel_types/beginner',
					'/chat_channel_types/trade',
					'/chat_channel_types/recruit',
					'/chat_channel_types/ironcow',
				].includes(c.hrid),
		)
		const systemChannels = Object.values(entities).filter((c) =>
			[
				'/chat_channel_types/guild',
				'/chat_channel_types/party',
				'/chat_channel_types/whisper',
				'/chat_channel_types/moderator',
			].includes(c.hrid),
		)

		constantsBuilder.addConstArray(
			'PUBLIC_CHATCHANNELTYPE_HRIDS',
			publicChannels.map((c) => c.hrid),
			true,
		)
		constantsBuilder.addConstArray(
			'PRIVATE_CHATCHANNELTYPE_HRIDS',
			privateChannels.map((c) => c.hrid),
			true,
		)
		constantsBuilder.addConstArray(
			'LANGUAGE_CHATCHANNELTYPE_HRIDS',
			languageChannels.map((c) => c.hrid),
			true,
		)
		constantsBuilder.addConstArray(
			'SYSTEM_CHATCHANNELTYPE_HRIDS',
			systemChannels.map((c) => c.hrid),
			true,
		)

		this.moduleBuilder.addExport(
			'constants',
			'PUBLIC_CHATCHANNELTYPE_HRIDS',
			'const',
		)
		this.moduleBuilder.addExport(
			'constants',
			'PRIVATE_CHATCHANNELTYPE_HRIDS',
			'const',
		)
		this.moduleBuilder.addExport(
			'constants',
			'LANGUAGE_CHATCHANNELTYPE_HRIDS',
			'const',
		)
		this.moduleBuilder.addExport(
			'constants',
			'SYSTEM_CHATCHANNELTYPE_HRIDS',
			'const',
		)
	}

	protected override generateLazyData(
		entities: Record<string, ChatChannelType>,
	): void {
		const dataBuilder = this.moduleBuilder.getFile('data')

		// Import types
		dataBuilder.addImport(
			'./types',
			['ChatChannelType', 'ChatChannelTypeHrid'],
			true,
		)

		// Generate lazy map
		const entries = Object.entries(entities)
		dataBuilder.addLazyMap(
			'CHATCHANNELTYPES',
			'getChatChannelTypesMap',
			'loadChatChannelTypes',
			'ChatChannelTypeHrid',
			'ChatChannelType',
			entries,
		)

		this.moduleBuilder.addExport('data', 'getChatChannelTypesMap')
	}

	protected override generateLookups(
		entities: Record<string, ChatChannelType>,
	): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['ChatChannelTypeHrid'], true)

		// No complex lookups needed for channel types - categories are in constants
	}

	protected override generateUtilities(
		entities: Record<string, ChatChannelType>,
	): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsBuilder.addImport(
			'./types',
			['ChatChannelType', 'ChatChannelTypeHrid'],
			true,
		)
		utilsBuilder.addImport('./data', ['getChatChannelTypesMap'], false)
		utilsBuilder.addImport(
			'./constants',
			[
				'CHATCHANNELTYPE_HRIDS',
				'PUBLIC_CHATCHANNELTYPE_HRIDS',
				'PRIVATE_CHATCHANNELTYPE_HRIDS',
				'LANGUAGE_CHATCHANNELTYPE_HRIDS',
				'SYSTEM_CHATCHANNELTYPE_HRIDS',
			],
			false,
		)

		// Generate standard utilities

		// Type guard
		utilsBuilder.addFunction(
			'isChatChannelTypeHrid',
			[{ name: 'value', type: 'string' }],
			'value is ChatChannelTypeHrid',
			(writer) => {
				writer.writeLine(
					'return CHATCHANNELTYPE_HRIDS.includes(value as ChatChannelTypeHrid)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'isChatChannelTypeHrid')

		// Getter functions
		utilsBuilder.addFunction(
			'getChatChannelType',
			[{ name: 'hrid', type: 'ChatChannelTypeHrid' }],
			'ChatChannelType | undefined',
			(writer) => {
				writer.writeLine('return getChatChannelTypesMap().get(hrid)')
			},
		)
		this.moduleBuilder.addExport('utils', 'getChatChannelType')

		utilsBuilder.addFunction(
			'requireChatChannelType',
			[{ name: 'hrid', type: 'ChatChannelTypeHrid' }],
			'ChatChannelType',
			(writer) => {
				writer.writeLine('const entity = getChatChannelTypesMap().get(hrid)')
				writer.writeLine('if (!entity) {')
				writer.writeLine(
					'  throw new Error(`ChatChannelType not found: ${hrid}`)',
				)
				writer.writeLine('}')
				writer.writeLine('return entity')
			},
		)
		this.moduleBuilder.addExport('utils', 'requireChatChannelType')

		utilsBuilder.addFunction(
			'getAllChatChannelTypes',
			[],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine('return Array.from(getChatChannelTypesMap().values())')
			},
		)
		this.moduleBuilder.addExport('utils', 'getAllChatChannelTypes')

		// Get public channels
		utilsBuilder.addFunction(
			'getPublicChatChannelTypes',
			[],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine('const map = getChatChannelTypesMap()')
				writer.writeLine(
					'return PUBLIC_CHATCHANNELTYPE_HRIDS.map(hrid => map.get(hrid)!)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getPublicChatChannelTypes')

		// Get private channels
		utilsBuilder.addFunction(
			'getPrivateChatChannelTypes',
			[],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine('const map = getChatChannelTypesMap()')
				writer.writeLine(
					'return PRIVATE_CHATCHANNELTYPE_HRIDS.map(hrid => map.get(hrid)!)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getPrivateChatChannelTypes')

		// Get language channels
		utilsBuilder.addFunction(
			'getLanguageChatChannelTypes',
			[],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine('const map = getChatChannelTypesMap()')
				writer.writeLine(
					'return LANGUAGE_CHATCHANNELTYPE_HRIDS.map(hrid => map.get(hrid)!)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'getLanguageChatChannelTypes')

		// Check if channel is language-specific
		utilsBuilder.addFunction(
			'isLanguageChannel',
			[{ name: 'hrid', type: 'string' }],
			'hrid is (typeof LANGUAGE_CHATCHANNELTYPE_HRIDS)[number]',
			(writer) => {
				writer.writeLine(
					'return (LANGUAGE_CHATCHANNELTYPE_HRIDS as readonly string[]).includes(hrid)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'isLanguageChannel')

		// Check if channel is system channel
		utilsBuilder.addFunction(
			'isSystemChannel',
			[{ name: 'hrid', type: 'string' }],
			'hrid is (typeof SYSTEM_CHATCHANNELTYPE_HRIDS)[number]',
			(writer) => {
				writer.writeLine(
					'return (SYSTEM_CHATCHANNELTYPE_HRIDS as readonly string[]).includes(hrid)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'isSystemChannel')

		// Sort by index
		utilsBuilder.addFunction(
			'sortChatChannelTypesByIndex',
			[{ name: 'channelTypes', type: 'ChatChannelType[]' }],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine(
					'return channelTypes.slice().sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)
		this.moduleBuilder.addExport('utils', 'sortChatChannelTypesByIndex')
	}
}
