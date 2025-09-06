/**
 * @fileoverview ModularItemsGenerator - handles 894 items with full type safety
 * The most complex generator in the MWI Types system
 */

import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	ConstantDefinition,
	InterfaceDefinition,
	UtilityDefinition,
} from '../../core/types'

// Complete interfaces for full type safety
export interface Item {
	hrid: string
	name: string
	description: string
	categoryHrid: string
	sellPrice: number
	sortIndex: number

	// Optional properties (not present in all items)
	itemLevel?: number
	isTradable?: boolean

	// Detail objects by category
	alchemyDetail?: AlchemyDetail
	equipmentDetail?: EquipmentDetail
	consumableDetail?: ConsumableDetail
	abilityBookDetail?: AbilityBookDetail

	// Equipment-specific
	enhancementCosts?: ItemCost[]
	protectionItemHrids?: string[]

	// Loot-specific
	isOpenable?: boolean
	openKeyItemHrid?: string
}

export interface AlchemyDetail {
	bulkMultiplier: number
	isCoinifiable: boolean
	decomposeItems?: ItemCost[] | null
	transmuteSuccessRate: number
	transmuteDropTable?: DropTableEntry[]
}

export interface EquipmentDetail {
	type: string // EquipmentTypeHrid
	levelRequirements?: LevelRequirement[]
	combatStats?: CombatStats
	noncombatStats?: NoncombatStats
	combatEnhancementBonuses?: CombatStats
	noncombatEnhancementBonuses?: NoncombatStats
}

// Fully typed combat stats - no more [key: string]: any!
export interface CombatStats {
	// Core combat stats
	autoAttackDamage?: number
	magicAccuracy?: number
	stabEvasion?: number
	slashEvasion?: number
	smashEvasion?: number
	rangedEvasion?: number
	magicEvasion?: number
	armor?: number

	// Damage types
	stabDamage?: number
	slashDamage?: number
	smashDamage?: number
	rangedDamage?: number
	magicDamage?: number
	abilityDamage?: number

	// Accuracy types
	stabAccuracy?: number
	slashAccuracy?: number
	smashAccuracy?: number
	rangedAccuracy?: number

	// Resistances
	fireResistance?: number
	waterResistance?: number
	natureResistance?: number

	// Combat mechanics
	attackInterval?: number
	criticalRate?: number
	criticalDamage?: number
	castSpeed?: number
	attackSpeed?: number

	// Special effects
	tenacity?: number
	threat?: number
	lifeSteal?: number
	armorPenetration?: number
	defensiveDamage?: number

	// Amplification
	fireAmplify?: number
	waterAmplify?: number
	natureAmplify?: number
	healingAmplify?: number

	// Penetration
	firePenetration?: number
	waterPenetration?: number
	naturePenetration?: number

	// Health/Mana
	maxHitpoints?: number
	maxManapoints?: number
	hpRegenPer10?: number
	mpRegenPer10?: number

	// Experience bonuses
	attackExperience?: number
	defenseExperience?: number
	magicExperience?: number
	rangedExperience?: number
	meleeExperience?: number
	staminaExperience?: number
	intelligenceExperience?: number
	combatExperience?: number

	// Combat utilities
	foodSlots?: number
	drinkSlots?: number
	combatRareFind?: number
	combatDropRate?: number

	// Training bonuses
	primaryTraining?: string
	focusTraining?: string

	// Other combat mechanics
	damageType?: string
	combatStyleHrids?: string[]
	taskDamage?: number
	abilityHaste?: number

	// Special effects (continued)
	parry?: number
	pierce?: number
	weaken?: number
	curse?: number
	fury?: number
	mayhem?: number
	ripple?: number
	bloom?: number
	blaze?: number
	manaLeech?: number
	foodHaste?: number
	drinkConcentration?: number
}

// Fully typed noncombat stats based on skill patterns
export interface NoncombatStats {
	// Alchemy
	alchemySpeed?: number
	alchemyExperience?: number
	alchemyEfficiency?: number
	alchemyRareFind?: number

	// Brewing
	brewingSpeed?: number
	brewingExperience?: number
	brewingEfficiency?: number
	brewingRareFind?: number

	// Cheesesmithing
	cheesesmithingSpeed?: number
	cheesesmithingExperience?: number
	cheesesmithingEfficiency?: number
	cheesesmithingRareFind?: number

	// Cooking
	cookingSpeed?: number
	cookingExperience?: number
	cookingEfficiency?: number
	cookingRareFind?: number

	// Crafting
	craftingSpeed?: number
	craftingExperience?: number
	craftingEfficiency?: number
	craftingRareFind?: number

