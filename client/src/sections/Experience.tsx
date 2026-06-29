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
    <section id="experience" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <span className="text-violet-600 uppercase tracking-widest font-semibold">
            Career Journey
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-slate-900">
            Experience
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 leading-8">
            My internships and professional experience that have
            helped me build strong technical and problem-solving skills.
          </p>

        </div>

        <div className="relative max-w-4xl mx-auto">

          {/* Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-1 bg-violet-200 rounded-full"></div>

          {experiences.map((item, index) => (

            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="relative pl-16 pb-12"
            >

              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-10 h-10 rounded-full bg-violet-600 border-4 border-white shadow-lg"></div>

              {/* Card */}
              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-xl
                  border
                  border-slate-100
                  p-8
                "
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                  <div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.role}
                    </h3>

                    <p className="text-violet-600 font-semibold mt-2">
                      {item.company}
                    </p>

                  </div>

                  <span className="mt-4 md:mt-0 text-sm bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-medium">
                    {item.duration}
                  </span>

                </div>

                <p className="mt-6 text-slate-600 leading-8">
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