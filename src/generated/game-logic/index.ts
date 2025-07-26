/**
 * Auto-generated game data exports with Zod schemas - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.355Z
 */

// Recipe exports
export {
	// Zod schemas
	RecipeHridEnum,
	RecipeSchema,
	// Data
	RECIPES,
	RECIPES_BY_SKILL,
	RECIPES_BY_OUTPUT_ITEM,
	RECIPE_COUNT,
	// Functions
	getRecipe,
	getRecipesBySkill,
	getRecipesProducingItem,
	getRecipesRequiringItem,
	getRecipesByMinLevel,
	canCraftRecipe,
	getRecipeOutputCount,
	getRecipeInputCount,
	// Types
	type Recipe,
	type RecipeHrid,
	type RecipeItem
} from './recipes.js'

// Item exports
export {
	// Zod schemas
	ItemCategoryEnum,
	ItemSchema,
	// Data
	ITEMS,
	ITEMS_BY_CATEGORY,
	ITEMS_BY_LEVEL,
	// Functions
	getItem,
	getItemsByCategory,
	getItemsByLevel,
	getItemsByLevelRange,
	itemExists,
	getTradeableItems,
	validateItemHrid,
	isItemCategory,
	getEquipmentItems,
	getConsumableItems,
	// Types
	type ItemCategory,
	type Item,
	type ItemId,
	type ItemData
} from './items.js'

// Action exports
export {
	// Zod schemas
	ActionHridEnum,
	ActionSchema,
	// Data
	ACTIONS,
	ACTIONS_BY_TYPE,
	ACTIONS_BY_SKILL,
	ACTIONS_BY_CATEGORY,
	COMBAT_ACTIONS,
	PRODUCTION_ACTIONS,
	GATHERING_ACTIONS,
	DUNGEON_ACTIONS,
	// Functions
	getAction,
	getAllActions,
	getActionsBySkill,
	getActionsByMinLevel,
	getActionsByType,
	getActionsByFunction,
	getActionsByCategory,
	getProductionActions,
	getGatheringActions,
	getCombatActions,
	getDungeonActions,
	getActionsProducingItem,
	getActionsRequiringItem,
	getActionsWithBuffs,
	// Types
	type Action,
	type ActionHrid
} from './actions.js'

// Skill exports
export {
	// Zod schemas
	SkillSchema,
	// Data
	SKILLS,
	COMBAT_SKILLS,
	SKILLING_SKILLS,
	SKILLS_BY_TYPE,
	// Functions
	getSkill,
	getCombatSkills,
	getSkillingSkills,
	skillExists,
	validateSkillHrid,
	getSkillsSortedByIndex,
	isCombatSkill,
	isSkillingSkill,
	// Types
	type Skill,
	type SkillId,
	type SkillData
} from './skills.js'

// Equipment Type exports
export {
	// Zod schemas
	EquipmentTypeHridEnum,
	EquipmentTypeSchema,
	// Data
	EQUIPMENTTYPES,
	WEAPON_EQUIPMENT_TYPES,
	ARMOR_EQUIPMENT_TYPES,
	ACCESSORY_EQUIPMENT_TYPES,
	TOOL_EQUIPMENT_TYPES,
	EQUIPMENT_TYPES_BY_CATEGORY,
	// Functions
	getEquipmentTypeName,
	getEquipmentTypeLocation,
	getEquipmentTypeSortIndex,
	isWeaponEquipmentType,
	isArmorEquipmentType,
	isAccessoryEquipmentType,
	isToolEquipmentType,
	getEquipmentTypesSorted,
	// Types
	type EquipmentType,
	type EquipmentTypeHrid
} from './equipment-types.js'

// Ability exports
export {
	// Data
	ABILITIES,
	SPECIAL_ABILITIES,
	NORMAL_ABILITIES,
	DAMAGE_ABILITIES,
	HEALING_ABILITIES,
	BUFF_ABILITIES,
	FREE_ABILITIES,
	ABILITIES_BY_TARGET_TYPE,
	ABILITIES_BY_EFFECT_TYPE,
	// Functions
	getAbility,
	getAbilitiesByTargetType,
	getAbilitiesByEffectType,
	isSpecialAbility,
	getAbilitiesByManaCostRange,
	hasTargetType,
	hasEffectType,
	getAbilitiesSorted,
	getAbilitiesByCombatStyle,
	getAbilitiesByDamageType,
	// Types
	type Ability,
	type AbilityHrid
} from './abilities.js'

