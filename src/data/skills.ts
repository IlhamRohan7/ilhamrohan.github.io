// `level` is optional: leave it out and the card shows no proficiency label.
export type Skill = { name: string; area: string; level?: string; note?: string }
export type SkillGroup = { title: string; skills: Skill[] }

export const skillGroups: SkillGroup[] = [
  {
    title: 'Engineering Design',
    skills: [
      { name: 'SolidWorks', area: 'Engineering Design & 3D Modelling', level: 'Advanced' },
      { name: 'AutoCAD', area: 'Engineering Drawing', level: 'Proficient' },
      { name: 'COMSOL Multiphysics', area: 'Multiphysics Simulation', level: 'Basic' },
    ],
  },
  {
    title: 'Programming & Data Analysis',
    skills: [
      { name: 'Python', area: 'Programming & Data Analysis', level: 'Proficient' },
      { name: 'Microsoft Excel', area: 'Data Analysis & Modelling', level: 'Advanced' },
      { name: 'MATLAB', area: 'Numerical Computing', level: 'Basic' },
    ],
  },
  {
    title: 'Productivity & Presentation',
    skills: [
      { name: 'Microsoft PowerPoint', area: 'Communication & Presentation', level: 'Advanced' },
      { name: 'Microsoft Word', area: 'Documentation & Report Writing', level: 'Proficient' },
    ],
  },
  {
    title: 'Organisation & Management',
    skills: [{ name: 'Event Management', area: 'Planning & Coordination', level: 'Hands-on' }],
  },
]
