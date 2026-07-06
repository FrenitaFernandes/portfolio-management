import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import api from "../services/api";

function Footer() {
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

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/60 bg-white/72 backdrop-blur-lg py-10">
      <div className="section-shell flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="display text-2xl font-bold text-[var(--primary)]">
            {profile?.name || "Frenita Fernandes"}
          </h3>

          <p className="mt-2 text-[var(--muted)]">
            {profile?.title || "Full Stack Developer"}
          </p>
        </div>

        <div className="flex gap-5">
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-[var(--soft-primary)] text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition"
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
              className="w-11 h-11 rounded-full bg-[var(--soft-primary)] text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          )}

          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="w-11 h-11 rounded-full bg-[var(--soft-primary)] text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          )}
        </div>

        <div className="text-sm text-[var(--muted)] text-center md:text-right">
          © {year} {profile?.name || "Frenita Fernandes"}
          <br />
          All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;