/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.610Z
 */

import { z } from 'zod'
import { GuildCharacterRoleHridEnum, GuildCharacterRoleSchema, type GuildCharacterRole } from '../schemas/zod/guild-character-roles.js'
// Re-export HRID enum from schema
export { GuildCharacterRoleHridEnum } from '../schemas/zod/guild-character-roles.js'
// Re-export schema
export { GuildCharacterRoleSchema } from '../schemas/zod/guild-character-roles.js'

// Type definitions
type GuildCharacterRoleHrid = z.infer<typeof GuildCharacterRoleHridEnum>

// Data
export const GUILDCHARACTERROLES: Record<GuildCharacterRoleHrid, GuildCharacterRole> = {
  'general': {
    "hrid": "general",
    "name": "General",
    "permissionTier": 3,
    "promoteRole": "",
    "demoteRole": "officer",
    "canEditName": false,
    "canEditNotice": true,
    "canPromote": true,
    "canDemote": true,
    "canKick": true,
    "canInvite": true,
    "sortIndex": 2
  },
  'leader': {
    "hrid": "leader",
    "name": "Leader",
    "permissionTier": 10,
    "promoteRole": "",
    "demoteRole": "",
    "canEditName": true,
    "canEditNotice": true,
    "canPromote": true,
    "canDemote": true,
    "canKick": true,
    "canInvite": true,
    "sortIndex": 1
  },
  'member': {
    "hrid": "member",
    "name": "Member",
    "permissionTier": 1,
    "promoteRole": "officer",
    "demoteRole": "",
    "canEditName": false,
    "canEditNotice": false,
    "canPromote": false,
    "canDemote": false,
    "canKick": false,
    "canInvite": false,
    "sortIndex": 4
  },
  'officer': {
    "hrid": "officer",
    "name": "Officer",
    "permissionTier": 2,
    "promoteRole": "general",
    "demoteRole": "member",
    "canEditName": false,
    "canEditNotice": false,
    "canPromote": false,
    "canDemote": false,
    "canKick": true,
    "canInvite": true,
    "sortIndex": 3
  }
} as const satisfies Record<GuildCharacterRoleHrid, GuildCharacterRole>

// HRID utilities

/**
 * Check if a guildcharacterrole HRID is valid
 */
export function validateGuildCharacterRoleHrid(hrid: string): hrid is GuildCharacterRoleHrid {
  return hrid in GUILDCHARACTERROLES
}

/**
 * Check if a guildcharacterrole exists
 */
export function guildcharacterroleExists(hrid: string): boolean {
  return hrid in GUILDCHARACTERROLES
}

// Getter functions
export function getGuildCharacterRole(hrid: GuildCharacterRoleHrid): GuildCharacterRole {
  return GUILDCHARACTERROLES[hrid]
}

export function getAllGuildCharacterRoles(): GuildCharacterRole[] {
  return Object.values(GUILDCHARACTERROLES)
}

export function getGuildCharacterRolesSortedByIndex(): GuildCharacterRole[] {
  return getAllGuildCharacterRoles().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { GuildCharacterRole }
export type { GuildCharacterRoleHrid }
export type GuildCharacterRoleId = keyof typeof GUILDCHARACTERROLES
export type GuildCharacterRoleData = typeof GUILDCHARACTERROLES

// Role hierarchy (sorted by permission tier descending)
export const GUILD_ROLE_HIERARCHY = Object.values(GUILDCHARACTERROLES)
  .sort((a, b) => b.permissionTier - a.permissionTier)
  .map(role => role.hrid) as GuildCharacterRoleHrid[]

// Special roles
export const LEADER_ROLE: GuildCharacterRoleHrid = 'leader' as GuildCharacterRoleHrid
export const DEFAULT_MEMBER_ROLE: GuildCharacterRoleHrid = 'member' as GuildCharacterRoleHrid

// Additional utility functions
export function getRolePermissionTier(hrid: GuildCharacterRoleHrid): number {
  return GUILDCHARACTERROLES[hrid].permissionTier
}

export function canRolePromote(roleHrid: GuildCharacterRoleHrid, targetHrid: GuildCharacterRoleHrid): boolean {
  const role = GUILDCHARACTERROLES[roleHrid]
  const target = GUILDCHARACTERROLES[targetHrid]
  
  if (!role.canPromote) return false
  return role.permissionTier > target.permissionTier
}

export function canRoleDemote(roleHrid: GuildCharacterRoleHrid, targetHrid: GuildCharacterRoleHrid): boolean {
  const role = GUILDCHARACTERROLES[roleHrid]
  const target = GUILDCHARACTERROLES[targetHrid]
  
  if (!role.canDemote) return false
  return role.permissionTier > target.permissionTier
}

export function canRoleKick(roleHrid: GuildCharacterRoleHrid, targetHrid: GuildCharacterRoleHrid): boolean {
  const role = GUILDCHARACTERROLES[roleHrid]
  const target = GUILDCHARACTERROLES[targetHrid]
  
  if (!role.canKick) return false
  return role.permissionTier > target.permissionTier
}

export function getNextPromotionRole(hrid: GuildCharacterRoleHrid): GuildCharacterRoleHrid | null {
  const role = GUILDCHARACTERROLES[hrid]
  return role.promoteRole ? role.promoteRole as GuildCharacterRoleHrid : null
}

export function getNextDemotionRole(hrid: GuildCharacterRoleHrid): GuildCharacterRoleHrid | null {
  const role = GUILDCHARACTERROLES[hrid]
  return role.demoteRole ? role.demoteRole as GuildCharacterRoleHrid : null
}

export function getRolesByPermission(permission: keyof Pick<GuildCharacterRole, 'canEditName' | 'canEditNotice' | 'canPromote' | 'canDemote' | 'canKick' | 'canInvite'>): GuildCharacterRoleHrid[] {
  return Object.values(GUILDCHARACTERROLES)
    .filter(role => role[permission])
    .map(role => role.hrid) as GuildCharacterRoleHrid[]
}

export function isLeaderRole(hrid: GuildCharacterRoleHrid): boolean {
  return hrid === LEADER_ROLE
}