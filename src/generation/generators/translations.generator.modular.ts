import { readFile } from 'fs/promises'
import { join } from 'path'
import { ModuleBuilder } from '../core/module-builder'
import type { GeneratorConfig } from '../core/types'

interface TranslationData {
	// Entity name translations
	skillNames: Record<string, string>
	itemNames: Record<string, string>
	actionNames: Record<string, string>
	monsterNames: Record<string, string>
	abilityNames: Record<string, string>
	buffTypeNames: Record<string, string>
	houseRoomNames: Record<string, string>
	shopNames: Record<string, string>
	recipeNames: Record<string, string>

	// Entity description translations
	skillDescriptions: Record<string, string>
	itemDescriptions: Record<string, string>
	actionDescriptions: Record<string, string>
	monsterDescriptions: Record<string, string>
	abilityDescriptions: Record<string, string>
	buffTypeDescriptions: Record<string, string>
	houseRoomDescriptions: Record<string, string>

	// UI and general translations
	ui: Record<string, string>
	common: Record<string, string>
	errors: Record<string, string>
	tooltips: Record<string, string>
}

export class TranslationsModularGenerator {
	private locales = ['en', 'zh']
	private localeData: Map<string, any> = new Map()
	private moduleBuilder: ModuleBuilder

	constructor() {
		this.moduleBuilder = new ModuleBuilder({
			basePath: './src/generated',
			moduleName: 'translations',
			enableLazyData: true,
			enableStaticLookups: true
		})
	}

	async generate(sourcePath: string): Promise<void> {
		console.log('🧪 Using MODULAR translations generator for tree-shaking optimization')
		console.log('🔧 Generating Translations (modular)...')

		// Load all locale files
		await this.loadLocaleData()

		// Generate types file
		this.generateTypes()

		// Generate data file with lazy loading for each locale
		this.generateLazyData()

		// Generate constants (locale list)
		this.generateConstants()

		// Generate lookups (entity translations by locale)
		this.generateLookups()

		// Generate utility functions
		this.generateUtilities()

		// Generate index file
		this.generateIndex()

		// Save all files
		await this.moduleBuilder.save()

		console.log(`✅ Generated module: translations with 6 files`)
		console.log(`✅ Generated translations for ${this.locales.length} locales with modular structure`)
	}

	private async loadLocaleData(): Promise<void> {
		const localesDir = join(process.cwd(), 'src/sources/locales')

		for (const locale of this.locales) {
			const localePath = join(localesDir, `${locale}.json`)
			try {
				const content = await readFile(localePath, 'utf-8')
				this.localeData.set(locale, JSON.parse(content))
			} catch (error) {
				console.warn(`⚠️ Could not load locale file: ${localePath}`)
			}
		}
	}

	private generateTypes(): void {
		const typesFile = this.moduleBuilder.getFile('types')

		typesFile.addComment('Translation type definitions')

		// Define Locale type
		typesFile.addType('Locale', this.locales.map(l => `'${l}'`).join(' | '))

		// Define TranslationKey types for each entity
		typesFile.addType('SkillTranslationKey', 'string')
		typesFile.addType('ItemTranslationKey', 'string')
		typesFile.addType('ActionTranslationKey', 'string')
		typesFile.addType('MonsterTranslationKey', 'string')
		typesFile.addType('UITranslationKey', 'string')

		// Define Translation interface
		typesFile.addInterface('Translation', [
			{ name: 'key', type: 'string', optional: false },
			{ name: 'locale', type: 'Locale', optional: false },
			{ name: 'value', type: 'string', optional: false },
		])

		// Define TranslationData interface
		typesFile.addInterface('TranslationData', [
			{ name: 'skillNames', type: 'Record<string, string>', optional: false },
			{ name: 'itemNames', type: 'Record<string, string>', optional: false },
			{ name: 'actionNames', type: 'Record<string, string>', optional: false },
			{ name: 'monsterNames', type: 'Record<string, string>', optional: false },
			{ name: 'abilityNames', type: 'Record<string, string>', optional: false },
			{ name: 'buffTypeNames', type: 'Record<string, string>', optional: false },
			{ name: 'houseRoomNames', type: 'Record<string, string>', optional: false },
			{ name: 'shopNames', type: 'Record<string, string>', optional: false },
			{ name: 'recipeNames', type: 'Record<string, string>', optional: false },
			{ name: 'skillDescriptions', type: 'Record<string, string>', optional: false },
			{ name: 'itemDescriptions', type: 'Record<string, string>', optional: false },
			{ name: 'actionDescriptions', type: 'Record<string, string>', optional: false },
			{ name: 'monsterDescriptions', type: 'Record<string, string>', optional: false },
			{ name: 'abilityDescriptions', type: 'Record<string, string>', optional: false },
			{ name: 'buffTypeDescriptions', type: 'Record<string, string>', optional: false },
			{ name: 'houseRoomDescriptions', type: 'Record<string, string>', optional: false },
			{ name: 'ui', type: 'Record<string, string>', optional: false },
			{ name: 'common', type: 'Record<string, string>', optional: false },
			{ name: 'errors', type: 'Record<string, string>', optional: false },
			{ name: 'tooltips', type: 'Record<string, string>', optional: false },
		])
	}

