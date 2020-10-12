module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    AMap: true,
    process: true,
    module: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  // extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  extends: [
    // 'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'default-case': 'error',
    // 禁止扩展原生属性
    'no-extend-native': 'error',
    // 禁止在变量未声明之前使用
    'no-use-before-define': 'error',
    // 变量定义但被使用
    'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
  },
}

/*
配置eslint-plgin-prettier选项

'prettier/prettier': 0,
'prettier/prettier': [
	'error',
	{
		singleQuote: true,
		trailingComma: 'es5',
		endOfLine: 'auto',
		bracketSpacing: true,
		semi: false,
	},
],
'prettier/prettier/no-unused-vars': 2,
*/