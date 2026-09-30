import type { NextConfig } from "next";

// GitHub Pages serves this repo under /<repo-name>/ unless it's a user site
// (<username>.github.io) or has a custom domain. The deploy workflow passes
// the correct value in BASE_PATH; locally it's empty.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL ?? "https://ilhamrohan7.github.io/ilhamrohan.github.io",
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
