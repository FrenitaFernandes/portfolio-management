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
    <section id="skills" className="py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <span className="text-violet-600 uppercase tracking-widest font-semibold">
            My Expertise
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-slate-900">
            Technical Skills
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 leading-8">
            Technologies and tools that I use to build modern,
            scalable and user-friendly web applications.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">

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
              className="
                bg-white
                rounded-2xl
                shadow-lg
                border
                border-slate-100
                p-8
                text-center
                transition
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-violet-100
                  text-violet-600
                  font-bold
                  text-xl
                  flex
                  items-center
                  justify-center
                  mx-auto
                "
              >
                {skill.name.charAt(0)}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-800">
                {skill.name}
              </h3>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Skills;