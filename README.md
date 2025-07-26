# @c3d/mwi-types

TypeScript type definitions, schemas, and constants for Milky Way Idle game data.

## Overview

`@c3d/mwi-types` provides comprehensive TypeScript types for the Milky Way Idle game, including:

- 🎯 **Complete type definitions** for all game entities
- ✅ **Runtime validation** with both Zod and Typebox schemas  
- 🔤 **HRID constants** for all entity identifiers
- 🌍 **Type-safe translations** for supported locales
- 📦 **Tree-shakeable exports** for optimal bundle size

## Installation

```bash
npm install @c3d/mwi-types
# or
yarn add @c3d/mwi-types
# or
pnpm add @c3d/mwi-types
# or
bun add @c3d/mwi-types
```

## Usage

### Basic Types

```typescript
import { Item, Skill, Action, Recipe } from '@c3d/mwi-types';

// Type-safe game entities
const milk: Item = {
  hrid: '/items/milk',
  name: 'Milk',
  categoryHrid: '/item_categories/product',
  // ... other properties
};
```

### Import Paths

The package provides multiple entry points for better tree-shaking:

```typescript
// Main entry - all types
import { Item, Skill, getItem } from '@c3d/mwi-types';

// Game logic only
import { ITEMS, SKILLS, getItemsByCategory } from '@c3d/mwi-types/game-logic';

// Constants/HRIDs only
import { ItemHrid, SkillHrid, ITEM_HRIDS } from '@c3d/mwi-types/constants';

// Schemas only
import { ItemSchema } from '@c3d/mwi-types/zod';
import { ItemSchema as ItemTypeboxSchema } from '@c3d/mwi-types/typebox';

// Player data types
import { PlayerData, Character } from '@c3d/mwi-types/player-data';

// Localization
import { getTranslatedItem } from '@c3d/mwi-types/localization';
```

### Schema Validation

```typescript
// Zod schemas
import { ItemSchema, SkillSchema } from '@c3d/mwi-types/zod';

const validItem = ItemSchema.parse(unknownData);
const isValid = SkillSchema.safeParse(data).success;

// Typebox schemas  
import { ItemSchema, SkillSchema } from '@c3d/mwi-types/typebox';
import { Value } from '@sinclair/typebox/value';

const isValid = Value.Check(ItemSchema, data);
```

### HRID Constants

```typescript
import { ITEM_HRIDS, SKILL_HRIDS, SkillHrid } from '@c3d/mwi-types/constants';

// Use as enums
const selectedSkill: SkillHrid = SKILL_HRIDS.ALCHEMY;

// Or iterate all values
ITEM_HRIDS.forEach(hrid => {
  console.log(`Processing item: ${hrid}`);
});
```

### Utility Functions

```typescript
import { 
  getItemByHrid, 
  getSkillByHrid,
  filterItemsByCategory,
  filterActionsBySkill 
} from '@c3d/mwi-types';

const milk = getItemByHrid('/items/milk');
const cookingActions = filterActionsBySkill('/skills/cooking');
```

### Type-Safe Translations

```typescript
import { ItemTranslations, SkillTranslations } from '@c3d/mwi-types/localization/en';

const milkName = ItemTranslations['/items/milk'].name;
const alchemyDesc = SkillTranslations['/skills/alchemy'].description;
```

## Available Types

### Core Game Logic
- **Skills** - All game skills with experience and level requirements
- **Items** - Resources, equipment, consumables with full property data
- **Actions** - Skill-specific actions with requirements and outputs
- **Recipes** - Crafting recipes with ingredients and results
- **Equipment** - Equipment types and stat modifiers
- **Abilities** - Combat abilities with damage calculations

### Combat System
- **Combat Monsters** - NPCs with stats, abilities, and loot tables
- **Combat Styles** - Attack styles and combat mechanics
- **Damage Types** - Elemental and physical damage categories
- **Buffs** - Status effects and stat modifiers

### Game Features
- **House Rooms** - Player housing upgrades and bonuses
- **Shops** - Shop categories and purchasable items
- **Tasks** - Daily/random tasks and rewards
- **Community Buffs** - Server-wide effects
- **Quests** - Quest chains and progression

### Social & UI
- **Chat** - Icons, colors, and channel types
- **Avatars** - Character customization options
- **Guild Roles** - Permissions and hierarchy
- **Leaderboards** - Ranking categories and scoring

### Player Data
- **Character** - Full character state and progression
- **Inventory** - Item storage and equipment loadouts
- **Skills Progress** - Experience and level tracking

## Auto-Generated Package

⚠️ **Important**: This package is auto-generated from Milky Way Idle game data files. Do not manually edit the generated files in the `dist` directory. All type definitions are generated from the source game data to ensure accuracy and completeness.

## Development

To contribute or report issues, please visit our [GitHub repository](https://github.com/c3d-gg/mwi-types).

### Building from Source

```bash
# Clone the repository
git clone https://github.com/c3d-gg/mwi-types.git
cd mwi-types

# Install dependencies
bun install

# Generate types
bun run generate

# Type check
bun run typecheck
```

## Requirements

- TypeScript 5.0 or higher
- Zod 4.0 (if using Zod schemas)
- @sinclair/typebox (if using Typebox schemas)

## License

MIT © C3D

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and breaking changes.