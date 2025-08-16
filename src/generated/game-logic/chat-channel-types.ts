/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.881Z
 */

import { z } from 'zod'
import { ChatChannelTypeHridEnum, ChatChannelTypeSchema, type ChatChannelType } from '../schemas/zod/chat-channel-types.js'
// Re-export HRID enum from schema
export { ChatChannelTypeHridEnum } from '../schemas/zod/chat-channel-types.js'
// Re-export schema
export { ChatChannelTypeSchema } from '../schemas/zod/chat-channel-types.js'

// Type definitions
type ChatChannelTypeHrid = z.infer<typeof ChatChannelTypeHridEnum>

// Data
export const CHATCHANNELTYPES: Record<ChatChannelTypeHrid, ChatChannelType> = {
  '/chat_channel_types/arabic': {
    "hrid": "/chat_channel_types/arabic",
    "name": "العربية",
    "isPrivate": true,
    "sortIndex": 9
  },
  '/chat_channel_types/beginner': {
    "hrid": "/chat_channel_types/beginner",
    "name": "Beginner",
    "isPrivate": true,
    "sortIndex": 17
  },
  '/chat_channel_types/chinese': {
    "hrid": "/chat_channel_types/chinese",
    "name": "中文",
    "isPrivate": true,
    "sortIndex": 2
  },
  '/chat_channel_types/french': {
    "hrid": "/chat_channel_types/french",
    "name": "Français",
    "isPrivate": true,
    "sortIndex": 3
  },
  '/chat_channel_types/general': {
    "hrid": "/chat_channel_types/general",
    "name": "General",
    "isPrivate": true,
    "sortIndex": 1
  },
  '/chat_channel_types/german': {
    "hrid": "/chat_channel_types/german",
    "name": "Deutsch",
    "isPrivate": true,
    "sortIndex": 4
  },
  '/chat_channel_types/guild': {
    "hrid": "/chat_channel_types/guild",
    "name": "Guild",
    "isPrivate": false,
    "sortIndex": 18
  },
  '/chat_channel_types/hebrew': {
    "hrid": "/chat_channel_types/hebrew",
    "name": "עברית",
    "isPrivate": true,
    "sortIndex": 8
  },
  '/chat_channel_types/hindi': {
    "hrid": "/chat_channel_types/hindi",
    "name": "हिंदी",
    "isPrivate": true,
    "sortIndex": 10
  },
  '/chat_channel_types/ironcow': {
    "hrid": "/chat_channel_types/ironcow",
    "name": "Ironcow",
    "isPrivate": true,
    "sortIndex": 14
  },
  '/chat_channel_types/japanese': {
    "hrid": "/chat_channel_types/japanese",
    "name": "日本語",
    "isPrivate": true,
    "sortIndex": 11
  },
  '/chat_channel_types/korean': {
    "hrid": "/chat_channel_types/korean",
    "name": "한국어",
    "isPrivate": true,
    "sortIndex": 12
  },
  '/chat_channel_types/moderator': {
    "hrid": "/chat_channel_types/moderator",
    "name": "Mod",
    "isPrivate": false,
    "sortIndex": 20
  },
  '/chat_channel_types/party': {
    "hrid": "/chat_channel_types/party",
    "name": "Party",
    "isPrivate": false,
    "sortIndex": 19
  },
  '/chat_channel_types/portuguese': {
    "hrid": "/chat_channel_types/portuguese",
    "name": "Português",
    "isPrivate": true,
    "sortIndex": 6
  },
  '/chat_channel_types/recruit': {
    "hrid": "/chat_channel_types/recruit",
    "name": "Recruit",
    "isPrivate": true,
    "sortIndex": 16
  },
  '/chat_channel_types/russian': {
    "hrid": "/chat_channel_types/russian",
    "name": "Русский",
    "isPrivate": true,
    "sortIndex": 7
  },
  '/chat_channel_types/spanish': {
    "hrid": "/chat_channel_types/spanish",
    "name": "Español",
    "isPrivate": true,
    "sortIndex": 5
  },
  '/chat_channel_types/trade': {
    "hrid": "/chat_channel_types/trade",
    "name": "Trade",
    "isPrivate": true,
    "sortIndex": 15
  },
  '/chat_channel_types/vietnamese': {
    "hrid": "/chat_channel_types/vietnamese",
    "name": "Tiếng Việt",
    "isPrivate": true,
    "sortIndex": 13
  },
  '/chat_channel_types/whisper': {
    "hrid": "/chat_channel_types/whisper",
    "name": "Whisper",
    "isPrivate": false,
    "sortIndex": 21
  }
} as const satisfies Record<ChatChannelTypeHrid, ChatChannelType>

// HRID utilities

/**
 * Check if a chatchanneltype HRID is valid
 */
export function validateChatChannelTypeHrid(hrid: string): hrid is ChatChannelTypeHrid {
  return hrid in CHATCHANNELTYPES
}

/**
 * Check if a chatchanneltype exists
 */
export function chatchanneltypeExists(hrid: string): boolean {
  return hrid in CHATCHANNELTYPES
}

// Getter functions
export function getChatChannelType(hrid: ChatChannelTypeHrid): ChatChannelType {
  return CHATCHANNELTYPES[hrid]
}

export function getAllChatChannelTypes(): ChatChannelType[] {
  return Object.values(CHATCHANNELTYPES)
}

export function getChatChannelTypesSortedByIndex(): ChatChannelType[] {
  return getAllChatChannelTypes().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { ChatChannelType }
export type { ChatChannelTypeHrid }
export type ChatChannelTypeId = keyof typeof CHATCHANNELTYPES
export type ChatChannelTypeData = typeof CHATCHANNELTYPES

// Utility functions
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
}

