import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import api from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f8f7fd_0%,#f1f4fb_45%,#f8f3fb_100%)] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md glass-card p-7 sm:p-9">
        <div className="w-14 h-14 rounded-2xl bg-[var(--soft-primary)] text-[var(--primary)] flex items-center justify-center text-xl mb-5 mx-auto">
          <FaLock />
        </div>

        <h1 className="display text-3xl font-extrabold text-center text-[var(--text)]">
          Admin Access
        </h1>

        <p className="mt-3 text-center text-[var(--muted)]">
          Sign in to manage your portfolio sections.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-shell"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-shell"
          />

          <button
            type="submit"
            disabled={loading}
            className="primary-btn w-full py-3.5 disabled:opacity-75"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;