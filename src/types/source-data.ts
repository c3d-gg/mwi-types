/**
 * Type definitions for source game data
 * These types represent the structure of the data in game_data.json
 */

// Base entity details
export interface SkillDetail {
  hrid: string
  name: string
  isSkilling: boolean
  isCombat: boolean
  sortIndex: number
}

export interface ItemDetail {
  hrid: string
  name: string
  categoryHrid: string
  sellPrice: number
  itemLevel?: number
  isTradable?: boolean
  sortIndex: number
  equipmentDetail?: {
    type: string
    levelRequirements: Array<{
      skillHrid: string
      level: number
    }>
  }
  consumableDetail?: {
    cooldownDuration: number
    usableInActionTypeMap?: Record<string, boolean>
    buffs?: any[]
  }
}

export interface ActionDetail {
  hrid: string
  name: string
  type: string
  category: string
  categoryHrid: string
  function?: string
  levelRequirement: {
    skillHrid: string
    level: number
  }
  baseTimeCost: number
  experienceGain: {
    value: number
  }
  outputItems?: Array<{ itemHrid: string; count: number }>
  inputItems?: Array<{ itemHrid: string; count: number }>
}

export interface AbilityDetail {
  hrid: string
  name: string
  description: string
  isSpecialAbility: boolean
  manaCost: number
  cooldownDuration: number
  castDuration: number
  sortIndex: number
  abilityEffects: Array<{
    effectType: string
    targetType: string
  }>
}

export interface HouseRoomDetail {
  hrid: string
  name: string
  skillHrid: string
  sortIndex: number
  usableInActionTypeMap: Record<string, boolean>
  actionBuffs: Array<{
    uniqueHrid: string
    typeHrid: string
    ratioBoost: number
    ratioBoostLevelBonus: number
    flatBoost: number
    flatBoostLevelBonus: number
    startTime: string
    duration: number
  }>
  globalBuffs: Array<{
    uniqueHrid: string
    typeHrid: string
    ratioBoost: number
    ratioBoostLevelBonus: number
    flatBoost: number
    flatBoostLevelBonus: number
    startTime: string
    duration: number
  }>
  upgradeCostsMap: Record<string, Array<{
    itemHrid: string
    count: number
  }>>
}

export interface RecipeDetail {
  hrid: string
  name: string
  [key: string]: any
}

// Random task type definition
export interface RandomTaskType {
  hrid: string
  name: string
  isCombat: boolean
  skillHrid: string
  sortIndex: number
}

// Task shop item definition
export interface TaskShopItem {
  hrid: string
  name: string
  itemHrid: string
  cost: {
    itemHrid: string
    count: number
  }
  sortIndex: number
}

// Combat monster definitions
export interface CombatMonsterEntity {
  hrid: string
  name: string
  combatDetails: CombatDetails
  elite1CombatDetails: CombatDetails
  elite2CombatDetails: CombatDetails
  abilities: MonsterAbility[]
  dropTable: DropTableItem[] | null
  rareDropTable: DropTableItem[] | null
}

interface CombatDetails {
  currentHitpoints: number
  maxHitpoints: number
  currentManapoints: number
  maxManapoints: number
  attackInterval: number
  stabAccuracyRating: number
  slashAccuracyRating: number
  smashAccuracyRating: number
  rangedAccuracyRating: number
  magicAccuracyRating: number
  stabMaxDamage: number
  slashMaxDamage: number
  smashMaxDamage: number
  rangedMaxDamage: number
  magicMaxDamage: number
  stabEvasionRating: number
  slashEvasionRating: number
  smashEvasionRating: number
  rangedEvasionRating: number
  magicEvasionRating: number
  totalArmor: number
  totalWaterResistance: number
  totalNatureResistance: number
  totalFireResistance: number
  totalThreat: number
  combatLevel: number
  staminaLevel: number
  intelligenceLevel: number
  attackLevel: number
  powerLevel: number
  defenseLevel: number
  rangedLevel: number
  magicLevel: number
  combatStats: {
    combatStyleHrids: string[]
    damageType: string
    attackInterval: number
    autoAttackDamage?: number
    stabEvasion?: number
    slashEvasion?: number
    smashEvasion?: number
    fireAmplify?: number
    waterAmplify?: number
    natureAmplify?: number
    waterResistance?: number
    natureResistance?: number
    fireResistance?: number
    hpRegenPer10?: number
    mpRegenPer10?: number
    tenacity?: number
  }
}

interface MonsterAbility {
  abilityHrid: string
  level: number
  minEliteTier: number
}

interface DropTableItem {
  itemHrid: string
  dropRate: number
  minCount: number
  maxCount: number
  minEliteTier: number
}

