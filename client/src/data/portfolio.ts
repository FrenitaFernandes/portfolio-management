export const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB']

export type ProjectItem = {
  title: string
  description: string
}

export const projects: ProjectItem[] = [
  {
    title: 'Portfolio Management Dashboard',
    description: 'Admin-controlled portfolio site with project CRUD, resume upload, and contact form handling.',
  },
  {
    title: 'E-commerce UI',
    description: 'Responsive shopping experience with filterable product cards and animated interactions.',
  },
  {
    title: 'Task Tracker',
    description: 'Productivity app with reusable components, clean state flow, and mobile-first layout.',
  },
]
