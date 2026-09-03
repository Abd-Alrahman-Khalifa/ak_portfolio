import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { projects, type ProjectCategory } from '../data/projects'
import Reveal from '../components/Reveal'
import ImageFallback from '../components/ImageFallback'
import ProjectViewer from '../components/ProjectViewer'

const filters: Array<ProjectCategory | 'All'> = ['All', 'Backend', 'Frontend', 'Other']

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  )
  const activeProject = projects.find((p) => p.id === openId) ?? null

  return (
    <section id="projects" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          08 / PROJECTS
        </span>
        <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-display font-medium text-[clamp(1.8rem,4vw,3rem)]">SELECTED WORK</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full border px-4 py-1.5 text-xs font-mono transition-colors"
                style={{
                  borderColor: filter === f ? 'var(--accent)' : 'var(--border)',
                  color: filter === f ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-16 space-y-6">
        {filtered.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.05}>
            <motion.button
              onClick={() => setOpenId(project.id)}
              layout
              className="w-full text-left grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 rounded-2xl p-5 md:p-7 group card-surface"
              data-cursor="VIEW"
            >
              <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden">
                <ImageFallback
                  src={project.images[0] ?? ''}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    {project.number}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm max-w-xl line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {t}
                      {' · '}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className="hidden md:inline font-mono text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--accent)' }}
              >
                VIEW CASE STUDY →
              </span>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <ProjectViewer project={activeProject} onClose={() => setOpenId(null)} />
    </section>
  )
}
