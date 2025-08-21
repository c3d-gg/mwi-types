import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface BuffDefinition {
	uniqueHrid: string
	typeHrid: string
	ratioBoost: number
	ratioBoostLevelBonus: number
	flatBoost: number
	flatBoostLevelBonus: number
	startTime: string
	duration: number
}

interface AbilityEffectDetail {
	targetType: string
	effectType: string
	combatStyleHrid: string
	damageType: string
	baseDamageFlat: number
	baseDamageFlatLevelBonus: number
	baseDamageRatio: number
	baseDamageRatioLevelBonus: number
	bonusAccuracyRatio: number
	bonusAccuracyRatioLevelBonus: number
	damageOverTimeRatio: number
	damageOverTimeDuration: number
	armorDamageRatio: number
	armorDamageRatioLevelBonus: number
	hpDrainRatio: number
	pierceChance: number
	blindChance: number
	blindDuration: number
	silenceChance: number
	silenceDuration: number
	stunChance: number
	stunDuration: number
	spendHpRatio: number
	buffs: BuffDefinition[] | null
}

interface CombatTriggerDetail {
	dependencyHrid: string
	conditionHrid: string
	comparatorHrid: string
	value: number
}

interface AbilityDetail extends BaseEntity {
	hrid: string
	name: string
	description: string
	isSpecialAbility: boolean
	manaCost: number
	cooldownDuration: number
	castDuration: number
	abilityEffects: AbilityEffectDetail[]
	defaultCombatTriggers: CombatTriggerDetail[]
	sortIndex: number
}

/**
 * Generator for ability types and constants
 */
