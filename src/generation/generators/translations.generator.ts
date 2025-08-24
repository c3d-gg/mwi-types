import { readFile } from 'fs/promises'
import { join } from 'path'

import { ASTBuilder } from '../core/ast-builder'

interface TranslationKeys {
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

export class TranslationsGenerator {
	private builders: Map<string, ASTBuilder> = new Map()
	private locales = ['en', 'zh']
	private localeData: Map<string, any> = new Map()

	async generate(sourcePath: string): Promise<void> {
		console.log('🔧 Generating Translations...')

		// Load all locale files
		await this.loadLocaleData()

		// Generate typed translations for each locale
		for (const locale of this.locales) {
			await this.generateLocaleTranslations(locale)
		}

		// Generate main translation index
		await this.generateTranslationIndex()

		// Generate translation utility functions
		await this.generateTranslationUtils()

		console.log(`✅ Generated translations for ${this.locales.length} locales`)
	}

	private async loadLocaleData(): Promise<void> {
		const localesDir = join(process.cwd(), 'src/sources/locales')

		for (const locale of this.locales) {
			const localePath = join(localesDir, `${locale}.json`)
			const content = await readFile(localePath, 'utf-8')
			this.localeData.set(locale, JSON.parse(content))
		}
	}

	private async generateLocaleTranslations(locale: string): Promise<void> {
		const outputPath = `src/generated/localization/${locale}/translations.ts`
		const builder = new ASTBuilder(outputPath)
		const data = this.localeData.get(locale)

		if (!data) return

		// Generate imports
		this.generateLocaleImports(builder, locale)

		// Generate translation maps for each entity type
		this.generateEntityTranslations(
			builder,
			data,
			'Skill',
			'skillNames',
			'skillDescriptions',
		)
		this.generateEntityTranslations(
			builder,
			data,
			'Item',
			'itemNames',
			'itemDescriptions',
		)
		this.generateEntityTranslations(
			builder,
			data,
			'Action',
			'actionNames',
			'actionDescriptions',
		)
		this.generateEntityTranslations(
			builder,
			data,
			'Monster',
			'monsterNames',
			'monsterDescriptions',
		)
		this.generateEntityTranslations(
			builder,
			data,
			'Ability',
			'abilityNames',
			'abilityDescriptions',
		)
		this.generateEntityTranslations(
			builder,
			data,
			'BuffType',
			'buffTypeNames',
			'buffTypeDescriptions',
		)
		this.generateEntityTranslations(
			builder,
			data,
			'HouseRoom',
			'houseRoomNames',
			'houseRoomDescriptions',
		)
		this.generateEntityTranslations(
			builder,
			data,
			'Recipe',
			'recipeNames',
			'recipeDescriptions',
		)

		// Generate UI translations
		this.generateUITranslations(builder, data, locale)

		// Generate main translation object
		this.generateLocaleMainObject(builder, locale)

		await builder.save()
		this.builders.set(locale, builder)
	}

	private generateLocaleImports(builder: ASTBuilder, locale: string): void {
		// Import entity type definitions (as type-only imports)
		builder.addImport('../../types/skills.js', ['SkillHrid'], true)
		builder.addImport('../../types/items.js', ['ItemHrid'], true)
		builder.addImport('../../types/actions.js', ['ActionHrid'], true)
		builder.addImport('../../types/monsters.js', ['MonsterHrid'], true)
		builder.addImport('../../types/abilities.js', ['AbilityHrid'], true)
		builder.addImport('../../types/buff-types.js', ['BuffTypeHrid'], true)
		builder.addImport('../../types/house-rooms.js', ['HouseRoomHrid'], true)
		builder.addImport('../../types/recipes.js', ['RecipeHrid'], true)
	}

	private generateEntityTranslations(
		builder: ASTBuilder,
		data: any,
		entityName: string,
		nameKey: string,
		descKey?: string,
	): void {
		const names = data[nameKey] || {}
		const descriptions = descKey ? data[descKey] || {} : {}

		// Generate name translations
		if (Object.keys(names).length > 0) {
			const nameType = `Record<${entityName}Hrid, string>`
			builder.addConstVariable(
				`${entityName.toUpperCase()}_NAMES`,
				nameType,
				this.formatTranslationMap(names),
			)
		}

		// Generate description translations if available
		if (descKey && Object.keys(descriptions).length > 0) {
			const descType = `Partial<Record<${entityName}Hrid, string>>`
			builder.addConstVariable(
				`${entityName.toUpperCase()}_DESCRIPTIONS`,
				descType,
				this.formatTranslationMap(descriptions),
			)
		}
	}

