/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.711Z
 */

import { z } from 'zod'
import { LeaderboardCategoryHridEnum, LeaderboardCategorySchema, type LeaderboardCategory } from '../schemas/zod/leaderboard-categories.js'
// Re-export HRID enum from schema
export { LeaderboardCategoryHridEnum } from '../schemas/zod/leaderboard-categories.js'
// Re-export schema
export { LeaderboardCategorySchema } from '../schemas/zod/leaderboard-categories.js'

// Type definitions
type LeaderboardCategoryHrid = z.infer<typeof LeaderboardCategoryHridEnum>

// Data
export const LEADERBOARDCATEGORIES: Record<LeaderboardCategoryHrid, LeaderboardCategory> = {
  'alchemy': {
    "hrid": "alchemy",
    "name": "Alchemy",
    "skillHrid": "/skills/alchemy",
    "isGuild": false,
    "sortIndex": 10
  },
  'attack': {
    "hrid": "attack",
    "name": "Attack",
    "skillHrid": "/skills/attack",
    "isGuild": false,
    "sortIndex": 14
  },
  'brewing': {
    "hrid": "brewing",
    "name": "Brewing",
    "skillHrid": "/skills/brewing",
    "isGuild": false,
    "sortIndex": 9
  },
  'cheesesmithing': {
    "hrid": "cheesesmithing",
    "name": "Cheesesmithing",
    "skillHrid": "/skills/cheesesmithing",
    "isGuild": false,
    "sortIndex": 5
  },
  'cooking': {
    "hrid": "cooking",
    "name": "Cooking",
    "skillHrid": "/skills/cooking",
    "isGuild": false,
    "sortIndex": 8
  },
  'crafting': {
    "hrid": "crafting",
    "name": "Crafting",
    "skillHrid": "/skills/crafting",
    "isGuild": false,
    "sortIndex": 6
  },
  'defense': {
    "hrid": "defense",
    "name": "Defense",
    "skillHrid": "/skills/defense",
    "isGuild": false,
    "sortIndex": 16
  },
  'enhancing': {
    "hrid": "enhancing",
    "name": "Enhancing",
    "skillHrid": "/skills/enhancing",
    "isGuild": false,
    "sortIndex": 11
  },
  'fame_points': {
    "hrid": "fame_points",
    "name": "Fame Points",
    "skillHrid": "",
    "isGuild": false,
    "sortIndex": 20
  },
  'foraging': {
    "hrid": "foraging",
    "name": "Foraging",
    "skillHrid": "/skills/foraging",
    "isGuild": false,
    "sortIndex": 3
  },
  'guild': {
    "hrid": "guild",
    "name": "Guild",
    "skillHrid": "",
    "isGuild": true,
    "sortIndex": 21
  },
  'intelligence': {
    "hrid": "intelligence",
    "name": "Intelligence",
    "skillHrid": "/skills/intelligence",
    "isGuild": false,
    "sortIndex": 13
  },
  'magic': {
    "hrid": "magic",
    "name": "Magic",
    "skillHrid": "/skills/magic",
    "isGuild": false,
    "sortIndex": 18
  },
  'milking': {
    "hrid": "milking",
    "name": "Milking",
    "skillHrid": "/skills/milking",
    "isGuild": false,
    "sortIndex": 2
  },
  'power': {
    "hrid": "power",
    "name": "Power",
    "skillHrid": "/skills/power",
    "isGuild": false,
    "sortIndex": 15
  },
  'ranged': {
    "hrid": "ranged",
    "name": "Ranged",
    "skillHrid": "/skills/ranged",
    "isGuild": false,
    "sortIndex": 17
  },
  'stamina': {
    "hrid": "stamina",
    "name": "Stamina",
    "skillHrid": "/skills/stamina",
    "isGuild": false,
    "sortIndex": 12
  },
  'tailoring': {
    "hrid": "tailoring",
    "name": "Tailoring",
    "skillHrid": "/skills/tailoring",
    "isGuild": false,
    "sortIndex": 7
  },
  'task_points': {
    "hrid": "task_points",
    "name": "Task Points",
    "skillHrid": "",
    "isGuild": false,
    "sortIndex": 19
  },
  'total_level': {
    "hrid": "total_level",
    "name": "Total Level",
    "skillHrid": "/skills/total_level",
    "isGuild": false,
    "sortIndex": 1
  },
  'woodcutting': {
    "hrid": "woodcutting",
    "name": "Woodcutting",
    "skillHrid": "/skills/woodcutting",
    "isGuild": false,
    "sortIndex": 4
  }
} as const satisfies Record<LeaderboardCategoryHrid, LeaderboardCategory>

// HRID utilities

