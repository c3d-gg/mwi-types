import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	ActionItem,
	DropTable,
	ExperienceGain,
	LevelRequirement,
	RandomSpawnInfo,
	SpawnInfo,
} from '../../../generated/sharedtypes/types'
import type {
	ConstantDefinition,
	InterfaceDefinition,
	LookupDefinition,
	UtilityDefinition,
} from '../../core/types'

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
	category: string // Will be ActionCategoryHrid in generated types
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
	buffs: unknown[] | null // Will be Buff[] in generated types
	sortIndex?: number
}

/**
 * Modular Actions Generator using the hook system
 *
 * This generator demonstrates the proper use of hooks instead of overrides,
 * following the v1.0 architecture principles:
 * - Uses defineInterfaces() hook for type generation
 * - Uses defineConstants() hook for custom constants
 * - Uses defineLookups() hook for lookup tables
 * - Uses defineUtilities() hook for custom utilities
 * - Only overrides extractEntities() for data extraction logic
 *
 * @see ARCHITECTURE.md for hook system documentation
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
			outputPath: 'src/generated/actions',

			// Feature flags (all true by default, but being explicit)
			generateHrids: true,
			generateCollection: true,
			generateConstants: true,
			generateUtils: true,
			generateLookups: true,
			// Disable data cleaning since Action interface has explicit null fields
			applyDataCleaning: false,

			// Import shared types this generator needs
			sharedTypes: [
				'LevelRequirement',
				'ExperienceGain',
				'ActionItem',
				'SpawnInfo',
				'RandomSpawnInfo',
				'DropTable',
				'Buff',
			],

			// Standard utility templates to include
			utilityTemplates: [
				{ type: 'getByField', field: 'category' },
				{ type: 'getByField', field: 'type' },
				{ type: 'getByField', field: 'function' },
				{ type: 'getAllWith', field: 'combatZoneInfo' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'filterBy' }, // Generic filterActions function
				{ type: 'toMap' }, // Convert Record to Map
			],

			// Category filters for auto-generating constant arrays
			categoryFilters: [
				{
					name: 'combat',
					condition: (action: any) => action.combatZoneInfo !== null,
				},
				{
					name: 'nonCombat',
					condition: (action: any) => action.combatZoneInfo === null,
				},
				{
					name: 'dungeon',
					condition: (action: any) =>
						action.combatZoneInfo?.dungeonInfo !== null,
				},
				{
					name: 'production',
					condition: (action: any) =>
						action.function === '/action_functions/production',
				},
				{
					name: 'gathering',
					condition: (action: any) =>
						action.function === '/action_functions/gathering',
				},
			],
		})
	}

	/**
	 * Extract entities from source data - this is the only method that should be overridden
	 */
	public override extractEntities(sourceData: any): Record<string, Action> {
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

	/**
	 * Define interfaces using the hook system
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		const interfaces: InterfaceDefinition[] = []

		// Define supporting interfaces
		interfaces.push({
			name: 'FightInfo',
			properties: [
				{ name: 'randomSpawnInfo', type: 'RandomSpawnInfo', optional: false },
				{ name: 'bossSpawns', type: 'any | null', optional: false },
				{ name: 'battlesPerBoss', type: 'number', optional: false },
			],
		})

		interfaces.push({
			name: 'DungeonInfo',
			properties: [
				{ name: 'keyItemHrid', type: 'ItemHrid | ""', optional: false },
				{
					name: 'rewardDropTable',
					type: 'DropTable[] | null',
					optional: false,
				},
				{ name: 'maxWaves', type: 'number', optional: false },
				{ name: 'randomSpawnInfoMap', type: 'any | null', optional: false },
				{ name: 'fixedSpawnsMap', type: 'any | null', optional: false },
			],
		})

		interfaces.push({
			name: 'CombatZoneInfo',
			properties: [
				{ name: 'isDungeon', type: 'boolean', optional: false },
				{ name: 'fightInfo', type: 'FightInfo', optional: false },
				{ name: 'dungeonInfo', type: 'DungeonInfo', optional: false },
			],
		})

		// Main Action interface
		interfaces.push({
			name: 'Action',
			properties: [
				{ name: 'hrid', type: 'ActionHrid', optional: false },
				{ name: 'function', type: 'ActionFunction', optional: false },
				{ name: 'type', type: 'ActionType', optional: false },
				{ name: 'category', type: 'ActionCategoryHrid', optional: false },
				{ name: 'name', type: 'string', optional: false },
				{ name: 'maxDifficulty', type: 'number', optional: false },
				{
					name: 'levelRequirement',
					type: 'LevelRequirement | null',
					optional: false,
				},
				{ name: 'baseTimeCost', type: 'number', optional: false },
				{
					name: 'experienceGain',
					type: 'ExperienceGain | null',
					optional: false,
				},
				{ name: 'dropTable', type: 'DropTable[] | null', optional: false },
				{
					name: 'essenceDropTable',
					type: 'DropTable[] | null',
					optional: false,
				},
				{ name: 'rareDropTable', type: 'DropTable[] | null', optional: false },
				{
					name: 'upgradeItemHrid',
					type: 'ItemHrid | undefined',
					optional: true,
				},
				{
					name: 'retainAllEnhancement',
					type: 'boolean | undefined',
					optional: true,
				},
				{ name: 'inputItems', type: 'ActionItem[] | null', optional: false },
				{ name: 'outputItems', type: 'ActionItem[] | null', optional: false },
				{
					name: 'combatZoneInfo',
					type: 'CombatZoneInfo | null',
					optional: false,
				},
				{ name: 'maxPartySize', type: 'number', optional: false },
				{ name: 'buffs', type: 'Buff[] | null', optional: false },
				{ name: 'sortIndex', type: 'number | undefined', optional: true },
			],
		})

		return interfaces
	}

	/**
	 * Extension hook: Add imports and type definitions after base types generation
	 */
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Import types from other domains (DO NOT re-export - domain control)
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		// NOTE: Some types temporarily commented out until migrated
		// typesBuilder.addImport('../monsters/types', ['MonsterHrid'], true)
		typesBuilder.addImport(
			'../actioncategories/types',
			['ActionCategoryHrid'],
			true,
		)
		typesBuilder.addImport('../bufftypes/types', ['BuffTypeHrid'], true)

		// Generate ActionFunction and ActionType constants and types
		if (this.actionFunctions.size > 0) {
			const functions = Array.from(this.actionFunctions).sort()
			typesBuilder.addConstArray('ACTION_FUNCTIONS', functions, true)
			typesBuilder.addType('ActionFunction', 'typeof ACTION_FUNCTIONS[number]')
		}

		if (this.actionTypes.size > 0) {
			const types = Array.from(this.actionTypes).sort()
			typesBuilder.addConstArray('ACTION_TYPES', types, true)
			typesBuilder.addType('ActionType', 'typeof ACTION_TYPES[number]')
		}
	}

	/**
	 * Define custom constants using the hook system
	 */
	protected override defineConstants(): ConstantDefinition[] {
		const constants: ConstantDefinition[] = []

		// Add the dungeon actions as a constant array
		if (this.dungeonActions.length > 0) {
			constants.push({
				name: 'DUNGEON_ACTION_HRIDS',
				value: this.dungeonActions.sort(),
				asConst: true,
			})
		}

		return constants
	}

	/**
	 * Define lookup tables using the hook system
	 */
	protected override defineLookups(): LookupDefinition[] {
		const lookups: LookupDefinition[] = []

		// Actions by skill
		const skillLookup: Record<string, readonly string[]> = {}
		this.actionsBySkill.forEach((actions, skill) => {
			skillLookup[skill] = actions.sort()
		})
		lookups.push({
			name: 'ACTIONS_BY_SKILL',
			data: skillLookup,
			keyType: 'string', // Use string instead of SkillHrid to allow partial record
			valueType: 'readonly ActionHrid[]',
			isPartial: true,
		})

		// Actions by category
		const categoryLookup: Record<string, readonly string[]> = {}
		this.actionsByCategory.forEach((actions, category) => {
			categoryLookup[category] = actions.sort()
		})
		lookups.push({
			name: 'ACTIONS_BY_CATEGORY',
			data: categoryLookup,
			keyType: 'ActionCategoryHrid',
			valueType: 'readonly ActionHrid[]',
		})

		// Actions by type
		const typeLookup: Record<string, readonly string[]> = {}
		this.actionsByType.forEach((actions, type) => {
			typeLookup[type] = actions.sort()
		})
		lookups.push({
			name: 'ACTIONS_BY_TYPE',
			data: typeLookup,
			keyType: 'ActionType',
			valueType: 'readonly ActionHrid[]',
		})

		// Actions by function
		const functionLookup: Record<string, readonly string[]> = {}
		this.actionsByFunction.forEach((actions, func) => {
			functionLookup[func] = actions.sort()
		})
		lookups.push({
			name: 'ACTIONS_BY_FUNCTION',
			data: functionLookup,
			keyType: 'ActionFunction',
			valueType: 'readonly ActionHrid[]',
		})

		// Note: DUNGEON_ACTION_HRIDS is now in defineConstants() as it's a simple array

		return lookups
	}

	/**
	 * Extension hook: Add imports needed for lookup tables
	 */
	protected override extendLookups(): void {
		// Import types needed for lookups
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')
		lookupsBuilder.addImport(
			'./types',
			['ActionHrid', 'ActionType', 'ActionFunction'],
			true,
		)
		lookupsBuilder.addImport('../skills/types', ['SkillHrid'], true)
		lookupsBuilder.addImport(
			'../actioncategories/types',
			['ActionCategoryHrid'],
			true,
		)
	}

	/**
	 * Define custom utility functions using the hook system
	 */
	protected override defineUtilities(): UtilityDefinition[] {
		const utilities: UtilityDefinition[] = []

		// Add action-specific utilities
		utilities.push({
			name: 'getActionsBySkill',
			parameters: [{ name: 'skillHrid', type: 'SkillHrid' }],
			returnType: 'Action[]',
			implementation: (writer) => {
				writer.writeLine('const hrids = ACTIONS_BY_SKILL[skillHrid] || []')
				writer.writeLine('return hrids.map(hrid => requireAction(hrid))')
			},
			imports: [
				{ from: './lookups', names: ['ACTIONS_BY_SKILL'] },
				{ from: './types', names: ['Action'], isType: true },
				{ from: '../skills/types', names: ['SkillHrid'], isType: true },
			],
			jsDoc: {
				description: 'Gets all actions that require a specific skill.',
				params: [
					{ name: 'skillHrid', description: 'The skill HRID to filter by' },
				],
				returns: 'Array of actions requiring the specified skill',
				examples: [`const miningActions = getActionsBySkill('/skills/mining')`],
			},
		})

		utilities.push({
			name: 'isCombatAction',
			parameters: [{ name: 'action', type: 'Action' }],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine('return action.combatZoneInfo !== null')
			},
			imports: [{ from: './types', names: ['Action'], isType: true }],
			jsDoc: {
				description: 'Checks if an action is a combat action.',
				params: [{ name: 'action', description: 'The action to check' }],
				returns: 'true if the action is a combat action, false otherwise',
			},
		})

		utilities.push({
			name: 'isDungeonAction',
			parameters: [{ name: 'action', type: 'Action' }],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine('return action.combatZoneInfo?.isDungeon === true')
			},
			imports: [{ from: './types', names: ['Action'], isType: true }],
			jsDoc: {
				description: 'Checks if an action is a dungeon action.',
				params: [{ name: 'action', description: 'The action to check' }],
				returns: 'true if the action is a dungeon, false otherwise',
			},
		})

		utilities.push({
			name: 'isProductionAction',
			parameters: [{ name: 'action', type: 'Action' }],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine(
					"return action.function === '/action_functions/production'",
				)
			},
			imports: [{ from: './types', names: ['Action'], isType: true }],
			jsDoc: {
				description: 'Checks if an action is a production action.',
				params: [{ name: 'action', description: 'The action to check' }],
				returns: 'true if the action is a production action, false otherwise',
			},
		})

		utilities.push({
			name: 'isGatheringAction',
			parameters: [{ name: 'action', type: 'Action' }],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine(
					"return action.function === '/action_functions/gathering'",
				)
			},
			imports: [{ from: './types', names: ['Action'], isType: true }],
			jsDoc: {
				description: 'Checks if an action is a gathering action.',
				params: [{ name: 'action', description: 'The action to check' }],
				returns: 'true if the action is a gathering action, false otherwise',
			},
		})

		utilities.push({
			name: 'getActionSortedByLevel',
			parameters: [],
			returnType: 'Action[]',
			implementation: (writer) => {
				writer.writeLine('return getAllActions().sort((a, b) => {')
				writer.writeLine('  const aLevel = a.levelRequirement?.level || 0')
				writer.writeLine('  const bLevel = b.levelRequirement?.level || 0')
				writer.writeLine('  return aLevel - bLevel')
				writer.writeLine('})')
			},
			imports: [{ from: './types', names: ['Action'], isType: true }],
			jsDoc: {
				description: 'Gets all actions sorted by their level requirement.',
				returns: 'Array of actions sorted by level requirement (ascending)',
			},
		})

		return utilities
	}

	/**
	 * Extension hook: Add exports for ACTION_FUNCTIONS and ACTION_TYPES
	 */
	protected override extendConstants(): void {
		// Export ACTION_FUNCTIONS and ACTION_TYPES for external use if they were generated
		if (this.actionFunctions.size > 0) {
			this.moduleBuilder.addExport({
				name: 'ACTION_FUNCTIONS',
				source: './types',
			})
			this.moduleBuilder.addExport({
				name: 'ActionFunction',
				source: './types',
				isType: true,
			})
		}

		if (this.actionTypes.size > 0) {
			this.moduleBuilder.addExport({ name: 'ACTION_TYPES', source: './types' })
			this.moduleBuilder.addExport({
				name: 'ActionType',
				source: './types',
				isType: true,
			})
		}
	}

	// Data extraction methods (unchanged)
	private extractAction(hrid: string, data: any): Action {
		return {
			hrid,
			function: data.function || '',
			type: data.type || '',
			category: data.category || '',
			name: data.name || '',
			maxDifficulty:
				typeof data.maxDifficulty === 'number' ? data.maxDifficulty : 0,
			levelRequirement: this.extractLevelRequirement(data.levelRequirement),
			baseTimeCost:
				typeof data.baseTimeCost === 'number' ? data.baseTimeCost : 0,
			experienceGain: this.extractExperienceGain(data.experienceGain),
			dropTable: this.extractDropTable(data.dropTable),
			essenceDropTable: this.extractDropTable(data.essenceDropTable),
			rareDropTable: this.extractDropTable(data.rareDropTable),
			upgradeItemHrid:
				data.upgradeItemHrid && data.upgradeItemHrid !== ''
					? data.upgradeItemHrid
					: undefined,
			retainAllEnhancement:
				data.retainAllEnhancement === true ? true : undefined,
			inputItems: this.extractActionItems(data.inputItems),
			outputItems: this.extractActionItems(data.outputItems),
			combatZoneInfo: this.extractCombatZoneInfo(data.combatZoneInfo),
			maxPartySize:
				typeof data.maxPartySize === 'number' ? data.maxPartySize : 0,
			buffs:
				data.buffs && Array.isArray(data.buffs) && data.buffs.length > 0
					? data.buffs
					: null,
			sortIndex:
				typeof data.sortIndex === 'number' && data.sortIndex > 0
					? data.sortIndex
					: undefined,
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
		if (!exp || !exp.skillHrid || exp.skillHrid === '' || exp.value === 0)
			return null
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
		if (!dropTable || !Array.isArray(dropTable) || dropTable.length === 0)
			return null
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
		if (zoneInfo.fightInfo?.randomSpawnInfo?.spawns) {
			for (const spawn of zoneInfo.fightInfo.randomSpawnInfo.spawns) {
				spawns.push({
					combatMonsterHrid: spawn.monsterHrid || spawn.combatMonsterHrid || '',
					difficultyTier:
						typeof spawn.difficultyTier === 'number' ? spawn.difficultyTier : 0,
					rate: typeof spawn.rate === 'number' ? spawn.rate : 0,
					strength: typeof spawn.strength === 'number' ? spawn.strength : 0,
				})
			}
		}

		const randomSpawnInfo: RandomSpawnInfo = {
			maxSpawnCount:
				zoneInfo.fightInfo?.randomSpawnInfo?.maxCount ||
				zoneInfo.fightInfo?.randomSpawnInfo?.maxSpawnCount ||
				0,
			maxTotalStrength:
				zoneInfo.fightInfo?.randomSpawnInfo?.maxStrength ||
				zoneInfo.fightInfo?.randomSpawnInfo?.maxTotalStrength ||
				0,
			spawns,
		}

		return {
			isDungeon: zoneInfo.isDungeon === true,
			fightInfo: {
				randomSpawnInfo,
				bossSpawns: zoneInfo.fightInfo?.bossSpawns || null,
				battlesPerBoss:
					typeof zoneInfo.fightInfo?.battlesPerBoss === 'number'
						? zoneInfo.fightInfo.battlesPerBoss
						: 0,
			},
			dungeonInfo: {
				keyItemHrid: zoneInfo.dungeonInfo?.keyItemHrid || '',
				rewardDropTable: this.extractDropTable(
					zoneInfo.dungeonInfo?.rewardDropTable,
				),
				maxWaves:
					typeof zoneInfo.dungeonInfo?.maxWaves === 'number'
						? zoneInfo.dungeonInfo.maxWaves
						: 0,
				randomSpawnInfoMap: zoneInfo.dungeonInfo?.randomSpawnInfoMap || null,
				fixedSpawnsMap: zoneInfo.dungeonInfo?.fixedSpawnsMap || null,
			},
		}
	}

	private collectForLookups(action: Action): void {
		// By skill (from level requirement)
		if (action.levelRequirement?.skillHrid) {
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
}

// Main execution for standalone running
if (import.meta.main) {
	const generator = new ModularActionsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
