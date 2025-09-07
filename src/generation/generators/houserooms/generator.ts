import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	ConstantDefinition,
	InterfaceDefinition,
	LookupDefinition,
	UtilityDefinition,
} from '../../core/types'

interface HouseRoomBuff {
	uniqueHrid: string
	typeHrid: string
	ratioBoost: number
	ratioBoostLevelBonus: number
	flatBoost: number
	flatBoostLevelBonus: number
	startTime: string
	duration: number
}

interface UpgradeCost {
	itemHrid: string
	count: number
}

interface HouseRoom {
	hrid: string
	name: string
	skillHrid: string
	sortIndex: number
	usableInActionTypeMap: Record<string, boolean>
	actionBuffs: HouseRoomBuff[] | null
	globalBuffs: HouseRoomBuff[] | null
	upgradeCostsMap: Record<string, UpgradeCost[]>
}

/**
 * Modular House Rooms Generator using the hook system
 *
 * This generator follows the v1.0 architecture principles:
 * - Uses defineInterfaces() hook for type generation
 * - Uses defineConstants() hook for custom constants
 * - Uses defineLookups() hook for lookup tables
 * - Uses defineUtilities() hook for custom utilities
 * - Uses transformEntity() for simple data transformation
 *
 * @see ARCHITECTURE.md for hook system documentation
 */
export class ModularHouseRoomsGenerator extends ModularBaseGenerator<HouseRoom> {
	// Collect unique values for lookups
	private roomsBySkill: Map<string, string[]> = new Map()
	private roomsWithActionBuffs: string[] = []
	private roomsWithGlobalBuffs: string[] = []
	private maxUpgradeLevel = 0

	constructor() {
		super({
			entityName: 'HouseRoom',
			entityNamePlural: 'HouseRooms',
			sourceKey: 'houseRoomDetailMap',
			outputPath: 'src/generated/houserooms',

			// Feature flags (all true by default, but being explicit)
			generateHrids: true,
			generateCollection: true,
			generateConstants: true,
			generateUtils: true,
			generateLookups: true,
			// Enable data cleaning for house rooms (simpler structure than Actions)
			applyDataCleaning: true,

			// Import shared types this generator needs
			sharedTypes: [
				'ActionItem', // For upgrade costs structure if needed
			],

			// Standard utility templates to include
			utilityTemplates: [
				{ type: 'getByField', field: 'skillHrid' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'filterBy' }, // Generic filterHouseRooms function
				{ type: 'toMap' }, // Convert Record to Map
			],

			// Category filters for auto-generating constant arrays
			categoryFilters: [
				{
					name: 'withActionBuffs',
					condition: (room: any) =>
						room.actionBuffs && room.actionBuffs.length > 0,
				},
				{
					name: 'withGlobalBuffs',
					condition: (room: any) =>
						room.globalBuffs && room.globalBuffs.length > 0,
				},
			],
		})
	}

	/**
	 * Extract entities from source data - override to ensure proper data collection
	 */
	public override extractEntities(sourceData: any): Record<string, HouseRoom> {
		const rooms: Record<string, HouseRoom> = {}
		const houseRoomDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(houseRoomDetailMap)) {
			const room = this.extractHouseRoom(hrid as string, data as any)
			rooms[hrid] = room
			this.collectForLookups(room)
		}

		console.log(`  ⚡ Extracted ${Object.keys(rooms).length} house rooms`)
		console.log(`  🏠 Max upgrade level: ${this.maxUpgradeLevel}`)
		console.log(`  🎯 ${this.roomsBySkill.size} skills represented`)
		console.log(
			`  💪 ${this.roomsWithActionBuffs.length} rooms with action buffs`,
		)
		console.log(
			`  🌍 ${this.roomsWithGlobalBuffs.length} rooms with global buffs`,
		)

