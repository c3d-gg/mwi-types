import { ModularBaseGenerator } from '../core/generator.base.modular'
// Shared types - these interfaces are defined in the shared module
// They will be properly imported in generateTypes() method
interface LevelRequirement {
	skillHrid: string
	level: number
}
interface ExperienceGain {
	skillHrid: string
	value: number
}
interface ActionItem {
	itemHrid: string
	count: number
}
interface DropTable {
	itemHrid: string
	dropRate: number
	minCount: number
	maxCount: number
}
interface SpawnInfo {
	combatMonsterHrid: string
	difficultyTier: number
	rate: number
	strength: number
}
interface RandomSpawnInfo {
	maxSpawnCount: number
	maxTotalStrength: number
	spawns: SpawnInfo[]
}

import type { PropertyDefinition } from '../core/ast-builder'

interface FightInfo {
	randomSpawnInfo: RandomSpawnInfo
	bossSpawns: any | null
	battlesPerBoss: number
}

interface DungeonInfo {
	keyItemHrid: string
	rewardDropTable: DropTable[] | null
	maxWaves: number
	randomSpawnInfoMap: any | null
	fixedSpawnsMap: any | null
}

interface CombatZoneInfo {
	isDungeon: boolean
	fightInfo: FightInfo
	dungeonInfo: DungeonInfo
}

interface Action {
	hrid: string
	function: string
	type: string
	category: string
	name: string
	maxDifficulty: number
	levelRequirement: LevelRequirement | null
	baseTimeCost: number
	experienceGain: ExperienceGain | null
	dropTable: DropTable[] | null
	essenceDropTable: DropTable[] | null
	rareDropTable: DropTable[] | null
	upgradeItemHrid?: string
	retainAllEnhancement?: boolean
	inputItems: ActionItem[] | null
	outputItems: ActionItem[] | null
	combatZoneInfo: CombatZoneInfo | null
	maxPartySize: number
	buffs: unknown[] | null
	sortIndex?: number
}

