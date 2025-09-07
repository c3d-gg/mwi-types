import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	InterfaceDefinition,
	LookupDefinition,
	UtilityDefinition,
} from '../../core/types'

// ✅ Internal interface for TypeScript typing (NOT exported)
interface LeaderboardCategory {
	hrid: string
	name: string
	skillHrid: string
	isGuild: boolean
	sortIndex: number
}

export class ModularLeaderboardCategoriesGenerator extends ModularBaseGenerator<LeaderboardCategory> {
	constructor() {
		super({
			entityName: 'LeaderboardCategory',
			entityNamePlural: 'LeaderboardCategories',
			sourceKey: 'leaderboardCategoryDetailMap',
			outputPath: 'src/generated/leaderboardcategories',

			// No shared types needed for this simple module
			sharedTypes: [],

			// Standard utility templates
			utilityTemplates: [
				{ type: 'getByField', field: 'skillHrid' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],

			// Category filters for skill vs guild leaderboards
			categoryFilters: [
				{
					name: 'skillLeaderboards',
					condition: (category: LeaderboardCategory) => !category.isGuild,
				},
				{
					name: 'guildLeaderboards',
					condition: (category: LeaderboardCategory) => category.isGuild,
				},
			],
		})
	}

	// ✅ MANDATORY: Explicit interface definition (prevents HridHrid bugs)
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'LeaderboardCategory',
				properties: [
					{ name: 'hrid', type: 'LeaderboardCategoryHrid' }, // ✅ EXPLICIT HRID TYPE!
					{ name: 'name', type: 'string' },
					{ name: 'skillHrid', type: 'string' }, // Could be SkillHrid but keeping simple for now
					{ name: 'isGuild', type: 'boolean' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	// Define skill-based lookup tables
	protected override defineLookups(): LookupDefinition[] {
		// For now, skip lookups and use utility functions instead
		// Could add lookups later when we have access to extracted data
		return []
	}

	// Define leaderboard-specific utility functions
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getSkillLeaderboards',
				parameters: [],
				returnType: 'LeaderboardCategory[]',
				jsDoc: {
					description: 'Get all skill-based leaderboard categories (non-guild)',
					returns: 'Array of skill leaderboard categories',
				},
				implementation: (writer) => {
					writer.writeLine('const record = getLeaderboardCategoriesRecord()')
					writer.writeLine(
						'return Object.values(record).filter(category => !category.isGuild)',
					)
				},
			},
			{
				name: 'getGuildLeaderboards',
				parameters: [],
				returnType: 'LeaderboardCategory[]',
				jsDoc: {
					description: 'Get all guild-based leaderboard categories',
					returns: 'Array of guild leaderboard categories',
				},
				implementation: (writer) => {
					writer.writeLine('const record = getLeaderboardCategoriesRecord()')
					writer.writeLine(
						'return Object.values(record).filter(category => category.isGuild)',
					)
				},
			},
		]
	}

	// Transform raw data to LeaderboardCategory entities
	protected override transformEntity(rawData: any): LeaderboardCategory {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			skillHrid: rawData.skillHrid,
			isGuild: rawData.isGuild,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularLeaderboardCategoriesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
