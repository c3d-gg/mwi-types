import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface DamageTypeDetail extends BaseEntity {
	hrid: string
	name: string
	sortIndex: number
}

/**
 * Generator for damage type definitions and constants
 */
export class DamageTypesGenerator extends BaseGenerator<DamageTypeDetail> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'DamageType',
			entityNamePlural: 'DamageTypes',
			sourceKey: 'damageTypeDetailMap',
			outputFilename: 'damage-types',
			generateHrids: true,
			generateZodSchema: true,
			generateTypeboxSchema: true
		}
		super(config)
	}

	protected extractEntities(): Record<string, DamageTypeDetail> {
		return this.getEntitiesFromGameData() as Record<string, DamageTypeDetail>
	}

	protected defineSchemaProperties(entity: DamageTypeDetail): PropertyDefinition[] {
		return [
			{
				name: 'hrid',
				type: 'ref',
				refName: 'DamageTypeHridEnum',
				description: 'The unique human-readable ID of the damage type'
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the damage type'
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Sort order for displaying damage types'
			}
		]
	}

	protected override generateAdditionalExports(entities: Record<string, DamageTypeDetail>): string[] {
		// Extract physical vs elemental damage types
		const physicalTypes = ['/damage_types/physical']
		const elementalTypes = ['/damage_types/fire', '/damage_types/water', '/damage_types/nature']

		return [
			`/**
 * Physical damage types
 */
export const PHYSICAL_DAMAGE_TYPES = ${JSON.stringify(physicalTypes, null, 2)} as const`,
			
			`/**
 * Elemental damage types (fire, water, nature)
 */
export const ELEMENTAL_DAMAGE_TYPES = ${JSON.stringify(elementalTypes, null, 2)} as const`,
			
			`/**
 * Damage types organized by category
 */
export const DAMAGE_TYPES_BY_CATEGORY = {
	physical: PHYSICAL_DAMAGE_TYPES,
	elemental: ELEMENTAL_DAMAGE_TYPES
} as const`,
			
			`/**
 * Check if a damage type is physical
 */
export function isPhysicalDamageType(hrid: DamageTypeHrid): boolean {
	return PHYSICAL_DAMAGE_TYPES.includes(hrid as any)
}`,
			
			`/**
 * Check if a damage type is elemental
 */
export function isElementalDamageType(hrid: DamageTypeHrid): boolean {
	return ELEMENTAL_DAMAGE_TYPES.includes(hrid as any)
}`,
			
			`/**
 * Get all damage types sorted by their sort index
 */
export function getDamageTypesSorted(): DamageType[] {
	return Object.values(DAMAGETYPES).sort((a, b) => a.sortIndex - b.sortIndex)
}`,
			
			`/**
 * Get the elemental damage type resistance stat name
 */
export function getDamageTypeResistanceStat(damageTypeHrid: DamageTypeHrid): string | null {
	switch (damageTypeHrid) {
		case '/damage_types/fire':
			return 'fireResistance'
		case '/damage_types/water':
			return 'waterResistance'
		case '/damage_types/nature':
			return 'natureResistance'
		case '/damage_types/physical':
			return 'physicalResistance'
		default:
			return null
	}
}`,
			
			`/**
 * Get the elemental damage type amplify stat name
 */
export function getDamageTypeAmplifyStat(damageTypeHrid: DamageTypeHrid): string | null {
	switch (damageTypeHrid) {
		case '/damage_types/fire':
			return 'fireAmplify'
		case '/damage_types/water':
			return 'waterAmplify'
		case '/damage_types/nature':
			return 'natureAmplify'
		default:
			return null
	}
}`
		]
	}
}