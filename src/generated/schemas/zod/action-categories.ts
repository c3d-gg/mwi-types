/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:23.075Z
 */

import { z } from 'zod'
export const ActionCategoryHridEnum = z.enum(['/action_categories/alchemy/alchemy', '/action_categories/brewing/coffee', '/action_categories/brewing/tea', '/action_categories/cheesesmithing/body', '/action_categories/cheesesmithing/feet', '/action_categories/cheesesmithing/hands', '/action_categories/cheesesmithing/head', '/action_categories/cheesesmithing/legs', '/action_categories/cheesesmithing/main_hand', '/action_categories/cheesesmithing/material', '/action_categories/cheesesmithing/off_hand', '/action_categories/cheesesmithing/tool', '/action_categories/cheesesmithing/two_hand', '/action_categories/combat/aqua_planet', '/action_categories/combat/bear_with_it', '/action_categories/combat/dungeons', '/action_categories/combat/gobo_planet', '/action_categories/combat/golem_cave', '/action_categories/combat/infernal_abyss', '/action_categories/combat/jungle_planet', '/action_categories/combat/planet_of_the_eyes', '/action_categories/combat/smelly_planet', '/action_categories/combat/sorcerers_tower', '/action_categories/combat/swamp_planet', '/action_categories/combat/twilight_zone', '/action_categories/cooking/heal_over_time', '/action_categories/cooking/instant_heal', '/action_categories/cooking/instant_mana', '/action_categories/cooking/mana_over_time', '/action_categories/crafting/bow', '/action_categories/crafting/crossbow', '/action_categories/crafting/dungeon_keys', '/action_categories/crafting/earrings', '/action_categories/crafting/lumber', '/action_categories/crafting/neck', '/action_categories/crafting/off_hand', '/action_categories/crafting/ring', '/action_categories/crafting/special', '/action_categories/crafting/staff', '/action_categories/crafting/trinket', '/action_categories/enhancing/enhance', '/action_categories/foraging/asteroid_belt', '/action_categories/foraging/burble_beach', '/action_categories/foraging/farmland', '/action_categories/foraging/misty_forest', '/action_categories/foraging/olympus_mons', '/action_categories/foraging/shimmering_lake', '/action_categories/foraging/silly_cow_valley', '/action_categories/milking/cows', '/action_categories/tailoring/body', '/action_categories/tailoring/feet', '/action_categories/tailoring/hands', '/action_categories/tailoring/head', '/action_categories/tailoring/legs', '/action_categories/tailoring/material', '/action_categories/tailoring/pouch', '/action_categories/woodcutting/trees'] as const)
export type ActionCategoryHrid = z.infer<typeof ActionCategoryHridEnum>
export const ActionCategorySchema = z.object({
  hrid: ActionCategoryHridEnum,
  name: z.string(),
  type: z.string(),
  sortIndex: z.number()
})
export type ActionCategory = z.infer<typeof ActionCategorySchema>