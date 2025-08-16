/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.509Z
 */

import { z } from 'zod'
export const DamageTypeHridEnum = z.enum(['/damage_types/fire', '/damage_types/nature', '/damage_types/physical', '/damage_types/water'] as const)
export type DamageTypeHrid = z.infer<typeof DamageTypeHridEnum>
export const DamageTypeSchema = z.object({
  hrid: DamageTypeHridEnum,
  name: z.string(),
  sortIndex: z.number()
})
export type DamageType = z.infer<typeof DamageTypeSchema>