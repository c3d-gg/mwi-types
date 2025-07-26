import { BaseGenerator } from '../base/base-generator'
import type { PropertyDefinition, GeneratorConfig } from '../base/types'
import type { AvatarDetail } from '../../types/source-data'

export class AvatarsGenerator extends BaseGenerator<AvatarDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'Avatar',
      entityNamePlural: 'AVATARS',
      sourceKey: 'avatarDetailMap' as const,
      outputFilename: 'avatars',
      generateZodSchema: true,
      generateTypeboxSchema: true,
      generateHrids: true,
    }
    super(config)
  }

  protected extractEntities(): Record<string, AvatarDetail> {
    return this.getEntitiesFromGameData() as Record<string, AvatarDetail>
  }

  protected defineSchemaProperties(entity: AvatarDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'AvatarHridEnum',
        description: 'The avatar\'s unique identifier',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the avatar',
      },
      {
        name: 'isSeasonal',
        type: 'boolean',
        description: 'Whether this avatar is seasonal',
      },
      {
        name: 'cowbellCost',
        type: 'number',
        description: 'The cowbell cost to unlock this avatar',
        constraints: {
          min: 0,
        },
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'The sort order for displaying this avatar',
      },
    ]
  }

  protected override transformEntityForOutput(entity: AvatarDetail): any {
    // Generate a name from the hrid (e.g., "/avatars/blue_person_1" -> "Blue Person 1")
    const namePart = entity.hrid.split('/').pop() || ''
    const name = namePart.split('_').map((word, index) => {
      // Don't capitalize numbers
      if (/^\d+$/.test(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
    
    return {
      ...entity,
      name
    }
  }

  protected override generateAdditionalExports(): string[] {
    const exports: string[] = []

    // Free and paid avatars
    exports.push(`export const FREE_AVATARS = Object.values(${this.config.entityNamePlural}).filter(avatar => avatar.cowbellCost === 0)`)
    exports.push(`export const PAID_AVATARS = Object.values(${this.config.entityNamePlural}).filter(avatar => avatar.cowbellCost > 0)`)

    // Seasonal avatars
    exports.push(`export const SEASONAL_AVATARS = Object.values(${this.config.entityNamePlural}).filter(avatar => avatar.isSeasonal)`)
    exports.push(`export const NON_SEASONAL_AVATARS = Object.values(${this.config.entityNamePlural}).filter(avatar => !avatar.isSeasonal)`)

    // Sorted avatars
    exports.push(`export const AVATARS_SORTED = [...Object.values(${this.config.entityNamePlural})].sort((a, b) => a.sortIndex - b.sortIndex)`)

    // Utility functions
    exports.push(`
export function getAvatarCost(hrid: AvatarHrid): number {
  return ${this.config.entityNamePlural}[hrid].cowbellCost
}

export function isAvatarFree(hrid: AvatarHrid): boolean {
  return ${this.config.entityNamePlural}[hrid].cowbellCost === 0
}

export function isAvatarSeasonal(hrid: AvatarHrid): boolean {
  return ${this.config.entityNamePlural}[hrid].isSeasonal
}

export function getAvatarsByCostRange(minCost: number, maxCost: number): Avatar[] {
  return Object.values(${this.config.entityNamePlural}).filter(
    avatar => avatar.cowbellCost >= minCost && avatar.cowbellCost <= maxCost
  )
}

export function getAffordableAvatars(cowbells: number): Avatar[] {
  return Object.values(${this.config.entityNamePlural}).filter(avatar => avatar.cowbellCost <= cowbells)
}`)

    return exports
  }
}