"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { DimensionLine, EASE, useReduced } from "./primitives";

function Letters({ word, delay, italic }: { word: string; delay: number; italic?: boolean }) {
  const reduce = useReduced();
  return (
    <span aria-hidden className={`inline-flex ${italic ? "italic" : ""}`}>
      {word.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] pr-[0.02em]">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "108%", rotate: 6 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.055 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Live-measured width of the name — the drawing is to scale. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function ScrollCue() {
  return (
    <a href="#story" className="group flex items-center gap-3 text-muted hover:text-fg">
      <span className="label">Scroll</span>
      <span className="relative block h-10 w-px overflow-hidden bg-line-strong">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-drop bg-signal" />
      </span>
    </a>
  );
}

export function Hero() {
  const reduce = useReduced();
  const section = useRef<HTMLElement>(null);
  const [nameRef, width] = useWidth<HTMLSpanElement>();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const lastX = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const taglineY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const t = site.tagline;

  return (
    <section
      ref={section}
      id="top"
      tabIndex={-1}
      aria-label="Introduction"
      className="gutter relative flex min-h-[100svh] flex-col justify-between pb-28 pt-8 outline-none sm:pb-12 lg:pt-10"
    >
      {/* Annotation row */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="label grid grid-cols-2 gap-y-2 text-muted lg:grid-cols-4"
      >
        <span>Dwg. No. IR—001</span>
        <span className="text-right lg:text-left">Industrial &amp; Production Eng.</span>
        <span className="hidden lg:block">Shahjalal Univ. of Sci. &amp; Tech.</span>
        <span className="hidden text-right lg:block">Sylhet, BD — 24.92° N 91.83° E</span>
      </motion.div>

      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative mt-16">
        {/* The name — "Ilham" left, "Rohan" flush right: one diagonal sweep across the sheet. */}
        <motion.div style={reduce ? undefined : { y: nameY }} className="relative text-[clamp(6rem,33vw,13rem)] sm:text-[min(29vw,40svh)] lg:text-[clamp(8rem,min(23.5vw,35svh),26rem)]">
        <h1
          aria-label={site.name}
          className="display select-none"
        >
          <span className="block">
            <span ref={nameRef} className="relative inline-block">
              <DimensionLine
                animateOnMount
                delay={1.0}
                className="absolute -top-5 left-0 right-0 sm:-top-7"
                label={width ? `${width} px · 1 : 1` : "1 : 1"}
              />
              <Letters word={site.firstName} delay={0.15} />
            </span>
          </span>
          <motion.span style={reduce ? undefined : { x: lastX }} className="block text-right">
            <Letters word={site.lastName} delay={0.45} italic />
          </motion.span>
        </h1>
        {/* Intro, tucked into the space beside the first name (tablet & desktop) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 2.2 }}
          className="absolute right-0 top-0 hidden h-[0.86em] flex-col items-end justify-end gap-6 pb-[0.1em] text-right sm:flex"
        >
          <p className="max-w-[24ch] font-sans text-[0.95rem] leading-snug text-muted">
            <span className="label mb-3 block text-signal-text">{site.title}</span>
            Industrial &amp; Production Engineering at Shahjalal University of Science and Technology, Sylhet.
          </p>
          <ScrollCue />
        </motion.div>
        </motion.div>

        {/* Tagline: the two voices travel toward each other and meet. */}
        <motion.div
          style={reduce ? undefined : { y: taglineY }}
          className="mt-8 flex flex-col gap-8 sm:mt-10"
        >
          <p className="text-[clamp(1.9rem,4.4vw,4rem)] leading-[1] sm:max-w-[calc(100%-21rem)] lg:text-[clamp(2rem,3.7vw,4.25rem)]">
            <span className="sr-only">
              {t.before} {t.engineering} {t.middle} {t.intelligence}.
            </span>
            <span aria-hidden className="flex flex-wrap items-baseline gap-x-[0.28em]">
              <motion.span
                className="font-serif"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.0 }}
              >
                {t.before}
              </motion.span>
              <motion.span
                className="voice-eng"
                initial={reduce ? false : { x: "-40vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.6, ease: EASE, delay: 1.05 }}
              >
                {t.engineering}
              </motion.span>
              <motion.span
                className="font-serif text-signal-text"
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 2.2 }}
              >
                {t.middle}
              </motion.span>
              <motion.span
                className="voice-int"
                initial={reduce ? false : { x: "40vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.6, ease: EASE, delay: 1.05 }}
              >
                {t.intelligence}.
              </motion.span>
            </span>
          </p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 2.4 }}
            className="flex items-end justify-between gap-6 sm:hidden"
          >
            <p className="max-w-[26ch] text-[0.95rem] leading-snug text-muted">
              {site.title} at Shahjalal University of Science and Technology, Sylhet.
            </p>
            <ScrollCue />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
