/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about the portfolio here.
 * ─────────────────────────────────────────────────────────────
 *  • The website and the CV (/cv → public/Ilham-Rohan-CV.pdf)
 *    both read from this file.
 *  • Anything marked `placeholder: true` or containing
 *    "[PLACEHOLDER …]" is waiting for your real information.
 *    Placeholders are shown on the website as clearly marked
 *    "reserved" slots and are left OUT of the CV.
 *  • After editing, run `npm run assets` to regenerate the CV PDF.
 */

export type Proficiency = "Familiar" | "Proficient" | "Advanced";

export type Entry = {
  /** Short title, e.g. "Gearbox assembly in SolidWorks" */
  title: string;
  /** Where / with whom, e.g. "Course project · SUST" */
  context?: string;
  /** Date or range, e.g. "2026" or "Jan – Apr 2026" */
  date?: string;
  /** One or two sentences: the problem, what you did, the result. */
  summary: string;
  tags?: string[];
  link?: { label: string; href: string };
  /** true = not real yet; renders as a reserved slot, hidden from CV */
  placeholder?: boolean;
};

export const site = {
  name: "Ilham Rohan",
  firstName: "Ilham",
  lastName: "Rohan",
  title: "IPE Student",
  tagline: { before: "Where", engineering: "engineering", middle: "meets", intelligence: "intelligence" },
  location: "Sylhet, Bangladesh",
  email: "ilhamrohan7@gmail.com",
  /** Shown on the CV only — never on the website. */
  phone: "+880 [ADD PHONE]",
  profiles: [
    { label: "GitHub", handle: "IlhamRohan7", href: "https://github.com/IlhamRohan7" },
    { label: "LinkedIn", handle: "ilham-rohan", href: "https://www.linkedin.com/in/ilham-rohan-b14746267/" },
  ],

  seo: {
    title: "Ilham Rohan — IPE Student, SUST",
    description:
      "Ilham Rohan is an Industrial & Production Engineering student at Shahjalal University of Science and Technology (SUST), working where engineering design meets machine learning and data-driven decision-making.",
  },

  /**
   * The story, revealed word by word on scroll.
   * Wrap words in *asterisks* to set them in the italic serif ("intelligence" voice),
   * and in _underscores_ to set them in the grotesk ("engineering" voice).
   */
  story:
    "I study how things are _made_ — and I’m learning how to make them *think*. " +
    "As an Industrial & Production Engineering student at SUST, I work between two disciplines: " +
    "the _precision_ of engineering design and the *reasoning* of machine learning. " +
    "I’m drawn to the questions where they meet — how data can help a factory decide, " +
    "how a model can make a system more efficient, how a design improves with evidence behind it. " +
    "I read problems the way I read a chess position or a pressing system: as *systems* to understand, then _improve_.",

  /** Short profile for the CV. */
  cvSummary:
    "Industrial & Production Engineering undergraduate at SUST with a strong interest in applying machine learning and data analysis to industrial decision-making. Hands-on with SolidWorks and AutoCAD for design, and Python for analysis. Analytical, systems-minded, and always learning.",

  education: [
    {
      degree: "B.Sc. in Industrial & Production Engineering",
      institution: "Shahjalal University of Science and Technology (SUST)",
      location: "Sylhet, Bangladesh",
      expected: "2028",
      status: "In progress",
      /** Optional — leave empty to hide. e.g. "3.75 / 4.00" */
      cgpa: "",
    },
  ],

  research: [
    {
      code: "Q.01",
      area: "Machine Learning & AI",
      question: ["How do machines", "*learn* from data —", "and how far can it go?"],
      detail: "Algorithms that learn from data, and the ideas that push them further.",
    },
    {
      code: "Q.02",
      area: "Data-Driven Decisions",
      question: ["How does raw data", "become a", "*better decision?*"],
      detail: "Turning raw data into evidence, and evidence into better choices.",
    },
    {
      code: "Q.03",
      area: "ML in Industrial Decision-Making",
      question: ["Can a model help", "a factory *plan,*", "*produce and adapt?*"],
      detail: "Applying machine learning to optimise production, planning and operations.",
    },
    {
      code: "Q.04",
      area: "SolidWorks & CAD",
      question: ["Where does an idea", "take its *physical*", "*shape?*"],
      detail: "Design, modelling and simulation — where ideas take physical shape.",
    },
  ],

  skills: [
    { part: "SOLIDWORKS", category: "Engineering design", level: "Advanced" as Proficiency },
    { part: "AutoCAD", category: "Engineering drawing", level: "Proficient" as Proficiency },
    { part: "Python", category: "Programming & analysis", level: "Proficient" as Proficiency },
    { part: "Microsoft Excel", category: "Data & modelling", level: "Advanced" as Proficiency },
    { part: "Microsoft PowerPoint", category: "Communication", level: "Advanced" as Proficiency },
  ],

  /** Replace placeholders with real entries (set placeholder: false or remove it). */
  projects: [
    {
      title: "[PLACEHOLDER — Project 01]",
      context: "e.g. Course project · SUST",
      summary: "Reserved for your first project: the problem, your approach, and the result.",
      tags: ["SolidWorks", "Python"],
      placeholder: true,
    },
    {
      title: "[PLACEHOLDER — Project 02]",
      context: "e.g. Personal project",
      summary: "Reserved for a data or machine-learning project — a notebook, analysis, or model.",
      tags: ["Data", "ML"],
      placeholder: true,
    },
  ] as Entry[],

  researchWork: [
    {
      title: "[PLACEHOLDER — Research]",
      context: "e.g. Undergraduate thesis · Supervisor name",
      summary: "Reserved for thesis, a paper, a poster, or work with a professor.",
      placeholder: true,
    },
  ] as Entry[],

  experience: [
    {
      title: "[PLACEHOLDER — Experience]",
      context: "e.g. Industrial attachment · Company",
      summary: "Reserved for internships, industrial training, clubs or leadership roles.",
      placeholder: true,
    },
  ] as Entry[],

  achievements: [
    {
      title: "[PLACEHOLDER — Achievement / Certification]",
      context: "e.g. Coursera · Kaggle · Competition",
      summary: "Reserved for awards, competitions, scholarships and certifications.",
      placeholder: true,
    },
  ] as Entry[],

  interests: [
    {
      id: "tech",
      title: "Technology",
      detail: "Emerging technologies, AI, innovative software, and the latest gadgets.",
    },
    {
      id: "football",
      title: "Football & Tactics",
      detail: "Not just watching — reading formations, pressing systems, player movement and game strategy.",
    },
    {
      id: "design",
      title: "Engineering Design",
      detail: "Designing mechanical parts and assemblies in SOLIDWORKS, improving my CAD craft with every build.",
    },
    {
      id: "chess",
      title: "Chess",
      detail: "Strategic thinking, logical reasoning and decision-making — one move at a time.",
    },
    {
      id: "film",
      title: "Film & Series",
      detail: "Great storytelling and cinematography, across every genre.",
    },
  ],

  /** The "Now" sheet — update every month or two. */
  now: {
    updated: "[PLACEHOLDER — Month Year]",
    items: [
      { label: "Learning", value: "[PLACEHOLDER — e.g. a course or topic]" },
      { label: "Reading", value: "[PLACEHOLDER — e.g. a book or paper]" },
      { label: "Building", value: "[PLACEHOLDER — e.g. a CAD model or script]" },
      { label: "Watching", value: "[PLACEHOLDER — e.g. a match or film]" },
    ],
  },

  cvFile: "/Ilham-Rohan-CV.pdf",
} as const;

export const isPlaceholder = (s: string) => s.includes("[PLACEHOLDER") || s.includes("[ADD ");

/** Sheet index — drives the title-block navigation. */
export const sheets = [
  { id: "top", title: "Title" },
  { id: "story", title: "Story" },
  { id: "education", title: "Education" },
  { id: "research", title: "Research" },
  { id: "skills", title: "Tools" },
  { id: "work", title: "Work" },
  { id: "beyond", title: "Beyond" },
  { id: "now", title: "Now" },
  { id: "contact", title: "Contact" },
] as const;

export type SheetId = (typeof sheets)[number]["id"];
