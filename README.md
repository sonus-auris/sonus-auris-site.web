<!-- BEGIN k8s-cluster-submodule-notice -->
> [!NOTE]
> **Canonical source.** This repository is the source of truth for its code. It
> is also vendored as a **secondary** git submodule of
> [ORESoftware/k8s-cluster](https://github.com/ORESoftware/k8s-cluster) at
> `remote/submodules/sonus-auris-site.web` — make changes here, not in that submodule checkout.
>
> On disk: source clone `~/codes/sonus-auris/sonus-auris-site.web` · submodule checkout `~/codes/ores/k8s-cluster/remote/submodules/sonus-auris-site.web`.
<!-- END k8s-cluster-submodule-notice --># sonus-auris-site.web

Marketing website for **Sonus Auris** — *a dashcam for audio*. An always-on
recording app that keeps a rolling buffer of your audio and backs it up,
encrypted, to the cloud. Built for musicians who don't want to lose the riff,
and for anyone who wants an honest record when memory isn't enough.

Built with [Astro](https://astro.build). No client framework — just fast,
static HTML/CSS with a little inline SVG animation.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## Structure

```
src/
  layouts/Base.astro        # <head>, fonts, OG tags
  components/
    Nav.astro               # sticky header
    Hero.astro              # animated phone + waveform
    Audience.astro          # musicians + peace-of-mind
    Features.astro          # feature grid
    HowItWorks.astro        # 4-step flow
    Privacy.astro           # privacy-first promises + vault
    OpenSource.astro        # "read the code" + terminal
    Download.astro          # final CTA
    Footer.astro
    StoreButtons.astro      # App Store + Google Play badges
    Logo.astro
  pages/index.astro         # single-page assembly
public/                     # favicon.svg, og.svg
```

## Things to wire up before launch

- `StoreButtons.astro` — replace `APPLE_URL` / `GOOGLE_URL` with real listings.
- GitHub links point to `github.com/sonus-auris/sonus-auris` — update if the
  org/repo name differs.
- `astro.config.mjs` `site` — set to the real production domain.
- `Partners.astro` — the footer "Trusted & recognised by" badges (Shazam Lite,
  American Sleep Association, Music Production Collective, Pro Sound Alliance)
  are **placeholders**. Several are real trademarks — secure written
  partnership/permission before publishing, or replace with real endorsements.

## Theme

Green + orange, rounded **Baloo 2** type, music / party / driving cartoon
doodles. Fun but professional.
