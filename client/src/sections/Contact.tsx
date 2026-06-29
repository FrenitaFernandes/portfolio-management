import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import api from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await api.post("/contact", formData);

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <section id="contact" className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-violet-600 font-semibold">
            Contact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 text-slate-900">
            Let's Work Together
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 leading-8">
            Have a project, internship opportunity or collaboration in
            mind? Feel free to contact me.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Contact Information */}

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10">

            <h3 className="text-2xl font-bold text-slate-900">
              Get in Touch
            </h3>

            <p className="mt-4 text-slate-600 leading-8">
              I'm always open to discussing internships,
              freelance work and exciting opportunities.
            </p>

            <div className="mt-10 space-y-7">

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-slate-600">admin@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <FaPhone />
                </div>

                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-slate-600">9876543210</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <FaGithub />
                </div>

                <div>
                  <p className="font-semibold">GitHub</p>
                  <p className="text-slate-600">
                    github.com/yourusername
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <FaLinkedin />
                </div>

                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-slate-600">
                    linkedin.com/in/yourprofile
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Form */}

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none"
            />

            <textarea
              rows={6}
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
            >
              Send Message
            </button>

          </motion.form>

        </div>

      </div>

    </section>
  );
}

export default Contact;