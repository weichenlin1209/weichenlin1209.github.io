// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkSpoiler from './src/remark-spoiler.mjs';
import { unified } from '@astrojs/markdown-remark';
import { site } from './src/site.config';

export default defineConfig({
  site: site.url || 'https://example.com',
  server: {
    host: true,
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-tw',
          en: 'en-us',
        },
      },
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkSpoiler],
      rehypePlugins: [rehypeKatex],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
