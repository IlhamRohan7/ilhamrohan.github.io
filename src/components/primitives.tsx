"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { sheets } from "@/content/site";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** prefers-reduced-motion, hydration-safe (false on the server and first paint). */
export function useReduced() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

/* ───────── Rich text: *serif italic* and _grotesk_ voices ───────── */
export type Token = { text: string; voice: "int" | "eng" | null; tail?: string };

export function tokenize(text: string): Token[] {
  const out: Token[] = [];
  for (const part of text.split(/(\*[^*]+\*|_[^_]+_)/g)) {
    if (!part) continue;
    const voice = part.startsWith("*") ? "int" : part.startsWith("_") ? "eng" : null;
    let clean = voice ? part.slice(1, -1) : part;
    const prev = out[out.length - 1];
    // "*think*." → keep the full stop hugging the voiced word
    if (!voice && prev?.voice && /^\S/.test(clean)) {
      const [lead] = clean.match(/^\S+/)!;
      prev.tail = (prev.tail ?? "") + lead;
      clean = clean.slice(lead.length);
    }
    for (const w of clean.split(/(\s+)/)) if (w.trim()) out.push({ text: w, voice });
  }
  return out;
}

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*|_[^_]+_)/g).map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*") && part.length > 1)
          return <em key={i} className="voice-int">{part.slice(1, -1)}</em>;
        if (part.startsWith("_") && part.endsWith("_") && part.length > 1)
          return <span key={i} className="voice-eng">{part.slice(1, -1)}</span>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ───────── Reveal: fade + rise once in view ───────── */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  const reduce = useReduced();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ───────── MaskLines: each line rises out of a clipping mask ───────── */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
  stagger = 0.08,
  id,
}: {
  id?: string;
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReduced();
  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduce ? false : { y: "105%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            <Rich text={line} />
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ───────── Rule: hairline that draws in from the left ───────── */
export function Rule({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReduced();
  return (
    <motion.div
      aria-hidden
      className={`h-px origin-left bg-line-strong ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

/* ───────── SheetHeader: "SHEET 03 / 09 ── RESEARCH" ───────── */
export function SheetHeader({ id, note }: { id: (typeof sheets)[number]["id"]; note?: string }) {
  const i = sheets.findIndex((s) => s.id === id);
  const n = String(i + 1).padStart(2, "0");
  const total = String(sheets.length).padStart(2, "0");
  return (
    <div className="flex items-center gap-4 text-muted" aria-hidden>
      <span className="label tabular whitespace-nowrap">
        <span className="text-signal-text">■</span>&nbsp; Sheet {n} / {total}
      </span>
      <Rule className="flex-1" />
      <span className="label whitespace-nowrap">{note ?? sheets[i].title}</span>
    </div>
  );
}

/* ───────── DimensionLine: |←── label ──→| drawn from the centre ───────── */
export function DimensionLine({
  label,
  className = "",
  delay = 0,
  animateOnMount = false,
}: {
  label: ReactNode;
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReduced();
  const trigger = animateOnMount ? { animate: { scaleX: 1 } } : { whileInView: { scaleX: 1 } };
  const labelTrigger = animateOnMount ? { animate: { opacity: 1 } } : { whileInView: { opacity: 1 } };
  return (
    <div className={`relative flex items-center text-signal ${className}`} aria-hidden>
      <span className="h-3 w-px bg-current" />
      <motion.span
        className="relative flex h-px flex-1 items-center bg-current"
        initial={reduce ? false : { scaleX: 0 }}
        {...trigger}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        <span className="absolute left-0 -translate-y-px border-y-[3px] border-r-[7px] border-y-transparent border-r-current" />
        <span className="absolute right-0 -translate-y-px border-y-[3px] border-l-[7px] border-y-transparent border-l-current" />
      </motion.span>
      <motion.span
        className="label tabular absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-bg px-2 text-signal-text"
        initial={reduce ? false : { opacity: 0 }}
        {...labelTrigger}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.7 }}
      >
        {label}
      </motion.span>
      <span className="h-3 w-px bg-current" />
    </div>
  );
}

/* ───────── Magnetic: element gently follows a fine pointer ───────── */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduced();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* Corner ticks, like registration marks on a drawing */
export function CornerTicks({ className = "" }: { className?: string }) {
  const c = "absolute h-2.5 w-2.5 border-current transition-all duration-500 ease-out-expo";
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
