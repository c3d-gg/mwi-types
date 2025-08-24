import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

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

export class ChatIconsGenerator extends BaseGenerator<ChatIcon> {
	private uniqueRequiredIcons: Set<string> = new Set()

	constructor() {
		const config: GeneratorConfig = {
			entityName: 'ChatIcon',
			entityNamePlural: 'ChatIcons',
			sourceKey: 'chatIconDetailMap',
			outputPath: 'src/generated/types/chat-icons.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, ChatIcon> {
		const icons: Record<string, ChatIcon> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const iconData = data as any
			const icon: ChatIcon = {
				hrid: iconData.hrid,
				name: iconData.name || '',
				isSpecial: iconData.isSpecial === true,
				isSeasonal: iconData.isSeasonal === true,
				cowbellCost: iconData.cowbellCost || 0,
				supporterPointCost: iconData.supporterPointCost || 0,
				requiredChatIconHrid:
					iconData.requiredChatIconHrid && iconData.requiredChatIconHrid !== ''
						? iconData.requiredChatIconHrid
						: undefined,
				sortIndex: iconData.sortIndex || 0,
			}

			icons[hrid] = icon
			this.collectUniqueValues(icon)
		}

		return icons
	}

	protected override collectUniqueValues(icon: ChatIcon): void {
		if (icon.requiredChatIconHrid) {
			this.uniqueRequiredIcons.add(icon.requiredChatIconHrid)
		}
	}

	protected override generateInterfaces(
		_icons: Record<string, ChatIcon>,
	): void {
		// Generate main interface with JSDoc
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
				description:
					'Cost in supporter points (0 if not purchasable with points)',
			},
			{
				name: 'requiredChatIconHrid',
				type: 'ChatIconHrid | undefined',
				optional: false,
				description: 'Prerequisite icon that must be owned first',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		this.builder.addInterface('ChatIcon', properties)
	}

	protected override generateUtilities(icons: Record<string, ChatIcon>): void {
		// Call base utilities first
		super.generateUtilities(icons)

		// Generate lookup maps
		this.generateLookupMaps(icons)

		// Generate specialized utility functions
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(icons: Record<string, ChatIcon>): void {
		// Categorize icons
		const specialIcons: string[] = []
		const seasonalIcons: string[] = []
		const cowbellIcons: string[] = []
		const supporterIcons: string[] = []
		const freeIcons: string[] = []
		const iconsWithRequirements: string[] = []

		for (const [hrid, icon] of Object.entries(icons)) {
			if (icon.isSpecial) {
				specialIcons.push(hrid)
			}
			if (icon.isSeasonal) {
				seasonalIcons.push(hrid)
			}
			if (icon.cowbellCost > 0) {
				cowbellIcons.push(hrid)
			}
			if (icon.supporterPointCost > 0) {
				supporterIcons.push(hrid)
			}
			if (
				icon.cowbellCost === 0 &&
				icon.supporterPointCost === 0 &&
				!icon.isSpecial
			) {
				freeIcons.push(hrid)
			}
			if (icon.requiredChatIconHrid) {
				iconsWithRequirements.push(hrid)
			}
		}

		// Add category arrays
		this.builder.addConstArray('SPECIAL_CHAT_ICONS', specialIcons, true)
		this.builder.addConstArray('SEASONAL_CHAT_ICONS', seasonalIcons, true)
		this.builder.addConstArray('COWBELL_CHAT_ICONS', cowbellIcons, true)
		this.builder.addConstArray('SUPPORTER_CHAT_ICONS', supporterIcons, true)
		this.builder.addConstArray('FREE_CHAT_ICONS', freeIcons, true)
		this.builder.addConstArray(
			'CHAT_ICONS_WITH_REQUIREMENTS',
			iconsWithRequirements,
			true,
		)

		// Create icon dependency map
		const iconDependencies: Record<string, string[]> = {}
		for (const [hrid, icon] of Object.entries(icons)) {
			if (icon.requiredChatIconHrid) {
				if (!iconDependencies[icon.requiredChatIconHrid]) {
					iconDependencies[icon.requiredChatIconHrid] = []
				}
				iconDependencies[icon.requiredChatIconHrid]!.push(hrid)
			}
		}

		if (Object.keys(iconDependencies).length > 0) {
			this.builder.addConstVariable(
				'CHAT_ICON_UNLOCK_CHAINS',
				'Partial<Record<ChatIconHrid, readonly ChatIconHrid[]>>',
				iconDependencies,
			)
		}
	}

	private generateSpecializedUtils(): void {
		// getSpecialChatIcons
		this.builder.addFunction(
			'getSpecialChatIcons',
			[],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine(
					'return SPECIAL_CHAT_ICONS.map(hrid => CHATICONS.get(hrid as ChatIconHrid)!).filter(Boolean)',
				)
			},
		)

		// getSeasonalChatIcons
		this.builder.addFunction(
			'getSeasonalChatIcons',
			[],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine(
					'return SEASONAL_CHAT_ICONS.map(hrid => CHATICONS.get(hrid as ChatIconHrid)!).filter(Boolean)',
				)
			},
		)

