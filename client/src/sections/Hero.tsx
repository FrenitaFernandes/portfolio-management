import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import api, { ASSET_BASE_URL } from "../services/api";
import hero from "../assets/hero.png";

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

  const fullName = profile?.name || "Frenita Fernandes";
  const role = profile?.title || "Full Stack Developer";
  const about =
    profile?.about ||
    "I design and build thoughtful web products with scalable architecture and elegant UI experiences.";

  const initials = useMemo(
    () =>
      fullName
        .split(" ")
        .map((item: string) => item[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [fullName]
  );

  const profileImage = profile?.profileImage
    ? `${ASSET_BASE_URL}${profile.profileImage}`
    : hero;

  return (
    <section className="section-block min-h-[95vh] flex items-center pt-28" id="hero">
      <div className="section-shell w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="soft-chip inline-flex items-center gap-2 mb-5">
              Hello, I am
            </span>

            <h1 className="display text-[clamp(2.4rem,8vw,5.2rem)] font-extrabold leading-[0.97] text-[var(--text)] max-w-[14ch]">
              {fullName}
            </h1>

            <h2 className="mt-4 text-xl md:text-2xl font-bold text-[var(--primary)]">
              {role}
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
              {about}
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <a
                href="#projects"
                className="primary-btn"
              >
                View Projects
              </a>

              <a
                href="#resume"
                className="secondary-btn"
              >
                View Resume
              </a>
            </div>

            <div className="flex items-center gap-4 mt-8">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              )}

              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition"
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
            <div className="relative w-full max-w-[430px] aspect-square">
              <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-br from-[#d9d7ff]/70 to-[#d9eef5]/40 blur-2xl" />
              <div className="absolute -left-4 top-8 w-16 h-16 rounded-2xl bg-white/65 border border-white/80 shadow-lg hidden sm:block" />
              <div className="absolute right-3 -bottom-2 w-24 h-24 rounded-[1.8rem] bg-white/70 border border-white/80 shadow-lg flex items-center justify-center text-[var(--primary)] font-bold text-lg">
                {initials}
              </div>

              <div className="relative glass-card h-full p-3">
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