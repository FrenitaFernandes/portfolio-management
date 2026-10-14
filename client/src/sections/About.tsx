import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import api from "../services/api";
import { profile as fallbackProfile } from "../data/portfolio";

function About() {
  const [profile, setProfile] = useState<any>(fallbackProfile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        const apiProfile = response.data || {};
        const populatedProfile = Object.fromEntries(
          Object.entries(apiProfile).filter(([, value]) => value !== null && value !== undefined && value !== "")
        );
        setProfile({
          ...fallbackProfile,
          ...(populatedProfile.profileImage ? { profileImage: populatedProfile.profileImage } : {}),
        });
      } catch (error) {
        console.error(error);
        setProfile(fallbackProfile);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section id="about" className="section-block">
        <div className="section-shell">
          <div className="glass-card max-w-4xl mx-auto p-10 text-center">
            Loading...
          </div>
        </div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section id="about" className="section-block">
      <div className="section-shell">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <div className="text-center mb-12">
            <span className="section-tag">
              ABOUT
            </span>

            <h2 className="section-title display">
              About Me
            </h2>
          </div>

          <div className="glass-card max-w-4xl mx-auto p-8 md:p-12 lg:p-14">

            <div className="max-w-3xl mx-auto">

              <p className="text-center text-lg leading-9 text-[var(--muted)]">
                {profile.about}
              </p>

              {/* Email & Location */}

              <div className="mt-14 max-w-lg mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-[var(--muted)]">
                      Email
                    </p>

                    <a
                      href={`mailto:${profile.email}`}
                      className="about-email mt-3 inline-block whitespace-nowrap font-semibold text-[var(--text)]"
                    >
                      {profile.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-[var(--muted)]">
                      Location
                    </p>

                    <p className="mt-3 text-lg font-semibold text-[var(--text)]">
                      {profile.location}
                    </p>
                  </div>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-center gap-6 mt-20 flex-wrap">

                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-btn"
                  >
                    <FaLinkedin aria-hidden="true" />
                    LinkedIn
                  </a>
                )}

                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="primary-btn"
                  >
                    <FaGithub aria-hidden="true" />
                    GitHub
                  </a>
                )}

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default About;