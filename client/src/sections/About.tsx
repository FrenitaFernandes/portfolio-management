import { SectionTitle } from '../components/SectionTitle'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <SectionTitle title="About Me" description="Short summary about your background, goals, and work style." />
      </div>
    </section>
  )
}