// Combat Style exports
export {
	// Zod schemas
	CombatStyleHridEnum,
	CombatStyleSchema,
	// Data
	COMBATSTYLES,
	MELEE_COMBAT_STYLES,
	MAGIC_COMBAT_STYLES,
	RANGED_COMBAT_STYLES,
	HEAL_COMBAT_STYLES,
	COMBAT_STYLES_BY_CATEGORY,
	// Functions
	isMeleeCombatStyle,
	isMagicCombatStyle,
	isRangedCombatStyle,
	isHealCombatStyle,
	getCombatStylesSorted,
	// Types
	type CombatStyle,
	type CombatStyleHrid
} from './combat-styles.js'

// Damage Type exports
export {
	// Zod schemas
	DamageTypeHridEnum,
	DamageTypeSchema,
	// Data
	DAMAGETYPES,
	PHYSICAL_DAMAGE_TYPES,
	ELEMENTAL_DAMAGE_TYPES,
	DAMAGE_TYPES_BY_CATEGORY,
	// Functions
	isPhysicalDamageType,
	isElementalDamageType,
	getDamageTypesSorted,
	getDamageTypeResistanceStat,
	getDamageTypeAmplifyStat,
	// Types
	type DamageType,
	type DamageTypeHrid
} from './damage-types.js'

// Buff Type exports
export {
	// Zod schemas
	BuffTypeHridEnum,
	BuffTypeSchema,
	// Data
	BUFFTYPES,
	COMBAT_BUFFTYPES,
	NON_COMBAT_BUFFTYPES,
	LEVEL_BUFFTYPES,
	RESISTANCE_BUFFTYPES,
	AMPLIFY_BUFFTYPES,
	STAT_BUFFTYPES,
	THORNS_BUFFTYPES,
	// Functions
	getBuffType,
	getBuffTypeName,
	getBuffDescription,
	getDebuffDescription,
	isCombatBuff,
	isNonCombatBuff,
	isLevelBuff,
	isResistanceBuff,
	isAmplifyBuff,
	isThornsBuff,
	getCombatBuffTypes,
	getNonCombatBuffTypes,
	getLevelBuffTypes,
	getResistanceBuffTypes,
	getAmplifyBuffTypes,
	getStatBuffTypes,
	getThornsBuffTypes,
	getBuffTypesSorted,
	// Types
	type BuffType,
	type BuffTypeHrid
} from './buff-types.js'

// Combat Monster exports
export {
	// Zod schemas
	CombatMonsterHridEnum,
	CombatMonsterSchema,
	// Data
	COMBAT_MONSTERS,
	COMBAT_MONSTERS_BY_LEVEL_RANGE,
	// Functions
	getCombatMonster,
	getCombatMonsterName,
	getCombatMonstersByCombatLevel,
	getCombatMonstersWithDrop,
	getCombatMonstersWithAbility,
	getCombatMonstersByDamageType,
	getMonsterEliteStats,
	hasDrops,
	getAllMonsterDrops,
	getCombatMonstersSortedByLevel,
	// Types
	type CombatMonster,
	type CombatMonsterHrid
} from './combat-monsters.js'

// House room exports
export {
	// Zod schemas
	HouseRoomHridEnum,
	HouseRoomSchema,
	// Data
	HOUSEROOMS,
	ALL_HOUSE_ROOMS,
	HOUSE_ROOMS_BY_SKILL,
	COMBAT_HOUSE_ROOMS,
	NON_COMBAT_HOUSE_ROOMS,
	// Functions
	getHouseRoom,
	getHouseRoomName,
	getHouseRoomsBySkill,
	getHouseRoomBySkill,
	getHouseRoomUpgradeCost,
	getMaxHouseRoomLevel,
	calculateRoomBuffValue,
	getHouseRoomActionBuffs,
	getHouseRoomGlobalBuffs,
	isRoomUsableInActionType,
	// Types
	type HouseRoomHrid,
	type HouseRoom
} from './house-rooms.js'

