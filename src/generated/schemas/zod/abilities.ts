/**
 * Auto-generated file - DO NOT EDIT
 * Generated on 2025-08-16T17:51:29.495Z
 */

import { z } from 'zod'
export const AbilityHridEnum = z.enum(['/abilities/aqua_arrow', '/abilities/aqua_aura', '/abilities/arcane_reflection', '/abilities/berserk', '/abilities/cleave', '/abilities/crippling_slash', '/abilities/critical_aura', '/abilities/elemental_affinity', '/abilities/elusiveness', '/abilities/entangle', '/abilities/fierce_aura', '/abilities/fireball', '/abilities/firestorm', '/abilities/flame_arrow', '/abilities/flame_aura', '/abilities/flame_blast', '/abilities/fracturing_impact', '/abilities/frenzy', '/abilities/frost_surge', '/abilities/heal', '/abilities/ice_spear', '/abilities/impale', '/abilities/insanity', '/abilities/invincible', '/abilities/life_drain', '/abilities/maim', '/abilities/mana_spring', '/abilities/minor_heal', '/abilities/natures_veil', '/abilities/penetrating_shot', '/abilities/penetrating_strike', '/abilities/pestilent_shot', '/abilities/poke', '/abilities/precision', '/abilities/promote', '/abilities/provoke', '/abilities/puncture', '/abilities/quick_aid', '/abilities/quick_shot', '/abilities/rain_of_arrows', '/abilities/rejuvenate', '/abilities/revive', '/abilities/scratch', '/abilities/shield_bash', '/abilities/silencing_shot', '/abilities/smack', '/abilities/smoke_burst', '/abilities/speed_aura', '/abilities/spike_shell', '/abilities/steady_shot', '/abilities/stunning_blow', '/abilities/sweep', '/abilities/sylvan_aura', '/abilities/taunt', '/abilities/toughness', '/abilities/toxic_pollen', '/abilities/vampirism', '/abilities/water_strike'] as const)
export type AbilityHrid = z.infer<typeof AbilityHridEnum>
export const AbilitySchema = z.object({
  hrid: AbilityHridEnum,
  name: z.string(),
  description: z.string(),
  isSpecialAbility: z.boolean(),
  manaCost: z.number(),
  cooldownDuration: z.number(),
  castDuration: z.number(),
  abilityEffects: z.array(z.object({
  targetType: z.string(),
  effectType: z.string(),
  combatStyleHrid: z.string(),
  damageType: z.string(),
  baseDamageFlat: z.number(),
  baseDamageFlatLevelBonus: z.number(),
  baseDamageRatio: z.number(),
  baseDamageRatioLevelBonus: z.number(),
  bonusAccuracyRatio: z.number(),
  bonusAccuracyRatioLevelBonus: z.number(),
  damageOverTimeRatio: z.number(),
  damageOverTimeDuration: z.number(),
  armorDamageRatio: z.number(),
  armorDamageRatioLevelBonus: z.number(),
  hpDrainRatio: z.number(),
  pierceChance: z.number(),
  blindChance: z.number(),
  blindDuration: z.number(),
  silenceChance: z.number(),
  silenceDuration: z.number(),
  stunChance: z.number(),
  stunDuration: z.number(),
  spendHpRatio: z.number(),
  buffs: z.array(z.object({
  uniqueHrid: z.string(),
  typeHrid: z.string(),
  ratioBoost: z.number(),
  ratioBoostLevelBonus: z.number(),
  flatBoost: z.number(),
  flatBoostLevelBonus: z.number(),
  startTime: z.string(),
  duration: z.number()
})).nullable()
})),
  defaultCombatTriggers: z.array(z.object({
  dependencyHrid: z.string(),
  conditionHrid: z.string(),
  comparatorHrid: z.string(),
  value: z.number()
})),
  sortIndex: z.number()
})
export type Ability = z.infer<typeof AbilitySchema>