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

    'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce', 'ternary'] }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],


    'react/jsx-curly-spacing': ['error', 'never'],

    'react/jsx-curly-newline': ['error', 'consistent'],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-closing-tag-location': ['error'],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-max-props-per-line': ['error', { maximum: { single: 4, multi: 1 } }],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    // 'react/jsx-sort-props': [
    //   'error',
    //   { callbacksLast: true, shorthandFirst: true, shorthandLast: false, ignoreCase: true, noSortAlphabetically: false, reservedFirst: true },
    // ],
  },
}
