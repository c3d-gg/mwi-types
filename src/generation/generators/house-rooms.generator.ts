import { BaseGenerator } from '../core/generator.base'

import type { ActionType } from '../../generated/types/actions'
import type { Buff, BuffTypeHrid } from '../../generated/types/buff-types'
import type { ItemHrid } from '../../generated/types/items'
import type { SkillHrid } from '../../generated/types/skills'
import type { GeneratorConfig } from '../core/generator.base'

export interface UpgradeCost {
	itemHrid: ItemHrid
	count: number
}

export interface HouseRoom {
	hrid: string
	name: string
	skillHrid: SkillHrid
	usableInActionTypeMap: Partial<Record<ActionType, boolean>>
	actionBuffs: Buff[]
	globalBuffs: Buff[]
	upgradeCostsMap: Record<string, UpgradeCost[]>
	sortIndex: number
}

export class HouseRoomsGenerator extends BaseGenerator<HouseRoom> {
	constructor() {
		super({
			entityName: 'HouseRoom',
			entityNamePlural: 'HouseRooms',
			sourceKey: 'houseRoomDetailMap',
			outputPath: 'src/generated/types/house-rooms.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, HouseRoom> {
		const entities: Record<string, HouseRoom> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] || {},
		)) {
			const roomData = data as any
			entities[hrid] = {
				hrid: roomData.hrid,
				name: roomData.name,
				skillHrid: roomData.skillHrid,
				usableInActionTypeMap: this.extractActionTypeMap(
					roomData.usableInActionTypeMap,
				),
				actionBuffs: this.extractBuffs(roomData.actionBuffs),
				globalBuffs: this.extractBuffs(roomData.globalBuffs),
				upgradeCostsMap: this.extractUpgradeCosts(roomData.upgradeCostsMap),
				sortIndex: roomData.sortIndex || 0,
			}
		}

		console.log(`  Extracted ${Object.keys(entities).length} house rooms`)

