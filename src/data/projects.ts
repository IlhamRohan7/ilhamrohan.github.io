// Add projects here. When the array has entries, the Projects section
// switches automatically from the placeholder to a card grid.
//
// Example entry (copy, uncomment, edit):
// {
//   title: 'Gearbox Housing Design',
//   category: 'Engineering Design',
//   overview: 'One or two sentences about the project.',
//   contribution: 'What you personally did.',
//   tools: ['SolidWorks', 'AutoCAD'],
//   image: '/projects/gearbox.jpg',   // file in /public/projects (optional)
//   imageAlt: 'Rendered view of the gearbox housing',
//   link: 'https://github.com/IlhamRohan7/...',  // optional
//   linkLabel: 'View on GitHub',                // optional
// },

export type Project = {
  title: string
  category: 'Engineering Design' | 'Research Projects' | 'Data Analysis' | 'Manufacturing Systems' | 'Programming and Modelling'
  overview: string
  contribution: string
  tools: string[]
  image?: string
  imageAlt?: string
  link?: string
  linkLabel?: string
}

export const projects: Project[] = []
