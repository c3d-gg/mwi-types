import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface LeaderboardCategory {
	hrid: string
	name: string
	skillHrid: string | null
	isGuild: boolean
	sortIndex: number
}

interface LeaderboardType {
	hrid: string
	name: string
	gameMode: string
	isSteam: boolean
	minJoinTime: string
	isGuild: boolean
	sortIndex: number
}

interface LeaderboardEntity {
	categories: Record<string, LeaderboardCategory>
	types: Record<string, LeaderboardType>
}

export class LeaderboardsGenerator extends BaseGenerator<LeaderboardEntity> {
	private uniqueSkillHrids: Set<string> = new Set()
	private uniqueGameModes: Set<string> = new Set()

	constructor() {
		const config: GeneratorConfig = {
			entityName: 'Leaderboard',
			entityNamePlural: 'Leaderboards',
			sourceKey: 'leaderboardCategoryDetailMap', // Primary source, we'll also read types
			outputPath: 'src/generated/types/leaderboards.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, LeaderboardEntity> {
		const categories: Record<string, LeaderboardCategory> = {}
		const types: Record<string, LeaderboardType> = {}

		// Extract categories
		if (sourceData.leaderboardCategoryDetailMap) {
			for (const [hrid, data] of Object.entries(
				sourceData.leaderboardCategoryDetailMap as any,
			)) {
				const categoryData = data as any
				const category: LeaderboardCategory = {
					hrid: categoryData.hrid,
					name: categoryData.name || '',
					skillHrid: categoryData.skillHrid || null,
					isGuild: categoryData.isGuild === true,
					sortIndex: categoryData.sortIndex || 0,
				}

				categories[hrid] = category
				this.collectCategoryValues(category)
			}
		}

		// Extract types
		if (sourceData.leaderboardTypeDetailMap) {
			for (const [hrid, data] of Object.entries(
				sourceData.leaderboardTypeDetailMap as any,
			)) {
				const typeData = data as any
				const type: LeaderboardType = {
					hrid: typeData.hrid,
					name: typeData.name || '',
					gameMode: typeData.gameMode || '',
					isSteam: typeData.isSteam === true,
					minJoinTime: typeData.minJoinTime || '',
					isGuild: typeData.isGuild === true,
					sortIndex: typeData.sortIndex || 0,
				}

				types[hrid] = type
				this.collectTypeValues(type)
			}
		}

		// Return as a single entity containing both categories and types
		return {
			leaderboards: { categories, types },
		}
	}

	private collectCategoryValues(category: LeaderboardCategory): void {
		if (category.skillHrid) {
			this.uniqueSkillHrids.add(category.skillHrid)
		}
	}

	private collectTypeValues(type: LeaderboardType): void {
		if (type.gameMode) {
			this.uniqueGameModes.add(type.gameMode)
		}
	}

	protected override generateConstants(
		entities: Record<string, LeaderboardEntity>,
	): void {
		// Get the single leaderboard entity
		const leaderboardEntity = Object.values(entities)[0]
		if (!leaderboardEntity) return

		const { categories, types } = leaderboardEntity

		// Generate category HRIDs
		const categoryHrids = Object.keys(categories).sort()
		this.builder.addConstArray(
			'LEADERBOARD_CATEGORY_HRIDS',
			categoryHrids,
			true,
		)
		this.builder.addTypeAlias(
			'LeaderboardCategoryHrid',
			'typeof LEADERBOARD_CATEGORY_HRIDS[number]',
		)

		// Generate type HRIDs
		const typeHrids = Object.keys(types).sort()
		this.builder.addConstArray('LEADERBOARD_TYPE_HRIDS', typeHrids, true)
		this.builder.addTypeAlias(
			'LeaderboardTypeHrid',
			'typeof LEADERBOARD_TYPE_HRIDS[number]',
		)
	}

	protected override generateInterfaces(
		_entities: Record<string, LeaderboardEntity>,
	): void {
		// Import external types
		if (this.uniqueSkillHrids.size > 0) {
			this.builder.addImport('./skills', ['SkillHrid'], true)
		}
		if (this.uniqueGameModes.size > 0) {
			this.builder.addImport('./game-modes', ['GameModeHrid'], true)
		}

		// Generate LeaderboardCategory interface
		const categoryProperties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'LeaderboardCategoryHrid',
				optional: false,
				description: 'Unique identifier for the leaderboard category',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the leaderboard category',
			},
			{
				name: 'skillHrid',
				type: 'SkillHrid | null',
				optional: false,
				description: 'Associated skill for skill-based leaderboards',
			},
			{
				name: 'isGuild',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a guild leaderboard category',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		this.builder.addInterface('LeaderboardCategory', categoryProperties)

		// Generate LeaderboardType interface
		const typeProperties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'LeaderboardTypeHrid',
				optional: false,
				description: 'Unique identifier for the leaderboard type',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the leaderboard type',
			},
			{
				name: 'gameMode',
				type: 'string',
				optional: false,
				description: 'Associated game mode for filtering',
			},
			{
				name: 'isSteam',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a Steam-specific leaderboard',
			},
			{
				name: 'minJoinTime',
				type: 'string',
				optional: false,
				description: 'Minimum join time requirement (ISO date string)',
			},
			{
				name: 'isGuild',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a guild leaderboard type',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		this.builder.addInterface('LeaderboardType', typeProperties)
	}

	protected override generateDataMap(
		entities: Record<string, LeaderboardEntity>,
	): void {
		// Get the single leaderboard entity
		const leaderboardEntity = Object.values(entities)[0]
		if (!leaderboardEntity) return

		const { categories, types } = leaderboardEntity

		// Generate categories map
		const categoryEntries = Object.entries(categories)
		this.builder.addTypedMap(
			'LEADERBOARD_CATEGORIES',
			'LeaderboardCategoryHrid',
			'LeaderboardCategory',
			categoryEntries,
		)

		// Generate types map
		const typeEntries = Object.entries(types)
		this.builder.addTypedMap(
			'LEADERBOARD_TYPES',
			'LeaderboardTypeHrid',
			'LeaderboardType',
			typeEntries,
		)
	}

	protected override generateUtilities(
		entities: Record<string, LeaderboardEntity>,
	): void {
		// Get the single leaderboard entity
		const leaderboardEntity = Object.values(entities)[0]
		if (!leaderboardEntity) return

		const { categories, types } = leaderboardEntity

		// Generate type guards
		this.builder.addTypeGuard(
			'isLeaderboardCategoryHrid',
			'value',
			'string',
			'LeaderboardCategoryHrid',
			'LEADERBOARD_CATEGORY_HRIDS.includes(value as LeaderboardCategoryHrid)',
		)

		this.builder.addTypeGuard(
			'isLeaderboardTypeHrid',
			'value',
			'string',
			'LeaderboardTypeHrid',
			'LEADERBOARD_TYPE_HRIDS.includes(value as LeaderboardTypeHrid)',
		)

		// Category getters
		this.builder.addFunction(
			'getLeaderboardCategory',
			[{ name: 'hrid', type: 'LeaderboardCategoryHrid' }],
			'LeaderboardCategory | undefined',
			(writer) => {
				writer.writeLine('return LEADERBOARD_CATEGORIES.get(hrid)')
			},
		)

		this.builder.addFunction(
			'requireLeaderboardCategory',
			[{ name: 'hrid', type: 'LeaderboardCategoryHrid' }],
			'LeaderboardCategory',
			(writer) => {
				writer.writeLine('const category = LEADERBOARD_CATEGORIES.get(hrid)')
				writer.writeLine('if (!category) {')
				writer.writeLine(
					`  throw new Error(\`LeaderboardCategory not found: \${hrid}\`)`,
				)
				writer.writeLine('}')
				writer.writeLine('return category')
			},
		)

		// Type getters
		this.builder.addFunction(
			'getLeaderboardType',
			[{ name: 'hrid', type: 'LeaderboardTypeHrid' }],
			'LeaderboardType | undefined',
			(writer) => {
				writer.writeLine('return LEADERBOARD_TYPES.get(hrid)')
			},
		)

		this.builder.addFunction(
			'requireLeaderboardType',
			[{ name: 'hrid', type: 'LeaderboardTypeHrid' }],
			'LeaderboardType',
			(writer) => {
				writer.writeLine('const type = LEADERBOARD_TYPES.get(hrid)')
				writer.writeLine('if (!type) {')
				writer.writeLine(
					`  throw new Error(\`LeaderboardType not found: \${hrid}\`)`,
				)
				writer.writeLine('}')
				writer.writeLine('return type')
			},
		)

		// Get all functions
		this.builder.addFunction(
			'getAllLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine('return Array.from(LEADERBOARD_CATEGORIES.values())')
			},
		)

		this.builder.addFunction(
			'getAllLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine('return Array.from(LEADERBOARD_TYPES.values())')
			},
		)

