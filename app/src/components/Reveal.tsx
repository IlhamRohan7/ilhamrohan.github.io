import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const
const viewport = { once: true, margin: '0px 0px -80px 0px' }

export default function Reveal({
  children,
  delay = 0,
  className,
  blur = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  /** soft focus-in; used for headings only, to keep scrolling smooth */
  blur?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.985, ...(blur ? { filter: 'blur(10px)' } : {}) }}
      whileInView={{ opacity: 1, y: 0, scale: 1, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={viewport}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal blur>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2">{title}</h2>
      </Reveal>
      {/* mist-blue hairline that draws itself in */}
      <motion.span
        aria-hidden="true"
        className="hairline mt-6"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 1.1, delay: 0.25, ease }}
      />
      {lead && (
        <Reveal delay={0.15}>
          <p className="lead mt-5">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
