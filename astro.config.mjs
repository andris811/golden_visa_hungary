// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://andris811.github.io/golden_visa_hungary', // update later if custom domain
  base: '/golden_visa_hungary/',
  // trailingSlash: 'always',
  integrations: [sitemap()]
});