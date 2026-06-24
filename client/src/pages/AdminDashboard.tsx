import { useState, useEffect } from "react";
import {
  FaUser,
  FaProjectDiagram,
  FaTools,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaFilePdf,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";


import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

const [profileData, setProfileData] = useState({
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

  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await api.get("/contact");
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");

      if (response.data) {
        setProfileData({
          name: response.data.name || "",
          title: response.data.title || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          location: response.data.location || "",
          github: response.data.github || "",
          linkedin: response.data.linkedin || "",
          about: response.data.about || "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (activeTab === "messages") {
    fetchMessages();
  }

  if (activeTab === "profile") {
    fetchProfile();
  }

  if (activeTab === "projects") {
  fetchProjects();
}
}, [activeTab]);



const fetchProjects = async () => {
  try {
    const response = await api.get("/projects");
    setProjects(response.data);
  } catch (error) {
    console.error(error);
  }
};
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const handleProfileChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {
  setProfileData({
    ...profileData,
    [e.target.name]: e.target.value,
  });
};

const handleProfileSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await api.put(
      "/profile",
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile Updated Successfully");
  } catch (error) {
    console.error(error);
    alert("Failed To Update Profile");
  }
};

const handleProjectChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {
  setProjectData({
    ...projectData,
    [e.target.name]: e.target.value,
  });
};

const handleProjectSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/projects",
      {
        ...projectData,
        tech: projectData.tech
          .split(",")
          .map((item) => item.trim()),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Project Added Successfully");

    setProjectData({
      title: "",
      description: "",
      tech: "",
      githubLink: "",
      projectUrl: "",
      image: "",
    });
  } catch (error) {
    console.error(error);
    alert("Failed To Add Project");
  }
};
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">

        {/* Sidebar */}
        <div className="w-72 min-h-screen bg-white shadow-lg p-6">

          <h1 className="text-2xl font-bold text-violet-600 mb-8">
            Admin Panel
          </h1>

          <div className="space-y-3">

            <button
              onClick={() => setActiveTab("profile")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaUser className="inline mr-3" />
              Profile
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaProjectDiagram className="inline mr-3" />
              Projects
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaTools className="inline mr-3" />
              Skills
            </button>

            <button
              onClick={() => setActiveTab("experience")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaBriefcase className="inline mr-3" />
              Experience
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaGraduationCap className="inline mr-3" />
              Education
            </button>

            <button
              onClick={() => setActiveTab("certifications")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaCertificate className="inline mr-3" />
              Certifications
            </button>

            <button
              onClick={() => setActiveTab("resume")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaFilePdf className="inline mr-3" />
              Resume
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className="w-full text-left p-3 rounded-xl hover:bg-violet-100"
            >
              <FaEnvelope className="inline mr-3" />
              Messages
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left p-3 rounded-xl bg-red-500 text-white mt-8 hover:bg-red-600"
            >
              <FaSignOutAlt className="inline mr-3" />
              Logout
            </button>

          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-10">

          <h2 className="text-4xl font-bold text-slate-800 mb-8">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>

          {activeTab === "profile" && (
  <div className="bg-white p-6 rounded-2xl shadow-lg">

    <h3 className="text-2xl font-semibold mb-6">
      Profile Management
    </h3>

    <form
      onSubmit={handleProfileSubmit}
      className="grid md:grid-cols-2 gap-5"
    >

      <input
        type="text"
        name="name"
        value={profileData.name}
        onChange={handleProfileChange}
        placeholder="Full Name"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="title"
        value={profileData.title}
        onChange={handleProfileChange}
        placeholder="Title"
        className="p-4 border rounded-xl"
      />

      <input
        type="email"
        name="email"
        value={profileData.email}
        onChange={handleProfileChange}
        placeholder="Email"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="phone"
        value={profileData.phone}
        onChange={handleProfileChange}
        placeholder="Phone"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="location"
        value={profileData.location}
        onChange={handleProfileChange}
        placeholder="Location"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="github"
        value={profileData.github}
        onChange={handleProfileChange}
        placeholder="GitHub URL"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="linkedin"
        value={profileData.linkedin}
        onChange={handleProfileChange}
        placeholder="LinkedIn URL"
        className="p-4 border rounded-xl md:col-span-2"
      />

      <textarea
        rows={5}
        name="about"
        value={profileData.about}
        onChange={handleProfileChange}
        placeholder="About Me"
        className="p-4 border rounded-xl md:col-span-2"
      />

      <button
        type="submit"
        className="bg-violet-600 text-white py-4 rounded-xl hover:bg-violet-700 md:col-span-2"
      >
        Update Profile
      </button>

    </form>

  </div>
)}
          {activeTab === "projects" && (
  <div className="bg-white p-6 rounded-2xl shadow-lg">

    <h3 className="text-2xl font-semibold mb-6">
      Add Project
    </h3>

    <form
      onSubmit={handleProjectSubmit}
      className="grid md:grid-cols-2 gap-5"
    >

      <input
        type="text"
        name="title"
        value={projectData.title}
        onChange={handleProjectChange}
        placeholder="Project Title"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="tech"
        value={projectData.tech}
        onChange={handleProjectChange}
        placeholder="React, Node.js, MongoDB"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="githubLink"
        value={projectData.githubLink}
        onChange={handleProjectChange}
        placeholder="GitHub Link"
        className="p-4 border rounded-xl"
      />

      <input
        type="text"
        name="projectUrl"
        value={projectData.projectUrl}
        onChange={handleProjectChange}
        placeholder="Live Demo URL"
        className="p-4 border rounded-xl"
      />

      <textarea
        rows={5}
        name="description"
        value={projectData.description}
        onChange={handleProjectChange}
        placeholder="Project Description"
        className="p-4 border rounded-xl md:col-span-2"
      />

      <button
        type="submit"
        className="bg-violet-600 text-white py-4 rounded-xl hover:bg-violet-700 md:col-span-2"
      >
        Add Project
      </button>

    </form>
    <form
  onSubmit={handleProjectSubmit}
  className="grid md:grid-cols-2 gap-5"
>
  ...
</form>

<div className="mt-10">
  <h3 className="text-xl font-semibold mb-4">
    Existing Projects
  </h3>

  {projects.map((project) => (
    
    <div
      key={project._id}
      className="border rounded-xl p-4 mb-4"
    >
      <h4 className="font-bold">
        {project.title}
      </h4>

      <p>{project.description}</p>
      
    </div>
  ))}
</div>

  </div>
)}

          {activeTab === "skills" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              Skills Management
            </div>
          )}

          {activeTab === "experience" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              Experience Management
            </div>
          )}

          {activeTab === "education" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              Education Management
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              Certifications Management
            </div>
          )}

          {activeTab === "resume" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              Resume Management
            </div>
          )}

          {activeTab === "messages" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h3 className="text-2xl font-semibold mb-6">
                Contact Messages
              </h3>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Phone</th>
                      <th className="text-left p-3">Message</th>
                    </tr>
                  </thead>

                  <tbody>

                    {messages.map((msg) => (
                      <tr
                        key={msg._id}
                        className="border-b"
                      >
                        <td className="p-3">{msg.name}</td>
                        <td className="p-3">{msg.email}</td>
                        <td className="p-3">{msg.phone}</td>
                        <td className="p-3">{msg.message}</td>
                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;