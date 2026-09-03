import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { navItems, scrollToSection } from '../data/nav'
import { profile } from '../data/profile'
import Magnetic from './Magnetic'
import { useScrollLock } from '../hooks/useScrollLock'

interface NavigationProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onOpenPalette: () => void
}

export default function Navigation({ theme, onToggleTheme, onOpenPalette }: NavigationProps) {
  const [hidden, setHidden] = useState(false)
  const [shrunk, setShrunk] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useScrollLock(mobileOpen)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setShrunk(y > 40)
      setHidden(y > lastY && y > 200)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 rounded-full border backdrop-blur-xl px-2 py-2"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in srgb, var(--bg-elevated) 70%, transparent)',
          boxShadow: shrunk ? '0 8px 30px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        <button
          onClick={() => scrollToSection('hero')}
          data-cursor="HOME"
          className="font-display font-semibold px-3 text-sm tracking-widest"
          style={{ color: 'var(--accent)' }}
        >
          {profile.initials}
        </button>
        {navItems.slice(1).map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-colors"
            style={{ color: active === item.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}
          >
            {active === item.id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full -z-10"
                style={{ background: 'var(--accent-soft)' }}
              />
            )}
            {item.label}
          </button>
        ))}
        <button
          onClick={onToggleTheme}
          data-cursor="THEME"
          className="ml-1 grid place-items-center h-8 w-8 rounded-full"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <Magnetic strength={0.3}>
          <button
            onClick={onOpenPalette}
            className="ml-1 flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-mono border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            ⌘K
          </button>
        </Magnetic>
      </motion.nav>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden grid place-items-center h-11 w-11 rounded-full border backdrop-blur-xl"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 md:hidden"
            style={{ background: 'var(--bg)' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 grid place-items-center h-11 w-11 rounded-full border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setMobileOpen(false)
                  requestAnimationFrame(() => scrollToSection(item.id))
                }}
                className="font-display text-3xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
