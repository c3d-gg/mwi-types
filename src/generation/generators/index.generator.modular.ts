import { ModuleKind, Project, ScriptTarget } from 'ts-morph'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

export class IndexModularGenerator {
	private outputPath = 'src/generated/index.ts'
	private generatedPath = 'src/generated'

	/**
	 * Extract exports from a module's index.ts file
	 */
	private extractModuleExports(moduleName: string): string[] {
		const indexPath = join(this.generatedPath, moduleName, 'index.ts')
		
		if (!existsSync(indexPath)) {
			console.warn(`⚠️ Module ${moduleName} index.ts not found, skipping...`)
			return []
		}

		const content = readFileSync(indexPath, 'utf-8')
		const exports: string[] = []
		
		// Match export statements like:
		// export type { Item } from './types.js'
		// export { ITEM_HRIDS } from './constants.js'
		// export { getItem } from './utils.js'
		const exportRegex = /export\s+(?:type\s+)?{\s*([^}]+)\s*}\s+from/g
		
		let match
		while ((match = exportRegex.exec(content)) !== null) {
			// Split by comma and clean up each export name
			const exportNames = match[1]
				? match[1]
					.split(',')
					.map(name => name.trim())
					.filter(name => name.length > 0)
				: []
			
			exports.push(...exportNames)
		}
		
		return exports
	}

	/**
	 * Format exports for a module with proper type annotations
	 */
	private formatModuleExports(moduleName: string, exports: string[]): string {
		if (exports.length === 0) {
			return `// Module ${moduleName} has no exports or was not found`
		}

		const lines: string[] = []
		const displayName = moduleName
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/^./, str => str.toUpperCase())
		
		lines.push(`// ${displayName}`)
		
		// Group exports by likely category
		const types: string[] = []
		const constants: string[] = []
		const functions: string[] = []
		const other: string[] = []
		
		for (const exportName of exports) {
			// Heuristics to categorize exports
			if (exportName.endsWith('Hrid') || 
				(exportName.startsWith('I') && exportName[1] && exportName[1] === exportName[1].toUpperCase()) ||
				(exportName[0] && exportName[0] === exportName[0].toUpperCase() && !exportName.includes('_'))) {
				// Likely a type (e.g., ItemHrid, Item, IInterface)
				types.push(exportName)
			} else if (exportName.includes('_') && exportName === exportName.toUpperCase()) {
				// Likely a constant (e.g., ITEM_HRIDS, ITEMS_BY_CATEGORY)
				constants.push(exportName)
			} else if (exportName.startsWith('get') || exportName.startsWith('is') || 
					   exportName.startsWith('require') || exportName.startsWith('sort') ||
					   exportName.startsWith('search') || exportName.startsWith('create') ||
					   exportName.startsWith('calculate') || exportName.startsWith('filter')) {
				// Likely a function
				functions.push(exportName)
			} else {
				other.push(exportName)
			}
		}
		
		// Export types
		if (types.length > 0) {
			lines.push(`export type {`)
			for (let i = 0; i < types.length; i++) {
				const comma = i < types.length - 1 ? ',' : ''
				lines.push(`  ${types[i]}${comma}`)
			}
			lines.push(`} from './${moduleName}/index.js'`)
		}
		
		// Export everything else (constants, functions, other)
		const nonTypes = [...constants, ...functions, ...other]
		if (nonTypes.length > 0) {
			lines.push(`export {`)
			for (let i = 0; i < nonTypes.length; i++) {
				const comma = i < nonTypes.length - 1 ? ',' : ''
				lines.push(`  ${nonTypes[i]}${comma}`)
			}
			lines.push(`} from './${moduleName}/index.js'`)
		}
		
		return lines.join('\n')
	}

	async generate(): Promise<void> {
		console.log('🧪 Using MODULAR index generator for tree-shaking optimization')
		console.log('✨ Generating modular index file with EXPLICIT named exports...')

		// Create the project and source file
		const project = new Project({
			compilerOptions: {
				target: ScriptTarget.ES2022,
				module: ModuleKind.ESNext,
				strict: true,
				skipLibCheck: true,
			},
		})

		const sourceFile = project.createSourceFile(this.outputPath, '', {
			overwrite: true,
		})

		// Add header comment
		sourceFile.addStatements(`// Main export file for @c3d.gg/mwi-types 
// Auto-generated from modular structure - DO NOT EDIT
// This file uses EXPLICIT named exports to enable tree-shaking
// NO wildcard exports (export *) are used as they break tree-shaking!
`)

		// Add warning about breaking changes
		sourceFile.addStatements(`// IMPORTANT: This modular export structure enables tree-shaking
// For optimal bundle size, import directly from specific modules:
// Example: import { getItem } from '@c3d.gg/mwi-types/items'
// 
// Importing from this root index will work but may include more code than needed.
`)

		// List of all modular modules
		const modules = [
			'abilities',
			'actions',
			'actioncategories',
			'avatars',
			'avataroutfits',
			'bufftypes',
			'chatchanneltypes',
			'chaticons',
			'combatstyles',
			'communitybufftypes',
			'damagetypes',
			'equipmenttypes',
			'gamemodes',
			'guildcharacterroles',
			'houserooms',
			'items',
			'itemcategories',
			'itemlocations',
			'leaderboards',
			'monsters',
			'namecolors',
			'playerdata',
			'purchasebundles',
			'randomtasktypes',
			'recipes',
			'shopcategories',
			'shopitems',
			'skills',
			'taskshopitems',
			'translations',
		]

		// Export from each module using EXPLICIT named exports
		sourceFile.addStatements('\n// ==========================================')
		sourceFile.addStatements('// EXPLICIT Named Exports from Each Module')
		sourceFile.addStatements('// ==========================================\n')

		for (const module of modules) {
			// Extract the actual exports from the module's index.ts
			const moduleExports = this.extractModuleExports(module)
			
			if (moduleExports.length > 0) {
				const formattedExports = this.formatModuleExports(module, moduleExports)
				sourceFile.addStatements(formattedExports)
				sourceFile.addStatements('') // Add blank line for readability
			}
		}

		// Add localization exports
		sourceFile.addStatements('\n// ==========================================')
		sourceFile.addStatements('// Localization Exports')
		sourceFile.addStatements('// ==========================================\n')
		
		const localizationExports = this.extractModuleExports('localization')
		if (localizationExports.length > 0) {
			const formattedExports = this.formatModuleExports('localization', localizationExports)
			sourceFile.addStatements(formattedExports)
		} else {
			// Fallback if we can't extract
			sourceFile.addStatements('// Localization')
			sourceFile.addStatements(`export * from './localization/index.js' // WARNING: Could not extract exports`)
		}

		// Save the file
		await sourceFile.save()

		console.log(`✅ Generated modular package index at ${this.outputPath}`)
		console.log('✅ Generated index with EXPLICIT named exports for optimal tree-shaking!')
		console.log('📊 Processed exports from', modules.length, 'modules')
	}
}