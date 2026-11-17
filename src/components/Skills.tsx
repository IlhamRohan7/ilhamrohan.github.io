import { Box, CalendarCheck, Code2, FileText, PenTool, Presentation, Sigma, Table2, Waves, type LucideIcon } from 'lucide-react'
import { skillGroups } from '../data/skills'
import Reveal, { SectionHead } from './Reveal'

const icons: Record<string, LucideIcon> = {
  SolidWorks: Box,
  AutoCAD: PenTool,
  'COMSOL Multiphysics': Waves,
  Python: Code2,
  'Microsoft Excel': Table2,
  MATLAB: Sigma,
  'Microsoft PowerPoint': Presentation,
  'Microsoft Word': FileText,
  'Event Management': CalendarCheck,
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHead
          eyebrow="Technical Skills"
          title="Tools I work with."
          lead="Practical skills, with an honest statement of proficiency."
        />
        <div className="space-y-12">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <Reveal>
                <h3 className="eyebrow mb-5">{g.title}</h3>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.skills.map((s, i) => {
                  const Icon = icons[s.name] ?? Code2
                  return (
                    <Reveal key={s.name} delay={i * 0.08}>
                      <div className="glass glass-lift flex h-full flex-col p-6" style={{ borderRadius: 24 }}>
                        <div className="flex items-center justify-between">
                          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/80">
                            <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                          </span>
                          {s.level && (
                            <span className="rounded-full bg-[#1d1d1f] px-3 py-1 text-xs font-medium text-white">{s.level}</span>
                          )}
                        </div>
                        <h4 className="mt-6 text-xl font-semibold tracking-tight">{s.name}</h4>
                        <p className="mt-1 text-sm text-[color:var(--ink-3)]">{s.area}</p>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
