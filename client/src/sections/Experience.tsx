import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";
import { experience as fallbackExperience } from "../data/portfolio";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}

function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>(fallbackExperience);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.get("/experience");
        setExperiences(response.data?.length ? response.data : fallbackExperience);
      } catch (error) {
        console.error("Error fetching experience:", error);
        setExperiences(fallbackExperience);
      }
    };

    fetchExperience();
  }, []);

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="section-block">
      <div className="section-shell">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-tag">
            Career Journey
          </span>

          <h2 className="section-title display">
            Experience
          </h2>

          <p className="section-subtitle">
            My internships and professional experience that have
            helped me build strong technical and problem-solving skills.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8170ff]/80 via-[#8170ff]/40 to-[#8170ff]/10" />

          {experiences.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="relative pt-4 pb-14 last:pb-0"
            >
              <div className="absolute left-1/2 top-0 z-10 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-[#080815] bg-[#8170ff] shadow-[0_0_0_5px_rgba(129,112,255,0.16)]" />

              <div className="relative z-[1] mx-auto min-w-0 max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 pt-10 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:p-8 sm:pt-10">
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="min-w-0">
                    <h3 className="display break-words text-2xl font-bold leading-tight text-[var(--text)] sm:text-3xl">
                      {item.role}
                    </h3>

                    <p className="mt-2 break-words font-bold leading-relaxed text-[var(--primary)]">
                      {item.company}
                    </p>
                  </div>

                  <span className="soft-chip w-fit shrink-0 whitespace-normal text-left leading-relaxed md:mt-1 md:whitespace-nowrap">
                    {item.duration}
                  </span>
                </div>

                <p className="mt-5 break-words text-[var(--muted)] leading-8">
                  {item.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className="soft-chip whitespace-nowrap">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;