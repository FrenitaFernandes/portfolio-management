import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import api, { resolveAssetUrl } from "../services/api";
import { projects as fallbackProjects } from "../data/portfolio";

function Projects() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        const apiProjects = response.data || [];
        setProjects(
          apiProjects.length
            ? [
                ...apiProjects.map((project: any) => {
                const fallback = fallbackProjects.find(
                  (item) => item.title === project.title
                );
                return {
                  ...fallback,
                  ...project,
                  githubLink: fallback?.githubLink || project.githubLink,
                  image: fallback?.image || project.image,
                };
                }),
                ...fallbackProjects.filter(
                  (fallback) =>
                    !apiProjects.some((project: any) => project.title === fallback.title)
                ),
              ]
            : fallbackProjects
        );
      } catch (error) {
        console.error(error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section-block">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-tag">
            Portfolio
          </span>

          <h2 className="section-title display">
            Featured Projects
          </h2>

          <p className="section-subtitle">
            Here are some projects that showcase my experience in
            full stack development and modern web technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7 mt-14">
          {loading && (
            <div className="md:col-span-2 xl:col-span-3 glass-card p-7 text-center text-[var(--muted)]">
              Loading projects...
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 glass-card p-8 text-center text-[var(--muted)]">
              No projects added yet.
            </div>
          )}

          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -9,
              }}
              className="elevated-card overflow-hidden"
            >
              <div className="overflow-hidden h-56 bg-gradient-to-br from-[#eaebff] to-[#dff1f3]">
                {project.image ? (
                  <img
                    src={resolveAssetUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="project-placeholder w-full h-full flex flex-col items-center justify-center text-[var(--text)]">
                    <span className="text-5xl font-black opacity-20">
                      0{index + 1}
                    </span>
                    <span className="mt-2 text-sm font-bold uppercase tracking-[0.18em] opacity-60">
                      Selected work
                    </span>
                  </div>
                )}
              </div>

              <div className="p-7">
                <h3 className="display text-2xl font-bold text-[var(--text)]">
                  {project.title}
                </h3>

                <p className="mt-4 text-[var(--muted)] leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {(project.tech || []).map((tech: string) => (
                    <span
                      key={tech}
                      className="soft-chip"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`primary-btn flex-1 ${!project.githubLink ? "pointer-events-none opacity-60" : ""}`}
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-btn flex-1"
                    >
                      <FaExternalLinkAlt />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;