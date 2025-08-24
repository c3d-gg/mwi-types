export interface GeneratorConfig {
	entityName: string
	entityNamePlural: string
	sourceKey: string
	outputPath: string
	generateConstants: boolean
	generateUtils: boolean
	dependencies?: string[]
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
