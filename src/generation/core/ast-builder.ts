import {
	CodeBlockWriter,
	InterfaceDeclaration,
	ModuleKind,
	Project,
	ScriptTarget,
	SourceFile,
	VariableDeclarationKind,
} from 'ts-morph'

export interface PropertyDefinition {
	name: string
	type: string
	optional?: boolean
	description?: string
}

export interface FunctionParameter {
	name: string
	type: string
	default?: string | number | boolean
}

export class ASTBuilder {
	private project: Project
	private sourceFile: SourceFile

	constructor(private filePath: string) {
		this.project = new Project({
			compilerOptions: {
				target: ScriptTarget.ES2022,
				module: ModuleKind.ESNext,
				strict: true,
				skipLibCheck: true,
			},
		})
		this.sourceFile = this.project.createSourceFile(filePath, '', {
			overwrite: true,
		})
	}

	/**
	 * Adds an import declaration to the source file
	 *
	 * @param moduleSpecifier - The module specifier to import from
	 * @param namedImports - The named imports to add
	 * @param isTypeOnly - Whether the import is type-only
	 * @returns The AST builder instance
	 */
	addImport(
		moduleSpecifier: string,
		namedImports: string[],
		isTypeOnly = false,
	) {
		// For type-only imports, check if we need a separate import statement
		if (isTypeOnly) {
			// Look for existing type-only import
			const existingTypeImport = this.sourceFile
				.getImportDeclarations()
				.find(
					(imp) =>
						imp.getModuleSpecifierValue() === moduleSpecifier &&
						imp.isTypeOnly(),
				)

			if (existingTypeImport) {
				const imports = existingTypeImport
					.getNamedImports()
					.map((i) => i.getName())
				const newImports = namedImports.filter((i) => !imports.includes(i))
				newImports.forEach((name) => existingTypeImport.addNamedImport(name))
			} else {
				// Add new type-only import
				this.sourceFile.addImportDeclaration({
					moduleSpecifier,
					namedImports,
					isTypeOnly: true,
				})
			}
		} else {
			// Handle regular (non-type) imports
			const existingValueImport = this.sourceFile
				.getImportDeclarations()
				.find(
					(imp) =>
						imp.getModuleSpecifierValue() === moduleSpecifier &&
						!imp.isTypeOnly(),
				)

			if (existingValueImport) {
				const imports = existingValueImport
					.getNamedImports()
					.map((i) => i.getName())
				const newImports = namedImports.filter((i) => !imports.includes(i))
				newImports.forEach((name) => existingValueImport.addNamedImport(name))
			} else {
				// Add new value import
				this.sourceFile.addImportDeclaration({
					moduleSpecifier,
					namedImports,
					isTypeOnly: false,
				})
			}
		}
		return this
	}

	/**
	 * Adds mixed imports (both value and type) from the same module
	 *
	 * @param moduleSpecifier - The module specifier to import from
	 * @param valueImports - The value imports to add
	 * @param typeImports - The type-only imports to add
	 * @returns The AST builder instance
	 */
	addMixedImport(
		moduleSpecifier: string,
		valueImports: string[],
		typeImports: string[],
	) {
		if (valueImports.length > 0) {
			this.addImport(moduleSpecifier, valueImports, false)
		}
		if (typeImports.length > 0) {
			this.addImport(moduleSpecifier, typeImports, true)
		}
		return this
	}

	/**
	 * Adds an interface declaration to the source file
	 *
	 * @param name - The name of the interface
	 * @param properties - The properties of the interface
	 * @returns The interface declaration
	 */
	addInterface(
		name: string,
		properties: PropertyDefinition[],
	): InterfaceDeclaration {
		return this.sourceFile.addInterface({
			name,
			isExported: true,
			properties: properties.map((prop) => ({
				name: prop.name,
				type: prop.type,
				hasQuestionToken: prop.optional,
				docs: prop.description ? [prop.description] : undefined,
			})),
		})
	}

