import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

// Type definitions to support the generator
interface PlayerData {
	type: 'init_character_data'
	currentTimestamp: string
	user: User
	email: string
	kongregateUserId: string
	steamUserId: string
	guestPassword: string
	userInfo: UserInfo
	userReferralBonuses: any[]
	character: Character
	characterInfo: CharacterInfo
	characterSetting: CharacterSetting
	characterSkills: CharacterSkill[]
	characterItems: CharacterItem[]
	characterActions: CharacterAction[]
	characterQuests: CharacterQuest[]
	characterAbilities: CharacterAbility[]
	characterLoadoutMap: Record<string, any>
	characterHouseRoomMap: Record<string, any>
	characterUpgradeMap: Record<string, any>
	characterTaskTypeBlocks: any[]
	guild: any | null
	guildCharacterMap: Record<string, any>
	guildSharableCharacterMap: Record<string, any>
	guildInviteMap: Record<string, any>
	guildInviteGuildNameMap: Record<string, any>
	guildInviterSharableCharacterMap: Record<string, any>
	friendCharacterMap: Record<string, any>
	blockedCharacterMap: Record<string, any>
	userAvatarMap: Record<string, any>
	userAvatarOutfitMap: Record<string, any>
	userChatIconMap: Record<string, any>
	userNameColorMap: Record<string, any>
	communityBuffs: any[]
	mooPassBuffs: any[]
	communityActionTypeBuffsMap: Record<string, any>
	equipmentActionTypeBuffsMap: Record<string, any>
	houseActionTypeBuffsMap: Record<string, any>
	consumableActionTypeBuffsMap: Record<string, any>
	mooPassActionTypeBuffsMap: Record<string, any>
	equipmentTaskActionBuffs: any[]
	combatUnit: any | null
	noncombatStats: Record<string, any>
	abilityCombatTriggersMap: Record<string, any>
	consumableCombatTriggersMap: Record<string, any>
	chatHistoryByChannelMap: Record<string, any>
	whisperChatHistory: any[]
	guildChatHistory: any[]
	partyChatHistory: any[]
	moderatorChatHistory: any[]
	chatMinLevel: number
	generalChatMinLevel: number
	generalChatMinExp: number
	enableAutomod: boolean
	partyInfo: any | null
	myMarketListings: any[]
	offlineItems: any[]
	offlineSkills: any[]
	actionTypeDrinkSlotsMap: Record<string, any>
	actionTypeFoodSlotsMap: Record<string, any>
	serverSetting: Record<string, any>
	announcementMessage: string
	announcementTimestamp: string
}

interface User {
	id: number
	isGuest: boolean
	isAdmin: boolean
	isCco: boolean
	isSuperModerator: boolean
	isModerator: boolean
	isMuted: boolean
	muteStartTime: string
	muteExpireTime: string
	muteReason: string
	isBanned: boolean
	banStartTime: string
	banExpireTime: string
	banReason: string
	isDeleted: boolean
	createdAt: string
	updatedAt: string
}

interface UserInfo {
	userID: number
	supporterPoints: number
	lifetimeSupporterPoints: number
	referralCount: number
	cowbellMarketRestrictionExpireTime: string
	mooPassExpireTime: string
}

interface Character {
	id: number
	userID: number
	gameMode: string
	name: string
	previousName: string
	specialChatIconHrid: string
	chatIconHrid: string
	nameColorHrid: string
	avatarHrid: string
	avatarOutfitHrid: string
	isOnline: boolean
	lastOfflineTime: string
	inactiveTime: string
	isDeleted: boolean
	createdAt: string
	updatedAt: string
}

interface CharacterInfo {
	characterID: number
	tutorialCompletionBitsFlags: number
	milkCapacityLevel: number
	taskSlotCapacityLevel: number
	inventorySlotCapacityLevel: number
	equipmentSlotCapacityLevel: number
	lootingCapacityLevel: number
	actionSpeedLevel: number
	cowbellCapacityLevel: number
	enhancingCapacityLevel: number
	actionSlotCapacityLevel: number
	milkCapacityCap: number
	taskSlotCapacityCap: number
	inventorySlotCapacityCap: number
	equipmentSlotCapacityCap: number
	lootingCapacityCap: number
	actionSpeedCap: number
	cowbellCapacityCap: number
	enhancingCapacityCap: number
	actionSlotCapacityCap: number
	famePoints: number
	milkingLevel: number
	houseLevel: number
	houseLevelCap: number
	questStageByQuestHridMap: Record<string, number>
	createdAt: string
	updatedAt: string
}

interface CharacterSetting {
	characterID: number
	guildRequestEnabled: boolean
	stalkingProtection: boolean
	publicLoadouts: boolean
	publicStats: boolean
	publicLeaderboards: boolean
	hideFromLeaderboards: boolean
	privateRecentPlayers: boolean
	compactInventory: boolean
	compactActions: boolean
	compactLoadouts: boolean
	compactAvatar: boolean
	actionBarOnTop: boolean
	lockAvatarOutfit: boolean
	createdAt: string
	updatedAt: string
}

interface CharacterSkill {
	characterID: number
	skillHrid: string
	experience: number
	level: number
	offlineExperience: number
	createdAt: string
	updatedAt: string
}

interface CharacterItem {
	id: number
	characterID: number
	itemLocationHrid: string
	itemHrid: string
	enhancementLevel: number
	count: number
	offlineCount: number
	hash: string
	createdAt: string
	updatedAt: string
}

interface CharacterAction {
	id: number
	characterID: number
	partyID: number
	actionHrid: string
	difficultyTier: number
	hasMaxCount: boolean
	maxCount: number
	currentCount: number
	wave: number
	primaryItemHash: string
	secondaryItemHash: string
	enhancingMaxLevel: number
	enhancingProtectionMinLevel: number
	characterLoadoutID: number
	ordinal: number
	isDone: boolean
	createdAt: string
	updatedAt: string
}

interface CharacterQuest {
	id: number
	characterID: number
	questHrid: string
	isCompleted: boolean
	completedAt: string
	createdAt: string
	updatedAt: string
}

interface CharacterAbility {
	characterID: number
	abilityHrid: string
	cooldownCompletionTime: string
	createdAt: string
	updatedAt: string
}

/**
 * Player Data Modular Generator - Generates modular types for the complete player state structure.
 *
 * Unlike other generators that process collections of entities, this handles a single
 * player state object with 63 top-level properties including inventory, skills,
 * actions, social data, and more.
 *
 * Special architecture for player data:
 * - types.ts: All interfaces and type definitions
 * - validators.ts: Type guards and validation functions
 * - utils.ts: Helper functions for state manipulation
 * - defaults.ts: Default/initial state values
 * - index.ts: Named exports only
 *
 * No data.ts or constants.ts since this is runtime data, not static game data.
 */
