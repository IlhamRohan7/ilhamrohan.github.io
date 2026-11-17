import { ArrowUpRight, BookOpen, Clapperboard, Crown, Goal, Sparkles, type LucideIcon } from 'lucide-react'
import { interests } from '../data/education'
import Reveal, { SectionHead } from './Reveal'

const icons: Record<string, LucideIcon> = { reading: BookOpen, chess: Crown, football: Goal, film: Clapperboard }

const cardClass = 'glass glass-lift group flex h-full flex-col p-6 no-underline md:p-7'

export default function Beyond() {
  return (
    <section id="beyond" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Beyond Engineering" title="Outside the lab." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {interests.map((it, i) => {
            const Icon = icons[it.key] ?? Sparkles
            const body = (
              <>
                <div className="flex items-start justify-between">
                  <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                  {it.href && (
                    <ArrowUpRight
                      size={20}
                      className="text-[color:var(--ink-3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3 className="mt-10 text-lg font-semibold tracking-tight">{it.title}</h3>
                <p className="text-sm text-[color:var(--ink-3)]">{it.text}</p>
                {it.href && (
                  <p className="mt-3 text-sm font-medium underline decoration-black/20 underline-offset-4 group-hover:decoration-black/60">
                    {it.linkLabel ?? 'Open link'}
                  </p>
                )}
              </>
            )
            return (
              <Reveal key={it.key} delay={i * 0.08}>
                {it.href ? (
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${it.title}: ${it.linkLabel ?? 'open link'} (opens in a new tab)`}
                    className={cardClass}
                    style={{ borderRadius: 24 }}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cardClass} style={{ borderRadius: 24 }}>
                    {body}
                  </div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
