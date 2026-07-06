import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  FaBars,
  FaBriefcase,
  FaCertificate,
  FaEnvelope,
  FaFilePdf,
  FaGraduationCap,
  FaProjectDiagram,
  FaSignOutAlt,
  FaTimes,
  FaTools,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api, { ASSET_BASE_URL } from "../services/api";

type TabKey =
  | "profile"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "certifications"
  | "resume"
  | "messages";

type BasicItem = { _id: string };
type Project = BasicItem & {
  title: string;
  description: string;
  tech: string[];
  githubLink: string;
  projectUrl?: string;
  image: string;
};
type Skill = BasicItem & { name: string; category: string };
type Experience = BasicItem & {
  company: string;
  role: string;
  duration: string;
  description: string;
};
type Education = BasicItem & {
  degree: string;
  college: string;
  year: string;
  cgpa: string;
};
type Certificate = BasicItem & { title: string; image: string };
type Message = BasicItem & {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: string;
};

type Resume = {
  fileName: string;
  fileUrl: string;
} | null;

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [resumeInfo, setResumeInfo] = useState<Resume>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [certificateImageFile, setCertificateImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [projectImagePreview, setProjectImagePreview] = useState("");
  const [certificateImagePreview, setCertificateImagePreview] = useState("");

  const [profileData, setProfileData] = useState({
    profileImage: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    about: "",
  });

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    tech: "",
    githubLink: "",
    projectUrl: "",
    image: "",
  });

  const [skillData, setSkillData] = useState({
    name: "",
    category: "",
  });

  const [experienceData, setExperienceData] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });

  const [educationData, setEducationData] = useState({
    degree: "",
    college: "",
    year: "",
    cgpa: "",
  });

  const [certificateData, setCertificateData] = useState({
    title: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  const authConfig = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  const uploadImageFile = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/upload/image", formData, {
      ...authConfig,
      headers: {
        ...authConfig.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data?.imageUrl as string;
  };

  const tabs: { key: TabKey; label: string; icon: ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "projects", label: "Projects", icon: <FaProjectDiagram /> },
    { key: "skills", label: "Skills", icon: <FaTools /> },
    { key: "experience", label: "Experience", icon: <FaBriefcase /> },
    { key: "education", label: "Education", icon: <FaGraduationCap /> },
    { key: "certifications", label: "Certifications", icon: <FaCertificate /> },
    { key: "resume", label: "Resume", icon: <FaFilePdf /> },
    { key: "messages", label: "Messages", icon: <FaEnvelope /> },
  ];

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchByTab = async () => {
      setLoading(true);
      try {
        if (activeTab === "profile") await fetchProfile();
        if (activeTab === "projects") await fetchProjects();
        if (activeTab === "skills") await fetchSkills();
        if (activeTab === "experience") await fetchExperience();
        if (activeTab === "education") await fetchEducation();
        if (activeTab === "certifications") await fetchCertificates();
        if (activeTab === "resume") await fetchResume();
        if (activeTab === "messages") await fetchMessages();
      } finally {
        setLoading(false);
      }
    };

    fetchByTab();
  }, [activeTab]);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      const data = response.data;

      if (data) {
        setProfileData({
          profileImage: data.profileImage || "",
          name: data.name || "",
          title: data.title || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          about: data.about || "",
        });

        setProfileImagePreview(
          data.profileImage
            ? `${ASSET_BASE_URL}${data.profileImage}`
            : ""
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      setSkills(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await api.get("/experience");
      setExperiences(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await api.get("/education");
      setEducation(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await api.get("/certifications");
      setCertificates(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get("/contact", authConfig);
      setMessages(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResume = async () => {
    try {
      const response = await api.get("/resume");
      setResumeInfo(response.data || null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const imageUrl = profileImageFile
        ? await uploadImageFile(profileImageFile)
        : profileData.profileImage;

      await api.put(
        "/profile",
        {
          ...profileData,
          profileImage: imageUrl,
        },
        authConfig
      );

      setProfileImageFile(null);
      alert("Profile updated successfully");
      await fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let projectImageUrl = projectData.image;

      if (projectImageFile) {
        projectImageUrl = await uploadImageFile(projectImageFile);
      }

      await api.post(
        "/projects",
        {
          ...projectData,
          image: projectImageUrl,
          tech: projectData.tech
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
        authConfig
      );

      alert("Project added successfully");
      setProjectData({
        title: "",
        description: "",
        tech: "",
        githubLink: "",
        projectUrl: "",
        image: "",
      });
      setProjectImageFile(null);
      setProjectImagePreview("");
      await fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to add project");
    }
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillData({
      ...skillData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/skills", skillData, authConfig);
      alert("Skill added successfully");

      setSkillData({
        name: "",
        category: "",
      });
      await fetchSkills();
    } catch (error) {
      console.error(error);
      alert("Failed to add skill");
    }
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExperienceData({
      ...experienceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/experience", experienceData, authConfig);
      alert("Experience added successfully");

      setExperienceData({
        company: "",
        role: "",
        duration: "",
        description: "",
      });
      await fetchExperience();
    } catch (error) {
      console.error(error);
      alert("Failed to add experience");
    }
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducationData({
      ...educationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/education", educationData, authConfig);
      alert("Education added successfully");

      setEducationData({
        degree: "",
        college: "",
        year: "",
        cgpa: "",
      });
      await fetchEducation();
    } catch (error) {
      console.error(error);
      alert("Failed to add education");
    }
  };

  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateData({
      ...certificateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let certificateImageUrl = certificateData.image;

      if (certificateImageFile) {
        certificateImageUrl = await uploadImageFile(
          certificateImageFile
        );
      }

      await api.post(
        "/certifications",
        {
          ...certificateData,
          image: certificateImageUrl,
        },
        authConfig
      );
      alert("Certificate added successfully");

      setCertificateData({
        title: "",
        image: "",
      });
      setCertificateImageFile(null);
      setCertificateImagePreview("");
      await fetchCertificates();
    } catch (error) {
      console.error(error);
      alert("Failed to add certificate");
    }
  };

  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resume) return;

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await api.post("/resume/upload", formData, {
        ...authConfig,
        headers: {
          ...authConfig.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resume uploaded successfully");
      setResume(null);
      await fetchResume();
    } catch (error) {
      console.error(error);
      alert("Resume upload failed");
    }
  };

  const deleteItem = async (
    endpoint: string,
    id: string,
    onSuccess: () => Promise<void>,
    successMessage: string
  ) => {
    try {
      await api.delete(`${endpoint}/${id}`, authConfig);
      alert(successMessage);
      await onSuccess();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const deleteResume = async () => {
    try {
      await api.delete("/resume", authConfig);
      alert("Resume deleted");
      await fetchResume();
    } catch (error) {
      console.error(error);
      alert("Failed to delete resume");
    }
  };

  const sectionTitle =
    activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f8f7fd_0%,#f1f4fb_45%,#f8f3fb_100%)]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/70">
        <div className="section-shell h-16 flex items-center justify-between">
          <button
            type="button"
            className="lg:hidden w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>
          <h1 className="display text-xl font-bold text-[var(--text)]">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="secondary-btn px-4 py-2 text-sm"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </header>

      <div className="section-shell py-6 grid lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-[280px] lg:w-auto bg-white/92 backdrop-blur-xl border border-white/80 rounded-none lg:rounded-2xl shadow-[0_18px_45px_rgba(31,42,68,0.12)] p-5 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between lg:justify-start mb-5">
            <h2 className="display text-2xl text-[var(--primary)] font-bold">Admin Panel</h2>
            <button
              type="button"
              className="lg:hidden w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left rounded-xl px-4 py-3 flex items-center gap-3 font-semibold transition ${
                    isActive
                      ? "bg-[var(--soft-primary)] text-[var(--primary)]"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleLogout}
            className="primary-btn w-full mt-6"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 bg-slate-900/25 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        <main className="glass-card p-5 sm:p-7 lg:p-8 min-h-[72vh] z-10">
          <h2 className="display text-3xl font-extrabold text-[var(--text)] mb-6">
            {sectionTitle}
          </h2>

          {loading && (
            <div className="mb-5 text-[var(--muted)]">Loading...</div>
          )}

          {activeTab === "profile" && (
            <div>
              <h3 className="display text-2xl font-bold mb-5 text-[var(--text)]">Profile Management</h3>
              <form onSubmit={handleProfileSubmit} className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2 grid gap-3">
                  <label className="text-sm font-semibold text-[var(--muted)]">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="input-shell"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setProfileImageFile(file);
                      if (file) {
                        setProfileImagePreview(
                          URL.createObjectURL(file)
                        );
                      }
                    }}
                  />
                  {profileImagePreview && (
                    <img
                      src={profileImagePreview}
                      alt="Profile preview"
                      className="h-40 w-40 rounded-2xl object-cover border border-slate-200"
                    />
                  )}
                </div>
                <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} placeholder="Full Name" className="input-shell" />
                <input type="text" name="title" value={profileData.title} onChange={handleProfileChange} placeholder="Title" className="input-shell" />
                <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} placeholder="Email" className="input-shell" />
                <input type="text" name="phone" value={profileData.phone} onChange={handleProfileChange} placeholder="Phone" className="input-shell" />
                <input type="text" name="location" value={profileData.location} onChange={handleProfileChange} placeholder="Location" className="input-shell" />
                <input type="text" name="github" value={profileData.github} onChange={handleProfileChange} placeholder="GitHub URL" className="input-shell" />
                <input type="text" name="linkedin" value={profileData.linkedin} onChange={handleProfileChange} placeholder="LinkedIn URL" className="input-shell md:col-span-2" />
                <textarea rows={5} name="about" value={profileData.about} onChange={handleProfileChange} placeholder="About Me" className="input-shell md:col-span-2 resize-none" />
                <button type="submit" className="primary-btn md:col-span-2">Update Profile</button>
              </form>
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              <h3 className="display text-2xl font-bold mb-5 text-[var(--text)]">Add Project</h3>
              <form onSubmit={handleProjectSubmit} className="grid md:grid-cols-2 gap-4">
                <input type="text" name="title" value={projectData.title} onChange={handleProjectChange} placeholder="Project Title" className="input-shell" required />
                <input type="text" name="tech" value={projectData.tech} onChange={handleProjectChange} placeholder="React, Node.js, MongoDB" className="input-shell" required />
                <input type="text" name="githubLink" value={projectData.githubLink} onChange={handleProjectChange} placeholder="GitHub Link" className="input-shell" required />
                <input type="text" name="projectUrl" value={projectData.projectUrl} onChange={handleProjectChange} placeholder="Live Demo URL" className="input-shell" />
                <div className="md:col-span-2 grid gap-3">
                  <label className="text-sm font-semibold text-[var(--muted)]">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="input-shell"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setProjectImageFile(file);
                      if (file) {
                        setProjectImagePreview(
                          URL.createObjectURL(file)
                        );
                      }
                    }}
                    required={!projectData.image}
                  />
                  {projectImagePreview && (
                    <img
                      src={projectImagePreview}
                      alt="Project preview"
                      className="h-40 w-full max-w-sm rounded-2xl object-cover border border-slate-200"
                    />
                  )}
                </div>
                <textarea rows={5} name="description" value={projectData.description} onChange={handleProjectChange} placeholder="Project Description" className="input-shell md:col-span-2 resize-none" required />
                <button type="submit" className="primary-btn md:col-span-2">Add Project</button>
              </form>

              <div className="mt-10">
                <h4 className="display text-xl font-bold mb-4">Existing Projects</h4>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project._id} className="elevated-card p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h5 className="font-bold text-lg text-[var(--text)]">{project.title}</h5>
                          <p className="text-[var(--muted)] mt-1">{project.description}</p>
                        </div>
                        <button
                          className="secondary-btn text-sm"
                          onClick={() => deleteItem("/projects", project._id, fetchProjects, "Project deleted")}
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              <h3 className="display text-2xl font-bold mb-5 text-[var(--text)]">Add Skill</h3>
              <form onSubmit={handleSkillSubmit} className="grid md:grid-cols-2 gap-4">
                <input type="text" name="name" value={skillData.name} onChange={handleSkillChange} placeholder="Skill Name" className="input-shell" required />
                <input type="text" name="category" value={skillData.category} onChange={handleSkillChange} placeholder="Frontend / Backend / Database" className="input-shell" required />
                <button type="submit" className="primary-btn md:col-span-2">Add Skill</button>
              </form>

              <div className="mt-10 space-y-3">
                <h4 className="display text-xl font-bold">Existing Skills</h4>
                {skills.map((skill) => (
                  <div key={skill._id} className="elevated-card p-4 flex items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-[var(--text)]">{skill.name}</h5>
                      <p className="text-[var(--muted)] text-sm">{skill.category}</p>
                    </div>
                    <button
                      className="secondary-btn text-sm"
                      onClick={() => deleteItem("/skills", skill._id, fetchSkills, "Skill deleted")}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div>
              <h3 className="display text-2xl font-bold mb-5 text-[var(--text)]">Add Experience</h3>
              <form onSubmit={handleExperienceSubmit} className="grid md:grid-cols-2 gap-4">
                <input type="text" name="company" value={experienceData.company} onChange={handleExperienceChange} placeholder="Company" className="input-shell" required />
                <input type="text" name="role" value={experienceData.role} onChange={handleExperienceChange} placeholder="Role" className="input-shell" required />
                <input type="text" name="duration" value={experienceData.duration} onChange={handleExperienceChange} placeholder="Duration" className="input-shell md:col-span-2" required />
                <textarea rows={4} name="description" value={experienceData.description} onChange={handleExperienceChange} placeholder="Description" className="input-shell md:col-span-2 resize-none" required />
                <button type="submit" className="primary-btn md:col-span-2">Add Experience</button>
              </form>

              <div className="mt-10 space-y-3">
                <h4 className="display text-xl font-bold">Existing Experience</h4>
                {experiences.map((item) => (
                  <div key={item._id} className="elevated-card p-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h5 className="font-bold text-[var(--text)]">{item.role}</h5>
                        <p className="text-[var(--primary)] font-semibold">{item.company}</p>
                      </div>
                      <span className="soft-chip">{item.duration}</span>
                    </div>
                    <p className="mt-2 text-[var(--muted)]">{item.description}</p>
                    <button
                      className="secondary-btn mt-3 text-sm"
                      onClick={() => deleteItem("/experience", item._id, fetchExperience, "Experience deleted")}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div>
              <h3 className="display text-2xl font-bold mb-5 text-[var(--text)]">Add Education</h3>
              <form onSubmit={handleEducationSubmit} className="grid md:grid-cols-2 gap-4">
                <input type="text" name="degree" value={educationData.degree} onChange={handleEducationChange} placeholder="Degree" className="input-shell" required />
                <input type="text" name="college" value={educationData.college} onChange={handleEducationChange} placeholder="College" className="input-shell" required />
                <input type="text" name="year" value={educationData.year} onChange={handleEducationChange} placeholder="Year" className="input-shell" required />
                <input type="text" name="cgpa" value={educationData.cgpa} onChange={handleEducationChange} placeholder="CGPA" className="input-shell" required />
                <button type="submit" className="primary-btn md:col-span-2">Add Education</button>
              </form>

              <div className="mt-10 space-y-3">
                <h4 className="display text-xl font-bold">Existing Education</h4>
                {education.map((item) => (
                  <div key={item._id} className="elevated-card p-4 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h5 className="font-bold text-[var(--text)]">{item.degree}</h5>
                      <p className="text-[var(--muted)]">{item.college}</p>
                      <p className="text-[var(--muted)] text-sm">{item.year} | CGPA: {item.cgpa}</p>
                    </div>
                    <button
                      className="secondary-btn text-sm"
                      onClick={() => deleteItem("/education", item._id, fetchEducation, "Education deleted")}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certifications" && (
            <div>
              <h3 className="display text-2xl font-bold mb-5 text-[var(--text)]">Add Certificate</h3>
              <form onSubmit={handleCertificateSubmit} className="grid gap-4">
                <input type="text" name="title" value={certificateData.title} onChange={handleCertificateChange} placeholder="Certificate Title" className="input-shell" required />
                <div className="grid gap-3">
                  <label className="text-sm font-semibold text-[var(--muted)]">
                    Certificate Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="input-shell"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setCertificateImageFile(file);
                      if (file) {
                        setCertificateImagePreview(
                          URL.createObjectURL(file)
                        );
                      }
                    }}
                    required={!certificateData.image}
                  />
                  {certificateImagePreview && (
                    <img
                      src={certificateImagePreview}
                      alt="Certificate preview"
                      className="h-40 w-full max-w-sm rounded-2xl object-cover border border-slate-200"
                    />
                  )}
                </div>
                <button type="submit" className="primary-btn">Add Certificate</button>
              </form>

              <div className="mt-10 space-y-3">
                <h4 className="display text-xl font-bold">Existing Certificates</h4>
                {certificates.map((certificate) => (
                  <div key={certificate._id} className="elevated-card p-4 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h5 className="font-bold text-[var(--text)]">{certificate.title}</h5>
                      <p className="text-[var(--muted)] text-sm break-all">{certificate.image}</p>
                    </div>
                    <button
                      className="secondary-btn text-sm"
                      onClick={() =>
                        deleteItem(
                          "/certifications",
                          certificate._id,
                          fetchCertificates,
                          "Certificate deleted"
                        )
                      }
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "resume" && (
            <div>
              <h3 className="display text-2xl font-bold mb-5 text-[var(--text)]">Resume Management</h3>
              <form onSubmit={handleResumeUpload} className="space-y-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="input-shell"
                />
                <button type="submit" className="primary-btn">
                  Upload Resume
                </button>
              </form>

              <div className="mt-8">
                {resumeInfo?.fileUrl ? (
                  <div className="elevated-card p-4 flex items-center justify-between gap-4 flex-wrap">
                    <a
                      href={`${ASSET_BASE_URL}${resumeInfo.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[var(--primary)]"
                    >
                      {resumeInfo.fileName || "Current resume"}
                    </a>
                    <button onClick={deleteResume} className="secondary-btn text-sm">
                      <FaTrash />
                      Delete Resume
                    </button>
                  </div>
                ) : (
                  <p className="text-[var(--muted)]">No resume uploaded yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div>
              <h3 className="display text-2xl font-bold mb-2 text-[var(--text)]">Contact Messages</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                These are messages sent by visitors from your frontend contact form.
              </p>

              {messages.length === 0 ? (
                <p className="text-[var(--muted)]">No messages available.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="text-left border-b border-slate-200">
                        <th className="py-3 px-3">Sender Name</th>
                        <th className="py-3 px-3">Sender Email</th>
                        <th className="py-3 px-3">Sender Phone</th>
                        <th className="py-3 px-3">Opportunity Message</th>
                        <th className="py-3 px-3">Received</th>
                        <th className="py-3 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((msg) => (
                        <tr key={msg._id} className="border-b border-slate-100 align-top">
                          <td className="py-3 px-3 font-semibold text-[var(--text)]">{msg.name}</td>
                          <td className="py-3 px-3 text-[var(--muted)]">{msg.email}</td>
                          <td className="py-3 px-3 text-[var(--muted)]">{msg.phone}</td>
                          <td className="py-3 px-3 text-[var(--muted)]">{msg.message}</td>
                          <td className="py-3 px-3 text-[var(--muted)] text-sm">
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleString()
                              : "-"}
                          </td>
                          <td className="py-3 px-3">
                            <button
                              className="secondary-btn text-sm"
                              onClick={() => deleteItem("/contact", msg._id, fetchMessages, "Message deleted")}
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
