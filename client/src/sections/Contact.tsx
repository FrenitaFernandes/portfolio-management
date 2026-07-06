import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

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
            Let's Work Together
          </h2>

          <p className="section-subtitle">
            Have a project, internship opportunity or collaboration in
            mind? Feel free to contact me.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <div className="glass-card p-7 md:p-9">
            <h3 className="display text-3xl font-bold text-[var(--text)]">
              Get in Touch
            </h3>

            <p className="mt-4 text-[var(--muted)] leading-8 text-lg">
              I'm always open to discussing internships,
              freelance work and exciting opportunities.
            </p>

            <div className="mt-9 space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[var(--soft-primary)] flex items-center justify-center text-[var(--primary)]">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="font-semibold text-[var(--text)]">Email</p>
                  <p className="text-[var(--muted)] break-all">
                    {profile?.email || "your-email@example.com"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[var(--soft-primary)] flex items-center justify-center text-[var(--primary)]">
                  <FaPhone />
                </div>

                <div>
                  <p className="font-semibold text-[var(--text)]">Phone</p>
                  <p className="text-[var(--muted)]">
                    {profile?.phone || "Add phone in admin profile"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-btn"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                )}

                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-btn"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 md:p-9 space-y-5"
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