// Copies the built site (app/dist) to the repository root, which is what GitHub Pages serves.
// Run via `npm run build:site` from the app/ folder of the website repository.
import { cpSync, existsSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..', '..')
const dist = resolve(here, '..', 'dist')

if (!existsSync(resolve(repoRoot, '.nojekyll'))) {
  console.error('Not inside the website repository (no .nojekyll one level above app/). Nothing copied.')
  process.exit(1)
}
rmSync(resolve(repoRoot, 'assets'), { recursive: true, force: true })
cpSync(dist, repoRoot, { recursive: true })
console.log('Built site copied to the repository root. Commit and push to publish.')
