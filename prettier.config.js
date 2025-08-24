//  @ts-check

/** @type {import('prettier').Config} */
const config = {
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	tabWidth: 2,
	useTabs: true,
	quoteProps: 'consistent',
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'(.*?)(?<![-/])(ts-morph)(.*?)',
		'',
		'<BUILTIN_MODULES>',
		'',
		'<THIRD_PARTY_MODULES>',
		'',
		'^[.][.][/]',
		'',
		'^[.][/]',
		'',
		'<TYPES>',
	],
	importOrderParserPlugins: [
		'typescript',
		'classProperties',
		'decorators-legacy',
		'jsx',
	],
}

export default config
