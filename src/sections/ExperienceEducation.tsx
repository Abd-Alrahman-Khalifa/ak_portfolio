import { experience, education } from '../data/experience'
import { profile } from '../data/profile'
import Reveal from '../components/Reveal'

export default function ExperienceEducation() {
  return (
    <section id="experience" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          10 / EXPERIENCE & EDUCATION
        </span>
        <h2 className="mt-4 font-display font-medium text-[clamp(1.8rem,4vw,3rem)]">TIMELINE</h2>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-[2fr_1fr] gap-16">
        <div className="relative pl-8 border-l" style={{ borderColor: 'var(--border)' }}>
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2"
                  style={{ borderColor: 'var(--accent)', background: 'var(--bg)' }}
                />
                <div className="font-mono text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {item.period.toUpperCase()}
                </div>
                <h3 className="mt-2 font-display text-xl" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {item.org}
                  {item.type === 'training' && ' · Training program'}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div
            className="rounded-2xl border p-7"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
              EDUCATION
            </span>
            <h3 className="mt-3 font-display text-xl">{education.degree}</h3>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {education.track}
            </p>
            <p className="mt-4 text-sm" style={{ color: 'var(--text-primary)' }}>
              {education.university}
            </p>
            <p className="mt-1 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {education.graduation}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              {profile.counters.map((c) => (
                <div key={c.label}>
                  <div className="font-display text-lg" style={{ color: 'var(--accent)' }}>
                    {c.value}
                  </div>
                  <div className="mt-1 text-[10px] font-mono leading-tight" style={{ color: 'var(--text-muted)' }}>
                    {c.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
