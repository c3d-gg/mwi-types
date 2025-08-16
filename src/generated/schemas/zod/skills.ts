/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.483Z
 */

import { z } from 'zod'
export const SkillHridEnum = z.enum(['/skills/alchemy', '/skills/attack', '/skills/brewing', '/skills/cheesesmithing', '/skills/cooking', '/skills/crafting', '/skills/defense', '/skills/enhancing', '/skills/foraging', '/skills/intelligence', '/skills/magic', '/skills/milking', '/skills/power', '/skills/ranged', '/skills/stamina', '/skills/tailoring', '/skills/total_level', '/skills/woodcutting'] as const)
export type SkillHrid = z.infer<typeof SkillHridEnum>
export const SkillSchema = z.object({
  hrid: SkillHridEnum,
  name: z.string(),
  isSkilling: z.boolean(),
  isCombat: z.boolean(),
  sortIndex: z.number()
})
export type Skill = z.infer<typeof SkillSchema>