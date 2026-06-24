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
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Education
        </h2>

        <p className="text-center text-slate-600 mt-4">
          My academic journey and qualifications.
        </p>

        <div className="mt-16 relative">

          <div className="absolute left-4 top-0 bottom-0 w-1 bg-violet-200"></div>

          {education.map((item) => (
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
                  {item.degree}
                </h3>

                <p className="text-violet-600 font-medium mt-1">
                  {item.college}
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  {item.year}
                </p>

                <p className="mt-3 text-slate-600">
                  CGPA: {item.cgpa}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Education;