/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:38:41.911Z
 */

import { z } from 'zod'
export const AvatarHridEnum = z.enum(['/avatars/blue_person_1', '/avatars/blue_person_2', '/avatars/blue_person_3', '/avatars/bunny_1', '/avatars/bunny_2', '/avatars/cat_1', '/avatars/cat_2', '/avatars/cat_3', '/avatars/cat_4', '/avatars/cat_5', '/avatars/custom_aowoo', '/avatars/custom_auspiciousdragon', '/avatars/custom_bestcow', '/avatars/custom_catopia', '/avatars/custom_daddyvladi', '/avatars/custom_goldenhound', '/avatars/custom_goodguyjack', '/avatars/custom_h0lyduck', '/avatars/custom_hamunekouwuo', '/avatars/custom_hasumi', '/avatars/custom_immortalphoenix', '/avatars/custom_invincbriv14jump', '/avatars/custom_jbq', '/avatars/custom_jiojio', '/avatars/custom_joey', '/avatars/custom_karlding', '/avatars/custom_kiyuu', '/avatars/custom_kiyuu_2', '/avatars/custom_krazden', '/avatars/custom_leica', '/avatars/custom_liha', '/avatars/custom_mengmenguwu', '/avatars/custom_miuca', '/avatars/custom_mooooooooo', '/avatars/custom_neronex', '/avatars/custom_oguri', '/avatars/custom_owengod', '/avatars/custom_perxmon', '/avatars/custom_pyrothefolf', '/avatars/custom_rose', '/avatars/custom_sumimiuniverse', '/avatars/custom_taichislippers', '/avatars/custom_toillian', '/avatars/custom_touya', '/avatars/custom_weijia', '/avatars/custom_weilan', '/avatars/custom_windoge', '/avatars/custom_xialu', '/avatars/dog_1', '/avatars/dog_2', '/avatars/dog_3', '/avatars/dog_4', '/avatars/dog_5', '/avatars/frog_1', '/avatars/frog_2', '/avatars/golden_bunny', '/avatars/golden_cat', '/avatars/golden_cow', '/avatars/golden_frog', '/avatars/golden_hamster', '/avatars/golden_retriever', '/avatars/green_person_1', '/avatars/green_person_2', '/avatars/green_person_3', '/avatars/hamster_1', '/avatars/hamster_2', '/avatars/iron_cow', '/avatars/jack_o_lantern', '/avatars/person_default', '/avatars/pirate_1', '/avatars/pirate_2', '/avatars/purple_person_1', '/avatars/purple_person_2', '/avatars/purple_person_3', '/avatars/red_person_1', '/avatars/red_person_2', '/avatars/red_person_3', '/avatars/santa', '/avatars/spring_festival_boy', '/avatars/spring_festival_girl', '/avatars/yellow_person_1', '/avatars/yellow_person_2', '/avatars/yellow_person_3'] as const)
export type AvatarHrid = z.infer<typeof AvatarHridEnum>
export const AvatarSchema = z.object({
  hrid: AvatarHridEnum,
  name: z.string(),
  isSeasonal: z.boolean(),
  cowbellCost: z.number().min(0),
  sortIndex: z.number()
})
export type Avatar = z.infer<typeof AvatarSchema>