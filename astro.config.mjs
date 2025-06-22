// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://iroha71.github.io',
  base: 'UnityContent',
  integrations: [vue(), react()]
});