		return rooms
	}

	/**
	 * Extract individual house room data
	 */
	private extractHouseRoom(hrid: string, data: any): HouseRoom {
		return {
			hrid,
			name: data.name || '',
			skillHrid: data.skillHrid || '',
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
			usableInActionTypeMap: data.usableInActionTypeMap || {},
			actionBuffs: this.extractBuffs(data.actionBuffs),
			globalBuffs: this.extractBuffs(data.globalBuffs),
			upgradeCostsMap: this.extractUpgradeCosts(data.upgradeCostsMap),
		}
	}

	/**
	 * Define interfaces using the hook system
	 */
	protected override defineInterfaces(): InterfaceDefinition[] {
		const interfaces: InterfaceDefinition[] = []

		// Define HouseRoomBuff interface
		interfaces.push({
			name: 'HouseRoomBuff',
			properties: [
				{ name: 'uniqueHrid', type: 'string', optional: false },
				{ name: 'typeHrid', type: 'BuffTypeHrid', optional: false },
				{ name: 'ratioBoost', type: 'number', optional: false },
				{ name: 'ratioBoostLevelBonus', type: 'number', optional: false },
				{ name: 'flatBoost', type: 'number', optional: false },
				{ name: 'flatBoostLevelBonus', type: 'number', optional: false },
				{ name: 'startTime', type: 'string', optional: false },
				{ name: 'duration', type: 'number', optional: false },
			],
		})

		// Define UpgradeCost interface
		interfaces.push({
			name: 'UpgradeCost',
			properties: [
				{ name: 'itemHrid', type: 'ItemHrid', optional: false },
				{ name: 'count', type: 'number', optional: false },
			],
		})

		// Main HouseRoom interface
		interfaces.push({
			name: 'HouseRoom',
			properties: [
				{ name: 'hrid', type: 'HouseRoomHrid', optional: false },
				{ name: 'name', type: 'string', optional: false },
				{ name: 'skillHrid', type: 'SkillHrid', optional: false },
				{ name: 'sortIndex', type: 'number', optional: false },
				{
					name: 'usableInActionTypeMap',
					type: 'Record<string, boolean>',
					optional: false,
				},
				{
					name: 'actionBuffs',
					type: 'HouseRoomBuff[] | null',
					optional: false,
				},
				{
					name: 'globalBuffs',
					type: 'HouseRoomBuff[] | null',
					optional: false,
				},
				{
					name: 'upgradeCostsMap',
					type: 'Record<string, UpgradeCost[]>',
					optional: false,
				},
			],
		})

		return interfaces
	}

	/**
	 * Extension hook: Add imports after base types generation
	 */
	protected override extendTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Import types from other domains (DO NOT re-export - domain control)
		typesBuilder.addImport('../items/types', ['ItemHrid'], true)
		typesBuilder.addImport('../skills/types', ['SkillHrid'], true)
		typesBuilder.addImport('../bufftypes/types', ['BuffTypeHrid'], true)
	}

	/**
	 * Define custom constants using the hook system
	 */
	protected override defineConstants(): ConstantDefinition[] {
		const constants: ConstantDefinition[] = []

		// Add maximum upgrade level as a constant (always 8 for house rooms)
		constants.push({
			name: 'MAX_UPGRADE_LEVEL',
			value: 8,
			asConst: false, // Don't use 'as const' for number values
		})

		return constants
	}

	/**
	 * Define lookup tables using the hook system
	 */
	protected override defineLookups(): LookupDefinition[] {
		const lookups: LookupDefinition[] = []

		// House Rooms by skill
		const skillLookup: Record<string, readonly string[]> = {}
		this.roomsBySkill.forEach((rooms, skill) => {
			skillLookup[skill] = rooms.sort()
		})
		lookups.push({
			name: 'HOUSE_ROOMS_BY_SKILL',
			data: skillLookup,
			keyType: 'string', // Use string to avoid import issues, will be typed properly in extendLookups
			valueType: 'readonly HouseRoomHrid[]',
			isPartial: true,
		})

		return lookups
	}

	/**
	 * Extension hook: Add imports needed for lookup tables
	 */
	protected override extendLookups(): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')
		lookupsBuilder.addImport('./types', ['HouseRoomHrid'], true)
		lookupsBuilder.addImport('../skills/types', ['SkillHrid'], true)
	}

	/**
	 * Define custom utility functions using the hook system
	 */
	protected override defineUtilities(): UtilityDefinition[] {
		const utilities: UtilityDefinition[] = []

		// Add house room specific utilities
		utilities.push({
			name: 'getHouseRoomUpgradeCost',
			parameters: [
				{ name: 'hrid', type: 'HouseRoomHrid' },
				{ name: 'level', type: 'number' },
			],
			returnType: 'UpgradeCost[] | null',
			implementation: (writer) => {
				writer.writeLine('const room = requireHouseRoom(hrid)')
				writer.writeLine('const levelKey = level.toString()')
				writer.writeLine('return room.upgradeCostsMap[levelKey] || null')
			},
			imports: [
				{
					from: './types',
					names: ['HouseRoom', 'HouseRoomHrid', 'UpgradeCost'],
					isType: true,
				},
			],
			jsDoc: {
				description:
					'Gets the upgrade costs for a specific house room at a given level.',
				params: [
					{ name: 'hrid', description: 'The house room HRID' },
					{ name: 'level', description: 'The upgrade level (1-8)' },
				],
				returns: 'Array of upgrade costs or null if level not found',
				examples: [
					`const costs = getHouseRoomUpgradeCost('/house_rooms/archery_range', 5)`,
				],
			},
		})

		utilities.push({
			name: 'getMaxUpgradeLevel',
			parameters: [],
			returnType: 'number',
			implementation: (writer) => {
				writer.writeLine('return MAX_UPGRADE_LEVEL')
			},
			imports: [{ from: './constants', names: ['MAX_UPGRADE_LEVEL'] }],
			jsDoc: {
				description: 'Gets the maximum upgrade level for house rooms.',
				returns: 'The maximum upgrade level',
			},
		})

		utilities.push({
			name: 'getHouseRoomsWithActionBuffs',
			parameters: [],
			returnType: 'HouseRoom[]',
			implementation: (writer) => {
				writer.writeLine('return getAllHouseRooms().filter(room => ')
				writer.writeLine('  room.actionBuffs && room.actionBuffs.length > 0')
				writer.writeLine(')')
			},
			imports: [{ from: './types', names: ['HouseRoom'], isType: true }],
			jsDoc: {
				description: 'Gets all house rooms that provide action-specific buffs.',
				returns: 'Array of house rooms with action buffs',
			},
		})

		utilities.push({
			name: 'getHouseRoomsWithGlobalBuffs',
			parameters: [],
			returnType: 'HouseRoom[]',
			implementation: (writer) => {
				writer.writeLine('return getAllHouseRooms().filter(room => ')
				writer.writeLine('  room.globalBuffs && room.globalBuffs.length > 0')
				writer.writeLine(')')
			},
			imports: [{ from: './types', names: ['HouseRoom'], isType: true }],
			jsDoc: {
				description: 'Gets all house rooms that provide global buffs.',
				returns: 'Array of house rooms with global buffs',
			},
		})

		utilities.push({
			name: 'isHouseRoomUsableForAction',
			parameters: [
				{ name: 'room', type: 'HouseRoom' },
				{ name: 'actionTypeHrid', type: 'string' },
			],
			returnType: 'boolean',
			implementation: (writer) => {
				writer.writeLine(
					'return room.usableInActionTypeMap[actionTypeHrid] === true',
				)
			},
			imports: [{ from: './types', names: ['HouseRoom'], isType: true }],
			jsDoc: {
				description:
					'Checks if a house room can be used for a specific action type.',
				params: [
					{ name: 'room', description: 'The house room to check' },
					{ name: 'actionTypeHrid', description: 'The action type HRID' },
				],
				returns:
					'true if the room is usable for the action type, false otherwise',
			},
		})

		return utilities
	}

	// Data extraction helper methods
	private extractBuffs(buffs: any): HouseRoomBuff[] | null {
		if (!buffs || !Array.isArray(buffs) || buffs.length === 0) return null
		return buffs.map((buff: any) => ({
			uniqueHrid: buff.uniqueHrid || '',
			typeHrid: buff.typeHrid || '',
			ratioBoost: typeof buff.ratioBoost === 'number' ? buff.ratioBoost : 0,
			ratioBoostLevelBonus:
				typeof buff.ratioBoostLevelBonus === 'number'
					? buff.ratioBoostLevelBonus
					: 0,
			flatBoost: typeof buff.flatBoost === 'number' ? buff.flatBoost : 0,
			flatBoostLevelBonus:
				typeof buff.flatBoostLevelBonus === 'number'
					? buff.flatBoostLevelBonus
					: 0,
			startTime: buff.startTime || '0001-01-01T00:00:00Z',
			duration: typeof buff.duration === 'number' ? buff.duration : 0,
		}))
	}

	private extractUpgradeCosts(
		upgradeCosts: any,
	): Record<string, UpgradeCost[]> {
		if (!upgradeCosts || typeof upgradeCosts !== 'object') return {}

		const costsMap: Record<string, UpgradeCost[]> = {}
		for (const [level, costs] of Object.entries(upgradeCosts)) {
			if (Array.isArray(costs)) {
				costsMap[level] = costs.map((cost: any) => ({
					itemHrid: cost.itemHrid || '',
					count: typeof cost.count === 'number' ? cost.count : 0,
				}))

				// Track max upgrade level
				const levelNum = parseInt(level, 10)
				if (!isNaN(levelNum) && levelNum > this.maxUpgradeLevel) {
					this.maxUpgradeLevel = levelNum
				}
			}
		}
		return costsMap
	}

	private collectForLookups(room: HouseRoom): void {
		// By skill
		if (room.skillHrid) {
			if (!this.roomsBySkill.has(room.skillHrid)) {
				this.roomsBySkill.set(room.skillHrid, [])
			}
			this.roomsBySkill.get(room.skillHrid)!.push(room.hrid)
		}

		// Track rooms with buffs
		if (room.actionBuffs && room.actionBuffs.length > 0) {
			this.roomsWithActionBuffs.push(room.hrid)
		}

		if (room.globalBuffs && room.globalBuffs.length > 0) {
			this.roomsWithGlobalBuffs.push(room.hrid)
		}
	}
}

// Main execution for standalone running
if (import.meta.main) {
	const generator = new ModularHouseRoomsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
