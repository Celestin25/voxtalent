// ─── In-memory seed data (no database needed for demo) ───────────────────────
// In production, replace with Prisma/database calls

export type ChallengeStatus = 'OPEN' | 'VOTING' | 'CLOSED'
export type UserRole = 'COMPANY_ADMIN' | 'EMPLOYEE' | 'CANDIDATE'
export type ChallengeType = 'CODING' | 'DESIGN' | 'CASE_STUDY' | 'STRATEGY' | 'MARKETING'

export interface Company {
  id: string
  name: string
  logo: string
  industry: string
  size: string
  location: string
  verified: boolean
}

export interface Challenge {
  id: string
  title: string
  company: Company
  type: ChallengeType
  description: string
  shortDesc: string
  deadline: string
  prize: string
  applicants: number
  maxSubmissions: number
  difficulty: 'ENTRY' | 'MID' | 'SENIOR'
  skills: string[]
  status: ChallengeStatus
  votersCount: number
  createdAt: string
  rubric: RubricItem[]
}

export interface RubricItem {
  id: string
  label: string
  description: string
  maxScore: number
}

export interface Submission {
  id: string
  challengeId: string
  candidateName: string
  candidateTitle: string
  candidateAvatar: string
  summary: string
  content: string
  submittedAt: string
  averageScore: number
  totalVotes: number
  rank: number
}

export interface Vote {
  id: string
  submissionId: string
  employeeId: string
  scores: { rubricId: string; score: number }[]
  feedback: string
  isAnonymous: boolean
  createdAt: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

// ─── Companies ────────────────────────────────────────────────────────────────
export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Lumina Technologies',
    logo: 'LT',
    industry: 'Software & AI',
    size: '500-1000',
    location: 'San Francisco, CA',
    verified: true,
  },
  {
    id: 'c2',
    name: 'FinBridge Capital',
    logo: 'FC',
    industry: 'Fintech',
    size: '100-500',
    location: 'New York, NY',
    verified: true,
  },
  {
    id: 'c3',
    name: 'GreenLeaf Labs',
    logo: 'GL',
    industry: 'Sustainability',
    size: '50-100',
    location: 'Berlin, Germany',
    verified: false,
  },
  {
    id: 'c4',
    name: 'Nexora Health',
    logo: 'NH',
    industry: 'Healthcare',
    size: '200-500',
    location: 'London, UK',
    verified: true,
  },
  {
    id: 'c5',
    name: 'Orbita Media',
    logo: 'OM',
    industry: 'Media & Marketing',
    size: '100-200',
    location: 'Paris, France',
    verified: true,
  },
]

