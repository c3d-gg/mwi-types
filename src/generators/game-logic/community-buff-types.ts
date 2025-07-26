// CommunityBuffTypesGenerator - Generates community buff type definitions

import { BaseGenerator } from '../base/base-generator'
import type { GeneratorConfig, PropertyDefinition, ImportStatement } from '../base/types'
import type { BaseEntity } from '../base/types'

export interface CommunityBuffTypeEntity extends BaseEntity {
  hrid: string
  name: string
  usableInActionTypeMap: Record<string, boolean>
  buff: {
    uniqueHrid: string
    typeHrid: string
    ratioBoost: number
    ratioBoostLevelBonus: number
    flatBoost: number
    flatBoostLevelBonus: number
    startTime: string
    duration: number
  }
  description: string
  cowbellCost: number
  sortIndex: number
}

export class CommunityBuffTypesGenerator extends BaseGenerator<CommunityBuffTypeEntity> {
  constructor() {
    super({
      entityName: 'CommunityBuffType',
      entityNamePlural: 'CommunityBuffTypes',
      sourceKey: 'communityBuffTypeDetailMap',
      outputFilename: 'community-buff-types',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true,
    })
  }

  protected extractEntities(): Record<string, CommunityBuffTypeEntity> {
    return this.getEntitiesFromGameData() as Record<string, CommunityBuffTypeEntity>
  }

  protected override getZodImports() {
    return [{
      from: './buff-types',
      items: ['BuffTypeHridEnum']
    }]
  }

  protected defineSchemaProperties(entity: CommunityBuffTypeEntity): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'CommunityBuffTypeHridEnum',
        description: 'Community buff type HRID'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name'
      },
      {
        name: 'usableInActionTypeMap',
        type: 'record',
        keyType: { name: 'key', type: 'string' },
        valueType: { name: 'value', type: 'boolean' },
        description: 'Map of action types where this buff can be used'
      },
      {
        name: 'buff',
        type: 'object',
        properties: [
          {
            name: 'uniqueHrid',
            type: 'string',
            description: 'Unique buff identifier'
          },
          {
            name: 'typeHrid',
            type: 'ref',
            refName: 'BuffTypeHridEnum',
            description: 'Buff type reference'
          },
          {
            name: 'ratioBoost',
            type: 'number',
            description: 'Base ratio boost value'
          },
          {
            name: 'ratioBoostLevelBonus',
            type: 'number',
            description: 'Additional ratio boost per level'
          },
          {
            name: 'flatBoost',
            type: 'number',
            description: 'Base flat boost value'
          },
          {
            name: 'flatBoostLevelBonus',
            type: 'number',
            description: 'Additional flat boost per level'
          },
          {
            name: 'startTime',
            type: 'string',
            description: 'Buff start time'
          },
          {
            name: 'duration',
            type: 'number',
            description: 'Buff duration in milliseconds'
          }
        ]
      },
      {
        name: 'description',
        type: 'string',
        description: 'Buff description'
      },
      {
        name: 'cowbellCost',
        type: 'number',
        description: 'Cost in cowbells to activate'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Display sort order'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, CommunityBuffTypeEntity>): string[] {
    return [
      `// Community buff type groups
export const COMBAT_COMMUNITY_BUFFS = Object.values(COMMUNITYBUFFTYPES)
  .filter(buff => buff.usableInActionTypeMap['/action_types/combat'])
  .map(buff => buff.hrid) as CommunityBuffTypeHrid[]`,

      `export const SKILLING_COMMUNITY_BUFFS = Object.values(COMMUNITYBUFFTYPES)
  .filter(buff => !buff.usableInActionTypeMap['/action_types/combat'])
  .map(buff => buff.hrid) as CommunityBuffTypeHrid[]`,

      `// Additional utility functions
export function getCommunityBuffCost(hrid: CommunityBuffTypeHrid): number {
  return COMMUNITYBUFFTYPES[hrid].cowbellCost
}`,

      `export function isCombatCommunityBuff(hrid: CommunityBuffTypeHrid): boolean {
  return COMMUNITYBUFFTYPES[hrid].usableInActionTypeMap['/action_types/combat'] === true
}`,

      `export function getCommunityBuffsByActionType(actionTypeHrid: string): CommunityBuffTypeHrid[] {
  return Object.values(COMMUNITYBUFFTYPES)
    .filter(buff => buff.usableInActionTypeMap[actionTypeHrid])
    .map(buff => buff.hrid) as CommunityBuffTypeHrid[]
}`,

      `export function calculateCommunityBuffValue(hrid: CommunityBuffTypeHrid, level: number): { ratio: number; flat: number } {
  const buff = COMMUNITYBUFFTYPES[hrid].buff
  return {
    ratio: buff.ratioBoost + (buff.ratioBoostLevelBonus * level),
    flat: buff.flatBoost + (buff.flatBoostLevelBonus * level)
  }
}`
    ]
  }
}