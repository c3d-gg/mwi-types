import { ModularBaseGenerator } from '../../core/generator.base.modular'

// Import dependency types
import type { AbilityHrid } from '../../../generated/abilities/types'
import type { CombatStyleHrid } from '../../../generated/combatstyles/types'
import type { DamageTypeHrid } from '../../../generated/damagetypes/types'
import type { DropTable } from '../../../generated/sharedtypes/types'
import type {
	InterfaceDefinition,
	LookupDefinition,
	PropertyDefinition,
	UtilityDefinition,
} from '../../core/types'

// Internal interface for TypeScript typing (NOT exported)
interface CombatStats {
	combatStyleHrids: CombatStyleHrid[]
	damageType: DamageTypeHrid
	attackInterval: number
	autoAttackDamage?: number
	fireAmplify?: number
	natureResistance?: number
	fireResistance?: number
	waterResistance?: number
	// Add other optional combat modifiers as needed
}

interface CombatDetails {
	currentHitpoints: number
	maxHitpoints: number
	currentManapoints: number
	maxManapoints: number
	attackInterval: number
	totalCastSpeed: number
	stabAccuracyRating: number
	slashAccuracyRating: number
	smashAccuracyRating: number
	rangedAccuracyRating: number
	magicAccuracyRating: number
	defensiveMaxDamage: number
	stabMaxDamage: number
	slashMaxDamage: number
	smashMaxDamage: number
	rangedMaxDamage: number
	magicMaxDamage: number
	stabEvasionRating: number
	slashEvasionRating: number
	smashEvasionRating: number
	rangedEvasionRating: number
	magicEvasionRating: number
	totalArmor: number
	totalWaterResistance: number
	totalNatureResistance: number
	totalFireResistance: number
	totalThreat: number
	combatLevel: number
	staminaLevel: number
	intelligenceLevel: number
	attackLevel: number
	meleeLevel: number
	defenseLevel: number
	rangedLevel: number
	magicLevel: number
	combatStats: CombatStats
}

interface MonsterAbility {
	abilityHrid: AbilityHrid
	level: number
	minDifficultyTier: number
}

// Extended DropTable for monsters that includes difficulty tier scaling
interface MonsterDropTable extends DropTable {
	dropRatePerDifficultyTier?: number
}

interface Monster {
	hrid: MonsterHrid
	name: string
	enrageTime: number
	experience: number
	combatDetails: CombatDetails
	abilities: MonsterAbility[]
	dropTable: MonsterDropTable[]
	rareDropTable: MonsterDropTable[]
}

export type MonsterHrid = string & { __brand: 'MonsterHrid' }

export class ModularMonstersGenerator extends ModularBaseGenerator<Monster> {
	constructor() {
		super({
			entityName: 'Monster',
			entityNamePlural: 'Monsters',
			sourceKey: 'combatMonsterDetailMap',
			outputPath: 'src/generated/monsters',

			// Import shared types needed
			sharedTypes: ['DropTable'],

			// Use utility templates for common operations
			utilityTemplates: [
				// Removed getByField for combatLevel to avoid conflict with custom function
				{ type: 'sortBy', field: 'combatLevel' },
				{ type: 'filterBy' },
				{ type: 'toMap' },
			],

			// Complex entity - disable default data cleaning
			applyDataCleaning: false,
		})
	}

	// Custom entity extraction for complex monster data
	public override extractEntities(sourceData: any): Record<string, Monster> {
		const combatMonsterDetailMap = sourceData.combatMonsterDetailMap
		if (!combatMonsterDetailMap) {
			throw new Error('combatMonsterDetailMap not found in source data')
		}

		const monsters: Record<string, Monster> = {}

		for (const [hrid, rawData] of Object.entries(combatMonsterDetailMap)) {
			try {
				const monster = this.transformMonster(rawData)
				monsters[hrid] = monster
			} catch (error) {
				console.warn(`Failed to process monster ${hrid}:`, error)
			}
		}

		return monsters
	}

	private transformMonster(rawData: any): Monster {
		return {
			hrid: rawData.hrid as MonsterHrid,
			name: rawData.name,
			enrageTime: rawData.enrageTime,
			experience: rawData.experience,
			combatDetails: this.transformCombatDetails(rawData.combatDetails),
			abilities: rawData.abilities?.map(this.transformAbility) || [],
			dropTable: rawData.dropTable || [],
			rareDropTable: rawData.rareDropTable || [],
		}
	}