	private generateUITranslations(
		builder: ASTBuilder,
		data: any,
		locale: string,
	): void {
		// Common UI translations
		const uiKeys = [
			'ui',
			'common',
			'errors',
			'tooltips',
			'buttons',
			'labels',
			'messages',
		]

		for (const key of uiKeys) {
			if (data[key]) {
				const constName = `UI_${key.toUpperCase()}`
				builder.addConstVariable(
					constName,
					'Record<string, string>',
					this.formatTranslationMap(data[key]),
				)
			}
		}
	}

	private generateLocaleMainObject(builder: ASTBuilder, locale: string): void {
		const data = this.localeData.get(locale)
		if (!data) return

		// Track which constants were actually generated
		const generatedConstants = new Set<string>()

		// Check which name/description constants exist
		if (data.skillNames && Object.keys(data.skillNames).length > 0)
			generatedConstants.add('SKILL_NAMES')
		if (
			data.skillDescriptions &&
			Object.keys(data.skillDescriptions).length > 0
		)
			generatedConstants.add('SKILL_DESCRIPTIONS')
		if (data.itemNames && Object.keys(data.itemNames).length > 0)
			generatedConstants.add('ITEM_NAMES')
		if (data.itemDescriptions && Object.keys(data.itemDescriptions).length > 0)
			generatedConstants.add('ITEM_DESCRIPTIONS')
		if (data.actionNames && Object.keys(data.actionNames).length > 0)
			generatedConstants.add('ACTION_NAMES')
		if (
			data.actionDescriptions &&
			Object.keys(data.actionDescriptions).length > 0
		)
			generatedConstants.add('ACTION_DESCRIPTIONS')
		if (data.monsterNames && Object.keys(data.monsterNames).length > 0)
			generatedConstants.add('MONSTER_NAMES')
		if (
			data.monsterDescriptions &&
			Object.keys(data.monsterDescriptions).length > 0
		)
			generatedConstants.add('MONSTER_DESCRIPTIONS')
		if (data.abilityNames && Object.keys(data.abilityNames).length > 0)
			generatedConstants.add('ABILITY_NAMES')
		if (
			data.abilityDescriptions &&
			Object.keys(data.abilityDescriptions).length > 0
		)
			generatedConstants.add('ABILITY_DESCRIPTIONS')
		if (data.buffTypeNames && Object.keys(data.buffTypeNames).length > 0)
			generatedConstants.add('BUFFTYPE_NAMES')
		if (
			data.buffTypeDescriptions &&
			Object.keys(data.buffTypeDescriptions).length > 0
		)
			generatedConstants.add('BUFFTYPE_DESCRIPTIONS')
		if (data.houseRoomNames && Object.keys(data.houseRoomNames).length > 0)
			generatedConstants.add('HOUSEROOM_NAMES')
		if (
			data.houseRoomDescriptions &&
			Object.keys(data.houseRoomDescriptions).length > 0
		)
			generatedConstants.add('HOUSEROOM_DESCRIPTIONS')
		if (data.recipeNames && Object.keys(data.recipeNames).length > 0)
			generatedConstants.add('RECIPE_NAMES')

		// Create interface properties based on what was generated
		const interfaceProps = [{ name: 'locale', type: `'${locale}'` }]

		if (generatedConstants.has('SKILL_NAMES'))
			interfaceProps.push({ name: 'skills', type: 'typeof SKILL_NAMES' })
		if (generatedConstants.has('SKILL_DESCRIPTIONS'))
			interfaceProps.push({
				name: 'skillDescriptions',
				type: 'typeof SKILL_DESCRIPTIONS',
			})
		if (generatedConstants.has('ITEM_NAMES'))
			interfaceProps.push({ name: 'items', type: 'typeof ITEM_NAMES' })
		if (generatedConstants.has('ITEM_DESCRIPTIONS'))
			interfaceProps.push({
				name: 'itemDescriptions',
				type: 'typeof ITEM_DESCRIPTIONS',
			})
		if (generatedConstants.has('ACTION_NAMES'))
			interfaceProps.push({ name: 'actions', type: 'typeof ACTION_NAMES' })
		if (generatedConstants.has('ACTION_DESCRIPTIONS'))
			interfaceProps.push({
				name: 'actionDescriptions',
				type: 'typeof ACTION_DESCRIPTIONS',
			})
		if (generatedConstants.has('MONSTER_NAMES'))
			interfaceProps.push({ name: 'monsters', type: 'typeof MONSTER_NAMES' })
		if (generatedConstants.has('MONSTER_DESCRIPTIONS'))
			interfaceProps.push({
				name: 'monsterDescriptions',
				type: 'typeof MONSTER_DESCRIPTIONS',
			})
		if (generatedConstants.has('ABILITY_NAMES'))
			interfaceProps.push({ name: 'abilities', type: 'typeof ABILITY_NAMES' })
		if (generatedConstants.has('ABILITY_DESCRIPTIONS'))
			interfaceProps.push({
				name: 'abilityDescriptions',
				type: 'typeof ABILITY_DESCRIPTIONS',
			})
		if (generatedConstants.has('BUFFTYPE_NAMES'))
			interfaceProps.push({ name: 'buffs', type: 'typeof BUFFTYPE_NAMES' })
		if (generatedConstants.has('BUFFTYPE_DESCRIPTIONS'))
			interfaceProps.push({
				name: 'buffDescriptions',
				type: 'typeof BUFFTYPE_DESCRIPTIONS',
			})
		if (generatedConstants.has('HOUSEROOM_NAMES'))
			interfaceProps.push({
				name: 'houseRooms',
				type: 'typeof HOUSEROOM_NAMES',
			})
		if (generatedConstants.has('HOUSEROOM_DESCRIPTIONS'))
			interfaceProps.push({
				name: 'houseRoomDescriptions',
				type: 'typeof HOUSEROOM_DESCRIPTIONS',
			})
		if (generatedConstants.has('RECIPE_NAMES'))
			interfaceProps.push({ name: 'recipes', type: 'typeof RECIPE_NAMES' })

		builder.addInterface(`${locale.toUpperCase()}Translations`, interfaceProps)

		// Build translation object based on what was generated
		const objLines: string[] = [`locale: '${locale}'`]

		if (generatedConstants.has('SKILL_NAMES'))
			objLines.push('skills: SKILL_NAMES')
		if (generatedConstants.has('SKILL_DESCRIPTIONS'))
			objLines.push('skillDescriptions: SKILL_DESCRIPTIONS')
		if (generatedConstants.has('ITEM_NAMES')) objLines.push('items: ITEM_NAMES')
		if (generatedConstants.has('ITEM_DESCRIPTIONS'))
			objLines.push('itemDescriptions: ITEM_DESCRIPTIONS')
		if (generatedConstants.has('ACTION_NAMES'))
			objLines.push('actions: ACTION_NAMES')
		if (generatedConstants.has('ACTION_DESCRIPTIONS'))
			objLines.push('actionDescriptions: ACTION_DESCRIPTIONS')
		if (generatedConstants.has('MONSTER_NAMES'))
			objLines.push('monsters: MONSTER_NAMES')
		if (generatedConstants.has('MONSTER_DESCRIPTIONS'))
			objLines.push('monsterDescriptions: MONSTER_DESCRIPTIONS')
		if (generatedConstants.has('ABILITY_NAMES'))
			objLines.push('abilities: ABILITY_NAMES')
		if (generatedConstants.has('ABILITY_DESCRIPTIONS'))
			objLines.push('abilityDescriptions: ABILITY_DESCRIPTIONS')
		if (generatedConstants.has('BUFFTYPE_NAMES'))
			objLines.push('buffs: BUFFTYPE_NAMES')
		if (generatedConstants.has('BUFFTYPE_DESCRIPTIONS'))
			objLines.push('buffDescriptions: BUFFTYPE_DESCRIPTIONS')
		if (generatedConstants.has('HOUSEROOM_NAMES'))
			objLines.push('houseRooms: HOUSEROOM_NAMES')
		if (generatedConstants.has('HOUSEROOM_DESCRIPTIONS'))
			objLines.push('houseRoomDescriptions: HOUSEROOM_DESCRIPTIONS')
		if (generatedConstants.has('RECIPE_NAMES'))
			objLines.push('recipes: RECIPE_NAMES')

		const translationObj = `{\n\t${objLines.join(',\n\t')}\n}`

		builder.addConstVariable(
			`${locale}Translations`,
			`${locale.toUpperCase()}Translations`,
			translationObj,
		)
	}

