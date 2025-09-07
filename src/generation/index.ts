#!/usr/bin/env bun
// V1.0 Modular Generators - All migrated generators included
import { ModularAbilitiesGenerator } from './generators/abilities/generator'
import { ModularActionCategoriesGenerator } from './generators/action-categories/generator'
import { ModularActionsGenerator } from './generators/actions/generator'
import { ModularAvatarsGenerator } from './generators/avatars/generator'
import { ModularBuffTypesGenerator } from './generators/buff-types/generator'
import { ModularChatChannelTypesGenerator } from './generators/chatchanneltypes/generator'
import { ModularCombatStylesGenerator } from './generators/combat-styles/generator'
import { ModularCommunityBuffsGenerator } from './generators/community-buffs/generator'
import { ModularDamageTypesGenerator } from './generators/damage-types/generator'
import { ModularEquipmentTypesGenerator } from './generators/equipment-types/generator'
import { ModularGameModesGenerator } from './generators/game-modes/generator'
import { ModularGuildCharacterRolesGenerator } from './generators/guild-character-roles/generator'
import { ModularHouseRoomsGenerator } from './generators/houserooms/generator'
import { ModularItemCategoriesGenerator } from './generators/item-categories/generator'
import { ModularItemLocationsGenerator } from './generators/itemlocations/generator'
import { ModularItemsGenerator } from './generators/items/generator'
import { ModularLeaderboardCategoriesGenerator } from './generators/leaderboard-categories/generator'
import { ModularLeaderboardTypesGenerator } from './generators/leaderboard-types/generator'
import { ModularMonstersGenerator } from './generators/monsters/generator'
import { ModularNameColorsGenerator } from './generators/namecolors/generator'
import { ModularPurchaseBundlesGenerator } from './generators/purchasebundles/generator'
import { ModularRandomTasksGenerator } from './generators/random-tasks/generator'
import { ModularRecipesGenerator } from './generators/recipes/generator'
import { ModularSharedTypesGenerator } from './generators/shared-types/generator'
import { ModularShopCategoriesGenerator } from './generators/shopcategories/generator'
import { ModularShopItemsGenerator } from './generators/shopitems/generator'
import { ModularSkillsGenerator } from './generators/skills/generator'
import { ModularTaskShopItemsGenerator } from './generators/taskshopitems/generator'
import { ModularPlayerDataGenerator } from './generators/player-data/generator'

async function generateAll() {
	console.log('🚀 Starting v1.0 type generation (migrated modules only)...\n')

	const sourcePath = './src/sources/game_data.json'
	const playerDataPath = './src/sources/player_data.json'

	try {
		// Layer 0: Shared types (used by multiple modules)
		console.log('📦 Layer 0: Shared types')
		await new ModularSharedTypesGenerator().generate(sourcePath)

		// Layer 1: No dependencies (migrated)
		console.log('\n📦 Layer 1: Base entities (no dependencies)')

		console.log('Generating skills...')
		await new ModularSkillsGenerator().generate(sourcePath)

		console.log('Generating damage types...')
		await new ModularDamageTypesGenerator().generate(sourcePath)

		console.log('Generating equipment types...')
		await new ModularEquipmentTypesGenerator().generate(sourcePath)

		console.log('Generating item categories...')
		await new ModularItemCategoriesGenerator().generate(sourcePath)

		console.log('Generating action categories...')
		await new ModularActionCategoriesGenerator().generate(sourcePath)

		console.log('Generating buff types...')
		await new ModularBuffTypesGenerator().generate(sourcePath)

		console.log('Generating combat styles...')
		await new ModularCombatStylesGenerator().generate(sourcePath)

		console.log('Generating shop categories...')
		await new ModularShopCategoriesGenerator().generate(sourcePath)

		console.log('Generating guild character roles...')
		await new ModularGuildCharacterRolesGenerator().generate(sourcePath)

		console.log('Generating avatars...')
		await new ModularAvatarsGenerator().generate(sourcePath)

		console.log('Generating chat channel types...')
		await new ModularChatChannelTypesGenerator().generate(sourcePath)

		console.log('Generating item locations...')
		await new ModularItemLocationsGenerator().generate(sourcePath)

		console.log('Generating name colors...')
		await new ModularNameColorsGenerator().generate(sourcePath)

		console.log('Generating purchase bundles...')
		await new ModularPurchaseBundlesGenerator().generate(sourcePath)

		console.log('Generating game modes...')
		await new ModularGameModesGenerator().generate(sourcePath)

		console.log('Generating random tasks...')
		await new ModularRandomTasksGenerator().generate(sourcePath)

		console.log('Generating leaderboard types...')
		await new ModularLeaderboardTypesGenerator().generate(sourcePath)

		// Layer 2: Single/simple dependencies (migrated)
		console.log('\n📦 Layer 2: Single/simple dependency entities')

		console.log('Generating items...')
		await new ModularItemsGenerator().generate(sourcePath)

		console.log('Generating abilities...')
		await new ModularAbilitiesGenerator().generate(sourcePath)

		console.log('Generating shop items...')
		await new ModularShopItemsGenerator().generate(sourcePath)

		console.log('Generating task shop items...')
		await new ModularTaskShopItemsGenerator().generate(sourcePath)

		console.log('Generating leaderboard categories...')
		await new ModularLeaderboardCategoriesGenerator().generate(sourcePath)

		console.log('Generating community buffs...')
		await new ModularCommunityBuffsGenerator().generate(sourcePath)

		// Layer 3: Multiple dependencies (migrated)
		console.log('\n📦 Layer 3: Multiple dependency entities')
		
		console.log('Generating actions...')
		await new ModularActionsGenerator().generate(sourcePath)

		console.log('Generating monsters...')
		await new ModularMonstersGenerator().generate(sourcePath)

		console.log('Generating house rooms...')
		await new ModularHouseRoomsGenerator().generate(sourcePath)

		console.log('Generating recipes...')
		await new ModularRecipesGenerator().generate(sourcePath)

		// Layer 4: Special cases (singleton, different source)
		console.log('\n📦 Layer 4: Special cases')
		
		console.log('Generating player data...')
		// PlayerData uses player_data.json, not game_data.json
		const playerDataFile = Bun.file(playerDataPath)
		const playerData = await playerDataFile.json()
		await new ModularPlayerDataGenerator().generate(playerDataPath)

		console.log('\n✨ V1.0 type generation complete (29 modules migrated)!')
		console.log(
			'📊 Progress: 29/32 generators migrated (90.6% complete)',
		)
	} catch (error) {
		console.error('❌ Generation failed:', error)
		process.exit(1)
	}
}

// Run if called directly
if (import.meta.main) {
	generateAll()
}
