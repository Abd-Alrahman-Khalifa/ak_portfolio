import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string
  label: string
  title: ReactNode
  description?: string
}) {
  return (
    <div className="relative">
      {/* ghost numeral watermark — purely decorative */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-10 -left-1 font-display font-medium text-[clamp(4rem,10vw,8rem)] leading-none -z-10"
        style={{ color: 'var(--surface)' }}
      >
        {index}
      </span>

      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          {index} / {label}
        </span>
        <h2 className="mt-4 font-display font-medium text-[clamp(1.8rem,4.5vw,3.4rem)]">{title}</h2>
        {description && (
          <p className="mt-3 max-w-lg text-sm" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        )}
      </Reveal>
    </div>
  )
}
