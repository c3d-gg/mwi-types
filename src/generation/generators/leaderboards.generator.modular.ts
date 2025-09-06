import { ModularBaseGenerator } from '../core/generator.base.modular'

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

export class LeaderboardsModularGenerator extends ModularBaseGenerator<LeaderboardEntity> {
	private uniqueSkillHrids: Set<string> = new Set()
	private uniqueGameModes: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'Leaderboard',
			entityNamePlural: 'Leaderboards',
			sourceKey: 'leaderboardCategoryDetailMap',
			outputPath: './src/generated/leaderboards',
			generateConstants: true,
			generateUtils: true,
		})
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

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import type constants from constants file
		typesBuilder.addImport('./constants', ['LeaderboardCategoryHrid', 'LeaderboardTypeHrid'], true)
		
		// Import from modular skills if available, otherwise use string
		if (this.uniqueSkillHrids.size > 0) {
			typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		}
		
		// Import from modular game-modes if available, otherwise use string  
		if (this.uniqueGameModes.size > 0) {
			// Comment out until game-modes module exists
			// typesBuilder.addImport('../game-modes/types', ['GameModeHrid'], true)
		}

		// Generate LeaderboardCategory interface
		typesBuilder.addInterface('LeaderboardCategory', [
			{
				name: 'hrid',
				type: 'LeaderboardCategoryHrid',
				description: 'Unique identifier for the leaderboard category',
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the leaderboard category',
			},
			{
				name: 'skillHrid',
				type: 'SkillHrid | null',
				description: 'Associated skill for skill-based leaderboards',
			},
			{
				name: 'isGuild',
				type: 'boolean',
				description: 'Whether this is a guild leaderboard category',
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Display sort order',
			},
		])

		// Generate LeaderboardType interface
		typesBuilder.addInterface('LeaderboardType', [
			{
				name: 'hrid',
				type: 'LeaderboardTypeHrid',
				description: 'Unique identifier for the leaderboard type',
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the leaderboard type',
			},
			{
				name: 'gameMode',
				type: 'string',
				description: 'Associated game mode for filtering',
			},
			{
				name: 'isSteam',
				type: 'boolean',
				description: 'Whether this is a Steam-specific leaderboard',
			},
			{
				name: 'minJoinTime',
				type: 'string',
				description: 'Minimum join time requirement (ISO date string)',
			},
			{
				name: 'isGuild',
				type: 'boolean',
				description: 'Whether this is a guild leaderboard type',
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Display sort order',
			},
		])

		// Re-export external types
		if (this.uniqueSkillHrids.size > 0) {
			typesBuilder.addNamedExports({ 
				'SkillHrid': { from: '../skills/types.js', isType: true } 
			})
		}
		
		// Export constant-derived types (they're actually in constants.ts, not types.ts)
		this.moduleBuilder.addExport('constants', 'LeaderboardCategoryHrid', 'type')
		this.moduleBuilder.addExport('constants', 'LeaderboardTypeHrid', 'type')
		this.moduleBuilder.addExport('types', 'LeaderboardCategory', 'type')
		this.moduleBuilder.addExport('types', 'LeaderboardType', 'type')
	}

	protected override generateConstants(
		entities: Record<string, LeaderboardEntity>,
	): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')
		
		// Get the single leaderboard entity
		const leaderboardEntity = Object.values(entities)[0]
		if (!leaderboardEntity) return

		const { categories, types } = leaderboardEntity

		// Generate category HRIDs
		const categoryHrids = Object.keys(categories).sort()
		constantsBuilder.addConstArray(
			'LEADERBOARD_CATEGORY_HRIDS',
			categoryHrids,
			true,
		)
		constantsBuilder.addType(
			'LeaderboardCategoryHrid', 
			'(typeof LEADERBOARD_CATEGORY_HRIDS)[number]'
		)

		// Generate type HRIDs
		const typeHrids = Object.keys(types).sort()
		constantsBuilder.addConstArray('LEADERBOARD_TYPE_HRIDS', typeHrids, true)
		constantsBuilder.addType(
			'LeaderboardTypeHrid',
			'(typeof LEADERBOARD_TYPE_HRIDS)[number]'
		)

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

		for (const [hrid, type] of Object.entries(types)) {
			if (type.isGuild) {
				guildTypes.push(hrid)
			}
			if (type.isSteam) {
				steamTypes.push(hrid)
			}
		}

		// Add category arrays
		constantsBuilder.addConstArray(
			'GUILD_LEADERBOARD_CATEGORIES',
			guildCategories,
			true,
		)
		constantsBuilder.addConstArray(
			'SKILL_LEADERBOARD_CATEGORIES',
			skillCategories,
			true,
		)
		constantsBuilder.addConstArray(
			'NON_SKILL_LEADERBOARD_CATEGORIES',
			nonSkillCategories,
			true,
		)

		// Add type arrays
		constantsBuilder.addConstArray('GUILD_LEADERBOARD_TYPES', guildTypes, true)
		constantsBuilder.addConstArray('STEAM_LEADERBOARD_TYPES', steamTypes, true)

		// Export arrays
		this.moduleBuilder.addExport('constants', 'LEADERBOARD_CATEGORY_HRIDS')
		this.moduleBuilder.addExport('constants', 'GUILD_LEADERBOARD_CATEGORIES')
		this.moduleBuilder.addExport('constants', 'SKILL_LEADERBOARD_CATEGORIES')
		this.moduleBuilder.addExport('constants', 'NON_SKILL_LEADERBOARD_CATEGORIES')
		this.moduleBuilder.addExport('constants', 'LEADERBOARD_TYPE_HRIDS')
		this.moduleBuilder.addExport('constants', 'GUILD_LEADERBOARD_TYPES')
		this.moduleBuilder.addExport('constants', 'STEAM_LEADERBOARD_TYPES')
	}

	protected override generateLazyData(
		entities: Record<string, LeaderboardEntity>,
	): void {
		const dataBuilder = this.moduleBuilder.getFile('data')
		
		// Add imports for the types we need
		dataBuilder.addImport('./types', ['LeaderboardCategory', 'LeaderboardType'], true)
		dataBuilder.addImport('./constants', ['LeaderboardCategoryHrid', 'LeaderboardTypeHrid'], true)
		
		// Get the single leaderboard entity
		const leaderboardEntity = Object.values(entities)[0]
		if (!leaderboardEntity) return

		const { categories, types } = leaderboardEntity

		// Clean entity data
		const cleanedCategories: Record<string, any> = {}
		for (const [hrid, category] of Object.entries(categories)) {
			const cleaned = this.cleanEntityData(category)
			// Convert empty string or undefined to null for skillHrid
			if (cleaned.skillHrid === '' || cleaned.skillHrid === undefined) {
				cleaned.skillHrid = null
			}
			cleanedCategories[hrid] = cleaned
		}

		const cleanedTypes: Record<string, any> = {}
		for (const [hrid, type] of Object.entries(types)) {
			const cleaned = this.cleanEntityData(type)
			// Convert empty string to empty string for gameMode (keep as string type)
			if (!cleaned.gameMode) {
				cleaned.gameMode = ''
			}
			cleanedTypes[hrid] = cleaned
		}

		// Generate lazy-loaded data for categories
		dataBuilder.addLazyMap(
			'leaderboardCategoriesMap',
			'getLeaderboardCategoriesMap',
			'getLeaderboardCategoriesData',
			'LeaderboardCategoryHrid',
			'LeaderboardCategory',
			Object.entries(cleanedCategories),
		)

		// Generate lazy-loaded data for types
		dataBuilder.addLazyMap(
			'leaderboardTypesMap',
			'getLeaderboardTypesMap',
			'getLeaderboardTypesData',
			'LeaderboardTypeHrid',
			'LeaderboardType',
			Object.entries(cleanedTypes),
		)

		// Export getters
		this.moduleBuilder.addExport('data', 'getLeaderboardCategoriesMap')
		this.moduleBuilder.addExport('data', 'getLeaderboardTypesMap')
	}

	protected override generateLookups(
		entities: Record<string, LeaderboardEntity>,
	): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')
		
		// Get the single leaderboard entity
		const leaderboardEntity = Object.values(entities)[0]
		if (!leaderboardEntity) return

		const { categories, types } = leaderboardEntity

		// Import types from types file
		lookupsBuilder.addImport('./types', ['SkillHrid'], true)
		// Import HRIDs from constants file
		lookupsBuilder.addImport('./constants', ['LeaderboardCategoryHrid', 'LeaderboardTypeHrid'], true)

		// Game mode mapping for types
		const gameModeTypes: Record<string, string[]> = {}
		for (const [hrid, type] of Object.entries(types)) {
			if (type.gameMode) {
				if (!gameModeTypes[type.gameMode]) {
					gameModeTypes[type.gameMode] = []
				}
				gameModeTypes[type.gameMode]!.push(hrid)
			}
		}

		if (Object.keys(gameModeTypes).length > 0) {
			lookupsBuilder.addStaticLookup(
				'LEADERBOARD_TYPES_BY_GAME_MODE',
				'string',
				'readonly LeaderboardTypeHrid[]',
				gameModeTypes,
				true, // isPartial
			)
			this.moduleBuilder.addExport('lookups', 'LEADERBOARD_TYPES_BY_GAME_MODE')
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
			lookupsBuilder.addStaticLookup(
				'LEADERBOARD_CATEGORIES_BY_SKILL',
				'SkillHrid',
				'readonly LeaderboardCategoryHrid[]',
				categoriesBySkill,
				true, // isPartial
			)
			this.moduleBuilder.addExport('lookups', 'LEADERBOARD_CATEGORIES_BY_SKILL')
		}
	}

	protected override generateUtilities(entities: Record<string, LeaderboardEntity>): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')
		
		// Add imports needed by utils
		utilsBuilder.addImport('./types', ['LeaderboardCategory', 'LeaderboardType', 'SkillHrid'], true)
		// Import type-only items as types
		utilsBuilder.addImport('./constants', ['LeaderboardCategoryHrid', 'LeaderboardTypeHrid'], true)
		// Import value items as values (arrays that are used at runtime)
		utilsBuilder.addImport('./constants', [
			'LEADERBOARD_CATEGORY_HRIDS',
			'LEADERBOARD_TYPE_HRIDS',
			'GUILD_LEADERBOARD_CATEGORIES',
			'GUILD_LEADERBOARD_TYPES',
			'SKILL_LEADERBOARD_CATEGORIES',
			'NON_SKILL_LEADERBOARD_CATEGORIES',
			'STEAM_LEADERBOARD_TYPES'
		], false)
		utilsBuilder.addImport('./data', ['getLeaderboardCategoriesMap', 'getLeaderboardTypesMap'], false)
		utilsBuilder.addImport('./lookups', ['LEADERBOARD_CATEGORIES_BY_SKILL', 'LEADERBOARD_TYPES_BY_GAME_MODE'], false)
		
		// Type guards
		utilsBuilder.addFunction(
			'isLeaderboardCategoryHrid',
			[{ name: 'value', type: 'string' }],
			'value is LeaderboardCategoryHrid',
			(writer) => {
				writer.writeLine('return LEADERBOARD_CATEGORY_HRIDS.includes(value as LeaderboardCategoryHrid)')
			},
		)

		utilsBuilder.addFunction(
			'isLeaderboardTypeHrid',
			[{ name: 'value', type: 'string' }],
			'value is LeaderboardTypeHrid',
			(writer) => {
				writer.writeLine('return LEADERBOARD_TYPE_HRIDS.includes(value as LeaderboardTypeHrid)')
			},
		)

		// Category getters
		utilsBuilder.addFunction(
			'getLeaderboardCategory',
			[{ name: 'hrid', type: 'LeaderboardCategoryHrid' }],
			'LeaderboardCategory | undefined',
			(writer) => {
				writer.writeLine('return getLeaderboardCategoriesMap().get(hrid)')
			},
		)

		utilsBuilder.addFunction(
			'requireLeaderboardCategory',
			[{ name: 'hrid', type: 'LeaderboardCategoryHrid' }],
			'LeaderboardCategory',
			(writer) => {
				writer.writeLine('const category = getLeaderboardCategoriesMap().get(hrid)')
				writer.writeLine('if (!category) {')
				writer.writeLine(
					`  throw new Error(\`LeaderboardCategory not found: \${hrid}\`)`,
				)
				writer.writeLine('}')
				writer.writeLine('return category')
			},
		)

		// Type getters
		utilsBuilder.addFunction(
			'getLeaderboardType',
			[{ name: 'hrid', type: 'LeaderboardTypeHrid' }],
			'LeaderboardType | undefined',
			(writer) => {
				writer.writeLine('return getLeaderboardTypesMap().get(hrid)')
			},
		)

		utilsBuilder.addFunction(
			'requireLeaderboardType',
			[{ name: 'hrid', type: 'LeaderboardTypeHrid' }],
			'LeaderboardType',
			(writer) => {
				writer.writeLine('const type = getLeaderboardTypesMap().get(hrid)')
				writer.writeLine('if (!type) {')
				writer.writeLine(
					`  throw new Error(\`LeaderboardType not found: \${hrid}\`)`,
				)
				writer.writeLine('}')
				writer.writeLine('return type')
			},
		)

		// Get all functions
		utilsBuilder.addFunction(
			'getAllLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine('return Array.from(getLeaderboardCategoriesMap().values())')
			},
		)

		utilsBuilder.addFunction(
			'getAllLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine('return Array.from(getLeaderboardTypesMap().values())')
			},
		)

		// Guild leaderboard functions
		utilsBuilder.addFunction(
			'getGuildLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return GUILD_LEADERBOARD_CATEGORIES.map(hrid => getLeaderboardCategoriesMap().get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		utilsBuilder.addFunction(
			'getGuildLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return GUILD_LEADERBOARD_TYPES.map(hrid => getLeaderboardTypesMap().get(hrid as LeaderboardTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// Skill-based functions
		utilsBuilder.addFunction(
			'getSkillLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return SKILL_LEADERBOARD_CATEGORIES.map(hrid => getLeaderboardCategoriesMap().get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		utilsBuilder.addFunction(
			'getLeaderboardCategoriesBySkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'const hrids = LEADERBOARD_CATEGORIES_BY_SKILL?.[skillHrid] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => getLeaderboardCategoriesMap().get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Steam functions
		utilsBuilder.addFunction(
			'getSteamLeaderboardTypes',
			[],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'return STEAM_LEADERBOARD_TYPES.map(hrid => getLeaderboardTypesMap().get(hrid as LeaderboardTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// Game mode functions
		utilsBuilder.addFunction(
			'getLeaderboardTypesByGameMode',
			[{ name: 'gameMode', type: 'string' }],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine(
					'const hrids = LEADERBOARD_TYPES_BY_GAME_MODE?.[gameMode] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => getLeaderboardTypesMap().get(hrid)!).filter(Boolean)',
				)
			},
		)

		// Sorting functions
		utilsBuilder.addFunction(
			'sortLeaderboardCategoriesByIndex',
			[{ name: 'categories', type: 'LeaderboardCategory[]' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		utilsBuilder.addFunction(
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
		utilsBuilder.addFunction(
			'searchLeaderboardCategories',
			[{ name: 'searchTerm', type: 'string' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(getLeaderboardCategoriesMap().values()).filter(category =>',
				)
				writer.writeLine(
					'  category.name.toLowerCase().includes(lowerSearch) ||',
				)
				writer.writeLine('  category.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		utilsBuilder.addFunction(
			'searchLeaderboardTypes',
			[{ name: 'searchTerm', type: 'string' }],
			'LeaderboardType[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(getLeaderboardTypesMap().values()).filter(type =>',
				)
				writer.writeLine('  type.name.toLowerCase().includes(lowerSearch) ||')
				writer.writeLine('  type.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// Stats function
		utilsBuilder.addFunction(
			'getLeaderboardStats',
			[],
			'{ categories: { total: number, guild: number, skill: number, nonSkill: number }, types: { total: number, guild: number, steam: number } }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  categories: {')
				writer.writeLine('    total: getLeaderboardCategoriesMap().size,')
				writer.writeLine('    guild: GUILD_LEADERBOARD_CATEGORIES.length,')
				writer.writeLine('    skill: SKILL_LEADERBOARD_CATEGORIES.length,')
				writer.writeLine(
					'    nonSkill: NON_SKILL_LEADERBOARD_CATEGORIES.length',
				)
				writer.writeLine('  },')
				writer.writeLine('  types: {')
				writer.writeLine('    total: getLeaderboardTypesMap().size,')
				writer.writeLine('    guild: GUILD_LEADERBOARD_TYPES.length,')
				writer.writeLine('    steam: STEAM_LEADERBOARD_TYPES.length')
				writer.writeLine('  }')
				writer.writeLine('}')
			},
		)

		// Export all utils
		this.moduleBuilder.addExport('utils', 'isLeaderboardCategoryHrid')
		this.moduleBuilder.addExport('utils', 'isLeaderboardTypeHrid')
		this.moduleBuilder.addExport('utils', 'getLeaderboardCategory')
		this.moduleBuilder.addExport('utils', 'requireLeaderboardCategory')
		this.moduleBuilder.addExport('utils', 'getLeaderboardType')
		this.moduleBuilder.addExport('utils', 'requireLeaderboardType')
		this.moduleBuilder.addExport('utils', 'getAllLeaderboardCategories')
		this.moduleBuilder.addExport('utils', 'getAllLeaderboardTypes')
		this.moduleBuilder.addExport('utils', 'getGuildLeaderboardCategories')
		this.moduleBuilder.addExport('utils', 'getGuildLeaderboardTypes')
		this.moduleBuilder.addExport('utils', 'getSkillLeaderboardCategories')
		this.moduleBuilder.addExport('utils', 'getLeaderboardCategoriesBySkill')
		this.moduleBuilder.addExport('utils', 'getSteamLeaderboardTypes')
		this.moduleBuilder.addExport('utils', 'getLeaderboardTypesByGameMode')
		this.moduleBuilder.addExport('utils', 'sortLeaderboardCategoriesByIndex')
		this.moduleBuilder.addExport('utils', 'sortLeaderboardTypesByIndex')
		this.moduleBuilder.addExport('utils', 'searchLeaderboardCategories')
		this.moduleBuilder.addExport('utils', 'searchLeaderboardTypes')
		this.moduleBuilder.addExport('utils', 'getLeaderboardStats')
	}
}