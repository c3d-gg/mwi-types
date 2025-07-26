import { BaseGenerator } from './base/base-generator'
import type { GeneratorConfig, PropertyDefinition, BaseEntity } from './base/types'
import type { GameData } from '../types/source-data'

interface ItemLocation extends BaseEntity {
  hrid: string
  name: string
  type: string
  isTool: boolean
  isMultiItem: boolean
  conflictingOtherItemLocationHrids: string[]
  sortIndex?: number
}

export class ItemLocationsGenerator extends BaseGenerator<ItemLocation> {
  constructor() {
    super({
      entityName: 'ItemLocation',
      entityNamePlural: 'ItemLocations',
      sourceKey: 'itemLocationDetailMap',
      outputFilename: 'item-locations',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true,
    })
  }

  protected override extractEntities(): Record<string, any> {
    return this.gameData!.itemLocationDetailMap
  }

  protected override defineSchemaProperties(entity: any): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'ItemLocationHridEnum',
        description: 'Item location HRID',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the item location',
      },
      {
        name: 'type',
        type: 'string',
        description: 'Type of item location (e.g., /item_location_types/equipment)',
      },
      {
        name: 'isTool',
        type: 'boolean',
        description: 'Whether this location is for a tool',
      },
      {
        name: 'isMultiItem',
        type: 'boolean',
        description: 'Whether multiple items can be equipped in this location',
      },
      {
        name: 'conflictingOtherItemLocationHrids',
        type: 'array',
        items: { name: 'item', type: 'string' },
        description: 'HRIDs of item locations that conflict with this one',
      },
      {
        name: 'sortIndex',
        type: 'number',
        optional: true,
        description: 'Sort order for displaying locations',
      },
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, ItemLocation>): string[] {
    return [`
// Item location utilities
export function getItemLocationName(hrid: ItemLocationHrid): string {
  return ITEMLOCATIONS[hrid].name
}

export function isToolLocation(hrid: ItemLocationHrid): boolean {
  return ITEMLOCATIONS[hrid].isTool
}

export function isMultiItemLocation(hrid: ItemLocationHrid): boolean {
  return ITEMLOCATIONS[hrid].isMultiItem
}

export function getConflictingLocations(hrid: ItemLocationHrid): string[] {
  return ITEMLOCATIONS[hrid].conflictingOtherItemLocationHrids
}

// Get all equipment locations (non-tool, non-inventory)
export function getEquipmentLocations(): ItemLocation[] {
  return Object.values(ITEMLOCATIONS).filter(
    (loc: ItemLocation) => !loc.isTool && loc.hrid !== '/item_locations/inventory'
  )
}

// Get all tool locations
export function getToolLocations(): ItemLocation[] {
  return Object.values(ITEMLOCATIONS).filter((loc: ItemLocation) => loc.isTool)
}

// Check if two locations conflict
export function doLocationsConflict(loc1: ItemLocationHrid, loc2: ItemLocationHrid): boolean {
  const location1 = ITEMLOCATIONS[loc1]
  return location1.conflictingOtherItemLocationHrids.includes(loc2)
}

// Get all weapon locations
export function getWeaponLocations(): ItemLocation[] {
  const weaponHrids: ItemLocationHrid[] = [
    '/item_locations/main_hand' as ItemLocationHrid,
    '/item_locations/off_hand' as ItemLocationHrid,
    '/item_locations/two_hand' as ItemLocationHrid,
  ]
  return weaponHrids.map(hrid => ITEMLOCATIONS[hrid])
}`
    ]
  }
}