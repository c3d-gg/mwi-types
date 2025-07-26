/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.323Z
 */

/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.323Z
 */


import { z } from 'zod';
import { SkillHridEnum } from './skills.js';
import { ItemHridEnum } from './items.js';
import { ActionHridEnum } from './actions.js';
import { CombatMonsterHridEnum } from './combat-monsters.js';
import { AbilityHridEnum } from './abilities.js';
import { ItemLocationHridEnum } from './item-locations.js';
import { GameModeHridEnum } from './game-modes.js';
import { ChatIconHridEnum } from './chat-icons.js';
import { NameColorHridEnum } from './name-colors.js';
import { AvatarHridEnum } from './avatars.js';
import { AvatarOutfitHridEnum } from './avatar-outfits.js';
import { ChatChannelTypeHridEnum } from './chat-channel-types.js';
import { BuffTypeHridEnum } from './buff-types.js';
import { GuildCharacterRoleHridEnum } from './guild-character-roles.js';
import { HouseRoomHridEnum } from './house-rooms.js';

// User-related schemas
export const UserSchema = z.object({
  id: z.number(),
  isGuest: z.boolean(),
  isAdmin: z.boolean(),
  isCco: z.boolean(),
  isSuperModerator: z.boolean(),
  isModerator: z.boolean(),
  isMuted: z.boolean(),
  muteStartTime: z.string(),
  muteExpireTime: z.string(),
  muteReason: z.string(),
  isBanned: z.boolean(),
  banStartTime: z.string(),
  banExpireTime: z.string(),
  banReason: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const UserInfoSchema = z.object({
  userID: z.number(),
  supporterPoints: z.number(),
  lifetimeSupporterPoints: z.number(),
  referralCount: z.number(),
  cowbellMarketRestrictionExpireTime: z.string(),
  mooPassExpireTime: z.string()
});

// Character-related schemas
export const CharacterSchema = z.object({
  id: z.number(),
  userID: z.number(),
  gameMode: GameModeHridEnum,
  name: z.string(),
  previousName: z.string(),
  specialChatIconHrid: z.union([ChatIconHridEnum, z.literal('')]),
  chatIconHrid: z.union([ChatIconHridEnum, z.literal('')]),
  nameColorHrid: z.union([NameColorHridEnum, z.literal('')]),
  avatarHrid: AvatarHridEnum,
  avatarOutfitHrid: AvatarOutfitHridEnum,
  isOnline: z.boolean(),
  lastOfflineTime: z.string(),
  inactiveTime: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const CharacterInfoSchema = z.object({
  characterID: z.number(),
  offlineHourCap: z.number(),
  actionQueueCap: z.number(),
  loadoutSlotCap: z.number(),
  marketListingCap: z.number(),
  taskSlotCap: z.number(),
  isTutorialCompleted: z.boolean(),
  taskCooldownHours: z.number(),
  lastTaskTimestamp: z.string(),
  unreadTaskCount: z.number(),
  totalTaskPoints: z.number(),
  redeemedTaskPoints: z.number(),
  isCombatTaskBlockUnlocked: z.boolean(),
  famePoints: z.number(),
  fameLeaderboardOptOut: z.boolean(),
  isFreeMooPassClaimed: z.boolean(),
  mooPassExpireTime: z.string()
});

export const CharacterSettingSchema = z.object({
  characterID: z.number(),
  newsReadTime: z.string(),
  patchNotesReadTime: z.string(),
  whisperReadTime: z.string(),
  hideGeneralChatTip: z.boolean(),
  hideTradeChatTip: z.boolean(),
  hideRecruitChatTip: z.boolean(),
  hideBeginnerChatTip: z.boolean(),
  hideWhisperChatTip: z.boolean(),
  showGeneralChat: z.boolean(),
  isLanguageChannelSet: z.boolean(),
  languageChannelHrid: ChatChannelTypeHridEnum,
  showIroncowChat: z.boolean(),
  showTradeChat: z.boolean(),
  showRecruitChat: z.boolean(),
  showBeginnerChat: z.boolean(),
  minTotalLevelMessage: z.number(),
  minSkillLevelMessage: z.number(),
  minCommunityBuffMessage: z.number(),
  disableProfanityFilter: z.boolean(),
  disableChatURLWarning: z.boolean(),
  onlineStatusPreference: z.enum(['public', 'friends', 'private']),
  hideProfileEquipment: z.boolean()
});

// Action-related schemas
export const CharacterActionSchema = z.object({
  id: z.number(),
  characterID: z.number(),
  partyID: z.number(),
  actionHrid: ActionHridEnum,
  hasMaxCount: z.boolean(),
  maxCount: z.number(),
  currentCount: z.number(),
  wave: z.number(),
  primaryItemHash: z.string(),
  secondaryItemHash: z.string(),
  enhancingMaxLevel: z.number(),
  enhancingProtectionMinLevel: z.number(),
  characterLoadoutID: z.number(),
  ordinal: z.number(),
  isDone: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Quest-related schemas
export const QuestCategoryEnum = z.enum(['/quest_category/random_task', '/quest_category/tutorial'] as const);
export const QuestTypeEnum = z.enum(['/quest_type/action', '/quest_type/monster', '/quest_type/item'] as const);
export const QuestStatusEnum = z.enum(['/quest_status/in_progress', '/quest_status/completed', '/quest_status/failed'] as const);

export const ItemRewardSchema = z.object({
  itemHrid: ItemHridEnum,
  count: z.number()
});

export const CharacterQuestSchema = z.object({
  id: z.number(),
  characterID: z.number(),
  category: QuestCategoryEnum,
  tutorialQuestHrid: z.string(),
  type: QuestTypeEnum,
  actionHrid: z.union([ActionHridEnum, z.literal('')]),
  monsterHrid: z.union([CombatMonsterHridEnum, z.literal('')]),
  goalCount: z.number(),
  currentCount: z.number(),
  itemRewardsJSON: z.string(), // JSON string of ItemReward[]
  status: QuestStatusEnum,
  coinRerollCount: z.number(),
  cowbellRerollCount: z.number(),
  mooPassRerollCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Skill-related schemas
export const CharacterSkillSchema = z.object({
  characterID: z.number(),
  skillHrid: SkillHridEnum,
  experience: z.number(),
  level: z.number(),
  offlineExperience: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Ability-related schemas
export const CharacterAbilitySchema = z.object({
  characterID: z.number(),
  abilityHrid: AbilityHridEnum,
  createdAt: z.string(),
  updatedAt: z.string()
});

// Item-related schemas
export const CharacterItemSchema = z.object({
  id: z.number(),
  characterID: z.number(),
  itemLocationHrid: ItemLocationHridEnum,
  itemHrid: ItemHridEnum,
  enhancementLevel: z.number(),
  count: z.number(),
  offlineCount: z.number(),
  hash: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Combat stats schema
export const CombatStatsSchema = z.object({
  maxHitpoints: z.number().optional(),
  maxManapoints: z.number().optional(),
  accuracy: z.number().optional(),
  dodge: z.number().optional(),
  attackSpeed: z.number().optional(),
  combatCooldownReduction: z.number().optional(),
  damagePerHit: z.number().optional(),
  block: z.number().optional(),
  // Add all other combat stats as optional
  physicalResistance: z.number().optional(),
  fireResistance: z.number().optional(),
  waterResistance: z.number().optional(),
  natureResistance: z.number().optional(),
  armorPenetration: z.number().optional(),
  fireAmplify: z.number().optional(),
  waterAmplify: z.number().optional(),
  natureAmplify: z.number().optional(),
  healingAmplify: z.number().optional(),
  criticalRate: z.number().optional(),
  criticalDamage: z.number().optional(),
  lifeSteal: z.number().optional(),
  manaLeech: z.number().optional(),
  parry: z.number().optional(),
  pierce: z.number().optional(),
  elementalThorns: z.number().optional(),
  physicalThorns: z.number().optional(),
  combatExperience: z.number().optional(),
  combatRareFind: z.number().optional(),
  combatDropRate: z.number().optional()
});

// Non-combat stats schema
export const NonCombatStatsSchema = z.object({
  itemFind: z.number().optional(),
  foodSlots: z.number().optional(),
  drinkSlots: z.number().optional(),
  skillingEfficiency: z.number().optional(),
  skillingEssenceFind: z.number().optional(),
  skillingExperience: z.number().optional(),
  skillingRareFind: z.number().optional(),
  // Add skill-specific stats
  alchemySpeed: z.number().optional(),
  brewingSpeed: z.number().optional(),
  cheesesmithingSpeed: z.number().optional(),
  cookingSpeed: z.number().optional(),
  craftingSpeed: z.number().optional(),
  enhancingSpeed: z.number().optional(),
  foragingSpeed: z.number().optional(),
  milkingSpeed: z.number().optional(),
  tailoringSpeed: z.number().optional(),
  woodcuttingSpeed: z.number().optional()
});

// Market listing schema
export const MarketListingSchema = z.object({
  id: z.number(),
  itemHrid: ItemHridEnum,
  enhancementLevel: z.number(),
  count: z.number(),
  price: z.number(),
  characterID: z.number(),
  characterName: z.string(),
  hash: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// House room schema
export const CharacterHouseRoomSchema = z.object({
  characterID: z.number(),
  houseRoomHrid: HouseRoomHridEnum,
  level: z.number()
});

// Friend character schema
export const FriendCharacterSchema = z.object({
  name: z.string(),
  gameMode: GameModeHridEnum,
  chatIconHrid: z.union([ChatIconHridEnum, z.literal('')]),
  nameColorHrid: z.union([NameColorHridEnum, z.literal('')]),
  avatarHrid: AvatarHridEnum,
  avatarOutfitHrid: AvatarOutfitHridEnum,
  hasMooPass: z.boolean(),
  actionType: z.string(),
  hideOnlineStatus: z.boolean(),
  isOnline: z.boolean(),
  createdAt: z.string(),
  inactiveTime: z.string()
});

// Guild schema
export const GuildSchema = z.object({
  id: z.number(),
  name: z.string(),
  tag: z.string(),
  recruitmentMessage: z.string(),
  motd: z.string(),
  marketStallReduction: z.number(),
  mooPassReduction: z.number(),
  points: z.number(),
  isRecruiting: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Guild character schema
export const GuildCharacterSchema = z.object({
  id: z.number(),
  guildId: z.number(),
  characterID: z.number(),
  roleHrid: GuildCharacterRoleHridEnum,
  weeklyPoints: z.number(),
  lifetimePoints: z.number(),
  weeklyMoosAdded: z.number(),
  totalMoosAdded: z.number(),
  lastSeenTimestamp: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Buff-related schemas
export const BuffSchema = z.object({
  typeHrid: BuffTypeHridEnum,
  value: z.number(),
  flatValue: z.number().optional()
});

// Main player data schema
export const PlayerDataSchema = z.object({
  type: z.literal('init_character_data'),
  currentTimestamp: z.string(),
  user: UserSchema,
  email: z.string(),
  kongregateUserId: z.string(),
  steamUserId: z.string(),
  guestPassword: z.string(),
  userInfo: UserInfoSchema,
  userReferralBonuses: z.array(z.unknown()),
  character: CharacterSchema,
  characterInfo: CharacterInfoSchema,
  characterSetting: CharacterSettingSchema,
  characterActions: z.array(CharacterActionSchema),
  characterQuests: z.array(CharacterQuestSchema),
  characterSkills: z.array(CharacterSkillSchema),
  characterAbilities: z.array(CharacterAbilitySchema),
  characterItems: z.array(CharacterItemSchema),
  offlineItems: z.array(CharacterItemSchema),
  offlineSkills: z.array(CharacterSkillSchema),
  consumableCombatTriggersMap: z.record(z.string(), z.array(z.unknown())),
  abilityCombatTriggersMap: z.record(z.string(), z.array(z.unknown())),
  actionTypeFoodSlotsMap: z.record(z.string(), z.number()),
  actionTypeDrinkSlotsMap: z.record(z.string(), z.number()),
  characterLoadoutMap: z.record(z.string(), z.unknown()),
  combatUnit: z.unknown().nullable(),
  noncombatStats: NonCombatStatsSchema,
  myMarketListings: z.array(MarketListingSchema),
  characterTaskTypeBlocks: z.array(z.unknown()),
  characterHouseRoomMap: z.record(z.string(), CharacterHouseRoomSchema),
  chatMinLevel: z.number(),
  generalChatMinLevel: z.number(),
  generalChatMinExp: z.number(),
  enableAutomod: z.boolean(),
  serverSetting: z.unknown().nullable(),
  chatHistoryByChannelMap: z.record(z.string(), z.array(z.unknown())),
  guildChatHistory: z.array(z.unknown()),
  partyChatHistory: z.array(z.unknown()),
  whisperChatHistory: z.array(z.unknown()),
  moderatorChatHistory: z.array(z.unknown()),
  friendCharacterMap: z.record(z.string(), FriendCharacterSchema),
  blockedCharacterMap: z.record(z.string(), z.unknown()),
  characterUpgradeMap: z.record(z.string(), z.unknown()),
  userChatIconMap: z.record(z.string(), z.boolean()),
  userNameColorMap: z.record(z.string(), z.boolean()),
  userAvatarMap: z.record(z.string(), z.boolean()),
  userAvatarOutfitMap: z.record(z.string(), z.boolean()),
  mooPassBuffs: z.array(BuffSchema),
  mooPassActionTypeBuffsMap: z.record(z.string(), z.array(BuffSchema)),
  communityBuffs: z.array(BuffSchema),
  communityActionTypeBuffsMap: z.record(z.string(), z.array(BuffSchema)),
  houseActionTypeBuffsMap: z.record(z.string(), z.array(BuffSchema)),
  consumableActionTypeBuffsMap: z.record(z.string(), z.array(BuffSchema)),
  equipmentActionTypeBuffsMap: z.record(z.string(), z.array(BuffSchema)),
  equipmentTaskActionBuffs: z.array(BuffSchema),
  guild: GuildSchema.nullable(),
  guildCharacterMap: z.record(z.string(), GuildCharacterSchema),
  guildSharableCharacterMap: z.record(z.string(), z.unknown()),
  guildInviteMap: z.record(z.string(), z.unknown()),
  guildInviterSharableCharacterMap: z.record(z.string(), z.unknown()),
  guildInviteGuildNameMap: z.record(z.string(), z.string()),
  partyInfo: z.unknown().nullable(),
  announcementMessage: z.string(),
  announcementTimestamp: z.string()
});

// Export types
export type User = z.infer<typeof UserSchema>;
export type UserInfo = z.infer<typeof UserInfoSchema>;
export type Character = z.infer<typeof CharacterSchema>;
export type CharacterInfo = z.infer<typeof CharacterInfoSchema>;
export type CharacterSetting = z.infer<typeof CharacterSettingSchema>;
export type CharacterAction = z.infer<typeof CharacterActionSchema>;
export type CharacterQuest = z.infer<typeof CharacterQuestSchema>;
export type CharacterSkill = z.infer<typeof CharacterSkillSchema>;
export type CharacterAbility = z.infer<typeof CharacterAbilitySchema>;
export type CharacterItem = z.infer<typeof CharacterItemSchema>;
export type CombatStats = z.infer<typeof CombatStatsSchema>;
export type NonCombatStats = z.infer<typeof NonCombatStatsSchema>;
export type MarketListing = z.infer<typeof MarketListingSchema>;
export type CharacterHouseRoom = z.infer<typeof CharacterHouseRoomSchema>;
export type FriendCharacter = z.infer<typeof FriendCharacterSchema>;
export type Guild = z.infer<typeof GuildSchema>;
export type GuildCharacter = z.infer<typeof GuildCharacterSchema>;
export type Buff = z.infer<typeof BuffSchema>;
export type PlayerData = z.infer<typeof PlayerDataSchema>;
export type ItemReward = z.infer<typeof ItemRewardSchema>;
export type QuestCategory = z.infer<typeof QuestCategoryEnum>;
export type QuestType = z.infer<typeof QuestTypeEnum>;
export type QuestStatus = z.infer<typeof QuestStatusEnum>;
