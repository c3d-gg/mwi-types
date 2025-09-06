#!/usr/bin/env bun
import { AbilitiesModularGenerator } from './generators/abilities.generator.modular'
import { ModularActionCategoriesGenerator } from './generators/action-categories.generator.modular'
import { ModularActionsGenerator } from './generators/actions.generator.modular'
import { ModularAvatarGenerator } from './generators/avatar.generator.modular'
import { ModularAvatarOutfitsGenerator } from './generators/avatars.generator.modular'
import { ModularBuffTypesGenerator } from './generators/buff-types.generator.modular'
import { ChatChannelTypesGeneratorModular } from './generators/chat-channel-types.generator.modular'
import { ModularChatIconsGenerator } from './generators/chat-icons.generator.modular'
import { CombatStylesModularGenerator } from './generators/combat-styles.generator.modular'
import { CommunityBuffsGeneratorModular } from './generators/community-buffs.generator.modular'
// Legacy import removed - using new damage-types/generator.ts structure
import { ModularEquipmentTypesGenerator } from './generators/equipment-types.generator.modular'
import { GameModesGeneratorModular } from './generators/game-modes.generator.modular'
import { GuildCharacterRolesGeneratorModular } from './generators/guild-character-roles.generator.modular'
import { ModularHouseRoomsGenerator } from './generators/house-rooms.generator.modular'
import { IndexModularGenerator } from './generators/index.generator.modular'
import { ModularItemCategoriesGenerator } from './generators/item-categories.generator.modular'
import { ItemLocationsGeneratorModular } from './generators/item-locations.generator.modular'
import { ModularItemsGenerator } from './generators/items.generator.modular'
import { LeaderboardsModularGenerator } from './generators/leaderboards.generator.modular'
import { ModularMonstersGenerator } from './generators/monsters.generator.modular'
import { NameColorsGeneratorModular } from './generators/name-colors.generator.modular'
import { ModularPlayerDataGenerator } from './generators/player-data.generator.modular'
import { PurchaseBundlesGeneratorModular } from './generators/purchase-bundles.generator.modular'
import { ModularRandomTasksGenerator } from './generators/random-tasks.generator.modular'
import { ModularRecipesGenerator } from './generators/recipes.generator.modular'
import { SharedTypesModularGenerator } from './generators/shared-types.generator.modular'
import { ShopCategoriesGeneratorModular } from './generators/shop-categories.generator.modular'
import { ShopItemsGeneratorModular } from './generators/shop-items.generator.modular'
import { ModularSkillsGenerator } from './generators/skills.generator.modular'
import { TaskShopItemsGeneratorModular } from './generators/task-shop-items.generator.modular'
import { TranslationsModularGenerator } from './generators/translations.generator.modular'

