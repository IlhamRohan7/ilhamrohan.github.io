"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { site, type Entry } from "@/content/site";
import { CornerTicks, MaskLines, Reveal, SheetHeader, useReduced } from "./primitives";

const groups: { key: string; label: string; entries: readonly Entry[] }[] = [
  { key: "projects", label: "Projects", entries: site.projects },
  { key: "research", label: "Research", entries: site.researchWork },
  { key: "experience", label: "Experience", entries: site.experience },
  { key: "achievements", label: "Achievements & certifications", entries: site.achievements },
];

/** A real entry: subtle 3D tilt toward the pointer. */
function EntryCard({ entry, index }: { entry: Entry; index: string }) {
  const reduce = useReduced();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 160, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const Body = (
    <>
      <CornerTicks className="text-line-strong group-hover:text-signal [&>span]:group-hover:h-4 [&>span]:group-hover:w-4" />
      <div className="label flex justify-between text-faint">
        <span className="tabular">{index}</span>
        {entry.date && <span className="tabular">{entry.date}</span>}
      </div>
      <h3 className="mt-10 font-serif text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1] tracking-tight">{entry.title}</h3>
      {entry.context && <p className="mt-3 text-sm text-muted">{entry.context}</p>}
      <p className="mt-6 max-w-[46ch] leading-relaxed text-muted">{entry.summary}</p>
      {entry.tags && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {entry.tags.map((t) => (
            <li key={t} className="label border border-line px-2 py-1 text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
      {entry.link && (
        <span className="label mt-8 inline-flex items-center gap-2 text-signal-text">
          {entry.link.label}
          <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </span>
      )}
    </>
  );

  const cls = "group relative block h-full p-6 sm:p-8 [transform-style:preserve-3d]";
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} onPointerMove={onMove} onPointerLeave={reset}>
      {entry.link ? (
        <a href={entry.link.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {Body}
        </a>
      ) : (
        <article className={cls}>{Body}</article>
      )}
    </motion.div>
  );
}

/** Placeholder: a hatched, reserved area on the drawing. */
function ReservedCard({ label, entry, index }: { label: string; entry: Entry; index: string }) {
  return (
    <article className="hatch relative flex h-full min-h-[18rem] flex-col border border-dashed border-line-strong p-6 sm:p-8">
      <div className="label flex justify-between text-faint">
        <span className="tabular">{index}</span>
        <span className="text-signal-text">Placeholder</span>
      </div>
      <div className="mt-auto">
        <p className="label text-muted">Reserved — {label}</p>
        <h3 className="mt-3 font-serif text-[clamp(2rem,3.4vw,3rem)] italic leading-none tracking-tight">
          In drafting.
        </h3>
        <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted">{entry.summary}</p>
      </div>
    </article>
  );
}

export function Work() {
  let count = 0;
  return (
    <section
      id="work"
      tabIndex={-1}
      aria-labelledby="work-title"
      className="gutter relative py-28 outline-none sm:py-40"
    >
      <SheetHeader id="work" note="Work — revision A" />

      <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
        <MaskLines
          id="work-title"
          className="display text-[clamp(3rem,8vw,8rem)] lg:col-span-7"
          lines={["Work in", "*progress.*"]}
        />
        <Reveal className="lg:col-span-5" delay={0.2}>
          <p className="max-w-[40ch] text-lg leading-snug text-muted">
            Every drawing starts with empty frames. These are reserved for the projects, research and experience
            being built now — revision B is on the way.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">
        {groups.flatMap((g) => {
          const real = g.entries.filter((e) => !e.placeholder);
          const list = real.length ? real : g.entries.slice(0, 1);
          return list.map((entry, i) => {
            count += 1;
            const index = `${g.label.split(" ")[0]} · ${String(count).padStart(2, "0")}`;
            return (
              <Reveal key={`${g.key}-${i}`} delay={(count % 2) * 0.08} y={20} className="bg-bg">
                {entry.placeholder ? (
                  <ReservedCard label={g.label} entry={entry} index={index} />
                ) : (
                  <EntryCard entry={entry} index={index} />
                )}
              </Reveal>
            );
          });
        })}
      </div>
    </section>
  );
}