/**
 * Modular Actions Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularActionsGenerator extends ModularBaseGenerator<Action> {
	// Collect unique values for lookups
	private actionsBySkill: Map<string, string[]> = new Map()
	private actionsByCategory: Map<string, string[]> = new Map()
	private actionsByType: Map<string, string[]> = new Map()
	private actionsByFunction: Map<string, string[]> = new Map()
	private combatActions: string[] = []
	private nonCombatActions: string[] = []
	private dungeonActions: string[] = []
	private productionActions: string[] = []
	private gatheringActions: string[] = []

	// Collect unique enum values
	private actionFunctions: Set<string> = new Set()
	private actionTypes: Set<string> = new Set()
	private actionCategories: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'Action',
			entityNamePlural: 'Actions',
			sourceKey: 'actionDetailMap',
			outputPath: './src/generated/actions/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Action> {
		const actions: Record<string, Action> = {}
		const actionDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(actionDetailMap)) {
			const action = this.extractAction(hrid as string, data as any)
			actions[hrid] = action
			this.collectForLookups(action)
		}

		console.log(`  ⚡ Extracted ${Object.keys(actions).length} actions`)
		console.log(`  🎯 ${this.actionsByCategory.size} categories`)
		console.log(`  🛠️ ${this.actionsBySkill.size} skills`)
		console.log(`  ⚔️ ${this.combatActions.length} combat actions`)
		console.log(`  🏰 ${this.dungeonActions.length} dungeon actions`)

		return actions
	}

	private extractAction(hrid: string, data: any): Action {
		return {
			hrid,
			function: data.function || '',
			type: data.type || '',
			category: data.category || '',
			name: data.name || '',
			maxDifficulty: typeof data.maxDifficulty === 'number' ? data.maxDifficulty : 0,
			levelRequirement: this.extractLevelRequirement(data.levelRequirement),
			baseTimeCost: typeof data.baseTimeCost === 'number' ? data.baseTimeCost : 0,
			experienceGain: this.extractExperienceGain(data.experienceGain),
			dropTable: this.extractDropTable(data.dropTable),
			essenceDropTable: this.extractDropTable(data.essenceDropTable),
			rareDropTable: this.extractDropTable(data.rareDropTable),
			upgradeItemHrid: data.upgradeItemHrid && data.upgradeItemHrid !== '' ? data.upgradeItemHrid : undefined,
			retainAllEnhancement: data.retainAllEnhancement === true ? true : undefined,
			inputItems: this.extractActionItems(data.inputItems),
			outputItems: this.extractActionItems(data.outputItems),
			combatZoneInfo: this.extractCombatZoneInfo(data.combatZoneInfo),
			maxPartySize: typeof data.maxPartySize === 'number' ? data.maxPartySize : 0,
			buffs: data.buffs && Array.isArray(data.buffs) && data.buffs.length > 0 ? data.buffs : null,
			sortIndex: typeof data.sortIndex === 'number' && data.sortIndex > 0 ? data.sortIndex : undefined,
		}
	}

	private extractLevelRequirement(req: any): LevelRequirement | null {
		if (!req || !req.skillHrid || req.skillHrid === '') return null
		return {
			skillHrid: req.skillHrid,
			level: typeof req.level === 'number' ? req.level : 0,
		}
	}

	private extractExperienceGain(exp: any): ExperienceGain | null {
		if (!exp || !exp.skillHrid || exp.skillHrid === '' || exp.value === 0) return null
		return {
			skillHrid: exp.skillHrid,
			value: typeof exp.value === 'number' ? exp.value : 0,
		}
	}

	private extractActionItems(items: any): ActionItem[] | null {
		if (!items || !Array.isArray(items) || items.length === 0) return null
		return items
			.filter((item: any) => item.itemHrid && item.itemHrid !== '')
			.map((item: any) => ({
				itemHrid: item.itemHrid,
				count: typeof item.count === 'number' ? item.count : 1,
			}))
	}

	private extractDropTable(dropTable: any): DropTable[] | null {
		if (!dropTable || !Array.isArray(dropTable) || dropTable.length === 0) return null
		return dropTable.map((drop: any) => ({
			itemHrid: drop.itemHrid || '',
			dropRate: typeof drop.dropRate === 'number' ? drop.dropRate : 0,
			minCount: typeof drop.minCount === 'number' ? drop.minCount : 0,
			maxCount: typeof drop.maxCount === 'number' ? drop.maxCount : 0,
		}))
	}

	private extractCombatZoneInfo(zoneInfo: any): CombatZoneInfo | null {
		if (!zoneInfo) return null

		const spawns: SpawnInfo[] = []
		if (zoneInfo.fightInfo?.randomSpawnInfo?.spawns && Array.isArray(zoneInfo.fightInfo.randomSpawnInfo.spawns)) {
			for (const spawn of zoneInfo.fightInfo.randomSpawnInfo.spawns) {
				spawns.push({
					combatMonsterHrid: spawn.combatMonsterHrid || '',
					difficultyTier: typeof spawn.difficultyTier === 'number' ? spawn.difficultyTier : 0,
					rate: typeof spawn.rate === 'number' ? spawn.rate : 0,
					strength: typeof spawn.strength === 'number' ? spawn.strength : 0,
				})
			}
		}

		return {
			isDungeon: zoneInfo.isDungeon === true,
			fightInfo: {
				randomSpawnInfo: {
					maxSpawnCount: typeof zoneInfo.fightInfo?.randomSpawnInfo?.maxSpawnCount === 'number' 
						? zoneInfo.fightInfo.randomSpawnInfo.maxSpawnCount : 0,
					maxTotalStrength: typeof zoneInfo.fightInfo?.randomSpawnInfo?.maxTotalStrength === 'number'
						? zoneInfo.fightInfo.randomSpawnInfo.maxTotalStrength : 0,
					spawns: spawns, // Always an array, never null
				},
				bossSpawns: zoneInfo.fightInfo?.bossSpawns || null,
				battlesPerBoss: typeof zoneInfo.fightInfo?.battlesPerBoss === 'number' 
					? zoneInfo.fightInfo.battlesPerBoss : 0,
			},
			dungeonInfo: {
				keyItemHrid: (zoneInfo.dungeonInfo?.keyItemHrid || '') as any,
				rewardDropTable: this.extractDropTable(zoneInfo.dungeonInfo?.rewardDropTable),
				maxWaves: typeof zoneInfo.dungeonInfo?.maxWaves === 'number' 
					? zoneInfo.dungeonInfo.maxWaves : 0,
				randomSpawnInfoMap: zoneInfo.dungeonInfo?.randomSpawnInfoMap || null,
				fixedSpawnsMap: zoneInfo.dungeonInfo?.fixedSpawnsMap || null,
			},
		}
	}

	private collectForLookups(action: Action): void {
		// By skill (if has level requirement)
		if (action.levelRequirement) {
			const skill = action.levelRequirement.skillHrid
			if (!this.actionsBySkill.has(skill)) {
				this.actionsBySkill.set(skill, [])
			}
			this.actionsBySkill.get(skill)!.push(action.hrid)
		}

		// By category
		if (action.category) {
			if (!this.actionsByCategory.has(action.category)) {
				this.actionsByCategory.set(action.category, [])
			}
			this.actionsByCategory.get(action.category)!.push(action.hrid)
			this.actionCategories.add(action.category)
		}

		// By type
		if (action.type) {
			if (!this.actionsByType.has(action.type)) {
				this.actionsByType.set(action.type, [])
			}
			this.actionsByType.get(action.type)!.push(action.hrid)
			this.actionTypes.add(action.type)
		}

		// By function
		if (action.function) {
			if (!this.actionsByFunction.has(action.function)) {
				this.actionsByFunction.set(action.function, [])
			}
			this.actionsByFunction.get(action.function)!.push(action.hrid)
			this.actionFunctions.add(action.function)
		}

		// Combat vs non-combat
		if (action.combatZoneInfo) {
			this.combatActions.push(action.hrid)
			
			// Dungeon actions
			if (action.combatZoneInfo.isDungeon) {
				this.dungeonActions.push(action.hrid)
			}
		} else {
			this.nonCombatActions.push(action.hrid)
		}

		// Production actions
		if (action.function === '/action_functions/production') {
			this.productionActions.push(action.hrid)
		}

		// Gathering actions
		if (action.function === '/action_functions/gathering') {
			this.gatheringActions.push(action.hrid)
		}
	}

	protected override generateTypes(entities: Record<string, Action>): void {
		// Import dependencies
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import types from other modules (DO NOT re-export - domain boundary)
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		typesBuilder.addImport('../monsters/types', ['MonsterHrid'], true)
		typesBuilder.addImport('../actioncategories/types', ['ActionCategoryHrid'], true)
		typesBuilder.addImport('../bufftypes/types', ['Buff', 'BuffTypeHrid'], true)

		// Import shared types from shared module
		typesBuilder.addImport('../sharedtypes/types', ['LevelRequirement', 'ExperienceGain', 'ActionItem', 'DropTable', 'SpawnInfo', 'RandomSpawnInfo'], true)

		// Generate type constants from collected values
		this.generateTypeConstants()

		this.moduleBuilder.addInterface('FightInfo', [
			{ name: 'randomSpawnInfo', type: 'RandomSpawnInfo', optional: false },
			{ name: 'bossSpawns', type: 'any | null', optional: false },
			{ name: 'battlesPerBoss', type: 'number', optional: false },
		])

		this.moduleBuilder.addInterface('DungeonInfo', [
			{ name: 'keyItemHrid', type: 'ItemHrid | ""', optional: false },
			{ name: 'rewardDropTable', type: 'DropTable[] | null', optional: false },
			{ name: 'maxWaves', type: 'number', optional: false },
			{ name: 'randomSpawnInfoMap', type: 'any | null', optional: false },
			{ name: 'fixedSpawnsMap', type: 'any | null', optional: false },
		])

		this.moduleBuilder.addInterface('CombatZoneInfo', [
			{ name: 'isDungeon', type: 'boolean', optional: false },
			{ name: 'fightInfo', type: 'FightInfo', optional: false },
			{ name: 'dungeonInfo', type: 'DungeonInfo', optional: false },
		])

		// Main Action interface
		const actionProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'ActionHrid', optional: false },
			{ name: 'function', type: 'ActionFunction', optional: false },
			{ name: 'type', type: 'ActionType', optional: false },
			{ name: 'category', type: 'ActionCategoryHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'maxDifficulty', type: 'number', optional: false },
			{ name: 'levelRequirement', type: 'LevelRequirement | null', optional: false },
			{ name: 'baseTimeCost', type: 'number', optional: false },
			{ name: 'experienceGain', type: 'ExperienceGain | null', optional: false },
			{ name: 'dropTable', type: 'DropTable[] | null', optional: false },
			{ name: 'essenceDropTable', type: 'DropTable[] | null', optional: false },
			{ name: 'rareDropTable', type: 'DropTable[] | null', optional: false },
			{ name: 'upgradeItemHrid', type: 'ItemHrid | undefined', optional: true },
			{ name: 'retainAllEnhancement', type: 'boolean | undefined', optional: true },
			{ name: 'inputItems', type: 'ActionItem[] | null', optional: false },
			{ name: 'outputItems', type: 'ActionItem[] | null', optional: false },
			{ name: 'combatZoneInfo', type: 'CombatZoneInfo | null', optional: false },
			{ name: 'maxPartySize', type: 'number', optional: false },
			{ name: 'buffs', type: 'Buff[] | null', optional: false },
			{ name: 'sortIndex', type: 'number | undefined', optional: true },
		]
		this.moduleBuilder.addInterface('Action', actionProps)
	}

	private generateTypeConstants(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Action Functions
		const functions = Array.from(this.actionFunctions).sort()
		typesBuilder.addConstArray('ACTION_FUNCTIONS', functions, true)
		typesBuilder.addType('ActionFunction', 'typeof ACTION_FUNCTIONS[number]')

		// Action Types
		const types = Array.from(this.actionTypes).sort()
		typesBuilder.addConstArray('ACTION_TYPES', types, true)
		typesBuilder.addType('ActionType', 'typeof ACTION_TYPES[number]')

		// Export these for external use
		this.moduleBuilder.addExport({ name: 'ACTION_FUNCTIONS', source: './types' })
		this.moduleBuilder.addExport({ name: 'ACTION_TYPES', source: './types' })
		this.moduleBuilder.addExport({ name: 'ActionFunction', source: './types', isType: true })
		this.moduleBuilder.addExport({ name: 'ActionType', source: './types', isType: true })
	}

	protected override generateLookups(entities: Record<string, Action>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')
		// Import local types from types.ts
		lookupsBuilder.addImport('./types', ['ActionHrid', 'ActionType', 'ActionFunction'], true)
		// Import foreign types from their source modules
		lookupsBuilder.addImport('../skills/types', ['SkillHrid'], true)
		lookupsBuilder.addImport('../actioncategories/types', ['ActionCategoryHrid'], true)

		// Actions by skill
		const skillLookup: Record<string, readonly string[]> = {}
		this.actionsBySkill.forEach((actions, skill) => {
			skillLookup[skill] = actions.sort()
		})
		// Note: Only add skills that have actions
		this.moduleBuilder.addStaticLookup(
			'ACTIONS_BY_SKILL',
			skillLookup,
			'string', // Use string instead of SkillHrid to allow partial record
			'readonly ActionHrid[]'
		)

		// Actions by category
		const categoryLookup: Record<string, readonly string[]> = {}
		this.actionsByCategory.forEach((actions, category) => {
			categoryLookup[category] = actions.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'ACTIONS_BY_CATEGORY',
			categoryLookup,
			'string', // Use string to avoid auto-import since ActionCategoryHrid is external
			'readonly ActionHrid[]'
		)

		// Actions by type
		const typeLookup: Record<string, readonly string[]> = {}
		this.actionsByType.forEach((actions, type) => {
			typeLookup[type] = actions.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'ACTIONS_BY_TYPE',
			typeLookup,
			'ActionType',
			'readonly ActionHrid[]'
		)

		// Actions by function
		const functionLookup: Record<string, readonly string[]> = {}
		this.actionsByFunction.forEach((actions, func) => {
			functionLookup[func] = actions.sort()
		})
		this.moduleBuilder.addStaticLookup(
			'ACTIONS_BY_FUNCTION',
			functionLookup,
			'ActionFunction',
			'readonly ActionHrid[]'
		)

		// Combat actions
		lookupsBuilder.addConstArray('COMBAT_ACTION_HRIDS', this.combatActions.sort(), true)
		this.moduleBuilder.addExport({ name: 'COMBAT_ACTION_HRIDS', source: './lookups' })

		// Non-combat actions
		lookupsBuilder.addConstArray('NON_COMBAT_ACTION_HRIDS', this.nonCombatActions.sort(), true)
		this.moduleBuilder.addExport({ name: 'NON_COMBAT_ACTION_HRIDS', source: './lookups' })

		// Dungeon actions
		lookupsBuilder.addConstArray('DUNGEON_ACTION_HRIDS', this.dungeonActions.sort(), true)
		this.moduleBuilder.addExport({ name: 'DUNGEON_ACTION_HRIDS', source: './lookups' })

		// Production actions
		lookupsBuilder.addConstArray('PRODUCTION_ACTION_HRIDS', this.productionActions.sort(), true)
		this.moduleBuilder.addExport({ name: 'PRODUCTION_ACTION_HRIDS', source: './lookups' })

		// Gathering actions
		lookupsBuilder.addConstArray('GATHERING_ACTION_HRIDS', this.gatheringActions.sort(), true)
		this.moduleBuilder.addExport({ name: 'GATHERING_ACTION_HRIDS', source: './lookups' })
	}

	protected override generateUtilities(entities: Record<string, Action>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Add action-specific utilities
		const getMapName = 'getActionsMap'

		// Get actions by skill
		this.moduleBuilder.addUtilityFunction(
			'getActionsBySkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'Action[]',
			(writer) => {
				writer.writeLine('const actionHrids = ACTIONS_BY_SKILL[skillHrid] || []')
				writer.writeLine('return actionHrids.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['ACTIONS_BY_SKILL'] },
				{ from: './types', names: ['Action'], isType: true },
				{ from: '../skills/types', names: ['SkillHrid'], isType: true },
			]
		)

		// Get actions by category
		this.moduleBuilder.addUtilityFunction(
			'getActionsByCategory',
			[{ name: 'categoryHrid', type: 'ActionCategoryHrid' }],
			'Action[]',
			(writer) => {
				writer.writeLine('const actionHrids = ACTIONS_BY_CATEGORY[categoryHrid] || []')
				writer.writeLine('return actionHrids.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['ACTIONS_BY_CATEGORY'] },
				{ from: './types', names: ['Action'], isType: true },
				{ from: '../actioncategories/types', names: ['ActionCategoryHrid'], isType: true },
			]
		)

		// Get actions by type
		this.moduleBuilder.addUtilityFunction(
			'getActionsByType',
			[{ name: 'type', type: 'ActionType' }],
			'Action[]',
			(writer) => {
				writer.writeLine('const actionHrids = ACTIONS_BY_TYPE[type] || []')
				writer.writeLine('return actionHrids.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['ACTIONS_BY_TYPE'] },
				{ from: './types', names: ['Action', 'ActionType'], isType: true },
			]
		)

		// Get combat actions
		this.moduleBuilder.addUtilityFunction(
			'getCombatActions',
			[],
			'Action[]',
			(writer) => {
				writer.writeLine('return COMBAT_ACTION_HRIDS.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['COMBAT_ACTION_HRIDS'] },
				{ from: './types', names: ['Action'], isType: true },
			]
		)

		// Get non-combat actions
		this.moduleBuilder.addUtilityFunction(
			'getNonCombatActions',
			[],
			'Action[]',
			(writer) => {
				writer.writeLine('return NON_COMBAT_ACTION_HRIDS.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['NON_COMBAT_ACTION_HRIDS'] },
				{ from: './types', names: ['Action'], isType: true },
			]
		)

		// Get dungeon actions
		this.moduleBuilder.addUtilityFunction(
			'getDungeonActions',
			[],
			'Action[]',
			(writer) => {
				writer.writeLine('return DUNGEON_ACTION_HRIDS.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['DUNGEON_ACTION_HRIDS'] },
				{ from: './types', names: ['Action'], isType: true },
			]
		)

		// Get actions by level
		this.moduleBuilder.addUtilityFunction(
			'getActionsByLevel',
			[{ name: 'skillHrid', type: 'SkillHrid' }, { name: 'level', type: 'number' }],
			'Action[]',
			(writer) => {
				writer.writeLine('const skillActions = getActionsBySkill(skillHrid)')
				writer.writeLine('return skillActions.filter(action => ')
				writer.writeLine('  action.levelRequirement && action.levelRequirement.level <= level')
				writer.writeLine(')')
			},
			[
				{ from: './types', names: ['Action'], isType: true },
				{ from: '../skills/types', names: ['SkillHrid'], isType: true },
			]
		)

		// Get actions by function
		this.moduleBuilder.addUtilityFunction(
			'getActionsByFunction',
			[{ name: 'func', type: 'ActionFunction' }],
			'Action[]',
			(writer) => {
				writer.writeLine('const actionHrids = ACTIONS_BY_FUNCTION[func] || []')
				writer.writeLine('return actionHrids.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['ACTIONS_BY_FUNCTION'] },
				{ from: './types', names: ['Action', 'ActionFunction'], isType: true },
			]
		)

		// Check if action is production type
		this.moduleBuilder.addUtilityFunction(
			'isProductionAction',
			[{ name: 'action', type: 'Action' }],
			'boolean',
			(writer) => {
				writer.writeLine('return action.function === "/action_functions/production"')
			},
			[{ from: './types', names: ['Action'], isType: true }],
		)

		// Check if action is combat type
		this.moduleBuilder.addUtilityFunction(
			'isCombatAction',
			[{ name: 'action', type: 'Action' }],
			'boolean',
			(writer) => {
				writer.writeLine('return action.combatZoneInfo !== null')
			},
			[{ from: './types', names: ['Action'], isType: true }],
		)

		// Check if action is gathering type
		this.moduleBuilder.addUtilityFunction(
			'isGatheringAction',
			[{ name: 'action', type: 'Action' }],
			'boolean',
			(writer) => {
				writer.writeLine('return action.function === "/action_functions/gathering"')
			},
			[{ from: './types', names: ['Action'], isType: true }],
		)

		// Check action requirements against player skills
		this.moduleBuilder.addUtilityFunction(
			'meetsActionRequirements',
			[{ name: 'action', type: 'Action' }, { name: 'playerSkills', type: 'Record<string, number>' }],
			'boolean',
			(writer) => {
				writer.writeLine('if (!action.levelRequirement) return true')
				writer.writeLine('const requiredLevel = action.levelRequirement.level')
				writer.writeLine('const playerLevel = playerSkills[action.levelRequirement.skillHrid] || 0')
				writer.writeLine('return playerLevel >= requiredLevel')
			},
			[{ from: './types', names: ['Action'], isType: true }],
		)

		// Check if player has required items for action
		this.moduleBuilder.addUtilityFunction(
			'hasRequiredItems',
			[{ name: 'action', type: 'Action' }, { name: 'inventory', type: 'Record<string, number>' }],
			'boolean',
			(writer) => {
				writer.writeLine('if (!action.inputItems) return true')
				writer.writeLine('return action.inputItems.every(item => {')
				writer.writeLine('  const inventoryCount = inventory[item.itemHrid] || 0')
				writer.writeLine('  return inventoryCount >= item.count')
				writer.writeLine('})')
			},
			[{ from: './types', names: ['Action'], isType: true }],
		)

		// Get all production actions
		this.moduleBuilder.addUtilityFunction(
			'getProductionActions',
			[],
			'Action[]',
			(writer) => {
				writer.writeLine('return PRODUCTION_ACTION_HRIDS.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['PRODUCTION_ACTION_HRIDS'] },
				{ from: './types', names: ['Action'], isType: true }
			],
		)

		// Get all gathering actions
		this.moduleBuilder.addUtilityFunction(
			'getGatheringActions',
			[],
			'Action[]',
			(writer) => {
				writer.writeLine('return GATHERING_ACTION_HRIDS.map(hrid => getAction(hrid)).filter(Boolean) as Action[]')
			},
			[
				{ from: './lookups', names: ['GATHERING_ACTION_HRIDS'] },
				{ from: './types', names: ['Action'], isType: true }
			],
		)
	}
}