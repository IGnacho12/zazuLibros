import { defineConfig } from 'astro/config';
// Import /serverless for a Serverless SSR site
import vercelServerless from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: vercelServerless(),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});