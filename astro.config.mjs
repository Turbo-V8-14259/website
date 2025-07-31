import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';
import node from '@astrojs/node';

dotenv.config();

export default defineConfig({
    site: 'https://testing.ftcturbov8.com',
    base: '/',
    trailingSlash: 'ignore',

    build: {
        inlineStylesheets: 'never', // keep external styles
        assets: 'client',           // optional, but clarifies intent
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    const original = assetInfo.name ?? '';

                    if (original.endsWith('.css')) {
                        return 'assets/style-[hash][extname]';
                    }

                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },

    vite: {
        css: {
            postcss: {
                plugins: [autoprefixer()],
            },
        },
    },

    integrations: [sitemap()],
    adapter: node({
        mode: 'standalone',
    }),
});
