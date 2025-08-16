/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.953Z
 */

/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.953Z
 */


import type { 
  User,
  UserInfo,
  UserReferralBonus,
  Character,
  CharacterInfo,
  CharacterSetting,
  CharacterAction,
  CharacterQuest,
  CharacterSkill,
  CharacterAbility,
  CharacterItem,
  CharacterTaskTypeBlock,
  CombatStats,
  NonCombatStats,
  MarketListing,
  CharacterHouseRoom,
  BlockedCharacter,
  FriendCharacter,
  GuildInvite,
  Guild,
  GuildCharacter,
  Buff,
  UserChatIcon,
  UserAvatar,
  UserAvatarOutfit,
  UserNameColor,
  Party,
  PartySlot,
  PartyInfo,
  PlayerData,
  ItemReward,
  QuestCategory,
  QuestType,
  QuestStatus,
  CharacterLoadout,
  CombatUnit,
  CombatAbility,
  CombatConsumable,
  ChatMessage,
  CombatTrigger,
  ConsumableSlot,
  CharacterUpgrade,
  SharableCharacter,
  CommunityBuff
} from '../schemas/zod/player-data.js';

import {
  PlayerDataSchema,
  CharacterQuestSchema,
  ItemRewardSchema
} from '../schemas/zod/player-data.js';

// Re-export all types
export type {
  User,
  UserInfo,
  UserReferralBonus,
  Character,
  CharacterInfo,
  CharacterSetting,
  CharacterAction,
  CharacterQuest,
  CharacterSkill,
  CharacterAbility,
  CharacterItem,
  CharacterTaskTypeBlock,
  CharacterLoadout,
  CombatUnit,
  CombatAbility,
  CombatConsumable,
  ChatMessage,
  CombatTrigger,
  ConsumableSlot,
  CharacterUpgrade,
  SharableCharacter,
  CombatStats,
  NonCombatStats,
  MarketListing,
  CharacterHouseRoom,
  BlockedCharacter,
  FriendCharacter,
  GuildInvite,
  Guild,
  GuildCharacter,
  Buff,
  UserChatIcon,
  UserAvatar,
  UserAvatarOutfit,
  UserNameColor,
  Party,
  PartySlot,
  PartyInfo,
  PlayerData,
  ItemReward,
  QuestCategory,
  QuestType,
  QuestStatus
};

// Utility functions for player data

/**
 * Get the total level of a character from their skills
 */
export function getCharacterTotalLevel(skills: CharacterSkill[]): number {
  return skills
    .filter(skill => skill.skillHrid !== '/skills/total_level')
    .reduce((total, skill) => total + skill.level, 0);
}

/**
 * Get a specific skill level for a character
 */
export function getCharacterSkillLevel(skills: CharacterSkill[], skillHrid: string): number {
  const skill = skills.find(s => s.skillHrid === skillHrid);
  return skill?.level ?? 0;
}

/**
 * Get a specific skill experience for a character
 */
export function getCharacterSkillExperience(skills: CharacterSkill[], skillHrid: string): number {
  const skill = skills.find(s => s.skillHrid === skillHrid);
  return skill?.experience ?? 0;
}

/**
 * Check if a character has a specific ability
 */
export function hasAbility(abilities: CharacterAbility[], abilityHrid: string): boolean {
  return abilities.some(a => a.abilityHrid === abilityHrid);
}

/**
 * Get items in a specific location
 */
export function getItemsInLocation(items: CharacterItem[], locationHrid: string): CharacterItem[] {
  return items.filter(item => item.itemLocationHrid === locationHrid);
}

/**
 * Get equipped items
 */
export function getEquippedItems(items: CharacterItem[]): CharacterItem[] {
  return items.filter(item => 
    item.itemLocationHrid !== '/item_locations/inventory' &&
    !item.itemLocationHrid.includes('_stash')
  );
}

/**
 * Calculate total item count in inventory
 */
export function getTotalInventoryCount(items: CharacterItem[]): number {
  const inventoryItems = getItemsInLocation(items, '/item_locations/inventory');
  return inventoryItems.reduce((total, item) => total + item.count, 0);
}

/**
 * Get active quests (in progress)
 */
export function getActiveQuests(quests: CharacterQuest[]): CharacterQuest[] {
  return quests.filter(quest => quest.status === '/quest_status/in_progress');
}

/**
 * Get completed quests
 */
export function getCompletedQuests(quests: CharacterQuest[]): CharacterQuest[] {
  return quests.filter(quest => quest.status === '/quest_status/completed');
}

/**
 * Parse item rewards from quest
 */
export function parseQuestRewards(quest: CharacterQuest): ItemReward[] {
  try {
    const rewards = JSON.parse(quest.itemRewardsJSON);
    return ItemRewardSchema.array().parse(rewards);
  } catch {
    return [];
  }
}

/**
 * Get quest progress percentage
 */
export function getQuestProgress(quest: CharacterQuest): number {
  if (quest.goalCount === 0) return 100;
  return Math.min(100, Math.floor((quest.currentCount / quest.goalCount) * 100));
}

/**
 * Check if character is a moderator
 */
export function isModerator(user: User): boolean {
  return user.isModerator || user.isSuperModerator || user.isAdmin || user.isCco;
}

/**
 * Check if character has MooPass
 */
export function hasMooPass(characterInfo: CharacterInfo): boolean {
  const now = new Date();
  const expireTime = new Date(characterInfo.mooPassExpireTime);
  return expireTime > now;
}

/**
 * Get character's guild role
 */
export function getGuildRole(guildCharacterMap: Record<string, GuildCharacter>, characterId: number): string | null {
  const guildChar = Object.values(guildCharacterMap).find(gc => gc.characterID === characterId);
  return guildChar?.role ?? null;
}

/**
 * Calculate total buff value by type
 */
export function getTotalBuffValue(buffs: Buff[], buffTypeHrid: string): number {
  const buff = buffs.find(b => b.typeHrid === buffTypeHrid);
  if (!buff) return 0;
  return (buff.value ?? 0) + (buff.flatValue ?? 0);
}

/**
 * Get all buffs affecting an action type
 */
export function getBuffsForActionType(
  actionType: string,
  mooPassBuffsMap: Record<string, Buff[]>,
  communityBuffsMap: Record<string, Buff[]>,
  houseBuffsMap: Record<string, Buff[]>,
  consumableBuffsMap: Record<string, Buff[]>,
  equipmentBuffsMap: Record<string, Buff[]>
): Buff[] {
  const allBuffs: Buff[] = [];
  
  if (mooPassBuffsMap[actionType]) allBuffs.push(...mooPassBuffsMap[actionType]);
  if (communityBuffsMap[actionType]) allBuffs.push(...communityBuffsMap[actionType]);
  if (houseBuffsMap[actionType]) allBuffs.push(...houseBuffsMap[actionType]);
  if (consumableBuffsMap[actionType]) allBuffs.push(...consumableBuffsMap[actionType]);
  if (equipmentBuffsMap[actionType]) allBuffs.push(...equipmentBuffsMap[actionType]);
  
  return allBuffs;
}

/**
 * Validate player data structure
 */
export function validatePlayerData(data: unknown): PlayerData {
  return PlayerDataSchema.parse(data);
}
