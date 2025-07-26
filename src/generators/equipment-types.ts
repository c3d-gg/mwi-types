import { BaseGenerator } from './base/base-generator'
import type { GeneratorConfig, PropertyDefinition, BaseEntity } from './base/types'
import type { GameData } from '../types/source-data'

interface EquipmentType extends BaseEntity {
  hrid: string
  name: string
  itemLocationHrid: string
  sortIndex: number
}

export class EquipmentTypesGenerator extends BaseGenerator<EquipmentType> {
  constructor() {
    super({
      entityName: 'EquipmentType',
      entityNamePlural: 'EquipmentTypes',
      sourceKey: 'equipmentTypeDetailMap',
      outputFilename: 'equipment-types',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true,
    })
  }

  protected override extractEntities(): Record<string, any> {
    return this.gameData!.equipmentTypeDetailMap
  }

  protected override defineSchemaProperties(entity: any): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'EquipmentTypeHridEnum',
        description: 'Equipment type HRID',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the equipment type',
      },
      {
        name: 'itemLocationHrid',
        type: 'string',
        description: 'HRID of the item location this equipment type corresponds to',
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for displaying equipment types',
      },
    ]
  }

  protected override generateAdditionalExports(entities: Record<string, EquipmentType>): string[] {
    // Get weapon equipment types
    const weaponTypes = Object.values(entities).filter(
      eq => eq.hrid === '/equipment_types/main_hand' || 
            eq.hrid === '/equipment_types/off_hand' || 
            eq.hrid === '/equipment_types/two_hand'
    ).map(eq => eq.hrid)

    // Get armor equipment types
    const armorTypes = Object.values(entities).filter(
      eq => eq.hrid === '/equipment_types/head' ||
            eq.hrid === '/equipment_types/body' ||
            eq.hrid === '/equipment_types/legs' ||
            eq.hrid === '/equipment_types/feet' ||
            eq.hrid === '/equipment_types/hands' ||
            eq.hrid === '/equipment_types/back'
    ).map(eq => eq.hrid)

    // Get accessory equipment types
    const accessoryTypes = Object.values(entities).filter(
      eq => eq.hrid === '/equipment_types/neck' ||
            eq.hrid === '/equipment_types/earrings' ||
            eq.hrid === '/equipment_types/ring' ||
            eq.hrid === '/equipment_types/trinket' ||
            eq.hrid === '/equipment_types/pouch'
    ).map(eq => eq.hrid)

    // Get tool equipment types
    const toolTypes = Object.values(entities).filter(
      eq => eq.name.includes('Tool')
    ).map(eq => eq.hrid)

    return [`
// Equipment type utilities
export function getEquipmentTypeName(hrid: EquipmentTypeHrid): string {
  return EQUIPMENTTYPES[hrid].name
}

export function getEquipmentTypeLocation(hrid: EquipmentTypeHrid): string {
  return EQUIPMENTTYPES[hrid].itemLocationHrid
}

export function getEquipmentTypeSortIndex(hrid: EquipmentTypeHrid): number {
  return EQUIPMENTTYPES[hrid].sortIndex
}

/**
 * Weapon equipment types (main hand, off hand, two hand)
 */
export const WEAPON_EQUIPMENT_TYPES = ${JSON.stringify(weaponTypes, null, 2)} as const

/**
 * Armor equipment types (head, body, legs, feet, hands, back)
 */
export const ARMOR_EQUIPMENT_TYPES = ${JSON.stringify(armorTypes, null, 2)} as const

/**
 * Accessory equipment types (neck, earrings, ring, trinket, pouch)
 */
export const ACCESSORY_EQUIPMENT_TYPES = ${JSON.stringify(accessoryTypes, null, 2)} as const

/**
 * Tool equipment types (all tools like alchemy_tool, cooking_tool, etc.)
 */
export const TOOL_EQUIPMENT_TYPES = ${JSON.stringify(toolTypes, null, 2)} as const

/**
 * Check if equipment type is a weapon
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is a weapon
 */
export function isWeaponEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (WEAPON_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Check if equipment type is armor
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is armor
 */
export function isArmorEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (ARMOR_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Check if equipment type is an accessory
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is an accessory
 */
export function isAccessoryEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (ACCESSORY_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Check if equipment type is a tool
 * @param hrid - The equipment type HRID to check
 * @returns True if the equipment type is a tool
 */
export function isToolEquipmentType(hrid: EquipmentTypeHrid): boolean {
  return (TOOL_EQUIPMENT_TYPES as readonly string[]).includes(hrid)
}

/**
 * Get all equipment types sorted by sort index
 * @returns Array of equipment types ordered by sortIndex
 */
export function getEquipmentTypesSorted(): EquipmentType[] {
  return Object.values(EQUIPMENTTYPES).sort((a, b) => a.sortIndex - b.sortIndex)
}

/**
 * Equipment types organized by category
 */
export const EQUIPMENT_TYPES_BY_CATEGORY = {
  weapons: WEAPON_EQUIPMENT_TYPES,
  armor: ARMOR_EQUIPMENT_TYPES,
  accessories: ACCESSORY_EQUIPMENT_TYPES,
  tools: TOOL_EQUIPMENT_TYPES
} as const`
    ]
  }
}