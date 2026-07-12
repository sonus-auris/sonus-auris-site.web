# src/

Astro source for the Sonus Auris marketing + compliance site. Everything here is
compiled to static HTML/CSS by `astro build`; the site ships **no client
JavaScript** (the only animation is inline SVG/CSS).

## Layout

- `pages/` — one file per route. `index.astro` is the single-page homepage;
  `privacy.astro` and `account-deletion.astro` are the legal pages required for
  app-store approval.
- `layouts/` — shared page shells. `Base.astro` renders the HTML document
  (`<head>`, meta/OG tags, font preload); `Legal.astro` wraps Base with a narrow,
  readable article column used by the legal pages.
- `components/` — the homepage sections (Hero, Features, Privacy, …) plus small
  reusable pieces (Logo, StoreButtons, Nav, Footer, Partners).
- `styles/global.css` — brand design tokens (colors, radius, shadows), base
  element styles, shared utility classes (`.container`, `.btn`, `.card`,
  `.eyebrow`, `.section`), and the self-hosted `@font-face`.
- `env.d.ts` — Astro TypeScript type reference; do not edit.

## Notes

- Internal links and public-asset URLs are prefixed with `import.meta.env.BASE_URL`
  because the site is served from a GitHub Pages subpath (`/sonus-auris-site.web`).
- Several files carry `<LEGAL ENTITY NAME>` / `<privacy@yourdomain>` placeholders
  and hard-coded store/GitHub URLs that must be filled in before launch — see the
  root `README.md` "Things to wire up before launch".
