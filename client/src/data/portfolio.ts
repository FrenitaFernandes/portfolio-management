export const skills: { name: string; category: string }[] = [
  { name: 'Python', category: 'Programming Languages' },
  { name: 'JavaScript', category: 'Programming Languages' },
  { name: 'SQL', category: 'Programming Languages' },
  { name: 'C', category: 'Programming Languages' },
  { name: 'Core Java', category: 'Programming Languages' },
  { name: 'HTML5', category: 'Frontend Development' },
  { name: 'CSS3', category: 'Frontend Development' },
  { name: 'React.js', category: 'Frontend Development' },
  { name: 'Node.js', category: 'Backend Development' },
  { name: 'Express.js', category: 'Backend Development' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'MongoDB', category: 'Databases' },
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'Software Development', category: 'Areas of Interest' },
  { name: 'MERN Stack Development', category: 'Areas of Interest' },
  { name: 'Quality Assurance', category: 'Areas of Interest' },
  { name: 'Data Analytics', category: 'Areas of Interest' },
]

export type ProjectItem = {
  _id: string
  title: string
  description: string
  tech: string[]
  githubLink: string
  projectUrl?: string
  image?: string
}

export const projects: ProjectItem[] = [
  {
    _id: 'sales-crm',
    title: 'Sales and CRM Management System',
    description: 'A web-based system for managing sales leads, customer interactions, follow-ups, and sales activities through organized business workflows and an admin module.',
    tech: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/FrenitaFernandes/sales-crm',
    image: '/projects/sales-crm.png',
  },
  {
    _id: 'internship-portal',
    title: 'Internship Document Upload Portal',
    description: 'A web application designed to help users upload and manage internship-related documents in an organized manner.',
    tech: ['Technologies to be added'],
    githubLink: 'https://github.com/FrenitaFernandes/IDU-Project',
    image: '/projects/internship-document-upload.png',
  },
  {
    _id: 'portfolio-system',
    title: 'Portfolio Management System',
    description: 'A web application for showcasing projects, education, certifications, skills, and professional information.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    githubLink: 'https://github.com/FrenitaFernandes/portfolio-management',
  },
  {
    _id: 'eye-disease',
    title: 'Eye Disease Detection',
    description: 'An AI/ML project focused on identifying possible eye diseases from images.',
    tech: ['Machine-learning technologies to be added'],
    githubLink: 'https://github.com/FrenitaFernandes/eye_disease_project',
    image: '/projects/eye-disease-detection.png',
  },
]

export const profile = {
  name: 'Frenita Fernandes',
  title: 'Aspiring Software Developer',
  tagline: 'Passionate about building applications and turning ideas into reality.',
  interests: 'Software Development | Full Stack Development | Quality Assurance',
  about: 'Hello! I’m Frenita Fernandes, an enthusiastic and motivated MCA graduate with a passion for technology and innovation. I enjoy developing meaningful digital solutions, exploring new ideas, and solving real-world problems. I am always eager to learn new technologies, take on challenges, and improve my abilities. I look forward to contributing to innovative projects and growing as a professional in the IT industry.',
  email: 'frenitafernandes@gmail.com',
  phone: '',
  location: 'Bengaluru, India',
  github: 'https://github.com/FrenitaFernandes',
  linkedin: 'https://www.linkedin.com/in/frenita-fernandes-a9854b2b4?utm_source=share_via&utm_content=profile&utm_medium=member_android',
}

export const experience = [
  {
    _id: 'rdl-technologies',
    role: 'Full Stack Development Intern',
    company: 'RDL Technologies Private Limited',
    duration: 'January 2026 – May 2026',
    description: 'Developed a Sales and CRM Management System to manage leads, customer interactions, follow-ups, and sales activities. Implemented responsive interfaces and integrated backend services to support database-driven business workflows. Built analytics and reporting features to provide insights into sales performance and customer engagement.',
    skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB'],
  },
  {
    _id: 'cognifyz',
    role: 'Full Stack Developer Intern',
    company: 'Cognifyz Technologies',
    duration: 'July 2025 – August 2025',
    description: 'Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'SQL'],
  },
]

export const education = [
  { _id: 'mca', degree: 'Master of Computer Applications (MCA)', college: 'St. Aloysius College, Mangaluru', year: '2024 – 2026', cgpa: '8.6 CGPA' },
  { _id: 'bsc', degree: 'Bachelor of Science (BSc)', college: 'Alva’s Degree College, Moodbidri', year: '2021 – 2024', cgpa: '9.01 CGPA · Computer Science and Mathematics' },
  { _id: 'puc', degree: 'Pre-University Course (PUC)', college: 'Vani Pre-University College, Belthangady', year: '2019 – 2021', cgpa: '84% · Science (PCMB)' },
  { _id: 'sslc', degree: 'SSLC', college: 'St. Theresa English Medium High School, Belthangady', year: '2016 – 2019', cgpa: '87%' },
]

export const certifications = [
  { _id: 'nptel-social-media', title: 'Privacy and Security in Online Social Media — NPTEL', image: '/certificates/privacy-security-1.png' },
  { _id: 'nptel-ai', title: 'Artificial Intelligence: Concepts and Techniques — NPTEL', image: '/certificates/artificial-intelligence-1.png' },
  { _id: 'python-fundamentals', title: 'Programming Fundamentals Using Python', image: '/certificates/python-basic-1.png' },
]
