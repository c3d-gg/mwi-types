import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

interface RandomTaskType {
	hrid: string
	isCombat: boolean
	skillHrid: string | undefined
	sortIndex: number
}

/**
 * Modular RandomTasks Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularRandomTasksGenerator extends ModularBaseGenerator<RandomTaskType> {
	private uniqueSkillHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'RandomTaskType',
			entityNamePlural: 'RandomTaskTypes',
			sourceKey: 'randomTaskTypeDetailMap',
			outputPath: './src/generated/randomtasktypes/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, RandomTaskType> {
		const tasks: Record<string, RandomTaskType> = {}
		const taskMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(taskMap)) {
			const task = this.extractTask(hrid, data as any)
			tasks[hrid] = task
			this.collectUniqueValues(task)
		}

		console.log(`  🎲 Extracted ${Object.keys(tasks).length} random task types`)

		return tasks
	}

	private extractTask(hrid: string, data: any): RandomTaskType {
		return {
			hrid,
			isCombat: data.isCombat === true,
			skillHrid:
				data.skillHrid && data.skillHrid !== ''
					? data.skillHrid
					: undefined,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	protected override collectUniqueValues(task: RandomTaskType): void {
		if (task.skillHrid) {
			this.uniqueSkillHrids.add(task.skillHrid)
		}
	}

	protected override generateTypes(entities: Record<string, RandomTaskType>): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Since Skills is already modular, we can import and re-export SkillHrid
		if (this.uniqueSkillHrids.size > 0) {
			typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
			// Re-export SkillHrid so it's available from this module's types
			typesBuilder.addNamedExports({ 
				'SkillHrid': { from: '../skills/types.js', isType: true } 
			})
		}

		// Main RandomTaskType interface
		const taskProps: PropertyDefinition[] = [
			{ 
				name: 'hrid', 
				type: 'RandomTaskTypeHrid', 
				optional: false,
				description: 'Unique identifier for the random task type'
			},
			{ 
				name: 'isCombat', 
				type: 'boolean', 
				optional: false,
				description: 'Whether this is a combat-based task'
			},
			{ 
				name: 'skillHrid', 
				type: 'SkillHrid | undefined', 
				optional: false,
				description: 'Associated skill for non-combat tasks'
			},
			{ 
				name: 'sortIndex', 
				type: 'number', 
				optional: false,
				description: 'Display sort order'
			},
		]
		
		this.moduleBuilder.addInterface('RandomTaskType', taskProps)
		
		// Export the RandomTaskType interface
		this.moduleBuilder.addExport({ 
			name: 'RandomTaskType', 
			source: './types', 
			isType: true 
		})
	}

	protected override generateConstants(entities: Record<string, RandomTaskType>): void {
		// Call base to generate RANDOMTASKTYPE_HRIDS
		super.generateConstants(entities)

		const constantsBuilder = this.moduleBuilder.getFile('constants')
		
		// Separate combat and non-combat tasks
		const combatTasks: string[] = []
		const nonCombatTasks: string[] = []
		
		for (const [hrid, task] of Object.entries(entities)) {
			if (task.isCombat) {
				combatTasks.push(hrid)
			} else {
				nonCombatTasks.push(hrid)
			}
		}

		// Add combat and non-combat task arrays
		constantsBuilder.addConstArray('COMBAT_RANDOM_TASKS', combatTasks, true)
		constantsBuilder.addConstArray('NON_COMBAT_RANDOM_TASKS', nonCombatTasks, true)
		
		// Export the constants
		this.moduleBuilder.addExport({ 
			name: 'COMBAT_RANDOM_TASKS', 
			source: './constants', 
			isType: false 
		})
		this.moduleBuilder.addExport({ 
			name: 'NON_COMBAT_RANDOM_TASKS', 
			source: './constants', 
			isType: false 
		})
	}

	protected override generateLookups(entities: Record<string, RandomTaskType>): void {
		// Group tasks by skill
		const tasksBySkill: Record<string, string[]> = {}
		
		for (const [hrid, task] of Object.entries(entities)) {
			if (!task.isCombat && task.skillHrid) {
				if (!tasksBySkill[task.skillHrid]) {
					tasksBySkill[task.skillHrid] = []
				}
				tasksBySkill[task.skillHrid]!.push(hrid)
			}
		}

		// Add RANDOM_TASKS_BY_SKILL map using module builder
		if (Object.keys(tasksBySkill).length > 0) {
			// The module builder will automatically add the needed imports
			this.moduleBuilder.addStaticLookup(
				'RANDOM_TASKS_BY_SKILL',
				tasksBySkill,
				'SkillHrid',
				'readonly RandomTaskTypeHrid[]',
				true  // isPartial = true since not all skills have random tasks
			)
		}
	}

	protected override generateUtilities(entities: Record<string, RandomTaskType>): void {
		// Call base utilities first (get, require, getAll, type guard)
		super.generateUtilities(entities)

		// Add specialized utilities
		
		// getRandomTasksBySkill
		if (this.uniqueSkillHrids.size > 0) {
			this.moduleBuilder.addUtilityFunction(
				'getRandomTasksBySkill',
				[{ name: 'skillHrid', type: 'SkillHrid' }],
				'RandomTaskType[]',
				(writer) => {
					writer.writeLine('const hrids = RANDOM_TASKS_BY_SKILL[skillHrid] || []')
					writer.writeLine('return hrids.map(hrid => getRandomTaskTypesMap().get(hrid)!).filter(Boolean)')
				},
				[
					{ from: '../skills/types', names: ['SkillHrid'], isType: true },
					{ from: './types', names: ['RandomTaskType'], isType: true },
					{ from: './lookups', names: ['RANDOM_TASKS_BY_SKILL'] },
					{ from: './data', names: ['getRandomTaskTypesMap'] },
				]
			)
		}

		// getCombatRandomTasks
		this.moduleBuilder.addUtilityFunction(
			'getCombatRandomTasks',
			[],
			'RandomTaskType[]',
			(writer) => {
				writer.writeLine('return COMBAT_RANDOM_TASKS.map(hrid => getRandomTaskTypesMap().get(hrid as RandomTaskTypeHrid)!).filter(Boolean)')
			},
			[
				{ from: './types', names: ['RandomTaskType', 'RandomTaskTypeHrid'], isType: true },
				{ from: './constants', names: ['COMBAT_RANDOM_TASKS'] },
				{ from: './data', names: ['getRandomTaskTypesMap'] },
			]
		)

		// getNonCombatRandomTasks
		this.moduleBuilder.addUtilityFunction(
			'getNonCombatRandomTasks',
			[],
			'RandomTaskType[]',
			(writer) => {
				writer.writeLine('return NON_COMBAT_RANDOM_TASKS.map(hrid => getRandomTaskTypesMap().get(hrid as RandomTaskTypeHrid)!).filter(Boolean)')
			},
			[
				{ from: './types', names: ['RandomTaskType', 'RandomTaskTypeHrid'], isType: true },
				{ from: './constants', names: ['NON_COMBAT_RANDOM_TASKS'] },
				{ from: './data', names: ['getRandomTaskTypesMap'] },
			]
		)

		// isTaskAvailableForSkill
		if (this.uniqueSkillHrids.size > 0) {
			this.moduleBuilder.addUtilityFunction(
				'isTaskAvailableForSkill',
				[
					{ name: 'taskHrid', type: 'RandomTaskTypeHrid' },
					{ name: 'skillHrid', type: 'SkillHrid' },
				],
				'boolean',
				(writer) => {
					writer.writeLine('const task = getRandomTaskTypesMap().get(taskHrid)')
					writer.writeLine('if (!task) return false')
					writer.writeLine('return task.skillHrid === skillHrid')
				},
				[
					{ from: './types', names: ['RandomTaskTypeHrid'], isType: true },
					{ from: '../skills/types', names: ['SkillHrid'], isType: true },
					{ from: './data', names: ['getRandomTaskTypesMap'] },
				]
			)
		}

		// sortRandomTasksByIndex
		this.moduleBuilder.addUtilityFunction(
			'sortRandomTasksByIndex',
			[{ name: 'tasks', type: 'RandomTaskType[]' }],
			'RandomTaskType[]',
			(writer) => {
				writer.writeLine('return [...tasks].sort((a, b) => a.sortIndex - b.sortIndex)')
			},
			[
				{ from: './types', names: ['RandomTaskType'], isType: true },
			]
		)

		// findRandomTaskByName
		this.moduleBuilder.addUtilityFunction(
			'findRandomTaskByName',
			[{ name: 'searchTerm', type: 'string' }],
			'RandomTaskType | undefined',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine('return Array.from(getRandomTaskTypesMap().values()).find(task =>')
				writer.writeLine('  task.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
			[
				{ from: './types', names: ['RandomTaskType'], isType: true },
				{ from: './data', names: ['getRandomTaskTypesMap'] },
			]
		)

		// getRandomTasksCount
		this.moduleBuilder.addUtilityFunction(
			'getRandomTasksCount',
			[],
			'{ total: number, combat: number, nonCombat: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: getRandomTaskTypesMap().size,')
				writer.writeLine('  combat: COMBAT_RANDOM_TASKS.length,')
				writer.writeLine('  nonCombat: NON_COMBAT_RANDOM_TASKS.length')
				writer.writeLine('}')
			},
			[
				{ from: './data', names: ['getRandomTaskTypesMap'] },
				{ from: './constants', names: ['COMBAT_RANDOM_TASKS', 'NON_COMBAT_RANDOM_TASKS'] },
			]
		)
	}
}