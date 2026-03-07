import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      '*.min.js',
      'coverage/',
      '*.log',
      '.DS_Store',
      '.env',
      '.env.local',
      '.env.*.local',
    ],
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
      globals: {
        ...globals.browser,
        console: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        console: 'readonly',
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  prettierConfig,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        console: 'readonly',
      },
    },
  },
];
