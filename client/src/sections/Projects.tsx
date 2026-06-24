import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Projects
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Some of my recent work and full stack applications.
        </p>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {projects.map((project) => (
            <motion.div
              key={project._id}
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
                src={`http://localhost:5000${project.image}`}
                alt={project.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-semibold text-slate-800">
                  {project.title}
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="
                        px-3
                        py-1
                        text-sm
                        rounded-full
                        bg-violet-100
                        text-violet-700
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3 flex-wrap">

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      px-5
                      py-2
                      rounded-xl
                      bg-violet-600
                      text-white
                      hover:bg-violet-700
                      transition
                    "
                  >
                    GitHub
                  </a>

                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        px-5
                        py-2
                        rounded-xl
                        border
                        border-violet-600
                        text-violet-600
                        hover:bg-violet-50
                        transition
                      "
                    >
                      Live Demo
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