export class ModularPlayerDataGenerator extends ModularBaseGenerator<PlayerData> {
	constructor() {
		super({
			entityName: 'PlayerData',
			entityNamePlural: 'PlayerData', // Singular since it's one state object
			sourceKey: '', // Root level - entire JSON is the data
			outputPath: './src/generated/playerdata/index.ts',
			generateConstants: false, // No HRID constants needed
			generateUtils: true, // Generate utility functions
		})
	}

	protected extractEntities(sourceData: any): Record<string, PlayerData> {
		// For player data, we have a single instance, not a collection
		// We'll use a single key to maintain consistency with BaseModularGenerator
		const playerData = this.extractPlayerData(sourceData)

		console.log(
			`  📊 Extracted player data with ${Object.keys(sourceData).length} top-level properties`,
		)
		console.log(`  👤 Character ID: ${playerData.character?.id}`)
		console.log(`  🎮 Game Mode: ${playerData.character?.gameMode}`)
		console.log(`  📦 Items: ${playerData.characterItems?.length || 0}`)
		console.log(`  🛠️ Skills: ${playerData.characterSkills?.length || 0}`)
		console.log(`  ⚡ Actions: ${playerData.characterActions?.length || 0}`)

		return { 'player-data': playerData }
	}

	private extractPlayerData(data: any): PlayerData {
		// Clean and structure the player data
		const playerData: PlayerData = {
			type: data.type || 'init_character_data',
			currentTimestamp: data.currentTimestamp || '',

			// Core user and character data
			user: this.extractUser(data.user || {}),
			email: data.email || '',
			kongregateUserId: data.kongregateUserId || '',
			steamUserId: data.steamUserId || '',
			guestPassword: data.guestPassword || '',

			userInfo: this.extractUserInfo(data.userInfo || {}),
			userReferralBonuses: data.userReferralBonuses || [],

			character: this.extractCharacter(data.character || {}),
			characterInfo: this.extractCharacterInfo(data.characterInfo || {}),
			characterSetting: this.extractCharacterSetting(
				data.characterSetting || {},
			),

			// Player progress arrays
			characterSkills: (data.characterSkills || []).map((skill: any) =>
				this.extractCharacterSkill(skill),
			),
			characterItems: (data.characterItems || []).map((item: any) =>
				this.extractCharacterItem(item),
			),
			characterActions: (data.characterActions || []).map((action: any) =>
				this.extractCharacterAction(action),
			),
			characterQuests: (data.characterQuests || []).map((quest: any) =>
				this.extractCharacterQuest(quest),
			),
			characterAbilities: (data.characterAbilities || []).map((ability: any) =>
				this.extractCharacterAbility(ability),
			),

			// Player infrastructure
			characterLoadoutMap: data.characterLoadoutMap || {},
			characterHouseRoomMap: data.characterHouseRoomMap || {},
			characterUpgradeMap: data.characterUpgradeMap || {},
			characterTaskTypeBlocks: data.characterTaskTypeBlocks || [],

			// Social systems
			guild: data.guild || null,
			guildCharacterMap: data.guildCharacterMap || {},
			guildSharableCharacterMap: data.guildSharableCharacterMap || {},
			guildInviteMap: data.guildInviteMap || {},
			guildInviteGuildNameMap: data.guildInviteGuildNameMap || {},
			guildInviterSharableCharacterMap:
				data.guildInviterSharableCharacterMap || {},
			friendCharacterMap: data.friendCharacterMap || {},
			blockedCharacterMap: data.blockedCharacterMap || {},

			// Player customization
			userAvatarMap: data.userAvatarMap || {},
			userAvatarOutfitMap: data.userAvatarOutfitMap || {},
			userChatIconMap: data.userChatIconMap || {},
			userNameColorMap: data.userNameColorMap || {},

			// Buffs and bonuses
			communityBuffs: data.communityBuffs || [],
			mooPassBuffs: data.mooPassBuffs || [],
			communityActionTypeBuffsMap: data.communityActionTypeBuffsMap || {},
			equipmentActionTypeBuffsMap: data.equipmentActionTypeBuffsMap || {},
			houseActionTypeBuffsMap: data.houseActionTypeBuffsMap || {},
			consumableActionTypeBuffsMap: data.consumableActionTypeBuffsMap || {},
			mooPassActionTypeBuffsMap: data.mooPassActionTypeBuffsMap || {},
			equipmentTaskActionBuffs: data.equipmentTaskActionBuffs || {},

			// Combat system
			combatUnit: data.combatUnit || null,
			noncombatStats: data.noncombatStats || {},
			abilityCombatTriggersMap: data.abilityCombatTriggersMap || {},
			consumableCombatTriggersMap: data.consumableCombatTriggersMap || {},

			// Communication
			chatHistoryByChannelMap: data.chatHistoryByChannelMap || {},
			whisperChatHistory: data.whisperChatHistory || {},
			guildChatHistory: data.guildChatHistory || {},
			partyChatHistory: data.partyChatHistory || {},
			moderatorChatHistory: data.moderatorChatHistory || {},
			chatMinLevel: data.chatMinLevel || 0,
			generalChatMinLevel: data.generalChatMinLevel || 0,
			generalChatMinExp: data.generalChatMinExp || 0,
			enableAutomod: data.enableAutomod || false,

			// Session and market data
			partyInfo: data.partyInfo || null,
			myMarketListings: data.myMarketListings || [],
			offlineItems: data.offlineItems || [],
			offlineSkills: data.offlineSkills || [],

			// Action type configurations
			actionTypeDrinkSlotsMap: data.actionTypeDrinkSlotsMap || {},
			actionTypeFoodSlotsMap: data.actionTypeFoodSlotsMap || {},

			// Server and announcement data
			serverSetting: data.serverSetting || {},
			announcementMessage: data.announcementMessage || '',
			announcementTimestamp: data.announcementTimestamp || '',
		}

		return this.cleanEntityData(playerData) as PlayerData
	}

