/**
 * Auto-generated house room data with Zod schemas - DO NOT EDIT
 * Generated from game data on 2025-07-26T14:53:26.058Z
 */

import { z } from 'zod/v4'

// Import schemas from the source of truth
import {
	HouseRoomHridSchema,
	ActionTypeHridSchema,
	type HouseRoomHrid as HouseRoomHridType,
	type ActionTypeHrid
} from '../../types/source-data.js'

// Re-export enums for convenience
export {
	HouseRoomHridSchema as HouseRoomHridEnum,
	ActionTypeHridSchema as ActionTypeEnum,
	type HouseRoomHridType as HouseRoomHrid,
	type ActionTypeHrid as ActionType
}

/**
 * Simplified house room schema for generated data
 */
export const HouseRoomSchema = z.object({
	hrid: HouseRoomHridSchema,
	name: z.string(),
	skillHrid: z.string(),
	sortIndex: z.number(),
	actionBuffTypes: z.array(z.string()),
	globalBuffTypes: z.array(z.string()),
	usableActionTypes: z.array(z.string())
})

export type HouseRoom = z.infer<typeof HouseRoomSchema>

/**
 * All house rooms in the game
 */
export const HOUSE_ROOMS: Record<string, HouseRoom> = {
  "/house_rooms/archery_range": {
    "hrid": "/house_rooms/archery_range",
    "name": "Archery Range",
    "skillHrid": "/skills/ranged",
    "sortIndex": 16,
    "actionBuffTypes": [
      "/buff_types/ranged_level"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/combat"
    ]
  },
  "/house_rooms/armory": {
    "hrid": "/house_rooms/armory",
    "name": "Armory",
    "skillHrid": "/skills/defense",
    "sortIndex": 15,
    "actionBuffTypes": [
      "/buff_types/defense_level"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/combat"
    ]
  },
  "/house_rooms/brewery": {
    "hrid": "/house_rooms/brewery",
    "name": "Brewery",
    "skillHrid": "/skills/brewing",
    "sortIndex": 8,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/brewing"
    ]
  },
  "/house_rooms/dairy_barn": {
    "hrid": "/house_rooms/dairy_barn",
    "name": "Dairy Barn",
    "skillHrid": "/skills/milking",
    "sortIndex": 1,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/milking"
    ]
  },
  "/house_rooms/dining_room": {
    "hrid": "/house_rooms/dining_room",
    "name": "Dining Room",
    "skillHrid": "/skills/stamina",
    "sortIndex": 11,
    "actionBuffTypes": [
      "/buff_types/stamina_level",
      "/buff_types/hp_regen"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/combat"
    ]
  },
  "/house_rooms/dojo": {
    "hrid": "/house_rooms/dojo",
    "name": "Dojo",
    "skillHrid": "/skills/attack",
    "sortIndex": 13,
    "actionBuffTypes": [
      "/buff_types/attack_level",
      "/buff_types/attack_speed"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/combat"
    ]
  },
  "/house_rooms/forge": {
    "hrid": "/house_rooms/forge",
    "name": "Forge",
    "skillHrid": "/skills/cheesesmithing",
    "sortIndex": 4,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/cheesesmithing"
    ]
  },
  "/house_rooms/garden": {
    "hrid": "/house_rooms/garden",
    "name": "Garden",
    "skillHrid": "/skills/foraging",
    "sortIndex": 2,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/foraging"
    ]
  },
  "/house_rooms/gym": {
    "hrid": "/house_rooms/gym",
    "name": "Gym",
    "skillHrid": "/skills/power",
    "sortIndex": 14,
    "actionBuffTypes": [
      "/buff_types/power_level"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/combat"
    ]
  },
  "/house_rooms/kitchen": {
    "hrid": "/house_rooms/kitchen",
    "name": "Kitchen",
    "skillHrid": "/skills/cooking",
    "sortIndex": 7,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/cooking"
    ]
  },
  "/house_rooms/laboratory": {
    "hrid": "/house_rooms/laboratory",
    "name": "Laboratory",
    "skillHrid": "/skills/alchemy",
    "sortIndex": 9,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/alchemy"
    ]
  },
  "/house_rooms/library": {
    "hrid": "/house_rooms/library",
    "name": "Library",
    "skillHrid": "/skills/intelligence",
    "sortIndex": 12,
    "actionBuffTypes": [
      "/buff_types/intelligence_level",
      "/buff_types/mp_regen"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/combat"
    ]
  },
  "/house_rooms/log_shed": {
    "hrid": "/house_rooms/log_shed",
    "name": "Log Shed",
    "skillHrid": "/skills/woodcutting",
    "sortIndex": 3,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/woodcutting"
    ]
  },
  "/house_rooms/mystical_study": {
    "hrid": "/house_rooms/mystical_study",
    "name": "Mystical Study",
    "skillHrid": "/skills/magic",
    "sortIndex": 17,
    "actionBuffTypes": [
      "/buff_types/magic_level"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/combat"
    ]
  },
  "/house_rooms/observatory": {
    "hrid": "/house_rooms/observatory",
    "name": "Observatory",
    "skillHrid": "/skills/enhancing",
    "sortIndex": 10,
    "actionBuffTypes": [
      "/buff_types/action_speed",
      "/buff_types/enhancing_success"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/enhancing"
    ]
  },
  "/house_rooms/sewing_parlor": {
    "hrid": "/house_rooms/sewing_parlor",
    "name": "Sewing Parlor",
    "skillHrid": "/skills/tailoring",
    "sortIndex": 6,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/tailoring"
    ]
  },
  "/house_rooms/workshop": {
    "hrid": "/house_rooms/workshop",
    "name": "Workshop",
    "skillHrid": "/skills/crafting",
    "sortIndex": 5,
    "actionBuffTypes": [
      "/buff_types/efficiency"
    ],
    "globalBuffTypes": [
      "/buff_types/wisdom",
      "/buff_types/rare_find"
    ],
    "usableActionTypes": [
      "/action_types/crafting"
    ]
  }
}

