import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

// Combat Stats interface for internal use
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

// Combat Details interface for internal use
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

// Monster Ability interface for internal use
interface MonsterAbility {
	abilityHrid: string
	level: number
	minDifficultyTier: number
}

// Drop Item interface for internal use
interface DropItem {
	itemHrid: string
	dropRate: number
	minCount: number
	maxCount: number
}

// Main Monster interface for internal use
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

/**
 * Modular Monsters Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularMonstersGenerator extends ModularBaseGenerator<Monster> {
	// Collect unique values for lookups
	private monstersByCombatLevel: Map<number, string[]> = new Map()
	private monstersByDamageType: Map<string, string[]> = new Map()
	private abilityHrids: Set<string> = new Set()
	private itemHrids: Set<string> = new Set()
	private damageTypeHrids: Set<string> = new Set()
	private combatStyleHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'Monster',
			entityNamePlural: 'Monsters',
			sourceKey: 'combatMonsterDetailMap',
			outputPath: './src/generated/monsters/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Monster> {
		const monsters: Record<string, Monster> = {}
		const monsterDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(monsterDetailMap)) {
			const monster = this.extractMonster(hrid as string, data as any)
			monsters[hrid] = monster
			this.collectForLookups(monster)
		}

		console.log(`  👹 Extracted ${Object.keys(monsters).length} monsters`)
		console.log(`  ⚔️  ${this.monstersByCombatLevel.size} combat levels`)
		console.log(`  💥 ${this.monstersByDamageType.size} damage types`)
		console.log(`  🎯 ${this.abilityHrids.size} unique abilities`)
		console.log(`  💎 ${this.itemHrids.size} unique items in drops`)

		return monsters
	}

	private extractMonster(hrid: string, data: any): Monster {
		// Extract abilities
		const abilities: MonsterAbility[] = []
		if (data.abilities) {
			for (const ability of data.abilities) {
				abilities.push({
					abilityHrid: ability.abilityHrid,
					level: typeof ability.level === 'number' ? ability.level : 0,
					minDifficultyTier:
						typeof ability.minDifficultyTier === 'number'
							? ability.minDifficultyTier
							: 0,
				})
				this.abilityHrids.add(ability.abilityHrid)
			}
		}

		// Extract drop table
		const dropTable: DropItem[] = []
		if (data.dropTable) {
			for (const drop of data.dropTable) {
				dropTable.push({
					itemHrid: drop.itemHrid,
					dropRate: typeof drop.dropRate === 'number' ? drop.dropRate : 0,
					minCount: typeof drop.minCount === 'number' ? drop.minCount : 0,
					maxCount: typeof drop.maxCount === 'number' ? drop.maxCount : 0,
				})
				this.itemHrids.add(drop.itemHrid)
			}
		}

		// Extract rare drop table
		const rareDropTable: DropItem[] = []
		if (data.rareDropTable) {
			for (const drop of data.rareDropTable) {
				rareDropTable.push({
					itemHrid: drop.itemHrid,
					dropRate: typeof drop.dropRate === 'number' ? drop.dropRate : 0,
					minCount: typeof drop.minCount === 'number' ? drop.minCount : 0,
					maxCount: typeof drop.maxCount === 'number' ? drop.maxCount : 0,
				})
				this.itemHrids.add(drop.itemHrid)
			}
		}

		// Extract combat stats
		const combatStats = data.combatDetails?.combatStats || {}
		const combatStyleHrids = combatStats.combatStyleHrids || []
		const damageType = combatStats.damageType || ''

		// Track unique values
		if (damageType) this.damageTypeHrids.add(damageType)
		combatStyleHrids.forEach((style: string) =>
			this.combatStyleHrids.add(style),
		)

		const monster: Monster = {
			hrid,
			name: data.name || '',
			enrageTime: typeof data.enrageTime === 'number' ? data.enrageTime : 0,
			experience: typeof data.experience === 'number' ? data.experience : 0,
			combatDetails: {
				currentHitpoints:
					typeof data.combatDetails?.currentHitpoints === 'number'
						? data.combatDetails.currentHitpoints
						: 0,
				maxHitpoints:
					typeof data.combatDetails?.maxHitpoints === 'number'
						? data.combatDetails.maxHitpoints
						: 0,
				currentManapoints:
					typeof data.combatDetails?.currentManapoints === 'number'
						? data.combatDetails.currentManapoints
						: 0,
				maxManapoints:
					typeof data.combatDetails?.maxManapoints === 'number'
						? data.combatDetails.maxManapoints
						: 0,
				attackInterval:
					typeof data.combatDetails?.attackInterval === 'number'
						? data.combatDetails.attackInterval
						: 0,
				totalCastSpeed:
					typeof data.combatDetails?.totalCastSpeed === 'number'
						? data.combatDetails.totalCastSpeed
						: 0,
				stabAccuracyRating:
					typeof data.combatDetails?.stabAccuracyRating === 'number'
						? data.combatDetails.stabAccuracyRating
						: 0,
				slashAccuracyRating:
					typeof data.combatDetails?.slashAccuracyRating === 'number'
						? data.combatDetails.slashAccuracyRating
						: 0,
				smashAccuracyRating:
					typeof data.combatDetails?.smashAccuracyRating === 'number'
						? data.combatDetails.smashAccuracyRating
						: 0,
				rangedAccuracyRating:
					typeof data.combatDetails?.rangedAccuracyRating === 'number'
						? data.combatDetails.rangedAccuracyRating
						: 0,
				magicAccuracyRating:
					typeof data.combatDetails?.magicAccuracyRating === 'number'
						? data.combatDetails.magicAccuracyRating
						: 0,
				defensiveMaxDamage:
					typeof data.combatDetails?.defensiveMaxDamage === 'number'
						? data.combatDetails.defensiveMaxDamage
						: 0,
				stabMaxDamage:
					typeof data.combatDetails?.stabMaxDamage === 'number'
						? data.combatDetails.stabMaxDamage
						: 0,
				slashMaxDamage:
					typeof data.combatDetails?.slashMaxDamage === 'number'
						? data.combatDetails.slashMaxDamage
						: 0,
				smashMaxDamage:
					typeof data.combatDetails?.smashMaxDamage === 'number'
						? data.combatDetails.smashMaxDamage
						: 0,
				rangedMaxDamage:
					typeof data.combatDetails?.rangedMaxDamage === 'number'
						? data.combatDetails.rangedMaxDamage
						: 0,
				magicMaxDamage:
					typeof data.combatDetails?.magicMaxDamage === 'number'
						? data.combatDetails.magicMaxDamage
						: 0,
				stabEvasionRating:
					typeof data.combatDetails?.stabEvasionRating === 'number'
						? data.combatDetails.stabEvasionRating
						: 0,
				slashEvasionRating:
					typeof data.combatDetails?.slashEvasionRating === 'number'
						? data.combatDetails.slashEvasionRating
						: 0,
				smashEvasionRating:
					typeof data.combatDetails?.smashEvasionRating === 'number'
						? data.combatDetails.smashEvasionRating
						: 0,
				rangedEvasionRating:
					typeof data.combatDetails?.rangedEvasionRating === 'number'
						? data.combatDetails.rangedEvasionRating
						: 0,
				magicEvasionRating:
					typeof data.combatDetails?.magicEvasionRating === 'number'
						? data.combatDetails.magicEvasionRating
						: 0,
				totalArmor:
					typeof data.combatDetails?.totalArmor === 'number'
						? data.combatDetails.totalArmor
						: 0,
				totalWaterResistance:
					typeof data.combatDetails?.totalWaterResistance === 'number'
						? data.combatDetails.totalWaterResistance
						: 0,
				totalNatureResistance:
					typeof data.combatDetails?.totalNatureResistance === 'number'
						? data.combatDetails.totalNatureResistance
						: 0,
				totalFireResistance:
					typeof data.combatDetails?.totalFireResistance === 'number'
						? data.combatDetails.totalFireResistance
						: 0,
				totalThreat:
					typeof data.combatDetails?.totalThreat === 'number'
						? data.combatDetails.totalThreat
						: 0,
				combatLevel:
					typeof data.combatDetails?.combatLevel === 'number'
						? data.combatDetails.combatLevel
						: 0,
				staminaLevel:
					typeof data.combatDetails?.staminaLevel === 'number'
						? data.combatDetails.staminaLevel
						: 0,
				intelligenceLevel:
					typeof data.combatDetails?.intelligenceLevel === 'number'
						? data.combatDetails.intelligenceLevel
						: 0,
				attackLevel:
					typeof data.combatDetails?.attackLevel === 'number'
						? data.combatDetails.attackLevel
						: 0,
				meleeLevel:
					typeof data.combatDetails?.meleeLevel === 'number'
						? data.combatDetails.meleeLevel
						: 0,
				defenseLevel:
					typeof data.combatDetails?.defenseLevel === 'number'
						? data.combatDetails.defenseLevel
						: 0,
				rangedLevel:
					typeof data.combatDetails?.rangedLevel === 'number'
						? data.combatDetails.rangedLevel
						: 0,
				magicLevel:
					typeof data.combatDetails?.magicLevel === 'number'
						? data.combatDetails.magicLevel
						: 0,
				combatStats: {
					combatStyleHrids,
					damageType,
					attackInterval:
						typeof combatStats.attackInterval === 'number'
							? combatStats.attackInterval
							: 0,
					autoAttackDamage:
						typeof combatStats.autoAttackDamage === 'number'
							? combatStats.autoAttackDamage
							: 0,
					fireAmplify:
						typeof combatStats.fireAmplify === 'number'
							? combatStats.fireAmplify
							: undefined,
					natureResistance:
						typeof combatStats.natureResistance === 'number'
							? combatStats.natureResistance
							: undefined,
					fireResistance:
						typeof combatStats.fireResistance === 'number'
							? combatStats.fireResistance
							: undefined,
					waterResistance:
						typeof combatStats.waterResistance === 'number'
							? combatStats.waterResistance
							: undefined,
				},
			},
			abilities,
			dropTable,
			rareDropTable,
		}

		// Don't clean dropTable and rareDropTable - they should always be arrays
		const cleaned = this.cleanEntityData(monster) as Monster
		
		// Ensure dropTable and rareDropTable are always arrays
		cleaned.dropTable = dropTable
		cleaned.rareDropTable = rareDropTable
		
		return cleaned
	}

	private collectForLookups(monster: Monster): void {
		const combatLevel = monster.combatDetails.combatLevel
		if (!this.monstersByCombatLevel.has(combatLevel)) {
			this.monstersByCombatLevel.set(combatLevel, [])
		}
		this.monstersByCombatLevel.get(combatLevel)!.push(monster.hrid)

		const damageType = monster.combatDetails.combatStats.damageType
		if (damageType) {
			if (!this.monstersByDamageType.has(damageType)) {
				this.monstersByDamageType.set(damageType, [])
			}
			this.monstersByDamageType.get(damageType)!.push(monster.hrid)
		}
	}

	protected override generateTypes(entities: Record<string, Monster>): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add file comment

		// Import and re-export types from modular modules
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../abilities/types', ['AbilityHrid'], true)
		typesBuilder.addImport('../combatstyles/types', ['CombatStyleHrid'], true)
		typesBuilder.addImport('../damagetypes/types', ['DamageTypeHrid'], true)
		
		// Re-export imported types
		typesBuilder.getSourceFile().addExportDeclaration({
			namedExports: ['ItemHrid', 'AbilityHrid', 'CombatStyleHrid', 'DamageTypeHrid'],
			moduleSpecifier: undefined,
			isTypeOnly: true,
		})

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['MONSTER_HRIDS'], false)

		// Derive MonsterHrid type from constants
		typesBuilder.addType('MonsterHrid', 'typeof MONSTER_HRIDS[number]')

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
		typesBuilder.addInterface('CombatStats', combatStatsProps)

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
		typesBuilder.addInterface('CombatDetails', combatDetailsProps)

		// Monster Ability interface
		const abilityProps: PropertyDefinition[] = [
			{ name: 'abilityHrid', type: 'AbilityHrid' },
			{ name: 'level', type: 'number' },
			{ name: 'minDifficultyTier', type: 'number' },
		]
		typesBuilder.addInterface('MonsterAbility', abilityProps)

		// Drop Item interface
		const dropItemProps: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid' },
			{ name: 'dropRate', type: 'number' },
			{ name: 'minCount', type: 'number' },
			{ name: 'maxCount', type: 'number' },
		]
		typesBuilder.addInterface('DropItem', dropItemProps)

		// Monster interface
		const monsterProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'MonsterHrid' },
			{ name: 'name', type: 'string' },
			{ name: 'enrageTime', type: 'number' },
			{ name: 'experience', type: 'number' },
			{ name: 'combatDetails', type: 'CombatDetails' },
			{ name: 'abilities', type: 'MonsterAbility[]' },
			{ name: 'dropTable', type: 'DropItem[] | null' },
			{ name: 'rareDropTable', type: 'DropItem[] | null' },
		]
		typesBuilder.addInterface('Monster', monsterProps)

		// SpawnInfo interface for Actions generator
		const spawnInfoProps: PropertyDefinition[] = [
			{ name: 'combatMonsterHrid', type: 'MonsterHrid' },
			{ name: 'difficultyTier', type: 'number' },
			{ name: 'rate', type: 'number' },
			{ name: 'strength', type: 'number' },
		]
		typesBuilder.addInterface('SpawnInfo', spawnInfoProps)

		// Re-export all types from types module
		const types = [
			'ItemHrid',
			'AbilityHrid',
			'CombatStyleHrid',
			'DamageTypeHrid',
			'MonsterHrid',
			'CombatStats',
			'CombatDetails',
			'MonsterAbility',
			'DropItem',
			'Monster',
			'SpawnInfo',
		]
		types.forEach((name) => {
			this.moduleBuilder.addExport({ name, source: './types', isType: true })
		})
	}

	protected override generateConstants(
		entities: Record<string, Monster>,
	): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Add file comment

		// Generate MONSTER_HRIDS array
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('MONSTER_HRIDS', hrids)

		// Export from module
		this.moduleBuilder.addExport({
			name: 'MONSTER_HRIDS',
			source: './constants',
		})
	}

	// generateLazyData is handled by the base class

	protected override generateLookups(entities: Record<string, Monster>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Add file comment

		// Import types
		lookupsBuilder.addImport(
			'../monsters/types',
			['MonsterHrid', 'DamageTypeHrid'],
			true,
		)

		// Sort and convert Map entries to object format
		const levelMapEntries = Array.from(
			this.monstersByCombatLevel.entries(),
		).sort(([a], [b]) => a - b)

		// Build the object literal for MONSTERS_BY_COMBAT_LEVEL
		const levelLookupObject: Record<number, readonly string[]> = {}
		for (const [level, hrids] of levelMapEntries) {
			levelLookupObject[level] = hrids.sort()
		}

		lookupsBuilder.addStaticLookup(
			'MONSTERS_BY_COMBAT_LEVEL',
			'number',
			'readonly MonsterHrid[]',
			levelLookupObject,
		)

		// Sort and convert damage type Map entries to object format
		const damageTypeMapEntries = Array.from(
			this.monstersByDamageType.entries(),
		).sort(([a], [b]) => a.localeCompare(b))

		// Build the object literal for MONSTERS_BY_DAMAGE_TYPE
		const damageTypeLookupObject: Record<string, readonly string[]> = {}
		for (const [type, hrids] of damageTypeMapEntries) {
			damageTypeLookupObject[type] = hrids.sort()
		}

		lookupsBuilder.addStaticLookup(
			'MONSTERS_BY_DAMAGE_TYPE',
			'DamageTypeHrid',
			'readonly MonsterHrid[]',
			damageTypeLookupObject,
		)

		// Export from module
		this.moduleBuilder.addExport({
			name: 'MONSTERS_BY_COMBAT_LEVEL',
			source: './lookups',
		})
		this.moduleBuilder.addExport({
			name: 'MONSTERS_BY_DAMAGE_TYPE',
			source: './lookups',
		})
	}

	protected override generateUtilities(
		entities: Record<string, Monster>,
	): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types
		utilsBuilder.addImport(
			'../monsters/types',
			['Monster', 'MonsterHrid', 'ItemHrid', 'DamageTypeHrid'],
			true,
		)
		utilsBuilder.addImport('../monsters/data', ['getMonstersMap'], false)
		utilsBuilder.addImport('../monsters/constants', ['MONSTER_HRIDS'], false)
		utilsBuilder.addImport(
			'../monsters/lookups',
			['MONSTERS_BY_COMBAT_LEVEL', 'MONSTERS_BY_DAMAGE_TYPE'],
			false,
		)

		// Standard utility functions
		utilsBuilder.addFunction(
			'isMonsterHrid',
			[{ name: 'value', type: 'string' }],
			'value is MonsterHrid',
			(writer) => {
				writer.writeLine('return MONSTER_HRIDS.includes(value as MonsterHrid)')
			},
		)

		utilsBuilder.addFunction(
			'getMonster',
			[{ name: 'hrid', type: 'MonsterHrid' }],
			'Monster | undefined',
			(writer) => {
				writer.writeLine('return getMonstersMap().get(hrid)')
			},
		)

		utilsBuilder.addFunction(
			'requireMonster',
			[{ name: 'hrid', type: 'MonsterHrid' }],
			'Monster',
			(writer) => {
				writer.writeLine('const monster = getMonster(hrid)')
				writer.writeLine('if (!monster) {')
				writer.indent(() => {
					writer.writeLine(`throw new Error(\`Monster not found: \${hrid}\`)`)
				})
				writer.writeLine('}')
				writer.writeLine('return monster')
			},
		)

		utilsBuilder.addFunction('getAllMonsters', [], 'Monster[]', (writer) => {
			writer.writeLine('return Array.from(getMonstersMap().values())')
		})

		// Specialized utility functions
		utilsBuilder.addFunction(
			'getMonstersByCombatLevel',
			[{ name: 'level', type: 'number' }],
			'Monster[]',
			(writer) => {
				writer.writeLine('const hrids = MONSTERS_BY_COMBAT_LEVEL[level] || []')
				writer.writeLine(
					'return hrids.map(hrid => getMonster(hrid)!).filter(Boolean)',
				)
			},
		)

		utilsBuilder.addFunction(
			'getMonstersByDamageType',
			[{ name: 'damageType', type: 'DamageTypeHrid' }],
			'Monster[]',
			(writer) => {
				writer.writeLine(
					'const hrids = MONSTERS_BY_DAMAGE_TYPE[damageType] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => getMonster(hrid)!).filter(Boolean)',
				)
			},
		)

		utilsBuilder.addFunction(
			'getMonstersInLevelRange',
			[
				{ name: 'minLevel', type: 'number' },
				{ name: 'maxLevel', type: 'number' },
			],
			'Monster[]',
			(writer) => {
				writer.writeLine('return getAllMonsters().filter(m => ')
				writer.indent(() => {
					writer.writeLine('m.combatDetails.combatLevel >= minLevel &&')
					writer.writeLine('m.combatDetails.combatLevel <= maxLevel')
				})
				writer.writeLine(')')
			},
		)

		utilsBuilder.addFunction(
			'getItemDropChances',
			[{ name: 'itemHrid', type: 'ItemHrid' }],
			'Array<{ monsterHrid: MonsterHrid; dropRate: number; isRare: boolean }>',
			(writer) => {
				writer.writeLine(
					'const results: Array<{ monsterHrid: MonsterHrid; dropRate: number; isRare: boolean }> = []',
				)
				writer.newLine()
				writer.writeLine('getMonstersMap().forEach((monster, hrid) => {')
				writer.indent(() => {
					writer.writeLine('// Check normal drop table')
					writer.writeLine(
						'const normalDrop = monster.dropTable?.find(d => d.itemHrid === itemHrid)',
					)
					writer.writeLine('if (normalDrop) {')
					writer.indent(() => {
						writer.writeLine(
							'results.push({ monsterHrid: hrid, dropRate: normalDrop.dropRate, isRare: false })',
						)
					})
					writer.writeLine('}')
					writer.newLine()
					writer.writeLine('// Check rare drop table')
					writer.writeLine(
						'const rareDrop = monster.rareDropTable?.find(d => d.itemHrid === itemHrid)',
					)
					writer.writeLine('if (rareDrop) {')
					writer.indent(() => {
						writer.writeLine(
							'results.push({ monsterHrid: hrid, dropRate: rareDrop.dropRate, isRare: true })',
						)
					})
					writer.writeLine('}')
				})
				writer.writeLine('})')
				writer.newLine()
				writer.writeLine(
					'return results.sort((a, b) => b.dropRate - a.dropRate)',
				)
			},
		)

		utilsBuilder.addFunction(
			'searchMonsters',
			[{ name: 'query', type: 'string' }],
			'Monster[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('return getAllMonsters().filter(monster => ')
				writer.indent(() => {
					writer.writeLine('monster.name.toLowerCase().includes(lowerQuery) ||')
					writer.writeLine('monster.hrid.toLowerCase().includes(lowerQuery)')
				})
				writer.writeLine(')')
			},
		)

		// Export from module
		const utils = [
			'isMonsterHrid',
			'getMonster',
			'requireMonster',
			'getAllMonsters',
			'getMonstersByCombatLevel',
			'getMonstersByDamageType',
			'getMonstersInLevelRange',
			'getItemDropChances',
			'searchMonsters',
		]
		utils.forEach((name) => {
			this.moduleBuilder.addExport({ name, source: './utils' })
		})
	}
}
