import { ModularBaseGenerator } from '../../core/generator.base.modular'

import type {
	InterfaceDefinition,
	ConstantDefinition,
	UtilityDefinition,
} from '../../core/types'

// Internal interface for TypeScript typing (NOT exported)
interface PurchaseBundle {
	hrid: string
	stripeItemId?: string
	kongregateIdentifier?: string
	steamItemId?: number
	name: string
	isStandardOnly: boolean
	isIroncowOnly: boolean
	quantity: number
	mooPassDays: number
	isAccountMooPass: boolean
	supporterPoints?: number
	centPrice: number
	kredPrice: number
	sortIndex?: number
}

export class ModularPurchaseBundlesGenerator extends ModularBaseGenerator<PurchaseBundle> {
	constructor() {
		super({
			entityName: 'PurchaseBundle',
			entityNamePlural: 'PurchaseBundles',
			sourceKey: 'purchaseBundleDetailMap',
			outputPath: 'src/generated/purchasebundles',

			// No shared types needed for this simple entity
			sharedTypes: [],

			// Preserve all data including optional fields
			applyDataCleaning: false,

			// Use utility templates for common patterns
			utilityTemplates: [
				{ type: 'toMap' },
			],
		})
	}

	// MANDATORY explicit interface definition (prevents HridHrid + duplication bugs)
	protected override defineInterfaces(): InterfaceDefinition[] {
		return [
			{
				name: 'PurchaseBundle',
				properties: [
					{ name: 'hrid', type: 'PurchaseBundleHrid' }, // EXPLICIT HRID TYPE!
					{ name: 'stripeItemId', type: 'string | undefined' },
					{ name: 'kongregateIdentifier', type: 'string | undefined' },
					{ name: 'steamItemId', type: 'number | undefined' },
					{ name: 'name', type: 'string' },
					{ name: 'isStandardOnly', type: 'boolean' },
					{ name: 'isIroncowOnly', type: 'boolean' },
					{ name: 'quantity', type: 'number' },
					{ name: 'mooPassDays', type: 'number' },
					{ name: 'isAccountMooPass', type: 'boolean' },
					{ name: 'supporterPoints', type: 'number | undefined' },
					{ name: 'centPrice', type: 'number' },
					{ name: 'kredPrice', type: 'number' },
					{ name: 'sortIndex', type: 'number | undefined' },
				],
			},
		]
	}

	// Define category constants for different bundle types
	protected override defineConstants(): ConstantDefinition[] {
		return [
			{
				name: 'MOOPASS_BUNDLES',
				type: 'readonly PurchaseBundleHrid[]',
				value: (entities) => {
					const bundles = Object.values(entities)
						.filter(b => b.mooPassDays > 0 && !b.isAccountMooPass)
						.map(b => b.hrid)
						.sort()
					return bundles
				},
				description: 'All regular MooPass bundles (not account-wide)',
			},
			{
				name: 'ACCOUNT_MOOPASS_BUNDLES',
				type: 'readonly PurchaseBundleHrid[]',
				value: (entities) => {
					const bundles = Object.values(entities)
						.filter(b => b.isAccountMooPass)
						.map(b => b.hrid)
						.sort()
					return bundles
				},
				description: 'All account-wide MooPass bundles',
			},
			{
				name: 'COWBELL_BUNDLES',
				type: 'readonly PurchaseBundleHrid[]',
				value: (entities) => {
					const bundles = Object.values(entities)
						.filter(b => b.quantity > 0 && b.mooPassDays === 0)
						.map(b => b.hrid)
						.sort()
					return bundles
				},
				description: 'All cowbell-only bundles (no MooPass)',
			},
			{
				name: 'STANDARD_ONLY_BUNDLES',
				type: 'readonly PurchaseBundleHrid[]',
				value: (entities) => {
					const bundles = Object.values(entities)
						.filter(b => b.isStandardOnly)
						.map(b => b.hrid)
						.sort()
					return bundles
				},
				description: 'Bundles only available in standard mode',
			},
			{
				name: 'IRONCOW_ONLY_BUNDLES',
				type: 'readonly PurchaseBundleHrid[]',
				value: (entities) => {
					const bundles = Object.values(entities)
						.filter(b => b.isIroncowOnly)
						.map(b => b.hrid)
						.sort()
					return bundles
				},
				description: 'Bundles only available in Ironcow mode',
			},
		]
	}

