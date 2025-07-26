/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.319Z
 */

import { z } from 'zod'
export const LeaderboardTypeHridEnum = z.enum(['guild', 'ironcow', 'legacy_ironcow', 'standard', 'steam_ironcow', 'steam_standard'] as const)
export type LeaderboardTypeHrid = z.infer<typeof LeaderboardTypeHridEnum>
export const LeaderboardTypeSchema = z.object({
  hrid: LeaderboardTypeHridEnum,
  name: z.string(),
  gameMode: z.string(),
  isSteam: z.boolean(),
  minJoinTime: z.string(),
  isGuild: z.boolean(),
  sortIndex: z.number().min(0)
})
export type LeaderboardType = z.infer<typeof LeaderboardTypeSchema>