	// Extract methods for sub-interfaces
	private extractUser(data: any): User {
		return {
			id: data.id || 0,
			isGuest: data.isGuest || false,
			isAdmin: data.isAdmin || false,
			isCco: data.isCco || false,
			isSuperModerator: data.isSuperModerator || false,
			isModerator: data.isModerator || false,
			isMuted: data.isMuted || false,
			muteStartTime: data.muteStartTime || '',
			muteExpireTime: data.muteExpireTime || '',
			muteReason: data.muteReason || '',
			isBanned: data.isBanned || false,
			banStartTime: data.banStartTime || '',
			banExpireTime: data.banExpireTime || '',
			banReason: data.banReason || '',
			isDeleted: data.isDeleted || false,
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractUserInfo(data: any): UserInfo {
		return {
			userID: data.userID || 0,
			supporterPoints: data.supporterPoints || 0,
			lifetimeSupporterPoints: data.lifetimeSupporterPoints || 0,
			referralCount: data.referralCount || 0,
			cowbellMarketRestrictionExpireTime:
				data.cowbellMarketRestrictionExpireTime || '',
			mooPassExpireTime: data.mooPassExpireTime || '',
		}
	}

	private extractCharacter(data: any): Character {
		return {
			id: data.id || 0,
			userID: data.userID || 0,
			gameMode: data.gameMode || '',
			name: data.name || '',
			previousName: data.previousName || '',
			specialChatIconHrid: data.specialChatIconHrid || '',
			chatIconHrid: data.chatIconHrid || '',
			nameColorHrid: data.nameColorHrid || '',
			avatarHrid: data.avatarHrid || '',
			avatarOutfitHrid: data.avatarOutfitHrid || '',
			isOnline: data.isOnline || false,
			lastOfflineTime: data.lastOfflineTime || '',
			inactiveTime: data.inactiveTime || '',
			isDeleted: data.isDeleted || false,
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractCharacterInfo(data: any): CharacterInfo {
		return {
			characterID: data.characterID || 0,
			tutorialCompletionBitsFlags: data.tutorialCompletionBitsFlags || 0,
			milkCapacityLevel: data.milkCapacityLevel || 0,
			taskSlotCapacityLevel: data.taskSlotCapacityLevel || 0,
			inventorySlotCapacityLevel: data.inventorySlotCapacityLevel || 0,
			equipmentSlotCapacityLevel: data.equipmentSlotCapacityLevel || 0,
			lootingCapacityLevel: data.lootingCapacityLevel || 0,
			actionSpeedLevel: data.actionSpeedLevel || 0,
			cowbellCapacityLevel: data.cowbellCapacityLevel || 0,
			enhancingCapacityLevel: data.enhancingCapacityLevel || 0,
			actionSlotCapacityLevel: data.actionSlotCapacityLevel || 0,
			milkCapacityCap: data.milkCapacityCap || 0,
			taskSlotCapacityCap: data.taskSlotCapacityCap || 0,
			inventorySlotCapacityCap: data.inventorySlotCapacityCap || 0,
			equipmentSlotCapacityCap: data.equipmentSlotCapacityCap || 0,
			lootingCapacityCap: data.lootingCapacityCap || 0,
			actionSpeedCap: data.actionSpeedCap || 0,
			cowbellCapacityCap: data.cowbellCapacityCap || 0,
			enhancingCapacityCap: data.enhancingCapacityCap || 0,
			actionSlotCapacityCap: data.actionSlotCapacityCap || 0,
			famePoints: data.famePoints || 0,
			milkingLevel: data.milkingLevel || 0,
			houseLevel: data.houseLevel || 0,
			houseLevelCap: data.houseLevelCap || 0,
			questStageByQuestHridMap: data.questStageByQuestHridMap || {},
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractCharacterSetting(data: any): CharacterSetting {
		return {
			characterID: data.characterID || 0,
			guildRequestEnabled: data.guildRequestEnabled || false,
			stalkingProtection: data.stalkingProtection || false,
			publicLoadouts: data.publicLoadouts || false,
			publicStats: data.publicStats || false,
			publicLeaderboards: data.publicLeaderboards || false,
			hideFromLeaderboards: data.hideFromLeaderboards || false,
			privateRecentPlayers: data.privateRecentPlayers || false,
			compactInventory: data.compactInventory || false,
			compactActions: data.compactActions || false,
			compactLoadouts: data.compactLoadouts || false,
			compactAvatar: data.compactAvatar || false,
			actionBarOnTop: data.actionBarOnTop || false,
			lockAvatarOutfit: data.lockAvatarOutfit || false,
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractCharacterSkill(data: any): CharacterSkill {
		return {
			characterID: data.characterID || 0,
			skillHrid: data.skillHrid || '',
			experience: data.experience || 0,
			level: data.level || 0,
			offlineExperience: data.offlineExperience || 0,
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractCharacterItem(data: any): CharacterItem {
		return {
			id: data.id || 0,
			characterID: data.characterID || 0,
			itemLocationHrid: data.itemLocationHrid || '',
			itemHrid: data.itemHrid || '',
			enhancementLevel: data.enhancementLevel || 0,
			count: data.count || 0,
			offlineCount: data.offlineCount || 0,
			hash: data.hash || '',
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractCharacterAction(data: any): CharacterAction {
		return {
			id: data.id || 0,
			characterID: data.characterID || 0,
			partyID: data.partyID || 0,
			actionHrid: data.actionHrid || '',
			difficultyTier: data.difficultyTier || 0,
			hasMaxCount: data.hasMaxCount || false,
			maxCount: data.maxCount || 0,
			currentCount: data.currentCount || 0,
			wave: data.wave || 0,
			primaryItemHash: data.primaryItemHash || '',
			secondaryItemHash: data.secondaryItemHash || '',
			enhancingMaxLevel: data.enhancingMaxLevel || 0,
			enhancingProtectionMinLevel: data.enhancingProtectionMinLevel || 0,
			characterLoadoutID: data.characterLoadoutID || 0,
			ordinal: data.ordinal || 0,
			isDone: data.isDone || false,
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractCharacterQuest(data: any): CharacterQuest {
		return {
			id: data.id || 0,
			characterID: data.characterID || 0,
			questHrid: data.questHrid || '',
			isCompleted: data.isCompleted || false,
			completedAt: data.completedAt || '',
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	private extractCharacterAbility(data: any): CharacterAbility {
		return {
			characterID: data.characterID || 0,
			abilityHrid: data.abilityHrid || '',
			cooldownCompletionTime: data.cooldownCompletionTime || '',
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
		}
	}

	protected override generateTypes(entities: Record<string, PlayerData>): void {
		// Import all necessary game entity HRID types (type-only imports)
		const typesBuilder = this.moduleBuilder.getFile('types')
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../actions/types', ['ActionHrid'], true)
		typesBuilder.addImport('../abilities/types', ['AbilityHrid'], true)
		typesBuilder.addImport('../avatars/types', ['AvatarHrid'], true)
		typesBuilder.addImport('../avataroutfits/types', ['AvatarOutfitHrid'], true)
		typesBuilder.addImport('../chaticons/types', ['ChatIconHrid'], true)
		typesBuilder.addImport('../namecolors/types', ['NameColorHrid'], true)
		typesBuilder.addImport('../gamemodes/types', ['GameModeHrid'], true)
		typesBuilder.addImport('../houserooms/types', ['HouseRoomHrid'], true)
		typesBuilder.addImport('../bufftypes/types', ['BuffTypeHrid', 'Buff'], true)
		typesBuilder.addImport(
			'../monsters/types',
			['MonsterHrid', 'CombatDetails'],
			true,
		)
		typesBuilder.addImport('../itemlocations/types', ['ItemLocationHrid'], true)
		typesBuilder.addImport(
			'../communitybufftypes/types',
			['CommunityBuffTypeHrid', 'CommunityBuff'],
			true,
		)

		// Generate all sub-interfaces
		this.generateUserInterface()
		this.generateUserInfoInterface()
		this.generateCharacterInterface()
		this.generateCharacterInfoInterface()
		this.generateCharacterSettingInterface()
		this.generateCharacterSkillInterface()
		this.generateCharacterItemInterface()
		this.generateCharacterActionInterface()
		this.generateCharacterQuestInterface()
		this.generateCharacterAbilityInterface()

		// Generate new interfaces for complex types
		this.generateCharacterLoadoutInterface()
		this.generateCharacterHouseRoomInterface()
		this.generateCharacterUpgradeInterface()
		this.generateGuildInterface()
		this.generateGuildCharacterInterface()
		this.generateChatMessageInterface()
		this.generateMarketListingInterface()
		this.generatePartyInfoInterface()
		this.generateCombatUnitInterface()
		this.generateCombatAbilityInterface()
		this.generateCombatConsumableInterface()
		this.generateOfflineItemInterface()
		this.generateOfflineSkillInterface()
		this.generateUserReferralBonusInterface()

		// Generate main PlayerData interface
		this.generateMainPlayerDataInterface()

		// Export all interfaces from types.ts (they're automatically exported when created with addInterface)
	}

	private generateUserInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'isGuest', type: 'boolean', optional: false },
			{ name: 'isAdmin', type: 'boolean', optional: false },
			{ name: 'isCco', type: 'boolean', optional: false },
			{ name: 'isSuperModerator', type: 'boolean', optional: false },
			{ name: 'isModerator', type: 'boolean', optional: false },
			{ name: 'isMuted', type: 'boolean', optional: false },
			{ name: 'muteStartTime', type: 'string', optional: false },
			{ name: 'muteExpireTime', type: 'string', optional: false },
			{ name: 'muteReason', type: 'string', optional: false },
			{ name: 'isBanned', type: 'boolean', optional: false },
			{ name: 'banStartTime', type: 'string', optional: false },
			{ name: 'banExpireTime', type: 'string', optional: false },
			{ name: 'banReason', type: 'string', optional: false },
			{ name: 'isDeleted', type: 'boolean', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('User', properties)
	}

	private generateUserInfoInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'userID', type: 'number', optional: false },
			{ name: 'supporterPoints', type: 'number', optional: false },
			{ name: 'lifetimeSupporterPoints', type: 'number', optional: false },
			{ name: 'referralCount', type: 'number', optional: false },
			{
				name: 'cowbellMarketRestrictionExpireTime',
				type: 'string',
				optional: false,
			},
			{ name: 'mooPassExpireTime', type: 'string', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('UserInfo', properties)
	}

	private generateCharacterInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'userID', type: 'number', optional: false },
			{ name: 'gameMode', type: 'GameModeHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'previousName', type: 'string', optional: false },
			{
				name: 'specialChatIconHrid',
				type: 'ChatIconHrid | ""',
				optional: false,
			},
			{ name: 'chatIconHrid', type: 'ChatIconHrid | ""', optional: false },
			{ name: 'nameColorHrid', type: 'NameColorHrid | ""', optional: false },
			{ name: 'avatarHrid', type: 'AvatarHrid', optional: false },
			{ name: 'avatarOutfitHrid', type: 'AvatarOutfitHrid', optional: false },
			{ name: 'isOnline', type: 'boolean', optional: false },
			{ name: 'lastOfflineTime', type: 'string', optional: false },
			{ name: 'inactiveTime', type: 'string', optional: false },
			{ name: 'isDeleted', type: 'boolean', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('Character', properties)
	}

	private generateCharacterInfoInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'tutorialCompletionBitsFlags', type: 'number', optional: false },
			{ name: 'milkCapacityLevel', type: 'number', optional: false },
			{ name: 'taskSlotCapacityLevel', type: 'number', optional: false },
			{ name: 'inventorySlotCapacityLevel', type: 'number', optional: false },
			{ name: 'equipmentSlotCapacityLevel', type: 'number', optional: false },
			{ name: 'lootingCapacityLevel', type: 'number', optional: false },
			{ name: 'actionSpeedLevel', type: 'number', optional: false },
			{ name: 'cowbellCapacityLevel', type: 'number', optional: false },
			{ name: 'enhancingCapacityLevel', type: 'number', optional: false },
			{ name: 'actionSlotCapacityLevel', type: 'number', optional: false },
			{ name: 'milkCapacityCap', type: 'number', optional: false },
			{ name: 'taskSlotCapacityCap', type: 'number', optional: false },
			{ name: 'inventorySlotCapacityCap', type: 'number', optional: false },
			{ name: 'equipmentSlotCapacityCap', type: 'number', optional: false },
			{ name: 'lootingCapacityCap', type: 'number', optional: false },
			{ name: 'actionSpeedCap', type: 'number', optional: false },
			{ name: 'cowbellCapacityCap', type: 'number', optional: false },
			{ name: 'enhancingCapacityCap', type: 'number', optional: false },
			{ name: 'actionSlotCapacityCap', type: 'number', optional: false },
			{ name: 'famePoints', type: 'number', optional: false },
			{ name: 'milkingLevel', type: 'number', optional: false },
			{ name: 'houseLevel', type: 'number', optional: false },
			{ name: 'houseLevelCap', type: 'number', optional: false },
			{
				name: 'questStageByQuestHridMap',
				type: 'Record<string, number>',
				optional: false,
			},
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterInfo', properties)
	}

	private generateCharacterSettingInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'guildRequestEnabled', type: 'boolean', optional: false },
			{ name: 'stalkingProtection', type: 'boolean', optional: false },
			{ name: 'publicLoadouts', type: 'boolean', optional: false },
			{ name: 'publicStats', type: 'boolean', optional: false },
			{ name: 'publicLeaderboards', type: 'boolean', optional: false },
			{ name: 'hideFromLeaderboards', type: 'boolean', optional: false },
			{ name: 'privateRecentPlayers', type: 'boolean', optional: false },
			{ name: 'compactInventory', type: 'boolean', optional: false },
			{ name: 'compactActions', type: 'boolean', optional: false },
			{ name: 'compactLoadouts', type: 'boolean', optional: false },
			{ name: 'compactAvatar', type: 'boolean', optional: false },
			{ name: 'actionBarOnTop', type: 'boolean', optional: false },
			{ name: 'lockAvatarOutfit', type: 'boolean', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterSetting', properties)
	}

	private generateCharacterSkillInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'skillHrid', type: 'SkillHrid', optional: false },
			{ name: 'experience', type: 'number', optional: false },
			{ name: 'level', type: 'number', optional: false },
			{ name: 'offlineExperience', type: 'number', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterSkill', properties)
	}

	private generateCharacterItemInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'itemLocationHrid', type: 'ItemLocationHrid', optional: false },
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'enhancementLevel', type: 'number', optional: false },
			{ name: 'count', type: 'number', optional: false },
			{ name: 'offlineCount', type: 'number', optional: false },
			{ name: 'hash', type: 'string', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterItem', properties)
	}

	private generateCharacterActionInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'partyID', type: 'number', optional: false },
			{ name: 'actionHrid', type: 'ActionHrid', optional: false },
			{ name: 'difficultyTier', type: 'number', optional: false },
			{ name: 'hasMaxCount', type: 'boolean', optional: false },
			{ name: 'maxCount', type: 'number', optional: false },
			{ name: 'currentCount', type: 'number', optional: false },
			{ name: 'wave', type: 'number', optional: false },
			{ name: 'primaryItemHash', type: 'string', optional: false },
			{ name: 'secondaryItemHash', type: 'string', optional: false },
			{ name: 'enhancingMaxLevel', type: 'number', optional: false },
			{ name: 'enhancingProtectionMinLevel', type: 'number', optional: false },
			{ name: 'characterLoadoutID', type: 'number', optional: false },
			{ name: 'ordinal', type: 'number', optional: false },
			{ name: 'isDone', type: 'boolean', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterAction', properties)
	}

	private generateCharacterQuestInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'questHrid', type: 'string', optional: false }, // TODO: Import QuestHrid when available
			{ name: 'isCompleted', type: 'boolean', optional: false },
			{ name: 'completedAt', type: 'string', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterQuest', properties)
	}

	private generateCharacterAbilityInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'abilityHrid', type: 'AbilityHrid', optional: false },
			{ name: 'cooldownCompletionTime', type: 'string', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterAbility', properties)
	}

	private generateCharacterLoadoutInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'actionTypeHrid', type: 'string', optional: false }, // TODO: ActionTypeHrid when available
			{ name: 'name', type: 'string', optional: false },
			{ name: 'isDefault', type: 'boolean', optional: false },
			{ name: 'suppressValidation', type: 'boolean', optional: false },
			{
				name: 'wearableMap',
				type: 'Record<ItemLocationHrid, string>',
				optional: false,
			}, // Item hashes
			{ name: 'foodItemHrids', type: 'ItemHrid[]', optional: false },
			{ name: 'drinkItemHrids', type: 'ItemHrid[]', optional: false },
			{
				name: 'abilityMap',
				type: 'Record<string, AbilityHrid>',
				optional: false,
			}, // slot -> ability
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterLoadout', properties)
	}

	private generateCharacterHouseRoomInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'houseRoomHrid', type: 'HouseRoomHrid', optional: false },
			{ name: 'level', type: 'number', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterHouseRoom', properties)
	}

	private generateCharacterUpgradeInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'upgradeHrid', type: 'string', optional: false }, // TODO: UpgradeHrid when available
			{ name: 'count', type: 'number', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CharacterUpgrade', properties)
	}

	private generateGuildInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'experience', type: 'number', optional: false },
			{ name: 'level', type: 'number', optional: false },
			{ name: 'noticeMessage', type: 'string', optional: false },
			{ name: 'isDisbanded', type: 'boolean', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('Guild', properties)
	}

