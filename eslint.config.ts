import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    
    ignores: [
      '*.csv',
      '*.md',
      'package.json',
      'package-lock.json',
      '*.png',
      'node_modules/',
      'reports/',
      'traces/',
      '*.env',
      '*.feature',
      '*.sql',
      '*.json',
      '*.log',
      'Dockerfile',
      'compose.yaml',
      'eslint.config.ts'
    ],
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: 'tsconfig.json',
        allowImportingTsExtensions: true,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]);