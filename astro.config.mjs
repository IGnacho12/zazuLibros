// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: "server", // 🔑 así todas las rutas dinámicas se sirven en runtime
  vite: {
    plugins: [tailwindcss()]
  }
});