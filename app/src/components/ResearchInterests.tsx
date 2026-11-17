import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { appliedContexts, primaryInterests, relatedAreas } from '../data/research'
import Reveal, { SectionHead } from './Reveal'

const ease = [0.22, 1, 0.36, 1] as const

export default function ResearchInterests() {
  const [openId, setOpenId] = useState<string | null>('ai-industry')

  return (
    <section id="research" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container-x">
        <SectionHead
          eyebrow="Research Interests"
          title="Where I'm directing my curiosity."
          lead="These are areas I am exploring and building knowledge in. They are interests, not claims of expertise. My practical tools are listed separately under Technical Skills."
        />

        <h3 className="eyebrow mb-5">Primary interests</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {primaryInterests.map((p, i) => {
            const open = openId === p.id
            return (
              <Reveal key={p.id} delay={(i % 2) * 0.08} className={i === 0 ? 'md:col-span-2' : ''}>
                <div className="glass glass-lift h-full" style={{ borderRadius: 26 }}>
                  <button
                    onClick={() => setOpenId(open ? null : p.id)}
                    aria-expanded={open}
                    aria-controls={`panel-${p.id}`}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-8"
                  >
                    <span>
                      <span className="eyebrow !text-[0.7rem]">0{i + 1}</span>
                      <span className="mt-1 block text-xl font-semibold tracking-tight md:text-2xl">{p.title}</span>
                      <span className="mt-2 block text-[color:var(--ink-2)]">{p.summary}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0, backgroundColor: open ? 'rgba(168,197,216,0.45)' : 'rgba(255,255,255,0.7)' }}
                      transition={{ duration: 0.4, ease }}
                      className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10"
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`panel-${p.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-wrap gap-2 px-6 pb-7 md:px-8 md:pb-8">
                          {p.topics.map((t, k) => (
                            <motion.li
                              key={t}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 + k * 0.05, duration: 0.5, ease }}
                              className="chip"
                            >
                              {t}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>

        <h3 className="eyebrow mb-5 mt-16">Related research areas</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedAreas.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.08}>
              <div className="glass glass-lift h-full p-6" style={{ borderRadius: 22 }}>
                <h4 className="text-lg font-semibold tracking-tight">{g.title}</h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.topics.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="eyebrow mb-5">Applied research contexts</h3>
          <ul className="flex flex-wrap gap-3">
            {appliedContexts.map((c) => (
              <li key={c} className="glass flex items-center gap-2.5 px-5 py-3 text-[0.95rem] font-medium" style={{ borderRadius: 999 }}>
                <span className="dot-mist h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
