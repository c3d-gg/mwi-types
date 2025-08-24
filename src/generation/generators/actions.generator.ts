import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

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

// Buff is imported from buff-types.ts - maintaining strict domain separation

// Type definitions - these are used internally before generation
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
	dropTable: Array<DropTable> | null
	essenceDropTable: Array<DropTable> | null
	rareDropTable: Array<DropTable> | null
	upgradeItemHrid?: string
	retainAllEnhancement?: boolean
	inputItems: ActionItem[] | null
	outputItems: ActionItem[] | null
	combatZoneInfo: CombatZoneInfo | null
	maxPartySize: number
	buffs: unknown[] | null // Buff details processed internally, proper Buff type imported in generated code
	sortIndex?: number
}

export class ActionsGenerator extends BaseGenerator<Action> {
	// Collect unique values for type generation
	private actionFunctions: Set<string> = new Set()
	private actionTypes: Set<string> = new Set()
	private actionCategories: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'Action',
			entityNamePlural: 'Actions',
			sourceKey: 'actionDetailMap',
			outputPath: 'src/generated/types/actions.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Action> {
		const actions: Record<string, Action> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const action = this.extractActionFields(data as any)
			actions[hrid] = action
			this.collectUniqueValues(action)
		}

		return actions
	}

	private extractActionFields(data: any): Action {
		return {
			hrid: data.hrid,
			function: data.function,
			type: data.type,
			category: data.category,
			name: data.name,
			maxDifficulty: data.maxDifficulty,
			levelRequirement: this.extractLevelRequirement(data.levelRequirement),
			baseTimeCost: data.baseTimeCost,
			experienceGain: this.extractExperienceGain(data.experienceGain),
			dropTable: data.dropTable || null,
			essenceDropTable: data.essenceDropTable,
			rareDropTable: data.rareDropTable,
			upgradeItemHrid:
				data.upgradeItemHrid && data.upgradeItemHrid !== ''
					? data.upgradeItemHrid
					: undefined,
			retainAllEnhancement:
				data.retainAllEnhancement !== false
					? data.retainAllEnhancement
					: undefined,
			inputItems: this.extractActionItems(data.inputItems),
			outputItems: this.extractActionItems(data.outputItems),
			combatZoneInfo: this.extractCombatZoneInfo(data.combatZoneInfo),
			maxPartySize: data.maxPartySize,
			buffs: data.buffs,
			sortIndex: data.sortIndex > 0 ? data.sortIndex : undefined,
		}
	}

	private extractLevelRequirement(req: any): LevelRequirement | null {
		if (!req || !req.skillHrid || req.skillHrid === '') return null
		return {
			skillHrid: req.skillHrid,
			level: req.level,
		}
	}

	private extractExperienceGain(exp: any): ExperienceGain | null {
		if (!exp || !exp.skillHrid || exp.skillHrid === '' || exp.value === 0)
			return null
		return {
			skillHrid: exp.skillHrid,
			value: exp.value,
		}
	}

	private extractActionItems(items: any): ActionItem[] | null {
		if (!items || !Array.isArray(items) || items.length === 0) return null
		return items
			.filter((item: any) => item.itemHrid && item.itemHrid !== '')
			.map((item: any) => ({
				itemHrid: item.itemHrid,
				count: item.count || 1,
			}))
	}

	private extractCombatZoneInfo(zoneInfo: any): CombatZoneInfo | null {
		if (!zoneInfo) return null

		// Extract spawns from randomSpawnInfo
		const spawns: SpawnInfo[] = []
		if (zoneInfo.fightInfo?.randomSpawnInfo?.spawns) {
			for (const spawn of zoneInfo.fightInfo.randomSpawnInfo.spawns) {
				spawns.push({
					combatMonsterHrid: spawn.combatMonsterHrid,
					difficultyTier: spawn.difficultyTier || 0,
					rate: spawn.rate || 0,
					strength: spawn.strength || 0,
				})
			}
		}

		return {
			isDungeon: zoneInfo.isDungeon || false,
			fightInfo: {
				randomSpawnInfo: {
					maxSpawnCount:
						zoneInfo.fightInfo?.randomSpawnInfo?.maxSpawnCount || 0,
					maxTotalStrength:
						zoneInfo.fightInfo?.randomSpawnInfo?.maxTotalStrength || 0,
					spawns,
				},
				bossSpawns: zoneInfo.fightInfo?.bossSpawns || null,
				battlesPerBoss: zoneInfo.fightInfo?.battlesPerBoss || 0,
			},
			dungeonInfo: {
				keyItemHrid: zoneInfo.dungeonInfo?.keyItemHrid || '',
				rewardDropTable: this.extractDropTable(
					zoneInfo.dungeonInfo?.rewardDropTable,
				),
				maxWaves: zoneInfo.dungeonInfo?.maxWaves || 0,
				randomSpawnInfoMap: zoneInfo.dungeonInfo?.randomSpawnInfoMap || null,
				fixedSpawnsMap: zoneInfo.dungeonInfo?.fixedSpawnsMap || null,
			},
		}
	}

	private extractDropTable(dropTable: any): DropTable[] | null {
		if (!dropTable || !Array.isArray(dropTable) || dropTable.length === 0)
			return null
		return dropTable.map((drop: any) => ({
			itemHrid: drop.itemHrid,
			dropRate: drop.dropRate || 0,
			minCount: drop.minCount || 0,
			maxCount: drop.maxCount || 0,
		}))
	}

	protected override collectUniqueValues(action: Action): void {
		// Collect action metadata
		this.actionFunctions.add(action.function)
		this.actionTypes.add(action.type)
		this.actionCategories.add(action.category)
	}

	protected override generateInterfaces(
		entities: Record<string, Action>,
	): void {
		// Add imports from other generated files
		this.builder.addImport('./items', ['ItemHrid'], true)
		this.builder.addImport('./skills', ['SkillHrid'], true)
		this.builder.addImport('./monsters', ['MonsterHrid', 'SpawnInfo'], true)
		this.builder.addImport('./buff-types', ['Buff'], true)
		this.builder.addImport('./action-categories', ['ActionCategoryHrid'], true)

		// First generate type constants from collected values
		this.generateTypeConstants()

		// Helper interfaces
		const levelReqProps: PropertyDefinition[] = [
			{
				name: 'skillHrid',
				type: 'SkillHrid',
				optional: false,
				description: 'The skill required for this action',
			},
			{
				name: 'level',
				type: 'number',
				optional: false,
				description: 'The minimum skill level required',
			},
		]
		this.builder.addInterface('LevelRequirement', levelReqProps)

		const expGainProps: PropertyDefinition[] = [
			{
				name: 'skillHrid',
				type: 'SkillHrid',
				optional: false,
				description: 'The skill that gains experience',
			},
			{
				name: 'value',
				type: 'number',
				optional: false,
				description: 'The amount of experience gained',
			},
		]
		this.builder.addInterface('ExperienceGain', expGainProps)

		const actionItemProps: PropertyDefinition[] = [
			{
				name: 'itemHrid',
				type: 'ItemHrid',
				optional: false,
				description: 'The item HRID',
			},
			{
				name: 'count',
				type: 'number',
				optional: false,
				description: 'The number of items',
			},
		]
		this.builder.addInterface('ActionItem', actionItemProps)

		// Drop table with proper typing
		const dropTableProps: PropertyDefinition[] = [
			{
				name: 'itemHrid',
				type: 'ItemHrid',
				optional: false,
				description: 'The item that can drop',
			},
			{
				name: 'dropRate',
				type: 'number',
				optional: false,
				description: 'The drop rate (0-1)',
			},
			{
				name: 'minCount',
				type: 'number',
				optional: false,
				description: 'Minimum quantity that can drop',
			},
			{
				name: 'maxCount',
				type: 'number',
				optional: false,
				description: 'Maximum quantity that can drop',
			},
		]
		this.builder.addInterface('DropTable', dropTableProps)

		// SpawnInfo interface (imported from monsters.ts)
		// RandomSpawnInfo interface
		const randomSpawnInfoProps: PropertyDefinition[] = [
			{
				name: 'maxSpawnCount',
				type: 'number',
				optional: false,
				description: 'Maximum number of spawns',
			},
			{
				name: 'maxTotalStrength',
				type: 'number',
				optional: false,
				description: 'Maximum total strength of spawns',
			},
			{
				name: 'spawns',
				type: 'SpawnInfo[]',
				optional: false,
				description: 'Array of spawn information',
			},
		]
		this.builder.addInterface('RandomSpawnInfo', randomSpawnInfoProps)

		// FightInfo interface
		const fightInfoProps: PropertyDefinition[] = [
			{
				name: 'randomSpawnInfo',
				type: 'RandomSpawnInfo',
				optional: false,
				description: 'Random spawn configuration',
			},
			{
				name: 'bossSpawns',
				type: 'any | null',
				optional: false,
				description: 'Boss spawn configuration',
			},
			{
				name: 'battlesPerBoss',
				type: 'number',
				optional: false,
				description: 'Number of battles per boss',
			},
		]
		this.builder.addInterface('FightInfo', fightInfoProps)

		// DungeonInfo interface
		const dungeonInfoProps: PropertyDefinition[] = [
			{
				name: 'keyItemHrid',
				type: 'string',
				optional: false,
				description: 'Key item required for dungeon',
			},
			{
				name: 'rewardDropTable',
				type: 'DropTable[] | null',
				optional: false,
				description: 'Dungeon reward drops',
			},
			{
				name: 'maxWaves',
				type: 'number',
				optional: false,
				description: 'Maximum number of waves',
			},
			{
				name: 'randomSpawnInfoMap',
				type: 'any | null',
				optional: false,
				description: 'Map of random spawn info',
			},
			{
				name: 'fixedSpawnsMap',
				type: 'any | null',
				optional: false,
				description: 'Map of fixed spawns',
			},
		]
		this.builder.addInterface('DungeonInfo', dungeonInfoProps)

		// CombatZoneInfo interface
		const combatZoneProps: PropertyDefinition[] = [
			{
				name: 'isDungeon',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a dungeon',
			},
			{
				name: 'fightInfo',
				type: 'FightInfo',
				optional: false,
				description: 'Fight configuration',
			},
			{
				name: 'dungeonInfo',
				type: 'DungeonInfo',
				optional: false,
				description: 'Dungeon configuration',
			},
		]
		this.builder.addInterface('CombatZoneInfo', combatZoneProps)

		// Buff interface is imported from buff-types - no need to define here

		// Main Action interface
		const actionProps: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'ActionHrid',
				optional: false,
				description: 'The unique action identifier',
			},
			{
				name: 'function',
				type: 'ActionFunction',
				optional: false,
				description: 'The action function type',
			},
			{
				name: 'type',
				type: 'ActionType',
				optional: false,
				description: 'The action type',
			},
			{
				name: 'category',
				type: 'ActionCategoryHrid',
				optional: false,
				description: 'The action category',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'The display name of the action',
			},
			{
				name: 'maxDifficulty',
				type: 'number',
				optional: false,
				description: 'The maximum difficulty level',
			},
			{
				name: 'levelRequirement',
				type: 'LevelRequirement | null',
				optional: false,
				description: 'The skill level requirement',
			},
			{
				name: 'baseTimeCost',
				type: 'number',
				optional: false,
				description: 'Base time cost in milliseconds',
			},
			{
				name: 'experienceGain',
				type: 'ExperienceGain | null',
				optional: false,
				description: 'Experience gained from this action',
			},
			{
				name: 'dropTable',
				type: 'DropTable[] | null',
				optional: false,
				description: 'Normal drop table',
			},
			{
				name: 'essenceDropTable',
				type: 'DropTable[] | null',
				optional: false,
				description: 'Essence drop table',
			},
			{
				name: 'rareDropTable',
				type: 'DropTable[] | null',
				optional: false,
				description: 'Rare drop table',
			},
			{
				name: 'upgradeItemHrid',
				type: 'ItemHrid',
				optional: true,
				description: 'Item used for upgrading',
			},
			{
				name: 'retainAllEnhancement',
				type: 'boolean',
				optional: true,
				description: 'Whether to retain all enhancements',
			},
			{
				name: 'inputItems',
				type: 'ActionItem[] | null',
				optional: false,
				description: 'Required input items',
			},
			{
				name: 'outputItems',
				type: 'ActionItem[] | null',
				optional: false,
				description: 'Items produced by this action',
			},
			{
				name: 'combatZoneInfo',
				type: 'CombatZoneInfo | null',
				optional: false,
				description: 'Combat zone information',
			},
			{
				name: 'maxPartySize',
				type: 'number',
				optional: false,
				description: 'Maximum party size for this action',
			},
			{
				name: 'buffs',
				type: 'Buff[] | null',
				optional: false,
				description: 'Buffs applied during this action',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: true,
				description: 'Sort order index',
			},
		]

		this.builder.addInterface('Action', actionProps)
	}

	private generateTypeConstants(): void {
		// Action functions
		const sortedFunctions = Array.from(this.actionFunctions).sort()
		this.builder.addConstArray('ACTION_FUNCTIONS', sortedFunctions, true)
		this.builder.addTypeAlias(
			'ActionFunction',
			'typeof ACTION_FUNCTIONS[number]',
		)

		// Action types
		const sortedTypes = Array.from(this.actionTypes).sort()
		this.builder.addConstArray('ACTION_TYPES', sortedTypes, true)
		this.builder.addTypeAlias('ActionType', 'typeof ACTION_TYPES[number]')

		// Action category HRIDs (for grouping actions by category)
		const sortedCategories = Array.from(this.actionCategories).sort()
		this.builder.addConstArray('ACTION_CATEGORY_HRIDS', sortedCategories, true)
		this.builder.addTypeAlias(
			'ActionCategoryHridUsedInActions',
			'typeof ACTION_CATEGORY_HRIDS[number]',
		)
	}

	protected override generateUtilities(entities: Record<string, Action>): void {
		// Generate base utilities
		super.generateUtilities(entities)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(entities: Record<string, Action>): void {
		// Group actions by function
		const byFunction = new Map<string, string[]>()
		// Group actions by type
		const byType = new Map<string, string[]>()
		// Group actions by category
		const byCategory = new Map<string, string[]>()
		// Group actions by skill requirement
		const bySkill = new Map<string, string[]>()
		// Group production actions (recipes)
		const productionActions: string[] = []
		// Group combat actions
		const combatActions: string[] = []
		// Group gathering actions
		const gatheringActions: string[] = []

		for (const [hrid, action] of Object.entries(entities)) {
			// By function
			if (!byFunction.has(action.function)) {
				byFunction.set(action.function, [])
			}
			byFunction.get(action.function)!.push(hrid)

			// By type
			if (!byType.has(action.type)) {
				byType.set(action.type, [])
			}
			byType.get(action.type)!.push(hrid)

			// By category
			if (!byCategory.has(action.category)) {
				byCategory.set(action.category, [])
			}
			byCategory.get(action.category)!.push(hrid)

			// By skill requirement
			if (action.levelRequirement?.skillHrid) {
				const skill = action.levelRequirement.skillHrid
				if (!bySkill.has(skill)) {
					bySkill.set(skill, [])
				}
				bySkill.get(skill)!.push(hrid)
			}

			// Special groups
			if (action.function === '/action_functions/production') {
				productionActions.push(hrid)
			}
			if (action.function === '/action_functions/combat') {
				combatActions.push(hrid)
			}
			if (action.function === '/action_functions/gathering') {
				gatheringActions.push(hrid)
			}
		}

		// Generate lookup maps
		this.builder.addConstVariable(
			'ACTIONS_BY_FUNCTION',
			'Partial<Record<ActionFunction, readonly ActionHrid[]>>',
			JSON.stringify(Object.fromEntries(byFunction), null, 2),
		)

		this.builder.addConstVariable(
			'ACTIONS_BY_TYPE',
			'Partial<Record<ActionType, readonly ActionHrid[]>>',
			JSON.stringify(Object.fromEntries(byType), null, 2),
		)

		this.builder.addConstVariable(
			'ACTIONS_BY_CATEGORY',
			'Partial<Record<ActionCategoryHrid, readonly ActionHrid[]>>',
			JSON.stringify(Object.fromEntries(byCategory), null, 2),
		)

		this.builder.addConstVariable(
			'ACTIONS_BY_SKILL',
			'Partial<Record<SkillHrid, readonly ActionHrid[]>>',
			JSON.stringify(Object.fromEntries(bySkill), null, 2),
		)

		// Special action groups
		this.builder.addConstArray('PRODUCTION_ACTIONS', productionActions, true)
		this.builder.addConstArray('COMBAT_ACTIONS', combatActions, true)
		this.builder.addConstArray('GATHERING_ACTIONS', gatheringActions, true)
	}

	private generateSpecializedUtils(): void {
		// Get actions by function
		this.builder.addFunction(
			'getActionsByFunction',
			[{ name: 'func', type: 'ActionFunction' }],
			'Action[]',
			(writer) => {
				writer.writeLine(`const hrids = ACTIONS_BY_FUNCTION[func] || []`)
				writer.writeLine(
					`return hrids.map(hrid => ACTIONS.get(hrid)!).filter(Boolean)`,
				)
			},
		)

		// Get actions by type
		this.builder.addFunction(
			'getActionsByType',
			[{ name: 'type', type: 'ActionType' }],
			'Action[]',
			(writer) => {
				writer.writeLine(`const hrids = ACTIONS_BY_TYPE[type] || []`)
				writer.writeLine(
					`return hrids.map(hrid => ACTIONS.get(hrid)!).filter(Boolean)`,
				)
			},
		)

		// Get actions by category
		this.builder.addFunction(
			'getActionsByCategory',
			[{ name: 'category', type: 'ActionCategoryHrid' }],
			'Action[]',
			(writer) => {
				writer.writeLine(`const hrids = ACTIONS_BY_CATEGORY[category] || []`)
				writer.writeLine(
					`return hrids.map(hrid => ACTIONS.get(hrid)!).filter(Boolean)`,
				)
			},
		)

		// Get actions by skill
		this.builder.addFunction(
			'getActionsBySkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'Action[]',
			(writer) => {
				writer.writeLine(`const hrids = ACTIONS_BY_SKILL[skillHrid] || []`)
				writer.writeLine(
					`return hrids.map(hrid => ACTIONS.get(hrid)!).filter(Boolean)`,
				)
			},
		)

		// Check if action is production
		this.builder.addFunction(
			'isProductionAction',
			[{ name: 'action', type: 'Action' }],
			'boolean',
			(writer) => {
				writer.writeLine(
					`return action.function === '/action_functions/production'`,
				)
			},
		)

		// Check if action is combat
		this.builder.addFunction(
			'isCombatAction',
			[{ name: 'action', type: 'Action' }],
			'boolean',
			(writer) => {
				writer.writeLine(
					`return action.function === '/action_functions/combat'`,
				)
			},
		)

		// Check if action is gathering
		this.builder.addFunction(
			'isGatheringAction',
			[{ name: 'action', type: 'Action' }],
			'boolean',
			(writer) => {
				writer.writeLine(
					`return action.function === '/action_functions/gathering'`,
				)
			},
		)

		// Check if player meets requirements
		this.builder.addFunction(
			'meetsActionRequirements',
			[
				{ name: 'action', type: 'Action' },
				{ name: 'playerSkills', type: 'Partial<Record<SkillHrid, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine(`if (!action.levelRequirement) return true`)
				writer.writeLine(
					`const playerLevel = playerSkills[action.levelRequirement.skillHrid] || 0`,
				)
				writer.writeLine(`return playerLevel >= action.levelRequirement.level`)
			},
		)

		// Check if player has required items
		this.builder.addFunction(
			'hasRequiredItems',
			[
				{ name: 'action', type: 'Action' },
				{ name: 'inventory', type: 'Partial<Record<ItemHrid, number>>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine(`if (!action.inputItems) return true`)
				writer.writeLine(`return action.inputItems.every(item =>`)
				writer.writeLine(`  (inventory[item.itemHrid] || 0) >= item.count`)
				writer.writeLine(`)`)
			},
		)

		// Get all production actions (recipes)
		this.builder.addFunction(
			'getProductionActions',
			[],
			'Action[]',
			(writer) => {
				writer.writeLine(
					`return PRODUCTION_ACTIONS.map(hrid => ACTIONS.get(hrid)!).filter(Boolean)`,
				)
			},
		)

		// Get all combat actions
		this.builder.addFunction('getCombatActions', [], 'Action[]', (writer) => {
			writer.writeLine(
				`return COMBAT_ACTIONS.map(hrid => ACTIONS.get(hrid)!).filter(Boolean)`,
			)
		})

		// Get all gathering actions
		this.builder.addFunction(
			'getGatheringActions',
			[],
			'Action[]',
			(writer) => {
				writer.writeLine(
					`return GATHERING_ACTIONS.map(hrid => ACTIONS.get(hrid)!).filter(Boolean)`,
				)
			},
		)
	}
}
