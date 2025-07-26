/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.319Z
 */

import { z } from 'zod'
export const LeaderboardCategoryHridEnum = z.enum(['alchemy', 'attack', 'brewing', 'cheesesmithing', 'cooking', 'crafting', 'defense', 'enhancing', 'fame_points', 'foraging', 'guild', 'intelligence', 'magic', 'milking', 'power', 'ranged', 'stamina', 'tailoring', 'task_points', 'total_level', 'woodcutting'] as const)
export type LeaderboardCategoryHrid = z.infer<typeof LeaderboardCategoryHridEnum>
export const LeaderboardCategorySchema = z.object({
  hrid: LeaderboardCategoryHridEnum,
  name: z.string(),
  skillHrid: z.string(),
  isGuild: z.boolean(),
  sortIndex: z.number().min(0)
})
export type LeaderboardCategory = z.infer<typeof LeaderboardCategorySchema>