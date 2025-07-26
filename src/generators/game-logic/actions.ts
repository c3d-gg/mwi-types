import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface ActionDetail extends BaseEntity {
  hrid: string
  function: string
  type: string
  category: string
  name: string
  levelRequirement: {
    skillHrid: string
    level: number
  }
  baseTimeCost: number
  experienceGain: {
    skillHrid: string
    value: number
  }
  dropTable: Array<{
    itemHrid: string
    dropRate: number
    minCount: number
    maxCount: number
    minEliteTier: number
  }> | null
  essenceDropTable: Array<{
    itemHrid: string
    dropRate: number
    minCount: number
    maxCount: number
    minEliteTier: number
  }> | null
  rareDropTable: Array<{
    itemHrid: string
    dropRate: number
    minCount: number
    maxCount: number
    minEliteTier: number
  }> | null
  upgradeItemHrid: string
  inputItems: Array<{
    itemHrid: string
    count: number
  }> | null
  outputItems: Array<{
    itemHrid: string
    count: number
  }> | null
  combatZoneInfo: {
    isDungeon: boolean
    fightInfo: {
      randomSpawnInfo: {
        maxSpawnCount: number
        maxTotalStrength: number
        spawns: Array<{
          combatMonsterHrid: string
          eliteTier: number
          rate: number
          strength: number
        }>
      } | null
      bossSpawns: Array<{
        combatMonsterHrid: string
        eliteTier: number
      }> | null
      battlesPerBoss: number
    }
    dungeonInfo: {
      keyItemHrid: string
      rewardDropTable: Array<{
        itemHrid: string
        dropRate: number
        minCount: number
        maxCount: number
        minEliteTier: number
      }> | null
      maxWaves: number
      randomSpawnInfoMap: Record<string, any> | null
      fixedSpawnsMap: Record<string, any> | null
    }
  } | null
  maxPartySize: number
  buffs: Array<{
    uniqueHrid: string
    typeHrid: string
    ratioBoost: number
    ratioBoostLevelBonus: number
    flatBoost: number
    flatBoostLevelBonus: number
    startTime: string
    duration: number
  }> | null
  sortIndex: number
}

/**
 * Generator for action types and constants
 */
