/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.030Z
 */

import { z } from 'zod'
import { ActionHridEnum, ActionSchema, type Action } from '../schemas/zod/actions.js'
import { SkillHridEnum } from './skills.js'
import { ItemHridEnum } from './items.js'
// Re-export HRID enum from schema
export { ActionHridEnum } from '../schemas/zod/actions.js'
// Re-export schema
export { ActionSchema } from '../schemas/zod/actions.js'

// Type definitions
type ActionHrid = z.infer<typeof ActionHridEnum>

// Data
export const ACTIONS: Record<ActionHrid, Action> = {
  '/actions/alchemy/coinify': {
    "hrid": "/actions/alchemy/coinify",
    "function": "/action_functions/alchemy",
    "type": "/action_types/alchemy",
    "category": "/action_categories/alchemy/alchemy",
    "name": "Coinify",
    "levelRequirement": {
      "skillHrid": "/skills/alchemy",
      "level": 1
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/alchemy/decompose': {
    "hrid": "/actions/alchemy/decompose",
    "function": "/action_functions/alchemy",
    "type": "/action_types/alchemy",
    "category": "/action_categories/alchemy/alchemy",
    "name": "Decompose",
    "levelRequirement": {
      "skillHrid": "/skills/alchemy",
      "level": 1
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/alchemy/transmute': {
    "hrid": "/actions/alchemy/transmute",
    "function": "/action_functions/alchemy",
    "type": "/action_types/alchemy",
    "category": "/action_categories/alchemy/alchemy",
    "name": "Transmute",
    "levelRequirement": {
      "skillHrid": "/skills/alchemy",
      "level": 1
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/brewing/alchemy_tea': {
    "hrid": "/actions/brewing/alchemy_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Alchemy Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 17
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 21
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.029249999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00024375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/black_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      },
      {
        "itemHrid": "/items/alchemy_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/alchemy_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 12
  },
  '/actions/brewing/artisan_tea': {
    "hrid": "/actions/brewing/artisan_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Artisan Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 68
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 53
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07466666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00032839506172839506,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/emp_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 2
      },
      {
        "itemHrid": "/items/crimson_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/artisan_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 45
  },
  '/actions/brewing/attack_coffee': {
    "hrid": "/actions/brewing/attack_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Attack Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 15
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.028749999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00023958333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/robusta_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/blackberry",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/attack_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 10
  },
  '/actions/brewing/blessed_tea': {
    "hrid": "/actions/brewing/blessed_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Blessed Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 78
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 59
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07911111111111112,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/emp_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/spaceberry",
        "count": 2
      },
      {
        "itemHrid": "/items/holy_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/blessed_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 56
  },
  '/actions/brewing/brewing_tea': {
    "hrid": "/actions/brewing/brewing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Brewing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 14
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.028499999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/black_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/orange",
        "count": 1
      },
      {
        "itemHrid": "/items/brewing_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/brewing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 9
  },
  '/actions/brewing/catalytic_tea': {
    "hrid": "/actions/brewing/catalytic_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Catalytic Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 73
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 56
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.0768888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00019074074074074073,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/emp_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/marsberry",
        "count": 2
      },
      {
        "itemHrid": "/items/rainbow_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/catalytic_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 50
  },
  '/actions/brewing/channeling_coffee': {
    "hrid": "/actions/brewing/channeling_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Channeling Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 63
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 50
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06338888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002765432098765432,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/fieriosa_coffee_bean",
        "count": 2
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/holy_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/channeling_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 41
  },
  '/actions/brewing/cheesesmithing_tea': {
    "hrid": "/actions/brewing/cheesesmithing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Cheesesmithing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 20
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 24
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.03333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002777777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/burble_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/orange",
        "count": 1
      },
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheesesmithing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 14
  },
  '/actions/brewing/cooking_tea': {
    "hrid": "/actions/brewing/cooking_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Cooking Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 10
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 15
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.027500000000000004,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002291666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/black_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/apple",
        "count": 1
      },
      {
        "itemHrid": "/items/cooking_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cooking_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/brewing/crafting_tea': {
    "hrid": "/actions/brewing/crafting_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Crafting Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 25
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 27
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.034722222222222224,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00028935185185185184,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/burble_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      },
      {
        "itemHrid": "/items/crafting_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crafting_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 16
  },
  '/actions/brewing/critical_coffee': {
    "hrid": "/actions/brewing/critical_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Critical Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 73
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 56
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.0768888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00019074074074074073,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/spacia_coffee_bean",
        "count": 2
      },
      {
        "itemHrid": "/items/star_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/holy_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/critical_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 51
  },
  '/actions/brewing/defense_coffee': {
    "hrid": "/actions/brewing/defense_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Defense Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 10
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 15
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.027500000000000004,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002291666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/robusta_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/blueberry",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/defense_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 8
  },
  '/actions/brewing/efficiency_tea': {
    "hrid": "/actions/brewing/efficiency_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Efficiency Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 58
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 47
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06144444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002657407407407407,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/red_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/marsberry",
        "count": 2
      },
      {
        "itemHrid": "/items/rainbow_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/efficiency_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 35
  },
  '/actions/brewing/enhancing_tea': {
    "hrid": "/actions/brewing/enhancing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Enhancing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 17
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 21
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.029249999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00024375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/black_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      },
      {
        "itemHrid": "/items/enhancing_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/enhancing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 13
  },
  '/actions/brewing/foraging_tea': {
    "hrid": "/actions/brewing/foraging_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Foraging Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 4
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 9
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.023111111111111114,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0001925925925925926,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/green_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/orange",
        "count": 1
      },
      {
        "itemHrid": "/items/foraging_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/foraging_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/brewing/gathering_tea': {
    "hrid": "/actions/brewing/gathering_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Gathering Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 6
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 11
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.02355555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0001962962962962963,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/green_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/blueberry",
        "count": 2
      },
      {
        "itemHrid": "/items/verdant_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gathering_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/brewing/gourmet_tea': {
    "hrid": "/actions/brewing/gourmet_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Gourmet Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 16
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 20
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.028999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00024166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/black_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/blackberry",
        "count": 2
      },
      {
        "itemHrid": "/items/azure_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gourmet_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 11
  },
  '/actions/brewing/intelligence_coffee': {
    "hrid": "/actions/brewing/intelligence_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Intelligence Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 4
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 9
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.023111111111111114,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0001925925925925926,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/arabica_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/blackberry",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/intelligence_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/brewing/lucky_coffee': {
    "hrid": "/actions/brewing/lucky_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Lucky Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 43
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 38
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.04766666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00019999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/excelsa_coffee_bean",
        "count": 2
      },
      {
        "itemHrid": "/items/peach",
        "count": 1
      },
      {
        "itemHrid": "/items/crimson_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/lucky_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 27
  },
  '/actions/brewing/magic_coffee': {
    "hrid": "/actions/brewing/magic_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Magic Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 30
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 30
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.03611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00030092592592592595,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/liberica_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/magic_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 21
  },
  '/actions/brewing/milking_tea': {
    "hrid": "/actions/brewing/milking_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Milking Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 1
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 6
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.022444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00018703703703703702,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/green_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/apple",
        "count": 1
      },
      {
        "itemHrid": "/items/milking_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/milking_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/brewing/power_coffee': {
    "hrid": "/actions/brewing/power_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Power Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 20
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 24
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.03333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002777777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/liberica_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/blackberry",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/power_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 15
  },
  '/actions/brewing/processing_tea': {
    "hrid": "/actions/brewing/processing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Processing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 43
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 38
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.04766666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00019999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/moolong_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 2
      },
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/processing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 26
  },
  '/actions/brewing/ranged_coffee': {
    "hrid": "/actions/brewing/ranged_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ranged Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 25
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 27
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.034722222222222224,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00028935185185185184,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/liberica_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/strawberry",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ranged_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 17
  },
  '/actions/brewing/stamina_coffee': {
    "hrid": "/actions/brewing/stamina_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Stamina Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 1
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 6
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.022444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00018703703703703702,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/arabica_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/blueberry",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/stamina_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/brewing/super_alchemy_tea': {
    "hrid": "/actions/brewing/super_alchemy_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Alchemy Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 60
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 48
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06222222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00027006172839506176,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/alchemy_tea",
    "inputItems": [
      {
        "itemHrid": "/items/red_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/star_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/alchemy_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_amber",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_alchemy_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 37
  },
  '/actions/brewing/super_attack_coffee': {
    "hrid": "/actions/brewing/super_attack_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Super Attack Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 55
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 45
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06027777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00025925925925925926,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/attack_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/fieriosa_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/marsberry",
        "count": 1
      },
      {
        "itemHrid": "/items/crushed_amber",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_attack_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 33
  },
  '/actions/brewing/super_brewing_tea': {
    "hrid": "/actions/brewing/super_brewing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Brewing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 55
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 45
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06027777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00025925925925925926,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/brewing_tea",
    "inputItems": [
      {
        "itemHrid": "/items/red_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/brewing_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_amber",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_brewing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 31
  },
  '/actions/brewing/super_cheesesmithing_tea': {
    "hrid": "/actions/brewing/super_cheesesmithing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Cheesesmithing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 65
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 51
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00032098765432098765,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheesesmithing_tea",
    "inputItems": [
      {
        "itemHrid": "/items/emp_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/peach",
        "count": 1
      },
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_garnet",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_cheesesmithing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 42
  },
  '/actions/brewing/super_cooking_tea': {
    "hrid": "/actions/brewing/super_cooking_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Cooking Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 50
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 42
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.058333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002484567901234568,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cooking_tea",
    "inputItems": [
      {
        "itemHrid": "/items/red_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/peach",
        "count": 1
      },
      {
        "itemHrid": "/items/cooking_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_amber",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_cooking_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 29
  },
  '/actions/brewing/super_crafting_tea': {
    "hrid": "/actions/brewing/super_crafting_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Crafting Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 70
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 54
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07555555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00018518518518518518,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crafting_tea",
    "inputItems": [
      {
        "itemHrid": "/items/emp_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/crafting_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_jade",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_crafting_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 46
  },
  '/actions/brewing/super_defense_coffee': {
    "hrid": "/actions/brewing/super_defense_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Super Defense Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 50
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 42
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.058333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002484567901234568,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/defense_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/fieriosa_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 1
      },
      {
        "itemHrid": "/items/crushed_amber",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_defense_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 30
  },
  '/actions/brewing/super_enhancing_tea': {
    "hrid": "/actions/brewing/super_enhancing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Enhancing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 60
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 48
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06222222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00027006172839506176,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/enhancing_tea",
    "inputItems": [
      {
        "itemHrid": "/items/red_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/star_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/enhancing_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_amber",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_enhancing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 38
  },
  '/actions/brewing/super_foraging_tea': {
    "hrid": "/actions/brewing/super_foraging_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Foraging Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 40
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 36
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.04666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00019444444444444443,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/foraging_tea",
    "inputItems": [
      {
        "itemHrid": "/items/moolong_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/peach",
        "count": 1
      },
      {
        "itemHrid": "/items/foraging_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_pearl",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_foraging_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 24
  },
  '/actions/brewing/super_intelligence_coffee': {
    "hrid": "/actions/brewing/super_intelligence_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Super Intelligence Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 40
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 36
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.04666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00019444444444444443,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/intelligence_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/excelsa_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 1
      },
      {
        "itemHrid": "/items/crushed_pearl",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_intelligence_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 25
  },
  '/actions/brewing/super_magic_coffee': {
    "hrid": "/actions/brewing/super_magic_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Super Magic Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 75
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 57
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07777777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00019444444444444443,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/magic_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/spacia_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/spaceberry",
        "count": 1
      },
      {
        "itemHrid": "/items/crushed_amethyst",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_magic_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 54
  },
  '/actions/brewing/super_milking_tea': {
    "hrid": "/actions/brewing/super_milking_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Milking Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 35
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 33
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.045000000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00018518518518518518,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/milking_tea",
    "inputItems": [
      {
        "itemHrid": "/items/moolong_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      },
      {
        "itemHrid": "/items/milking_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_pearl",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_milking_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 22
  },
  '/actions/brewing/super_power_coffee': {
    "hrid": "/actions/brewing/super_power_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Super Power Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 65
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 51
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00032098765432098765,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/power_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/spacia_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 1
      },
      {
        "itemHrid": "/items/crushed_garnet",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_power_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 44
  },
  '/actions/brewing/super_ranged_coffee': {
    "hrid": "/actions/brewing/super_ranged_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Super Ranged Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 70
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 54
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07555555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00018518518518518518,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/ranged_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/spacia_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/marsberry",
        "count": 1
      },
      {
        "itemHrid": "/items/crushed_jade",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_ranged_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 48
  },
  '/actions/brewing/super_stamina_coffee': {
    "hrid": "/actions/brewing/super_stamina_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Super Stamina Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 35
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 33
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.045000000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00018518518518518518,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/stamina_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/excelsa_coffee_bean",
        "count": 1
      },
      {
        "itemHrid": "/items/strawberry",
        "count": 1
      },
      {
        "itemHrid": "/items/crushed_pearl",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_stamina_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 23
  },
  '/actions/brewing/super_tailoring_tea': {
    "hrid": "/actions/brewing/super_tailoring_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Tailoring Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 75
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 57
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07777777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00019444444444444443,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/tailoring_tea",
    "inputItems": [
      {
        "itemHrid": "/items/emp_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/star_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/tailoring_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_amethyst",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_tailoring_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 52
  },
  '/actions/brewing/super_woodcutting_tea': {
    "hrid": "/actions/brewing/super_woodcutting_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Super Woodcutting Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 45
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 39
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.04833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002037037037037037,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/woodcutting_tea",
    "inputItems": [
      {
        "itemHrid": "/items/moolong_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/woodcutting_essence",
        "count": 2
      },
      {
        "itemHrid": "/items/crushed_pearl",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/super_woodcutting_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 28
  },
  '/actions/brewing/swiftness_coffee': {
    "hrid": "/actions/brewing/swiftness_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Swiftness Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 58
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 47
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06144444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002657407407407407,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/fieriosa_coffee_bean",
        "count": 2
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "count": 1
      },
      {
        "itemHrid": "/items/rainbow_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/swiftness_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 36
  },
  '/actions/brewing/tailoring_tea': {
    "hrid": "/actions/brewing/tailoring_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Tailoring Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 30
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 30
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.03611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00030092592592592595,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/burble_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/peach",
        "count": 1
      },
      {
        "itemHrid": "/items/tailoring_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/tailoring_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 20
  },
  '/actions/brewing/ultra_alchemy_tea': {
    "hrid": "/actions/brewing/ultra_alchemy_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Alchemy Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 80
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 66
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00017824074074074075,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_alchemy_tea",
    "inputItems": [
      {
        "itemHrid": "/items/alchemy_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_alchemy_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 57
  },
  '/actions/brewing/ultra_attack_coffee': {
    "hrid": "/actions/brewing/ultra_attack_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ultra Attack Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 75
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 63
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06805555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001701388888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_attack_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_attack_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 55
  },
  '/actions/brewing/ultra_brewing_tea': {
    "hrid": "/actions/brewing/ultra_brewing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Brewing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 75
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 63
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.06805555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001701388888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_brewing_tea",
    "inputItems": [
      {
        "itemHrid": "/items/brewing_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_brewing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 53
  },
  '/actions/brewing/ultra_cheesesmithing_tea': {
    "hrid": "/actions/brewing/ultra_cheesesmithing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Cheesesmithing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 85
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 69
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.08222222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00021296296296296295,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_cheesesmithing_tea",
    "inputItems": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_cheesesmithing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 59
  },
  '/actions/brewing/ultra_cooking_tea': {
    "hrid": "/actions/brewing/ultra_cooking_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Cooking Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 70
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 60
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.0661111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00016203703703703703,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_cooking_tea",
    "inputItems": [
      {
        "itemHrid": "/items/cooking_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_cooking_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 47
  },
  '/actions/brewing/ultra_crafting_tea': {
    "hrid": "/actions/brewing/ultra_crafting_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Crafting Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 90
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 72
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.08444444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0002222222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_crafting_tea",
    "inputItems": [
      {
        "itemHrid": "/items/crafting_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_crafting_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 61
  },
  '/actions/brewing/ultra_defense_coffee': {
    "hrid": "/actions/brewing/ultra_defense_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ultra Defense Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 70
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 60
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.0661111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00016203703703703703,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_defense_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_defense_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 49
  },
  '/actions/brewing/ultra_enhancing_tea': {
    "hrid": "/actions/brewing/ultra_enhancing_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Enhancing Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 80
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 66
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.07,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00017824074074074075,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_enhancing_tea",
    "inputItems": [
      {
        "itemHrid": "/items/enhancing_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_enhancing_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 58
  },
  '/actions/brewing/ultra_foraging_tea': {
    "hrid": "/actions/brewing/ultra_foraging_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Foraging Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 60
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 54
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.05333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002314814814814815,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_foraging_tea",
    "inputItems": [
      {
        "itemHrid": "/items/foraging_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_foraging_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 39
  },
  '/actions/brewing/ultra_intelligence_coffee': {
    "hrid": "/actions/brewing/ultra_intelligence_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ultra Intelligence Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 60
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 54
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.05333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0002314814814814815,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_intelligence_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_intelligence_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 40
  },
  '/actions/brewing/ultra_magic_coffee': {
    "hrid": "/actions/brewing/ultra_magic_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ultra Magic Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 95
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 75
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.08666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00023148148148148146,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_magic_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_magic_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 64
  },
  '/actions/brewing/ultra_milking_tea': {
    "hrid": "/actions/brewing/ultra_milking_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Milking Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 55
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 51
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.051666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00022222222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_milking_tea",
    "inputItems": [
      {
        "itemHrid": "/items/milking_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_milking_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 32
  },
  '/actions/brewing/ultra_power_coffee': {
    "hrid": "/actions/brewing/ultra_power_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ultra Power Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 85
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 69
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.08222222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00021296296296296295,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_power_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_power_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 60
  },
  '/actions/brewing/ultra_ranged_coffee': {
    "hrid": "/actions/brewing/ultra_ranged_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ultra Ranged Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 90
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 72
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.08444444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0002222222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_ranged_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_ranged_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 62
  },
  '/actions/brewing/ultra_stamina_coffee': {
    "hrid": "/actions/brewing/ultra_stamina_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Ultra Stamina Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 55
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 51
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.051666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00022222222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_stamina_coffee",
    "inputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_stamina_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 34
  },
  '/actions/brewing/ultra_tailoring_tea': {
    "hrid": "/actions/brewing/ultra_tailoring_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Tailoring Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 95
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 75
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.08666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00023148148148148146,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_tailoring_tea",
    "inputItems": [
      {
        "itemHrid": "/items/tailoring_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_tailoring_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 63
  },
  '/actions/brewing/ultra_woodcutting_tea': {
    "hrid": "/actions/brewing/ultra_woodcutting_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Ultra Woodcutting Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 65
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 57
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.05499999999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00024074074074074075,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/super_woodcutting_tea",
    "inputItems": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "count": 4
      },
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ultra_woodcutting_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 43
  },
  '/actions/brewing/wisdom_coffee': {
    "hrid": "/actions/brewing/wisdom_coffee",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/coffee",
    "name": "Wisdom Coffee",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 26
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 29
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.034999999999999996,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002916666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/liberica_coffee_bean",
        "count": 2
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      },
      {
        "itemHrid": "/items/burble_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wisdom_coffee",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 19
  },
  '/actions/brewing/wisdom_tea': {
    "hrid": "/actions/brewing/wisdom_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Wisdom Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 26
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 29
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.034999999999999996,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002916666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/burble_tea_leaf",
        "count": 2
      },
      {
        "itemHrid": "/items/strawberry",
        "count": 2
      },
      {
        "itemHrid": "/items/burble_milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wisdom_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 18
  },
  '/actions/brewing/woodcutting_tea': {
    "hrid": "/actions/brewing/woodcutting_tea",
    "function": "/action_functions/production",
    "type": "/action_types/brewing",
    "category": "/action_categories/brewing/tea",
    "name": "Woodcutting Tea",
    "levelRequirement": {
      "skillHrid": "/skills/brewing",
      "level": 7
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/brewing",
      "value": 12
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/brewing_essence",
        "dropRate": 0.02377777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00019814814814814814,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/green_tea_leaf",
        "count": 1
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      },
      {
        "itemHrid": "/items/woodcutting_essence",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/woodcutting_tea",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/cheesesmithing/anchorbound_plate_body': {
    "hrid": "/actions/cheesesmithing/anchorbound_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Anchorbound Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/colossus_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/damaged_anchor",
        "count": 10
      },
      {
        "itemHrid": "/items/holy_plate_body",
        "count": 10
      },
      {
        "itemHrid": "/items/griffin_tunic",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/anchorbound_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 188
  },
  '/actions/cheesesmithing/anchorbound_plate_legs': {
    "hrid": "/actions/cheesesmithing/anchorbound_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Anchorbound Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 160000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/colossus_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/damaged_anchor",
        "count": 8
      },
      {
        "itemHrid": "/items/holy_plate_legs",
        "count": 10
      },
      {
        "itemHrid": "/items/griffin_chaps",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/anchorbound_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 182
  },
  '/actions/cheesesmithing/azure_alembic': {
    "hrid": "/actions/cheesesmithing/azure_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 26
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.056,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00046666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_alembic",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 59
  },
  '/actions/cheesesmithing/azure_boots': {
    "hrid": "/actions/cheesesmithing/azure_boots",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Azure Boots",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 20
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_boots",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 45
  },
  '/actions/cheesesmithing/azure_brush': {
    "hrid": "/actions/cheesesmithing/azure_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 22
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05422222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045185185185185183,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_brush",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 24
      },
      {
        "itemHrid": "/items/cedar_log",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 48
  },
  '/actions/cheesesmithing/azure_buckler': {
    "hrid": "/actions/cheesesmithing/azure_buckler",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Azure Buckler",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 26
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 60
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.056,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00046666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_buckler",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_buckler",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 62
  },
  '/actions/cheesesmithing/azure_bulwark': {
    "hrid": "/actions/cheesesmithing/azure_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Azure Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 27
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 120
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05644444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00047037037037037034,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 63
  },
  '/actions/cheesesmithing/azure_cheese': {
    "hrid": "/actions/cheesesmithing/azure_cheese",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/material",
    "name": "Azure Cheese",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 12.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/azure_milk",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 44
  },
  '/actions/cheesesmithing/azure_chisel': {
    "hrid": "/actions/cheesesmithing/azure_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 24
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05511111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045925925925925925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_chisel",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 24
      },
      {
        "itemHrid": "/items/cedar_log",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 53
  },
  '/actions/cheesesmithing/azure_enhancer': {
    "hrid": "/actions/cheesesmithing/azure_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 26
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.056,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00046666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_enhancer",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 60
  },
  '/actions/cheesesmithing/azure_gauntlets': {
    "hrid": "/actions/cheesesmithing/azure_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Azure Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 21
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05377777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004481481481481481,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 46
  },
  '/actions/cheesesmithing/azure_hammer': {
    "hrid": "/actions/cheesesmithing/azure_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 24
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05511111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045925925925925925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_hammer",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 24
      },
      {
        "itemHrid": "/items/cedar_log",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 52
  },
  '/actions/cheesesmithing/azure_hatchet': {
    "hrid": "/actions/cheesesmithing/azure_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 22
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05422222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045185185185185183,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_hatchet",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 24
      },
      {
        "itemHrid": "/items/cedar_log",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 50
  },
  '/actions/cheesesmithing/azure_helmet': {
    "hrid": "/actions/cheesesmithing/azure_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Azure Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 26
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 50
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.056,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00046666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 61
  },
  '/actions/cheesesmithing/azure_mace': {
    "hrid": "/actions/cheesesmithing/azure_mace",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Azure Mace",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 25
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 90
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05555555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004629629629629629,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_mace",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      },
      {
        "itemHrid": "/items/cedar_log",
        "count": 32
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_mace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 57
  },
  '/actions/cheesesmithing/azure_needle': {
    "hrid": "/actions/cheesesmithing/azure_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 24
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05511111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045925925925925925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_needle",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 54
  },
  '/actions/cheesesmithing/azure_plate_body': {
    "hrid": "/actions/cheesesmithing/azure_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Azure Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 29
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 80
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05733333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00047777777777777776,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 32
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 66
  },
  '/actions/cheesesmithing/azure_plate_legs': {
    "hrid": "/actions/cheesesmithing/azure_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Azure Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 28
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05688888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004740740740740741,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 64
  },
  '/actions/cheesesmithing/azure_pot': {
    "hrid": "/actions/cheesesmithing/azure_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 24
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05511111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045925925925925925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_pot",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 56
  },
  '/actions/cheesesmithing/azure_shears': {
    "hrid": "/actions/cheesesmithing/azure_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 22
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05422222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045185185185185183,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_shears",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 24
      },
      {
        "itemHrid": "/items/cedar_log",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 49
  },
  '/actions/cheesesmithing/azure_spatula': {
    "hrid": "/actions/cheesesmithing/azure_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Azure Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 24
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 70
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05511111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045925925925925925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_spatula",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 55
  },
  '/actions/cheesesmithing/azure_spear': {
    "hrid": "/actions/cheesesmithing/azure_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Azure Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 23
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 90
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05466666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004555555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_spear",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 28
      },
      {
        "itemHrid": "/items/cedar_log",
        "count": 32
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 51
  },
  '/actions/cheesesmithing/azure_sword': {
    "hrid": "/actions/cheesesmithing/azure_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Azure Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 21
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 90
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.05377777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004481481481481481,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/verdant_sword",
    "inputItems": [
      {
        "itemHrid": "/items/azure_cheese",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/azure_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 47
  },
  '/actions/cheesesmithing/black_bear_shoes': {
    "hrid": "/actions/cheesesmithing/black_bear_shoes",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Black Bear Shoes",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 65
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 10000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.27499999999999997,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012037037037037038,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_boots",
    "inputItems": [
      {
        "itemHrid": "/items/black_bear_fluff",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/black_bear_shoes",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 115
  },
  '/actions/cheesesmithing/burble_alembic': {
    "hrid": "/actions/cheesesmithing/burble_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 41
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00044166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_alembic",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 83
  },
  '/actions/cheesesmithing/burble_boots': {
    "hrid": "/actions/cheesesmithing/burble_boots",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Burble Boots",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 35
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 96
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00041666666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_boots",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 70
  },
  '/actions/cheesesmithing/burble_brush': {
    "hrid": "/actions/cheesesmithing/burble_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 37
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10275000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_brush",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 36
      },
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 73
  },
  '/actions/cheesesmithing/burble_buckler': {
    "hrid": "/actions/cheesesmithing/burble_buckler",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Burble Buckler",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 41
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 144
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00044166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_buckler",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_buckler",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 86
  },
  '/actions/cheesesmithing/burble_bulwark': {
    "hrid": "/actions/cheesesmithing/burble_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Burble Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 42
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 288
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1065,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00044583333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 87
  },
  '/actions/cheesesmithing/burble_cheese': {
    "hrid": "/actions/cheesesmithing/burble_cheese",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/material",
    "name": "Burble Cheese",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 20
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/burble_milk",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 69
  },
  '/actions/cheesesmithing/burble_chisel': {
    "hrid": "/actions/cheesesmithing/burble_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 39
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10425,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00043333333333333337,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_chisel",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 36
      },
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 78
  },
  '/actions/cheesesmithing/burble_enhancer': {
    "hrid": "/actions/cheesesmithing/burble_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 41
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00044166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_enhancer",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 84
  },
  '/actions/cheesesmithing/burble_gauntlets': {
    "hrid": "/actions/cheesesmithing/burble_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Burble Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 36
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 96
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10200000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 71
  },
  '/actions/cheesesmithing/burble_hammer': {
    "hrid": "/actions/cheesesmithing/burble_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 39
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10425,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00043333333333333337,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_hammer",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 36
      },
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 77
  },
  '/actions/cheesesmithing/burble_hatchet': {
    "hrid": "/actions/cheesesmithing/burble_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 37
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10275000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_hatchet",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 36
      },
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 75
  },
  '/actions/cheesesmithing/burble_helmet': {
    "hrid": "/actions/cheesesmithing/burble_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Burble Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 41
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 120
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00044166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 85
  },
  '/actions/cheesesmithing/burble_mace': {
    "hrid": "/actions/cheesesmithing/burble_mace",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Burble Mace",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 40
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.105,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00043749999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_mace",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      },
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_mace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 82
  },
  '/actions/cheesesmithing/burble_needle': {
    "hrid": "/actions/cheesesmithing/burble_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 39
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10425,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00043333333333333337,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_needle",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 79
  },
  '/actions/cheesesmithing/burble_plate_body': {
    "hrid": "/actions/cheesesmithing/burble_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Burble Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 44
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 192
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.108,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0004541666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 89
  },
  '/actions/cheesesmithing/burble_plate_legs': {
    "hrid": "/actions/cheesesmithing/burble_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Burble Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 43
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10725,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00045,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 88
  },
  '/actions/cheesesmithing/burble_pot': {
    "hrid": "/actions/cheesesmithing/burble_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 39
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10425,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00043333333333333337,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_pot",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 81
  },
  '/actions/cheesesmithing/burble_shears': {
    "hrid": "/actions/cheesesmithing/burble_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 37
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10275000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_shears",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 36
      },
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 74
  },
  '/actions/cheesesmithing/burble_spatula': {
    "hrid": "/actions/cheesesmithing/burble_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Burble Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 39
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 168
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10425,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00043333333333333337,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_spatula",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 80
  },
  '/actions/cheesesmithing/burble_spear': {
    "hrid": "/actions/cheesesmithing/burble_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Burble Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 38
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1035,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042916666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_spear",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 42
      },
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 76
  },
  '/actions/cheesesmithing/burble_sword': {
    "hrid": "/actions/cheesesmithing/burble_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Burble Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 36
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.10200000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_sword",
    "inputItems": [
      {
        "itemHrid": "/items/burble_cheese",
        "count": 54
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/burble_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 72
  },
  '/actions/cheesesmithing/celestial_alembic': {
    "hrid": "/actions/cheesesmithing/celestial_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_alembic",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/alchemy_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 172
  },
  '/actions/cheesesmithing/celestial_brush': {
    "hrid": "/actions/cheesesmithing/celestial_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_brush",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/milking_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 164
  },
  '/actions/cheesesmithing/celestial_chisel': {
    "hrid": "/actions/cheesesmithing/celestial_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_chisel",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/crafting_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 168
  },
  '/actions/cheesesmithing/celestial_enhancer': {
    "hrid": "/actions/cheesesmithing/celestial_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_enhancer",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/enhancing_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 173
  },
  '/actions/cheesesmithing/celestial_hammer': {
    "hrid": "/actions/cheesesmithing/celestial_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_hammer",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 167
  },
  '/actions/cheesesmithing/celestial_hatchet': {
    "hrid": "/actions/cheesesmithing/celestial_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_hatchet",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/woodcutting_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 166
  },
  '/actions/cheesesmithing/celestial_needle': {
    "hrid": "/actions/cheesesmithing/celestial_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_needle",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/tailoring_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 169
  },
  '/actions/cheesesmithing/celestial_pot': {
    "hrid": "/actions/cheesesmithing/celestial_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_pot",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/brewing_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 171
  },
  '/actions/cheesesmithing/celestial_shears': {
    "hrid": "/actions/cheesesmithing/celestial_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_shears",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/foraging_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 165
  },
  '/actions/cheesesmithing/celestial_spatula': {
    "hrid": "/actions/cheesesmithing/celestial_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Celestial Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_spatula",
    "inputItems": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 10
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 10
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 25
      },
      {
        "itemHrid": "/items/star_fragment",
        "count": 100
      },
      {
        "itemHrid": "/items/cooking_essence",
        "count": 180000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/celestial_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 170
  },
  '/actions/cheesesmithing/chaotic_flail': {
    "hrid": "/actions/cheesesmithing/chaotic_flail",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Chaotic Flail",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/granite_bludgeon",
    "inputItems": [
      {
        "itemHrid": "/items/chaotic_chain",
        "count": 20
      },
      {
        "itemHrid": "/items/holy_mace",
        "count": 60
      },
      {
        "itemHrid": "/items/garnet",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/chaotic_flail",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 186
  },
  '/actions/cheesesmithing/cheese': {
    "hrid": "/actions/cheesesmithing/cheese",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/material",
    "name": "Cheese",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/milk",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/cheesesmithing/cheese_alembic': {
    "hrid": "/actions/cheesesmithing/cheese_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 6
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014722222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 15
  },
  '/actions/cheesesmithing/cheese_boots': {
    "hrid": "/actions/cheesesmithing/cheese_boots",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Cheese Boots",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/cheesesmithing/cheese_brush': {
    "hrid": "/actions/cheesesmithing/cheese_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 2
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 12
      },
      {
        "itemHrid": "/items/log",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/cheesesmithing/cheese_buckler': {
    "hrid": "/actions/cheesesmithing/cheese_buckler",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Cheese Buckler",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 6
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 12
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014722222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_buckler",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 18
  },
  '/actions/cheesesmithing/cheese_bulwark': {
    "hrid": "/actions/cheesesmithing/cheese_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Cheese Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 7
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 24
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0001486111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 19
  },
  '/actions/cheesesmithing/cheese_chisel': {
    "hrid": "/actions/cheesesmithing/cheese_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 4
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 12
      },
      {
        "itemHrid": "/items/log",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 10
  },
  '/actions/cheesesmithing/cheese_enhancer': {
    "hrid": "/actions/cheesesmithing/cheese_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 6
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014722222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 16
  },
  '/actions/cheesesmithing/cheese_gauntlets': {
    "hrid": "/actions/cheesesmithing/cheese_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Cheese Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/cheesesmithing/cheese_hammer': {
    "hrid": "/actions/cheesesmithing/cheese_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 4
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 12
      },
      {
        "itemHrid": "/items/log",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 9
  },
  '/actions/cheesesmithing/cheese_hatchet': {
    "hrid": "/actions/cheesesmithing/cheese_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 2
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 12
      },
      {
        "itemHrid": "/items/log",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/cheesesmithing/cheese_helmet': {
    "hrid": "/actions/cheesesmithing/cheese_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Cheese Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 6
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014722222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 17
  },
  '/actions/cheesesmithing/cheese_mace': {
    "hrid": "/actions/cheesesmithing/cheese_mace",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Cheese Mace",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 5
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.0175,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014583333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      },
      {
        "itemHrid": "/items/log",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_mace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 14
  },
  '/actions/cheesesmithing/cheese_needle': {
    "hrid": "/actions/cheesesmithing/cheese_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 4
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 11
  },
  '/actions/cheesesmithing/cheese_plate_body': {
    "hrid": "/actions/cheesesmithing/cheese_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Cheese Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 9
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 16
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.018166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0001513888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 21
  },
  '/actions/cheesesmithing/cheese_plate_legs': {
    "hrid": "/actions/cheesesmithing/cheese_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Cheese Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 8
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.018000000000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00015000000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 20
  },
  '/actions/cheesesmithing/cheese_pot': {
    "hrid": "/actions/cheesesmithing/cheese_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 4
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 13
  },
  '/actions/cheesesmithing/cheese_shears': {
    "hrid": "/actions/cheesesmithing/cheese_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 2
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 12
      },
      {
        "itemHrid": "/items/log",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/cheesesmithing/cheese_spatula': {
    "hrid": "/actions/cheesesmithing/cheese_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Cheese Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 4
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 12
  },
  '/actions/cheesesmithing/cheese_spear': {
    "hrid": "/actions/cheesesmithing/cheese_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Cheese Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 3
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.017166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014305555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 14
      },
      {
        "itemHrid": "/items/log",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 8
  },
  '/actions/cheesesmithing/cheese_sword': {
    "hrid": "/actions/cheesesmithing/cheese_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Cheese Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheese",
        "count": 18
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheese_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/cheesesmithing/colossus_plate_body': {
    "hrid": "/actions/cheesesmithing/colossus_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Colossus Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 50000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/colossus_core",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/colossus_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 174
  },
  '/actions/cheesesmithing/colossus_plate_legs': {
    "hrid": "/actions/cheesesmithing/colossus_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Colossus Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/colossus_core",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/colossus_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 175
  },
  '/actions/cheesesmithing/corsair_helmet': {
    "hrid": "/actions/cheesesmithing/corsair_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Corsair Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 93
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 120000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.32166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008541666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/fluffy_red_hat",
    "inputItems": [
      {
        "itemHrid": "/items/corsair_crest",
        "count": 10
      },
      {
        "itemHrid": "/items/holy_helmet",
        "count": 30
      },
      {
        "itemHrid": "/items/vision_helmet",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/corsair_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 180
  },
  '/actions/cheesesmithing/crimson_alembic': {
    "hrid": "/actions/cheesesmithing/crimson_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 56
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.195,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008402777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_alembic",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 104
  },
  '/actions/cheesesmithing/crimson_boots': {
    "hrid": "/actions/cheesesmithing/crimson_boots",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Crimson Boots",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 50
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0007986111111111112,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_boots",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 91
  },
  '/actions/cheesesmithing/crimson_brush': {
    "hrid": "/actions/cheesesmithing/crimson_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 52
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_brush",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 54
      },
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 94
  },
  '/actions/cheesesmithing/crimson_buckler': {
    "hrid": "/actions/cheesesmithing/crimson_buckler",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Crimson Buckler",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 56
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 324
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.195,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008402777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_buckler",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 54
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_buckler",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 107
  },
  '/actions/cheesesmithing/crimson_bulwark': {
    "hrid": "/actions/cheesesmithing/crimson_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Crimson Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 57
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 648
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008472222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 108
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 108
  },
  '/actions/cheesesmithing/crimson_cheese': {
    "hrid": "/actions/cheesesmithing/crimson_cheese",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/material",
    "name": "Crimson Cheese",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 30
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_milk",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 90
  },
  '/actions/cheesesmithing/crimson_chisel': {
    "hrid": "/actions/cheesesmithing/crimson_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 54
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008263888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_chisel",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 54
      },
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 99
  },
  '/actions/cheesesmithing/crimson_enhancer': {
    "hrid": "/actions/cheesesmithing/crimson_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 56
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.195,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008402777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_enhancer",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 105
  },
  '/actions/cheesesmithing/crimson_gauntlets': {
    "hrid": "/actions/cheesesmithing/crimson_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Crimson Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 51
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.18875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008055555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 92
  },
  '/actions/cheesesmithing/crimson_hammer': {
    "hrid": "/actions/cheesesmithing/crimson_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 54
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008263888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_hammer",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 54
      },
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 98
  },
  '/actions/cheesesmithing/crimson_hatchet': {
    "hrid": "/actions/cheesesmithing/crimson_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 52
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_hatchet",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 54
      },
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 96
  },
  '/actions/cheesesmithing/crimson_helmet': {
    "hrid": "/actions/cheesesmithing/crimson_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Crimson Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 56
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 270
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.195,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008402777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 45
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 106
  },
  '/actions/cheesesmithing/crimson_mace': {
    "hrid": "/actions/cheesesmithing/crimson_mace",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Crimson Mace",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 55
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 486
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_mace",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      },
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_mace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 103
  },
  '/actions/cheesesmithing/crimson_needle': {
    "hrid": "/actions/cheesesmithing/crimson_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 54
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008263888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_needle",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 100
  },
  '/actions/cheesesmithing/crimson_plate_body': {
    "hrid": "/actions/cheesesmithing/crimson_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Crimson Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 59
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 432
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 112
  },
  '/actions/cheesesmithing/crimson_plate_legs': {
    "hrid": "/actions/cheesesmithing/crimson_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Crimson Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 58
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1975,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008541666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 109
  },
  '/actions/cheesesmithing/crimson_pot': {
    "hrid": "/actions/cheesesmithing/crimson_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 54
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008263888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_pot",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 102
  },
  '/actions/cheesesmithing/crimson_shears': {
    "hrid": "/actions/cheesesmithing/crimson_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 52
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_shears",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 54
      },
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 95
  },
  '/actions/cheesesmithing/crimson_spatula': {
    "hrid": "/actions/cheesesmithing/crimson_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Crimson Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 54
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 378
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.1925,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008263888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_spatula",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 101
  },
  '/actions/cheesesmithing/crimson_spear': {
    "hrid": "/actions/cheesesmithing/crimson_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Crimson Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 53
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 486
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008194444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_spear",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 63
      },
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 97
  },
  '/actions/cheesesmithing/crimson_sword': {
    "hrid": "/actions/cheesesmithing/crimson_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Crimson Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 51
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 486
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.18875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008055555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/burble_sword",
    "inputItems": [
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 81
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crimson_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 93
  },
  '/actions/cheesesmithing/demonic_plate_body': {
    "hrid": "/actions/cheesesmithing/demonic_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Demonic Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 50000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/demonic_core",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/demonic_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 176
  },
  '/actions/cheesesmithing/demonic_plate_legs': {
    "hrid": "/actions/cheesesmithing/demonic_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Demonic Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/demonic_core",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/demonic_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 177
  },
  '/actions/cheesesmithing/dodocamel_gauntlets': {
    "hrid": "/actions/cheesesmithing/dodocamel_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Dodocamel Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 92
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.31999999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008472222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/dodocamel_plume",
        "count": 6
      },
      {
        "itemHrid": "/items/holy_gauntlets",
        "count": 30
      },
      {
        "itemHrid": "/items/panda_gloves",
        "count": 5
      },
      {
        "itemHrid": "/items/pincer_gloves",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/dodocamel_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 179
  },
  '/actions/cheesesmithing/furious_spear': {
    "hrid": "/actions/cheesesmithing/furious_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Furious Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/stalactite_spear",
    "inputItems": [
      {
        "itemHrid": "/items/regal_jewel",
        "count": 10
      },
      {
        "itemHrid": "/items/sundering_jewel",
        "count": 10
      },
      {
        "itemHrid": "/items/holy_spear",
        "count": 60
      },
      {
        "itemHrid": "/items/garnet",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/furious_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 185
  },
  '/actions/cheesesmithing/granite_bludgeon': {
    "hrid": "/actions/cheesesmithing/granite_bludgeon",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Granite Bludgeon",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 85
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.30833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000798611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_mace",
    "inputItems": [
      {
        "itemHrid": "/items/living_granite",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/granite_bludgeon",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 154
  },
  '/actions/cheesesmithing/griffin_bulwark': {
    "hrid": "/actions/cheesesmithing/griffin_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Griffin Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 95
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.32499999999999996,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008680555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/spiked_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/griffin_talon",
        "count": 20
      },
      {
        "itemHrid": "/items/griffin_leather",
        "count": 10
      },
      {
        "itemHrid": "/items/holy_bulwark",
        "count": 60
      },
      {
        "itemHrid": "/items/amber",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/griffin_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 184
  },
  '/actions/cheesesmithing/grizzly_bear_shoes': {
    "hrid": "/actions/cheesesmithing/grizzly_bear_shoes",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Grizzly Bear Shoes",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 65
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 10000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.27499999999999997,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012037037037037038,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_boots",
    "inputItems": [
      {
        "itemHrid": "/items/grizzly_bear_fluff",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/grizzly_bear_shoes",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 116
  },
  '/actions/cheesesmithing/holy_alembic': {
    "hrid": "/actions/cheesesmithing/holy_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 86
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6975,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0018124999999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_alembic",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 157
  },
  '/actions/cheesesmithing/holy_boots': {
    "hrid": "/actions/cheesesmithing/holy_boots",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Holy Boots",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 80
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 792
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.675,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017187500000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_boots",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 139
  },
  '/actions/cheesesmithing/holy_brush': {
    "hrid": "/actions/cheesesmithing/holy_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 82
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6825,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_brush",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 108
      },
      {
        "itemHrid": "/items/arcane_log",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 142
  },
  '/actions/cheesesmithing/holy_buckler': {
    "hrid": "/actions/cheesesmithing/holy_buckler",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Holy Buckler",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 86
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1188
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6975,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0018124999999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_buckler",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 108
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_buckler",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 160
  },
  '/actions/cheesesmithing/holy_bulwark': {
    "hrid": "/actions/cheesesmithing/holy_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Holy Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 87
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 2376
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.70125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0018281249999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 216
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 161
  },
  '/actions/cheesesmithing/holy_cheese': {
    "hrid": "/actions/cheesesmithing/holy_cheese",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/material",
    "name": "Holy Cheese",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 55
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/holy_milk",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 138
  },
  '/actions/cheesesmithing/holy_chisel': {
    "hrid": "/actions/cheesesmithing/holy_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 84
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6900000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017812499999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_chisel",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 108
      },
      {
        "itemHrid": "/items/arcane_log",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 147
  },
  '/actions/cheesesmithing/holy_enhancer': {
    "hrid": "/actions/cheesesmithing/holy_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 86
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6975,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0018124999999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_enhancer",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 158
  },
  '/actions/cheesesmithing/holy_gauntlets': {
    "hrid": "/actions/cheesesmithing/holy_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Holy Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 81
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 792
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.67875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017343750000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 140
  },
  '/actions/cheesesmithing/holy_hammer': {
    "hrid": "/actions/cheesesmithing/holy_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 84
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6900000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017812499999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_hammer",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 108
      },
      {
        "itemHrid": "/items/arcane_log",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 146
  },
  '/actions/cheesesmithing/holy_hatchet': {
    "hrid": "/actions/cheesesmithing/holy_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 82
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6825,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_hatchet",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 108
      },
      {
        "itemHrid": "/items/arcane_log",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 144
  },
  '/actions/cheesesmithing/holy_helmet': {
    "hrid": "/actions/cheesesmithing/holy_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Holy Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 86
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 990
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6975,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0018124999999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 90
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 159
  },
  '/actions/cheesesmithing/holy_mace': {
    "hrid": "/actions/cheesesmithing/holy_mace",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Holy Mace",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 85
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1782
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6937500000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017968749999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_mace",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      },
      {
        "itemHrid": "/items/arcane_log",
        "count": 144
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_mace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 151
  },
  '/actions/cheesesmithing/holy_needle': {
    "hrid": "/actions/cheesesmithing/holy_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 84
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6900000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017812499999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_needle",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 148
  },
  '/actions/cheesesmithing/holy_plate_body': {
    "hrid": "/actions/cheesesmithing/holy_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Holy Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 89
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1584
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.70875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.001859375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 144
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 163
  },
  '/actions/cheesesmithing/holy_plate_legs': {
    "hrid": "/actions/cheesesmithing/holy_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Holy Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 88
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.705,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00184375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 162
  },
  '/actions/cheesesmithing/holy_pot': {
    "hrid": "/actions/cheesesmithing/holy_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 84
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6900000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017812499999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_pot",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 150
  },
  '/actions/cheesesmithing/holy_shears': {
    "hrid": "/actions/cheesesmithing/holy_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 82
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6825,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_shears",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 108
      },
      {
        "itemHrid": "/items/arcane_log",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 143
  },
  '/actions/cheesesmithing/holy_spatula': {
    "hrid": "/actions/cheesesmithing/holy_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Holy Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 84
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1386
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.6900000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017812499999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_spatula",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 149
  },
  '/actions/cheesesmithing/holy_spear': {
    "hrid": "/actions/cheesesmithing/holy_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Holy Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 83
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1782
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.68625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017656249999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_spear",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 126
      },
      {
        "itemHrid": "/items/arcane_log",
        "count": 144
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 145
  },
  '/actions/cheesesmithing/holy_sword': {
    "hrid": "/actions/cheesesmithing/holy_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Holy Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 81
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1782
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.67875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017343750000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_sword",
    "inputItems": [
      {
        "itemHrid": "/items/holy_cheese",
        "count": 162
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/holy_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 141
  },
  '/actions/cheesesmithing/knights_aegis': {
    "hrid": "/actions/cheesesmithing/knights_aegis",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Knights Aegis",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 150000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/knights_ingot",
        "count": 10
      },
      {
        "itemHrid": "/items/holy_buckler",
        "count": 30
      },
      {
        "itemHrid": "/items/gobo_defender",
        "count": 2
      },
      {
        "itemHrid": "/items/vision_shield",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/knights_aegis",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 181
  },
  '/actions/cheesesmithing/maelstrom_plate_body': {
    "hrid": "/actions/cheesesmithing/maelstrom_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Maelstrom Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/demonic_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/maelstrom_plating",
        "count": 10
      },
      {
        "itemHrid": "/items/holy_plate_body",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/maelstrom_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 189
  },
  '/actions/cheesesmithing/maelstrom_plate_legs': {
    "hrid": "/actions/cheesesmithing/maelstrom_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Maelstrom Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 160000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/demonic_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/maelstrom_plating",
        "count": 8
      },
      {
        "itemHrid": "/items/holy_plate_legs",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/maelstrom_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 183
  },
  '/actions/cheesesmithing/magnetic_gloves': {
    "hrid": "/actions/cheesesmithing/magnetic_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Magnetic Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 85
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 36000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.30833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000798611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/magnet",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/magnetic_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 152
  },
  '/actions/cheesesmithing/panda_gloves': {
    "hrid": "/actions/cheesesmithing/panda_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Panda Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 66
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 10000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.2766666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.001212962962962963,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/panda_fluff",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/panda_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 120
  },
  '/actions/cheesesmithing/pincer_gloves': {
    "hrid": "/actions/cheesesmithing/pincer_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Pincer Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 25
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1600
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.20833333333333331,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0017361111111111112,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/crab_pincer",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/pincer_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 58
  },
  '/actions/cheesesmithing/polar_bear_shoes': {
    "hrid": "/actions/cheesesmithing/polar_bear_shoes",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Polar Bear Shoes",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 65
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 10000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.27499999999999997,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012037037037037038,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rainbow_boots",
    "inputItems": [
      {
        "itemHrid": "/items/polar_bear_fluff",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/polar_bear_shoes",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 117
  },
  '/actions/cheesesmithing/rainbow_alembic': {
    "hrid": "/actions/cheesesmithing/rainbow_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 71
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3705,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009118055555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_alembic",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 131
  },
  '/actions/cheesesmithing/rainbow_boots': {
    "hrid": "/actions/cheesesmithing/rainbow_boots",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Rainbow Boots",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 65
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 416
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_boots",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 52
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 114
  },
  '/actions/cheesesmithing/rainbow_brush': {
    "hrid": "/actions/cheesesmithing/rainbow_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 67
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36183333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_brush",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 78
      },
      {
        "itemHrid": "/items/redwood_log",
        "count": 52
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 121
  },
  '/actions/cheesesmithing/rainbow_buckler': {
    "hrid": "/actions/cheesesmithing/rainbow_buckler",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Rainbow Buckler",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 71
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 624
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3705,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009118055555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_buckler",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 78
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_buckler",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 134
  },
  '/actions/cheesesmithing/rainbow_bulwark': {
    "hrid": "/actions/cheesesmithing/rainbow_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Rainbow Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 72
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1248
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.37266666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009208333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 156
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 135
  },
  '/actions/cheesesmithing/rainbow_cheese': {
    "hrid": "/actions/cheesesmithing/rainbow_cheese",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/material",
    "name": "Rainbow Cheese",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_milk",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 113
  },
  '/actions/cheesesmithing/rainbow_chisel': {
    "hrid": "/actions/cheesesmithing/rainbow_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 69
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36616666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0016129629629629627,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_chisel",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 78
      },
      {
        "itemHrid": "/items/redwood_log",
        "count": 52
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 126
  },
  '/actions/cheesesmithing/rainbow_enhancer': {
    "hrid": "/actions/cheesesmithing/rainbow_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 71
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3705,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009118055555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_enhancer",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 132
  },
  '/actions/cheesesmithing/rainbow_gauntlets': {
    "hrid": "/actions/cheesesmithing/rainbow_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Rainbow Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 66
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 416
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.35966666666666663,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015768518518518516,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 52
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 118
  },
  '/actions/cheesesmithing/rainbow_hammer': {
    "hrid": "/actions/cheesesmithing/rainbow_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 69
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36616666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0016129629629629627,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_hammer",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 78
      },
      {
        "itemHrid": "/items/redwood_log",
        "count": 52
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 125
  },
  '/actions/cheesesmithing/rainbow_hatchet': {
    "hrid": "/actions/cheesesmithing/rainbow_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 67
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36183333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_hatchet",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 78
      },
      {
        "itemHrid": "/items/redwood_log",
        "count": 52
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 123
  },
  '/actions/cheesesmithing/rainbow_helmet': {
    "hrid": "/actions/cheesesmithing/rainbow_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Rainbow Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 71
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 520
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3705,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009118055555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 65
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 133
  },
  '/actions/cheesesmithing/rainbow_mace': {
    "hrid": "/actions/cheesesmithing/rainbow_mace",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Rainbow Mace",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 70
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 936
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_mace",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      },
      {
        "itemHrid": "/items/redwood_log",
        "count": 104
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_mace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 130
  },
  '/actions/cheesesmithing/rainbow_needle': {
    "hrid": "/actions/cheesesmithing/rainbow_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 69
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36616666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0016129629629629627,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_needle",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 127
  },
  '/actions/cheesesmithing/rainbow_plate_body': {
    "hrid": "/actions/cheesesmithing/rainbow_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Rainbow Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 74
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 832
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.377,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009388888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 104
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 137
  },
  '/actions/cheesesmithing/rainbow_plate_legs': {
    "hrid": "/actions/cheesesmithing/rainbow_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Rainbow Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 73
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.37483333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009298611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 136
  },
  '/actions/cheesesmithing/rainbow_pot': {
    "hrid": "/actions/cheesesmithing/rainbow_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 69
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36616666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0016129629629629627,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_pot",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 129
  },
  '/actions/cheesesmithing/rainbow_shears': {
    "hrid": "/actions/cheesesmithing/rainbow_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 67
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36183333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_shears",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 78
      },
      {
        "itemHrid": "/items/redwood_log",
        "count": 52
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 122
  },
  '/actions/cheesesmithing/rainbow_spatula': {
    "hrid": "/actions/cheesesmithing/rainbow_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Rainbow Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 69
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 728
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.36616666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0016129629629629627,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_spatula",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 128
  },
  '/actions/cheesesmithing/rainbow_spear': {
    "hrid": "/actions/cheesesmithing/rainbow_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Rainbow Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 68
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 936
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.364,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.001600925925925926,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_spear",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 91
      },
      {
        "itemHrid": "/items/redwood_log",
        "count": 104
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 124
  },
  '/actions/cheesesmithing/rainbow_sword': {
    "hrid": "/actions/cheesesmithing/rainbow_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Rainbow Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 66
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 936
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.35966666666666663,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015768518518518516,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_sword",
    "inputItems": [
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 117
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rainbow_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 119
  },
  '/actions/cheesesmithing/regal_sword': {
    "hrid": "/actions/cheesesmithing/regal_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Regal Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/werewolf_slasher",
    "inputItems": [
      {
        "itemHrid": "/items/regal_jewel",
        "count": 20
      },
      {
        "itemHrid": "/items/holy_sword",
        "count": 60
      },
      {
        "itemHrid": "/items/garnet",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/regal_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 187
  },
  '/actions/cheesesmithing/snail_shell_helmet': {
    "hrid": "/actions/cheesesmithing/snail_shell_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Snail Shell Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 28
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 1600
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.21333333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0017777777777777779,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/snail_shell",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/snail_shell_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 65
  },
  '/actions/cheesesmithing/snake_fang_dirk': {
    "hrid": "/actions/cheesesmithing/snake_fang_dirk",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Snake Fang Dirk",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 15
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 600
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.19166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.001597222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/snake_fang",
        "count": 5
      },
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/snake_fang_dirk",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 36
  },
  '/actions/cheesesmithing/spiked_bulwark': {
    "hrid": "/actions/cheesesmithing/spiked_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Spiked Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 91
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.3183333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008402777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/stalactite_shard",
        "count": 10
      },
      {
        "itemHrid": "/items/living_granite",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/spiked_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 178
  },
  '/actions/cheesesmithing/stalactite_spear': {
    "hrid": "/actions/cheesesmithing/stalactite_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Stalactite Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 85
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.30833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000798611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/holy_spear",
    "inputItems": [
      {
        "itemHrid": "/items/stalactite_shard",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/stalactite_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 153
  },
  '/actions/cheesesmithing/turtle_shell_body': {
    "hrid": "/actions/cheesesmithing/turtle_shell_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Turtle Shell Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 30
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 3000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.21666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0018055555555555557,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/turtle_shell",
        "count": 3
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/turtle_shell_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 68
  },
  '/actions/cheesesmithing/turtle_shell_legs': {
    "hrid": "/actions/cheesesmithing/turtle_shell_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Turtle Shell Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 30
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.21666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0018055555555555557,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/azure_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/turtle_shell",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/turtle_shell_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 67
  },
  '/actions/cheesesmithing/vampire_fang_dirk': {
    "hrid": "/actions/cheesesmithing/vampire_fang_dirk",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Vampire Fang Dirk",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 85
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.30833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000798611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/vampire_fang",
        "count": 20
      },
      {
        "itemHrid": "/items/holy_cheese",
        "count": 400
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/vampire_fang_dirk",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 155
  },
  '/actions/cheesesmithing/verdant_alembic': {
    "hrid": "/actions/cheesesmithing/verdant_alembic",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Alembic",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 16
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03383333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002819444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_alembic",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_alembic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 37
  },
  '/actions/cheesesmithing/verdant_boots': {
    "hrid": "/actions/cheesesmithing/verdant_boots",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/feet",
    "name": "Verdant Boots",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 10
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03208333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002673611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_boots",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 23
  },
  '/actions/cheesesmithing/verdant_brush': {
    "hrid": "/actions/cheesesmithing/verdant_brush",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Brush",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 12
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03266666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00027222222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_brush",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 18
      },
      {
        "itemHrid": "/items/birch_log",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_brush",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 26
  },
  '/actions/cheesesmithing/verdant_buckler': {
    "hrid": "/actions/cheesesmithing/verdant_buckler",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Verdant Buckler",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 16
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 27
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03383333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002819444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_buckler",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 18
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_buckler",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 40
  },
  '/actions/cheesesmithing/verdant_bulwark': {
    "hrid": "/actions/cheesesmithing/verdant_bulwark",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Verdant Bulwark",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 17
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 54
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.034124999999999996,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00028437499999999996,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_bulwark",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_bulwark",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 41
  },
  '/actions/cheesesmithing/verdant_cheese': {
    "hrid": "/actions/cheesesmithing/verdant_cheese",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/material",
    "name": "Verdant Cheese",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 7.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_milk",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 22
  },
  '/actions/cheesesmithing/verdant_chisel': {
    "hrid": "/actions/cheesesmithing/verdant_chisel",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Chisel",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 14
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.033249999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002770833333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_chisel",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 18
      },
      {
        "itemHrid": "/items/birch_log",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_chisel",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 31
  },
  '/actions/cheesesmithing/verdant_enhancer': {
    "hrid": "/actions/cheesesmithing/verdant_enhancer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Enhancer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 16
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03383333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002819444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_enhancer",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_enhancer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 38
  },
  '/actions/cheesesmithing/verdant_gauntlets': {
    "hrid": "/actions/cheesesmithing/verdant_gauntlets",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/hands",
    "name": "Verdant Gauntlets",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 11
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.032375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00026979166666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_gauntlets",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_gauntlets",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 24
  },
  '/actions/cheesesmithing/verdant_hammer': {
    "hrid": "/actions/cheesesmithing/verdant_hammer",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Hammer",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 14
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.033249999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002770833333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_hammer",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 18
      },
      {
        "itemHrid": "/items/birch_log",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_hammer",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 30
  },
  '/actions/cheesesmithing/verdant_hatchet': {
    "hrid": "/actions/cheesesmithing/verdant_hatchet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Hatchet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 12
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03266666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00027222222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_hatchet",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 18
      },
      {
        "itemHrid": "/items/birch_log",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_hatchet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 28
  },
  '/actions/cheesesmithing/verdant_helmet': {
    "hrid": "/actions/cheesesmithing/verdant_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Verdant Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 16
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 22.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03383333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002819444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 15
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 39
  },
  '/actions/cheesesmithing/verdant_mace': {
    "hrid": "/actions/cheesesmithing/verdant_mace",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Verdant Mace",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 15
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.033541666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002795138888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_mace",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      },
      {
        "itemHrid": "/items/birch_log",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_mace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 35
  },
  '/actions/cheesesmithing/verdant_needle': {
    "hrid": "/actions/cheesesmithing/verdant_needle",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Needle",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 14
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.033249999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002770833333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_needle",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_needle",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 32
  },
  '/actions/cheesesmithing/verdant_plate_body': {
    "hrid": "/actions/cheesesmithing/verdant_plate_body",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/body",
    "name": "Verdant Plate Body",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 19
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 36
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.034708333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002892361111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_plate_body",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_plate_body",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 43
  },
  '/actions/cheesesmithing/verdant_plate_legs': {
    "hrid": "/actions/cheesesmithing/verdant_plate_legs",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/legs",
    "name": "Verdant Plate Legs",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 18
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.034416666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00028680555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_plate_legs",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_plate_legs",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 42
  },
  '/actions/cheesesmithing/verdant_pot': {
    "hrid": "/actions/cheesesmithing/verdant_pot",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Pot",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 14
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.033249999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002770833333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_pot",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_pot",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 34
  },
  '/actions/cheesesmithing/verdant_shears': {
    "hrid": "/actions/cheesesmithing/verdant_shears",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Shears",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 12
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03266666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00027222222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_shears",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 18
      },
      {
        "itemHrid": "/items/birch_log",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_shears",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 27
  },
  '/actions/cheesesmithing/verdant_spatula': {
    "hrid": "/actions/cheesesmithing/verdant_spatula",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/tool",
    "name": "Verdant Spatula",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 14
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 31.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.033249999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002770833333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_spatula",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_spatula",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 33
  },
  '/actions/cheesesmithing/verdant_spear': {
    "hrid": "/actions/cheesesmithing/verdant_spear",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Verdant Spear",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 13
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.03295833333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00027465277777777774,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_spear",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 21
      },
      {
        "itemHrid": "/items/birch_log",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_spear",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 29
  },
  '/actions/cheesesmithing/verdant_sword': {
    "hrid": "/actions/cheesesmithing/verdant_sword",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/main_hand",
    "name": "Verdant Sword",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 11
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 40.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.032375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00026979166666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cheese_sword",
    "inputItems": [
      {
        "itemHrid": "/items/verdant_cheese",
        "count": 27
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/verdant_sword",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 25
  },
  '/actions/cheesesmithing/vision_helmet': {
    "hrid": "/actions/cheesesmithing/vision_helmet",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/head",
    "name": "Vision Helmet",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 58
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 6000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.2633333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.001138888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_helmet",
    "inputItems": [
      {
        "itemHrid": "/items/goggles",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/vision_helmet",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 110
  },
  '/actions/cheesesmithing/vision_shield': {
    "hrid": "/actions/cheesesmithing/vision_shield",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/off_hand",
    "name": "Vision Shield",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 58
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 7200
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.2633333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.001138888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/crimson_buckler",
    "inputItems": [
      {
        "itemHrid": "/items/magnifying_glass",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/vision_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 111
  },
  '/actions/cheesesmithing/werewolf_slasher': {
    "hrid": "/actions/cheesesmithing/werewolf_slasher",
    "function": "/action_functions/production",
    "type": "/action_types/cheesesmithing",
    "category": "/action_categories/cheesesmithing/two_hand",
    "name": "Werewolf Slasher",
    "levelRequirement": {
      "skillHrid": "/skills/cheesesmithing",
      "level": 85
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/cheesesmithing",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "dropRate": 0.30833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000798611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/werewolf_claw",
        "count": 20
      },
      {
        "itemHrid": "/items/holy_cheese",
        "count": 600
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/werewolf_slasher",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 156
  },
  '/actions/combat/abyssal_imp': {
    "hrid": "/actions/combat/abyssal_imp",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/infernal_abyss",
    "name": "Abyssal Imp",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/abyssal_imp",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 62
  },
  '/actions/combat/alligator': {
    "hrid": "/actions/combat/alligator",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/swamp_planet",
    "name": "Sherlock",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/alligator",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 11
  },
  '/actions/combat/aqua_planet': {
    "hrid": "/actions/combat/aqua_planet",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/aqua_planet",
    "name": "Aqua Planet",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/sea_snail",
              "eliteTier": 0,
              "rate": 1,
              "strength": 40
            },
            {
              "combatMonsterHrid": "/monsters/crab",
              "eliteTier": 0,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/aquahorse",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/nom_nom",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/turtle",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/marine_huntress",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 19
  },
  '/actions/combat/aqua_planet_elite': {
    "hrid": "/actions/combat/aqua_planet_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/aqua_planet",
    "name": "Aqua Planet (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/sea_snail",
              "eliteTier": 1,
              "rate": 1,
              "strength": 40
            },
            {
              "combatMonsterHrid": "/monsters/crab",
              "eliteTier": 1,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/aquahorse",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/nom_nom",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/turtle",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/marine_huntress",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 20
  },
  '/actions/combat/aquahorse': {
    "hrid": "/actions/combat/aquahorse",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/aqua_planet",
    "name": "Aquahorse",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/aquahorse",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 16
  },
  '/actions/combat/bear_with_it': {
    "hrid": "/actions/combat/bear_with_it",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/bear_with_it",
    "name": "Bear With It",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gummy_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/panda",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/black_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/grizzly_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 85
            },
            {
              "combatMonsterHrid": "/monsters/polar_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/red_panda",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 50
  },
  '/actions/combat/bear_with_it_elite': {
    "hrid": "/actions/combat/bear_with_it_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/bear_with_it",
    "name": "Bear With It (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gummy_bear",
              "eliteTier": 1,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/panda",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/black_bear",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/grizzly_bear",
              "eliteTier": 1,
              "rate": 1,
              "strength": 85
            },
            {
              "combatMonsterHrid": "/monsters/polar_bear",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/red_panda",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 51
  },
  '/actions/combat/black_bear': {
    "hrid": "/actions/combat/black_bear",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/bear_with_it",
    "name": "Black Bear",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/black_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 47
  },
  '/actions/combat/centaur_archer': {
    "hrid": "/actions/combat/centaur_archer",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/jungle_planet",
    "name": "Centaur Archer",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/centaur_archer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 24
  },
  '/actions/combat/chimerical_den': {
    "hrid": "/actions/combat/chimerical_den",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/dungeons",
    "name": "Chimerical Den",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": true,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 0,
          "maxTotalStrength": 0,
          "spawns": null
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "/items/chimerical_entry_key",
        "rewardDropTable": [
          {
            "itemHrid": "/items/chimerical_chest",
            "dropRate": 1,
            "minCount": 1,
            "maxCount": 1,
            "minEliteTier": 0
          }
        ],
        "maxWaves": 50,
        "randomSpawnInfoMap": {
          "0": {
            "maxSpawnCount": 4,
            "maxTotalStrength": 250,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/rat",
                "eliteTier": 2,
                "rate": 1,
                "strength": 40
              },
              {
                "combatMonsterHrid": "/monsters/skunk",
                "eliteTier": 2,
                "rate": 1,
                "strength": 40
              },
              {
                "combatMonsterHrid": "/monsters/porcupine",
                "eliteTier": 2,
                "rate": 1,
                "strength": 40
              },
              {
                "combatMonsterHrid": "/monsters/slimy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 40
              },
              {
                "combatMonsterHrid": "/monsters/frog",
                "eliteTier": 2,
                "rate": 1,
                "strength": 45
              },
              {
                "combatMonsterHrid": "/monsters/snake",
                "eliteTier": 2,
                "rate": 1,
                "strength": 45
              },
              {
                "combatMonsterHrid": "/monsters/swampy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/alligator",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/sea_snail",
                "eliteTier": 2,
                "rate": 1,
                "strength": 55
              },
              {
                "combatMonsterHrid": "/monsters/crab",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/aquahorse",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              },
              {
                "combatMonsterHrid": "/monsters/jungle_sprite",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/myconid",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              }
            ]
          },
          "10": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 300,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/swampy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/alligator",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/sea_snail",
                "eliteTier": 2,
                "rate": 1,
                "strength": 55
              },
              {
                "combatMonsterHrid": "/monsters/crab",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/aquahorse",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              },
              {
                "combatMonsterHrid": "/monsters/nom_nom",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              },
              {
                "combatMonsterHrid": "/monsters/turtle",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/jungle_sprite",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/myconid",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              },
              {
                "combatMonsterHrid": "/monsters/centaur_archer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_stabby",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_slashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_smashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_shooty",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_boomy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/eye",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/butterjerry",
                "eliteTier": 0,
                "rate": 2,
                "strength": 150
              }
            ]
          },
          "30": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 400,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/aquahorse",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              },
              {
                "combatMonsterHrid": "/monsters/nom_nom",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              },
              {
                "combatMonsterHrid": "/monsters/turtle",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/jungle_sprite",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/myconid",
                "eliteTier": 2,
                "rate": 1,
                "strength": 65
              },
              {
                "combatMonsterHrid": "/monsters/centaur_archer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_stabby",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_slashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_smashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_shooty",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/gobo_boomy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/eye",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/eyes",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/veyes",
                "eliteTier": 2,
                "rate": 1,
                "strength": 110
              },
              {
                "combatMonsterHrid": "/monsters/butterjerry",
                "eliteTier": 0,
                "rate": 2,
                "strength": 150
              },
              {
                "combatMonsterHrid": "/monsters/jackalope",
                "eliteTier": 0,
                "rate": 0.5,
                "strength": 250
              }
            ]
          }
        },
        "fixedSpawnsMap": {
          "5": [
            {
              "combatMonsterHrid": "/monsters/butterjerry",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "10": [
            {
              "combatMonsterHrid": "/monsters/jackalope",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "15": [
            {
              "combatMonsterHrid": "/monsters/jackalope",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/butterjerry",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "20": [
            {
              "combatMonsterHrid": "/monsters/dodocamel",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "25": [
            {
              "combatMonsterHrid": "/monsters/dodocamel",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/butterjerry",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "30": [
            {
              "combatMonsterHrid": "/monsters/jackalope",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/dodocamel",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "35": [
            {
              "combatMonsterHrid": "/monsters/manticore",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "40": [
            {
              "combatMonsterHrid": "/monsters/jackalope",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/manticore",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "45": [
            {
              "combatMonsterHrid": "/monsters/manticore",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/dodocamel",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "50": [
            {
              "combatMonsterHrid": "/monsters/griffin",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ]
        }
      }
    },
    "maxPartySize": 5,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 67
  },
  '/actions/combat/crab': {
    "hrid": "/actions/combat/crab",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/aqua_planet",
    "name": "I Pinch",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/crab",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 15
  },
  '/actions/combat/elementalist': {
    "hrid": "/actions/combat/elementalist",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/sorcerers_tower",
    "name": "Elementalist",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/elementalist",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 42
  },
  '/actions/combat/enchanted_fortress': {
    "hrid": "/actions/combat/enchanted_fortress",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/dungeons",
    "name": "Enchanted Fortress",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": true,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 0,
          "maxTotalStrength": 0,
          "spawns": null
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "/items/enchanted_entry_key",
        "rewardDropTable": [
          {
            "itemHrid": "/items/enchanted_chest",
            "dropRate": 1,
            "minCount": 1,
            "maxCount": 1,
            "minEliteTier": 0
          }
        ],
        "maxWaves": 65,
        "randomSpawnInfoMap": {
          "0": {
            "maxSpawnCount": 4,
            "maxTotalStrength": 250,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/novice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/ice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/flame_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/panda",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/black_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/magnetic_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/abyssal_imp",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              }
            ]
          },
          "20": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 300,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/ice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/flame_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/elementalist",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/panda",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/black_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/grizzly_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 75
              },
              {
                "combatMonsterHrid": "/monsters/polar_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/magnetic_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/stalactite_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/abyssal_imp",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/soul_hunter",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/enchanted_pawn",
                "eliteTier": 0,
                "rate": 2,
                "strength": 150
              }
            ]
          },
          "40": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 400,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/ice_sorcerer",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/flame_sorcerer",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/elementalist",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/panda",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/black_bear",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/grizzly_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 75
              },
              {
                "combatMonsterHrid": "/monsters/polar_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/magnetic_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/stalactite_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/abyssal_imp",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/soul_hunter",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/enchanted_pawn",
                "eliteTier": 0,
                "rate": 3,
                "strength": 150
              }
            ]
          }
        },
        "fixedSpawnsMap": {
          "5": [
            {
              "combatMonsterHrid": "/monsters/enchanted_pawn",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "10": [
            {
              "combatMonsterHrid": "/monsters/enchanted_pawn",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_pawn",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "15": [
            {
              "combatMonsterHrid": "/monsters/enchanted_knight",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "20": [
            {
              "combatMonsterHrid": "/monsters/enchanted_bishop",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "25": [
            {
              "combatMonsterHrid": "/monsters/enchanted_rook",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "30": [
            {
              "combatMonsterHrid": "/monsters/enchanted_knight",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_bishop",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "35": [
            {
              "combatMonsterHrid": "/monsters/enchanted_bishop",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_rook",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "40": [
            {
              "combatMonsterHrid": "/monsters/enchanted_rook",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_knight",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "45": [
            {
              "combatMonsterHrid": "/monsters/enchanted_knight",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_pawn",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_bishop",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "50": [
            {
              "combatMonsterHrid": "/monsters/enchanted_bishop",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_pawn",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_rook",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "55": [
            {
              "combatMonsterHrid": "/monsters/enchanted_rook",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_pawn",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_knight",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "60": [
            {
              "combatMonsterHrid": "/monsters/enchanted_knight",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_bishop",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_rook",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "65": [
            {
              "combatMonsterHrid": "/monsters/enchanted_queen",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/enchanted_king",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ]
        }
      }
    },
    "maxPartySize": 5,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 69
  },
  '/actions/combat/eye': {
    "hrid": "/actions/combat/eye",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/planet_of_the_eyes",
    "name": "Eye",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/eye",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 34
  },
  '/actions/combat/eyes': {
    "hrid": "/actions/combat/eyes",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/planet_of_the_eyes",
    "name": "Eyes",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/eyes",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 35
  },
  '/actions/combat/flame_sorcerer': {
    "hrid": "/actions/combat/flame_sorcerer",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/sorcerers_tower",
    "name": "Flame Sorcerer",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/flame_sorcerer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 41
  },
  '/actions/combat/fly': {
    "hrid": "/actions/combat/fly",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/smelly_planet",
    "name": "Fly",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/fly",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/combat/frog': {
    "hrid": "/actions/combat/frog",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/swamp_planet",
    "name": "Frogger",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/frog",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 8
  },
  '/actions/combat/gobo_boomy': {
    "hrid": "/actions/combat/gobo_boomy",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/gobo_planet",
    "name": "Boomy",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gobo_boomy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 31
  },
  '/actions/combat/gobo_planet': {
    "hrid": "/actions/combat/gobo_planet",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/gobo_planet",
    "name": "Gobo Planet",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gobo_stabby",
              "eliteTier": 0,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/gobo_slashy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/gobo_smashy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/gobo_shooty",
              "eliteTier": 0,
              "rate": 1,
              "strength": 90
            },
            {
              "combatMonsterHrid": "/monsters/gobo_boomy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/gobo_chieftain",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 32
  },
  '/actions/combat/gobo_planet_elite': {
    "hrid": "/actions/combat/gobo_planet_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/gobo_planet",
    "name": "Gobo Planet (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gobo_stabby",
              "eliteTier": 1,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/gobo_slashy",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/gobo_smashy",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/gobo_shooty",
              "eliteTier": 1,
              "rate": 1,
              "strength": 90
            },
            {
              "combatMonsterHrid": "/monsters/gobo_boomy",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/gobo_chieftain",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 33
  },
  '/actions/combat/gobo_shooty': {
    "hrid": "/actions/combat/gobo_shooty",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/gobo_planet",
    "name": "Shooty",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gobo_shooty",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 30
  },
  '/actions/combat/gobo_slashy': {
    "hrid": "/actions/combat/gobo_slashy",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/gobo_planet",
    "name": "Slashy",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gobo_slashy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 28
  },
  '/actions/combat/gobo_smashy': {
    "hrid": "/actions/combat/gobo_smashy",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/gobo_planet",
    "name": "Smashy",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gobo_smashy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 29
  },
  '/actions/combat/gobo_stabby': {
    "hrid": "/actions/combat/gobo_stabby",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/gobo_planet",
    "name": "Stabby",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gobo_stabby",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 27
  },
  '/actions/combat/golem_cave': {
    "hrid": "/actions/combat/golem_cave",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/golem_cave",
    "name": "Golem Cave",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/magnetic_golem",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/stalactite_golem",
              "eliteTier": 0,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/granite_golem",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/crystal_colossus",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 55
  },
  '/actions/combat/golem_cave_elite': {
    "hrid": "/actions/combat/golem_cave_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/golem_cave",
    "name": "Golem Cave (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/magnetic_golem",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/stalactite_golem",
              "eliteTier": 1,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/granite_golem",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/crystal_colossus",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 56
  },
  '/actions/combat/granite_golem': {
    "hrid": "/actions/combat/granite_golem",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/golem_cave",
    "name": "Granite Golem",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/granite_golem",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 54
  },
  '/actions/combat/grizzly_bear': {
    "hrid": "/actions/combat/grizzly_bear",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/bear_with_it",
    "name": "Grizzly Bear",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/grizzly_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 48
  },
  '/actions/combat/gummy_bear': {
    "hrid": "/actions/combat/gummy_bear",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/bear_with_it",
    "name": "Gummy Bear",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/gummy_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 45
  },
  '/actions/combat/ice_sorcerer': {
    "hrid": "/actions/combat/ice_sorcerer",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/sorcerers_tower",
    "name": "Ice Sorcerer",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/ice_sorcerer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 40
  },
  '/actions/combat/infernal_abyss': {
    "hrid": "/actions/combat/infernal_abyss",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/infernal_abyss",
    "name": "Infernal Abyss",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/abyssal_imp",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/soul_hunter",
              "eliteTier": 0,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/infernal_warlock",
              "eliteTier": 0,
              "rate": 1,
              "strength": 90
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/demonic_overlord",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 65
  },
  '/actions/combat/infernal_abyss_elite': {
    "hrid": "/actions/combat/infernal_abyss_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/infernal_abyss",
    "name": "Infernal Abyss (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/abyssal_imp",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/soul_hunter",
              "eliteTier": 1,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/infernal_warlock",
              "eliteTier": 1,
              "rate": 1,
              "strength": 90
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/demonic_overlord",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 66
  },
  '/actions/combat/infernal_warlock': {
    "hrid": "/actions/combat/infernal_warlock",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/infernal_abyss",
    "name": "Infernal Warlock",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/infernal_warlock",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 64
  },
  '/actions/combat/jungle_planet': {
    "hrid": "/actions/combat/jungle_planet",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/jungle_planet",
    "name": "Jungle Planet",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/jungle_sprite",
              "eliteTier": 0,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/myconid",
              "eliteTier": 0,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/treant",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/centaur_archer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/luna_empress",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 25
  },
  '/actions/combat/jungle_planet_elite': {
    "hrid": "/actions/combat/jungle_planet_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/jungle_planet",
    "name": "Jungle Planet (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/jungle_sprite",
              "eliteTier": 1,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/myconid",
              "eliteTier": 1,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/treant",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/centaur_archer",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/luna_empress",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 26
  },
  '/actions/combat/jungle_sprite': {
    "hrid": "/actions/combat/jungle_sprite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/jungle_planet",
    "name": "Jungle Sprite",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/jungle_sprite",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 21
  },
  '/actions/combat/magnetic_golem': {
    "hrid": "/actions/combat/magnetic_golem",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/golem_cave",
    "name": "Magnetic Golem",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/magnetic_golem",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 52
  },
  '/actions/combat/myconid': {
    "hrid": "/actions/combat/myconid",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/jungle_planet",
    "name": "Myconid",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/myconid",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 22
  },
  '/actions/combat/nom_nom': {
    "hrid": "/actions/combat/nom_nom",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/aqua_planet",
    "name": "Nom Nom",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/nom_nom",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 17
  },
  '/actions/combat/novice_sorcerer': {
    "hrid": "/actions/combat/novice_sorcerer",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/sorcerers_tower",
    "name": "Novice Sorcerer",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/novice_sorcerer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 39
  },
  '/actions/combat/panda': {
    "hrid": "/actions/combat/panda",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/bear_with_it",
    "name": "Panda",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/panda",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 46
  },
  '/actions/combat/pirate_cove': {
    "hrid": "/actions/combat/pirate_cove",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/dungeons",
    "name": "Pirate Cove",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": true,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 0,
          "maxTotalStrength": 0,
          "spawns": null
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "/items/pirate_entry_key",
        "rewardDropTable": [
          {
            "itemHrid": "/items/pirate_chest",
            "dropRate": 1,
            "minCount": 1,
            "maxCount": 1,
            "minEliteTier": 0
          }
        ],
        "maxWaves": 65,
        "randomSpawnInfoMap": {
          "0": {
            "maxSpawnCount": 4,
            "maxTotalStrength": 270,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/eye",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/eyes",
                "eliteTier": 2,
                "rate": 1,
                "strength": 55
              },
              {
                "combatMonsterHrid": "/monsters/veyes",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/zombie",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/magnetic_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/abyssal_imp",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              }
            ]
          },
          "20": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 350,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/eyes",
                "eliteTier": 2,
                "rate": 1,
                "strength": 55
              },
              {
                "combatMonsterHrid": "/monsters/veyes",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/zombie",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/vampire",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/magnetic_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/stalactite_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/abyssal_imp",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/soul_hunter",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/squawker",
                "eliteTier": 0,
                "rate": 2,
                "strength": 150
              }
            ]
          },
          "40": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 450,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/veyes",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/zombie",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/vampire",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/werewolf",
                "eliteTier": 2,
                "rate": 1,
                "strength": 110
              },
              {
                "combatMonsterHrid": "/monsters/magnetic_golem",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/stalactite_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/granite_golem",
                "eliteTier": 2,
                "rate": 1,
                "strength": 110
              },
              {
                "combatMonsterHrid": "/monsters/abyssal_imp",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/soul_hunter",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/infernal_warlock",
                "eliteTier": 2,
                "rate": 1,
                "strength": 110
              },
              {
                "combatMonsterHrid": "/monsters/squawker",
                "eliteTier": 0,
                "rate": 2,
                "strength": 150
              },
              {
                "combatMonsterHrid": "/monsters/anchor_shark",
                "eliteTier": 0,
                "rate": 0.5,
                "strength": 250
              },
              {
                "combatMonsterHrid": "/monsters/brine_marksman",
                "eliteTier": 0,
                "rate": 0.5,
                "strength": 250
              },
              {
                "combatMonsterHrid": "/monsters/tidal_conjuror",
                "eliteTier": 0,
                "rate": 0.5,
                "strength": 250
              }
            ]
          }
        },
        "fixedSpawnsMap": {
          "5": [
            {
              "combatMonsterHrid": "/monsters/squawker",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "10": [
            {
              "combatMonsterHrid": "/monsters/anchor_shark",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "15": [
            {
              "combatMonsterHrid": "/monsters/brine_marksman",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "20": [
            {
              "combatMonsterHrid": "/monsters/tidal_conjuror",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "25": [
            {
              "combatMonsterHrid": "/monsters/anchor_shark",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/brine_marksman",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "30": [
            {
              "combatMonsterHrid": "/monsters/brine_marksman",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/tidal_conjuror",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "35": [
            {
              "combatMonsterHrid": "/monsters/tidal_conjuror",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/anchor_shark",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "40": [
            {
              "combatMonsterHrid": "/monsters/anchor_shark",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/squawker",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/brine_marksman",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "45": [
            {
              "combatMonsterHrid": "/monsters/brine_marksman",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/squawker",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/tidal_conjuror",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "50": [
            {
              "combatMonsterHrid": "/monsters/tidal_conjuror",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/squawker",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/anchor_shark",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "55": [
            {
              "combatMonsterHrid": "/monsters/anchor_shark",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/brine_marksman",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/tidal_conjuror",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "60": [
            {
              "combatMonsterHrid": "/monsters/captain_fishhook",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "65": [
            {
              "combatMonsterHrid": "/monsters/the_kraken",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ]
        }
      }
    },
    "maxPartySize": 5,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 70
  },
  '/actions/combat/planet_of_the_eyes': {
    "hrid": "/actions/combat/planet_of_the_eyes",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/planet_of_the_eyes",
    "name": "Planet Of The Eyes",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/eye",
              "eliteTier": 0,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/eyes",
              "eliteTier": 0,
              "rate": 1,
              "strength": 75
            },
            {
              "combatMonsterHrid": "/monsters/veyes",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/the_watcher",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 37
  },
  '/actions/combat/planet_of_the_eyes_elite': {
    "hrid": "/actions/combat/planet_of_the_eyes_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/planet_of_the_eyes",
    "name": "Planet Of The Eyes (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/eye",
              "eliteTier": 1,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/eyes",
              "eliteTier": 1,
              "rate": 1,
              "strength": 75
            },
            {
              "combatMonsterHrid": "/monsters/veyes",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/the_watcher",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 38
  },
  '/actions/combat/polar_bear': {
    "hrid": "/actions/combat/polar_bear",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/bear_with_it",
    "name": "Polar Bear",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/polar_bear",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 49
  },
  '/actions/combat/porcupine': {
    "hrid": "/actions/combat/porcupine",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/smelly_planet",
    "name": "Porcupine",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/porcupine",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/combat/rat': {
    "hrid": "/actions/combat/rat",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/smelly_planet",
    "name": "Jerry",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/rat",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/combat/sea_snail': {
    "hrid": "/actions/combat/sea_snail",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/aqua_planet",
    "name": "Gary",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/sea_snail",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 14
  },
  '/actions/combat/sinister_circus': {
    "hrid": "/actions/combat/sinister_circus",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/dungeons",
    "name": "Sinister Circus",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": true,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 0,
          "maxTotalStrength": 0,
          "spawns": null
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "/items/sinister_entry_key",
        "rewardDropTable": [
          {
            "itemHrid": "/items/sinister_chest",
            "dropRate": 1,
            "minCount": 1,
            "maxCount": 1,
            "minEliteTier": 0
          }
        ],
        "maxWaves": 60,
        "randomSpawnInfoMap": {
          "0": {
            "maxSpawnCount": 4,
            "maxTotalStrength": 250,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/gobo_stabby",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_slashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_smashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_shooty",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_boomy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/novice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/gummy_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/ice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/flame_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/panda",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/black_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              }
            ]
          },
          "15": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 300,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/gobo_stabby",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_slashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_smashy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_shooty",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_boomy",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/novice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gummy_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 60
              },
              {
                "combatMonsterHrid": "/monsters/ice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/flame_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/panda",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/black_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/grizzly_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/polar_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/zombie",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/vampire",
                "eliteTier": 2,
                "rate": 1,
                "strength": 110
              },
              {
                "combatMonsterHrid": "/monsters/rabid_rabbit",
                "eliteTier": 0,
                "rate": 2,
                "strength": 150
              }
            ]
          },
          "40": {
            "maxSpawnCount": 5,
            "maxTotalStrength": 400,
            "spawns": [
              {
                "combatMonsterHrid": "/monsters/gobo_stabby",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_slashy",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_smashy",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_shooty",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/gobo_boomy",
                "eliteTier": 2,
                "rate": 0.5,
                "strength": 50
              },
              {
                "combatMonsterHrid": "/monsters/ice_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/flame_sorcerer",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/panda",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/black_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 70
              },
              {
                "combatMonsterHrid": "/monsters/grizzly_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/polar_bear",
                "eliteTier": 2,
                "rate": 1,
                "strength": 80
              },
              {
                "combatMonsterHrid": "/monsters/elementalist",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/zombie",
                "eliteTier": 2,
                "rate": 1,
                "strength": 90
              },
              {
                "combatMonsterHrid": "/monsters/vampire",
                "eliteTier": 2,
                "rate": 1,
                "strength": 100
              },
              {
                "combatMonsterHrid": "/monsters/werewolf",
                "eliteTier": 2,
                "rate": 1,
                "strength": 110
              },
              {
                "combatMonsterHrid": "/monsters/rabid_rabbit",
                "eliteTier": 0,
                "rate": 2,
                "strength": 150
              },
              {
                "combatMonsterHrid": "/monsters/zombie_bear",
                "eliteTier": 0,
                "rate": 2,
                "strength": 250
              }
            ]
          }
        },
        "fixedSpawnsMap": {
          "5": [
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "10": [
            {
              "combatMonsterHrid": "/monsters/zombie_bear",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "15": [
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/zombie_bear",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "20": [
            {
              "combatMonsterHrid": "/monsters/acrobat",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "25": [
            {
              "combatMonsterHrid": "/monsters/juggler",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "30": [
            {
              "combatMonsterHrid": "/monsters/magician",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "35": [
            {
              "combatMonsterHrid": "/monsters/acrobat",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "40": [
            {
              "combatMonsterHrid": "/monsters/zombie_bear",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/juggler",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "45": [
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/magician",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/zombie_bear",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "50": [
            {
              "combatMonsterHrid": "/monsters/acrobat",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/zombie_bear",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/juggler",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "55": [
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/magician",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            },
            {
              "combatMonsterHrid": "/monsters/rabid_rabbit",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ],
          "60": [
            {
              "combatMonsterHrid": "/monsters/deranged_jester",
              "eliteTier": 0,
              "rate": 0,
              "strength": 0
            }
          ]
        }
      }
    },
    "maxPartySize": 5,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 68
  },
  '/actions/combat/skunk': {
    "hrid": "/actions/combat/skunk",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/smelly_planet",
    "name": "Skunk",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/skunk",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/combat/slimy': {
    "hrid": "/actions/combat/slimy",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/smelly_planet",
    "name": "Slimy",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/slimy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/combat/smelly_planet': {
    "hrid": "/actions/combat/smelly_planet",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/smelly_planet",
    "name": "Smelly Planet",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/fly",
              "eliteTier": 0,
              "rate": 1,
              "strength": 30
            },
            {
              "combatMonsterHrid": "/monsters/rat",
              "eliteTier": 0,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/skunk",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/porcupine",
              "eliteTier": 0,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/slimy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/combat/smelly_planet_elite': {
    "hrid": "/actions/combat/smelly_planet_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/smelly_planet",
    "name": "Smelly Planet (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/fly",
              "eliteTier": 1,
              "rate": 1,
              "strength": 30
            },
            {
              "combatMonsterHrid": "/monsters/rat",
              "eliteTier": 1,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/skunk",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/porcupine",
              "eliteTier": 1,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/slimy",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 7
  },
  '/actions/combat/snake': {
    "hrid": "/actions/combat/snake",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/swamp_planet",
    "name": "Thnake",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/snake",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 9
  },
  '/actions/combat/sorcerers_tower': {
    "hrid": "/actions/combat/sorcerers_tower",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/sorcerers_tower",
    "name": "Sorcerer's Tower",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/novice_sorcerer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 30
            },
            {
              "combatMonsterHrid": "/monsters/ice_sorcerer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 55
            },
            {
              "combatMonsterHrid": "/monsters/flame_sorcerer",
              "eliteTier": 0,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/elementalist",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/chronofrost_sorcerer",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 43
  },
  '/actions/combat/sorcerers_tower_elite': {
    "hrid": "/actions/combat/sorcerers_tower_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/sorcerers_tower",
    "name": "Sorcerer's Tower (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/novice_sorcerer",
              "eliteTier": 1,
              "rate": 1,
              "strength": 30
            },
            {
              "combatMonsterHrid": "/monsters/ice_sorcerer",
              "eliteTier": 1,
              "rate": 1,
              "strength": 55
            },
            {
              "combatMonsterHrid": "/monsters/flame_sorcerer",
              "eliteTier": 1,
              "rate": 1,
              "strength": 60
            },
            {
              "combatMonsterHrid": "/monsters/elementalist",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/chronofrost_sorcerer",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.15,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 44
  },
  '/actions/combat/soul_hunter': {
    "hrid": "/actions/combat/soul_hunter",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/infernal_abyss",
    "name": "Soul Hunter",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/soul_hunter",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 63
  },
  '/actions/combat/stalactite_golem': {
    "hrid": "/actions/combat/stalactite_golem",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/golem_cave",
    "name": "Stalactite Golem",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/stalactite_golem",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 53
  },
  '/actions/combat/swamp_planet': {
    "hrid": "/actions/combat/swamp_planet",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/swamp_planet",
    "name": "Swamp Planet",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/frog",
              "eliteTier": 0,
              "rate": 1,
              "strength": 40
            },
            {
              "combatMonsterHrid": "/monsters/snake",
              "eliteTier": 0,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/swampy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/alligator",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/giant_shoebill",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 12
  },
  '/actions/combat/swamp_planet_elite': {
    "hrid": "/actions/combat/swamp_planet_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/swamp_planet",
    "name": "Swamp Planet (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 4,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/frog",
              "eliteTier": 1,
              "rate": 1,
              "strength": 40
            },
            {
              "combatMonsterHrid": "/monsters/snake",
              "eliteTier": 1,
              "rate": 1,
              "strength": 50
            },
            {
              "combatMonsterHrid": "/monsters/swampy",
              "eliteTier": 1,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/alligator",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/giant_shoebill",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.1,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 13
  },
  '/actions/combat/swampy': {
    "hrid": "/actions/combat/swampy",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/swamp_planet",
    "name": "Swampy",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/swampy",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 10
  },
  '/actions/combat/treant': {
    "hrid": "/actions/combat/treant",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/jungle_planet",
    "name": "Treant",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/treant",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 23
  },
  '/actions/combat/turtle': {
    "hrid": "/actions/combat/turtle",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/aqua_planet",
    "name": "Turuto",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/turtle",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 18
  },
  '/actions/combat/twilight_zone': {
    "hrid": "/actions/combat/twilight_zone",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/twilight_zone",
    "name": "Twilight Zone",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/zombie",
              "eliteTier": 0,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/vampire",
              "eliteTier": 0,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/werewolf",
              "eliteTier": 0,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/dusk_revenant",
            "eliteTier": 0,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": null,
    "sortIndex": 60
  },
  '/actions/combat/twilight_zone_elite': {
    "hrid": "/actions/combat/twilight_zone_elite",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/twilight_zone",
    "name": "Twilight Zone (Elite)",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 3,
          "maxTotalStrength": 250,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/zombie",
              "eliteTier": 1,
              "rate": 1,
              "strength": 70
            },
            {
              "combatMonsterHrid": "/monsters/vampire",
              "eliteTier": 1,
              "rate": 1,
              "strength": 80
            },
            {
              "combatMonsterHrid": "/monsters/werewolf",
              "eliteTier": 1,
              "rate": 1,
              "strength": 100
            }
          ]
        },
        "bossSpawns": [
          {
            "combatMonsterHrid": "/monsters/dusk_revenant",
            "eliteTier": 1,
            "rate": 0,
            "strength": 0
          }
        ],
        "battlesPerBoss": 10
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 3,
    "buffs": [
      {
        "uniqueHrid": "/buff_uniques/combat_drop_rate_action_buff",
        "typeHrid": "/buff_types/combat_drop_rate",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      },
      {
        "uniqueHrid": "/buff_uniques/experience_action_buff",
        "typeHrid": "/buff_types/wisdom",
        "ratioBoost": 0,
        "ratioBoostLevelBonus": 0,
        "flatBoost": 0.2,
        "flatBoostLevelBonus": 0,
        "startTime": "0001-01-01T00:00:00Z",
        "duration": 0
      }
    ],
    "sortIndex": 61
  },
  '/actions/combat/vampire': {
    "hrid": "/actions/combat/vampire",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/twilight_zone",
    "name": "Vampire",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/vampire",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 58
  },
  '/actions/combat/veyes': {
    "hrid": "/actions/combat/veyes",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/planet_of_the_eyes",
    "name": "Veyes",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/veyes",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 36
  },
  '/actions/combat/werewolf': {
    "hrid": "/actions/combat/werewolf",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/twilight_zone",
    "name": "Werewolf",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/werewolf",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 59
  },
  '/actions/combat/zombie': {
    "hrid": "/actions/combat/zombie",
    "function": "/action_functions/combat",
    "type": "/action_types/combat",
    "category": "/action_categories/combat/twilight_zone",
    "name": "Zombie",
    "levelRequirement": {
      "skillHrid": "",
      "level": 0
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": {
      "isDungeon": false,
      "fightInfo": {
        "randomSpawnInfo": {
          "maxSpawnCount": 1,
          "maxTotalStrength": 1,
          "spawns": [
            {
              "combatMonsterHrid": "/monsters/zombie",
              "eliteTier": 0,
              "rate": 1,
              "strength": 1
            }
          ]
        },
        "bossSpawns": null,
        "battlesPerBoss": 0
      },
      "dungeonInfo": {
        "keyItemHrid": "",
        "rewardDropTable": null,
        "maxWaves": 0,
        "randomSpawnInfoMap": null,
        "fixedSpawnsMap": null
      }
    },
    "maxPartySize": 1,
    "buffs": null,
    "sortIndex": 57
  },
  '/actions/cooking/apple_gummy': {
    "hrid": "/actions/cooking/apple_gummy",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_mana",
    "name": "Apple Gummy",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 10
    },
    "baseTimeCost": 6750000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.020625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00017187500000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 6
      },
      {
        "itemHrid": "/items/apple",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/apple_gummy",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/cooking/apple_yogurt': {
    "hrid": "/actions/cooking/apple_yogurt",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/mana_over_time",
    "name": "Apple Yogurt",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 10
    },
    "baseTimeCost": 6750000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.020625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00017187500000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 3
      },
      {
        "itemHrid": "/items/verdant_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/apple",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/apple_yogurt",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 8
  },
  '/actions/cooking/blackberry_cake': {
    "hrid": "/actions/cooking/blackberry_cake",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/heal_over_time",
    "name": "Blackberry Cake",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 20
    },
    "baseTimeCost": 7500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 15
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.024999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00020833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 2
      },
      {
        "itemHrid": "/items/azure_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/blackberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/blackberry_cake",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 10
  },
  '/actions/cooking/blackberry_donut': {
    "hrid": "/actions/cooking/blackberry_donut",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_heal",
    "name": "Blackberry Donut",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 20
    },
    "baseTimeCost": 7500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 12
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.024999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00020833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 4
      },
      {
        "itemHrid": "/items/blackberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/blackberry_donut",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 9
  },
  '/actions/cooking/blueberry_cake': {
    "hrid": "/actions/cooking/blueberry_cake",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/heal_over_time",
    "name": "Blueberry Cake",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 10
    },
    "baseTimeCost": 6750000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.020625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00017187500000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 2
      },
      {
        "itemHrid": "/items/verdant_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/blueberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/blueberry_cake",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/cooking/blueberry_donut': {
    "hrid": "/actions/cooking/blueberry_donut",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_heal",
    "name": "Blueberry Donut",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 10
    },
    "baseTimeCost": 6750000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.020625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00017187500000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 4
      },
      {
        "itemHrid": "/items/blueberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/blueberry_donut",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/cooking/cupcake': {
    "hrid": "/actions/cooking/cupcake",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/heal_over_time",
    "name": "Cupcake",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 2
      },
      {
        "itemHrid": "/items/milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cupcake",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/cooking/donut': {
    "hrid": "/actions/cooking/donut",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_heal",
    "name": "Donut",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 4
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 4
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/donut",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/cooking/dragon_fruit_gummy': {
    "hrid": "/actions/cooking/dragon_fruit_gummy",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_mana",
    "name": "Dragon Fruit Gummy",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 65
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 32
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.048125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021064814814814815,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 6
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/dragon_fruit_gummy",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 23
  },
  '/actions/cooking/dragon_fruit_yogurt': {
    "hrid": "/actions/cooking/dragon_fruit_yogurt",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/mana_over_time",
    "name": "Dragon Fruit Yogurt",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 65
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.048125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021064814814814815,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 3
      },
      {
        "itemHrid": "/items/rainbow_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/dragon_fruit_yogurt",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 24
  },
  '/actions/cooking/gummy': {
    "hrid": "/actions/cooking/gummy",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_mana",
    "name": "Gummy",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 4
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gummy",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/cooking/marsberry_cake': {
    "hrid": "/actions/cooking/marsberry_cake",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/heal_over_time",
    "name": "Marsberry Cake",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 65
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.048125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021064814814814815,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 2
      },
      {
        "itemHrid": "/items/rainbow_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/marsberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/marsberry_cake",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 22
  },
  '/actions/cooking/marsberry_donut': {
    "hrid": "/actions/cooking/marsberry_donut",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_heal",
    "name": "Marsberry Donut",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 65
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 32
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.048125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021064814814814815,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 4
      },
      {
        "itemHrid": "/items/marsberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/marsberry_donut",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 21
  },
  '/actions/cooking/mooberry_cake': {
    "hrid": "/actions/cooking/mooberry_cake",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/heal_over_time",
    "name": "Mooberry Cake",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 50
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 30
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.037500000000000006,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00015972222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 2
      },
      {
        "itemHrid": "/items/crimson_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/mooberry_cake",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 18
  },
  '/actions/cooking/mooberry_donut': {
    "hrid": "/actions/cooking/mooberry_donut",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_heal",
    "name": "Mooberry Donut",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 50
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 24
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.037500000000000006,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00015972222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 4
      },
      {
        "itemHrid": "/items/mooberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/mooberry_donut",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 17
  },
  '/actions/cooking/orange_gummy': {
    "hrid": "/actions/cooking/orange_gummy",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_mana",
    "name": "Orange Gummy",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 20
    },
    "baseTimeCost": 7500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 12
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.024999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00020833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 6
      },
      {
        "itemHrid": "/items/orange",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/orange_gummy",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 11
  },
  '/actions/cooking/orange_yogurt': {
    "hrid": "/actions/cooking/orange_yogurt",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/mana_over_time",
    "name": "Orange Yogurt",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 20
    },
    "baseTimeCost": 7500000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 15
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.024999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00020833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 3
      },
      {
        "itemHrid": "/items/azure_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/orange",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/orange_yogurt",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 12
  },
  '/actions/cooking/peach_gummy': {
    "hrid": "/actions/cooking/peach_gummy",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_mana",
    "name": "Peach Gummy",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 50
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 24
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.037500000000000006,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00015972222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 6
      },
      {
        "itemHrid": "/items/peach",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/peach_gummy",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 19
  },
  '/actions/cooking/peach_yogurt': {
    "hrid": "/actions/cooking/peach_yogurt",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/mana_over_time",
    "name": "Peach Yogurt",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 50
    },
    "baseTimeCost": 9000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 30
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.037500000000000006,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00015972222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 3
      },
      {
        "itemHrid": "/items/crimson_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/peach",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/peach_yogurt",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 20
  },
  '/actions/cooking/plum_gummy': {
    "hrid": "/actions/cooking/plum_gummy",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_mana",
    "name": "Plum Gummy",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 35
    },
    "baseTimeCost": 8250000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.0309375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0001273148148148148,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 6
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/plum_gummy",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 15
  },
  '/actions/cooking/plum_yogurt': {
    "hrid": "/actions/cooking/plum_yogurt",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/mana_over_time",
    "name": "Plum Yogurt",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 35
    },
    "baseTimeCost": 8250000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 22.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.0309375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0001273148148148148,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 3
      },
      {
        "itemHrid": "/items/burble_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/plum",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/plum_yogurt",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 16
  },
  '/actions/cooking/spaceberry_cake': {
    "hrid": "/actions/cooking/spaceberry_cake",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/heal_over_time",
    "name": "Spaceberry Cake",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 80
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 50
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.06,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001527777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 2
      },
      {
        "itemHrid": "/items/holy_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/spaceberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/spaceberry_cake",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 26
  },
  '/actions/cooking/spaceberry_donut': {
    "hrid": "/actions/cooking/spaceberry_donut",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_heal",
    "name": "Spaceberry Donut",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 80
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.06,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001527777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 4
      },
      {
        "itemHrid": "/items/spaceberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/spaceberry_donut",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 25
  },
  '/actions/cooking/star_fruit_gummy': {
    "hrid": "/actions/cooking/star_fruit_gummy",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_mana",
    "name": "Star Fruit Gummy",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 80
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.06,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001527777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 6
      },
      {
        "itemHrid": "/items/star_fruit",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/star_fruit_gummy",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 27
  },
  '/actions/cooking/star_fruit_yogurt': {
    "hrid": "/actions/cooking/star_fruit_yogurt",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/mana_over_time",
    "name": "Star Fruit Yogurt",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 80
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 50
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.06,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001527777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 3
      },
      {
        "itemHrid": "/items/holy_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/star_fruit",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/star_fruit_yogurt",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 28
  },
  '/actions/cooking/strawberry_cake': {
    "hrid": "/actions/cooking/strawberry_cake",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/heal_over_time",
    "name": "Strawberry Cake",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 35
    },
    "baseTimeCost": 8250000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 22.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.0309375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0001273148148148148,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 2
      },
      {
        "itemHrid": "/items/burble_milk",
        "count": 1
      },
      {
        "itemHrid": "/items/strawberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/strawberry_cake",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 14
  },
  '/actions/cooking/strawberry_donut': {
    "hrid": "/actions/cooking/strawberry_donut",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/instant_heal",
    "name": "Strawberry Donut",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 35
    },
    "baseTimeCost": 8250000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.0309375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0001273148148148148,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/egg",
        "count": 1
      },
      {
        "itemHrid": "/items/wheat",
        "count": 1
      },
      {
        "itemHrid": "/items/sugar",
        "count": 4
      },
      {
        "itemHrid": "/items/strawberry",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/strawberry_donut",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 13
  },
  '/actions/cooking/yogurt': {
    "hrid": "/actions/cooking/yogurt",
    "function": "/action_functions/production",
    "type": "/action_types/cooking",
    "category": "/action_categories/cooking/mana_over_time",
    "name": "Yogurt",
    "levelRequirement": {
      "skillHrid": "/skills/cooking",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/cooking",
      "value": 5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/cooking_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sugar",
        "count": 3
      },
      {
        "itemHrid": "/items/milk",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/yogurt",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/crafting/advanced_task_badge': {
    "hrid": "/actions/crafting/advanced_task_badge",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/trinket",
    "name": "Advanced Task Badge",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 1
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.028055555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00023379629629629632,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/basic_task_badge",
    "inputItems": [
      {
        "itemHrid": "/items/task_crystal",
        "count": 4
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/advanced_task_badge",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/crafting/arcane_bow': {
    "hrid": "/actions/crafting/arcane_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Arcane Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 85
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2376
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.6937500000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017968749999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/redwood_bow",
    "inputItems": [
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 216
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/arcane_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 90
  },
  '/actions/crafting/arcane_crossbow': {
    "hrid": "/actions/crafting/arcane_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Arcane Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 80
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1782
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.675,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017187500000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/redwood_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 162
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/arcane_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 83
  },
  '/actions/crafting/arcane_fire_staff': {
    "hrid": "/actions/crafting/arcane_fire_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Arcane Fire Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 86
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1782
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.6975,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0018124999999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/redwood_fire_staff",
    "inputItems": [
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 162
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/arcane_fire_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 93
  },
  '/actions/crafting/arcane_lumber': {
    "hrid": "/actions/crafting/arcane_lumber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/lumber",
    "name": "Arcane Lumber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 55
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/branch_of_insight",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/arcane_log",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 82
  },
  '/actions/crafting/arcane_nature_staff': {
    "hrid": "/actions/crafting/arcane_nature_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Arcane Nature Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 83
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1782
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.68625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017656249999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/redwood_nature_staff",
    "inputItems": [
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 162
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/arcane_nature_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 88
  },
  '/actions/crafting/arcane_shield': {
    "hrid": "/actions/crafting/arcane_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Arcane Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 82
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1188
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.6825,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/redwood_shield",
    "inputItems": [
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 108
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/arcane_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 87
  },
  '/actions/crafting/arcane_water_staff': {
    "hrid": "/actions/crafting/arcane_water_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Arcane Water Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 80
    },
    "baseTimeCost": 135000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1782
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.675,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0017187500000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/redwood_water_staff",
    "inputItems": [
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 162
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/arcane_water_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 84
  },
  '/actions/crafting/basic_task_badge': {
    "hrid": "/actions/crafting/basic_task_badge",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/trinket",
    "name": "Basic Task Badge",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 1
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.028055555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00023379629629629632,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/task_crystal",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/basic_task_badge",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/crafting/birch_bow': {
    "hrid": "/actions/crafting/birch_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Birch Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 15
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 54
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.033541666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002795138888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/wooden_bow",
    "inputItems": [
      {
        "itemHrid": "/items/birch_lumber",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/birch_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 17
  },
  '/actions/crafting/birch_crossbow': {
    "hrid": "/actions/crafting/birch_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Birch Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 10
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 40.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03208333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002673611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/wooden_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/birch_lumber",
        "count": 27
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/birch_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 12
  },
  '/actions/crafting/birch_fire_staff': {
    "hrid": "/actions/crafting/birch_fire_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Birch Fire Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 16
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 40.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03383333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002819444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/wooden_fire_staff",
    "inputItems": [
      {
        "itemHrid": "/items/birch_lumber",
        "count": 27
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/birch_fire_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 19
  },
  '/actions/crafting/birch_lumber': {
    "hrid": "/actions/crafting/birch_lumber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/lumber",
    "name": "Birch Lumber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 7.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/birch_log",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/birch_lumber",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 11
  },
  '/actions/crafting/birch_nature_staff': {
    "hrid": "/actions/crafting/birch_nature_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Birch Nature Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 13
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 40.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03295833333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00027465277777777774,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/wooden_nature_staff",
    "inputItems": [
      {
        "itemHrid": "/items/birch_lumber",
        "count": 27
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/birch_nature_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 16
  },
  '/actions/crafting/birch_shield': {
    "hrid": "/actions/crafting/birch_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Birch Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 12
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 27
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03266666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00027222222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/wooden_shield",
    "inputItems": [
      {
        "itemHrid": "/items/birch_lumber",
        "count": 18
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/birch_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 15
  },
  '/actions/crafting/birch_water_staff': {
    "hrid": "/actions/crafting/birch_water_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Birch Water Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 10
    },
    "baseTimeCost": 10500000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 40.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03208333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002673611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/wooden_water_staff",
    "inputItems": [
      {
        "itemHrid": "/items/birch_lumber",
        "count": 27
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/birch_water_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 13
  },
  '/actions/crafting/bishops_codex': {
    "hrid": "/actions/crafting/bishops_codex",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Bishop's Codex",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 150000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/watchful_relic",
    "inputItems": [
      {
        "itemHrid": "/items/bishops_scroll",
        "count": 10
      },
      {
        "itemHrid": "/items/tome_of_the_elements",
        "count": 5
      },
      {
        "itemHrid": "/items/tome_of_healing",
        "count": 10
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 100
      },
      {
        "itemHrid": "/items/amethyst",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/bishops_codex",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 105
  },
  '/actions/crafting/blazing_trident': {
    "hrid": "/actions/crafting/blazing_trident",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Blazing Trident",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/infernal_battlestaff",
    "inputItems": [
      {
        "itemHrid": "/items/kraken_fang",
        "count": 20
      },
      {
        "itemHrid": "/items/arcane_fire_staff",
        "count": 60
      },
      {
        "itemHrid": "/items/amethyst",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/blazing_trident",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 110
  },
  '/actions/crafting/blooming_trident': {
    "hrid": "/actions/crafting/blooming_trident",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Blooming Trident",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/jackalope_staff",
    "inputItems": [
      {
        "itemHrid": "/items/kraken_fang",
        "count": 20
      },
      {
        "itemHrid": "/items/arcane_nature_staff",
        "count": 60
      },
      {
        "itemHrid": "/items/amethyst",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/blooming_trident",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 109
  },
  '/actions/crafting/catalyst_of_coinification': {
    "hrid": "/actions/crafting/catalyst_of_coinification",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Catalyst Of Coinification",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 40
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00016203703703703703,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/milking_essence",
        "count": 5
      },
      {
        "itemHrid": "/items/foraging_essence",
        "count": 5
      },
      {
        "itemHrid": "/items/woodcutting_essence",
        "count": 5
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/catalyst_of_coinification",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 41
  },
  '/actions/crafting/catalyst_of_decomposition': {
    "hrid": "/actions/crafting/catalyst_of_decomposition",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Catalyst Of Decomposition",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 50
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 240
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.041666666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00017746913580246916,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "count": 5
      },
      {
        "itemHrid": "/items/crafting_essence",
        "count": 5
      },
      {
        "itemHrid": "/items/tailoring_essence",
        "count": 5
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/catalyst_of_decomposition",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 51
  },
  '/actions/crafting/catalyst_of_transmutation': {
    "hrid": "/actions/crafting/catalyst_of_transmutation",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Catalyst Of Transmutation",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 60
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 280
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.044444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00019290123456790125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cooking_essence",
        "count": 5
      },
      {
        "itemHrid": "/items/brewing_essence",
        "count": 5
      },
      {
        "itemHrid": "/items/alchemy_essence",
        "count": 5
      },
      {
        "itemHrid": "/items/enhancing_essence",
        "count": 5
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/catalyst_of_transmutation",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 63
  },
  '/actions/crafting/cedar_bow': {
    "hrid": "/actions/crafting/cedar_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Cedar Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 25
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 120
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05555555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004629629629629629,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/birch_bow",
    "inputItems": [
      {
        "itemHrid": "/items/cedar_lumber",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cedar_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 26
  },
  '/actions/crafting/cedar_crossbow': {
    "hrid": "/actions/crafting/cedar_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Cedar Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 20
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 90
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/birch_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/cedar_lumber",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cedar_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 22
  },
  '/actions/crafting/cedar_fire_staff': {
    "hrid": "/actions/crafting/cedar_fire_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Cedar Fire Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 26
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 90
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.056,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00046666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/birch_fire_staff",
    "inputItems": [
      {
        "itemHrid": "/items/cedar_lumber",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cedar_fire_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 28
  },
  '/actions/crafting/cedar_lumber': {
    "hrid": "/actions/crafting/cedar_lumber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/lumber",
    "name": "Cedar Lumber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 12.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cedar_log",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cedar_lumber",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 21
  },
  '/actions/crafting/cedar_nature_staff': {
    "hrid": "/actions/crafting/cedar_nature_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Cedar Nature Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 23
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 90
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05466666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004555555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/birch_nature_staff",
    "inputItems": [
      {
        "itemHrid": "/items/cedar_lumber",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cedar_nature_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 25
  },
  '/actions/crafting/cedar_shield': {
    "hrid": "/actions/crafting/cedar_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Cedar Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 22
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 60
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05422222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00045185185185185183,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/birch_shield",
    "inputItems": [
      {
        "itemHrid": "/items/cedar_lumber",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cedar_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 24
  },
  '/actions/crafting/cedar_water_staff': {
    "hrid": "/actions/crafting/cedar_water_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Cedar Water Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 20
    },
    "baseTimeCost": 16000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 90
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004444444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/birch_water_staff",
    "inputItems": [
      {
        "itemHrid": "/items/cedar_lumber",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cedar_water_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 23
  },
  '/actions/crafting/chimerical_chest_key': {
    "hrid": "/actions/crafting/chimerical_chest_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Chimerical Chest Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 70
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.04722222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00011574074074074075,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/blue_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/green_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/purple_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/white_key_fragment",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/chimerical_chest_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 74
  },
  '/actions/crafting/chimerical_entry_key': {
    "hrid": "/actions/crafting/chimerical_entry_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Chimerical Entry Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 70
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 250
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.04722222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00011574074074074075,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/coin",
        "count": 100000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 100
      },
      {
        "itemHrid": "/items/beast_leather",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/chimerical_entry_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 73
  },
  '/actions/crafting/crushed_amber': {
    "hrid": "/actions/crafting/crushed_amber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Amber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 25
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 100
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.034722222222222224,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00028935185185185184,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/amber",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_amber",
        "count": 15
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 27
  },
  '/actions/crafting/crushed_amethyst': {
    "hrid": "/actions/crafting/crushed_amethyst",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Amethyst",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 40
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 150
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00016203703703703703,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/amethyst",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_amethyst",
        "count": 15
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 40
  },
  '/actions/crafting/crushed_garnet': {
    "hrid": "/actions/crafting/crushed_garnet",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Garnet",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 40
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 150
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00016203703703703703,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/garnet",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_garnet",
        "count": 15
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 38
  },
  '/actions/crafting/crushed_jade': {
    "hrid": "/actions/crafting/crushed_jade",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Jade",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 40
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 150
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.03888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00016203703703703703,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/jade",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_jade",
        "count": 15
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 39
  },
  '/actions/crafting/crushed_moonstone': {
    "hrid": "/actions/crafting/crushed_moonstone",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Moonstone",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 55
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 250
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.043055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0001851851851851852,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/moonstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_moonstone",
        "count": 15
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 58
  },
  '/actions/crafting/crushed_pearl': {
    "hrid": "/actions/crafting/crushed_pearl",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Pearl",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 10
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 50
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.030555555555555558,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00025462962962962966,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/pearl",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_pearl",
        "count": 15
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 14
  },
  '/actions/crafting/crushed_philosophers_stone': {
    "hrid": "/actions/crafting/crushed_philosophers_stone",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Philosopher's Stone",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 90
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 20000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05277777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001388888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/philosophers_stone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_philosophers_stone",
        "count": 250
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 100
  },
  '/actions/crafting/crushed_sunstone': {
    "hrid": "/actions/crafting/crushed_sunstone",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Crushed Sunstone",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 70
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 750
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.04722222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00011574074074074075,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/sunstone",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crushed_sunstone",
        "count": 60
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 72
  },
  '/actions/crafting/cursed_bow': {
    "hrid": "/actions/crafting/cursed_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Cursed Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/vampiric_bow",
    "inputItems": [
      {
        "itemHrid": "/items/cursed_ball",
        "count": 20
      },
      {
        "itemHrid": "/items/arcane_bow",
        "count": 60
      },
      {
        "itemHrid": "/items/jade",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cursed_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 106
  },
  '/actions/crafting/earrings_of_armor': {
    "hrid": "/actions/crafting/earrings_of_armor",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Earrings Of Armor",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 52
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.12666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005416666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/garnet",
        "count": 4
      },
      {
        "itemHrid": "/items/amber",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/earrings_of_armor",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 53
  },
  '/actions/crafting/earrings_of_critical_strike': {
    "hrid": "/actions/crafting/earrings_of_critical_strike",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Earrings Of Critical Strike",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 77
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 12000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.1475,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0003715277777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 3
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/earrings_of_critical_strike",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 80
  },
  '/actions/crafting/earrings_of_essence_find': {
    "hrid": "/actions/crafting/earrings_of_essence_find",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Earrings Of Essence Find",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 32
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1400
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.11,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0009166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/amber",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/earrings_of_essence_find",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 30
  },
  '/actions/crafting/earrings_of_gathering': {
    "hrid": "/actions/crafting/earrings_of_gathering",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Earrings Of Gathering",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 17
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.09749999999999999,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/pearl",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/earrings_of_gathering",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 20
  },
  '/actions/crafting/earrings_of_rare_find': {
    "hrid": "/actions/crafting/earrings_of_rare_find",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Earrings Of Rare Find",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 62
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 4000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.135,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.000587962962962963,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/earrings_of_rare_find",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 64
  },
  '/actions/crafting/earrings_of_regeneration': {
    "hrid": "/actions/crafting/earrings_of_regeneration",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Earrings Of Regeneration",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 47
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.1225,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005185185185185185,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/jade",
        "count": 4
      },
      {
        "itemHrid": "/items/pearl",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/earrings_of_regeneration",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 45
  },
  '/actions/crafting/earrings_of_resistance': {
    "hrid": "/actions/crafting/earrings_of_resistance",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Earrings Of Resistance",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 57
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.13083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/amethyst",
        "count": 4
      },
      {
        "itemHrid": "/items/amber",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/earrings_of_resistance",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 60
  },
  '/actions/crafting/enchanted_chest_key': {
    "hrid": "/actions/crafting/enchanted_chest_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Enchanted Chest Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 85
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2500
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05138888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00013310185185185186,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/brown_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/orange_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/stone_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/burning_key_fragment",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/enchanted_chest_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 92
  },
  '/actions/crafting/enchanted_entry_key': {
    "hrid": "/actions/crafting/enchanted_entry_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Enchanted Entry Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 85
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 500
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05138888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00013310185185185186,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/coin",
        "count": 250000
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 100
      },
      {
        "itemHrid": "/items/silk_fabric",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/enchanted_entry_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 91
  },
  '/actions/crafting/expert_task_badge': {
    "hrid": "/actions/crafting/expert_task_badge",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/trinket",
    "name": "Expert Task Badge",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 1
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.028055555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00023379629629629632,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/advanced_task_badge",
    "inputItems": [
      {
        "itemHrid": "/items/task_crystal",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/expert_task_badge",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/crafting/eye_watch': {
    "hrid": "/actions/crafting/eye_watch",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Eye Watch",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 70
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 15000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.2833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0006944444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/eye_of_the_watcher",
        "count": 10
      },
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 150
      },
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 150
      },
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 150
      },
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 150
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/eye_watch",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 75
  },
  '/actions/crafting/fighter_necklace': {
    "hrid": "/actions/crafting/fighter_necklace",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/neck",
    "name": "Fighter Necklace",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 49
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 3000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.12416666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005277777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 1000
      },
      {
        "itemHrid": "/items/garnet",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/fighter_necklace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 46
  },
  '/actions/crafting/frost_staff': {
    "hrid": "/actions/crafting/frost_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Frost Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 87
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.31166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/arcane_water_staff",
    "inputItems": [
      {
        "itemHrid": "/items/frost_sphere",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/frost_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 96
  },
  '/actions/crafting/ginkgo_bow': {
    "hrid": "/actions/crafting/ginkgo_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Ginkgo Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 55
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 648
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.19375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/purpleheart_bow",
    "inputItems": [
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 108
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ginkgo_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 56
  },
  '/actions/crafting/ginkgo_crossbow': {
    "hrid": "/actions/crafting/ginkgo_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Ginkgo Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 50
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 486
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.1875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0007986111111111112,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/purpleheart_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 81
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ginkgo_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 48
  },
  '/actions/crafting/ginkgo_fire_staff': {
    "hrid": "/actions/crafting/ginkgo_fire_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Ginkgo Fire Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 56
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 486
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.195,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008402777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/purpleheart_fire_staff",
    "inputItems": [
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 81
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ginkgo_fire_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 59
  },
  '/actions/crafting/ginkgo_lumber': {
    "hrid": "/actions/crafting/ginkgo_lumber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/lumber",
    "name": "Ginkgo Lumber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 30
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/ginkgo_log",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 47
  },
  '/actions/crafting/ginkgo_nature_staff': {
    "hrid": "/actions/crafting/ginkgo_nature_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Ginkgo Nature Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 53
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 486
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.19125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008194444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/purpleheart_nature_staff",
    "inputItems": [
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 81
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ginkgo_nature_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 54
  },
  '/actions/crafting/ginkgo_shield': {
    "hrid": "/actions/crafting/ginkgo_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Ginkgo Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 52
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 324
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.19,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/purpleheart_shield",
    "inputItems": [
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 54
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ginkgo_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 52
  },
  '/actions/crafting/ginkgo_water_staff': {
    "hrid": "/actions/crafting/ginkgo_water_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Ginkgo Water Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 50
    },
    "baseTimeCost": 45000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 486
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.1875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0007986111111111112,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/purpleheart_water_staff",
    "inputItems": [
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 81
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ginkgo_water_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 49
  },
  '/actions/crafting/infernal_battlestaff': {
    "hrid": "/actions/crafting/infernal_battlestaff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Infernal Battlestaff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 87
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.31166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/arcane_fire_staff",
    "inputItems": [
      {
        "itemHrid": "/items/infernal_ember",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/infernal_battlestaff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 97
  },
  '/actions/crafting/jackalope_staff': {
    "hrid": "/actions/crafting/jackalope_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Jackalope Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 87
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.31166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/arcane_nature_staff",
    "inputItems": [
      {
        "itemHrid": "/items/jackalope_antler",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/jackalope_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 98
  },
  '/actions/crafting/lumber': {
    "hrid": "/actions/crafting/lumber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/lumber",
    "name": "Lumber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/log",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/lumber",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/crafting/manticore_shield': {
    "hrid": "/actions/crafting/manticore_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Manticore Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 83
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.305,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0007847222222222221,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/arcane_shield",
    "inputItems": [
      {
        "itemHrid": "/items/manticore_sting",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/manticore_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 89
  },
  '/actions/crafting/mirror_of_protection': {
    "hrid": "/actions/crafting/mirror_of_protection",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/special",
    "name": "Mirror Of Protection",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 75
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 25000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.29166666666666663,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0007291666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/shard_of_protection",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/mirror_of_protection",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 79
  },
  '/actions/crafting/necklace_of_efficiency': {
    "hrid": "/actions/crafting/necklace_of_efficiency",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/neck",
    "name": "Necklace Of Efficiency",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 34
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2100
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.11166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0009305555555555557,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 1000
      },
      {
        "itemHrid": "/items/amber",
        "count": 8
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/necklace_of_efficiency",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 31
  },
  '/actions/crafting/necklace_of_speed': {
    "hrid": "/actions/crafting/necklace_of_speed",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/neck",
    "name": "Necklace Of Speed",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 79
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 18000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.14916666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00037847222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 1000
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 5
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/necklace_of_speed",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 81
  },
  '/actions/crafting/necklace_of_wisdom': {
    "hrid": "/actions/crafting/necklace_of_wisdom",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/neck",
    "name": "Necklace Of Wisdom",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 64
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 6000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.13666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005972222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 1000
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 8
      },
      {
        "itemHrid": "/items/pearl",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/necklace_of_wisdom",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 65
  },
  '/actions/crafting/philosophers_earrings': {
    "hrid": "/actions/crafting/philosophers_earrings",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/earrings",
    "name": "Philosopher's Earrings",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 92
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.15999999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0004236111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/philosophers_stone",
    "inputItems": [
      {
        "itemHrid": "/items/earrings_of_critical_strike",
        "count": 1
      },
      {
        "itemHrid": "/items/earrings_of_rare_find",
        "count": 1
      },
      {
        "itemHrid": "/items/earrings_of_resistance",
        "count": 1
      },
      {
        "itemHrid": "/items/earrings_of_armor",
        "count": 1
      },
      {
        "itemHrid": "/items/earrings_of_regeneration",
        "count": 1
      },
      {
        "itemHrid": "/items/earrings_of_essence_find",
        "count": 1
      },
      {
        "itemHrid": "/items/earrings_of_gathering",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/philosophers_earrings",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 103
  },
  '/actions/crafting/philosophers_necklace': {
    "hrid": "/actions/crafting/philosophers_necklace",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/neck",
    "name": "Philosopher's Necklace",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 94
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.16166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00043055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/philosophers_stone",
    "inputItems": [
      {
        "itemHrid": "/items/necklace_of_speed",
        "count": 1
      },
      {
        "itemHrid": "/items/necklace_of_wisdom",
        "count": 1
      },
      {
        "itemHrid": "/items/wizard_necklace",
        "count": 1
      },
      {
        "itemHrid": "/items/ranger_necklace",
        "count": 1
      },
      {
        "itemHrid": "/items/fighter_necklace",
        "count": 1
      },
      {
        "itemHrid": "/items/necklace_of_efficiency",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/philosophers_necklace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 104
  },
  '/actions/crafting/philosophers_ring': {
    "hrid": "/actions/crafting/philosophers_ring",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Philosopher's Ring",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 90
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.15833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0004166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/philosophers_stone",
    "inputItems": [
      {
        "itemHrid": "/items/ring_of_critical_strike",
        "count": 1
      },
      {
        "itemHrid": "/items/ring_of_rare_find",
        "count": 1
      },
      {
        "itemHrid": "/items/ring_of_resistance",
        "count": 1
      },
      {
        "itemHrid": "/items/ring_of_armor",
        "count": 1
      },
      {
        "itemHrid": "/items/ring_of_regeneration",
        "count": 1
      },
      {
        "itemHrid": "/items/ring_of_essence_find",
        "count": 1
      },
      {
        "itemHrid": "/items/ring_of_gathering",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/philosophers_ring",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 99
  },
  '/actions/crafting/pirate_chest_key': {
    "hrid": "/actions/crafting/pirate_chest_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Pirate Chest Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 90
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 3000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05277777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001388888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/white_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/stone_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/dark_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/burning_key_fragment",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/pirate_chest_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 102
  },
  '/actions/crafting/pirate_entry_key': {
    "hrid": "/actions/crafting/pirate_entry_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Pirate Entry Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 90
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 600
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.05277777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0001388888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/coin",
        "count": 300000
      },
      {
        "itemHrid": "/items/arcane_lumber",
        "count": 100
      },
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/pirate_entry_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 101
  },
  '/actions/crafting/purpleheart_bow': {
    "hrid": "/actions/crafting/purpleheart_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Purpleheart Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 40
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 288
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.105,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00043749999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cedar_bow",
    "inputItems": [
      {
        "itemHrid": "/items/purpleheart_lumber",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/purpleheart_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 37
  },
  '/actions/crafting/purpleheart_crossbow': {
    "hrid": "/actions/crafting/purpleheart_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Purpleheart Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 35
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.10125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00041666666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cedar_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/purpleheart_lumber",
        "count": 54
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/purpleheart_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 33
  },
  '/actions/crafting/purpleheart_fire_staff': {
    "hrid": "/actions/crafting/purpleheart_fire_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Purpleheart Fire Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 41
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.10575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00044166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cedar_fire_staff",
    "inputItems": [
      {
        "itemHrid": "/items/purpleheart_lumber",
        "count": 54
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/purpleheart_fire_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 43
  },
  '/actions/crafting/purpleheart_lumber': {
    "hrid": "/actions/crafting/purpleheart_lumber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/lumber",
    "name": "Purpleheart Lumber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 20
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/purpleheart_log",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/purpleheart_lumber",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 32
  },
  '/actions/crafting/purpleheart_nature_staff': {
    "hrid": "/actions/crafting/purpleheart_nature_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Purpleheart Nature Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 38
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.1035,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042916666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cedar_nature_staff",
    "inputItems": [
      {
        "itemHrid": "/items/purpleheart_lumber",
        "count": 54
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/purpleheart_nature_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 36
  },
  '/actions/crafting/purpleheart_shield': {
    "hrid": "/actions/crafting/purpleheart_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Purpleheart Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 37
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 144
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.10275000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00042500000000000003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cedar_shield",
    "inputItems": [
      {
        "itemHrid": "/items/purpleheart_lumber",
        "count": 36
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/purpleheart_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 35
  },
  '/actions/crafting/purpleheart_water_staff': {
    "hrid": "/actions/crafting/purpleheart_water_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Purpleheart Water Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 35
    },
    "baseTimeCost": 27000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 216
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.10125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00041666666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cedar_water_staff",
    "inputItems": [
      {
        "itemHrid": "/items/purpleheart_lumber",
        "count": 54
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/purpleheart_water_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 34
  },
  '/actions/crafting/ranger_necklace': {
    "hrid": "/actions/crafting/ranger_necklace",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/neck",
    "name": "Ranger Necklace",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 54
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 3000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.12833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.000550925925925926,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 1000
      },
      {
        "itemHrid": "/items/jade",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ranger_necklace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 55
  },
  '/actions/crafting/redwood_bow': {
    "hrid": "/actions/crafting/redwood_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Redwood Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 70
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1248
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.36833333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/ginkgo_bow",
    "inputItems": [
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 156
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/redwood_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 71
  },
  '/actions/crafting/redwood_crossbow': {
    "hrid": "/actions/crafting/redwood_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Redwood Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 65
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 936
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.3575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/ginkgo_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 117
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/redwood_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 67
  },
  '/actions/crafting/redwood_fire_staff': {
    "hrid": "/actions/crafting/redwood_fire_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Redwood Fire Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 71
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 936
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.3705,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0009118055555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/ginkgo_fire_staff",
    "inputItems": [
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 117
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/redwood_fire_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 77
  },
  '/actions/crafting/redwood_lumber': {
    "hrid": "/actions/crafting/redwood_lumber",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/lumber",
    "name": "Redwood Lumber",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/branch_of_insight",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/redwood_log",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 66
  },
  '/actions/crafting/redwood_nature_staff': {
    "hrid": "/actions/crafting/redwood_nature_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Redwood Nature Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 68
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 936
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.364,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.001600925925925926,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/ginkgo_nature_staff",
    "inputItems": [
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 117
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/redwood_nature_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 70
  },
  '/actions/crafting/redwood_shield': {
    "hrid": "/actions/crafting/redwood_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Redwood Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 67
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 624
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.36183333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015888888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/ginkgo_shield",
    "inputItems": [
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 78
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/redwood_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 69
  },
  '/actions/crafting/redwood_water_staff': {
    "hrid": "/actions/crafting/redwood_water_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Redwood Water Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 65
    },
    "baseTimeCost": 78000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 936
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.3575,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0015648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/ginkgo_water_staff",
    "inputItems": [
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 117
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/redwood_water_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 68
  },
  '/actions/crafting/ring_of_armor': {
    "hrid": "/actions/crafting/ring_of_armor",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Ring Of Armor",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 50
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005324074074074074,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/garnet",
        "count": 4
      },
      {
        "itemHrid": "/items/amber",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ring_of_armor",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 50
  },
  '/actions/crafting/ring_of_critical_strike': {
    "hrid": "/actions/crafting/ring_of_critical_strike",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Ring Of Critical Strike",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 75
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 12000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.14583333333333331,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00036458333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/sunstone",
        "count": 3
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ring_of_critical_strike",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 78
  },
  '/actions/crafting/ring_of_essence_find': {
    "hrid": "/actions/crafting/ring_of_essence_find",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Ring Of Essence Find",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 30
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1400
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.10833333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0009027777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/amber",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ring_of_essence_find",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 29
  },
  '/actions/crafting/ring_of_gathering': {
    "hrid": "/actions/crafting/ring_of_gathering",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Ring Of Gathering",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 15
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.09583333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.000798611111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/pearl",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ring_of_gathering",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 18
  },
  '/actions/crafting/ring_of_rare_find': {
    "hrid": "/actions/crafting/ring_of_rare_find",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Ring Of Rare Find",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 60
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 4000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.13333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005787037037037038,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/moonstone",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ring_of_rare_find",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 62
  },
  '/actions/crafting/ring_of_regeneration': {
    "hrid": "/actions/crafting/ring_of_regeneration",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Ring Of Regeneration",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 45
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.12083333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005092592592592592,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/jade",
        "count": 4
      },
      {
        "itemHrid": "/items/pearl",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ring_of_regeneration",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 44
  },
  '/actions/crafting/ring_of_resistance': {
    "hrid": "/actions/crafting/ring_of_resistance",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/ring",
    "name": "Ring Of Resistance",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 55
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.12916666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005555555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 600
      },
      {
        "itemHrid": "/items/amethyst",
        "count": 4
      },
      {
        "itemHrid": "/items/amber",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/ring_of_resistance",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 57
  },
  '/actions/crafting/rippling_trident': {
    "hrid": "/actions/crafting/rippling_trident",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Rippling Trident",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/frost_staff",
    "inputItems": [
      {
        "itemHrid": "/items/kraken_fang",
        "count": 20
      },
      {
        "itemHrid": "/items/arcane_water_staff",
        "count": 60
      },
      {
        "itemHrid": "/items/amethyst",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rippling_trident",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 108
  },
  '/actions/crafting/sinister_chest_key': {
    "hrid": "/actions/crafting/sinister_chest_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Sinister Chest Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 80
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 1500
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.049999999999999996,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00012731481481481483,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/purple_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/orange_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/brown_key_fragment",
        "count": 1
      },
      {
        "itemHrid": "/items/dark_key_fragment",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/sinister_chest_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 86
  },
  '/actions/crafting/sinister_entry_key': {
    "hrid": "/actions/crafting/sinister_entry_key",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/dungeon_keys",
    "name": "Sinister Entry Key",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 80
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 300
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.049999999999999996,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00012731481481481483,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/coin",
        "count": 150000
      },
      {
        "itemHrid": "/items/holy_cheese",
        "count": 100
      },
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/sinister_entry_key",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 85
  },
  '/actions/crafting/soul_hunter_crossbow': {
    "hrid": "/actions/crafting/soul_hunter_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Soul Hunter Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 86
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.31,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008055555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/arcane_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/soul_fragment",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/soul_hunter_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 95
  },
  '/actions/crafting/sundering_crossbow': {
    "hrid": "/actions/crafting/sundering_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Sundering Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/soul_hunter_crossbow",
    "inputItems": [
      {
        "itemHrid": "/items/sundering_jewel",
        "count": 20
      },
      {
        "itemHrid": "/items/arcane_crossbow",
        "count": 60
      },
      {
        "itemHrid": "/items/jade",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/sundering_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 107
  },
  '/actions/crafting/treant_shield': {
    "hrid": "/actions/crafting/treant_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Treant Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 40
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 4000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.2333333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0009722222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/purpleheart_shield",
    "inputItems": [
      {
        "itemHrid": "/items/treant_bark",
        "count": 4
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/treant_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 42
  },
  '/actions/crafting/vampiric_bow': {
    "hrid": "/actions/crafting/vampiric_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Vampiric Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 86
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 48000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.31,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008055555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/arcane_bow",
    "inputItems": [
      {
        "itemHrid": "/items/vampire_fang",
        "count": 10
      },
      {
        "itemHrid": "/items/werewolf_claw",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/vampiric_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 94
  },
  '/actions/crafting/watchful_relic': {
    "hrid": "/actions/crafting/watchful_relic",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Watchful Relic",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 70
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 15000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.2833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0006944444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/eye_of_the_watcher",
        "count": 10
      },
      {
        "itemHrid": "/items/rainbow_cheese",
        "count": 100
      },
      {
        "itemHrid": "/items/redwood_lumber",
        "count": 100
      },
      {
        "itemHrid": "/items/crimson_cheese",
        "count": 100
      },
      {
        "itemHrid": "/items/ginkgo_lumber",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/watchful_relic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 76
  },
  '/actions/crafting/wizard_necklace': {
    "hrid": "/actions/crafting/wizard_necklace",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/neck",
    "name": "Wizard Necklace",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 59
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 3000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.1325,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005740740740740741,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/star_fragment",
        "count": 1000
      },
      {
        "itemHrid": "/items/amethyst",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wizard_necklace",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 61
  },
  '/actions/crafting/wooden_bow': {
    "hrid": "/actions/crafting/wooden_bow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/bow",
    "name": "Wooden Bow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 5
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 24
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.0175,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014583333333333335,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/lumber",
        "count": 24
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wooden_bow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 9
  },
  '/actions/crafting/wooden_crossbow': {
    "hrid": "/actions/crafting/wooden_crossbow",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/crossbow",
    "name": "Wooden Crossbow",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/lumber",
        "count": 18
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wooden_crossbow",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/crafting/wooden_fire_staff': {
    "hrid": "/actions/crafting/wooden_fire_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Wooden Fire Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 6
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.017666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014722222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/lumber",
        "count": 18
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wooden_fire_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 10
  },
  '/actions/crafting/wooden_nature_staff': {
    "hrid": "/actions/crafting/wooden_nature_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Wooden Nature Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 3
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.017166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014305555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/lumber",
        "count": 18
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wooden_nature_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 8
  },
  '/actions/crafting/wooden_shield': {
    "hrid": "/actions/crafting/wooden_shield",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/off_hand",
    "name": "Wooden Shield",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 2
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 12
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.017,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/lumber",
        "count": 12
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wooden_shield",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/crafting/wooden_water_staff': {
    "hrid": "/actions/crafting/wooden_water_staff",
    "function": "/action_functions/production",
    "type": "/action_types/crafting",
    "category": "/action_categories/crafting/staff",
    "name": "Wooden Water Staff",
    "levelRequirement": {
      "skillHrid": "/skills/crafting",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/crafting",
      "value": 18
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/crafting_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/lumber",
        "count": 18
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/wooden_water_staff",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/enhancing/enhance': {
    "hrid": "/actions/enhancing/enhance",
    "function": "/action_functions/enhancing",
    "type": "/action_types/enhancing",
    "category": "/action_categories/enhancing/enhance",
    "name": "Enhance",
    "levelRequirement": {
      "skillHrid": "/skills/enhancing",
      "level": 1
    },
    "baseTimeCost": 12000000000,
    "experienceGain": {
      "skillHrid": "",
      "value": 0
    },
    "dropTable": null,
    "essenceDropTable": null,
    "rareDropTable": null,
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 0
  },
  '/actions/foraging/apple': {
    "hrid": "/actions/foraging/apple",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/shimmering_lake",
    "name": "Apple",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 7.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/apple",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/foraging/arabica_coffee_bean': {
    "hrid": "/actions/foraging/arabica_coffee_bean",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/shimmering_lake",
    "name": "Arabica Coffee Bean",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 7.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/arabica_coffee_bean",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 8
  },
  '/actions/foraging/asteroid_belt': {
    "hrid": "/actions/foraging/asteroid_belt",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/asteroid_belt",
    "name": "Asteroid Belt",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 55
    },
    "dropTable": [
      {
        "itemHrid": "/items/spaceberry",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/star_fruit",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/spacia_coffee_bean",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/radiant_fiber",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_meteorite_cache",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 33
  },
  '/actions/foraging/bamboo_branch': {
    "hrid": "/actions/foraging/bamboo_branch",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/burble_beach",
    "name": "Bamboo Branch",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 20
    },
    "dropTable": [
      {
        "itemHrid": "/items/bamboo_branch",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 18
  },
  '/actions/foraging/blackberry': {
    "hrid": "/actions/foraging/blackberry",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/misty_forest",
    "name": "Blackberry",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 12.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/blackberry",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 11
  },
  '/actions/foraging/blueberry': {
    "hrid": "/actions/foraging/blueberry",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/shimmering_lake",
    "name": "Blueberry",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 7.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/blueberry",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/foraging/burble_beach': {
    "hrid": "/actions/foraging/burble_beach",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/burble_beach",
    "name": "Burble Beach",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 20
    },
    "dropTable": [
      {
        "itemHrid": "/items/strawberry",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/plum",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/liberica_coffee_bean",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/bamboo_branch",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 19
  },
  '/actions/foraging/cocoon': {
    "hrid": "/actions/foraging/cocoon",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/silly_cow_valley",
    "name": "Cocoon",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 30
    },
    "dropTable": [
      {
        "itemHrid": "/items/cocoon",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 23
  },
  '/actions/foraging/cotton': {
    "hrid": "/actions/foraging/cotton",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/farmland",
    "name": "Cotton",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 5
    },
    "dropTable": [
      {
        "itemHrid": "/items/cotton",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/foraging/dragon_fruit': {
    "hrid": "/actions/foraging/dragon_fruit",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/olympus_mons",
    "name": "Dragon Fruit",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 40
    },
    "dropTable": [
      {
        "itemHrid": "/items/dragon_fruit",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 26
  },
  '/actions/foraging/egg': {
    "hrid": "/actions/foraging/egg",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/farmland",
    "name": "Egg",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 5
    },
    "dropTable": [
      {
        "itemHrid": "/items/egg",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 6,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/foraging/excelsa_coffee_bean': {
    "hrid": "/actions/foraging/excelsa_coffee_bean",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/silly_cow_valley",
    "name": "Excelsa Coffee Bean",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 30
    },
    "dropTable": [
      {
        "itemHrid": "/items/excelsa_coffee_bean",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 22
  },
  '/actions/foraging/farmland': {
    "hrid": "/actions/foraging/farmland",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/farmland",
    "name": "Farmland",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 5
    },
    "dropTable": [
      {
        "itemHrid": "/items/egg",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 6,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/wheat",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 6,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/sugar",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 14,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/cotton",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/foraging/fieriosa_coffee_bean': {
    "hrid": "/actions/foraging/fieriosa_coffee_bean",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/olympus_mons",
    "name": "Fieriosa Coffee Bean",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 40
    },
    "dropTable": [
      {
        "itemHrid": "/items/fieriosa_coffee_bean",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 27
  },
  '/actions/foraging/flax': {
    "hrid": "/actions/foraging/flax",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/shimmering_lake",
    "name": "Flax",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 7.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/flax",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 9
  },
  '/actions/foraging/liberica_coffee_bean': {
    "hrid": "/actions/foraging/liberica_coffee_bean",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/burble_beach",
    "name": "Liberica Coffee Bean",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 20
    },
    "dropTable": [
      {
        "itemHrid": "/items/liberica_coffee_bean",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 17
  },
  '/actions/foraging/marsberry': {
    "hrid": "/actions/foraging/marsberry",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/olympus_mons",
    "name": "Marsberry",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 40
    },
    "dropTable": [
      {
        "itemHrid": "/items/marsberry",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 25
  },
  '/actions/foraging/misty_forest': {
    "hrid": "/actions/foraging/misty_forest",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/misty_forest",
    "name": "Misty Forest",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 12.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/blackberry",
        "dropRate": 0.4,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/orange",
        "dropRate": 0.4,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/robusta_coffee_bean",
        "dropRate": 0.4,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 14
  },
  '/actions/foraging/mooberry': {
    "hrid": "/actions/foraging/mooberry",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/silly_cow_valley",
    "name": "Mooberry",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 30
    },
    "dropTable": [
      {
        "itemHrid": "/items/mooberry",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 20
  },
  '/actions/foraging/olympus_mons': {
    "hrid": "/actions/foraging/olympus_mons",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/olympus_mons",
    "name": "Olympus Mons",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 40
    },
    "dropTable": [
      {
        "itemHrid": "/items/marsberry",
        "dropRate": 0.4,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/dragon_fruit",
        "dropRate": 0.4,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/fieriosa_coffee_bean",
        "dropRate": 0.4,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 28
  },
  '/actions/foraging/orange': {
    "hrid": "/actions/foraging/orange",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/misty_forest",
    "name": "Orange",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 12.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/orange",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 12
  },
  '/actions/foraging/peach': {
    "hrid": "/actions/foraging/peach",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/silly_cow_valley",
    "name": "Peach",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 30
    },
    "dropTable": [
      {
        "itemHrid": "/items/peach",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 21
  },
  '/actions/foraging/plum': {
    "hrid": "/actions/foraging/plum",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/burble_beach",
    "name": "Plum",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 20
    },
    "dropTable": [
      {
        "itemHrid": "/items/plum",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 16
  },
  '/actions/foraging/radiant_fiber': {
    "hrid": "/actions/foraging/radiant_fiber",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/asteroid_belt",
    "name": "Radiant Fiber",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 55
    },
    "dropTable": [
      {
        "itemHrid": "/items/radiant_fiber",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_meteorite_cache",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 32
  },
  '/actions/foraging/robusta_coffee_bean': {
    "hrid": "/actions/foraging/robusta_coffee_bean",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/misty_forest",
    "name": "Robusta Coffee Bean",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 12.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/robusta_coffee_bean",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 13
  },
  '/actions/foraging/shimmering_lake': {
    "hrid": "/actions/foraging/shimmering_lake",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/shimmering_lake",
    "name": "Shimmering Lake",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 7.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/blueberry",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/apple",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/arabica_coffee_bean",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/flax",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 10
  },
  '/actions/foraging/silly_cow_valley': {
    "hrid": "/actions/foraging/silly_cow_valley",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/silly_cow_valley",
    "name": "Silly Cow Valley",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 30
    },
    "dropTable": [
      {
        "itemHrid": "/items/mooberry",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/peach",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/excelsa_coffee_bean",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/cocoon",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 24
  },
  '/actions/foraging/spaceberry': {
    "hrid": "/actions/foraging/spaceberry",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/asteroid_belt",
    "name": "Spaceberry",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 55
    },
    "dropTable": [
      {
        "itemHrid": "/items/spaceberry",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_meteorite_cache",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 29
  },
  '/actions/foraging/spacia_coffee_bean': {
    "hrid": "/actions/foraging/spacia_coffee_bean",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/asteroid_belt",
    "name": "Spacia Coffee Bean",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 55
    },
    "dropTable": [
      {
        "itemHrid": "/items/spacia_coffee_bean",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_meteorite_cache",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 31
  },
  '/actions/foraging/star_fruit': {
    "hrid": "/actions/foraging/star_fruit",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/asteroid_belt",
    "name": "Star Fruit",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 55
    },
    "dropTable": [
      {
        "itemHrid": "/items/star_fruit",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 4,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_meteorite_cache",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 30
  },
  '/actions/foraging/strawberry': {
    "hrid": "/actions/foraging/strawberry",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/burble_beach",
    "name": "Strawberry",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 20
    },
    "dropTable": [
      {
        "itemHrid": "/items/strawberry",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 8,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 15
  },
  '/actions/foraging/sugar': {
    "hrid": "/actions/foraging/sugar",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/farmland",
    "name": "Sugar",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 5
    },
    "dropTable": [
      {
        "itemHrid": "/items/sugar",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 14,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/foraging/wheat': {
    "hrid": "/actions/foraging/wheat",
    "function": "/action_functions/gathering",
    "type": "/action_types/foraging",
    "category": "/action_categories/foraging/farmland",
    "name": "Wheat",
    "levelRequirement": {
      "skillHrid": "/skills/foraging",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/foraging",
      "value": 5
    },
    "dropTable": [
      {
        "itemHrid": "/items/wheat",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 6,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/foraging_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/milking/azure_cow': {
    "hrid": "/actions/milking/azure_cow",
    "function": "/action_functions/gathering",
    "type": "/action_types/milking",
    "category": "/action_categories/milking/cows",
    "name": "Azure Cow",
    "levelRequirement": {
      "skillHrid": "/skills/milking",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/milking",
      "value": 12.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/azure_milk",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/milking_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/milking/burble_cow': {
    "hrid": "/actions/milking/burble_cow",
    "function": "/action_functions/gathering",
    "type": "/action_types/milking",
    "category": "/action_categories/milking/cows",
    "name": "Burble Cow",
    "levelRequirement": {
      "skillHrid": "/skills/milking",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/milking",
      "value": 20
    },
    "dropTable": [
      {
        "itemHrid": "/items/burble_milk",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/milking_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/milking/cow': {
    "hrid": "/actions/milking/cow",
    "function": "/action_functions/gathering",
    "type": "/action_types/milking",
    "category": "/action_categories/milking/cows",
    "name": "Cow",
    "levelRequirement": {
      "skillHrid": "/skills/milking",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/milking",
      "value": 5
    },
    "dropTable": [
      {
        "itemHrid": "/items/milk",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/milking_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/milking/crimson_cow': {
    "hrid": "/actions/milking/crimson_cow",
    "function": "/action_functions/gathering",
    "type": "/action_types/milking",
    "category": "/action_categories/milking/cows",
    "name": "Crimson Cow",
    "levelRequirement": {
      "skillHrid": "/skills/milking",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/milking",
      "value": 30
    },
    "dropTable": [
      {
        "itemHrid": "/items/crimson_milk",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/milking_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/milking/holy_cow': {
    "hrid": "/actions/milking/holy_cow",
    "function": "/action_functions/gathering",
    "type": "/action_types/milking",
    "category": "/action_categories/milking/cows",
    "name": "Holy Cow",
    "levelRequirement": {
      "skillHrid": "/skills/milking",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/milking",
      "value": 55
    },
    "dropTable": [
      {
        "itemHrid": "/items/holy_milk",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/milking_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_meteorite_cache",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/milking/unicow': {
    "hrid": "/actions/milking/unicow",
    "function": "/action_functions/gathering",
    "type": "/action_types/milking",
    "category": "/action_categories/milking/cows",
    "name": "Unicow",
    "levelRequirement": {
      "skillHrid": "/skills/milking",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/milking",
      "value": 40
    },
    "dropTable": [
      {
        "itemHrid": "/items/rainbow_milk",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/milking_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/butter_of_proficiency",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/milking/verdant_cow': {
    "hrid": "/actions/milking/verdant_cow",
    "function": "/action_functions/gathering",
    "type": "/action_types/milking",
    "category": "/action_categories/milking/cows",
    "name": "Verdant Cow",
    "levelRequirement": {
      "skillHrid": "/skills/milking",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/milking",
      "value": 7.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/verdant_milk",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/milking_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/tailoring/acrobatic_hood': {
    "hrid": "/actions/tailoring/acrobatic_hood",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Acrobatic Hood",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 93
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 120000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.32166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008541666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/acrobats_ribbon",
        "count": 10
      },
      {
        "itemHrid": "/items/umbral_hood",
        "count": 50
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/acrobatic_hood",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 109
  },
  '/actions/tailoring/alchemists_bottoms': {
    "hrid": "/actions/tailoring/alchemists_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Alchemist's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/alchemy_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/alchemists_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 101
  },
  '/actions/tailoring/alchemists_top': {
    "hrid": "/actions/tailoring/alchemists_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Alchemist's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/alchemy_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/alchemists_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 100
  },
  '/actions/tailoring/bamboo_boots': {
    "hrid": "/actions/tailoring/bamboo_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Bamboo Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 35
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 112
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.118125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0004861111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/linen_boots",
    "inputItems": [
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/bamboo_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 31
  },
  '/actions/tailoring/bamboo_fabric': {
    "hrid": "/actions/tailoring/bamboo_fabric",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Bamboo Fabric",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 20
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/bamboo_branch",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 29
  },
  '/actions/tailoring/bamboo_gloves': {
    "hrid": "/actions/tailoring/bamboo_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Bamboo Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 38
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 112
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.12074999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005006944444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/linen_gloves",
    "inputItems": [
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/bamboo_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 33
  },
  '/actions/tailoring/bamboo_hat': {
    "hrid": "/actions/tailoring/bamboo_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Bamboo Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 41
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 140
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.12337499999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005152777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/linen_hat",
    "inputItems": [
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 35
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/bamboo_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 35
  },
  '/actions/tailoring/bamboo_robe_bottoms': {
    "hrid": "/actions/tailoring/bamboo_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Bamboo Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 44
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 196
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.126,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005298611111111112,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/linen_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 49
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/bamboo_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 37
  },
  '/actions/tailoring/bamboo_robe_top': {
    "hrid": "/actions/tailoring/bamboo_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Bamboo Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 47
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 224
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.128625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005444444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/linen_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 56
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/bamboo_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 40
  },
  '/actions/tailoring/beast_boots': {
    "hrid": "/actions/tailoring/beast_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Beast Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 55
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 312
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2841666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012222222222222224,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/gobo_boots",
    "inputItems": [
      {
        "itemHrid": "/items/beast_leather",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/beast_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 49
  },
  '/actions/tailoring/beast_bracers': {
    "hrid": "/actions/tailoring/beast_bracers",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Beast Bracers",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 58
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 312
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2896666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012527777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/gobo_bracers",
    "inputItems": [
      {
        "itemHrid": "/items/beast_leather",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/beast_bracers",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 51
  },
  '/actions/tailoring/beast_chaps': {
    "hrid": "/actions/tailoring/beast_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Beast Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 64
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 546
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.30066666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.001313888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/gobo_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/beast_leather",
        "count": 84
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/beast_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 57
  },
  '/actions/tailoring/beast_hood': {
    "hrid": "/actions/tailoring/beast_hood",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Beast Hood",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 61
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 390
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2951666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012833333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/gobo_hood",
    "inputItems": [
      {
        "itemHrid": "/items/beast_leather",
        "count": 60
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/beast_hood",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 55
  },
  '/actions/tailoring/beast_leather': {
    "hrid": "/actions/tailoring/beast_leather",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Beast Leather",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 55
    },
    "baseTimeCost": 18000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 32.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.07750000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0003333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/beast_hide",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/beast_leather",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 47
  },
  '/actions/tailoring/beast_tunic': {
    "hrid": "/actions/tailoring/beast_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Beast Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 67
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 624
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.30616666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0013444444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/gobo_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/beast_leather",
        "count": 96
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/beast_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 62
  },
  '/actions/tailoring/brewers_bottoms': {
    "hrid": "/actions/tailoring/brewers_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Brewer's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/brewing_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/brewers_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 99
  },
  '/actions/tailoring/brewers_top': {
    "hrid": "/actions/tailoring/brewers_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Brewer's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/brewing_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/brewers_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 98
  },
  '/actions/tailoring/centaur_boots': {
    "hrid": "/actions/tailoring/centaur_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Centaur Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 65
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 8000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.27499999999999997,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012037037037037038,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/beast_boots",
    "inputItems": [
      {
        "itemHrid": "/items/centaur_hoof",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/centaur_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 59
  },
  '/actions/tailoring/cheesemakers_bottoms': {
    "hrid": "/actions/tailoring/cheesemakers_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Cheesemaker's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheesemakers_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 91
  },
  '/actions/tailoring/cheesemakers_top': {
    "hrid": "/actions/tailoring/cheesemakers_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Cheesemaker's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/cheesesmithing_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cheesemakers_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 90
  },
  '/actions/tailoring/chefs_bottoms': {
    "hrid": "/actions/tailoring/chefs_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Chef's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/cooking_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/chefs_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 97
  },
  '/actions/tailoring/chefs_top': {
    "hrid": "/actions/tailoring/chefs_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Chef's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/cooking_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/chefs_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 96
  },
  '/actions/tailoring/chrono_gloves': {
    "hrid": "/actions/tailoring/chrono_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Chrono Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 80
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 25000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0007638888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/radiant_gloves",
    "inputItems": [
      {
        "itemHrid": "/items/chrono_sphere",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/chrono_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 75
  },
  '/actions/tailoring/collectors_boots': {
    "hrid": "/actions/tailoring/collectors_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Collectors Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 60
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 10000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.26666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0011574074074074076,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_rag",
        "count": 10
      },
      {
        "itemHrid": "/items/gobo_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 200
      },
      {
        "itemHrid": "/items/reptile_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/linen_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/collectors_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 53
  },
  '/actions/tailoring/cotton_boots': {
    "hrid": "/actions/tailoring/cotton_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Cotton Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cotton_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/tailoring/cotton_fabric': {
    "hrid": "/actions/tailoring/cotton_fabric",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Cotton Fabric",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cotton",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/tailoring/cotton_gloves': {
    "hrid": "/actions/tailoring/cotton_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Cotton Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 3
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.017166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014305555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cotton_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/tailoring/cotton_hat': {
    "hrid": "/actions/tailoring/cotton_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Cotton Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 6
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.017666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014722222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cotton_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 9
  },
  '/actions/tailoring/cotton_robe_bottoms': {
    "hrid": "/actions/tailoring/cotton_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Cotton Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 9
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.018166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0001513888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cotton_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 11
  },
  '/actions/tailoring/cotton_robe_top': {
    "hrid": "/actions/tailoring/cotton_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Cotton Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 12
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 16
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.018666666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00015555555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/cotton_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 13
  },
  '/actions/tailoring/crafters_bottoms': {
    "hrid": "/actions/tailoring/crafters_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Crafter's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/crafting_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crafters_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 93
  },
  '/actions/tailoring/crafters_top': {
    "hrid": "/actions/tailoring/crafters_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Crafter's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/crafting_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/crafters_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 92
  },
  '/actions/tailoring/dairyhands_bottoms': {
    "hrid": "/actions/tailoring/dairyhands_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Dairyhand's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/milking_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/dairyhands_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 85
  },
  '/actions/tailoring/dairyhands_top': {
    "hrid": "/actions/tailoring/dairyhands_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Dairyhand's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/milking_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/dairyhands_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 84
  },
  '/actions/tailoring/enchanted_gloves': {
    "hrid": "/actions/tailoring/enchanted_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Enchanted Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 80
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 20000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0007638888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/chrono_sphere",
        "count": 10
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 100
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 100
      },
      {
        "itemHrid": "/items/beast_leather",
        "count": 100
      },
      {
        "itemHrid": "/items/silk_fabric",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/enchanted_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 73
  },
  '/actions/tailoring/enhancers_bottoms': {
    "hrid": "/actions/tailoring/enhancers_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Enhancer's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/enhancing_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/enhancers_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 103
  },
  '/actions/tailoring/enhancers_top': {
    "hrid": "/actions/tailoring/enhancers_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Enhancer's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/enhancing_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/enhancers_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 102
  },
  '/actions/tailoring/flaming_robe_bottoms': {
    "hrid": "/actions/tailoring/flaming_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Flaming Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 50
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 4000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.25,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0010648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/flaming_cloth",
        "count": 4
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/flaming_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 46
  },
  '/actions/tailoring/flaming_robe_top': {
    "hrid": "/actions/tailoring/flaming_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Flaming Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 50
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 6000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.25,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0010648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/flaming_cloth",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/flaming_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 45
  },
  '/actions/tailoring/fluffy_red_hat': {
    "hrid": "/actions/tailoring/fluffy_red_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Fluffy Red Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 80
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 20000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.3,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0007638888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/red_panda_fluff",
        "count": 10
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 100
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 100
      },
      {
        "itemHrid": "/items/beast_leather",
        "count": 100
      },
      {
        "itemHrid": "/items/silk_fabric",
        "count": 100
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/fluffy_red_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 74
  },
  '/actions/tailoring/foragers_bottoms': {
    "hrid": "/actions/tailoring/foragers_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Forager's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/foraging_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/foragers_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 87
  },
  '/actions/tailoring/foragers_top': {
    "hrid": "/actions/tailoring/foragers_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Forager's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/foraging_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/foragers_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 86
  },
  '/actions/tailoring/giant_pouch': {
    "hrid": "/actions/tailoring/giant_pouch",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/pouch",
    "name": "Giant Pouch",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 65
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 24000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.13749999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0006018518518518519,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/large_pouch",
    "inputItems": [
      {
        "itemHrid": "/items/beast_leather",
        "count": 1000
      },
      {
        "itemHrid": "/items/silk_fabric",
        "count": 1000
      },
      {
        "itemHrid": "/items/coin",
        "count": 5000000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/giant_pouch",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 61
  },
  '/actions/tailoring/gluttonous_pouch': {
    "hrid": "/actions/tailoring/gluttonous_pouch",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/pouch",
    "name": "Gluttonous Pouch",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.15833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0004166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/giant_pouch",
    "inputItems": [
      {
        "itemHrid": "/items/gluttonous_energy",
        "count": 10
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 3000
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 3000
      },
      {
        "itemHrid": "/items/coin",
        "count": 50000000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gluttonous_pouch",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 106
  },
  '/actions/tailoring/gobo_boots': {
    "hrid": "/actions/tailoring/gobo_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Gobo Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 35
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 112
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.118125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0004861111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/reptile_boots",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_leather",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gobo_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 30
  },
  '/actions/tailoring/gobo_bracers': {
    "hrid": "/actions/tailoring/gobo_bracers",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Gobo Bracers",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 38
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 112
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.12074999999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005006944444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/reptile_bracers",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_leather",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gobo_bracers",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 32
  },
  '/actions/tailoring/gobo_chaps': {
    "hrid": "/actions/tailoring/gobo_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Gobo Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 44
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 196
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.126,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005298611111111112,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/reptile_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_leather",
        "count": 49
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gobo_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 36
  },
  '/actions/tailoring/gobo_hood': {
    "hrid": "/actions/tailoring/gobo_hood",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Gobo Hood",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 41
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 140
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.12337499999999998,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005152777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/reptile_hood",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_leather",
        "count": 35
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gobo_hood",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 34
  },
  '/actions/tailoring/gobo_leather': {
    "hrid": "/actions/tailoring/gobo_leather",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Gobo Leather",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 20
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_hide",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gobo_leather",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 28
  },
  '/actions/tailoring/gobo_tunic': {
    "hrid": "/actions/tailoring/gobo_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Gobo Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 47
    },
    "baseTimeCost": 31500000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 224
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.128625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0005444444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/reptile_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_leather",
        "count": 56
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/gobo_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 39
  },
  '/actions/tailoring/griffin_chaps': {
    "hrid": "/actions/tailoring/griffin_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Griffin Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 87
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 40000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/umbral_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/griffin_leather",
        "count": 8
      },
      {
        "itemHrid": "/items/holy_cheese",
        "count": 320
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/griffin_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 83
  },
  '/actions/tailoring/griffin_tunic': {
    "hrid": "/actions/tailoring/griffin_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Griffin Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 50000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/umbral_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/griffin_leather",
        "count": 10
      },
      {
        "itemHrid": "/items/holy_cheese",
        "count": 400
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/griffin_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 105
  },
  '/actions/tailoring/guzzling_pouch': {
    "hrid": "/actions/tailoring/guzzling_pouch",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/pouch",
    "name": "Guzzling Pouch",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.15833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0004166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/giant_pouch",
    "inputItems": [
      {
        "itemHrid": "/items/guzzling_energy",
        "count": 10
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 3000
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 3000
      },
      {
        "itemHrid": "/items/coin",
        "count": 50000000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/guzzling_pouch",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 107
  },
  '/actions/tailoring/icy_robe_bottoms': {
    "hrid": "/actions/tailoring/icy_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Icy Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 50
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 4000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.25,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0010648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/icy_cloth",
        "count": 4
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/icy_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 44
  },
  '/actions/tailoring/icy_robe_top': {
    "hrid": "/actions/tailoring/icy_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Icy Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 50
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 6000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.25,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0010648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/icy_cloth",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/icy_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 43
  },
  '/actions/tailoring/kraken_chaps': {
    "hrid": "/actions/tailoring/kraken_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Kraken Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 160000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/revenant_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/kraken_leather",
        "count": 8
      },
      {
        "itemHrid": "/items/umbral_chaps",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/kraken_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 111
  },
  '/actions/tailoring/kraken_tunic': {
    "hrid": "/actions/tailoring/kraken_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Kraken Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/revenant_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/kraken_leather",
        "count": 10
      },
      {
        "itemHrid": "/items/umbral_tunic",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/kraken_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 115
  },
  '/actions/tailoring/large_pouch': {
    "hrid": "/actions/tailoring/large_pouch",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/pouch",
    "name": "Large Pouch",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 45
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 4800
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.08055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.00033950617283950616,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/medium_pouch",
    "inputItems": [
      {
        "itemHrid": "/items/gobo_leather",
        "count": 300
      },
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 300
      },
      {
        "itemHrid": "/items/coin",
        "count": 500000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/large_pouch",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 38
  },
  '/actions/tailoring/linen_boots': {
    "hrid": "/actions/tailoring/linen_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Linen Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 15
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 32
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.04791666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0003993055555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cotton_boots",
    "inputItems": [
      {
        "itemHrid": "/items/linen_fabric",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/linen_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 17
  },
  '/actions/tailoring/linen_fabric': {
    "hrid": "/actions/tailoring/linen_fabric",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Linen Fabric",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 15
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.03194444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002662037037037037,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/flax",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/linen_fabric",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 15
  },
  '/actions/tailoring/linen_gloves': {
    "hrid": "/actions/tailoring/linen_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Linen Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 18
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 32
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.049166666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00040972222222222224,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cotton_gloves",
    "inputItems": [
      {
        "itemHrid": "/items/linen_fabric",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/linen_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 19
  },
  '/actions/tailoring/linen_hat': {
    "hrid": "/actions/tailoring/linen_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Linen Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 21
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.050416666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004201388888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cotton_hat",
    "inputItems": [
      {
        "itemHrid": "/items/linen_fabric",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/linen_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 21
  },
  '/actions/tailoring/linen_robe_bottoms': {
    "hrid": "/actions/tailoring/linen_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Linen Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 24
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 56
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.051666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00043055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cotton_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/linen_fabric",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/linen_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 23
  },
  '/actions/tailoring/linen_robe_top': {
    "hrid": "/actions/tailoring/linen_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Linen Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 27
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 64
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.05291666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00044097222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/cotton_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/linen_fabric",
        "count": 32
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/linen_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 26
  },
  '/actions/tailoring/lumberjacks_bottoms': {
    "hrid": "/actions/tailoring/lumberjacks_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Lumberjack's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/woodcutting_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/lumberjacks_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 89
  },
  '/actions/tailoring/lumberjacks_top': {
    "hrid": "/actions/tailoring/lumberjacks_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Lumberjack's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/woodcutting_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/lumberjacks_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 88
  },
  '/actions/tailoring/luna_robe_bottoms': {
    "hrid": "/actions/tailoring/luna_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Luna Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 70
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 12000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0006944444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/luna_wing",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/luna_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 66
  },
  '/actions/tailoring/luna_robe_top': {
    "hrid": "/actions/tailoring/luna_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Luna Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 70
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 15000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0006944444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/luna_wing",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/luna_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 65
  },
  '/actions/tailoring/magicians_hat': {
    "hrid": "/actions/tailoring/magicians_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Magician's Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 93
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 120000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.32166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008541666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/magicians_cloth",
        "count": 10
      },
      {
        "itemHrid": "/items/radiant_hat",
        "count": 50
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/magicians_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 110
  },
  '/actions/tailoring/marine_chaps': {
    "hrid": "/actions/tailoring/marine_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Marine Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 50
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 4800
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.25,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0010648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/gobo_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/marine_scale",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/marine_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 42
  },
  '/actions/tailoring/marine_tunic': {
    "hrid": "/actions/tailoring/marine_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Marine Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 50
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 6000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.25,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0010648148148148149,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/gobo_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/marine_scale",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/marine_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 41
  },
  '/actions/tailoring/marksman_bracers': {
    "hrid": "/actions/tailoring/marksman_bracers",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Marksman Bracers",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 92
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 100000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31999999999999995,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008472222222222222,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/marksman_brooch",
        "count": 10
      },
      {
        "itemHrid": "/items/umbral_bracers",
        "count": 30
      },
      {
        "itemHrid": "/items/sighted_bracers",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/marksman_bracers",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 108
  },
  '/actions/tailoring/medium_pouch': {
    "hrid": "/actions/tailoring/medium_pouch",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/pouch",
    "name": "Medium Pouch",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 25
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 1000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.05208333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004340277777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/small_pouch",
    "inputItems": [
      {
        "itemHrid": "/items/reptile_leather",
        "count": 100
      },
      {
        "itemHrid": "/items/linen_fabric",
        "count": 100
      },
      {
        "itemHrid": "/items/coin",
        "count": 50000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/medium_pouch",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 24
  },
  '/actions/tailoring/radiant_boots': {
    "hrid": "/actions/tailoring/radiant_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Radiant Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 75
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 720
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.56875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0014218750000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_boots",
    "inputItems": [
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/radiant_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 70
  },
  '/actions/tailoring/radiant_fabric': {
    "hrid": "/actions/tailoring/radiant_fabric",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Radiant Fabric",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 75
    },
    "baseTimeCost": 26000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 50
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.12638888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.000025,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00031597222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/radiant_fiber",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 68
  },
  '/actions/tailoring/radiant_gloves': {
    "hrid": "/actions/tailoring/radiant_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Radiant Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 78
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 720
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.5785,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0014625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_gloves",
    "inputItems": [
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/radiant_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 72
  },
  '/actions/tailoring/radiant_hat': {
    "hrid": "/actions/tailoring/radiant_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Radiant Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 81
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 900
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.58825,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0015031250000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_hat",
    "inputItems": [
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 90
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/radiant_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 77
  },
  '/actions/tailoring/radiant_robe_bottoms': {
    "hrid": "/actions/tailoring/radiant_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Radiant Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 84
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 1260
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.5980000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00154375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/radiant_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 79
  },
  '/actions/tailoring/radiant_robe_top': {
    "hrid": "/actions/tailoring/radiant_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Radiant Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 87
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 1440
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.60775,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.001584375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 144
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/radiant_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 81
  },
  '/actions/tailoring/red_culinary_hat': {
    "hrid": "/actions/tailoring/red_culinary_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Red Culinary Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 70
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 15000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2833333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0006944444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/red_panda_fluff",
        "count": 10
      },
      {
        "itemHrid": "/items/beast_leather",
        "count": 150
      },
      {
        "itemHrid": "/items/silk_fabric",
        "count": 150
      },
      {
        "itemHrid": "/items/gobo_leather",
        "count": 150
      },
      {
        "itemHrid": "/items/bamboo_fabric",
        "count": 150
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/red_culinary_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 64
  },
  '/actions/tailoring/reptile_boots': {
    "hrid": "/actions/tailoring/reptile_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Reptile Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 15
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 32
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.04791666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0003993055555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rough_boots",
    "inputItems": [
      {
        "itemHrid": "/items/reptile_leather",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/reptile_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 16
  },
  '/actions/tailoring/reptile_bracers': {
    "hrid": "/actions/tailoring/reptile_bracers",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Reptile Bracers",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 18
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 32
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.049166666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00040972222222222224,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rough_bracers",
    "inputItems": [
      {
        "itemHrid": "/items/reptile_leather",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/reptile_bracers",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 18
  },
  '/actions/tailoring/reptile_chaps': {
    "hrid": "/actions/tailoring/reptile_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Reptile Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 24
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 56
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.051666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00043055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rough_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/reptile_leather",
        "count": 28
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/reptile_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 22
  },
  '/actions/tailoring/reptile_hood': {
    "hrid": "/actions/tailoring/reptile_hood",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Reptile Hood",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 21
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 40
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.050416666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0004201388888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rough_hood",
    "inputItems": [
      {
        "itemHrid": "/items/reptile_leather",
        "count": 20
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/reptile_hood",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 20
  },
  '/actions/tailoring/reptile_leather': {
    "hrid": "/actions/tailoring/reptile_leather",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Reptile Leather",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 15
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.03194444444444444,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0002662037037037037,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/reptile_hide",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/reptile_leather",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 14
  },
  '/actions/tailoring/reptile_tunic': {
    "hrid": "/actions/tailoring/reptile_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Reptile Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 27
    },
    "baseTimeCost": 15000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 64
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.05291666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00044097222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/rough_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/reptile_leather",
        "count": 32
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/reptile_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 25
  },
  '/actions/tailoring/revenant_chaps': {
    "hrid": "/actions/tailoring/revenant_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Revenant Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 87
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 40000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31166666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008125,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/umbral_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/revenant_anima",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/revenant_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 82
  },
  '/actions/tailoring/revenant_tunic': {
    "hrid": "/actions/tailoring/revenant_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Revenant Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 50000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/umbral_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/revenant_anima",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/revenant_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 104
  },
  '/actions/tailoring/rough_boots': {
    "hrid": "/actions/tailoring/rough_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Rough Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rough_leather",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rough_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/tailoring/rough_bracers': {
    "hrid": "/actions/tailoring/rough_bracers",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Rough Bracers",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 3
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 8
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.017166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014305555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rough_leather",
        "count": 8
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rough_bracers",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/tailoring/rough_chaps': {
    "hrid": "/actions/tailoring/rough_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Rough Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 9
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 14
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.018166666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0001513888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rough_leather",
        "count": 14
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rough_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 10
  },
  '/actions/tailoring/rough_hood': {
    "hrid": "/actions/tailoring/rough_hood",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Rough Hood",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 6
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 10
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.017666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014722222222222223,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rough_leather",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rough_hood",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 8
  },
  '/actions/tailoring/rough_leather': {
    "hrid": "/actions/tailoring/rough_leather",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Rough Leather",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rough_hide",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rough_leather",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  },
  '/actions/tailoring/rough_tunic': {
    "hrid": "/actions/tailoring/rough_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Rough Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 12
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 16
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.018666666666666668,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00015555555555555556,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rough_leather",
        "count": 16
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/rough_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 12
  },
  '/actions/tailoring/royal_fire_robe_bottoms': {
    "hrid": "/actions/tailoring/royal_fire_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Royal Fire Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 160000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/royal_cloth",
        "count": 8
      },
      {
        "itemHrid": "/items/radiant_robe_bottoms",
        "count": 30
      },
      {
        "itemHrid": "/items/flaming_robe_bottoms",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/royal_fire_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 114
  },
  '/actions/tailoring/royal_fire_robe_top': {
    "hrid": "/actions/tailoring/royal_fire_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Royal Fire Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/royal_cloth",
        "count": 10
      },
      {
        "itemHrid": "/items/radiant_robe_top",
        "count": 30
      },
      {
        "itemHrid": "/items/flaming_robe_top",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/royal_fire_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 118
  },
  '/actions/tailoring/royal_nature_robe_bottoms': {
    "hrid": "/actions/tailoring/royal_nature_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Royal Nature Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 160000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/luna_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/royal_cloth",
        "count": 8
      },
      {
        "itemHrid": "/items/radiant_robe_bottoms",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/royal_nature_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 113
  },
  '/actions/tailoring/royal_nature_robe_top': {
    "hrid": "/actions/tailoring/royal_nature_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Royal Nature Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/luna_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/royal_cloth",
        "count": 10
      },
      {
        "itemHrid": "/items/radiant_robe_top",
        "count": 30
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/royal_nature_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 117
  },
  '/actions/tailoring/royal_water_robe_bottoms': {
    "hrid": "/actions/tailoring/royal_water_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Royal Water Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 94
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 160000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.3233333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008611111111111111,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/royal_cloth",
        "count": 8
      },
      {
        "itemHrid": "/items/radiant_robe_bottoms",
        "count": 30
      },
      {
        "itemHrid": "/items/icy_robe_bottoms",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/royal_water_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 112
  },
  '/actions/tailoring/royal_water_robe_top': {
    "hrid": "/actions/tailoring/royal_water_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Royal Water Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 96
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 200000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.32666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.000875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/royal_cloth",
        "count": 10
      },
      {
        "itemHrid": "/items/radiant_robe_top",
        "count": 30
      },
      {
        "itemHrid": "/items/icy_robe_top",
        "count": 10
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/royal_water_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 116
  },
  '/actions/tailoring/shoebill_shoes': {
    "hrid": "/actions/tailoring/shoebill_shoes",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Shoebill Shoes",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 30
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 2000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.21666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.0018055555555555557,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/shoebill_feather",
        "count": 10
      },
      {
        "itemHrid": "/items/reptile_leather",
        "count": 50
      },
      {
        "itemHrid": "/items/linen_fabric",
        "count": 50
      },
      {
        "itemHrid": "/items/rough_leather",
        "count": 50
      },
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 50
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/shoebill_shoes",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 27
  },
  '/actions/tailoring/sighted_bracers': {
    "hrid": "/actions/tailoring/sighted_bracers",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Sighted Bracers",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 60
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 5000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.26666666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0011574074074074076,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/beast_bracers",
    "inputItems": [
      {
        "itemHrid": "/items/magnifying_glass",
        "count": 1
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/sighted_bracers",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 54
  },
  '/actions/tailoring/silk_boots': {
    "hrid": "/actions/tailoring/silk_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Silk Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 55
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 312
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2841666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012222222222222224,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_boots",
    "inputItems": [
      {
        "itemHrid": "/items/silk_fabric",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/silk_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 50
  },
  '/actions/tailoring/silk_fabric': {
    "hrid": "/actions/tailoring/silk_fabric",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Silk Fabric",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 55
    },
    "baseTimeCost": 18000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 32.5
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.07750000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0003333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/cocoon",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/silk_fabric",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 48
  },
  '/actions/tailoring/silk_gloves': {
    "hrid": "/actions/tailoring/silk_gloves",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Silk Gloves",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 58
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 312
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2896666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012527777777777778,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_gloves",
    "inputItems": [
      {
        "itemHrid": "/items/silk_fabric",
        "count": 48
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/silk_gloves",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 52
  },
  '/actions/tailoring/silk_hat': {
    "hrid": "/actions/tailoring/silk_hat",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Silk Hat",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 61
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 390
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.2951666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012833333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_hat",
    "inputItems": [
      {
        "itemHrid": "/items/silk_fabric",
        "count": 60
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/silk_hat",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 56
  },
  '/actions/tailoring/silk_robe_bottoms': {
    "hrid": "/actions/tailoring/silk_robe_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Silk Robe Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 64
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 546
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.30066666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.001313888888888889,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_robe_bottoms",
    "inputItems": [
      {
        "itemHrid": "/items/silk_fabric",
        "count": 84
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/silk_robe_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 58
  },
  '/actions/tailoring/silk_robe_top': {
    "hrid": "/actions/tailoring/silk_robe_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Silk Robe Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 67
    },
    "baseTimeCost": 66000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 624
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.30616666666666664,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0013444444444444445,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/bamboo_robe_top",
    "inputItems": [
      {
        "itemHrid": "/items/silk_fabric",
        "count": 96
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/silk_robe_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 63
  },
  '/actions/tailoring/small_pouch': {
    "hrid": "/actions/tailoring/small_pouch",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/pouch",
    "name": "Small Pouch",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 5
    },
    "baseTimeCost": 10000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 120
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.029166666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_artisans_crate",
        "dropRate": 0.00024305555555555558,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/rough_leather",
        "count": 30
      },
      {
        "itemHrid": "/items/cotton_fabric",
        "count": 30
      },
      {
        "itemHrid": "/items/coin",
        "count": 5000
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/small_pouch",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/tailoring/sorcerer_boots': {
    "hrid": "/actions/tailoring/sorcerer_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Sorcerer Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 65
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 8000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.27499999999999997,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_artisans_crate",
        "dropRate": 0.0012037037037037038,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/silk_boots",
    "inputItems": [
      {
        "itemHrid": "/items/sorcerers_sole",
        "count": 6
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/sorcerer_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 60
  },
  '/actions/tailoring/tailors_bottoms': {
    "hrid": "/actions/tailoring/tailors_bottoms",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Tailor's Bottoms",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/branch_of_insight",
        "count": 6
      },
      {
        "itemHrid": "/items/tailoring_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/tailors_bottoms",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 95
  },
  '/actions/tailoring/tailors_top': {
    "hrid": "/actions/tailoring/tailors_top",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Tailor's Top",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 90
    },
    "baseTimeCost": 60000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 70000
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.31666666666666665,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0008333333333333334,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "count": 8
      },
      {
        "itemHrid": "/items/butter_of_proficiency",
        "count": 6
      },
      {
        "itemHrid": "/items/tailoring_essence",
        "count": 140000
      },
      {
        "itemHrid": "/items/umbral_leather",
        "count": 200
      },
      {
        "itemHrid": "/items/radiant_fabric",
        "count": 200
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/tailors_top",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 94
  },
  '/actions/tailoring/umbral_boots': {
    "hrid": "/actions/tailoring/umbral_boots",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/feet",
    "name": "Umbral Boots",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 75
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 720
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.56875,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0014218750000000002,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/beast_boots",
    "inputItems": [
      {
        "itemHrid": "/items/umbral_leather",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/umbral_boots",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 69
  },
  '/actions/tailoring/umbral_bracers': {
    "hrid": "/actions/tailoring/umbral_bracers",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/hands",
    "name": "Umbral Bracers",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 78
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 720
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.5785,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0014625,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/beast_bracers",
    "inputItems": [
      {
        "itemHrid": "/items/umbral_leather",
        "count": 72
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/umbral_bracers",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 71
  },
  '/actions/tailoring/umbral_chaps': {
    "hrid": "/actions/tailoring/umbral_chaps",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/legs",
    "name": "Umbral Chaps",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 84
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 1260
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.5980000000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00154375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/beast_chaps",
    "inputItems": [
      {
        "itemHrid": "/items/umbral_leather",
        "count": 126
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/umbral_chaps",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 78
  },
  '/actions/tailoring/umbral_hood': {
    "hrid": "/actions/tailoring/umbral_hood",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/head",
    "name": "Umbral Hood",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 81
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 900
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.58825,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.0015031250000000001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/beast_hood",
    "inputItems": [
      {
        "itemHrid": "/items/umbral_leather",
        "count": 90
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/umbral_hood",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 76
  },
  '/actions/tailoring/umbral_leather': {
    "hrid": "/actions/tailoring/umbral_leather",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/material",
    "name": "Umbral Leather",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 75
    },
    "baseTimeCost": 26000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 50
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.12638888888888888,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/thread_of_expertise",
        "dropRate": 0.000025,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.00031597222222222226,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": [
      {
        "itemHrid": "/items/umbral_hide",
        "count": 2
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/umbral_leather",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 67
  },
  '/actions/tailoring/umbral_tunic': {
    "hrid": "/actions/tailoring/umbral_tunic",
    "function": "/action_functions/production",
    "type": "/action_types/tailoring",
    "category": "/action_categories/tailoring/body",
    "name": "Umbral Tunic",
    "levelRequirement": {
      "skillHrid": "/skills/tailoring",
      "level": 87
    },
    "baseTimeCost": 117000000000,
    "experienceGain": {
      "skillHrid": "/skills/tailoring",
      "value": 1440
    },
    "dropTable": null,
    "essenceDropTable": [
      {
        "itemHrid": "/items/tailoring_essence",
        "dropRate": 0.60775,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/large_artisans_crate",
        "dropRate": 0.001584375,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "/items/beast_tunic",
    "inputItems": [
      {
        "itemHrid": "/items/umbral_leather",
        "count": 144
      }
    ],
    "outputItems": [
      {
        "itemHrid": "/items/umbral_tunic",
        "count": 1
      }
    ],
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 80
  },
  '/actions/woodcutting/arcane_tree': {
    "hrid": "/actions/woodcutting/arcane_tree",
    "function": "/action_functions/gathering",
    "type": "/action_types/woodcutting",
    "category": "/action_categories/woodcutting/trees",
    "name": "Arcane Tree",
    "levelRequirement": {
      "skillHrid": "/skills/woodcutting",
      "level": 80
    },
    "baseTimeCost": 30000000000,
    "experienceGain": {
      "skillHrid": "/skills/woodcutting",
      "value": 55
    },
    "dropTable": [
      {
        "itemHrid": "/items/arcane_log",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "dropRate": 0.15,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/branch_of_insight",
        "dropRate": 0.00003,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/large_meteorite_cache",
        "dropRate": 0.00038194444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 7
  },
  '/actions/woodcutting/birch_tree': {
    "hrid": "/actions/woodcutting/birch_tree",
    "function": "/action_functions/gathering",
    "type": "/action_types/woodcutting",
    "category": "/action_categories/woodcutting/trees",
    "name": "Birch Tree",
    "levelRequirement": {
      "skillHrid": "/skills/woodcutting",
      "level": 10
    },
    "baseTimeCost": 8000000000,
    "experienceGain": {
      "skillHrid": "/skills/woodcutting",
      "value": 7.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/birch_log",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "dropRate": 0.024444444444444446,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00020370370370370372,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 2
  },
  '/actions/woodcutting/cedar_tree': {
    "hrid": "/actions/woodcutting/cedar_tree",
    "function": "/action_functions/gathering",
    "type": "/action_types/woodcutting",
    "category": "/action_categories/woodcutting/trees",
    "name": "Cedar Tree",
    "levelRequirement": {
      "skillHrid": "/skills/woodcutting",
      "level": 20
    },
    "baseTimeCost": 11000000000,
    "experienceGain": {
      "skillHrid": "/skills/woodcutting",
      "value": 12.5
    },
    "dropTable": [
      {
        "itemHrid": "/items/cedar_log",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "dropRate": 0.03666666666666667,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.0003055555555555555,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 3
  },
  '/actions/woodcutting/ginkgo_tree': {
    "hrid": "/actions/woodcutting/ginkgo_tree",
    "function": "/action_functions/gathering",
    "type": "/action_types/woodcutting",
    "category": "/action_categories/woodcutting/trees",
    "name": "Ginkgo Tree",
    "levelRequirement": {
      "skillHrid": "/skills/woodcutting",
      "level": 50
    },
    "baseTimeCost": 17000000000,
    "experienceGain": {
      "skillHrid": "/skills/woodcutting",
      "value": 30
    },
    "dropTable": [
      {
        "itemHrid": "/items/ginkgo_log",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "dropRate": 0.07083333333333333,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00030169753086419757,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 5
  },
  '/actions/woodcutting/purpleheart_tree': {
    "hrid": "/actions/woodcutting/purpleheart_tree",
    "function": "/action_functions/gathering",
    "type": "/action_types/woodcutting",
    "category": "/action_categories/woodcutting/trees",
    "name": "Purpleheart Tree",
    "levelRequirement": {
      "skillHrid": "/skills/woodcutting",
      "level": 35
    },
    "baseTimeCost": 14000000000,
    "experienceGain": {
      "skillHrid": "/skills/woodcutting",
      "value": 20
    },
    "dropTable": [
      {
        "itemHrid": "/items/purpleheart_log",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "dropRate": 0.052500000000000005,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.00021604938271604937,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 4
  },
  '/actions/woodcutting/redwood_tree': {
    "hrid": "/actions/woodcutting/redwood_tree",
    "function": "/action_functions/gathering",
    "type": "/action_types/woodcutting",
    "category": "/action_categories/woodcutting/trees",
    "name": "Redwood Tree",
    "levelRequirement": {
      "skillHrid": "/skills/woodcutting",
      "level": 65
    },
    "baseTimeCost": 20000000000,
    "experienceGain": {
      "skillHrid": "/skills/woodcutting",
      "value": 40
    },
    "dropTable": [
      {
        "itemHrid": "/items/redwood_log",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "dropRate": 0.09166666666666666,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/branch_of_insight",
        "dropRate": 0.00001,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      },
      {
        "itemHrid": "/items/medium_meteorite_cache",
        "dropRate": 0.0004012345679012346,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 6
  },
  '/actions/woodcutting/tree': {
    "hrid": "/actions/woodcutting/tree",
    "function": "/action_functions/gathering",
    "type": "/action_types/woodcutting",
    "category": "/action_categories/woodcutting/trees",
    "name": "Tree",
    "levelRequirement": {
      "skillHrid": "/skills/woodcutting",
      "level": 1
    },
    "baseTimeCost": 6000000000,
    "experienceGain": {
      "skillHrid": "/skills/woodcutting",
      "value": 5
    },
    "dropTable": [
      {
        "itemHrid": "/items/log",
        "dropRate": 1,
        "minCount": 1,
        "maxCount": 3,
        "minEliteTier": 0
      }
    ],
    "essenceDropTable": [
      {
        "itemHrid": "/items/woodcutting_essence",
        "dropRate": 0.016833333333333332,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "rareDropTable": [
      {
        "itemHrid": "/items/small_meteorite_cache",
        "dropRate": 0.00014027777777777777,
        "minCount": 1,
        "maxCount": 1,
        "minEliteTier": 0
      }
    ],
    "upgradeItemHrid": "",
    "inputItems": null,
    "outputItems": null,
    "combatZoneInfo": null,
    "maxPartySize": 0,
    "buffs": null,
    "sortIndex": 1
  }
} as const satisfies Record<ActionHrid, Action>

// HRID utilities

/**
 * Check if a action HRID is valid
 */
export function validateActionHrid(hrid: string): hrid is ActionHrid {
  return hrid in ACTIONS
}

/**
 * Check if a action exists
 */
export function actionExists(hrid: string): boolean {
  return hrid in ACTIONS
}

// Getter functions
export function getAction(hrid: ActionHrid): Action {
  return ACTIONS[hrid]
}

export function getAllActions(): Action[] {
  return Object.values(ACTIONS)
}

export function getActionsSortedByIndex(): Action[] {
  return getAllActions().sort((a, b) => (a.sortIndex || 0) - (b.sortIndex || 0))
}

// Type exports
export type { Action }
export type { ActionHrid }
export type ActionId = keyof typeof ACTIONS
export type ActionData = typeof ACTIONS

// Get actions by skill requirement
export function getActionsBySkill(skillHrid: z.infer<typeof SkillHridEnum>): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.levelRequirement.skillHrid === skillHrid
  )
}

// Get actions by minimum level requirement
export function getActionsByMinLevel(skillHrid: z.infer<typeof SkillHridEnum>, minLevel: number): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.levelRequirement.skillHrid === skillHrid && 
    action.levelRequirement.level >= minLevel
  )
}

// Get actions by type
export function getActionsByType(typeHrid: string): readonly Action[] {
  return Object.values(ACTIONS).filter(action => action.type === typeHrid)
}

// Get actions by function
export function getActionsByFunction(functionHrid: string): readonly Action[] {
  return Object.values(ACTIONS).filter(action => action.function === functionHrid)
}

// Get actions by category
export function getActionsByCategory(categoryHrid: string): readonly Action[] {
  return Object.values(ACTIONS).filter(action => action.category === categoryHrid)
}

// Get production actions (with input/output items)
export function getProductionActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.inputItems !== null && action.inputItems.length > 0
  )
}

// Get gathering actions (with drop tables)
export function getGatheringActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.dropTable !== null && action.dropTable.length > 0
  )
}

// Get combat actions
export function getCombatActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.combatZoneInfo !== null
  )
}

// Get dungeon actions
export function getDungeonActions(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.combatZoneInfo !== null && action.combatZoneInfo.isDungeon
  )
}

// Get actions that produce a specific item
export function getActionsProducingItem(itemHrid: z.infer<typeof ItemHridEnum>): readonly Action[] {
  return Object.values(ACTIONS).filter(action => {
    if (action.outputItems) {
      return action.outputItems.some(output => output.itemHrid === itemHrid)
    }
    if (action.dropTable) {
      return action.dropTable.some(drop => drop.itemHrid === itemHrid)
    }
    return false
  })
}

// Get actions that require a specific item
export function getActionsRequiringItem(itemHrid: z.infer<typeof ItemHridEnum>): readonly Action[] {
  return Object.values(ACTIONS).filter(action => {
    if (action.inputItems) {
      return action.inputItems.some(input => input.itemHrid === itemHrid)
    }
    return false
  })
}

// Get actions with buffs
export function getActionsWithBuffs(): readonly Action[] {
  return Object.values(ACTIONS).filter(action => 
    action.buffs !== null && action.buffs.length > 0
  )
}

// Action type groups
export const COMBAT_ACTIONS = getCombatActions()
export const PRODUCTION_ACTIONS = getProductionActions()
export const GATHERING_ACTIONS = getGatheringActions()
export const DUNGEON_ACTIONS = getDungeonActions()

// Group actions by skill
export const ACTIONS_BY_SKILL = Object.values(ACTIONS).reduce((acc, action) => {
  const skillHrid = action.levelRequirement.skillHrid
  if (skillHrid) {
    if (!acc[skillHrid]) acc[skillHrid] = []
    acc[skillHrid].push(action.hrid as ActionHrid)
  }
  return acc
}, {} as Record<string, ActionHrid[]>)

// Group actions by type
export const ACTIONS_BY_TYPE = Object.values(ACTIONS).reduce((acc, action) => {
  if (!acc[action.type]) acc[action.type] = []
  const typeActions = acc[action.type]
  if (typeActions) {
    typeActions.push(action.hrid as ActionHrid)
  }
  return acc
}, {} as Record<string, ActionHrid[]>)

// Group actions by category
export const ACTIONS_BY_CATEGORY = Object.values(ACTIONS).reduce((acc, action) => {
  if (!acc[action.category]) acc[action.category] = []
  const categoryActions = acc[action.category]
  if (categoryActions) {
    categoryActions.push(action.hrid as ActionHrid)
  }
  return acc
}, {} as Record<string, ActionHrid[]>)