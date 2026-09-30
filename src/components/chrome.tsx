"use client";

import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, sheets } from "@/content/site";
import { EASE } from "./primitives";

/* ───────── Smooth scroll ───────── */
let lenis: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
  el.focus({ preventScroll: true });
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.9 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Route in-page anchor clicks through the smooth scroller.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

/* ───────── Theme ───────── */
type Theme = "light" | "dark";

function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "dark");
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (stored) return;
      const t: Theme = mq.matches ? "dark" : "light";
      document.documentElement.dataset.theme = t;
      setTheme(t);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }, []);
  return { theme, toggle };
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme !== "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      title={`Switch to ${dark ? "light" : "dark"} mode`}
      className="group relative grid h-full w-full place-items-center transition-colors hover:bg-fg/5"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <motion.path
          d="M12 3.5 A8.5 8.5 0 0 1 12 20.5 Z"
          fill="currentColor"
          initial={false}
          animate={{ rotate: dark ? 0 : 180 }}
          style={{ originX: "50%", originY: "50%" }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </svg>
    </button>
  );
}

/* ───────── Active sheet tracking ───────── */
function useActiveSheet() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = sheets
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(sheets.findIndex((s) => s.id === e.target.id));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top leading-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="inline-block"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ───────── Title block: navigation + progress + theme ───────── */
export function TitleBlock() {
  const active = useActiveSheet();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const n = String(active + 1).padStart(2, "0");

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a[aria-current='true'], a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.parentElement?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <nav
      aria-label="Sheet index"
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[19.5rem]"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="sheet-index"
            initial={{ opacity: 0, y: 12, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            exit={{ opacity: 0, y: 8, clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mb-2 border border-line-strong bg-bg/90 backdrop-blur-xl"
          >
            <p className="label border-b border-line px-4 py-2.5 text-faint">Index of sheets</p>
            <ol>
              {sheets.map((s, i) => (
                <li key={s.id} className="border-b border-line last:border-b-0">
                  <a
                    href={`#${s.id}`}
                    aria-current={i === active ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 px-4 py-2 transition-colors hover:bg-fg/5 aria-[current=true]:text-signal-text"
                  >
                    <span className="label tabular text-faint group-aria-[current=true]:text-signal-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-2xl leading-tight tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:italic">
                      {s.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative grid grid-cols-[1fr_3rem] border border-line-strong bg-bg/80 backdrop-blur-xl">
        <a
          href="#top"
          className="flex items-center justify-between gap-3 border-b border-r border-line px-4 py-2.5"
        >
          <span className="font-serif text-lg leading-none tracking-tight">
            {site.firstName} <em>{site.lastName}</em>
          </span>
          <span className="label text-faint">IPE · SUST</span>
        </a>
        <div className="row-span-2">
          <ThemeToggle />
        </div>
        <button
          ref={btnRef}
          type="button"
          aria-expanded={open}
          aria-controls="sheet-index"
          onClick={() => setOpen((o) => !o)}
          className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 border-r border-line px-4 py-2.5 text-left transition-colors hover:bg-fg/5"
        >
          <span className="label tabular text-muted">
            Sheet <Digit value={n[0]} />
            <Digit value={n[1]} /> / {String(sheets.length).padStart(2, "0")}
          </span>
          <span className="label truncate">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active}
                className="inline-block"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {sheets[active].title}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="label text-muted transition-colors group-hover:text-signal-text">
            {open ? "Close" : "Index"}
          </span>
        </button>
        <motion.span
          aria-hidden
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-signal"
          style={{ scaleX: progress }}
        />
      </div>
    </nav>
  );
}

/* ───────── Drawing frame: zone markers around the viewport ───────── */
export function DrawingFrame() {
  const cols = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const rows = ["A", "B", "C", "D"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 hidden text-faint lg:block">
      <div className="absolute inset-2.5 border border-line" />
      <div className="absolute inset-x-2.5 top-2.5 flex">
        {cols.map((c) => (
          <span key={c} className="relative flex-1 border-r border-line last:border-r-0">
            <span className="label absolute left-1/2 top-0.5 -translate-x-1/2 text-[0.5625rem]">{c}</span>
            <span className="block h-2" />
          </span>
        ))}
      </div>
      <div className="absolute inset-x-2.5 bottom-2.5 flex">
        {cols.map((c) => (
          <span key={c} className="relative flex-1 border-r border-line last:border-r-0">
            <span className="block h-2" />
          </span>
        ))}
      </div>
      <div className="absolute inset-y-2.5 left-2.5 flex flex-col">
        {rows.map((r) => (
          <span key={r} className="relative flex-1 border-b border-line last:border-b-0">
            <span className="label absolute left-1 top-1/2 -translate-y-1/2 text-[0.5625rem]">{r}</span>
            <span className="block w-2" />
          </span>
        ))}
      </div>
      <div className="absolute inset-y-2.5 right-2.5 flex flex-col">
        {rows.map((r) => (
          <span key={r} className="relative flex-1 border-b border-line last:border-b-0">
            <span className="block w-2" />
          </span>
        ))}
      </div>
    </div>
  );
}
