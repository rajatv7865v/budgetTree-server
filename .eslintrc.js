// eslint.config.js
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

// Compatibility helper for migrating from .eslintrc files.
const compat = new FlatCompat({
  baseDirectory: __dirname, // Adjust to the directory where your package.json is
  resolvePluginsRelativeTo: __dirname,
});

export default [
  // Define base configurations like 'eslint:recommended'
  js.configs.recommended,

  // Apply compatibility with the .eslintrc format
  ...compat.config({
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
      // Add your rules here
      'no-console': 'warn',
      semi: ['error', 'always'],
    },
  }),
];
