import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface NameColorDetail extends BaseEntity {
  hrid: string
  name: string
  isSeasonal: boolean
  cowbellCost: number
  sortIndex: number
}

/**
 * Generator for name color types and constants
 */
export class NameColorsGenerator extends BaseGenerator<NameColorDetail> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'NameColor',
      entityNamePlural: 'NameColors',
      sourceKey: 'nameColorDetailMap',
      outputFilename: 'name-colors',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, NameColorDetail> {
    return this.getEntitiesFromGameData() as Record<string, NameColorDetail>
  }

  protected defineSchemaProperties(entity: NameColorDetail): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'NameColorHridEnum',
        description: 'The unique human-readable ID of the name color'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the color'
      },
      {
        name: 'isSeasonal',
        type: 'boolean',
        description: 'Whether this is a seasonal/limited-time name color'
      },
      {
        name: 'cowbellCost',
        type: 'number',
        description: 'Cost in cowbells to purchase this name color'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for display'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, NameColorDetail>): string[] {
    const seasonalColors = Object.values(entities).filter(color => color.isSeasonal)
    const regularColors = Object.values(entities).filter(color => !color.isSeasonal)
    const freeColors = Object.values(entities).filter(color => color.cowbellCost === 0)
    const purchasableColors = Object.values(entities).filter(color => color.cowbellCost > 0)

    return [
      `// Utility functions
export function getNameColorName(hrid: NameColorHrid): string {
  return NAMECOLORS[hrid].name
}

export function getNameColorCost(hrid: NameColorHrid): number {
  return NAMECOLORS[hrid].cowbellCost
}

export function isSeasonalNameColor(hrid: NameColorHrid): boolean {
  return NAMECOLORS[hrid].isSeasonal
}

// Helper function to check if player can afford a name color
export function canAffordNameColor(hrid: NameColorHrid, cowbells: number): boolean {
  return cowbells >= NAMECOLORS[hrid].cowbellCost
}

// Get all name colors within a price range
export function getNameColorsByPriceRange(minPrice: number, maxPrice: number): readonly NameColor[] {
  return Object.values(NAMECOLORS).filter(color => 
    color.cowbellCost >= minPrice && color.cowbellCost <= maxPrice
  ) as readonly NameColor[]
}

// Get name colors by name pattern (useful for color families)
export function getNameColorsByPattern(pattern: string): readonly NameColor[] {
  const regex = new RegExp(pattern, 'i')
  return Object.values(NAMECOLORS).filter(color => 
    regex.test(color.name)
  ) as readonly NameColor[]
}`,
      `// Name color groups
export const SEASONAL_NAME_COLORS = ${JSON.stringify(seasonalColors, null, 2)} as readonly NameColor[]
export const REGULAR_NAME_COLORS = ${JSON.stringify(regularColors, null, 2)} as readonly NameColor[]
export const FREE_NAME_COLORS = ${JSON.stringify(freeColors, null, 2)} as readonly NameColor[]
export const PURCHASABLE_NAME_COLORS = ${JSON.stringify(purchasableColors, null, 2)} as readonly NameColor[]`,
      `// Total count utility
export const TOTAL_NAME_COLORS = ${Object.keys(entities).length}
export const TOTAL_SEASONAL_NAME_COLORS = ${seasonalColors.length}
export const TOTAL_PURCHASABLE_NAME_COLORS = ${purchasableColors.length}`
    ]
  }
}