// ─── Challenges ───────────────────────────────────────────────────────────────
export const challenges: Challenge[] = [
  {
    id: 'ch1',
    title: 'Redesign our AI dashboard for non-technical users',
    company: companies[0],
    type: 'DESIGN',
    shortDesc: 'Create a new UX concept that makes our ML metrics understandable to business stakeholders.',
    description: `We have a powerful AI analytics platform, but our business stakeholders struggle to understand the insights. Your challenge is to redesign the main dashboard to make ML metrics, model confidence scores, and trend data understandable to non-technical users.\n\nDeliver a PDF/Figma prototype with:\n- Redesigned dashboard layout\n- Explanation of your UX decisions\n- How you would test your assumptions with users`,
    deadline: '2026-04-15',
    prize: 'Up to $2,000 + fast-track interview',
    applicants: 147,
    maxSubmissions: 200,
    difficulty: 'MID',
    skills: ['UX Design', 'Data Visualization', 'User Research', 'Figma'],
    status: 'OPEN',
    votersCount: 12,
    createdAt: '2026-03-01',
    rubric: [
      { id: 'r1', label: 'Clarity', description: 'How clear and intuitive is the design?', maxScore: 5 },
      { id: 'r2', label: 'Innovation', description: 'Does it bring fresh ideas or approaches?', maxScore: 5 },
      { id: 'r3', label: 'Feasibility', description: 'Can this realistically be built?', maxScore: 5 },
      { id: 'r4', label: 'Communication', description: 'Is the rationale well articulated?', maxScore: 5 },
    ],
  },
  {
    id: 'ch2',
    title: 'Build a real-time fraud detection microservice',
    company: companies[1],
    type: 'CODING',
    shortDesc: 'Design and implement a lightweight fraud detection API that processes 10k+ transactions/sec.',
    description: `FinBridge processes millions of transactions daily. We need a fraud detection microservice that can flag suspicious activity in real time without adding more than 10ms latency.\n\nYour submission should include:\n- Working code (Python or Go preferred)\n- Architecture diagram\n- Performance benchmarks\n- False positive/negative analysis`,
    deadline: '2026-04-20',
    prize: 'Up to $3,500 + senior engineer offer',
    applicants: 89,
    maxSubmissions: 150,
    difficulty: 'SENIOR',
    skills: ['Python', 'Go', 'Machine Learning', 'Microservices', 'Redis'],
    status: 'OPEN',
    votersCount: 8,
    createdAt: '2026-03-05',
    rubric: [
      { id: 'r1', label: 'Technical Depth', description: 'Quality and correctness of the solution', maxScore: 5 },
      { id: 'r2', label: 'Performance', description: 'Latency and throughput benchmarks', maxScore: 5 },
      { id: 'r3', label: 'Code Quality', description: 'Readability, tests, documentation', maxScore: 5 },
      { id: 'r4', label: 'Scalability', description: 'How well does it scale under load?', maxScore: 5 },
    ],
  },
  {
    id: 'ch3',
    title: 'Growth strategy for entering the MENA market',
    company: companies[4],
    type: 'STRATEGY',
    shortDesc: 'Develop a go-to-market plan to grow our media platform from 0 to 100k users in MENA.',
    description: `Orbita Media is a digital content platform expanding to MENA. We need a realistic, data-driven growth strategy for the first 12 months.\n\nYour submission should include:\n- Market sizing and analysis\n- Target customer segments\n- Channel strategy (paid, organic, partnerships)\n- 90-day and 12-month milestones\n- Budget allocation (assuming €500k)`,
    deadline: '2026-04-10',
    prize: '$1,500 + Head of Growth interview',
    applicants: 203,
    maxSubmissions: 300,
    difficulty: 'SENIOR',
    skills: ['Growth Strategy', 'Market Research', 'Digital Marketing', 'Localization'],
    status: 'VOTING',
    votersCount: 15,
    createdAt: '2026-02-20',
    rubric: [
      { id: 'r1', label: 'Insight', description: 'Quality of market research and analysis', maxScore: 5 },
      { id: 'r2', label: 'Realism', description: 'Are the projections and budget realistic?', maxScore: 5 },
      { id: 'r3', label: 'Creativity', description: 'Are there innovative growth levers?', maxScore: 5 },
      { id: 'r4', label: 'Clarity', description: 'How well is the strategy communicated?', maxScore: 5 },
    ],
  },
  {
    id: 'ch4',
    title: 'Carbon footprint reporting feature for our SaaS',
    company: companies[2],
    type: 'CODING',
    shortDesc: 'Add a sustainability module to our B2B SaaS that calculates and visualizes carbon impact.',
    description: `GreenLeaf Labs helps companies track sustainability KPIs. We want to add a carbon footprint reporting feature that integrates with our existing REST API.\n\nBuild a working module that:\n- Accepts company activity data (energy, travel, supply chain)\n- Calculates CO2e using GHG Protocol methodology\n- Returns structured reports + chart data\n- Includes a simple front-end preview`,
    deadline: '2026-05-01',
    prize: '$2,200 + full-time offer potential',
    applicants: 56,
    maxSubmissions: 100,
    difficulty: 'MID',
    skills: ['TypeScript', 'Node.js', 'REST API', 'Data Visualization'],
    status: 'OPEN',
    votersCount: 6,
    createdAt: '2026-03-10',
    rubric: [
      { id: 'r1', label: 'Accuracy', description: 'Correctness of carbon calculations', maxScore: 5 },
      { id: 'r2', label: 'Code Quality', description: 'Clean, tested, documented code', maxScore: 5 },
      { id: 'r3', label: 'UX', description: 'Quality of the report output / UI', maxScore: 5 },
      { id: 'r4', label: 'Innovation', description: 'Any above-and-beyond features', maxScore: 5 },
    ],
  },
  {
    id: 'ch5',
    title: 'Patient onboarding flow for telehealth app',
    company: companies[3],
    type: 'DESIGN',
    shortDesc: 'Design a frictionless onboarding experience for elderly patients on our telehealth platform.',
    description: `Nexora Health serves patients across all age groups, but our biggest challenge is onboarding elderly users (65+). Our current flow has a 62% drop-off rate.\n\nDesign a new onboarding flow that:\n- Reduces steps and cognitive load\n- Meets WCAG AA accessibility standards\n- Supports both smartphone and tablet\n- Includes a simple appointment booking flow`,
    deadline: '2026-04-25',
    prize: '$2,800 + UX Lead interview',
    applicants: 112,
    maxSubmissions: 150,
    difficulty: 'MID',
    skills: ['UX Design', 'Accessibility', 'Healthcare', 'Prototyping'],
    status: 'OPEN',
    votersCount: 10,
    createdAt: '2026-03-08',
    rubric: [
      { id: 'r1', label: 'Accessibility', description: 'WCAG compliance and inclusive design', maxScore: 5 },
      { id: 'r2', label: 'Simplicity', description: 'Reduction in steps and friction', maxScore: 5 },
      { id: 'r3', label: 'Visual Design', description: 'Quality of the visual presentation', maxScore: 5 },
      { id: 'r4', label: 'Rationale', description: 'How well are design decisions explained?', maxScore: 5 },
    ],
  },
  {
    id: 'ch6',
    title: 'Email marketing campaign for product launch',
    company: companies[4],
    type: 'MARKETING',
    shortDesc: 'Write a 5-email drip campaign for our new premium creator subscription launch.',
    description: `Orbita Media is launching a premium creator tier next quarter. We need a compelling 5-email drip campaign to convert existing free users.\n\nDeliver:\n- 5 full email copy drafts (subject line + body)\n- Strategy rationale for the sequence\n- A/B test suggestions\n- Expected open rate and conversion estimates`,
    deadline: '2026-04-05',
    prize: '$800 + content team interview',
    applicants: 178,
    maxSubmissions: 250,
    difficulty: 'ENTRY',
    skills: ['Copywriting', 'Email Marketing', 'CRO', 'Brand Voice'],
    status: 'CLOSED',
    votersCount: 18,
    createdAt: '2026-02-15',
    rubric: [
      { id: 'r1', label: 'Copy Quality', description: 'Engaging, on-brand writing', maxScore: 5 },
      { id: 'r2', label: 'Strategy', description: 'Logic of the drip sequence', maxScore: 5 },
      { id: 'r3', label: 'Creativity', description: 'Memorable hooks and CTAs', maxScore: 5 },
      { id: 'r4', label: 'Data-Mindedness', description: 'Realistic estimates and test ideas', maxScore: 5 },
    ],
  },
]

