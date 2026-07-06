import { motion } from "framer-motion";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";
import { useEffect, useState } from "react";
import api, { ASSET_BASE_URL } from "../services/api";

function Resume() {
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get("/resume");
        setResume(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return (
      <section id="resume" className="section-block">
        <div className="section-shell">
          <div className="glass-card p-8 text-center text-[var(--muted)]">
            Loading resume...
          </div>
        </div>
      </section>
    );
  }

  if (!resume?.fileUrl) return null;

  const resumeUrl = `${ASSET_BASE_URL}${resume.fileUrl}`;

  return (
    <section id="resume" className="section-block">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-7 md:p-12"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <span className="section-tag">
                Resume
              </span>

              <h2 className="display section-title">
                My Resume
              </h2>

              <p className="mt-5 text-[var(--muted)] leading-8 text-lg max-w-2xl">
                Download my latest resume to know more about my
                education, projects, technical skills and
                professional experience.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-btn"
                >
                  <FaEye />
                  View Resume
                </a>

                <a
                  href={resumeUrl}
                  download
                  className="secondary-btn"
                >
                  <FaDownload />
                  Download
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="elevated-card w-56 h-56 rounded-[1.8rem] bg-[var(--soft-primary)]/75 border-[rgba(136,145,215,0.25)] flex flex-col items-center justify-center"
              >
                <FaFilePdf
                  className="text-7xl text-[var(--primary)]"
                />

                <p className="mt-5 font-semibold text-[var(--text)] text-lg">
                  Latest Resume
                </p>

                <p className="text-sm text-[var(--muted)]">
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