import { z } from 'zod'
import type { PropertyDefinition, GeneratorConfig } from '../base/types'
import { BaseGenerator } from '../base/base-generator'
import type { LeaderboardTypeDetail } from '../../types/source-data'

/**
 * Generator for Leaderboard Types
 * 
 * Leaderboard types define different leaderboard scoring systems,
 * including game mode restrictions, Steam integration, and guild support.
 */
export class LeaderboardTypesGenerator extends BaseGenerator<LeaderboardTypeDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'LeaderboardType',
      entityNamePlural: 'LEADERBOARDTYPES',
      sourceKey: 'leaderboardTypeDetailMap' as const,
      outputFilename: 'leaderboard-types',
      generateZodSchema: true,
      generateTypeboxSchema: true,
      generateHrids: true,
    }
    super(config)
  }

  protected extractEntities(): Record<string, LeaderboardTypeDetail> {
    return this.getEntitiesFromGameData() as Record<string, LeaderboardTypeDetail>
  }

  protected defineSchemaProperties(entity: LeaderboardTypeDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'LeaderboardTypeHridEnum',
        description: 'Human-readable ID for the leaderboard type (e.g., "standard", "ironcow", "guild")',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the leaderboard type',
      },
      {
        name: 'gameMode',
        type: 'string',
        description: 'Associated game mode for this leaderboard (empty string for all modes)',
      },
      {
        name: 'isSteam',
        type: 'boolean',
        description: 'Whether this leaderboard is specific to Steam players',
      },
      {
        name: 'minJoinTime',
        type: 'string',
        description: 'Minimum account creation time to appear on this leaderboard (ISO date string)',
      },
      {
        name: 'isGuild',
        type: 'boolean',
        description: 'Whether this is a guild leaderboard instead of individual player',
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for displaying leaderboard types',
        constraints: {
          min: 0
        },
      }
    ]
  }

  protected override generateAdditionalExports(): string[] {
    const exports: string[] = []

    // Export categorized collections
    exports.push(`export const GUILD_LEADERBOARD_TYPES = Object.values(${this.config.entityNamePlural}).filter(type => type.isGuild).map(type => type.hrid)`)
    exports.push(`export const PLAYER_LEADERBOARD_TYPES = Object.values(${this.config.entityNamePlural}).filter(type => !type.isGuild).map(type => type.hrid)`)
    exports.push(`export const STEAM_LEADERBOARD_TYPES = Object.values(${this.config.entityNamePlural}).filter(type => type.isSteam).map(type => type.hrid)`)
    exports.push(`export const STANDARD_LEADERBOARD_TYPES = Object.values(${this.config.entityNamePlural}).filter(type => !type.isSteam).map(type => type.hrid)`)

    // Utility functions
    exports.push(`
export function isGuildLeaderboardType(typeHrid: LeaderboardTypeHrid): boolean {
  return ${this.config.entityNamePlural}[typeHrid].isGuild
}

export function isSteamLeaderboardType(typeHrid: LeaderboardTypeHrid): boolean {
  return ${this.config.entityNamePlural}[typeHrid].isSteam
}

export function getLeaderboardTypeGameMode(typeHrid: LeaderboardTypeHrid): string {
  return ${this.config.entityNamePlural}[typeHrid].gameMode
}

export function getLeaderboardTypeMinJoinTime(typeHrid: LeaderboardTypeHrid): string {
  return ${this.config.entityNamePlural}[typeHrid].minJoinTime
}

export function getLeaderboardTypesSorted(): LeaderboardType[] {
  return Object.values(${this.config.entityNamePlural}).sort((a, b) => a.sortIndex - b.sortIndex)
}

export function getLeaderboardTypesByGameMode(gameMode: string): LeaderboardType[] {
  return Object.values(${this.config.entityNamePlural}).filter(type => type.gameMode === gameMode || type.gameMode === '')
}

export function canPlayerJoinLeaderboard(typeHrid: LeaderboardTypeHrid, playerJoinTime: Date, isSteam: boolean): boolean {
  const leaderboardType = ${this.config.entityNamePlural}[typeHrid]
  
  // Check Steam requirement
  if (leaderboardType.isSteam && !isSteam) {
    return false
  }
  
  // Check minimum join time
  const minJoinTime = new Date(leaderboardType.minJoinTime)
  return playerJoinTime >= minJoinTime
}

export function getDefaultLeaderboardType(): LeaderboardType {
  return ${this.config.entityNamePlural}['standard']
}
`)

    return exports
  }

}