// eslint.config.mjs
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
	{
		files: ['src/**/*.{ts,tsx}', 'test/**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: typescriptParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				project: './tsconfig.json' // tsconfig.json 경로 추가
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				module: 'readonly',
				require: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
			prettier: prettier,
			react: react,
			'react-hooks': reactHooks
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			...typescriptPlugin.configs['recommended'].rules,
			...typescriptPlugin.configs['eslint-recommended'].rules,
			...react.configs.recommended.rules,
			'@typescript-eslint/no-duplicate-enum-values': 'off', // 이 규칙 비활성화
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					semi: false,
					useTabs: true,
					tabWidth: 2,
					printWidth: 100,
					trailingComma: 'none'
				}
			],
			// TypeScript 관련 규칙
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-unused-vars': ['warn'],
			'@typescript-eslint/no-explicit-any': 'off',

			// React 관련 규칙
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/display-name': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react/jsx-key': 'off',
			'react/jsx-uses-react': 'off',

			// ESLint와 Prettier의 충돌 방지
			quotes: 'off',
			semi: 'off',
			'arrow-body-style': 'off',
			'prefer-arrow-callback': 'off',
			'no-mixed-operators': 'off',
			'no-multiple-empty-lines': 'off',
			'no-extra-semi': 'off',
			'no-floating-decimal': 'off',
			'space-before-function-paren': 'off',
			'comma-dangle': 'off'
		},
		ignores: ['**/node_modules/**', '**/dist/**', 'vite.config.ts']
	}
]
