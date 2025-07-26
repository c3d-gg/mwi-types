import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface ChatChannelTypeDetail extends BaseEntity {
  hrid: string
  name: string
  isPrivate: boolean
  sortIndex: number
}

/**
 * Generator for chat channel type types and constants
 */
export class ChatChannelTypesGenerator extends BaseGenerator<ChatChannelTypeDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'ChatChannelType',
      entityNamePlural: 'ChatChannelTypes',
      sourceKey: 'chatChannelTypeDetailMap',
      outputFilename: 'chat-channel-types',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, ChatChannelTypeDetail> {
    return this.getEntitiesFromGameData() as Record<string, ChatChannelTypeDetail>
  }

  protected defineSchemaProperties(entity: ChatChannelTypeDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'ChatChannelTypeHridEnum',
        description: 'The unique human-readable ID of the chat channel type'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the chat channel'
      },
      {
        name: 'isPrivate',
        type: 'boolean',
        description: 'Whether this is a private/restricted channel'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for display'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, ChatChannelTypeDetail>): string[] {
    const privateChannels = Object.values(entities).filter(channel => channel.isPrivate)
    const publicChannels = Object.values(entities).filter(channel => !channel.isPrivate)
    const languageChannels = Object.values(entities).filter(ch => 
      // Language channels typically have non-English names or specific language names
      ['chinese', 'french', 'german', 'spanish', 'portuguese', 'russian', 'italian', 'turkish', 
       'polish', 'arabic', 'japanese', 'korean'].some(lang => ch.hrid.includes(lang))
    )
    const gameplayChannels = Object.values(entities).filter(ch => 
      ['beginner', 'trade', 'guild', 'global'].some(type => ch.hrid.includes(type))
    )

    return [
      `// Utility functions
export function getChatChannelTypeName(hrid: ChatChannelTypeHrid): string {
  return CHATCHANNELTYPES[hrid].name
}

export function isPrivateChannel(hrid: ChatChannelTypeHrid): boolean {
  return CHATCHANNELTYPES[hrid].isPrivate
}

// Helper function to find channels by name pattern
export function getChatChannelsByPattern(pattern: string): readonly ChatChannelType[] {
  const regex = new RegExp(pattern, 'i')
  return Object.values(CHATCHANNELTYPES).filter(channel => 
    regex.test(channel.name) || regex.test(channel.hrid)
  ) as readonly ChatChannelType[]
}

// Get all channels accessible at a given permission level
export function getAccessibleChannels(includePrivate: boolean = false): readonly ChatChannelType[] {
  if (includePrivate) {
    return Object.values(CHATCHANNELTYPES) as readonly ChatChannelType[]
  }
  return PUBLIC_CHANNELS
}

// Check if a channel is a language-specific channel
export function isLanguageChannel(hrid: ChatChannelTypeHrid): boolean {
  return LANGUAGE_CHANNELS.some(ch => ch.hrid === hrid)
}

// Check if a channel is a gameplay channel
export function isGameplayChannel(hrid: ChatChannelTypeHrid): boolean {
  return GAMEPLAY_CHANNELS.some(ch => ch.hrid === hrid)
}`,
      `// Channel groups
export const PRIVATE_CHANNELS = ${JSON.stringify(privateChannels, null, 2)} as readonly ChatChannelType[]
export const PUBLIC_CHANNELS = ${JSON.stringify(publicChannels, null, 2)} as readonly ChatChannelType[]
export const LANGUAGE_CHANNELS = ${JSON.stringify(languageChannels, null, 2)} as readonly ChatChannelType[]
export const GAMEPLAY_CHANNELS = ${JSON.stringify(gameplayChannels, null, 2)} as readonly ChatChannelType[]`,
      `// Total count utility
export const TOTAL_CHAT_CHANNELS = ${Object.keys(entities).length}
export const TOTAL_PRIVATE_CHANNELS = ${privateChannels.length}
export const TOTAL_PUBLIC_CHANNELS = ${publicChannels.length}
export const TOTAL_LANGUAGE_CHANNELS = ${languageChannels.length}`
    ]
  }
}