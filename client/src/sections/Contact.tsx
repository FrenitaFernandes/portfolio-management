import { SectionTitle } from '../components/SectionTitle'

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1fr_1fr]">
        <SectionTitle title="Contact" description="This form will later connect to your backend and save messages." />
        <form className="space-y-4">
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Your name" />
          <input className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" placeholder="Your email" />
          <textarea className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white" rows={5} placeholder="Your message" />
        </form>
      </div>
    </section>
  )
}
