/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.848Z
 */

import { z } from 'zod'
import { BuffTypeHridEnum } from './buff-types.js'
export const CommunityBuffTypeHridEnum = z.enum(['/community_buff_types/combat_drop_quantity', '/community_buff_types/enhancing_speed', '/community_buff_types/experience', '/community_buff_types/gathering_quantity', '/community_buff_types/production_efficiency'] as const)
export type CommunityBuffTypeHrid = z.infer<typeof CommunityBuffTypeHridEnum>
export const CommunityBuffTypeSchema = z.object({
  hrid: CommunityBuffTypeHridEnum,
  name: z.string(),
  usableInActionTypeMap: z.record(z.string(), z.boolean()),
  buff: z.object({
  uniqueHrid: z.string(),
  typeHrid: BuffTypeHridEnum,
  ratioBoost: z.number(),
  ratioBoostLevelBonus: z.number(),
  flatBoost: z.number(),
  flatBoostLevelBonus: z.number(),
  startTime: z.string(),
  duration: z.number()
}),
  description: z.string(),
  cowbellCost: z.number(),
  sortIndex: z.number()
})
export type CommunityBuffType = z.infer<typeof CommunityBuffTypeSchema>