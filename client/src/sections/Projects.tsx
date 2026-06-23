import { SectionTitle } from '../components/SectionTitle'
import { projects } from '../data/portfolio.js'

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="space-y-6">
        <SectionTitle title="Projects" description="Showcase your best work here." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
