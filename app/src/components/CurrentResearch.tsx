import { motion } from 'framer-motion'
import { currentResearch as r } from '../data/research'
import Reveal, { SectionHead } from './Reveal'

function Diagram() {
  const net = [
    [380, 120], [440, 80], [470, 160], [410, 210], [350, 240], [450, 250], [500, 215],
  ]
  const edges = [[0, 1], [1, 2], [0, 3], [3, 2], [3, 4], [3, 5], [5, 6], [2, 6], [0, 2]]
  return (
    <svg
      viewBox="0 0 640 360"
      role="img"
      aria-label="Diagram: human intelligence and artificial intelligence overlap to form collaborative Industry 5.0 manufacturing systems"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="hg" cx="35%" cy="35%">
          <stop offset="0" stopColor="#000" stopOpacity="0.07" />
          <stop offset="1" stopColor="#000" stopOpacity="0.015" />
        </radialGradient>
        <radialGradient id="ag" cx="65%" cy="35%">
          <stop offset="0" stopColor="#6f9ab6" stopOpacity="0.3" />
          <stop offset="1" stopColor="#a8c5d8" stopOpacity="0.06" />
        </radialGradient>
      </defs>

      {/* the two circles draw themselves when the card scrolls into view */}
      <motion.circle
        cx="240" cy="180" r="130" fill="url(#hg)" stroke="rgba(0,0,0,0.2)"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="400" cy="180" r="130" fill="url(#ag)" stroke="rgba(111,154,182,0.7)"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        whileInView={{ pathLength: 1, fillOpacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: 1.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* human side: organic flowing curves */}
      <g fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="1.2">
        <path d="M140 150 C 175 110, 215 120, 240 150 S 290 200, 320 170" className="dash-flow" />
        <path d="M130 200 C 170 240, 220 235, 250 205 S 300 160, 330 195" className="dash-flow" />
        <path d="M150 175 C 190 160, 220 175, 250 175" />
      </g>

      {/* AI side: network */}
      <g stroke="rgba(0,0,0,0.25)" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line key={i} x1={net[a][0]} y1={net[a][1]} x2={net[b][0]} y2={net[b][1]} />
        ))}
      </g>
      {net.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#1d1d1f" className="pulse-dot" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}

      {/* shared core */}
      <ellipse cx="320" cy="180" rx="38" ry="104" fill="rgba(255,255,255,0.7)" stroke="rgba(0,0,0,0.18)" />
      <circle cx="320" cy="180" r="8" fill="var(--mist-deep)" className="pulse-dot" />

      <g fontSize="17" fontWeight="600" fill="#1d1d1f" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">
        <text x="190" y="62">Human intelligence</text>
        <text x="450" y="62">Artificial intelligence</text>
        <text x="320" y="335" fill="#4a4a4f" fontWeight="500">Collaborative smart manufacturing · Industry 5.0</text>
      </g>
    </svg>
  )
}

export default function CurrentResearch() {
  const details = [
    ['Objective', r.details.objective],
    ['My role', r.details.role],
    ['Methodology', r.details.methodology],
    ['Progress', r.details.progress],
  ].filter(([, v]) => v)

  return (
    <section id="current" className="section">
      <div className="container-x">
        <SectionHead eyebrow="Current Research" title="What I'm working on now." />
        <Reveal>
          <div className="glass overflow-hidden" style={{ borderRadius: 36 }}>
            <div className="grid items-center lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="dot-mist absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
                    <span className="dot-mist relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  {r.status}
                </span>
                <h3 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.6rem]">{r.title}</h3>
                <p className="lead mt-5">{r.description}</p>

                {details.length > 0 && (
                  <dl className="mt-6 space-y-3">
                    {details.map(([k, v]) => (
                      <div key={k}>
                        <dt className="eyebrow !text-[0.7rem]">{k}</dt>
                        <dd className="text-[color:var(--ink-2)]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <ul className="mt-8 flex flex-wrap gap-2">
                  {r.pillars.map((p) => (
                    <li key={p} className="chip">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-black/5 bg-gradient-to-br from-white/60 to-black/[0.03] p-6 md:p-10 lg:border-l lg:border-t-0">
                <Diagram />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