	private async generateTranslationIndex(): Promise<void> {
		const outputPath = 'src/generated/localization/index.ts'
		const builder = new ASTBuilder(outputPath)

		// Import all locale translations using mixed imports
		for (const locale of this.locales) {
			builder.addMixedImport(
				`./${locale}/translations.js`,
				[`${locale}Translations`], // value imports
				[`${locale.toUpperCase()}Translations`], // type imports
			)
		}

		// Generate supported locales type
		builder.addConstArray('SUPPORTED_LOCALES', this.locales, true)
		builder.addTypeFromConst('SupportedLocale', 'SUPPORTED_LOCALES')

		// Generate translations type union
		const translationTypes = this.locales
			.map((l) => `${l.toUpperCase()}Translations`)
			.join(' | ')
		builder.addTypeAlias('Translation', translationTypes)

		// Generate translations map
		const translationsMap = this.locales
			.map((l) => `['${l}']: ${l}Translations`)
			.join(',\n\t')

		builder.addConstVariable(
			'TRANSLATIONS',
			'Record<SupportedLocale, Translation>',
			`{\n\t${translationsMap}\n}`,
		)

		await builder.save()
	}

	private async generateTranslationUtils(): Promise<void> {
		const outputPath = 'src/generated/localization/utils.ts'
		const builder = new ASTBuilder(outputPath)

		// Import mixed from index
		builder.addMixedImport(
			'./index.js',
			['TRANSLATIONS'], // value imports
			['SupportedLocale', 'Translation'], // type imports
		)

		// Import types as type-only
		builder.addImport('../types/skills.js', ['SkillHrid'], true)
		builder.addImport('../types/items.js', ['ItemHrid'], true)
		builder.addImport('../types/actions.js', ['ActionHrid'], true)
		builder.addImport('../types/monsters.js', ['MonsterHrid'], true)

		// Get translation function
		builder.addFunction(
			'getTranslation',
			[{ name: 'locale', type: 'SupportedLocale' }],
			'Translation',
			(writer) => writer.writeLine(`return TRANSLATIONS[locale]`),
		)

		// Get entity name function
		builder.addFunction(
			'getEntityName',
			[
				{ name: 'locale', type: 'SupportedLocale' },
				{ name: 'entityType', type: 'string' },
				{ name: 'hrid', type: 'string' },
			],
			'string',
			(writer) => {
				writer.writeLine(`const translation = TRANSLATIONS[locale]`)
				writer.writeLine(`const entityMap = (translation as any)[entityType]`)
				writer.writeLine(`return entityMap?.[hrid] || hrid`)
			},
		)

		// Get skill name
		builder.addFunction(
			'getSkillName',
			[
				{ name: 'locale', type: 'SupportedLocale' },
				{ name: 'hrid', type: 'SkillHrid' },
			],
			'string',
			(writer) =>
				writer.writeLine(`return TRANSLATIONS[locale].skills?.[hrid] || hrid`),
		)

		// Get item name
		builder.addFunction(
			'getItemName',
			[
				{ name: 'locale', type: 'SupportedLocale' },
				{ name: 'hrid', type: 'ItemHrid' },
			],
			'string',
			(writer) =>
				writer.writeLine(`return TRANSLATIONS[locale].items?.[hrid] || hrid`),
		)

		// Get action name
		builder.addFunction(
			'getActionName',
			[
				{ name: 'locale', type: 'SupportedLocale' },
				{ name: 'hrid', type: 'ActionHrid' },
			],
			'string',
			(writer) =>
				writer.writeLine(`return TRANSLATIONS[locale].actions?.[hrid] || hrid`),
		)

		// Get monster name
		builder.addFunction(
			'getMonsterName',
			[
				{ name: 'locale', type: 'SupportedLocale' },
				{ name: 'hrid', type: 'MonsterHrid' },
			],
			'string',
			(writer) =>
				writer.writeLine(
					`return TRANSLATIONS[locale].monsters?.[hrid] || hrid`,
				),
		)

		// Check if locale is supported
		builder.addFunction(
			'isLocaleSupported',
			[{ name: 'locale', type: 'string' }],
			'locale is SupportedLocale',
			(writer) =>
				writer.writeLine(`return TRANSLATIONS.hasOwnProperty(locale)`),
		)

		// Get default locale
		builder.addFunction('getDefaultLocale', [], 'SupportedLocale', (writer) =>
			writer.writeLine(`return 'en'`),
		)

		await builder.save()
	}

	private formatTranslationMap(data: Record<string, string>): string {
		const entries = Object.entries(data)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([key, value]) => {
				const escapedValue = value.replace(/'/g, "\\'")
				return `\t['${key}']: '${escapedValue}'`
			})
			.join(',\n')

		return `{\n${entries}\n}`
	}
}
