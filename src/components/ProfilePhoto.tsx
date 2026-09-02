import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile } from '../data/profile'
import { useIsDesktop } from '../hooks/useMediaQuery'
import ImageFallback from './ImageFallback'

export default function ProfilePhoto() {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const springRx = useSpring(rx, { stiffness: 120, damping: 14 })
  const springRy = useSpring(ry, { stiffness: 120, damping: 14 })
  const glowX = useTransform(springRy, [-12, 12], [0, 100])
  const glowY = useTransform(springRx, [12, -12], [0, 100])

  const handleMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 14)
    rx.set(-py * 14)
  }

  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: springRx, rotateY: springRy, transformStyle: 'preserve-3d' }}
        className="relative w-56 h-56 md:w-72 md:h-72"
      >
        {/* animated glow border — desktop only; static on touch devices to save GPU */}
        <motion.div
          className="absolute -inset-1 rounded-[2rem] opacity-70"
          style={{
            background: 'conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))',
            filter: 'blur(18px)',
          }}
          animate={isDesktop ? { rotate: 360 } : undefined}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* mouse-reactive sheen */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] pointer-events-none z-20"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]: number[]) =>
                `radial-gradient(160px circle at ${gx}% ${gy}%, rgba(255,255,255,0.18), transparent 60%)`
            ),
          }}
        />

        <div
          className="relative rounded-[2rem] overflow-hidden border w-full h-full z-10"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <ImageFallback
            src={profile.profileImage}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  )
}
