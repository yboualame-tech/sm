import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});
