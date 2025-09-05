import { ModularBaseGenerator } from '../core/generator.base.modular'
import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface AbilityEffect {
	targetType: string
	effectType: string
	combatStyleHrid?: string | null
	damageType?: string | null
	baseDamageFlat?: number
	baseDamageFlatLevelBonus?: number
	baseDamageRatio?: number
	baseDamageRatioLevelBonus?: number
	bonusAccuracyRatio?: number
	bonusAccuracyRatioLevelBonus?: number
	damageOverTimeRatio?: number
	damageOverTimeDuration?: number
	armorDamageRatio?: number
	armorDamageRatioLevelBonus?: number
	hpDrainRatio?: number
	pierceChance?: number
	blindChance?: number
	blindDuration?: number
	silenceChance?: number
	silenceDuration?: number
	stunChance?: number
	stunDuration?: number
	spendHpRatio?: number
	buffs?: any | null
}

interface CombatTrigger {
	dependencyHrid: string
	conditionHrid: string
	comparatorHrid: string
	value: number
}

interface Ability {
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

export class AbilitiesModularGenerator extends ModularBaseGenerator<Ability> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'Ability',
			entityNamePlural: 'Abilities',
			sourceKey: 'abilityDetailMap',
			outputPath: 'src/generated/abilities',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, Ability> {
		const abilities: Record<string, Ability> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const abilityData = data as any
			const ability: Ability = {
				hrid: abilityData.hrid || hrid,
				name: abilityData.name || '',
				description: abilityData.description || '',
				isSpecialAbility: abilityData.isSpecialAbility || false,
				manaCost: abilityData.manaCost || 0,
				cooldownDuration: abilityData.cooldownDuration || 0,
				castDuration: abilityData.castDuration || 0,
				abilityEffects: abilityData.abilityEffects || [],
				defaultCombatTriggers: abilityData.defaultCombatTriggers || [],
				sortIndex: abilityData.sortIndex || 0,
			}
			abilities[hrid] = ability
		}

