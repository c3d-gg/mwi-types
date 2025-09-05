import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

interface Skill {
	hrid: string
	name: string
	description: string
	sortIndex: number
	icon?: string
}

/**
 * Modular Skills Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularSkillsGenerator extends ModularBaseGenerator<Skill> {
	constructor() {
		super({
			entityName: 'Skill',
			entityNamePlural: 'Skills',
			sourceKey: 'skillDetailMap',
			outputPath: './src/generated/skills/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, Skill> {
		const skills: Record<string, Skill> = {}
		const skillMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(skillMap)) {
			const skill = this.extractSkill(hrid, data as any)
			skills[hrid] = skill
		}

		console.log(`  🎯 Extracted ${Object.keys(skills).length} skills`)

		return skills
	}

	private extractSkill(hrid: string, data: any): Skill {
		return {
			hrid,
			name: data.name || '',
			description: data.description || '',
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
			icon: data.icon && data.icon !== '' ? data.icon : undefined,
		}
	}

	protected override generateTypes(entities: Record<string, Skill>): void {
		// Main Skill interface
		const skillProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'SkillHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'description', type: 'string', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
			{ name: 'icon', type: 'string', optional: true },
		]
		this.moduleBuilder.addInterface('Skill', skillProps)
		
		// Export the Skill interface
		this.moduleBuilder.addExport({ name: 'Skill', source: './types', isType: true })
	}

	protected override generateLookups(entities: Record<string, Skill>): void {
		// Skills are simple, no special lookups needed beyond the base constants
		// The base generator already creates SKILL_HRIDS constant array
	}

	protected override generateUtilities(entities: Record<string, Skill>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Add skill-specific utilities
		const utils = this.moduleBuilder.getFile('utils')

		// Get skills sorted by index
		this.moduleBuilder.addUtilityFunction(
			'getSkillsSortedByIndex',
			[],
			'Skill[]',
			(writer) => {
				writer.writeLine('return getAllSkills().sort((a, b) => a.sortIndex - b.sortIndex)')
			},
			[
				{ from: './types', names: ['Skill'], isType: true },
			]
		)

		// Get skill by name
		this.moduleBuilder.addUtilityFunction(
			'getSkillByName',
			[{ name: 'name', type: 'string' }],
			'Skill | undefined',
			(writer) => {
				writer.writeLine('return getAllSkills().find(skill => skill.name.toLowerCase() === name.toLowerCase())')
			},
			[
				{ from: './types', names: ['Skill'], isType: true },
			]
		)

		// Get skills with icons
		this.moduleBuilder.addUtilityFunction(
			'getSkillsWithIcons',
			[],
			'Skill[]',
			(writer) => {
				writer.writeLine('return getAllSkills().filter(skill => skill.icon !== undefined)')
			},
			[
				{ from: './types', names: ['Skill'], isType: true },
			]
		)
	}
}