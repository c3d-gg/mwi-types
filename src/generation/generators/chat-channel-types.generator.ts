import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface ChatChannelType {
	hrid: string
	name: string
	isPrivate: boolean
	sortIndex: number
}

export class ChatChannelTypesGenerator extends BaseGenerator<ChatChannelType> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ChatChannelType',
			entityNamePlural: 'ChatChannelTypes',
			sourceKey: 'chatChannelTypeDetailMap',
			outputPath: 'src/generated/types/chat-channel-types.ts',
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
			const channelData = data as any
			const channelType: ChatChannelType = {
				hrid: channelData.hrid,
				name: channelData.name,
				isPrivate: channelData.isPrivate ?? true,
				sortIndex: channelData.sortIndex || 0,
			}

			channelTypes[hrid] = channelType
		}

		return channelTypes
	}

	protected override generateInterfaces(
		_channelTypes: Record<string, ChatChannelType>,
	): void {
		this.builder.addInterface('ChatChannelType', [
			{ name: 'hrid', type: 'ChatChannelTypeHrid' },
			{ name: 'name', type: 'string' },
			{ name: 'isPrivate', type: 'boolean' },
			{ name: 'sortIndex', type: 'number' },
		])
	}

	protected getPropertyDefinitions(): PropertyDefinition[] {
		return [
			{ name: 'hrid', type: 'string', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'isPrivate', type: 'boolean', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		]
	}

	protected override generateUtilities(
		channelTypes: Record<string, ChatChannelType>,
	): void {
		// Call parent utility functions first
		super.generateUtilities(channelTypes)

		// Add channel type filtering functions
		const publicChannels = Object.values(channelTypes).filter(
			(c) => !c.isPrivate,
		)
		const privateChannels = Object.values(channelTypes).filter(
			(c) => c.isPrivate,
		)
		const languageChannels = Object.values(channelTypes).filter(
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

		// Helper to get public channels
		this.builder.addFunction(
			'getPublicChannelTypes',
			[],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine(
					`return [${publicChannels.map((c) => `CHATCHANNELTYPES.get('${c.hrid}')!`).join(', ')}]`,
				)
			},
		)

		// Helper to get private channels
		this.builder.addFunction(
			'getPrivateChatChannelTypes',
			[],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine(
					`return [${privateChannels.map((c) => `CHATCHANNELTYPES.get('${c.hrid}')!`).join(', ')}]`,
				)
			},
		)

		// Helper to get language channels
		this.builder.addFunction(
			'getLanguageChatChannelTypes',
			[],
			'ChatChannelType[]',
			(writer) => {
				writer.writeLine(
					`return [${languageChannels.map((c) => `CHATCHANNELTYPES.get('${c.hrid}')!`).join(', ')}]`,
				)
			},
		)

		// Helper to check if channel is language-specific
		this.builder.addFunction(
			'isLanguageChannel',
			[{ name: 'hrid', type: 'ChatChannelTypeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine(`const languageChannels = new Set([`)
				languageChannels.forEach((c, i) => {
					writer.writeLine(
						`\t'${c.hrid}'${i < languageChannels.length - 1 ? ',' : ''}`,
					)
				})
				writer.writeLine(`])`)
				writer.writeLine(`return languageChannels.has(hrid)`)
			},
		)

		// Helper to check if channel is system channel (guild, party, whisper, mod)
		this.builder.addFunction(
			'isSystemChannel',
			[{ name: 'hrid', type: 'ChatChannelTypeHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine(`const systemChannels = new Set([`)
				writer.writeLine(`\t'/chat_channel_types/guild',`)
				writer.writeLine(`\t'/chat_channel_types/party',`)
				writer.writeLine(`\t'/chat_channel_types/whisper',`)
				writer.writeLine(`\t'/chat_channel_types/moderator'`)
				writer.writeLine(`])`)
				writer.writeLine(`return systemChannels.has(hrid)`)
			},
		)
	}
}
