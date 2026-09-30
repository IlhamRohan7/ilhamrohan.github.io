export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

/** Prefix a /public asset path with the deploy base path. */
export const withBase = (path: string) => `${basePath}${path}`;
