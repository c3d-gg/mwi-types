import { z } from 'zod'
import type { PropertyDefinition, GeneratorConfig } from '../base/types'
import { BaseGenerator } from '../base/base-generator'
import type { GameMode } from '../../types/source-data'

/**
 * Generator for Game Modes
 * 
 * Game modes define different rule sets and restrictions for players,
 * including market restrictions, character limits, and subset relationships.
 */
export class GameModesGenerator extends BaseGenerator<GameMode> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'GameMode',
      entityNamePlural: 'GAMEMODES',
      sourceKey: 'gameModeDetailMap' as const,
      outputFilename: 'game-modes',
      generateZodSchema: true,
      generateTypeboxSchema: true,
      generateHrids: true,
    }
    super(config)
  }

  protected extractEntities(): Record<string, GameMode> {
    return this.getEntitiesFromGameData() as Record<string, GameMode>
  }

  protected defineSchemaProperties(entity: GameMode): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'GameModeHridEnum',
        description: 'Human-readable ID for the game mode (e.g., "standard", "ironcow")',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the game mode',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Detailed description of the game mode rules and restrictions',
      },
      {
        name: 'isCreatable',
        type: 'boolean',
        description: 'Whether players can create new characters in this game mode',
      },
      {
        name: 'maxCharacterLimit',
        type: 'number',
        description: 'Maximum number of characters allowed in this game mode',
        constraints: {
          min: 1
        },
      },
      {
        name: 'marketRestricted',
        type: 'boolean',
        description: 'Whether marketplace trading is restricted in this game mode',
      },
      {
        name: 'subsetGameModes',
        type: 'array',
        nullable: true,
        items: { 
          name: 'subsetGameMode',
          type: 'string' 
        },
        description: 'List of game modes that are subsets of this mode',
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for displaying game modes',
        constraints: {
          min: 0
        },
      }
    ]
  }

  protected override generateAdditionalExports(): string[] {
    const exports: string[] = []

    // Export categorized collections
    exports.push(`export const CREATABLE_GAME_MODES = Object.values(${this.config.entityNamePlural}).filter(mode => mode.isCreatable).map(mode => mode.hrid)`)
    exports.push(`export const MARKET_RESTRICTED_GAME_MODES = Object.values(${this.config.entityNamePlural}).filter(mode => mode.marketRestricted).map(mode => mode.hrid)`)
    exports.push(`export const UNRESTRICTED_GAME_MODES = Object.values(${this.config.entityNamePlural}).filter(mode => !mode.marketRestricted).map(mode => mode.hrid)`)

    // Utility functions
    exports.push(`
export function isCreatableGameMode(modeHrid: GameModeHrid): boolean {
  return ${this.config.entityNamePlural}[modeHrid].isCreatable
}

export function isMarketRestrictedGameMode(modeHrid: GameModeHrid): boolean {
  return ${this.config.entityNamePlural}[modeHrid].marketRestricted
}

export function getGameModeCharacterLimit(modeHrid: GameModeHrid): number {
  return ${this.config.entityNamePlural}[modeHrid].maxCharacterLimit
}

export function getGameModesSorted(): GameMode[] {
  return Object.values(${this.config.entityNamePlural}).sort((a, b) => a.sortIndex - b.sortIndex)
}

export function getSubsetGameModes(modeHrid: GameModeHrid): string[] {
  return ${this.config.entityNamePlural}[modeHrid].subsetGameModes || []
}

export function isSubsetGameMode(subsetHrid: string, parentHrid: GameModeHrid): boolean {
  const parentMode = ${this.config.entityNamePlural}[parentHrid]
  return parentMode.subsetGameModes ? parentMode.subsetGameModes.includes(subsetHrid) : false
}

export function getDefaultGameMode(): GameMode {
  return ${this.config.entityNamePlural}['standard']
}

export function canCreateCharacterInMode(modeHrid: GameModeHrid, currentCharacterCount: number): boolean {
  const mode = ${this.config.entityNamePlural}[modeHrid]
  return mode.isCreatable && currentCharacterCount < mode.maxCharacterLimit
}
`)

    return exports
  }

}