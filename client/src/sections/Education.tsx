import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Education {
  _id: string;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
}

function Education() {
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.get("/education");
        setEducation(response.data);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    fetchEducation();
  }, []);

  if (education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <span className="uppercase tracking-widest text-violet-600 font-semibold">
            Academic Journey
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-slate-900">
            Education
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 leading-8">
            My academic qualifications and achievements that have
            built a strong foundation in software development.
          </p>

        </div>

        <div className="relative max-w-4xl mx-auto">

          {/* Timeline */}
          <div className="absolute left-5 top-0 bottom-0 w-1 bg-violet-200 rounded-full"></div>

          {education.map((item, index) => (

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
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                  <div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {item.degree}
                    </h3>

                    <p className="mt-2 text-violet-600 font-semibold">
                      {item.college}
                    </p>

                  </div>

                  <span className="mt-4 md:mt-0 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium">
                    {item.year}
                  </span>

                </div>

                <div className="mt-6">

                  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                    CGPA : {item.cgpa}
                  </span>

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