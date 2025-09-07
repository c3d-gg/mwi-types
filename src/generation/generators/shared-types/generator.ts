import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

/**
 * Modular SharedTypes Generator using the hook system
 *
 * This is a special case generator that defines shared types used across multiple modules.
 * Unlike other generators, it doesn't extract data from sources - it defines static types.
 *
 * Key principles:
 * - Uses defineInterfaces() hook for type generation
 * - Defines types that eliminate duplication across generators
 * - Uses string literals for HRIDs to avoid circular dependencies
 * - Other generators import from this module and cast as needed
 *
 * @see ARCHITECTURE.md for hook system documentation
 */
export class ModularSharedTypesGenerator extends ModularBaseGenerator<any> {
	constructor() {
		super({
			entityName: 'SharedType',
			entityNamePlural: 'SharedTypes',
			sourceKey: 'shared', // Not used, but required by base class
			outputPath: 'src/generated/sharedtypes',

			// Disable standard generation features for special case
			generateHrids: false,
			generateCollection: false,
			generateConstants: false,
			generateUtils: false,
			generateLookups: false,

			// No shared types needed (this IS the shared types)
			sharedTypes: [],

			// No utility templates needed
			utilityTemplates: [],
		})
	}

	/**
	 * Shared types don't come from source data - they're defined statically
	 * Return a dummy entity to force generation
	 */
	public override extractEntities(_sourceData: any): Record<string, any> {
		return { 'shared-types': { dummy: true } } // Dummy entity to force generation
	}