		// Generate lookup maps and specialized utilities
		this.generateLookupMaps(categories, types)
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(
		categories: Record<string, LeaderboardCategory>,
		types: Record<string, LeaderboardType>,
	): void {
		// Categorize leaderboard categories
		const guildCategories: string[] = []
		const skillCategories: string[] = []
		const nonSkillCategories: string[] = []

		for (const [hrid, category] of Object.entries(categories)) {
			if (category.isGuild) {
				guildCategories.push(hrid)
			}
			if (category.skillHrid) {
				skillCategories.push(hrid)
			} else {
				nonSkillCategories.push(hrid)
			}
		}

		// Categorize leaderboard types
		const guildTypes: string[] = []
		const steamTypes: string[] = []
		const gameModeTypes: Record<string, string[]> = {}

		for (const [hrid, type] of Object.entries(types)) {
			if (type.isGuild) {
				guildTypes.push(hrid)
			}
			if (type.isSteam) {
				steamTypes.push(hrid)
			}
			if (type.gameMode) {
				if (!gameModeTypes[type.gameMode]) {
					gameModeTypes[type.gameMode] = []
				}
				gameModeTypes[type.gameMode]!.push(hrid)
			}
		}

		// Add category arrays
		this.builder.addConstArray(
			'GUILD_LEADERBOARD_CATEGORIES',
			guildCategories,
			true,
		)
		this.builder.addConstArray(
			'SKILL_LEADERBOARD_CATEGORIES',
			skillCategories,
			true,
		)
		this.builder.addConstArray(
			'NON_SKILL_LEADERBOARD_CATEGORIES',
			nonSkillCategories,
			true,
		)

		// Add type arrays
		this.builder.addConstArray('GUILD_LEADERBOARD_TYPES', guildTypes, true)
		this.builder.addConstArray('STEAM_LEADERBOARD_TYPES', steamTypes, true)

		// Add game mode mapping
		if (Object.keys(gameModeTypes).length > 0) {
			this.builder.addConstVariable(
				'LEADERBOARD_TYPES_BY_GAME_MODE',
				'Partial<Record<string, readonly LeaderboardTypeHrid[]>>',
				gameModeTypes,
			)
		}

		// Categories by skill mapping
		const categoriesBySkill: Record<string, string[]> = {}
		for (const [hrid, category] of Object.entries(categories)) {
			if (category.skillHrid) {
				if (!categoriesBySkill[category.skillHrid]) {
					categoriesBySkill[category.skillHrid] = []
				}
				categoriesBySkill[category.skillHrid]!.push(hrid)
			}
		}

		if (Object.keys(categoriesBySkill).length > 0) {
			this.builder.addConstVariable(
				'LEADERBOARD_CATEGORIES_BY_SKILL',
				'Partial<Record<SkillHrid, readonly LeaderboardCategoryHrid[]>>',
				categoriesBySkill,
			)
		}
	}

