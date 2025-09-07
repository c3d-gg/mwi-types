import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	InterfaceDefinition,
	UtilityDefinition,
} from '../../core/types'

// Internal interface for TypeScript typing (NOT exported)
interface LeaderboardType {
	hrid: string
	name: string
	gameMode: string
	isSteam: boolean
	minJoinTime: string
	isGuild: boolean
	sortIndex: number
}

export class ModularLeaderboardTypesGenerator extends ModularBaseGenerator<LeaderboardType> {
	constructor() {
		super({
			entityName: 'LeaderboardType',
			entityNamePlural: 'LeaderboardTypes',
			sourceKey: 'leaderboardTypeDetailMap',
			outputPath: 'src/generated/leaderboardtypes',
			
			// Preserve empty strings for gameMode
			applyDataCleaning: false,

			// Use utility templates
			utilityTemplates: [
				{ type: 'toMap' },
				{ type: 'sortBy', field: 'sortIndex' },
			],

			// Auto-generate category constants
			categoryFilters: [
				{
					name: 'GUILD_LEADERBOARDS',
					condition: (lb: LeaderboardType) => lb.isGuild === true,
				},
				{
					name: 'PLAYER_LEADERBOARDS',
					condition: (lb: LeaderboardType) => lb.isGuild === false,
				},
				{
					name: 'STEAM_LEADERBOARDS',
					condition: (lb: LeaderboardType) => lb.isSteam === true,
				},
			],
		})
	}

	// MANDATORY explicit interface definition (prevents HridHrid + duplication bugs)
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'LeaderboardType',
				properties: [
					{ name: 'hrid', type: 'LeaderboardTypeHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'gameMode', type: 'string' },
					{ name: 'isSteam', type: 'boolean' },
					{ name: 'minJoinTime', type: 'string' },
					{ name: 'isGuild', type: 'boolean' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	// Custom utilities
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getGuildLeaderboards',
				parameters: [],
				returnType: 'LeaderboardType[]',
				implementation: (writer) => {
					writer.writeLine('const record = getLeaderboardTypesRecord()')
					writer.writeLine('return GUILD_LEADERBOARDS.map(hrid => record[hrid as LeaderboardTypeHrid])')
				},
				jsDoc: {
					description: 'Get all guild leaderboard types',
					returns: 'Array of guild leaderboard types',
				},
			},
			{
				name: 'getPlayerLeaderboards',
				parameters: [],
				returnType: 'LeaderboardType[]',
				implementation: (writer) => {
					writer.writeLine('const record = getLeaderboardTypesRecord()')
					writer.writeLine('return PLAYER_LEADERBOARDS.map(hrid => record[hrid as LeaderboardTypeHrid])')
				},
				jsDoc: {
					description: 'Get all player leaderboard types',
					returns: 'Array of player leaderboard types',
				},
			},
			{
				name: 'getSteamLeaderboards',
				parameters: [],
				returnType: 'LeaderboardType[]',
				implementation: (writer) => {
					writer.writeLine('const record = getLeaderboardTypesRecord()')
					writer.writeLine('return STEAM_LEADERBOARDS.map(hrid => record[hrid as LeaderboardTypeHrid])')
				},
				jsDoc: {
					description: 'Get all Steam-specific leaderboard types',
					returns: 'Array of Steam leaderboard types',
				},
			},
			{
				name: 'getLeaderboardsByGameMode',
				parameters: [
					{ name: 'gameMode', type: 'string' },
				],
				returnType: 'LeaderboardType[]',
				implementation: (writer) => {
					writer.writeLine('return getAllLeaderboardTypes().filter(lb => lb.gameMode === gameMode)')
				},
				jsDoc: {
					description: 'Get all leaderboard types for a specific game mode',
					param: { gameMode: 'The game mode to filter by' },
					returns: 'Array of leaderboard types for the game mode',
				},
			},
		]
	}

	// For simple entities: Use transformEntity hook
	protected override transformEntity(rawData: any): LeaderboardType {
		return {
			hrid: rawData.hrid,
			name: rawData.name || '',
			gameMode: rawData.gameMode || '',
			isSteam: rawData.isSteam === true,
			minJoinTime: rawData.minJoinTime || '0001-01-01T00:00:00Z',
			isGuild: rawData.isGuild === true,
			sortIndex: rawData.sortIndex || 0,
		}
	}

	// Extension hook: Add imports needed for utilities
	protected override extendUtilities(): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')
		// Import the category constants from constants file
		utilsBuilder.addImport('./constants', ['GUILD_LEADERBOARDS', 'PLAYER_LEADERBOARDS', 'STEAM_LEADERBOARDS'], false)
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularLeaderboardTypesGenerator()
	await generator.generate('./src/sources/game_data.json')
}