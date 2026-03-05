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
    },
});
