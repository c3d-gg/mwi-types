/**
 * Shared types for generated game logic files
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.985Z
 */

// Branded types for extra type safety
export type ItemHrid = string & { readonly __brand: 'ItemHrid' }
export type ActionHrid = string & { readonly __brand: 'ActionHrid' }
export type SkillHrid = string & { readonly __brand: 'SkillHrid' }

// Type constructors
export function ItemHridBrand(hrid: string): ItemHrid {
  return hrid as ItemHrid
}

export function ActionHridBrand(hrid: string): ActionHrid {
  return hrid as ActionHrid
}

// Common interfaces
export interface LevelRequirement {
  skillHrid: SkillHrid
  level: number
}

export interface GeneratedItem {
  hrid: ItemHrid
  name: string
  sortIndex: number
  categoryHrid: string
  sellPrice: number
  itemLevel?: number
  isTradable?: boolean
  equipmentDetail?: GeneratedEquipmentStats
  consumableDetail?: GeneratedConsumableEffects
}

export interface GeneratedEquipmentStats {
  type: string
  levelRequirements: LevelRequirement[]
  [key: string]: any
}

export interface GeneratedConsumableEffects {
  cooldownDuration: number
  usableInActionTypeMap?: Record<string, boolean>
  buffs?: any[]
  [key: string]: any
}

export interface GeneratedAction {
  hrid: ActionHrid
  name: string
  type: string
  category: string
  categoryHrid: string
  function?: string
  levelRequirement: LevelRequirement
  baseTimeCost: number
  experienceGain: {
    value: number
  }
  outputItems?: Array<{ itemHrid: ItemHrid; count: number }>
  inputItems?: Array<{ itemHrid: ItemHrid; count: number }>
}
