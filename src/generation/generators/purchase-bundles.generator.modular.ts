import { ModularBaseGenerator } from '../core/generator.base.modular'

import type { GeneratorConfig } from '../core/types'

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

export class PurchaseBundlesGeneratorModular extends ModularBaseGenerator<PurchaseBundle> {
	constructor() {
		const config: GeneratorConfig = {
			entityName: 'PurchaseBundle',
			entityNamePlural: 'PurchaseBundles',
			sourceKey: 'purchaseBundleDetailMap',
			outputPath: './src/generated/purchasebundles',
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
			const bundleData = this.cleanEntityData(data as any)
			const bundle: PurchaseBundle = {
				hrid: bundleData.hrid || '',
				stripeItemId: bundleData.stripeItemId || '',
				kongregateIdentifier: bundleData.kongregateIdentifier || '',
				steamItemId: typeof bundleData.steamItemId === 'number' ? bundleData.steamItemId : 0,
				name: bundleData.name || '',
				isStandardOnly: bundleData.isStandardOnly === true,
				isIroncowOnly: bundleData.isIroncowOnly === true,
				quantity: typeof bundleData.quantity === 'number' ? bundleData.quantity : 0,
				mooPassDays: typeof bundleData.mooPassDays === 'number' ? bundleData.mooPassDays : 0,
				isAccountMooPass: bundleData.isAccountMooPass === true,
				supporterPoints: typeof bundleData.supporterPoints === 'number' ? bundleData.supporterPoints : 0,
				centPrice: typeof bundleData.centPrice === 'number' ? bundleData.centPrice : 0,
				kredPrice: typeof bundleData.kredPrice === 'number' ? bundleData.kredPrice : 0,
				sortIndex: typeof bundleData.sortIndex === 'number' ? bundleData.sortIndex : 0,
			}
			bundles[hrid] = bundle
		}

		return bundles
	}

	protected override generateTypes(): void {
		const typesBuilder = this.moduleBuilder.getFile('types')

		// Add comment
		typesBuilder.addComment(`
			Type definitions for ${this.config.entityName}
		`)

		// Import constants for type derivation
		typesBuilder.addImport('./constants', ['PURCHASEBUNDLE_HRIDS'], false)

		// Generate type alias
		typesBuilder.addType('PurchaseBundleHrid', 'typeof PURCHASEBUNDLE_HRIDS[number]')

		// Generate interface
		typesBuilder.addInterface('PurchaseBundle', [
			{ name: 'hrid', type: 'PurchaseBundleHrid', optional: false, description: 'Unique identifier for the purchase bundle' },
			{ name: 'stripeItemId', type: 'string', optional: false, description: 'Stripe payment system item identifier' },
			{ name: 'kongregateIdentifier', type: 'string', optional: false, description: 'Kongregate platform item identifier' },
			{ name: 'steamItemId', type: 'number', optional: false, description: 'Steam platform item identifier' },
			{ name: 'name', type: 'string', optional: false, description: 'Display name of the purchase bundle' },
			{ name: 'isStandardOnly', type: 'boolean', optional: false, description: 'Whether this bundle is only available in standard game mode' },
			{ name: 'isIroncowOnly', type: 'boolean', optional: false, description: 'Whether this bundle is only available in ironcow game mode' },
			{ name: 'quantity', type: 'number', optional: false, description: 'Primary item quantity (e.g., cowbells)' },
			{ name: 'mooPassDays', type: 'number', optional: false, description: 'Number of MooPass days included (0 if none)' },
			{ name: 'isAccountMooPass', type: 'boolean', optional: false, description: 'Whether this is an account-wide MooPass' },
			{ name: 'supporterPoints', type: 'number', optional: false, description: 'Supporter points awarded with purchase' },
			{ name: 'centPrice', type: 'number', optional: false, description: 'Price in cents (USD)' },
			{ name: 'kredPrice', type: 'number', optional: false, description: 'Price in Kongregate Kreds' },
			{ name: 'sortIndex', type: 'number', optional: false, description: 'Display sort order' },
		])

		// Export types
		this.moduleBuilder.addExport('types', 'PurchaseBundle', 'type')
		this.moduleBuilder.addExport('types', 'PurchaseBundleHrid', 'type')
	}

