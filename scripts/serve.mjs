// Minimal static server for the exported site in ./out (used by asset generation).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".pdf": "application/pdf",
  ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".json": "application/json",
};

export function serve(root = "out", port = 4173) {
  const server = createServer(async (req, res) => {
    let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
    let file = join(root, p);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    } catch {
      file = join(root, "404.html");
      res.statusCode = 404;
    }
    try {
      res.setHeader("Content-Type", TYPES[extname(file)] ?? "application/octet-stream");
      res.end(await readFile(file));
    } catch {
      res.statusCode = 404;
      res.end("Not found");
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await serve(process.argv[2] ?? "out", Number(process.argv[3] ?? 4173));
  console.log("Serving on http://localhost:" + (process.argv[3] ?? 4173));
}
