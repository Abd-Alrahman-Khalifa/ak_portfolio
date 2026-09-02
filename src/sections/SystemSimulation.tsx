import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import SectionHeading from '../components/SectionHeading'

const requestChain = ['USER', 'REACT', 'HTTP REQUEST', 'LARAVEL ROUTE', 'CONTROLLER', 'MODEL', 'MYSQL']
const responseChain = ['MYSQL', 'MODEL', 'CONTROLLER', 'JSON RESPONSE', 'REACT', 'USER']

const statuses = ['REQUEST SENT', 'PROCESSING', 'DATABASE QUERY', 'RESPONSE RECEIVED', 'SUCCESS']

type Phase = 'idle' | 'request' | 'response' | 'done'

export default function SystemSimulation() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [statusIndex, setStatusIndex] = useState(-1)

  const run = async () => {
    if (phase !== 'idle' && phase !== 'done') return
    setPhase('request')
    setStatusIndex(0)
    for (let i = 0; i < requestChain.length; i++) {
      setActiveIndex(i)
      await wait(280)
    }
    setStatusIndex(2)
    await wait(300)
    setPhase('response')
    setStatusIndex(3)
    for (let i = 0; i < responseChain.length; i++) {
      setActiveIndex(i)
      await wait(280)
    }
    setStatusIndex(4)
    setPhase('done')
  }

  const chain = phase === 'response' || (phase === 'done' && statusIndex === 4) ? responseChain : requestChain

  return (
    <section id="simulation" className="relative container-px py-32">
      <SectionHeading
        index="03"
        label="LIVE SIMULATION"
        title="HOW A REQUEST TRAVELS"
        description="A visual walkthrough of a typical request in a React + Laravel application. This is a simulation only — no real network calls are made."
      />

      <Reveal delay={0.15}>
        <div
          className="mt-12 rounded-2xl border p-8 md:p-12"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {phase === 'idle' && 'STATUS: IDLE'}
              {phase !== 'idle' && statusIndex >= 0 && `STATUS: ${statuses[statusIndex]}`}
            </div>
            <Magnetic cursorLabel="RUN">
              <button
                onClick={run}
                className="rounded-full px-6 py-3 text-xs font-semibold tracking-widest"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                SEND REQUEST
              </button>
            </Magnetic>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {chain.map((node, i) => {
              const isActive = phase !== 'idle' && i <= activeIndex
              return (
                <div key={node + i} className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                      color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                      boxShadow: isActive ? '0 0 16px var(--accent-soft)' : '0 0 0px transparent',
                    }}
                    className="rounded-lg border px-4 py-2.5 font-mono text-[11px] tracking-wider text-center"
                  >
                    {node}
                  </motion.div>
                  {i < chain.length - 1 && (
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      →
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          <AnimatePresence>
            {phase === 'done' && statusIndex === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center font-mono text-xs tracking-widest"
                style={{ color: 'var(--success)' }}
              >
                ✓ SUCCESS — CYCLE COMPLETE
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
