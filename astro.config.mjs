// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // GitHub Pages project site for the sonus-auris org.
  // Served at https://sonus-auris.github.io/sonus-auris-site.web/
  site: 'https://sonus-auris.github.io',
  base: '/sonus-auris-site.web',
  server: {
    port: 4321,
    host: true,
  },
});
