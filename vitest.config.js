import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',

        globalSetup: './tests/helpers/globalSetup.js',
        setupFiles:  ['./tests/helpers/setup.js'],

        include: ['tests/**/*.test.js'],

        maxConcurrency: 1,
        fileParallelism: false,

        testTimeout: 30_000,
        hookTimeout: 30_000,

        coverage: {
            provider:          'v8',
            reporter:          ['text', 'json', 'html', 'lcov'],
            reportsDirectory:  './coverage',
            include: [
                'utils/**/*.js',
                'services/**/*.js',
                'middleware/**/*.js',
                'repositories/**/*.js',
                'models/**/*.js',
                'config/**/*.js',
            ],
            exclude: [
                'node_modules/**', 'tests/**', 'seeders/**',
                'uploads/**', 'logs/**', 'coverage/**',
            ],
            thresholds: {
                lines: 30, functions: 30, branches: 20, statements: 30,
            },
        },

        reporters: ['verbose'],
    },
});