	/**
	 * Define shared type interfaces using the hook system
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		const interfaces: InterfaceDefinition[] = []

		// LevelRequirement - used by actions, items, recipes, etc.
		interfaces.push({
			name: 'LevelRequirement',
			properties: [
				{
					name: 'skillHrid',
					type: 'string', // Will be cast to SkillHrid by consuming modules
					optional: false,
					description: 'The skill required',
				},
				{
					name: 'level',
					type: 'number',
					optional: false,
					description: 'The minimum level required',
				},
			],
			description:
				'Represents a skill level requirement for actions, items, etc.',
		})

		// ExperienceGain - used by actions, recipes, etc.
		interfaces.push({
			name: 'ExperienceGain',
			properties: [
				{
					name: 'skillHrid',
					type: 'string', // Will be cast to SkillHrid
					optional: false,
					description: 'The skill that gains experience',
				},
				{
					name: 'value',
					type: 'number',
					optional: false,
					description: 'The amount of experience gained',
				},
			],
			description: 'Represents experience gained in a skill from an action.',
		})

		// ItemCost - used by items, recipes, shops, etc.
		interfaces.push({
			name: 'ItemCost',
			properties: [
				{
					name: 'itemHrid',
					type: 'string', // Will be cast to ItemHrid
					optional: false,
					description: 'The item required',
				},
				{
					name: 'count',
					type: 'number',
					optional: false,
					description: 'The quantity required',
				},
			],
			description: 'Represents an item cost or requirement.',
		})

		// Stats - used by items, equipment, buffs, etc.
		// Using index signature to allow any stat property since the game has many different stat types
		interfaces.push({
			name: 'Stats',
			properties: [
				{
					name: '[key: string]',
					type: 'number',
					optional: false,
					description:
						'Flexible stats object that can contain any numeric stat property',
				},
			],
			description:
				'Flexible stats object for items, equipment, and other entities.',
		})

		// SpawnInfo - used by actions and monsters
		interfaces.push({
			name: 'SpawnInfo',
			properties: [
				{
					name: 'combatMonsterHrid',
					type: 'string', // Will be cast to MonsterHrid
					optional: false,
					description: 'The monster that spawns',
				},
				{
					name: 'difficultyTier',
					type: 'number',
					optional: false,
					description: 'The difficulty tier of the spawn',
				},
				{
					name: 'rate',
					type: 'number',
					optional: false,
					description: 'The spawn rate',
				},
				{
					name: 'strength',
					type: 'number',
					optional: false,
					description: 'The strength of the spawn',
				},
			],
			description: 'Information about monster spawns in combat zones.',
		})

		// RandomSpawnInfo - used by actions
		interfaces.push({
			name: 'RandomSpawnInfo',
			properties: [
				{
					name: 'maxSpawnCount',
					type: 'number',
					optional: false,
					description: 'Maximum number of spawns',
				},
				{
					name: 'maxTotalStrength',
					type: 'number',
					optional: false,
					description: 'Maximum total strength of all spawns',
				},
				{
					name: 'spawns',
					type: 'SpawnInfo[]',
					optional: false,
					description: 'Array of possible spawns',
				},
			],
			description: 'Configuration for random monster spawning in combat zones.',
		})

		// DropTable - used by actions and monsters
		interfaces.push({
			name: 'DropTable',
			properties: [
				{
					name: 'itemHrid',
					type: 'string', // Will be cast to ItemHrid
					optional: false,
					description: 'The item that can drop',
				},
				{
					name: 'dropRate',
					type: 'number',
					optional: false,
					description: 'The drop rate (0-1)',
				},
				{
					name: 'minCount',
					type: 'number',
					optional: false,
					description: 'Minimum quantity that can drop',
				},
				{
					name: 'maxCount',
					type: 'number',
					optional: false,
					description: 'Maximum quantity that can drop',
				},
			],
			description:
				'Represents a drop table entry for items that can be obtained.',
		})

		// ActionItem - used by actions
		interfaces.push({
			name: 'ActionItem',
			properties: [
				{
					name: 'itemHrid',
					type: 'string', // Will be cast to ItemHrid
					optional: false,
					description: 'The item produced or consumed',
				},
				{
					name: 'count',
					type: 'number',
					optional: false,
					description: 'The quantity',
				},
			],
			description: 'Represents an item input or output for actions.',
		})

		// UpgradeCost - used by house rooms
		interfaces.push({
			name: 'UpgradeCost',
			properties: [
				{
					name: 'itemHrid',
					type: 'string', // Will be cast to ItemHrid
					optional: false,
					description: 'The item required for upgrade',
				},
				{
					name: 'count',
					type: 'number',
					optional: false,
					description: 'The quantity required',
				},
			],
			description:
				'Represents the cost to upgrade house rooms or other entities.',
		})

		// Buff - used by actions for temporary buffs/debuffs
		interfaces.push({
			name: 'Buff',
			properties: [
				{
					name: 'uniqueHrid',
					type: 'string',
					optional: false,
					description: 'Unique identifier for this buff instance',
				},
				{
					name: 'typeHrid',
					type: 'string', // Will be cast to BuffTypeHrid
					optional: false,
					description: 'The type of buff (references BuffType)',
				},
				{
					name: 'ratioBoost',
					type: 'number',
					optional: false,
					description: 'Percentage boost applied by this buff',
				},
				{
					name: 'ratioBoostLevelBonus',
					type: 'number',
					optional: false,
					description: 'Additional percentage boost per level',
				},
				{
					name: 'flatBoost',
					type: 'number',
					optional: false,
					description: 'Flat value boost applied by this buff',
				},
				{
					name: 'flatBoostLevelBonus',
					type: 'number',
					optional: false,
					description: 'Additional flat boost per level',
				},
				{
					name: 'startTime',
					type: 'string',
					optional: false,
					description: 'When the buff started (ISO date string)',
				},
				{
					name: 'duration',
					type: 'number',
					optional: false,
					description: 'Duration of the buff in seconds (0 = permanent)',
				},
				{
					name: 'multiplierForSkillHrid',
					type: 'SkillHrid',
					optional: true,
					description: 'The skill that the buff applies to',
				},
				{
					name: 'multiplierPerSkillLevel',
					type: 'number',
					optional: true,
					description: 'Additional multiplier per skill level',
				},
			],
			description:
				'Represents a temporary buff/debuff applied to a player or action.',
		})

		return interfaces
	}

	/**
	 * Extension hook: Add file header comments for shared types
	 */
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Import types from other domains (DO NOT re-export - domain control)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)

		// Add header comments
		typesBuilder.addComment(
			'Consuming modules import these types and cast HRID strings as needed.',
		)
		typesBuilder.addComment(
			'These types eliminate duplication and provide consistency across generators.',
		)
		typesBuilder.addComment('')
		typesBuilder.addComment(
			'Shared type definitions used across multiple modules',
		)
	}
}

// Main execution for standalone running
if (import.meta.main) {
	const generator = new ModularSharedTypesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
