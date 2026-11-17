# Ilham Rohan — Research Portfolio

React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Edit content (no component changes needed)
| What | File |
|---|---|
| Name, email, **phone**, links, about text | `src/data/profile.ts` |
| Research interests, **current research details** | `src/data/research.ts` |
| Skills and proficiency | `src/data/skills.ts` |
| **Projects** (add entries; placeholder disappears) | `src/data/projects.ts` |
| Education, hobbies | `src/data/education.ts` |
| CV PDF | replace `public/Ilham-Rohan-CV.pdf` |
| Page title / SEO | `index.html` |

## Deploy (GitHub Pages)
Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to
https://ilhamrohan7.github.io/ilhamrohan.github.io/

One-time setting (already done for this repo): Settings → Pages → Source: **GitHub Actions**.
For the shorter address https://ilhamrohan7.github.io/, rename the repository to `IlhamRohan7.github.io`.
