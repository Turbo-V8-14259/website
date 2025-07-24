import {defineConfig} from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://testing.ftcturbov8.com',
    base: "/",
    prefetch: {
        defaultStrategy: 'load',
        prefetchAll: true
    },
    build: {
        inlineStylesheets: 'never'

    },

    integrations: [sitemap()]
});