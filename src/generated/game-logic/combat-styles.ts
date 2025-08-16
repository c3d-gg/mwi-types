/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.509Z
 */

import { z } from 'zod'
import { CombatStyleHridEnum, CombatStyleSchema, type CombatStyle } from '../schemas/zod/combat-styles.js'
// Re-export HRID enum from schema
export { CombatStyleHridEnum } from '../schemas/zod/combat-styles.js'
// Re-export schema
export { CombatStyleSchema } from '../schemas/zod/combat-styles.js'

// Type definitions
type CombatStyleHrid = z.infer<typeof CombatStyleHridEnum>

// Data
export const COMBATSTYLES: Record<CombatStyleHrid, CombatStyle> = {
  '/combat_styles/heal': {
    "hrid": "/combat_styles/heal",
    "name": "Heal",
    "sortIndex": 6
  },
  '/combat_styles/magic': {
    "hrid": "/combat_styles/magic",
    "name": "Magic",
    "sortIndex": 5
  },
  '/combat_styles/ranged': {
    "hrid": "/combat_styles/ranged",
    "name": "Ranged",
    "sortIndex": 4
  },
  '/combat_styles/slash': {
    "hrid": "/combat_styles/slash",
    "name": "Slash",
    "sortIndex": 2
  },
  '/combat_styles/smash': {
    "hrid": "/combat_styles/smash",
    "name": "Smash",
    "sortIndex": 3
  },
  '/combat_styles/stab': {
    "hrid": "/combat_styles/stab",
    "name": "Stab",
    "sortIndex": 1
  }
} as const satisfies Record<CombatStyleHrid, CombatStyle>

// HRID utilities

/**
 * Check if a combatstyle HRID is valid
 */
export function validateCombatStyleHrid(hrid: string): hrid is CombatStyleHrid {
  return hrid in COMBATSTYLES
}

/**
 * Check if a combatstyle exists
 */
export function combatstyleExists(hrid: string): boolean {
  return hrid in COMBATSTYLES
}

// Getter functions
export function getCombatStyle(hrid: CombatStyleHrid): CombatStyle {
  return COMBATSTYLES[hrid]
}

export function getAllCombatStyles(): CombatStyle[] {
  return Object.values(COMBATSTYLES)
}

export function getCombatStylesSortedByIndex(): CombatStyle[] {
  return getAllCombatStyles().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { CombatStyle }
export type { CombatStyleHrid }
export type CombatStyleId = keyof typeof COMBATSTYLES
export type CombatStyleData = typeof COMBATSTYLES

/**
 * Melee combat styles
 */
export const MELEE_COMBAT_STYLES = [
  "/combat_styles/slash",
  "/combat_styles/stab",
  "/combat_styles/smash"
] as const

/**
 * Magic combat styles
 */
export const MAGIC_COMBAT_STYLES = [
  "/combat_styles/magic"
] as const

/**
 * Ranged combat styles
 */
export const RANGED_COMBAT_STYLES = [
  "/combat_styles/ranged"
] as const

/**
 * Healing combat styles
 */
export const HEAL_COMBAT_STYLES = [
  "/combat_styles/heal"
] as const

/**
 * Combat styles organized by category
 */
export const COMBAT_STYLES_BY_CATEGORY = {
	melee: MELEE_COMBAT_STYLES,
	magic: MAGIC_COMBAT_STYLES,
	ranged: RANGED_COMBAT_STYLES,
	heal: HEAL_COMBAT_STYLES
} as const

/**
 * Check if a combat style is melee
 */
export function isMeleeCombatStyle(hrid: CombatStyleHrid): boolean {
	return MELEE_COMBAT_STYLES.includes(hrid as any)
}

/**
 * Check if a combat style is magic
 */
export function isMagicCombatStyle(hrid: CombatStyleHrid): boolean {
	return MAGIC_COMBAT_STYLES.includes(hrid as any)
}

/**
 * Check if a combat style is ranged
 */
export function isRangedCombatStyle(hrid: CombatStyleHrid): boolean {
	return RANGED_COMBAT_STYLES.includes(hrid as any)
}

/**
 * Check if a combat style is healing
 */
export function isHealCombatStyle(hrid: CombatStyleHrid): boolean {
	return HEAL_COMBAT_STYLES.includes(hrid as any)
}

/**
 * Get all combat styles sorted by their sort index
 */
export function getCombatStylesSorted(): CombatStyle[] {
	return Object.values(COMBATSTYLES).sort((a, b) => a.sortIndex - b.sortIndex)
}