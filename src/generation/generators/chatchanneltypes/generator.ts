import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition, UtilityDefinition } from '../../core/types'

export interface ChatChannelType {
	hrid: string
	name: string
	isPrivate: boolean
	sortIndex: number
}

export class ModularChatChannelTypesGenerator extends ModularBaseGenerator<ChatChannelType> {
	constructor() {
		super({
			entityName: 'ChatChannelType',
			entityNamePlural: 'ChatChannelTypes',
			sourceKey: 'chatChannelTypeDetailMap',
			outputPath: 'src/generated/chatchanneltypes',

			// Utility templates for common functions
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],

			// Category filters for public/private channels
			categoryFilters: [
				{
					name: 'public',
					condition: (entity: any) => !entity.isPrivate,
				},
				{
					name: 'private',
					condition: (entity: any) => entity.isPrivate,
				},
			],
		})
	}

	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'ChatChannelType',
				properties: [
					{ name: 'hrid', type: 'ChatChannelTypeHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'isPrivate', type: 'boolean' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getChatChannelTypesByPrivacy',
				parameters: [{ name: 'isPrivate', type: 'boolean' }],
				returnType: 'ChatChannelType[]',
				implementation: (writer) => {
					writer.writeLine(
						`return getAllChatChannelTypes().filter(channel => channel.isPrivate === isPrivate)`,
					)
				},
				jsDoc: {
					description: 'Get chat channel types filtered by privacy setting',
					params: [
						{
							name: 'isPrivate',
							description: 'Whether to get private or public channels',
						},
					],
					returns: 'Array of matching chat channel types',
				},
			},
		]
	}

	protected override transformEntity(rawData: any): ChatChannelType {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			isPrivate: rawData.isPrivate,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required for dev CLI generate:single command
if (import.meta.main) {
	const generator = new ModularChatChannelTypesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
