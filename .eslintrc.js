// @ts-check

/** @type {import('eslint').ESLint.Options['baseConfig']} */
module.exports = {
  // root: true,
  extends: ['ts-standard-next'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
  },
}