export class ActionsGenerator extends BaseGenerator<ActionDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'Action',
      entityNamePlural: 'Actions',
      sourceKey: 'actionDetailMap',
      outputFilename: 'actions',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, ActionDetail> {
    return this.getEntitiesFromGameData() as Record<string, ActionDetail>
  }

  protected defineSchemaProperties(entity: ActionDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'ActionHridEnum',
        description: 'Human-readable ID for the action'
      },
      {
        name: 'function',
        type: 'string',
        description: 'Action function HRID (e.g., /action_functions/combat)'
      },
      {
        name: 'type',
        type: 'string',
        description: 'Action type HRID (e.g., /action_types/combat)'
      },
      {
        name: 'category',
        type: 'string',
        description: 'Action category HRID (e.g., /action_categories/combat/aqua_planet)'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the action'
      },
      {
        name: 'levelRequirement',
        type: 'object',
        description: 'Skill level requirement to perform this action',
        properties: [
          {
            name: 'skillHrid',
            type: 'string',
            description: 'Skill HRID required'
          },
          {
            name: 'level',
            type: 'number',
            description: 'Minimum skill level required'
          }
        ]
      },
      {
        name: 'baseTimeCost',
        type: 'number',
        description: 'Base time cost in nanoseconds'
      },
      {
        name: 'experienceGain',
        type: 'object',
        description: 'Experience gained from this action',
        properties: [
          {
            name: 'skillHrid',
            type: 'string',
            description: 'Skill that gains experience'
          },
          {
            name: 'value',
            type: 'number',
            description: 'Amount of experience gained'
          }
        ]
      },
      {
        name: 'dropTable',
        type: 'array',
        description: 'Items that can drop from this action',
        optional: false,
        nullable: true,
        items: {
          name: 'item',
          type: 'object',
          properties: [
            {
              name: 'itemHrid',
              type: 'string',
              description: 'Item HRID that can drop'
            },
            {
              name: 'dropRate',
              type: 'number',
              description: 'Drop rate (0-1)'
            },
            {
              name: 'minCount',
              type: 'number',
              description: 'Minimum quantity that can drop'
            },
            {
              name: 'maxCount',
              type: 'number',
              description: 'Maximum quantity that can drop'
            },
            {
              name: 'minEliteTier',
              type: 'number',
              description: 'Minimum elite tier required for this drop'
            }
          ]
        }
      },
      {
        name: 'essenceDropTable',
        type: 'array',
        description: 'Essence items that can drop from this action',
        optional: false,
        nullable: true,
        items: {
          name: 'item',
          type: 'object',
          properties: [
            {
              name: 'itemHrid',
              type: 'string',
              description: 'Essence item HRID'
            },
            {
              name: 'dropRate',
              type: 'number',
              description: 'Drop rate (0-1)'
            },
            {
              name: 'minCount',
              type: 'number',
              description: 'Minimum quantity'
            },
            {
              name: 'maxCount',
              type: 'number',
              description: 'Maximum quantity'
            },
            {
              name: 'minEliteTier',
              type: 'number',
              description: 'Minimum elite tier required'
            }
          ]
        }
      },
      {
        name: 'rareDropTable',
        type: 'array',
        description: 'Rare items that can drop from this action',
        optional: false,
        nullable: true,
        items: {
          name: 'item',
          type: 'object',
          properties: [
            {
              name: 'itemHrid',
              type: 'string',
              description: 'Rare item HRID'
            },
            {
              name: 'dropRate',
              type: 'number',
              description: 'Drop rate (0-1)'
            },
            {
              name: 'minCount',
              type: 'number',
              description: 'Minimum quantity'
            },
            {
              name: 'maxCount',
              type: 'number',
              description: 'Maximum quantity'
            },
            {
              name: 'minEliteTier',
              type: 'number',
              description: 'Minimum elite tier required'
            }
          ]
        }
      },
      {
        name: 'upgradeItemHrid',
        type: 'string',
        description: 'Item HRID used to upgrade this action (empty string if none)'
      },
      {
        name: 'inputItems',
        type: 'array',
        description: 'Items required to perform this action',
        optional: false,
        nullable: true,
        items: {
          name: 'item',
          type: 'object',
          properties: [
            {
              name: 'itemHrid',
              type: 'string',
              description: 'Required item HRID'
            },
            {
              name: 'count',
              type: 'number',
              description: 'Quantity required'
            }
          ]
        }
      },
      {
        name: 'outputItems',
        type: 'array',
        description: 'Items produced by this action',
        optional: false,
        nullable: true,
        items: {
          name: 'item',
          type: 'object',
          properties: [
            {
              name: 'itemHrid',
              type: 'string',
              description: 'Produced item HRID'
            },
            {
              name: 'count',
              type: 'number',
              description: 'Quantity produced'
            }
          ]
        }
      },
      {
        name: 'combatZoneInfo',
        type: 'object',
        description: 'Combat zone information for combat actions',
        optional: false,
        nullable: true,
        properties: [
          {
            name: 'isDungeon',
            type: 'boolean',
            description: 'Whether this is a dungeon zone'
          },
          {
            name: 'fightInfo',
            type: 'object',
            description: 'Fight spawn information',
            properties: [
              {
                name: 'randomSpawnInfo',
                type: 'object',
                optional: false,
                nullable: true,
                properties: [
                  {
                    name: 'maxSpawnCount',
                    type: 'number'
                  },
                  {
                    name: 'maxTotalStrength',
                    type: 'number'
                  },
                  {
                    name: 'spawns',
                    type: 'array',
                    nullable: true,
                    items: {
                      name: 'spawn',
                      type: 'object',
                      properties: [
                        {
                          name: 'combatMonsterHrid',
                          type: 'string'
                        },
                        {
                          name: 'eliteTier',
                          type: 'number'
                        },
                        {
                          name: 'rate',
                          type: 'number'
                        },
                        {
                          name: 'strength',
                          type: 'number'
                        }
                      ]
                    }
                  }
                ]
              },
              {
                name: 'bossSpawns',
                type: 'array',
                optional: false,
                nullable: true,
                items: {
                  name: 'boss',
                  type: 'object',
                  properties: [
                    {
                      name: 'combatMonsterHrid',
                      type: 'string'
                    },
                    {
                      name: 'eliteTier',
                      type: 'number'
                    },
                    {
                      name: 'rate',
                      type: 'number',
                      optional: true
                    },
                    {
                      name: 'strength',
                      type: 'number',
                      optional: true
                    }
                  ]
                }
              },
              {
                name: 'battlesPerBoss',
                type: 'number'
              }
            ]
          },
          {
            name: 'dungeonInfo',
            type: 'object',
            description: 'Dungeon-specific information',
            properties: [
              {
                name: 'keyItemHrid',
                type: 'string'
              },
              {
                name: 'rewardDropTable',
                type: 'array',
                optional: false,
                nullable: true,
                items: {
                  name: 'item',
                  type: 'object',
                  properties: [
                    {
                      name: 'itemHrid',
                      type: 'string'
                    },
                    {
                      name: 'dropRate',
                      type: 'number'
                    },
                    {
                      name: 'minCount',
                      type: 'number'
                    },
                    {
                      name: 'maxCount',
                      type: 'number'
                    },
                    {
                      name: 'minEliteTier',
                      type: 'number'
                    }
                  ]
                }
              },
              {
                name: 'maxWaves',
                type: 'number'
              },
              {
                name: 'randomSpawnInfoMap',
                type: 'record',
                optional: false,
                nullable: true,
                keyType: { name: 'key', type: 'string' },
                valueType: { 
                  name: 'spawnInfo', 
                  type: 'object', 
                  properties: [
                    {
                      name: 'maxSpawnCount',
                      type: 'number'
                    },
                    {
                      name: 'maxTotalStrength',
                      type: 'number'
                    },
                    {
                      name: 'spawns',
                      type: 'array',
                      nullable: true,
                      items: {
                        name: 'spawn',
                        type: 'object',
                        properties: [
                          {
                            name: 'combatMonsterHrid',
                            type: 'string'
                          },
                          {
                            name: 'eliteTier',
                            type: 'number'
                          },
                          {
                            name: 'rate',
                            type: 'number'
                          },
                          {
                            name: 'strength',
                            type: 'number'
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                name: 'fixedSpawnsMap',
                type: 'record',
                optional: false,
                nullable: true,
                keyType: { name: 'key', type: 'string' },
                valueType: { 
                  name: 'spawnList',
                  type: 'array',
                  items: {
                    name: 'spawn',
                    type: 'object',
                    properties: [
                      {
                        name: 'combatMonsterHrid',
                        type: 'string'
                      },
                      {
                        name: 'eliteTier',
                        type: 'number'
                      },
                      {
                        name: 'rate',
                        type: 'number',
                        optional: true
                      },
                      {
                        name: 'strength',
                        type: 'number',
                        optional: true
                      }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      {
        name: 'maxPartySize',
        type: 'number',
        description: 'Maximum party size for this action'
      },
      {
        name: 'buffs',
        type: 'array',
        description: 'Buffs applied during this action',
        optional: false,
        nullable: true,
        items: {
          name: 'item',
          type: 'object',
          properties: [
            {
              name: 'uniqueHrid',
              type: 'string',
              description: 'Unique buff identifier'
            },
            {
              name: 'typeHrid',
              type: 'string',
              description: 'Buff type HRID'
            },
            {
              name: 'ratioBoost',
              type: 'number',
              description: 'Multiplicative boost amount'
            },
            {
              name: 'ratioBoostLevelBonus',
              type: 'number',
              description: 'Additional ratio boost per level'
            },
            {
              name: 'flatBoost',
              type: 'number',
              description: 'Flat additive boost amount'
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
              description: 'Buff duration in nanoseconds'
            }
          ]
        }
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for display'
      }
    ]
  }

  protected override generateImports(): string {
    const baseImports = super.generateImports()
    // Add additional imports for Skills and Items
    return baseImports + `\nimport { SkillHridEnum } from './skills'\nimport { ItemHridEnum } from './items'`
  }

  protected override generateAdditionalExports(entities: Record<string, ActionDetail>): string[] {
    const utilityFunctions = `// Get actions by skill requirement
export function getActionsBySkill(skillHrid: z.infer<typeof SkillHridEnum>): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.levelRequirement.skillHrid === skillHrid
  )
}

// Get actions by minimum level requirement
export function getActionsByMinLevel(skillHrid: z.infer<typeof SkillHridEnum>, minLevel: number): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.levelRequirement.skillHrid === skillHrid && 
    action.levelRequirement.level >= minLevel
  )
}

// Get actions by type
export function getActionsByType(typeHrid: string): readonly Action[] {
  return Object.values(ACTIONS).filter(action => action.type === typeHrid)
}

// Get actions by function
export function getActionsByFunction(functionHrid: string): readonly Action[] {
  return Object.values(ACTIONS).filter(action => action.function === functionHrid)
}

// Get actions by category
export function getActionsByCategory(categoryHrid: string): readonly Action[] {
  return Object.values(ACTIONS).filter(action => action.category === categoryHrid)
}

// Get production actions (with input/output items)
export function getProductionActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.inputItems !== null && action.inputItems.length > 0
  )
}

// Get gathering actions (with drop tables)
export function getGatheringActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.dropTable !== null && action.dropTable.length > 0
  )
}

// Get combat actions
export function getCombatActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.combatZoneInfo !== null
  )
}

// Get dungeon actions
export function getDungeonActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.combatZoneInfo !== null && action.combatZoneInfo.isDungeon
  )
}

// Get actions that produce a specific item
export function getActionsProducingItem(itemHrid: z.infer<typeof ItemHridEnum>): readonly Action[] {
  return Object.values(ACTIONS).filter(action => {
    if (action.outputItems) {
      return action.outputItems.some(output => output.itemHrid === itemHrid)
    }
    if (action.dropTable) {
      return action.dropTable.some(drop => drop.itemHrid === itemHrid)
    }
    return false
  })
}

// Get actions that require a specific item
export function getActionsRequiringItem(itemHrid: z.infer<typeof ItemHridEnum>): readonly Action[] {
  return Object.values(ACTIONS).filter(action => {
    if (action.inputItems) {
      return action.inputItems.some(input => input.itemHrid === itemHrid)
    }
    return false
  })
}

// Get actions with buffs
export function getActionsWithBuffs(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.buffs !== null && action.buffs.length > 0
  )
}

// Action type groups
export const COMBAT_ACTIONS = getCombatActions()
export const PRODUCTION_ACTIONS = getProductionActions()
export const GATHERING_ACTIONS = getGatheringActions()
export const DUNGEON_ACTIONS = getDungeonActions()

// Group actions by skill
export const ACTIONS_BY_SKILL = Object.values(ACTIONS).reduce((acc, action) => {
  const skillHrid = action.levelRequirement.skillHrid
  if (skillHrid) {
    if (!acc[skillHrid]) acc[skillHrid] = []
    acc[skillHrid].push(action.hrid as ActionHrid)
  }
  return acc
}, {} as Record<string, ActionHrid[]>)

// Group actions by type
export const ACTIONS_BY_TYPE = Object.values(ACTIONS).reduce((acc, action) => {
  if (!acc[action.type]) acc[action.type] = []
  const typeActions = acc[action.type]
  if (typeActions) {
    typeActions.push(action.hrid as ActionHrid)
  }
  return acc
}, {} as Record<string, ActionHrid[]>)

// Group actions by category
export const ACTIONS_BY_CATEGORY = Object.values(ACTIONS).reduce((acc, action) => {
  if (!acc[action.category]) acc[action.category] = []
  const categoryActions = acc[action.category]
  if (categoryActions) {
    categoryActions.push(action.hrid as ActionHrid)
  }
  return acc
}, {} as Record<string, ActionHrid[]>)`

    return [utilityFunctions]
  }
}