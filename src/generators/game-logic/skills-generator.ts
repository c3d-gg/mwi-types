import { BaseGenerator } from '../base/base-generator'
import type { BaseEntity, PropertyDefinition, GeneratorConfig } from '../base/types'

interface SkillDetail extends BaseEntity {
	hrid: string
	name: string
	isSkilling: boolean
	isCombat: boolean
	sortIndex: number
}

/**
 * Generator for skill types and constants
 */
export class SkillsGenerator extends BaseGenerator<SkillDetail> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'Skill',
			entityNamePlural: 'Skills',
			sourceKey: 'skillDetailMap',
			outputFilename: 'skills',
			generateHrids: true,
			generateZodSchema: true,
			generateTypeboxSchema: true
		}
		super(config)
	}

	protected extractEntities(): Record<string, SkillDetail> {
		return this.getEntitiesFromGameData() as Record<string, SkillDetail>
	}

	protected defineSchemaProperties(entity: SkillDetail): PropertyDefinition[] {
		return [
			{
				name: 'hrid',
				type: 'ref',
				refName: 'SkillHridEnum',
				description: 'The unique human-readable ID of the skill'
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the skill'
			},
			{
				name: 'isSkilling',
				type: 'boolean',
				description: 'Whether this is a skilling (non-combat) skill'
			},
			{
				name: 'isCombat',
				type: 'boolean',
				description: 'Whether this is a combat skill'
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Sort order for displaying skills'
			}
		]
	}

	protected override generateAdditionalExports(entities: Record<string, SkillDetail>): string[] {
		const combatSkills: string[] = []
		const skillingSkills: string[] = []

		// Categorize skills
		for (const [hrid, skill] of Object.entries(entities)) {
			if (skill.isCombat) {
				combatSkills.push(hrid)
			}
			if (skill.isSkilling) {
				skillingSkills.push(hrid)
			}
		}

		// Sort for consistent output
		combatSkills.sort()
		skillingSkills.sort()

		return [
			`/**
 * Combat skills (used for combat abilities and equipment)
 */
export const COMBAT_SKILLS = ${JSON.stringify(combatSkills, null, 2)} as const`,
			
			`/**
 * Skilling skills (used for non-combat actions)
 */
export const SKILLING_SKILLS = ${JSON.stringify(skillingSkills, null, 2)} as const`,
			
			`/**
 * Skills organized by type
 */
export const SKILLS_BY_TYPE = {
	combat: COMBAT_SKILLS,
	skilling: SKILLING_SKILLS
} as const`,
			
			`/**
 * Get all combat skills
 * @returns Array of skill HRIDs that are combat skills
 * @example
 * \`\`\`ts
 * const combatSkills = getCombatSkills()
 * // ['/skills/attack', '/skills/defense', '/skills/magic', ...]
 * \`\`\`
 */
export function getCombatSkills(): readonly string[] {
	return COMBAT_SKILLS
}`,
			
			`/**
 * Get all skilling (non-combat) skills
 * @returns Array of skill HRIDs that are skilling skills
 * @example
 * \`\`\`ts
 * const skillingSkills = getSkillingSkills()
 * // ['/skills/woodcutting', '/skills/mining', '/skills/cooking', ...]
 * \`\`\`
 */
export function getSkillingSkills(): readonly string[] {
	return SKILLING_SKILLS
}`,
			
			`/**
 * Check if a skill is a combat skill
 * @param skillHrid - The skill HRID to check
 * @returns True if the skill is a combat skill, false otherwise
 * @example
 * \`\`\`ts
 * if (isCombatSkill('/skills/attack')) {
 *   console.log('This is a combat skill')
 * }
 * \`\`\`
 */
export function isCombatSkill(skillHrid: string): boolean {
	const skill = SKILLS[skillHrid as SkillHrid]
	return skill?.isCombat ?? false
}`,
			
			`/**
 * Check if a skill is a skilling (non-combat) skill
 * @param skillHrid - The skill HRID to check
 * @returns True if the skill is a skilling skill, false otherwise
 * @example
 * \`\`\`ts
 * if (isSkillingSkill('/skills/woodcutting')) {
 *   console.log('This is a skilling skill')
 * }
 * \`\`\`
 */
export function isSkillingSkill(skillHrid: string): boolean {
	const skill = SKILLS[skillHrid as SkillHrid]
	return skill?.isSkilling ?? false
}`
		]
	}
}