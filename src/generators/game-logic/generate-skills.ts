import { writeFile } from 'fs/promises'
import { join } from 'path'

import type { GameData } from '../../types/source-data'

/**
 * Generates optimized skill data with Zod schemas
 */
export async function generateSkills(gameData: GameData, outputDir: string) {
	console.log('⚔️ Generating skills...')

	// Collect all skills and categorize them
	const skillData: Record<string, any> = {}
	const combatSkills: string[] = []
	const skillingSkills: string[] = []
	const skillHrids = new Set<string>()

	for (const [skillHrid, skill] of Object.entries(gameData.skillDetailMap)) {
		// Create minimal skill data
		const data = {
			hrid: skill.hrid,
			name: skill.name,
			isSkilling: skill.isSkilling,
			isCombat: skill.isCombat,
			sortIndex: skill.sortIndex
		}

		skillData[skillHrid] = data
		skillHrids.add(skillHrid)

		// Categorize by type
		if (skill.isCombat) {
			combatSkills.push(skillHrid)
		}
		if (skill.isSkilling) {
			skillingSkills.push(skillHrid)
		}
	}

	// Sort arrays for consistent output
	combatSkills.sort()
	skillingSkills.sort()

	// Generate TypeScript content with imports from source of truth
	const content = `/**
 * Auto-generated skill data with Zod schemas - DO NOT EDIT
 * Generated from game data on ${new Date().toISOString()}
 */

import { z } from 'zod/v4'

// Import schema from the source of truth
import { SkillDetailSchema, type SkillDetail } from '../../types/source-data'

/**
 * Simplified skill schema for generated data
 */
export const SkillSchema = z.object({
	hrid: z.string(),
	name: z.string(),
	isSkilling: z.boolean(),
	isCombat: z.boolean(),
	sortIndex: z.number()
})

export type Skill = z.infer<typeof SkillSchema>

/**
 * Skill HRID enum for validation across all generators
 */
export const SkillHridEnum = z.enum([
${Array.from(skillHrids)
	.sort()
	.map((skill) => `\t'${skill}'`)
	.join(',\n')}
])

/**
 * Branded type for Skill HRIDs
 */
export type SkillHrid = z.infer<typeof SkillHridEnum>

/**
 * All skills in the game
 */
export const SKILLS: Record<string, Skill> = ${JSON.stringify(skillData, null, 2)}

/**
 * Combat skills (used for combat abilities and equipment)
 */
export const COMBAT_SKILLS = ${JSON.stringify(combatSkills, null, 2)} as const

/**
 * Skilling skills (used for non-combat actions)
 */
export const SKILLING_SKILLS = ${JSON.stringify(skillingSkills, null, 2)} as const

/**
 * Skills organized by type
 */
export const SKILLS_BY_TYPE = {
	combat: COMBAT_SKILLS,
	skilling: SKILLING_SKILLS
} as const

// Type exports
export type SkillId = keyof typeof SKILLS
export type SkillData = typeof SKILLS[SkillId]

/**
 * Get skill by HRID with validation
 * @param skillHrid - The skill HRID to retrieve
 * @returns The parsed Skill object if found, undefined otherwise
 * @example
 * \`\`\`ts
 * const combat = getSkill('/skills/combat')
 * if (combat) {
 *   console.log(combat.name) // "Combat"
 * }
 * \`\`\`
 */
export function getSkill(skillHrid: string): Skill | undefined {
	const skill = SKILLS[skillHrid as SkillId]
	return skill ? SkillSchema.parse(skill) : undefined
}

/**
 * Get all combat skills
 * @returns Array of skill HRIDs that are combat skills
 * @example
 * \`\`\`ts
 * const combatSkills = getCombatSkills()
 * // ['skills/attack', '/skills/defense', '/skills/magic', ...]
 * \`\`\`
 */
export function getCombatSkills(): readonly string[] {
	return COMBAT_SKILLS
}

/**
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
}

/**
 * Check if a skill exists
 * @param skillHrid - The skill HRID to check
 * @returns True if the skill exists, false otherwise
 * @example
 * \`\`\`ts
 * if (skillExists('/skills/combat')) {
 *   console.log('Combat skill exists!')
 * }
 * \`\`\`
 */
export function skillExists(skillHrid: string): boolean {
	return skillHrid in SKILLS
}

/**
 * Validate a skill HRID and return it as a typed SkillHrid
 * @param hrid - The skill HRID string to validate
 * @returns The validated SkillHrid
 * @throws Error if the HRID is not a valid skill
 * @example
 * \`\`\`ts
 * try {
 *   const skillHrid = validateSkillHrid('/skills/combat')
 *   // skillHrid is now typed as SkillHrid
 * } catch (error) {
 *   console.error('Invalid skill HRID')
 * }
 * \`\`\`
 */
export function validateSkillHrid(hrid: string): SkillHrid {
	if (!(hrid in SKILLS)) {
		throw new Error(\`Invalid skill: \${hrid}\`)
	}
	return hrid as SkillHrid
}

/**
 * Get all skills sorted by their sort index
 * @returns Array of skill HRIDs sorted by sortIndex
 * @example
 * \`\`\`ts
 * const sortedSkills = getSkillsSortedByIndex()
 * // Skills in the order they should be displayed
 * \`\`\`
 */
export function getSkillsSortedByIndex(): string[] {
	return Object.entries(SKILLS)
		.sort(([, a], [, b]) => a.sortIndex - b.sortIndex)
		.map(([hrid]) => hrid)
}

/**
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
	const skill = SKILLS[skillHrid as SkillId]
	return skill?.isCombat ?? false
}

/**
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
	const skill = SKILLS[skillHrid as SkillId]
	return skill?.isSkilling ?? false
}
`

	// Write the file
	const outputPath = join(outputDir, 'skills.ts')
	await writeFile(outputPath, content, 'utf-8')

	console.log(`✅ Generated ${Object.keys(skillData).length} skills`)
	console.log(`   - ${combatSkills.length} combat skills`)
	console.log(`   - ${skillingSkills.length} skilling skills`)

	return {
		skillCount: Object.keys(skillData).length,
		combatCount: combatSkills.length,
		skillingCount: skillingSkills.length
	}
}
