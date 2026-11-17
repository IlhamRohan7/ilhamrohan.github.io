import { ArrowUpRight, Layers } from 'lucide-react'
import { projects } from '../data/projects'
import { links } from '../data/profile'
import Reveal, { SectionHead } from './Reveal'

const github = links.find((l) => l.label === 'GitHub')!

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container-x">
        <SectionHead
          eyebrow="Projects"
          title="Selected work."
          lead="Engineering design, analysis and research projects."
        />

        {projects.length === 0 ? (
          <Reveal>
            <div className="glass mx-auto flex max-w-3xl flex-col items-center px-8 py-14 text-center md:py-20" style={{ borderRadius: 32 }}>
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-black/10 bg-white/80">
                <Layers size={24} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">Projects are being curated</h3>
              <p className="lead mt-3">
                SolidWorks designs, AutoCAD drawings, Python and Excel analyses, and research work will be added here as they are finalised.
              </p>
              <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
                Browse GitHub <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <article className="glass glass-lift flex h-full flex-col overflow-hidden" style={{ borderRadius: 26 }}>
                  {p.image && <img src={p.image} alt={p.imageAlt ?? p.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow !text-[0.7rem]">{p.category}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-[color:var(--ink-2)]">{p.overview}</p>
                    <p className="mt-3 text-sm text-[color:var(--ink-3)]">
                      <span className="font-semibold text-[color:var(--ink-2)]">My contribution: </span>
                      {p.contribution}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
                        {p.linkLabel ?? 'View project'} <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
