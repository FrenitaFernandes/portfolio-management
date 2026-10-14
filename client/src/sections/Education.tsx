import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaAward,
} from "react-icons/fa";
import api, { resolveAssetUrl } from "../services/api";
import { education as fallbackEducation } from "../data/portfolio";

interface Education {
  _id: string;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
  logo: string;
}

function Education() {
  const [education, setEducation] = useState<Education[]>(fallbackEducation);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.get("/education");
        const apiEducation = response.data || [];
        setEducation(
          apiEducation.length
            ? [
                ...fallbackEducation.map((fallback) => {
                  const item = apiEducation.find(
                    (entry: Education) => entry.degree === fallback.degree
                  );
                  return { ...fallback, ...item, cgpa: fallback.cgpa, logo: fallback.logo };
                }),
              ]
            : fallbackEducation
        );
      } catch (error) {
        console.error("Error fetching education:", error);
        setEducation(fallbackEducation);
      }
    };

    fetchEducation();
  }, []);

  if (education.length === 0) return null;

  return (
    <section id="education" className="section-block">
      <div className="section-shell">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-tag">
            Academic Journey
          </span>

          <h2 className="section-title display">
            Education
          </h2>

          <p className="section-subtitle">
            My academic qualifications that have built a strong
            foundation in software development.
          </p>

          <div className="section-divider"></div>
        </div>

        {/* Cards */}

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-[#8170ff]/80 via-[#8170ff]/40 to-[#8170ff]/10" />

          {education.map((item, index) => (

            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{ y: -5 }}
              className="relative pt-4 pb-8 last:pb-0 sm:pb-10"
            >
              <div className="absolute left-1/2 top-0 z-10 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-[#080815] bg-[#8170ff] shadow-[0_0_0_5px_rgba(129,112,255,0.16)]" />

              <div className="relative z-[1] mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] pt-1.5 shadow-[var(--shadow-soft)] transition duration-300 hover:shadow-[var(--shadow-hover)]">
                <div className="h-1.5 bg-gradient-to-r from-[#8170ff] via-[#b69dff] to-[#4c8bc4]" />

                <div className="p-6 sm:p-8">

                {/* Degree */}

                <div className="flex min-w-0 items-start gap-4 sm:gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2 sm:h-16 sm:w-16">
                    {item.logo ? (
                      <img src={resolveAssetUrl(item.logo)} alt="" className="h-full w-full object-contain" />
                    ) : (
                      <FaGraduationCap className="text-2xl text-[var(--primary)] sm:text-3xl" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="display break-words text-2xl font-bold leading-tight text-[var(--text)] sm:text-3xl">

                      {item.degree}

                    </h3>

                    <div className="mt-3 flex items-start gap-3 break-words text-[var(--muted)] sm:mt-4">

                      <FaUniversity className="mt-1 shrink-0 text-[var(--primary)]" />

                      <span className="text-base leading-relaxed sm:text-lg">

                        {item.college}

                      </span>

                    </div>

                  </div>

                </div>

                {/* bottom */}

                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">

                  {item.cgpa && (
                    <div className="inline-flex max-w-full items-start gap-3 rounded-2xl bg-emerald-500/10 px-4 py-2.5 font-semibold leading-relaxed text-emerald-300 sm:rounded-full sm:px-5 sm:py-3">
                      <FaAward className="mt-1 shrink-0" />
                      <span>{item.cgpa}</span>
                    </div>
                  )}

                  <div className="inline-flex w-fit max-w-full items-center gap-3 rounded-full bg-[var(--soft-primary)] px-4 py-2.5 font-semibold text-[var(--primary)] sm:px-5 sm:py-3">

                    <FaCalendarAlt className="shrink-0" />

                    <span>

                      {item.year}

                    </span>

                  </div>

                </div>

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