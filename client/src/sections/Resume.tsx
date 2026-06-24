import { motion } from "framer-motion";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../services/api";

function Resume() {
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get("/resume");
        setResume(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResume();
  }, []);

  if (!resume) {
    return (
      <section id="resume" className="py-24 text-center">
        Loading Resume...
      </section>
    );
  }

  const resumeUrl = `http://localhost:5000${resume.fileUrl}`;

  return (
    <section id="resume" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lg border border-white/40 text-center"
        >

          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
              <FaFilePdf className="text-4xl text-violet-600" />
            </div>
          </div>

          <h2 className="mt-6 text-4xl font-bold text-slate-800">
            Resume
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-8">
            Download my latest resume to learn more about my education,
            technical skills, projects and experience.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition"
            >
              View Resume
            </a>

            <a
              href={resumeUrl}
              download
              className="px-6 py-3 rounded-xl border border-violet-600 text-violet-600 font-medium hover:bg-violet-50 transition flex items-center justify-center gap-2"
            >
              <FaDownload />
              Download Resume
            </a>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Resume;