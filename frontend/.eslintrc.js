module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off', // Désactiver prop-types car nous utilisons TypeScript
    'react/react-in-jsx-scope': 'off', // React 17+ n'a pas besoin d'importer React
    'no-unused-vars': 'off', // Désactivé en faveur de la règle TypeScript
    'react/no-unescaped-entities': 'off', // Permettre les apostrophes non échappées
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_'
    }],
    'no-undef': 'off', // TypeScript gère déjà cela
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['build/', 'node_modules/', '*.config.js', 'e2e/'],
}; 