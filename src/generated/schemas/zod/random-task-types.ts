/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.186Z
 */

import { z } from 'zod'
export const RandomTaskTypeHridEnum = z.enum(['/random_task_types/brewing', '/random_task_types/cheesesmithing', '/random_task_types/combat', '/random_task_types/cooking', '/random_task_types/crafting', '/random_task_types/foraging', '/random_task_types/milking', '/random_task_types/tailoring', '/random_task_types/woodcutting'] as const)
export type RandomTaskTypeHrid = z.infer<typeof RandomTaskTypeHridEnum>
export const RandomTaskTypeSchema = z.object({
  hrid: RandomTaskTypeHridEnum,
  name: z.string(),
  isCombat: z.boolean(),
  skillHrid: z.string(),
  sortIndex: z.number()
})
export type RandomTaskType = z.infer<typeof RandomTaskTypeSchema>