	// Enhancing
	enhancingSpeed?: number
	enhancingExperience?: number
	enhancingSuccess?: number
	enhancingRareFind?: number

	// Foraging
	foragingSpeed?: number
	foragingExperience?: number
	foragingEfficiency?: number
	foragingRareFind?: number

	// Milking
	milkingSpeed?: number
	milkingExperience?: number
	milkingEfficiency?: number
	milkingRareFind?: number

	// Tailoring
	tailoringSpeed?: number
	tailoringExperience?: number
	tailoringEfficiency?: number
	tailoringRareFind?: number

	// Woodcutting
	woodcuttingSpeed?: number
	woodcuttingExperience?: number
	woodcuttingEfficiency?: number
	woodcuttingRareFind?: number

	// General skilling bonuses
	skillingSpeed?: number
	skillingExperience?: number
	skillingEfficiency?: number
	skillingRareFind?: number
	skillingEssenceFind?: number
	gatheringQuantity?: number
	taskSpeed?: number
	drinkConcentration?: number
}

export interface ConsumableDetail {
	cooldownDuration: number
	usableInActionTypeMap?: { [key: string]: boolean }
	hitpointRestore: number
	manapointRestore: number
	recoveryDuration: number
	buffs?: Buff[]
	defaultCombatTriggers?: any
}

export interface AbilityBookDetail {
	abilityHrid: string
	levelRequirements?: LevelRequirement[]
	experienceGain: number
}

export interface ItemCost {
	itemHrid: string
	count: number
}

export interface DropTableEntry {
	itemHrid: string
	dropRate: number
	minCount: number
	maxCount: number
}

// Placeholder interfaces for SharedTypes imports
export interface LevelRequirement {
	skillHrid: string
	level: number
}

export interface Buff {
	uniqueHrid: string
	typeHrid: string
	ratioBoost?: number
	ratioBoostLevelBonus?: number
	flatBoost?: number
	flatBoostLevelBonus?: number
	startTime?: string
	duration?: number
}

