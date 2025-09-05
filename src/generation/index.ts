#!/usr/bin/env bun
import { AbilitiesGenerator } from './generators/abilities.generator'
import { AbilitiesModularGenerator } from './generators/abilities.generator.modular'
import { ModularItemsGenerator } from './generators/items.generator.modular'
import { ModularActionsGenerator } from './generators/actions.generator.modular'
import { ActionCategoriesGenerator } from './generators/action-categories.generator'
import { ModularActionCategoriesGenerator } from './generators/action-categories.generator.modular'
import { ActionsGenerator } from './generators/actions.generator'
import { AvatarGenerator } from './generators/avatar.generator'
import { AvatarsGenerator } from './generators/avatars.generator'
import { BuffTypesGenerator } from './generators/buff-types.generator'
import { ModularBuffTypesGenerator } from './generators/buff-types.generator.modular'
import { ChatChannelTypesGenerator } from './generators/chat-channel-types.generator'
import { ChatIconsGenerator } from './generators/chat-icons.generator'
import { ModularChatIconsGenerator } from './generators/chat-icons.generator.modular'
import { CombatStylesGenerator } from './generators/combat-styles.generator'
import { CombatStylesModularGenerator } from './generators/combat-styles.generator.modular'
import { CommunityBuffsGenerator } from './generators/community-buffs.generator'
import { DamageTypesGenerator } from './generators/damage-types.generator'
import { DamageTypesModularGenerator } from './generators/damage-types.generator.modular'
import { EquipmentTypesGenerator } from './generators/equipment-types.generator'
import { ModularEquipmentTypesGenerator } from './generators/equipment-types.generator.modular'
import { GameModesGenerator } from './generators/game-modes.generator'
import { GuildCharacterRolesGenerator } from './generators/guild-character-roles.generator'
import { HouseRoomsGenerator } from './generators/house-rooms.generator'
import { ModularHouseRoomsGenerator } from './generators/house-rooms.generator.modular'
import { IndexGenerator } from './generators/index.generator'
import { ItemCategoriesGenerator } from './generators/item-categories.generator'
import { ModularItemCategoriesGenerator } from './generators/item-categories.generator.modular'
import { ItemLocationsGenerator } from './generators/item-locations.generator'
import { ItemsGenerator } from './generators/items.generator'
import { LeaderboardCategoriesGenerator } from './generators/leaderboard-categories.generator'
import { LeaderboardTypesGenerator } from './generators/leaderboard-types.generator'
import { LeaderboardsGenerator } from './generators/leaderboards.generator'
import { MonstersGenerator } from './generators/monsters.generator'
import { ModularMonstersGenerator } from './generators/monsters.generator.modular'
import { NameColorsGenerator } from './generators/name-colors.generator'
import { NameColorsGeneratorModular } from './generators/name-colors.generator.modular'
import { PlayerDataGenerator } from './generators/player-data.generator'
import { PurchaseBundlesGenerator } from './generators/purchase-bundles.generator'
import { RandomTasksGenerator } from './generators/random-tasks.generator'
import { ModularRandomTasksGenerator } from './generators/random-tasks.generator.modular'
import { RecipesGenerator } from './generators/recipes.generator'
import { ModularRecipesGenerator } from './generators/recipes.generator.modular'
import { ShopCategoriesGenerator } from './generators/shop-categories.generator'
import { ShopItemsGenerator } from './generators/shop-items.generator'
import { SkillsGenerator } from './generators/skills.generator'
import { ModularSkillsGenerator } from './generators/skills.generator.modular'
import { TaskShopItemsGenerator } from './generators/task-shop-items.generator'
import { TranslationsGenerator } from './generators/translations.generator'

