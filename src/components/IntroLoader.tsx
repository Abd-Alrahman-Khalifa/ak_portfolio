import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const phrases = ['INITIALIZING…', 'BUILDING EXPERIENCE…']

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visible, setVisible] = useState(!reduced)
  const doneCalledRef = useRef(false)

  useEffect(() => {
    if (reduced) {
      if (!doneCalledRef.current) {
        doneCalledRef.current = true
        onDone()
      }
      return
    }
    const totalMs = 950
    const start = performance.now()
    let raf: number

    const tick = (t: number) => {
      const elapsed = t - start
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100))
      setProgress(pct)
      setPhraseIndex(pct > 55 ? 1 : 0)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onDone, 500)
        }, 150)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, onDone])

  if (reduced) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-display text-5xl md:text-6xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            AK
          </div>
          <div className="mt-6 font-mono text-xs tracking-[0.3em]" style={{ color: 'var(--text-secondary)' }}>
            {phrases[phraseIndex]}
          </div>
          <div className="mt-8 h-px w-48 overflow-hidden" style={{ background: 'var(--border)' }}>
            <div
              className="h-full"
              style={{ width: `${progress}%`, background: 'var(--accent)', transition: 'width 0.1s linear' }}
            />
          </div>
          <div className="mt-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