// Shop Category exports
export {
	// Zod schemas
	ShopCategoryHridEnum,
	ShopCategorySchema,
	// Data
	SHOPCATEGORIES,
	// Functions
	getShopCategoryName,
	getShopCategoriesSortedByIndex,
	getShopCategory,
	isValidShopCategory,
	// Types
	type ShopCategory,
	type ShopCategoryHrid
} from './shop-categories.js'

// Shop Item exports
export {
	// Zod schemas
	ShopItemHridEnum,
	ShopItemSchema,
	// Data
	SHOPITEMS,
	SHOP_ITEMS_BY_CATEGORY,
	// Functions
	getShopItem,
	getShopItemsByCategory,
	getShopItemsSorted,
	getShopItemsForItem,
	getShopItemsRequiringCurrency,
	getShopItemCosts,
	canAffordShopItem,
	getAllShopCurrencies,
	getCheapestShopItem,
	// Types
	type ShopItem,
	type ShopItemHrid
} from './shop-items.js'

// Random Task Type exports
export {
	// Zod schemas
	RandomTaskTypeHridEnum,
	RandomTaskTypeSchema,
	// Data
	RANDOMTASKTYPES,
	COMBAT_TASK_TYPES,
	SKILLING_TASK_TYPES,
	// Functions
	getRandomTaskType,
	getAllRandomTaskTypes,
	getRandomTaskTypesSortedByIndex,
	isRandomTaskTypeCombat,
	getRandomTaskTypeSkill,
	getRandomTaskTypesBySkill,
	getCombatTaskTypes,
	getSkillingTaskTypes,
	// Types
	type RandomTaskType,
	type RandomTaskTypeHrid
} from './random-task-types.js'

// Task Shop Item exports
export {
	// Zod schemas
	TaskShopItemHridEnum,
	TaskShopItemSchema,
	// Data
	TASKSHOPITEMS,
	TASK_SHOP_ITEMS_BY_CURRENCY,
	// Functions
	getTaskShopItem,
	getAllTaskShopItems,
	getTaskShopItemsSortedByIndex,
	getTaskShopItemName,
	getTaskShopItemCost,
	getTaskShopItemsForItem,
	getTaskShopItemsRequiringCurrency,
	canAffordTaskShopItem,
	getTaskShopItemPurchaseQuantity,
	// Types
	type TaskShopItem,
	type TaskShopItemHrid
} from './task-shop-items.js'

// Community Buff Type exports
export {
	// Zod schemas
	CommunityBuffTypeHridEnum,
	CommunityBuffTypeSchema,
	// Data
	COMMUNITYBUFFTYPES,
	COMBAT_COMMUNITY_BUFFS,
	SKILLING_COMMUNITY_BUFFS,
	// Functions
	getCommunityBuffType,
	getCommunityBuffCost,
	isCombatCommunityBuff,
	getCommunityBuffsByActionType,
	calculateCommunityBuffValue,
	getCommunityBuffTypesSortedByIndex,
	// Types
	type CommunityBuffType,
	type CommunityBuffTypeHrid
} from './community-buff-types.js'

// Guild Character Role exports
export {
	// Zod schemas
	GuildCharacterRoleHridEnum,
	GuildCharacterRoleSchema,
	// Data
	GUILDCHARACTERROLES,
	GUILD_ROLE_HIERARCHY,
	LEADER_ROLE,
	DEFAULT_MEMBER_ROLE,
	// Functions
	getGuildCharacterRole,
	getRolePermissionTier,
	canRolePromote,
	canRoleDemote,
	canRoleKick,
	getNextPromotionRole,
	getNextDemotionRole,
	getRolesByPermission,
	isLeaderRole,
	getGuildCharacterRolesSortedByIndex,
	// Types
	type GuildCharacterRole,
	type GuildCharacterRoleHrid
} from './guild-character-roles.js'

// Chat Icon exports
export {
	// Zod schemas
	ChatIconHridEnum,
	ChatIconSchema,
	// Data
	CHATICONS,
	SPECIAL_CHAT_ICONS,
	SEASONAL_CHAT_ICONS,
	REGULAR_CHAT_ICONS,
	FREE_CHAT_ICONS,
	PURCHASABLE_CHAT_ICONS,
	TOTAL_CHAT_ICONS,
	TOTAL_SPECIAL_CHAT_ICONS,
	TOTAL_SEASONAL_CHAT_ICONS,
	// Functions
	getChatIcon,
	getChatIconName,
	getChatIconCost,
	isSpecialChatIcon,
	isSeasonalChatIcon,
	getChatIconsSortedByIndex,
	canAffordChatIcon,
	getChatIconsByPriceRange,
	// Types
	type ChatIcon,
	type ChatIconHrid
} from './chat-icons.js'