	private transformCombatDetails(rawCombatDetails: any): CombatDetails {
		return {
			currentHitpoints: rawCombatDetails.currentHitpoints,
			maxHitpoints: rawCombatDetails.maxHitpoints,
			currentManapoints: rawCombatDetails.currentManapoints,
			maxManapoints: rawCombatDetails.maxManapoints,
			attackInterval: rawCombatDetails.attackInterval,
			totalCastSpeed: rawCombatDetails.totalCastSpeed,
			stabAccuracyRating: rawCombatDetails.stabAccuracyRating,
			slashAccuracyRating: rawCombatDetails.slashAccuracyRating,
			smashAccuracyRating: rawCombatDetails.smashAccuracyRating,
			rangedAccuracyRating: rawCombatDetails.rangedAccuracyRating,
			magicAccuracyRating: rawCombatDetails.magicAccuracyRating,
			defensiveMaxDamage: rawCombatDetails.defensiveMaxDamage,
			stabMaxDamage: rawCombatDetails.stabMaxDamage,
			slashMaxDamage: rawCombatDetails.slashMaxDamage,
			smashMaxDamage: rawCombatDetails.smashMaxDamage,
			rangedMaxDamage: rawCombatDetails.rangedMaxDamage,
			magicMaxDamage: rawCombatDetails.magicMaxDamage,
			stabEvasionRating: rawCombatDetails.stabEvasionRating,
			slashEvasionRating: rawCombatDetails.slashEvasionRating,
			smashEvasionRating: rawCombatDetails.smashEvasionRating,
			rangedEvasionRating: rawCombatDetails.rangedEvasionRating,
			magicEvasionRating: rawCombatDetails.magicEvasionRating,
			totalArmor: rawCombatDetails.totalArmor,
			totalWaterResistance: rawCombatDetails.totalWaterResistance,
			totalNatureResistance: rawCombatDetails.totalNatureResistance,
			totalFireResistance: rawCombatDetails.totalFireResistance,
			totalThreat: rawCombatDetails.totalThreat,
			combatLevel: rawCombatDetails.combatLevel,
			staminaLevel: rawCombatDetails.staminaLevel,
			intelligenceLevel: rawCombatDetails.intelligenceLevel,
			attackLevel: rawCombatDetails.attackLevel,
			meleeLevel: rawCombatDetails.meleeLevel,
			defenseLevel: rawCombatDetails.defenseLevel,
			rangedLevel: rawCombatDetails.rangedLevel,
			magicLevel: rawCombatDetails.magicLevel,
			combatStats: this.transformCombatStats(rawCombatDetails.combatStats),
		}
	}

	private transformCombatStats(rawCombatStats: any): CombatStats {
		return {
			combatStyleHrids: rawCombatStats.combatStyleHrids || [],
			damageType: rawCombatStats.damageType as DamageTypeHrid,
			attackInterval: rawCombatStats.attackInterval,
			autoAttackDamage: rawCombatStats.autoAttackDamage,
			fireAmplify: rawCombatStats.fireAmplify,
			natureResistance: rawCombatStats.natureResistance,
			fireResistance: rawCombatStats.fireResistance,
			waterResistance: rawCombatStats.waterResistance,
		}
	}

	private transformAbility(rawAbility: any): MonsterAbility {
		return {
			abilityHrid: rawAbility.abilityHrid as AbilityHrid,
			level: rawAbility.level,
			minDifficultyTier: rawAbility.minDifficultyTier,
		}
	}

