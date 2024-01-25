import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
import {ExtendedReporter} from './src';


export default defineConfig({
    plugins: [],
    test: {
        globals: true,
        environment: 'jsdom',
        reporters: [new ExtendedReporter()],
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./', import.meta.url)),
            '~': fileURLToPath(new URL('./', import.meta.url)),
        },
    },
});
