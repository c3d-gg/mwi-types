# @c3d.gg/mwi-types

TypeScript type definitions, utility functions, and constants for Milky Way Idle game data.

## Overview

`@c3d.gg/mwi-types` provides comprehensive TypeScript types for the Milky Way Idle game, including:

- 🎯 **Complete type definitions** for all game entities (30+ types)
- 🗺️ **Map-based collections** for O(1) lookups by HRID
- 🛠️ **Rich utility functions** for filtering, searching, and sorting
- 🔤 **HRID constants** as const arrays for type-safe identifiers
- 🌍 **Type-safe translations** for multiple locales
- 📦 **Tree-shakeable exports** for optimal bundle size

## Installation

```bash
npm install @c3d.gg/mwi-types
# or
yarn add @c3d.gg/mwi-types
# or
pnpm add @c3d.gg/mwi-types
# or
bun add @c3d.gg/mwi-types
```

## Usage

### Basic Types and Collections

```typescript
import { Item, ITEMS, Skill, SKILLS } from '@c3d.gg/mwi-types'

// Access items from Map collection (O(1) lookup)
const milk = ITEMS.get('/items/milk')

// Iterate over all skills
for (const [hrid, skill] of SKILLS) {
	console.log(`${skill.name}: Level ${skill.maxLevel}`)
}

// Convert to array when needed
const allItems = Array.from(ITEMS.values())
```

### Utility Functions

Every type comes with a comprehensive set of utility functions, organized into standard and domain-specific categories.

#### Standard Functions (All Types)

All entity types include these standard utilities:

```typescript
import { 
	getItem, requireItem, getAllItems, isItemHrid,
	getSkill, requireSkill, getAllSkills, isSkillHrid,
	getAction, requireAction, getAllActions, isActionHrid,
} from '@c3d.gg/mwi-types'

// Safe getter (returns undefined if not found)
const milk = getItem('/items/milk')

// Throws if not found (useful when you know it exists)
const sword = requireItem('/items/sword')

// Type guard for HRIDs
if (isItemHrid(someString)) {
	// someString is now typed as ItemHrid
}

// Get all entities as array
const allItems = getAllItems()
const allSkills = getAllSkills()
```

#### Items - Equipment & Trading

```typescript
import {
	getItemsByCategory,
	getEquipmentByType,
	isEquipment,
	isTradable,
	getItemsForSkill,
	calculateEnhancementCost,
	getItemValue,
} from '@c3d.gg/mwi-types/types/items'

// Filter items by category
const foods = getItemsByCategory('/item_categories/food')

// Get equipment by type
const weapons = getEquipmentByType('/equipment_types/weapon')

// Check item properties
const isWeaponEquipment = isEquipment(sword)
const canTradeItem = isTradable(milk)

// Get equipment for a skill requirement
const cookingEquipment = getItemsForSkill('/skills/cooking')

// Calculate enhancement costs
const enhanceCost = calculateEnhancementCost(sword, 5)

// Get item value for sorting/comparison
const itemValue = getItemValue(sword)
```

#### Actions - Skills, Combat & Production

```typescript
import {
	getActionsByFunction,
	getActionsByType,
	getActionsByCategory,
	getActionsBySkill,
	isProductionAction,
	isCombatAction,
	isGatheringAction,
	meetsActionRequirements,
	hasRequiredItems,
	getProductionActions,
	getCombatActions,
	getGatheringActions,
} from '@c3d.gg/mwi-types/types/actions'

// Get actions by different criteria
const productionActions = getActionsByFunction('/action_functions/production')
const cookingActions = getActionsBySkill('/skills/cooking')
const craftingActions = getActionsByType('/action_types/crafting')

// Check action types
const isRecipe = isProductionAction(action)
const isFighting = isCombatAction(action)

// Check if player can perform action
const playerSkills = { '/skills/cooking': 25 }
const inventory = { '/items/milk': 10, '/items/wheat': 5 }
const canDoAction = meetsActionRequirements(action, playerSkills) && 
					hasRequiredItems(action, inventory)

// Get all actions by function type
const allRecipes = getProductionActions()
const allCombat = getCombatActions()
const allGathering = getGatheringActions()
```

#### Recipes - Crafting & Recipe Trees

```typescript
import {
	getRecipesBySkill,
	getRecipesByType,
	getRecipesByCategory,
	getRecipesForOutput,
	canCraftRecipe,
	buildRecipeTree,
	calculateRecipeTreeStats,
	getTotalMaterials,
	getMissingMaterials,
	getCraftingPath,
	calculateModifiedTime,
} from '@c3d.gg/mwi-types/types/recipes'

// Find recipes by skill/category
const cookingRecipes = getRecipesBySkill('/skills/cooking')
const foodRecipes = getRecipesByCategory('/action_categories/cooking')
const breadRecipes = getRecipesForOutput('/items/bread')

// Check crafting requirements
const inventory = { '/items/wheat': 10, '/items/water': 5 }
const canMakeBread = canCraftRecipe(breadRecipe, inventory)

// Build complete recipe dependency tree
const recipeTree = buildRecipeTree('/items/enchanted_sword', 1)
const treeStats = calculateRecipeTreeStats(recipeTree)

// Calculate materials needed
const totalMaterials = getTotalMaterials(recipeTree)
const missing = getMissingMaterials(recipeTree, inventory)

// Get optimal crafting order
const craftingOrder = getCraftingPath(recipeTree)

// Calculate modified crafting time with bonuses
const modifiers = { efficiency: 10, toolSpeed: 15, teaSpeed: 5, haste: 0 }
const actualTime = calculateModifiedTime(baseTime, modifiers)
```

