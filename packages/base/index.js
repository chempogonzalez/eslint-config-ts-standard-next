const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}


const { OFF, WARNING, ERROR } = RULES

const COMMON_RULES = {
  // Enforce new wide screens length
  'max-len': [ERROR, { code: 160, tabWidth: 2, ignoreStrings: true }],
  // Enforce to have the operator before the code to make it more readable in a left-to-right read
  'operator-linebreak': [ERROR, 'before', { overrides: { '=': 'after' } }],
  // warning instead of error because await in return could provide more information on errors but avoid to use it
  'no-return-await': WARNING,
  // ensure file diffs in commits are properly set and just mark the change and not the line before because of a new comma added
  'comma-dangle': [ERROR, 'always-multiline'],

  'comma-spacing': [ERROR, { before: false, after: true }],
  // Allow to separate things in blocks to make code more readable for code in the middle of the file
  'no-multiple-empty-lines': [ERROR, { max: 8, maxBOF: 1, maxEOF: 0 }],
  // Not allow underscore variables because you don't need it and in case you need a private one in classes, you can use "#"
  'no-underscore-dangle': [ERROR, { allowFunctionParams: false }],
  // Ensure code after imports is separated so you have a quick overview of the starting line of the actual code
  'import/newline-after-import': ['error', { count: 3 }],
  // TODO document why
  'prefer-template': ERROR,
  // Mark as error console.logs in production mode
  'no-console': [
    process.env.NODE_ENV === 'production' ? ERROR : WARNING,
    {
      allow: ['warn', 'error'],
    },
  ],
  // Order the imports separated with a blank line between blocks to make them more readable
  'import/order': [
    ERROR,
    {
      'newlines-between': 'always',
      'alphabetize': { order: 'asc', caseInsensitive: true },
      'warnOnUnassignedImports': false,
      'groups': [
        ['builtin', 'external'],
        ['internal'],
        ['parent', 'sibling'],
        ['index'],
        ['object'],
        ['type'],
      ],
    },
  ],

  // Array definition formatting
  'array-element-newline': [ERROR, 'consistent'],

  'array-bracket-newline': [ERROR, { multiline: true, minItems: null }],

  'array-bracket-spacing': [ERROR, 'never', { arraysInArrays: true }],

  'import-newlines/enforce': [
    'error',
    {
      'max-len': 160,
      'semi': false,
    },
  ],

  'dot-notation': [ERROR, { allowKeywords: true }],

  'indent': [
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
      ],
      offsetTernaryExpressions: true,
    },
  ],

  'keyword-spacing': [ERROR, { before: true, after: true }],
  'lines-between-class-members': [ERROR, 'always', { exceptAfterSingleLine: true }],
  'no-array-constructor': ERROR,
  'no-dupe-class-members': ERROR,
  'no-extra-parens': [ERROR, 'functions'],
  'no-loss-of-precision': ERROR,
  'no-redeclare': ['error', { builtinGlobals: false }],
  'no-throw-literal': ERROR,
  'no-unused-expressions': [
    ERROR,
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    },
  ],
  'no-useless-constructor': ERROR,
  'object-curly-spacing': [ERROR, 'always'],
  'semi': [ERROR, 'never'],
  'space-before-blocks': [ERROR, 'always'],
  'space-before-function-paren': [ERROR, 'always'],
  'space-infix-ops': ERROR,
}

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  reportUnusedDisableDirectives: true,
  extends: [
    'standard',
    'plugin:import/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
  ],
  ignorePatterns: [
    '*.min.*',
    '*.d.ts',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],
  plugins: ['html', 'unicorn', 'import-newlines'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx'],
      },
    },
  },
  overrides: [

    // JSON FILES ----------------------------------------------------
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/array-bracket-spacing': [ERROR, 'always'],
        'jsonc/comma-dangle': [ERROR, 'never'],
        'jsonc/comma-style': [ERROR, 'last'],
        'jsonc/indent': [ERROR, 2],
        'jsonc/key-spacing': [ERROR, { beforeColon: false, afterColon: true }],
        'jsonc/no-octal-escape': ERROR,
        'jsonc/object-curly-newline': [ERROR, { multiline: true, consistent: true }],
        'jsonc/object-curly-spacing': [ERROR, 'always'],
        'jsonc/object-property-newline': [ERROR, { allowMultiplePropertiesPerLine: true }],
      },
    },

    // YAML -------------------------------------------------------------------
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'spaced-comment': OFF,
        'max-len': [ERROR, { code: 200, tabWidth: 2 }],
      },
    },

    // PACKAGE.JSON -----------------------------------------------------------
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          ERROR,
          {
            pathPattern: '^$',
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^exports.*$',
            order: ['types', 'require', 'import'],
          },
        ],
      },
    },

    // TYPESCRIPT DECLARATIONS ------------------------------------------------
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': OFF,
      },
    },

    // JAVASCRIPT ---------------------------------------------------------------
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': OFF,
      },
    },

    // SCRIPTS OR CLI FILES -----------------------------------------------------
    {
      files: ['scripts/**/*.*', 'cli.*'],
      rules: {
        'no-console': OFF,
      },
    },

    // TESTS FILES ---------------------------------------------------------------
    {
      files: [
        '*.test.ts',
        '*.test.js',
        '*.spec.ts',
        '*.spec.js',
      ],
      rules: {
        'no-unused-expressions': OFF,
      },
    },

    {
      // Code blocks in markdown file
      files: ['**/*.md/*.*'],
      rules: {
        '@typescript-eslint/no-redeclare': OFF,
        '@typescript-eslint/no-unused-vars': OFF,
        '@typescript-eslint/no-use-before-define': OFF,
        '@typescript-eslint/no-var-requires': OFF,
        '@typescript-eslint/comma-dangle': OFF,
        'import/no-unresolved': OFF,
        'no-alert': OFF,
        'no-console': OFF,
        'no-restricted-imports': OFF,
        'no-undef': OFF,
        'no-unused-expressions': OFF,
        'no-unused-vars': OFF,
      },
    },
  ],
  rules: {
    ...COMMON_RULES,

    // import
    'import/no-mutable-exports': ERROR,
    'import/no-unresolved': OFF,
    // 'import/no-absolute-path': OFF,

    // Common
    'curly': [ERROR, 'multi-or-nest', 'consistent'],
    'quotes': [ERROR, 'single'],
    'quote-props': [ERROR, 'consistent-as-needed'],
    'no-unused-vars': [
      ERROR,
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        caughtErrors: 'none',
      },
    ],

    'func-call-spacing': [ERROR, 'never'],

    'brace-style': [ERROR, '1tbs', { allowSingleLine: true }],

    'no-cond-assign': [ERROR, 'always'],

    // es6
    'no-var': ERROR,
    'prefer-const': [ERROR, { destructuring: 'any' }],

    'object-shorthand': [
      ERROR,
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],

    'prefer-exponentiation-operator': ERROR,
    'prefer-rest-params': ERROR,

    // 'prefer-spread': ERROR,
    'prefer-template': ERROR,

    'arrow-parens': [ERROR, 'as-needed', { requireForBlockBody: true }],

    // best-practice
    'array-callback-return': [
      'error',
      {
        allowImplicit: false,
        checkForEach: true,
      },
    ],

    'block-scoped-var': ERROR,

    'consistent-return': OFF,
    'complexity': [OFF, 11],

    'no-alert': 'warn',

    'vars-on-top': ERROR,
    'require-await': OFF,

    'no-return-assign': OFF,

    // unicorns
    // Pass error message when throwing errors
    'unicorn/error-message': ERROR,
    // Uppercase regex escapes
    'unicorn/escape-case': ERROR,
    // Array.isArray instead of instanceof
    'unicorn/no-instanceof-array': ERROR,
    // Prevent deprecated `new Buffer()`
    'unicorn/no-new-buffer': ERROR,
    // Keep regex literals safe!
    'unicorn/no-unsafe-regex': OFF,
    // Lowercase number formatting for octal, hex, binary (0x1ERROR instead of 0X1ERROR)
    'unicorn/number-literal-case': ERROR,
    // includes over indexOf when checking for existence
    'unicorn/prefer-includes': ERROR,
    // String methods startsWith/endsWith instead of more complicated stuff
    'unicorn/prefer-string-starts-ends-with': ERROR,
    // textContent instead of innerText
    'unicorn/prefer-text-content': ERROR,
    // Enforce throwing type error when throwing error while checking typeof
    'unicorn/prefer-type-error': ERROR,
    // Use new when throwing error
    'unicorn/throw-new-error': ERROR,

    'eslint-comments/disable-enable-pair': 'off',

    'import/no-named-as-default-member': ERROR,
    'import/no-named-as-default': OFF,
    'import/namespace': OFF,
    'n/no-callback-literal': OFF,

    // yml
    'yml/quotes': [ERROR, { prefer: 'single', avoidEscape: false }],
    'yml/no-empty-document': OFF,

  },
}
