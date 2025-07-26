import { BaseGenerator } from '../base/base-generator';
import type { GeneratorConfig, PropertyDefinition, ImportStatement } from '../base/types';
import type { CombatMonsterEntity } from '../../types/source-data';
import { PATHS } from '../../config/paths';
import { createOutputPath, writeGeneratedFile } from '../base/file-writer';

export class CombatMonstersGenerator extends BaseGenerator<CombatMonsterEntity> {
  constructor() {
    const config: GeneratorConfig = {
      entityName: 'CombatMonster',
      entityNamePlural: 'COMBAT_MONSTERS',
      sourceKey: 'combatMonsterDetailMap',
      outputFilename: 'combat-monsters',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    };
    super(config);
  }

  protected override extractEntities(): Record<string, CombatMonsterEntity> {
    if (!this.gameData) {
      throw new Error('Game data not loaded');
    }
    return this.gameData.combatMonsterDetailMap as Record<string, CombatMonsterEntity>;
  }

  protected override defineSchemaProperties(entity: CombatMonsterEntity): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'CombatMonsterHridEnum',
        description: 'The unique human-readable ID for the combat monster'
      },
      {
        name: 'name',
        type: 'string',
        description: 'The display name of the combat monster'
      },
      {
        name: 'combatDetails',
        type: 'object',
        description: 'Base combat statistics and attributes',
        properties: this.getCombatDetailsProperties()
      },
      {
        name: 'elite1CombatDetails',
        type: 'object',
        description: 'Elite tier 1 combat statistics and attributes',
        properties: this.getCombatDetailsProperties()
      },
      {
        name: 'elite2CombatDetails',
        type: 'object',
        description: 'Elite tier 2 combat statistics and attributes',
        properties: this.getCombatDetailsProperties()
      },
      {
        name: 'abilities',
        type: 'array',
        description: 'Array of abilities the monster can use',
        items: {
          name: 'ability',
          type: 'object',
          properties: [
            {
              name: 'abilityHrid',
              type: 'ref',
              refName: 'AbilityHridEnum',
              description: 'Reference to the ability HRID'
            },
            {
              name: 'level',
              type: 'number',
              description: 'The level of the ability'
            },
            {
              name: 'minEliteTier',
              type: 'number',
              description: 'Minimum elite tier required for this ability'
            }
          ]
        }
      },
      {
        name: 'dropTable',
        type: 'array',
        description: 'Regular drop table for the monster',
        nullable: true,
        items: {
          name: 'dropItem',
          type: 'object',
          properties: this.getDropTableItemProperties()
        }
      },
      {
        name: 'rareDropTable',
        type: 'array',
        description: 'Rare drop table for the monster',
        nullable: true,
        items: {
          name: 'rareDropItem',
          type: 'object',
          properties: this.getDropTableItemProperties()
        }
      }
    ];
  }

  private getCombatDetailsProperties(): PropertyDefinition[] {
    return [
      // Health & Mana
      {
        name: 'currentHitpoints',
        type: 'number',
        description: 'Current hitpoints (usually same as max)'
      },
      {
        name: 'maxHitpoints',
        type: 'number',
        description: 'Maximum hitpoints'
      },
      {
        name: 'currentManapoints',
        type: 'number',
        description: 'Current manapoints (usually same as max)'
      },
      {
        name: 'maxManapoints',
        type: 'number',
        description: 'Maximum manapoints'
      },
      // Combat Timing
      {
        name: 'attackInterval',
        type: 'number',
        description: 'Attack interval in nanoseconds'
      },
      // Accuracy Ratings
      {
        name: 'stabAccuracyRating',
        type: 'number',
        description: 'Stab accuracy rating'
      },
      {
        name: 'slashAccuracyRating',
        type: 'number',
        description: 'Slash accuracy rating'
      },
      {
        name: 'smashAccuracyRating',
        type: 'number',
        description: 'Smash accuracy rating'
      },
      {
        name: 'rangedAccuracyRating',
        type: 'number',
        description: 'Ranged accuracy rating'
      },
      {
        name: 'magicAccuracyRating',
        type: 'number',
        description: 'Magic accuracy rating'
      },
      // Damage Values
      {
        name: 'stabMaxDamage',
        type: 'number',
        description: 'Maximum stab damage'
      },
      {
        name: 'slashMaxDamage',
        type: 'number',
        description: 'Maximum slash damage'
      },
      {
        name: 'smashMaxDamage',
        type: 'number',
        description: 'Maximum smash damage'
      },
      {
        name: 'rangedMaxDamage',
        type: 'number',
        description: 'Maximum ranged damage'
      },
      {
        name: 'magicMaxDamage',
        type: 'number',
        description: 'Maximum magic damage'
      },
      // Evasion Ratings
      {
        name: 'stabEvasionRating',
        type: 'number',
        description: 'Stab evasion rating'
      },
      {
        name: 'slashEvasionRating',
        type: 'number',
        description: 'Slash evasion rating'
      },
      {
        name: 'smashEvasionRating',
        type: 'number',
        description: 'Smash evasion rating'
      },
      {
        name: 'rangedEvasionRating',
        type: 'number',
        description: 'Ranged evasion rating'
      },
      {
        name: 'magicEvasionRating',
        type: 'number',
        description: 'Magic evasion rating'
      },
      // Defenses
      {
        name: 'totalArmor',
        type: 'number',
        description: 'Total armor value'
      },
      {
        name: 'totalWaterResistance',
        type: 'number',
        description: 'Total water resistance'
      },
      {
        name: 'totalNatureResistance',
        type: 'number',
        description: 'Total nature resistance'
      },
      {
        name: 'totalFireResistance',
        type: 'number',
        description: 'Total fire resistance'
      },
      // Other Combat Properties
      {
        name: 'totalThreat',
        type: 'number',
        description: 'Total threat value'
      },
      {
        name: 'combatLevel',
        type: 'number',
        description: 'Combat level of the monster'
      },
      // Skill Levels
      {
        name: 'staminaLevel',
        type: 'number',
        description: 'Stamina skill level'
      },
      {
        name: 'intelligenceLevel',
        type: 'number',
        description: 'Intelligence skill level'
      },
      {
        name: 'attackLevel',
        type: 'number',
        description: 'Attack skill level'
      },
      {
        name: 'powerLevel',
        type: 'number',
        description: 'Power skill level'
      },
      {
        name: 'defenseLevel',
        type: 'number',
        description: 'Defense skill level'
      },
      {
        name: 'rangedLevel',
        type: 'number',
        description: 'Ranged skill level'
      },
      {
        name: 'magicLevel',
        type: 'number',
        description: 'Magic skill level'
      },
      // Combat Stats (nested object)
      {
        name: 'combatStats',
        type: 'object',
        description: 'Additional combat statistics',
        properties: [
          {
            name: 'combatStyleHrids',
            type: 'array',
            description: 'Array of combat style HRIDs the monster uses',
            items: {
              name: 'combatStyleHrid',
              type: 'ref',
              refName: 'CombatStyleHridEnum'
            }
          },
          {
            name: 'damageType',
            type: 'ref',
            refName: 'DamageTypeHridEnum',
            description: 'The damage type this monster deals'
          },
          {
            name: 'attackInterval',
            type: 'number',
            description: 'Attack interval in nanoseconds'
          },
          // Optional combat stats
          {
            name: 'autoAttackDamage',
            type: 'number',
            description: 'Auto attack damage modifier',
            optional: true
          },
          {
            name: 'stabEvasion',
            type: 'number',
            description: 'Stab evasion modifier',
            optional: true
          },
          {
            name: 'slashEvasion',
            type: 'number',
            description: 'Slash evasion modifier',
            optional: true
          },
          {
            name: 'smashEvasion',
            type: 'number',
            description: 'Smash evasion modifier',
            optional: true
          },
          {
            name: 'fireAmplify',
            type: 'number',
            description: 'Fire damage amplification',
            optional: true
          },
          {
            name: 'waterAmplify',
            type: 'number',
            description: 'Water damage amplification',
            optional: true
          },
          {
            name: 'natureAmplify',
            type: 'number',
            description: 'Nature damage amplification',
            optional: true
          },
          {
            name: 'waterResistance',
            type: 'number',
            description: 'Water resistance modifier',
            optional: true
          },
          {
            name: 'natureResistance',
            type: 'number',
            description: 'Nature resistance modifier',
            optional: true
          },
          {
            name: 'fireResistance',
            type: 'number',
            description: 'Fire resistance modifier',
            optional: true
          },
          {
            name: 'hpRegenPer10',
            type: 'number',
            description: 'HP regeneration per 10 seconds',
            optional: true
          },
          {
            name: 'mpRegenPer10',
            type: 'number',
            description: 'MP regeneration per 10 seconds',
            optional: true
          },
          {
            name: 'tenacity',
            type: 'number',
            description: 'Tenacity (stun resistance)',
            optional: true
          },
          // Additional evasion types
          {
            name: 'rangedEvasion',
            type: 'number',
            description: 'Ranged evasion modifier',
            optional: true
          },
          {
            name: 'magicEvasion',
            type: 'number',
            description: 'Magic evasion modifier',
            optional: true
          },
          // Damage modifiers
          {
            name: 'stabDamage',
            type: 'number',
            description: 'Stab damage modifier',
            optional: true
          },
          {
            name: 'slashDamage',
            type: 'number',
            description: 'Slash damage modifier',
            optional: true
          },
          {
            name: 'smashDamage',
            type: 'number',
            description: 'Smash damage modifier',
            optional: true
          },
          {
            name: 'rangedDamage',
            type: 'number',
            description: 'Ranged damage modifier',
            optional: true
          },
          {
            name: 'magicDamage',
            type: 'number',
            description: 'Magic damage modifier',
            optional: true
          },
          // Special combat stats
          {
            name: 'lifeSteal',
            type: 'number',
            description: 'Life steal percentage',
            optional: true
          },
          {
            name: 'manaLeech',
            type: 'number',
            description: 'Mana leech percentage',
            optional: true
          },
          {
            name: 'parry',
            type: 'number',
            description: 'Parry chance',
            optional: true
          },
          {
            name: 'criticalRate',
            type: 'number',
            description: 'Critical hit rate',
            optional: true
          },
          {
            name: 'criticalDamage',
            type: 'number',
            description: 'Critical damage multiplier',
            optional: true
          },
          {
            name: 'healingPower',
            type: 'number',
            description: 'Healing power modifier',
            optional: true
          },
          // Accuracy modifiers
          {
            name: 'stabAccuracy',
            type: 'number',
            description: 'Stab accuracy modifier',
            optional: true
          },
          {
            name: 'slashAccuracy',
            type: 'number',
            description: 'Slash accuracy modifier',
            optional: true
          },
          {
            name: 'smashAccuracy',
            type: 'number',
            description: 'Smash accuracy modifier',
            optional: true
          },
          {
            name: 'rangedAccuracy',
            type: 'number',
            description: 'Ranged accuracy modifier',
            optional: true
          },
          {
            name: 'magicAccuracy',
            type: 'number',
            description: 'Magic accuracy modifier',
            optional: true
          },
          // Armor penetration
          {
            name: 'armorPenetration',
            type: 'number',
            description: 'Armor penetration',
            optional: true
          },
          {
            name: 'firePenetration',
            type: 'number',
            description: 'Fire resistance penetration',
            optional: true
          },
          {
            name: 'waterPenetration',
            type: 'number',
            description: 'Water resistance penetration',
            optional: true
          },
          {
            name: 'naturePenetration',
            type: 'number',
            description: 'Nature resistance penetration',
            optional: true
          },
          // Ability modifiers
          {
            name: 'abilityHaste',
            type: 'number',
            description: 'Ability cooldown reduction',
            optional: true
          },
          {
            name: 'healingAmplify',
            type: 'number',
            description: 'Healing amplification',
            optional: true
          },
          // Skill levels (some monsters have these in combatStats)
          {
            name: 'stamina',
            type: 'number',
            description: 'Stamina skill level',
            optional: true
          },
          {
            name: 'intelligence',
            type: 'number',
            description: 'Intelligence skill level',
            optional: true
          },
          {
            name: 'attack',
            type: 'number',
            description: 'Attack skill level',
            optional: true
          },
          {
            name: 'power',
            type: 'number',
            description: 'Power skill level',
            optional: true
          },
          {
            name: 'defense',
            type: 'number',
            description: 'Defense skill level',
            optional: true
          },
          {
            name: 'ranged',
            type: 'number',
            description: 'Ranged skill level',
            optional: true
          },
          {
            name: 'magic',
            type: 'number',
            description: 'Magic skill level',
            optional: true
          },
          // Armor stats
          {
            name: 'armor',
            type: 'number',
            description: 'Armor value',
            optional: true
          },
          // Special combat effects
          {
            name: 'curse',
            type: 'number',
            description: 'Curse effect chance/strength',
            optional: true
          },
          {
            name: 'blaze',
            type: 'number',
            description: 'Blaze effect chance/strength',
            optional: true
          },
          {
            name: 'bloom',
            type: 'number',
            description: 'Bloom effect chance/strength',
            optional: true
          },
          {
            name: 'ripple',
            type: 'number',
            description: 'Ripple effect chance/strength',
            optional: true
          },
          {
            name: 'fury',
            type: 'number',
            description: 'Fury effect chance/strength',
            optional: true
          },
          {
            name: 'weaken',
            type: 'number',
            description: 'Weaken effect chance/strength',
            optional: true
          },
          {
            name: 'mayhem',
            type: 'number',
            description: 'Mayhem effect chance/strength',
            optional: true
          },
          {
            name: 'pierce',
            type: 'number',
            description: 'Pierce effect chance/strength',
            optional: true
          },
          // Thorns effects
          {
            name: 'physicalThorns',
            type: 'number',
            description: 'Physical thorns damage',
            optional: true
          },
          {
            name: 'elementalThorns',
            type: 'number',
            description: 'Elemental thorns damage',
            optional: true
          },
          // Cast speed
          {
            name: 'castSpeed',
            type: 'number',
            description: 'Cast speed modifier',
            optional: true
          },
          // Threat
          {
            name: 'threat',
            type: 'number',
            description: 'Threat generation modifier',
            optional: true
          }
        ]
      }
    ];
  }

  private getDropTableItemProperties(): PropertyDefinition[] {
    return [
      {
        name: 'itemHrid',
        type: 'ref',
        refName: 'ItemHridEnum',
        description: 'Reference to the item HRID'
      },
      {
        name: 'dropRate',
        type: 'number',
        description: 'Drop probability (0-1)'
      },
      {
        name: 'minCount',
        type: 'number',
        description: 'Minimum quantity that can drop'
      },
      {
        name: 'maxCount',
        type: 'number',
        description: 'Maximum quantity that can drop'
      },
      {
        name: 'minEliteTier',
        type: 'number',
        description: 'Minimum elite tier required for this drop'
      }
    ];
  }

  protected override async generateGameLogicFile(entities: Record<string, CombatMonsterEntity>): Promise<void> {
    const entityName = this.config.entityName;
    const entityNamePlural = this.config.entityNamePlural;
    const entityNameUpper = entityName.toUpperCase();
    const entityNameUpperPlural = entityNamePlural.toUpperCase();
    
    // Extract HRIDs
    const hrids = Object.keys(entities);
    
    // Generate data object
    const dataEntries = Object.entries(entities).map(([hrid, entity]) => {
      const entityData = this.transformEntityForOutput(entity);
      return `  '${hrid}': ${JSON.stringify(entityData, null, 2).replace(/\n/g, '\n  ')}`;
    }).join(',\n');
    
    // Generate content
    const imports = this.generateImports();
    const typeName = entityName;
    const hridTypeName = `${entityName}Hrid`;
    const hridEnumName = `${entityName}HridEnum`;
    
    const content = `${imports}

// Re-export HRID enum from schema
export { ${hridEnumName} } from '../schemas/zod/${this.config.outputFilename}'

// Re-export schema
export { ${entityName}Schema } from '../schemas/zod/${this.config.outputFilename}'

// Type definitions
type ${hridTypeName} = z.infer<typeof ${hridEnumName}>

// Data
export const ${entityNameUpperPlural}: Record<${hridTypeName}, ${typeName}> = {
${dataEntries}
} as const satisfies Record<${hridTypeName}, ${typeName}>

// Getter functions
export function getCombatMonster(hrid: ${hridTypeName}): ${typeName} {
  return ${entityNameUpperPlural}[hrid];
}

export function getAllCombatMonsters(): ${typeName}[] {
  return Object.values(${entityNameUpperPlural});
}

// Type exports
export type { ${typeName} }
export type { ${hridTypeName} }
export type ${entityName}Id = keyof typeof ${entityNameUpperPlural}
export type ${entityName}Data = typeof ${entityNameUpperPlural}

${this.generateAdditionalExports(entities).join('\n\n')}`;
    
    const outputPath = createOutputPath(PATHS.gameLogic, '', this.config.outputFilename);
    await writeGeneratedFile(outputPath, content, { format: false });
  }

  protected override generateAdditionalExports(entities: Record<string, CombatMonsterEntity>): string[] {
    return [
      `// Get monster name
export function getCombatMonsterName(hrid: CombatMonsterHrid): string {
  return ${this.config.entityNamePlural}[hrid].name;
}`,

      `// Filter monsters by combat level
export function getCombatMonstersByCombatLevel(minLevel: number, maxLevel?: number): CombatMonster[] {
  return Object.values(${this.config.entityNamePlural}).filter(monster => {
    const level = monster.combatDetails.combatLevel;
    if (maxLevel !== undefined) {
      return level >= minLevel && level <= maxLevel;
    }
    return level >= minLevel;
  });
}`,

      `// Get monsters that drop a specific item
export function getCombatMonstersWithDrop(itemHrid: ItemHrid): CombatMonster[] {
  return Object.values(${this.config.entityNamePlural}).filter(monster => {
    const hasInDropTable = monster.dropTable?.some(drop => drop.itemHrid === itemHrid) ?? false;
    const hasInRareDropTable = monster.rareDropTable?.some(drop => drop.itemHrid === itemHrid) ?? false;
    return hasInDropTable || hasInRareDropTable;
  });
}`,

      `// Get monsters that use a specific ability
export function getCombatMonstersWithAbility(abilityHrid: AbilityHrid): CombatMonster[] {
  return Object.values(${this.config.entityNamePlural}).filter(monster =>
    monster.abilities.some(ability => ability.abilityHrid === abilityHrid)
  );
}`,

      `// Get monsters by damage type
export function getCombatMonstersByDamageType(damageType: DamageTypeHrid): CombatMonster[] {
  return Object.values(${this.config.entityNamePlural}).filter(monster =>
    monster.combatDetails.combatStats.damageType === damageType
  );
}`,

      `// Get elite tier stats for a monster
export function getMonsterEliteStats(hrid: CombatMonsterHrid, eliteTier: 0 | 1 | 2): CombatMonster['combatDetails'] {
  const monster = ${this.config.entityNamePlural}[hrid];
  switch (eliteTier) {
    case 0:
      return monster.combatDetails;
    case 1:
      return monster.elite1CombatDetails;
    case 2:
      return monster.elite2CombatDetails;
    default:
      return monster.combatDetails;
  }
}`,

      `// Check if monster has drops
export function hasDrops(monster: CombatMonster): boolean {
  return (monster.dropTable !== null && monster.dropTable.length > 0) ||
         (monster.rareDropTable !== null && monster.rareDropTable.length > 0);
}`,

      `// Get all unique items dropped by monsters
export function getAllMonsterDrops(): Set<ItemHrid> {
  const drops = new Set<ItemHrid>();
  Object.values(${this.config.entityNamePlural}).forEach(monster => {
    monster.dropTable?.forEach(drop => drops.add(drop.itemHrid as ItemHrid));
    monster.rareDropTable?.forEach(drop => drops.add(drop.itemHrid as ItemHrid));
  });
  return drops;
}`,

      `// Get monsters sorted by combat level
export function getCombatMonstersSortedByLevel(): CombatMonster[] {
  return getAllCombatMonsters().sort((a, b) => 
    a.combatDetails.combatLevel - b.combatDetails.combatLevel
  );
}`,

      `// Group monsters by combat level ranges
export const COMBAT_MONSTERS_BY_LEVEL_RANGE = {
  low: getCombatMonstersByCombatLevel(1, 49),
  medium: getCombatMonstersByCombatLevel(50, 99),
  high: getCombatMonstersByCombatLevel(100, 149),
  endgame: getCombatMonstersByCombatLevel(150)
} as const;`
    ];
  }

  protected override generateImports(): string {
    const imports = super.generateImports();
    // Add additional imports for types we reference
    const additionalImports = `
import type { AbilityHrid } from './abilities';
import type { ItemHrid } from './items';
import type { CombatStyleHrid } from './combat-styles';
import type { DamageTypeHrid } from './damage-types';`;

    return imports + additionalImports;
  }

  protected override getZodImports() {
    return [
      { from: './abilities', items: ['AbilityHridEnum'] },
      { from: './items', items: ['ItemHridEnum'] },
      { from: './combat-styles', items: ['CombatStyleHridEnum'] },
      { from: './damage-types', items: ['DamageTypeHridEnum'] }
    ] as any;
  }
}