#### Monsters - Combat & Loot

```typescript
import {
	getMonstersByCombatLevel,
	getMonstersByDamageType,
	getMonstersInLevelRange,
	getItemDropChances,
} from '@c3d.gg/mwi-types/types/monsters'

// Find monsters by level
const level50Monsters = getMonstersByCombatLevel(50)
const midTierMonsters = getMonstersInLevelRange(40, 60)

// Find monsters by damage type
const fireMonsters = getMonstersByDamageType('/damage_types/fire')

// Analyze drop rates for specific items
const swordDrops = getItemDropChances('/items/iron_sword')
// Returns: [{ monsterHrid, dropRate, isRare }, ...]
```

#### House Rooms - Player Housing

```typescript
import {
	getHouseRoomBySkill,
	getUpgradeCost,
	getTotalUpgradeCost,
	roomProvidesActionType,
	getRoomBuffsAtLevel,
	getMaxRoomLevel,
} from '@c3d.gg/mwi-types/types/house-rooms'

// Find room for skill
const cookingRoom = getHouseRoomBySkill('/skills/cooking')

// Calculate upgrade costs
const level5Cost = getUpgradeCost(cookingRoom, 5)
const totalCost = getTotalUpgradeCost(cookingRoom, 1, 5) // levels 1→5

// Check room capabilities
const supportsAction = roomProvidesActionType(room, '/action_types/crafting')
const buffsAtLevel10 = getRoomBuffsAtLevel(room, 10)
const maxLevel = getMaxRoomLevel(room)
```

#### Random Tasks - Daily Tasks

```typescript
import {
	getRandomTasksBySkill,
	getCombatRandomTasks,
	getNonCombatRandomTasks,
	isTaskAvailableForSkill,
	sortRandomTasksByIndex,
	findRandomTaskByName,
	getRandomTasksCount,
} from '@c3d.gg/mwi-types/types/random-tasks'

// Get tasks by type
const cookingTasks = getRandomTasksBySkill('/skills/cooking')
const combatTasks = getCombatRandomTasks()
const skillTasks = getNonCombatRandomTasks()

// Task utilities
const isAvailable = isTaskAvailableForSkill(taskHrid, '/skills/alchemy')
const sortedTasks = sortRandomTasksByIndex(tasks)
const brewingTask = findRandomTaskByName('brewing')
const stats = getRandomTasksCount() // { total, combat, nonCombat }
```

#### Leaderboards - Rankings

```typescript
import {
	getGuildLeaderboardCategories,
	getSkillLeaderboardCategories,
	getLeaderboardCategoriesBySkill,
	getSteamLeaderboardTypes,
	getLeaderboardTypesByGameMode,
	sortLeaderboardCategoriesByIndex,
	searchLeaderboardCategories,
	getLeaderboardStats,
} from '@c3d.gg/mwi-types/types/leaderboards'

// Get different leaderboard types
const guildCategories = getGuildLeaderboardCategories()
const skillCategories = getSkillLeaderboardCategories()
const cookingLeaderboards = getLeaderboardCategoriesBySkill('/skills/cooking')

// Filter by platform/game mode
const steamLeaderboards = getSteamLeaderboardTypes()
const ironmanLeaderboards = getLeaderboardTypesByGameMode('/game_modes/ironman')

// Sorting and searching
const sortedCategories = sortLeaderboardCategoriesByIndex(categories)
const combatLeaderboards = searchLeaderboardCategories('combat')
const stats = getLeaderboardStats()
```

#### Player Data - Character State

```typescript
import {
	isPlayerData,
	getCharacterSkillLevel,
	getTotalSkillLevel,
	getItemCount,
	getEnhancedItems,
	getActiveActions,
	getActionProgress,
	isInGuild,
	isOnline,
	getInventoryItemCount,
} from '@c3d.gg/mwi-types/types/player-data'

// Validate player data
if (isPlayerData(data)) {
	// Skill utilities
	const cookingLevel = getCharacterSkillLevel(data.characterSkills, '/skills/cooking')
	const totalLevel = getTotalSkillLevel(data.characterSkills)
	
	// Inventory utilities  
	const milkCount = getItemCount(data.characterItems, '/items/milk')
	const enhancedGear = getEnhancedItems(data.characterItems)
	
	// Action queue utilities
	const currentActions = getActiveActions(data.characterActions)
	const progress = getActionProgress(currentActions[0])
	
	// Social utilities
	const hasGuild = isInGuild(data)
	const playerOnline = isOnline(data.character)
	
	// Inventory stats
	const totalItems = getInventoryItemCount(data.characterItems)
}
```

