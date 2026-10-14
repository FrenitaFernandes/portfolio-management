import Certification from "../models/Certification.js";
import Education from "../models/Education.js";
import Experience from "../models/Experience.js";
import PortfolioSeed from "../models/PortfolioSeed.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Resume from "../models/Resume.js";
import Skill from "../models/Skill.js";

const PORTFOLIO_DATA_VERSION = 1;
const PROFILE_CONTENT_VERSION = 2;
const MEDIA_PATH_VERSION = 4;

const profile = {
  profileImage:
    "/api/assets/profile",
  name: "Frenita Fernandes",
  title: "MCA Student | Full Stack Developer",
  about:
    "Hello! I’m Frenita Fernandes, an enthusiastic and motivated MCA graduate with a passion for technology and innovation. I enjoy developing meaningful digital solutions, exploring new ideas, and solving real-world problems. I am always eager to learn new technologies, take on challenges, and improve my abilities. I look forward to contributing to innovative projects and growing as a professional in the IT industry.",
  email: "frenitafernandes@gmail.com",
  phone: "Not provided",
  location: "Bengaluru, India",
  linkedin:
    "https://www.linkedin.com/in/frenita-fernandes-a9854b2b4?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/FrenitaFernandes",
};

const experiences = [
  {
    role: "Full Stack Development Intern",
    company: "RDL Technologies Private Limited",
    duration: "January 2026 – May 2026",
    description:
      "Developed a Sales and CRM Management System to manage leads, customer interactions, follow-ups, and sales activities. Implemented responsive interfaces and integrated backend services to support database-driven business workflows. Built analytics and reporting features to provide insights into sales performance and customer engagement.",
    skills: ["React.js", "JavaScript", "HTML", "CSS", "Node.js", "MongoDB"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Cognifyz Technologies",
    duration: "July 2025 – August 2025",
    description:
      "Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development.",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "SQL"],
  },
];

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    college: "St. Aloysius College, Mangaluru",
    year: "2024 – 2026",
    cgpa: "8.6 CGPA",
  },
  {
    degree: "Bachelor of Science (BSc)",
    college: "Alva’s Degree College, Moodbidri",
    year: "2021 – 2024",
    cgpa: "9.01 CGPA · Computer Science and Mathematics",
  },
  {
    degree: "Pre-University Course (PUC)",
    college: "Vani Pre-University College, Belthangady",
    year: "2019 – 2021",
    cgpa: "84% · Science (PCMB)",
  },
  {
    degree: "SSLC",
    college: "St. Theresa English Medium High School, Belthangady",
    year: "2016 – 2019",
    cgpa: "87%",
  },
];

const certifications = [
  {
    title: "Privacy and Security in Online Social Media — NPTEL",
    image: "/api/assets/certificate-privacy-security",
  },
  {
    title: "Artificial Intelligence: Concepts and Techniques — NPTEL",
    image: "/api/assets/certificate-artificial-intelligence",
  },
  {
    title: "Programming Fundamentals Using Python",
    image: "/api/assets/certificate-python-basic",
  },
];

const projects = [
  {
    title: "Sales and CRM Management System",
    description:
      "A web-based system for managing sales leads, customer interactions, follow-ups, and sales activities through organized business workflows and an admin module.",
    tech: ["React.js", "JavaScript", "HTML", "CSS", "Node.js", "MongoDB"],
    githubLink: "https://github.com/FrenitaFernandes/sales-crm",
    image: "/api/assets/project-sales-crm",
  },
  {
    title: "Internship Document Upload Portal",
    description:
      "A web application designed to help users upload and manage internship-related documents in an organized manner.",
    tech: ["Technologies to be added"],
    githubLink: "https://github.com/FrenitaFernandes/IDU-Project",
    image: "/api/assets/project-internship",
  },
  {
    title: "Portfolio Management System",
    description:
      "A web application for showcasing projects, education, certifications, skills, and professional information.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    githubLink: "https://github.com/FrenitaFernandes/portfolio-management",
    image: "/api/assets/project-portfolio",
  },
  {
    title: "Eye Disease Detection",
    description:
      "An AI/ML project focused on identifying possible eye diseases from images.",
    tech: ["Machine-learning technologies to be added"],
    githubLink: "https://github.com/FrenitaFernandes/eye_disease_project",
    image: "/api/assets/project-eye-disease",
  },
];

