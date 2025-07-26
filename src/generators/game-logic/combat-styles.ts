import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface CombatStyleDetail extends BaseEntity {
	hrid: string
	name: string
	sortIndex: number
}

/**
 * Generator for combat style types and constants
 */
export class CombatStylesGenerator extends BaseGenerator<CombatStyleDetail> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'CombatStyle',
			entityNamePlural: 'CombatStyles',
			sourceKey: 'combatStyleDetailMap',
			outputFilename: 'combat-styles',
			generateHrids: true,
			generateZodSchema: true,
			generateTypeboxSchema: true
		}
		super(config)
	}

	protected extractEntities(): Record<string, CombatStyleDetail> {
		return this.getEntitiesFromGameData() as Record<string, CombatStyleDetail>
	}

	protected defineSchemaProperties(entity: CombatStyleDetail): PropertyDefinition[] {
		return [
			{
				name: 'hrid',
				type: 'ref',
				refName: 'CombatStyleHridEnum',
				description: 'The unique human-readable ID of the combat style'
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the combat style'
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Sort order for displaying combat styles'
			}
		]
	}

	protected override generateAdditionalExports(entities: Record<string, CombatStyleDetail>): string[] {
		// Categorize combat styles
		const meleeStyles = ['/combat_styles/slash', '/combat_styles/stab', '/combat_styles/smash']
		const magicStyles = ['/combat_styles/magic']
		const rangedStyles = ['/combat_styles/ranged']
		const healStyles = ['/combat_styles/heal']

		return [
			`/**
 * Melee combat styles
 */
export const MELEE_COMBAT_STYLES = ${JSON.stringify(meleeStyles, null, 2)} as const`,
			
			`/**
 * Magic combat styles
 */
export const MAGIC_COMBAT_STYLES = ${JSON.stringify(magicStyles, null, 2)} as const`,
			
			`/**
 * Ranged combat styles
 */
export const RANGED_COMBAT_STYLES = ${JSON.stringify(rangedStyles, null, 2)} as const`,
			
			`/**
 * Healing combat styles
 */
export const HEAL_COMBAT_STYLES = ${JSON.stringify(healStyles, null, 2)} as const`,
			
			`/**
 * Combat styles organized by category
 */
export const COMBAT_STYLES_BY_CATEGORY = {
	melee: MELEE_COMBAT_STYLES,
	magic: MAGIC_COMBAT_STYLES,
	ranged: RANGED_COMBAT_STYLES,
	heal: HEAL_COMBAT_STYLES
} as const`,
			
			`/**
 * Check if a combat style is melee
 */
export function isMeleeCombatStyle(hrid: CombatStyleHrid): boolean {
	return MELEE_COMBAT_STYLES.includes(hrid as any)
}`,
			
			`/**
 * Check if a combat style is magic
 */
export function isMagicCombatStyle(hrid: CombatStyleHrid): boolean {
	return MAGIC_COMBAT_STYLES.includes(hrid as any)
}`,
			
			`/**
 * Check if a combat style is ranged
 */
export function isRangedCombatStyle(hrid: CombatStyleHrid): boolean {
	return RANGED_COMBAT_STYLES.includes(hrid as any)
}`,
			
			`/**
 * Check if a combat style is healing
 */
export function isHealCombatStyle(hrid: CombatStyleHrid): boolean {
	return HEAL_COMBAT_STYLES.includes(hrid as any)
}`,
			
			`/**
 * Get all combat styles sorted by their sort index
 */
export function getCombatStylesSorted(): CombatStyle[] {
	return Object.values(COMBATSTYLES).sort((a, b) => a.sortIndex - b.sortIndex)
}`
		]
	}
}