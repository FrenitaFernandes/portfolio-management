import { motion } from 'framer-motion'

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'Node.js',
  'MongoDB',
]

const projects = [
  {
    title: 'Portfolio Management Dashboard',
    description:
      'Admin-controlled portfolio site with project CRUD, resume upload, and contact form handling.',
  },
  {
    title: 'E-commerce UI',
    description:
      'Responsive shopping experience with filterable product cards and animated interactions.',
  },
  {
    title: 'Task Tracker',
    description:
      'Productivity app with reusable components, clean state flow, and mobile-first layout.',
  },
]

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionReveal}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
              Portfolio Management
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Hi, I am Your Name. I build modern, responsive web experiences.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              This is the first version of your portfolio site. It will include your photo,
              about section, resume download, skills, projects, experience, education,
              certifications, contact form, and an admin panel.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-300"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 font-medium text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur"
          >
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_55%),linear-gradient(180deg,_rgba(15,23,42,0.35),_rgba(15,23,42,0.85))] p-6">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 p-5">
                <div className="h-40 rounded-2xl border border-dashed border-cyan-300/60 bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-300">Your photo goes here</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Photo / Profile Card</p>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>Name: Your Name</p>
                  <p>Role: Full Stack Developer</p>
                  <p>Location: India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          transition={{ duration: 0.5 }}
          className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <h2 className="text-3xl font-semibold text-white">About Me</h2>
          <p className="text-slate-300 leading-7">
            Write a short professional summary here. Tell visitors who you are, what you build,
            and what kind of roles or freelance work you want. This section can later be updated
            from the admin panel.
          </p>
        </motion.div>
      </section>

      <section id="skills" className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="space-y-6"
        >
          <h2 className="text-3xl font-semibold text-white">Technical Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-400/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="space-y-8"
        >
          <h2 className="text-3xl font-semibold text-white">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20"
              >
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="experience" className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-12">
        <h2 className="text-3xl font-semibold text-white">Experience</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          Add internship or job experience here. Later this will be managed from the admin panel.
        </p>
      </section>

      <section id="education" className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-12">
        <h2 className="text-3xl font-semibold text-white">Education</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          Add your degree, college, year, and any relevant achievements here.
        </p>
      </section>

      <section id="certifications" className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-12">
        <h2 className="text-3xl font-semibold text-white">Certifications</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          Add certificates here and later connect them to the database.
        </p>
      </section>

      <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1fr_1fr]"
        >
          <div>
            <h2 className="text-3xl font-semibold text-white">Contact Form</h2>
            <p className="mt-4 max-w-xl text-slate-300 leading-7">
              This form will later send messages to your backend and also store them in MongoDB.
            </p>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
            <textarea
              rows={5}
              placeholder="Your message"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
            />
            <button
              type="button"
              className="rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      <section id="admin" className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-12">
        <div className="rounded-3xl border border-dashed border-cyan-400/30 bg-cyan-400/5 p-8">
          <h2 className="text-3xl font-semibold text-white">Admin Login</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            This will become a protected admin route where you can add or remove projects,
            certifications, skills, resume, and other content.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