export class AbilitiesGenerator extends BaseGenerator<AbilityDetail> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'Ability',
			entityNamePlural: 'Abilities',
			sourceKey: 'abilityDetailMap',
			outputFilename: 'abilities',
			generateHrids: true,
			generateZodSchema: true,
			generateTypeboxSchema: true
		}
		super(config)
	}

	protected extractEntities(): Record<string, AbilityDetail> {
		return this.getEntitiesFromGameData() as Record<string, AbilityDetail>
	}

	protected defineSchemaProperties(entity: AbilityDetail): PropertyDefinition[] {
		return [
			{
				name: 'hrid',
				type: 'ref',
				refName: 'AbilityHridEnum',
				description: 'The unique human-readable ID of the ability'
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the ability'
			},
			{
				name: 'description',
				type: 'string',
				description: 'Description of what the ability does'
			},
			{
				name: 'isSpecialAbility',
				type: 'boolean',
				description: 'Whether this is a special/ultimate ability'
			},
			{
				name: 'manaCost',
				type: 'number',
				description: 'Mana cost to use the ability'
			},
			{
				name: 'cooldownDuration',
				type: 'number',
				description: 'Cooldown time in nanoseconds'
			},
			{
				name: 'castDuration',
				type: 'number',
				description: 'Cast time in nanoseconds'
			},
			{
				name: 'abilityEffects',
				type: 'array',
				items: {
					name: 'abilityEffect',
					type: 'object',
					properties: [
						{ name: 'targetType', type: 'string', description: 'Who the effect targets (enemy, allAllies, self, etc.)' },
						{ name: 'effectType', type: 'string', description: 'Type of effect (damage, heal, buff, etc.)' },
						{ name: 'combatStyleHrid', type: 'string', description: 'Combat style for damage calculations' },
						{ name: 'damageType', type: 'string', description: 'Damage type (physical, fire, water, nature)' },
						{ name: 'baseDamageFlat', type: 'number', description: 'Base flat damage' },
						{ name: 'baseDamageFlatLevelBonus', type: 'number', description: 'Flat damage increase per level' },
						{ name: 'baseDamageRatio', type: 'number', description: 'Base damage ratio (multiplier)' },
						{ name: 'baseDamageRatioLevelBonus', type: 'number', description: 'Damage ratio increase per level' },
						{ name: 'bonusAccuracyRatio', type: 'number', description: 'Bonus accuracy ratio' },
						{ name: 'bonusAccuracyRatioLevelBonus', type: 'number', description: 'Bonus accuracy ratio increase per level' },
						{ name: 'damageOverTimeRatio', type: 'number', description: 'Damage over time ratio' },
						{ name: 'damageOverTimeDuration', type: 'number', description: 'Duration of damage over time effect' },
						{ name: 'armorDamageRatio', type: 'number', description: 'Armor damage ratio' },
						{ name: 'armorDamageRatioLevelBonus', type: 'number', description: 'Armor damage ratio increase per level' },
						{ name: 'hpDrainRatio', type: 'number', description: 'HP drain ratio' },
						{ name: 'pierceChance', type: 'number', description: 'Chance to pierce defenses' },
						{ name: 'blindChance', type: 'number', description: 'Chance to blind target' },
						{ name: 'blindDuration', type: 'number', description: 'Duration of blind effect' },
						{ name: 'silenceChance', type: 'number', description: 'Chance to silence target' },
						{ name: 'silenceDuration', type: 'number', description: 'Duration of silence effect' },
						{ name: 'stunChance', type: 'number', description: 'Chance to stun target' },
						{ name: 'stunDuration', type: 'number', description: 'Duration of stun effect' },
						{ name: 'spendHpRatio', type: 'number', description: 'HP cost ratio for blood magic' },
						{
							name: 'buffs',
							type: 'array',
							nullable: true,
							items: {
								name: 'buff',
								type: 'object',
								properties: [
									{ name: 'uniqueHrid', type: 'string', description: 'Unique buff identifier' },
									{ name: 'typeHrid', type: 'string', description: 'Buff type HRID' },
									{ name: 'ratioBoost', type: 'number', description: 'Multiplicative boost amount' },
									{ name: 'ratioBoostLevelBonus', type: 'number', description: 'Ratio boost increase per level' },
									{ name: 'flatBoost', type: 'number', description: 'Flat additive boost amount' },
									{ name: 'flatBoostLevelBonus', type: 'number', description: 'Flat boost increase per level' },
									{ name: 'multiplierForSkillHrid', type: 'string', optional: true, description: 'Skill HRID that affects buff strength' },
									{ name: 'multiplierPerSkillLevel', type: 'number', optional: true, description: 'Buff strength increase per skill level' },
									{ name: 'startTime', type: 'string', description: 'When the buff starts' },
									{ name: 'duration', type: 'number', description: 'Buff duration in nanoseconds' }
								]
							},
							description: 'Buffs applied by this effect'
						}
					]
				},
				description: 'Array of effects this ability produces'
			},
			{
				name: 'defaultCombatTriggers',
				type: 'array',
				items: {
					name: 'combatTrigger',
					type: 'object',
					properties: [
						{ name: 'dependencyHrid', type: 'string', description: 'What to check (self, targeted_enemy, etc.)' },
						{ name: 'conditionHrid', type: 'string', description: 'What condition to check' },
						{ name: 'comparatorHrid', type: 'string', description: 'How to compare (greater_than_equal, etc.)' },
						{ name: 'value', type: 'number', description: 'Value to compare against' }
					]
				},
				description: 'Default AI triggers for using this ability'
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Sort order for displaying abilities'
			}
		]
	}

	protected override generateAdditionalExports(entities: Record<string, AbilityDetail>): string[] {
		// Group abilities by various criteria
		const specialAbilities: string[] = []
		const normalAbilities: string[] = []
		const abilitiesByTargetType: Record<string, string[]> = {}
		const abilitiesByEffectType: Record<string, string[]> = {}
		const damageAbilities: string[] = []
		const healingAbilities: string[] = []
		const buffAbilities: string[] = []
		const freeAbilities: string[] = []

		for (const [hrid, ability] of Object.entries(entities)) {
			if (ability.isSpecialAbility) {
				specialAbilities.push(hrid)
			} else {
				normalAbilities.push(hrid)
			}

			if (ability.manaCost === 0) {
				freeAbilities.push(hrid)
			}

			// Group by target types
			for (const effect of ability.abilityEffects) {
				const targetType = effect.targetType
				if (!abilitiesByTargetType[targetType]) {
					abilitiesByTargetType[targetType] = []
				}
				if (!abilitiesByTargetType[targetType].includes(hrid)) {
					abilitiesByTargetType[targetType].push(hrid)
				}

				// Group by effect types
				const effectType = effect.effectType
				if (!abilitiesByEffectType[effectType]) {
					abilitiesByEffectType[effectType] = []
				}
				if (!abilitiesByEffectType[effectType].includes(hrid)) {
					abilitiesByEffectType[effectType].push(hrid)
				}

				// Categorize abilities
				if (effectType === '/ability_effect_types/damage') {
					if (!damageAbilities.includes(hrid)) {
						damageAbilities.push(hrid)
					}
				} else if (effectType === '/ability_effect_types/heal') {
					if (!healingAbilities.includes(hrid)) {
						healingAbilities.push(hrid)
					}
				} else if (effectType === '/ability_effect_types/buff') {
					if (!buffAbilities.includes(hrid)) {
						buffAbilities.push(hrid)
					}
				}
			}
		}

		// Sort all arrays
		specialAbilities.sort()
		normalAbilities.sort()
		damageAbilities.sort()
		healingAbilities.sort()
		buffAbilities.sort()
		freeAbilities.sort()
		for (const abilities of Object.values(abilitiesByTargetType)) {
			abilities.sort()
		}
		for (const abilities of Object.values(abilitiesByEffectType)) {
			abilities.sort()
		}

		return [
			`/**
 * Special abilities (ultimate/powerful abilities)
 */
export const SPECIAL_ABILITIES = ${JSON.stringify(specialAbilities, null, 2)} as const`,

			`/**
 * Normal abilities (non-special)
 */
export const NORMAL_ABILITIES = ${JSON.stringify(normalAbilities, null, 2)} as const`,

			`/**
 * Abilities that deal damage
 */
export const DAMAGE_ABILITIES = ${JSON.stringify(damageAbilities, null, 2)} as const`,

			`/**
 * Abilities that heal
 */
export const HEALING_ABILITIES = ${JSON.stringify(healingAbilities, null, 2)} as const`,

			`/**
 * Abilities that apply buffs
 */
export const BUFF_ABILITIES = ${JSON.stringify(buffAbilities, null, 2)} as const`,

			`/**
 * Abilities with no mana cost
 */
export const FREE_ABILITIES = ${JSON.stringify(freeAbilities, null, 2)} as const`,

			`/**
 * Abilities grouped by target type
 */
export const ABILITIES_BY_TARGET_TYPE = ${JSON.stringify(abilitiesByTargetType, null, 2)} as const`,

			`/**
 * Abilities grouped by effect type
 */
export const ABILITIES_BY_EFFECT_TYPE = ${JSON.stringify(abilitiesByEffectType, null, 2)} as const`,

			`/**
 * Get abilities by target type
 */
export function getAbilitiesByTargetType(targetType: string): readonly AbilityHrid[] {
	return ABILITIES_BY_TARGET_TYPE[targetType as keyof typeof ABILITIES_BY_TARGET_TYPE] || []
}`,

			`/**
 * Get abilities by effect type
 */
export function getAbilitiesByEffectType(effectType: string): readonly AbilityHrid[] {
	return ABILITIES_BY_EFFECT_TYPE[effectType as keyof typeof ABILITIES_BY_EFFECT_TYPE] || []
}`,

			`/**
 * Check if an ability is special
 */
export function isSpecialAbility(hrid: AbilityHrid): boolean {
	return ABILITIES[hrid]?.isSpecialAbility ?? false
}`,

			`/**
 * Get abilities by mana cost range
 */
export function getAbilitiesByManaCostRange(minCost: number, maxCost: number): AbilityHrid[] {
	return Object.entries(ABILITIES)
		.filter(([_, ability]) => ability.manaCost >= minCost && ability.manaCost <= maxCost)
		.map(([hrid]) => hrid as AbilityHrid)
}`,

			`/**
 * Check if an ability has a specific target type
 */
export function hasTargetType(hrid: AbilityHrid, targetType: string): boolean {
	const ability = ABILITIES[hrid]
	if (!ability) return false
	return ability.abilityEffects.some(effect => effect.targetType === targetType)
}`,

			`/**
 * Check if an ability has a specific effect type
 */
export function hasEffectType(hrid: AbilityHrid, effectType: string): boolean {
	const ability = ABILITIES[hrid]
	if (!ability) return false
	return ability.abilityEffects.some(effect => effect.effectType === effectType)
}`,

			`/**
 * Get abilities sorted by their sort index
 */
export function getAbilitiesSorted(): Ability[] {
	return Object.values(ABILITIES).sort((a, b) => a.sortIndex - b.sortIndex)
}`,

			`/**
 * Get abilities that use a specific combat style
 */
export function getAbilitiesByCombatStyle(combatStyleHrid: string): AbilityHrid[] {
	return Object.entries(ABILITIES)
		.filter(([_, ability]) => 
			ability.abilityEffects.some(effect => effect.combatStyleHrid === combatStyleHrid)
		)
		.map(([hrid]) => hrid as AbilityHrid)
}`,

			`/**
 * Get abilities that deal a specific damage type
 */
export function getAbilitiesByDamageType(damageTypeHrid: string): AbilityHrid[] {
	return Object.entries(ABILITIES)
		.filter(([_, ability]) => 
			ability.abilityEffects.some(effect => effect.damageType === damageTypeHrid)
		)
		.map(([hrid]) => hrid as AbilityHrid)
}`
		]
	}
}