	private generateLazyData(): void {
		const dataFile = this.moduleBuilder.getFile('data')

		dataFile.addImport('./types', ['Locale', 'TranslationData'], true)
		dataFile.addComment('Lazy-loaded translation data')

		// Generate lazy loader for each locale
		for (const locale of this.locales) {
			const data = this.localeData.get(locale)
			if (!data) continue

			// Create the translation data object
			const translationData = this.extractTranslationData(data)

			// Add lazy loader for this locale using a closure
			dataFile.addFunction(
				`get${locale.toUpperCase()}Translations`,
				[],
				'TranslationData',
				(writer) => {
					writer.writeLine(`// Lazy-loaded ${locale} translations`)
					writer.writeLine(`return ${JSON.stringify(translationData, null, 2)} as TranslationData`)
				}
			)
		}

		// Add a general getter that takes locale as parameter
		dataFile.addFunction(
			'getTranslations',
			[{ name: 'locale', type: 'Locale' }],
			'TranslationData',
			(writer) => {
				writer.writeLine('switch (locale) {')
				this.locales.forEach(l => {
					writer.writeLine(`  case '${l}': return get${l.toUpperCase()}Translations()`)
				})
				writer.writeLine(`  default: return get${this.locales[0]?.toUpperCase() || 'EN'}Translations() // Default to first locale`)
				writer.writeLine('}')
			}
		)
	}

	private extractTranslationData(data: any): TranslationData {
		// Extract translations from the locale data
		// This is a simplified version - adjust based on actual data structure
		return {
			skillNames: data.skills?.names || {},
			itemNames: data.items?.names || {},
			actionNames: data.actions?.names || {},
			monsterNames: data.monsters?.names || {},
			abilityNames: data.abilities?.names || {},
			buffTypeNames: data.buffTypes?.names || {},
			houseRoomNames: data.houseRooms?.names || {},
			shopNames: data.shops?.names || {},
			recipeNames: data.recipes?.names || {},
			skillDescriptions: data.skills?.descriptions || {},
			itemDescriptions: data.items?.descriptions || {},
			actionDescriptions: data.actions?.descriptions || {},
			monsterDescriptions: data.monsters?.descriptions || {},
			abilityDescriptions: data.abilities?.descriptions || {},
			buffTypeDescriptions: data.buffTypes?.descriptions || {},
			houseRoomDescriptions: data.houseRooms?.descriptions || {},
			ui: data.ui || {},
			common: data.common || {},
			errors: data.errors || {},
			tooltips: data.tooltips || {},
		}
	}

	private generateConstants(): void {
		const constantsFile = this.moduleBuilder.getFile('constants')

		constantsFile.addImport('./types', ['Locale'], true)
		constantsFile.addComment('Available locales')
		constantsFile.addConstArray('LOCALES', this.locales, true)
		constantsFile.addConstVariable('DEFAULT_LOCALE', 'Locale', `'${this.locales[0]}'`)
	}

	private generateLookups(): void {
		const lookupsFile = this.moduleBuilder.getFile('lookups')

		lookupsFile.addImport('./types', ['Locale'], true)
		lookupsFile.addComment('Translation lookups')

		// Add translation categories
		const categories = [
			'skillNames',
			'itemNames',
			'actionNames',
			'monsterNames',
			'abilityNames',
			'buffTypeNames',
			'houseRoomNames',
			'shopNames',
			'recipeNames',
			'ui',
			'common',
			'errors',
			'tooltips'
		]
		
		lookupsFile.addConstArray('TRANSLATION_CATEGORIES', categories, true)
		lookupsFile.addType('TranslationCategory', '(typeof TRANSLATION_CATEGORIES)[number]')
	}