	// Define additional interfaces for complex nested structures
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'MonsterDropTable',
				properties: [
					{ name: 'itemHrid', type: 'string' },
					{ name: 'dropRate', type: 'number' },
					{ name: 'minCount', type: 'number' },
					{ name: 'maxCount', type: 'number' },
					{ name: 'dropRatePerDifficultyTier?', type: 'number' },
				] as PropertyDefinition[],
				description: 'Drop table entry with difficulty tier scaling for monsters',
			},
			{
				name: 'Monster',
				properties: [
					{ name: 'hrid', type: 'MonsterHrid' }, // ✅ EXPLICIT HRID TYPE!
					{ name: 'name', type: 'string' },
					{ name: 'enrageTime', type: 'number' },
					{ name: 'experience', type: 'number' },
					{ name: 'combatDetails', type: 'CombatDetails' },
					{ name: 'abilities', type: 'MonsterAbility[]' },
					{ name: 'dropTable', type: 'MonsterDropTable[]' },
					{ name: 'rareDropTable', type: 'MonsterDropTable[]' },
				] as PropertyDefinition[],
				description: 'Complete monster entity with combat details and rewards',
			},
			{
				name: 'CombatDetails',
				properties: [
					{ name: 'currentHitpoints', type: 'number' },
					{ name: 'maxHitpoints', type: 'number' },
					{ name: 'currentManapoints', type: 'number' },
					{ name: 'maxManapoints', type: 'number' },
					{ name: 'attackInterval', type: 'number' },
					{ name: 'totalCastSpeed', type: 'number' },
					{ name: 'stabAccuracyRating', type: 'number' },
					{ name: 'slashAccuracyRating', type: 'number' },
					{ name: 'smashAccuracyRating', type: 'number' },
					{ name: 'rangedAccuracyRating', type: 'number' },
					{ name: 'magicAccuracyRating', type: 'number' },
					{ name: 'defensiveMaxDamage', type: 'number' },
					{ name: 'stabMaxDamage', type: 'number' },
					{ name: 'slashMaxDamage', type: 'number' },
					{ name: 'smashMaxDamage', type: 'number' },
					{ name: 'rangedMaxDamage', type: 'number' },
					{ name: 'magicMaxDamage', type: 'number' },
					{ name: 'stabEvasionRating', type: 'number' },
					{ name: 'slashEvasionRating', type: 'number' },
					{ name: 'smashEvasionRating', type: 'number' },
					{ name: 'rangedEvasionRating', type: 'number' },
					{ name: 'magicEvasionRating', type: 'number' },
					{ name: 'totalArmor', type: 'number' },
					{ name: 'totalWaterResistance', type: 'number' },
					{ name: 'totalNatureResistance', type: 'number' },
					{ name: 'totalFireResistance', type: 'number' },
					{ name: 'totalThreat', type: 'number' },
					{ name: 'combatLevel', type: 'number' },
					{ name: 'staminaLevel', type: 'number' },
					{ name: 'intelligenceLevel', type: 'number' },
					{ name: 'attackLevel', type: 'number' },
					{ name: 'meleeLevel', type: 'number' },
					{ name: 'defenseLevel', type: 'number' },
					{ name: 'rangedLevel', type: 'number' },
					{ name: 'magicLevel', type: 'number' },
					{ name: 'combatStats', type: 'CombatStats' },
				] as PropertyDefinition[],
				description: 'Combat statistics and details for a monster',
			},
			{
				name: 'CombatStats',
				properties: [
					{ name: 'combatStyleHrids', type: 'CombatStyleHrid[]' },
					{ name: 'damageType', type: 'DamageTypeHrid' },
					{ name: 'attackInterval', type: 'number' },
					{ name: 'autoAttackDamage', type: 'number | undefined' },
					{ name: 'fireAmplify', type: 'number | undefined' },
					{ name: 'natureResistance', type: 'number | undefined' },
					{ name: 'fireResistance', type: 'number | undefined' },
					{ name: 'waterResistance', type: 'number | undefined' },
				] as PropertyDefinition[],
				description: 'Specific combat modifiers and attributes',
			},
			{
				name: 'MonsterAbility',
				properties: [
					{ name: 'abilityHrid', type: 'AbilityHrid' },
					{ name: 'level', type: 'number' },
					{ name: 'minDifficultyTier', type: 'number' },
				] as PropertyDefinition[],
				description: 'Ability configuration for a monster',
			},
		]
	}

	// Define custom utility functions
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getMonstersByDamageType',
				parameters: [{ name: 'damageType', type: 'DamageTypeHrid' }],
				returnType: 'Monster[]',
				implementation: (writer: any) => {
					writer.writeLine('const monsters = getMonstersRecord()')
					writer.writeLine(
						'return Object.values(monsters).filter(monster => monster.combatDetails.combatStats.damageType === damageType)',
					)
				},
			},
			{
				name: 'getMonstersByCombatLevel',
				parameters: [
					{ name: 'minLevel', type: 'number' },
					{ name: 'maxLevel', type: 'number | undefined' },
				],
				returnType: 'Monster[]',
				implementation: (writer: any) => {
					writer.writeLine('const monsters = getMonstersRecord()')
					writer.writeLine('return Object.values(monsters).filter(monster => {')
					writer.writeLine('  const level = monster.combatDetails.combatLevel')
					writer.writeLine('  if (maxLevel !== undefined) {')
					writer.writeLine('    return level >= minLevel && level <= maxLevel')
					writer.writeLine('  }')
					writer.writeLine('  return level >= minLevel')
					writer.writeLine('})')
				},
			},
			{
				name: 'getMonstersWithAbility',
				parameters: [{ name: 'abilityHrid', type: 'AbilityHrid' }],
				returnType: 'Monster[]',
				implementation: (writer: any) => {
					writer.writeLine('const monsters = getMonstersRecord()')
					writer.writeLine('return Object.values(monsters).filter(monster => ')
					writer.writeLine(
						'  monster.abilities.some(ability => ability.abilityHrid === abilityHrid)',
					)
					writer.writeLine(')')
				},
			},
		]
	}

	// Define lookup tables for efficient querying
	protected override defineLookups(): LookupDefinition[] {
		// For now, return empty array. Lookups will be implemented later.
		return []
	}

	// Import external types needed for this module
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import types from other domains
		typesBuilder.addImport('../combatstyles/types', ['CombatStyleHrid'], true)
		typesBuilder.addImport('../damagetypes/types', ['DamageTypeHrid'], true)
		typesBuilder.addImport('../abilities/types', ['AbilityHrid'], true)
	}
}

// Main execution block for dev CLI
if (import.meta.main) {
	const generator = new ModularMonstersGenerator()
	await generator.generate('./src/sources/game_data.json')
}