/**
 * House rooms indexed by their associated skill
 * Each skill has exactly one corresponding house room
 */
export const ROOMS_BY_SKILL = {
  "/skills/ranged": "/house_rooms/archery_range",
  "/skills/defense": "/house_rooms/armory",
  "/skills/brewing": "/house_rooms/brewery",
  "/skills/milking": "/house_rooms/dairy_barn",
  "/skills/stamina": "/house_rooms/dining_room",
  "/skills/attack": "/house_rooms/dojo",
  "/skills/cheesesmithing": "/house_rooms/forge",
  "/skills/foraging": "/house_rooms/garden",
  "/skills/power": "/house_rooms/gym",
  "/skills/cooking": "/house_rooms/kitchen",
  "/skills/alchemy": "/house_rooms/laboratory",
  "/skills/intelligence": "/house_rooms/library",
  "/skills/woodcutting": "/house_rooms/log_shed",
  "/skills/magic": "/house_rooms/mystical_study",
  "/skills/enhancing": "/house_rooms/observatory",
  "/skills/tailoring": "/house_rooms/sewing_parlor",
  "/skills/crafting": "/house_rooms/workshop"
} as const

/**
 * House rooms grouped by action types they benefit
 * A room can benefit multiple action types
 */
export const ROOMS_BY_ACTION_TYPE = {
  "/action_types/combat": [
    "/house_rooms/archery_range",
    "/house_rooms/armory",
    "/house_rooms/dining_room",
    "/house_rooms/dojo",
    "/house_rooms/gym",
    "/house_rooms/library",
    "/house_rooms/mystical_study"
  ],
  "/action_types/brewing": [
    "/house_rooms/brewery"
  ],
  "/action_types/milking": [
    "/house_rooms/dairy_barn"
  ],
  "/action_types/cheesesmithing": [
    "/house_rooms/forge"
  ],
  "/action_types/foraging": [
    "/house_rooms/garden"
  ],
  "/action_types/cooking": [
    "/house_rooms/kitchen"
  ],
  "/action_types/alchemy": [
    "/house_rooms/laboratory"
  ],
  "/action_types/woodcutting": [
    "/house_rooms/log_shed"
  ],
  "/action_types/enhancing": [
    "/house_rooms/observatory"
  ],
  "/action_types/tailoring": [
    "/house_rooms/sewing_parlor"
  ],
  "/action_types/crafting": [
    "/house_rooms/workshop"
  ]
} as const

// Type exports
export type HouseRoomId = keyof typeof HOUSE_ROOMS
export type HouseRoomData = typeof HOUSE_ROOMS[HouseRoomId]

/**
 * Get house room by HRID with validation
 * @param roomHrid - The house room HRID to retrieve
 * @returns The parsed HouseRoom object if found, undefined otherwise
 * @example
 * ```ts
 * const forge = getHouseRoom('/house_rooms/forge')
 * if (forge) {
 *   console.log(forge.skillHrid) // '/skills/crafting'
 * }
 * ```
 */
export function getHouseRoom(roomHrid: string): HouseRoom | undefined {
	const room = HOUSE_ROOMS[roomHrid as HouseRoomId]
	return room ? HouseRoomSchema.parse(room) : undefined
}

/**
 * Get house room by skill HRID
 * @param skillHrid - The skill HRID to find the room for
 * @returns The house room HRID associated with the skill, undefined if not found
 * @example
 * ```ts
 * const craftingRoom = getRoomBySkill('/skills/crafting')
 * // '/house_rooms/forge'
 * ```
 */
export function getRoomBySkill(skillHrid: string): string | undefined {
	return ROOMS_BY_SKILL[skillHrid as keyof typeof ROOMS_BY_SKILL]
}

