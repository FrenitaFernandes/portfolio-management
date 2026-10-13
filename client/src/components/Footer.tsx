import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import api from "../services/api";
import { profile as fallbackProfile } from "../data/portfolio";

function Footer() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data || fallbackProfile);
      } catch (error) {
        console.error(error);
        setProfile(fallbackProfile);
      }
    };

    fetchProfile();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[#0c0c1e]/80 py-10 backdrop-blur-lg">
      <div className="section-shell flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="display text-2xl font-bold text-[var(--primary)]">
            {profile?.name || fallbackProfile.name}
          </h3>

          <p className="mt-2 text-[var(--muted)]">
            {profile?.title || fallbackProfile.title}
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
          © {year} {profile?.name || fallbackProfile.name}
          <br />
          All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;