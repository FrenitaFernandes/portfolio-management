import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import hero from "../assets/hero.png";

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full font-semibold text-sm mb-6">
              👋 Hello, I'm
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
              Frenita Fernandes
            </h1>

            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-violet-600">
              Full Stack Developer
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              Passionate about building modern and responsive web
              applications using React, Node.js, Express,
              MongoDB and TypeScript.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="#projects"
                className="px-8 py-4 rounded-xl bg-violet-600 text-white font-semibold shadow-lg hover:bg-violet-700 transition"
              >
                View Projects
              </a>

              <a
                href="#resume"
                className="px-8 py-4 rounded-xl border-2 border-violet-600 text-violet-600 font-semibold hover:bg-violet-50 transition"
              >
                Download Resume
              </a>

            </div>

            <div className="flex items-center gap-6 mt-10">

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:bg-violet-600 hover:text-white transition"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:bg-violet-600 hover:text-white transition"
              >
                <FaLinkedin />
              </a>

            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">

              <div className="absolute -inset-6 bg-violet-300 rounded-full blur-3xl opacity-30"></div>

              <img
                src={hero}
                alt="Frenita Fernandes"
                className="relative w-80 h-80 md:w-[430px] md:h-[430px] rounded-full object-cover border-8 border-white shadow-2xl"
              />

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Hero;