const skills = [
  ["Python", "Programming Languages"],
  ["JavaScript", "Programming Languages"],
  ["SQL", "Programming Languages"],
  ["C", "Programming Languages"],
  ["Core Java", "Programming Languages"],
  ["HTML5", "Frontend Development"],
  ["CSS3", "Frontend Development"],
  ["React.js", "Frontend Development"],
  ["Node.js", "Backend Development"],
  ["Express.js", "Backend Development"],
  ["MySQL", "Databases"],
  ["MongoDB", "Databases"],
  ["Git", "Tools"],
  ["GitHub", "Tools"],
  ["Software Development", "Areas of Interest"],
  ["MERN Stack Development", "Areas of Interest"],
  ["Quality Assurance", "Areas of Interest"],
  ["Data Analytics", "Areas of Interest"],
].map(([name, category]) => ({ name, category }));

const seedPortfolio = async () => {
  const mediaPathsSeeded = await PortfolioSeed.exists({
    version: MEDIA_PATH_VERSION,
  });

  if (!mediaPathsSeeded) {
    await Profile.updateMany({}, { $set: { profileImage: "/api/assets/profile-photo" } });
    await Resume.updateMany({}, { $set: { fileUrl: "/api/assets/resume-latest" } });
    await Project.updateOne(
      { title: "Sales and CRM Management System" },
      { $set: { image: "/api/assets/project-sales-crm" } },
    );
    await Project.updateOne(
      { title: "Internship Document Upload Portal" },
      { $set: { image: "/api/assets/project-internship" } },
    );
    await Project.updateOne(
      { title: "Portfolio Management System" },
      { $set: { image: "/api/assets/project-portfolio" } },
    );
    await Project.updateOne(
      { title: "Eye Disease Detection" },
      { $set: { image: "/api/assets/project-eye-disease" } },
    );
    await Certification.updateOne(
      { title: "Privacy and Security in Online Social Media — NPTEL" },
      { $set: { image: "/api/assets/certificate-privacy-security" } },
    );
    await Certification.updateOne(
      { title: "Artificial Intelligence: Concepts and Techniques — NPTEL" },
      { $set: { image: "/api/assets/certificate-artificial-intelligence" } },
    );
    await Certification.updateOne(
      { title: "Programming Fundamentals Using Python" },
      { $set: { image: "/api/assets/certificate-python-basic" } },
    );
    await PortfolioSeed.create({ version: MEDIA_PATH_VERSION });
    console.log("MongoDB media paths updated");
  }

  const profileContentSeeded = await PortfolioSeed.exists({
    version: PROFILE_CONTENT_VERSION,
  });

  if (!profileContentSeeded) {
    await Profile.findOneAndUpdate({}, profile, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    await PortfolioSeed.create({ version: PROFILE_CONTENT_VERSION });
    console.log("Profile content saved to MongoDB");
  }

  const alreadySeeded = await PortfolioSeed.exists({
    version: PORTFOLIO_DATA_VERSION,
  });

  if (alreadySeeded) {
    return;
  }

  await Promise.all([
    Profile.deleteMany({}),
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Certification.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
  ]);

  await Promise.all([
    Profile.create(profile),
    Experience.insertMany(experiences),
    Education.insertMany(education),
    Certification.insertMany(certifications),
    Project.insertMany(projects),
    Skill.insertMany(skills),
  ]);

  await PortfolioSeed.create({ version: PORTFOLIO_DATA_VERSION });
  console.log("Portfolio data saved to MongoDB");
};

export default seedPortfolio;
