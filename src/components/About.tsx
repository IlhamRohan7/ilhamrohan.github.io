import { GraduationCap, Languages, MapPin, Target } from 'lucide-react'
import { aboutParagraphs, languages, profile } from '../data/profile'
import { education } from '../data/education'
import Reveal, { SectionHead } from './Reveal'

const facts = [
  { icon: GraduationCap, label: 'Studying', value: 'Industrial & Production Engineering', sub: [profile.institutionShort, education.currentStage, `Expected ${education.graduation}`].filter(Boolean).join(' · ') },
  { icon: Target, label: 'Focus', value: 'AI-driven industrial systems', sub: 'Industry 5.0 · Operations · Data' },
  { icon: MapPin, label: 'Currently living in', value: 'Sylhet', sub: 'Bangladesh' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHead eyebrow="About" title="Engineering, with intelligence and people in mind." />
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="space-y-6">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? 'text-xl leading-relaxed md:text-2xl md:leading-relaxed' : 'lead'}>{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="grid gap-4 self-start">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={0.1 + i * 0.1}>
                <div className="glass glass-lift flex items-start gap-4 p-6" style={{ borderRadius: 24 }}>
                  <f.icon size={22} strokeWidth={1.6} className="mt-1 shrink-0 text-[color:var(--ink-3)]" aria-hidden="true" />
                  <div>
                    <p className="eyebrow !text-[0.7rem]">{f.label}</p>
                    <p className="mt-1 text-lg font-medium leading-snug">{f.value}</p>
                    <p className="text-sm text-[color:var(--ink-3)]">{f.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <div className="glass glass-lift flex items-start gap-4 p-6" style={{ borderRadius: 24 }}>
                <Languages size={22} strokeWidth={1.6} className="mt-1 shrink-0 text-[color:var(--ink-3)]" aria-hidden="true" />
                <div className="flex-1">
                  <p className="eyebrow !text-[0.7rem]">Languages</p>
                  <ul className="mt-2 space-y-1.5">
                    {languages.map((l) => (
                      <li key={l.name} className="flex items-center justify-between gap-4">
                        <span className="text-lg font-medium leading-snug">{l.name}</span>
                        <span className="chip !py-0.5 !text-xs">{l.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
