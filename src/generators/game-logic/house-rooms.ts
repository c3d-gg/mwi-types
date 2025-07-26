import type { PropertyDefinition, ImportStatement } from '../base/types'
import { BaseGenerator } from '../base/base-generator'
import type { HouseRoomDetail } from '../../types/source-data'

export class HouseRoomsGenerator extends BaseGenerator<HouseRoomDetail> {
  constructor() {
    const config = {
      entityName: 'HouseRoom',
      entityNamePlural: 'HouseRooms',
      sourceKey: 'houseRoomDetailMap' as const,
      outputFilename: 'house-rooms',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, HouseRoomDetail> {
    return this.getEntitiesFromGameData() as Record<string, HouseRoomDetail>
  }

  protected defineSchemaProperties(entity: HouseRoomDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'HouseRoomHridEnum',
        description: 'Unique identifier for the house room (e.g., "/house_rooms/archery_range")'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the house room'
      },
      {
        name: 'skillHrid',
        type: 'ref',
        refName: 'SkillHridEnum',
        description: 'The skill associated with this house room'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for displaying house rooms'
      },
      {
        name: 'usableInActionTypeMap',
        type: 'record',
        keyType: { name: 'key', type: 'string' },
        valueType: { name: 'value', type: 'boolean' },
        description: 'Map of action types where this room\'s action buffs apply'
      },
      {
        name: 'actionBuffs',
        type: 'array',
        items: {
          name: 'buff',
          type: 'object',
          properties: [
            {
              name: 'uniqueHrid',
              type: 'string',
              description: 'Unique identifier for this buff instance'
            },
            {
              name: 'typeHrid',
              type: 'ref',
              refName: 'BuffTypeHridEnum',
              description: 'The type of buff being applied'
            },
            {
              name: 'ratioBoost',
              type: 'number',
              description: 'Multiplicative boost value'
            },
            {
              name: 'ratioBoostLevelBonus',
              type: 'number',
              description: 'Additional multiplicative boost per room level'
            },
            {
              name: 'flatBoost',
              type: 'number',
              description: 'Flat additive boost value'
            },
            {
              name: 'flatBoostLevelBonus',
              type: 'number',
              description: 'Additional flat boost per room level'
            },
            {
              name: 'startTime',
              type: 'string',
              description: 'ISO date string for when the buff starts'
            },
            {
              name: 'duration',
              type: 'number',
              description: 'Duration of the buff in milliseconds (0 for permanent)'
            }
          ]
        },
        description: 'Buffs applied during actions when this room is active'
      },
      {
        name: 'globalBuffs',
        type: 'array',
        items: {
          name: 'buff',
          type: 'object',
          properties: [
            {
              name: 'uniqueHrid',
              type: 'string',
              description: 'Unique identifier for this buff instance'
            },
            {
              name: 'typeHrid',
              type: 'ref',
              refName: 'BuffTypeHridEnum',
              description: 'The type of buff being applied'
            },
            {
              name: 'ratioBoost',
              type: 'number',
              description: 'Multiplicative boost value'
            },
            {
              name: 'ratioBoostLevelBonus',
              type: 'number',
              description: 'Additional multiplicative boost per room level'
            },
            {
              name: 'flatBoost',
              type: 'number',
              description: 'Flat additive boost value'
            },
            {
              name: 'flatBoostLevelBonus',
              type: 'number',
              description: 'Additional flat boost per room level'
            },
            {
              name: 'startTime',
              type: 'string',
              description: 'ISO date string for when the buff starts'
            },
            {
              name: 'duration',
              type: 'number',
              description: 'Duration of the buff in milliseconds (0 for permanent)'
            }
          ]
        },
        description: 'Buffs that are always active from this room'
      },
      {
        name: 'upgradeCostsMap',
        type: 'record',
        keyType: { name: 'level', type: 'string' },
        valueType: {
          name: 'costs',
          type: 'array',
          items: {
            name: 'cost',
            type: 'object',
            properties: [
              {
                name: 'itemHrid',
                type: 'ref',
                refName: 'ItemHridEnum',
                description: 'The item required for upgrade'
              },
              {
                name: 'count',
                type: 'number',
                description: 'Number of items required'
              }
            ]
          }
        },
        description: 'Map of upgrade level to required items and counts'
      }
    ]
  }

