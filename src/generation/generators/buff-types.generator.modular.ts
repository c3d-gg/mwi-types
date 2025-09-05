import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

interface BuffType {
	hrid: string
	name: string
	description: string
	debuffDescription: string
	isCombat: boolean
	sortIndex: number
}

interface Buff {
	uniqueHrid: string
	typeHrid: string
	ratioBoost: number
	ratioBoostLevelBonus: number
	flatBoost: number
	flatBoostLevelBonus: number
	startTime: string
	duration: number
}

/**
 * Modular BuffTypes Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularBuffTypesGenerator extends ModularBaseGenerator<BuffType> {
	constructor() {
		super({
			entityName: 'BuffType',
			entityNamePlural: 'BuffTypes',
			sourceKey: 'buffTypeDetailMap',
			outputPath: './src/generated/buff-types/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, BuffType> {
		const buffTypes: Record<string, BuffType> = {}
		const buffMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(buffMap)) {
			const buffType = this.extractBuffType(hrid, data as any)
			buffTypes[hrid] = buffType
		}

		console.log(`  💫 Extracted ${Object.keys(buffTypes).length} buff types`)

		return buffTypes
	}

	private extractBuffType(hrid: string, data: any): BuffType {
		return {
			hrid,
			name: data.name || '',
			description: data.description || '',
			debuffDescription: data.debuffDescription || '',
			isCombat: data.isCombat === true,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}
	}

	protected override generateTypes(entities: Record<string, BuffType>): void {
		// Main BuffType interface
		const buffTypeProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'BuffTypeHrid', optional: false },
			{ name: 'name', type: 'string', optional: false },
			{ name: 'description', type: 'string', optional: false },
			{ name: 'debuffDescription', type: 'string', optional: false },
			{ name: 'isCombat', type: 'boolean', optional: false },
			{ name: 'sortIndex', type: 'number', optional: false },
		]
		this.moduleBuilder.addInterface('BuffType', buffTypeProps)
		
		// Buff instance interface
		const buffProps: PropertyDefinition[] = [
			{ name: 'uniqueHrid', type: 'string', optional: false },
			{ name: 'typeHrid', type: 'BuffTypeHrid', optional: false },
			{ name: 'ratioBoost', type: 'number', optional: false },
			{ name: 'ratioBoostLevelBonus', type: 'number', optional: false },
			{ name: 'flatBoost', type: 'number', optional: false },
			{ name: 'flatBoostLevelBonus', type: 'number', optional: false },
			{ name: 'startTime', type: 'string', optional: false },
			{ name: 'duration', type: 'number', optional: false },
		]
		this.moduleBuilder.addInterface('Buff', buffProps)
		
		// Export the interfaces
		this.moduleBuilder.addExport({ name: 'BuffType', source: './types', isType: true })
		this.moduleBuilder.addExport({ name: 'Buff', source: './types', isType: true })
	}

	protected override generateLookups(entities: Record<string, BuffType>): void {
		const lookups = this.moduleBuilder.getFile('lookups')
		
		// Group by combat/non-combat
		const combatBuffs: string[] = []
		const nonCombatBuffs: string[] = []

		for (const [hrid, buff] of Object.entries(entities)) {
			if (buff.isCombat) {
				combatBuffs.push(hrid)
			} else {
				nonCombatBuffs.push(hrid)
			}
		}

		// Combat buffs array
		lookups.addConstArray('COMBAT_BUFF_TYPE_HRIDS', combatBuffs.sort())
		
		// Non-combat buffs array
		lookups.addConstArray('NON_COMBAT_BUFF_TYPE_HRIDS', nonCombatBuffs.sort())
	}

	protected override generateUtilities(entities: Record<string, BuffType>): void {
		// Call base utilities first
		super.generateUtilities(entities)

		// Get combat buff types
		this.moduleBuilder.addUtilityFunction(
			'getCombatBuffTypes',
			[],
			'BuffType[]',
			(writer) => {
				writer.writeLine('return COMBAT_BUFF_TYPE_HRIDS')
				writer.indent().writeLine('.map(hrid => getBuffType(hrid as BuffTypeHrid))')
				writer.indent().writeLine('.filter((buff): buff is BuffType => buff !== undefined)')
			},
			[
				{ from: './types', names: ['BuffType', 'BuffTypeHrid'], isType: true },
				{ from: './lookups', names: ['COMBAT_BUFF_TYPE_HRIDS'] },
			]
		)

		// Get non-combat buff types
		this.moduleBuilder.addUtilityFunction(
			'getNonCombatBuffTypes',
			[],
			'BuffType[]',
			(writer) => {
				writer.writeLine('return NON_COMBAT_BUFF_TYPE_HRIDS')
				writer.indent().writeLine('.map(hrid => getBuffType(hrid as BuffTypeHrid))')
				writer.indent().writeLine('.filter((buff): buff is BuffType => buff !== undefined)')
			},
			[
				{ from: './types', names: ['BuffType', 'BuffTypeHrid'], isType: true },
				{ from: './lookups', names: ['NON_COMBAT_BUFF_TYPE_HRIDS'] },
			]
		)

		// Calculate buff value
		this.moduleBuilder.addUtilityFunction(
			'calculateBuffValue',
			[
				{ name: 'buff', type: 'Buff' },
				{ name: 'level', type: 'number' },
			],
			'{ flat: number; ratio: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.indent().writeLine('flat: buff.flatBoost + (buff.flatBoostLevelBonus * level),')
				writer.indent().writeLine('ratio: buff.ratioBoost + (buff.ratioBoostLevelBonus * level),')
				writer.writeLine('}')
			},
			[
				{ from: './types', names: ['Buff'], isType: true },
			]
		)

		// Check if buff is active
		this.moduleBuilder.addUtilityFunction(
			'isBuffActive',
			[
				{ name: 'buff', type: 'Buff' },
				{ name: 'currentTime', type: 'Date' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('if (buff.duration === 0) return true // Permanent buff')
				writer.writeLine('const startTime = new Date(buff.startTime)')
				writer.writeLine('const endTime = new Date(startTime.getTime() + buff.duration)')
				writer.writeLine('return currentTime >= startTime && currentTime < endTime')
			},
			[
				{ from: './types', names: ['Buff'], isType: true },
			]
		)

		// Find buff type by name
		this.moduleBuilder.addUtilityFunction(
			'findBuffTypeByName',
			[{ name: 'partialName', type: 'string' }],
			'BuffType[]',
			(writer) => {
				writer.writeLine('const searchTerm = partialName.toLowerCase()')
				writer.writeLine('return getAllBuffTypes()')
				writer.indent().writeLine('.filter(buff => buff.name.toLowerCase().includes(searchTerm))')
			},
			[
				{ from: './types', names: ['BuffType'], isType: true },
			]
		)

		// Sort buff types by index
		this.moduleBuilder.addUtilityFunction(
			'sortBuffTypesByIndex',
			[{ name: 'types', type: 'BuffType[]' }],
			'BuffType[]',
			(writer) => {
				writer.writeLine('return [...types].sort((a, b) => a.sortIndex - b.sortIndex)')
			},
			[
				{ from: './types', names: ['BuffType'], isType: true },
			]
		)
	}
}