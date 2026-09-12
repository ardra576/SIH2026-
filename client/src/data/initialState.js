/**
 * SkillBridge AI - Default SIH Demo Profile and Initial State
 */

export const INITIAL_PROFILE = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@sih.edu.in',
  role: 'Full-Stack & AI Engineering Aspirant',
  experience: '2+ Years (Academic & Capstone)',
  qualification: 'B.Tech in Computer Science & Engineering',
  specialization: 'Artificial Intelligence & Cloud Architecture',
  technicalSkills: ['Python', 'JavaScript', 'React', 'SQL', 'FastAPI', 'Docker'],
  softSkills: ['Problem Solving', 'Technical Communication', 'Agile Teamwork', 'Leadership'],
  certifications: ['Cloud Solutions Associate', 'Python for Data Science Honours'],
  trainingHistory: ['Full-Stack Web Specialization', 'Applied Machine Learning Bootcamp'],
  currentJourneyStage: 'ANALYZE' // PROFILE -> ASSESS -> ANALYZE -> PERSONALIZE -> REASSESS
};

export const INITIAL_COMPETENCIES = [
  { id: 'python', name: 'Python', score: 82, beforeScore: 55, category: 'Technical Skills' },
  { id: 'problem-solving', name: 'Problem Solving', score: 74, beforeScore: 60, category: 'Technical Skills' },
  { id: 'communication', name: 'Communication', score: 68, beforeScore: 50, category: 'Soft Skills' },
  { id: 'leadership', name: 'Leadership', score: 61, beforeScore: 45, category: 'Soft Skills' },
  { id: 'data-analysis', name: 'Data Analysis', score: 48, beforeScore: 35, category: 'Domain Knowledge' }
];

export const INITIAL_STATS = {
  overallCompetency: 67,
  skillsAssessed: 5,
  learningHours: 28.5,
  quizzesCompleted: 12
};

export const INITIAL_MATERIALS = [
  {
    id: 'mat-demo-1',
    name: 'Distributed Systems & Microservices Core.pdf',
    type: 'PDF Document',
    size: '2.4 MB',
    uploadDate: '2026-03-01',
    topics: [
      'CAP Theorem & Eventual Consistency',
      'Circuit Breaker Pattern',
      'gRPC vs REST Protocols',
      'Distributed Tracing with OpenTelemetry'
    ],
    snippet: 'Distributed computing architectures rely on decoupled microservices communicating across network boundaries with high fault tolerance...'
  },
  {
    id: 'mat-demo-2',
    name: 'Executive Technical Communication Slides.pptx',
    type: 'PPTX Presentation',
    size: '4.1 MB',
    uploadDate: '2026-03-05',
    topics: [
      'BLUF Communication Structure',
      'Translating Tech Debt into Business Risk',
      'Active Listening & Consensus Building'
    ],
    snippet: 'Effective engineering leaders present high-impact architecture proposals using bottom-line-up-front communication...'
  }
];

export const INITIAL_QUIZ_HISTORY = [
  {
    id: 'q-hist-1',
    title: 'Python Core & Memory Optimization',
    topic: 'Python',
    score: 5,
    total: 5,
    percentage: 100,
    date: '2026-03-08'
  },
  {
    id: 'q-hist-2',
    title: 'Data Analysis & SQL Fundamentals',
    topic: 'Data Analysis',
    score: 3,
    total: 5,
    percentage: 60,
    date: '2026-03-10'
  },
  {
    id: 'q-hist-3',
    title: 'Executive Technical Communication',
    topic: 'Communication',
    score: 4,
    total: 4,
    percentage: 100,
    date: '2026-03-11'
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 'ach-1',
    title: 'First Assessment',
    description: 'Completed your diagnostic baseline evaluation',
    icon: 'Award',
    unlocked: true,
    unlockedAt: '2026-02-15'
  },
  {
    id: 'ach-2',
    title: 'Quiz Master',
    description: 'Scored 100% on 3 consecutive topic quizzes',
    icon: 'Zap',
    unlocked: true,
    unlockedAt: '2026-03-08'
  },
  {
    id: 'ach-3',
    title: 'Fast Learner',
    description: 'Logged over 25 hours of active competency study',
    icon: 'TrendingUp',
    unlocked: true,
    unlockedAt: '2026-03-10'
  },
  {
    id: 'ach-4',
    title: 'Skill Improver',
    description: 'Elevated Python competency by +27% delta',
    icon: 'Target',
    unlocked: true,
    unlockedAt: '2026-03-11'
  }
];
