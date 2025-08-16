/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.752Z
 */

import { z } from 'zod'
import { SkillHridEnum } from '../../game-logic/skills.js'
import { ItemHridEnum } from '../../game-logic/items.js'
import { BuffTypeHridEnum } from '../../game-logic/buff-types.js'
export const HouseRoomHridEnum = z.enum(['/house_rooms/archery_range', '/house_rooms/armory', '/house_rooms/brewery', '/house_rooms/dairy_barn', '/house_rooms/dining_room', '/house_rooms/dojo', '/house_rooms/forge', '/house_rooms/garden', '/house_rooms/gym', '/house_rooms/kitchen', '/house_rooms/laboratory', '/house_rooms/library', '/house_rooms/log_shed', '/house_rooms/mystical_study', '/house_rooms/observatory', '/house_rooms/sewing_parlor', '/house_rooms/workshop'] as const)
export type HouseRoomHrid = z.infer<typeof HouseRoomHridEnum>
export const HouseRoomSchema = z.object({
  hrid: HouseRoomHridEnum,
  name: z.string(),
  skillHrid: SkillHridEnum,
  sortIndex: z.number(),
  usableInActionTypeMap: z.record(z.string(), z.boolean()),
  actionBuffs: z.array(z.object({
  uniqueHrid: z.string(),
  typeHrid: BuffTypeHridEnum,
  ratioBoost: z.number(),
  ratioBoostLevelBonus: z.number(),
  flatBoost: z.number(),
  flatBoostLevelBonus: z.number(),
  startTime: z.string(),
  duration: z.number()
})),
  globalBuffs: z.array(z.object({
  uniqueHrid: z.string(),
  typeHrid: BuffTypeHridEnum,
  ratioBoost: z.number(),
  ratioBoostLevelBonus: z.number(),
  flatBoost: z.number(),
  flatBoostLevelBonus: z.number(),
  startTime: z.string(),
  duration: z.number()
})),
  upgradeCostsMap: z.record(z.string(), z.array(z.object({
  itemHrid: ItemHridEnum,
  count: z.number()
})))
})
export type HouseRoom = z.infer<typeof HouseRoomSchema>