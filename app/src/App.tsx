import { useEffect } from 'react'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import ResearchInterests from './components/ResearchInterests'
import CurrentResearch from './components/CurrentResearch'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Beyond from './components/Beyond'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Feed the pointer position to hovered cards so their mist-blue glow follows the cursor.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.('.glass-lift') as HTMLElement | null
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[#1d1d1f] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <ResearchInterests />
        <CurrentResearch />
        <Projects />
        <Skills />
        <Education />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
