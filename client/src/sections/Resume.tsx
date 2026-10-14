import { motion } from "framer-motion";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";
import { useEffect, useState } from "react";
import api, { resolveAssetUrl } from "../services/api";

function Resume() {
  const [resume, setResume] = useState<{ fileUrl?: string; fileName?: string } | null>(null);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get("/resume");
        setResume(response.data);
      } catch (error) {
        console.error("Error fetching uploaded resume:", error);
      }
    };

    fetchResume();
  }, []);

  const resumeUrl = resume?.fileUrl
    ? resolveAssetUrl(resume.fileUrl)
    : resolveAssetUrl("/api/assets/resume");

  const downloadResume = async () => {
    setDownloadError("");

    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error(`Resume request failed with status ${response.status}`);
      }

      const resumeBlob = await response.blob();
      const downloadUrl = URL.createObjectURL(resumeBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = resume?.fileName || "Frenita-Fernandes-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Unable to download resume:", error);
      setDownloadError("The resume could not be downloaded. Please try again.");
    }
  };

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

                <button
                  type="button"
                  onClick={downloadResume}
                  className="secondary-btn"
                >
                  <FaDownload />
                  Download
                </button>
              </div>

              {downloadError && (
                <p className="mt-4 text-sm text-red-400" role="alert">
                  {downloadError}
                </p>
              )}
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