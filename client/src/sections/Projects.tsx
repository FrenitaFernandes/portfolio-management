import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import api, { ASSET_BASE_URL } from "../services/api";

function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <span className="uppercase tracking-widest text-violet-600 font-semibold">
            Portfolio
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-slate-900">
            Featured Projects
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 leading-8">
            Here are some projects that showcase my experience in
            full stack development and modern web technologies.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">

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
                y: -10,
              }}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-xl
                border
                border-slate-100
                transition
              "
            >

              <div className="overflow-hidden">

                <img
                  src={`${ASSET_BASE_URL}${project.image}`}
                  alt={project.title}
                  className="
                    w-full
                    h-56
                    object-cover
                    transition
                    duration-500
                    hover:scale-110
                  "
                />

              </div>

              <div className="p-7">

                <h3 className="text-2xl font-bold text-slate-900">
                  {project.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">

                  {project.tech.map((tech: string) => (

                    <span
                      key={tech}
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-violet-100
                        text-violet-700
                        text-sm
                        font-medium
                      "
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
                    className="
                      flex-1
                      py-3
                      rounded-xl
                      bg-violet-600
                      text-white
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      hover:bg-violet-700
                      transition
                    "
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  {project.projectUrl && (

                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex-1
                        py-3
                        rounded-xl
                        border-2
                        border-violet-600
                        text-violet-600
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-violet-50
                        transition
                      "
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