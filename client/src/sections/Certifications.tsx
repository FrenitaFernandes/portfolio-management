import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api, { ASSET_BASE_URL } from "../services/api";

interface Certification {
  _id: string;
  title: string;
  image: string;
}

function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await api.get("/certifications");
        setCertifications(response.data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
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
            Professional certifications and achievements that validate
            my technical growth.
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

          {certifications.map((certificate) => (
            <motion.div
              key={certificate._id}
              whileHover={{ y: -8 }}
              className="elevated-card overflow-hidden"
            >
              <img
                src={`${ASSET_BASE_URL}${certificate.image}`}
                alt={certificate.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <h3 className="display text-xl font-bold text-[var(--text)]">
                  {certificate.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;