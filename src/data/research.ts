// Research interests — areas I am exploring, NOT claims of expertise.

export type PrimaryInterest = { id: string; title: string; summary: string; topics: string[] }

export const primaryInterests: PrimaryInterest[] = [
  {
    id: 'ai-industry',
    title: 'AI in Industry & Industry 5.0',
    summary: 'How intelligent systems and people can work together on the factory floor.',
    topics: [
      'Artificial intelligence in manufacturing',
      'Human–AI collaboration',
      'Human–robot collaboration',
      'Intelligent manufacturing systems',
      'Human-centred Industry 5.0',
    ],
  },
  {
    id: 'lean',
    title: 'Lean Manufacturing',
    summary: 'Removing waste and building systems that improve continuously.',
    topics: ['Waste reduction', 'Process improvement', 'Production efficiency', 'Lean systems and continuous improvement'],
  },
  {
    id: 'additive',
    title: 'Additive Manufacturing',
    summary: 'Where data-driven methods meet layer-by-layer production.',
    topics: [
      'Additive manufacturing processes',
      'Machine learning in additive manufacturing',
      'Process optimisation and defect prediction',
    ],
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Management',
    summary: 'Understanding risk, defects and resilience through data.',
    topics: [
      'Supply chain defect analysis',
      'Supply chain resilience',
      'Supply chain risk analysis',
      'Data-driven supply chain decision-making',
    ],
  },
  {
    id: 'quality',
    title: 'Quality Engineering',
    summary: 'Detecting and preventing defects with statistics and intelligence.',
    topics: [
      'Quality control',
      'Statistical process control',
      'Defect detection and prediction',
      'Intelligent quality management',
    ],
  },
]

export type RelatedGroup = { title: string; topics: string[] }

export const relatedAreas: RelatedGroup[] = [
  {
    title: 'Operations & Optimisation',
    topics: ['Operations research', 'Inventory optimisation', 'Logistics optimisation', 'Production planning', 'Production scheduling'],
  },
  { title: 'Smart Manufacturing', topics: ['Industrial IoT (IIoT)', 'Smart factories', 'Industrial digitalisation'] },
  { title: 'Human Factors', topics: ['Ergonomics', 'Human factors engineering', 'Human–technology interaction'] },
  { title: 'Decision Science', topics: ['MCDM', 'AHP', 'TOPSIS', 'ISM'] },
  { title: 'Reliability Engineering', topics: ['Reliability engineering', 'Maintenance engineering', 'System performance and failure analysis'] },
]

export const appliedContexts = ['Predictive maintenance', 'Demand forecasting', 'Intelligent quality control', 'SME analytics']

export const currentResearch = {
  status: 'Currently Working On',
  title: 'Human–AI Collaboration in Industry 5.0 Manufacturing',
  // Replace / extend these as you share more detail. Don't claim results until they exist.
  description:
    'An exploration of how human judgement and artificial intelligence can complement each other in smart manufacturing, with a focus on collaborative, human-centred industrial systems in the Industry 5.0 paradigm.',
  pillars: ['Human intelligence', 'Artificial intelligence', 'Smart manufacturing', 'Collaborative systems', 'Industry 5.0'],
  // Optional extra details. Leave an empty string to hide a row.
  details: {
    objective: '',
    role: '',
    methodology: '',
    progress: '',
  },
}