async function generateAll() {
	console.log('🚀 Starting type generation...\n')

	const sourcePath = './src/sources/game_data.json'

	try {
		// Layer 1: No dependencies
		console.log('📦 Layer 1: Base entities (no dependencies)')
		
		// Test modular vs old generator based on env var
		const useModular = process.env.USE_MODULAR === 'true'
		if (useModular) {
			console.log('🧪 Using MODULAR skills generator for tree-shaking optimization')
			await new ModularSkillsGenerator().generate(sourcePath)
		} else {
			await new SkillsGenerator().generate(sourcePath)
		}
		
		// Monsters - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR monsters generator for tree-shaking optimization')
			await new ModularMonstersGenerator().generate(sourcePath)
		} else {
			await new MonstersGenerator().generate(sourcePath)
		}
		
		// BuffTypes - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR buff types generator for tree-shaking optimization')
			await new ModularBuffTypesGenerator().generate(sourcePath)
		} else {
			await new BuffTypesGenerator().generate(sourcePath)
		}
		
		// Abilities - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR abilities generator for tree-shaking optimization')
			await new AbilitiesModularGenerator().generate(sourcePath)
		} else {
			await new AbilitiesGenerator().generate(sourcePath)
		}
		await new AvatarGenerator().generate(sourcePath)
		await new AvatarsGenerator().generate(sourcePath)
		await new LeaderboardTypesGenerator().generate(sourcePath)
		
		// ActionCategories - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR action categories generator for tree-shaking optimization')
			await new ModularActionCategoriesGenerator().generate(sourcePath)
		} else {
			await new ActionCategoriesGenerator().generate(sourcePath)
		}
		
		// CombatStyles - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR combat styles generator for tree-shaking optimization')
			await new CombatStylesModularGenerator().generate(sourcePath)
		} else {
			await new CombatStylesGenerator().generate(sourcePath)
		}
		await new ChatChannelTypesGenerator().generate(sourcePath)
		
		// ChatIcons - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR chat icons generator for tree-shaking optimization')
			await new ModularChatIconsGenerator().generate(sourcePath)
		} else {
			await new ChatIconsGenerator().generate(sourcePath)
		}
		
		// DamageTypes - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR damage types generator for tree-shaking optimization')
			await new DamageTypesModularGenerator().generate(sourcePath)
		} else {
			await new DamageTypesGenerator().generate(sourcePath)
		}
		
		// EquipmentTypes - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR equipment types generator for tree-shaking optimization')
			await new ModularEquipmentTypesGenerator().generate(sourcePath)
		} else {
			await new EquipmentTypesGenerator().generate(sourcePath)
		}
		
		await new GameModesGenerator().generate(sourcePath)
		await new GuildCharacterRolesGenerator().generate(sourcePath)
		
		// ItemCategories - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR item categories generator for tree-shaking optimization')
			await new ModularItemCategoriesGenerator().generate(sourcePath)
		} else {
			await new ItemCategoriesGenerator().generate(sourcePath)
		}
		
		await new ItemLocationsGenerator().generate(sourcePath)
		
		// NameColors - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR name colors generator for tree-shaking optimization')
			await new NameColorsGeneratorModular().generate(sourcePath)
		} else {
			await new NameColorsGenerator().generate(sourcePath)
		}
		
		await new PurchaseBundlesGenerator().generate(sourcePath)
		
		// RandomTasks - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR random tasks generator for tree-shaking optimization')
			await new ModularRandomTasksGenerator().generate(sourcePath)
		} else {
			await new RandomTasksGenerator().generate(sourcePath)
		}
		await new ShopCategoriesGenerator().generate(sourcePath)

		// Layer 2: Single dependency
		console.log('\n📦 Layer 2: Single dependency entities')
		if (useModular) {
			console.log('🧪 Using MODULAR items generator for tree-shaking optimization')
			await new ModularItemsGenerator().generate(sourcePath)
		} else {
			await new ItemsGenerator().generate(sourcePath)
		}
		await new CommunityBuffsGenerator().generate(sourcePath)
		await new ShopItemsGenerator().generate(sourcePath) // Depends on Items
		await new TaskShopItemsGenerator().generate(sourcePath) // Depends on Items
		await new LeaderboardCategoriesGenerator().generate(sourcePath) // Depends on Skills
		await new LeaderboardsGenerator().generate(sourcePath) // Depends on LeaderboardTypes

		// Layer 3: Multiple dependencies
		console.log('\n📦 Layer 3: Multiple dependency entities')
		if (useModular) {
			console.log('🧪 Using MODULAR actions generator for tree-shaking optimization')
			await new ModularActionsGenerator().generate(sourcePath)
		} else {
			await new ActionsGenerator().generate(sourcePath)
		}
		
		// HouseRooms - use modular if enabled
		if (useModular) {
			console.log('🧪 Using MODULAR house rooms generator for tree-shaking optimization')
			await new ModularHouseRoomsGenerator().generate(sourcePath)
		} else {
			await new HouseRoomsGenerator().generate(sourcePath)
		}

		// Layer 4: Complex dependencies
		console.log('\n📦 Layer 4: Complex dependency entities')
		if (useModular) {
			console.log('🧪 Using MODULAR recipes generator for tree-shaking optimization')
			await new ModularRecipesGenerator().generate(sourcePath)
		} else {
			await new RecipesGenerator('src/generated/types/recipes.ts').generate(sourcePath)
		}

		// Layer 5: Player data (requires all game entity types)
		console.log('\n📦 Layer 5: Player data generation')
		await new PlayerDataGenerator().generate('./src/sources/player_data.json')

		// Layer 6: Translations (requires all entity types to be generated)
		console.log('\n📦 Layer 6: Translation generation')
		await new TranslationsGenerator().generate(sourcePath)

		// Layer 7: Main index file (requires all other files to be generated)
		console.log('\n📦 Layer 7: Index generation')
		await new IndexGenerator().generate()

		console.log('\n✨ type generation complete!')
	} catch (error) {
		console.error('❌ Generation failed:', error)
		process.exit(1)
	}
}

// Run if called directly
if (import.meta.main) {
	generateAll()
}
