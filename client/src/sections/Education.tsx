import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Education {
  _id: string;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
}

function Education() {
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.get("/education");
        setEducation(response.data);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    fetchEducation();
  }, []);

  if (education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="section-block">
      <div className="section-shell">
        <div className="text-center mb-14">
          <span className="section-tag">
            Academic Journey
          </span>

          <h2 className="section-title display">
            Education
          </h2>

          <p className="section-subtitle">
            My academic qualifications and achievements that have
            built a strong foundation in software development.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 top-2 bottom-4 w-[2px] bg-gradient-to-b from-[#5b57d7]/55 to-[#5b57d7]/5 rounded-full" />

          {education.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="relative pl-12 sm:pl-16 pb-8"
            >
              <div className="absolute left-0 top-6 w-8 h-8 rounded-full bg-[var(--primary)] border-4 border-white shadow-lg" />

              <div className="elevated-card p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="display text-2xl font-bold text-[var(--text)]">
                      {item.degree}
                    </h3>

                    <p className="mt-2 text-[var(--primary)] font-bold">
                      {item.college}
                    </p>
                  </div>

                  <span className="mt-4 md:mt-0 soft-chip">
                    {item.year}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="inline-flex bg-[#e4f6ef] text-[#157a54] px-4 py-2 rounded-full font-semibold text-sm">
                    CGPA : {item.cgpa}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;