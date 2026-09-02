import { socials } from '../data/socials'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="relative container-px py-12 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-sm" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} {profile.name}. Built from scratch.
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              {s.label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