		return abilities
	}

	protected override generateTypes(
		_abilities: Record<string, Ability>,
	): void {
		const typesFile = this.moduleBuilder.getFile('types')

		// Add JSDoc header
		typesFile.addComment('Combat ability type definitions')

		// Add temporary type aliases for external dependencies
		// These will be replaced with proper imports once those modules are modularized
		typesFile.addType('CombatStyleHrid', 'string')
		typesFile.addType('DamageTypeHrid', 'string')

		// Generate AbilityEffect interface
		const effectProperties: PropertyDefinition[] = [
			{
				name: 'targetType',
				type: 'string',
				optional: false,
				description: 'Target of the ability effect (enemy, self, ally)',
			},
			{
				name: 'effectType',
				type: 'string',
				optional: false,
				description: 'Type of effect applied',
			},
			{
				name: 'combatStyleHrid',
				type: 'CombatStyleHrid | null',
				optional: true,
				description: 'Combat style for damage calculations',
			},
			{
				name: 'damageType',
				type: 'DamageTypeHrid | null',
				optional: true,
				description: 'Type of damage dealt',
			},
			{
				name: 'baseDamageFlat',
				type: 'number',
				optional: true,
				description: 'Flat damage amount',
			},
			{
				name: 'baseDamageFlatLevelBonus',
				type: 'number',
				optional: true,
				description: 'Flat damage bonus per level',
			},
			{
				name: 'baseDamageRatio',
				type: 'number',
				optional: true,
				description: 'Damage ratio based on stats',
			},
			{
				name: 'baseDamageRatioLevelBonus',
				type: 'number',
				optional: true,
				description: 'Damage ratio bonus per level',
			},
			{
				name: 'bonusAccuracyRatio',
				type: 'number',
				optional: true,
				description: 'Bonus accuracy ratio',
			},
			{
				name: 'bonusAccuracyRatioLevelBonus',
				type: 'number',
				optional: true,
				description: 'Accuracy bonus per level',
			},
			{
				name: 'damageOverTimeRatio',
				type: 'number',
				optional: true,
				description: 'Damage over time ratio',
			},
			{
				name: 'damageOverTimeDuration',
				type: 'number',
				optional: true,
				description: 'Duration of damage over time effect',
			},
			{
				name: 'armorDamageRatio',
				type: 'number',
				optional: true,
				description: 'Armor damage ratio',
			},
			{
				name: 'armorDamageRatioLevelBonus',
				type: 'number',
				optional: true,
				description: 'Armor damage bonus per level',
			},
			{
				name: 'hpDrainRatio',
				type: 'number',
				optional: true,
				description: 'Life drain ratio',
			},
			{
				name: 'pierceChance',
				type: 'number',
				optional: true,
				description: 'Chance to pierce armor',
			},
			{
				name: 'blindChance',
				type: 'number',
				optional: true,
				description: 'Chance to blind target',
			},
			{
				name: 'blindDuration',
				type: 'number',
				optional: true,
				description: 'Duration of blind effect',
			},
			{
				name: 'silenceChance',
				type: 'number',
				optional: true,
				description: 'Chance to silence target',
			},
			{
				name: 'silenceDuration',
				type: 'number',
				optional: true,
				description: 'Duration of silence effect',
			},
			{
				name: 'stunChance',
				type: 'number',
				optional: true,
				description: 'Chance to stun target',
			},
			{
				name: 'stunDuration',
				type: 'number',
				optional: true,
				description: 'Duration of stun effect',
			},
			{
				name: 'spendHpRatio',
				type: 'number',
				optional: true,
				description: 'HP cost ratio for using ability',
			},
			{
				name: 'buffs',
				type: 'any',
				optional: true,
				description: 'Buffs applied by the ability',
			},
		]

		typesFile.addInterface('AbilityEffect', effectProperties)

		// Generate CombatTrigger interface
		const triggerProperties: PropertyDefinition[] = [
			{
				name: 'dependencyHrid',
				type: 'string',
				optional: false,
				description: 'Trigger dependency',
			},
			{
				name: 'conditionHrid',
				type: 'string',
				optional: false,
				description: 'Trigger condition',
			},
			{
				name: 'comparatorHrid',
				type: 'string',
				optional: false,
				description: 'Trigger comparator',
			},
			{
				name: 'value',
				type: 'number',
				optional: false,
				description: 'Trigger value',
			},
		]

		typesFile.addInterface('CombatTrigger', triggerProperties)

		// Generate Ability interface
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'AbilityHrid',
				optional: false,
				description: 'Unique identifier for the ability',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the ability',
			},
			{
				name: 'description',
				type: 'string',
				optional: false,
				description: 'Description of what the ability does',
			},
			{
				name: 'isSpecialAbility',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a special ability',
			},
			{
				name: 'manaCost',
				type: 'number',
				optional: false,
				description: 'Mana cost to use the ability',
			},
			{
				name: 'cooldownDuration',
				type: 'number',
				optional: false,
				description: 'Cooldown duration in nanoseconds',
			},
			{
				name: 'castDuration',
				type: 'number',
				optional: false,
				description: 'Cast time in nanoseconds',
			},
			{
				name: 'abilityEffects',
				type: 'AbilityEffect[]',
				optional: false,
				description: 'Effects applied by the ability',
			},
			{
				name: 'defaultCombatTriggers',
				type: 'CombatTrigger[]',
				optional: false,
				description: 'Default combat triggers for the ability',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		typesFile.addInterface('Ability', properties)

		// Export the hrid type derived from constants
		typesFile.addType('AbilityHrid', '(typeof ABILITY_HRIDS)[number]')

		// Add module exports
		this.moduleBuilder.addExport('types', 'Ability', false)
		this.moduleBuilder.addExport('types', 'AbilityHrid', false)
		this.moduleBuilder.addExport('types', 'AbilityEffect', false)
		this.moduleBuilder.addExport('types', 'CombatTrigger', false)
		this.moduleBuilder.addExport('types', 'CombatStyleHrid', false)
		this.moduleBuilder.addExport('types', 'DamageTypeHrid', false)
	}

	protected override generateConstants(
		entities: Record<string, Ability>,
	): void {
		const constantsFile = this.moduleBuilder.getFile('constants')

		// Generate ABILITY_HRIDS array
		const hrids = Object.keys(entities).sort()
		constantsFile.addConstArray('ABILITY_HRIDS', hrids, 'as const')

		// Separate special abilities
		const specialAbilities = hrids.filter(hrid => entities[hrid].isSpecialAbility)
		const regularAbilities = hrids.filter(hrid => !entities[hrid].isSpecialAbility)

		if (specialAbilities.length > 0) {
			constantsFile.addConstArray('SPECIAL_ABILITY_HRIDS', specialAbilities, 'as const')
		}
		if (regularAbilities.length > 0) {
			constantsFile.addConstArray('REGULAR_ABILITY_HRIDS', regularAbilities, 'as const')
		}

		// Export the constants
		this.moduleBuilder.addExport('constants', 'ABILITY_HRIDS')
		if (specialAbilities.length > 0) {
			this.moduleBuilder.addExport('constants', 'SPECIAL_ABILITY_HRIDS')
		}
		if (regularAbilities.length > 0) {
			this.moduleBuilder.addExport('constants', 'REGULAR_ABILITY_HRIDS')
		}
	}

	protected override generateLazyData(
		entities: Record<string, Ability>,
	): void {
		// Clean entity data before adding
		const cleanedEntries = Object.entries(entities)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([key, value]) => [
				key,
				this.cleanEntityData(value),
			]) as Array<[string, Ability]>

		// Use the moduleBuilder's addLazyData method which handles everything
		this.moduleBuilder.addLazyData(
			'Abilities',
			cleanedEntries,
			'AbilityHrid',
			'Ability',
		)
	}

	protected override generateLookups(
		entities: Record<string, Ability>,
	): void {
		const lookupsFile = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsFile.addImport('./types', ['Ability', 'AbilityHrid', 'DamageTypeHrid'], true)

		// Group abilities by damage type
		const byDamageType: Record<string, string[]> = {}
		for (const [hrid, ability] of Object.entries(entities)) {
			for (const effect of ability.abilityEffects) {
				if (effect.damageType) {
					if (!byDamageType[effect.damageType]) {
						byDamageType[effect.damageType] = []
					}
					if (!byDamageType[effect.damageType].includes(hrid)) {
						byDamageType[effect.damageType].push(hrid)
					}
				}
			}
		}

		// Sort the arrays
		for (const damageType in byDamageType) {
			byDamageType[damageType].sort()
		}

		lookupsFile.addStaticLookup(
			'ABILITIES_BY_DAMAGE_TYPE',
			'DamageTypeHrid',
			'readonly AbilityHrid[]',
			byDamageType,
			true // isPartial
		)

		// Group abilities by mana cost ranges
		const noCost: string[] = []
		const lowCost: string[] = []
		const mediumCost: string[] = []
		const highCost: string[] = []

		for (const [hrid, ability] of Object.entries(entities)) {
			if (ability.manaCost === 0) {
				noCost.push(hrid)
			} else if (ability.manaCost <= 20) {
				lowCost.push(hrid)
			} else if (ability.manaCost <= 50) {
				mediumCost.push(hrid)
			} else {
				highCost.push(hrid)
			}
		}

		lookupsFile.addStaticLookup(
			'ABILITIES_BY_MANA_COST',
			"'none' | 'low' | 'medium' | 'high'",
			'readonly AbilityHrid[]',
			{
				none: noCost.sort(),
				low: lowCost.sort(),
				medium: mediumCost.sort(),
				high: highCost.sort(),
			},
			false // not partial, all keys are present
		)

		// Export the lookups
		this.moduleBuilder.addExport('lookups', 'ABILITIES_BY_DAMAGE_TYPE')
		this.moduleBuilder.addExport('lookups', 'ABILITIES_BY_MANA_COST')
	}

	protected override generateUtilities(
		_entities: Record<string, Ability>,
	): void {
		const utilsFile = this.moduleBuilder.getFile('utils')

		// Import types and data
		utilsFile.addImport('./types', ['Ability', 'AbilityHrid', 'DamageTypeHrid'], true)
		utilsFile.addImport('./constants', ['ABILITY_HRIDS', 'SPECIAL_ABILITY_HRIDS', 'REGULAR_ABILITY_HRIDS'])
		utilsFile.addImport('./data', ['getAbilitiesMap'])
		utilsFile.addImport('./lookups', ['ABILITIES_BY_DAMAGE_TYPE', 'ABILITIES_BY_MANA_COST'])

		// Type guard
		utilsFile.addFunction(
			'isAbilityHrid',
			[{ name: 'value', type: 'string' }],
			'value is AbilityHrid',
			(writer) => {
				writer.writeLine('return ABILITY_HRIDS.includes(value as AbilityHrid)')
			}
		)

		// Getter
		utilsFile.addFunction(
			'getAbility',
			[{ name: 'hrid', type: 'AbilityHrid' }],
			'Ability | undefined',
			(writer) => {
				writer.writeLine('return getAbilitiesMap().get(hrid)')
			}
		)

		// Require getter
		utilsFile.addFunction(
			'requireAbility',
			[{ name: 'hrid', type: 'AbilityHrid' }],
			'Ability',
			(writer) => {
				writer.writeLine('const ability = getAbilitiesMap().get(hrid)')
				writer.writeLine('if (!ability) {')
				writer.indent(() => {
					writer.writeLine('throw new Error(`Ability not found: ${hrid}`)')
				})
				writer.writeLine('}')
				writer.writeLine('return ability')
			}
		)

		// Get all
		utilsFile.addFunction(
			'getAllAbilities',
			[],
			'Ability[]',
			(writer) => {
				writer.writeLine('return Array.from(getAbilitiesMap().values())')
			}
		)

		// Get special abilities
		utilsFile.addFunction(
			'getSpecialAbilities',
			[],
			'Ability[]',
			(writer) => {
				writer.writeLine('return (SPECIAL_ABILITY_HRIDS || []).map(hrid => requireAbility(hrid))')
			}
		)

		// Get regular abilities
		utilsFile.addFunction(
			'getRegularAbilities',
			[],
			'Ability[]',
			(writer) => {
				writer.writeLine('return (REGULAR_ABILITY_HRIDS || []).map(hrid => requireAbility(hrid))')
			}
		)

		// Get abilities by damage type
		utilsFile.addFunction(
			'getAbilitiesByDamageType',
			[{ name: 'damageType', type: 'DamageTypeHrid' }],
			'Ability[]',
			(writer) => {
				writer.writeLine('const hrids = ABILITIES_BY_DAMAGE_TYPE[damageType] || []')
				writer.writeLine('return hrids.map(hrid => requireAbility(hrid))')
			}
		)

		// Get abilities by mana cost range
		utilsFile.addFunction(
			'getAbilitiesByManaCost',
			[{ name: 'range', type: "'none' | 'low' | 'medium' | 'high'" }],
			'Ability[]',
			(writer) => {
				writer.writeLine('const hrids = ABILITIES_BY_MANA_COST[range]')
				writer.writeLine('return hrids.map(hrid => requireAbility(hrid))')
			}
		)

		// Sort by sortIndex
		utilsFile.addFunction(
			'sortAbilitiesByIndex',
			[{ name: 'abilities', type: 'Ability[]' }],
			'Ability[]',
			(writer) => {
				writer.writeLine('return [...abilities].sort((a, b) => a.sortIndex - b.sortIndex)')
			}
		)

		// Search abilities by name
		utilsFile.addFunction(
			'searchAbilities',
			[{ name: 'query', type: 'string' }],
			'Ability[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('return getAllAbilities().filter(ability =>')
				writer.indent(() => {
					writer.writeLine('ability.name.toLowerCase().includes(lowerQuery) ||')
					writer.writeLine('ability.description.toLowerCase().includes(lowerQuery)')
				})
				writer.writeLine(')')
			}
		)

		// Export utilities
		this.moduleBuilder.addExport('utils', 'isAbilityHrid')
		this.moduleBuilder.addExport('utils', 'getAbility')
		this.moduleBuilder.addExport('utils', 'requireAbility')
		this.moduleBuilder.addExport('utils', 'getAllAbilities')
		this.moduleBuilder.addExport('utils', 'getSpecialAbilities')
		this.moduleBuilder.addExport('utils', 'getRegularAbilities')
		this.moduleBuilder.addExport('utils', 'getAbilitiesByDamageType')
		this.moduleBuilder.addExport('utils', 'getAbilitiesByManaCost')
		this.moduleBuilder.addExport('utils', 'sortAbilitiesByIndex')
		this.moduleBuilder.addExport('utils', 'searchAbilities')
	}
}