// ─── Sample submissions for challenge ch3 (voting phase) ─────────────────────
export const submissions: Submission[] = [
  {
    id: 's1', challengeId: 'ch3',
    candidateName: 'Amina El-Rashidi', candidateTitle: 'Growth Strategist • 6 yrs exp',
    candidateAvatar: 'AE',
    summary: 'A hyper-local approach combining influencer partnerships with B2B media deals to drive adoption across key MENA markets.',
    content: 'Full 40-page strategy doc covering GCC first, then Levant and North Africa...',
    submittedAt: '2026-03-12', averageScore: 4.6, totalVotes: 9, rank: 1,
  },
  {
    id: 's2', challengeId: 'ch3',
    candidateName: 'Karim Benali', candidateTitle: 'Digital Marketing Lead • 4 yrs exp',
    candidateAvatar: 'KB',
    summary: 'Performance-first growth loop anchored in Arabic SEO and YouTube creators with a SaaS referral engine.',
    content: 'The strategy leverages under-utilized Arabic YouTube ecosystem...',
    submittedAt: '2026-03-14', averageScore: 4.2, totalVotes: 8, rank: 2,
  },
  {
    id: 's3', challengeId: 'ch3',
    candidateName: 'Sara Okonkwo', candidateTitle: 'Strategy Consultant • 8 yrs exp',
    candidateAvatar: 'SO',
    summary: 'Enterprise-first approach through B2B distribution deals with telcos and OTT platforms across MENA.',
    content: 'Partnership with regional telecom giants provides instant distribution...',
    submittedAt: '2026-03-15', averageScore: 3.9, totalVotes: 7, rank: 3,
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "VoxTalent completely changed how we hire. Our team is now part of the decision and the hires feel like team choices, not top-down mandates.",
    author: 'Leila Moradi', role: 'Head of Talent', company: 'Lumina Technologies', avatar: 'LM',
  },
  {
    id: 't2',
    quote: "We found our best engineer through a VoxTalent challenge. The submission actually solved a real problem we had. That's worth more than any interview.",
    author: 'James Kwon', role: 'VP Engineering', company: 'FinBridge Capital', avatar: 'JK',
  },
  {
    id: 't3',
    quote: "As a candidate, I loved being evaluated on actual work instead of whiteboard puzzles. It felt fair and exciting.",
    author: 'Priya Sharma', role: 'UX Designer (hired!)', company: 'Nexora Health', avatar: 'PS',
  },
]

// ─── Stats ────────────────────────────────────────────────────────────────────
export const platformStats = {
  challenges: '2,400+',
  votes: '48,000+',
  companies: '380+',
  avgTimeToHire: '12 days',
  candidateSatisfaction: '94%',
  biasReduction: '61%',
}
