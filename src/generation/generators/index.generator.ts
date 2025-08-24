import { ModuleKind, Project, ScriptTarget } from 'ts-morph'

import { BaseGenerator } from '../core/generator.base'

export class IndexGenerator extends BaseGenerator<any> {
	constructor() {
		super({
			entityName: 'Index',
			entityNamePlural: 'Indexes',
			sourceKey: '',
			outputPath: 'src/generated/index.ts',
			generateConstants: false,
			generateUtils: false,
		})
	}

	protected extractEntities(): Record<string, any> {
		// This generator doesn't extract entities from source data
		return {}
	}

	protected override collectUniqueValues(): void {
		// This generator doesn't collect unique values
	}

	protected generateInterfaces(): void {
		// This generator doesn't generate interfaces
	}

	protected loadSourceData(): any[] {
		// This generator doesn't load source data
		return []
	}

	override async generate(): Promise<void> {
		console.log('✨ Generating main index file...')

		// Create the project and source file
		const project = new Project({
			compilerOptions: {
				target: ScriptTarget.ES2022,
				module: ModuleKind.ESNext,
				strict: true,
				skipLibCheck: true,
			},
		})

		const sourceFile = project.createSourceFile(this.config.outputPath, '', {
			overwrite: true,
		})

		// Add header comment
		sourceFile.addStatements(`// Main export file for @c3d.gg/mwi-types 
// Auto-generated from game data - DO NOT EDIT
`)

		// Simple wildcard exports - each generator owns its types, no conflicts
		sourceFile.addStatements('// Type exports - All entities')

		const typeFiles = [
			'./types/abilities.js',
			'./types/action-categories.js',
			'./types/actions.js',
			'./types/avatar.js',
			'./types/avatars.js',
			'./types/buff-types.js',
			'./types/chat-channel-types.js',
			'./types/chat-icons.js',
			'./types/combat-styles.js',
			'./types/community-buffs.js',
			'./types/damage-types.js',
			'./types/equipment-types.js',
			'./types/game-modes.js',
			'./types/house-rooms.js',
			'./types/item-categories.js',
			'./types/item-locations.js',
			'./types/items.js',
			'./types/leaderboard-categories.js',
			'./types/leaderboard-types.js',
			'./types/monsters.js',
			'./types/name-colors.js',
			'./types/player-data.js',
			'./types/purchase-bundles.js',
			'./types/random-tasks.js',
			'./types/recipes.js',
			'./types/shop-items.js',
			'./types/skills.js',
			'./types/task-shop-items.js',
		]

		typeFiles.forEach((file) => {
			sourceFile.addStatements(`export * from '${file}'`)
		})

		// Localization exports
		sourceFile.addStatements('')
		sourceFile.addStatements('// Localization exports')
		sourceFile.addStatements(`export * from './localization/index.js'`)

		// Save the file
		await sourceFile.save()
		console.log('✅ Generated package index at', this.config.outputPath)

		// Also generate the main package index
		await this.generateMainPackageIndex()
		console.log('✅ Generated main index file')
	}

	private async generateMainPackageIndex(): Promise<void> {
		const project = new Project()
		const sourceFile = project.createSourceFile('src/index.ts', '', {
			overwrite: true,
		})

		sourceFile.addStatements(`// Main package index for @c3d.gg/mwi-types 
// Re-exports everything from the generated types
export * from './generated/index.js'`)

		await sourceFile.save()
	}
}
