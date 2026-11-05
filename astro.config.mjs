// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
const bandas2025 = [
    'phantom-crest',
    'the-headless-chimps',
    'big-rip',
    'azogue',
    'beta-máximo',
    'maripili',
    'descarburados',
    'los-retumbes',
    'los-pólipos',
    'rivelles',
    'alfonso-monasterio',
    'head-and-banger',
]

export default defineConfig({
    site: 'https://balambamboofest.com',
    integrations: [react()],
    redirects: {
        '/lineup': '/',
        '/tickets': '/',
        '/social': '/',
        '/info': '/',
        '/bands': '/',
        '/band': '/',
        '/2025': '/',
        ...Object.fromEntries(bandas2025.map((slug) => [`/band/${slug}`, '/'])),
    },
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