// Name Color exports
export {
	// Zod schemas
	NameColorHridEnum,
	NameColorSchema,
	// Data
	NAMECOLORS,
	SEASONAL_NAME_COLORS,
	REGULAR_NAME_COLORS,
	FREE_NAME_COLORS,
	PURCHASABLE_NAME_COLORS,
	TOTAL_NAME_COLORS,
	TOTAL_SEASONAL_NAME_COLORS,
	TOTAL_PURCHASABLE_NAME_COLORS,
	// Functions
	getNameColor,
	getNameColorName,
	getNameColorCost,
	isSeasonalNameColor,
	getNameColorsSortedByIndex,
	canAffordNameColor,
	getNameColorsByPriceRange,
	getNameColorsByPattern,
	// Types
	type NameColor,
	type NameColorHrid
} from './name-colors.js'

// Chat Channel Type exports
export {
	// Zod schemas
	ChatChannelTypeHridEnum,
	ChatChannelTypeSchema,
	// Data
	CHATCHANNELTYPES,
	PRIVATE_CHANNELS,
	PUBLIC_CHANNELS,
	LANGUAGE_CHANNELS,
	GAMEPLAY_CHANNELS,
	TOTAL_CHAT_CHANNELS,
	TOTAL_PRIVATE_CHANNELS,
	TOTAL_PUBLIC_CHANNELS,
	TOTAL_LANGUAGE_CHANNELS,
	// Functions
	getChatChannelType,
	getChatChannelTypeName,
	isPrivateChannel,
	getChatChannelTypesSortedByIndex,
	getChatChannelsByPattern,
	getAccessibleChannels,
	isLanguageChannel,
	isGameplayChannel,
	// Types
	type ChatChannelType,
	type ChatChannelTypeHrid
} from './chat-channel-types.js'

// Avatar exports
export {
	// Zod schemas
	AvatarHridEnum,
	AvatarSchema,
	// Data
	AVATARS,
	FREE_AVATARS,
	PAID_AVATARS,
	SEASONAL_AVATARS,
	NON_SEASONAL_AVATARS,
	AVATARS_SORTED,
	// Functions
	getAvatar,
	getAvatarCost,
	isAvatarFree,
	isAvatarSeasonal,
	getAvatarsByCostRange,
	getAffordableAvatars,
	// Types
	type Avatar,
	type AvatarHrid
} from './avatars.js'

// Avatar Outfit exports
export {
	// Zod schemas
	AvatarOutfitHridEnum,
	AvatarOutfitSchema,
	// Data
	AVATAR_OUTFITS,
	FREE_AVATAR_OUTFITS,
	PAID_AVATAR_OUTFITS,
	SEASONAL_AVATAR_OUTFITS,
	NON_SEASONAL_AVATAR_OUTFITS,
	AVATAR_OUTFITS_SORTED,
	// Functions
	getAvatarOutfit,
	getAvatarOutfitCost,
	isAvatarOutfitFree,
	isAvatarOutfitSeasonal,
	getAvatarOutfitsByCostRange,
	getAffordableAvatarOutfits,
	// Types
	type AvatarOutfit,
	type AvatarOutfitHrid
} from './avatar-outfits.js'

// Game Mode exports
export {
	// Zod schemas
	GameModeHridEnum,
	GameModeSchema,
	// Data
	GAMEMODES,
	CREATABLE_GAME_MODES,
	MARKET_RESTRICTED_GAME_MODES,
	UNRESTRICTED_GAME_MODES,
	// Functions
	getGameMode,
	isCreatableGameMode,
	isMarketRestrictedGameMode,
	getGameModeCharacterLimit,
	getGameModesSorted,
	getSubsetGameModes,
	isSubsetGameMode,
	getDefaultGameMode,
	canCreateCharacterInMode,
	// Types
	type GameMode,
	type GameModeHrid
} from './game-modes.js'

