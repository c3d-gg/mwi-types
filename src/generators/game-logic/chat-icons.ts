import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface ChatIconDetail extends BaseEntity {
  hrid: string
  name: string
  isSpecial: boolean
  isSeasonal: boolean
  cowbellCost: number
  sortIndex: number
}

/**
 * Generator for chat icon types and constants
 */
export class ChatIconsGenerator extends BaseGenerator<ChatIconDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'ChatIcon',
      entityNamePlural: 'ChatIcons',
      sourceKey: 'chatIconDetailMap',
      outputFilename: 'chat-icons',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, ChatIconDetail> {
    return this.getEntitiesFromGameData() as Record<string, ChatIconDetail>
  }

  protected defineSchemaProperties(entity: ChatIconDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'ChatIconHridEnum',
        description: 'The unique human-readable ID of the chat icon'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the chat icon'
      },
      {
        name: 'isSpecial',
        type: 'boolean',
        description: 'Whether this is a special chat icon (e.g., admin-only)'
      },
      {
        name: 'isSeasonal',
        type: 'boolean',
        description: 'Whether this is a seasonal/limited-time chat icon'
      },
      {
        name: 'cowbellCost',
        type: 'number',
        description: 'Cost in cowbells to purchase this chat icon'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for display'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, ChatIconDetail>): string[] {
    const specialIcons = Object.values(entities).filter(icon => icon.isSpecial)
    const seasonalIcons = Object.values(entities).filter(icon => icon.isSeasonal)
    const regularIcons = Object.values(entities).filter(icon => !icon.isSpecial && !icon.isSeasonal)
    const freeIcons = Object.values(entities).filter(icon => icon.cowbellCost === 0)
    const purchasableIcons = Object.values(entities).filter(icon => icon.cowbellCost > 0)

    return [
      `// Utility functions
export function getChatIconName(hrid: ChatIconHrid): string {
  return CHATICONS[hrid].name
}

export function getChatIconCost(hrid: ChatIconHrid): number {
  return CHATICONS[hrid].cowbellCost
}

export function isSpecialChatIcon(hrid: ChatIconHrid): boolean {
  return CHATICONS[hrid].isSpecial
}

export function isSeasonalChatIcon(hrid: ChatIconHrid): boolean {
  return CHATICONS[hrid].isSeasonal
}

// Helper function to check if player can afford a chat icon
export function canAffordChatIcon(hrid: ChatIconHrid, cowbells: number): boolean {
  return cowbells >= CHATICONS[hrid].cowbellCost
}

// Get all chat icons within a price range
export function getChatIconsByPriceRange(minPrice: number, maxPrice: number): readonly ChatIcon[] {
  return Object.values(CHATICONS).filter(icon => 
    icon.cowbellCost >= minPrice && icon.cowbellCost <= maxPrice
  ) as readonly ChatIcon[]
}`,
      `// Chat icon groups
export const SPECIAL_CHAT_ICONS = ${JSON.stringify(specialIcons, null, 2)} as readonly ChatIcon[]
export const SEASONAL_CHAT_ICONS = ${JSON.stringify(seasonalIcons, null, 2)} as readonly ChatIcon[]
export const REGULAR_CHAT_ICONS = ${JSON.stringify(regularIcons, null, 2)} as readonly ChatIcon[]
export const FREE_CHAT_ICONS = ${JSON.stringify(freeIcons, null, 2)} as readonly ChatIcon[]
export const PURCHASABLE_CHAT_ICONS = ${JSON.stringify(purchasableIcons, null, 2)} as readonly ChatIcon[]`,
      `// Total count utility
export const TOTAL_CHAT_ICONS = ${Object.keys(entities).length}
export const TOTAL_SPECIAL_CHAT_ICONS = ${specialIcons.length}
export const TOTAL_SEASONAL_CHAT_ICONS = ${seasonalIcons.length}`
    ]
  }
}