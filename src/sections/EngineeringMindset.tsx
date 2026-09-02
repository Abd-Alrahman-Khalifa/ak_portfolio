import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pipeline } from '../data/stack'
import Reveal from '../components/Reveal'

export default function EngineeringMindset() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="mindset" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          02 / PROCESS
        </span>
        <h2 className="mt-4 font-display font-medium text-[clamp(1.8rem,4vw,3rem)]">HOW I BUILD</h2>
      </Reveal>

      <div className="mt-16 max-w-3xl mx-auto lg:mx-0">
        {pipeline.map((stage, i) => {
          const isOpen = expanded === i
          return (
            <Reveal key={stage.step} delay={i * 0.06}>
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center gap-6 py-6 border-b text-left group"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                  {stage.step}
                </span>
                <span
                  className="font-display text-2xl md:text-3xl flex-1 transition-colors"
                  style={{ color: isOpen ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {stage.label}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="font-mono text-xl"
                  style={{ color: 'var(--text-muted)' }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pl-14 pb-6 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {stage.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
