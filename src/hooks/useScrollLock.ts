import { useEffect } from 'react'
import { getLenis } from './useLenis'

/**
 * Pauses page-level Lenis smooth scrolling while `active` is true, so an
 * open modal/overlay with its own `overflow-y-auto` scrolls itself instead
 * of the page behind it. Restores Lenis (and body scroll) on close/unmount.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const lenis = getLenis()
    lenis?.stop()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      lenis?.start()
      document.body.style.overflow = previousOverflow
    }
  }, [active])
}
