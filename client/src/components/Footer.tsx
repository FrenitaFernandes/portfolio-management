import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 px-6">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left */}

        <div className="text-center md:text-left">

          <h3 className="text-2xl font-bold text-violet-600">
            Frenita Fernandes
          </h3>

          <p className="mt-2 text-slate-600">
            Full Stack Developer | MCA Student
          </p>

        </div>

        {/* Center */}

        <div className="flex gap-5">

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center hover:bg-violet-600 hover:text-white transition"
          >
            <FaGithub />
          </a>

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center hover:bg-violet-600 hover:text-white transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center hover:bg-violet-600 hover:text-white transition"
          >
            <FaEnvelope />
          </a>

        </div>

        {/* Right */}

        <div className="text-sm text-slate-500 text-center md:text-right">
          © 2026 Frenita Fernandes
          <br />
          All Rights Reserved
        </div>

      </div>

    </footer>
  );
}

export default Footer;