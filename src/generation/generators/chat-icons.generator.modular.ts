import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { PropertyDefinition } from '../core/ast-builder'

// ChatIcon interface for internal use
interface ChatIcon {
	hrid: string
	name: string
	isSpecial: boolean
	isSeasonal: boolean
	cowbellCost: number
	supporterPointCost: number
	requiredChatIconHrid: string | undefined
	sortIndex: number
}

/**
 * Modular ChatIcons Generator with tree-shaking optimizations
 * Generates separate files for types, data, utils, constants, and lookups
 */
export class ModularChatIconsGenerator extends ModularBaseGenerator<ChatIcon> {
	// Collect unique values for lookups
	private specialIcons: string[] = []
	private seasonalIcons: string[] = []
	private cowbellIcons: string[] = []
	private supporterIcons: string[] = []
	private freeIcons: string[] = []
	private iconsWithRequirements: string[] = []
	private iconDependencies: Map<string, string[]> = new Map()

	constructor() {
		super({
			entityName: 'ChatIcon',
			entityNamePlural: 'ChatIcons',
			sourceKey: 'chatIconDetailMap',
			outputPath: './src/generated/chaticons/index.ts',
			generateConstants: true,
			generateUtils: true,
		})
	}

	protected override extractEntities(sourceData: any): Record<string, ChatIcon> {
		const icons: Record<string, ChatIcon> = {}
		const chatIconDetailMap = sourceData[this.config.sourceKey] || {}

		for (const [hrid, data] of Object.entries(chatIconDetailMap)) {
			const icon = this.extractChatIcon(hrid as string, data as any)
			icons[hrid] = icon
			this.collectForLookups(icon)
		}

		console.log(`  💬 Extracted ${Object.keys(icons).length} chat icons`)
		console.log(`  ⭐ ${this.specialIcons.length} special icons`)
		console.log(`  🎃 ${this.seasonalIcons.length} seasonal icons`)
		console.log(`  🔔 ${this.cowbellIcons.length} cowbell icons`)
		console.log(`  💎 ${this.supporterIcons.length} supporter icons`)
		console.log(`  🆓 ${this.freeIcons.length} free icons`)

		return icons
	}

	private extractChatIcon(hrid: string, data: any): ChatIcon {
		const icon: ChatIcon = {
			hrid,
			name: data.name || '',
			isSpecial: data.isSpecial === true,
			isSeasonal: data.isSeasonal === true,
			cowbellCost: typeof data.cowbellCost === 'number' ? data.cowbellCost : 0,
			supporterPointCost: typeof data.supporterPointCost === 'number' ? data.supporterPointCost : 0,
			requiredChatIconHrid: data.requiredChatIconHrid && data.requiredChatIconHrid !== ''
				? data.requiredChatIconHrid
				: undefined,
			sortIndex: typeof data.sortIndex === 'number' ? data.sortIndex : 0,
		}

		return this.cleanEntityData(icon) as ChatIcon
	}

	private collectForLookups(icon: ChatIcon): void {
		// Categorize by type
		if (icon.isSpecial) {
			this.specialIcons.push(icon.hrid)
		}
		if (icon.isSeasonal) {
			this.seasonalIcons.push(icon.hrid)
		}
		if (icon.cowbellCost > 0) {
			this.cowbellIcons.push(icon.hrid)
		}
		if (icon.supporterPointCost > 0) {
			this.supporterIcons.push(icon.hrid)
		}
		if (icon.cowbellCost === 0 && icon.supporterPointCost === 0 && !icon.isSpecial) {
			this.freeIcons.push(icon.hrid)
		}
		if (icon.requiredChatIconHrid) {
			this.iconsWithRequirements.push(icon.hrid)
			
			// Build dependency chains
			if (!this.iconDependencies.has(icon.requiredChatIconHrid)) {
				this.iconDependencies.set(icon.requiredChatIconHrid, [])
			}
			this.iconDependencies.get(icon.requiredChatIconHrid)!.push(icon.hrid)
		}
	}

