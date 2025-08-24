#!/usr/bin/env bun
import { AbilitiesGenerator } from './generators/abilities.generator'
import { ActionCategoriesGenerator } from './generators/action-categories.generator'
import { ActionsGenerator } from './generators/actions.generator'
import { AvatarGenerator } from './generators/avatar.generator'
import { AvatarsGenerator } from './generators/avatars.generator'
import { BuffTypesGenerator } from './generators/buff-types.generator'
import { ChatChannelTypesGenerator } from './generators/chat-channel-types.generator'
import { CombatStylesGenerator } from './generators/combat-styles.generator'
import { CommunityBuffsGenerator } from './generators/community-buffs.generator'
import { HouseRoomsGenerator } from './generators/house-rooms.generator'
import { IndexGenerator } from './generators/index.generator'
import { ItemsGenerator } from './generators/items.generator'
import { LeaderboardCategoriesGenerator } from './generators/leaderboard-categories.generator'
import { LeaderboardTypesGenerator } from './generators/leaderboard-types.generator'
import { MonstersGenerator } from './generators/monsters.generator'
import { PlayerDataGenerator } from './generators/player-data.generator'
import { RecipesGenerator } from './generators/recipes.generator'
import { ShopItemsGenerator } from './generators/shop-items.generator'
import { SkillsGenerator } from './generators/skills.generator'
import { TaskShopItemsGenerator } from './generators/task-shop-items.generator'
import { TranslationsGenerator } from './generators/translations.generator'

async function generateAll() {
	console.log('🚀 Starting type generation...\n')

	const sourcePath = './src/sources/game_data.json'

	try {
		// Layer 1: No dependencies
		console.log('📦 Layer 1: Base entities (no dependencies)')
		await new SkillsGenerator().generate(sourcePath)
		await new MonstersGenerator().generate(sourcePath)
		await new BuffTypesGenerator().generate(sourcePath)
		await new AbilitiesGenerator().generate(sourcePath)
		await new AvatarGenerator().generate(sourcePath)
		await new AvatarsGenerator().generate(sourcePath)
		await new LeaderboardTypesGenerator().generate(sourcePath)
		await new ActionCategoriesGenerator().generate(sourcePath)
		await new CombatStylesGenerator().generate(sourcePath)
		await new ChatChannelTypesGenerator().generate(sourcePath)

		// Layer 2: Single dependency
		console.log('\n📦 Layer 2: Single dependency entities')
		await new ItemsGenerator().generate(sourcePath)
		await new CommunityBuffsGenerator().generate(sourcePath)
		await new ShopItemsGenerator().generate(sourcePath) // Depends on Items
		await new TaskShopItemsGenerator().generate(sourcePath) // Depends on Items
		await new LeaderboardCategoriesGenerator().generate(sourcePath) // Depends on Skills

		// Layer 3: Multiple dependencies
		console.log('\n📦 Layer 3: Multiple dependency entities')
		await new ActionsGenerator().generate(sourcePath)
		await new HouseRoomsGenerator().generate(sourcePath)

		// Layer 4: Complex dependencies
		console.log('\n📦 Layer 4: Complex dependency entities')
		await new RecipesGenerator('src/generated/types/recipes.ts').generate(
			sourcePath,
		)

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
