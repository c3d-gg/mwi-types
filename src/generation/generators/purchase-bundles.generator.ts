import { BaseGenerator } from '../core/generator.base'

import type { GeneratorConfig, PropertyDefinition } from '../core/types'

interface PurchaseBundle {
	hrid: string
	stripeItemId: string
	kongregateIdentifier: string
	steamItemId: number
	name: string
	isStandardOnly: boolean
	isIroncowOnly: boolean
	quantity: number
	mooPassDays: number
	isAccountMooPass: boolean
	supporterPoints: number
	centPrice: number
	kredPrice: number
	sortIndex: number
}

export class PurchaseBundlesGenerator extends BaseGenerator<PurchaseBundle> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'PurchaseBundle',
			entityNamePlural: 'PurchaseBundles',
			sourceKey: 'purchaseBundleDetailMap',
			outputPath: 'src/generated/types/purchase-bundles.ts',
			generateConstants: true,
			generateUtils: true,
		}
		super(config)
	}

	protected override extractEntities(
		sourceData: any,
	): Record<string, PurchaseBundle> {
		const bundles: Record<string, PurchaseBundle> = {}

		for (const [hrid, data] of Object.entries(
			sourceData[this.config.sourceKey] as any,
		)) {
			const bundleData = data as any
			const bundle: PurchaseBundle = {
				hrid: bundleData.hrid,
				stripeItemId: bundleData.stripeItemId || '',
				kongregateIdentifier: bundleData.kongregateIdentifier || '',
				steamItemId: bundleData.steamItemId || 0,
				name: bundleData.name || '',
				isStandardOnly: bundleData.isStandardOnly === true,
				isIroncowOnly: bundleData.isIroncowOnly === true,
				quantity: bundleData.quantity || 0,
				mooPassDays: bundleData.mooPassDays || 0,
				isAccountMooPass: bundleData.isAccountMooPass === true,
				supporterPoints: bundleData.supporterPoints || 0,
				centPrice: bundleData.centPrice || 0,
				kredPrice: bundleData.kredPrice || 0,
				sortIndex: bundleData.sortIndex || 0,
			}

			bundles[hrid] = bundle
		}

		return bundles
	}

	protected override generateInterfaces(
		_bundles: Record<string, PurchaseBundle>,
	): void {
		const properties: PropertyDefinition[] = [
			{
				name: 'hrid',
				type: 'PurchaseBundleHrid',
				optional: false,
				description: 'Unique identifier for the purchase bundle',
			},
			{
				name: 'stripeItemId',
				type: 'string',
				optional: false,
				description: 'Stripe payment system item identifier',
			},
			{
				name: 'kongregateIdentifier',
				type: 'string',
				optional: false,
				description: 'Kongregate platform item identifier',
			},
			{
				name: 'steamItemId',
				type: 'number',
				optional: false,
				description: 'Steam platform item identifier',
			},
			{
				name: 'name',
				type: 'string',
				optional: false,
				description: 'Display name of the purchase bundle',
			},
			{
				name: 'isStandardOnly',
				type: 'boolean',
				optional: false,
				description:
					'Whether this bundle is only available in standard game mode',
			},
			{
				name: 'isIroncowOnly',
				type: 'boolean',
				optional: false,
				description:
					'Whether this bundle is only available in ironcow game mode',
			},
			{
				name: 'quantity',
				type: 'number',
				optional: false,
				description: 'Primary item quantity (e.g., cowbells)',
			},
			{
				name: 'mooPassDays',
				type: 'number',
				optional: false,
				description: 'Number of MooPass days included (0 if none)',
			},
			{
				name: 'isAccountMooPass',
				type: 'boolean',
				optional: false,
				description: 'Whether this is an account-wide MooPass',
			},
			{
				name: 'supporterPoints',
				type: 'number',
				optional: false,
				description: 'Supporter points awarded with purchase',
			},
			{
				name: 'centPrice',
				type: 'number',
				optional: false,
				description: 'Price in cents (USD)',
			},
			{
				name: 'kredPrice',
				type: 'number',
				optional: false,
				description: 'Price in Kongregate Kreds',
			},
			{
				name: 'sortIndex',
				type: 'number',
				optional: false,
				description: 'Display sort order',
			},
		]

		this.builder.addInterface('PurchaseBundle', properties)
	}

	protected override generateUtilities(
		bundles: Record<string, PurchaseBundle>,
	): void {
		super.generateUtilities(bundles)
		this.generateLookupMaps(bundles)
		this.generateSpecializedUtils()
	}

	private generateLookupMaps(bundles: Record<string, PurchaseBundle>): void {
		const standardOnlyBundles: string[] = []
		const ironcowOnlyBundles: string[] = []
		const mooPassBundles: string[] = []
		const accountMooPassBundles: string[] = []
		const cowbellBundles: string[] = []

		for (const [hrid, bundle] of Object.entries(bundles)) {
			if (bundle.isStandardOnly) {
				standardOnlyBundles.push(hrid)
			}
			if (bundle.isIroncowOnly) {
				ironcowOnlyBundles.push(hrid)
			}
			if (bundle.mooPassDays > 0) {
				mooPassBundles.push(hrid)
			}
			if (bundle.isAccountMooPass) {
				accountMooPassBundles.push(hrid)
			}
			if (bundle.quantity > 0 && !bundle.mooPassDays) {
				cowbellBundles.push(hrid)
			}
		}

		this.builder.addConstArray(
			'STANDARD_ONLY_PURCHASE_BUNDLES',
			standardOnlyBundles,
			true,
		)
		this.builder.addConstArray(
			'IRONCOW_ONLY_PURCHASE_BUNDLES',
			ironcowOnlyBundles,
			true,
		)
		this.builder.addConstArray('MOO_PASS_BUNDLES', mooPassBundles, true)
		this.builder.addConstArray(
			'ACCOUNT_MOO_PASS_BUNDLES',
			accountMooPassBundles,
			true,
		)
		this.builder.addConstArray('COWBELL_BUNDLES', cowbellBundles, true)
	}

	private generateSpecializedUtils(): void {
		this.builder.addFunction(
			'getStandardOnlyBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine(
					'return STANDARD_ONLY_PURCHASE_BUNDLES.map(hrid => PURCHASEBUNDLES.get(hrid as PurchaseBundleHrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'getIroncowOnlyBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine(
					'return IRONCOW_ONLY_PURCHASE_BUNDLES.map(hrid => PURCHASEBUNDLES.get(hrid as PurchaseBundleHrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'getMooPassBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine(
					'return MOO_PASS_BUNDLES.map(hrid => PURCHASEBUNDLES.get(hrid as PurchaseBundleHrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'getCowbellBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine(
					'return COWBELL_BUNDLES.map(hrid => PURCHASEBUNDLES.get(hrid as PurchaseBundleHrid)!).filter(Boolean)',
				)
			},
		)

		this.builder.addFunction(
			'getBundlesByPriceRange',
			[
				{ name: 'minCents', type: 'number' },
				{ name: 'maxCents', type: 'number' },
			],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine(
					'return Array.from(PURCHASEBUNDLES.values()).filter(bundle =>',
				)
				writer.writeLine(
					'  bundle.centPrice >= minCents && bundle.centPrice <= maxCents',
				)
				writer.writeLine(')')
			},
		)

		this.builder.addFunction(
			'sortPurchaseBundlesByIndex',
			[{ name: 'bundles', type: 'PurchaseBundle[]' }],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine(
					'return [...bundles].sort((a, b) => a.sortIndex - b.sortIndex)',
				)
			},
		)

		this.builder.addFunction(
			'getBundleValuePerDollar',
			[{ name: 'bundleHrid', type: 'PurchaseBundleHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const bundle = PURCHASEBUNDLES.get(bundleHrid)')
				writer.writeLine('if (!bundle || bundle.centPrice === 0) return 0')
				writer.writeLine('return bundle.quantity / (bundle.centPrice / 100)')
			},
		)
	}
}
