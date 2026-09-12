/**
 * SkillBridge AI - Demo & Fallback Datasets for SIH 2026
 * Provides realistic, curated assessments, quizzes, and skill-gap recommendations.
 */

export const DEMO_COMPETENCIES = [
  { id: 'python', name: 'Python', score: 82, category: 'Technical Skills', beforeScore: 55 },
  { id: 'problem-solving', name: 'Problem Solving', score: 74, category: 'Technical Skills', beforeScore: 60 },
  { id: 'communication', name: 'Communication', score: 68, category: 'Soft Skills', beforeScore: 50 },
  { id: 'leadership', name: 'Leadership', score: 61, category: 'Soft Skills', beforeScore: 45 },
  { id: 'data-analysis', name: 'Data Analysis', score: 48, category: 'Domain Knowledge', beforeScore: 35 }
];

export const DEMO_QUIZZES = {
  python: {
    title: 'Python Core & Memory Optimization',
    topic: 'Python Programming',
    questions: [
      {
        id: 1,
        question: 'Which built-in Python data structure uses a hash table implementation to achieve average O(1) key lookups?',
        options: ['list', 'dict', 'tuple', 'collections.deque'],
        correctAnswer: 1,
        explanation: 'Python dictionaries (dict) are implemented as hash tables, ensuring average-case O(1) time complexity for key insertion and retrieval.'
      },
      {
        id: 2,
        question: 'What is the primary operational difference between Python generators and traditional list comprehensions?',
        options: [
          'Generators require lambda functions',
          'Generators produce values lazily using memory-efficient iteration',
          'List comprehensions can only process numeric elements',
          'Generators cannot be iterated with for-loops'
        ],
        correctAnswer: 1,
        explanation: 'Generators compute values on-demand using the yield keyword and lazy evaluation, using O(1) memory compared to allocating full lists.'
      },
      {
        id: 3,
        question: 'In Python concurrency, what mechanism prevents multiple native threads from executing Python bytecodes at the same time?',
        options: ['Global Interpreter Lock (GIL)', 'AsyncIO Event Dispatcher', 'Virtual Thread Allocator', 'Process Boundary Sandbox'],
        correctAnswer: 0,
        explanation: 'The CPython Global Interpreter Lock (GIL) is a mutex that safeguards Python objects, preventing multiple native threads from executing bytecodes concurrently in a single process.'
      },
      {
        id: 4,
        question: 'What does the *args parameter represent in a Python function definition?',
        options: [
          'A keyword argument dictionary',
          'A variable-length tuple of positional arguments',
          'A pointer to variable memory addresses',
          'A mandatory type hint parameter'
        ],
        correctAnswer: 1,
        explanation: '*args captures extra positional arguments passed to the function into an immutable tuple.'
      },
      {
        id: 5,
        question: 'Which built-in module is best suited for deep and shallow object replication in Python?',
        options: ['sys', 'pickle', 'copy', 'inspect'],
        correctAnswer: 2,
        explanation: 'The standard copy module provides copy.copy() for shallow copying and copy.deepcopy() for recursive deep copying of objects.'
      }
    ]
  },
  'data-analysis': {
    title: 'Data Analysis & SQL Foundations',
    topic: 'Data Analysis',
    questions: [
      {
        id: 1,
        question: 'Which SQL clause is used to filter aggregated groups created by a GROUP BY statement?',
        options: ['WHERE', 'HAVING', 'FILTER BY', 'ORDER BY'],
        correctAnswer: 1,
        explanation: 'HAVING filters aggregated grouped results, whereas WHERE filters individual rows prior to grouping.'
      },
      {
        id: 2,
        question: 'In Pandas, what is the primary distinction between df.loc and df.iloc?',
        options: [
          'loc is label-based indexing while iloc is integer position-based indexing',
          'loc only accesses columns while iloc only accesses rows',
          'iloc creates deep copies whereas loc creates views only',
          'There is no operational difference'
        ],
        correctAnswer: 0,
        explanation: 'df.loc indexes by row/column labels or boolean conditions, while df.iloc strictly uses 0-based integer positions.'
      },
      {
        id: 3,
        question: 'Which measure of central tendency is least sensitive to extreme statistical outliers?',
        options: ['Arithmetic Mean', 'Median', 'Standard Deviation', 'Variance'],
        correctAnswer: 1,
        explanation: 'The median represents the 50th percentile rank of the data distribution, remaining resilient against extreme value skew.'
      },
      {
        id: 4,
        question: 'What is the main purpose of imputing missing values in a data preparation pipeline?',
        options: [
          'To prevent model training failures and reduce data bias without discarding records',
          'To artificially double the dataset sample volume',
          'To compress the dataset into binary format',
          'To calculate Pearson correlation directly'
        ],
        correctAnswer: 0,
        explanation: 'Imputation substitutes missing entries using mean, median, or predictive algorithms, allowing complete analysis without discarding rows.'
      },
      {
        id: 5,
        question: 'Which chart type is most suitable for visualizing the distribution and skewness of a single continuous numeric variable?',
        options: ['Scatter Plot', 'Pie Chart', 'Histogram / Box Plot', 'Stacked Bar Chart'],
        correctAnswer: 2,
        explanation: 'Histograms and box plots illustrate the distribution shape, spread, median, quartiles, and potential outliers of continuous variables.'
      }
    ]
  },
  communication: {
    title: 'Executive & Technical Communication',
    topic: 'Communication',
    questions: [
      {
        id: 1,
        question: 'What is the primary objective of active listening in professional cross-functional collaborations?',
        options: [
          'Formulating a rebuttal while the speaker is talking',
          'Fully understanding the speaker message, confirming comprehension, and validating perspectives',
          'Interrupting immediately to correct technical inaccuracies',
          'Documenting verbatim transcriptions without engagement'
        ],
        correctAnswer: 1,
        explanation: 'Active listening involves concentrating, understanding, reflecting, and responding thoughtfully to foster mutual alignment and team trust.'
      },
      {
        id: 2,
        question: 'When communicating complex technical architecture to non-technical executive stakeholders, which technique is most effective?',
        options: [
          'Using detailed raw log traces and kernel parameter jargon',
          'Translating technical concepts into business impacts, risk mitigations, and visual analogies',
          'Omitting all architecture details entirely and providing only financials',
          'Speaking at double speed to cover all slide content'
        ],
        correctAnswer: 1,
        explanation: 'Relating technical realities to business outcomes, ROI, and risk reduction bridges communication gaps effectively with executives.'
      },
      {
        id: 3,
        question: 'What does the "BLUF" communication framework stand for?',
        options: [
          'Bottom Line Up Front',
          'Business Logic Under Framework',
          'Better Learning Using Feedback',
          'Brief Language Upon Finalization'
        ],
        correctAnswer: 0,
        explanation: 'Bottom Line Up Front (BLUF) states the primary conclusion and call-to-action at the very beginning of messages.'
      },
      {
        id: 4,
        question: 'In constructive feedback delivery, what makes the SBI (Situation-Behavior-Impact) model effective?',
        options: [
          'It replaces direct conversations with anonymous surveys',
          'It grounds feedback in specific observable behaviors rather than subjective personal character judgments',
          'It guarantees an immediate salary revision',
          'It is exclusively used during annual terminations'
        ],
        correctAnswer: 1,
        explanation: 'SBI pinpoints the exact context, observable behavior, and the resultant impact, removing personal ambiguity.'
      }
    ]
  },
  'problem-solving': {
    title: 'Algorithmic Thinking & Problem Solving',
    topic: 'Problem Solving',
    questions: [
      {
        id: 1,
        question: 'When optimizing an algorithm from O(N^2) to O(N log N), what is typically the strategic trade-off?',
        options: [
          'Algorithm clarity is always ruined',
          'Often involves divide-and-conquer strategies or auxiliary memory trade-offs',
          'Decreases CPU efficiency in all scenarios',
          'Can only be implemented in C language'
        ],
        correctAnswer: 1,
        explanation: 'Divide-and-conquer methods like Merge Sort or balanced trees achieve O(N log N) time often with additional stack/auxiliary memory requirements.'
      },
      {
        id: 2,
        question: 'In system design, what does the CAP theorem state regarding distributed data stores?',
        options: [
          'A system can simultaneously guarantee Consistency, Availability, and Partition Tolerance',
          'A distributed system can guarantee at most two of: Consistency, Availability, and Partition Tolerance during network partitions',
          'Capacity, Access, and Performance are always mutually exclusive',
          'Cloud storage always eliminates network latency'
        ],
        correctAnswer: 1,
        explanation: 'The CAP theorem proves that in the presence of a network partition (P), a distributed system must choose between Consistency (C) and Availability (A).'
      },
      {
        id: 3,
        question: 'What is the primary benefit of applying the "5 Whys" root-cause analysis technique?',
        options: [
          'Finding individuals to assign blame',
          'Drilling down past superficial symptoms to uncover underlying systemic flaws',
          'Ensuring meetings last at least 5 hours',
          'Replacing automated testing suites'
        ],
        correctAnswer: 1,
        explanation: 'The 5 Whys iteratively probes cause-and-effect relationships behind a failure, arriving at the organizational or technical root cause.'
      }
    ]
  },
  leadership: {
    title: 'Engineering Leadership & Strategic Influence',
    topic: 'Leadership',
    questions: [
      {
        id: 1,
        question: 'Which leadership approach fosters psychological safety and team autonomy while focusing on unblocking team members?',
        options: ['Autocratic Command', 'Servant Leadership', 'Micromanagement', 'Transactional Quota-Based'],
        correctAnswer: 1,
        explanation: 'Servant leadership prioritizes coaching, eliminating organizational impediments, and empowering team members to innovate safely.'
      },
      {
        id: 2,
        question: 'What is the primary purpose of a blameless post-mortem after a production incident?',
        options: [
          'To identify the engineer responsible for the bug',
          'To examine systemic vulnerabilities and create resilient safeguards to prevent recurrence',
          'To cancel the next release sprint',
          'To satisfy legal compliance quotas'
        ],
        correctAnswer: 1,
        explanation: 'Blameless post-mortems view failures as systemic learning opportunities, addressing architecture and process vulnerabilities.'
      },
      {
        id: 3,
        question: 'What does situational leadership advise leaders to do when managing individuals at varying experience levels?',
        options: [
          'Apply the identical directive style to all team members regardless of tenure',
          'Adapt coaching, directing, supporting, and delegating styles according to the individual competence and commitment level',
          'Delegate all decisions strictly to the newest member',
          'Avoid checking project status entirely'
        ],
        correctAnswer: 1,
        explanation: 'Situational leadership requires adjusting managerial behavior between directing, coaching, supporting, and delegating based on situational maturity.'
      }
    ]
  }
};

