import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type { InterfaceDefinition, UtilityDefinition } from '../../core/types'

// ✅ ONLY internal interface for TypeScript - NOT exported to prevent double generation
interface GuildCharacterRole {
	hrid: string
	name: string
	permissionTier: number
	promoteRole: string
	demoteRole: string
	canEditName: boolean
	canEditNotice: boolean
	canPromote: boolean
	canDemote: boolean
	canKick: boolean
	canInvite: boolean
	sortIndex: number
}

export class ModularGuildCharacterRolesGenerator extends ModularBaseGenerator<GuildCharacterRole> {
	constructor() {
		super({
			entityName: 'GuildCharacterRole',
			entityNamePlural: 'GuildCharacterRoles',
			sourceKey: 'guildCharacterRoleDetailMap',
			outputPath: 'src/generated/guildcharacterroles',

			// No shared types - Layer 3 simple generator
			sharedTypes: [],

			// Preserve empty strings for role relationships
			applyDataCleaning: false,

			// Use utility templates
			utilityTemplates: [
				{ type: 'getByField', field: 'permissionTier' },
				{ type: 'sortBy', field: 'sortIndex' },
				{ type: 'toMap' },
			],

			// Auto-generate category constants for permission levels
			categoryFilters: [
				{
					name: 'canPromote',
					condition: (role: GuildCharacterRole) => role.canPromote,
				},
				{
					name: 'canKick',
					condition: (role: GuildCharacterRole) => role.canKick,
				},
				{
					name: 'highTier',
					condition: (role: GuildCharacterRole) => role.permissionTier >= 3,
				},
			],
		})
	}

	// Simple entity transformation - map properties directly
	protected override transformEntity(rawData: any): GuildCharacterRole {
		return {
			hrid: rawData.hrid,
			name: rawData.name,
			permissionTier: rawData.permissionTier,
			promoteRole: rawData.promoteRole || '',
			demoteRole: rawData.demoteRole || '',
			canEditName: Boolean(rawData.canEditName),
			canEditNotice: Boolean(rawData.canEditNotice),
			canPromote: Boolean(rawData.canPromote),
			canDemote: Boolean(rawData.canDemote),
			canKick: Boolean(rawData.canKick),
			canInvite: Boolean(rawData.canInvite),
			sortIndex: rawData.sortIndex || 0,
		}
	}

	// ✅ EXPLICIT interface definition to ensure correct HRID type
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'GuildCharacterRole',
				properties: [
					{ name: 'hrid', type: 'GuildCharacterRoleHrid' },
					{ name: 'name', type: 'string' },
					{ name: 'permissionTier', type: 'number' },
					{ name: 'promoteRole', type: 'string' },
					{ name: 'demoteRole', type: 'string' },
					{ name: 'canEditName', type: 'boolean' },
					{ name: 'canEditNotice', type: 'boolean' },
					{ name: 'canPromote', type: 'boolean' },
					{ name: 'canDemote', type: 'boolean' },
					{ name: 'canKick', type: 'boolean' },
					{ name: 'canInvite', type: 'boolean' },
					{ name: 'sortIndex', type: 'number' },
				],
			},
		]
	}

	// Add custom utilities beyond templates
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getRoleHierarchy',
				parameters: [],
				returnType: 'GuildCharacterRole[]',
				implementation: (writer) => {
					writer.writeLine('const roles = getGuildCharacterRolesRecord()')
					writer.writeLine('return Object.values(roles)')
					writer.writeLine(
						'  .sort((a, b) => b.permissionTier - a.permissionTier)',
					)
				},
				jsDoc: {
					description:
						'Get all roles sorted by permission tier (highest first)',
					returns: 'Array of roles in hierarchy order',
				},
			},
			{
				name: 'canRolePromoteTo',
				parameters: [
					{ name: 'fromRole', type: 'GuildCharacterRoleHrid' },
					{ name: 'toRole', type: 'GuildCharacterRoleHrid' },
				],
				returnType: 'boolean',
				implementation: (writer) => {
					writer.writeLine('const roles = getGuildCharacterRolesRecord()')
					writer.writeLine('const from = roles[fromRole]')
					writer.writeLine('const to = roles[toRole]')
					writer.writeLine('if (!from || !to) return false')
					writer.writeLine(
						'return from.canPromote && from.permissionTier >= to.permissionTier',
					)
				},
				jsDoc: {
					description:
						'Check if one role can promote to another based on hierarchy',
					params: [
						{ name: 'fromRole', description: 'The role attempting to promote' },
						{ name: 'toRole', description: 'The target role to promote to' },
					],
					returns: 'True if promotion is allowed',
				},
			},
		]
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularGuildCharacterRolesGenerator()
	await generator.generate('./src/sources/game_data.json')
}