// Channel groups
export const PRIVATE_CHANNELS = [
  {
    "hrid": "/chat_channel_types/arabic",
    "name": "العربية",
    "isPrivate": true,
    "sortIndex": 9
  },
  {
    "hrid": "/chat_channel_types/beginner",
    "name": "Beginner",
    "isPrivate": true,
    "sortIndex": 17
  },
  {
    "hrid": "/chat_channel_types/chinese",
    "name": "中文",
    "isPrivate": true,
    "sortIndex": 2
  },
  {
    "hrid": "/chat_channel_types/french",
    "name": "Français",
    "isPrivate": true,
    "sortIndex": 3
  },
  {
    "hrid": "/chat_channel_types/general",
    "name": "General",
    "isPrivate": true,
    "sortIndex": 1
  },
  {
    "hrid": "/chat_channel_types/german",
    "name": "Deutsch",
    "isPrivate": true,
    "sortIndex": 4
  },
  {
    "hrid": "/chat_channel_types/hebrew",
    "name": "עברית",
    "isPrivate": true,
    "sortIndex": 8
  },
  {
    "hrid": "/chat_channel_types/hindi",
    "name": "हिंदी",
    "isPrivate": true,
    "sortIndex": 10
  },
  {
    "hrid": "/chat_channel_types/ironcow",
    "name": "Ironcow",
    "isPrivate": true,
    "sortIndex": 14
  },
  {
    "hrid": "/chat_channel_types/japanese",
    "name": "日本語",
    "isPrivate": true,
    "sortIndex": 11
  },
  {
    "hrid": "/chat_channel_types/korean",
    "name": "한국어",
    "isPrivate": true,
    "sortIndex": 12
  },
  {
    "hrid": "/chat_channel_types/portuguese",
    "name": "Português",
    "isPrivate": true,
    "sortIndex": 6
  },
  {
    "hrid": "/chat_channel_types/recruit",
    "name": "Recruit",
    "isPrivate": true,
    "sortIndex": 16
  },
  {
    "hrid": "/chat_channel_types/russian",
    "name": "Русский",
    "isPrivate": true,
    "sortIndex": 7
  },
  {
    "hrid": "/chat_channel_types/spanish",
    "name": "Español",
    "isPrivate": true,
    "sortIndex": 5
  },
  {
    "hrid": "/chat_channel_types/trade",
    "name": "Trade",
    "isPrivate": true,
    "sortIndex": 15
  },
  {
    "hrid": "/chat_channel_types/vietnamese",
    "name": "Tiếng Việt",
    "isPrivate": true,
    "sortIndex": 13
  }
] as readonly ChatChannelType[]
export const PUBLIC_CHANNELS = [
  {
    "hrid": "/chat_channel_types/guild",
    "name": "Guild",
    "isPrivate": false,
    "sortIndex": 18
  },
  {
    "hrid": "/chat_channel_types/moderator",
    "name": "Mod",
    "isPrivate": false,
    "sortIndex": 20
  },
  {
    "hrid": "/chat_channel_types/party",
    "name": "Party",
    "isPrivate": false,
    "sortIndex": 19
  },
  {
    "hrid": "/chat_channel_types/whisper",
    "name": "Whisper",
    "isPrivate": false,
    "sortIndex": 21
  }
] as readonly ChatChannelType[]
export const LANGUAGE_CHANNELS = [
  {
    "hrid": "/chat_channel_types/arabic",
    "name": "العربية",
    "isPrivate": true,
    "sortIndex": 9
  },
  {
    "hrid": "/chat_channel_types/chinese",
    "name": "中文",
    "isPrivate": true,
    "sortIndex": 2
  },
  {
    "hrid": "/chat_channel_types/french",
    "name": "Français",
    "isPrivate": true,
    "sortIndex": 3
  },
  {
    "hrid": "/chat_channel_types/german",
    "name": "Deutsch",
    "isPrivate": true,
    "sortIndex": 4
  },
  {
    "hrid": "/chat_channel_types/japanese",
    "name": "日本語",
    "isPrivate": true,
    "sortIndex": 11
  },
  {
    "hrid": "/chat_channel_types/korean",
    "name": "한국어",
    "isPrivate": true,
    "sortIndex": 12
  },
  {
    "hrid": "/chat_channel_types/portuguese",
    "name": "Português",
    "isPrivate": true,
    "sortIndex": 6
  },
  {
    "hrid": "/chat_channel_types/russian",
    "name": "Русский",
    "isPrivate": true,
    "sortIndex": 7
  },
  {
    "hrid": "/chat_channel_types/spanish",
    "name": "Español",
    "isPrivate": true,
    "sortIndex": 5
  }
] as readonly ChatChannelType[]
export const GAMEPLAY_CHANNELS = [
  {
    "hrid": "/chat_channel_types/beginner",
    "name": "Beginner",
    "isPrivate": true,
    "sortIndex": 17
  },
  {
    "hrid": "/chat_channel_types/guild",
    "name": "Guild",
    "isPrivate": false,
    "sortIndex": 18
  },
  {
    "hrid": "/chat_channel_types/trade",
    "name": "Trade",
    "isPrivate": true,
    "sortIndex": 15
  }
] as readonly ChatChannelType[]

// Total count utility
export const TOTAL_CHAT_CHANNELS = 21
export const TOTAL_PRIVATE_CHANNELS = 17
export const TOTAL_PUBLIC_CHANNELS = 4
export const TOTAL_LANGUAGE_CHANNELS = 9