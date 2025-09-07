import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	InterfaceDefinition,
	UtilityDefinition,
} from '../../core/types'

// Internal interface for TypeScript typing (NOT exported)
interface RandomTaskType {
	hrid: string
	isCombat: boolean
	skillHrid: string | null
	sortIndex: number
}

export class ModularRandomTasksGenerator extends ModularBaseGenerator<RandomTaskType> {
	constructor() {
		super({
			entityName: 'RandomTaskType',
			entityNamePlural: 'RandomTaskTypes',
			sourceKey: 'randomTaskTypeDetailMap',
			outputPath: 'src/generated/randomtasktypes',
			
			// Preserve empty strings for skillHrid
			applyDataCleaning: false,

			// Use utility templates
			utilityTemplates: [
				{ type: 'toMap' },
				{ type: 'sortBy', field: 'sortIndex' },
			],

			// Auto-generate category constants
			categoryFilters: [
				{
					name: 'COMBAT_RANDOMTASKTYPES',
					condition: (task: RandomTaskType) => task.isCombat === true,
				},
				{
					name: 'SKILL_RANDOMTASKTYPES',
					condition: (task: RandomTaskType) => task.isCombat === false,
				},
			],
		})
	}

	// MANDATORY explicit interface definition (prevents HridHrid + duplication bugs)
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'RandomTaskType',
				properties: [
					{ name: 'hrid', type: 'RandomTaskTypeHrid' },
					{ name: 'isCombat', type: 'boolean' },
					{ name: 'skillHrid', type: 'SkillHrid | null' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	/**
	 * Extension hook: Add imports for external types
	 */
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import SkillHrid from skills module
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
	}

	// Custom utilities
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getCombatRandomTasks',
				parameters: [],
				returnType: 'RandomTaskType[]',
				implementation: (writer) => {
					writer.writeLine('const record = getRandomTaskTypesRecord()')
					writer.writeLine('return COMBAT_RANDOMTASKTYPES.map(hrid => record[hrid as RandomTaskTypeHrid])')
				},
				jsDoc: {
					description: 'Get all combat random task types',
					returns: 'Array of combat random task types',
				},
			},
			{
				name: 'getSkillRandomTasks',
				parameters: [],
				returnType: 'RandomTaskType[]',
				implementation: (writer) => {
					writer.writeLine('const record = getRandomTaskTypesRecord()')
					writer.writeLine('return SKILL_RANDOMTASKTYPES.map(hrid => record[hrid as RandomTaskTypeHrid])')
				},
				jsDoc: {
					description: 'Get all skill-based random task types',
					returns: 'Array of skill random task types',
				},
			},
			{
				name: 'getRandomTasksBySkill',
				parameters: [
					{ name: 'skillHrid', type: 'SkillHrid' },
				],
				returnType: 'RandomTaskType[]',
				implementation: (writer) => {
					writer.writeLine('return getAllRandomTaskTypes().filter(task => task.skillHrid === skillHrid)')
				},
				jsDoc: {
					description: 'Get all random task types for a specific skill',
					param: { skillHrid: 'The skill HRID to filter by' },
					returns: 'Array of random task types for the skill',
				},
			},
		]
	}

	// For simple entities: Use transformEntity hook
	protected override transformEntity(rawData: any): RandomTaskType {
		return {
			hrid: rawData.hrid,
			isCombat: rawData.isCombat === true,
			skillHrid: rawData.skillHrid || null,
			sortIndex: rawData.sortIndex || 0,
		}
	}

	// Extension hook: Add imports needed for utilities
	protected override extendUtilities(): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')
		// Import the category constants from constants file
		utilsBuilder.addImport('./constants', ['COMBAT_RANDOMTASKTYPES', 'SKILL_RANDOMTASKTYPES'], false)
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularRandomTasksGenerator()
	await generator.generate('./src/sources/game_data.json')
}