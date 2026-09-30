import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "OG", robots: { index: false } };

/** Rendered to public/og.png by `npm run assets` (1200 × 630). */
export default function OG() {
  const t = site.tagline;
  return (
    <div data-theme="dark" className="relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-bg p-16 text-fg">
      <div className="absolute inset-4 border border-line" />
      <div className="label relative flex justify-between text-muted">
        <span>Dwg. No. IR—001</span>
        <span>Industrial &amp; Production Eng. · SUST</span>
      </div>
      <div className="relative">
        <div className="inline-block">
        <div className="mb-6 flex items-center text-signal">
          <span className="h-3 w-px bg-current" />
          <span className="h-px flex-1 bg-current" />
          <span className="h-3 w-px bg-current" />
        </div>
        <h1 className="display text-[190px]">
          {site.firstName} <em>{site.lastName}</em>
        </h1>
        </div>
        <p className="mt-8 text-[46px] leading-none">
          <span className="font-serif">{t.before} </span>
          <span className="voice-eng">{t.engineering} </span>
          <span className="font-serif text-signal">{t.middle} </span>
          <span className="voice-int">{t.intelligence}.</span>
        </p>
      </div>
    </div>
  );
}
