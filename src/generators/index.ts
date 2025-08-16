import { mkdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { readdirSync, readFileSync, writeFileSync } from 'fs'

// Game logic generators
import { ItemsGenerator } from './game-logic/items-generator.js'
import { RecipesGenerator } from './game-logic/recipes.js'
import { SkillsGenerator } from './game-logic/skills-generator.js'
import { ActionsGenerator } from './game-logic/actions.js'
import { ActionCategoriesGenerator } from './game-logic/action-categories.js'
import { ItemCategoriesGenerator } from './item-categories.js'
import { ItemLocationsGenerator } from './item-locations.js'
import { EquipmentTypesGenerator } from './equipment-types.js'
import { CombatStylesGenerator } from './game-logic/combat-styles.js'
import { DamageTypesGenerator } from './game-logic/damage-types.js'
import { AbilitiesGenerator } from './game-logic/abilities.js'
import { BuffTypesGenerator } from './game-logic/buff-types.js'
import { CombatMonstersGenerator } from './game-logic/combat-monsters.js'
import { HouseRoomsGenerator } from './game-logic/house-rooms.js'
import { ShopCategoriesGenerator } from './game-logic/shop-categories.js'
import { ShopItemsGenerator } from './game-logic/shop-items.js'
import { RandomTaskTypesGenerator } from './game-logic/random-task-types.js'
import { TaskShopItemsGenerator } from './game-logic/task-shop-items.js'
import { CommunityBuffTypesGenerator } from './game-logic/community-buff-types.js'
import { GuildCharacterRolesGenerator } from './game-logic/guild-character-roles.js'
import { ChatIconsGenerator } from './game-logic/chat-icons.js'
import { NameColorsGenerator } from './game-logic/name-colors.js'
import { ChatChannelTypesGenerator } from './game-logic/chat-channel-types.js'
import { AvatarsGenerator } from './game-logic/avatars.js'
import { AvatarOutfitsGenerator } from './game-logic/avatar-outfits.js'
import { GameModesGenerator } from './game-logic/game-modes.js'
import { LeaderboardTypesGenerator } from './game-logic/leaderboard-types.js'
import { LeaderboardCategoriesGenerator } from './game-logic/leaderboard-categories.js'
// Translation generator
import { TranslationGenerator } from './localization/translation-generator.js'
// Player data generator
import { PlayerDataGenerator } from './player-data/player-data.js'
// Main index generator
import { MainIndexGenerator } from './main-index-generator.js'

import type { GameData } from '../types/source-data.js'

/**
 * Main generator function that creates all code-based game data and translations
 */
export async function generateGameData() {
  try {
    console.log('🎮 Starting game data generation...\n')

    // Use centralized paths
    const { PATHS } = await import('../config/paths.js')
    const sourceDataPath = PATHS.sourceData
    const outputDir = PATHS.gameLogic

    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true })

    // Load source game data
    console.log('📖 Loading source game data...')
    const rawData = await readFile(sourceDataPath, 'utf-8')
    const gameData = JSON.parse(rawData) as GameData

    console.log(`✅ Loaded game data v${gameData.gameVersion}\n`)

    // Generate game logic data (TypeScript files)
    console.log('⚙️  Generating game logic data...')
    // Generate skills first since other generators import from it
    const skillsGenerator = new SkillsGenerator()
    const skillsResult = await skillsGenerator.generate()

    // Generate combat-related types (needed by abilities and monsters)
    const combatStylesGenerator = new CombatStylesGenerator()
    const damageTypesGenerator = new DamageTypesGenerator()
    const [combatStylesResult, damageTypesResult] = await Promise.all([
      combatStylesGenerator.generate(),
      damageTypesGenerator.generate(),
    ])

    // Generate item categories, locations, and equipment types (needed by items)
    const itemCategoriesGenerator = new ItemCategoriesGenerator()
    const itemLocationsGenerator = new ItemLocationsGenerator()
    const equipmentTypesGenerator = new EquipmentTypesGenerator()
    const [categoriesResult, locationsResult, equipmentTypesResult] = await Promise.all([
      itemCategoriesGenerator.generate(),
      itemLocationsGenerator.generate(),
      equipmentTypesGenerator.generate(),
    ])

    // Generate items (depends on categories and locations)
    const itemsGenerator = new ItemsGenerator()
    const itemsResult = await itemsGenerator.generate()

    // Generate actions (depends on skills and items)
    const actionsGenerator = new ActionsGenerator()
    const actionsResult = await actionsGenerator.generate()

    // Generate recipes (depends on actions)
    const recipesGenerator = new RecipesGenerator()
    const recipesResult = await recipesGenerator.generate()

    // Generate action categories (depends on actions)
    const actionCategoriesGenerator = new ActionCategoriesGenerator()
    const actionCategoriesResult = await actionCategoriesGenerator.generate()

    // Generate abilities (depends on combat styles and damage types)
    const abilitiesGenerator = new AbilitiesGenerator()
    const abilitiesResult = await abilitiesGenerator.generate()

    // Generate buff types (referenced by abilities and other entities)
    const buffTypesGenerator = new BuffTypesGenerator()
    const buffTypesResult = await buffTypesGenerator.generate()

    // Generate combat monsters (depends on abilities and damage types)
    const combatMonstersGenerator = new CombatMonstersGenerator()
    const combatMonstersResult = await combatMonstersGenerator.generate()

    // Generate house rooms (depends on skills, items, and buff types)
    const houseRoomsGenerator = new HouseRoomsGenerator()
    const houseRoomsResult = await houseRoomsGenerator.generate()

    // Generate shop categories and items (shop items depend on categories and items)
    const shopCategoriesGenerator = new ShopCategoriesGenerator()
    const shopCategoriesResult = await shopCategoriesGenerator.generate()
    
    // Generate shop items (depends on shop categories and items)
    const shopItemsGenerator = new ShopItemsGenerator()
    const shopItemsResult = await shopItemsGenerator.generate()

    // Generate task system types
    const randomTaskTypesGenerator = new RandomTaskTypesGenerator()
    const taskShopItemsGenerator = new TaskShopItemsGenerator()
    const [randomTaskTypesResult, taskShopItemsResult] = await Promise.all([
      randomTaskTypesGenerator.generate(),
      taskShopItemsGenerator.generate(),
    ])

    // Generate community features (community buffs and guild roles)
    const communityBuffTypesGenerator = new CommunityBuffTypesGenerator()
    const guildCharacterRolesGenerator = new GuildCharacterRolesGenerator()
    const [communityBuffTypesResult, guildCharacterRolesResult] = await Promise.all([
      communityBuffTypesGenerator.generate(),
      guildCharacterRolesGenerator.generate(),
    ])

    // Generate chat system types
    const chatIconsGenerator = new ChatIconsGenerator()
    const nameColorsGenerator = new NameColorsGenerator()
    const chatChannelTypesGenerator = new ChatChannelTypesGenerator()
    const [chatIconsResult, nameColorsResult, chatChannelTypesResult] = await Promise.all([
      chatIconsGenerator.generate(),
      nameColorsGenerator.generate(),
      chatChannelTypesGenerator.generate(),
    ])

    // Generate avatar system types
    const avatarsGenerator = new AvatarsGenerator()
    const avatarOutfitsGenerator = new AvatarOutfitsGenerator()
    const [avatarsResult, avatarOutfitsResult] = await Promise.all([
      avatarsGenerator.generate(),
      avatarOutfitsGenerator.generate(),
    ])

    // Generate game modes
    const gameModesGenerator = new GameModesGenerator()
    const gameModesResult = await gameModesGenerator.generate()

    // Generate leaderboard system types
    const leaderboardTypesGenerator = new LeaderboardTypesGenerator()
    const leaderboardCategoriesGenerator = new LeaderboardCategoriesGenerator()
    const [leaderboardTypesResult, leaderboardCategoriesResult] = await Promise.all([
      leaderboardTypesGenerator.generate(),
      leaderboardCategoriesGenerator.generate(),
    ])

    // Generate player data types
    console.log('\n👤 Generating player data types...')
    const playerDataGenerator = new PlayerDataGenerator()
    await playerDataGenerator.generate()

    // Generate translation data (TypeScript files)
    console.log('\n🌐 Generating translation data...')
    const translationGenerator = new TranslationGenerator()
    await translationGenerator.generate()

    // Generate shared types file for game logic
    await generateGameLogicTypesFile(outputDir)
    
    // Generate index file for game logic
    await generateIndexFile(outputDir)
    
    // Generate index files for other directories
    await generateConstantsIndexFile()
    await generateZodSchemaIndexFile()
    await generateTypeboxSchemaIndexFile()

    // Summary
    console.log('\n📊 Generation Summary:')
    console.log('\n⚙️  Game Logic Data (TypeScript):')
    console.log(`   - Skills: ${skillsResult.count}`)
    console.log(`   - Combat Styles: ${combatStylesResult.count}`)
    console.log(`   - Damage Types: ${damageTypesResult.count}`)
    console.log(`   - Item Categories: ${categoriesResult.count}`)
    console.log(`   - Item Locations: ${locationsResult.count}`)
    console.log(`   - Equipment Types: ${equipmentTypesResult.count}`)
    console.log(`   - Items: ${itemsResult.count}`)
    console.log(`   - Actions: ${actionsResult.count}`)
    console.log(`   - Recipes: ${recipesResult.count}`)
    console.log(`   - Action Categories: ${actionCategoriesResult.count}`)
    console.log(`   - Abilities: ${abilitiesResult.count}`)
    console.log(`   - Buff Types: ${buffTypesResult.count}`)
    console.log(`   - Combat Monsters: ${combatMonstersResult.count}`)
    console.log(`   - House Rooms: ${houseRoomsResult.count}`)
    console.log(`   - Shop Categories: ${shopCategoriesResult.count}`)
    console.log(`   - Shop Items: ${shopItemsResult.count}`)
    console.log(`   - Random Task Types: ${randomTaskTypesResult.count}`)
    console.log(`   - Task Shop Items: ${taskShopItemsResult.count}`)
    console.log(`   - Community Buff Types: ${communityBuffTypesResult.count}`)
    console.log(`   - Guild Character Roles: ${guildCharacterRolesResult.count}`)
    console.log(`   - Chat Icons: ${chatIconsResult.count}`)
    console.log(`   - Name Colors: ${nameColorsResult.count}`)
    console.log(`   - Chat Channel Types: ${chatChannelTypesResult.count}`)
    console.log(`   - Avatars: ${avatarsResult.count}`)
    console.log(`   - Avatar Outfits: ${avatarOutfitsResult.count}`)
    console.log(`   - Game Modes: ${gameModesResult.count}`)
    console.log(`   - Leaderboard Types: ${leaderboardTypesResult.count}`)
    console.log(`   - Leaderboard Categories: ${leaderboardCategoriesResult.count}`)
    console.log('\n👤 Player Data Types:')
    console.log(`   - Player data structures generated successfully`)

    console.log('\n🌐 Translation Data (TypeScript):')
    console.log(`   - Typed translations generated for all entities in EN and ZH locales`)

    console.log('\n✨ Game data generation complete!')
    
    // Generate main index file
    const mainIndexGenerator = new MainIndexGenerator()
    await mainIndexGenerator.generate()
    
    // Fix all imports to use .js extensions
    console.log('\n🔧 Fixing imports to use .js extensions...')
    await fixImportsInGeneratedFiles()
    console.log('✅ Import fixes complete!')
  } catch (error) {
    console.error('❌ Error generating game data:', error)
    process.exit(1)
  }
}

