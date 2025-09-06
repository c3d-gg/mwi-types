import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	ConstantDefinition,
	InterfaceDefinition,
	UtilityDefinition,
} from '../../core/types'

interface Skill {
	hrid: string
	name: string
	isSkilling: boolean
	isCombat: boolean
	sortIndex: number
}

/**
 * Modular Skills Generator using the hook system
 *
 * This generator demonstrates the v1.0 architecture for foundational modules:
 * - No dependencies on other domains (foundational module)
 * - No shared types needed (primitive types only)
 * - Uses transformEntity() hook for simple data transformation
 * - Uses defineInterfaces() hook for type generation
 * - Uses defineConstants() hook for category filtering
 * - Provides SkillHrid for export to other modules
 *
 * @see ARCHITECTURE.md for hook system documentation
 */
export class ModularSkillsGenerator extends ModularBaseGenerator<Skill> {
	constructor() {
		super({
			entityName: 'Skill',
			entityNamePlural: 'Skills',
			sourceKey: 'skillDetailMap',
			outputPath: 'src/generated/skills',

			// Feature flags
			generateHrids: true,
			generateCollection: true,
			generateConstants: true,
			generateUtils: true,
			generateLookups: false, // Simple module - no complex lookups needed

			// No shared types needed (foundational module)
			sharedTypes: [],

			// Standard utility templates
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'filterBy' }, // Generic filterSkills function
				{ type: 'toMap' }, // Convert Record to Map
			],

			// Category filters for auto-generating constant arrays
			categoryFilters: [
				{
					name: 'combat',
					condition: (skill: any) => skill.isCombat === true,
				},
				{
					name: 'skilling',
					condition: (skill: any) => skill.isSkilling === true,
				},
			],
		})
	}

	/**
	 * Transform raw skill data to Skill interface
	 * This is simpler than overriding extractEntities since we have a straightforward 1:1 mapping
	 */
	protected override transformEntity(rawData: any): Skill {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			isSkilling: rawData.isSkilling,
			isCombat: rawData.isCombat,
			sortIndex: rawData.sortIndex,
		}
	}

	/**
	 * Define interfaces using the hook system
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		const interfaces: InterfaceDefinition[] = []

		// Main Skill interface
		interfaces.push({
			name: 'Skill',
			properties: [
				{ name: 'hrid', type: 'SkillHrid', optional: false },
				{ name: 'name', type: 'string', optional: false },
				{ name: 'isSkilling', type: 'boolean', optional: false },
				{ name: 'isCombat', type: 'boolean', optional: false },
				{ name: 'sortIndex', type: 'number', optional: false },
			],
		})

		return interfaces
	}

	/**
	 * Define custom constants using the hook system
	 * Category filters will auto-generate COMBAT_SKILLS and SKILLING_SKILLS constants
	 */
	protected override defineConstants(): ConstantDefinition[] {
		// Category filters handle the constants automatically
		// COMBAT_SKILLS and SKILLING_SKILLS will be generated from categoryFilters config
		return []
	}

	/**
	 * Define custom utility functions using the hook system
	 */
	protected override defineUtilities(): UtilityDefinition[] {
		const utilities: UtilityDefinition[] = []

		// Get combat skills (from constant array)
		utilities.push({
			name: 'getCombatSkills',
			parameters: [],
			returnType: 'Skill[]',
			implementation: (writer) => {
				writer.writeLine('return COMBAT.map(hrid => requireSkill(hrid))')
			},
			imports: [
				{ from: './constants', names: ['COMBAT'] },
				{ from: './utils', names: ['requireSkill'] },
				{ from: './types', names: ['Skill'], isType: true },
			],
			jsDoc: {
				description: 'Gets all combat skills.',
				returns: 'Array of combat skills',
				examples: [`const combatSkills = getCombatSkills()`],
			},
		})

		// Get skilling skills (from constant array)
		utilities.push({
			name: 'getSkillingSkills',
			parameters: [],
			returnType: 'Skill[]',
			implementation: (writer) => {
				writer.writeLine('return SKILLING.map(hrid => requireSkill(hrid))')
			},
			imports: [
				{ from: './constants', names: ['SKILLING'] },
				{ from: './utils', names: ['requireSkill'] },
				{ from: './types', names: ['Skill'], isType: true },
			],
			jsDoc: {
				description: 'Gets all skilling (non-combat) skills.',
				returns: 'Array of skilling skills',
				examples: [`const skillingSkills = getSkillingSkills()`],
			},
		})

		// Get skilling skills (from constant array)
		utilities.push({
			name: 'getSkillingSkills',
			parameters: [],
			returnType: 'Skill[]',
			implementation: (writer) => {
				writer.writeLine(
					'return SKILLING_SKILLS.map(hrid => requireSkill(hrid))',
				)
			},
			imports: [
				{ from: './constants', names: ['SKILLING_SKILLS'] },
				{ from: './utils', names: ['requireSkill'] },
				{ from: './types', names: ['Skill'], isType: true },
			],
			jsDoc: {
				description: 'Gets all skilling (non-combat) skills.',
				returns: 'Array of skilling skills',
				examples: [`const skillingSkills = getSkillingSkills()`],
			},
		})

		// Check if skill is combat
		utilities.push({
			name: 'isCombatSkill',
			parameters: [{ name: 'skill', type: 'Skill' }],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine('return skill.isCombat')
			},
			imports: [{ from: './types', names: ['Skill'], isType: true }],
			jsDoc: {
				description: 'Checks if a skill is a combat skill.',
				params: [{ name: 'skill', description: 'The skill to check' }],
				returns: 'true if the skill is a combat skill, false otherwise',
			},
		})

		// Check if skill is skilling
		utilities.push({
			name: 'isSkillingSkill',
			parameters: [{ name: 'skill', type: 'Skill' }],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine('return skill.isSkilling')
			},
			imports: [{ from: './types', names: ['Skill'], isType: true }],
			jsDoc: {
				description: 'Checks if a skill is a skilling skill.',
				params: [{ name: 'skill', description: 'The skill to check' }],
				returns: 'true if the skill is a skilling skill, false otherwise',
			},
		})

		// Get skill by name (helpful utility)
		utilities.push({
			name: 'getSkillByName',
			parameters: [{ name: 'name', type: 'string' }],
			returnType: 'Skill | undefined',
			implementation: (writer) => {
				writer.writeLine(
					'return getAllSkills().find(skill => skill.name === name)',
				)
			},
			imports: [
				{ from: './utils', names: ['getAllSkills'] },
				{ from: './types', names: ['Skill'], isType: true },
			],
			jsDoc: {
				description: 'Gets a skill by its display name.',
				params: [{ name: 'name', description: 'The skill name to search for' }],
				returns: 'The skill with the given name, or undefined if not found',
				examples: [`const alchemy = getSkillByName('Alchemy')`],
			},
		})

		return utilities
	}

	/**
	 * Override data logging for this generator
	 */
	public override extractEntities(sourceData: any): Record<string, Skill> {
		const entities = super.extractEntities(sourceData)

		// Count skills by type for logging
		const combatCount = Object.values(entities).filter((s) => s.isCombat).length
		const skillingCount = Object.values(entities).filter(
			(s) => s.isSkilling,
		).length
		const metaCount = Object.values(entities).filter(
			(s) => !s.isCombat && !s.isSkilling,
		).length

		console.log(`  ⚡ Extracted ${Object.keys(entities).length} skills`)
		console.log(`  ⚔️ ${combatCount} combat skills`)
		console.log(`  🔨 ${skillingCount} skilling skills`)
		if (metaCount > 0) {
			console.log(`  📊 ${metaCount} meta skills`)
		}

		return entities
	}
}

// Main execution for standalone running
if (import.meta.main) {
	const generator = new ModularSkillsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
