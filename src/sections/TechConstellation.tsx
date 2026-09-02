import { useState } from 'react'
import { stack } from '../data/stack'
import { profile } from '../data/profile'
import Reveal from '../components/Reveal'

export default function TechConstellation() {
  const [active, setActive] = useState<string | null>(null)
  const radius = 190
  const activeItem = stack.find((s) => s.name === active)

  return (
    <section id="stack" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          07 / STACK
        </span>
        <h2 className="mt-4 font-display font-medium text-[clamp(1.8rem,4vw,3rem)]">TECHNOLOGY CONSTELLATION</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-16 relative mx-auto" style={{ width: radius * 2 + 140, height: radius * 2 + 140 }}>
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {stack.map((item, i) => {
              const angle = (i / stack.length) * Math.PI * 2 - Math.PI / 2
              const cx = radius + 70 + radius * Math.cos(angle)
              const cy = radius + 70 + radius * Math.sin(angle)
              return (
                <line
                  key={item.name}
                  x1={radius + 70}
                  y1={radius + 70}
                  x2={cx}
                  y2={cy}
                  stroke={active === item.name ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth={active === item.name ? 1.5 : 1}
                />
              )
            })}
          </svg>

          {/* center node */}
          <div
            className="absolute rounded-full border grid place-items-center font-display text-sm font-semibold"
            style={{
              left: radius + 70,
              top: radius + 70,
              width: 88,
              height: 88,
              transform: 'translate(-50%,-50%)',
              borderColor: 'var(--accent)',
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              zIndex: 1,
            }}
          >
            {profile.initials}
          </div>

          {stack.map((item, i) => {
            const angle = (i / stack.length) * Math.PI * 2 - Math.PI / 2
            const cx = radius + 70 + radius * Math.cos(angle)
            const cy = radius + 70 + radius * Math.sin(angle)
            const isActive = active === item.name
            return (
              <button
                key={item.name}
                onMouseEnter={() => setActive(item.name)}
                onMouseLeave={() => setActive(null)}
                className="absolute rounded-full border px-3 py-2 font-mono text-[11px] whitespace-nowrap transition-all duration-300"
                style={{
                  left: cx,
                  top: cy,
                  transform: `translate(-50%,-50%) scale(${isActive ? 1.18 : 1})`,
                  borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-soft)' : 'var(--surface)',
                  zIndex: 2,
                }}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </Reveal>

      <div className="mt-8 h-24 max-w-md mx-auto text-center">
        {activeItem?.details && (
          <div className="flex flex-wrap justify-center gap-2">
            {activeItem.details.map((d) => (
              <span
                key={d}
                className="rounded-full border px-3 py-1 text-[10px] font-mono"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