export const DEMO_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'SQL Fundamentals & Advanced Querying',
    description: 'Master complex joins, window functions, indexing strategies, and database query optimization.',
    skill: 'Data Analysis',
    difficulty: 'Intermediate',
    estimatedTime: '4 hours',
    reason: 'Addresses your primary competency gap in Data Analysis (currently 48%).',
    topics: ['Window Functions', 'Query Execution Plans', 'Aggregation Pipelines']
  },
  {
    id: 'rec-2',
    title: 'Statistical Thinking & Exploratory Data Analysis',
    description: 'Learn distributions, hypothesis testing, feature correlation, and visualization with Python Pandas.',
    skill: 'Data Analysis',
    difficulty: 'Beginner to Intermediate',
    estimatedTime: '6 hours',
    reason: 'Strengthens empirical decision-making and quantitative reasoning.',
    topics: ['Normal Distribution', 'Correlation Analysis', 'Pandas & Seaborn']
  },
  {
    id: 'rec-3',
    title: 'Executive Communication & Stakeholder Persuasion',
    description: 'Frameworks for concise communication (BLUF, Minto Pyramid) and presenting technical vision to leaders.',
    skill: 'Communication',
    difficulty: 'Advanced',
    estimatedTime: '3 hours',
    reason: 'Enhances your moderate Communication score (68%) for career acceleration.',
    topics: ['BLUF Technique', 'Storytelling with Data', 'Active Listening']
  },
  {
    id: 'rec-4',
    title: 'Scalable Distributed Systems & Concurrency in Python',
    description: 'Deep dive into asynchronous programming (asyncio), multiprocessing, and memory profiling.',
    skill: 'Python',
    difficulty: 'Advanced',
    estimatedTime: '5 hours',
    reason: 'Builds upon your strongest asset (Python 82%) to reach industry mastery.',
    topics: ['AsyncIO Internals', 'Memory Profiling', 'CPython Optimization']
  },
  {
    id: 'rec-5',
    title: 'Strategic Problem Deconstruction & Root Cause Analysis',
    description: 'Practical drills in 5 Whys, Ishikawa diagrams, and first-principles technical decomposition.',
    skill: 'Problem Solving',
    difficulty: 'Intermediate',
    estimatedTime: '3.5 hours',
    reason: 'Refines your solid 74% Problem Solving score toward top-tier competency.',
    topics: ['Root Cause Analysis', 'First-Principles Thinking', 'Decision Trees']
  }
];

export const DEMO_MATERIAL_SAMPLE = {
  name: 'Machine Learning & Deep Neural Foundations.pdf',
  type: 'PDF',
  uploadDate: new Date().toISOString().split('T')[0],
  size: '1.8 MB',
  extractedTopics: [
    'Supervised vs Unsupervised Learning',
    'Gradient Descent & Backpropagation',
    'Overfitting & Regularization (L1/L2)',
    'Convolutional Neural Networks',
    'Model Evaluation Metrics (Precision, Recall, ROC-AUC)'
  ],
  textSnippet: 'Machine learning algorithms discover patterns within sample data to build predictive mathematical representations. Gradient descent minimizes loss functions iteratively by taking steps proportional to the negative gradient...'
};
