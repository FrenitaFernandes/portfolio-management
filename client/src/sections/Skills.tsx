import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

function Skills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="section-block">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-tag">
            My Expertise
          </span>

          <h2 className="section-title display">
            Technical Skills
          </h2>

          <p className="section-subtitle">
            Technologies and tools that I use to build modern,
            scalable and user-friendly web applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-14">
          {loading && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 glass-card p-6 text-center text-[var(--muted)]">
              Loading skills...
            </div>
          )}

          {!loading && skills.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 glass-card p-8 text-center text-[var(--muted)]">
              No skills added yet.
            </div>
          )}

          {skills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
              }}
              className="elevated-card p-7 text-center"
            >
              <div
                className="w-16 h-16 rounded-[1.1rem] bg-[var(--soft-primary)] text-[var(--primary)] font-bold text-xl flex items-center justify-center mx-auto"
              >
                {skill.name.charAt(0)}
              </div>

              <h3 className="mt-5 text-lg font-bold text-[var(--text)]">
                {skill.name}
              </h3>

              <p className="mt-2 text-sm text-[var(--muted)]">
                {skill.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;