/**
 * Check if a leaderboardcategory HRID is valid
 */
export function validateLeaderboardCategoryHrid(hrid: string): hrid is LeaderboardCategoryHrid {
  return hrid in LEADERBOARDCATEGORIES
}

/**
 * Check if a leaderboardcategory exists
 */
export function leaderboardcategoryExists(hrid: string): boolean {
  return hrid in LEADERBOARDCATEGORIES
}

// Getter functions
export function getLeaderboardCategory(hrid: LeaderboardCategoryHrid): LeaderboardCategory {
  return LEADERBOARDCATEGORIES[hrid]
}

export function getAllLEADERBOARDCATEGORIES(): LeaderboardCategory[] {
  return Object.values(LEADERBOARDCATEGORIES)
}

export function getLEADERBOARDCATEGORIESSortedByIndex(): LeaderboardCategory[] {
  return getAllLEADERBOARDCATEGORIES().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { LeaderboardCategory }
export type { LeaderboardCategoryHrid }
export type LeaderboardCategoryId = keyof typeof LEADERBOARDCATEGORIES
export type LeaderboardCategoryData = typeof LEADERBOARDCATEGORIES

export const GUILD_LEADERBOARD_CATEGORIES = Object.values(LEADERBOARDCATEGORIES).filter(category => category.isGuild).map(category => category.hrid)

export const PLAYER_LEADERBOARD_CATEGORIES = Object.values(LEADERBOARDCATEGORIES).filter(category => !category.isGuild).map(category => category.hrid)

export const SKILL_LEADERBOARD_CATEGORIES = Object.values(LEADERBOARDCATEGORIES).filter(category => category.skillHrid !== '').map(category => category.hrid)

export const SPECIAL_LEADERBOARD_CATEGORIES = Object.values(LEADERBOARDCATEGORIES).filter(category => category.skillHrid === '').map(category => category.hrid)

export const LEADERBOARD_CATEGORIES_BY_SKILL = Object.values(LEADERBOARDCATEGORIES)
  .filter(category => category.skillHrid !== '')
  .reduce((acc, category) => {
    if (!acc[category.skillHrid]) {
      acc[category.skillHrid] = []
    }
    acc[category.skillHrid]!.push(category.hrid)
    return acc
  }, {} as Record<string, LeaderboardCategoryHrid[]>) as Record<string, readonly LeaderboardCategoryHrid[]>


export function isGuildLeaderboardCategory(categoryHrid: LeaderboardCategoryHrid): boolean {
  return LEADERBOARDCATEGORIES[categoryHrid].isGuild
}

export function isSkillLeaderboardCategory(categoryHrid: LeaderboardCategoryHrid): boolean {
  return LEADERBOARDCATEGORIES[categoryHrid].skillHrid !== ''
}

export function getLeaderboardCategorySkill(categoryHrid: LeaderboardCategoryHrid): string {
  return LEADERBOARDCATEGORIES[categoryHrid].skillHrid
}

export function getLeaderboardCategoriesSorted(): LeaderboardCategory[] {
  return Object.values(LEADERBOARDCATEGORIES).sort((a, b) => a.sortIndex - b.sortIndex)
}

export function getLeaderboardCategoriesForSkill(skillHrid: string): LeaderboardCategory[] {
  return Object.values(LEADERBOARDCATEGORIES).filter(category => category.skillHrid === skillHrid)
}

export function getSkillLeaderboardCategories(): LeaderboardCategory[] {
  return Object.values(LEADERBOARDCATEGORIES).filter(category => category.skillHrid !== '')
}

export function getSpecialLeaderboardCategories(): LeaderboardCategory[] {
  return Object.values(LEADERBOARDCATEGORIES).filter(category => category.skillHrid === '')
}

export function getCombatLeaderboardCategories(): LeaderboardCategory[] {
  const combatSkills = ['/skills/attack', '/skills/defense', '/skills/power', '/skills/ranged', '/skills/magic', '/skills/intelligence', '/skills/stamina']
  return Object.values(LEADERBOARDCATEGORIES).filter(category => combatSkills.includes(category.skillHrid))
}

export function getSkillingLeaderboardCategories(): LeaderboardCategory[] {
  const skillingSkills = ['/skills/foraging', '/skills/milking', '/skills/woodcutting', '/skills/cheesesmithing', '/skills/crafting', '/skills/tailoring', '/skills/cooking', '/skills/brewing', '/skills/alchemy', '/skills/enhancing']
  return Object.values(LEADERBOARDCATEGORIES).filter(category => skillingSkills.includes(category.skillHrid))
}

export function getLeaderboardCategoryDisplayOrder(): LeaderboardCategory[] {
  return getLeaderboardCategoriesSorted()
}