/**
 * Generate only game logic data (TypeScript files)
 */
export async function generateGameLogicOnly() {
  try {
    console.log('⚙️  Generating game logic data only...\n')

    const { PATHS } = await import('../config/paths.js')
    const sourceDataPath = PATHS.sourceData
    const outputDir = PATHS.gameLogic

    await mkdir(outputDir, { recursive: true })

    const rawData = await readFile(sourceDataPath, 'utf-8')
    const gameData = JSON.parse(rawData) as GameData

    // Generate skills first since other generators import from it
    const skillsGenerator = new SkillsGenerator()
    const skillsResult = await skillsGenerator.generate()

    // Generate combat-related types (needed by abilities and monsters)
    const combatStylesGenerator = new CombatStylesGenerator()
    const damageTypesGenerator = new DamageTypesGenerator()
    const [combatStylesResult, damageTypesResult] = await Promise.all([
      combatStylesGenerator.generate(),
      damageTypesGenerator.generate(),
    ])

    // Generate item categories, locations, and equipment types (needed by items)
    const itemCategoriesGenerator = new ItemCategoriesGenerator()
    const itemLocationsGenerator = new ItemLocationsGenerator()
    const equipmentTypesGenerator = new EquipmentTypesGenerator()
    const [categoriesResult, locationsResult, equipmentTypesResult] = await Promise.all([
      itemCategoriesGenerator.generate(),
      itemLocationsGenerator.generate(),
      equipmentTypesGenerator.generate(),
    ])

    // Generate items (depends on categories and locations)
    const itemsGenerator = new ItemsGenerator()
    const itemsResult = await itemsGenerator.generate()

    // Generate actions (depends on skills and items)
    const actionsGenerator = new ActionsGenerator()
    const actionsResult = await actionsGenerator.generate()

    // Generate recipes (depends on actions)
    const recipesGenerator = new RecipesGenerator()
    const recipesResult = await recipesGenerator.generate()

    // Generate action categories (depends on actions)
    const actionCategoriesGenerator = new ActionCategoriesGenerator()
    const actionCategoriesResult = await actionCategoriesGenerator.generate()

    // Generate abilities (depends on combat styles and damage types)
    const abilitiesGenerator = new AbilitiesGenerator()
    const abilitiesResult = await abilitiesGenerator.generate()

    // Generate buff types (referenced by abilities and other entities)
    const buffTypesGenerator = new BuffTypesGenerator()
    const buffTypesResult = await buffTypesGenerator.generate()

    // Generate combat monsters (depends on abilities and damage types)
    const combatMonstersGenerator = new CombatMonstersGenerator()
    const combatMonstersResult = await combatMonstersGenerator.generate()

    // Generate house rooms (depends on skills, items, and buff types)
    const houseRoomsGenerator = new HouseRoomsGenerator()
    const houseRoomsResult = await houseRoomsGenerator.generate()

    // Generate shop categories and items (shop items depend on categories and items)
    const shopCategoriesGenerator = new ShopCategoriesGenerator()
    const shopCategoriesResult = await shopCategoriesGenerator.generate()
    
    // Generate shop items (depends on shop categories and items)
    const shopItemsGenerator = new ShopItemsGenerator()
    const shopItemsResult = await shopItemsGenerator.generate()

    // Generate task system types
    const randomTaskTypesGenerator = new RandomTaskTypesGenerator()
    const taskShopItemsGenerator = new TaskShopItemsGenerator()
    const [randomTaskTypesResult, taskShopItemsResult] = await Promise.all([
      randomTaskTypesGenerator.generate(),
      taskShopItemsGenerator.generate(),
    ])

    // Generate community features (community buffs and guild roles)
    const communityBuffTypesGenerator = new CommunityBuffTypesGenerator()
    const guildCharacterRolesGenerator = new GuildCharacterRolesGenerator()
    const [communityBuffTypesResult, guildCharacterRolesResult] = await Promise.all([
      communityBuffTypesGenerator.generate(),
      guildCharacterRolesGenerator.generate(),
    ])

    // Generate chat system types
    const chatIconsGenerator = new ChatIconsGenerator()
    const nameColorsGenerator = new NameColorsGenerator()
    const chatChannelTypesGenerator = new ChatChannelTypesGenerator()
    const [chatIconsResult, nameColorsResult, chatChannelTypesResult] = await Promise.all([
      chatIconsGenerator.generate(),
      nameColorsGenerator.generate(),
      chatChannelTypesGenerator.generate(),
    ])

    // Generate avatar system types
    const avatarsGenerator = new AvatarsGenerator()
    const avatarOutfitsGenerator = new AvatarOutfitsGenerator()
    const [avatarsResult, avatarOutfitsResult] = await Promise.all([
      avatarsGenerator.generate(),
      avatarOutfitsGenerator.generate(),
    ])

    // Generate game modes
    const gameModesGenerator = new GameModesGenerator()
    const gameModesResult = await gameModesGenerator.generate()

    // Generate leaderboard system types
    const leaderboardTypesGenerator = new LeaderboardTypesGenerator()
    const leaderboardCategoriesGenerator = new LeaderboardCategoriesGenerator()
    const [leaderboardTypesResult, leaderboardCategoriesResult] = await Promise.all([
      leaderboardTypesGenerator.generate(),
      leaderboardCategoriesGenerator.generate(),
    ])

    // Generate player data types
    const playerDataGenerator = new PlayerDataGenerator()
    await playerDataGenerator.generate()

    // Generate shared types file
    await generateGameLogicTypesFile(outputDir)
    
    await generateIndexFile(outputDir)
    
    // Generate index files for other directories
    await generateConstantsIndexFile()
    await generateZodSchemaIndexFile()
    await generateTypeboxSchemaIndexFile()

    console.log('\n✨ Game logic generation complete!')
    return [
      recipesResult, // recipes
      itemsResult, // items
      actionsResult, // actions
      skillsResult, // skills
      abilitiesResult, // abilities
      houseRoomsResult, // house rooms
    ]
  } catch (error) {
    console.error('❌ Error generating game logic:', error)
    throw error
  }
}

