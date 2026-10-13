import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api, { ASSET_BASE_URL } from "../services/api";
import { certifications as fallbackCertifications } from "../data/portfolio";

interface Certification {
  _id: string;
  title: string;
  image: string;
}

const certificateMeta: Record<string, { issuer: string; label: string }> = {
  "nptel-social-media": { issuer: "NPTEL · SWAYAM", label: "Online Certification" },
  "nptel-ai": { issuer: "NPTEL · SWAYAM", label: "Online Certification" },
  "python-fundamentals": { issuer: "HackerRank", label: "Skills Certification" },
};

function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>(fallbackCertifications);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await api.get("/certifications");
        setCertifications(response.data?.length ? response.data : fallbackCertifications);
      } catch (error) {
        console.error("Error fetching certifications:", error);
        setCertifications(fallbackCertifications);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <section id="certifications" className="section-block">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-tag">Achievements</span>
          <h2 className="section-title display">Certifications</h2>
          <p className="section-subtitle">
            A selection of courses and certifications that reflect my curiosity,
            continuous learning, and growing technical foundation.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-7">
          {loading && (
            <div className="md:col-span-2 xl:col-span-3 glass-card p-7 text-center text-[var(--muted)]">
              Loading certifications...
            </div>
          )}

          {!loading && certifications.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 glass-card p-8 text-center text-[var(--muted)]">
              No certifications added yet.
            </div>
          )}

          {certifications.map((certificate, index) => {
            const meta = certificateMeta[certificate._id] || {
              issuer: "Certification",
              label: "Achievement",
            };
            const imageUrl = certificate.image?.startsWith("/")
              ? certificate.image
              : `${ASSET_BASE_URL}${certificate.image}`;

            return (
            <motion.div
              key={certificate._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="certificate-card elevated-card overflow-hidden"
            >
              <div className="certificate-card__image">
                {certificate.image ? (
                  <img src={imageUrl} alt={certificate.title} />
                ) : (
                  <div className="certificate-card__empty">Certificate preview</div>
                )}
                <span className="certificate-card__number">0{index + 1}</span>
                <a
                  href={certificate.image ? imageUrl : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={`certificate-card__view ${certificate.image ? "" : "pointer-events-none opacity-50"}`}
                >
                  View certificate ↗
                </a>
              </div>

              <div className="certificate-card__body">
                <span className="certificate-card__label">{meta.label}</span>
                <h3 className="display text-xl font-bold text-[var(--text)]">
                  {certificate.title}
                </h3>
                <p>{meta.issuer}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Certifications;