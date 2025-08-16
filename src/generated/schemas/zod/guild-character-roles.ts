/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.612Z
 */

import { z } from 'zod'
export const GuildCharacterRoleHridEnum = z.enum(['general', 'leader', 'member', 'officer'] as const)
export type GuildCharacterRoleHrid = z.infer<typeof GuildCharacterRoleHridEnum>
export const GuildCharacterRoleSchema = z.object({
  hrid: GuildCharacterRoleHridEnum,
  name: z.string(),
  permissionTier: z.number(),
  promoteRole: z.string(),
  demoteRole: z.string(),
  canEditName: z.boolean(),
  canEditNotice: z.boolean(),
  canPromote: z.boolean(),
  canDemote: z.boolean(),
  canKick: z.boolean(),
  canInvite: z.boolean(),
  sortIndex: z.number()
})
export type GuildCharacterRole = z.infer<typeof GuildCharacterRoleSchema>