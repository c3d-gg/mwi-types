import { z } from 'zod'
import type { PropertyDefinition, GeneratorConfig } from '../base/types'
import { BaseGenerator } from '../base/base-generator'
import type { LeaderboardCategoryDetail } from '../../types/source-data'

/**
 * Generator for Leaderboard Categories
 * 
 * Leaderboard categories define what players are ranked on,
 * including individual skills, special achievements, and guild rankings.
 */
export class LeaderboardCategoriesGenerator extends BaseGenerator<LeaderboardCategoryDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'LeaderboardCategory',
      entityNamePlural: 'LEADERBOARDCATEGORIES',
      sourceKey: 'leaderboardCategoryDetailMap' as const,
      outputFilename: 'leaderboard-categories',
      generateZodSchema: true,
      generateTypeboxSchema: true,
      generateHrids: true,
    }
    super(config)
  }

  protected extractEntities(): Record<string, LeaderboardCategoryDetail> {
    return this.getEntitiesFromGameData() as Record<string, LeaderboardCategoryDetail>
  }

  protected defineSchemaProperties(entity: LeaderboardCategoryDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'LeaderboardCategoryHridEnum',
        description: 'Human-readable ID for the leaderboard category (e.g., "total_level", "attack", "fame_points")',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the leaderboard category',
      },
      {
        name: 'skillHrid',
        type: 'string',
        description: 'Associated skill HRID for skill-based leaderboards (empty for special categories)',
      },
      {
        name: 'isGuild',
        type: 'boolean',
        description: 'Whether this category is for guild rankings instead of individual players',
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for displaying leaderboard categories',
        constraints: {
          min: 0
        },
      }
    ]
  }

  protected override generateAdditionalExports(): string[] {
    const exports: string[] = []

    // Export categorized collections
    exports.push(`export const GUILD_LEADERBOARD_CATEGORIES = Object.values(${this.config.entityNamePlural}).filter(category => category.isGuild).map(category => category.hrid)`)
    exports.push(`export const PLAYER_LEADERBOARD_CATEGORIES = Object.values(${this.config.entityNamePlural}).filter(category => !category.isGuild).map(category => category.hrid)`)
    exports.push(`export const SKILL_LEADERBOARD_CATEGORIES = Object.values(${this.config.entityNamePlural}).filter(category => category.skillHrid !== '').map(category => category.hrid)`)
    exports.push(`export const SPECIAL_LEADERBOARD_CATEGORIES = Object.values(${this.config.entityNamePlural}).filter(category => category.skillHrid === '').map(category => category.hrid)`)

    // Generate categories by skill
    exports.push(`export const LEADERBOARD_CATEGORIES_BY_SKILL = Object.values(${this.config.entityNamePlural})
  .filter(category => category.skillHrid !== '')
  .reduce((acc, category) => {
    if (!acc[category.skillHrid]) {
      acc[category.skillHrid] = []
    }
    acc[category.skillHrid]!.push(category.hrid)
    return acc
  }, {} as Record<string, LeaderboardCategoryHrid[]>) as Record<string, readonly LeaderboardCategoryHrid[]>`)

    // Utility functions
    exports.push(`
export function isGuildLeaderboardCategory(categoryHrid: LeaderboardCategoryHrid): boolean {
  return ${this.config.entityNamePlural}[categoryHrid].isGuild
}

export function isSkillLeaderboardCategory(categoryHrid: LeaderboardCategoryHrid): boolean {
  return ${this.config.entityNamePlural}[categoryHrid].skillHrid !== ''
}

export function getLeaderboardCategorySkill(categoryHrid: LeaderboardCategoryHrid): string {
  return ${this.config.entityNamePlural}[categoryHrid].skillHrid
}

export function getLeaderboardCategoriesSorted(): LeaderboardCategory[] {
  return Object.values(${this.config.entityNamePlural}).sort((a, b) => a.sortIndex - b.sortIndex)
}

export function getLeaderboardCategoriesForSkill(skillHrid: string): LeaderboardCategory[] {
  return Object.values(${this.config.entityNamePlural}).filter(category => category.skillHrid === skillHrid)
}

export function getSkillLeaderboardCategories(): LeaderboardCategory[] {
  return Object.values(${this.config.entityNamePlural}).filter(category => category.skillHrid !== '')
}

export function getSpecialLeaderboardCategories(): LeaderboardCategory[] {
  return Object.values(${this.config.entityNamePlural}).filter(category => category.skillHrid === '')
}

export function getCombatLeaderboardCategories(): LeaderboardCategory[] {
  const combatSkills = ['/skills/attack', '/skills/defense', '/skills/power', '/skills/ranged', '/skills/magic', '/skills/intelligence', '/skills/stamina']
  return Object.values(${this.config.entityNamePlural}).filter(category => combatSkills.includes(category.skillHrid))
}

export function getSkillingLeaderboardCategories(): LeaderboardCategory[] {
  const skillingSkills = ['/skills/foraging', '/skills/milking', '/skills/woodcutting', '/skills/cheesesmithing', '/skills/crafting', '/skills/tailoring', '/skills/cooking', '/skills/brewing', '/skills/alchemy', '/skills/enhancing']
  return Object.values(${this.config.entityNamePlural}).filter(category => skillingSkills.includes(category.skillHrid))
}

export function getLeaderboardCategoryDisplayOrder(): LeaderboardCategory[] {
  return getLeaderboardCategoriesSorted()
}
`)

    return exports
  }

}