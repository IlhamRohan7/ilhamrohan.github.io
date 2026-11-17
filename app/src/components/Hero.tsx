import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, FileText, Mail } from 'lucide-react'
import { profile } from '../data/profile'

const ease = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 26, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, delay, ease },
})

function Geometry() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 800"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2"
      fill="none"
    >
      <g className="spin-slow" stroke="rgba(0,0,0,0.07)">
        <circle cx="400" cy="400" r="380" />
        <circle cx="400" cy="400" r="300" strokeDasharray="2 8" stroke="rgba(111,154,182,0.45)" />
        <circle cx="400" cy="400" r="220" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180
          return (
            <circle
              key={a}
              cx={400 + 300 * Math.cos(r)}
              cy={400 + 300 * Math.sin(r)}
              r="4"
              fill={a % 120 === 0 ? 'var(--mist-deep)' : 'rgba(0,0,0,0.18)'}
              stroke="none"
            />
          )
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
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // content gently lifts and fades as the visitor scrolls away
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -70])
  const geoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])

  const letters = profile.name.split('')

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-20 pt-28">
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
        className="absolute -right-28 bottom-[6%] h-[26rem] w-[26rem] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(168,197,216,0.42), rgba(168,197,216,0) 70%)' }}
        animate={{ y: [0, 22, 0], x: [0, -18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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
      <motion.div aria-hidden="true" className="absolute inset-0" style={reduce ? undefined : { scale: geoScale }}>
        <Geometry />
      </motion.div>

      <motion.div className="relative z-10 mx-auto max-w-5xl text-center" style={reduce ? undefined : { opacity, y }}>
        <motion.p {...rise(0.15)} className="eyebrow">
          {profile.role}
        </motion.p>

        <h1 className="hero-name mt-5" aria-label={profile.name}>
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="hero-letter"
              initial={{ opacity: 0, y: '0.35em', filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.05, ease }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p {...rise(0.95)} className="mx-auto mt-3 text-base text-[color:var(--ink-3)] md:text-lg">
          {profile.institution}
        </motion.p>

        <motion.p
          {...rise(1.15)}
          className="mx-auto mt-10 max-w-3xl text-balance text-2xl font-medium leading-snug tracking-tight md:text-4xl"
        >
          {profile.tagline}
        </motion.p>
        <motion.p {...rise(1.3)} className="lead mx-auto mt-5 text-balance">
          {profile.subtagline}
        </motion.p>

        <motion.div {...rise(1.45)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="scroll-cue absolute bottom-5 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span />
      </motion.div>
    </section>
  )
}
