import { motion } from "framer-motion";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";
import { useEffect, useState } from "react";
import api, { ASSET_BASE_URL } from "../services/api";

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
      <section id="resume" className="py-20 text-center">
        Loading Resume...
      </section>
    );
  }

  const resumeUrl = `${ASSET_BASE_URL}${resume.fileUrl}`;

  return (
    <section id="resume" className="py-20 px-6">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-slate-100
            p-8
            md:p-12
          "
        >

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left */}

            <div>

              <span className="text-violet-600 font-semibold uppercase tracking-widest">
                Resume
              </span>

              <h2 className="text-4xl font-bold mt-3 text-slate-900">
                My Resume
              </h2>

              <p className="mt-5 text-slate-600 leading-8">
                Download my latest resume to know more about my
                education, projects, technical skills and
                professional experience.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    px-7
                    py-3
                    rounded-xl
                    bg-violet-600
                    text-white
                    font-semibold
                    hover:bg-violet-700
                    transition
                    flex
                    items-center
                    gap-2
                  "
                >
                  <FaEye />
                  View Resume
                </a>

                <a
                  href={resumeUrl}
                  download
                  className="
                    px-7
                    py-3
                    rounded-xl
                    border-2
                    border-violet-600
                    text-violet-600
                    font-semibold
                    hover:bg-violet-50
                    transition
                    flex
                    items-center
                    gap-2
                  "
                >
                  <FaDownload />
                  Download
                </a>

              </div>

            </div>

            {/* Right */}

            <div className="flex justify-center">

              <div
                className="
                  w-52
                  h-52
                  rounded-3xl
                  bg-violet-50
                  border
                  border-violet-100
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >

                <FaFilePdf
                  className="
                    text-7xl
                    text-violet-600
                  "
                />

                <p className="mt-5 font-semibold text-slate-700">
                  Latest Resume
                </p>

                <p className="text-sm text-slate-500">
                  PDF Document
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Resume;