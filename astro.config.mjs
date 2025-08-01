import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';
import node from '@astrojs/node';
import { fileURLToPath } from 'url';

dotenv.config();

export default defineConfig({
    site: 'https://testing.ftcturbov8.com',
    base: '/',
    trailingSlash: 'ignore',
    output: 'static',

    build: {
        inlineStylesheets: 'never',
        /*rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    const original = assetInfo.name ?? '';
                    if (original.endsWith('.css')) {
                        return 'assets/style-[hash][extname]';
                    }

                    return 'assets/[name]-[hash][extname]';
                },
            },
        },*/
    },

    vite: {
        css: {
            postcss: {
                plugins: [autoprefixer()],
            },
        },
        build: {
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
        }
    },

    integrations: [sitemap()],
    /*adapter: node({
        mode: 'standalone',
    }),*/
});
