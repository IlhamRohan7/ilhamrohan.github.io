import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin mist-blue reading-progress line at the very top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, var(--mist), var(--mist-deep))' }}
    />
  )
}
