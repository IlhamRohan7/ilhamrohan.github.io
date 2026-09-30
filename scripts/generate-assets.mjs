// Generates public/Ilham-Rohan-CV.pdf and public/og.png from the /cv and /og pages.
// Usage: npm run assets   (builds, renders, then rebuilds so the site ships the new files)
// Needs a Chromium: set CHROME_PATH, or install one with `npx playwright install chromium`.
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { chromium } from "playwright-core";
import { serve } from "./serve.mjs";

const build = () => execSync("npx next build", { stdio: "inherit", env: { ...process.env, BASE_PATH: "" } });
build();

const candidates = [process.env.CHROME_PATH, "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const server = await serve("out", 4174);
const base = "http://localhost:4174";

const page = await browser.newPage({ colorScheme: "light" });
await page.goto(`${base}/cv/`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: "public/Ilham-Rohan-CV.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
console.log("✓ public/Ilham-Rohan-CV.pdf");

const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: "dark" });
await og.goto(`${base}/og/`, { waitUntil: "networkidle" });
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: "public/og.png" });
console.log("✓ public/og.png");

await browser.close();
server.close();
build();
