import { motion } from "framer-motion";
import { useState } from "react";
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
    <section id="contact" className="section-block">
      <div className="section-shell">
        <div className="text-center mb-14">
          <span className="section-tag">
            Contact
          </span>

          <h2 className="section-title display">
            Let&apos;s Connect
          </h2>

          <p className="section-subtitle">
            I&apos;m open to opportunities in software development, full-stack
            development, and quality assurance. Feel free to connect with me
            to discuss opportunities and projects.
          </p>
        </div>

        <div className="flex justify-center">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card w-full max-w-2xl space-y-5 p-7 md:p-9"
            autoComplete="off"
          >
            <p className="text-sm text-[var(--muted)]">
              Your details below are sent to the portfolio owner.
            </p>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-shell"
              autoComplete="name"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-shell"
              autoComplete="email"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-shell"
              autoComplete="tel"
            />

            <textarea
              rows={6}
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
              className="input-shell resize-none"
            />

            <button
              type="submit"
              className="primary-btn w-full py-3"
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