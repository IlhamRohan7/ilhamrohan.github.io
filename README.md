# ilhamrohan.github.io

Personal portfolio of **Ilham Rohan** — Industrial & Production Engineering student at SUST.

The site is designed as a typeset engineering drawing: nine "sheets", a title-block navigator,
dimension lines drawn by scroll, and two typographic voices — upright grotesk for *engineering*,
italic serif for *intelligence*.

## Edit your content

Everything lives in **`src/content/site.ts`** — bio, education, research interests, skills,
projects, experience, the "Now" sheet, links and contact details.

- Entries marked `placeholder: true` (or text containing `[PLACEHOLDER …]`) show on the site as
  clearly marked *Reserved* frames and are **left out of the CV**. Replace them with real entries
  and remove the `placeholder` flag.
- The CV phone number is `phone: "+880 [ADD PHONE]"` — it appears on the CV only, never on the site.
- In the story text, `*words*` render in the italic serif and `_words_` in the bold grotesk.

After editing, regenerate the CV PDF and share image:

```bash
npm run assets   # builds, prints /cv → public/Ilham-Rohan-CV.pdf, renders /og → public/og.png
```

(`npm run assets` needs a local Chromium — set `CHROME_PATH`, or run `npx playwright install chromium`.)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static export → ./out
npm start          # serve ./out on http://localhost:4173
```

## Deploy (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static export and
publishes it. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow sets the base path automatically. This repository is a *project* site, so it is served
at `https://ilhamrohan7.github.io/ilhamrohan.github.io/`. For the shorter
`https://ilhamrohan7.github.io/`, rename the repository to `IlhamRohan7.github.io` (then run
`SITE_URL=https://ilhamrohan7.github.io npm run assets` so the CV footer shows the new address).

## Easter eggs

- Type a chess move (`e4`, `d4`, `Nf3` …) anywhere on the page.
- In *Beyond engineering*, pick **Football & Tactics**, then change the shape.

## Stack

Next.js (static export) · TypeScript · Tailwind CSS v4 · Motion · Lenis · chess.js (lazy-loaded).
Fonts: Instrument Serif, Inter Tight, JetBrains Mono (self-hosted via `next/font`).
