/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.316Z
 */

import { z } from 'zod'
import { LeaderboardTypeHridEnum, LeaderboardTypeSchema, type LeaderboardType } from '../schemas/zod/leaderboard-types.js'
// Re-export HRID enum from schema
export { LeaderboardTypeHridEnum } from '../schemas/zod/leaderboard-types.js'
// Re-export schema
export { LeaderboardTypeSchema } from '../schemas/zod/leaderboard-types.js'

// Type definitions
type LeaderboardTypeHrid = z.infer<typeof LeaderboardTypeHridEnum>

// Data
export const LEADERBOARDTYPES: Record<LeaderboardTypeHrid, LeaderboardType> = {
  'guild': {
    "hrid": "guild",
    "name": "Guild",
    "gameMode": "",
    "isSteam": false,
    "minJoinTime": "0001-01-01T00:00:00Z",
    "isGuild": true,
    "sortIndex": 6
  },
  'ironcow': {
    "hrid": "ironcow",
    "name": "Ironcow",
    "gameMode": "ironcow",
    "isSteam": false,
    "minJoinTime": "0001-01-01T00:00:00Z",
    "isGuild": false,
    "sortIndex": 2
  },
  'legacy_ironcow': {
    "hrid": "legacy_ironcow",
    "name": "Legacy Ironcow",
    "gameMode": "legacy_ironcow",
    "isSteam": false,
    "minJoinTime": "0001-01-01T00:00:00Z",
    "isGuild": false,
    "sortIndex": 3
  },
  'standard': {
    "hrid": "standard",
    "name": "Standard",
    "gameMode": "standard",
    "isSteam": false,
    "minJoinTime": "0001-01-01T00:00:00Z",
    "isGuild": false,
    "sortIndex": 1
  },
  'steam_ironcow': {
    "hrid": "steam_ironcow",
    "name": "Ironcow (Steam)",
    "gameMode": "ironcow",
    "isSteam": true,
    "minJoinTime": "2025-03-06T00:00:00Z",
    "isGuild": false,
    "sortIndex": 5
  },
  'steam_standard': {
    "hrid": "steam_standard",
    "name": "Standard (Steam)",
    "gameMode": "standard",
    "isSteam": true,
    "minJoinTime": "2025-03-06T00:00:00Z",
    "isGuild": false,
    "sortIndex": 4
  }
} as const satisfies Record<LeaderboardTypeHrid, LeaderboardType>

// HRID utilities

/**
 * Check if a leaderboardtype HRID is valid
 */
export function validateLeaderboardTypeHrid(hrid: string): hrid is LeaderboardTypeHrid {
  return hrid in LEADERBOARDTYPES
}

/**
 * Check if a leaderboardtype exists
 */
export function leaderboardtypeExists(hrid: string): boolean {
  return hrid in LEADERBOARDTYPES
}

// Getter functions
export function getLeaderboardType(hrid: LeaderboardTypeHrid): LeaderboardType {
  return LEADERBOARDTYPES[hrid]
}

export function getAllLEADERBOARDTYPES(): LeaderboardType[] {
  return Object.values(LEADERBOARDTYPES)
}

export function getLEADERBOARDTYPESSortedByIndex(): LeaderboardType[] {
  return getAllLEADERBOARDTYPES().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { LeaderboardType }
export type { LeaderboardTypeHrid }
export type LeaderboardTypeId = keyof typeof LEADERBOARDTYPES
export type LeaderboardTypeData = typeof LEADERBOARDTYPES

export const GUILD_LEADERBOARD_TYPES = Object.values(LEADERBOARDTYPES).filter(type => type.isGuild).map(type => type.hrid)

export const PLAYER_LEADERBOARD_TYPES = Object.values(LEADERBOARDTYPES).filter(type => !type.isGuild).map(type => type.hrid)

export const STEAM_LEADERBOARD_TYPES = Object.values(LEADERBOARDTYPES).filter(type => type.isSteam).map(type => type.hrid)

export const STANDARD_LEADERBOARD_TYPES = Object.values(LEADERBOARDTYPES).filter(type => !type.isSteam).map(type => type.hrid)


export function isGuildLeaderboardType(typeHrid: LeaderboardTypeHrid): boolean {
  return LEADERBOARDTYPES[typeHrid].isGuild
}

export function isSteamLeaderboardType(typeHrid: LeaderboardTypeHrid): boolean {
  return LEADERBOARDTYPES[typeHrid].isSteam
}

export function getLeaderboardTypeGameMode(typeHrid: LeaderboardTypeHrid): string {
  return LEADERBOARDTYPES[typeHrid].gameMode
}

export function getLeaderboardTypeMinJoinTime(typeHrid: LeaderboardTypeHrid): string {
  return LEADERBOARDTYPES[typeHrid].minJoinTime
}

export function getLeaderboardTypesSorted(): LeaderboardType[] {
  return Object.values(LEADERBOARDTYPES).sort((a, b) => a.sortIndex - b.sortIndex)
}

export function getLeaderboardTypesByGameMode(gameMode: string): LeaderboardType[] {
  return Object.values(LEADERBOARDTYPES).filter(type => type.gameMode === gameMode || type.gameMode === '')
}

export function canPlayerJoinLeaderboard(typeHrid: LeaderboardTypeHrid, playerJoinTime: Date, isSteam: boolean): boolean {
  const leaderboardType = LEADERBOARDTYPES[typeHrid]
  
  // Check Steam requirement
  if (leaderboardType.isSteam && !isSteam) {
    return false
  }
  
  // Check minimum join time
  const minJoinTime = new Date(leaderboardType.minJoinTime)
  return playerJoinTime >= minJoinTime
}

export function getDefaultLeaderboardType(): LeaderboardType {
  return LEADERBOARDTYPES['standard']
}
