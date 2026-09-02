import { socials, portfolioMeta } from '../data/socials'
import { profile } from '../data/profile'
import GithubIcon from '../components/GithubIcon'
import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative container-px py-12 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="font-display text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {profile.name}. Built from scratch.
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={portfolioMeta.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-mono"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <GithubIcon size={12} /> THIS PROJECT ON GITHUB
            </a>
            <a
              href={portfolioMeta.live}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-mono"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <ExternalLink size={12} /> LIVE SITE
            </a>
          </div>
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