/**
 * Generate only translation data (JSON files)
 */
export async function generateTranslationsOnly() {
  try {
    console.log('🌐 Generating translation data only...\n')

    const translationGenerator = new TranslationGenerator()
    await translationGenerator.generate()

    console.log('\n✨ Translation generation complete!')
  } catch (error) {
    console.error('❌ Error generating translations:', error)
    throw error
  }
}

/**
 * Generate shared types file for game logic
 */
async function generateGameLogicTypesFile(outputDir: string) {
  const content = `/**
 * Shared types for generated game logic files
 * Auto-generated file - DO NOT EDIT
 * Generated on ${new Date().toISOString()}
 */

// Branded types for extra type safety
export type ItemHrid = string & { readonly __brand: 'ItemHrid' }
export type ActionHrid = string & { readonly __brand: 'ActionHrid' }
export type SkillHrid = string & { readonly __brand: 'SkillHrid' }

// Type constructors
export function ItemHridBrand(hrid: string): ItemHrid {
  return hrid as ItemHrid
}

export function ActionHridBrand(hrid: string): ActionHrid {
  return hrid as ActionHrid
}

// Common interfaces
export interface LevelRequirement {
  skillHrid: SkillHrid
  level: number
}

export interface GeneratedItem {
  hrid: ItemHrid
  name: string
  sortIndex: number
  categoryHrid: string
  sellPrice: number
  itemLevel?: number
  isTradable?: boolean
  equipmentDetail?: GeneratedEquipmentStats
  consumableDetail?: GeneratedConsumableEffects
}

export interface GeneratedEquipmentStats {
  type: string
  levelRequirements: LevelRequirement[]
  [key: string]: any
}

export interface GeneratedConsumableEffects {
  cooldownDuration: number
  usableInActionTypeMap?: Record<string, boolean>
  buffs?: any[]
  [key: string]: any
}

export interface GeneratedAction {
  hrid: ActionHrid
  name: string
  type: string
  category: string
  categoryHrid: string
  function?: string
  levelRequirement: LevelRequirement
  baseTimeCost: number
  experienceGain: {
    value: number
  }
  outputItems?: Array<{ itemHrid: ItemHrid; count: number }>
  inputItems?: Array<{ itemHrid: ItemHrid; count: number }>
}
`

  const outputPath = join(outputDir, 'types.ts')
  await writeFile(outputPath, content, 'utf-8')
}

