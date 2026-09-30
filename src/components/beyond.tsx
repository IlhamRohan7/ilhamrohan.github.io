"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { EASE, MaskLines, Reveal, SheetHeader, useReduced } from "./primitives";

type P = [number, number];
type ShapeId = "idle" | "tech" | "football" | "design" | "chess" | "film";
const SLOTS = 12;

/* ───────── Figure geometry (100 × 100 viewBox) ───────── */
const idle: P[] = [
  [18, 24], [36, 14], [58, 22], [82, 16], [28, 46], [50, 40],
  [74, 44], [14, 70], [40, 66], [62, 78], [86, 68], [50, 88],
];

const netLayers: P[][] = [
  [26, 42, 58, 74].map((y) => [22, y] as P),
  [18, 34, 50, 66, 82].map((y) => [50, y] as P),
  [30, 50, 70].map((y) => [78, y] as P),
];
const tech = netLayers.flat();

const GK: P = [50, 86];
const formations: Record<string, P[]> = {
  "4-3-3": [GK, [22, 70], [40, 73], [60, 73], [78, 70], [32, 54], [50, 57], [68, 54], [26, 32], [50, 27], [74, 32]],
  "4-4-2": [GK, [22, 70], [40, 73], [60, 73], [78, 70], [20, 51], [40, 54], [60, 54], [80, 51], [40, 30], [60, 30]],
  "3-5-2": [GK, [32, 72], [50, 74], [68, 72], [16, 52], [34, 56], [50, 50], [66, 56], [84, 52], [40, 30], [60, 30]],
  "4-2-3-1": [GK, [22, 70], [40, 73], [60, 73], [78, 70], [40, 60], [60, 60], [24, 42], [50, 44], [76, 42], [50, 26]],
};
const formationNames = Object.keys(formations);

const bolt = (i: number): P => {
  const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
  return [50 + Math.cos(a) * 25, 50 + Math.sin(a) * 25];
};
const design: P[] = [[50, 50], ...Array.from({ length: 8 }, (_, i) => bolt(i))];

const sq = (f: number, r: number): P => [14 + 4.5 + 9 * f, 86 - 4.5 - 9 * r];
const knight = sq(4, 3);
const knightMoves: P[] = [
  [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2],
].map(([df, dr]) => sq(4 + df, 3 + dr));
const chess: P[] = [knight, ...knightMoves];

const film: P[] = [[50, 50], [36.7, 44.4], [63.3, 44.4], [36.7, 55.6], [63.3, 55.6]];

function points(shape: ShapeId, formation: string): P[] {
  switch (shape) {
    case "tech": return tech;
    case "football": return formations[formation];
    case "design": return design;
    case "chess": return chess;
    case "film": return film;
    default: return idle;
  }
}

/* Accent dot (index 0) per shape */
const accent: Partial<Record<ShapeId, boolean>> = { football: true, design: true, chess: true, film: true };

const draw = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

