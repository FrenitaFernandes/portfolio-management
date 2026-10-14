import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiC,
} from "react-icons/si";
import {
  FaDatabase,
  FaCode,
  FaChartLine,
  FaCheckCircle,
  FaLayerGroup,
  FaJava,
} from "react-icons/fa";
import api from "../services/api";
import { skills as fallbackSkills } from "../data/portfolio";

const skillIcons: Record<string, IconType> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  SQL: FaDatabase,
  HTML5: SiHtml5,
  CSS3: SiCss,
  "React.js": SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Git: SiGit,
  GitHub: SiGithub,
  C: SiC,
  "Core Java": FaJava,
  "Software Development": FaCode,
  "MERN Stack Development": FaLayerGroup,
  "Quality Assurance": FaCheckCircle,
  "Data Analytics": FaChartLine,
};

const skillColors: Record<string, string> = {
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  SQL: "#4479A1",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  "React.js": "#61DAFB",
  "Node.js": "#339933",
  "Express.js": "#111827",
  MySQL: "#4479A1",
  MongoDB: "#47A248",
  Git: "#F05032",
  GitHub: "#181717",
  C: "#A8B9CC",
  "Core Java": "#E76F00",
};

const categoryOrder = [
  "Programming Languages",
  "Frontend Development",
  "Backend Development",
  "Databases",
  "Tools",
  "Areas of Interest",
];

function Skills() {
  const [skills, setSkills] = useState<any[]>(fallbackSkills);
  const [loading, setLoading] = useState(false);
  const categories = [
    ...categoryOrder,
    ...skills
      .map((skill) => skill.category)
      .filter((category) => category && !categoryOrder.includes(category)),
  ].filter((category, index, all) => all.indexOf(category) === index);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");
        const apiSkills = response.data || [];
        const mergedSkills = apiSkills.length
          ? [
              ...apiSkills,
              ...fallbackSkills.filter(
                (fallback) =>
                  !apiSkills.some((skill: { name: string }) => skill.name === fallback.name)
              ),
            ]
          : fallbackSkills;
        setSkills(mergedSkills);
      } catch (error) {
        console.error(error);
        setSkills(fallbackSkills);
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

        <div className="mt-14 space-y-10">
          {loading && (
            <div className="glass-card p-6 text-center text-[var(--muted)]">
              Loading skills...
            </div>
          )}

          {!loading && skills.length === 0 && (
            <div className="glass-card p-8 text-center text-[var(--muted)]">
              Skills will be added soon.
            </div>
          )}

          {!loading && categories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category);

            if (categorySkills.length === 0) return null;

            return (
              <div key={category}>
                <div className="mb-5 flex items-center gap-4">
                  <h3 className="display text-xl font-bold text-[var(--text)] sm:text-2xl">
                    {category}
                  </h3>
                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categorySkills.map((skill, index) => {
                    const Icon = skillIcons[skill.name] || FaCode;

                    return (
                      <motion.div
                        key={skill._id || skill.name}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        whileHover={{ y: -6 }}
                        className="elevated-card flex min-h-36 flex-col items-center justify-center p-6 text-center"
                      >
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--soft-primary)] text-3xl"
                          style={{ color: skillColors[skill.name] || "var(--primary)" }}
                        >
                          <Icon aria-hidden="true" />
                        </div>

                        <h4 className="mt-4 text-base font-bold text-[var(--text)] sm:text-lg">
                          {skill.name}
                        </h4>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;