/**
 * Generate index file for constants directory
 */
async function generateConstantsIndexFile() {
  const { PATHS } = await import('../config/paths')
  const constantsDir = PATHS.constants
  
  const content = `/**
 * Constants exports
 * Auto-generated file - DO NOT EDIT
 * Generated on ${new Date().toISOString()}
 */

// Entity HRID constants
export * from './abilities-hrids.js'
export * from './action-categories-hrids.js'
export * from './actions-hrids.js'
export * from './avatar-outfits-hrids.js'
export * from './avatars-hrids.js'
export * from './buff-types-hrids.js'
export * from './chat-channel-types-hrids.js'
export * from './chat-icons-hrids.js'
export * from './combat-monsters-hrids.js'
export * from './combat-styles-hrids.js'
export * from './community-buff-types-hrids.js'
export * from './damage-types-hrids.js'
export * from './equipment-types-hrids.js'
export * from './game-modes-hrids.js'
export * from './guild-character-roles-hrids.js'
export * from './house-rooms-hrids.js'
export * from './item-categories-hrids.js'
export * from './item-locations-hrids.js'
export * from './items-hrids.js'
export * from './leaderboard-categories-hrids.js'
export * from './leaderboard-types-hrids.js'
export * from './name-colors-hrids.js'
export * from './random-task-types-hrids.js'
export * from './recipes-hrids.js'
export * from './shop-categories-hrids.js'
export * from './shop-items-hrids.js'
export * from './skills-hrids.js'
export * from './task-shop-items-hrids.js'
`

  const outputPath = join(constantsDir, 'index.ts')
  await writeFile(outputPath, content, 'utf-8')
}

