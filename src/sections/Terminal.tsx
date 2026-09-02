import { useState } from 'react'
import { profile } from '../data/profile'
import Reveal from '../components/Reveal'

const commandsMap: Record<string, string[]> = {
  whoami: ['abd-alrahman'],
  stack: ['Laravel', 'PHP', 'MySQL', 'React'],
  location: [profile.location],
  education: [profile.university],
  status: ['Available for opportunities'],
  help: ['Available commands: whoami, stack, location, education, status, clear'],
}

interface LogLine {
  type: 'input' | 'output'
  text: string
}

export default function Terminal() {
  const [log, setLog] = useState<LogLine[]>([{ type: 'output', text: 'Type "help" to see available commands.' }])
  const [input, setInput] = useState('')

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    const newLog: LogLine[] = [...log, { type: 'input', text: cmd }]
    if (cmd === 'clear') {
      setLog([])
      return
    }
    const output = commandsMap[cmd] ?? [`command not found: ${cmd}`]
    output.forEach((line) => newLog.push({ type: 'output', text: line }))
    setLog(newLog)
  }

  return (
    <div
      className="rounded-2xl border overflow-hidden font-mono text-xs"
      style={{ borderColor: 'var(--border)', background: '#050507' }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#febc2e' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-3" style={{ color: 'var(--text-muted)' }}>
          ak — zsh
        </span>
      </div>
      <div className="p-4 h-64 overflow-y-auto space-y-1.5">
        {log.map((line, i) => (
          <div key={i} style={{ color: line.type === 'input' ? 'var(--accent-2)' : 'var(--text-secondary)' }}>
            {line.type === 'input' ? `$ ${line.text}` : line.text}
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span style={{ color: 'var(--accent-2)' }}>$</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                runCommand(input)
                setInput('')
              }
            }}
            className="flex-1 bg-transparent outline-none"
            style={{ color: 'var(--text-primary)' }}
            placeholder="type a command…"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 p-3 border-t" style={{ borderColor: 'var(--border)' }}>
        {Object.keys(commandsMap)
          .filter((c) => c !== 'help')
          .map((c) => (
            <button
              key={c}
              onClick={() => runCommand(c)}
              className="rounded-full border px-3 py-1 text-[10px]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              {c}
            </button>
          ))}
      </div>
    </div>
  )
}

export function TerminalSection() {
  return (
    <section id="terminal" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          05 / TERMINAL
        </span>
        <h2 className="mt-4 font-display font-medium text-[clamp(1.8rem,4vw,3rem)]">RUN A FEW COMMANDS</h2>
      </Reveal>
      <Reveal delay={0.15} className="mt-10 max-w-2xl">
        <Terminal />
      </Reveal>
    </section>
  )
}
