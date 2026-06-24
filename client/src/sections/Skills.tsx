import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Technical Skills
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Technologies and tools I work with.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">

          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              whileHover={{ scale: 1.08 }}
              className="
                px-6
                py-3
                rounded-full
                bg-white/60
                backdrop-blur-lg
                border
                border-white/40
                shadow-md
                text-slate-700
                font-medium
                cursor-pointer
              "
            >
              {skill.name}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Skills;