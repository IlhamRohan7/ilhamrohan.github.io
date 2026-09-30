"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { EASE, Rich, SheetHeader, useReduced } from "./primitives";

const items = site.research;

const lineV = {
  enter: (d: 1 | -1) => ({ y: d === 1 ? "105%" : "-105%" }),
  center: { y: "0%", transition: { duration: 0.9, ease: EASE } },
  exit: (d: 1 | -1) => ({
    y: d === 1 ? "-105%" : "105%",
    transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] as const },
  }),
};
const detailV = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};
const stageV = {
  enter: {},
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.04 } },
};

/** Direction comes from AnimatePresence `custom`, so exiting lines leave the right way. */
function Question({ item, dir }: { item: (typeof items)[number]; dir: 1 | -1 }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      variants={stageV}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <p className="display text-[clamp(2.6rem,8.2vw,8.75rem)] leading-[0.92]">
        {item.question.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <motion.span className="block" variants={lineV} custom={dir}>
              <Rich text={line} />
            </motion.span>
          </span>
        ))}
      </p>
      <motion.p
        variants={detailV}
        className="mt-8 max-w-[38ch] text-base leading-relaxed text-muted sm:text-lg"
      >
        {item.detail}
      </motion.p>
    </motion.div>
  );
}

export function Research() {
  const reduce = useReduced();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length * 0.999)));
    if (i !== active) {
      setDir(i > active ? 1 : -1);
      setActive(i);
    }
  });

  const header = (
    <>
      <SheetHeader id="research" note="Research interests" />
      <h2 id="research-title" className="label mt-8 text-muted">
        Questions worth asking — <span className="text-fg">where machine intelligence meets industrial systems</span>
      </h2>
    </>
  );

  if (reduce) {
    return (
      <section id="research" tabIndex={-1} aria-labelledby="research-title" className="gutter py-32 outline-none">
        {header}
        <ol className="mt-16 space-y-20">
          {items.map((it) => (
            <li key={it.code}>
              <p className="label text-signal-text">
                {it.code} — {it.area}
              </p>
              <p className="display mt-4 text-[clamp(2.4rem,6vw,6rem)] leading-[0.95]">
                {it.question.map((l, i) => (
                  <span key={i} className="block">
                    <Rich text={l} />
                  </span>
                ))}
              </p>
              <p className="mt-6 max-w-[38ch] text-muted">{it.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="research"
      tabIndex={-1}
      aria-labelledby="research-title"
      className="relative outline-none"
      style={{ height: `${items.length * 85 + 100}vh` }}
    >
      <div className="gutter sticky top-0 flex h-[100svh] flex-col pb-28 pt-16 sm:pb-16 lg:pt-20">
        {header}

        <div className="relative mt-6 grid flex-1 gap-8 lg:grid-cols-12">
          {/* Index */}
          <ol className="flex gap-2 lg:col-span-3 lg:flex-col lg:justify-center lg:gap-0" aria-label="Research areas">
            {items.map((it, i) => (
              <li
                key={it.code}
                aria-current={i === active ? "step" : undefined}
                className="relative flex-1 border-t border-line pt-3 lg:flex-none lg:border-l lg:border-t-0 lg:py-4 lg:pl-5 lg:pt-4"
              >
                {i === active && (
                  <motion.span
                    layoutId="research-tick"
                    className="absolute -top-px left-0 h-px w-full bg-signal lg:-left-px lg:top-0 lg:h-full lg:w-px"
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                )}
                <span className={`label tabular block transition-colors duration-500 ${i === active ? "text-signal-text" : "text-faint"}`}>
                  {it.code}
                </span>
                <span
                  className={`mt-1 hidden text-sm transition-colors duration-500 lg:block ${i === active ? "text-fg" : "text-faint"}`}
                >
                  {it.area}
                </span>
              </li>
            ))}
          </ol>

          {/* Question stage */}
          <div className="relative min-h-[22rem] lg:col-span-9" aria-live="polite">
            <p className="label absolute left-0 top-0 text-muted lg:hidden">{items[active].area}</p>
            <AnimatePresence initial={false} custom={dir}>
              <Question key={active} item={items[active]} dir={dir} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
