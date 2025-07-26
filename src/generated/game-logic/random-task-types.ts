/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.186Z
 */

import { z } from 'zod'
import { RandomTaskTypeHridEnum, RandomTaskTypeSchema, type RandomTaskType } from '../schemas/zod/random-task-types.js'
// Re-export HRID enum from schema
export { RandomTaskTypeHridEnum } from '../schemas/zod/random-task-types.js'
// Re-export schema
export { RandomTaskTypeSchema } from '../schemas/zod/random-task-types.js'

// Type definitions
type RandomTaskTypeHrid = z.infer<typeof RandomTaskTypeHridEnum>

// Data
export const RANDOMTASKTYPES: Record<RandomTaskTypeHrid, RandomTaskType> = {
  '/random_task_types/brewing': {
    "hrid": "/random_task_types/brewing",
    "isCombat": false,
    "skillHrid": "/skills/brewing",
    "sortIndex": 8,
    "name": "Brewing"
  },
  '/random_task_types/cheesesmithing': {
    "hrid": "/random_task_types/cheesesmithing",
    "isCombat": false,
    "skillHrid": "/skills/cheesesmithing",
    "sortIndex": 4,
    "name": "Cheesesmithing"
  },
  '/random_task_types/combat': {
    "hrid": "/random_task_types/combat",
    "isCombat": true,
    "skillHrid": "",
    "sortIndex": 9,
    "name": "Combat"
  },
  '/random_task_types/cooking': {
    "hrid": "/random_task_types/cooking",
    "isCombat": false,
    "skillHrid": "/skills/cooking",
    "sortIndex": 7,
    "name": "Cooking"
  },
  '/random_task_types/crafting': {
    "hrid": "/random_task_types/crafting",
    "isCombat": false,
    "skillHrid": "/skills/crafting",
    "sortIndex": 5,
    "name": "Crafting"
  },
  '/random_task_types/foraging': {
    "hrid": "/random_task_types/foraging",
    "isCombat": false,
    "skillHrid": "/skills/foraging",
    "sortIndex": 2,
    "name": "Foraging"
  },
  '/random_task_types/milking': {
    "hrid": "/random_task_types/milking",
    "isCombat": false,
    "skillHrid": "/skills/milking",
    "sortIndex": 1,
    "name": "Milking"
  },
  '/random_task_types/tailoring': {
    "hrid": "/random_task_types/tailoring",
    "isCombat": false,
    "skillHrid": "/skills/tailoring",
    "sortIndex": 6,
    "name": "Tailoring"
  },
  '/random_task_types/woodcutting': {
    "hrid": "/random_task_types/woodcutting",
    "isCombat": false,
    "skillHrid": "/skills/woodcutting",
    "sortIndex": 3,
    "name": "Woodcutting"
  }
} as const satisfies Record<RandomTaskTypeHrid, RandomTaskType>

// HRID utilities

/**
 * Check if a randomtasktype HRID is valid
 */
export function validateRandomTaskTypeHrid(hrid: string): hrid is RandomTaskTypeHrid {
  return hrid in RANDOMTASKTYPES
}

/**
 * Check if a randomtasktype exists
 */
export function randomtasktypeExists(hrid: string): boolean {
  return hrid in RANDOMTASKTYPES
}

// Getter functions
export function getRandomTaskType(hrid: RandomTaskTypeHrid): RandomTaskType {
  return RANDOMTASKTYPES[hrid]
}

export function getAllRandomTaskTypes(): RandomTaskType[] {
  return Object.values(RANDOMTASKTYPES)
}

export function getRandomTaskTypesSortedByIndex(): RandomTaskType[] {
  return getAllRandomTaskTypes().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { RandomTaskType }
export type { RandomTaskTypeHrid }
export type RandomTaskTypeId = keyof typeof RANDOMTASKTYPES
export type RandomTaskTypeData = typeof RANDOMTASKTYPES

// Group random task types by category

export const COMBAT_TASK_TYPES = Object.values(RANDOMTASKTYPES).filter(t => t.isCombat)

export const SKILLING_TASK_TYPES = Object.values(RANDOMTASKTYPES).filter(t => !t.isCombat)



// Utility functions

export function isRandomTaskTypeCombat(hrid: RandomTaskTypeHrid): boolean {

  return RANDOMTASKTYPES[hrid].isCombat

}



export function getRandomTaskTypeSkill(hrid: RandomTaskTypeHrid): string {

  return RANDOMTASKTYPES[hrid].skillHrid

}



export function getRandomTaskTypesBySkill(skillHrid: string): RandomTaskType[] {

  return Object.values(RANDOMTASKTYPES).filter(t => t.skillHrid === skillHrid)

}



export function getCombatTaskTypes(): RandomTaskType[] {

  return COMBAT_TASK_TYPES

}



export function getSkillingTaskTypes(): RandomTaskType[] {

  return SKILLING_TASK_TYPES

}