async function generateAll() {
	console.log('🚀 Starting type generation...\n')

	const sourcePath = './src/sources/game_data.json'

	try {
		// Layer 0: Shared types (used by multiple modules)
		console.log('📦 Layer 0: Shared types (used by multiple modules)')
		await new SharedTypesModularGenerator().generate(sourcePath)

		// Layer 1: No dependencies
		console.log('\n📦 Layer 1: Base entities (no dependencies)')
		console.log('Generating skills...')
		await new ModularSkillsGenerator().generate(sourcePath)

		// Monsters - use modular if enabled
		console.log('Generating monsters...')
		await new ModularMonstersGenerator().generate(sourcePath)

		// BuffTypes - use modular if enabled
		console.log('Generating buff types...')
		await new ModularBuffTypesGenerator().generate(sourcePath)

		// Abilities - use modular if enabled
		console.log('Generating abilities...')
		await new AbilitiesModularGenerator().generate(sourcePath)

		// Avatars - use modular if enabled
		console.log('Generating avatars...')
		await new ModularAvatarGenerator().generate(sourcePath)

		// Avatar Outfits - use modular if enabled
		console.log('Generating avatar outfits...')
		await new ModularAvatarOutfitsGenerator().generate(sourcePath)

		// ActionCategories - use modular if enabled
		console.log('Generating action categories...')
		await new ModularActionCategoriesGenerator().generate(sourcePath)

		// CombatStyles - use modular if enabled
		console.log('Generating combat styles...')
		await new CombatStylesModularGenerator().generate(sourcePath)
		// ChatChannelTypes - use modular if enabled
		console.log('Generating chat channel types...')
		await new ChatChannelTypesGeneratorModular().generate(sourcePath)

		// ChatIcons - use modular if enabled
		console.log('Generating chat icons...')
		await new ModularChatIconsGenerator().generate(sourcePath)

		// DamageTypes - use modular if enabled
		console.log('Generating damage types...')
		// DamageTypes now uses new damage-types/generator.ts structure

		// EquipmentTypes - use modular if enabled
		console.log('Generating equipment types...')
		await new ModularEquipmentTypesGenerator().generate(sourcePath)

		// GameModes - use modular if enabled
		console.log('Generating game modes...')
		await new GameModesGeneratorModular().generate(sourcePath)
		// GuildCharacterRoles - use modular if enabled
		console.log('Generating guild character roles...')
		await new GuildCharacterRolesGeneratorModular().generate(sourcePath)

		// ItemCategories - use modular if enabled
		console.log('Generating item categories...')
		await new ModularItemCategoriesGenerator().generate(sourcePath)

		// ItemLocations - use modular if enabled
		console.log('Generating item locations...')
		await new ItemLocationsGeneratorModular().generate(sourcePath)

		// NameColors - use modular if enabled
		console.log('Generating name colors...')
		await new NameColorsGeneratorModular().generate(sourcePath)

		// PurchaseBundles - use modular if enabled
		console.log('Generating purchase bundles...')
		await new PurchaseBundlesGeneratorModular().generate(sourcePath)

		// RandomTasks - use modular if enabled
		console.log('Generating random tasks...')
		await new ModularRandomTasksGenerator().generate(sourcePath)

		// ShopCategories - use modular if enabled
		console.log('Generating shop categories...')
		await new ShopCategoriesGeneratorModular().generate(sourcePath)

		// Layer 2: Single dependency
		console.log('\n📦 Layer 2: Single dependency entities')
		console.log('Generating items...')
		await new ModularItemsGenerator().generate(sourcePath)

		// CommunityBuffs - use modular if enabled
		console.log('Generating community buffs...')
		await new CommunityBuffsGeneratorModular().generate(sourcePath)

		// ShopItems - use modular if enabled
		console.log('Generating shop items...')
		await new ShopItemsGeneratorModular().generate(sourcePath)

		// TaskShopItems - use modular if enabled
		console.log('Generating task shop items...')
		await new TaskShopItemsGeneratorModular().generate(sourcePath) // Depends on Items

		// Leaderboards - use modular if enabled
		console.log('Generating leaderboards...')
		await new LeaderboardsModularGenerator().generate(sourcePath)

		// Layer 3: Multiple dependencies
		console.log('\n📦 Layer 3: Multiple dependency entities')
		console.log('Generating actions...')
		await new ModularActionsGenerator().generate(sourcePath)

		// HouseRooms
		console.log('Generating house rooms...')
		await new ModularHouseRoomsGenerator().generate(sourcePath)

		// Layer 4: Complex dependencies
		console.log('\n📦 Layer 4: Complex dependency entities')
		console.log('Generating recipes...')
		await new ModularRecipesGenerator().generate(sourcePath)

		// Layer 5: Player data (requires all game entity types)
		console.log('\n📦 Layer 5: Player data generation')
		console.log('Generating player data...')
		await new ModularPlayerDataGenerator().generate(
			'./src/sources/player_data.json',
		)

		// Layer 6: Translations (requires all entity types to be generated)
		console.log('\n📦 Layer 6: Translation generation')
		await new TranslationsModularGenerator().generate(sourcePath)

		// Layer 7: Main index file (requires all other files to be generated)
		console.log('\n📦 Layer 7: Index generation')
		await new IndexModularGenerator().generate()

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
