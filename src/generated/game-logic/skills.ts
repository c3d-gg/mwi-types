/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.244Z
 */

import { z } from 'zod'
import { SkillHridEnum, SkillSchema, type Skill } from '../schemas/zod/skills.js'
// Re-export HRID enum from schema
export { SkillHridEnum } from '../schemas/zod/skills.js'
// Re-export schema
export { SkillSchema } from '../schemas/zod/skills.js'

// Type definitions
type SkillHrid = z.infer<typeof SkillHridEnum>

// Data
export const SKILLS: Record<SkillHrid, Skill> = {
  '/skills/alchemy': {
    "hrid": "/skills/alchemy",
    "name": "Alchemy",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 10
  },
  '/skills/attack': {
    "hrid": "/skills/attack",
    "name": "Attack",
    "isSkilling": false,
    "isCombat": true,
    "sortIndex": 14
  },
  '/skills/brewing': {
    "hrid": "/skills/brewing",
    "name": "Brewing",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 9
  },
  '/skills/cheesesmithing': {
    "hrid": "/skills/cheesesmithing",
    "name": "Cheesesmithing",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 5
  },
  '/skills/cooking': {
    "hrid": "/skills/cooking",
    "name": "Cooking",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 8
  },
  '/skills/crafting': {
    "hrid": "/skills/crafting",
    "name": "Crafting",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 6
  },
  '/skills/defense': {
    "hrid": "/skills/defense",
    "name": "Defense",
    "isSkilling": false,
    "isCombat": true,
    "sortIndex": 16
  },
  '/skills/enhancing': {
    "hrid": "/skills/enhancing",
    "name": "Enhancing",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 11
  },
  '/skills/foraging': {
    "hrid": "/skills/foraging",
    "name": "Foraging",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 3
  },
  '/skills/intelligence': {
    "hrid": "/skills/intelligence",
    "name": "Intelligence",
    "isSkilling": false,
    "isCombat": true,
    "sortIndex": 13
  },
  '/skills/magic': {
    "hrid": "/skills/magic",
    "name": "Magic",
    "isSkilling": false,
    "isCombat": true,
    "sortIndex": 18
  },
  '/skills/milking': {
    "hrid": "/skills/milking",
    "name": "Milking",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 2
  },
  '/skills/power': {
    "hrid": "/skills/power",
    "name": "Power",
    "isSkilling": false,
    "isCombat": true,
    "sortIndex": 15
  },
  '/skills/ranged': {
    "hrid": "/skills/ranged",
    "name": "Ranged",
    "isSkilling": false,
    "isCombat": true,
    "sortIndex": 17
  },
  '/skills/stamina': {
    "hrid": "/skills/stamina",
    "name": "Stamina",
    "isSkilling": false,
    "isCombat": true,
    "sortIndex": 12
  },
  '/skills/tailoring': {
    "hrid": "/skills/tailoring",
    "name": "Tailoring",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 7
  },
  '/skills/total_level': {
    "hrid": "/skills/total_level",
    "name": "Total Level",
    "isSkilling": false,
    "isCombat": false,
    "sortIndex": 1
  },
  '/skills/woodcutting': {
    "hrid": "/skills/woodcutting",
    "name": "Woodcutting",
    "isSkilling": true,
    "isCombat": false,
    "sortIndex": 4
  }
} as const satisfies Record<SkillHrid, Skill>

// HRID utilities

/**
 * Check if a skill HRID is valid
 */
export function validateSkillHrid(hrid: string): hrid is SkillHrid {
  return hrid in SKILLS
}

/**
 * Check if a skill exists
 */
export function skillExists(hrid: string): boolean {
  return hrid in SKILLS
}

// Getter functions
export function getSkill(hrid: SkillHrid): Skill {
  return SKILLS[hrid]
}

export function getAllSkills(): Skill[] {
  return Object.values(SKILLS)
}

export function getSkillsSortedByIndex(): Skill[] {
  return getAllSkills().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { Skill }
export type { SkillHrid }
export type SkillId = keyof typeof SKILLS
export type SkillData = typeof SKILLS

/**
 * Combat skills (used for combat abilities and equipment)
 */
export const COMBAT_SKILLS = [
  "/skills/attack",
  "/skills/defense",
  "/skills/intelligence",
  "/skills/magic",
  "/skills/power",
  "/skills/ranged",
  "/skills/stamina"
] as const

/**
 * Skilling skills (used for non-combat actions)
 */
export const SKILLING_SKILLS = [
  "/skills/alchemy",
  "/skills/brewing",
  "/skills/cheesesmithing",
  "/skills/cooking",
  "/skills/crafting",
  "/skills/enhancing",
  "/skills/foraging",
  "/skills/milking",
  "/skills/tailoring",
  "/skills/woodcutting"
] as const

/**
 * Skills organized by type
 */
export const SKILLS_BY_TYPE = {
	combat: COMBAT_SKILLS,
	skilling: SKILLING_SKILLS
} as const

/**
 * Get all combat skills
 * @returns Array of skill HRIDs that are combat skills
 * @example
 * ```ts
 * const combatSkills = getCombatSkills()
 * // ['/skills/attack', '/skills/defense', '/skills/magic', ...]
 * ```
 */
export function getCombatSkills(): readonly string[] {
	return COMBAT_SKILLS
}

/**
 * Get all skilling (non-combat) skills
 * @returns Array of skill HRIDs that are skilling skills
 * @example
 * ```ts
 * const skillingSkills = getSkillingSkills()
 * // ['/skills/woodcutting', '/skills/mining', '/skills/cooking', ...]
 * ```
 */
export function getSkillingSkills(): readonly string[] {
	return SKILLING_SKILLS
}

/**
 * Check if a skill is a combat skill
 * @param skillHrid - The skill HRID to check
 * @returns True if the skill is a combat skill, false otherwise
 * @example
 * ```ts
 * if (isCombatSkill('/skills/attack')) {
 *   console.log('This is a combat skill')
 * }
 * ```
 */
export function isCombatSkill(skillHrid: string): boolean {
	const skill = SKILLS[skillHrid as SkillHrid]
	return skill?.isCombat ?? false
}

/**
 * Check if a skill is a skilling (non-combat) skill
 * @param skillHrid - The skill HRID to check
 * @returns True if the skill is a skilling skill, false otherwise
 * @example
 * ```ts
 * if (isSkillingSkill('/skills/woodcutting')) {
 *   console.log('This is a skilling skill')
 * }
 * ```
 */
export function isSkillingSkill(skillHrid: string): boolean {
	const skill = SKILLS[skillHrid as SkillHrid]
	return skill?.isSkilling ?? false
}