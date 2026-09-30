"use client";

import { motion } from "motion/react";
import { site, type Proficiency } from "@/content/site";
import { EASE, MaskLines, Reveal, SheetHeader, useReduced } from "./primitives";

const LEVELS: Proficiency[] = ["Familiar", "Proficient", "Advanced"];

function Meter({ level, delay }: { level: Proficiency; delay: number }) {
  const reduce = useReduced();
  const n = LEVELS.indexOf(level) + 1;
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {LEVELS.map((_, i) => (
        <span key={i} className="relative h-2.5 w-5 overflow-hidden border border-line-strong">
          {i < n && (
            <motion.span
              className="absolute inset-0 origin-left bg-fg group-hover:bg-signal"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: delay + i * 0.12 }}
            />
          )}
        </span>
      ))}
    </span>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-title"
      className="gutter relative py-28 outline-none sm:py-40"
    >
      <SheetHeader id="skills" note="Bill of materials" />

      <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
        <MaskLines
          id="skills-title"
          className="display text-[clamp(3rem,8vw,8rem)] lg:col-span-7"
          lines={["Tools of", "the *trade.*"]}
        />
        <Reveal className="lg:col-span-5" delay={0.2}>
          <p className="max-w-[40ch] text-lg leading-snug text-muted">
            The software I think, design and build with — listed the way an engineer lists parts.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-16" y={16}>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Tools and proficiency</caption>
          <thead>
            <tr className="label border-y border-line-strong text-muted">
              <th scope="col" className="w-16 py-3 font-normal">Item</th>
              <th scope="col" className="py-3 font-normal">Part</th>
              <th scope="col" className="hidden py-3 font-normal md:table-cell">Category</th>
              <th scope="col" className="py-3 text-right font-normal">Proficiency</th>
            </tr>
          </thead>
          <tbody>
            {site.skills.map((s, i) => (
              <tr key={s.part} className="group relative border-b border-line">
                <td className="label tabular relative py-5 align-middle text-faint transition-colors duration-300 group-hover:text-signal-text sm:py-7">
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 -z-10 w-[100vw] origin-left scale-x-0 bg-fg/[0.035] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  {String(i + 1).padStart(3, "0")}
                </td>
                <th
                  scope="row"
                  className="py-5 align-middle font-serif text-[clamp(1.75rem,4.2vw,3.5rem)] font-normal leading-none tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-3 group-hover:italic sm:py-7"
                >
                  {s.part}
                  <span className="mt-2 block font-sans text-sm not-italic tracking-normal text-muted md:hidden">
                    {s.category}
                  </span>
                </th>
                <td className="hidden py-5 align-middle text-muted md:table-cell">{s.category}</td>
                <td className="py-5 text-right align-middle">
                  <span className="inline-flex flex-col items-end gap-2">
                    <Meter level={s.level} delay={0.2 + i * 0.08} />
                    <span className="label text-muted">{s.level}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="label mt-5 text-faint">
          Note — proficiency self-assessed: Familiar · Proficient · Advanced.
        </p>
      </Reveal>
    </section>
  );
}