/**
 * Get house rooms that benefit a specific action type
 * @param actionType - The action type to filter by
 * @returns Array of house room HRIDs that benefit the action type
 * @example
 * ```ts
 * const cookingRooms = getRoomsForActionType('/action_types/cooking')
 * // ['/house_rooms/kitchen']
 * ```
 */
export function getRoomsForActionType(actionType: ActionTypeHrid): string[] {
	const rooms = ROOMS_BY_ACTION_TYPE[actionType as keyof typeof ROOMS_BY_ACTION_TYPE]
	return rooms ? [...rooms] : []
}

/**
 * Check if a house room exists
 * @param roomHrid - The house room HRID to check
 * @returns True if the house room exists, false otherwise
 * @example
 * ```ts
 * if (houseRoomExists('/house_rooms/forge')) {
 *   console.log('Forge room exists!')
 * }
 * ```
 */
export function houseRoomExists(roomHrid: string): boolean {
	return roomHrid in HOUSE_ROOMS
}

/**
 * Validate a house room HRID and return it as a typed HouseRoomHrid
 * @param hrid - The house room HRID string to validate
 * @returns The validated HouseRoomHrid
 * @throws Error if the HRID is not a valid house room
 * @example
 * ```ts
 * try {
 *   const roomHrid = validateHouseRoomHrid('/house_rooms/forge')
 *   // roomHrid is now typed as HouseRoomHrid
 * } catch (error) {
 *   console.error('Invalid house room HRID')
 * }
 * ```
 */
export function validateHouseRoomHrid(hrid: string): HouseRoomHridType {
	if (!(hrid in HOUSE_ROOMS)) {
		throw new Error(`Invalid house room: ${hrid}`)
	}
	return hrid as HouseRoomHridType
}

/**
 * Get all house rooms sorted by their sort index
 * @returns Array of house room HRIDs sorted by sortIndex
 * @example
 * ```ts
 * const sortedRooms = getHouseRoomsSortedByIndex()
 * // House rooms in the order they should be displayed
 * ```
 */
export function getHouseRoomsSortedByIndex(): string[] {
	return Object.entries(HOUSE_ROOMS)
		.sort(([, a], [, b]) => a.sortIndex - b.sortIndex)
		.map(([hrid]) => hrid)
}

/**
 * Check if a house room benefits a specific action type
 * @param roomHrid - The house room HRID to check
 * @param actionType - The action type to check for
 * @returns True if the room benefits the action type
 * @example
 * ```ts
 * if (roomBenefitsActionType('/house_rooms/kitchen', '/action_types/cooking')) {
 *   console.log('Kitchen benefits cooking actions')
 * }
 * ```
 */
export function roomBenefitsActionType(roomHrid: string, actionType: ActionTypeHrid): boolean {
	const room = HOUSE_ROOMS[roomHrid as HouseRoomId]
	return room?.usableActionTypes.includes(actionType) ?? false
}

/**
 * Get all action buff types provided by a house room
 * @param roomHrid - The house room HRID
 * @returns Array of buff type HRIDs that the room provides for actions
 * @example
 * ```ts
 * const forgeBuffs = getRoomActionBuffTypes('/house_rooms/forge')
 * // ['/buff_types/crafting_level', '/buff_types/crafting_speed']
 * ```
 */
export function getRoomActionBuffTypes(roomHrid: string): string[] {
	const room = HOUSE_ROOMS[roomHrid as HouseRoomId]
	return room ? [...room.actionBuffTypes] : []
}

/**
 * Get all global buff types provided by a house room
 * @param roomHrid - The house room HRID
 * @returns Array of buff type HRIDs that the room provides globally
 * @example
 * ```ts
 * const libraryBuffs = getRoomGlobalBuffTypes('/house_rooms/library')
 * // ['/buff_types/wisdom']
 * ```
 */
export function getRoomGlobalBuffTypes(roomHrid: string): string[] {
	const room = HOUSE_ROOMS[roomHrid as HouseRoomId]
	return room ? [...room.globalBuffTypes] : []
}

/**
 * Get house rooms that provide a specific buff type
 * @param buffTypeHrid - The buff type HRID to search for
 * @returns Array of house room HRIDs that provide this buff
 * @example
 * ```ts
 * const speedRooms = getRoomsProvidingBuff('/buff_types/action_speed')
 * // House rooms that increase action speed
 * ```
 */
export function getRoomsProvidingBuff(buffTypeHrid: string): string[] {
	const results: string[] = []
	for (const [roomHrid, room] of Object.entries(HOUSE_ROOMS)) {
		if (room.actionBuffTypes.includes(buffTypeHrid) || room.globalBuffTypes.includes(buffTypeHrid)) {
			results.push(roomHrid)
		}
	}
	return results
}