export interface ChatIconDetail {
  hrid: string
  name: string
  isSpecial: boolean
  isSeasonal: boolean
  cowbellCost: number
  sortIndex: number
}

export interface NameColorDetail {
  hrid: string
  name: string
  isSeasonal: boolean
  cowbellCost: number
  sortIndex: number
}

export interface AvatarDetail {
  hrid: string
  name: string
  isSeasonal: boolean
  cowbellCost: number
  sortIndex: number
}

export interface AvatarOutfitDetail {
  hrid: string
  name: string
  isSeasonal: boolean
  cowbellCost: number
  sortIndex: number
}

export interface ChatChannelTypeDetail {
  hrid: string
  name: string
  isPrivate: boolean
  sortIndex: number
}

export interface GameMode {
  hrid: string
  name: string
  description: string
  isCreatable: boolean
  maxCharacterLimit: number
  marketRestricted: boolean
  subsetGameModes: string[] | null
  sortIndex: number
}

export interface LeaderboardTypeDetail {
  hrid: string
  name: string
  gameMode: string
  isSteam: boolean
  minJoinTime: string
  isGuild: boolean
  sortIndex: number
}

export interface LeaderboardCategoryDetail {
  hrid: string
  name: string
  skillHrid: string
  isGuild: boolean
  sortIndex: number
}

// Main GameData structure containing all entity maps
export interface GameData {
  type: string
  gameVersion: string
  versionTimestamp: string
  currentTimestamp: string
  levelExperienceTable: number[]
  
  // Entity detail maps
  skillDetailMap: Record<string, SkillDetail>
  abilityDetailMap: Record<string, AbilityDetail>
  itemDetailMap: Record<string, ItemDetail>
  itemCategoryDetailMap: Record<string, any>
  itemLocationDetailMap: Record<string, any>
  equipmentTypeDetailMap: Record<string, any>
  combatStyleDetailMap: Record<string, any>
  damageTypeDetailMap: Record<string, any>
  combatMonsterDetailMap: Record<string, CombatMonsterEntity>
  combatTriggerDependencyDetailMap: Record<string, any>
  combatTriggerConditionDetailMap: Record<string, any>
  combatTriggerComparatorDetailMap: Record<string, any>
  randomTaskTypeDetailMap: Record<string, RandomTaskType>
  taskShopItemDetailMap: Record<string, TaskShopItem>
  shopCategoryDetailMap: Record<string, any>
  shopItemDetailMap: Record<string, any>
  actionDetailMap: Record<string, ActionDetail>
  actionTypeDetailMap: Record<string, any>
  actionCategoryDetailMap: Record<string, any>
  buffTypeDetailMap: Record<string, any>
  houseRoomDetailMap: Record<string, HouseRoomDetail>
  purchaseBundleDetailMap: Record<string, any>
  buyableUpgradeDetailMap: Record<string, any>
  chatIconDetailMap: Record<string, ChatIconDetail>
  nameColorDetailMap: Record<string, NameColorDetail>
  avatarDetailMap: Record<string, AvatarDetail>
  avatarOutfitDetailMap: Record<string, AvatarOutfitDetail>
  communityBuffTypeDetailMap: Record<string, any>
  chatChannelTypeDetailMap: Record<string, ChatChannelTypeDetail>
  guildCharacterRoleDetailMap: Record<string, any>
  leaderboardTypeDetailMap: Record<string, LeaderboardTypeDetail>
  leaderboardCategoryDetailMap: Record<string, LeaderboardCategoryDetail>
  gameModeDetailMap: Record<string, GameMode>
  
  // Recipe detail map (seen in some generators)
  recipeDetailMap?: Record<string, RecipeDetail>
}

// Placeholder schema exports (these will be properly generated later)
export const SkillDetailSchema = {} as any
export const ItemCategoryHridSchema = {} as any
export const EquipmentDetailSchema = {} as any
export const ConsumableDetailSchema = {} as any
export const BuffSchema = {} as any
export const EquipmentTypeHridSchema = {} as any
export const ActionTypeHridSchema = {} as any
export const ActionCategorySchema = {} as any
export const ItemQuantitySchema = {} as any
export const AbilityHridSchema = {} as any
export const AbilityTargetTypeSchema = {} as any
export const AbilityEffectTypeSchema = {} as any
export const HouseRoomHridSchema = {} as any

// Placeholder type exports
export type ItemCategoryHrid = string
export type EquipmentDetail = any
export type ConsumableDetail = any
export type Buff = any
export type EquipmentTypeHrid = string
export type ActionTypeHrid = string
export type ActionCategory = string
export type ItemQuantity = { item: string; count: number }
export type AbilityHrid = string
export type AbilityTargetType = string
export type AbilityEffectType = string
export type HouseRoomHrid = string