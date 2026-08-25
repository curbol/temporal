const globals = require('globals');

module.exports = [
  {
    files: ['scripts/**/*.js', 'ergogen/footprints/**/*.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: globals.node
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'all' }],
      'no-undef': 'error'
    }
  }
];
