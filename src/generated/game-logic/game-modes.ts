/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.291Z
 */

import { z } from 'zod'
import { GameModeHridEnum, GameModeSchema, type GameMode } from '../schemas/zod/game-modes.js'
// Re-export HRID enum from schema
export { GameModeHridEnum } from '../schemas/zod/game-modes.js'
// Re-export schema
export { GameModeSchema } from '../schemas/zod/game-modes.js'

// Type definitions
type GameModeHrid = z.infer<typeof GameModeHridEnum>

// Data
export const GAMEMODES: Record<GameModeHrid, GameMode> = {
  'ironcow': {
    "hrid": "ironcow",
    "name": "Ironcow",
    "description": "The Ironcow game mode is for players who enjoys being self-sufficient. You cannot use the marketplace to trade with other players (Exception: buying Cowbells is allowed).",
    "isCreatable": true,
    "maxCharacterLimit": 3,
    "marketRestricted": true,
    "subsetGameModes": [
      "legacy_ironcow"
    ],
    "sortIndex": 2
  },
  'legacy_ironcow': {
    "hrid": "legacy_ironcow",
    "name": "Legacy Ironcow",
    "description": "",
    "isCreatable": false,
    "maxCharacterLimit": 1,
    "marketRestricted": true,
    "subsetGameModes": null,
    "sortIndex": 3
  },
  'standard': {
    "hrid": "standard",
    "name": "Standard",
    "description": "The Standard game mode is recommended for most players. There are no feature restrictions.",
    "isCreatable": true,
    "maxCharacterLimit": 1,
    "marketRestricted": false,
    "subsetGameModes": null,
    "sortIndex": 1
  }
} as const satisfies Record<GameModeHrid, GameMode>

// HRID utilities

/**
 * Check if a gamemode HRID is valid
 */
export function validateGameModeHrid(hrid: string): hrid is GameModeHrid {
  return hrid in GAMEMODES
}

/**
 * Check if a gamemode exists
 */
export function gamemodeExists(hrid: string): boolean {
  return hrid in GAMEMODES
}

// Getter functions
export function getGameMode(hrid: GameModeHrid): GameMode {
  return GAMEMODES[hrid]
}

export function getAllGAMEMODES(): GameMode[] {
  return Object.values(GAMEMODES)
}

export function getGAMEMODESSortedByIndex(): GameMode[] {
  return getAllGAMEMODES().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { GameMode }
export type { GameModeHrid }
export type GameModeId = keyof typeof GAMEMODES
export type GameModeData = typeof GAMEMODES

export const CREATABLE_GAME_MODES = Object.values(GAMEMODES).filter(mode => mode.isCreatable).map(mode => mode.hrid)

export const MARKET_RESTRICTED_GAME_MODES = Object.values(GAMEMODES).filter(mode => mode.marketRestricted).map(mode => mode.hrid)

export const UNRESTRICTED_GAME_MODES = Object.values(GAMEMODES).filter(mode => !mode.marketRestricted).map(mode => mode.hrid)


export function isCreatableGameMode(modeHrid: GameModeHrid): boolean {
  return GAMEMODES[modeHrid].isCreatable
}

export function isMarketRestrictedGameMode(modeHrid: GameModeHrid): boolean {
  return GAMEMODES[modeHrid].marketRestricted
}

export function getGameModeCharacterLimit(modeHrid: GameModeHrid): number {
  return GAMEMODES[modeHrid].maxCharacterLimit
}

export function getGameModesSorted(): GameMode[] {
  return Object.values(GAMEMODES).sort((a, b) => a.sortIndex - b.sortIndex)
}

export function getSubsetGameModes(modeHrid: GameModeHrid): string[] {
  return GAMEMODES[modeHrid].subsetGameModes || []
}

export function isSubsetGameMode(subsetHrid: string, parentHrid: GameModeHrid): boolean {
  const parentMode = GAMEMODES[parentHrid]
  return parentMode.subsetGameModes ? parentMode.subsetGameModes.includes(subsetHrid) : false
}

export function getDefaultGameMode(): GameMode {
  return GAMEMODES['standard']
}

export function canCreateCharacterInMode(modeHrid: GameModeHrid, currentCharacterCount: number): boolean {
  const mode = GAMEMODES[modeHrid]
  return mode.isCreatable && currentCharacterCount < mode.maxCharacterLimit
}
