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
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Contact Me
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Feel free to reach out for opportunities,
          collaborations or projects.
        </p>

        <div className="mt-14 grid lg:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-lg">

            <h3 className="text-2xl font-semibold text-slate-800">
              Get In Touch
            </h3>

            <div className="mt-8 space-y-6">

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-violet-600 text-xl" />
                <span>admin@gmail.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FaPhone className="text-violet-600 text-xl" />
                <span>9876543210</span>
              </div>

              <div className="flex items-center gap-4">
                <FaGithub className="text-violet-600 text-xl" />
                <span>GitHub Profile</span>
              </div>

              <div className="flex items-center gap-4">
                <FaLinkedin className="text-violet-600 text-xl" />
                <span>LinkedIn Profile</span>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-lg space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-200 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-200 outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-200 outline-none"
            />

            <textarea
              rows={5}
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl border border-slate-200 outline-none"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition"
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