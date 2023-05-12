const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir : './',
});

module.exports = createJestConfig({
    collectCoverage        : true,
    collectCoverageFrom    : [
        '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
        '!<rootDir>/src/utils/test-utils.tsx',
    ],
    testPathIgnorePatterns : [
        '<rootDir>/.next/',
        '<rootDir>/src/utils/test-utils.tsx',
    ],
    setupFilesAfterEnv     : [
        '<rootDir>/jest.setup.ts',
    ],
    testEnvironment        : 'jest-environment-jsdom',
});
