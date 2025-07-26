import { BaseGenerator } from '../base/base-generator'
import type { PropertyDefinition } from '../base/types'
import type { RandomTaskType as RandomTaskTypeEntity } from '../../types/source-data'

export class RandomTaskTypesGenerator extends BaseGenerator<RandomTaskTypeEntity> {
  constructor() {
    const config = {
      entityName: 'RandomTaskType',
      entityNamePlural: 'RandomTaskTypes',
      sourceKey: 'randomTaskTypeDetailMap' as const,
      outputFilename: 'random-task-types',
      generateHrids: true,
      generateZodSchema: true,
      generateTypeboxSchema: true
    }
    super(config)
  }

  protected extractEntities(): Record<string, RandomTaskTypeEntity> {
    return this.getEntitiesFromGameData() as Record<string, RandomTaskTypeEntity>
  }

  protected defineSchemaProperties(entity: RandomTaskTypeEntity): PropertyDefinition[] {
    return [
      {
        name: 'hrid',
        type: 'ref',
        refName: 'RandomTaskTypeHridEnum',
        description: 'Human readable ID for the random task type'
      },
      {
        name: 'name',
        type: 'string',
        description: 'Display name of the random task type'
      },
      {
        name: 'isCombat',
        type: 'boolean',
        description: 'Whether this is a combat-related task type'
      },
      {
        name: 'skillHrid',
        type: 'string',
        description: 'Reference to the skill required for this task type (empty for combat tasks)'
      },
      {
        name: 'sortIndex',
        type: 'number',
        description: 'Sort order for display'
      }
    ]
  }

  protected override transformEntityForOutput(entity: RandomTaskTypeEntity): any {
    // Generate a name from the hrid (e.g., "/random_task_types/brewing" -> "Brewing")
    const namePart = entity.hrid.split('/').pop() || ''
    const name = namePart.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    
    return {
      ...entity,
      name
    }
  }

  protected override generateAdditionalExports(entities: Record<string, RandomTaskTypeEntity>): string[] {
    return [
      '// Group random task types by category',
      'export const COMBAT_TASK_TYPES = Object.values(RANDOMTASKTYPES).filter(t => t.isCombat)',
      'export const SKILLING_TASK_TYPES = Object.values(RANDOMTASKTYPES).filter(t => !t.isCombat)',
      '',
      '// Utility functions',
      'export function isRandomTaskTypeCombat(hrid: RandomTaskTypeHrid): boolean {',
      '  return RANDOMTASKTYPES[hrid].isCombat',
      '}',
      '',
      'export function getRandomTaskTypeSkill(hrid: RandomTaskTypeHrid): string {',
      '  return RANDOMTASKTYPES[hrid].skillHrid',
      '}',
      '',
      'export function getRandomTaskTypesBySkill(skillHrid: string): RandomTaskType[] {',
      '  return Object.values(RANDOMTASKTYPES).filter(t => t.skillHrid === skillHrid)',
      '}',
      '',
      'export function getCombatTaskTypes(): RandomTaskType[] {',
      '  return COMBAT_TASK_TYPES',
      '}',
      '',
      'export function getSkillingTaskTypes(): RandomTaskType[] {',
      '  return SKILLING_TASK_TYPES',
      '}'
    ]
  }
}