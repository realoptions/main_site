import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // Using relative paths for deployment
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build', // match previous CRA build folder
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        css: true,
        coverage: {
            provider: 'v8',
            // Include every source file. The old `src/**/*.{js,jsx}` glob silently
            // dropped all .tsx files, i.e. essentially all application code.
            // (vitest 4 includes untested matched files by default; the old
            // `all` option no longer exists in CoverageOptions.)
            include: ['src/**/*.{ts,tsx,js,jsx}'],
            exclude: [
                'src/**/*.test.{ts,tsx,js,jsx}',
                'src/setupTests.js',
                // Entry point is bootstrap wiring, not unit-testable logic.
                'src/index.tsx',
                // Type declaration files carry no runtime code.
                'src/**/*.d.ts',
            ],
            reporter: [
                ['text', { skipEmpty: false, skipFull: false, maxCols: 200 }],
                'text-summary',
                'html',
                'lcov',
                'json-summary',
            ],
            reportsDirectory: './coverage',
        },
    },
});
