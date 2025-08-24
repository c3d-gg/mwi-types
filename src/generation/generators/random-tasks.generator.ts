import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface RandomTaskType {
	hrid: string
	isCombat: boolean
	skillHrid: string | undefined
	sortIndex: number
}

export class RandomTasksGenerator extends BaseGenerator<RandomTaskType> {
	private uniqueSkillHrids: Set<string> = new Set()

	constructor() {
		const config: GeneratorConfig = {
			entityName: 'RandomTaskType',
			entityNamePlural: 'RandomTaskTypes',
			sourceKey: 'randomTaskTypeDetailMap',
			outputPath: 'src/generated/types/random-tasks.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, RandomTaskType> {
		const tasks: Record<string, RandomTaskType> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const taskData = data as any
			const task: RandomTaskType = {
				hrid: taskData.hrid,
				isCombat: taskData.isCombat === true,
				skillHrid:
					taskData.skillHrid && taskData.skillHrid !== ''
						? taskData.skillHrid
						: undefined,
				sortIndex: taskData.sortIndex || 0,
			}

			tasks[hrid] = task
			this.collectUniqueValues(task)
		}

		return tasks
	}

	protected override collectUniqueValues(task: RandomTaskType): void {
		if (task.skillHrid) {
			this.uniqueSkillHrids.add(task.skillHrid)
		}
	}

	protected override generateInterfaces(
		_tasks: Record<string, RandomTaskType>,
	): void {
		// Import external types
		if (this.uniqueSkillHrids.size > 0) {
			this.builder.addImport('./skills', ['SkillHrid'], true)
		}

		// Generate main interface with JSDoc
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'RandomTaskTypeHrid',
				optional: false,
				description: 'Unique identifier for the random task type',
			},
			{
				name: 'isCombat',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a combat-based task',
			},
			{
				name: 'skillHrid',
				type: 'SkillHrid | undefined',
				optional: false,
				description: 'Associated skill for non-combat tasks',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		this.builder.addInterface('RandomTaskType', properties)
	}

	protected override generateUtilities(
		tasks: Record<string, RandomTaskType>,
	): void {
		// Call base utilities first
		super.generateUtilities(tasks)

		// Generate lookup maps
		this.generateLookupMaps(tasks)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(tasks: Record<string, RandomTaskType>): void {
		// Group tasks by skill
		const tasksBySkill: Record<string, string[]> = {}
		const combatTasks: string[] = []
		const nonCombatTasks: string[] = []

		for (const [hrid, task] of Object.entries(tasks)) {
			if (task.isCombat) {
				combatTasks.push(hrid)
			} else {
				nonCombatTasks.push(hrid)
				if (task.skillHrid) {
					if (!tasksBySkill[task.skillHrid]) {
						tasksBySkill[task.skillHrid] = []
					}
					tasksBySkill[task.skillHrid]!.push(hrid)
				}
			}
		}

		// Add RANDOM_TASKS_BY_SKILL map
		if (Object.keys(tasksBySkill).length > 0) {
			this.builder.addConstVariable(
				'RANDOM_TASKS_BY_SKILL',
				'Partial<Record<SkillHrid, readonly RandomTaskTypeHrid[]>>',
				tasksBySkill,
			)
		}

		// Add combat and non-combat task arrays
		this.builder.addConstArray('COMBAT_RANDOM_TASKS', combatTasks, true)
		this.builder.addConstArray('NON_COMBAT_RANDOM_TASKS', nonCombatTasks, true)
	}

	private generateSpecializedUtils(): void {
		// getRandomTasksBySkill
		if (this.uniqueSkillHrids.size > 0) {
			this.builder.addFunction(
				'getRandomTasksBySkill',
				[{ name: 'skillHrid', type: 'SkillHrid' }],
				'RandomTaskType[]',
				(writer) => {
					writer.writeLine(
						'const hrids = RANDOM_TASKS_BY_SKILL[skillHrid] || []',
					)
					writer.writeLine(
						'return hrids.map(hrid => RANDOMTASKTYPES.get(hrid)!).filter(Boolean)',
					)
				},
			)
		}

		// getCombatRandomTasks
		this.builder.addFunction(
			'getCombatRandomTasks',
			[],
			'RandomTaskType[]',
			(writer) => {
				writer.writeLine(
					'return COMBAT_RANDOM_TASKS.map(hrid => RANDOMTASKTYPES.get(hrid as RandomTaskTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// getNonCombatRandomTasks
		this.builder.addFunction(
			'getNonCombatRandomTasks',
			[],
			'RandomTaskType[]',
			(writer) => {
				writer.writeLine(
					'return NON_COMBAT_RANDOM_TASKS.map(hrid => RANDOMTASKTYPES.get(hrid as RandomTaskTypeHrid)!).filter(Boolean)',
				)
			},
		)

		// isTaskAvailableForSkill
		if (this.uniqueSkillHrids.size > 0) {
			this.builder.addFunction(
				'isTaskAvailableForSkill',
				[
					{ name: 'taskHrid', type: 'RandomTaskTypeHrid' },
					{ name: 'skillHrid', type: 'SkillHrid' },
				],
				'boolean',
				(writer) => {
					writer.writeLine('const task = RANDOMTASKTYPES.get(taskHrid)')
					writer.writeLine('if (!task) return false')
					writer.writeLine('return task.skillHrid === skillHrid')
				},
			)
		}

		// sortRandomTasksByIndex
		this.builder.addFunction(
			'sortRandomTasksByIndex',
			[{ name: 'tasks', type: 'RandomTaskType[]' }],
			'RandomTaskType[]',
			(writer) => {
				writer.writeLine(
					'return [...tasks].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// findRandomTaskByName
		this.builder.addFunction(
			'findRandomTaskByName',
			[{ name: 'searchTerm', type: 'string' }],
			'RandomTaskType | undefined',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine(
					'return Array.from(RANDOMTASKTYPES.values()).find(task =>',
				)
				writer.writeLine('  task.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// getRandomTasksCount
		this.builder.addFunction(
			'getRandomTasksCount',
			[],
			'{ total: number, combat: number, nonCombat: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: RANDOMTASKTYPES.size,')
				writer.writeLine('  combat: COMBAT_RANDOM_TASKS.length,')
				writer.writeLine('  nonCombat: NON_COMBAT_RANDOM_TASKS.length')
				writer.writeLine('}')
			},
		)
	}
}
