import { motion } from 'framer-motion'
import { ArrowDown, FileText, Mail } from 'lucide-react'
import { profile } from '../data/profile'

const ease = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease },
})

function Geometry() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 800"
      className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2"
      fill="none"
    >
      <g className="spin-slow" stroke="rgba(0,0,0,0.07)">
        <circle cx="400" cy="400" r="380" />
        <circle cx="400" cy="400" r="300" strokeDasharray="2 8" />
        <circle cx="400" cy="400" r="220" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180
          return <circle key={a} cx={400 + 300 * Math.cos(r)} cy={400 + 300 * Math.sin(r)} r="4" fill="rgba(0,0,0,0.18)" stroke="none" />
        })}
      </g>
      <g className="spin-slow-rev" stroke="rgba(0,0,0,0.06)">
        <polygon points="400,60 694,230 694,570 400,740 106,570 106,230" />
        <polygon points="400,150 616,275 616,525 400,650 184,525 184,275" strokeDasharray="3 7" />
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-16 pt-28">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />

      {/* floating translucent shapes */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-24 top-[18%] h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.07), rgba(0,0,0,0) 70%)' }}
        animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="glass absolute right-[7%] top-[22%] hidden h-28 w-28 md:block"
        style={{ borderRadius: 32 }}
        animate={{ y: [0, 20, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="glass absolute bottom-[16%] left-[8%] hidden h-20 w-20 rounded-full md:block"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Geometry />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p {...rise(0.15)} className="eyebrow">
          {profile.role}
        </motion.p>
        <motion.h1 {...rise(0.3)} className="hero-name mt-5">
          {profile.name}
        </motion.h1>
        <motion.p {...rise(0.55)} className="mx-auto mt-3 text-base text-[color:var(--ink-3)] md:text-lg">
          {profile.institution}
        </motion.p>

        <motion.p
          {...rise(0.8)}
          className="mx-auto mt-10 max-w-3xl text-balance text-2xl font-medium leading-snug tracking-tight md:text-4xl"
        >
          {profile.tagline}
        </motion.p>
        <motion.p {...rise(0.95)} className="lead mx-auto mt-5 text-balance">
          {profile.subtagline}
        </motion.p>

        <motion.div {...rise(1.1)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#research" className="btn btn-primary">
            Explore My Research <ArrowDown size={16} />
          </a>
          <a href={`./${profile.cvFile}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FileText size={16} /> View My CV
          </a>
          <a href="#contact" className="btn btn-ghost">
            <Mail size={16} /> Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
