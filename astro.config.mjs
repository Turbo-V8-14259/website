import {defineConfig} from 'astro/config';
import sitemap from '@astrojs/sitemap';
import autoprefixer from 'autoprefixer';



export default defineConfig({
    site: 'https://testing.ftcturbov8.com',
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
        }, build: {
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        const original = assetInfo.names[0] ?? '';
                        if (original.endsWith('.css')) {
                            return 'assets/style-[hash][extname]';
                        }
                        return 'assets/[name]-[hash][extname]';
                    },
                },
            },
        }
    },

    integrations: [sitemap()], /*adapter: node({
        mode: 'standalone',
    }),*/
});
