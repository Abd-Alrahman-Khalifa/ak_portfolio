import { useEffect, useRef, useState } from 'react'
import { useIsDesktop } from '../hooks/useMediaQuery'

export default function CustomCursor() {
  const isDesktop = useIsDesktop()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!isDesktop) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      const target = e.target as HTMLElement
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null
      setLabel(cursorTarget?.dataset.cursor ?? '')
      if (ringRef.current) {
        ringRef.current.classList.toggle('cursor-active', Boolean(cursorTarget))
      }
    }

    let raf: number
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)
    document.body.classList.add('cursor-enabled')
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.classList.remove('cursor-enabled')
      cancelAnimationFrame(raf)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'var(--accent)' }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[99] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border transition-[width,height,background] duration-200 ease-out cursor-ring"
        style={{
          width: 32,
          height: 32,
          borderColor: 'var(--accent)',
        }}
      >
        {label && (
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            {label}
          </span>
        )}
      </div>
      <style>{`
        .cursor-ring.cursor-active {
          width: 64px;
          height: 64px;
          background: var(--accent-soft);
        }
      `}</style>
    </>
  )
}
