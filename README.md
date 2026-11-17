# Ilham Rohan — Research Portfolio

Live at https://ilhamrohan7.github.io/ilhamrohan.github.io/

React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## How this repository is laid out
- `app/` — the website's source code. Edit here.
- Everything at the top level (`index.html`, `assets/`, the CV PDF, `favicon.svg`) — the **built** site.
  GitHub Pages serves these files directly. Do not edit them by hand.

## Edit content (inside `app/`)
| What | File |
|---|---|
| Name, email, phone, links, languages, about text | `app/src/data/profile.ts` |
| Research interests, current research details | `app/src/data/research.ts` |
| Skills and proficiency | `app/src/data/skills.ts` |
| Projects (add entries; placeholder disappears) | `app/src/data/projects.ts` |
| Education, current semester, hobbies and their links | `app/src/data/education.ts` |
| CV PDF | replace `app/public/Ilham-Rohan-CV.pdf` |
| Page title / SEO | `app/index.html` |
| Text size, mist-blue accent colour | top of `app/src/index.css` |

## Preview locally
```bash
cd app
npm install
npm run dev
```

## Publish a change
```bash
cd app
npm run build:site
```
That rebuilds the site and copies it to the top level. Then commit everything and push to `main`.
The live site updates a minute or two later.
