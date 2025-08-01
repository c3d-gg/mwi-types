/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:22.935Z
 */

import { z } from 'zod'
export const CombatStyleHridEnum = z.enum(['/combat_styles/heal', '/combat_styles/magic', '/combat_styles/ranged', '/combat_styles/slash', '/combat_styles/smash', '/combat_styles/stab'] as const)
export type CombatStyleHrid = z.infer<typeof CombatStyleHridEnum>
export const CombatStyleSchema = z.object({
  hrid: CombatStyleHridEnum,
  name: z.string(),
  sortIndex: z.number()
})
export type CombatStyle = z.infer<typeof CombatStyleSchema>