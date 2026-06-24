import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

function About() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");

        console.log("PROFILE RESPONSE =", response.data);

        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <section id="about" className="py-24 text-center">
        Loading...
      </section>
    );
  }

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center text-slate-800">
            About Me
          </h2>

          <div className="mt-12 bg-white/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-lg border border-white/40">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              
              {/* Profile Image */}
              <div className="flex justify-center">
                <img
                  src={`http://localhost:5000${profile.profileImage}`}
                  alt={profile.name}
                  className="w-64 h-64 rounded-3xl object-cover shadow-xl"
                />
              </div>

              {/* Profile Details */}
              <div>
                <h3 className="text-3xl font-semibold text-slate-800">
                  {profile.name}
                </h3>

                <p className="mt-2 text-violet-600 font-medium">
                  {profile.title}
                </p>

                <p className="mt-6 text-slate-600 leading-8">
                  {profile.about}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  
                  <div>
                    <span className="font-semibold">Email:</span>
                    <p className="text-slate-600">
                      {profile.email}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold">Phone:</span>
                    <p className="text-slate-600">
                      {profile.phone}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold">Location:</span>
                    <p className="text-slate-600">
                      {profile.location}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold">Role:</span>
                    <p className="text-slate-600">
                      {profile.title}
                    </p>
                  </div>

                </div>

                <div className="flex gap-4 mt-8">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    LinkedIn
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition"
                  >
                    GitHub
                  </a>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;