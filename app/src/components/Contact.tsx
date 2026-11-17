import { ArrowUpRight, Download, Mail, Phone } from 'lucide-react'
import { links, profile } from '../data/profile'
import Reveal, { SectionHead } from './Reveal'

export default function Contact() {
  const phoneHref = profile.phone ? `tel:${profile.phone.replace(/[^\d+]/g, '')}` : ''
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHead
          eyebrow="Contact"
          title="Let's talk research."
          lead="Open to academic conversations, research collaboration and learning from researchers in related fields."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <a href={`mailto:${profile.email}`} className="glass glass-lift flex h-full items-center gap-5 p-7 no-underline" style={{ borderRadius: 26 }}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1d1d1f] text-white">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="eyebrow !text-[0.7rem] block">Email</span>
                <span className="block break-all text-lg font-medium">{profile.email}</span>
              </span>
            </a>
          </Reveal>

          {profile.phone && (
            <Reveal delay={0.08}>
              <a href={phoneHref} className="glass glass-lift flex h-full items-center gap-5 p-7 no-underline" style={{ borderRadius: 26 }}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1d1d1f] text-white">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="eyebrow !text-[0.7rem] block">Phone</span>
                  <span className="block text-lg font-medium">{profile.phone}</span>
                </span>
              </a>
            </Reveal>
          )}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={(i % 3) * 0.08}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-lift group flex h-full items-center justify-between gap-4 p-6 no-underline"
                style={{ borderRadius: 22 }}
              >
                <span className="min-w-0">
                  <span className="block text-lg font-semibold tracking-tight">{l.label}</span>
                  <span className="block truncate text-sm text-[color:var(--ink-3)]">{l.note}</span>
                </span>
                <ArrowUpRight size={20} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a href={`./${profile.cvFile}`} download className="btn btn-primary">
            <Download size={16} /> Download CV (PDF)
          </a>
        </Reveal>
      </div>
    </section>
  )
}
