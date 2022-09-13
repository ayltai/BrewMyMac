module.exports = {
    env            : {
        es6 : true,
    },
    extends        : [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
    ],
    ignorePatterns : [
        'node_modules/',
        '.eslintrc.js',
        'babel.config.js',
        'config-overrides.js',
    ],
    parser         : '@typescript-eslint/parser',
    parserOptions  : {
        project    : './tsconfig.json',
        sourceType : 'module',
    },
    plugins        : [
        '@typescript-eslint',
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-unicorn',
    ],
    settings       : {
        react : {
            version : 'detect',
        },
    },
    rules          : {
        '@typescript-eslint/adjacent-overload-signatures'   : 'error',
        '@typescript-eslint/array-type'                     : [
            'error',
            {
                'default' : 'array',
            },
        ],
        '@typescript-eslint/ban-types'                      : [
            'error',
            {
                types : {
                    Object   : {
                        message : 'Avoid using the `Object` type. Did you mean `object`?',
                    },
                    Function : {
                        message : 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                    },
                    Boolean  : {
                        message : 'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    },
                    Number   : {
                        message : 'Avoid using the `Number` type. Did you mean `number`?',
                    },
                    String   : {
                        message : 'Avoid using the `String` type. Did you mean `string`?',
                    },
                    Symbol   : {
                        message : 'Avoid using the `Symbol` type. Did you mean `symbol`?',
                    },
                },
            },
        ],
        '@typescript-eslint/ban-ts-comment'                 : 'off',
        '@typescript-eslint/consistent-type-assertions'     : 'error',
        '@typescript-eslint/dot-notation'                   : 'error',
        '@typescript-eslint/explicit-function-return-type'  : 'off',
        '@typescript-eslint/explicit-module-boundary-types' : 'off',
        '@typescript-eslint/indent'                         : [
            'error',
            4,
            {
                ArrayExpression  : 'first',
                ObjectExpression : 'first',
            },
        ],
        '@typescript-eslint/member-delimiter-style'         : [
            'error',
            {
                multiline  : {
                    delimiter   : 'comma',
                    requireLast : true,
                },
                singleline : {
                    delimiter   : 'comma',
                    requireLast : true,
                },
            },
        ],
        '@typescript-eslint/no-empty-function'              : 'off',
        '@typescript-eslint/no-empty-interface'             : 'off',
        '@typescript-eslint/no-explicit-any'                : 'off',
        '@typescript-eslint/no-misused-new'                 : 'error',
        '@typescript-eslint/no-misused-promises'            : [
            'error',
            {
                checksVoidReturn : false,
            },
        ],
        '@typescript-eslint/no-namespace'                   : 'error',
        "@typescript-eslint/no-non-null-assertion"          : 'off',
        '@typescript-eslint/no-parameter-properties'        : 'off',
        '@typescript-eslint/no-shadow'                      : [
            'error',
            {
                hoist : 'all',
            },
        ],
        '@typescript-eslint/no-unsafe-argument'             : 'off',
        '@typescript-eslint/no-unsafe-assignment'           : 'off',
        '@typescript-eslint/no-unsafe-call'                 : 'off',
        '@typescript-eslint/no-unused-expressions'          : 'error',
        '@typescript-eslint/no-unsafe-member-access'        : 'off',
        '@typescript-eslint/no-unsafe-return'               : 'off',
        '@typescript-eslint/no-use-before-define'           : 'error',
        '@typescript-eslint/no-var-requires'                : 'off',
        '@typescript-eslint/prefer-for-of'                  : 'error',
        '@typescript-eslint/prefer-function-type'           : 'error',
        '@typescript-eslint/prefer-namespace-keyword'       : 'error',
        '@typescript-eslint/quotes'                         : [
            'error',
            'single',
            {
                avoidEscape : true,
            },
        ],
        '@typescript-eslint/semi'                           : [
            'error',
            'always',
        ],
        '@typescript-eslint/triple-slash-reference'         : [
            'error',
            {
                path  : 'always',
                types : 'prefer-import',
                lib   : 'always',
            },
        ],
        '@typescript-eslint/typedef'                        : 'off',
        '@typescript-eslint/unified-signatures'             : 'error',
        'arrow-body-style'                                  : 'error',
        'comma-dangle'                                      : [
            'error',
            'always',
        ],
        complexity                                        : [
            'error',
            {
                max : 25,
            },
        ],
        'constructor-super'                                 : 'error',
        'default-case'                                      : 'error',
        'dot-notation'                                      : 'error',
        'eol-last'                                          : 'error',
        eqeqeq                                            : [
            'error',
            'smart',
        ],
        'guard-for-in'                                      : 'error',
        'id-denylist'                                       : [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined',
        ],
        'id-match'                                          : 'error',
        'import/order'                                      : 'error',
        indent                                            : 'error',
        'linebreak-style'                                   : [
            'error',
            'unix',
        ],
        'max-classes-per-file'                              : [
            'error',
            1,
        ],
        'max-lines'                                         : [
            'error',
            500,
        ],
        'new-parens'                                        : 'error',
        'no-bitwise'                                        : 'off',
        'no-caller'                                         : 'error',
        'no-cond-assign'                                    : 'error',
        'no-console'                                        : 'off',
        'no-debugger'                                       : 'error',
        'no-duplicate-case'                                 : 'error',
        'no-duplicate-imports'                              : 'error',
        'no-empty'                                          : 'off',
        'no-empty-function'                                 : 'off',
        'no-eval'                                           : 'error',
        'no-fallthrough'                                    : 'off',
        'no-invalid-this'                                   : 'off',
        'no-irregular-whitespace'                           : 'error',
        'no-multiple-empty-lines'                           : 'error',
        'no-new-wrappers'                                   : 'error',
        'no-param-reassign'                                 : 'error',
        'no-redeclare'                                      : 'error',
        'no-shadow'                                         : 'error',
        'no-throw-literal'                                  : 'error',
        'no-trailing-spaces'                                : 'error',
        'no-undef-init'                                     : 'error',
        'no-underscore-dangle'                              : 'off',
        'no-unsafe-finally'                                 : 'error',
        'no-unused-expressions'                             : 'error',
        'no-unused-labels'                                  : 'error',
        'no-use-before-define'                              : 'off',
        'no-var'                                            : 'error',
        'object-shorthand'                                  : 'error',
        'one-var'                                           : [
            'error',
            'never',
        ],
        'prefer-arrow/prefer-arrow-functions'               : 'error',
        'prefer-const'                                      : 'error',
        'prefer-template'                                   : 'error',
        quotes                                            : [
            'error',
            'single',
        ],
        radix                                             : 'error',
        'react/jsx-boolean-value'                           : 'off',
        'react/jsx-key'                                     : 'error',
        'react/jsx-no-bind'                                 : [
            'error',
            {
                allowArrowFunctions : true,
            },
        ],
        'react/jsx-tag-spacing'                             : [
            'error',
            {
                afterOpening : 'allow',
                closingSlash : 'allow',
            },
        ],
        'react/self-closing-comp'                           : 'error',
        semi                                              : 'error',
        'spaced-comment'                                    : [
            'error',
            'always',
            {
                markers : [
                    '/'
                ],
            },
        ],
        'unicorn/prefer-switch'                             : [
            'error',
            {
                minimumCases : 3,
            },
        ],
        'use-isnan'                                         : 'error',
        'valid-typeof'                                      : 'off',
    },
};
