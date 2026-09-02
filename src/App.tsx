import { useCallback, useState, Suspense, lazy } from 'react'
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

// Below-the-fold sections are code-split so the initial bundle stays light.
const EngineeringMindset = lazy(() => import('./sections/EngineeringMindset'))
const SystemSimulation = lazy(() => import('./sections/SystemSimulation'))
const DatabaseExplorer = lazy(() => import('./sections/DatabaseExplorer'))
const TerminalSection = lazy(() => import('./sections/Terminal').then((m) => ({ default: m.TerminalSection })))
const CodeEditor = lazy(() => import('./sections/CodeEditor'))
const TechConstellation = lazy(() => import('./sections/TechConstellation'))
const Projects = lazy(() => import('./sections/Projects'))
const FeaturedCaseStudy = lazy(() => import('./sections/FeaturedCaseStudy'))
const ExperienceEducation = lazy(() => import('./sections/ExperienceEducation'))
const GithubSection = lazy(() => import('./sections/GithubSection'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./sections/Footer'))

function SectionFallback() {
  return <div style={{ minHeight: '40vh' }} aria-hidden="true" />
}

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
        <Suspense fallback={<SectionFallback />}>
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
        </Suspense>
      </main>
    </>
  )
}
