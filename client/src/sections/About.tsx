import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api, { ASSET_BASE_URL } from "../services/api";

function About() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
      } catch (error) {
        console.error(error);
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
          <div className="glass-card p-8 text-center text-[var(--muted)]">
            Loading profile...
          </div>
        </div>
      </section>
    );
  }

  if (!profile) return null;

  const profileImage = profile?.profileImage
    ? `${ASSET_BASE_URL}${profile.profileImage}`
    : null;

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
            <span className="section-tag">About</span>
            <h2 className="section-title display">About Me</h2>
          </div>

          <div className="glass-card p-6 md:p-10 lg:p-12">
            <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-14 items-center">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-[2.1rem] bg-gradient-to-br from-[#d8d6ff]/55 to-[#d9eef3]/40 blur-xl" />

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={profile.name}
                    className="w-full max-w-[350px] mx-auto aspect-[4/5] rounded-[2rem] object-cover border border-white/75 shadow-[0_18px_40px_rgba(32,42,75,0.12)]"
                  />
                ) : (
                  <div className="w-full max-w-[350px] mx-auto aspect-[4/5] rounded-[2rem] bg-white/70 border border-white/75 shadow-[0_18px_40px_rgba(32,42,75,0.12)] flex items-center justify-center text-[var(--muted)] font-semibold">
                    Profile image not added yet
                  </div>
                )}
              </div>

              <div>
                <h3 className="display text-4xl font-extrabold text-[var(--text)]">
                  {profile.name}
                </h3>

                <p className="mt-3 text-[var(--primary)] font-bold text-lg">
                  {profile.title}
                </p>

                <p className="mt-6 text-[var(--muted)] leading-8 text-lg">
                  {profile.about}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                  <div>
                    <span className="text-sm font-semibold text-slate-500">Email</span>
                    <p className="text-[var(--text)] font-semibold break-all">{profile.email}</p>
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-slate-500">Phone</span>
                    <p className="text-[var(--text)] font-semibold">{profile.phone}</p>
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-slate-500">Location</span>
                    <p className="text-[var(--text)] font-semibold">{profile.location}</p>
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-slate-500">Role</span>
                    <p className="text-[var(--text)] font-semibold">{profile.title}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-btn"
                    >
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
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;