		// getCowbellChatIcons
		this.builder.addFunction(
			'getCowbellChatIcons',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine(
					'const icons = COWBELL_CHAT_ICONS.map(hrid => CHATICONS.get(hrid as ChatIconHrid)!).filter(Boolean)',
				)
				writer.writeLine('if (maxCost === undefined) return icons')
				writer.writeLine(
					'return icons.filter(icon => icon.cowbellCost <= maxCost)',
				)
			},
		)

		// getSupporterChatIcons
		this.builder.addFunction(
			'getSupporterChatIcons',
			[{ name: 'maxCost', type: 'number | undefined = undefined' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine(
					'const icons = SUPPORTER_CHAT_ICONS.map(hrid => CHATICONS.get(hrid as ChatIconHrid)!).filter(Boolean)',
				)
				writer.writeLine('if (maxCost === undefined) return icons')
				writer.writeLine(
					'return icons.filter(icon => icon.supporterPointCost <= maxCost)',
				)
			},
		)

		// getFreeChatIcons
		this.builder.addFunction('getFreeChatIcons', [], 'ChatIcon[]', (writer) => {
			writer.writeLine(
				'return FREE_CHAT_ICONS.map(hrid => CHATICONS.get(hrid as ChatIconHrid)!).filter(Boolean)',
			)
		})

		// canUnlockChatIcon
		this.builder.addFunction(
			'canUnlockChatIcon',
			[
				{ name: 'iconHrid', type: 'ChatIconHrid' },
				{ name: 'ownedIcons', type: 'Set<ChatIconHrid>' },
			],
			'boolean',
			(writer) => {
				writer.writeLine('const icon = CHATICONS.get(iconHrid)')
				writer.writeLine('if (!icon) return false')
				writer.writeLine('if (icon.requiredChatIconHrid) {')
				writer.writeLine('  return ownedIcons.has(icon.requiredChatIconHrid)')
				writer.writeLine('}')
				writer.writeLine('return true')
			},
		)

		// getUnlockedByIcon
		this.builder.addFunction(
			'getUnlockedByIcon',
			[{ name: 'iconHrid', type: 'ChatIconHrid' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine(
					'const unlockedHrids = CHAT_ICON_UNLOCK_CHAINS?.[iconHrid] || []',
				)
				writer.writeLine(
					'return unlockedHrids.map(hrid => CHATICONS.get(hrid)!).filter(Boolean)',
				)
			},
		)

		// getChatIconCost
		this.builder.addFunction(
			'getChatIconCost',
			[{ name: 'iconHrid', type: 'ChatIconHrid' }],
			'{ cowbells: number, supporterPoints: number }',
			(writer) => {
				writer.writeLine('const icon = CHATICONS.get(iconHrid)')
				writer.writeLine(
					'if (!icon) return { cowbells: 0, supporterPoints: 0 }',
				)
				writer.writeLine('return {')
				writer.writeLine('  cowbells: icon.cowbellCost,')
				writer.writeLine('  supporterPoints: icon.supporterPointCost')
				writer.writeLine('}')
			},
		)

		// sortChatIconsByIndex
		this.builder.addFunction(
			'sortChatIconsByIndex',
			[{ name: 'icons', type: 'ChatIcon[]' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine(
					'return [...icons].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		// searchChatIcons
		this.builder.addFunction(
			'searchChatIcons',
			[{ name: 'searchTerm', type: 'string' }],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine('const lowerSearch = searchTerm.toLowerCase()')
				writer.writeLine('return Array.from(CHATICONS.values()).filter(icon =>')
				writer.writeLine('  icon.name.toLowerCase().includes(lowerSearch) ||')
				writer.writeLine('  icon.hrid.toLowerCase().includes(lowerSearch)')
				writer.writeLine(')')
			},
		)

		// getChatIconStats
		this.builder.addFunction(
			'getChatIconStats',
			[],
			'{ total: number, special: number, seasonal: number, cowbell: number, supporter: number, free: number, withRequirements: number }',
			(writer) => {
				writer.writeLine('return {')
				writer.writeLine('  total: CHATICONS.size,')
				writer.writeLine('  special: SPECIAL_CHAT_ICONS.length,')
				writer.writeLine('  seasonal: SEASONAL_CHAT_ICONS.length,')
				writer.writeLine('  cowbell: COWBELL_CHAT_ICONS.length,')
				writer.writeLine('  supporter: SUPPORTER_CHAT_ICONS.length,')
				writer.writeLine('  free: FREE_CHAT_ICONS.length,')
				writer.writeLine(
					'  withRequirements: CHAT_ICONS_WITH_REQUIREMENTS.length',
				)
				writer.writeLine('}')
			},
		)

		// getAffordableChatIcons
		this.builder.addFunction(
			'getAffordableChatIcons',
			[
				{ name: 'cowbells', type: 'number' },
				{ name: 'supporterPoints', type: 'number' },
			],
			'ChatIcon[]',
			(writer) => {
				writer.writeLine(
					'return Array.from(CHATICONS.values()).filter(icon => {',
				)
				writer.writeLine(
					'  if (icon.cowbellCost > 0 && icon.cowbellCost <= cowbells) return true',
				)
				writer.writeLine(
					'  if (icon.supporterPointCost > 0 && icon.supporterPointCost <= supporterPoints) return true',
				)
				writer.writeLine('  return false')
				writer.writeLine('})')
			},
		)
	}
}
