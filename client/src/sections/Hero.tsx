import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import api, { ASSET_BASE_URL } from "../services/api";
import { profile as fallbackProfile } from "../data/portfolio";

function Hero() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const mergedProfile = { ...fallbackProfile, ...(profile || {}) };
  const fullName = mergedProfile.name;
  const role = mergedProfile.title;
  const about = mergedProfile.about;

  const profileImage = mergedProfile.profileImage
    ? `${ASSET_BASE_URL}${mergedProfile.profileImage}`
    : "/profile.png";

  return (
    <section className="hero-section section-block min-h-[95vh] flex items-center pt-28" id="hero">
      <div className="section-shell w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-kicker">Hi, I am</span>

            <h1 className="display hero-title">
              {fullName}
            </h1>

            <h2 className="hero-role">
              I am a <span>{role}</span>
            </h2>

            <p className="hero-intro">
              Passionate about building applications and turning ideas into reality.
            </p>

            <p className="hero-note">{about}</p>
            <p className="hero-interests">
              Software Development <span className="text-[var(--primary)]">•</span>{" "}
              Full Stack Development <span className="text-[var(--primary)]">•</span>{" "}
              Quality Assurance
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <a
                href="#projects"
                className="primary-btn"
              >
                View Projects <span aria-hidden="true">↗</span>
              </a>

              <a
                href="#resume"
                className="secondary-btn"
              >
                Download Resume
              </a>
            </div>

            <div className="flex items-center gap-4 mt-8 hero-socials">
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="hero-portrait-wrap relative w-full max-w-[430px] aspect-square">
              <div className="hero-portrait-glow" />

            <div className="hero-portrait relative h-full p-3">
                <img
                  src={profileImage}
                  alt={fullName}
                  className="h-full w-full rounded-[1.55rem] object-cover"
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