	/**
	 * Adds a const array declaration to the source file
	 *
	 * @param name - The name of the array
	 * @param values - The values of the array
	 * @param asConst - Whether the array is const
	 * @returns The AST builder instance
	 */
	addConstArray<T extends string>(name: string, values: T[], asConst = true) {
		this.sourceFile.addVariableStatement({
			isExported: true,
			declarationKind: VariableDeclarationKind.Const,
			declarations: [
				{
					name,
					initializer: (writer) => {
						writer.write('[')
						if (values.length > 0) {
							writer.newLine()
							values.forEach((value, index) => {
								writer.indent(() => {
									writer.write(`'${value}'`)
									if (index < values.length - 1) writer.write(',')
									writer.newLine()
								})
							})
						}
						writer.write(']')
						if (asConst) writer.write(' as const')
					},
				},
			],
		})
		return this
	}

	/**
	 * Adds a type alias declaration to the source file
	 *
	 * @param name - The name of the type alias
	 * @param type - The type definition
	 * @returns The AST builder instance
	 */
	addTypeAlias(name: string, type: string) {
		this.sourceFile.addTypeAlias({
			name,
			isExported: true,
			type,
		})
		return this
	}

	/**
	 * Adds a type alias declaration to the source file from a const array
	 *
	 * @param name - The name of the type alias
	 * @param constName - The name of the const to reference
	 * @returns The AST builder instance
	 */
	addTypeFromConst(name: string, constName: string) {
		return this.addTypeAlias(name, `typeof ${constName}[number]`)
	}

	/**
	 * Adds a const variable declaration to the source file
	 *
	 * @param name - The name of the variable
	 * @param type - The type of the variable
	 * @param initializer - The initializer for the variable (string or object/array)
	 * @returns The AST builder instance
	 */
	addConstVariable(name: string, type: string, initializer: string | any) {
		this.sourceFile.addVariableStatement({
			isExported: true,
			declarationKind: VariableDeclarationKind.Const,
			declarations: [
				{
					name,
					type,
					initializer:
						typeof initializer === 'string'
							? initializer
							: typeof initializer === 'function'
								? initializer
								: (writer) => {
										// Use custom serialization to preserve undefined values
										writer.write(this.serializeValue(initializer, 0))
									},
				},
			],
		})
		return this
	}

	/**
	 * Adds a typed map declaration to the source file
	 *
	 * @param name - The name of the map
	 * @param keyType - The type of the key
	 * @param valueType - The type of the value
	 * @param entries - The entries of the map
	 * @returns The AST builder instance
	 */
	addTypedMap<K extends string, V>(
		name: string,
		keyType: string,
		valueType: string,
		entries: Array<[K, V]>,
	) {
		this.sourceFile.addVariableStatement({
			isExported: true,
			declarationKind: VariableDeclarationKind.Const,
			declarations: [
				{
					name,
					type: `Map<${keyType}, ${valueType}>`,
					initializer: (writer) => {
						writer.write(`new Map<${keyType}, ${valueType}>([`)
						if (entries.length > 0) {
							writer.newLine()

							entries.forEach(([key, value], index) => {
								writer.indent(() => {
									writer.write(`['${key}', `)
									// Use custom serialization to preserve undefined values
									const jsonStr = this.serializeValue(value, 2)
									const lines = jsonStr.split('\n')
									lines.forEach((line, lineIndex) => {
										if (lineIndex > 0) {
											writer.newLine()
											writer.write('  ')
										}
										writer.write(line)
									})
									writer.write(']')
									if (index < entries.length - 1) writer.write(',')
									writer.newLine()
								})
							})
						}
						writer.write('])')
					},
				},
			],
		})
		return this
	}

	/**
	 * Adds a function declaration to the source file
	 *
	 * @param name - The name of the function
	 * @param params - The parameters of the function
	 * @param returnType - The return type of the function
	 * @param body - The body of the function
	 * @returns The AST builder instance
	 */
	addFunction(
		name: string,
		params: FunctionParameter[],
		returnType: string,
		body: (writer: CodeBlockWriter) => void,
	) {
		this.sourceFile.addFunction({
			name,
			isExported: true,
			parameters: params.map((param) => ({
				name: param.name,
				type: param.type,
				initializer:
					param.default !== undefined
						? JSON.stringify(param.default)
						: undefined,
			})),
			returnType,
			statements: (writer) => body(writer),
		})
		return this
	}