	protected override generateConstants(entities: Record<string, PurchaseBundle>): void {
		const constantsBuilder = this.moduleBuilder.getFile('constants')

		// Generate HRIDs
		const hrids = Object.keys(entities).sort()
		constantsBuilder.addConstArray('PURCHASEBUNDLE_HRIDS', hrids, true)
		this.moduleBuilder.addExport('constants', 'PURCHASEBUNDLE_HRIDS', 'const')

		// Generate category arrays
		const standardOnlyBundles: string[] = []
		const ironcowOnlyBundles: string[] = []
		const mooPassBundles: string[] = []
		const accountMooPassBundles: string[] = []
		const cowbellBundles: string[] = []

		for (const [hrid, bundle] of Object.entries(entities)) {
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
			if (bundle.quantity > 0 && bundle.mooPassDays === 0) {
				cowbellBundles.push(hrid)
			}
		}

		constantsBuilder.addConstArray('STANDARD_ONLY_PURCHASE_BUNDLES', standardOnlyBundles, true)
		constantsBuilder.addConstArray('IRONCOW_ONLY_PURCHASE_BUNDLES', ironcowOnlyBundles, true)
		constantsBuilder.addConstArray('MOO_PASS_BUNDLES', mooPassBundles, true)
		constantsBuilder.addConstArray('ACCOUNT_MOO_PASS_BUNDLES', accountMooPassBundles, true)
		constantsBuilder.addConstArray('COWBELL_BUNDLES', cowbellBundles, true)

		// Export all constants
		this.moduleBuilder.addExport('constants', 'STANDARD_ONLY_PURCHASE_BUNDLES', 'const')
		this.moduleBuilder.addExport('constants', 'IRONCOW_ONLY_PURCHASE_BUNDLES', 'const')
		this.moduleBuilder.addExport('constants', 'MOO_PASS_BUNDLES', 'const')
		this.moduleBuilder.addExport('constants', 'ACCOUNT_MOO_PASS_BUNDLES', 'const')
		this.moduleBuilder.addExport('constants', 'COWBELL_BUNDLES', 'const')
	}

	protected override generateLookups(entities: Record<string, PurchaseBundle>): void {
		const lookupsBuilder = this.moduleBuilder.getFile('lookups')

		// Import types
		lookupsBuilder.addImport('./types', ['PurchaseBundleHrid'], true)

		// Bundles by price ranges
		const bundlesByPriceRange = {
			under5: [] as string[],
			under10: [] as string[],
			under20: [] as string[],
			under50: [] as string[],
			over50: [] as string[],
		}

		// Bundles by supporter points
		const bundlesBySupporterPoints: Record<number, string[]> = {}

		for (const [hrid, bundle] of Object.entries(entities)) {
			// Price range categorization
			const priceInDollars = bundle.centPrice / 100
			if (priceInDollars < 5) bundlesByPriceRange.under5.push(hrid)
			else if (priceInDollars < 10) bundlesByPriceRange.under10.push(hrid)
			else if (priceInDollars < 20) bundlesByPriceRange.under20.push(hrid)
			else if (priceInDollars < 50) bundlesByPriceRange.under50.push(hrid)
			else bundlesByPriceRange.over50.push(hrid)

			// Supporter points grouping
			if (bundle.supporterPoints > 0) {
				if (!bundlesBySupporterPoints[bundle.supporterPoints]) {
					bundlesBySupporterPoints[bundle.supporterPoints] = []
				}
				bundlesBySupporterPoints[bundle.supporterPoints]!.push(hrid)
			}
		}

		// Export price range lookups
		lookupsBuilder.addStaticLookup(
			'BUNDLES_BY_PRICE_RANGE',
			'string',
			'readonly PurchaseBundleHrid[]',
			bundlesByPriceRange,
			false
		)
		this.moduleBuilder.addExport('lookups', 'BUNDLES_BY_PRICE_RANGE', 'const')

		// Export supporter points lookups
		lookupsBuilder.addStaticLookup(
			'BUNDLES_BY_SUPPORTER_POINTS',
			'number',
			'readonly PurchaseBundleHrid[]',
			bundlesBySupporterPoints,
			true
		)
		this.moduleBuilder.addExport('lookups', 'BUNDLES_BY_SUPPORTER_POINTS', 'const')

		// Bundles sorted by index
		const sortedByIndex = Object.values(entities)
			.sort((a, b) => a.sortIndex - b.sortIndex)
			.map(bundle => bundle.hrid)

		lookupsBuilder.addConstArray('BUNDLES_BY_SORT_INDEX', sortedByIndex, true)
		this.moduleBuilder.addExport('lookups', 'BUNDLES_BY_SORT_INDEX', 'const')
	}