	private generateGuildCharacterInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'gameMode', type: 'GameModeHrid', optional: false },
			{ name: 'avatarHrid', type: 'AvatarHrid', optional: false },
			{ name: 'avatarOutfitHrid', type: 'AvatarOutfitHrid', optional: false },
			{ name: 'chatIconHrid', type: 'ChatIconHrid | ""', optional: false },
			{ name: 'nameColorHrid', type: 'NameColorHrid | ""', optional: false },
			{ name: 'isOnline', type: 'boolean', optional: false },
			{ name: 'guildRole', type: 'string', optional: false }, // e.g., "member", "officer", "leader"
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('GuildCharacter', properties)
	}

	private generateChatMessageInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'characterName', type: 'string', optional: false },
			{ name: 'message', type: 'string', optional: false },
			{ name: 'timestamp', type: 'string', optional: false },
			{ name: 'channelHrid', type: 'string', optional: true }, // For channel-specific messages
		]

		this.moduleBuilder.getFile('types').addInterface('ChatMessage', properties)
	}

	private generateMarketListingInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'characterID', type: 'number', optional: false },
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'enhancementLevel', type: 'number', optional: false },
			{ name: 'quantity', type: 'number', optional: false },
			{ name: 'price', type: 'number', optional: false },
			{ name: 'listedAt', type: 'string', optional: false },
			{ name: 'expiresAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('MarketListing', properties)
	}

	private generatePartyInfoInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'leaderID', type: 'number', optional: false },
			{ name: 'memberIDs', type: 'number[]', optional: false },
			{ name: 'maxMembers', type: 'number', optional: false },
			{ name: 'createdAt', type: 'string', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('PartyInfo', properties)
	}

	private generateCombatUnitInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'isActive', type: 'boolean', optional: false },
			{ name: 'isPlayer', type: 'boolean', optional: false },
			{ name: 'character', type: 'Character', optional: false },
			{ name: 'hrid', type: 'string', optional: false }, // MonsterHrid or character identifier
			{ name: 'experience', type: 'number', optional: false },
			{ name: 'difficultyTier', type: 'number', optional: false },
			{ name: 'eliteTier', type: 'number', optional: false },
			{ name: 'isEnraged', type: 'boolean', optional: false },
			{ name: 'enrageTimerDuration', type: 'number', optional: false },
			{ name: 'spawnTime', type: 'string', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'currentHitpoints', type: 'number', optional: false },
			{ name: 'maxHitpoints', type: 'number', optional: false },
			{ name: 'currentManapoints', type: 'number', optional: false },
			{ name: 'maxManapoints', type: 'number', optional: false },
			{ name: 'deathCount', type: 'number', optional: false },
			{ name: 'respawnTime', type: 'string', optional: false },
			{ name: 'combatAbilities', type: 'CombatAbility[]', optional: false },
			{ name: 'combatBuffMap', type: 'Record<string, Buff>', optional: false },
			{
				name: 'combatConsumables',
				type: 'CombatConsumable[]',
				optional: false,
			},
			{ name: 'combatDetails', type: 'CombatDetails', optional: false },
			{ name: 'isBlinded', type: 'boolean', optional: false },
			{ name: 'isSilenced', type: 'boolean', optional: false },
			{ name: 'damageSplatCounter', type: 'number', optional: false },
			{ name: 'criticalDamageSplatCounter', type: 'number', optional: false },
			{ name: 'attackAttemptCounter', type: 'number', optional: false },
			{ name: 'attackOrCastInterval', type: 'number', optional: false },
			{ name: 'isPreparingAutoAttack', type: 'boolean', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('CombatUnit', properties)
	}

	private generateCombatAbilityInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'abilityHrid', type: 'AbilityHrid', optional: false },
			{ name: 'level', type: 'number', optional: false },
			{ name: 'experience', type: 'number', optional: false },
			{ name: 'availableTime', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CombatAbility', properties)
	}

	private generateCombatConsumableInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'quantity', type: 'number', optional: false },
			{ name: 'availableTime', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('CombatConsumable', properties)
	}

	private generateOfflineItemInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'itemHrid', type: 'ItemHrid', optional: false },
			{ name: 'count', type: 'number', optional: false },
			{ name: 'enhancementLevel', type: 'number', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('OfflineItem', properties)
	}

	private generateOfflineSkillInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'skillHrid', type: 'SkillHrid', optional: false },
			{ name: 'experience', type: 'number', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('OfflineSkill', properties)
	}

	private generateUserReferralBonusInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'id', type: 'number', optional: false },
			{ name: 'referrerUserID', type: 'number', optional: false },
			{ name: 'referrerClaimCharacterID', type: 'number', optional: false },
			{ name: 'referredUserID', type: 'number', optional: false },
			{ name: 'referredCharacterID', type: 'number', optional: false },
			{ name: 'type', type: '"first_level" | "second_level"', optional: false },
			{ name: 'cowbellQuantity', type: 'number', optional: false },
			{
				name: 'status',
				type: '"pending" | "granted" | "claimed"',
				optional: false,
			},
			{ name: 'createdAt', type: 'string', optional: false },
			{ name: 'updatedAt', type: 'string', optional: false },
		]

		this.moduleBuilder
			.getFile('types')
			.addInterface('UserReferralBonus', properties)
	}

	private generateMainPlayerDataInterface(): void {
		const properties: PropertyDefinition[] = [
			{ name: 'type', type: '"init_character_data"', optional: false },
			{ name: 'currentTimestamp', type: 'string', optional: false },

			// Core user and character data
			{ name: 'user', type: 'User', optional: false },
			{ name: 'email', type: 'string', optional: false },
			{ name: 'kongregateUserId', type: 'string', optional: false },
			{ name: 'steamUserId', type: 'string', optional: false },
			{ name: 'guestPassword', type: 'string', optional: false },

			{ name: 'userInfo', type: 'UserInfo', optional: false },
			{
				name: 'userReferralBonuses',
				type: 'UserReferralBonus[]',
				optional: false,
			},

			{ name: 'character', type: 'Character', optional: false },
			{ name: 'characterInfo', type: 'CharacterInfo', optional: false },
			{ name: 'characterSetting', type: 'CharacterSetting', optional: false },

			// Player progress arrays
			{ name: 'characterSkills', type: 'CharacterSkill[]', optional: false },
			{ name: 'characterItems', type: 'CharacterItem[]', optional: false },
			{ name: 'characterActions', type: 'CharacterAction[]', optional: false },
			{ name: 'characterQuests', type: 'CharacterQuest[]', optional: false },
			{
				name: 'characterAbilities',
				type: 'CharacterAbility[]',
				optional: false,
			},

			// Player infrastructure
			{
				name: 'characterLoadoutMap',
				type: 'Record<string, CharacterLoadout>',
				optional: false,
			},
			{
				name: 'characterHouseRoomMap',
				type: 'Record<string, CharacterHouseRoom>',
				optional: false,
			},
			{
				name: 'characterUpgradeMap',
				type: 'Record<string, CharacterUpgrade>',
				optional: false,
			},
			{ name: 'characterTaskTypeBlocks', type: 'string[]', optional: false }, // Task type HRIDs that are blocked

			// Social systems
			{ name: 'guild', type: 'Guild | null', optional: false },
			{
				name: 'guildCharacterMap',
				type: 'Record<string, GuildCharacter>',
				optional: false,
			},
			{
				name: 'guildSharableCharacterMap',
				type: 'Record<string, GuildCharacter>',
				optional: false,
			},
			{
				name: 'guildInviteMap',
				type: 'Record<string, Guild>',
				optional: false,
			},
			{
				name: 'guildInviteGuildNameMap',
				type: 'Record<string, string>',
				optional: false,
			}, // ID -> guild name
			{
				name: 'guildInviterSharableCharacterMap',
				type: 'Record<string, GuildCharacter>',
				optional: false,
			},
			{
				name: 'friendCharacterMap',
				type: 'Record<string, Character>',
				optional: false,
			},
			{
				name: 'blockedCharacterMap',
				type: 'Record<string, Character>',
				optional: false,
			},

			// Player customization - Maps HRID to unlock timestamp
			{
				name: 'userAvatarMap',
				type: 'Record<AvatarHrid, string>',
				optional: false,
			},
			{
				name: 'userAvatarOutfitMap',
				type: 'Record<AvatarOutfitHrid, string>',
				optional: false,
			},
			{
				name: 'userChatIconMap',
				type: 'Record<ChatIconHrid, string>',
				optional: false,
			},
			{
				name: 'userNameColorMap',
				type: 'Record<NameColorHrid, string>',
				optional: false,
			},

			// Buffs and bonuses
			{ name: 'communityBuffs', type: 'CommunityBuff[]', optional: false },
			{ name: 'mooPassBuffs', type: 'Buff[]', optional: false },
			{
				name: 'communityActionTypeBuffsMap',
				type: 'Record<string, Buff[]>',
				optional: false,
			},
			{
				name: 'equipmentActionTypeBuffsMap',
				type: 'Record<string, Buff[]>',
				optional: false,
			},
			{
				name: 'houseActionTypeBuffsMap',
				type: 'Record<string, Buff[]>',
				optional: false,
			},
			{
				name: 'consumableActionTypeBuffsMap',
				type: 'Record<string, Buff[]>',
				optional: false,
			},
			{
				name: 'mooPassActionTypeBuffsMap',
				type: 'Record<string, Buff[]>',
				optional: false,
			},
			{ name: 'equipmentTaskActionBuffs', type: 'Buff[]', optional: false },

			// Combat system
			{ name: 'combatUnit', type: 'CombatUnit | null', optional: false },
			{
				name: 'noncombatStats',
				type: 'Record<string, number>',
				optional: false,
			}, // Stat name -> value
			{
				name: 'abilityCombatTriggersMap',
				type: 'Record<AbilityHrid, string>',
				optional: false,
			}, // Ability -> trigger data
			{
				name: 'consumableCombatTriggersMap',
				type: 'Record<ItemHrid, string>',
				optional: false,
			}, // Item -> trigger data

			// Communication
			{
				name: 'chatHistoryByChannelMap',
				type: 'Record<string, ChatMessage[]>',
				optional: false,
			},
			{ name: 'whisperChatHistory', type: 'ChatMessage[]', optional: false },
			{ name: 'guildChatHistory', type: 'ChatMessage[]', optional: false },
			{ name: 'partyChatHistory', type: 'ChatMessage[]', optional: false },
			{ name: 'moderatorChatHistory', type: 'ChatMessage[]', optional: false },
			{ name: 'chatMinLevel', type: 'number', optional: false },
			{ name: 'generalChatMinLevel', type: 'number', optional: false },
			{ name: 'generalChatMinExp', type: 'number', optional: false },
			{ name: 'enableAutomod', type: 'boolean', optional: false },

			// Session and market data
			{ name: 'partyInfo', type: 'PartyInfo | null', optional: false },
			{ name: 'myMarketListings', type: 'MarketListing[]', optional: false },
			{ name: 'offlineItems', type: 'OfflineItem[]', optional: false },
			{ name: 'offlineSkills', type: 'OfflineSkill[]', optional: false },

			// Action type configurations - Maps action type to slot count
			{
				name: 'actionTypeDrinkSlotsMap',
				type: 'Record<string, number>',
				optional: false,
			},
			{
				name: 'actionTypeFoodSlotsMap',
				type: 'Record<string, number>',
				optional: false,
			},

			// Server and announcement data
			{
				name: 'serverSetting',
				type: 'Record<string, string | number | boolean>',
				optional: false,
			}, // Generic server settings
			{ name: 'announcementMessage', type: 'string', optional: false },
			{ name: 'announcementTimestamp', type: 'string', optional: false },
		]

		this.moduleBuilder.getFile('types').addInterface('PlayerData', properties)
	}

	// Override to skip data generation since player data is runtime data
	protected override generateLazyData(
		entities: Record<string, PlayerData>,
	): void {
		// Skip - player data is runtime data, not static game data
	}

	// Override to skip constants generation since player data doesn't have HRIDs
	protected override generateConstants(
		entities: Record<string, PlayerData>,
	): void {
		// Skip - player data doesn't have HRID constants
	}

	// Override to skip lookups generation since player data is a singleton
	protected override generateLookups(
		entities: Record<string, PlayerData>,
	): void {
		// Skip - player data doesn't need lookup tables
	}

	protected override generateUtilities(
		entities: Record<string, PlayerData>,
	): void {
		// Import types from types.ts
		const utilsBuilder = this.moduleBuilder.getFile('utils')
		utilsBuilder.addImport(
			'./types',
			[
				'PlayerData',
				'CharacterSkill',
				'CharacterItem',
				'CharacterAction',
				'CharacterQuest',
				'Character',
			],
			true,
		)
		utilsBuilder.addImport('../skills/types', ['SkillHrid'], true)
		utilsBuilder.addImport('../items/types', ['ItemHrid'], true)

		// Type guard to validate if an object is PlayerData
		utilsBuilder.addFunction(
			'isPlayerData',
			[{ name: 'data', type: 'any' }],
			'data is PlayerData',
			(writer) => {
				writer.writeLine('return data && typeof data === "object" &&')
				writer.writeLine('  data.type === "init_character_data" &&')
				writer.writeLine('  typeof data.currentTimestamp === "string" &&')
				writer.writeLine('  data.user && typeof data.user === "object" &&')
				writer.writeLine(
					'  data.character && typeof data.character === "object"',
				)
			},
		)

		// Skill utilities
		utilsBuilder.addFunction(
			'getCharacterSkillLevel',
			[
				{ name: 'skills', type: 'CharacterSkill[]' },
				{ name: 'skillHrid', type: 'SkillHrid' },
			],
			'number',
			(writer) => {
				writer.writeLine(
					'const skill = skills.find(s => s.skillHrid === skillHrid)',
				)
				writer.writeLine('return skill?.level || 0')
			},
		)

		utilsBuilder.addFunction(
			'getTotalSkillLevel',
			[{ name: 'skills', type: 'CharacterSkill[]' }],
			'number',
			(writer) => {
				writer.writeLine(
					'return skills.reduce((total, skill) => total + skill.level, 0)',
				)
			},
		)

		utilsBuilder.addFunction(
			'getSkillByHrid',
			[
				{ name: 'skills', type: 'CharacterSkill[]' },
				{ name: 'skillHrid', type: 'SkillHrid' },
			],
			'CharacterSkill | undefined',
			(writer) => {
				writer.writeLine('return skills.find(s => s.skillHrid === skillHrid)')
			},
		)

		// Item utilities
		utilsBuilder.addFunction(
			'getItemCount',
			[
				{ name: 'items', type: 'CharacterItem[]' },
				{ name: 'itemHrid', type: 'ItemHrid' },
			],
			'number',
			(writer) => {
				writer.writeLine(
					'const item = items.find(i => i.itemHrid === itemHrid)',
				)
				writer.writeLine('return item?.count || 0')
			},
		)

		utilsBuilder.addFunction(
			'getEnhancedItems',
			[{ name: 'items', type: 'CharacterItem[]' }],
			'CharacterItem[]',
			(writer) => {
				writer.writeLine(
					'return items.filter(item => item.enhancementLevel > 0)',
				)
			},
		)

		// Action queue utilities
		utilsBuilder.addFunction(
			'getActiveActions',
			[{ name: 'actions', type: 'CharacterAction[]' }],
			'CharacterAction[]',
			(writer) => {
				writer.writeLine('return actions.filter(action => !action.isDone)')
			},
		)

		utilsBuilder.addFunction(
			'getActionProgress',
			[{ name: 'action', type: 'CharacterAction' }],
			'number',
			(writer) => {
				writer.writeLine(
					'if (action.maxCount === 0) return 1 // Infinite actions are always "complete"',
				)
				writer.writeLine('return action.currentCount / action.maxCount')
			},
		)

		// Quest utilities
		utilsBuilder.addFunction(
			'getActiveQuests',
			[{ name: 'quests', type: 'CharacterQuest[]' }],
			'CharacterQuest[]',
			(writer) => {
				writer.writeLine('return quests.filter(quest => !quest.isCompleted)')
			},
		)

		utilsBuilder.addFunction(
			'getCompletedQuests',
			[{ name: 'quests', type: 'CharacterQuest[]' }],
			'CharacterQuest[]',
			(writer) => {
				writer.writeLine('return quests.filter(quest => quest.isCompleted)')
			},
		)

		// Social utilities
		utilsBuilder.addFunction(
			'isInGuild',
			[{ name: 'playerData', type: 'PlayerData' }],
			'boolean',
			(writer) => {
				writer.writeLine(
					'return playerData.guild !== null && playerData.guild !== undefined',
				)
			},
		)

		utilsBuilder.addFunction(
			'isOnline',
			[{ name: 'character', type: 'Character' }],
			'boolean',
			(writer) => {
				writer.writeLine('return character.isOnline')
			},
		)

		// Stats utilities
		utilsBuilder.addFunction(
			'getInventoryItemCount',
			[{ name: 'items', type: 'CharacterItem[]' }],
			'number',
			(writer) => {
				writer.writeLine(
					'return items.filter(item => item.itemLocationHrid === "/item_locations/inventory").length',
				)
			},
		)

		utilsBuilder.addFunction(
			'getEquippedItemCount',
			[{ name: 'items', type: 'CharacterItem[]' }],
			'number',
			(writer) => {
				writer.writeLine(
					'return items.filter(item => item.itemLocationHrid !== "/item_locations/inventory").length',
				)
			},
		)

		// Add validation functions
		utilsBuilder.addFunction(
			'validatePlayerData',
			[{ name: 'data', type: 'unknown' }],
			'PlayerData',
			(writer) => {
				writer.writeLine('if (!data || typeof data !== "object") {')
				writer.writeLine(
					'  throw new Error("Invalid player data: not an object")',
				)
				writer.writeLine('}')
				writer.writeLine('const d = data as any')
				writer.writeLine('if (d.type !== "init_character_data") {')
				writer.writeLine('  throw new Error("Invalid player data: wrong type")')
				writer.writeLine('}')
				writer.writeLine(
					'if (!d.character || typeof d.character !== "object") {',
				)
				writer.writeLine(
					'  throw new Error("Invalid player data: missing character")',
				)
				writer.writeLine('}')
				writer.writeLine('return d as PlayerData')
			},
		)

		utilsBuilder.addFunction(
			'validateCharacter',
			[{ name: 'char', type: 'unknown' }],
			'Character',
			(writer) => {
				writer.writeLine('if (!char || typeof char !== "object") {')
				writer.writeLine(
					'  throw new Error("Invalid character: not an object")',
				)
				writer.writeLine('}')
				writer.writeLine('const c = char as any')
				writer.writeLine('if (typeof c.id !== "number") {')
				writer.writeLine('  throw new Error("Invalid character: missing id")')
				writer.writeLine('}')
				writer.writeLine('if (typeof c.name !== "string") {')
				writer.writeLine('  throw new Error("Invalid character: missing name")')
				writer.writeLine('}')
				writer.writeLine('return c as Character')
			},
		)

		// Add default creation functions
		utilsBuilder.addFunction(
			'createDefaultPlayerData',
			[],
			'PlayerData',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  type: "init_character_data",')
				writer.writeLine('  currentTimestamp: new Date().toISOString(),')
				// Add minimal required fields - the full implementation would be too long
				writer.writeLine('  user: {} as any,')
				writer.writeLine('  email: "",')
				writer.writeLine('  kongregateUserId: "",')
				writer.writeLine('  steamUserId: "",')
				writer.writeLine('  guestPassword: "",')
				writer.writeLine('  userInfo: {} as any,')
				writer.writeLine('  userReferralBonuses: [],')
				writer.writeLine('  character: {} as any,')
				writer.writeLine('  characterInfo: {} as any,')
				writer.writeLine('  characterSetting: {} as any,')
				writer.writeLine('  characterSkills: [],')
				writer.writeLine('  characterItems: [],')
				writer.writeLine('  characterActions: [],')
				writer.writeLine('  characterQuests: [],')
				writer.writeLine('  characterAbilities: [],')
				writer.writeLine('  characterLoadoutMap: {},')
				writer.writeLine('  characterHouseRoomMap: {},')
				writer.writeLine('  characterUpgradeMap: {},')
				writer.writeLine('  characterTaskTypeBlocks: [],')
				writer.writeLine('  guild: null,')
				writer.writeLine('  guildCharacterMap: {},')
				writer.writeLine('  guildSharableCharacterMap: {},')
				writer.writeLine('  guildInviteMap: {},')
				writer.writeLine('  guildInviteGuildNameMap: {},')
				writer.writeLine('  guildInviterSharableCharacterMap: {},')
				writer.writeLine('  friendCharacterMap: {},')
				writer.writeLine('  blockedCharacterMap: {},')
				writer.writeLine('  userAvatarMap: {} as any,')
				writer.writeLine('  userAvatarOutfitMap: {} as any,')
				writer.writeLine('  userChatIconMap: {} as any,')
				writer.writeLine('  userNameColorMap: {} as any,')
				writer.writeLine('  communityBuffs: [],')
				writer.writeLine('  mooPassBuffs: [],')
				writer.writeLine('  communityActionTypeBuffsMap: {},')
				writer.writeLine('  equipmentActionTypeBuffsMap: {},')
				writer.writeLine('  houseActionTypeBuffsMap: {},')
				writer.writeLine('  consumableActionTypeBuffsMap: {},')
				writer.writeLine('  mooPassActionTypeBuffsMap: {},')
				writer.writeLine('  equipmentTaskActionBuffs: [],')
				writer.writeLine('  combatUnit: null,')
				writer.writeLine('  noncombatStats: {},')
				writer.writeLine('  abilityCombatTriggersMap: {},')
				writer.writeLine('  consumableCombatTriggersMap: {},')
				writer.writeLine('  chatHistoryByChannelMap: {},')
				writer.writeLine('  whisperChatHistory: [],')
				writer.writeLine('  guildChatHistory: [],')
				writer.writeLine('  partyChatHistory: [],')
				writer.writeLine('  moderatorChatHistory: [],')
				writer.writeLine('  chatMinLevel: 0,')
				writer.writeLine('  generalChatMinLevel: 0,')
				writer.writeLine('  generalChatMinExp: 0,')
				writer.writeLine('  enableAutomod: false,')
				writer.writeLine('  partyInfo: null,')
				writer.writeLine('  myMarketListings: [],')
				writer.writeLine('  offlineItems: [],')
				writer.writeLine('  offlineSkills: [],')
				writer.writeLine('  actionTypeDrinkSlotsMap: {},')
				writer.writeLine('  actionTypeFoodSlotsMap: {},')
				writer.writeLine('  serverSetting: {},')
				writer.writeLine('  announcementMessage: "",')
				writer.writeLine('  announcementTimestamp: "",')
				writer.writeLine('} as PlayerData')
			},
		)
	}
}
