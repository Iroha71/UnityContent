// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import rehypeMermaid from 'rehype-mermaid';
dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://iroha71.github.io',
  base: 'UnityContent',
  integrations: [vue(), react(), mdx()],
  markdown: {
    syntaxHighlight: {
      excludeLangs: ["mermaid"],
    },
    rehypePlugins: [rehypeMermaid],
  }
});