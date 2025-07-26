import { BaseGenerator } from '../base/base-generator'
import type { PropertyDefinition, GeneratorConfig } from '../base/types'
import type { AvatarOutfitDetail } from '../../types/source-data'

export class AvatarOutfitsGenerator extends BaseGenerator<AvatarOutfitDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'AvatarOutfit',
      entityNamePlural: 'AVATAR_OUTFITS',
      sourceKey: 'avatarOutfitDetailMap' as const,
      outputFilename: 'avatar-outfits',
      generateZodSchema: true,
      generateTypeboxSchema: true,
      generateHrids: true,
    }
    super(config)
  }

  protected extractEntities(): Record<string, AvatarOutfitDetail> {
    return this.getEntitiesFromGameData() as Record<string, AvatarOutfitDetail>
  }

  protected defineSchemaProperties(entity: AvatarOutfitDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'AvatarOutfitHridEnum',
        description: 'The avatar outfit\'s unique identifier',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the avatar outfit',
      },
      {
        name: 'isSeasonal',
        type: 'boolean',
        description: 'Whether this outfit is seasonal',
      },
      {
        name: 'cowbellCost',
        type: 'number',
        description: 'The cowbell cost to unlock this outfit',
        constraints: {
          min: 0,
        },
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'The sort order for displaying this outfit',
      },
    ]
  }

  protected override transformEntityForOutput(entity: AvatarOutfitDetail): any {
    // Generate a name from the hrid (e.g., "/avatar_outfits/christmas_tree_dress" -> "Christmas Tree Dress")
    const namePart = entity.hrid.split('/').pop() || ''
    const name = namePart.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    
    return {
      ...entity,
      name
    }
  }

  protected override generateAdditionalExports(): string[] {
    const exports: string[] = []

    // Free and paid outfits
    exports.push(`export const FREE_AVATAR_OUTFITS = Object.values(${this.config.entityNamePlural}).filter(outfit => outfit.cowbellCost === 0)`)
    exports.push(`export const PAID_AVATAR_OUTFITS = Object.values(${this.config.entityNamePlural}).filter(outfit => outfit.cowbellCost > 0)`)

    // Seasonal outfits
    exports.push(`export const SEASONAL_AVATAR_OUTFITS = Object.values(${this.config.entityNamePlural}).filter(outfit => outfit.isSeasonal)`)
    exports.push(`export const NON_SEASONAL_AVATAR_OUTFITS = Object.values(${this.config.entityNamePlural}).filter(outfit => !outfit.isSeasonal)`)

    // Sorted outfits
    exports.push(`export const AVATAR_OUTFITS_SORTED = [...Object.values(${this.config.entityNamePlural})].sort((a, b) => a.sortIndex - b.sortIndex)`)

    // Utility functions
    exports.push(`
export function getAvatarOutfitCost(hrid: AvatarOutfitHrid): number {
  return ${this.config.entityNamePlural}[hrid].cowbellCost
}

export function isAvatarOutfitFree(hrid: AvatarOutfitHrid): boolean {
  return ${this.config.entityNamePlural}[hrid].cowbellCost === 0
}

export function isAvatarOutfitSeasonal(hrid: AvatarOutfitHrid): boolean {
  return ${this.config.entityNamePlural}[hrid].isSeasonal
}

export function getAvatarOutfitsByCostRange(minCost: number, maxCost: number): AvatarOutfit[] {
  return Object.values(${this.config.entityNamePlural}).filter(
    outfit => outfit.cowbellCost >= minCost && outfit.cowbellCost <= maxCost
  )
}

export function getAffordableAvatarOutfits(cowbells: number): AvatarOutfit[] {
  return Object.values(${this.config.entityNamePlural}).filter(outfit => outfit.cowbellCost <= cowbells)
}`)

    return exports
  }
}