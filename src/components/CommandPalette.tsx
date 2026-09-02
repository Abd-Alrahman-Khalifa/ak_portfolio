import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, scrollToSection } from '../data/nav'
import { profile } from '../data/profile'
import { useScrollLock } from '../hooks/useScrollLock'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

interface Command {
  id: string
  label: string
  run: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const easterEgg = query.trim().toLowerCase() === 'sudo hire abd-alrahman'

  useScrollLock(open)

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const commands: Command[] = useMemo(
    () => [
      ...navItems.map((n) => ({
        id: n.id,
        label: `Go to ${n.label}`,
        run: () => scrollToSection(n.id),
      })),
      {
        id: 'cv',
        label: 'Download CV',
        run: () => window.open(profile.cvPath, '_blank'),
      },
      {
        id: 'search-projects',
        label: 'Search Projects',
        run: () => scrollToSection('projects'),
      },
    ],
    []
  )

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] px-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-lg rounded-xl border overflow-hidden"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search…"
              className="w-full bg-transparent px-5 py-4 font-mono text-sm outline-none border-b"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
            <div className="max-h-72 overflow-y-auto overscroll-contain p-2">
              {easterEgg ? (
                <div className="px-3 py-6 text-center font-mono">
                  <div style={{ color: 'var(--accent)' }}>PERMISSION GRANTED.</div>
                  <div style={{ color: 'var(--text-secondary)' }}>LET'S BUILD SOMETHING.</div>
                </div>
              ) : filtered.length ? (
                filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      c.run()
                      onClose()
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono hover:bg-[var(--accent-soft)] transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {c.label}
                  </button>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  No matching commands
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
