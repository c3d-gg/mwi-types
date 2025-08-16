/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.611Z
 */

import { z } from 'zod'
import { CommunityBuffTypeHridEnum, CommunityBuffTypeSchema, type CommunityBuffType } from '../schemas/zod/community-buff-types.js'
// Re-export HRID enum from schema
export { CommunityBuffTypeHridEnum } from '../schemas/zod/community-buff-types.js'
// Re-export schema
export { CommunityBuffTypeSchema } from '../schemas/zod/community-buff-types.js'

// Type definitions
type CommunityBuffTypeHrid = z.infer<typeof CommunityBuffTypeHridEnum>

// Data
export const COMMUNITYBUFFTYPES: Record<CommunityBuffTypeHrid, CommunityBuffType> = {
  '/community_buff_types/combat_drop_quantity': {
    "hrid": "/community_buff_types/combat_drop_quantity",
    "name": "Combat Drop Quantity",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "buff": {
      "uniqueHrid": "/buff_uniques/combat_community_buff",
      "typeHrid": "/buff_types/combat_drop_quantity",
      "ratioBoost": 0,
      "ratioBoostLevelBonus": 0,
      "flatBoost": 0.2,
      "flatBoostLevelBonus": 0.005,
      "startTime": "0001-01-01T00:00:00Z",
      "duration": 0
    },
    "description": "",
    "cowbellCost": 10,
    "sortIndex": 5
  },
  '/community_buff_types/enhancing_speed': {
    "hrid": "/community_buff_types/enhancing_speed",
    "name": "Enhancing Speed",
    "usableInActionTypeMap": {
      "/action_types/enhancing": true
    },
    "buff": {
      "uniqueHrid": "/buff_uniques/enhancing_community_buff",
      "typeHrid": "/buff_types/action_speed",
      "ratioBoost": 0,
      "ratioBoostLevelBonus": 0,
      "flatBoost": 0.2,
      "flatBoostLevelBonus": 0.005,
      "startTime": "0001-01-01T00:00:00Z",
      "duration": 0
    },
    "description": "",
    "cowbellCost": 10,
    "sortIndex": 4
  },
  '/community_buff_types/experience': {
    "hrid": "/community_buff_types/experience",
    "name": "Experience",
    "usableInActionTypeMap": {
      "/action_types/alchemy": true,
      "/action_types/brewing": true,
      "/action_types/cheesesmithing": true,
      "/action_types/combat": true,
      "/action_types/cooking": true,
      "/action_types/crafting": true,
      "/action_types/enhancing": true,
      "/action_types/foraging": true,
      "/action_types/milking": true,
      "/action_types/tailoring": true,
      "/action_types/woodcutting": true
    },
    "buff": {
      "uniqueHrid": "/buff_uniques/experience_community_buff",
      "typeHrid": "/buff_types/wisdom",
      "ratioBoost": 0,
      "ratioBoostLevelBonus": 0,
      "flatBoost": 0.2,
      "flatBoostLevelBonus": 0.005,
      "startTime": "0001-01-01T00:00:00Z",
      "duration": 0
    },
    "description": "",
    "cowbellCost": 20,
    "sortIndex": 1
  },
  '/community_buff_types/gathering_quantity': {
    "hrid": "/community_buff_types/gathering_quantity",
    "name": "Gathering Quantity",
    "usableInActionTypeMap": {
      "/action_types/foraging": true,
      "/action_types/milking": true,
      "/action_types/woodcutting": true
    },
    "buff": {
      "uniqueHrid": "/buff_uniques/gathering_community_buff",
      "typeHrid": "/buff_types/gathering",
      "ratioBoost": 0,
      "ratioBoostLevelBonus": 0,
      "flatBoost": 0.2,
      "flatBoostLevelBonus": 0.005,
      "startTime": "0001-01-01T00:00:00Z",
      "duration": 0
    },
    "description": "",
    "cowbellCost": 10,
    "sortIndex": 2
  },
  '/community_buff_types/production_efficiency': {
    "hrid": "/community_buff_types/production_efficiency",
    "name": "Production Efficiency",
    "usableInActionTypeMap": {
      "/action_types/alchemy": true,
      "/action_types/brewing": true,
      "/action_types/cheesesmithing": true,
      "/action_types/cooking": true,
      "/action_types/crafting": true,
      "/action_types/tailoring": true
    },
    "buff": {
      "uniqueHrid": "/buff_uniques/production_community_buff",
      "typeHrid": "/buff_types/efficiency",
      "ratioBoost": 0,
      "ratioBoostLevelBonus": 0,
      "flatBoost": 0.14,
      "flatBoostLevelBonus": 0.003,
      "startTime": "0001-01-01T00:00:00Z",
      "duration": 0
    },
    "description": "",
    "cowbellCost": 10,
    "sortIndex": 3
  }
} as const satisfies Record<CommunityBuffTypeHrid, CommunityBuffType>

// HRID utilities

/**
 * Check if a communitybufftype HRID is valid
 */
export function validateCommunityBuffTypeHrid(hrid: string): hrid is CommunityBuffTypeHrid {
  return hrid in COMMUNITYBUFFTYPES
}

/**
 * Check if a communitybufftype exists
 */
export function communitybufftypeExists(hrid: string): boolean {
  return hrid in COMMUNITYBUFFTYPES
}

// Getter functions
export function getCommunityBuffType(hrid: CommunityBuffTypeHrid): CommunityBuffType {
  return COMMUNITYBUFFTYPES[hrid]
}

export function getAllCommunityBuffTypes(): CommunityBuffType[] {
  return Object.values(COMMUNITYBUFFTYPES)
}

export function getCommunityBuffTypesSortedByIndex(): CommunityBuffType[] {
  return getAllCommunityBuffTypes().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { CommunityBuffType }
export type { CommunityBuffTypeHrid }
export type CommunityBuffTypeId = keyof typeof COMMUNITYBUFFTYPES
export type CommunityBuffTypeData = typeof COMMUNITYBUFFTYPES

// Community buff type groups
export const COMBAT_COMMUNITY_BUFFS = Object.values(COMMUNITYBUFFTYPES)
  .filter(buff => buff.usableInActionTypeMap['/action_types/combat'])
  .map(buff => buff.hrid) as CommunityBuffTypeHrid[]

export const SKILLING_COMMUNITY_BUFFS = Object.values(COMMUNITYBUFFTYPES)
  .filter(buff => !buff.usableInActionTypeMap['/action_types/combat'])
  .map(buff => buff.hrid) as CommunityBuffTypeHrid[]

// Additional utility functions
export function getCommunityBuffCost(hrid: CommunityBuffTypeHrid): number {
  return COMMUNITYBUFFTYPES[hrid].cowbellCost
}

export function isCombatCommunityBuff(hrid: CommunityBuffTypeHrid): boolean {
  return COMMUNITYBUFFTYPES[hrid].usableInActionTypeMap['/action_types/combat'] === true
}

export function getCommunityBuffsByActionType(actionTypeHrid: string): CommunityBuffTypeHrid[] {
  return Object.values(COMMUNITYBUFFTYPES)
    .filter(buff => buff.usableInActionTypeMap[actionTypeHrid])
    .map(buff => buff.hrid) as CommunityBuffTypeHrid[]
}

export function calculateCommunityBuffValue(hrid: CommunityBuffTypeHrid, level: number): { ratio: number; flat: number } {
  const buff = COMMUNITYBUFFTYPES[hrid].buff
  return {
    ratio: buff.ratioBoost + (buff.ratioBoostLevelBonus * level),
    flat: buff.flatBoost + (buff.flatBoostLevelBonus * level)
  }
}