import { SectionTitle } from '../components/SectionTitle'
import { skills } from '../data/portfolio'

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="space-y-6">
        <SectionTitle title="Technical Skills" description="List your technologies here and manage them later from admin." />
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