	protected override generateTypes(entities: Record<string, ChatIcon>): void {
		const typesBuilder = this.moduleBuilder.getFile('types')
		
		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['CHATICON_HRIDS'], false)
		
		// Derive ChatIconHrid type from constants
		typesBuilder.addType('ChatIconHrid', 'typeof CHATICON_HRIDS[number]')
		
		// ChatIcon interface with JSDoc
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'ChatIconHrid',
				optional: false,
				description: 'Unique identifier for the chat icon',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the chat icon',
			},
			{
				name: 'isSpecial',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a special/admin icon',
			},
			{
				name: 'isSeasonal',
				type: 'boolean',
				optional: false,
				description: 'Whether this is a seasonal/event icon',
			},
			{
				name: 'cowbellCost',
				type: 'number',
				optional: false,
				description: 'Cost in cowbells (0 if not purchasable with cowbells)',
			},
			{
				name: 'supporterPointCost',
				type: 'number',
				optional: false,
				description: 'Cost in supporter points (0 if not purchasable with points)',
			},
			{
				name: 'requiredChatIconHrid',
				type: 'ChatIconHrid | undefined',
				optional: true,
				description: 'Prerequisite icon that must be owned first',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]
		
		typesBuilder.addInterface('ChatIcon', properties)
		
		// Export all types from types module
		const types = ['ChatIconHrid', 'ChatIcon']
		types.forEach(name => {
			this.moduleBuilder.addExport({ name, source: './types', isType: true })
		})
	}

	protected override generateConstants(entities: Record<string, ChatIcon>): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate CHATICON_HRIDS array
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('CHATICON_HRIDS', hrids)

		// Generate category arrays
		constantsBuilder.addConstArray('SPECIAL_CHAT_ICONS', this.specialIcons.sort(), true)
		constantsBuilder.addConstArray('SEASONAL_CHAT_ICONS', this.seasonalIcons.sort(), true)
		constantsBuilder.addConstArray('COWBELL_CHAT_ICONS', this.cowbellIcons.sort(), true)
		constantsBuilder.addConstArray('SUPPORTER_CHAT_ICONS', this.supporterIcons.sort(), true)
		constantsBuilder.addConstArray('FREE_CHAT_ICONS', this.freeIcons.sort(), true)
		constantsBuilder.addConstArray('CHAT_ICONS_WITH_REQUIREMENTS', this.iconsWithRequirements.sort(), true)

		// Export from module
		this.moduleBuilder.addExport({ name: 'CHATICON_HRIDS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'SPECIAL_CHAT_ICONS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'SEASONAL_CHAT_ICONS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'COWBELL_CHAT_ICONS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'SUPPORTER_CHAT_ICONS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'FREE_CHAT_ICONS', source: './constants' })
		this.moduleBuilder.addExport({ name: 'CHAT_ICONS_WITH_REQUIREMENTS', source: './constants' })
	}

	// generateLazyData is handled by the base class

	protected override generateLookups(entities: Record<string, ChatIcon>): void {

		// Build icon dependency chains object
		if (this.iconDependencies.size > 0) {
			const dependencyObject: Record<string, readonly string[]> = {}
			for (const [required, dependents] of this.iconDependencies.entries()) {
				dependencyObject[required] = dependents.sort()
			}

			this.moduleBuilder.addStaticLookup(
				'CHAT_ICON_UNLOCK_CHAINS',
				dependencyObject,
				'ChatIconHrid',
				'readonly ChatIconHrid[]',
				true, // isPartial since not all icons have unlock chains
			)
		}

		// Build cost ranges for quick lookups
		const iconsByCowbellCost: Map<number, string[]> = new Map()
		const iconsBySupporterCost: Map<number, string[]> = new Map()
		
		for (const [hrid, icon] of Object.entries(entities)) {
			if (icon.cowbellCost > 0) {
				if (!iconsByCowbellCost.has(icon.cowbellCost)) {
					iconsByCowbellCost.set(icon.cowbellCost, [])
				}
				iconsByCowbellCost.get(icon.cowbellCost)!.push(hrid)
			}
			
			if (icon.supporterPointCost > 0) {
				if (!iconsBySupporterCost.has(icon.supporterPointCost)) {
					iconsBySupporterCost.set(icon.supporterPointCost, [])
				}
				iconsBySupporterCost.get(icon.supporterPointCost)!.push(hrid)
			}
		}

		// Convert to sorted objects
		const cowbellCostObject: Record<number, readonly string[]> = {}
		Array.from(iconsByCowbellCost.entries())
			.sort(([a], [b]) => a - b)
			.forEach(([cost, hrids]) => {
				cowbellCostObject[cost] = hrids.sort()
			})

		if (Object.keys(cowbellCostObject).length > 0) {
			this.moduleBuilder.addStaticLookup(
				'ICONS_BY_COWBELL_COST',
				cowbellCostObject,
				'number',
				'readonly ChatIconHrid[]',
			)
		}

		const supporterCostObject: Record<number, readonly string[]> = {}
		Array.from(iconsBySupporterCost.entries())
			.sort(([a], [b]) => a - b)
			.forEach(([cost, hrids]) => {
				supporterCostObject[cost] = hrids.sort()
			})

		if (Object.keys(supporterCostObject).length > 0) {
			this.moduleBuilder.addStaticLookup(
				'ICONS_BY_SUPPORTER_COST',
				supporterCostObject,
				'number',
				'readonly ChatIconHrid[]',
			)
		}
	}

	protected override generateUtilities(entities: Record<string, ChatIcon>): void {
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import types
		utilsBuilder.addImport('../chaticons/types', ['ChatIcon', 'ChatIconHrid'], true)
		utilsBuilder.addImport('../chaticons/data', ['getChatIconsMap'], false)
		utilsBuilder.addImport('../chaticons/constants', [
			'CHATICON_HRIDS',
			'SPECIAL_CHAT_ICONS',
			'SEASONAL_CHAT_ICONS',
			'COWBELL_CHAT_ICONS',
			'SUPPORTER_CHAT_ICONS',
			'FREE_CHAT_ICONS',
			'CHAT_ICONS_WITH_REQUIREMENTS',
		], false)
		utilsBuilder.addImport('../chaticons/lookups', [
			'CHAT_ICON_UNLOCK_CHAINS',
		], false)

		// Standard utility functions
		utilsBuilder.addFunction(
			'isChatIconHrid',
			[{ name: 'value', type: 'string' }],
			'value is ChatIconHrid',
			(writer) => {
				writer.writeLine('return CHATICON_HRIDS.includes(value as ChatIconHrid)')
			}
		)

		utilsBuilder.addFunction(
			'getChatIcon',
			[{ name: 'hrid', type: 'ChatIconHrid' }],
			'ChatIcon | undefined',
			(writer) => {
				writer.writeLine('return getChatIconsMap().get(hrid)')
			}
		)

		utilsBuilder.addFunction(
			'requireChatIcon',
			[{ name: 'hrid', type: 'ChatIconHrid' }],
			'ChatIcon',
			(writer) => {
				writer.writeLine('const icon = getChatIcon(hrid)')
				writer.writeLine('if (!icon) {')
				writer.indent(() => {
					writer.writeLine(`throw new Error(\`ChatIcon not found: \${hrid}\`)`)
				})
				writer.writeLine('}')
				writer.writeLine('return icon')
			}
		)

		utilsBuilder.addFunction(
			'getAllChatIcons',
			[],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('return Array.from(getChatIconsMap().values())')
			}
		)

		// Specialized utility functions
		utilsBuilder.addFunction(
			'getSpecialChatIcons',
			[],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('return SPECIAL_CHAT_ICONS.map(hrid => getChatIcon(hrid as ChatIconHrid)!).filter(Boolean)')
			}
		)

		utilsBuilder.addFunction(
			'getSeasonalChatIcons',
			[],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('return SEASONAL_CHAT_ICONS.map(hrid => getChatIcon(hrid as ChatIconHrid)!).filter(Boolean)')
			}
		)

		utilsBuilder.addFunction(
			'getCowbellChatIcons',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('const icons = COWBELL_CHAT_ICONS.map(hrid => getChatIcon(hrid as ChatIconHrid)!).filter(Boolean)')
				writer.writeLine('if (maxCost === undefined) return icons')
				writer.writeLine('return icons.filter(icon => icon.cowbellCost <= maxCost)')
			}
		)

		utilsBuilder.addFunction(
			'getSupporterChatIcons',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('const icons = SUPPORTER_CHAT_ICONS.map(hrid => getChatIcon(hrid as ChatIconHrid)!).filter(Boolean)')
				writer.writeLine('if (maxCost === undefined) return icons')
				writer.writeLine('return icons.filter(icon => icon.supporterPointCost <= maxCost)')
			}
		)

		utilsBuilder.addFunction(
			'getFreeChatIcons',
			[],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('return FREE_CHAT_ICONS.map(hrid => getChatIcon(hrid as ChatIconHrid)!).filter(Boolean)')
			}
		)

		utilsBuilder.addFunction(
			'getChatIconUnlockChain',
			[{ name: 'baseIconHrid', type: 'ChatIconHrid' }],
			'readonly ChatIconHrid[]',
			(writer) => {
				writer.writeLine('if (!CHAT_ICON_UNLOCK_CHAINS) return [] as const')
				writer.writeLine('return CHAT_ICON_UNLOCK_CHAINS[baseIconHrid] || ([] as const)')
			}
		)

		utilsBuilder.addFunction(
			'getChatIconsByRequirement',
			[{ name: 'requiredIconHrid', type: 'ChatIconHrid' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('const chain = getChatIconUnlockChain(requiredIconHrid)')
				writer.writeLine('return [...chain].map(hrid => getChatIcon(hrid)!).filter(Boolean)')
			}
		)

		utilsBuilder.addFunction(
			'getChatIconsSortedByIndex',
			[],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('return getAllChatIcons().sort((a, b) => a.sortIndex - b.sortIndex)')
			}
		)

		utilsBuilder.addFunction(
			'calculateTotalCost',
			[{ name: 'iconHrids', type: 'ChatIconHrid[]' }],
			'{ cowbells: number; supporterPoints: number }',
			(writer) => {
				writer.writeLine('let cowbells = 0')
				writer.writeLine('let supporterPoints = 0')
				writer.writeLine('for (const hrid of iconHrids) {')
				writer.indent(() => {
					writer.writeLine('const icon = getChatIcon(hrid)')
					writer.writeLine('if (icon) {')
					writer.indent(() => {
						writer.writeLine('cowbells += icon.cowbellCost')
						writer.writeLine('supporterPoints += icon.supporterPointCost')
					})
					writer.writeLine('}')
				})
				writer.writeLine('}')
				writer.writeLine('return { cowbells, supporterPoints }')
			}
		)

		utilsBuilder.addFunction(
			'searchChatIcons',
			[{ name: 'query', type: 'string' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('const lowerQuery = query.toLowerCase()')
				writer.writeLine('return getAllChatIcons().filter(icon => ')
				writer.indent(() => {
					writer.writeLine('icon.name.toLowerCase().includes(lowerQuery) ||')
					writer.writeLine('icon.hrid.toLowerCase().includes(lowerQuery)')
				})
				writer.writeLine(')')
			}
		)

		// Export from module
		const utils = [
			'isChatIconHrid',
			'getChatIcon',
			'requireChatIcon',
			'getAllChatIcons',
			'getSpecialChatIcons',
			'getSeasonalChatIcons',
			'getCowbellChatIcons',
			'getSupporterChatIcons',
			'getFreeChatIcons',
			'getChatIconUnlockChain',
			'getChatIconsByRequirement',
			'getChatIconsSortedByIndex',
			'calculateTotalCost',
			'searchChatIcons',
		]
		utils.forEach(name => {
			this.moduleBuilder.addExport({ name, source: './utils' })
		})
	}
}