import { useEffect, useState } from 'react'
import { Star, GitFork } from 'lucide-react'
import { githubUrl, githubUsername } from '../data/socials'
import Reveal from '../components/Reveal'
import GithubIcon from '../components/GithubIcon'

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
}

export default function GithubSection() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setRepos(data)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="github" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          11 / GITHUB
        </span>
        <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-display font-medium text-[clamp(1.8rem,4vw,3rem)]">RECENT REPOSITORIES</h2>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold w-fit"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <GithubIcon size={14} /> @{githubUsername}
          </a>
        </div>
      </Reveal>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {!repos && !failed &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-36 rounded-2xl border animate-pulse"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            />
          ))}

        {failed && (
          <div
            className="md:col-span-2 lg:col-span-3 rounded-2xl border p-8 text-center"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Live repository data couldn't be loaded right now — browse the profile directly on GitHub.
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block font-mono text-xs"
              style={{ color: 'var(--accent)' }}
            >
              {githubUrl} →
            </a>
          </div>
        )}

        {repos?.map((repo, i) => (
          <Reveal key={repo.id} delay={i * 0.05}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block h-full rounded-2xl border p-6 transition-transform hover:-translate-y-1"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <h3 className="font-display text-lg" style={{ color: 'var(--text-primary)' }}>
                {repo.name}
              </h3>
              <p className="mt-2 text-xs line-clamp-2 min-h-[2.5em]" style={{ color: 'var(--text-secondary)' }}>
                {repo.description ?? 'No description provided.'}
              </p>
              <div className="mt-4 flex items-center gap-4 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {repo.language && <span>{repo.language}</span>}
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks_count}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
