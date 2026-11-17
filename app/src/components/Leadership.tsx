import { leadership } from '../data/leadership'
import Reveal, { SectionHead } from './Reveal'

export default function Leadership() {
  return (
    <section id="leadership" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Leadership & Activities" title="Beyond the classroom." />
        <ol className="relative space-y-4 border-l border-black/10 pl-6 md:pl-10">
          {leadership.map((r, i) => {
            const current = !r.end
            const period = current ? (r.start ? `${r.start} – Present` : 'Present') : `${r.start} – ${r.end}`
            return (
              <li key={`${r.organisation}-${r.role}`} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-8 h-3 w-3 -translate-x-1/2 rounded-full ${current ? 'dot-mist ring-8 ring-[rgba(168,197,216,0.3)]' : 'bg-black/25'}`}
                  style={{ left: 'calc(-1.5rem - 0.5px)' }}
                />
                <Reveal delay={i * 0.08}>
                  <div
                    className="glass glass-lift flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between md:p-8"
                    style={{ borderRadius: 24 }}
                  >
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{r.role}</h3>
                      <p className="mt-1 text-[color:var(--ink-2)]">
                        {r.organisation} · {r.place}
                      </p>
                    </div>
                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                        current ? 'border-[rgba(111,154,182,0.35)] bg-[rgba(168,197,216,0.22)]' : 'border-black/10 bg-white/80 text-[color:var(--ink-2)]'
                      }`}
                    >
                      {current && <span className="dot-mist h-2 w-2 rounded-full" aria-hidden="true" />}
                      {period}
                    </span>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
