import { writeFile } from 'fs/promises'
import { join } from 'path'

import type { GameData } from '../../types/source-data'

/**
 * Generates action data with Zod schemas for quick lookups
 */
export async function generateActions(gameData: GameData, outputDir: string) {
	console.log('⚡ Generating actions...')

	const actions: Record<string, any> = {}
	const actionsByType: Record<string, string[]> = {}
	const actionsBySkill: Record<string, string[]> = {}
	const actionsByCategory: Record<string, string[]> = {}

	// Collect all unique values for enums
	const allActionTypes = new Set<string>()
	const allActionCategories = new Set<string>()
	const allSkills = new Set<string>()

	// Process all actions
	for (const [actionHrid, action] of Object.entries(gameData.actionDetailMap)) {
		// Collect enum values
		allActionTypes.add(action.type)
		allActionCategories.add(action.category)
		allSkills.add(action.levelRequirement.skillHrid)

		// Create minimal action data
		actions[actionHrid] = {
			hrid: actionHrid,
			name: action.name,
			type: action.type,
			category: action.category,
			skillHrid: action.levelRequirement.skillHrid,
			level: action.levelRequirement.level,
			baseTimeCost: Math.floor(action.baseTimeCost / 1000000), // Convert to milliseconds
			experienceGain: action.experienceGain.value
		}

		// Build type index
		if (!actionsByType[action.type]) {
			actionsByType[action.type] = []
		}
		actionsByType[action.type]!.push(actionHrid)

		// Build skill index
		const skillHrid = action.levelRequirement.skillHrid
		if (!actionsBySkill[skillHrid]) {
			actionsBySkill[skillHrid] = []
		}
		actionsBySkill[skillHrid].push(actionHrid)

		// Build category index
		if (!actionsByCategory[action.category]) {
			actionsByCategory[action.category] = []
		}
		actionsByCategory[action.category]!.push(actionHrid)
	}

	// Sort arrays for consistent output
	const sortedTypes = Array.from(allActionTypes).sort()
	const sortedCategories = Array.from(allActionCategories).sort()
	const sortedSkills = Array.from(allSkills).sort()

	for (const items of Object.values(actionsByType)) {
		items.sort()
	}
	for (const items of Object.values(actionsBySkill)) {
		items.sort()
	}
	for (const items of Object.values(actionsByCategory)) {
		items.sort()
	}

	// Generate TypeScript content with imports from source of truth
	const content = `/**
 * Auto-generated action data with Zod schemas - DO NOT EDIT
 * Generated from game data on ${new Date().toISOString()}
 */

import { z } from 'zod/v4'
import type { ActionHrid } from './types'

// Import enums from the source of truth
import {
	ActionTypeHridSchema,
	ActionCategorySchema,
	type ActionTypeHrid,
	type ActionCategory
} from '../../types/source-data'

// Re-export for convenience
export {
	ActionTypeHridSchema as ActionTypeEnum,
	ActionCategorySchema as ActionCategoryEnum,
	type ActionTypeHrid as ActionType,
	type ActionCategory
}

// Import skill enum from skills generator (will be available after skills are generated)
import { SkillHridEnum, type SkillHrid } from './skills'

/**
 * Action schema
 */
export const ActionSchema = z.object({
	hrid: z.string(),
	name: z.string(),
	type: ActionTypeHridSchema,
	category: ActionCategorySchema,
	skillHrid: SkillHridEnum,
	level: z.number(),
	baseTimeCost: z.number(),
	experienceGain: z.number()
})

export type Action = z.infer<typeof ActionSchema>

/**
 * All game actions
 */
export const ACTIONS = ${JSON.stringify(actions, null, 2)} as const

/**
 * Actions grouped by type (e.g., combat, crafting, gathering)
 */
export const ACTIONS_BY_TYPE = ${JSON.stringify(actionsByType, null, 2)} as const

/**
 * Actions grouped by skill requirement
 */
export const ACTIONS_BY_SKILL = ${JSON.stringify(actionsBySkill, null, 2)} as const

/**
 * Actions grouped by category (e.g., smithing/swords, cooking/breakfast)
 */
export const ACTIONS_BY_CATEGORY = ${JSON.stringify(actionsByCategory, null, 2)} as const

// Type exports
export type ActionId = keyof typeof ACTIONS
export type ActionData = typeof ACTIONS[ActionId]

/**
 * Get action by HRID with validation
 * @param actionHrid - The action HRID to retrieve
 * @returns The parsed Action object if found, undefined otherwise
 * @example
 * \`\`\`ts
 * const combatAction = getAction('/actions/combat/rats')
 * if (combatAction) {
 *   console.log(\`Requires \${combatAction.skillHrid} level \${combatAction.level}\`)
 * }
 * \`\`\`
 */
export function getAction(actionHrid: string): Action | undefined {
	const action = ACTIONS[actionHrid as ActionId]
	return action ? ActionSchema.parse(action) : undefined
}

/**
 * Get all actions of a specific type
 * @param type - The action type from ActionTypeEnum
 * @returns Array of action HRIDs for the specified type
 * @example
 * \`\`\`ts
 * const combatActions = getActionsByType('/action_types/combat')
 * const craftingActions = getActionsByType('/action_types/crafting')
 * \`\`\`
 */
export function getActionsByType(type: ActionTypeHrid): string[] {
	const actions = ACTIONS_BY_TYPE[type as keyof typeof ACTIONS_BY_TYPE]
	return actions ? [...actions] : []
}

/**
 * Get all actions for a specific skill
 * @param skillHrid - The skill HRID from SkillHridEnum
 * @returns Array of action HRIDs that require the specified skill
 * @example
 * \`\`\`ts
 * const cookingActions = getActionsBySkill('/skills/cooking')
 * console.log(\`Found \${cookingActions.length} cooking actions\`)
 * \`\`\`
 */
export function getActionsBySkill(skillHrid: SkillHrid): string[] {
	const actions = ACTIONS_BY_SKILL[skillHrid as keyof typeof ACTIONS_BY_SKILL]
	return actions ? [...actions] : []
}

/**
 * Get all actions in a specific category
 * @param category - The action category from ActionCategoryEnum
 * @returns Array of action HRIDs in the specified category
 * @example
 * \`\`\`ts
 * const swordActions = getActionsByCategory('/action_categories/smithing/swords')
 * const breakfastActions = getActionsByCategory('/action_categories/cooking/breakfast')
 * \`\`\`
 */
export function getActionsByCategory(category: ActionCategory): string[] {
	const actions = ACTIONS_BY_CATEGORY[category as keyof typeof ACTIONS_BY_CATEGORY]
	return actions ? [...actions] : []
}

/**
 * Get all actions for a skill at or below a level
 * @param skillHrid - The skill HRID from SkillHridEnum
 * @param maxLevel - The maximum skill level (inclusive)
 * @returns Array of action HRIDs available at or below the specified level
 * @example
 * \`\`\`ts
 * const availableActions = getActionsForSkillLevel('/skills/combat', 50)
 * console.log(\`Can perform \${availableActions.length} combat actions at level 50\`)
 * \`\`\`
 */
export function getActionsForSkillLevel(skillHrid: SkillHrid, maxLevel: number): string[] {
	const skillActions = ACTIONS_BY_SKILL[skillHrid as keyof typeof ACTIONS_BY_SKILL]
	if (!skillActions) return []
	
	return skillActions.filter(actionHrid => {
		const action = ACTIONS[actionHrid as ActionId]
		return action && action.level <= maxLevel
	})
}

/**
 * Check if an action exists
 * @param actionHrid - The action HRID to check
 * @returns True if the action exists, false otherwise
 * @example
 * \`\`\`ts
 * if (actionExists('/actions/combat/rats')) {
 *   console.log('Rat combat action is available!')
 * }
 * \`\`\`
 */
export function actionExists(actionHrid: string): boolean {
	return actionHrid in ACTIONS
}

/**
 * Validate an action HRID and return it as a typed ActionHrid
 * @param hrid - The action HRID string to validate
 * @returns The validated ActionHrid
 * @throws Error if the HRID is not a valid action
 * @example
 * \`\`\`ts
 * try {
 *   const actionHrid = validateActionHrid('/actions/combat/rats')
 *   // actionHrid is now typed as ActionHrid
 * } catch (error) {
 *   console.error('Invalid action HRID')
 * }
 * \`\`\`
 */
export function validateActionHrid(hrid: string): ActionHrid {
	if (!(hrid in ACTIONS)) {
		throw new Error(\`Invalid action: \${hrid}\`)
	}
	return hrid as ActionHrid
}

/**
 * Get production actions (crafting, cooking, etc.)
 * @returns Array of action HRIDs for all production-type actions
 * @example
 * \`\`\`ts
 * const productionActions = getProductionActions()
 * // Returns all crafting, cooking, brewing, tailoring, alchemy, and cheesesmithing actions
 * \`\`\`
 */
export function getProductionActions(): string[] {
	const productionTypes: ActionTypeHrid[] = [
		'/action_types/crafting',
		'/action_types/cooking',
		'/action_types/brewing',
		'/action_types/tailoring',
		'/action_types/alchemy',
		'/action_types/cheesesmithing'
	]
	
	const results: string[] = []
	for (const type of productionTypes) {
		const actions = ACTIONS_BY_TYPE[type as keyof typeof ACTIONS_BY_TYPE]
		if (actions) results.push(...actions)
	}
	return results
}

/**
 * Get gathering actions (foraging, woodcutting, milking)
 * @returns Array of action HRIDs for all gathering-type actions
 * @example
 * \`\`\`ts
 * const gatheringActions = getGatheringActions()
 * // Returns all foraging, woodcutting, and milking actions
 * \`\`\`
 */
export function getGatheringActions(): string[] {
	const gatheringTypes: ActionTypeHrid[] = [
		'/action_types/foraging',
		'/action_types/woodcutting',
		'/action_types/milking'
	]
	
	const results: string[] = []
	for (const type of gatheringTypes) {
		const actions = ACTIONS_BY_TYPE[type as keyof typeof ACTIONS_BY_TYPE]
		if (actions) results.push(...actions)
	}
	return results
}
`

	// Write the file
	const outputPath = join(outputDir, 'actions.ts')
	await writeFile(outputPath, content, 'utf-8')

	console.log(`✅ Generated ${Object.keys(actions).length} actions`)
	console.log(`   - ${Object.keys(actionsByType).length} types`)
	console.log(`   - ${Object.keys(actionsBySkill).length} skills`)
	console.log(`   - ${Object.keys(actionsByCategory).length} categories`)
	console.log(`   - ${sortedTypes.length} type enums`)
	console.log(`   - ${sortedCategories.length} category enums`)

	return {
		actionCount: Object.keys(actions).length,
		typeCount: Object.keys(actionsByType).length,
		skillCount: Object.keys(actionsBySkill).length
	}
}
