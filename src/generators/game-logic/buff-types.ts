import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

/**
 * Buff type entity structure
 */
interface BuffTypeDetail extends BaseEntity {
  hrid: string
  isCombat: boolean
  name: string
  description: string
  debuffDescription: string
  sortIndex: number
}

/**
 * Generator for buff type definitions
 */
export class BuffTypesGenerator extends BaseGenerator<BuffTypeDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'BuffType',
      entityNamePlural: 'BuffTypes',
      sourceKey: 'buffTypeDetailMap',
      outputFilename: 'buff-types',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, BuffTypeDetail> {
    return this.getEntitiesFromGameData() as Record<string, BuffTypeDetail>
  }

  protected defineSchemaProperties(entity: BuffTypeDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'BuffTypeHridEnum',
        description: 'The buff type unique identifier'
      },
      {
        name: 'isCombat',
        type: 'boolean',
        description: 'Whether this buff is combat-related'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the buff type'
      },
      {
        name: 'description',
        type: 'string',
        description: 'Description when applied as a buff (positive effect)'
      },
      {
        name: 'debuffDescription',
        type: 'string',
        description: 'Description when applied as a debuff (negative effect)'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for display'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, BuffTypeDetail>): string[] {
    // Group buff types by category
    const combatBuffs: string[] = []
    const nonCombatBuffs: string[] = []
    const levelBuffs: string[] = []
    const resistanceBuffs: string[] = []
    const amplifyBuffs: string[] = []
    const thornsBuffs: string[] = []
    const statBuffs: string[] = []
    
    // Categorize buffs by their function
    for (const [hrid, buff] of Object.entries(entities)) {
      if (buff.isCombat) {
        combatBuffs.push(hrid)
      } else {
        nonCombatBuffs.push(hrid)
      }
      
      if (hrid.includes('_level')) {
        levelBuffs.push(hrid)
      }
      if (hrid.includes('_resistance')) {
        resistanceBuffs.push(hrid)
      }
      if (hrid.includes('_amplify')) {
        amplifyBuffs.push(hrid)
      }
      if (hrid.includes('_thorns')) {
        thornsBuffs.push(hrid)
      }
      
      const buffName = hrid.split('/').pop()!
      if (['accuracy', 'armor', 'damage', 'evasion', 'critical_rate', 'critical_damage', 
           'attack_speed', 'cast_speed', 'hp_regen', 'mp_regen'].includes(buffName)) {
        statBuffs.push(hrid)
      }
    }
    
    // Sort for consistent output
    combatBuffs.sort()
    nonCombatBuffs.sort()
    levelBuffs.sort()
    resistanceBuffs.sort()
    amplifyBuffs.sort()
    thornsBuffs.sort()
    statBuffs.sort()

    return [
      `/**
 * Get the display name of a buff type
 */
export function getBuffTypeName(hrid: BuffTypeHrid): string {
  return BUFFTYPES[hrid].name
}`,

      `/**
 * Get the buff description (positive effect)
 */
export function getBuffDescription(hrid: BuffTypeHrid): string {
  return BUFFTYPES[hrid].description
}`,

      `/**
 * Get the debuff description (negative effect)
 */
export function getDebuffDescription(hrid: BuffTypeHrid): string {
  return BUFFTYPES[hrid].debuffDescription
}`,

      `/**
 * Check if a buff type is combat-related
 */
export function isCombatBuff(hrid: BuffTypeHrid): boolean {
  return BUFFTYPES[hrid].isCombat
}`,

      `/**
 * Check if a buff type is non-combat (skilling)
 */
export function isNonCombatBuff(hrid: BuffTypeHrid): boolean {
  return !BUFFTYPES[hrid].isCombat
}`,

      `/**
 * Check if a buff type is a level buff
 */
export function isLevelBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_level')
}`,

      `/**
 * Check if a buff type is a resistance buff
 */
export function isResistanceBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_resistance')
}`,

      `/**
 * Check if a buff type is an amplify buff
 */
export function isAmplifyBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_amplify')
}`,

      `/**
 * Check if a buff type is a thorns buff
 */
export function isThornsBuff(hrid: BuffTypeHrid): boolean {
  return hrid.includes('_thorns')
}`,

      `/**
 * Get all combat buff types
 */
export function getCombatBuffTypes(): readonly string[] {
  return ${JSON.stringify(combatBuffs, null, 2)}
}`,

      `/**
 * Get all non-combat (skilling) buff types
 */
export function getNonCombatBuffTypes(): readonly string[] {
  return ${JSON.stringify(nonCombatBuffs, null, 2)}
}`,

      `/**
 * Get all level buff types
 */
export function getLevelBuffTypes(): readonly string[] {
  return ${JSON.stringify(levelBuffs, null, 2)}
}`,

      `/**
 * Get all resistance buff types
 */
export function getResistanceBuffTypes(): readonly string[] {
  return ${JSON.stringify(resistanceBuffs, null, 2)}
}`,

      `/**
 * Get all amplify buff types
 */
export function getAmplifyBuffTypes(): readonly string[] {
  return ${JSON.stringify(amplifyBuffs, null, 2)}
}`,

      `/**
 * Get all stat buff types (accuracy, armor, damage, etc.)
 */
export function getStatBuffTypes(): readonly string[] {
  return ${JSON.stringify(statBuffs, null, 2)}
}`,

      `/**
 * Get all thorns buff types
 */
export function getThornsBuffTypes(): readonly string[] {
  return ${JSON.stringify(thornsBuffs, null, 2)}
}`,

      `/**
 * Get all buff types sorted by their sortIndex
 */
export function getBuffTypesSorted(): BuffType[] {
  return Object.values(BUFFTYPES).sort((a, b) => a.sortIndex - b.sortIndex)
}`,

      `// Export grouped constants for easier access
export const COMBAT_BUFFTYPES = ${JSON.stringify(combatBuffs, null, 2)} as const`,

      `export const NON_COMBAT_BUFFTYPES = ${JSON.stringify(nonCombatBuffs, null, 2)} as const`,

      `export const LEVEL_BUFFTYPES = ${JSON.stringify(levelBuffs, null, 2)} as const`,

      `export const RESISTANCE_BUFFTYPES = ${JSON.stringify(resistanceBuffs, null, 2)} as const`,

      `export const AMPLIFY_BUFFTYPES = ${JSON.stringify(amplifyBuffs, null, 2)} as const`,

      `export const STAT_BUFFTYPES = ${JSON.stringify(statBuffs, null, 2)} as const`,

      `export const THORNS_BUFFTYPES = ${JSON.stringify(thornsBuffs, null, 2)} as const`
    ]
  }
}