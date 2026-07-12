# src/pages/

File-based routes. Each `.astro` file here becomes a page at build time.

- `index.astro` — the homepage (`/`). Imports the section components and stacks
  them inside `Base`: `Nav`, then `<main>` with Hero → Audience → Features →
  HowItWorks → Privacy → OpenSource → Download → NoSpooks, then `Footer`. Pure
  assembly — no content of its own.
- `privacy.astro` — the `/privacy` privacy policy. Rendered in the `Legal`
  layout. Describes what the app collects, on-device/end-to-end encryption, data
  locations, retention, user rights (with a link to account deletion), and
  responsible-recording guidance. Has `ENTITY` / `CONTACT_EMAIL` / `POSTAL`
  placeholders and shows a "Before publishing" banner until they are filled.
- `account-deletion.astro` — the `/account-deletion` page. Required by Google
  Play to be reachable without logging in or reinstalling. Explains in-app and
  by-email deletion and lists what is deleted vs. retained. Keep `CONTACT_EMAIL`
  in sync with `privacy.astro`.
