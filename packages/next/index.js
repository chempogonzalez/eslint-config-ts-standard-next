// @ts-check

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}

const { ERROR } = RULES




module.exports = {
  extends: ['next', '@chempo/eslint-config-ts'],
  // TODO: review why package.json is affected with this order
  // extends: ['@chempo/eslint-config-ts', 'next'],
  rules: {
    'react/no-unknown-property': [ERROR],
    'react/no-unsafe': [ERROR],
  },
}
