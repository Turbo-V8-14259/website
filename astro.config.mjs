import {defineConfig} from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://testing.ftcturbov8.com',
    base: "/",
    trailingSlash: "ignore",
    build: {
        inlineStylesheets: 'never'

    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        const original = assetInfo.names?.[0] ?? '';

                        if (original.endsWith('.css')) {
                            // All CSS → assets/style.css (or style2.css etc. if duplicated)
                            return 'assets/style-[hash][extname]';
                        }

                        // Fallback for other assets
                        return 'assets/[name]-[hash][extname]';
                    },
                },
            },
        },
    },

    integrations: [sitemap()]
});