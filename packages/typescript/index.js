// @ts-check
const baseConfig = require('@chempo/eslint-config-base/index.js')



const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}

const { OFF, WARNING, ERROR } = RULES

const equivalents = [
  'comma-spacing',
  'dot-notation',
  'brace-style',
  'func-call-spacing',
  'indent',
  'keyword-spacing',
  'lines-between-class-members',
  'no-array-constructor',
  'no-dupe-class-members',
  'no-extra-parens',
  'no-loss-of-precision',
  'no-redeclare',
  'no-throw-literal',
  'no-unused-vars',
  'no-unused-expressions',
  'no-useless-constructor',
  'object-curly-spacing',
  'quotes',
  'semi',
  'space-before-blocks',
  'space-before-function-paren',
  'space-infix-ops',
]

function ruleFromBase (name) {
  if (baseConfig.rules === undefined) throw new Error('Base rules are undefined!')
  const rule = baseConfig.rules[name]

  if (rule === undefined) throw new Error(`Rule ${rule} not found in base rules`)

  if (typeof rule !== 'object') return rule

  return JSON.parse(JSON.stringify(rule))
}

function fromEntries (iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}

const TYPESCRIPT_RULES = {
  // To allow checks for types which are string | null and use if (variable). It's simpler
  '@typescript-eslint/strict-boolean-expressions': OFF,
  // Allow only class with statics to allow to define a factory pattern
  '@typescript-eslint/no-extraneous-class': [ERROR, { allowStaticOnly: true }],
  // Array-type to be Array<Type> because reading from left to right is easier to identify if it's an array or not
  '@typescript-eslint/array-type': [ERROR, { default: 'generic', readonly: 'generic' }],

  // Simplify code blocks where typescript mark as possible null or undefined and you are sure that it's not a falsy variable
  '@typescript-eslint/no-non-null-assertion': OFF,
  // warning to enhance to type all functions in order to have a better understanding when they are collapsed but not forcing always to have one
  '@typescript-eslint/explicit-function-return-type': WARNING,

  // Enforce to use import type { Type } when it's a type and not a value to distinguish properly the imports
  '@typescript-eslint/consistent-type-imports': [ERROR, { prefer: 'type-imports', disallowTypeAnnotations: true }],

  '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],

  '@typescript-eslint/no-explicit-any': OFF,

  'indent': OFF,
  '@typescript-eslint/indent': [
    ERROR,
    2,
    {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false,
      ignoredNodes: [
        'TemplateLiteral *',
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXExpressionContainer',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild',
        'TSTypeParameterInstantiation',
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],
      offsetTernaryExpressions: true,
    },
  ],

  'comma-dangle': OFF,
  '@typescript-eslint/comma-dangle': [ERROR, 'always-multiline'],

  // It causes bad performance
  '@typescript-eslint/no-misused-promises': OFF,

  'tsdoc/syntax': WARNING,
}

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    '@chempo/eslint-config-base',
    'standard-with-typescript',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.mjs',
          '.d.ts',
        ],
      },
    },
  },
  ignorePatterns: ['!*.d.ts'],
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  rules: {
    // Re add custom changes on standard base rules due to standard-with-typescript override
    ...baseConfig.rules,

    '@typescript-eslint/no-redeclare': ERROR,

    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [ERROR, { functions: false, classes: false, variables: true, enums: false, typedefs: false }],

    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      {
        args: 'none',
        ignoreRestSiblings: true,
        caughtErrors: 'none',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
      rules: {
        // Setting OFF eslint base rules which has equivalents in typescript-eslint
        ...fromEntries(equivalents.map(name => [name, 'off'])),
        ...fromEntries(equivalents.map(name => [`@typescript-eslint/${name}`, ruleFromBase(name)])),

        ...TYPESCRIPT_RULES,

        'import/named': OFF,

        // Needs overwrite to ensure typescript-eslint is who manage the rule properly
        'no-return-await': OFF,
        // warning instead of error because await in return could provide more information on errors but avoid to use it
        '@typescript-eslint/return-await': [WARNING, 'never'],
        // There are some cases where you don't prefer to use nullish coalescing but you should avoid it. That's because it's marked as warning
        '@typescript-eslint/prefer-nullish-coalescing': WARNING,
        // TODO comment why
        '@typescript-eslint/restrict-plus-operands': ERROR,

        '@typescript-eslint/naming-convention': [
          ERROR,
          {
            selector: 'variableLike',
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'variableLike',
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
            modifiers: ['unused'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'typeLike',
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
            format: ['PascalCase'],
          },

        ],
      },
    },
  ],
}