  protected override generateImports(): string {
    // Call parent implementation
    const baseImports = super.generateImports()
    
    // Add our additional imports
    const additionalImports = `import type { SkillHrid } from './skills'
import { SkillHridEnum } from './skills'
import type { ItemHrid } from './items'
import { ItemHridEnum } from './items'
import type { BuffTypeHrid } from './buff-types'
import { BuffTypeHridEnum } from './buff-types'`
    
    return `${baseImports}\n${additionalImports}`
  }

  protected override getZodImports() {
    return [
      { from: '../../game-logic/skills', items: ['SkillHridEnum'] },
      { from: '../../game-logic/items', items: ['ItemHridEnum'] },
      { from: '../../game-logic/buff-types', items: ['BuffTypeHridEnum'] }
    ] as any
  }

  protected override generateAdditionalExports(entities: Record<string, HouseRoomDetail>): string[] {
    const exports: string[] = []
    
    // Export ALL_HOUSE_ROOMS collection
    exports.push(`export const ALL_HOUSE_ROOMS = Object.values(HOUSEROOMS)`)
    
    // Override the sortByIndex function since house rooms don't have sortIndex
    exports.push(`// Override sort function - house rooms don't have sortIndex
export function getHouseRoomsSorted(): HouseRoom[] {
  return ALL_HOUSE_ROOMS // House rooms don't have sortIndex property
}`)
    
    // Utility functions
    exports.push(`// Additional utility functions
export function getHouseRoomName(hrid: HouseRoomHrid): string {
  return HOUSEROOMS[hrid].name
}

export function getHouseRoomsBySkill(skillHrid: SkillHrid): HouseRoom[] {
  return ALL_HOUSE_ROOMS.filter(room => room.skillHrid === skillHrid)
}

export function getHouseRoomBySkill(skillHrid: SkillHrid): HouseRoom | undefined {
  return ALL_HOUSE_ROOMS.find(room => room.skillHrid === skillHrid)
}

export function getHouseRoomUpgradeCost(hrid: HouseRoomHrid, level: number): Array<{ itemHrid: ItemHrid; count: number }> | undefined {
  const room = HOUSEROOMS[hrid]
  return room.upgradeCostsMap[level.toString()]
}

export function getMaxHouseRoomLevel(hrid: HouseRoomHrid): number {
  const room = HOUSEROOMS[hrid]
  const levels = Object.keys(room.upgradeCostsMap).map(Number)
  return Math.max(...levels, 0)
}

export function calculateRoomBuffValue(
  buff: HouseRoom['actionBuffs'][0] | HouseRoom['globalBuffs'][0],
  roomLevel: number
): { flatValue: number; ratioValue: number } {
  return {
    flatValue: buff.flatBoost + (buff.flatBoostLevelBonus * roomLevel),
    ratioValue: buff.ratioBoost + (buff.ratioBoostLevelBonus * roomLevel)
  }
}

export function getHouseRoomActionBuffs(hrid: HouseRoomHrid): HouseRoom['actionBuffs'] {
  return HOUSEROOMS[hrid].actionBuffs
}

export function getHouseRoomGlobalBuffs(hrid: HouseRoomHrid): HouseRoom['globalBuffs'] {
  return HOUSEROOMS[hrid].globalBuffs
}

export function isRoomUsableInActionType(hrid: HouseRoomHrid, actionType: string): boolean {
  const room = HOUSEROOMS[hrid]
  return room.usableInActionTypeMap[actionType] === true
}`)

    // House rooms organized by associated skill
    exports.push(`// House rooms organized by associated skill
export const HOUSE_ROOMS_BY_SKILL: Record<SkillHrid, HouseRoom | undefined> = {} as Record<SkillHrid, HouseRoom | undefined>
for (const room of ALL_HOUSE_ROOMS) {
  HOUSE_ROOMS_BY_SKILL[room.skillHrid as SkillHrid] = room
}`)

    // Combat and non-combat rooms
    exports.push(`// Combat house rooms (rooms that provide combat buffs)
export const COMBAT_HOUSE_ROOMS = ALL_HOUSE_ROOMS.filter(room => 
  room.usableInActionTypeMap['/action_types/combat'] === true
)`)
    
    exports.push(`// Non-combat house rooms
export const NON_COMBAT_HOUSE_ROOMS = ALL_HOUSE_ROOMS.filter(room => 
  !room.usableInActionTypeMap['/action_types/combat']
)`)
    
    return exports
  }
}