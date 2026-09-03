import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { scrollToSection } from '../data/nav'
import Magnetic from '../components/Magnetic'
import ArchitectureFlow from '../components/ArchitectureFlow'
import { useParallax } from '../hooks/useParallax'

export default function Hero() {
  const flowRef = useRef<HTMLDivElement>(null)
  useParallax(flowRef, 60)
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center container-px pt-32 pb-16">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6 font-mono text-xs tracking-widest"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: profile.available ? 'var(--success)' : 'var(--text-muted)' }}
            />
            {profile.available ? 'AVAILABLE FOR OPPORTUNITIES' : 'CURRENTLY UNAVAILABLE'}
          </motion.div>

          <h1 className="font-display font-medium leading-[0.92] tracking-tight text-[clamp(3rem,9vw,7.5rem)]">
            {profile.heroWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block"
                style={{ color: i === 1 ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-8 font-display text-xl md:text-2xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {profile.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-3 max-w-xl text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {profile.heroSubline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic cursorLabel="VIEW">
              <button
                onClick={() => scrollToSection('projects')}
                className="rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                VIEW MY WORK
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-full border px-7 py-3.5 text-sm font-semibold tracking-wide"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                LET'S TALK
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cvPath}
                download="AbdAlrahman-Khalifa-CV.pdf"
                className="flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Download size={15} /> DOWNLOAD CV
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          ref={flowRef}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <ArchitectureFlow />
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest"
        style={{ color: 'var(--text-muted)' }}
      >
        SCROLL
        <ArrowDown size={14} />
      </motion.button>
    </section>
  )
}
