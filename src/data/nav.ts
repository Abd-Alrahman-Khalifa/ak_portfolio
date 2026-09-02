export interface NavItem {
  id: string
  label: string
  key: string
}

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', key: 'h' },
  { id: 'about', label: 'About', key: 'a' },
  { id: 'stack', label: 'Stack', key: 's' },
  { id: 'projects', label: 'Work', key: 'w' },
  { id: 'experience', label: 'Experience', key: 'e' },
  { id: 'github', label: 'GitHub', key: 'g' },
  { id: 'contact', label: 'Contact', key: 'c' },
]

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as any).__lenis
  if (lenis?.scrollTo) {
    lenis.scrollTo(el, { offset: 0 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
