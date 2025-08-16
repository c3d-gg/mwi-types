/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.927Z
 */

import { z } from 'zod'
export const GameModeHridEnum = z.enum(['ironcow', 'legacy_ironcow', 'standard'] as const)
export type GameModeHrid = z.infer<typeof GameModeHridEnum>
export const GameModeSchema = z.object({
  hrid: GameModeHridEnum,
  name: z.string(),
  description: z.string(),
  isCreatable: z.boolean(),
  maxCharacterLimit: z.number().min(1),
  marketRestricted: z.boolean(),
  subsetGameModes: z.array(z.string()).nullable(),
  sortIndex: z.number().min(0)
})
export type GameMode = z.infer<typeof GameModeSchema>