import { useCallback, useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'
import { useKeyboardNav } from './hooks/useKeyboardNav'
import IntroLoader from './components/IntroLoader'
import CustomCursor from './components/CustomCursor'
import InteractiveBackground from './components/InteractiveBackground'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'

import Hero from './sections/Hero'
import About from './sections/About'
import EngineeringMindset from './sections/EngineeringMindset'
import SystemSimulation from './sections/SystemSimulation'
import DatabaseExplorer from './sections/DatabaseExplorer'
import { TerminalSection } from './sections/Terminal'
import CodeEditor from './sections/CodeEditor'
import TechConstellation from './sections/TechConstellation'
import Projects from './sections/Projects'
import FeaturedCaseStudy from './sections/FeaturedCaseStudy'
import ExperienceEducation from './sections/ExperienceEducation'
import GithubSection from './sections/GithubSection'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

// NOTE: sections are imported eagerly (not React.lazy) on purpose — the nav's
// IntersectionObserver and the command palette's scrollToSection both need
// every #section-id to already exist in the DOM as soon as the app mounts.
// Lazy-loading them broke both features, since the chunks hadn't resolved
// yet when the observer was set up.

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useLenis()
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  useKeyboardNav(openPalette)

  return (
    <>
      <IntroLoader onDone={() => setIntroDone(true)} />
      <CustomCursor />
      <InteractiveBackground />
      <ScrollProgress />
      <Navigation theme={theme} onToggleTheme={toggle} onOpenPalette={openPalette} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main className="relative z-10" style={{ opacity: introDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Hero />
        <About />
        <EngineeringMindset />
        <SystemSimulation />
        <DatabaseExplorer />
        <TerminalSection />
        <CodeEditor />
        <TechConstellation />
        <Projects />
        <FeaturedCaseStudy />
        <ExperienceEducation />
        <GithubSection />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
