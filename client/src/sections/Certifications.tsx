import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Certification {
  _id: string;
  title: string;
  image: string;
}

function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await api.get("/certifications");
        setCertifications(response.data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchCertifications();
  }, []);

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Certifications
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Certifications and achievements.
        </p>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {certifications.map((certificate) => (
            <motion.div
              key={certificate._id}
              whileHover={{ y: -8 }}
              className="
                bg-white/60
                backdrop-blur-lg
                rounded-3xl
                overflow-hidden
                border
                border-white/40
                shadow-lg
              "
            >
              <img
                src={`http://localhost:5000${certificate.image}`}
                alt={certificate.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800">
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