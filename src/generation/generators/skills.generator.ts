import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

interface Skill {
	hrid: string
	name: string
	description: string
	sortIndex: number
	icon?: string
}

export class SkillsGenerator extends BaseGenerator<Skill> {
	constructor() {
		super({
			entityName: 'Skill',
			entityNamePlural: 'Skills',
			sourceKey: 'skillDetailMap',
			outputPath: 'src/generated/types/skills.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected extractEntities(sourceData: any): Record<string, Skill> {
		const skills: Record<string, Skill> = {}
		const skillMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(skillMap)) {
			const skill = this.extractSkill(hrid, data as any)
			skills[hrid] = skill
		}

		return skills
	}

	private extractSkill(hrid: string, data: any): Skill {
		return {
			hrid,
			name: data.name || '',
			description: data.description || '',
			sortIndex: data.sortIndex || 0,
			icon: data.icon && data.icon !== '' ? data.icon : undefined,
		}
	}

	protected generateInterfaces(entities: Record<string, Skill>): void {
		const properties: PropertyDefinition[] = [
			{ name: 'hrid', type: 'SkillHrid' },
			{ name: 'name', type: 'string' },
			{ name: 'description', type: 'string' },
			{ name: 'sortIndex', type: 'number' },
			{ name: 'icon', type: 'string', optional: true },
		]

		this.builder.addInterface('Skill', properties)
	}
}
