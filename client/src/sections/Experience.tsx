import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.get("/experience");
        setExperiences(response.data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };

    fetchExperience();
  }, []);

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Experience
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Professional experience and internships.
        </p>

        <div className="mt-16 relative">

          <div className="absolute left-4 top-0 bottom-0 w-1 bg-violet-200"></div>

          {experiences.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-14 mb-12"
            >
              <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-violet-600 border-4 border-white"></div>

              <div className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-3xl p-6 shadow-lg">

                <h3 className="text-2xl font-semibold text-slate-800">
                  {item.role}
                </h3>

                <p className="text-violet-600 font-medium mt-1">
                  {item.company}
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  {item.duration}
                </p>

                <p className="mt-4 text-slate-600 leading-7">
                  {item.description}
                </p>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Experience;