	private generateUtilities(): void {
		const utilsFile = this.moduleBuilder.getFile('utils')

		utilsFile.addImport('./types', ['Locale', 'TranslationData'], true)
		utilsFile.addImport('./constants', ['LOCALES', 'DEFAULT_LOCALE'])
		utilsFile.addImport('./data', ['getTranslations'])

		// Check if locale is valid
		utilsFile.addFunction(
			'isValidLocale',
			[{ name: 'locale', type: 'string' }],
			'locale is Locale',
			(writer) => {
				writer.writeLine('return LOCALES.includes(locale as Locale)')
			}
		)

		// Get translation for a specific key
		utilsFile.addFunction(
			'getTranslation',
			[
				{ name: 'key', type: 'string' },
				{ name: 'category', type: 'keyof TranslationData' },
				{ name: 'locale', type: 'Locale' },
			],
			'string | undefined',
			(writer) => {
				writer.writeLine('const translations = getTranslations(locale)')
				writer.writeLine('const categoryData = translations[category]')
				writer.writeLine('if (typeof categoryData === "object" && categoryData !== null) {')
				writer.writeLine('  return (categoryData as Record<string, string>)[key]')
				writer.writeLine('}')
				writer.writeLine('return undefined')
			}
		)

		// Get skill name
		utilsFile.addFunction(
			'getSkillName',
			[
				{ name: 'skillHrid', type: 'string' },
				{ name: 'locale', type: 'Locale | undefined' },
			],
			'string',
			(writer) => {
				writer.writeLine('const translations = getTranslations(locale || DEFAULT_LOCALE)')
				writer.writeLine('return translations.skillNames[skillHrid] || skillHrid')
			}
		)

		// Get item name
		utilsFile.addFunction(
			'getItemName',
			[
				{ name: 'itemHrid', type: 'string' },
				{ name: 'locale', type: 'Locale | undefined' },
			],
			'string',
			(writer) => {
				writer.writeLine('const translations = getTranslations(locale || DEFAULT_LOCALE)')
				writer.writeLine('return translations.itemNames[itemHrid] || itemHrid')
			}
		)

		// Get action name
		utilsFile.addFunction(
			'getActionName',
			[
				{ name: 'actionHrid', type: 'string' },
				{ name: 'locale', type: 'Locale | undefined' },
			],
			'string',
			(writer) => {
				writer.writeLine('const translations = getTranslations(locale || DEFAULT_LOCALE)')
				writer.writeLine('return translations.actionNames[actionHrid] || actionHrid')
			}
		)

		// Get UI text
		utilsFile.addFunction(
			'getUIText',
			[
				{ name: 'key', type: 'string' },
				{ name: 'locale', type: 'Locale | undefined' },
			],
			'string',
			(writer) => {
				writer.writeLine('const translations = getTranslations(locale || DEFAULT_LOCALE)')
				writer.writeLine('return translations.ui[key] || key')
			}
		)

		// Get all translations for a locale
		utilsFile.addFunction(
			'getAllTranslations',
			[{ name: 'locale', type: 'Locale | undefined' }],
			'TranslationData',
			(writer) => {
				writer.writeLine('return getTranslations(locale || DEFAULT_LOCALE)')
			}
		)

		// Check if translation exists
		utilsFile.addFunction(
			'hasTranslation',
			[
				{ name: 'key', type: 'string' },
				{ name: 'category', type: 'keyof TranslationData' },
				{ name: 'locale', type: 'Locale | undefined' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('const translation = getTranslation(key, category, locale || DEFAULT_LOCALE)')
				writer.writeLine('return translation !== undefined')
			}
		)
	}

	private generateIndex(): void {
		const indexFile = this.moduleBuilder.getFile('index')

		// Export types
		this.moduleBuilder.addExport({ name: 'Locale', source: './types', isType: true })
		this.moduleBuilder.addExport({ name: 'Translation', source: './types', isType: true })
		this.moduleBuilder.addExport({ name: 'TranslationData', source: './types', isType: true })
		this.moduleBuilder.addExport({ name: 'TranslationCategory', source: './lookups', isType: true })

		// Export constants
		this.moduleBuilder.addExport({ name: 'LOCALES', source: './constants' })
		this.moduleBuilder.addExport({ name: 'DEFAULT_LOCALE', source: './constants' })

		// Export data getters
		this.moduleBuilder.addExport({ name: 'getTranslations', source: './data' })
		this.locales.forEach(locale => {
			this.moduleBuilder.addExport({ name: `get${locale.toUpperCase()}Translations`, source: './data' })
		})

		// Export utilities
		this.moduleBuilder.addExport({ name: 'isValidLocale', source: './utils' })
		this.moduleBuilder.addExport({ name: 'getTranslation', source: './utils' })
		this.moduleBuilder.addExport({ name: 'getSkillName', source: './utils' })
		this.moduleBuilder.addExport({ name: 'getItemName', source: './utils' })
		this.moduleBuilder.addExport({ name: 'getActionName', source: './utils' })
		this.moduleBuilder.addExport({ name: 'getUIText', source: './utils' })
		this.moduleBuilder.addExport({ name: 'getAllTranslations', source: './utils' })
		this.moduleBuilder.addExport({ name: 'hasTranslation', source: './utils' })

		// Export lookups
		this.moduleBuilder.addExport({ name: 'TRANSLATION_CATEGORIES', source: './lookups' })
	}
}