/**
 * Enhanced generator configuration supporting hooks and templates
 * @see ARCHITECTURE.md for full documentation
 */
export interface GeneratorConfig {
	// === REQUIRED CORE SETTINGS ===
	/** Singular entity name (e.g., "Action") */
	entityName: string
	/** Plural entity name (e.g., "Actions") */
	entityNamePlural: string
	/** Key in source data file to extract entities from */
	sourceKey: string
	/** Output path for the generated module */
	outputPath: string

	// === FEATURE FLAGS (all default to true) ===
	/** Generate HRID constants array (default: true, false for PlayerData) */
	generateHrids?: boolean
	/** Generate data collection (default: true, false for singletons) */
	generateCollection?: boolean
	/** Generate constant arrays (default: true) */
	generateConstants?: boolean
	/** Generate utility functions (default: true) */
	generateUtils?: boolean
	/** Generate lookup tables (default: true) */
	generateLookups?: boolean
	/** Apply data cleaning (null to undefined conversion, etc.) (default: true) */
	applyDataCleaning?: boolean

	// === CUSTOMIZATION OPTIONS ===
	/** Additional interfaces to generate beyond the main entity interface */
	interfaces?: InterfaceConfig[]
	/** Shared types to import from the sharedtypes module */
	sharedTypes?: string[]
	/** Category filters for auto-generating constant arrays */
	categoryFilters?: CategoryFilter[]
	/** Standard utility templates to include */
	utilityTemplates?: UtilityTemplate[]
	/** Additional custom utility functions */
	customUtilities?: UtilityConfig[]
}

export interface GeneratorContext {
	sourcePath: string
	outputBasePath: string
	prettierConfig?: any
}

export interface EntityExtractor<T> {
	extract(sourceData: any): Record<string, T>
	clean(data: any): T
}

export interface TypeCollector {
	collectTypes(entity: any): void
	getCollectedTypes(): Record<string, Set<string>>
}

export interface PropertyDefinition {
	name: string
	type: string
	optional?: boolean
	description?: string
}

export type PartialRecord<K extends string | number | symbol, V> = Partial<
	Record<K, V>
>

// ============================================================================
// HOOK SYSTEM AND TEMPLATE TYPES
// ============================================================================

/**
 * Configuration for additional interfaces to generate
 */
export interface InterfaceConfig {
	/** Name of the interface */
	name: string
	/** Properties to include in the interface */
	properties: PropertyDefinition[]
	/** Optional description for JSDoc */
	description?: string
	/** Whether to export this interface */
	export?: boolean
}

/**
 * Configuration for category-based constant array generation
 */
export interface CategoryFilter {
	/** Name of the constant array (e.g., "COMBAT_ACTIONS") */
	name: string
	/** Field to check for the filter condition */
	field?: string
	/** Value to match (for equality checks) */
	value?: any
	/** Whether the field must exist (for existence checks) */
	exists?: boolean
	/** Custom condition function */
	condition?: (entity: any) => boolean
	/** Description for JSDoc */
	description?: string
}

/**
 * Configuration for utility function templates
 */
export interface UtilityTemplate {
	/** Type of utility template to generate */
	type: 'getByField' | 'getAllWith' | 'sortBy' | 'filterBy' | 'toMap'
	/** Field name to operate on (for field-based templates) */
	field?: string
	/** Custom condition for filtering */
	condition?: string
	/** Additional configuration */
	config?: Record<string, any>
}

/**
 * Configuration for custom utility functions
 */
export interface UtilityConfig {
	/** Function name */
	name: string
	/** Function parameters */
	parameters: Array<{ name: string; type: string }>
	/** Return type */
	returnType: string
	/** Function body implementation */
	implementation: (writer: any) => void
	/** JSDoc description */
	description?: string
	/** JSDoc examples */
	examples?: string[]
	/** Required imports for this function */
	imports?: ImportConfig[]
}

/**
 * Import configuration for functions
 */
export interface ImportConfig {
	/** Module to import from */
	from: string
	/** Names to import */
	names: string[]
	/** Whether these are type imports */
	isType?: boolean
}

// ============================================================================
// HOOK SYSTEM INTERFACES
// ============================================================================

/**
 * Interface definition for hook system
 */
export interface InterfaceDefinition {
	name: string
	properties: PropertyDefinition[]
	description?: string
	extends?: string[]
	generics?: string[]
}

/**
 * Constant definition for hook system
 */
export interface ConstantDefinition {
	name: string
	value: any
	type?: string
	asConst?: boolean
	description?: string
}

/**
 * Lookup definition for hook system
 */
export interface LookupDefinition {
	name: string
	keyType: string
	valueType: string
	data: Record<string, any>
	isPartial?: boolean
	description?: string
}

/**
 * Utility definition for hook system
 */
export interface UtilityDefinition {
	name: string
	parameters: Array<{ name: string; type: string }>
	returnType: string
	implementation: (writer: any) => void
	imports?: ImportConfig[]
	jsDoc?: {
		description?: string
		params?: Array<{ name: string; description: string }>
		returns?: string
		examples?: string[]
	}
}
