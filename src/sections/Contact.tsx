import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, MessageCircle } from 'lucide-react'
import { profile } from '../data/profile'
import { sendContactMessage } from '../utils/emailjs'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    projectType: '',
  })

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await sendContactMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '', company: '', projectType: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="relative container-px py-32">
      <div className="grid lg:grid-cols-2 gap-16">
        <Reveal>
          <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
            12 / CONTACT
          </span>
          <h2 className="mt-4 font-display font-medium leading-[1.05] text-[clamp(2rem,5vw,3.6rem)]">
            HAVE A SYSTEM
            <br />
            TO BUILD?
          </h2>
          <p className="mt-5 max-w-md text-sm" style={{ color: 'var(--text-secondary)' }}>
            Let's turn an idea into a real digital product.
          </p>

          <div className="mt-8 flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: profile.available ? 'var(--success)' : 'var(--text-muted)' }}
            />
            {profile.available ? 'AVAILABLE FOR OPPORTUNITIES' : 'CURRENTLY UNAVAILABLE'}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic strength={0.25}>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-semibold"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'COPIED ✓' : 'COPY EMAIL'}
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <MessageCircle size={14} /> CHAT ON WHATSAPP →
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name" required value={form.name} onChange={update('name')} />
              <Field label="Email" type="email" required value={form.email} onChange={update('email')} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Company (optional)" value={form.company} onChange={update('company')} />
              <Field label="Project type (optional)" value={form.projectType} onChange={update('projectType')} />
            </div>
            <Field label="Subject" required value={form.subject} onChange={update('subject')} />
            <Field label="Message" required textarea value={form.message} onChange={update('message')} />

            <Magnetic strength={0.2}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-full px-6 py-4 text-sm font-semibold tracking-wide disabled:opacity-60"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
              </button>
            </Magnetic>

            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center font-mono text-xs tracking-widest py-2"
                  style={{ color: 'var(--success)' }}
                >
                  MESSAGE SENT ✓
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center font-mono text-xs tracking-widest py-2"
                  style={{ color: 'var(--danger)' }}
                >
                  FAILED TO SEND — {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  textarea?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const Comp = textarea ? 'textarea' : 'input'

  return (
    <div className="relative">
      <label
        className="absolute left-0 font-mono text-xs pointer-events-none transition-all duration-200"
        style={{
          top: focused || hasValue ? -18 : textarea ? 14 : 14,
          fontSize: focused || hasValue ? '10px' : '13px',
          color: focused ? 'var(--accent)' : 'var(--text-muted)',
        }}
      >
        {label.toUpperCase()}
      </label>
      <Comp
        required={required}
        type={textarea ? undefined : type}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={onChange as any}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b pt-4 pb-2 outline-none text-sm resize-none transition-colors"
        style={{
          borderColor: focused ? 'var(--accent)' : 'var(--border)',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  )
}
