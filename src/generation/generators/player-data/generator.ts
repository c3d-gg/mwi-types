import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	InterfaceDefinition,
	UtilityDefinition,
} from '../../core/types'

// Internal interface for TypeScript typing
interface PlayerData {
	type: string
	currentTimestamp: string
	
	// User account data
	user: any
	email: string
	kongregateUserId: string
	steamUserId: string
	guestPassword: string
	userInfo: any
	userReferralBonuses: any[]
	
	// Character core data
	character: any
	characterInfo: any
	characterSetting: any
	
	// Character progress
	characterSkills: any[]
	characterItems: any[]
	characterActions: any[]
	characterQuests: any[]
	characterAbilities: any[]
	
	// Character infrastructure
	characterLoadoutMap: Record<string, any>
	characterHouseRoomMap: Record<string, any>
	characterUpgradeMap: Record<string, any>
	characterTaskTypeBlocks: any[]
	
	// Social systems
	guild: any | null
	guildCharacterMap: Record<string, any>
	guildSharableCharacterMap: Record<string, any>
	guildInviteMap: Record<string, any>
	guildInviteGuildNameMap: Record<string, any>
	guildInviterSharableCharacterMap: Record<string, any>
	friendCharacterMap: Record<string, any>
	friendSharableCharacterMap: Record<string, any>
	blockedCharacterMap: Record<string, any>
	
	// Market and trade
	marketCharacterDataMap: Record<string, any>
	marketListingsByItemMap: Record<string, any>
	upgradableItemDetailMap: Record<string, any>
	
	// Combat systems
	abilityCombatTriggersMap: Record<string, any>
	actionTypeDrinkSlotsMap: Record<string, any>
	actionTypeFoodSlotsMap: Record<string, any>
	
	// Chat and messaging
	chatHistoryByChannelMap: Record<string, any>
	privateMessages: any[]
	
	// Quests and events
	dailyQuests: any[]
	weeklyQuests: any[]
	unlockedQuestHrids: string[]
	characterDailyResetTimestamp: string
	characterWeeklyResetTimestamp: string
	
	// Global events
	announcementMessage: string
	announcementTimestamp: string
	dungeonsRefreshTimestamp: string
	event: any | null
	globalMarketLastRefreshTimestamp: string
	
	// Leaderboards
	leaderboardCharacterMap: Record<string, any>
	leaderboardGuildMap: Record<string, any>
	leaderboards: Record<string, any>
	steamLeaderboards: Record<string, any>
	
	// Community buffs (special handling needed)
	communityBuffs: any[]
	communityBuffNominations: Record<string, any>
	communityBuffVotesByHrid: Record<string, any>
	
	// Server info
	serverUpgradeStateMap: Record<string, any>
	serverRankRewardTimestamp: string
}

/**
 * Modular PlayerData Generator - Singleton pattern for player state
 * 
 * This is a special case generator that handles player runtime state.
 * Unlike other generators that process collections of game entities,
 * this handles a single player state object.
 * 
 * Key characteristics:
 * - Single instance data (not a collection)
 * - Heavy cross-references to game entity HRIDs
 * - Complex nested structures
 * - Dynamic runtime data
 * 
 * @see ARCHITECTURE.md for special case documentation
 */
export class ModularPlayerDataGenerator extends ModularBaseGenerator<PlayerData> {
	constructor() {
		super({
			entityName: 'PlayerData',
			entityNamePlural: 'PlayerData', // Singular - it's a singleton
			sourceKey: '', // Root level - entire JSON is the data
			outputPath: 'src/generated/player-data',
			
			// Special case flags - no HRID collection
			generateHrids: false, // No HRIDs for singleton
			generateCollection: false, // No collection - single instance
			generateConstants: false, // No constant arrays needed
			generateUtils: true, // Custom utilities for state management
			generateLookups: false, // No lookups for singleton
			
			// Import types from other domains
			sharedTypes: [],
			
			// No templates for singleton
			utilityTemplates: [],
			
			// No category filters for singleton
			categoryFilters: [],
			
			// Don't clean data - preserve all fields
			applyDataCleaning: false,
		})
	}
	
	/**
	 * Override to handle singleton data structure
	 */
	protected override extractEntities(sourceData: any): Record<string, PlayerData> {
		// PlayerData is a singleton - we process whatever data is provided
		// The actual data will come from player_data.json when called from main generation
		// But for tests, we use the provided sourceData
		
		// Return singleton with fixed key
		return { 
			'player-data': this.transformEntity(sourceData)
		}
	}
	
