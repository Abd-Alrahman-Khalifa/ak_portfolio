import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { Project } from '../data/projects'
import ImageFallback from './ImageFallback'
import GithubIcon from './GithubIcon'
import { useScrollLock } from '../hooks/useScrollLock'

export default function ProjectViewer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const images = project?.images ?? []

  useScrollLock(Boolean(project))

  useEffect(() => {
    if (project) {
      setIndex(0)
      setZoomed(false)
    }
  }, [project])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!project) return
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false)
        else onClose()
      }
      if (e.key === 'ArrowRight') setIndex((i) => (images.length ? (i + 1) % images.length : i))
      if (e.key === 'ArrowLeft') setIndex((i) => (images.length ? (i - 1 + images.length) % images.length : i))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, images.length, zoomed, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
          >
            {/* Gallery */}
            <div className="relative">
              {images.length > 0 ? (
                <button
                  onClick={() => setZoomed(true)}
                  data-cursor="EXPLORE"
                  className="block w-full aspect-video overflow-hidden group"
                >
                  <ImageFallback
                    src={images[index]}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
                  >
                    <ZoomIn size={12} /> ZOOM
                  </span>
                </button>
              ) : (
                <div
                  className="w-full aspect-video flex items-center justify-center"
                  style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}
                >
                  <span className="font-mono text-[10px] tracking-widest">IMAGE PENDING</span>
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: i === index ? 18 : 6,
                          background: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
                        }}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={onClose}
                className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 md:p-10">
              <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                {project.number}
              </span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl">{project.title}</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              {project.features && (
                <ul className="mt-6 space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)' }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-3 py-1 text-[10px] font-mono"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  <GithubIcon size={14} /> GITHUB
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    <ExternalLink size={14} /> LIVE DEMO
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen zoom */}
          <AnimatePresence>
            {zoomed && images.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setZoomed(false)
                }}
                className="fixed inset-0 z-[98] flex items-center justify-center p-4 md:p-10"
                style={{ background: 'rgba(0,0,0,0.95)' }}
              >
                <img
                  src={images[index]}
                  alt={`${project.title} zoomed`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => setZoomed(false)}
                  className="absolute top-4 right-4 grid place-items-center h-10 w-10 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
                  aria-label="Close zoom"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
