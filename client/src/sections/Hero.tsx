import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section id="home" className="mx-auto min-h-screen max-w-7xl px-6 py-16 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
      >
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
            Portfolio Management
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Hi, I am Your Name. I build modern, responsive web experiences.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            This starter is now split into real files and folders, so you can build each section step by step.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
