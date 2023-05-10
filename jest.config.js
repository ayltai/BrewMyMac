const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir : './',
});

module.exports = createJestConfig({
    collectCoverage        : true,
    collectCoverageFrom    : [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!<rootDir>/.next/**',
        '!<rootDir>/coverage/**',
        '!<rootDir>/.eslintrc.js',
        '!<rootDir>/*.config.{js,ts}',
        '!<rootDir>/utils/test-utils.tsx',
    ],
    testPathIgnorePatterns : [
        '<rootDir>/.next/',
        '<rootDir>/utils/test-utils.tsx',
    ],
    setupFilesAfterEnv     : [
        '<rootDir>/jest.setup.ts',
    ],
    testEnvironment        : 'jest-environment-jsdom',
});
