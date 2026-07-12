# src/

Astro source for the Sonus Auris marketing + compliance site. Everything here is
compiled to static HTML/CSS by `astro build`; the site ships **no client
JavaScript** (the only animation is inline SVG/CSS).

## Layout

- `pages/` — file-based routes; each `.astro` file becomes a page.
  `index.astro` is the single-page homepage (assembles the section components);
  `privacy.astro` (`/privacy`) and `account-deletion.astro` (`/account-deletion`)
  are the legal/compliance pages required for app-store approval, both rendered
  in the `Legal` layout. Note: do **not** add a `README.md` (or any `.md`) inside
  `pages/` — Astro would publish it as a live page.
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
