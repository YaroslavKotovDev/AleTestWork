// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.ts'],
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.{js,ts,tsx}',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '\\.pnp\\.[^\\/]+$',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    roots: ['<rootDir>/src'],
    collectCoverage: true,
};

export default config;
