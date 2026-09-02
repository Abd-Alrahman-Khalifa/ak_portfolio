import { useState } from 'react'
import { dbTables } from '../data/stack'
import Reveal from '../components/Reveal'

export default function DatabaseExplorer() {
  const [hovered, setHovered] = useState<string | null>(null)

  const connected = hovered ? dbTables.find((t) => t.name === hovered)?.connectsTo ?? [] : []

  return (
    <section id="database" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          04 / SCHEMA
        </span>
        <h2 className="mt-4 font-display font-medium text-[clamp(1.8rem,4vw,3rem)]">DATABASE EXPLORER</h2>
        <p className="mt-3 max-w-lg text-sm" style={{ color: 'var(--text-secondary)' }}>
          A simplified relational schema from the e-commerce platform. Hover a table to see its relationships.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          {dbTables.map((table) => {
            const isHovered = hovered === table.name
            const isConnected = connected.includes(table.name)
            const dimmed = hovered && !isHovered && !isConnected

            return (
              <div
                key={table.name}
                onMouseEnter={() => setHovered(table.name)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-xl border px-6 py-5 font-mono text-sm transition-all duration-300"
                style={{
                  borderColor: isHovered ? 'var(--accent)' : isConnected ? 'var(--accent-2)' : 'var(--border)',
                  color: isHovered || isConnected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  opacity: dimmed ? 0.35 : 1,
                  background: isHovered ? 'var(--accent-soft)' : 'var(--surface)',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                }}
              >
                {table.name}
                {isConnected && (
                  <span
                    className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[9px]"
                    style={{ background: 'var(--accent-2)', color: '#04121a' }}
                  >
                    1:N
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