	protected override generateUtilities(entities: Record<string, PurchaseBundle>): void {
		// Call parent implementation for basic utilities
		super.generateUtilities(entities)
		
		const utilsBuilder = this.moduleBuilder.getFile('utils')

		// Import additional dependencies
		utilsBuilder.addImport('./types', ['PurchaseBundle', 'PurchaseBundleHrid'], true)
		utilsBuilder.addImport('./data', ['getPurchaseBundlesMap'], false)
		utilsBuilder.addImport('./constants', [
			'STANDARD_ONLY_PURCHASE_BUNDLES',
			'IRONCOW_ONLY_PURCHASE_BUNDLES',
			'MOO_PASS_BUNDLES',
			'ACCOUNT_MOO_PASS_BUNDLES',
			'COWBELL_BUNDLES'
		], false)
		utilsBuilder.addImport('./lookups', [
			'BUNDLES_BY_PRICE_RANGE',
			'BUNDLES_BY_SUPPORTER_POINTS',
			'BUNDLES_BY_SORT_INDEX'
		], false)

		// Specialized getters
		utilsBuilder.addFunction(
			'getStandardOnlyBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('return STANDARD_ONLY_PURCHASE_BUNDLES.map(hrid => getPurchaseBundlesMap().get(hrid as PurchaseBundleHrid)!).filter(Boolean)')
			}
		)
		this.moduleBuilder.addExport('utils', 'getStandardOnlyBundles')

