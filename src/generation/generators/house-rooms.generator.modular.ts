import { ModularBaseGenerator } from '../core/generator.base.modular'
// Shared types - these interfaces are defined in the shared module
// They will be properly imported in generateTypes() method
interface UpgradeCost {
	itemHrid: string
	count: number
}

import type { PropertyDefinition } from '../core/ast-builder'

// Buff interface for internal use (temporary until buff-types is modularized)
interface Buff {
	uniqueHrid: string
	typeHrid: string // BuffTypeHrid
	ratioBoost: number
	ratioBoostLevelBonus: number
	flatBoost: number
	flatBoostLevelBonus: number
	startTime: string
	duration: number
}

// House room interface for internal use
interface HouseRoom {
	hrid: string
	name: string
	skillHrid: string
	usableInActionTypeMap: Record<string, boolean>
	actionBuffs: Buff[]
	globalBuffs: Buff[]
	upgradeCostsMap: Record<string, UpgradeCost[]>
	sortIndex: number
}

/**
 * Modular HouseRooms Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularHouseRoomsGenerator extends ModularBaseGenerator<HouseRoom> {
	// Collect unique values for lookups
	private roomsBySkill: Map<string, string[]> = new Map()
	private roomsWithActionBuffs: string[] = []
	private roomsWithGlobalBuffs: string[] = []
	private skillHrids: Set<string> = new Set()
	private actionTypes: Set<string> = new Set()
	private buffTypeHrids: Set<string> = new Set()

	constructor() {
		super({
			entityName: 'HouseRoom',
			entityNamePlural: 'HouseRooms',
			sourceKey: 'houseRoomDetailMap',
			outputPath: './src/generated/houserooms/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, HouseRoom> {
		const rooms: Record<string, HouseRoom> = {}
		const houseRoomDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(houseRoomDetailMap)) {
			const room = this.extractHouseRoom(hrid as string, data as any)
			rooms[hrid] = room
			this.collectForLookups(room)
		}

		console.log(`  🏠 Extracted ${Object.keys(rooms).length} house rooms`)
		console.log(`  🎯 ${this.roomsBySkill.size} unique skills`)
		console.log(`  ⚡ ${this.roomsWithActionBuffs.length} rooms with action buffs`)
		console.log(`  🌍 ${this.roomsWithGlobalBuffs.length} rooms with global buffs`)

		return rooms
	}

	private extractHouseRoom(hrid: string, data: any): HouseRoom {
		const actionBuffs = this.extractBuffs(data.actionBuffs || [])
		const globalBuffs = this.extractBuffs(data.globalBuffs || [])
		const usableInActionTypeMap = this.extractActionTypeMap(data.usableInActionTypeMap || {})
		const upgradeCostsMap = this.extractUpgradeCosts(data.upgradeCostsMap || {})

		const room: HouseRoom = {
			hrid,
			name: data.name || '',
			skillHrid: data.skillHrid || '',
			usableInActionTypeMap,
			actionBuffs,
			globalBuffs,
			upgradeCostsMap,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}

		return this.cleanEntityData(room) as HouseRoom
	}

	private extractActionTypeMap(map: any): Record<string, boolean> {
		const result: Record<string, boolean> = {}
		for (const [key, value] of Object.entries(map)) {
			if (value === true) {
				result[key] = true
				this.actionTypes.add(key)
			}
		}
		return result
	}

	private extractBuffs(buffs: any[]): Buff[] {
		if (!buffs || !Array.isArray(buffs)) return []

		return buffs.map((buff) => {
			if (buff.typeHrid) this.buffTypeHrids.add(buff.typeHrid)
			return {
				uniqueHrid: buff.uniqueHrid || '',
				typeHrid: buff.typeHrid || '',
				ratioBoost: typeof buff.ratioBoost === 'number' ? buff.ratioBoost : 0,
				ratioBoostLevelBonus: typeof buff.ratioBoostLevelBonus === 'number' ? buff.ratioBoostLevelBonus : 0,
				flatBoost: typeof buff.flatBoost === 'number' ? buff.flatBoost : 0,
				flatBoostLevelBonus: typeof buff.flatBoostLevelBonus === 'number' ? buff.flatBoostLevelBonus : 0,
				startTime: buff.startTime || '0001-01-01T00:00:00Z',
				duration: typeof buff.duration === 'number' ? buff.duration : 0,
			}
		})
	}

	private extractUpgradeCosts(costsMap: any): Record<string, UpgradeCost[]> {
		const result: Record<string, UpgradeCost[]> = {}
		for (const [level, costs] of Object.entries(costsMap)) {
			if (Array.isArray(costs)) {
				result[level] = costs.map((cost) => ({
					itemHrid: cost.itemHrid || '',
					count: typeof cost.count === 'number' ? cost.count : 0,
				}))
			}
		}
		return result
	}

	private collectForLookups(room: HouseRoom): void {
		// Group by skill
		if (room.skillHrid) {
			this.skillHrids.add(room.skillHrid)
			if (!this.roomsBySkill.has(room.skillHrid)) {
				this.roomsBySkill.set(room.skillHrid, [])
			}
			this.roomsBySkill.get(room.skillHrid)!.push(room.hrid)
		}

		// Track rooms with buffs
		if (room.actionBuffs.length > 0) {
			this.roomsWithActionBuffs.push(room.hrid)
		}
		if (room.globalBuffs.length > 0) {
			this.roomsWithGlobalBuffs.push(room.hrid)
		}
	}

	protected override generateTypes(entities: Record<string, HouseRoom>): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import types from other modules (DO NOT re-export - domain boundary)
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		typesBuilder.addImport('../bufftypes/types', ['Buff', 'BuffTypeHrid'], true)
		typesBuilder.addImport('../actions/types', ['ActionType'], true)
		
		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['HOUSEROOM_HRIDS'], false)
		
		// Derive HouseRoomHrid type from constants
		typesBuilder.addType('HouseRoomHrid', 'typeof HOUSEROOM_HRIDS[number]')
		
		// Import shared types from shared module
		typesBuilder.addImport('../sharedtypes/types', ['UpgradeCost'], true)
		
		// HouseRoom interface
		const houseRoomProps: PropertyDefinition[] = [
			{ name: 'hrid', type: 'HouseRoomHrid', description: 'Unique identifier for the house room' },
			{ name: 'name', type: 'string', description: 'Display name of the room' },
			{ name: 'skillHrid', type: 'SkillHrid', description: 'Associated skill for this room' },
			{ name: 'usableInActionTypeMap', type: 'Partial<Record<ActionType, boolean>>', description: 'Action types this room can be used with' },
			{ name: 'actionBuffs', type: 'Buff[]', description: 'Buffs applied to actions in this room' },
			{ name: 'globalBuffs', type: 'Buff[]', description: 'Global buffs applied by this room' },
			{ name: 'upgradeCostsMap', type: 'Record<string, UpgradeCost[]>', description: 'Upgrade costs by level' },
			{ name: 'sortIndex', type: 'number', description: 'Display sort order' },
		]
		typesBuilder.addInterface('HouseRoom', houseRoomProps)
		
		// Export only types that belong to this module (DO NOT export imported types)
		const types = [
			'HouseRoomHrid',
			'HouseRoom',
		]
		// Re-export UpgradeCost for convenience
		// UpgradeCost is from shared module - not exported from here
		types.forEach(name => {
			this.moduleBuilder.addExport({ name, source: './types', isType: true })
		})
	}

	protected override generateConstants(entities: Record<string, HouseRoom>): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HOUSEROOM_HRIDS array
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('HOUSEROOM_HRIDS', hrids)

		// Generate category arrays
		constantsBuilder.addConstArray('ROOMS_WITH_ACTION_BUFFS', this.roomsWithActionBuffs.sort(), true)
		constantsBuilder.addConstArray('ROOMS_WITH_GLOBAL_BUFFS', this.roomsWithGlobalBuffs.sort(), true)

		// Export from module
		this.moduleBuilder.addExport({ name: 'HOUSEROOM_HRIDS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'ROOMS_WITH_ACTION_BUFFS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'ROOMS_WITH_GLOBAL_BUFFS', source: './constants' })
	}

	// generateLazyData is handled by the base class

	protected override generateLookups(entities: Record<string, HouseRoom>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['HouseRoomHrid'], true)

		// Sort and convert skill Map entries to object format
		const skillMapEntries = Array.from(this.roomsBySkill.entries())
			.sort(([a], [b]) => a.localeCompare(b))

		// Build the object literal for ROOMS_BY_SKILL
		const skillLookupObject: Record<string, readonly string[]> = {}
		for (const [skill, hrids] of skillMapEntries) {
			skillLookupObject[skill] = hrids.sort()
		}

		if (Object.keys(skillLookupObject).length > 0) {
			lookupsBuilder.addStaticLookup(
				'ROOMS_BY_SKILL',
				'string',
				'readonly HouseRoomHrid[]',
				skillLookupObject,
			)

			// Export from module
			this.moduleBuilder.addExport({ name: 'ROOMS_BY_SKILL', source: './lookups' })
		}

		// Generate upgrade cost summary
		const upgradesByCost: Map<number, string[]> = new Map()
		for (const [hrid, room] of Object.entries(entities)) {
			const totalUpgrades = Object.keys(room.upgradeCostsMap).length
			if (totalUpgrades > 0) {
				if (!upgradesByCost.has(totalUpgrades)) {
					upgradesByCost.set(totalUpgrades, [])
				}
				upgradesByCost.get(totalUpgrades)!.push(hrid)
			}
		}

		if (upgradesByCost.size > 0) {
			const upgradesCostObject: Record<number, readonly string[]> = {}
			Array.from(upgradesByCost.entries())
				.sort(([a], [b]) => a - b)
				.forEach(([level, hrids]) => {
					upgradesCostObject[level] = hrids.sort()
				})

			lookupsBuilder.addStaticLookup(
				'ROOMS_BY_UPGRADE_LEVELS',
				'number',
				'readonly HouseRoomHrid[]',
				upgradesCostObject,
			)

			this.moduleBuilder.addExport({ name: 'ROOMS_BY_UPGRADE_LEVELS', source: './lookups' })
		}
	}

	protected override generateUtilities(entities: Record<string, HouseRoom>): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types
		utilsBuilder.addImport('./types', [
			'HouseRoom',
			'HouseRoomHrid',
		], true)
		utilsBuilder.addImport('../sharedtypes/types', ['UpgradeCost'], true)
		utilsBuilder.addImport('./data', ['getHouseRoomsMap'], false)
		utilsBuilder.addImport('./constants', [
			'HOUSEROOM_HRIDS',
			'ROOMS_WITH_ACTION_BUFFS',
			'ROOMS_WITH_GLOBAL_BUFFS',
		], false)
		utilsBuilder.addImport('./lookups', [
			'ROOMS_BY_SKILL',
		], false)

		// Standard utility functions
		utilsBuilder.addFunction(
			'isHouseRoomHrid',
			[{ name: 'value', type: 'string' }],
			'value is HouseRoomHrid',
			(writer) => {
				writer.writeLine('return HOUSEROOM_HRIDS.includes(value as HouseRoomHrid)')
			}
		)

		utilsBuilder.addFunction(
			'getHouseRoom',
			[{ name: 'hrid', type: 'HouseRoomHrid' }],
			'HouseRoom | undefined',
			(writer) => {
				writer.writeLine('return getHouseRoomsMap().get(hrid)')
			}
		)

		utilsBuilder.addFunction(
			'requireHouseRoom',
			[{ name: 'hrid', type: 'HouseRoomHrid' }],
			'HouseRoom',
			(writer) => {
				writer.writeLine('const room = getHouseRoom(hrid)')
				writer.writeLine('if (!room) {')
				writer.indent(() => {
					writer.writeLine(`throw new Error(\`HouseRoom not found: \${hrid}\`)`)
				})
				writer.writeLine('}')
				writer.writeLine('return room')
			}
		)

		utilsBuilder.addFunction(
			'getAllHouseRooms',
			[],
			'HouseRoom[]',
			(writer) => {
				writer.writeLine('return Array.from(getHouseRoomsMap().values())')
			}
		)

		// Specialized utility functions
		utilsBuilder.addFunction(
			'getHouseRoomsBySkill',
			[{ name: 'skillHrid', type: 'string' }],
			'HouseRoom[]',
			(writer) => {
				writer.writeLine('const hrids = ROOMS_BY_SKILL?.[skillHrid] || []')
				writer.writeLine('return hrids.map(hrid => getHouseRoom(hrid)!).filter(Boolean)')
			}
		)

		utilsBuilder.addFunction(
			'getRoomsWithActionBuffs',
			[],
			'HouseRoom[]',
			(writer) => {
				writer.writeLine('return ROOMS_WITH_ACTION_BUFFS.map(hrid => getHouseRoom(hrid as HouseRoomHrid)!).filter(Boolean)')
			}
		)

		utilsBuilder.addFunction(
			'getRoomsWithGlobalBuffs',
			[],
			'HouseRoom[]',
			(writer) => {
				writer.writeLine('return ROOMS_WITH_GLOBAL_BUFFS.map(hrid => getHouseRoom(hrid as HouseRoomHrid)!).filter(Boolean)')
			}
		)

		utilsBuilder.addFunction(
			'getRoomsForActionType',
			[{ name: 'actionType', type: 'string' }],
			'HouseRoom[]',
			(writer) => {
				writer.writeLine('return getAllHouseRooms().filter(room => ')
				writer.indent(() => {
					writer.writeLine('room.usableInActionTypeMap[actionType as keyof typeof room.usableInActionTypeMap] === true')
				})
				writer.writeLine(')')
			}
		)

		utilsBuilder.addFunction(
			'calculateUpgradeCost',
			[
				{ name: 'houseRoomHrid', type: 'HouseRoomHrid' },
				{ name: 'toLevel', type: 'string' }
			],
			'UpgradeCost[] | undefined',
			(writer) => {
				writer.writeLine('const room = getHouseRoom(houseRoomHrid)')
				writer.writeLine('if (!room) return undefined')
				writer.writeLine('return room.upgradeCostsMap[toLevel]')
			}
		)

		utilsBuilder.addFunction(
			'getMaxUpgradeLevel',
			[{ name: 'houseRoomHrid', type: 'HouseRoomHrid' }],
			'string | undefined',
			(writer) => {
				writer.writeLine('const room = getHouseRoom(houseRoomHrid)')
				writer.writeLine('if (!room) return undefined')
				writer.writeLine('const levels = Object.keys(room.upgradeCostsMap)')
				writer.writeLine('if (levels.length === 0) return undefined')
				writer.writeLine('return levels.sort((a, b) => parseInt(b) - parseInt(a))[0]')
			}
		)

		utilsBuilder.addFunction(
			'searchHouseRooms',
			[{ name: 'query', type: 'string' }],
			'HouseRoom[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('return getAllHouseRooms().filter(room => ')
				writer.indent(() => {
					writer.writeLine('room.name.toLowerCase().includes(lowerQuery) ||')
					writer.writeLine('room.hrid.toLowerCase().includes(lowerQuery)')
				})
				writer.writeLine(')')
			}
		)

		utilsBuilder.addFunction(
			'getHouseRoomsSortedByIndex',
			[],
			'HouseRoom[]',
			(writer) => {
				writer.writeLine('return getAllHouseRooms().sort((a, b) => a.sortIndex - b.sortIndex)')
			}
		)

		// Export from module
		const utils = [
			'isHouseRoomHrid',
			'getHouseRoom',
			'requireHouseRoom',
			'getAllHouseRooms',
			'getHouseRoomsBySkill',
			'getRoomsWithActionBuffs',
			'getRoomsWithGlobalBuffs',
			'getRoomsForActionType',
			'calculateUpgradeCost',
			'getMaxUpgradeLevel',
			'searchHouseRooms',
			'getHouseRoomsSortedByIndex',
		]
		utils.forEach(name => {
			this.moduleBuilder.addExport({ name, source: './utils' })
		})
	}
}