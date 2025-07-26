/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:22.935Z
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