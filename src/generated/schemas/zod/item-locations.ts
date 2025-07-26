/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-07-26T21:25:22.969Z
 */

import { z } from 'zod'
export const ItemLocationHridEnum = z.enum(['/item_locations/alchemy_tool', '/item_locations/back', '/item_locations/body', '/item_locations/brewing_tool', '/item_locations/cheesesmithing_tool', '/item_locations/cooking_tool', '/item_locations/crafting_tool', '/item_locations/earrings', '/item_locations/enhancing_tool', '/item_locations/feet', '/item_locations/foraging_tool', '/item_locations/hands', '/item_locations/head', '/item_locations/inventory', '/item_locations/legs', '/item_locations/main_hand', '/item_locations/milking_tool', '/item_locations/neck', '/item_locations/off_hand', '/item_locations/pouch', '/item_locations/ring', '/item_locations/tailoring_tool', '/item_locations/trinket', '/item_locations/two_hand', '/item_locations/woodcutting_tool'] as const)
export type ItemLocationHrid = z.infer<typeof ItemLocationHridEnum>
export const ItemLocationSchema = z.object({
  hrid: ItemLocationHridEnum,
  name: z.string(),
  type: z.string(),
  isTool: z.boolean(),
  isMultiItem: z.boolean(),
  conflictingOtherItemLocationHrids: z.array(z.string()),
  sortIndex: z.number().optional()
})
export type ItemLocation = z.infer<typeof ItemLocationSchema>