// Leaderboard Type exports
export {
	// Zod schemas
	LeaderboardTypeHridEnum,
	LeaderboardTypeSchema,
	// Data
	LEADERBOARDTYPES,
	GUILD_LEADERBOARD_TYPES,
	PLAYER_LEADERBOARD_TYPES,
	STEAM_LEADERBOARD_TYPES,
	STANDARD_LEADERBOARD_TYPES,
	// Functions
	getLeaderboardType,
	isGuildLeaderboardType,
	isSteamLeaderboardType,
	getLeaderboardTypeGameMode,
	getLeaderboardTypeMinJoinTime,
	getLeaderboardTypesSorted,
	getLeaderboardTypesByGameMode,
	canPlayerJoinLeaderboard,
	getDefaultLeaderboardType,
	// Types
	type LeaderboardType,
	type LeaderboardTypeHrid
} from './leaderboard-types.js'

// Leaderboard Category exports
export {
	// Zod schemas
	LeaderboardCategoryHridEnum,
	LeaderboardCategorySchema,
	// Data
	LEADERBOARDCATEGORIES,
	GUILD_LEADERBOARD_CATEGORIES,
	PLAYER_LEADERBOARD_CATEGORIES,
	SKILL_LEADERBOARD_CATEGORIES,
	SPECIAL_LEADERBOARD_CATEGORIES,
	LEADERBOARD_CATEGORIES_BY_SKILL,
	// Functions
	getLeaderboardCategory,
	isGuildLeaderboardCategory,
	isSkillLeaderboardCategory,
	getLeaderboardCategorySkill,
	getLeaderboardCategoriesSorted,
	getLeaderboardCategoriesForSkill,
	getSkillLeaderboardCategories,
	getSpecialLeaderboardCategories,
	getCombatLeaderboardCategories,
	getSkillingLeaderboardCategories,
	getLeaderboardCategoryDisplayOrder,
	// Types
	type LeaderboardCategory,
	type LeaderboardCategoryHrid
} from './leaderboard-categories.js'

// Re-export base types and brands
export type {
	ItemHrid,
	GeneratedItem,
	GeneratedAction,
	GeneratedEquipmentStats,
	GeneratedConsumableEffects,
	LevelRequirement
} from './types.js'

// Re-export the branded type constructors
export { ItemHridBrand, ActionHridBrand } from './types.js'

// Re-export additional type alias
export type { SkillHrid as SkillHridType } from './skills.js'

// Player Data exports
export {
	// Types
	type User,
	type UserInfo,
	type Character,
	type CharacterInfo,
	type CharacterSetting,
	type CharacterAction,
	type CharacterQuest,
	type CharacterSkill,
	type CharacterAbility,
	type CharacterItem,
	type CombatStats,
	type NonCombatStats,
	type MarketListing,
	type CharacterHouseRoom,
	type FriendCharacter,
	type Guild,
	type GuildCharacter,
	type Buff,
	type PlayerData,
	type ItemReward,
	type QuestCategory,
	type QuestType,
	type QuestStatus,
	// Functions
	getCharacterTotalLevel,
	getCharacterSkillLevel,
	getCharacterSkillExperience,
	hasAbility,
	getItemsInLocation,
	getEquippedItems,
	getTotalInventoryCount,
	getActiveQuests,
	getCompletedQuests,
	parseQuestRewards,
	getQuestProgress,
	isModerator,
	hasMooPass,
	getGuildRole,
	getTotalBuffValue,
	getBuffsForActionType,
	validatePlayerData
} from '../player-data/index.js'

// Translation exports
export {
	// Locales
	en,
	zh,
	// Types
	type SupportedLocale,
	// Utility functions
	getSkillName as getTranslatedSkillName,
	getSkillDescription as getTranslatedSkillDescription,
	getItemName as getTranslatedItemName,
	getItemDescription as getTranslatedItemDescription,
	getActionName as getTranslatedActionName,
	getActionDescription as getTranslatedActionDescription,
	getAbilityName as getTranslatedAbilityName,
	getAbilityDescription as getTranslatedAbilityDescription,
	getHouseRoomName as getTranslatedHouseRoomName,
	getHouseRoomDescription as getTranslatedHouseRoomDescription
} from '../localization/index.js'
