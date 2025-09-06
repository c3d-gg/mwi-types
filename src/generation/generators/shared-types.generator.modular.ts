import { ModularBaseGenerator } from '../core/generator.base.modular'
import type { GeneratorConfig, PropertyDefinition } from '../core/types'

/**
 * Generator for shared types that are used across multiple modules
 * These types are defined once here and imported by other modules
 * 
 * Updated for v1.0 architecture with hook system
 */
export class SharedTypesModularGenerator extends ModularBaseGenerator<any> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'SharedType',
			entityNamePlural: 'SharedTypes',
			sourceKey: 'shared', // Not used, but required by base class
			outputPath: 'src/generated/sharedtypes',
			// Disable all standard generation features for special case
			generateHrids: false,
			generateCollection: false,
			generateConstants: false,
			generateUtils: false,
			generateLookups: false,
		}
		super(config)
	}

	/**
	 * Override the main generate method since shared types don't follow the normal entity pattern
	 */
	override async generate(sourcePath: string): Promise<void> {
		console.log(`🔧 Generating ${this.config.entityNamePlural} (modular)...`)

		// For shared types, we don't need to extract from source data
		// Just generate the types directly
		this.generateTypes({})

		// Save all files
		await this.moduleBuilder.save()

		console.log(`✅ Generated shared types module with static definitions`)
	}

	/**
	 * Shared types don't come from source data - they're defined here
	 */
	protected override extractEntities(_sourceData: any): Record<string, any> {
		return {} // No entities to extract
	}

	/**
	 * Generate the shared type definitions
	 */
	protected override generateTypes(_entities: Record<string, any>): void {
		const typesFile = this.moduleBuilder.getFile('types')

		// Add file header comment
		typesFile.addComment('Shared type definitions used across multiple modules')

		// Import dependencies that shared types need
		// Note: We can't import from modules that depend on shared types (circular dependency)
		// So we use string literals for now and modules will cast as needed

		// LevelRequirement - used by actions, items, recipes, etc.
		const levelRequirementProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('LevelRequirement', levelRequirementProps)

		// ExperienceGain - used by actions, recipes, etc.
		const experienceGainProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('ExperienceGain', experienceGainProps)

		// ItemCost - used by items, recipes, shops, etc.
		const itemCostProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('ItemCost', itemCostProps)

		// Stats - used by items, equipment, buffs, etc.
		// Using index signature to allow any stat property since the game has many different stat types
		const statsProps: PropertyDefinition[] = [
			{
				name: '[key: string]',
				type: 'number',
				optional: false,
				description: 'Flexible stats object that can contain any numeric stat property',
			},
		]
		this.moduleBuilder.addInterface('Stats', statsProps)

		// SpawnInfo - used by actions and monsters
		const spawnInfoProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('SpawnInfo', spawnInfoProps)

		// RandomSpawnInfo - used by actions
		const randomSpawnInfoProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('RandomSpawnInfo', randomSpawnInfoProps)

		// DropTable - used by actions and monsters
		const dropTableProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('DropTable', dropTableProps)

		// ActionItem - used by actions
		const actionItemProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('ActionItem', actionItemProps)

		// UpgradeCost - used by house rooms
		const upgradeCostProps: PropertyDefinition[] = [
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
		]
		this.moduleBuilder.addInterface('UpgradeCost', upgradeCostProps)

		// Buff - used by items, abilities, and guild buffs
		const buffProps: PropertyDefinition[] = [
			{
				name: 'skillHrid',
				type: 'string', // Will be cast to SkillHrid
				optional: true,
				description: 'The skill this buff applies to (optional)',
			},
			{
				name: 'value',
				type: 'number',
				optional: false,
				description: 'The buff value (can be percentage or flat amount)',
			},
			{
				name: 'isPercentage',
				type: 'boolean',
				optional: true,
				description: 'Whether the buff value is a percentage',
			},
		]
		this.moduleBuilder.addInterface('Buff', buffProps)

		// Interfaces are already exported by addInterface() method
	}

	/**
	 * Override to skip data generation since we have no entities
	 */
	protected override generateLazyData(_entities: Record<string, any>): void {
		// No data to generate for shared types
	}

	/**
	 * Override to skip constants generation
	 */
	protected override generateConstants(_entities: Record<string, any>): void {
		// No constants for shared types
	}

	/**
	 * Override to skip lookups generation
	 */
	protected override generateLookups(_entities: Record<string, any>): void {
		// No lookups for shared types
	}

	/**
	 * Override to skip utilities generation
	 */
	protected override generateUtilities(_entities: Record<string, any>): void {
		// No utilities for shared types
	}
}