function Art({ shape }: { shape: ShapeId }): ReactNode {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  switch (shape) {
    case "tech":
      return netLayers.slice(0, -1).flatMap((layer, li) =>
        layer.flatMap((a, ai) =>
          netLayers[li + 1].map((b, bi) => (
            <motion.line key={`${li}-${ai}-${bi}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...s} {...draw} />
          )),
        ),
      );
    case "football":
      return (
        <>
          <motion.rect x="12" y="8" width="76" height="84" {...s} {...draw} />
          <motion.line x1="12" y1="50" x2="88" y2="50" {...s} {...draw} />
          <motion.circle cx="50" cy="50" r="9" {...s} {...draw} />
          <motion.rect x="30" y="78" width="40" height="14" {...s} {...draw} />
          <motion.rect x="30" y="8" width="40" height="14" {...s} {...draw} />
          <motion.rect x="41" y="88" width="18" height="4" {...s} {...draw} />
          <motion.rect x="41" y="8" width="18" height="4" {...s} {...draw} />
        </>
      );
    case "design":
      return (
        <>
          <motion.circle cx="50" cy="50" r="36" {...s} {...draw} />
          <motion.circle cx="50" cy="50" r="12" {...s} {...draw} />
          <motion.circle cx="50" cy="50" r="25" {...s} strokeDasharray="4 2 1 2" {...draw} />
          <motion.line x1="6" y1="50" x2="94" y2="50" {...s} strokeDasharray="6 2 1 2" {...draw} />
          <motion.line x1="50" y1="6" x2="50" y2="94" {...s} strokeDasharray="6 2 1 2" {...draw} />
        </>
      );
    case "chess":
      return (
        <>
          {Array.from({ length: 64 }, (_, i) => {
            const f = i % 8;
            const r = Math.floor(i / 8);
            if ((f + r) % 2 === 0) return null;
            return (
              <motion.rect
                key={i}
                x={14 + 9 * f}
                y={14 + 9 * r}
                width="9"
                height="9"
                className="fill-fg/[0.06]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: i * 0.004 } }}
                exit={{ opacity: 0 }}
              />
            );
          })}
          <motion.rect x="14" y="14" width="72" height="72" {...s} {...draw} />
          {knightMoves.map(([x, y], i) => (
            <motion.path
              key={i}
              d={`M${knight[0]} ${knight[1]} L${x} ${knight[1]} L${x} ${y}`}
              {...s}
              className="text-signal"
              {...draw}
            />
          ))}
        </>
      );
    case "film":
      return (
        <>
          <motion.rect x="10" y="33.25" width="80" height="33.5" {...s} {...draw} />
          {[36.7, 63.3].map((x) => (
            <motion.line key={x} x1={x} y1="33.25" x2={x} y2="66.75" {...s} strokeDasharray="1 1.5" {...draw} />
          ))}
          {[44.4, 55.6].map((y) => (
            <motion.line key={y} x1="10" y1={y} x2="90" y2={y} {...s} strokeDasharray="1 1.5" {...draw} />
          ))}
        </>
      );
    default:
      return null;
  }
}

const captions: Record<ShapeId, (f: string) => string> = {
  idle: () => "Fig. 07 — Choose an interest",
  tech: () => "Fig. 07a — A small neural network, 4 · 5 · 3",
  football: (f) => `Fig. 07b — Tactics board, ${f}`,
  design: () => "Fig. 07c — Flange, 8 bolt holes on a PCD",
  chess: () => "Fig. 07d — Knight on e4: eight options",
  film: () => "Fig. 07e — 2.39 : 1, rule of thirds",
};

function Figure({ shape, formation, onCycle }: { shape: ShapeId; formation: string; onCycle: () => void }) {
  const reduce = useReduced();
  const pts = points(shape, formation);
  const isFootball = shape === "football";
  return (
    <figure className="relative">
      <div className="relative aspect-square border border-line">
        {isFootball && (
          <button
            type="button"
            onClick={onCycle}
            className="label absolute right-3 top-3 z-10 border border-line-strong bg-bg px-2 py-1 text-signal-text transition-colors hover:border-signal"
          >
            Change shape ↻
          </button>
        )}
        <svg viewBox="0 0 100 100" className="h-full w-full text-faint" role="img" aria-label={captions[shape](formation)}>
          <AnimatePresence>
            <motion.g key={shape} exit={{ opacity: 0 }}>
              <Art shape={shape} />
            </motion.g>
          </AnimatePresence>
          {Array.from({ length: SLOTS }, (_, i) => {
            const p = pts[i];
            const on = !!p;
            const isAccent = on && i === 0 && accent[shape];
            return (
              <motion.circle
                key={i}
                initial={false}
                animate={{
                  cx: p ? p[0] : 50,
                  cy: p ? p[1] : 50,
                  r: isAccent ? 2.6 : on ? 1.7 : 0,
                  opacity: on ? 1 : 0,
                }}
                className={isAccent ? "fill-signal" : "fill-fg"}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 90, damping: 16, mass: 0.8, delay: i * 0.018 }
                }
              />
            );
          })}
        </svg>
      </div>
      <figcaption className="label mt-3 flex justify-between gap-4 text-muted">
        <span aria-live="polite">{captions[shape](formation)}</span>
        <span className="tabular text-faint">1 : 100</span>
      </figcaption>
    </figure>
  );
}

export function Beyond() {
  const [shape, setShape] = useState<ShapeId>("idle");
  const [fi, setFi] = useState(0);
  const formation = formationNames[fi];
  const cycle = () => setFi((i) => (i + 1) % formationNames.length);

  return (
    <section
      id="beyond"
      tabIndex={-1}
      aria-labelledby="beyond-title"
      className="gutter relative py-28 outline-none sm:py-40"
    >
      <SheetHeader id="beyond" note="Beyond engineering" />

      <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-end">
        <MaskLines
          id="beyond-title"
          className="display text-[clamp(3rem,8vw,8rem)] lg:col-span-7"
          lines={["When the", "textbooks *close.*"]}
        />
        <Reveal className="lg:col-span-5" delay={0.2}>
          <p className="max-w-[40ch] text-lg leading-snug text-muted">
            The things that keep me curious — and that quietly train the same muscles: patterns, systems,
            decisions.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <ul className="border-t border-line-strong lg:col-span-7">
          {site.interests.map((it, i) => {
            const on = shape === it.id;
            const id = it.id as ShapeId;
            return (
              <li key={it.id} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`interest-${it.id}`}
                  onMouseEnter={() => setShape(id)}
                  onFocus={() => setShape(id)}
                  onClick={() => (on && id === "football" ? cycle() : setShape(id))}
                  className="grid w-full grid-cols-[3rem_1fr] items-baseline gap-x-4 pt-6 text-left sm:grid-cols-[4rem_1fr]"
                >
                  <span className={`label tabular transition-colors duration-500 ${on ? "text-signal-text" : "text-faint"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-serif text-[clamp(2rem,4.6vw,4rem)] leading-none tracking-tight transition-all duration-500 ease-out-expo ${
                      on ? "translate-x-2 italic" : "hover:translate-x-1"
                    }`}
                  >
                    {it.title}
                  </span>
                </button>
                <div
                  id={`interest-${it.id}`}
                  className={`grid pl-[4rem] transition-[grid-template-rows] duration-500 ease-out-expo sm:pl-[5rem] ${
                    on ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[46ch] pt-3 leading-relaxed text-muted">{it.detail}</p>
                    {on && (
                      <div className="mt-6 max-w-xs lg:hidden">
                        <Figure shape={shape} formation={formation} onCycle={cycle} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-6" />
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24">
            <Figure shape={shape} formation={formation} onCycle={cycle} />
          </div>
        </div>
      </div>
    </section>
  );
}