#### Shop Items - Commerce & Purchases

```typescript
import {
	getShopItemsByCategory,
	getShopItemsByCurrency,
	getShopItemsForItem,
	canAffordShopItem,
	calculateTotalShopCost,
	findCheapestShopItem,
	sortShopItemsByIndex,
	groupShopItemsByCategory,
} from '@c3d.gg/mwi-types/types/shop-items'

// Find shop items by category
const upgrades = getShopItemsByCategory('/shop_categories/upgrades')

// Find items by currency type
const cowbellItems = getShopItemsByCurrency('/items/cowbell')

// Find shop entries for a specific item
const milkShopEntries = getShopItemsForItem('/items/milk')

// Check if player can afford item
const inventory = { '/items/cowbell': 1000, '/items/supporterpoints': 50 }
const canAfford = canAffordShopItem(shopItem, inventory)

// Calculate total cost for multiple purchases
const totalCost = calculateTotalShopCost([item1, item2, item3])

// Find cheapest way to buy an item
const cheapest = findCheapestShopItem('/items/milk', '/items/cowbell')

// Sort and group shop items
const sorted = sortShopItemsByIndex(shopItems)
const grouped = groupShopItemsByCategory()
```

#### Community Buffs - Server Bonuses

```typescript
import {
	getCommunityBuffsByActionType,
	calculateCommunityBuffValue,
	isCommunityBuffActiveForAction,
	getTotalCowbellCost,
	sortCommunityBuffsByIndex,
} from '@c3d.gg/mwi-types/types/community-buffs'

// Get buffs that apply to specific action types
const cookingBuffs = getCommunityBuffsByActionType('/action_types/cooking')

// Calculate buff effectiveness at level
const buffValue = calculateCommunityBuffValue(communityBuff, 5)
// Returns: { flat: number, ratio: number }

// Check if buff applies to action
const appliesTo = isCommunityBuffActiveForAction(buffType, '/action_types/combat')

// Calculate total cost for multiple buffs
const buffHrids = ['/community_buffs/cooking_speed', '/community_buffs/double_loot']
const totalCost = getTotalCowbellCost(buffHrids)

// Sort buffs for display
const sortedBuffs = sortCommunityBuffsByIndex(communityBuffs)
```

#### Purchase Bundles - Monetization

```typescript
import {
	getStandardOnlyBundles,
	getIroncowOnlyBundles,
	getMooPassBundles,
	getCowbellBundles,
	getBundlesByPriceRange,
	sortPurchaseBundlesByIndex,
	getBundleValuePerDollar,
} from '@c3d.gg/mwi-types/types/purchase-bundles'

// Get bundles by game mode availability
const standardBundles = getStandardOnlyBundles()
const ironcowBundles = getIroncowOnlyBundles()

// Get bundles by type
const mooPassOptions = getMooPassBundles()
const cowbellOptions = getCowbellBundles()

// Find bundles in price range (in cents)
const budgetBundles = getBundlesByPriceRange(99, 999) // $0.99 to $9.99

// Sort bundles for display
const sortedBundles = sortPurchaseBundlesByIndex(allBundles)

// Calculate value efficiency
const valuePerDollar = getBundleValuePerDollar('/bundles/mega_cowbell_pack')
```

### HRID Constants

```typescript
import { ITEM_HRIDS, ItemHrid, SKILL_HRIDS, SkillHrid } from '@c3d.gg/mwi-types'

// All HRIDs are const arrays
const firstItem = ITEM_HRIDS[0] // Type: ItemHrid

// Use for exhaustive checks
function handleSkill(skill: SkillHrid) {
	switch (skill) {
		case '/skills/alchemy':
		// ...
		case '/skills/brewing':
		// ...
		// TypeScript ensures all cases are handled
	}
}

// Check if a string is a valid HRID
ITEM_HRIDS.includes(someString) // Type guard
```

### Import Paths

The package provides multiple entry points for better tree-shaking:

```typescript
// Main entry - all types and utilities
import { getItem, Item, ITEMS } from '@c3d.gg/mwi-types'
// Localization
import { getTranslation } from '@c3d.gg/mwi-types/localization'
// Individual type modules (recommended for tree-shaking)
import { getItem, Item, ITEMS } from '@c3d.gg/mwi-types/types/items'
// Player data types
import { Character, PlayerData } from '@c3d.gg/mwi-types/types/player-data'
import { getSkill, Skill, SKILLS } from '@c3d.gg/mwi-types/types/skills'
// Utils only
import { filterByCategory, sortByIndex } from '@c3d.gg/mwi-types/utils'
```

### Type-Safe Translations

```typescript
import { getTranslation } from '@c3d.gg/mwi-types/localization'

// Get translations for a specific locale
const enTranslations = getTranslation('en')
const zhTranslations = getTranslation('zh')

// Access translated content
const milkName = enTranslations.items['/items/milk'].name
const alchemyDesc = enTranslations.skills['/skills/alchemy'].description

// All translations are fully typed
enTranslations.actions['/actions/brewing_weak_beer'].name
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

## License

MIT © C3D

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and breaking changes.