/**
 * Generate index file for schemas/zod directory
 */
async function generateZodSchemaIndexFile() {
  const { PATHS } = await import('../config/paths')
  const zodDir = PATHS.schemasZod
  
  const content = `/**
 * Zod schema exports
 * Auto-generated file - DO NOT EDIT
 * Generated on ${new Date().toISOString()}
 */

// Entity schemas
export * from './abilities.js'
export * from './action-categories.js'
export * from './actions.js'
export * from './avatar-outfits.js'
export * from './avatars.js'
export * from './buff-types.js'
export * from './chat-channel-types.js'
export * from './chat-icons.js'
export * from './combat-monsters.js'
export * from './combat-styles.js'
export * from './community-buff-types.js'
export * from './damage-types.js'
export * from './equipment-types.js'
export * from './game-modes.js'
export * from './guild-character-roles.js'
export * from './house-rooms.js'
export * from './item-categories.js'
export * from './item-locations.js'
export * from './items.js'
export * from './leaderboard-categories.js'
export * from './leaderboard-types.js'
export * from './name-colors.js'
export * from './player-data.js'
export * from './random-task-types.js'
export * from './shop-categories.js'
export * from './shop-items.js'
export * from './skills.js'
export * from './task-shop-items.js'
`

  const outputPath = join(zodDir, 'index.ts')
  await writeFile(outputPath, content, 'utf-8')
}