	// Define custom utility functions
	protected override defineUtilities(): UtilityDefinition[] {
		return [
			{
				name: 'getMooPassBundles',
				parameters: [],
				returnType: 'PurchaseBundle[]',
				implementation: (writer) => {
					writer.writeLine('const bundles: PurchaseBundle[] = []')
					writer.writeLine('for (const hrid of MOOPASS_BUNDLES) {')
					writer.writeLine('  const bundle = getPurchaseBundle(hrid)')
					writer.writeLine('  if (bundle) bundles.push(bundle)')
					writer.writeLine('}')
					writer.writeLine('return bundles')
				},
				imports: [
					{ from: './constants', names: ['MOOPASS_BUNDLES'] },
				],
				jsDoc: {
					description: 'Get all regular MooPass bundles',
					returns: 'Array of MooPass bundles',
				},
			},
			{
				name: 'getAccountMooPassBundles',
				parameters: [],
				returnType: 'PurchaseBundle[]',
				implementation: (writer) => {
					writer.writeLine('const bundles: PurchaseBundle[] = []')
					writer.writeLine('for (const hrid of ACCOUNT_MOOPASS_BUNDLES) {')
					writer.writeLine('  const bundle = getPurchaseBundle(hrid)')
					writer.writeLine('  if (bundle) bundles.push(bundle)')
					writer.writeLine('}')
					writer.writeLine('return bundles')
				},
				imports: [
					{ from: './constants', names: ['ACCOUNT_MOOPASS_BUNDLES'] },
				],
				jsDoc: {
					description: 'Get all account-wide MooPass bundles',
					returns: 'Array of account MooPass bundles',
				},
			},
			{
				name: 'getCowbellBundles',
				parameters: [],
				returnType: 'PurchaseBundle[]',
				implementation: (writer) => {
					writer.writeLine('const bundles: PurchaseBundle[] = []')
					writer.writeLine('for (const hrid of COWBELL_BUNDLES) {')
					writer.writeLine('  const bundle = getPurchaseBundle(hrid)')
					writer.writeLine('  if (bundle) bundles.push(bundle)')
					writer.writeLine('}')
					writer.writeLine('return bundles')
				},
				imports: [
					{ from: './constants', names: ['COWBELL_BUNDLES'] },
				],
				jsDoc: {
					description: 'Get all cowbell-only bundles',
					returns: 'Array of cowbell bundles',
				},
			},
			{
				name: 'getPurchaseBundlesSortedByPrice',
				parameters: [],
				returnType: 'PurchaseBundle[]',
				implementation: (writer) => {
					writer.writeLine('return getAllPurchaseBundles()')
					writer.writeLine('  .sort((a, b) => a.centPrice - b.centPrice)')
				},
				jsDoc: {
					description: 'Get all purchase bundles sorted by price (ascending)',
					returns: 'Array of bundles sorted by cent price',
				},
			},
			{
				name: 'getPurchaseBundlesSortedBySortIndex',
				parameters: [],
				returnType: 'PurchaseBundle[]',
				implementation: (writer) => {
					writer.writeLine('return getAllPurchaseBundles()')
					writer.writeLine('  .sort((a, b) => (a.sortIndex ?? 999) - (b.sortIndex ?? 999))')
				},
				jsDoc: {
					description: 'Get all purchase bundles sorted by sort index',
					returns: 'Array of bundles sorted by sort index',
				},
			},
			{
				name: 'getPurchaseBundleByPlatformId',
				parameters: [
					{ name: 'platform', type: "'stripe' | 'kongregate' | 'steam'" },
					{ name: 'id', type: 'string | number' },
				],
				returnType: 'PurchaseBundle | undefined',
				implementation: (writer) => {
					writer.writeLine('const bundles = getAllPurchaseBundles()')
					writer.writeLine('')
					writer.writeLine('switch (platform) {')
					writer.writeLine("  case 'stripe':")
					writer.writeLine('    return bundles.find(b => b.stripeItemId === id)')
					writer.writeLine("  case 'kongregate':")
					writer.writeLine('    return bundles.find(b => b.kongregateIdentifier === id)')
					writer.writeLine("  case 'steam':")
					writer.writeLine('    return bundles.find(b => b.steamItemId === id)')
					writer.writeLine('  default:')
					writer.writeLine('    return undefined')
					writer.writeLine('}')
				},
				jsDoc: {
					description: 'Find a purchase bundle by platform-specific identifier',
					returns: 'The matching bundle or undefined',
				},
			},
		]
	}

	// Transform raw data to typed entity
	protected override transformEntity(rawData: any): PurchaseBundle {
		return {
			hrid: rawData.hrid,
			stripeItemId: rawData.stripeItemId,
			kongregateIdentifier: rawData.kongregateIdentifier,
			steamItemId: rawData.steamItemId,
			name: rawData.name,
			isStandardOnly: rawData.isStandardOnly || false,
			isIroncowOnly: rawData.isIroncowOnly || false,
			quantity: rawData.quantity || 0,
			mooPassDays: rawData.mooPassDays || 0,
			isAccountMooPass: rawData.isAccountMooPass || false,
			supporterPoints: rawData.supporterPoints,
			centPrice: rawData.centPrice,
			kredPrice: rawData.kredPrice,
			sortIndex: rawData.sortIndex,
		}
	}
}

// Required for dev CLI
if (import.meta.main) {
	const generator = new ModularPurchaseBundlesGenerator()
	await generator.generate('./src/sources/game_data.json')
}