module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:effector/react',
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react-hooks', 'react', 'import', 'effector'],
  globals: {
    process: true,
  },
  rules: {
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', 'parent', ['sibling', 'index']],
        pathGroups: [
          {
            pattern: 'app/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'pages/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'widgets/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'features/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'entities/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'shared/**',
            group: 'internal',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
          orderImportKind: 'asc',
        },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-useless-constructor': 'off',
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],

    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
   // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }], //should add ".ts" if typescript project
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],

    'effector/enforce-effect-naming-convention': 'error',
    'effector/enforce-gate-naming-convention': 'error',
    'effector/enforce-store-naming-convention': 'error',
    'effector/keep-options-order': 'error',

    "no-unused-vars": "off",
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
}
