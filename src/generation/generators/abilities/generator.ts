import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { CombatStyleHrid } from '../../../generated/combatstyles/types'
import type { DamageTypeHrid } from '../../../generated/damagetypes/types'
import type { Buff } from '../../../generated/sharedtypes/types'
import type { InterfaceDefinition } from '../../core/types'

export interface AbilityEffect {
	targetType: string
	effectType: string
	combatStyleHrid?: CombatStyleHrid
	damageType?: DamageTypeHrid
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
	buffs: Buff[] | null
}

export interface CombatTrigger {
	dependencyHrid: string
	conditionHrid: string
	comparatorHrid: string
	value: number
}

export interface Ability {
	hrid: string
	name: string
	description: string
	isSpecialAbility: boolean
	manaCost: number
	cooldownDuration: number
	castDuration: number
	abilityEffects: AbilityEffect[]
	defaultCombatTriggers: CombatTrigger[]
	sortIndex: number
}

export class ModularAbilitiesGenerator extends ModularBaseGenerator<Ability> {
	constructor() {
		super({
			entityName: 'Ability',
			entityNamePlural: 'Abilities',
			sourceKey: 'abilityDetailMap',
			outputPath: 'src/generated/abilities',

			// Disable data cleaning since Ability interfaces have explicit null fields
			applyDataCleaning: false,

			// Import shared types this generator needs
			sharedTypes: ['CombatStyleHrid', 'DamageTypeHrid', 'Buff'],

			// Standard utility templates
			utilityTemplates: [
				{ type: 'getByField', field: 'isSpecialAbility' },
				{ type: 'sortBy', field: 'manaCost' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],

			// Category filters for special abilities
			categoryFilters: [
				{
					name: 'special',
					condition: (ability: any) => ability.isSpecialAbility === true,
				},
				{
					name: 'regular',
					condition: (ability: any) => ability.isSpecialAbility === false,
				},
			],
		})
	}

	/**
	 * Define the complex nested interfaces for abilities
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'AbilityEffect',
				properties: [
					{
						name: 'targetType',
						type: 'string',
						description: 'Target type for the ability effect',
					},
					{
						name: 'effectType',
						type: 'string',
						description: 'Type of effect being applied',
					},
					{
						name: 'combatStyleHrid',
						type: 'CombatStyleHrid | undefined',
						description: 'Combat style associated with this effect',
					},
					{
						name: 'damageType',
						type: 'DamageTypeHrid | undefined',
						description: 'Damage type for this effect',
					},
					{
						name: 'baseDamageFlat',
						type: 'number',
						description: 'Base flat damage amount',
					},
					{
						name: 'baseDamageFlatLevelBonus',
						type: 'number',
						description: 'Flat damage bonus per level',
					},
					{
						name: 'baseDamageRatio',
						type: 'number',
						description: 'Base damage ratio multiplier',
					},
					{
						name: 'baseDamageRatioLevelBonus',
						type: 'number',
						description: 'Damage ratio bonus per level',
					},
					{
						name: 'bonusAccuracyRatio',
						type: 'number',
						description: 'Bonus accuracy ratio',
					},
					{
						name: 'bonusAccuracyRatioLevelBonus',
						type: 'number',
						description: 'Accuracy ratio bonus per level',
					},
					{
						name: 'damageOverTimeRatio',
						type: 'number',
						description: 'Damage over time ratio',
					},
					{
						name: 'damageOverTimeDuration',
						type: 'number',
						description: 'Duration of damage over time effect',
					},
					{
						name: 'armorDamageRatio',
						type: 'number',
						description: 'Armor damage ratio',
					},
					{
						name: 'armorDamageRatioLevelBonus',
						type: 'number',
						description: 'Armor damage ratio bonus per level',
					},
					{
						name: 'hpDrainRatio',
						type: 'number',
						description: 'HP drain ratio',
					},
					{
						name: 'pierceChance',
						type: 'number',
						description: 'Chance to pierce armor',
					},
					{
						name: 'blindChance',
						type: 'number',
						description: 'Chance to blind target',
					},
					{
						name: 'blindDuration',
						type: 'number',
						description: 'Duration of blind effect',
					},
					{
						name: 'silenceChance',
						type: 'number',
						description: 'Chance to silence target',
					},
					{
						name: 'silenceDuration',
						type: 'number',
						description: 'Duration of silence effect',
					},
					{
						name: 'stunChance',
						type: 'number',
						description: 'Chance to stun target',
					},
					{
						name: 'stunDuration',
						type: 'number',
						description: 'Duration of stun effect',
					},
					{
						name: 'spendHpRatio',
						type: 'number',
						description: 'Ratio of HP to spend for effect',
					},
					{
						name: 'buffs',
						type: 'Buff[] | null',
						description: 'Buffs applied by this effect',
					},
				],
			},
			{
				name: 'CombatTrigger',
				properties: [
					{
						name: 'dependencyHrid',
						type: 'string',
						description: 'Combat trigger dependency identifier',
					},
					{
						name: 'conditionHrid',
						type: 'string',
						description: 'Combat trigger condition identifier',
					},
					{
						name: 'comparatorHrid',
						type: 'string',
						description: 'Combat trigger comparator identifier',
					},
					{
						name: 'value',
						type: 'number',
						description: 'Comparison value for trigger condition',
					},
				],
			},
			{
				name: 'Ability',
				properties: [
					{
						name: 'hrid',
						type: 'string',
						description: 'Unique identifier for the ability',
					},
					{
						name: 'name',
						type: 'string',
						description: 'Display name of the ability',
					},
					{
						name: 'description',
						type: 'string',
						description: 'Description of what the ability does',
					},
					{
						name: 'isSpecialAbility',
						type: 'boolean',
						description: 'Whether this is a special ability',
					},
					{
						name: 'manaCost',
						type: 'number',
						description: 'Mana cost to cast the ability',
					},
					{
						name: 'cooldownDuration',
						type: 'number',
						description: 'Cooldown duration in nanoseconds',
					},
					{
						name: 'castDuration',
						type: 'number',
						description: 'Cast duration in nanoseconds',
					},
					{
						name: 'abilityEffects',
						type: 'AbilityEffect[]',
						description: 'Array of effects this ability produces',
					},
					{
						name: 'defaultCombatTriggers',
						type: 'CombatTrigger[]',
						description: 'Default combat triggers for this ability',
					},
					{
						name: 'sortIndex',
						type: 'number',
						description: 'Sort order index',
					},
				],
			},
		]
	}

	/**
	 * Transform raw data into Ability entities with complex nested structures
	 */
	protected override transformEntity(rawData: any): Ability {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			description: rawData.description,
			isSpecialAbility: rawData.isSpecialAbility,
			manaCost: rawData.manaCost,
			cooldownDuration: rawData.cooldownDuration,
			castDuration: rawData.castDuration,
			abilityEffects: rawData.abilityEffects || [],
			defaultCombatTriggers: rawData.defaultCombatTriggers || [],
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required main block for dev CLI
if (import.meta.main) {
	const generator = new ModularAbilitiesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
