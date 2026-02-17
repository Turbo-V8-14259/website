import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import autoprefixer from 'autoprefixer';



export default defineConfig({
    site: 'https://ftcturbov8.com',
    base: '/',
    trailingSlash: 'ignore',
    output: 'static',
    cacheDir: './build_cache',

    build: {
        inlineStylesheets: 'never',
    },

    vite: {
        css: {
            postcss: {
                plugins: [autoprefixer()],
            },
        },
    },

    integrations: [sitemap()], /*adapter: node({
        mode: 'standalone',
    }),*/
});
