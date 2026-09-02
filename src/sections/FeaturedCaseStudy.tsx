import { projects } from '../data/projects'
import Reveal from '../components/Reveal'
import GithubIcon from '../components/GithubIcon'

const stages = [
  {
    title: 'PROBLEM',
    text: 'Small storefronts need a simple, reliable way to manage products, categories, and orders without overengineering the stack.',
  },
  {
    title: 'ARCHITECTURE',
    text: 'A Laravel MVC application with a relational MySQL schema: users, products, categories, cart, wishlist, orders, and order items, connected through Eloquent relationships.',
  },
  {
    title: 'IMPLEMENTATION',
    text: 'Blade views paired with jQuery/AJAX for live search and category filtering without page reloads, backed by validated controllers and role-based middleware.',
  },
  {
    title: 'FEATURES',
    text: 'Admin dashboard, product & category management, cart, wishlist, orders, authentication, authorization, and roles & permissions.',
  },
  {
    title: 'RESULT',
    text: 'A working full-stack store demonstrating relational database design, backend architecture, and interactive frontend behaviour end to end.',
  },
]

export default function FeaturedCaseStudy() {
  const project = projects.find((p) => p.featured)!

  return (
    <section id="case-study" className="relative container-px py-32">
      <Reveal>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
          09 / FEATURED CASE STUDY
        </span>
        <h2 className="mt-4 font-display font-medium text-[clamp(1.8rem,4.5vw,3.4rem)] max-w-2xl">
          {project.title}
        </h2>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-x-16 gap-y-10">
        {stages.map((stage, i) => (
          <Reveal key={stage.title} delay={i * 0.07}>
            <div className="pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--accent)' }}>
                {stage.title}
              </span>
              <p className="mt-3 text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
                {stage.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold"
          style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        >
          <GithubIcon size={14} /> VIEW REPOSITORY
        </a>
      </Reveal>
    </section>
  )
}
