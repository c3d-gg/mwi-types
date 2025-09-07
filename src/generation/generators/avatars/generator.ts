import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition, UtilityDefinition } from '../../core/types'

// ✅ ONLY internal interface for TypeScript - NOT exported to prevent double generation
interface Avatar {
	hrid: string
	cowbellCost: number
	isSeasonal: boolean
	sortIndex: number
}

export class ModularAvatarsGenerator extends ModularBaseGenerator<Avatar> {
	constructor() {
		super({
			entityName: 'Avatar',
			entityNamePlural: 'Avatars',
			sourceKey: 'avatarDetailMap',
			outputPath: 'src/generated/avatars',

			// No shared types - Layer 3 simple generator
			sharedTypes: [],

			// No data cleaning needed - all properties are meaningful
			applyDataCleaning: true,

			// Use utility templates
			utilityTemplates: [
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],

			// Auto-generate category constants for seasonal vs regular
			categoryFilters: [
				{
					name: 'seasonal',
					condition: (avatar: Avatar) => avatar.isSeasonal,
				},
				{
					name: 'regular',
					condition: (avatar: Avatar) => !avatar.isSeasonal,
				},
			],
		})
	}

	// Simple entity transformation - map properties directly
	protected override transformEntity(rawData: any): Avatar {
		return {
			hrid: rawData.hrid,
			cowbellCost: rawData.cowbellCost || 0,
			isSeasonal: Boolean(rawData.isSeasonal),
			sortIndex: rawData.sortIndex || 0,
		}
	}

	// ✅ EXPLICIT interface definition to ensure correct HRID type
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'Avatar',
				properties: [
					{ name: 'hrid', type: 'AvatarHrid' },
					{ name: 'cowbellCost', type: 'number' },
					{ name: 'isSeasonal', type: 'boolean' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	// Add custom utilities beyond templates
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getAvatarsByCost',
				parameters: [
					{ name: 'minCost', type: 'number' },
					{ name: 'maxCost', type: 'number' },
				],
				returnType: 'Avatar[]',
				implementation: (writer) => {
					writer.writeLine('const avatars = getAvatarsRecord()')
					writer.writeLine('return Object.values(avatars)')
					writer.writeLine('  .filter(avatar => ')
					writer.writeLine('    avatar.cowbellCost >= minCost && ')
					writer.writeLine('    avatar.cowbellCost <= maxCost)')
				},
				jsDoc: {
					description: 'Get avatars within a specific price range',
					params: [
						{
							name: 'minCost',
							description: 'Minimum cowbell cost (inclusive)',
						},
						{
							name: 'maxCost',
							description: 'Maximum cowbell cost (inclusive)',
						},
					],
					returns: 'Array of avatars in the price range',
				},
			},
			{
				name: 'getSeasonalAvatars',
				parameters: [],
				returnType: 'Avatar[]',
				implementation: (writer) => {
					writer.writeLine('const avatars = getAvatarsRecord()')
					writer.writeLine('return Object.values(avatars)')
					writer.writeLine('  .filter(avatar => avatar.isSeasonal)')
					writer.writeLine('  .sort((a, b) => a.sortIndex - b.sortIndex)')
				},
				jsDoc: {
					description: 'Get all seasonal/limited-time avatars',
					returns: 'Array of seasonal avatars sorted by sort index',
				},
			},
			{
				name: 'getRegularAvatars',
				parameters: [],
				returnType: 'Avatar[]',
				implementation: (writer) => {
					writer.writeLine('const avatars = getAvatarsRecord()')
					writer.writeLine('return Object.values(avatars)')
					writer.writeLine('  .filter(avatar => !avatar.isSeasonal)')
					writer.writeLine('  .sort((a, b) => a.sortIndex - b.sortIndex)')
				},
				jsDoc: {
					description: 'Get all regular/always-available avatars',
					returns: 'Array of regular avatars sorted by sort index',
				},
			},
			{
				name: 'getAvatarsSortedByCost',
				parameters: [],
				returnType: 'Avatar[]',
				implementation: (writer) => {
					writer.writeLine('const avatars = getAvatarsRecord()')
					writer.writeLine('return Object.values(avatars)')
					writer.writeLine('  .sort((a, b) => a.cowbellCost - b.cowbellCost)')
				},
				jsDoc: {
					description: 'Get all avatars sorted by ascending cost',
					returns: 'Array of avatars ordered from cheapest to most expensive',
				},
			},
		]
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularAvatarsGenerator()
	await generator.generate('./src/sources/game_data.json')
}