	private generateSpecializedUtils(): void {
		// Guild leaderboard functions
		this.builder.addFunction(
			'getGuildLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return GUILD_LEADERBOARD_CATEGORIES.map(hrid => LEADERBOARD_CATEGORIES.get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'getGuildLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return GUILD_LEADERBOARD_TYPES.map(hrid => LEADERBOARD_TYPES.get(hrid as LeaderboardTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// Skill-based functions
		this.builder.addFunction(
			'getSkillLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return SKILL_LEADERBOARD_CATEGORIES.map(hrid => LEADERBOARD_CATEGORIES.get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'getLeaderboardCategoriesBySkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'const hrids = LEADERBOARD_CATEGORIES_BY_SKILL?.[skillHrid] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => LEADERBOARD_CATEGORIES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Steam functions
		this.builder.addFunction(
			'getSteamLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return STEAM_LEADERBOARD_TYPES.map(hrid => LEADERBOARD_TYPES.get(hrid as LeaderboardTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// Game mode functions
		this.builder.addFunction(
			'getLeaderboardTypesByGameMode',
			[{ name: 'gameMode', type: 'string' }],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'const hrids = LEADERBOARD_TYPES_BY_GAME_MODE?.[gameMode] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => LEADERBOARD_TYPES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Sorting functions
		this.builder.addFunction(
			'sortLeaderboardCategoriesByIndex',
			[{ name: 'categories', type: 'LeaderboardCategory[]' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		this.builder.addFunction(
			'sortLeaderboardTypesByIndex',
			[{ name: 'types', type: 'LeaderboardType[]' }],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return [...types].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// Search functions
		this.builder.addFunction(
			'searchLeaderboardCategories',
			[{ name: 'searchTerm', type: 'string' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(LEADERBOARD_CATEGORIES.values()).filter(category =>',
				)
				writer.writeLine(
					'  category.name.toLowerCase().includes(lowerSearch) ||',
				)
				writer.writeLine('  category.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		this.builder.addFunction(
			'searchLeaderboardTypes',
			[{ name: 'searchTerm', type: 'string' }],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(LEADERBOARD_TYPES.values()).filter(type =>',
				)
				writer.writeLine('  type.name.toLowerCase().includes(lowerSearch) ||')
				writer.writeLine('  type.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// Stats function
		this.builder.addFunction(
			'getLeaderboardStats',
			[],
			'{ categories: { total: number, guild: number, skill: number, nonSkill: number }, types: { total: number, guild: number, steam: number } }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  categories: {')
				writer.writeLine('    total: LEADERBOARD_CATEGORIES.size,')
				writer.writeLine('    guild: GUILD_LEADERBOARD_CATEGORIES.length,')
				writer.writeLine('    skill: SKILL_LEADERBOARD_CATEGORIES.length,')
				writer.writeLine(
					'    nonSkill: NON_SKILL_LEADERBOARD_CATEGORIES.length',
				)
				writer.writeLine('  },')
				writer.writeLine('  types: {')
				writer.writeLine('    total: LEADERBOARD_TYPES.size,')
				writer.writeLine('    guild: GUILD_LEADERBOARD_TYPES.length,')
				writer.writeLine('    steam: STEAM_LEADERBOARD_TYPES.length')
				writer.writeLine('  }')
				writer.writeLine('}')
			},
		)
	}
}