		return entities
	}

	private extractActionTypeMap(map: any): Partial<Record<ActionType, boolean>> {
		if (!map) return {}
		const result: Partial<Record<ActionType, boolean>> = {}
		for (const [key, value] of Object.entries(map)) {
			if (value === true) {
				result[key as ActionType] = true
			}
		}
		return result
	}

	private extractBuffs(buffs: any[]): Buff[] {
		if (!buffs || !Array.isArray(buffs)) return []

		return buffs.map((buff) => ({
			uniqueHrid: buff.uniqueHrid || '',
			typeHrid: buff.typeHrid as BuffTypeHrid,
			ratioBoost: buff.ratioBoost || 0,
			ratioBoostLevelBonus: buff.ratioBoostLevelBonus || 0,
			flatBoost: buff.flatBoost || 0,
			flatBoostLevelBonus: buff.flatBoostLevelBonus || 0,
			startTime: buff.startTime || '0001-01-01T00:00:00Z',
			duration: buff.duration || 0,
		}))
	}

	private extractUpgradeCosts(costsMap: any): Record<string, UpgradeCost[]> {
		if (!costsMap) return {}

		const result: Record<string, UpgradeCost[]> = {}
		for (const [level, costs] of Object.entries(costsMap)) {
			if (Array.isArray(costs)) {
				result[level] = costs.map((cost) => ({
					itemHrid: cost.itemHrid as ItemHrid,
					count: cost.count || 0,
				}))
			}
		}
		return result
	}

	protected override generateInterfaces(
		entities: Record<string, HouseRoom>,
	): void {
		// Import external types
		this.builder.addImport('./buff-types', ['Buff', 'BuffTypeHrid'], true)
		this.builder.addImport('./items', ['ItemHrid'], true)
		this.builder.addImport('./skills', ['SkillHrid'], true)
		this.builder.addImport('./actions', ['ActionType'], true)

		// Generate UpgradeCost interface
		this.builder.addInterface('UpgradeCost', [
			{
				name: 'itemHrid',
				type: 'ItemHrid',
				description: 'Item required for upgrade',
			},
			{
				name: 'count',
				type: 'number',
				description: 'Number of items required',
			},
		])

		// Generate HouseRoom interface
		this.builder.addInterface('HouseRoom', [
			{
				name: 'hrid',
				type: 'HouseRoomHrid',
				description: 'The unique house room identifier',
			},
			{
				name: 'name',
				type: 'string',
				description: 'Display name of the room',
			},
			{
				name: 'skillHrid',
				type: 'SkillHrid',
				description: 'The skill this room is associated with',
			},
			{
				name: 'usableInActionTypeMap',
				type: 'Partial<Record<ActionType, boolean>>',
				description: 'Which action types this room can be used for',
			},
			{
				name: 'actionBuffs',
				type: 'Buff[]',
				description: 'Buffs that apply to actions performed in this room',
			},
			{
				name: 'globalBuffs',
				type: 'Buff[]',
				description: 'Buffs that apply globally when this room is owned',
			},
			{
				name: 'upgradeCostsMap',
				type: 'Record<string, UpgradeCost[]>',
				description: 'Costs to upgrade to each level (level -> items required)',
			},
			{
				name: 'sortIndex',
				type: 'number',
				description: 'Display sort order',
			},
		])
	}

	protected override generateUtilities(
		entities: Record<string, HouseRoom>,
	): void {
		super.generateUtilities(entities)

		// Generate lookup maps
		this.generateLookupMaps(entities)

		// Generate specialized utility functions
		this.generateSpecializedUtils(entities)
	}

	private generateLookupMaps(entities: Record<string, HouseRoom>): void {
		// Group by skill
		const roomsBySkill: Record<string, string[]> = {}

		for (const [hrid, room] of Object.entries(entities)) {
			const skill = room.skillHrid
			if (!roomsBySkill[skill]) {
				roomsBySkill[skill] = []
			}
			roomsBySkill[skill].push(hrid)
		}

		// Generate rooms by skill lookup
		this.builder.addComment('Lookup map for house rooms by skill')
		this.builder.addConstVariable(
			'HOUSE_ROOMS_BY_SKILL',
			`Partial<Record<SkillHrid, readonly HouseRoomHrid[]>>`,
			(writer: any) => {
				writer.write('{')
				writer.newLine()
				for (const [skill, hrids] of Object.entries(roomsBySkill)) {
					writer.indent().write(`'${skill}': [`)
					hrids.forEach((hrid, index) => {
						writer.write(`'${hrid}'`)
						if (index < hrids.length - 1) writer.write(', ')
					})
					writer.write('],')
					writer.newLine()
				}
				writer.write('}')
			},
		)
	}

	private generateSpecializedUtils(entities: Record<string, HouseRoom>): void {
		// Get room by skill function
		this.builder.addFunction(
			'getHouseRoomBySkill',
			[{ name: 'skillHrid', type: 'SkillHrid' }],
			'HouseRoom | undefined',
			(writer) => {
				writer.writeLine(
					'const roomHrid = HOUSE_ROOMS_BY_SKILL[skillHrid]?.[0]',
				)
				writer.writeLine(
					'return roomHrid ? HOUSEROOMS.get(roomHrid) : undefined',
				)
			},
		)

		// Calculate upgrade cost function
		this.builder.addFunction(
			'getUpgradeCost',
			[
				{ name: 'room', type: 'HouseRoom' },
				{ name: 'targetLevel', type: 'number' },
			],
			'UpgradeCost[] | undefined',
			(writer) => {
				writer.writeLine('return room.upgradeCostsMap[targetLevel.toString()]')
			},
		)

		// Get total upgrade cost function (cumulative)
		this.builder.addFunction(
			'getTotalUpgradeCost',
			[
				{ name: 'room', type: 'HouseRoom' },
				{ name: 'fromLevel', type: 'number' },
				{ name: 'toLevel', type: 'number' },
			],
			'Map<ItemHrid, number>',
			(writer) => {
				writer.writeLine('const totalCosts = new Map<ItemHrid, number>()')
				writer.writeLine('')
				writer.writeLine(
					'for (let level = fromLevel + 1; level <= toLevel; level++) {',
				)
				writer
					.indent()
					.writeLine(
						'const levelCosts = room.upgradeCostsMap[level.toString()]',
					)
				writer.indent().writeLine('if (!levelCosts) continue')
				writer.indent().writeLine('')
				writer.indent().writeLine('for (const cost of levelCosts) {')
				writer
					.indent()
					.indent()
					.writeLine('const current = totalCosts.get(cost.itemHrid) || 0')
				writer
					.indent()
					.indent()
					.writeLine('totalCosts.set(cost.itemHrid, current + cost.count)')
				writer.indent().writeLine('}')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('return totalCosts')
			},
		)

		// Check if room provides action type buff
		this.builder.addFunction(
			'roomProvidesActionType',
			[
				{ name: 'room', type: 'HouseRoom' },
				{ name: 'actionType', type: 'ActionType' },
			],
			'boolean',
			(writer) => {
				writer.writeLine(
					'return room.usableInActionTypeMap[actionType] === true',
				)
			},
		)

		// Get all action buffs for a room at level
		this.builder.addFunction(
			'getRoomBuffsAtLevel',
			[
				{ name: 'room', type: 'HouseRoom' },
				{ name: 'level', type: 'number' },
			],
			'{ action: Buff[], global: Buff[] }',
			(writer) => {
				writer.writeLine('// Calculate buff values at the given level')
				writer.writeLine('const applyLevel = (buff: Buff): Buff => ({')
				writer.indent().writeLine('...buff,')
				writer
					.indent()
					.writeLine(
						'flatBoost: buff.flatBoost + (buff.flatBoostLevelBonus * level),',
					)
				writer
					.indent()
					.writeLine(
						'ratioBoost: buff.ratioBoost + (buff.ratioBoostLevelBonus * level),',
					)
				writer.writeLine('})')
				writer.writeLine('')
				writer.writeLine('return {')
				writer.indent().writeLine('action: room.actionBuffs.map(applyLevel),')
				writer.indent().writeLine('global: room.globalBuffs.map(applyLevel),')
				writer.writeLine('}')
			},
		)

		// Get max level for a room
		this.builder.addFunction(
			'getMaxRoomLevel',
			[{ name: 'room', type: 'HouseRoom' }],
			'number',
			(writer) => {
				writer.writeLine('const levels = Object.keys(room.upgradeCostsMap)')
				writer.writeLine(
					'return levels.length > 0 ? Math.max(...levels.map(Number)) : 0',
				)
			},
		)
	}
}
