import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

/**
 * Applies a subtle GSAP ScrollTrigger-driven parallax (vertical shift + fade)
 * to an element as the page scrolls past it. Disabled under reduced-motion.
 */
export function useParallax(ref: RefObject<HTMLElement | null>, distance = 80) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref, distance, reduced])
}