	/**
	 * Transform raw player data - preserve all fields as-is
	 */
	protected override transformEntity(rawData: any): PlayerData {
		// Pass through all data - no transformation needed
		// The types will be defined in defineInterfaces
		return rawData as PlayerData
	}
	
	/**
	 * Define the complex PlayerData interface structure
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		const interfaces: InterfaceDefinition[] = []
		
		// Main PlayerData interface
		interfaces.push({
			name: 'PlayerData',
			properties: [
				{ name: 'type', type: 'string' },
				{ name: 'currentTimestamp', type: 'string' },
				
				// User account
				{ name: 'user', type: 'User' },
				{ name: 'email', type: 'string' },
				{ name: 'kongregateUserId', type: 'string' },
				{ name: 'steamUserId', type: 'string' },
				{ name: 'guestPassword', type: 'string' },
				{ name: 'userInfo', type: 'UserInfo' },
				{ name: 'userReferralBonuses', type: 'UserReferralBonus[]' },
				
				// Character core
				{ name: 'character', type: 'Character' },
				{ name: 'characterInfo', type: 'CharacterInfo' },
				{ name: 'characterSetting', type: 'CharacterSetting' },
				
				// Character progress arrays
				{ name: 'characterSkills', type: 'CharacterSkill[]' },
				{ name: 'characterItems', type: 'CharacterItem[]' },
				{ name: 'characterActions', type: 'CharacterAction[]' },
				{ name: 'characterQuests', type: 'CharacterQuest[]' },
				{ name: 'characterAbilities', type: 'CharacterAbility[]' },
				
				// Character infrastructure maps
				{ name: 'characterLoadoutMap', type: 'Record<string, CharacterLoadout>' },
				{ name: 'characterHouseRoomMap', type: 'Record<string, CharacterHouseRoom>' },
				{ name: 'characterUpgradeMap', type: 'Record<string, CharacterUpgrade>' },
				{ name: 'characterTaskTypeBlocks', type: 'string[]' },
				
				// Social systems
				{ name: 'guild', type: 'Guild | null' },
				{ name: 'guildCharacterMap', type: 'Record<string, GuildCharacter>' },
				{ name: 'guildSharableCharacterMap', type: 'Record<string, SharableCharacter>' },
				{ name: 'guildInviteMap', type: 'Record<string, GuildInvite>' },
				{ name: 'guildInviteGuildNameMap', type: 'Record<string, string>' },
				{ name: 'guildInviterSharableCharacterMap', type: 'Record<string, SharableCharacter>' },
				{ name: 'friendCharacterMap', type: 'Record<string, FriendCharacter>' },
				{ name: 'friendSharableCharacterMap', type: 'Record<string, SharableCharacter>' },
				{ name: 'blockedCharacterMap', type: 'Record<string, BlockedCharacter>' },
				
				// Market and trade
				{ name: 'marketCharacterDataMap', type: 'Record<string, MarketCharacterData>' },
				{ name: 'marketListingsByItemMap', type: 'Record<string, MarketListing[]>' },
				{ name: 'upgradableItemDetailMap', type: 'Record<string, UpgradableItemDetail>' },
				
				// Combat systems
				{ name: 'abilityCombatTriggersMap', type: 'Record<string, AbilityCombatTrigger[]>' },
				{ name: 'actionTypeDrinkSlotsMap', type: 'Record<string, DrinkSlot[]>' },
				{ name: 'actionTypeFoodSlotsMap', type: 'Record<string, FoodSlot[]>' },
				
				// Chat and messaging
				{ name: 'chatHistoryByChannelMap', type: 'Record<string, ChatMessage[]>' },
				{ name: 'privateMessages', type: 'PrivateMessage[]' },
				
				// Quests and events
				{ name: 'dailyQuests', type: 'Quest[]' },
				{ name: 'weeklyQuests', type: 'Quest[]' },
				{ name: 'unlockedQuestHrids', type: 'string[]' },
				{ name: 'characterDailyResetTimestamp', type: 'string' },
				{ name: 'characterWeeklyResetTimestamp', type: 'string' },
				
				// Global events
				{ name: 'announcementMessage', type: 'string' },
				{ name: 'announcementTimestamp', type: 'string' },
				{ name: 'dungeonsRefreshTimestamp', type: 'string' },
				{ name: 'event', type: 'GameEvent | null' },
				{ name: 'globalMarketLastRefreshTimestamp', type: 'string' },
				
				// Leaderboards
				{ name: 'leaderboardCharacterMap', type: 'Record<string, LeaderboardCharacter>' },
				{ name: 'leaderboardGuildMap', type: 'Record<string, LeaderboardGuild>' },
				{ name: 'leaderboards', type: 'Record<string, Leaderboard>' },
				{ name: 'steamLeaderboards', type: 'Record<string, SteamLeaderboard>' },
				
				// Community buffs
				{ name: 'communityBuffs', type: 'CommunityBuff[]' },
				{ name: 'communityBuffNominations', type: 'Record<string, CommunityBuffNomination>' },
				{ name: 'communityBuffVotesByHrid', type: 'Record<string, number>' },
				
				// Server info
				{ name: 'serverUpgradeStateMap', type: 'Record<string, ServerUpgradeState>' },
				{ name: 'serverRankRewardTimestamp', type: 'string' },
			],
		})
		
		// User interface
		interfaces.push({
			name: 'User',
			properties: [
				{ name: 'id', type: 'string' },
				{ name: 'username', type: 'string' },
				{ name: 'createdAt', type: 'string' },
			],
		})
		
		// UserInfo interface
		interfaces.push({
			name: 'UserInfo',
			properties: [
				{ name: 'totalPlayTime', type: 'number' },
				{ name: 'isPremium', type: 'boolean' },
				{ name: 'premiumExpirationTimestamp', type: 'string | null' },
			],
		})
		
		// Character interface
		interfaces.push({
			name: 'Character',
			properties: [
				{ name: 'id', type: 'string' },
				{ name: 'name', type: 'string' },
				{ name: 'gameMode', type: 'string' },
				{ name: 'createdAt', type: 'string' },
				{ name: 'lastActionTimestamp', type: 'string' },
			],
		})
		
		// CharacterInfo interface
		interfaces.push({
			name: 'CharacterInfo',
			properties: [
				{ name: 'totalLevel', type: 'number' },
				{ name: 'combatLevel', type: 'number' },
				{ name: 'accountPower', type: 'number' },
				{ name: 'currentHealth', type: 'number' },
				{ name: 'maxHealth', type: 'number' },
			],
		})
		
		// CharacterSetting interface
		interfaces.push({
			name: 'CharacterSetting',
			properties: [
				{ name: 'autoSellEnabled', type: 'boolean' },
				{ name: 'autoTradeEnabled', type: 'boolean' },
				{ name: 'chatEnabled', type: 'boolean' },
				{ name: 'soundEnabled', type: 'boolean' },
			],
		})
		
		// CharacterSkill interface
		interfaces.push({
			name: 'CharacterSkill',
			properties: [
				{ name: 'skillHrid', type: 'string' },
				{ name: 'level', type: 'number' },
				{ name: 'experience', type: 'number' },
			],
		})
		
		// CharacterItem interface
		interfaces.push({
			name: 'CharacterItem',
			properties: [
				{ name: 'itemHrid', type: 'string' },
				{ name: 'count', type: 'number' },
				{ name: 'enhancementLevel', type: 'number | null' },
			],
		})
		
		// CharacterAction interface
		interfaces.push({
			name: 'CharacterAction',
			properties: [
				{ name: 'actionHrid', type: 'string' },
				{ name: 'startedAt', type: 'string' },
				{ name: 'completesAt', type: 'string' },
			],
		})
		
		// CharacterQuest interface
		interfaces.push({
			name: 'CharacterQuest',
			properties: [
				{ name: 'questHrid', type: 'string' },
				{ name: 'progress', type: 'number' },
				{ name: 'completedCount', type: 'number' },
			],
		})
		
		// CharacterAbility interface
		interfaces.push({
			name: 'CharacterAbility',
			properties: [
				{ name: 'abilityHrid', type: 'string' },
				{ name: 'level', type: 'number' },
			],
		})
		
		// Guild interface
		interfaces.push({
			name: 'Guild',
			properties: [
				{ name: 'id', type: 'string' },
				{ name: 'name', type: 'string' },
				{ name: 'tag', type: 'string' },
				{ name: 'description', type: 'string' },
				{ name: 'level', type: 'number' },
			],
		})
		
		// Add placeholder types for complex nested structures
		// These would need more detailed definitions based on actual data
		const placeholderTypes = [
			'UserReferralBonus',
			'CharacterLoadout',
			'CharacterHouseRoom',
			'CharacterUpgrade',
			'GuildCharacter',
			'SharableCharacter',
			'GuildInvite',
			'FriendCharacter',
			'BlockedCharacter',
			'MarketCharacterData',
			'MarketListing',
			'UpgradableItemDetail',
			'AbilityCombatTrigger',
			'DrinkSlot',
			'FoodSlot',
			'ChatMessage',
			'PrivateMessage',
			'Quest',
			'GameEvent',
			'LeaderboardCharacter',
			'LeaderboardGuild',
			'Leaderboard',
			'SteamLeaderboard',
			'CommunityBuff',
			'CommunityBuffNomination',
			'ServerUpgradeState',
		]
		
		for (const typeName of placeholderTypes) {
			interfaces.push({
				name: typeName,
				properties: [
					{ name: 'id', type: 'string', optional: true },
					{ name: 'data', type: 'any', optional: true },
				],
			})
		}
		
		return interfaces
	}
	
	/**
	 * Define utility functions for PlayerData singleton
	 */
	protected override defineUtilities(): UtilityDefinition[] {
		const utilities: UtilityDefinition[] = []
		
		// Get character skill by HRID
		utilities.push({
			name: 'getCharacterSkill',
			parameters: [
				{ name: 'playerData', type: 'PlayerData' },
				{ name: 'skillHrid', type: 'string' },
			],
			returnType: 'CharacterSkill | undefined',
			implementation: (writer) => {
				writer.writeLine(
					'return playerData.characterSkills.find(s => s.skillHrid === skillHrid)'
				)
			},
			imports: [
				{ from: './types', names: ['PlayerData', 'CharacterSkill'], isType: true },
			],
			jsDoc: {
				description: 'Gets a character skill by HRID.',
				returns: 'The character skill or undefined',
			},
		})
		
		// Get character item count
		utilities.push({
			name: 'getCharacterItemCount',
			parameters: [
				{ name: 'playerData', type: 'PlayerData' },
				{ name: 'itemHrid', type: 'string' },
			],
			returnType: 'number',
			implementation: (writer) => {
				writer.writeLine(
					'const item = playerData.characterItems.find(i => i.itemHrid === itemHrid)'
				)
				writer.writeLine('return item?.count || 0')
			},
			imports: [
				{ from: './types', names: ['PlayerData'], isType: true },
			],
			jsDoc: {
				description: 'Gets the count of a specific item in character inventory.',
				returns: 'The item count or 0',
			},
		})
		
		// Check if character has ability
		utilities.push({
			name: 'hasCharacterAbility',
			parameters: [
				{ name: 'playerData', type: 'PlayerData' },
				{ name: 'abilityHrid', type: 'string' },
			],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine(
					'return playerData.characterAbilities.some(a => a.abilityHrid === abilityHrid)'
				)
			},
			imports: [
				{ from: './types', names: ['PlayerData'], isType: true },
			],
			jsDoc: {
				description: 'Checks if character has a specific ability.',
				returns: 'True if character has the ability',
			},
		})
		
		// Get total character level
		utilities.push({
			name: 'getTotalLevel',
			parameters: [{ name: 'playerData', type: 'PlayerData' }],
			returnType: 'number',
			implementation: (writer) => {
				writer.writeLine(
					'return playerData.characterSkills.reduce((sum, skill) => sum + skill.level, 0)'
				)
			},
			imports: [
				{ from: './types', names: ['PlayerData'], isType: true },
			],
			jsDoc: {
				description: 'Calculates the total level across all skills.',
				returns: 'The sum of all skill levels',
			},
		})
		
		// Check if player is in guild
		utilities.push({
			name: 'isInGuild',
			parameters: [{ name: 'playerData', type: 'PlayerData' }],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine('return playerData.guild !== null')
			},
			imports: [
				{ from: './types', names: ['PlayerData'], isType: true },
			],
			jsDoc: {
				description: 'Checks if the player is in a guild.',
				returns: 'True if player is in a guild',
			},
		})
		
		return utilities
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularPlayerDataGenerator()
	await generator.generate('./src/sources/game_data.json')
}