/**
 * Generate index file for schemas/typebox directory
 */
async function generateTypeboxSchemaIndexFile() {
  const { PATHS } = await import('../config/paths')
  const typeboxDir = PATHS.schemasTypebox
  
  const content = `/**
 * Typebox schema exports
 * Auto-generated file - DO NOT EDIT
 * Generated on ${new Date().toISOString()}
 */

// Entity schemas
export * from './abilities.js'
export * from './action-categories.js'
export * from './actions.js'
export * from './avatar-outfits.js'
export * from './avatars.js'
export * from './buff-types.js'
export * from './chat-channel-types.js'
export * from './chat-icons.js'
export * from './combat-monsters.js'
export * from './combat-styles.js'
export * from './community-buff-types.js'
export * from './damage-types.js'
export * from './equipment-types.js'
export * from './game-modes.js'
export * from './guild-character-roles.js'
export * from './house-rooms.js'
export * from './item-categories.js'
export * from './item-locations.js'
export * from './items.js'
export * from './leaderboard-categories.js'
export * from './leaderboard-types.js'
export * from './name-colors.js'
export * from './player-data.js'
export * from './random-task-types.js'
export * from './shop-categories.js'
export * from './shop-items.js'
export * from './skills.js'
export * from './task-shop-items.js'
`

  const outputPath = join(typeboxDir, 'index.ts')
  await writeFile(outputPath, content, 'utf-8')
}

