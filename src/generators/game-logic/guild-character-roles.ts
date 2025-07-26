// GuildCharacterRolesGenerator - Generates guild character role definitions

import { BaseGenerator } from '../base/base-generator'
import type { GeneratorConfig, PropertyDefinition } from '../base/types'
import type { BaseEntity } from '../base/types'

export interface GuildCharacterRoleEntity extends BaseEntity {
  hrid: string
  name: string
  permissionTier: number
  promoteRole: string
  demoteRole: string
  canEditName: boolean
  canEditNotice: boolean
  canPromote: boolean
  canDemote: boolean
  canKick: boolean
  canInvite: boolean
  sortIndex: number
}

export class GuildCharacterRolesGenerator extends BaseGenerator<GuildCharacterRoleEntity> {
  constructor() {
    super({
      entityName: 'GuildCharacterRole',
      entityNamePlural: 'GuildCharacterRoles',
      sourceKey: 'guildCharacterRoleDetailMap',
      outputFilename: 'guild-character-roles',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    })
  }

  protected extractEntities(): Record<string, GuildCharacterRoleEntity> {
    return this.getEntitiesFromGameData() as Record<string, GuildCharacterRoleEntity>
  }

  protected defineSchemaProperties(entity: GuildCharacterRoleEntity): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'GuildCharacterRoleHridEnum',
        description: 'Guild character role identifier'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the role'
      },
      {
        name: 'permissionTier',
        type: 'number',
        description: 'Permission level (higher = more permissions)'
      },
      {
        name: 'promoteRole',
        type: 'string',
        description: 'Role to promote to (empty if cannot promote higher)'
      },
      {
        name: 'demoteRole',
        type: 'string',
        description: 'Role to demote to (empty if cannot demote lower)'
      },
      {
        name: 'canEditName',
        type: 'boolean',
        description: 'Can edit guild name'
      },
      {
        name: 'canEditNotice',
        type: 'boolean',
        description: 'Can edit guild notice/message'
      },
      {
        name: 'canPromote',
        type: 'boolean',
        description: 'Can promote other members'
      },
      {
        name: 'canDemote',
        type: 'boolean',
        description: 'Can demote other members'
      },
      {
        name: 'canKick',
        type: 'boolean',
        description: 'Can kick members from guild'
      },
      {
        name: 'canInvite',
        type: 'boolean',
        description: 'Can invite new members'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Display sort order'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, GuildCharacterRoleEntity>): string[] {
    return [
      `// Role hierarchy (sorted by permission tier descending)
export const GUILD_ROLE_HIERARCHY = Object.values(GUILDCHARACTERROLES)
  .sort((a, b) => b.permissionTier - a.permissionTier)
  .map(role => role.hrid) as GuildCharacterRoleHrid[]`,

      `// Special roles
export const LEADER_ROLE: GuildCharacterRoleHrid = 'leader' as GuildCharacterRoleHrid
export const DEFAULT_MEMBER_ROLE: GuildCharacterRoleHrid = 'member' as GuildCharacterRoleHrid`,

      `// Additional utility functions
export function getRolePermissionTier(hrid: GuildCharacterRoleHrid): number {
  return GUILDCHARACTERROLES[hrid].permissionTier
}`,

      `export function canRolePromote(roleHrid: GuildCharacterRoleHrid, targetHrid: GuildCharacterRoleHrid): boolean {
  const role = GUILDCHARACTERROLES[roleHrid]
  const target = GUILDCHARACTERROLES[targetHrid]
  
  if (!role.canPromote) return false
  return role.permissionTier > target.permissionTier
}`,

      `export function canRoleDemote(roleHrid: GuildCharacterRoleHrid, targetHrid: GuildCharacterRoleHrid): boolean {
  const role = GUILDCHARACTERROLES[roleHrid]
  const target = GUILDCHARACTERROLES[targetHrid]
  
  if (!role.canDemote) return false
  return role.permissionTier > target.permissionTier
}`,

      `export function canRoleKick(roleHrid: GuildCharacterRoleHrid, targetHrid: GuildCharacterRoleHrid): boolean {
  const role = GUILDCHARACTERROLES[roleHrid]
  const target = GUILDCHARACTERROLES[targetHrid]
  
  if (!role.canKick) return false
  return role.permissionTier > target.permissionTier
}`,

      `export function getNextPromotionRole(hrid: GuildCharacterRoleHrid): GuildCharacterRoleHrid | null {
  const role = GUILDCHARACTERROLES[hrid]
  return role.promoteRole ? role.promoteRole as GuildCharacterRoleHrid : null
}`,

      `export function getNextDemotionRole(hrid: GuildCharacterRoleHrid): GuildCharacterRoleHrid | null {
  const role = GUILDCHARACTERROLES[hrid]
  return role.demoteRole ? role.demoteRole as GuildCharacterRoleHrid : null
}`,

      `export function getRolesByPermission(permission: keyof Pick<GuildCharacterRole, 'canEditName' | 'canEditNotice' | 'canPromote' | 'canDemote' | 'canKick' | 'canInvite'>): GuildCharacterRoleHrid[] {
  return Object.values(GUILDCHARACTERROLES)
    .filter(role => role[permission])
    .map(role => role.hrid) as GuildCharacterRoleHrid[]
}`,

      `export function isLeaderRole(hrid: GuildCharacterRoleHrid): boolean {
  return hrid === LEADER_ROLE
}`
    ]
  }
}