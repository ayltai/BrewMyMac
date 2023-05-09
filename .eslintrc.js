module.exports = {
    extends        : [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
    ],
    plugins        : [
        '@typescript-eslint',
        'eslint-plugin-jest',
        'eslint-plugin-jest-dom',
        'eslint-plugin-testing-library',
    ],
    parserOptions  : {
        project : './tsconfig.json',
    },
    ignorePatterns : [
        'node_modules/',
        '.eslintrc.js',
        'jest.config.js',
        'next.config.js',
        'next-i18next.config.js',
    ],
    rules          : {
        '@typescript-eslint/no-empty-function'       : 'off',
        '@typescript-eslint/no-empty-interface'      : 'off',
        '@typescript-eslint/no-explicit-any'         : 'off',
        '@typescript-eslint/no-unsafe-assignment'    : 'off',
        '@typescript-eslint/no-unsafe-member-access' : 'off',
        '@typescript-eslint/no-unsafe-return'        : 'off',
        '@typescript-eslint/unbound-method'          : 'off',
        'no-empty'                                   : 'off',
        'no-empty-function'                          : 'off',
    },
};
