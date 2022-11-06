// @ts-check

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}



const { OFF, WARNING, ERROR } = RULES

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

  'no-unused-vars': OFF,
  '@typescript-eslint/no-unused-vars': [
    ERROR,
    {
      args: 'none',
      ignoreRestSiblings: true,
      caughtErrors: 'none',
    },
  ],

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

  'tsdoc/syntax': WARNING,
}




module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'standard-with-typescript',
    '@chempo/eslint-config-base',
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
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
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
  rules: {
    ...TYPESCRIPT_RULES,
  },
  // rules: {
  //   // 'import/named': 'off',

  //   ...TYPESCRIPT_RULES,
  //   '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
  //   '@typescript-eslint/naming-convention': [
  //     ERROR,
  //     {
  //       selector: 'variableLike',
  //       leadingUnderscore: 'forbid',
  //       trailingUnderscore: 'forbid',
  //       format: ['camelCase', 'PascalCase', 'UPPER_CASE']
  //     },
  //     {
  //       selector: 'typeLike',
  //       leadingUnderscore: 'forbid',
  //       trailingUnderscore: 'forbid',
  //       format: ['PascalCase']
  //     }
  //   ],

  //   '@typescript-eslint/no-explicit-any': OFF

  // // Override JS
  // 'no-useless-constructor': 'off',

  // 'no-unused-vars': 'off',
  // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  // 'no-redeclare': 'off',
  // '@typescript-eslint/no-redeclare': 'error',
  // 'no-use-before-define': 'off',
  // '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
  // 'brace-style': 'off',
  // '@typescript-eslint/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],

  // 'object-curly-spacing': 'off',
  // '@typescript-eslint/object-curly-spacing': ['error', 'always'],
  // 'semi': 'off',
  // '@typescript-eslint/semi': ['error', 'never'],
  // 'quotes': 'off',
  // '@typescript-eslint/quotes': ['error', 'single'],
  // 'space-before-blocks': 'off',
  // '@typescript-eslint/space-before-blocks': ['error', 'always'],
  // 'space-before-function-paren': 'off',
  // '@typescript-eslint/space-before-function-paren': [
  //   'error',
  //   {
  //     anonymous: 'always',
  //     named: 'never',
  //     asyncArrow: 'always',
  //   },
  // ],
  // 'space-infix-ops': 'off',
  // '@typescript-eslint/space-infix-ops': 'error',
  // 'keyword-spacing': 'off',
  // '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],
  // 'comma-spacing': 'off',
  // '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
  // 'no-extra-parens': 'off',
  // '@typescript-eslint/no-extra-parens': ['error', 'functions'],
  // 'no-dupe-class-members': 'off',
  // '@typescript-eslint/no-dupe-class-members': 'error',
  // 'no-loss-of-precision': 'off',
  // '@typescript-eslint/no-loss-of-precision': 'error',
  // 'lines-between-class-members': 'off',
  // '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

  // }
}