	/**
	 * Adds a type guard function declaration to the source file
	 *
	 * @param name - The name of the type guard function
	 * @param paramName - The name of the parameter to check
	 * @param paramType - The type of the parameter to check
	 * @param targetType - The target type to check against
	 * @param checkExpression - The expression to check against
	 * @returns The AST builder instance
	 */
	addTypeGuard(
		name: string,
		paramName: string,
		paramType: string,
		targetType: string,
		checkExpression: string,
	) {
		this.sourceFile.addFunction({
			name,
			isExported: true,
			parameters: [{ name: paramName, type: paramType }],
			returnType: `${paramName} is ${targetType}`,
			statements: (writer) => {
				writer.writeLine(`return ${checkExpression}`)
			},
		})
		return this
	}

	/**
	 * Adds a comment to the source file
	 *
	 * @param text - The text of the comment
	 * @returns The AST builder instance
	 */
	addComment(text: string) {
		this.sourceFile.addStatements(`// ${text}`)
		return this
	}

	/**
	 * Adds a multiline comment to the source file
	 *
	 * @param lines - The lines of the comment
	 * @returns The AST builder instance
	 */
	addMultilineComment(lines: string[]) {
		this.sourceFile.addStatements(
			['/**', ...lines.map((line) => ` * ${line}`), ' */'].join('\n'),
		)
		return this
	}

	/**
	 * Saves the source file to the file system
	 *
	 * @returns The AST builder instance
	 */
	async save() {
		const formatted = await this.formatCode(this.sourceFile.getFullText())
		await Bun.write(this.filePath, formatted)
	}

	/**
	 * Saves the source file to the file system without formatting
	 *
	 * @returns The AST builder instance
	 */
	async saveUnformatted() {
		await Bun.write(this.filePath, this.sourceFile.getFullText())
	}

	/**
	 * Formats the code using prettier
	 *
	 * @param code - The code to format
	 * @returns The formatted code
	 */
	private async formatCode(code: string): Promise<string> {
		try {
			const prettier = await import('prettier')
			const config = (await prettier.resolveConfig(this.filePath)) || {}
			return await prettier.format(code, {
				...config,
				filepath: this.filePath,
				parser: 'typescript',
			})
		} catch (error) {
			console.warn('Failed to format code with prettier:', error)
			return code
		}
	}

	/**
	 * Gets the source file
	 *
	 * @returns The source file
	 */
	getSourceFile() {
		return this.sourceFile
	}

	/**
	 * Serializes a value to a string representation that preserves undefined values
	 * @param value The value to serialize
	 * @param indent The indentation level
	 * @returns The serialized string
	 */
	private serializeValue(value: any, indent = 0): string {
		const indentStr = '  '.repeat(indent)
		const nextIndentStr = '  '.repeat(indent + 1)

		if (value === undefined) {
			return 'undefined'
		}
		if (value === null) {
			return 'null'
		}
		if (typeof value === 'string') {
			return JSON.stringify(value)
		}
		if (typeof value === 'number' || typeof value === 'boolean') {
			return String(value)
		}
		if (Array.isArray(value)) {
			if (value.length === 0) return '[]'
			const items = value.map(
				(item) => `${nextIndentStr}${this.serializeValue(item, indent + 1)}`,
			)
			return `[\n${items.join(',\n')}\n${indentStr}]`
		}
		if (typeof value === 'object') {
			const entries = Object.entries(value)
			if (entries.length === 0) return '{}'
			const props = entries.map(([key, val]) => {
				// Quote keys if they contain special characters or are not valid identifiers
				const needsQuotes = !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
				const quotedKey = needsQuotes ? JSON.stringify(key) : key
				// Include undefined values explicitly
				return `${nextIndentStr}${quotedKey}: ${this.serializeValue(val, indent + 1)}`
			})
			return `{\n${props.join(',\n')}\n${indentStr}}`
		}
		return JSON.stringify(value)
	}
}
