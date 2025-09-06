# Recipes Generator

## Overview

The Recipes generator is a **special case** that creates derived data from Actions. It extracts all actions that have `inputItems` or `outputItems` to create a comprehensive recipe system with crafting trees and material calculations.

## Source Data

- **Primary Source**: `actionDetailMap` (filtered for recipe actions)
- **Entity Count**: ~618 recipes
- **Complexity**: Very High - includes recipe trees, caching, and cross-domain relationships

## Key Features

### 1. Derived Data

Recipes don't exist as a separate entity in game_data.json. They are derived from actions that have:

- `inputItems`: Materials required for crafting
- `outputItems`: Items produced by the recipe
- `upgradeItemHrid`: Optional base item for tier upgrades

### 2. Recipe Trees

The generator creates hierarchical recipe trees showing all materials needed:

```
Verdant Brush:
  - Verdant Cheese
    - Verdant Milk
  - Cheese Brush
    - Cheese
      - Milk
```

### 3. Lookup Maps

- **By Skill**: Recipes grouped by required skill
- **By Type**: Recipes grouped by action type
- **By Output**: Recipes that produce specific items
- **By Input**: Recipes that consume specific items

### 4. Advanced Utilities

- Recipe tree building with cycle detection
- Total material calculations
- Missing material detection
- Crafting path generation
- Time modifiers calculations
- Cache management for performance

## Dependencies

- Actions (for types and metadata)
- Items (for ItemHrid)
- Skills (for SkillHrid)
- ActionCategories (for category types)
- SharedTypes (for LevelRequirement, ExperienceGain)

## Special Considerations

### 1. Performance

- Recipe trees can be deeply nested
- Caching is essential for complex items
- Memoization prevents recalculation

### 2. Circular Dependencies

- Some recipes may have circular dependencies
- Max depth and path tracking prevent infinite recursion

### 3. Upgrade Items

- Tier-based crafting uses `upgradeItemHrid`
- Must be included in material calculations

## Generated Files

### types.ts

- `Recipe` interface with all properties
- `RecipeItem` for input/output items
- `RecipeTreeNode` for tree structures
- `RecipeTreeStats` for analytics
- `TimeModifiers` for crafting speed

### constants.ts

- `RECIPE_HRIDS`: All recipe identifiers
- Category and type groupings

### data.ts

- Lazy-loaded recipe data
- Recipe records

### lookups.ts

- `RECIPES_BY_SKILL`: Static skill groupings
- `RECIPES_BY_TYPE`: Static type groupings
- `RECIPES_BY_OUTPUT`: Output item mappings
- `RECIPES_BY_INPUT`: Input item mappings

### utils.ts

- `buildRecipeTree()`: Create crafting trees
- `calculateRecipeTreeStats()`: Analyze trees
- `getTotalMaterials()`: Sum all materials
- `getMissingMaterials()`: Check inventory
- `getCraftingPath()`: Order of operations
- Cache management functions

## Usage Examples

```typescript
// Get all recipes for a skill
const smithingRecipes = getRecipesBySkill('/skills/smithing')

// Build a recipe tree
const tree = buildRecipeTree('/items/verdant_brush', 1)

// Calculate materials needed
const stats = calculateRecipeTreeStats(tree!)
const materials = getTotalMaterials(tree!)

// Check what's missing from inventory
const missing = getMissingMaterials(tree!, inventory)

// Get crafting order
const path = getCraftingPath(tree!)
```

## Implementation Notes

1. **Recipe Extraction**: Only actions with input/output items
2. **Tree Building**: Recursive with cycle detection
3. **Caching**: Essential for performance
4. **Type Safety**: Imports from other domains
5. **Tree-shaking**: Modular exports for optimization
