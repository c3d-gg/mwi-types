import { BaseGenerator } from '../core/generator.base'

import type { PropertyDefinition } from '../core/ast-builder'

interface LeaderboardCategory {
	hrid: string
	name: string
	skillHrid: string | null
	isGuild: boolean
	sortIndex: number
}

export class LeaderboardCategoriesGenerator extends BaseGenerator<LeaderboardCategory> {
	private uniqueSkillHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'LeaderboardCategory',
			entityNamePlural: 'LeaderboardCategories',
			sourceKey: 'leaderboardCategoryDetailMap',
			outputPath: 'src/generated/types/leaderboard-categories.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected extractEntities(
		sourceData: any,
	): Record<string, LeaderboardCategory> {
		const categories: Record<string, LeaderboardCategory> = {}
		const categoryMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(categoryMap)) {
			const category = this.extractLeaderboardCategory(hrid, data as any)
			categories[hrid] = category
			this.collectUniqueValues(category)
		}

		return categories
	}

	private extractLeaderboardCategory(
		hrid: string,
		data: any,
	): LeaderboardCategory {
		return {
			hrid,
			name: data.name || '',
			skillHrid: data.skillHrid || null,
			isGuild: data.isGuild === true,
			sortIndex: data.sortIndex || 0,
		}
	}

	protected override collectUniqueValues(category: LeaderboardCategory): void {
		if (category.skillHrid) {
			this.uniqueSkillHrids.add(category.skillHrid)
		}
	}

	protected generateInterfaces(
		entities: Record<string, LeaderboardCategory>,
	): void {
		// Import skill types if we have them
		if (this.uniqueSkillHrids.size > 0) {
			this.builder.addImport('./skills', ['SkillHrid'], true)
		}

		const properties: PropertyDefinition[] = [
			{ name: 'hrid', type: 'LeaderboardCategoryHrid' },
			{ name: 'name', type: 'string' },
			{ name: 'skillHrid', type: 'SkillHrid | null' },
			{ name: 'isGuild', type: 'boolean' },
			{ name: 'sortIndex', type: 'number' },
		]

		this.builder.addInterface('LeaderboardCategory', properties)
	}

	protected override generateUtilities(
		entities: Record<string, LeaderboardCategory>,
	): void {
		// Generate base utilities
		super.generateUtilities(entities)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(
		entities: Record<string, LeaderboardCategory>,
	): void {
		const guildCategories: string[] = []
		const playerCategories: string[] = []
		const skillCategories: string[] = []
		const specialCategories: string[] = []
		const categoriesBySkill: Record<string, string[]> = {}

		for (const [hrid, category] of Object.entries(entities)) {
			if (category.isGuild) {
				guildCategories.push(hrid)
			} else {
				playerCategories.push(hrid)
			}

			if (category.skillHrid) {
				skillCategories.push(hrid)
				if (!categoriesBySkill[category.skillHrid]) {
					categoriesBySkill[category.skillHrid] = []
				}
				categoriesBySkill[category.skillHrid]!.push(hrid)
			} else {
				specialCategories.push(hrid)
			}
		}

		// Generate lookup arrays
		this.builder.addComment('Guild leaderboard categories')
		this.builder.addConstArray(
			'GUILD_LEADERBOARD_CATEGORIES',
			guildCategories,
			true,
		)

		this.builder.addComment('Player leaderboard categories')
		this.builder.addConstArray(
			'PLAYER_LEADERBOARD_CATEGORIES',
			playerCategories,
			true,
		)

		this.builder.addComment('Skill-based leaderboard categories')
		this.builder.addConstArray(
			'SKILL_LEADERBOARD_CATEGORIES',
			skillCategories,
			true,
		)

		this.builder.addComment('Special (non-skill) leaderboard categories')
		this.builder.addConstArray(
			'SPECIAL_LEADERBOARD_CATEGORIES',
			specialCategories,
			true,
		)

		// Generate skill lookup map
		if (Object.keys(categoriesBySkill).length > 0) {
			this.builder.addComment('Leaderboard categories grouped by skill')
			this.builder.getSourceFile().addVariableStatement({
				isExported: true,
				declarationKind: 'const' as any,
				declarations: [
					{
						name: 'LEADERBOARD_CATEGORIES_BY_SKILL',
						type: 'Partial<Record<SkillHrid, readonly LeaderboardCategoryHrid[]>>',
						initializer: (writer) => {
							writer.write('{')
							writer.newLine()
							Object.entries(categoriesBySkill).forEach(
								([skill, categories], index, arr) => {
									writer.indent(() => {
										writer.write(`'${skill}': [`)
										categories.forEach((c, i) => {
											writer.write(`'${c}'`)
											if (i < categories.length - 1) writer.write(', ')
										})
										writer.write(']')
										if (index < arr.length - 1) writer.write(',')
										writer.newLine()
									})
								},
							)
							writer.write('}')
						},
					},
				],
			})
		}
	}

	private generateSpecializedUtils(): void {
		// isGuildLeaderboardCategory
		this.builder.addFunction(
			'isGuildLeaderboardCategory',
			[{ name: 'hrid', type: 'LeaderboardCategoryHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const category = LEADERBOARDCATEGORIES.get(hrid)')
				writer.writeLine('return category?.isGuild === true')
			},
		)

		// isSkillLeaderboardCategory
		this.builder.addFunction(
			'isSkillLeaderboardCategory',
			[{ name: 'hrid', type: 'LeaderboardCategoryHrid' }],
			'boolean',
			(writer) => {
				writer.writeLine('const category = LEADERBOARDCATEGORIES.get(hrid)')
				writer.writeLine('return category?.skillHrid !== null')
			},
		)

		// getLeaderboardCategorySkill
		this.builder.addFunction(
			'getLeaderboardCategorySkill',
			[{ name: 'hrid', type: 'LeaderboardCategoryHrid' }],
			'SkillHrid | null',
			(writer) => {
				writer.writeLine('const category = LEADERBOARDCATEGORIES.get(hrid)')
				writer.writeLine('return category?.skillHrid || null')
			},
		)

		// getLeaderboardCategoriesBySkill
		this.builder.addFunction(
			'getLeaderboardCategoriesBySkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'const hrids = LEADERBOARD_CATEGORIES_BY_SKILL[skillHrid] || []',
				)
				writer.writeLine(
					'return hrids.map(hrid => LEADERBOARDCATEGORIES.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// getGuildLeaderboardCategories
		this.builder.addFunction(
			'getGuildLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return GUILD_LEADERBOARD_CATEGORIES.map(hrid => LEADERBOARDCATEGORIES.get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		// getPlayerLeaderboardCategories
		this.builder.addFunction(
			'getPlayerLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return PLAYER_LEADERBOARD_CATEGORIES.map(hrid => LEADERBOARDCATEGORIES.get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		// getSkillLeaderboardCategories
		this.builder.addFunction(
			'getSkillLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return SKILL_LEADERBOARD_CATEGORIES.map(hrid => LEADERBOARDCATEGORIES.get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		// getSpecialLeaderboardCategories
		this.builder.addFunction(
			'getSpecialLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return SPECIAL_LEADERBOARD_CATEGORIES.map(hrid => LEADERBOARDCATEGORIES.get(hrid as LeaderboardCategoryHrid)!).filter(Boolean)',
				)
			},
		)

		// getCombatLeaderboardCategories
		this.builder.addFunction(
			'getCombatLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine('// Returns categories for combat skills')
				writer.writeLine('const combatSkills = [')
				writer.writeLine("  '/skills/attack',")
				writer.writeLine("  '/skills/strength',")
				writer.writeLine("  '/skills/defense',")
				writer.writeLine("  '/skills/ranged',")
				writer.writeLine("  '/skills/magic',")
				writer.writeLine(']')
				writer.writeLine('')
				writer.writeLine('return Array.from(LEADERBOARDCATEGORIES.values())')
				writer.writeLine(
					'  .filter(cat => cat.skillHrid && combatSkills.includes(cat.skillHrid))',
				)
				writer.writeLine('  .sort((a, b) => a.sortIndex - b.sortIndex)')
			},
		)

		// getSkillingLeaderboardCategories
		this.builder.addFunction(
			'getSkillingLeaderboardCategories',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine('// Returns categories for non-combat skills')
				writer.writeLine('const combatSkills = [')
				writer.writeLine("  '/skills/attack',")
				writer.writeLine("  '/skills/strength',")
				writer.writeLine("  '/skills/defense',")
				writer.writeLine("  '/skills/ranged',")
				writer.writeLine("  '/skills/magic',")
				writer.writeLine(']')
				writer.writeLine('')
				writer.writeLine('return Array.from(LEADERBOARDCATEGORIES.values())')
				writer.writeLine(
					'  .filter(cat => cat.skillHrid && !combatSkills.includes(cat.skillHrid))',
				)
				writer.writeLine('  .sort((a, b) => a.sortIndex - b.sortIndex)')
			},
		)

		// sortLeaderboardCategoriesByIndex
		this.builder.addFunction(
			'sortLeaderboardCategoriesByIndex',
			[{ name: 'categories', type: 'LeaderboardCategory[]' }],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine(
					'return [...categories].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// getLeaderboardCategoryDisplayOrder
		this.builder.addFunction(
			'getLeaderboardCategoryDisplayOrder',
			[],
			'LeaderboardCategory[]',
			(writer) => {
				writer.writeLine('// Returns all categories in display order')
				writer.writeLine('return Array.from(LEADERBOARDCATEGORIES.values())')
				writer.writeLine('  .sort((a, b) => {')
				writer.writeLine('    // Guild categories first')
				writer.writeLine('    if (a.isGuild !== b.isGuild) {')
				writer.writeLine('      return a.isGuild ? -1 : 1')
				writer.writeLine('    }')
				writer.writeLine('    // Then by sort index')
				writer.writeLine('    return a.sortIndex - b.sortIndex')
				writer.writeLine('  })')
			},
		)
	}
}
