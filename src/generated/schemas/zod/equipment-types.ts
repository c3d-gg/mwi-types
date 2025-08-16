/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.545Z
 */

import { z } from 'zod'
export const EquipmentTypeHridEnum = z.enum(['/equipment_types/alchemy_tool', '/equipment_types/back', '/equipment_types/body', '/equipment_types/brewing_tool', '/equipment_types/cheesesmithing_tool', '/equipment_types/cooking_tool', '/equipment_types/crafting_tool', '/equipment_types/earrings', '/equipment_types/enhancing_tool', '/equipment_types/feet', '/equipment_types/foraging_tool', '/equipment_types/hands', '/equipment_types/head', '/equipment_types/legs', '/equipment_types/main_hand', '/equipment_types/milking_tool', '/equipment_types/neck', '/equipment_types/off_hand', '/equipment_types/pouch', '/equipment_types/ring', '/equipment_types/tailoring_tool', '/equipment_types/trinket', '/equipment_types/two_hand', '/equipment_types/woodcutting_tool'] as const)
export type EquipmentTypeHrid = z.infer<typeof EquipmentTypeHridEnum>
export const EquipmentTypeSchema = z.object({
  hrid: EquipmentTypeHridEnum,
  name: z.string(),
  itemLocationHrid: z.string(),
  sortIndex: z.number()
})
export type EquipmentType = z.infer<typeof EquipmentTypeSchema>