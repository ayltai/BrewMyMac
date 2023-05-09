const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir : './',
});

module.exports = createJestConfig({
    collectCoverage     : true,
    collectCoverageFrom : [
        '**/*.{js,jsx,ts,tsx}',
    ],
    setupFilesAfterEnv  : [
        '<rootDir>/jest.setup.ts',
    ],
    testEnvironment     : 'jsdom',
});
