// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://fermarinsanchez.github.io',
    base: '/bbb25',
    integrations: [react()],
    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'react-vendor': ['react', 'react-dom'],
                        'astro-vendor': ['astro'],
                        'ui-components': [
                            '@untitledui/icons',
                            'react-aria-components'
                        ]
                    }
                }
            },
            chunkSizeWarningLimit: 1000
        }
    }
});
