"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { isPlaceholder, site } from "@/content/site";
import { withBase } from "@/lib/paths";
import { CornerTicks, EASE, Magnetic, MaskLines, Reveal, Rule, SheetHeader } from "./primitives";

function Value({ text }: { text: string }) {
  if (!isPlaceholder(text)) return <>{text}</>;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3 text-faint">
      <span className="label text-signal-text">Placeholder</span>
      <span className="italic">{text.replace(/^\[PLACEHOLDER — ?/, "").replace(/\]$/, "")}</span>
    </span>
  );
}

export function Now() {
  return (
    <section
      id="now"
      tabIndex={-1}
      aria-labelledby="now-title"
      className="gutter relative py-28 outline-none sm:py-40"
    >
      <SheetHeader id="now" note="Current state" />
      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <MaskLines id="now-title" className="display text-[clamp(4rem,12vw,11rem)]" lines={["*Now.*"]} />
          <Reveal delay={0.15}>
            <p className="label mt-8 text-muted">
              Last updated — <Value text={site.now.updated} />
            </p>
          </Reveal>
        </div>
        <dl className="border-t border-line-strong lg:col-span-7 lg:self-end">
          {site.now.items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.07} y={12}>
              <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-line py-5 sm:grid-cols-[9rem_1fr]">
                <dt className="label text-muted">{it.label}</dt>
                <dd className="font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
                  <Value text={it.value} />
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="label relative inline-flex h-9 min-w-[7.5rem] items-center justify-center overflow-hidden border border-line-strong px-3 text-muted transition-colors hover:border-fg hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "y" : "n"}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className={copied ? "text-signal-text" : ""}
        >
          {copied ? "Copied ✓" : "Copy address"}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}

function ActionLink({ href, children, download, external }: { href: string; children: React.ReactNode; download?: boolean; external?: boolean }) {
  return (
    <Magnetic strength={0.25}>
      <a
        href={href}
        download={download || undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group relative inline-flex items-center gap-3 px-6 py-4 text-sm transition-colors hover:text-signal-text"
      >
        <CornerTicks className="text-line-strong group-hover:text-signal [&>span]:group-hover:h-4 [&>span]:group-hover:w-4" />
        {children}
      </a>
    </Magnetic>
  );
}

export function Contact() {
  const [user, domain] = site.email.split("@");
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="gutter relative flex min-h-[100svh] flex-col pb-32 pt-28 outline-none sm:pb-10 sm:pt-40"
    >
      <SheetHeader id="contact" note="Correspondence" />

      <div className="mt-16 flex-1 lg:mt-24">
        <MaskLines
          id="contact-title"
          className="display text-[clamp(5rem,17vw,17rem)]"
          lines={["Your *move.*"]}
        />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[44ch] text-lg leading-snug text-muted">
            Open to conversations about research, graduate study, collaboration — or a game of chess.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-16">
          <Magnetic strength={0.12} className="max-w-full">
            <a
              href={`mailto:${site.email}`}
              className="group relative inline-block max-w-full break-all text-[clamp(1.6rem,6vw,6rem)] font-semibold leading-none tracking-[-0.045em]"
            >
              {user}
              <span className="voice-int font-normal text-signal-text">@</span>
              {domain}
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-signal transition-transform duration-700 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          </Magnetic>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail />
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mt-14 flex flex-wrap gap-2">
          <ActionLink href={withBase(site.cvFile)} download>
            <span className="label">Download CV</span>
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">↓</span>
          </ActionLink>
          {site.profiles.map((p) => (
            <ActionLink key={p.label} href={p.href} external>
              <span className="label">{p.label}</span>
              <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </ActionLink>
          ))}
        </Reveal>
      </div>

      <footer className="mt-28">
        <Rule />
        <div className="label mt-5 grid grid-cols-2 gap-y-3 text-faint md:grid-cols-4">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="text-right md:text-left">Drawn in {site.location}</span>
          <span>End of drawing · Sheet 09 / 09</span>
          <a href="#top" className="text-right transition-colors hover:text-fg">
            Back to title ↑
          </a>
        </div>
        <p className="label mt-6 text-center text-faint/70 md:text-left" aria-hidden>
          Plays chess? Type a first move — <span className="text-muted">e4</span>, anywhere.
        </p>
      </footer>
    </section>
  );
}
