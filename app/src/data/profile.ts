// ─────────────────────────────────────────────────────────────
// Personal details & links. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Ilham Rohan',
  role: 'Industrial & Production Engineering Undergraduate',
  institution: 'Shahjalal University of Science and Technology',
  institutionShort: 'SUST',
  location: 'Sylhet, Bangladesh',
  tagline: 'Exploring the intersection of AI, manufacturing and intelligent industrial systems.',
  subtagline:
    'Interested in building smarter, more efficient and human-centred industrial systems through artificial intelligence, engineering and data-driven decision-making.',
  email: 'ilhamrohan7@gmail.com',
  // Add your number here (e.g. '+880 1XXX-XXXXXX'). It stays hidden while empty.
  phone: '+880 1534-750572',
  cvFile: 'Ilham-Rohan-CV.pdf', // file lives in /public
}

export const aboutParagraphs = [
  'I am an Industrial and Production Engineering undergraduate interested in applying artificial intelligence, machine learning and data analytics to improve industrial systems and decision-making.',
  'My interests sit at the intersection of manufacturing, intelligent systems, operations research and human-centred industrial technologies. I am particularly curious about how emerging technologies can make manufacturing systems more efficient, adaptive, resilient and sustainable.',
  'My goal is to build research capability, contribute to meaningful academic work and collaborate with researchers working in related fields.',
]

export const languages = [
  { name: 'English', level: 'Proficient' },
  { name: 'Bangla', level: 'Native' },
]

export type LinkItem = { label: string; handle: string; href: string; note: string }

export const links: LinkItem[] = [
  { label: 'LinkedIn', handle: 'ilham-rohan', href: 'https://www.linkedin.com/in/ilham-rohan-b14746267', note: 'Professional profile' },
  { label: 'GitHub', handle: 'IlhamRohan7', href: 'https://github.com/IlhamRohan7', note: 'Code and projects' },
  { label: 'Google Scholar', handle: 'Citations', href: 'https://scholar.google.com/citations?user=5KuOBsEAAAAJ&hl=en', note: 'Academic profile' },
  { label: 'ResearchGate', handle: 'Ilham Rohan', href: 'https://www.researchgate.net/profile/Ilham-Rohan', note: 'Research network' },
  { label: 'ORCID', handle: '0009-0001-0752-657X', href: 'https://orcid.org/0009-0001-0752-657X', note: 'Researcher identifier' },
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'current', label: 'Current Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
]
