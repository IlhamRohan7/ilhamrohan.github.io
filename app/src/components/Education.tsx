import { education as e, previousEducation } from '../data/education'
import Reveal, { SectionHead } from './Reveal'

export default function Education() {
  return (
    <section id="education" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container-x">
        <SectionHead eyebrow="Education" title="Academic background." />
        <Reveal>
          <div className="glass relative overflow-hidden" style={{ borderRadius: 36 }}>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-10 select-none text-[clamp(8rem,28vw,20rem)] font-semibold leading-none tracking-tighter text-black/[0.045]"
            >
              {e.graduation}
            </span>
            <div className="relative grid gap-8 p-8 md:grid-cols-[auto_1fr] md:gap-14 md:p-14">
              <div className="flex md:flex-col md:items-start md:gap-1">
                <div className="flex flex-col items-center gap-2 md:items-start">
                  <span className="dot-mist h-3 w-3 rounded-full ring-8 ring-[rgba(168,197,216,0.3)]" />
                  <span className="hidden h-24 w-px bg-gradient-to-b from-black/30 to-transparent md:block" />
                </div>
              </div>
              <div>
                <p className="eyebrow">{e.status}</p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{e.degree}</h3>
                <p className="mt-4 text-xl text-[color:var(--ink-2)]">{e.institution}</p>
                <p className="text-[color:var(--ink-3)]">{e.location}</p>
                {e.currentStage && (
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-sm font-medium">
                    <span className="dot-mist h-2 w-2 rounded-full" aria-hidden="true" />
                    Currently in {e.currentStage}
                  </p>
                )}
                <p className="mt-8 text-5xl font-semibold tracking-tight md:text-6xl">
                  <span className="mr-3 align-middle text-sm font-medium uppercase tracking-widest text-[color:var(--ink-3)]">
                    Expected
                  </span>
                  {e.graduation}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {previousEducation.map((p) => (
          <Reveal key={p.degree} delay={0.1} className="mt-4">
            <div className="glass flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between md:p-9" style={{ borderRadius: 28 }}>
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{p.degree}</h3>
                <p className="mt-1 text-[color:var(--ink-2)]">
                  {p.institution} · {p.location}
                </p>
              </div>
              <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-1">
                <span className="text-3xl font-semibold tracking-tight">{p.year}</span>
                <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-sm font-medium">{p.result}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
