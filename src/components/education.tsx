"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { EASE, MaskLines, Reveal, SheetHeader, useReduced } from "./primitives";

export function Education() {
  const edu = site.education[0];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  const markerX = useTransform(scrollYProgress, [0.25, 0.6], ["0%", "100%"]);
  const circleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const rows: [string, string][] = [
    ["Institution", edu.institution],
    ["Location", edu.location],
    ["Expected", edu.expected],
    ...(edu.cgpa ? ([["CGPA", edu.cgpa]] as [string, string][]) : []),
  ];

  return (
    <section
      ref={ref}
      id="education"
      tabIndex={-1}
      aria-labelledby="education-title"
      className="gutter relative py-28 outline-none sm:py-40"
    >
      <SheetHeader id="education" note="Detail A — Education" />

      <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12">
        {/* Detail callout */}
        <motion.div
          style={reduce ? undefined : { y: circleY }}
          className="relative hidden lg:col-span-4 lg:block"
          aria-hidden
        >
          <svg viewBox="0 0 240 240" className="w-full max-w-[18rem] text-fg">
            <motion.circle
              cx="120"
              cy="120"
              r="104"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="6 4"
              initial={reduce ? false : { pathLength: 0, rotate: -90 }}
              whileInView={{ pathLength: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE }}
            />
            <motion.circle
              cx="120"
              cy="120"
              r="4"
              className="fill-signal"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
            <text x="120" y="136" textAnchor="middle" className="fill-current font-serif italic" fontSize="96">
              A
            </text>
          </svg>
          <p className="label mt-6 text-muted">Detail A · Scale 2 : 1</p>
        </motion.div>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="label text-signal-text">B.Sc. — Bachelor of Science</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display mt-6 text-[clamp(3rem,8.4vw,8.5rem)] leading-[0.9]"
            id="education-title"
            lines={["Industrial &", "*Production*", "Engineering"]}
          />

          <dl className="mt-14 border-t border-line-strong">
            {rows.map(([k, v], i) => (
              <Reveal key={k} delay={0.08 * i} y={12}>
                <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[10rem_1fr]">
                  <dt className="label pt-1 text-muted">{k}</dt>
                  <dd className="text-lg leading-snug tabular">{v}</dd>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3} y={12}>
              <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="label pt-1 text-muted">Status</dt>
                <dd className="flex items-center gap-3 text-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                  </span>
                  {edu.status}
                </dd>
              </div>
            </Reveal>
          </dl>

          {/* Now → graduation, drawn by scroll */}
          <div className="mt-16" aria-hidden>
            <div className="label flex justify-between text-muted">
              <span>Now</span>
              <span>Graduation · {edu.expected}</span>
            </div>
            <div className="relative mt-3 h-px bg-line">
              <motion.div
                className="absolute inset-0 origin-left bg-signal"
                style={{ scaleX: reduce ? 1 : lineScale }}
              />
              <motion.div className="absolute inset-0" style={{ x: reduce ? "100%" : markerX }}>
                <span className="absolute -top-[5px] -ml-[5px] block h-[11px] w-[11px] rotate-45 border border-signal bg-bg" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
