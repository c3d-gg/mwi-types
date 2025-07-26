import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface ActionCategoryEntity extends BaseEntity {
  hrid: string
  name: string
  type: string
  sortIndex: number
}

export class ActionCategoriesGenerator extends BaseGenerator<ActionCategoryEntity> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'ActionCategory',
      entityNamePlural: 'ActionCategories',
      sourceKey: 'actionCategoryDetailMap',
      outputFilename: 'action-categories',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, ActionCategoryEntity> {
    return this.getEntitiesFromGameData() as Record<string, ActionCategoryEntity>
  }

  protected defineSchemaProperties(entity: ActionCategoryEntity): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'ActionCategoryHridEnum',
        description: 'Unique identifier for the action category'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the action category'
      },
      {
        name: 'type',
        type: 'string',
        description: 'Type of actions in this category (reference to action type)'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Display order for the action category'
      }
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, ActionCategoryEntity>): string[] {
    const exports = []
    
    exports.push(`
// Action category organization
export const ACTION_CATEGORIES_BY_TYPE = Object.entries(ACTIONCATEGORIES).reduce(
  (acc, [hrid, category]) => {
    const type = category.type
    if (!acc[type]) acc[type] = []
    acc[type].push(hrid as ActionCategoryHrid)
    return acc
  },
  {} as Record<string, ActionCategoryHrid[]>
)

// Get all action categories for a specific type
export function getActionCategoriesByType(type: string): ActionCategory[] {
  return (ACTION_CATEGORIES_BY_TYPE[type] || []).map(hrid => ACTIONCATEGORIES[hrid])
}

// Get action category display name
export function getActionCategoryName(hrid: ActionCategoryHrid): string {
  return ACTIONCATEGORIES[hrid].name
}

// Get action category type
export function getActionCategoryType(hrid: ActionCategoryHrid): string {
  return ACTIONCATEGORIES[hrid].type
}

// Get all action categories sorted by sortIndex
export function getActionCategoriesSorted(): ActionCategory[] {
  return Object.values(ACTIONCATEGORIES).sort((a, b) => a.sortIndex - b.sortIndex)
}

// Get action categories by type sorted
export function getActionCategoriesByTypeSorted(type: string): ActionCategory[] {
  return getActionCategoriesByType(type).sort((a, b) => a.sortIndex - b.sortIndex)
}

// Get all unique action types from categories
export function getAllActionTypesFromCategories(): string[] {
  return [...new Set(Object.values(ACTIONCATEGORIES).map(cat => cat.type))]
}

// Check if action category exists
export function isValidActionCategory(hrid: string): hrid is ActionCategoryHrid {
  return hrid in ACTIONCATEGORIES
}

// Count categories by type
export function countCategoriesByType(): Record<string, number> {
  return Object.values(ACTIONCATEGORIES).reduce(
    (acc, category) => {
      acc[category.type] = (acc[category.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}`)
    
    return exports
  }
}