# Abilities Generator

## Purpose

Generates TypeScript types, constants, and utilities for abilities from the MWI game data. Abilities define special combat actions with complex effects, damage calculations, and trigger conditions.

## Source Data

Extracts data from `abilityDetailMap` in `game_data.json`:

```json
{
	"hrid": "/abilities/aqua_arrow",
	"name": "Aqua Arrow",
	"description": "Shoots an arrow made of water at the targeted enemy",
	"isSpecialAbility": false,
	"manaCost": 35,
	"cooldownDuration": 18000000000,
	"castDuration": 500000000,
	"abilityEffects": [
		{
			"targetType": "enemy",
			"effectType": "/ability_effect_types/damage",
			"combatStyleHrid": "/combat_styles/ranged",
			"damageType": "/damage_types/water",
			"baseDamageFlat": 20,
			"baseDamageFlatLevelBonus": 0.2,
			"baseDamageRatio": 0.9,
			"baseDamageRatioLevelBonus": 0.009,
			"bonusAccuracyRatio": 0,
			"bonusAccuracyRatioLevelBonus": 0,
			"damageOverTimeRatio": 0,
			"damageOverTimeDuration": 0,
			"armorDamageRatio": 0,
			"armorDamageRatioLevelBonus": 0,
			"hpDrainRatio": 0,
			"pierceChance": 0,
			"blindChance": 0,
			"blindDuration": 0,
			"silenceChance": 0,
			"silenceDuration": 0,
			"stunChance": 0,
			"stunDuration": 0,
			"spendHpRatio": 0,
			"buffs": null
		}
	],
	"defaultCombatTriggers": [
		{
			"dependencyHrid": "/combat_trigger_dependencies/targeted_enemy",
			"conditionHrid": "/combat_trigger_conditions/current_hp",
			"comparatorHrid": "/combat_trigger_comparators/greater_than_equal",
			"value": 1
		}
	],
	"sortIndex": 15
}
```

**Data Structure Analysis:**

- **Total entities**: 57 abilities
- **Complexity**: High - complex nested objects with combat mechanics
- **Dependencies**: CombatStyles (combatStyleHrid), DamageTypes (damageType), BuffTypes (buffs)
- **Key nested structures**: abilityEffects[], defaultCombatTriggers[]

## Generated Exports

### Types (`types.ts`)

- `Ability` - Main interface with all properties
- `AbilityEffect` - Combat effect interface with damage/status mechanics
- `CombatTrigger` - Combat trigger condition interface
- `AbilityHrid` - Union type of all ability HRIDs

### Constants (`constants.ts`)

- `ABILITY_HRIDS` - Array of all ability HRIDs
- `ABILITIES_COUNT` - Total number of abilities
- `SPECIAL_ABILITY_HRIDS` - Array of special abilities
- `REGULAR_ABILITY_HRIDS` - Array of regular abilities

### Data (`data.ts`)

- `getAbilitiesRecord()` - Lazy-loaded Record&lt;AbilityHrid, Ability&gt;

### Utilities (`utils.ts`)

- `getAbility(hrid)` - Get ability by HRID
- `getAbilitiesArray()` - Get all abilities as array
- `getAbilitiesBySpecial(isSpecial)` - Filter by special/regular
- `getAbilitiesByCombatStyle(styleHrid)` - Filter by combat style
- `getAbilitiesByDamageType(damageType)` - Filter by damage type
- `getAbilitiesSortedByManaCost()` - Sort by mana cost
- `getAbilitiesSortedByIndex()` - Sort by sortIndex
- `toMap(record)` - Convert Record to Map for O(1) lookups

### Lookups (`lookups.ts`)

- `ABILITIES_BY_COMBAT_STYLE` - CombatStyleHrid → Ability[] lookup
- `ABILITIES_BY_DAMAGE_TYPE` - DamageTypeHrid → Ability[] lookup
- `SPECIAL_ABILITIES_LOOKUP` - Fast special ability lookup

## Dependencies

**Imports from:**

- `combat-styles/types` - CombatStyleHrid for ability effects
- `damage-types/types` - DamageTypeHrid for damage calculations
- `sharedtypes/types` - Buff interface for ability buffs

## Usage Examples

```typescript
import { SPECIAL_ABILITY_HRIDS } from '@c3d.gg/mwi-types/abilities/constants'
import { Ability, AbilityHrid } from '@c3d.gg/mwi-types/abilities/types'
import {
	getAbilitiesByCombatStyle,
	getAbility,
} from '@c3d.gg/mwi-types/abilities/utils'

// Type-safe ability usage
const aquaArrow: AbilityHrid = '/abilities/aqua_arrow'
const ability = getAbility(aquaArrow)

console.log(`${ability?.name}: ${ability?.manaCost} mana`)
console.log(`Cooldown: ${ability?.cooldownDuration / 1000000000}s`)

// Find abilities by combat style
const rangedAbilities = getAbilitiesByCombatStyle('/combat_styles/ranged')
console.log(`Found ${rangedAbilities.length} ranged abilities`)

// Work with ability effects
ability?.abilityEffects.forEach((effect) => {
	console.log(`Effect: ${effect.effectType} -> ${effect.damageType}`)
	if (effect.combatStyleHrid) {
		console.log(`Combat style: ${effect.combatStyleHrid}`)
	}
})

// Special abilities
SPECIAL_ABILITY_HRIDS.forEach((hrid) => {
	const specialAbility = getAbility(hrid)
	console.log(`Special: ${specialAbility.name}`)
})
```

## Testing Strategy

- **Configuration validation**: Verify dependencies and shared types
- **Data extraction**: Test complex nested object handling
- **Type relationships**: Test CombatStyle and DamageType references
- **Ability effects**: Validate nested abilityEffects structure
- **Combat triggers**: Validate defaultCombatTriggers structure
- **Edge cases**: Handle null buffs, empty arrays, special abilities
- **Performance**: Verify efficient handling of 57 complex entities

## Performance

- **Dataset size**: 57 entities (medium complexity)
- **Generation time**: ~200-500ms due to complex nested structures
- **Bundle impact**: Medium (~10-15KB per import) due to complex interfaces
- **Tree-shaking**: Full support for individual imports

## Implementation Notes

**Complex Nested Structures:**

- `AbilityEffect` requires careful type mapping for combat mechanics
- `CombatTrigger` needs precise trigger condition typing
- Both structures have many numeric fields with specific meanings

**Null Handling:**

- `buffs` can be null in abilityEffects
- Will need `applyDataCleaning: false` to preserve null values

**Dependencies Management:**

- Must import CombatStyleHrid and DamageTypeHrid types
- Potential for many utility functions due to complex filtering needs

## Related Generators

**Depends on:**

- `combat-styles` - For combatStyleHrid references ✅
- `damage-types` - For damageType references ✅
- `buff-types` - For buffs references ✅

**Used by:**

- `actions` - May reference abilities for action mechanics
- `monsters` - May reference abilities for monster combat
- `player-data` - Player ability progress and unlocks
