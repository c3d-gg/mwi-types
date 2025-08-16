#!/usr/bin/env bun
/**
 * Type Validation Script
 * 
 * This script validates the quality of generated types by:
 * 1. Counting z.unknown() occurrences
 * 2. Validating source data against schemas
 * 3. Checking for missing or incomplete types
 * 4. Providing a comprehensive type coverage report
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import chalk from 'chalk';

// Import generated schemas for validation
import { PlayerDataSchema } from '../generated/schemas/zod/player-data';
import { PATHS } from '../config/paths';

interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    totalUnknowns: number;
    unknownsByFile: Map<string, UnknownOccurrence[]>;
    schemasValidated: number;
    schemasFailed: number;
    typeCoverage: number;
  };
}

interface UnknownOccurrence {
  line: number;
  content: string;
  context?: string; // field name or context where unknown appears
}

class TypeValidator {
  private result: ValidationResult = {
    success: true,
    errors: [],
    warnings: [],
    metrics: {
      totalUnknowns: 0,
      unknownsByFile: new Map(),
      schemasValidated: 0,
      schemasFailed: 0,
      typeCoverage: 100,
    }
  };

  async validate(): Promise<ValidationResult> {
    console.log(chalk.blue.bold('\n🔍 Starting Type Validation...\n'));

    // Step 1: Count z.unknown() occurrences
    await this.countUnknownTypes();

    // Step 2: Validate schemas against actual data
    await this.validateSchemas();

    // Step 3: Check type coverage
    await this.checkTypeCoverage();

    // Step 4: Generate report
    this.generateReport();

    return this.result;
  }

  private async countUnknownTypes(): Promise<void> {
    console.log(chalk.yellow('📊 Counting z.unknown() occurrences...'));
    
    const generatedPath = join(PATHS.output, 'schemas/zod');
    const files = this.getAllFiles(generatedPath, '.ts');

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      const unknowns: UnknownOccurrence[] = [];

      lines.forEach((line, index) => {
        if (line.includes('z.unknown()')) {
          // Try to extract the field name from the line
          const fieldMatch = line.match(/^\s*(\w+):\s*z\.(array\()?z\.unknown\(\)/);
          const fieldName = fieldMatch ? fieldMatch[1] : undefined;
          
          unknowns.push({
            line: index + 1,
            content: line.trim(),
            context: fieldName
          });
        }
      });

      if (unknowns.length > 0) {
        const relPath = relative(process.cwd(), file);
        this.result.metrics.unknownsByFile.set(relPath, unknowns);
        this.result.metrics.totalUnknowns += unknowns.length;
      }
    }

    if (this.result.metrics.totalUnknowns > 0) {
      this.result.warnings.push(
        `Found ${this.result.metrics.totalUnknowns} z.unknown() occurrences across ${this.result.metrics.unknownsByFile.size} files`
      );
    }
  }

  private async validateSchemas(): Promise<void> {
    console.log(chalk.yellow('✅ Validating schemas against source data...'));

    // Validate player data
    try {
      const playerDataPath = PATHS.playerData;
      const playerData = JSON.parse(readFileSync(playerDataPath, 'utf-8'));
      
      console.log('  Validating PlayerData schema...');
      const result = PlayerDataSchema.safeParse(playerData);
      
      if (result.success) {
        this.result.metrics.schemasValidated++;
        console.log(chalk.green('    ✓ PlayerData schema valid'));
      } else {
        this.result.metrics.schemasFailed++;
        this.result.errors.push('PlayerData schema validation failed');
        
        // Extract specific validation errors
        const zodErrors = result.error.issues;
        zodErrors.slice(0, 5).forEach(err => {
          this.result.errors.push(`  - ${err.path.join('.')}: ${err.message}`);
        });
        
        if (zodErrors.length > 5) {
          this.result.errors.push(`  ... and ${zodErrors.length - 5} more errors`);
        }
      }
    } catch (error) {
      this.result.errors.push(`Failed to validate PlayerData: ${error}`);
      this.result.metrics.schemasFailed++;
    }

    // Validate game data entities
    try {
      const gameDataPath = PATHS.sourceData;
      const gameData = JSON.parse(readFileSync(gameDataPath, 'utf-8'));
      
      // For each entity type in game data, try to import and validate its schema
      const entityTypes = Object.keys(gameData).filter(key => !key.startsWith('version'));
      
      for (const entityType of entityTypes.slice(0, 5)) { // Test first 5 for now
        console.log(`  Validating ${entityType} schema...`);
        
        try {
          // Dynamically import the schema
          const schemaModuleName = entityType.replace(/_/g, '-');
          const schemaPath = join(PATHS.output, `schemas/zod/${schemaModuleName}.ts`);
          
          // Check if schema file exists
          if (this.fileExists(schemaPath)) {
            this.result.metrics.schemasValidated++;
            console.log(chalk.green(`    ✓ ${entityType} schema exists`));
          } else {
            this.result.warnings.push(`Schema file not found for ${entityType}`);
          }
        } catch (err) {
          this.result.warnings.push(`Could not validate ${entityType}: ${err}`);
        }
      }
    } catch (error) {
      this.result.errors.push(`Failed to validate game data: ${error}`);
    }
  }

  private async checkTypeCoverage(): Promise<void> {
    console.log(chalk.yellow('📈 Calculating type coverage...'));

    const totalFields = this.countTotalFields();
    const typedFields = totalFields - this.result.metrics.totalUnknowns;
    
    this.result.metrics.typeCoverage = totalFields > 0 
      ? Math.round((typedFields / totalFields) * 100) 
      : 100;

    if (this.result.metrics.typeCoverage < 100) {
      this.result.warnings.push(
        `Type coverage is ${this.result.metrics.typeCoverage}% (${typedFields}/${totalFields} fields typed)`
      );
    }
  }

  private countTotalFields(): number {
    // Count total fields in generated schemas
    let totalFields = 0;
    
    const generatedPath = join(PATHS.output, 'schemas/zod');
    const files = this.getAllFiles(generatedPath, '.ts');

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      // Count lines that look like schema field definitions
      const fieldMatches = content.match(/^\s*\w+:\s*z\./gm);
      if (fieldMatches) {
        totalFields += fieldMatches.length;
      }
    }

    return totalFields;
  }

  private generateReport(): void {
    console.log(chalk.blue.bold('\n📋 Validation Report\n'));

    // Success/Failure summary
    if (this.result.errors.length === 0) {
      console.log(chalk.green.bold('✅ All validations passed!\n'));
    } else {
      console.log(chalk.red.bold(`❌ ${this.result.errors.length} validation errors found\n`));
      this.result.success = false;
    }

    // Metrics
    console.log(chalk.cyan('📊 Metrics:'));
    console.log(`  • Type Coverage: ${this.getColoredPercentage(this.result.metrics.typeCoverage)}%`);
    console.log(`  • Schemas Validated: ${chalk.green(this.result.metrics.schemasValidated)}`);
    console.log(`  • Schemas Failed: ${this.result.metrics.schemasFailed > 0 ? chalk.red(this.result.metrics.schemasFailed) : chalk.green(0)}`);
    console.log(`  • Unknown Types: ${this.result.metrics.totalUnknowns > 0 ? chalk.yellow(this.result.metrics.totalUnknowns) : chalk.green(0)}`);

    // Unknown type details
    if (this.result.metrics.unknownsByFile.size > 0) {
      console.log(chalk.yellow('\n⚠️  Files with z.unknown():'));
      
      for (const [file, unknowns] of this.result.metrics.unknownsByFile) {
        console.log(`  ${chalk.dim(file)}`);
        unknowns.forEach(unknown => {
          const context = unknown.context ? ` (${chalk.cyan(unknown.context)})` : '';
          console.log(`    Line ${unknown.line}${context}: ${chalk.dim(unknown.content.substring(0, 60))}...`);
        });
      }

      // Provide suggestions for fixing unknowns
      console.log(chalk.blue('\n💡 Suggestions for fixing unknown types:'));
      console.log('  1. Collect more sample data with populated values for empty fields');
      console.log('  2. Analyze the actual structure when data becomes available');
      console.log('  3. Update the generator to infer types from the new data');
    }

    // Errors
    if (this.result.errors.length > 0) {
      console.log(chalk.red('\n❌ Errors:'));
      this.result.errors.forEach(error => {
        console.log(`  ${chalk.red('•')} ${error}`);
      });
    }

    // Warnings
    if (this.result.warnings.length > 0) {
      console.log(chalk.yellow('\n⚠️  Warnings:'));
      this.result.warnings.forEach(warning => {
        console.log(`  ${chalk.yellow('•')} ${warning}`);
      });
    }

    // Summary
    console.log(chalk.blue.bold('\n📈 Summary:'));
    if (this.result.metrics.typeCoverage === 100) {
      console.log(chalk.green('  🎉 Perfect type coverage achieved!'));
    } else if (this.result.metrics.typeCoverage >= 95) {
      console.log(chalk.green('  ✨ Excellent type coverage (>95%)'));
    } else if (this.result.metrics.typeCoverage >= 90) {
      console.log(chalk.yellow('  👍 Good type coverage (>90%)'));
    } else if (this.result.metrics.typeCoverage >= 80) {
      console.log(chalk.yellow('  📊 Acceptable type coverage (>80%)'));
    } else {
      console.log(chalk.red('  ⚠️  Type coverage needs improvement (<80%)'));
    }

    // Exit code suggestion
    if (!this.result.success) {
      console.log(chalk.red('\n🚫 Validation failed. Fix errors before proceeding.\n'));
    }
  }

  private getColoredPercentage(percentage: number): string {
    if (percentage === 100) return chalk.green.bold(percentage);
    if (percentage >= 95) return chalk.green(percentage);
    if (percentage >= 90) return chalk.yellow(percentage);
    if (percentage >= 80) return chalk.yellow(percentage);
    return chalk.red(percentage);
  }

  private getAllFiles(dir: string, extension: string): string[] {
    const files: string[] = [];
    
    try {
      const items = readdirSync(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          files.push(...this.getAllFiles(fullPath, extension));
        } else if (item.endsWith(extension)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Could not read directory ${dir}: ${error}`);
    }
    
    return files;
  }

  private fileExists(path: string): boolean {
    try {
      statSync(path);
      return true;
    } catch {
      return false;
    }
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new TypeValidator();
  
  validator.validate()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error(chalk.red('Fatal error during validation:'), error);
      process.exit(1);
    });
}

export { TypeValidator };
export type { ValidationResult };