import {defineConfig} from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://ftcturbov8.com', 
    base: "/",
    build: {
        inlineStylesheets: 'never'
    },

    integrations: [sitemap()]
});