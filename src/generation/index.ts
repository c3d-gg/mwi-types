#!/usr/bin/env bun
// V1.0 Modular Generators - Only migrated generators included
import { ModularActionsGenerator } from './generators/actions/generator'
import { ModularDamageTypesGenerator } from './generators/damage-types/generator'
import { ModularEquipmentTypesGenerator } from './generators/equipment-types/generator'
import { ModularItemCategoriesGenerator } from './generators/item-categories/generator'
import { ModularItemsGenerator } from './generators/items/generator'
import { ModularLeaderboardCategoriesGenerator } from './generators/leaderboard-categories/generator'
import { ModularSharedTypesGenerator } from './generators/shared-types/generator'
import { ModularSkillsGenerator } from './generators/skills/generator'

async function generateAll() {
	console.log('🚀 Starting v1.0 type generation (migrated modules only)...\n')

	const sourcePath = './src/sources/game_data.json'

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

		// Layer 2: Single dependency (migrated)
		console.log('\n📦 Layer 2: Single dependency entities')

		console.log('Generating items...')
		await new ModularItemsGenerator().generate(sourcePath)

		console.log('Generating leaderboard categories...')
		await new ModularLeaderboardCategoriesGenerator().generate(sourcePath)

		// Layer 3: Multiple dependencies (migrated)
		console.log('\n📦 Layer 3: Multiple dependency entities')
		console.log('Generating actions...')
		await new ModularActionsGenerator().generate(sourcePath)

		console.log('\n✨ V1.0 type generation complete (8 modules migrated)!')
		console.log(
			'📝 Note: Additional generators will be added as they are migrated to v1.0',
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
