// @ts-check

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}

const { ERROR } = RULES




module.exports = {
  extends: ['next', '@chempo/eslint-config-ts'],
  rules: {
    'react/no-unknown-property': [ERROR],
    'react/no-unsafe': [ERROR],
  },
}
