/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.139Z
 */

import { z } from 'zod'
import { HouseRoomHridEnum, HouseRoomSchema, type HouseRoom } from '../schemas/zod/house-rooms.js'
import type { SkillHrid } from './skills.js'
import { SkillHridEnum } from './skills.js'
import type { ItemHrid } from './items.js'
import { ItemHridEnum } from './items.js'
import type { BuffTypeHrid } from './buff-types.js'
import { BuffTypeHridEnum } from './buff-types.js'
// Re-export HRID enum from schema
export { HouseRoomHridEnum } from '../schemas/zod/house-rooms.js'
// Re-export schema
export { HouseRoomSchema } from '../schemas/zod/house-rooms.js'

// Type definitions
type HouseRoomHrid = z.infer<typeof HouseRoomHridEnum>

// Data
export const HOUSEROOMS: Record<HouseRoomHrid, HouseRoom> = {
  '/house_rooms/archery_range': {
    "hrid": "/house_rooms/archery_range",
    "name": "Archery Range",
    "skillHrid": "/skills/ranged",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_ranged_level",
        "typeHrid": "/buff_types/ranged_level",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 1,
        "flatBoostLevelBonus": 1,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/wooden_crossbow",
          "count": 6
        },
        {
          "itemHrid": "/items/wooden_bow",
          "count": 4
        },
        {
          "itemHrid": "/items/rough_hood",
          "count": 4
        },
        {
          "itemHrid": "/items/rough_tunic",
          "count": 4
        },
        {
          "itemHrid": "/items/rough_chaps",
          "count": 4
        },
        {
          "itemHrid": "/items/rough_bracers",
          "count": 4
        },
        {
          "itemHrid": "/items/rough_boots",
          "count": 4
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/wooden_crossbow",
          "count": 9
        },
        {
          "itemHrid": "/items/birch_crossbow",
          "count": 9
        },
        {
          "itemHrid": "/items/wooden_bow",
          "count": 6
        },
        {
          "itemHrid": "/items/birch_bow",
          "count": 6
        },
        {
          "itemHrid": "/items/reptile_hood",
          "count": 8
        },
        {
          "itemHrid": "/items/reptile_tunic",
          "count": 8
        },
        {
          "itemHrid": "/items/reptile_chaps",
          "count": 8
        },
        {
          "itemHrid": "/items/reptile_bracers",
          "count": 8
        },
        {
          "itemHrid": "/items/reptile_boots",
          "count": 8
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/birch_crossbow",
          "count": 12
        },
        {
          "itemHrid": "/items/cedar_crossbow",
          "count": 12
        },
        {
          "itemHrid": "/items/birch_bow",
          "count": 8
        },
        {
          "itemHrid": "/items/cedar_bow",
          "count": 8
        },
        {
          "itemHrid": "/items/reptile_hood",
          "count": 16
        },
        {
          "itemHrid": "/items/reptile_tunic",
          "count": 16
        },
        {
          "itemHrid": "/items/reptile_chaps",
          "count": 16
        },
        {
          "itemHrid": "/items/reptile_bracers",
          "count": 16
        },
        {
          "itemHrid": "/items/reptile_boots",
          "count": 16
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/cedar_crossbow",
          "count": 15
        },
        {
          "itemHrid": "/items/purpleheart_crossbow",
          "count": 15
        },
        {
          "itemHrid": "/items/cedar_bow",
          "count": 10
        },
        {
          "itemHrid": "/items/purpleheart_bow",
          "count": 10
        },
        {
          "itemHrid": "/items/gobo_hood",
          "count": 16
        },
        {
          "itemHrid": "/items/gobo_tunic",
          "count": 16
        },
        {
          "itemHrid": "/items/gobo_chaps",
          "count": 16
        },
        {
          "itemHrid": "/items/gobo_bracers",
          "count": 16
        },
        {
          "itemHrid": "/items/gobo_boots",
          "count": 16
        },
        {
          "itemHrid": "/items/ranged_coffee",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/purpleheart_crossbow",
          "count": 18
        },
        {
          "itemHrid": "/items/ginkgo_crossbow",
          "count": 18
        },
        {
          "itemHrid": "/items/purpleheart_bow",
          "count": 12
        },
        {
          "itemHrid": "/items/ginkgo_bow",
          "count": 12
        },
        {
          "itemHrid": "/items/gobo_hood",
          "count": 32
        },
        {
          "itemHrid": "/items/gobo_tunic",
          "count": 32
        },
        {
          "itemHrid": "/items/gobo_chaps",
          "count": 32
        },
        {
          "itemHrid": "/items/gobo_bracers",
          "count": 32
        },
        {
          "itemHrid": "/items/gobo_boots",
          "count": 32
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/ginkgo_crossbow",
          "count": 21
        },
        {
          "itemHrid": "/items/redwood_crossbow",
          "count": 21
        },
        {
          "itemHrid": "/items/ginkgo_bow",
          "count": 14
        },
        {
          "itemHrid": "/items/redwood_bow",
          "count": 14
        },
        {
          "itemHrid": "/items/beast_hood",
          "count": 24
        },
        {
          "itemHrid": "/items/beast_tunic",
          "count": 24
        },
        {
          "itemHrid": "/items/beast_chaps",
          "count": 24
        },
        {
          "itemHrid": "/items/beast_bracers",
          "count": 24
        },
        {
          "itemHrid": "/items/beast_boots",
          "count": 24
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/redwood_crossbow",
          "count": 24
        },
        {
          "itemHrid": "/items/arcane_crossbow",
          "count": 24
        },
        {
          "itemHrid": "/items/redwood_bow",
          "count": 16
        },
        {
          "itemHrid": "/items/arcane_bow",
          "count": 16
        },
        {
          "itemHrid": "/items/beast_hood",
          "count": 48
        },
        {
          "itemHrid": "/items/beast_tunic",
          "count": 48
        },
        {
          "itemHrid": "/items/beast_chaps",
          "count": 48
        },
        {
          "itemHrid": "/items/beast_bracers",
          "count": 48
        },
        {
          "itemHrid": "/items/beast_boots",
          "count": 48
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/arcane_crossbow",
          "count": 60
        },
        {
          "itemHrid": "/items/arcane_bow",
          "count": 40
        },
        {
          "itemHrid": "/items/umbral_hood",
          "count": 40
        },
        {
          "itemHrid": "/items/umbral_tunic",
          "count": 40
        },
        {
          "itemHrid": "/items/umbral_chaps",
          "count": 40
        },
        {
          "itemHrid": "/items/umbral_bracers",
          "count": 40
        },
        {
          "itemHrid": "/items/umbral_boots",
          "count": 40
        },
        {
          "itemHrid": "/items/super_ranged_coffee",
          "count": 2000
        }
      ]
    },
    "sortIndex": 16
  },
  '/house_rooms/armory': {
    "hrid": "/house_rooms/armory",
    "name": "Armory",
    "skillHrid": "/skills/defense",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_defense_level",
        "typeHrid": "/buff_types/defense_level",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 1,
        "flatBoostLevelBonus": 1,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/cheese_helmet",
          "count": 8
        },
        {
          "itemHrid": "/items/cheese_plate_body",
          "count": 8
        },
        {
          "itemHrid": "/items/cheese_plate_legs",
          "count": 8
        },
        {
          "itemHrid": "/items/cheese_gauntlets",
          "count": 8
        },
        {
          "itemHrid": "/items/cheese_boots",
          "count": 8
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/cheese_helmet",
          "count": 12
        },
        {
          "itemHrid": "/items/verdant_helmet",
          "count": 12
        },
        {
          "itemHrid": "/items/cheese_plate_body",
          "count": 12
        },
        {
          "itemHrid": "/items/verdant_plate_body",
          "count": 12
        },
        {
          "itemHrid": "/items/cheese_plate_legs",
          "count": 12
        },
        {
          "itemHrid": "/items/verdant_plate_legs",
          "count": 12
        },
        {
          "itemHrid": "/items/cheese_gauntlets",
          "count": 12
        },
        {
          "itemHrid": "/items/verdant_gauntlets",
          "count": 12
        },
        {
          "itemHrid": "/items/cheese_boots",
          "count": 12
        },
        {
          "itemHrid": "/items/verdant_boots",
          "count": 12
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/verdant_helmet",
          "count": 16
        },
        {
          "itemHrid": "/items/azure_helmet",
          "count": 16
        },
        {
          "itemHrid": "/items/verdant_plate_body",
          "count": 16
        },
        {
          "itemHrid": "/items/azure_plate_body",
          "count": 16
        },
        {
          "itemHrid": "/items/verdant_plate_legs",
          "count": 16
        },
        {
          "itemHrid": "/items/azure_plate_legs",
          "count": 16
        },
        {
          "itemHrid": "/items/verdant_gauntlets",
          "count": 16
        },
        {
          "itemHrid": "/items/azure_gauntlets",
          "count": 16
        },
        {
          "itemHrid": "/items/verdant_boots",
          "count": 16
        },
        {
          "itemHrid": "/items/azure_boots",
          "count": 16
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/azure_helmet",
          "count": 20
        },
        {
          "itemHrid": "/items/burble_helmet",
          "count": 20
        },
        {
          "itemHrid": "/items/azure_plate_body",
          "count": 20
        },
        {
          "itemHrid": "/items/burble_plate_body",
          "count": 20
        },
        {
          "itemHrid": "/items/azure_plate_legs",
          "count": 20
        },
        {
          "itemHrid": "/items/burble_plate_legs",
          "count": 20
        },
        {
          "itemHrid": "/items/azure_gauntlets",
          "count": 20
        },
        {
          "itemHrid": "/items/burble_gauntlets",
          "count": 20
        },
        {
          "itemHrid": "/items/azure_boots",
          "count": 20
        },
        {
          "itemHrid": "/items/burble_boots",
          "count": 20
        },
        {
          "itemHrid": "/items/defense_coffee",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/burble_helmet",
          "count": 24
        },
        {
          "itemHrid": "/items/crimson_helmet",
          "count": 24
        },
        {
          "itemHrid": "/items/burble_plate_body",
          "count": 24
        },
        {
          "itemHrid": "/items/crimson_plate_body",
          "count": 24
        },
        {
          "itemHrid": "/items/burble_plate_legs",
          "count": 24
        },
        {
          "itemHrid": "/items/crimson_plate_legs",
          "count": 24
        },
        {
          "itemHrid": "/items/burble_gauntlets",
          "count": 24
        },
        {
          "itemHrid": "/items/crimson_gauntlets",
          "count": 24
        },
        {
          "itemHrid": "/items/burble_boots",
          "count": 24
        },
        {
          "itemHrid": "/items/crimson_boots",
          "count": 24
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/crimson_helmet",
          "count": 28
        },
        {
          "itemHrid": "/items/rainbow_helmet",
          "count": 28
        },
        {
          "itemHrid": "/items/crimson_plate_body",
          "count": 28
        },
        {
          "itemHrid": "/items/rainbow_plate_body",
          "count": 28
        },
        {
          "itemHrid": "/items/crimson_plate_legs",
          "count": 28
        },
        {
          "itemHrid": "/items/rainbow_plate_legs",
          "count": 28
        },
        {
          "itemHrid": "/items/crimson_gauntlets",
          "count": 28
        },
        {
          "itemHrid": "/items/rainbow_gauntlets",
          "count": 28
        },
        {
          "itemHrid": "/items/crimson_boots",
          "count": 28
        },
        {
          "itemHrid": "/items/rainbow_boots",
          "count": 28
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/rainbow_helmet",
          "count": 32
        },
        {
          "itemHrid": "/items/holy_helmet",
          "count": 32
        },
        {
          "itemHrid": "/items/rainbow_plate_body",
          "count": 32
        },
        {
          "itemHrid": "/items/holy_plate_body",
          "count": 32
        },
        {
          "itemHrid": "/items/rainbow_plate_legs",
          "count": 32
        },
        {
          "itemHrid": "/items/holy_plate_legs",
          "count": 32
        },
        {
          "itemHrid": "/items/rainbow_gauntlets",
          "count": 32
        },
        {
          "itemHrid": "/items/holy_gauntlets",
          "count": 32
        },
        {
          "itemHrid": "/items/rainbow_boots",
          "count": 32
        },
        {
          "itemHrid": "/items/holy_boots",
          "count": 32
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/holy_helmet",
          "count": 80
        },
        {
          "itemHrid": "/items/holy_plate_body",
          "count": 80
        },
        {
          "itemHrid": "/items/holy_plate_legs",
          "count": 80
        },
        {
          "itemHrid": "/items/holy_gauntlets",
          "count": 80
        },
        {
          "itemHrid": "/items/holy_boots",
          "count": 80
        },
        {
          "itemHrid": "/items/super_defense_coffee",
          "count": 2000
        }
      ]
    },
    "sortIndex": 15
  },
  '/house_rooms/brewery': {
    "hrid": "/house_rooms/brewery",
    "name": "Brewery",
    "skillHrid": "/skills/brewing",
    "usableInActionTypeMap": {
      "/action_types/brewing": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/green_tea_leaf",
          "count": 300
        },
        {
          "itemHrid": "/items/arabica_coffee_bean",
          "count": 300
        },
        {
          "itemHrid": "/items/cheese_pot",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/green_tea_leaf",
          "count": 600
        },
        {
          "itemHrid": "/items/black_tea_leaf",
          "count": 600
        },
        {
          "itemHrid": "/items/arabica_coffee_bean",
          "count": 600
        },
        {
          "itemHrid": "/items/robusta_coffee_bean",
          "count": 600
        },
        {
          "itemHrid": "/items/cheese_pot",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_pot",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/black_tea_leaf",
          "count": 2400
        },
        {
          "itemHrid": "/items/robusta_coffee_bean",
          "count": 2400
        },
        {
          "itemHrid": "/items/verdant_pot",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_pot",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/black_tea_leaf",
          "count": 2400
        },
        {
          "itemHrid": "/items/burble_tea_leaf",
          "count": 2400
        },
        {
          "itemHrid": "/items/robusta_coffee_bean",
          "count": 2400
        },
        {
          "itemHrid": "/items/liberica_coffee_bean",
          "count": 2400
        },
        {
          "itemHrid": "/items/azure_pot",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_pot",
          "count": 15
        },
        {
          "itemHrid": "/items/brewing_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/burble_tea_leaf",
          "count": 4800
        },
        {
          "itemHrid": "/items/moolong_tea_leaf",
          "count": 4800
        },
        {
          "itemHrid": "/items/liberica_coffee_bean",
          "count": 4800
        },
        {
          "itemHrid": "/items/excelsa_coffee_bean",
          "count": 4800
        },
        {
          "itemHrid": "/items/burble_pot",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_pot",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/moolong_tea_leaf",
          "count": 9600
        },
        {
          "itemHrid": "/items/red_tea_leaf",
          "count": 9600
        },
        {
          "itemHrid": "/items/excelsa_coffee_bean",
          "count": 9600
        },
        {
          "itemHrid": "/items/fieriosa_coffee_bean",
          "count": 9600
        },
        {
          "itemHrid": "/items/crimson_pot",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_pot",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/red_tea_leaf",
          "count": 19200
        },
        {
          "itemHrid": "/items/emp_tea_leaf",
          "count": 19200
        },
        {
          "itemHrid": "/items/fieriosa_coffee_bean",
          "count": 19200
        },
        {
          "itemHrid": "/items/spacia_coffee_bean",
          "count": 19200
        },
        {
          "itemHrid": "/items/rainbow_pot",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_pot",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/emp_tea_leaf",
          "count": 48000
        },
        {
          "itemHrid": "/items/spacia_coffee_bean",
          "count": 48000
        },
        {
          "itemHrid": "/items/holy_pot",
          "count": 60
        },
        {
          "itemHrid": "/items/super_brewing_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 8
  },
  '/house_rooms/dairy_barn': {
    "hrid": "/house_rooms/dairy_barn",
    "name": "Dairy Barn",
    "skillHrid": "/skills/milking",
    "usableInActionTypeMap": {
      "/action_types/milking": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/milk",
          "count": 1500
        },
        {
          "itemHrid": "/items/cheese_brush",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/milk",
          "count": 3000
        },
        {
          "itemHrid": "/items/verdant_milk",
          "count": 3000
        },
        {
          "itemHrid": "/items/cheese_brush",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_brush",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/verdant_milk",
          "count": 6000
        },
        {
          "itemHrid": "/items/azure_milk",
          "count": 6000
        },
        {
          "itemHrid": "/items/verdant_brush",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_brush",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/azure_milk",
          "count": 12000
        },
        {
          "itemHrid": "/items/burble_milk",
          "count": 12000
        },
        {
          "itemHrid": "/items/azure_brush",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_brush",
          "count": 15
        },
        {
          "itemHrid": "/items/milking_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/burble_milk",
          "count": 24000
        },
        {
          "itemHrid": "/items/crimson_milk",
          "count": 24000
        },
        {
          "itemHrid": "/items/burble_brush",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_brush",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/crimson_milk",
          "count": 48000
        },
        {
          "itemHrid": "/items/rainbow_milk",
          "count": 48000
        },
        {
          "itemHrid": "/items/crimson_brush",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_brush",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/rainbow_milk",
          "count": 96000
        },
        {
          "itemHrid": "/items/holy_milk",
          "count": 96000
        },
        {
          "itemHrid": "/items/rainbow_brush",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_brush",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/holy_milk",
          "count": 240000
        },
        {
          "itemHrid": "/items/holy_brush",
          "count": 60
        },
        {
          "itemHrid": "/items/super_milking_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 1
  },
  '/house_rooms/dining_room': {
    "hrid": "/house_rooms/dining_room",
    "name": "Dining Room",
    "skillHrid": "/skills/stamina",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_stamina_level",
        "typeHrid": "/buff_types/stamina_level",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 1,
        "flatBoostLevelBonus": 1,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_hp_regen",
        "typeHrid": "/buff_types/hp_regen",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0003,
        "flatBoostLevelBonus": 0.0003,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/donut",
          "count": 125
        },
        {
          "itemHrid": "/items/cupcake",
          "count": 125
        },
        {
          "itemHrid": "/items/small_pouch",
          "count": 1
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/donut",
          "count": 250
        },
        {
          "itemHrid": "/items/blueberry_donut",
          "count": 250
        },
        {
          "itemHrid": "/items/cupcake",
          "count": 250
        },
        {
          "itemHrid": "/items/blueberry_cake",
          "count": 250
        },
        {
          "itemHrid": "/items/small_pouch",
          "count": 3
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/blueberry_donut",
          "count": 500
        },
        {
          "itemHrid": "/items/blackberry_donut",
          "count": 500
        },
        {
          "itemHrid": "/items/blueberry_cake",
          "count": 500
        },
        {
          "itemHrid": "/items/blackberry_cake",
          "count": 500
        },
        {
          "itemHrid": "/items/medium_pouch",
          "count": 1
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/blackberry_donut",
          "count": 1000
        },
        {
          "itemHrid": "/items/strawberry_donut",
          "count": 1000
        },
        {
          "itemHrid": "/items/blackberry_cake",
          "count": 1000
        },
        {
          "itemHrid": "/items/strawberry_cake",
          "count": 1000
        },
        {
          "itemHrid": "/items/medium_pouch",
          "count": 3
        },
        {
          "itemHrid": "/items/stamina_coffee",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/strawberry_donut",
          "count": 2000
        },
        {
          "itemHrid": "/items/mooberry_donut",
          "count": 2000
        },
        {
          "itemHrid": "/items/strawberry_cake",
          "count": 2000
        },
        {
          "itemHrid": "/items/mooberry_cake",
          "count": 2000
        },
        {
          "itemHrid": "/items/large_pouch",
          "count": 1
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/mooberry_donut",
          "count": 4000
        },
        {
          "itemHrid": "/items/marsberry_donut",
          "count": 4000
        },
        {
          "itemHrid": "/items/mooberry_cake",
          "count": 4000
        },
        {
          "itemHrid": "/items/marsberry_cake",
          "count": 4000
        },
        {
          "itemHrid": "/items/large_pouch",
          "count": 3
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/marsberry_donut",
          "count": 8000
        },
        {
          "itemHrid": "/items/spaceberry_donut",
          "count": 8000
        },
        {
          "itemHrid": "/items/marsberry_cake",
          "count": 8000
        },
        {
          "itemHrid": "/items/spaceberry_cake",
          "count": 8000
        },
        {
          "itemHrid": "/items/giant_pouch",
          "count": 1
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/spaceberry_donut",
          "count": 20000
        },
        {
          "itemHrid": "/items/spaceberry_cake",
          "count": 20000
        },
        {
          "itemHrid": "/items/giant_pouch",
          "count": 3
        },
        {
          "itemHrid": "/items/super_stamina_coffee",
          "count": 2000
        }
      ]
    },
    "sortIndex": 11
  },
  '/house_rooms/dojo': {
    "hrid": "/house_rooms/dojo",
    "name": "Dojo",
    "skillHrid": "/skills/attack",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_attack_level",
        "typeHrid": "/buff_types/attack_level",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 1,
        "flatBoostLevelBonus": 1,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_attack_speed",
        "typeHrid": "/buff_types/attack_speed",
        "ratioBoost": 0.005,
        "ratioBoostLevelBonus": 0.005,
        "flatBoost": 0,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/cheese_spear",
          "count": 16
        },
        {
          "itemHrid": "/items/cheese_sword",
          "count": 8
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/cheese_spear",
          "count": 24
        },
        {
          "itemHrid": "/items/verdant_spear",
          "count": 24
        },
        {
          "itemHrid": "/items/cheese_sword",
          "count": 12
        },
        {
          "itemHrid": "/items/verdant_sword",
          "count": 12
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/verdant_spear",
          "count": 32
        },
        {
          "itemHrid": "/items/azure_spear",
          "count": 32
        },
        {
          "itemHrid": "/items/verdant_sword",
          "count": 16
        },
        {
          "itemHrid": "/items/azure_sword",
          "count": 16
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/azure_spear",
          "count": 40
        },
        {
          "itemHrid": "/items/burble_spear",
          "count": 40
        },
        {
          "itemHrid": "/items/azure_sword",
          "count": 20
        },
        {
          "itemHrid": "/items/burble_sword",
          "count": 20
        },
        {
          "itemHrid": "/items/attack_coffee",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/burble_spear",
          "count": 48
        },
        {
          "itemHrid": "/items/crimson_spear",
          "count": 48
        },
        {
          "itemHrid": "/items/burble_sword",
          "count": 24
        },
        {
          "itemHrid": "/items/crimson_sword",
          "count": 24
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/crimson_spear",
          "count": 56
        },
        {
          "itemHrid": "/items/rainbow_spear",
          "count": 56
        },
        {
          "itemHrid": "/items/crimson_sword",
          "count": 28
        },
        {
          "itemHrid": "/items/rainbow_sword",
          "count": 28
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/rainbow_spear",
          "count": 64
        },
        {
          "itemHrid": "/items/holy_spear",
          "count": 64
        },
        {
          "itemHrid": "/items/rainbow_sword",
          "count": 32
        },
        {
          "itemHrid": "/items/holy_sword",
          "count": 32
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/holy_spear",
          "count": 160
        },
        {
          "itemHrid": "/items/holy_sword",
          "count": 80
        },
        {
          "itemHrid": "/items/super_attack_coffee",
          "count": 2000
        }
      ]
    },
    "sortIndex": 13
  },
  '/house_rooms/forge': {
    "hrid": "/house_rooms/forge",
    "name": "Forge",
    "skillHrid": "/skills/cheesesmithing",
    "usableInActionTypeMap": {
      "/action_types/cheesesmithing": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/cheese",
          "count": 375
        },
        {
          "itemHrid": "/items/cheese_hammer",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/cheese",
          "count": 750
        },
        {
          "itemHrid": "/items/verdant_cheese",
          "count": 750
        },
        {
          "itemHrid": "/items/cheese_hammer",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_hammer",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/verdant_cheese",
          "count": 1500
        },
        {
          "itemHrid": "/items/azure_cheese",
          "count": 1500
        },
        {
          "itemHrid": "/items/verdant_hammer",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_hammer",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/azure_cheese",
          "count": 3000
        },
        {
          "itemHrid": "/items/burble_cheese",
          "count": 3000
        },
        {
          "itemHrid": "/items/azure_hammer",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_hammer",
          "count": 15
        },
        {
          "itemHrid": "/items/cheesesmithing_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/burble_cheese",
          "count": 6000
        },
        {
          "itemHrid": "/items/crimson_cheese",
          "count": 6000
        },
        {
          "itemHrid": "/items/burble_hammer",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_hammer",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/crimson_cheese",
          "count": 12000
        },
        {
          "itemHrid": "/items/rainbow_cheese",
          "count": 12000
        },
        {
          "itemHrid": "/items/crimson_hammer",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_hammer",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/rainbow_cheese",
          "count": 24000
        },
        {
          "itemHrid": "/items/holy_cheese",
          "count": 24000
        },
        {
          "itemHrid": "/items/rainbow_hammer",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_hammer",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/holy_cheese",
          "count": 60000
        },
        {
          "itemHrid": "/items/holy_hammer",
          "count": 60
        },
        {
          "itemHrid": "/items/super_cheesesmithing_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 4
  },
  '/house_rooms/garden': {
    "hrid": "/house_rooms/garden",
    "name": "Garden",
    "skillHrid": "/skills/foraging",
    "usableInActionTypeMap": {
      "/action_types/foraging": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/egg",
          "count": 500
        },
        {
          "itemHrid": "/items/wheat",
          "count": 500
        },
        {
          "itemHrid": "/items/cotton",
          "count": 750
        },
        {
          "itemHrid": "/items/cheese_shears",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/egg",
          "count": 1000
        },
        {
          "itemHrid": "/items/blueberry",
          "count": 1000
        },
        {
          "itemHrid": "/items/wheat",
          "count": 1000
        },
        {
          "itemHrid": "/items/apple",
          "count": 500
        },
        {
          "itemHrid": "/items/cotton",
          "count": 1500
        },
        {
          "itemHrid": "/items/flax",
          "count": 1500
        },
        {
          "itemHrid": "/items/cheese_shears",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_shears",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/blueberry",
          "count": 2000
        },
        {
          "itemHrid": "/items/blackberry",
          "count": 2000
        },
        {
          "itemHrid": "/items/apple",
          "count": 1000
        },
        {
          "itemHrid": "/items/orange",
          "count": 1000
        },
        {
          "itemHrid": "/items/flax",
          "count": 6000
        },
        {
          "itemHrid": "/items/verdant_shears",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_shears",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/blackberry",
          "count": 4000
        },
        {
          "itemHrid": "/items/strawberry",
          "count": 4000
        },
        {
          "itemHrid": "/items/orange",
          "count": 2000
        },
        {
          "itemHrid": "/items/plum",
          "count": 2000
        },
        {
          "itemHrid": "/items/flax",
          "count": 6000
        },
        {
          "itemHrid": "/items/bamboo_branch",
          "count": 6000
        },
        {
          "itemHrid": "/items/azure_shears",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_shears",
          "count": 15
        },
        {
          "itemHrid": "/items/foraging_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/strawberry",
          "count": 8000
        },
        {
          "itemHrid": "/items/mooberry",
          "count": 8000
        },
        {
          "itemHrid": "/items/plum",
          "count": 4000
        },
        {
          "itemHrid": "/items/peach",
          "count": 4000
        },
        {
          "itemHrid": "/items/bamboo_branch",
          "count": 24000
        },
        {
          "itemHrid": "/items/burble_shears",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_shears",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/mooberry",
          "count": 16000
        },
        {
          "itemHrid": "/items/marsberry",
          "count": 16000
        },
        {
          "itemHrid": "/items/peach",
          "count": 8000
        },
        {
          "itemHrid": "/items/dragon_fruit",
          "count": 8000
        },
        {
          "itemHrid": "/items/bamboo_branch",
          "count": 24000
        },
        {
          "itemHrid": "/items/cocoon",
          "count": 24000
        },
        {
          "itemHrid": "/items/crimson_shears",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_shears",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/marsberry",
          "count": 32000
        },
        {
          "itemHrid": "/items/spaceberry",
          "count": 32000
        },
        {
          "itemHrid": "/items/dragon_fruit",
          "count": 16000
        },
        {
          "itemHrid": "/items/star_fruit",
          "count": 16000
        },
        {
          "itemHrid": "/items/cocoon",
          "count": 48000
        },
        {
          "itemHrid": "/items/radiant_fiber",
          "count": 48000
        },
        {
          "itemHrid": "/items/rainbow_shears",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_shears",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/spaceberry",
          "count": 80000
        },
        {
          "itemHrid": "/items/star_fruit",
          "count": 40000
        },
        {
          "itemHrid": "/items/radiant_fiber",
          "count": 120000
        },
        {
          "itemHrid": "/items/holy_shears",
          "count": 60
        },
        {
          "itemHrid": "/items/super_foraging_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 2
  },
  '/house_rooms/gym': {
    "hrid": "/house_rooms/gym",
    "name": "Gym",
    "skillHrid": "/skills/power",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_power_level",
        "typeHrid": "/buff_types/power_level",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 1,
        "flatBoostLevelBonus": 1,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/cheese_mace",
          "count": 16
        },
        {
          "itemHrid": "/items/cheese_sword",
          "count": 8
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/cheese_mace",
          "count": 24
        },
        {
          "itemHrid": "/items/verdant_mace",
          "count": 24
        },
        {
          "itemHrid": "/items/cheese_sword",
          "count": 12
        },
        {
          "itemHrid": "/items/verdant_sword",
          "count": 12
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/verdant_mace",
          "count": 32
        },
        {
          "itemHrid": "/items/azure_mace",
          "count": 32
        },
        {
          "itemHrid": "/items/verdant_sword",
          "count": 16
        },
        {
          "itemHrid": "/items/azure_sword",
          "count": 16
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/azure_mace",
          "count": 40
        },
        {
          "itemHrid": "/items/burble_mace",
          "count": 40
        },
        {
          "itemHrid": "/items/azure_sword",
          "count": 20
        },
        {
          "itemHrid": "/items/burble_sword",
          "count": 20
        },
        {
          "itemHrid": "/items/power_coffee",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/burble_mace",
          "count": 48
        },
        {
          "itemHrid": "/items/crimson_mace",
          "count": 48
        },
        {
          "itemHrid": "/items/burble_sword",
          "count": 24
        },
        {
          "itemHrid": "/items/crimson_sword",
          "count": 24
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/crimson_mace",
          "count": 56
        },
        {
          "itemHrid": "/items/rainbow_mace",
          "count": 56
        },
        {
          "itemHrid": "/items/crimson_sword",
          "count": 28
        },
        {
          "itemHrid": "/items/rainbow_sword",
          "count": 28
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/rainbow_mace",
          "count": 64
        },
        {
          "itemHrid": "/items/holy_mace",
          "count": 64
        },
        {
          "itemHrid": "/items/rainbow_sword",
          "count": 32
        },
        {
          "itemHrid": "/items/holy_sword",
          "count": 32
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/holy_mace",
          "count": 160
        },
        {
          "itemHrid": "/items/holy_sword",
          "count": 80
        },
        {
          "itemHrid": "/items/super_power_coffee",
          "count": 2000
        }
      ]
    },
    "sortIndex": 14
  },
  '/house_rooms/kitchen': {
    "hrid": "/house_rooms/kitchen",
    "name": "Kitchen",
    "skillHrid": "/skills/cooking",
    "usableInActionTypeMap": {
      "/action_types/cooking": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/sugar",
          "count": 2000
        },
        {
          "itemHrid": "/items/egg",
          "count": 500
        },
        {
          "itemHrid": "/items/wheat",
          "count": 500
        },
        {
          "itemHrid": "/items/cheese_spatula",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/sugar",
          "count": 8000
        },
        {
          "itemHrid": "/items/egg",
          "count": 1000
        },
        {
          "itemHrid": "/items/blueberry",
          "count": 1000
        },
        {
          "itemHrid": "/items/wheat",
          "count": 1000
        },
        {
          "itemHrid": "/items/apple",
          "count": 500
        },
        {
          "itemHrid": "/items/cheese_spatula",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_spatula",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/sugar",
          "count": 20000
        },
        {
          "itemHrid": "/items/blueberry",
          "count": 2000
        },
        {
          "itemHrid": "/items/blackberry",
          "count": 2000
        },
        {
          "itemHrid": "/items/apple",
          "count": 1000
        },
        {
          "itemHrid": "/items/orange",
          "count": 1000
        },
        {
          "itemHrid": "/items/verdant_spatula",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_spatula",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/sugar",
          "count": 48000
        },
        {
          "itemHrid": "/items/blackberry",
          "count": 4000
        },
        {
          "itemHrid": "/items/strawberry",
          "count": 4000
        },
        {
          "itemHrid": "/items/orange",
          "count": 2000
        },
        {
          "itemHrid": "/items/plum",
          "count": 2000
        },
        {
          "itemHrid": "/items/azure_spatula",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_spatula",
          "count": 15
        },
        {
          "itemHrid": "/items/cooking_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/sugar",
          "count": 100000
        },
        {
          "itemHrid": "/items/strawberry",
          "count": 8000
        },
        {
          "itemHrid": "/items/mooberry",
          "count": 8000
        },
        {
          "itemHrid": "/items/plum",
          "count": 4000
        },
        {
          "itemHrid": "/items/peach",
          "count": 4000
        },
        {
          "itemHrid": "/items/burble_spatula",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_spatula",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/sugar",
          "count": 200000
        },
        {
          "itemHrid": "/items/mooberry",
          "count": 16000
        },
        {
          "itemHrid": "/items/marsberry",
          "count": 16000
        },
        {
          "itemHrid": "/items/peach",
          "count": 8000
        },
        {
          "itemHrid": "/items/dragon_fruit",
          "count": 8000
        },
        {
          "itemHrid": "/items/crimson_spatula",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_spatula",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/sugar",
          "count": 360000
        },
        {
          "itemHrid": "/items/marsberry",
          "count": 32000
        },
        {
          "itemHrid": "/items/spaceberry",
          "count": 32000
        },
        {
          "itemHrid": "/items/dragon_fruit",
          "count": 16000
        },
        {
          "itemHrid": "/items/star_fruit",
          "count": 16000
        },
        {
          "itemHrid": "/items/rainbow_spatula",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_spatula",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/sugar",
          "count": 640000
        },
        {
          "itemHrid": "/items/spaceberry",
          "count": 80000
        },
        {
          "itemHrid": "/items/star_fruit",
          "count": 40000
        },
        {
          "itemHrid": "/items/holy_spatula",
          "count": 60
        },
        {
          "itemHrid": "/items/super_cooking_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 7
  },
  '/house_rooms/laboratory': {
    "hrid": "/house_rooms/laboratory",
    "name": "Laboratory",
    "skillHrid": "/skills/alchemy",
    "usableInActionTypeMap": {
      "/action_types/alchemy": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/milking_essence",
          "count": 100
        },
        {
          "itemHrid": "/items/foraging_essence",
          "count": 100
        },
        {
          "itemHrid": "/items/woodcutting_essence",
          "count": 100
        },
        {
          "itemHrid": "/items/cheese_alembic",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/cheesesmithing_essence",
          "count": 200
        },
        {
          "itemHrid": "/items/crafting_essence",
          "count": 200
        },
        {
          "itemHrid": "/items/tailoring_essence",
          "count": 200
        },
        {
          "itemHrid": "/items/cheese_alembic",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_alembic",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cooking_essence",
          "count": 500
        },
        {
          "itemHrid": "/items/brewing_essence",
          "count": 500
        },
        {
          "itemHrid": "/items/verdant_alembic",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_alembic",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/alchemy_essence",
          "count": 1000
        },
        {
          "itemHrid": "/items/enhancing_essence",
          "count": 1000
        },
        {
          "itemHrid": "/items/azure_alembic",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_alembic",
          "count": 15
        },
        {
          "itemHrid": "/items/alchemy_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/milking_essence",
          "count": 1600
        },
        {
          "itemHrid": "/items/foraging_essence",
          "count": 1600
        },
        {
          "itemHrid": "/items/woodcutting_essence",
          "count": 1600
        },
        {
          "itemHrid": "/items/burble_alembic",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_alembic",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/cheesesmithing_essence",
          "count": 3200
        },
        {
          "itemHrid": "/items/crafting_essence",
          "count": 3200
        },
        {
          "itemHrid": "/items/tailoring_essence",
          "count": 3200
        },
        {
          "itemHrid": "/items/crimson_alembic",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_alembic",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/cooking_essence",
          "count": 8000
        },
        {
          "itemHrid": "/items/brewing_essence",
          "count": 8000
        },
        {
          "itemHrid": "/items/rainbow_alembic",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_alembic",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/alchemy_essence",
          "count": 12000
        },
        {
          "itemHrid": "/items/enhancing_essence",
          "count": 12000
        },
        {
          "itemHrid": "/items/holy_alembic",
          "count": 60
        },
        {
          "itemHrid": "/items/super_alchemy_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 9
  },
  '/house_rooms/library': {
    "hrid": "/house_rooms/library",
    "name": "Library",
    "skillHrid": "/skills/intelligence",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_intelligence_level",
        "typeHrid": "/buff_types/intelligence_level",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 1,
        "flatBoostLevelBonus": 1,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_mp_regen",
        "typeHrid": "/buff_types/mp_regen",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0003,
        "flatBoostLevelBonus": 0.0003,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/gummy",
          "count": 250
        },
        {
          "itemHrid": "/items/yogurt",
          "count": 250
        },
        {
          "itemHrid": "/items/poke",
          "count": 2
        },
        {
          "itemHrid": "/items/scratch",
          "count": 2
        },
        {
          "itemHrid": "/items/smack",
          "count": 2
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/gummy",
          "count": 500
        },
        {
          "itemHrid": "/items/apple_gummy",
          "count": 250
        },
        {
          "itemHrid": "/items/yogurt",
          "count": 500
        },
        {
          "itemHrid": "/items/apple_yogurt",
          "count": 250
        },
        {
          "itemHrid": "/items/quick_shot",
          "count": 2
        },
        {
          "itemHrid": "/items/water_strike",
          "count": 2
        },
        {
          "itemHrid": "/items/entangle",
          "count": 2
        },
        {
          "itemHrid": "/items/fireball",
          "count": 2
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/apple_gummy",
          "count": 500
        },
        {
          "itemHrid": "/items/orange_gummy",
          "count": 500
        },
        {
          "itemHrid": "/items/apple_yogurt",
          "count": 500
        },
        {
          "itemHrid": "/items/orange_yogurt",
          "count": 500
        },
        {
          "itemHrid": "/items/toughness",
          "count": 2
        },
        {
          "itemHrid": "/items/precision",
          "count": 2
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/orange_gummy",
          "count": 1000
        },
        {
          "itemHrid": "/items/plum_gummy",
          "count": 1000
        },
        {
          "itemHrid": "/items/orange_yogurt",
          "count": 1000
        },
        {
          "itemHrid": "/items/plum_yogurt",
          "count": 1000
        },
        {
          "itemHrid": "/items/impale",
          "count": 2
        },
        {
          "itemHrid": "/items/cleave",
          "count": 2
        },
        {
          "itemHrid": "/items/sweep",
          "count": 2
        },
        {
          "itemHrid": "/items/intelligence_coffee",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/plum_gummy",
          "count": 2000
        },
        {
          "itemHrid": "/items/peach_gummy",
          "count": 2000
        },
        {
          "itemHrid": "/items/plum_yogurt",
          "count": 2000
        },
        {
          "itemHrid": "/items/peach_yogurt",
          "count": 2000
        },
        {
          "itemHrid": "/items/rain_of_arrows",
          "count": 2
        },
        {
          "itemHrid": "/items/ice_spear",
          "count": 2
        },
        {
          "itemHrid": "/items/flame_blast",
          "count": 2
        },
        {
          "itemHrid": "/items/toxic_pollen",
          "count": 2
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/peach_gummy",
          "count": 4000
        },
        {
          "itemHrid": "/items/dragon_fruit_gummy",
          "count": 4000
        },
        {
          "itemHrid": "/items/peach_yogurt",
          "count": 4000
        },
        {
          "itemHrid": "/items/dragon_fruit_yogurt",
          "count": 4000
        },
        {
          "itemHrid": "/items/berserk",
          "count": 2
        },
        {
          "itemHrid": "/items/frenzy",
          "count": 2
        },
        {
          "itemHrid": "/items/elemental_affinity",
          "count": 2
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/dragon_fruit_gummy",
          "count": 8000
        },
        {
          "itemHrid": "/items/star_fruit_gummy",
          "count": 8000
        },
        {
          "itemHrid": "/items/dragon_fruit_yogurt",
          "count": 8000
        },
        {
          "itemHrid": "/items/star_fruit_yogurt",
          "count": 8000
        },
        {
          "itemHrid": "/items/puncture",
          "count": 2
        },
        {
          "itemHrid": "/items/maim",
          "count": 2
        },
        {
          "itemHrid": "/items/stunning_blow",
          "count": 2
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/star_fruit_gummy",
          "count": 20000
        },
        {
          "itemHrid": "/items/star_fruit_yogurt",
          "count": 20000
        },
        {
          "itemHrid": "/items/silencing_shot",
          "count": 2
        },
        {
          "itemHrid": "/items/frost_surge",
          "count": 2
        },
        {
          "itemHrid": "/items/natures_veil",
          "count": 2
        },
        {
          "itemHrid": "/items/firestorm",
          "count": 2
        },
        {
          "itemHrid": "/items/super_intelligence_coffee",
          "count": 2000
        }
      ]
    },
    "sortIndex": 12
  },
  '/house_rooms/log_shed': {
    "hrid": "/house_rooms/log_shed",
    "name": "Log Shed",
    "skillHrid": "/skills/woodcutting",
    "usableInActionTypeMap": {
      "/action_types/woodcutting": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/log",
          "count": 1500
        },
        {
          "itemHrid": "/items/cheese_hatchet",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/log",
          "count": 3000
        },
        {
          "itemHrid": "/items/birch_log",
          "count": 3000
        },
        {
          "itemHrid": "/items/cheese_hatchet",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_hatchet",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/birch_log",
          "count": 6000
        },
        {
          "itemHrid": "/items/cedar_log",
          "count": 6000
        },
        {
          "itemHrid": "/items/verdant_hatchet",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_hatchet",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/cedar_log",
          "count": 12000
        },
        {
          "itemHrid": "/items/purpleheart_log",
          "count": 12000
        },
        {
          "itemHrid": "/items/azure_hatchet",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_hatchet",
          "count": 15
        },
        {
          "itemHrid": "/items/woodcutting_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/purpleheart_log",
          "count": 24000
        },
        {
          "itemHrid": "/items/ginkgo_log",
          "count": 24000
        },
        {
          "itemHrid": "/items/burble_hatchet",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_hatchet",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/ginkgo_log",
          "count": 48000
        },
        {
          "itemHrid": "/items/redwood_log",
          "count": 48000
        },
        {
          "itemHrid": "/items/crimson_hatchet",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_hatchet",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/redwood_log",
          "count": 96000
        },
        {
          "itemHrid": "/items/arcane_log",
          "count": 96000
        },
        {
          "itemHrid": "/items/rainbow_hatchet",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_hatchet",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/arcane_log",
          "count": 240000
        },
        {
          "itemHrid": "/items/holy_hatchet",
          "count": 60
        },
        {
          "itemHrid": "/items/super_woodcutting_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 3
  },
  '/house_rooms/mystical_study': {
    "hrid": "/house_rooms/mystical_study",
    "name": "Mystical Study",
    "skillHrid": "/skills/magic",
    "usableInActionTypeMap": {
      "/action_types/combat": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_magic_level",
        "typeHrid": "/buff_types/magic_level",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 1,
        "flatBoostLevelBonus": 1,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/wooden_water_staff",
          "count": 4
        },
        {
          "itemHrid": "/items/wooden_nature_staff",
          "count": 4
        },
        {
          "itemHrid": "/items/wooden_fire_staff",
          "count": 4
        },
        {
          "itemHrid": "/items/cotton_hat",
          "count": 4
        },
        {
          "itemHrid": "/items/cotton_robe_top",
          "count": 4
        },
        {
          "itemHrid": "/items/cotton_robe_bottoms",
          "count": 4
        },
        {
          "itemHrid": "/items/cotton_gloves",
          "count": 4
        },
        {
          "itemHrid": "/items/cotton_boots",
          "count": 4
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/wooden_water_staff",
          "count": 6
        },
        {
          "itemHrid": "/items/birch_water_staff",
          "count": 6
        },
        {
          "itemHrid": "/items/wooden_nature_staff",
          "count": 6
        },
        {
          "itemHrid": "/items/birch_nature_staff",
          "count": 6
        },
        {
          "itemHrid": "/items/wooden_fire_staff",
          "count": 6
        },
        {
          "itemHrid": "/items/birch_fire_staff",
          "count": 6
        },
        {
          "itemHrid": "/items/linen_hat",
          "count": 8
        },
        {
          "itemHrid": "/items/linen_robe_top",
          "count": 8
        },
        {
          "itemHrid": "/items/linen_robe_bottoms",
          "count": 8
        },
        {
          "itemHrid": "/items/linen_gloves",
          "count": 8
        },
        {
          "itemHrid": "/items/linen_boots",
          "count": 8
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/birch_water_staff",
          "count": 8
        },
        {
          "itemHrid": "/items/cedar_water_staff",
          "count": 8
        },
        {
          "itemHrid": "/items/birch_nature_staff",
          "count": 8
        },
        {
          "itemHrid": "/items/cedar_nature_staff",
          "count": 8
        },
        {
          "itemHrid": "/items/birch_fire_staff",
          "count": 8
        },
        {
          "itemHrid": "/items/cedar_fire_staff",
          "count": 8
        },
        {
          "itemHrid": "/items/linen_hat",
          "count": 16
        },
        {
          "itemHrid": "/items/linen_robe_top",
          "count": 16
        },
        {
          "itemHrid": "/items/linen_robe_bottoms",
          "count": 16
        },
        {
          "itemHrid": "/items/linen_gloves",
          "count": 16
        },
        {
          "itemHrid": "/items/linen_boots",
          "count": 16
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/cedar_water_staff",
          "count": 10
        },
        {
          "itemHrid": "/items/purpleheart_water_staff",
          "count": 10
        },
        {
          "itemHrid": "/items/cedar_nature_staff",
          "count": 10
        },
        {
          "itemHrid": "/items/purpleheart_nature_staff",
          "count": 10
        },
        {
          "itemHrid": "/items/cedar_fire_staff",
          "count": 10
        },
        {
          "itemHrid": "/items/purpleheart_fire_staff",
          "count": 10
        },
        {
          "itemHrid": "/items/bamboo_hat",
          "count": 16
        },
        {
          "itemHrid": "/items/bamboo_robe_top",
          "count": 16
        },
        {
          "itemHrid": "/items/bamboo_robe_bottoms",
          "count": 16
        },
        {
          "itemHrid": "/items/bamboo_gloves",
          "count": 16
        },
        {
          "itemHrid": "/items/bamboo_boots",
          "count": 16
        },
        {
          "itemHrid": "/items/magic_coffee",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/purpleheart_water_staff",
          "count": 12
        },
        {
          "itemHrid": "/items/ginkgo_water_staff",
          "count": 12
        },
        {
          "itemHrid": "/items/purpleheart_nature_staff",
          "count": 12
        },
        {
          "itemHrid": "/items/ginkgo_nature_staff",
          "count": 12
        },
        {
          "itemHrid": "/items/purpleheart_fire_staff",
          "count": 12
        },
        {
          "itemHrid": "/items/ginkgo_fire_staff",
          "count": 12
        },
        {
          "itemHrid": "/items/bamboo_hat",
          "count": 32
        },
        {
          "itemHrid": "/items/bamboo_robe_top",
          "count": 32
        },
        {
          "itemHrid": "/items/bamboo_robe_bottoms",
          "count": 32
        },
        {
          "itemHrid": "/items/bamboo_gloves",
          "count": 32
        },
        {
          "itemHrid": "/items/bamboo_boots",
          "count": 32
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/ginkgo_water_staff",
          "count": 14
        },
        {
          "itemHrid": "/items/redwood_water_staff",
          "count": 14
        },
        {
          "itemHrid": "/items/ginkgo_nature_staff",
          "count": 14
        },
        {
          "itemHrid": "/items/redwood_nature_staff",
          "count": 14
        },
        {
          "itemHrid": "/items/ginkgo_fire_staff",
          "count": 14
        },
        {
          "itemHrid": "/items/redwood_fire_staff",
          "count": 14
        },
        {
          "itemHrid": "/items/silk_hat",
          "count": 24
        },
        {
          "itemHrid": "/items/silk_robe_top",
          "count": 24
        },
        {
          "itemHrid": "/items/silk_robe_bottoms",
          "count": 24
        },
        {
          "itemHrid": "/items/silk_gloves",
          "count": 24
        },
        {
          "itemHrid": "/items/silk_boots",
          "count": 24
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/redwood_water_staff",
          "count": 16
        },
        {
          "itemHrid": "/items/arcane_water_staff",
          "count": 16
        },
        {
          "itemHrid": "/items/redwood_nature_staff",
          "count": 16
        },
        {
          "itemHrid": "/items/arcane_nature_staff",
          "count": 16
        },
        {
          "itemHrid": "/items/redwood_fire_staff",
          "count": 16
        },
        {
          "itemHrid": "/items/arcane_fire_staff",
          "count": 16
        },
        {
          "itemHrid": "/items/silk_hat",
          "count": 48
        },
        {
          "itemHrid": "/items/silk_robe_top",
          "count": 48
        },
        {
          "itemHrid": "/items/silk_robe_bottoms",
          "count": 48
        },
        {
          "itemHrid": "/items/silk_gloves",
          "count": 48
        },
        {
          "itemHrid": "/items/silk_boots",
          "count": 48
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/arcane_water_staff",
          "count": 40
        },
        {
          "itemHrid": "/items/arcane_nature_staff",
          "count": 40
        },
        {
          "itemHrid": "/items/arcane_fire_staff",
          "count": 40
        },
        {
          "itemHrid": "/items/radiant_hat",
          "count": 40
        },
        {
          "itemHrid": "/items/radiant_robe_top",
          "count": 40
        },
        {
          "itemHrid": "/items/radiant_robe_bottoms",
          "count": 40
        },
        {
          "itemHrid": "/items/radiant_gloves",
          "count": 40
        },
        {
          "itemHrid": "/items/radiant_boots",
          "count": 40
        },
        {
          "itemHrid": "/items/super_magic_coffee",
          "count": 2000
        }
      ]
    },
    "sortIndex": 17
  },
  '/house_rooms/observatory': {
    "hrid": "/house_rooms/observatory",
    "name": "Observatory",
    "skillHrid": "/skills/enhancing",
    "usableInActionTypeMap": {
      "/action_types/enhancing": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_action_speed",
        "typeHrid": "/buff_types/action_speed",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.01,
        "flatBoostLevelBonus": 0.01,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_enhancing_success",
        "typeHrid": "/buff_types/enhancing_success",
        "ratioBoost": 0.0005,
        "ratioBoostLevelBonus": 0.0005,
        "flatBoost": 0,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/swamp_essence",
          "count": 750
        },
        {
          "itemHrid": "/items/cheese_enhancer",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/swamp_essence",
          "count": 1500
        },
        {
          "itemHrid": "/items/aqua_essence",
          "count": 1500
        },
        {
          "itemHrid": "/items/cheese_enhancer",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_enhancer",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/aqua_essence",
          "count": 3000
        },
        {
          "itemHrid": "/items/jungle_essence",
          "count": 3000
        },
        {
          "itemHrid": "/items/verdant_enhancer",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_enhancer",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/jungle_essence",
          "count": 6000
        },
        {
          "itemHrid": "/items/gobo_essence",
          "count": 6000
        },
        {
          "itemHrid": "/items/azure_enhancer",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_enhancer",
          "count": 15
        },
        {
          "itemHrid": "/items/enhancing_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/gobo_essence",
          "count": 12000
        },
        {
          "itemHrid": "/items/eyessence",
          "count": 12000
        },
        {
          "itemHrid": "/items/burble_enhancer",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_enhancer",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/eyessence",
          "count": 24000
        },
        {
          "itemHrid": "/items/sorcerer_essence",
          "count": 24000
        },
        {
          "itemHrid": "/items/crimson_enhancer",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_enhancer",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/sorcerer_essence",
          "count": 48000
        },
        {
          "itemHrid": "/items/bear_essence",
          "count": 48000
        },
        {
          "itemHrid": "/items/rainbow_enhancer",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_enhancer",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/bear_essence",
          "count": 120000
        },
        {
          "itemHrid": "/items/holy_enhancer",
          "count": 60
        },
        {
          "itemHrid": "/items/super_enhancing_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 10
  },
  '/house_rooms/sewing_parlor': {
    "hrid": "/house_rooms/sewing_parlor",
    "name": "Sewing Parlor",
    "skillHrid": "/skills/tailoring",
    "usableInActionTypeMap": {
      "/action_types/tailoring": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 75
        },
        {
          "itemHrid": "/items/rough_leather",
          "count": 180
        },
        {
          "itemHrid": "/items/cotton_fabric",
          "count": 180
        },
        {
          "itemHrid": "/items/cheese_needle",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 150
        },
        {
          "itemHrid": "/items/rough_leather",
          "count": 360
        },
        {
          "itemHrid": "/items/reptile_leather",
          "count": 360
        },
        {
          "itemHrid": "/items/cotton_fabric",
          "count": 360
        },
        {
          "itemHrid": "/items/linen_fabric",
          "count": 360
        },
        {
          "itemHrid": "/items/cheese_needle",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_needle",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 300
        },
        {
          "itemHrid": "/items/reptile_leather",
          "count": 1440
        },
        {
          "itemHrid": "/items/linen_fabric",
          "count": 1440
        },
        {
          "itemHrid": "/items/verdant_needle",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_needle",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 600
        },
        {
          "itemHrid": "/items/reptile_leather",
          "count": 1440
        },
        {
          "itemHrid": "/items/gobo_leather",
          "count": 1440
        },
        {
          "itemHrid": "/items/linen_fabric",
          "count": 1440
        },
        {
          "itemHrid": "/items/bamboo_fabric",
          "count": 1440
        },
        {
          "itemHrid": "/items/azure_needle",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_needle",
          "count": 15
        },
        {
          "itemHrid": "/items/tailoring_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 1200
        },
        {
          "itemHrid": "/items/gobo_leather",
          "count": 5760
        },
        {
          "itemHrid": "/items/bamboo_fabric",
          "count": 5760
        },
        {
          "itemHrid": "/items/burble_needle",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_needle",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 2400
        },
        {
          "itemHrid": "/items/gobo_leather",
          "count": 5760
        },
        {
          "itemHrid": "/items/beast_leather",
          "count": 5760
        },
        {
          "itemHrid": "/items/bamboo_fabric",
          "count": 5760
        },
        {
          "itemHrid": "/items/silk_fabric",
          "count": 5760
        },
        {
          "itemHrid": "/items/crimson_needle",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_needle",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 4800
        },
        {
          "itemHrid": "/items/beast_leather",
          "count": 11520
        },
        {
          "itemHrid": "/items/umbral_leather",
          "count": 11520
        },
        {
          "itemHrid": "/items/silk_fabric",
          "count": 11520
        },
        {
          "itemHrid": "/items/radiant_fabric",
          "count": 11520
        },
        {
          "itemHrid": "/items/rainbow_needle",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_needle",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 12000
        },
        {
          "itemHrid": "/items/umbral_leather",
          "count": 28800
        },
        {
          "itemHrid": "/items/radiant_fabric",
          "count": 28800
        },
        {
          "itemHrid": "/items/holy_needle",
          "count": 60
        },
        {
          "itemHrid": "/items/super_tailoring_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 6
  },
  '/house_rooms/workshop': {
    "hrid": "/house_rooms/workshop",
    "name": "Workshop",
    "skillHrid": "/skills/crafting",
    "usableInActionTypeMap": {
      "/action_types/crafting": true
    },
    "actionBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_efficiency",
        "typeHrid": "/buff_types/efficiency",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.015,
        "flatBoostLevelBonus": 0.015,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "globalBuffs": [
      {
        "uniqueHrid": "/buff_uniques/house_experience",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.0005,
        "flatBoostLevelBonus": 0.0005,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/house_rare_find",
        "typeHrid": "/buff_types/rare_find",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.002,
        "flatBoostLevelBonus": 0.002,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "upgradeCostsMap": {
      "1": [
        {
          "itemHrid": "/items/coin",
          "count": 500000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 450
        },
        {
          "itemHrid": "/items/cheese_chisel",
          "count": 6
        }
      ],
      "2": [
        {
          "itemHrid": "/items/coin",
          "count": 2000000
        },
        {
          "itemHrid": "/items/lumber",
          "count": 900
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 900
        },
        {
          "itemHrid": "/items/cheese_chisel",
          "count": 9
        },
        {
          "itemHrid": "/items/verdant_chisel",
          "count": 9
        }
      ],
      "3": [
        {
          "itemHrid": "/items/coin",
          "count": 5000000
        },
        {
          "itemHrid": "/items/birch_lumber",
          "count": 1800
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 1800
        },
        {
          "itemHrid": "/items/verdant_chisel",
          "count": 12
        },
        {
          "itemHrid": "/items/azure_chisel",
          "count": 12
        }
      ],
      "4": [
        {
          "itemHrid": "/items/coin",
          "count": 12000000
        },
        {
          "itemHrid": "/items/cedar_lumber",
          "count": 3600
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 3600
        },
        {
          "itemHrid": "/items/azure_chisel",
          "count": 15
        },
        {
          "itemHrid": "/items/burble_chisel",
          "count": 15
        },
        {
          "itemHrid": "/items/crafting_tea",
          "count": 1000
        }
      ],
      "5": [
        {
          "itemHrid": "/items/coin",
          "count": 25000000
        },
        {
          "itemHrid": "/items/purpleheart_lumber",
          "count": 7200
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 7200
        },
        {
          "itemHrid": "/items/burble_chisel",
          "count": 18
        },
        {
          "itemHrid": "/items/crimson_chisel",
          "count": 18
        }
      ],
      "6": [
        {
          "itemHrid": "/items/coin",
          "count": 50000000
        },
        {
          "itemHrid": "/items/ginkgo_lumber",
          "count": 14400
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 14400
        },
        {
          "itemHrid": "/items/crimson_chisel",
          "count": 21
        },
        {
          "itemHrid": "/items/rainbow_chisel",
          "count": 21
        }
      ],
      "7": [
        {
          "itemHrid": "/items/coin",
          "count": 90000000
        },
        {
          "itemHrid": "/items/redwood_lumber",
          "count": 28800
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 28800
        },
        {
          "itemHrid": "/items/rainbow_chisel",
          "count": 24
        },
        {
          "itemHrid": "/items/holy_chisel",
          "count": 24
        }
      ],
      "8": [
        {
          "itemHrid": "/items/coin",
          "count": 160000000
        },
        {
          "itemHrid": "/items/arcane_lumber",
          "count": 72000
        },
        {
          "itemHrid": "/items/holy_chisel",
          "count": 60
        },
        {
          "itemHrid": "/items/super_crafting_tea",
          "count": 2000
        }
      ]
    },
    "sortIndex": 5
  }
} as const satisfies Record<HouseRoomHrid, HouseRoom>

// HRID utilities

/**
 * Check if a houseroom HRID is valid
 */
export function validateHouseRoomHrid(hrid: string): hrid is HouseRoomHrid {
  return hrid in HOUSEROOMS
}

/**
 * Check if a houseroom exists
 */
export function houseroomExists(hrid: string): boolean {
  return hrid in HOUSEROOMS
}

// Getter functions
export function getHouseRoom(hrid: HouseRoomHrid): HouseRoom {
  return HOUSEROOMS[hrid]
}

export function getAllHouseRooms(): HouseRoom[] {
  return Object.values(HOUSEROOMS)
}

export function getHouseRoomsSortedByIndex(): HouseRoom[] {
  return getAllHouseRooms().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { HouseRoom }
export type { HouseRoomHrid }
export type HouseRoomId = keyof typeof HOUSEROOMS
export type HouseRoomData = typeof HOUSEROOMS

export const ALL_HOUSE_ROOMS = Object.values(HOUSEROOMS)

// Override sort function - house rooms don't have sortIndex
export function getHouseRoomsSorted(): HouseRoom[] {
  return ALL_HOUSE_ROOMS // House rooms don't have sortIndex property
}

// Additional utility functions
export function getHouseRoomName(hrid: HouseRoomHrid): string {
  return HOUSEROOMS[hrid].name
}

export function getHouseRoomsBySkill(skillHrid: SkillHrid): HouseRoom[] {
  return ALL_HOUSE_ROOMS.filter(room => room.skillHrid === skillHrid)
}

export function getHouseRoomBySkill(skillHrid: SkillHrid): HouseRoom | undefined {
  return ALL_HOUSE_ROOMS.find(room => room.skillHrid === skillHrid)
}

export function getHouseRoomUpgradeCost(hrid: HouseRoomHrid, level: number): Array<{ itemHrid: ItemHrid; count: number }> | undefined {
  const room = HOUSEROOMS[hrid]
  return room.upgradeCostsMap[level.toString()]
}

export function getMaxHouseRoomLevel(hrid: HouseRoomHrid): number {
  const room = HOUSEROOMS[hrid]
  const levels = Object.keys(room.upgradeCostsMap).map(Number)
  return Math.max(...levels, 0)
}

export function calculateRoomBuffValue(
  buff: HouseRoom['actionBuffs'][0] | HouseRoom['globalBuffs'][0],
  roomLevel: number
): { flatValue: number; ratioValue: number } {
  return {
    flatValue: buff.flatBoost + (buff.flatBoostLevelBonus * roomLevel),
    ratioValue: buff.ratioBoost + (buff.ratioBoostLevelBonus * roomLevel)
  }
}

export function getHouseRoomActionBuffs(hrid: HouseRoomHrid): HouseRoom['actionBuffs'] {
  return HOUSEROOMS[hrid].actionBuffs
}

export function getHouseRoomGlobalBuffs(hrid: HouseRoomHrid): HouseRoom['globalBuffs'] {
  return HOUSEROOMS[hrid].globalBuffs
}

export function isRoomUsableInActionType(hrid: HouseRoomHrid, actionType: string): boolean {
  const room = HOUSEROOMS[hrid]
  return room.usableInActionTypeMap[actionType] === true
}

// House rooms organized by associated skill
export const HOUSE_ROOMS_BY_SKILL: Record<SkillHrid, HouseRoom | undefined> = {} as Record<SkillHrid, HouseRoom | undefined>
for (const room of ALL_HOUSE_ROOMS) {
  HOUSE_ROOMS_BY_SKILL[room.skillHrid as SkillHrid] = room
}

// Combat house rooms (rooms that provide combat buffs)
export const COMBAT_HOUSE_ROOMS = ALL_HOUSE_ROOMS.filter(room => 
  room.usableInActionTypeMap['/action_types/combat'] === true
)

// Non-combat house rooms
export const NON_COMBAT_HOUSE_ROOMS = ALL_HOUSE_ROOMS.filter(room => 
  !room.usableInActionTypeMap['/action_types/combat']
)