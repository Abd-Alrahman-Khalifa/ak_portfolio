import { useEffect, useState } from 'react'

const nodes = ['USER', 'REACT', 'API', 'LARAVEL', 'MYSQL']

export default function ArchitectureFlow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % (nodes.length + 1))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative rounded-2xl border p-8 font-mono w-full max-w-xs"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="flex flex-col gap-0">
        {nodes.map((node, i) => {
          const isActive = active > i
          return (
            <div key={node} className="flex flex-col items-center">
              <div
                className="rounded-lg border px-4 py-2 text-xs tracking-widest transition-all duration-300"
                style={{
                  borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 0 18px var(--accent-soft)' : 'none',
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                {node}
              </div>
              {i < nodes.length - 1 && (
                <div className="h-6 w-px my-0.5 relative overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div
                    className="absolute left-0 top-0 w-full transition-all duration-500"
                    style={{
                      height: active > i ? '100%' : '0%',
                      background: 'var(--accent)',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