/**
 * Generate the main index file that exports all generated modules
 */
async function generateIndexFile(outputDir: string) {
  const content = `/**
 * Auto-generated game data exports with Zod schemas - DO NOT EDIT
 * Generated on ${new Date().toISOString()}
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
`

  const outputPath = join(outputDir, 'index.ts')
  await writeFile(outputPath, content, 'utf-8')
}

/**
 * Fix all relative imports in generated files to use .js extensions
 */
async function fixImportsInGeneratedFiles() {
  const { PATHS } = await import('../config/paths')
  const generatedDir = PATHS.output
  
  // Get all TypeScript files in the generated directory
  const getAllTsFiles = (dir: string): string[] => {
    const files: string[] = []
    const entries = readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...getAllTsFiles(fullPath))
      } else if (entry.name.endsWith('.ts')) {
        files.push(fullPath)
      }
    }
    
    return files
  }
  
  const tsFiles = getAllTsFiles(generatedDir)
  
  for (const file of tsFiles) {
    let content = readFileSync(file, 'utf-8')
    
    // Fix relative imports to add .js extension
    // Match imports like: from './something' or from '../something'
    content = content.replace(
      /from\s+['"](\.[^'"]+)(?<!\.js)(?<!\.json)['"]/g,
      (match, importPath) => {
        // Don't add .js to paths that already have an extension
        if (importPath.includes('.')) {
          const lastPart = importPath.split('/').pop()
          if (lastPart && lastPart.includes('.')) {
            return match
          }
        }
        return `from '${importPath}.js'`
      }
    )
    
    // Also fix export from statements
    content = content.replace(
      /export\s+.*\s+from\s+['"](\.[^'"]+)(?<!\.js)(?<!\.json)['"]/g,
      (match, importPath) => {
        // Don't add .js to paths that already have an extension
        if (importPath.includes('.')) {
          const lastPart = importPath.split('/').pop()
          if (lastPart && lastPart.includes('.')) {
            return match
          }
        }
        return match.replace(importPath, `${importPath}.js`)
      }
    )
    
    writeFileSync(file, content, 'utf-8')
  }
}

// Run the generator if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Check for command line arguments
  const args = process.argv.slice(2)

  if (args.includes('--logic-only')) {
    generateGameLogicOnly()
  } else if (args.includes('--translations-only')) {
    generateTranslationsOnly()
  } else {
    generateGameData()
  }
}
