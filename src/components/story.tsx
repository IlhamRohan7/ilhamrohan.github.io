"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMemo, useRef, useState } from "react";
import { site } from "@/content/site";
import { SheetHeader, tokenize, useReduced, type Token } from "./primitives";

function Word({
  token,
  progress,
  range,
}: {
  token: Token;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const cls = token.voice === "int" ? "voice-int" : token.voice === "eng" ? "voice-eng" : "";
  return (
    <motion.span style={{ opacity }}>
      <span className={cls}>{token.text}</span>
      {token.tail}{" "}
    </motion.span>
  );
}

export function Story() {
  const reduce = useReduced();
  const ref = useRef<HTMLElement>(null);
  const tokens = useMemo(() => tokenize(site.story), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPct(Math.round(Math.min(1, Math.max(0, (v - 0.05) / 0.8)) * 100)),
  );
  const barScale = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  const n = tokens.length;
  return (
    <section
      ref={ref}
      id="story"
      tabIndex={-1}
      aria-labelledby="story-title"
      className={`relative outline-none ${reduce ? "py-32" : "h-[280vh]"}`}
    >
      <div className={`gutter flex flex-col justify-center gap-10 ${reduce ? "" : "sticky top-0 h-[100svh]"}`}>
        <SheetHeader id="story" note="Note 1 — About" />
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="label flex flex-row gap-6 text-muted lg:col-span-3 lg:flex-col lg:gap-3">
            <h2 id="story-title" className="text-fg">
              The short version
            </h2>
            <span className="tabular" aria-hidden>
              Read — {String(reduce ? 100 : pct).padStart(3, "0")}%
            </span>
            <span aria-hidden className="relative hidden h-px w-24 bg-line-strong lg:block">
              <motion.span
                className="absolute inset-0 origin-left bg-signal"
                style={{ scaleX: reduce ? 1 : barScale }}
              />
            </span>
          </div>
          <p className="font-serif text-[clamp(1.5rem,3.55vw,3.6rem)] leading-[1.1] tracking-[-0.015em] text-fg lg:col-span-9">
            {reduce
              ? tokens.map((t, i) => (
                  <span key={i}>
                    <span className={t.voice === "int" ? "voice-int" : t.voice === "eng" ? "voice-eng" : ""}>{t.text}</span>
                    {t.tail}{" "}
                  </span>
                ))
              : tokens.map((t, i) => {
                  const start = 0.05 + (i / n) * 0.8;
                  return (
                    <Word key={i} token={t} progress={scrollYProgress} range={[start, start + 0.8 / n + 0.02]} />
                  );
                })}
          </p>
        </div>
      </div>
    </section>
  );
}
