import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/30 bg-white/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <div>
          <h3 className="text-xl font-bold text-violet-600">
            Frenita Fernandes
          </h3>

          <p className="text-slate-600 mt-2">
            MCA Student | Full Stack Developer
          </p>
        </div>

        <div className="flex gap-5 text-xl">

          <a href="#">
            <FaGithub />
          </a>

          <a href="#">
            <FaLinkedin />
          </a>

          <a href="#">
            <FaEnvelope />
          </a>

        </div>

        <div className="text-slate-500 text-sm">
          © 2026 Frenita Fernandes. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;