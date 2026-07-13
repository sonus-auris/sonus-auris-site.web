// @ts-check
import { defineConfig } from 'astro/config';

const requestedPort = Number.parseInt(process.env.SONUS_AURIS_SITE_PORT ?? '', 10);
const port = Number.isInteger(requestedPort) && requestedPort >= 1 && requestedPort <= 65_535
  ? requestedPort
  : 4321;

// https://astro.build
export default defineConfig({
  // GitHub Pages project site for the sonus-auris org.
  // Served at https://sonus-auris.github.io/sonus-auris-site.web/
  site: process.env.SONUS_AURIS_SITE_URL ?? 'https://sonus-auris.github.io',
  base: process.env.SONUS_AURIS_SITE_BASE ?? '/sonus-auris-site.web',
  server: {
    port,
    host: process.env.SONUS_AURIS_SITE_HOST ?? true,
  },
});
