import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-7xl mx-auto w-full">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-violet-600 font-semibold mb-3">
              Hello, I'm
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              Frenita Fernandes
            </h1>

            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-600">
              MCA Student | Full Stack Developer
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">
              Passionate about building modern web applications
              using React, Node.js, MongoDB and TypeScript.
              I enjoy creating responsive and user-friendly
              digital experiences.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition"
              >
                View Projects
              </a>

              <a
                href="#resume"
                className="px-6 py-3 rounded-xl border border-violet-600 text-violet-600 font-medium hover:bg-violet-50 transition"
              >
                Download Resume
              </a>

            </div>

            <div className="flex gap-5 mt-8 text-2xl">

              <a
                href="#"
                className="text-slate-600 hover:text-violet-600 transition"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="text-slate-600 hover:text-violet-600 transition"
              >
                <FaLinkedin />
              </a>

            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >

            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-violet-300 blur-3xl opacity-40"></div>

              <img
                src="https://via.placeholder.com/350"
                alt="Profile"
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-8 border-white shadow-2xl"
              />

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Hero;