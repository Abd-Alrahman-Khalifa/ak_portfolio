import { profile } from '../data/profile'
import Reveal from '../components/Reveal'
import ProfilePhoto from '../components/ProfilePhoto'

export default function About() {
  const parts = profile.aboutStatement.split(/(database|user interface)/i)

  return (
    <section id="about" className="relative container-px py-32">
      <div className="grid lg:grid-cols-[auto_2fr_1fr] gap-16 items-start">
        <Reveal className="mx-auto lg:mx-0">
          <ProfilePhoto />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
            01 / ABOUT
          </span>
          <h2 className="mt-6 font-display font-medium leading-[1.1] text-[clamp(1.8rem,4.5vw,3.4rem)] max-w-3xl">
            {parts.map((part, i) =>
              /database|user interface/i.test(part) ? (
                <span key={i} style={{ color: 'var(--accent)' }}>
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {profile.aboutHighlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.08}>
                <span
                  className="inline-block rounded-full border px-4 py-1.5 font-mono text-xs tracking-widest"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                  {h}
                </span>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="rounded-2xl border p-6 space-y-5"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <InfoRow label="University" value={profile.university} />
            <InfoRow label="Track" value={profile.track} />
            <InfoRow label="Graduation" value={`Expected ${profile.graduation}`} />
            <InfoRow label="Location" value={profile.location} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="pb-4 border-b last:border-0 last:pb-0" style={{ borderColor: 'var(--border)' }}>
      <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
        {label.toUpperCase()}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
        {value}
      </div>
    </div>
  )
}
