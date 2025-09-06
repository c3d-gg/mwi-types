import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition } from '../../core/types'

/**
 * Skills Generator
 *
 * Generates TypeScript types and utilities for game skills.
 * Skills are foundational entities with no dependencies, making them
 * ideal for early-phase generation and testing of the TDD workflow.
 *
 * @see README.md for detailed documentation
 */
export class ModularSkillsGenerator extends ModularBaseGenerator<Skill> {
	constructor() {
		super({
			entityName: 'Skill',
			entityNamePlural: 'Skills',
			sourceKey: 'skillDetailMap',
			outputPath: 'src/generated/skills',

			// Skills have no shared types dependencies
			sharedTypes: [],

			// Category filters for boolean-based grouping
			categoryFilters: [
				{
					name: 'skilling',
					condition: (skill: any) => skill.isSkilling === true,
				},
				{
					name: 'combat',
					condition: (skill: any) => skill.isCombat === true,
				},
			],

			// Standard utility templates for Skills module
			utilityTemplates: [
				{ type: 'getByField', field: 'isSkilling' },
				{ type: 'getByField', field: 'isCombat' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'sortBy', field: 'name' },
				{ type: 'filterBy' },
				{ type: 'toMap' },
			],
		})
	}

	/**
	 * Define interfaces using the hook system
	 *
	 * Skills only need the main Skill interface - no complex relationships.
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		console.log('Skills defineInterfaces hook called!')
		const interfaces = [
			{
				name: 'Skill',
				properties: [
					{ name: 'hrid', type: 'SkillHrid', optional: false },
					{ name: 'name', type: 'string', optional: false },
					{ name: 'isSkilling', type: 'boolean', optional: false },
					{ name: 'isCombat', type: 'boolean', optional: false },
					{ name: 'sortIndex', type: 'number', optional: false },
				],
			},
		]
		console.log('Returning interfaces:', interfaces)
		return interfaces
	}

	/**
	 * Get the generator configuration (for testing)
	 */
	public getConfig() {
		return this.config
	}

	/**
	 * Extract and transform skills from source data
	 *
	 * Skills have a simple, flat structure with no nested objects
	 * or complex relationships to handle.
	 */
	public extractEntities(sourceData: any): Record<string, Skill> {
		if (!sourceData || typeof sourceData !== 'object') {
			return {}
		}

		const skills: Record<string, Skill> = {}

		Object.entries(sourceData).forEach(([key, rawSkill]: [string, any]) => {
			if (!rawSkill || typeof rawSkill !== 'object') {
				return
			}

			// Validate required properties exist
			if (!rawSkill.hrid || typeof rawSkill.name !== 'string') {
				console.warn(`Skipping invalid skill entry: ${key}`)
				return
			}

			// Create properly typed Skill entity
			const skill: Skill = {
				hrid: rawSkill.hrid,
				name: rawSkill.name,
				isSkilling: Boolean(rawSkill.isSkilling), // Ensure boolean
				isCombat: Boolean(rawSkill.isCombat), // Ensure boolean
				sortIndex: Number(rawSkill.sortIndex) || 0, // Ensure number with fallback
			}

			// Use the entity's hrid as the key (not the source key)
			skills[skill.hrid] = skill
		})

		return skills
	}
}

// Main execution when run directly
if (import.meta.main) {
	const generator = new ModularSkillsGenerator()
	generator.generate('./src/sources/game_data.json')
	console.log('✅ Skills module generated successfully!')
}

/**
 * Skill entity interface
 *
 * Represents a single skill in the game with all its properties.
 * This interface will be exported in the generated types module.
 */
interface Skill {
	/** Human-readable identifier (e.g., "/skills/alchemy") */
	hrid: string

	/** Display name for the skill (e.g., "Alchemy") */
	name: string

	/** Whether this skill involves skilling activities */
	isSkilling: boolean

	/** Whether this skill is related to combat */
	isCombat: boolean

	/** Sort order for UI display (lower = earlier) */
	sortIndex: number
}

// Main execution for standalone running
if (import.meta.main) {
	const generator = new ModularSkillsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
