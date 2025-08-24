import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig } from '../core/generator.base'

export interface BuffType {
	hrid: string
	name: string
	description: string
	debuffDescription: string
	isCombat: boolean
	sortIndex: number
}

export interface Buff {
	uniqueHrid: string
	typeHrid: string
	ratioBoost: number
	ratioBoostLevelBonus: number
	flatBoost: number
	flatBoostLevelBonus: number
	startTime: string
	duration: number
}

export class BuffTypesGenerator extends BaseGenerator<BuffType> {
	constructor() {
		super({
			entityName: 'BuffType',
			entityNamePlural: 'BuffTypes',
			sourceKey: 'buffTypeDetailMap',
			outputPath: 'src/generated/types/buff-types.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, BuffType> {
		const entities: Record<string, BuffType> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const buffData = data as any
			entities[hrid] = {
				hrid: buffData.hrid,
				name: buffData.name,
				description: buffData.description,
				debuffDescription: buffData.debuffDescription,
				isCombat: buffData.isCombat || false,
				sortIndex: buffData.sortIndex || 0,
			}
		}

		console.log(`  Extracted ${Object.keys(entities).length} buff types`)

		return entities
	}

	protected override generateInterfaces(
		entities: Record<string, BuffType>,
	): void {
		// Generate BuffType interface
		this.builder.addInterface('BuffType', [
			{
				name: 'hrid',
				type: 'BuffTypeHrid',
				description: 'The unique buff type identifier',
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the buff type',
			},
			{
				name: 'description',
				type: 'string',
				description: 'Description of the buff effect',
			},
			{
				name: 'debuffDescription',
				type: 'string',
				description: 'Description when used as a debuff',
			},
			{
				name: 'isCombat',
				type: 'boolean',
				description: 'Whether this buff applies in combat',
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Display sort order',
			},
		])

		// Generate Buff interface (for buff instances)
		this.builder.addInterface('Buff', [
			{
				name: 'uniqueHrid',
				type: 'string',
				description: 'Unique identifier for this buff instance',
			},
			{
				name: 'typeHrid',
				type: 'BuffTypeHrid',
				description: 'The buff type identifier',
			},
			{
				name: 'ratioBoost',
				type: 'number',
				description: 'Multiplicative boost value',
			},
			{
				name: 'ratioBoostLevelBonus',
				type: 'number',
				description: 'Additional ratio boost per level',
			},
			{
				name: 'flatBoost',
				type: 'number',
				description: 'Flat additive boost value',
			},
			{
				name: 'flatBoostLevelBonus',
				type: 'number',
				description: 'Additional flat boost per level',
			},
			{
				name: 'startTime',
				type: 'string',
				description: 'When the buff started (ISO timestamp)',
			},
			{
				name: 'duration',
				type: 'number',
				description: 'Duration in milliseconds (0 for permanent)',
			},
		])
	}

	protected override generateUtilities(
		entities: Record<string, BuffType>,
	): void {
		super.generateUtilities(entities)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate specialized utility functions
		this.generateSpecializedUtils(entities)
	}

	private generateLookupMaps(entities: Record<string, BuffType>): void {
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
		this.builder.addConstArray('COMBAT_BUFF_TYPES', combatBuffs.sort())

		// Non-combat buffs array
		this.builder.addConstArray('NON_COMBAT_BUFF_TYPES', nonCombatBuffs.sort())

		// Add utility comment
		this.builder.addComment('Lookup arrays for buff types by category')
	}

	private generateSpecializedUtils(entities: Record<string, BuffType>): void {
		// Get combat buffs function
		this.builder.addFunction(
			'getCombatBuffTypes',
			[],
			'BuffType[]',
			(writer) => {
				writer.writeLine('return COMBAT_BUFF_TYPES')
				writer
					.indent()
					.writeLine('.map(hrid => BUFFTYPES.get(hrid as BuffTypeHrid)!)')
				writer.indent().writeLine('.filter(Boolean)')
			},
		)

		// Get non-combat buffs function
		this.builder.addFunction(
			'getNonCombatBuffTypes',
			[],
			'BuffType[]',
			(writer) => {
				writer.writeLine('return NON_COMBAT_BUFF_TYPES')
				writer
					.indent()
					.writeLine('.map(hrid => BUFFTYPES.get(hrid as BuffTypeHrid)!)')
				writer.indent().writeLine('.filter(Boolean)')
			},
		)

		// Calculate buff value function
		this.builder.addFunction(
			'calculateBuffValue',
			[
				{ name: 'buff', type: 'Buff' },
				{ name: 'level', type: 'number' },
			],
			'{ flat: number; ratio: number }',
			(writer) => {
				writer.writeLine('return {')
				writer
					.indent()
					.writeLine(
						'flat: buff.flatBoost + (buff.flatBoostLevelBonus * level),',
					)
				writer
					.indent()
					.writeLine(
						'ratio: buff.ratioBoost + (buff.ratioBoostLevelBonus * level),',
					)
				writer.writeLine('}')
			},
		)

		// Check if buff is active function
		this.builder.addFunction(
			'isBuffActive',
			[
				{ name: 'buff', type: 'Buff' },
				{ name: 'currentTime', type: 'Date' },
			],
			'boolean',
			(writer) => {
				writer.writeLine(
					'if (buff.duration === 0) return true // Permanent buff',
				)
				writer.writeLine('const startTime = new Date(buff.startTime)')
				writer.writeLine(
					'const endTime = new Date(startTime.getTime() + buff.duration)',
				)
				writer.writeLine(
					'return currentTime >= startTime && currentTime < endTime',
				)
			},
		)

		// Get buff by partial name function
		this.builder.addFunction(
			'findBuffTypeByName',
			[{ name: 'partialName', type: 'string' }],
			'BuffType[]',
			(writer) => {
				writer.writeLine('const searchTerm = partialName.toLowerCase()')
				writer.writeLine('return Array.from(BUFFTYPES.values())')
				writer
					.indent()
					.writeLine(
						'.filter(buff => buff.name.toLowerCase().includes(searchTerm))',
					)
			},
		)
	}
}
