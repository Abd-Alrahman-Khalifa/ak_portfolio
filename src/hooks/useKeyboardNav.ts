import { useEffect } from 'react'
import { navItems, scrollToSection } from '../data/nav'

export function useKeyboardNav(onOpenPalette: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isTyping = ['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenPalette()
        return
      }

      if (isTyping) return

      const match = navItems.find((n) => n.key === e.key.toLowerCase())
      if (match) {
        scrollToSection(match.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onOpenPalette])
}