		utilsBuilder.addFunction(
			'getIroncowOnlyBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('return IRONCOW_ONLY_PURCHASE_BUNDLES.map(hrid => getPurchaseBundlesMap().get(hrid as PurchaseBundleHrid)!).filter(Boolean)')
			}
		)
		this.moduleBuilder.addExport('utils', 'getIroncowOnlyBundles')

		utilsBuilder.addFunction(
			'getMooPassBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('return MOO_PASS_BUNDLES.map(hrid => getPurchaseBundlesMap().get(hrid as PurchaseBundleHrid)!).filter(Boolean)')
			}
		)
		this.moduleBuilder.addExport('utils', 'getMooPassBundles')

		utilsBuilder.addFunction(
			'getCowbellBundles',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('return COWBELL_BUNDLES.map(hrid => getPurchaseBundlesMap().get(hrid as PurchaseBundleHrid)!).filter(Boolean)')
			}
		)
		this.moduleBuilder.addExport('utils', 'getCowbellBundles')

		utilsBuilder.addFunction(
			'getBundlesByPriceRange',
			[
				{ name: 'minCents', type: 'number' },
				{ name: 'maxCents', type: 'number' },
			],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('return Array.from(getPurchaseBundlesMap().values()).filter(bundle =>')
				writer.writeLine('  bundle.centPrice >= minCents && bundle.centPrice <= maxCents')
				writer.writeLine(')')
			}
		)
		this.moduleBuilder.addExport('utils', 'getBundlesByPriceRange')

		utilsBuilder.addFunction(
			'sortPurchaseBundlesByIndex',
			[{ name: 'bundles', type: 'PurchaseBundle[]' }],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('return [...bundles].sort((a, b) => a.sortIndex - b.sortIndex)')
			}
		)
		this.moduleBuilder.addExport('utils', 'sortPurchaseBundlesByIndex')

		utilsBuilder.addFunction(
			'getPurchaseBundlesSorted',
			[],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('return BUNDLES_BY_SORT_INDEX.map(hrid => getPurchaseBundlesMap().get(hrid as PurchaseBundleHrid)!)')
			}
		)
		this.moduleBuilder.addExport('utils', 'getPurchaseBundlesSorted')

		utilsBuilder.addFunction(
			'getBundleValuePerDollar',
			[{ name: 'bundleHrid', type: 'PurchaseBundleHrid' }],
			'number',
			(writer) => {
				writer.writeLine('const bundle = getPurchaseBundlesMap().get(bundleHrid)')
				writer.writeLine('if (!bundle || bundle.centPrice === 0) return 0')
				writer.writeLine('return bundle.quantity / (bundle.centPrice / 100)')
			}
		)
		this.moduleBuilder.addExport('utils', 'getBundleValuePerDollar')

		utilsBuilder.addFunction(
			'getBundlesBySupporterPoints',
			[{ name: 'points', type: 'number' }],
			'PurchaseBundle[]',
			(writer) => {
				writer.writeLine('const hrids = BUNDLES_BY_SUPPORTER_POINTS[points] || []')
				writer.writeLine('return hrids.map(hrid => getPurchaseBundlesMap().get(hrid)!).filter(Boolean)')
			}
		)
		this.moduleBuilder.addExport('utils', 'getBundlesBySupporterPoints')

		utilsBuilder.addFunction(
			'getTotalCowbellsForPrice',
			[{ name: 'maxCents', type: 'number' }],
			'{ bundles: PurchaseBundle[], totalCowbells: number, totalPrice: number }',
			(writer) => {
				writer.writeLine('const affordableBundles = Array.from(getPurchaseBundlesMap().values())')
				writer.writeLine('  .filter(b => b.centPrice <= maxCents && b.quantity > 0)')
				writer.writeLine('  .sort((a, b) => {')
				writer.writeLine('    // Sort by value per dollar (descending)')
				writer.writeLine('    const valueA = a.quantity / (a.centPrice / 100)')
				writer.writeLine('    const valueB = b.quantity / (b.centPrice / 100)')
				writer.writeLine('    return valueB - valueA')
				writer.writeLine('  })')
				writer.writeLine('')
				writer.writeLine('let remainingBudget = maxCents')
				writer.writeLine('const selectedBundles: PurchaseBundle[] = []')
				writer.writeLine('let totalCowbells = 0')
				writer.writeLine('')
				writer.writeLine('for (const bundle of affordableBundles) {')
				writer.writeLine('  if (bundle.centPrice <= remainingBudget) {')
				writer.writeLine('    selectedBundles.push(bundle)')
				writer.writeLine('    totalCowbells += bundle.quantity')
				writer.writeLine('    remainingBudget -= bundle.centPrice')
				writer.writeLine('  }')
				writer.writeLine('}')
				writer.writeLine('')
				writer.writeLine('return {')
				writer.writeLine('  bundles: selectedBundles,')
				writer.writeLine('  totalCowbells,')
				writer.writeLine('  totalPrice: maxCents - remainingBudget')
				writer.writeLine('}')
			}
		)
		this.moduleBuilder.addExport('utils', 'getTotalCowbellsForPrice')
	}
}