import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import api, { resolveAssetUrl } from "../services/api";
import { profile as fallbackProfile } from "../data/portfolio";

function Hero() {
  const [profile, setProfile] = useState<any>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ["MCA Graduate", "Aspiring Software Developer", "MERN Stack Developer"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        const apiProfile = response.data || {};
        const populatedProfile = Object.fromEntries(
          Object.entries(apiProfile).filter(([, value]) => value !== null && value !== undefined && value !== "")
        );
        setProfile(populatedProfile.profileImage ? { profileImage: populatedProfile.profileImage } : {});
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTitleIndex((current) => (current + 1) % titles.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  const mergedProfile = { ...fallbackProfile, ...(profile || {}) };
  const fullName = mergedProfile.name;

  const profileImage = mergedProfile.profileImage
    ? resolveAssetUrl(mergedProfile.profileImage)
    : "/profile.png";

  return (
    <section className="hero-section section-block min-h-[95vh] flex items-center pt-28" id="hero">
      <div className="section-shell w-full">
        <div className="flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="order-2 flex w-full flex-col items-center"
          >
            <motion.span
              className="hero-kicker"
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.85, type: "spring" }}
            >
              Hi, I am
            </motion.span>

            <motion.h1
              className="display hero-title"
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 1, type: "spring" }}
            >
              {fullName}
            </motion.h1>

            <motion.h2
              className="hero-role flex min-h-[1.5em] items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={titles[titleIndex]}
                  initial={{ opacity: 0, y: 20, scale: 0.82 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.82 }}
                  transition={{ duration: 0.45, type: "spring" }}
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h2>

            <motion.p
              className="hero-interests"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.45 }}
            >
              Software Development <span className="text-[var(--primary)]">•</span>{" "}
              Full Stack Development <span className="text-[var(--primary)]">•</span>{" "}
              Quality Assurance
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-9"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: 1.65, type: "spring" }}
            >
              <a
                href="#resume"
                className="secondary-btn"
              >
                Download Resume
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 mt-8 hero-socials"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            >
              {mergedProfile.github && (
                <a
                  href={mergedProfile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-white transition hover:bg-[var(--primary)]"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              )}

              {mergedProfile.linkedin && (
                <a
                  href={mergedProfile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-white transition hover:bg-[var(--primary)]"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
            className="order-1 flex justify-center"
          >
            <div className="hero-portrait-wrap relative w-full max-w-[330px] aspect-square">
              <div className="hero-portrait-glow" />
              <div className="portrait-bubbles" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

            <div className="hero-portrait relative h-full p-2">
                <img
                  src={profileImage}
                  alt={fullName}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;