// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kyoza.github.io',
  base: '/claude-code-tips',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
  ],
});
