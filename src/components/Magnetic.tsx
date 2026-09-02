import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsDesktop } from '../hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
  cursorLabel?: string
  onClick?: () => void
}

export default function Magnetic({ children, strength = 0.35, className, cursorLabel, onClick }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
      data-cursor={cursorLabel}
    >
      {children}
    </motion.div>
  )
}
