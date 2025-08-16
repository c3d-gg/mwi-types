/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.706Z
 */

import { z } from 'zod'
export const BuffTypeHridEnum = z.enum(['/buff_types/accuracy', '/buff_types/action_level', '/buff_types/action_speed', '/buff_types/alchemy_level', '/buff_types/alchemy_success', '/buff_types/armor', '/buff_types/artisan', '/buff_types/attack_level', '/buff_types/attack_speed', '/buff_types/blessed', '/buff_types/brewing_level', '/buff_types/cast_speed', '/buff_types/cheesesmithing_level', '/buff_types/combat_drop_quantity', '/buff_types/combat_drop_rate', '/buff_types/cooking_level', '/buff_types/crafting_level', '/buff_types/critical_damage', '/buff_types/critical_rate', '/buff_types/damage', '/buff_types/damage_taken', '/buff_types/defense_level', '/buff_types/efficiency', '/buff_types/elemental_thorns', '/buff_types/enhancing_level', '/buff_types/enhancing_success', '/buff_types/essence_find', '/buff_types/evasion', '/buff_types/fire_amplify', '/buff_types/fire_resistance', '/buff_types/foraging_level', '/buff_types/gathering', '/buff_types/gourmet', '/buff_types/healing_amplify', '/buff_types/hp_regen', '/buff_types/intelligence_level', '/buff_types/life_steal', '/buff_types/magic_level', '/buff_types/mana_leech', '/buff_types/milking_level', '/buff_types/mp_regen', '/buff_types/nature_amplify', '/buff_types/nature_resistance', '/buff_types/physical_amplify', '/buff_types/physical_thorns', '/buff_types/power_level', '/buff_types/processing', '/buff_types/ranged_level', '/buff_types/rare_find', '/buff_types/stamina_level', '/buff_types/tailoring_level', '/buff_types/task_action_speed', '/buff_types/tenacity', '/buff_types/threat', '/buff_types/water_amplify', '/buff_types/water_resistance', '/buff_types/wisdom', '/buff_types/woodcutting_level'] as const)
export type BuffTypeHrid = z.infer<typeof BuffTypeHridEnum>
export const BuffTypeSchema = z.object({
  hrid: BuffTypeHridEnum,
  isCombat: z.boolean(),
  name: z.string(),
  description: z.string(),
  debuffDescription: z.string(),
  sortIndex: z.number()
})
export type BuffType = z.infer<typeof BuffTypeSchema>