/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.882Z
 */

import { z } from 'zod'
export const ChatChannelTypeHridEnum = z.enum(['/chat_channel_types/arabic', '/chat_channel_types/beginner', '/chat_channel_types/chinese', '/chat_channel_types/french', '/chat_channel_types/general', '/chat_channel_types/german', '/chat_channel_types/guild', '/chat_channel_types/hebrew', '/chat_channel_types/hindi', '/chat_channel_types/ironcow', '/chat_channel_types/japanese', '/chat_channel_types/korean', '/chat_channel_types/moderator', '/chat_channel_types/party', '/chat_channel_types/portuguese', '/chat_channel_types/recruit', '/chat_channel_types/russian', '/chat_channel_types/spanish', '/chat_channel_types/trade', '/chat_channel_types/vietnamese', '/chat_channel_types/whisper'] as const)
export type ChatChannelTypeHrid = z.infer<typeof ChatChannelTypeHridEnum>
export const ChatChannelTypeSchema = z.object({
  hrid: ChatChannelTypeHridEnum,
  name: z.string(),
  isPrivate: z.boolean(),
  sortIndex: z.number()
})
export type ChatChannelType = z.infer<typeof ChatChannelTypeSchema>