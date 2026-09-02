import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

export default function InteractiveBackground() {
  const glowRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    let tx = 0.5
    let ty = 0.3
    let cx = tx
    let cy = ty

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth
      ty = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      cx += (tx - cx) * 0.04
      cy += (ty - cy) * 0.04
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${cx * 100}% ${cy * 100}%, var(--accent-soft), transparent 70%)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 30%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black, transparent 75%)',
        }}
      />
      {/* mouse-reactive glow */}
      <div ref={glowRef} className="absolute inset-0 transition-opacity" />
      <div className="noise-overlay" />
    </div>
  )
}
