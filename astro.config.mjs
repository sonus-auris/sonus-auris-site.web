// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://sonusauris.app',
  server: {
    port: 4321,
    host: true,
  },
});