export class ModularItemsGenerator extends ModularBaseGenerator<Item> {
	constructor() {
		super({
			entityName: 'Item',
			entityNamePlural: 'Items',
			sourceKey: 'itemDetailMap',
			outputPath: './src/generated/items',
			sharedTypes: ['LevelRequirement', 'DropTable'],
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'getByField', field: 'categoryHrid' },
				{ type: 'toMap' },
			],
		})
	}

	protected override defineInterfaces(): InterfaceDefinition[] {
		// Import dependencies - respecting domain boundaries
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Import types from other domains (DO NOT re-export - domain control)
		typesBuilder.addImport(
			'../itemcategories/types',
			['ItemCategoryHrid'],
			true,
		)
		typesBuilder.addImport(
			'../equipmenttypes/types',
			['EquipmentTypeHrid'],
			true,
		)
		typesBuilder.addImport(
			'../itemcategories/types',
			['ItemCategoryHrid'],
			true,
		)
		typesBuilder.addImport(
			'../equipmenttypes/types',
			['EquipmentTypeHrid'],
			true,
		)

		return [
			// Main Item interface
			{
				name: 'Item',
				properties: [
					{ name: 'hrid', type: 'ItemHrid', optional: false },
					{ name: 'name', type: 'string', optional: false },
					{ name: 'description', type: 'string', optional: false },
					{ name: 'categoryHrid', type: 'ItemCategoryHrid', optional: false },
					{ name: 'sellPrice', type: 'number', optional: false },
					{ name: 'sortIndex', type: 'number', optional: false },
					{ name: 'itemLevel', type: 'number', optional: true },
					{ name: 'isTradable', type: 'boolean', optional: true },
					{ name: 'alchemyDetail', type: 'AlchemyDetail', optional: true },
					{ name: 'equipmentDetail', type: 'EquipmentDetail', optional: true },
					{
						name: 'consumableDetail',
						type: 'ConsumableDetail',
						optional: true,
					},
					{
						name: 'abilityBookDetail',
						type: 'AbilityBookDetail',
						optional: true,
					},
					{ name: 'enhancementCosts', type: 'ItemCost[]', optional: true },
					{ name: 'protectionItemHrids', type: 'ItemHrid[]', optional: true },
					{ name: 'isOpenable', type: 'boolean', optional: true },
					{ name: 'openKeyItemHrid', type: 'ItemHrid', optional: true },
				],
			},

			// AlchemyDetail interface
			{
				name: 'AlchemyDetail',
				properties: [
					{ name: 'bulkMultiplier', type: 'number', optional: false },
					{ name: 'isCoinifiable', type: 'boolean', optional: false },
					{
						name: 'decomposeItems',
						type: 'ItemCost[] | null',
						optional: true,
					},
					{ name: 'transmuteSuccessRate', type: 'number', optional: false },
					{
						name: 'transmuteDropTable',
						type: 'DropTableEntry[]',
						optional: true,
					},
				],
			},

			// EquipmentDetail interface
			{
				name: 'EquipmentDetail',
				properties: [
					{ name: 'type', type: 'EquipmentTypeHrid', optional: false },
					{
						name: 'levelRequirements',
						type: 'LevelRequirement[]',
						optional: true,
					},
					{ name: 'combatStats', type: 'CombatStats', optional: true },
					{ name: 'noncombatStats', type: 'NoncombatStats', optional: true },
					{
						name: 'combatEnhancementBonuses',
						type: 'CombatStats',
						optional: true,
					},
					{
						name: 'noncombatEnhancementBonuses',
						type: 'NoncombatStats',
						optional: true,
					},
				],
			},

			// CombatStats interface with all 72 combat stats
			{
				name: 'CombatStats',
				properties: [
					// Basic damage and accuracy
					{ name: 'autoAttackDamage', type: 'number', optional: true },
					{ name: 'stabDamage', type: 'number', optional: true },
					{ name: 'slashDamage', type: 'number', optional: true },
					{ name: 'smashDamage', type: 'number', optional: true },
					{ name: 'rangedDamage', type: 'number', optional: true },
					{ name: 'magicDamage', type: 'number', optional: true },
					{ name: 'abilityDamage', type: 'number', optional: true },
					{ name: 'taskDamage', type: 'number', optional: true },

					// Accuracy stats
					{ name: 'stabAccuracy', type: 'number', optional: true },
					{ name: 'slashAccuracy', type: 'number', optional: true },
					{ name: 'smashAccuracy', type: 'number', optional: true },
					{ name: 'rangedAccuracy', type: 'number', optional: true },
					{ name: 'magicAccuracy', type: 'number', optional: true },

					// Evasion stats
					{ name: 'stabEvasion', type: 'number', optional: true },
					{ name: 'slashEvasion', type: 'number', optional: true },
					{ name: 'smashEvasion', type: 'number', optional: true },
					{ name: 'rangedEvasion', type: 'number', optional: true },
					{ name: 'magicEvasion', type: 'number', optional: true },

					// Defense
					{ name: 'armor', type: 'number', optional: true },
					{ name: 'armorPenetration', type: 'number', optional: true },
					{ name: 'defensiveDamage', type: 'number', optional: true },

					// Resistances
					{ name: 'fireResistance', type: 'number', optional: true },
					{ name: 'waterResistance', type: 'number', optional: true },
					{ name: 'natureResistance', type: 'number', optional: true },

					// Penetration
					{ name: 'firePenetration', type: 'number', optional: true },
					{ name: 'waterPenetration', type: 'number', optional: true },
					{ name: 'naturePenetration', type: 'number', optional: true },

					// Amplification
					{ name: 'fireAmplify', type: 'number', optional: true },
					{ name: 'waterAmplify', type: 'number', optional: true },
					{ name: 'natureAmplify', type: 'number', optional: true },
					{ name: 'healingAmplify', type: 'number', optional: true },

					// Critical & Speed
					{ name: 'criticalRate', type: 'number', optional: true },
					{ name: 'criticalDamage', type: 'number', optional: true },
					{ name: 'attackSpeed', type: 'number', optional: true },
					{ name: 'castSpeed', type: 'number', optional: true },
					{ name: 'attackInterval', type: 'number', optional: true },
					{ name: 'abilityHaste', type: 'number', optional: true },

					// Health & Mana
					{ name: 'maxHitpoints', type: 'number', optional: true },
					{ name: 'maxManapoints', type: 'number', optional: true },
					{ name: 'hpRegenPer10', type: 'number', optional: true },
					{ name: 'mpRegenPer10', type: 'number', optional: true },

					// Utility combat stats
					{ name: 'lifeSteal', type: 'number', optional: true },
					{ name: 'manaLeech', type: 'number', optional: true },
					{ name: 'tenacity', type: 'number', optional: true },
					{ name: 'threat', type: 'number', optional: true },

					// Special mechanics
					{ name: 'parry', type: 'number', optional: true },
					{ name: 'pierce', type: 'number', optional: true },
					{ name: 'weaken', type: 'number', optional: true },
					{ name: 'curse', type: 'number', optional: true },
					{ name: 'fury', type: 'number', optional: true },
					{ name: 'mayhem', type: 'number', optional: true },
					{ name: 'ripple', type: 'number', optional: true },
					{ name: 'bloom', type: 'number', optional: true },
					{ name: 'blaze', type: 'number', optional: true },

					// Experience bonuses
					{ name: 'attackExperience', type: 'number', optional: true },
					{ name: 'defenseExperience', type: 'number', optional: true },
					{ name: 'magicExperience', type: 'number', optional: true },
					{ name: 'rangedExperience', type: 'number', optional: true },
					{ name: 'meleeExperience', type: 'number', optional: true },
					{ name: 'staminaExperience', type: 'number', optional: true },
					{ name: 'intelligenceExperience', type: 'number', optional: true },
					{ name: 'combatExperience', type: 'number', optional: true },

					// Training (these are skill HRIDs, not numbers!)
					{ name: 'primaryTraining', type: 'string', optional: true },
					{ name: 'focusTraining', type: 'string', optional: true },

					// Food/Drink slots
					{ name: 'foodSlots', type: 'number', optional: true },
					{ name: 'drinkSlots', type: 'number', optional: true },
					{ name: 'foodHaste', type: 'number', optional: true },
					{ name: 'drinkConcentration', type: 'number', optional: true },

					// Loot modifiers
					{ name: 'combatRareFind', type: 'number', optional: true },
					{ name: 'combatDropRate', type: 'number', optional: true },

					// Other
					{ name: 'damageType', type: 'string', optional: true },
					{ name: 'combatStyleHrids', type: 'string[]', optional: true },
				],
			},

			// NoncombatStats interface with skill patterns
			{
				name: 'NoncombatStats',
				properties: [
					// Alchemy stats
					{ name: 'alchemySpeed', type: 'number', optional: true },
					{ name: 'alchemyExperience', type: 'number', optional: true },
					{ name: 'alchemyEfficiency', type: 'number', optional: true },
					{ name: 'alchemyRareFind', type: 'number', optional: true },
					// Brewing stats
					{ name: 'brewingSpeed', type: 'number', optional: true },
					{ name: 'brewingExperience', type: 'number', optional: true },
					{ name: 'brewingEfficiency', type: 'number', optional: true },
					{ name: 'brewingRareFind', type: 'number', optional: true },
					// Cheesesmithing stats
					{ name: 'cheesesmithingSpeed', type: 'number', optional: true },
					{ name: 'cheesesmithingExperience', type: 'number', optional: true },
					{ name: 'cheesesmithingEfficiency', type: 'number', optional: true },
					{ name: 'cheesesmithingRareFind', type: 'number', optional: true },
					// Cooking stats
					{ name: 'cookingSpeed', type: 'number', optional: true },
					{ name: 'cookingExperience', type: 'number', optional: true },
					{ name: 'cookingEfficiency', type: 'number', optional: true },
					{ name: 'cookingRareFind', type: 'number', optional: true },
					// Crafting stats
					{ name: 'craftingSpeed', type: 'number', optional: true },
					{ name: 'craftingExperience', type: 'number', optional: true },
					{ name: 'craftingEfficiency', type: 'number', optional: true },
					{ name: 'craftingRareFind', type: 'number', optional: true },
					// Enhancing stats
					{ name: 'enhancingSpeed', type: 'number', optional: true },
					{ name: 'enhancingExperience', type: 'number', optional: true },
					{ name: 'enhancingSuccess', type: 'number', optional: true },
					{ name: 'enhancingRareFind', type: 'number', optional: true },
					// Foraging stats
					{ name: 'foragingSpeed', type: 'number', optional: true },
					{ name: 'foragingExperience', type: 'number', optional: true },
					{ name: 'foragingEfficiency', type: 'number', optional: true },
					{ name: 'foragingRareFind', type: 'number', optional: true },
					// Milking stats
					{ name: 'milkingSpeed', type: 'number', optional: true },
					{ name: 'milkingExperience', type: 'number', optional: true },
					{ name: 'milkingEfficiency', type: 'number', optional: true },
					{ name: 'milkingRareFind', type: 'number', optional: true },
					// Tailoring stats
					{ name: 'tailoringSpeed', type: 'number', optional: true },
					{ name: 'tailoringExperience', type: 'number', optional: true },
					{ name: 'tailoringEfficiency', type: 'number', optional: true },
					{ name: 'tailoringRareFind', type: 'number', optional: true },
					// Woodcutting stats
					{ name: 'woodcuttingSpeed', type: 'number', optional: true },
					{ name: 'woodcuttingExperience', type: 'number', optional: true },
					{ name: 'woodcuttingEfficiency', type: 'number', optional: true },
					{ name: 'woodcuttingRareFind', type: 'number', optional: true },
					// General skilling stats
					{ name: 'skillingSpeed', type: 'number', optional: true },
					{ name: 'skillingExperience', type: 'number', optional: true },
					{ name: 'skillingEfficiency', type: 'number', optional: true },
					{ name: 'skillingRareFind', type: 'number', optional: true },
					{ name: 'skillingEssenceFind', type: 'number', optional: true },
					{ name: 'gatheringQuantity', type: 'number', optional: true },
					{ name: 'taskSpeed', type: 'number', optional: true },
					{ name: 'drinkConcentration', type: 'number', optional: true },
				],
			},

			// ConsumableDetail interface
			{
				name: 'ConsumableDetail',
				properties: [
					{ name: 'cooldownDuration', type: 'number', optional: false },
					{
						name: 'usableInActionTypeMap',
						type: '{ [key: string]: boolean }',
						optional: true,
					},
					{ name: 'hitpointRestore', type: 'number', optional: false },
					{ name: 'manapointRestore', type: 'number', optional: false },
					{ name: 'recoveryDuration', type: 'number', optional: false },
					{ name: 'buffs', type: 'Buff[]', optional: true },
					{ name: 'defaultCombatTriggers', type: 'any', optional: true },
				],
			},

			// AbilityBookDetail interface
			{
				name: 'AbilityBookDetail',
				properties: [
					{ name: 'abilityHrid', type: 'string', optional: false },
					{
						name: 'levelRequirements',
						type: 'LevelRequirement[]',
						optional: true,
					},
					{ name: 'experienceGain', type: 'number', optional: false },
				],
			},

			// ItemCost interface
			{
				name: 'ItemCost',
				properties: [
					{ name: 'itemHrid', type: 'ItemHrid', optional: false },
					{ name: 'count', type: 'number', optional: false },
				],
			},

			// DropTableEntry interface
			{
				name: 'DropTableEntry',
				properties: [
					{ name: 'itemHrid', type: 'ItemHrid', optional: false },
					{ name: 'dropRate', type: 'number', optional: false },
					{ name: 'minCount', type: 'number', optional: false },
					{ name: 'maxCount', type: 'number', optional: false },
				],
			},

			// Buff interface (will likely be imported from SharedTypes)
			{
				name: 'Buff',
				properties: [
					{ name: 'uniqueHrid', type: 'string', optional: false },
					{ name: 'typeHrid', type: 'string', optional: false },
					{ name: 'ratioBoost', type: 'number', optional: true },
					{ name: 'ratioBoostLevelBonus', type: 'number', optional: true },
					{ name: 'flatBoost', type: 'number', optional: true },
					{ name: 'flatBoostLevelBonus', type: 'number', optional: true },
					{ name: 'startTime', type: 'string', optional: true },
					{ name: 'duration', type: 'number', optional: true },
				],
			},
		]
	}

	protected override defineUtilities(): UtilityDefinition[] {
		// Custom utilities for business logic - will be implemented with hook system
		return []
	}

	protected override defineConstants(): ConstantDefinition[] {
		// Standard constants will be auto-generated
		return []
	}

	public override extractEntities(sourceData: any): Record<string, Item> {
		const itemMap = sourceData.itemDetailMap || {}
		const entities: Record<string, Item> = {}

		for (const [hrid, rawData] of Object.entries(itemMap)) {
			// The framework's cleanEntityData will automatically handle null-to-undefined conversion
			// No need for manual conversion here
			const item: Item = {
				hrid: (rawData as any).hrid,
				name: (rawData as any).name || '',
				description: (rawData as any).description || '',
				categoryHrid: (rawData as any).categoryHrid,
				sellPrice: (rawData as any).sellPrice || 0,
				sortIndex: (rawData as any).sortIndex || 0,
				itemLevel: (rawData as any).itemLevel,
				isTradable: (rawData as any).isTradable,
				alchemyDetail: (rawData as any).alchemyDetail,
				equipmentDetail: (rawData as any).equipmentDetail,
				consumableDetail: (rawData as any).consumableDetail,
				abilityBookDetail: (rawData as any).abilityBookDetail,
				enhancementCosts: (rawData as any).enhancementCosts,
				protectionItemHrids: (rawData as any).protectionItemHrids,
				isOpenable: (rawData as any).isOpenable,
				openKeyItemHrid: (rawData as any).openKeyItemHrid,
			}

			entities[hrid] = item
		}

		return entities
	}
}

// Required for dev CLI to run this generator standalone
if (import.meta.main) {
	const generator = new ModularItemsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
