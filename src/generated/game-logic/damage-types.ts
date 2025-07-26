/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:22.932Z
 */

import { z } from 'zod'
import { DamageTypeHridEnum, DamageTypeSchema, type DamageType } from '../schemas/zod/damage-types.js'
// Re-export HRID enum from schema
export { DamageTypeHridEnum } from '../schemas/zod/damage-types.js'
// Re-export schema
export { DamageTypeSchema } from '../schemas/zod/damage-types.js'

// Type definitions
type DamageTypeHrid = z.infer<typeof DamageTypeHridEnum>

// Data
export const DAMAGETYPES: Record<DamageTypeHrid, DamageType> = {
  '/damage_types/fire': {
    "hrid": "/damage_types/fire",
    "name": "Fire",
    "sortIndex": 4
  },
  '/damage_types/nature': {
    "hrid": "/damage_types/nature",
    "name": "Nature",
    "sortIndex": 3
  },
  '/damage_types/physical': {
    "hrid": "/damage_types/physical",
    "name": "Physical",
    "sortIndex": 1
  },
  '/damage_types/water': {
    "hrid": "/damage_types/water",
    "name": "Water",
    "sortIndex": 2
  }
} as const satisfies Record<DamageTypeHrid, DamageType>

// HRID utilities

/**
 * Check if a damagetype HRID is valid
 */
export function validateDamageTypeHrid(hrid: string): hrid is DamageTypeHrid {
  return hrid in DAMAGETYPES
}

/**
 * Check if a damagetype exists
 */
export function damagetypeExists(hrid: string): boolean {
  return hrid in DAMAGETYPES
}

// Getter functions
export function getDamageType(hrid: DamageTypeHrid): DamageType {
  return DAMAGETYPES[hrid]
}

export function getAllDamageTypes(): DamageType[] {
  return Object.values(DAMAGETYPES)
}

export function getDamageTypesSortedByIndex(): DamageType[] {
  return getAllDamageTypes().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { DamageType }
export type { DamageTypeHrid }
export type DamageTypeId = keyof typeof DAMAGETYPES
export type DamageTypeData = typeof DAMAGETYPES

/**
 * Physical damage types
 */
export const PHYSICAL_DAMAGE_TYPES = [
  "/damage_types/physical"
] as const

/**
 * Elemental damage types (fire, water, nature)
 */
export const ELEMENTAL_DAMAGE_TYPES = [
  "/damage_types/fire",
  "/damage_types/water",
  "/damage_types/nature"
] as const

/**
 * Damage types organized by category
 */
export const DAMAGE_TYPES_BY_CATEGORY = {
	physical: PHYSICAL_DAMAGE_TYPES,
	elemental: ELEMENTAL_DAMAGE_TYPES
} as const

/**
 * Check if a damage type is physical
 */
export function isPhysicalDamageType(hrid: DamageTypeHrid): boolean {
	return PHYSICAL_DAMAGE_TYPES.includes(hrid as any)
}

/**
 * Check if a damage type is elemental
 */
export function isElementalDamageType(hrid: DamageTypeHrid): boolean {
	return ELEMENTAL_DAMAGE_TYPES.includes(hrid as any)
}

/**
 * Get all damage types sorted by their sort index
 */
export function getDamageTypesSorted(): DamageType[] {
	return Object.values(DAMAGETYPES).sort((a, b) => a.sortIndex - b.sortIndex)
}

/**
 * Get the elemental damage type resistance stat name
 */
export function getDamageTypeResistanceStat(damageTypeHrid: DamageTypeHrid): string | null {
	switch (damageTypeHrid) {
		case '/damage_types/fire':
			return 'fireResistance'
		case '/damage_types/water':
			return 'waterResistance'
		case '/damage_types/nature':
			return 'natureResistance'
		case '/damage_types/physical':
			return 'physicalResistance'
		default:
			return null
	}
}

/**
 * Get the elemental damage type amplify stat name
 */
export function getDamageTypeAmplifyStat(damageTypeHrid: DamageTypeHrid): string | null {
	switch (damageTypeHrid) {
		case '/damage_types/fire':
			return 'fireAmplify'
		case '/damage_types/water':
			return 'waterAmplify'
		case '/damage_types/nature':
			return 'natureAmplify'
		default:
			return null
	}
}