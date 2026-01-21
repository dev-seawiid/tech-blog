// @ts-nocheck
import { FlatCompat } from '@eslint/eslintrc'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettierPlugin from 'eslint-plugin-prettier'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // 1. Next.js 설정을 직접 import (순환 참조 방지)
  ...(Array.isArray(nextCoreWebVitals) ? nextCoreWebVitals : [nextCoreWebVitals]),

  // 2. Prettier 통합 (플러그인 포함)
  ...compat.extends('plugin:prettier/recommended'),

  // 3. 추가적인 프로젝트 설정
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier 통합 (이미 plugin:prettier/recommended에 포함되어 있지만 명시적으로 설정)
      'prettier/prettier': 'error',

      // React 규칙
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // jsx-a11y 커스텀 규칙 (Next.js Link 컴포넌트 지원)
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],

      // TypeScript 규칙
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
    // 린트 제외 대상
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'dist/**', '**/next-env.d.ts'],
  },
]

export default config
