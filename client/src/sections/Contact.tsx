import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import api from "../services/api";

const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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

      if (
        !emailJsServiceId ||
        !emailJsTemplateId ||
        !emailJsPublicKey
      ) {
        alert(
          "Your message was saved, but email notifications are not configured yet."
        );
      } else {
        try {
          await emailjs.send(
            emailJsServiceId,
            emailJsTemplateId,
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message,
              to_email: "frenitafernandes@gmail.com",
            },
            { publicKey: emailJsPublicKey },
          );
          alert("Message sent successfully!");
        } catch (error) {
          console.error("EmailJS notification failed:", error);
          alert(
            "Your message was saved, but the email notification could not be sent. Please try again later.",
          );
        }
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to send message. Please try again.");
      }
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