import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

export class MonstersGenerator extends BaseGenerator<Monster> {
	// Collect unique values for type generation
	private abilityHrids: Set<string> = new Set()
	private itemHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'Monster',
			entityNamePlural: 'Monsters',
			sourceKey: 'combatMonsterDetailMap',
			outputPath: 'src/generated/types/monsters.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Monster> {
		const monsters: Record<string, Monster> = {}

		for (const [hrid, data] of Object.entries(
			sourceData.combatMonsterDetailMap,
		)) {
			const monster = this.extractMonsterFields(data)
			monsters[hrid as string] = monster
			this.collectUniqueValues(monster)
		}

		return monsters
	}

	private extractMonsterFields(data: any): Monster {
		const abilities: MonsterAbility[] = []
		if (data.abilities) {
			for (const ability of data.abilities) {
				abilities.push({
					abilityHrid: ability.abilityHrid,
					level: ability.level,
					minDifficultyTier: ability.minDifficultyTier,
				})
				this.abilityHrids.add(ability.abilityHrid)
			}
		}

		const dropTable: DropItem[] = []
		if (data.dropTable) {
			for (const drop of data.dropTable) {
				dropTable.push({
					itemHrid: drop.itemHrid,
					dropRate: drop.dropRate,
					minCount: drop.minCount,
					maxCount: drop.maxCount,
				})
				this.itemHrids.add(drop.itemHrid)
			}
		}

		const rareDropTable: DropItem[] = []
		if (data.rareDropTable) {
			for (const drop of data.rareDropTable) {
				rareDropTable.push({
					itemHrid: drop.itemHrid,
					dropRate: drop.dropRate,
					minCount: drop.minCount,
					maxCount: drop.maxCount,
				})
				this.itemHrids.add(drop.itemHrid)
			}
		}

		// Extract combat stats
		const combatStats = data.combatDetails?.combatStats || {}
		const combatStyleHrids = combatStats.combatStyleHrids || []
		const damageType = combatStats.damageType || ''

		return {
			hrid: data.hrid,
			name: data.name,
			enrageTime: data.enrageTime,
			experience: data.experience,
			combatDetails: {
				currentHitpoints: data.combatDetails.currentHitpoints,
				maxHitpoints: data.combatDetails.maxHitpoints,
				currentManapoints: data.combatDetails.currentManapoints,
				maxManapoints: data.combatDetails.maxManapoints,
				attackInterval: data.combatDetails.attackInterval,
				totalCastSpeed: data.combatDetails.totalCastSpeed,
				stabAccuracyRating: data.combatDetails.stabAccuracyRating,
				slashAccuracyRating: data.combatDetails.slashAccuracyRating,
				smashAccuracyRating: data.combatDetails.smashAccuracyRating,
				rangedAccuracyRating: data.combatDetails.rangedAccuracyRating,
				magicAccuracyRating: data.combatDetails.magicAccuracyRating,
				defensiveMaxDamage: data.combatDetails.defensiveMaxDamage,
				stabMaxDamage: data.combatDetails.stabMaxDamage,
				slashMaxDamage: data.combatDetails.slashMaxDamage,
				smashMaxDamage: data.combatDetails.smashMaxDamage,
				rangedMaxDamage: data.combatDetails.rangedMaxDamage,
				magicMaxDamage: data.combatDetails.magicMaxDamage,
				stabEvasionRating: data.combatDetails.stabEvasionRating,
				slashEvasionRating: data.combatDetails.slashEvasionRating,
				smashEvasionRating: data.combatDetails.smashEvasionRating,
				rangedEvasionRating: data.combatDetails.rangedEvasionRating,
				magicEvasionRating: data.combatDetails.magicEvasionRating,
				totalArmor: data.combatDetails.totalArmor,
				totalWaterResistance: data.combatDetails.totalWaterResistance,
				totalNatureResistance: data.combatDetails.totalNatureResistance,
				totalFireResistance: data.combatDetails.totalFireResistance,
				totalThreat: data.combatDetails.totalThreat,
				combatLevel: data.combatDetails.combatLevel,
				staminaLevel: data.combatDetails.staminaLevel,
				intelligenceLevel: data.combatDetails.intelligenceLevel,
				attackLevel: data.combatDetails.attackLevel,
				meleeLevel: data.combatDetails.meleeLevel,
				defenseLevel: data.combatDetails.defenseLevel,
				rangedLevel: data.combatDetails.rangedLevel,
				magicLevel: data.combatDetails.magicLevel,
				combatStats: {
					combatStyleHrids,
					damageType,
					attackInterval: combatStats.attackInterval || 0,
					autoAttackDamage: combatStats.autoAttackDamage || 0,
					fireAmplify: combatStats.fireAmplify || 0,
					natureResistance: combatStats.natureResistance || 0,
					fireResistance: combatStats.fireResistance || 0,
					waterResistance: combatStats.waterResistance || 0,
				},
			},
			abilities,
			dropTable,
			rareDropTable,
		}
	}

	protected override collectUniqueValues(monster: Monster): void {
		// Values are collected during extraction
	}

	protected override generateInterfaces(
		entities: Record<string, Monster>,
	): void {
		// Import external types
		this.builder.addImport('./items', ['ItemHrid'], true)
		this.builder.addImport('./abilities', ['AbilityHrid'], true)
		this.builder.addImport('./combat-styles', ['CombatStyleHrid'], true)
		this.builder.addImport('./damage-types', ['DamageTypeHrid'], true)

		// Combat Stats interface
		const combatStatsProps: PropertyDefinition[] = [
			{ name: 'combatStyleHrids', type: 'CombatStyleHrid[]' },
			{ name: 'damageType', type: 'DamageTypeHrid' },
			{ name: 'attackInterval', type: 'number' },
			{ name: 'autoAttackDamage', type: 'number' },
			{ name: 'fireAmplify', type: 'number', optional: true },
			{ name: 'natureResistance', type: 'number', optional: true },
			{ name: 'fireResistance', type: 'number', optional: true },
			{ name: 'waterResistance', type: 'number', optional: true },
		]
		this.builder.addInterface('CombatStats', combatStatsProps)

		// Combat Details interface
		const combatDetailsProps: PropertyDefinition[] = [
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
		]
		this.builder.addInterface('CombatDetails', combatDetailsProps)

		// Monster Ability interface
		const abilityProps: PropertyDefinition[] = [
			{ name: 'abilityHrid', type: 'AbilityHrid' },
			{ name: 'level', type: 'number' },
			{ name: 'minDifficultyTier', type: 'number' },
		]
		this.builder.addInterface('MonsterAbility', abilityProps)

		// Drop Item interface
		const dropItemProps: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid' },
			{ name: 'dropRate', type: 'number' },
			{ name: 'minCount', type: 'number' },
			{ name: 'maxCount', type: 'number' },
		]
		this.builder.addInterface('DropItem', dropItemProps)

		// Monster interface
		const monsterProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'MonsterHrid' },
			{ name: 'name', type: 'string' },
			{ name: 'enrageTime', type: 'number' },
			{ name: 'experience', type: 'number' },
			{ name: 'combatDetails', type: 'CombatDetails' },
			{ name: 'abilities', type: 'MonsterAbility[]' },
			{ name: 'dropTable', type: 'DropItem[]' },
			{ name: 'rareDropTable', type: 'DropItem[]' },
		]
		this.builder.addInterface('Monster', monsterProps)

		// SpawnInfo interface for Actions generator
		const spawnInfoProps: PropertyDefinition[] = [
			{ name: 'combatMonsterHrid', type: 'MonsterHrid' },
			{ name: 'difficultyTier', type: 'number' },
			{ name: 'rate', type: 'number' },
			{ name: 'strength', type: 'number' },
		]
		this.builder.addInterface('SpawnInfo', spawnInfoProps)
	}

	protected override generateUtilities(
		entities: Record<string, Monster>,
	): void {
		super.generateUtilities(entities)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(entities: Record<string, Monster>): void {
		// Group monsters by combat level
		const monstersByCombatLevel: Map<number, string[]> = new Map()
		for (const [hrid, monster] of Object.entries(entities)) {
			const level = monster.combatDetails.combatLevel
			if (!monstersByCombatLevel.has(level)) {
				monstersByCombatLevel.set(level, [])
			}
			monstersByCombatLevel.get(level)!.push(hrid)
		}

		// Convert to object and write
		const levelMapEntries = Array.from(monstersByCombatLevel.entries())
			.sort(([a], [b]) => a - b)
			.map(([level, hrids]) => [`${level}`, hrids])

		this.builder.addConstVariable(
			'MONSTERS_BY_COMBAT_LEVEL',
			'Partial<Record<number, readonly MonsterHrid[]>>',
			`{${levelMapEntries
				.map(([level, hrids]) => `\n  ${level}: ${JSON.stringify(hrids)}`)
				.join(',')}\n}`,
		)

		// Group monsters by damage type
		const monstersByDamageType: Map<string, string[]> = new Map()
		for (const [hrid, monster] of Object.entries(entities)) {
			const damageType = monster.combatDetails.combatStats.damageType
			if (!monstersByDamageType.has(damageType)) {
				monstersByDamageType.set(damageType, [])
			}
			monstersByDamageType.get(damageType)!.push(hrid)
		}

		const damageTypeMapEntries = Array.from(monstersByDamageType.entries())
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([type, hrids]) => [`'${type}'`, hrids])

		this.builder.addConstVariable(
			'MONSTERS_BY_DAMAGE_TYPE',
			'Partial<Record<DamageTypeHrid, readonly MonsterHrid[]>>',
			`{${damageTypeMapEntries
				.map(([type, hrids]) => `\n  ${type}: ${JSON.stringify(hrids)}`)
				.join(',')}\n}`,
		)
	}

	private generateSpecializedUtils(): void {
		// Get monsters by combat level
		this.builder.addFunction(
			'getMonstersByCombatLevel',
			[{ name: 'level', type: 'number' }],
			'Monster[]',
			(writer) => {
				writer.writeLine(`const hrids = MONSTERS_BY_COMBAT_LEVEL[level] || []`)
				writer.writeLine(
					`return hrids.map(hrid => MONSTERS.get(hrid)!).filter(Boolean)`,
				)
			},
		)

		// Get monsters by damage type
		this.builder.addFunction(
			'getMonstersByDamageType',
			[{ name: 'damageType', type: 'DamageTypeHrid' }],
			'Monster[]',
			(writer) => {
				writer.writeLine(
					`const hrids = MONSTERS_BY_DAMAGE_TYPE[damageType] || []`,
				)
				writer.writeLine(
					`return hrids.map(hrid => MONSTERS.get(hrid)!).filter(Boolean)`,
				)
			},
		)

		// Get monsters in level range
		this.builder.addFunction(
			'getMonstersInLevelRange',
			[
				{ name: 'minLevel', type: 'number' },
				{ name: 'maxLevel', type: 'number' },
			],
			'Monster[]',
			(writer) => {
				writer.writeLine(
					`return Array.from(MONSTERS.values()).filter(m => m.combatDetails.combatLevel >= minLevel && m.combatDetails.combatLevel <= maxLevel)`,
				)
			},
		)

		// Calculate drop chances for an item
		this.builder.addFunction(
			'getItemDropChances',
			[{ name: 'itemHrid', type: 'ItemHrid' }],
			'Array<{ monsterHrid: MonsterHrid; dropRate: number; isRare: boolean }>',
			(writer) => {
				writer.writeLine(
					`const results: Array<{ monsterHrid: MonsterHrid; dropRate: number; isRare: boolean }> = []`,
				)
				writer.newLine()
				writer.writeLine(`MONSTERS.forEach((monster, hrid) => {`)
				writer.indent(() => {
					writer.writeLine(`// Check normal drop table`)
					writer.writeLine(
						`const normalDrop = monster.dropTable.find(d => d.itemHrid === itemHrid)`,
					)
					writer.writeLine(`if (normalDrop) {`)
					writer.indent(() => {
						writer.writeLine(
							`results.push({ monsterHrid: hrid, dropRate: normalDrop.dropRate, isRare: false })`,
						)
					})
					writer.writeLine(`}`)
					writer.newLine()
					writer.writeLine(`// Check rare drop table`)
					writer.writeLine(
						`const rareDrop = monster.rareDropTable.find(d => d.itemHrid === itemHrid)`,
					)
					writer.writeLine(`if (rareDrop) {`)
					writer.indent(() => {
						writer.writeLine(
							`results.push({ monsterHrid: hrid, dropRate: rareDrop.dropRate, isRare: true })`,
						)
					})
					writer.writeLine(`}`)
				})
				writer.writeLine(`})`)
				writer.newLine()
				writer.writeLine(
					`return results.sort((a, b) => b.dropRate - a.dropRate)`,
				)
			},
		)
	}
}

// Type definitions for internal use
interface CombatStats {
	combatStyleHrids: string[]
	damageType: string
	attackInterval: number
	autoAttackDamage: number
	fireAmplify?: number
	natureResistance?: number
	fireResistance?: number
	waterResistance?: number
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
	abilityHrid: string
	level: number
	minDifficultyTier: number
}

interface DropItem {
	itemHrid: string
	dropRate: number
	minCount: number
	maxCount: number
}

interface Monster {
	hrid: string
	name: string
	enrageTime: number
	experience: number
	combatDetails: CombatDetails
	abilities: MonsterAbility[]
	dropTable: DropItem[]
	rareDropTable: DropItem[]
}
