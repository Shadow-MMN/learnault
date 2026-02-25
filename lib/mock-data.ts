import { Module, User, Transaction, Credential, Employer, Candidate } from "../src/types";

// --- Mock Modules ---
export const mockModules: Module[] = [
  {
    id: "mod-001",
    title: "Introduction to Web3",
    description: "Learn the fundamentals of blockchain technology, decentralized applications, and smart contracts.",
    category: "Web3",
    difficulty: "Beginner",
    status: "Published",
    durationMinutes: 120,
  },
  {
    id: "mod-002",
    title: "Advanced React Patterns",
    description: "Master complex state management, custom hooks, and performance optimization techniques in React.",
    category: "Development",
    difficulty: "Advanced",
    status: "Published",
    durationMinutes: 180,
  },
  {
    id: "mod-003",
    title: "UI/UX Fundamentals",
    description: "Understand the principles of user interface and user experience design to create intuitive applications.",
    category: "Design",
    difficulty: "Beginner",
    status: "Published",
    durationMinutes: 90,
  },
  {
    id: "mod-004",
    title: "Machine Learning with Python",
    description: "Build predictive models using scikit-learn and understand the basics of AI.",
    category: "AI",
    difficulty: "Intermediate",
    status: "Draft",
    durationMinutes: 240,
  },
  {
    id: "mod-005",
    title: "Digital Marketing Strategies",
    description: "Learn how to effectively market digital products through SEO, content marketing, and paid advertising.",
    category: "Marketing",
    difficulty: "Intermediate",
    status: "Published",
    durationMinutes: 150,
  },
];

// --- Mock Users ---
export const mockUsers: User[] = [
  {
    id: "usr-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Student",
    progressState: "In Progress",
    learningStage: "Intermediate",
    totalPoints: 1250,
  },
  {
    id: "usr-002",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Student",
    progressState: "Not Started",
    learningStage: "Beginner",
    totalPoints: 0,
  },
  {
    id: "usr-003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Student",
    progressState: "Completed",
    learningStage: "Advanced",
    totalPoints: 3400,
  },
  {
    id: "usr-004",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Instructor",
    progressState: "Completed",
    learningStage: "Expert",
    totalPoints: 5000,
  },
];

// --- Mock Transactions ---
export const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    userId: "usr-001",
    type: "Reward",
    amount: 50,
    status: "Completed",
    date: "2024-10-25T10:00:00Z",
  },
  {
    id: "tx-002",
    userId: "usr-003",
    type: "Deposit",
    amount: 100,
    status: "Completed",
    date: "2024-10-26T14:30:00Z",
  },
  {
    id: "tx-003",
    userId: "usr-001",
    type: "Purchase",
    amount: 25,
    status: "Pending",
    date: "2024-10-27T09:15:00Z",
  },
  {
    id: "tx-004",
    userId: "usr-004",
    type: "Withdrawal",
    amount: 500,
    status: "Completed",
    date: "2024-10-28T16:45:00Z",
  },
  {
    id: "tx-005",
    userId: "usr-002",
    type: "Reward",
    amount: 10,
    status: "Failed",
    date: "2024-10-29T11:20:00Z",
  },
];

// --- Mock Credentials ---
export const mockCredentials: Credential[] = [
  {
    id: "cred-001",
    userId: "usr-003",
    title: "Advanced React Developer",
    issuer: "Learnault",
    dateEarned: "2024-09-15T00:00:00Z",
    url: "https://learnault.example.com/credentials/cred-001",
  },
  {
    id: "cred-002",
    userId: "usr-004",
    title: "Certified Digital Marketer",
    issuer: "Marketing Inst.",
    dateEarned: "2023-11-20T00:00:00Z",
    url: "https://example.com/cert/cred-002",
  },
  {
    id: "cred-003",
    userId: "usr-001",
    title: "Web3 Basics",
    issuer: "Learnault",
    dateEarned: "2024-10-10T00:00:00Z",
    url: "https://learnault.example.com/credentials/cred-003",
  },
];

// --- Mock Employers ---
export const mockEmployers: Employer[] = [
  {
    id: "emp-001",
    companyName: "TechNova Solutions",
    industry: "Software Development",
    website: "https://technova.example.com",
    openRoles: 5,
  },
  {
    id: "emp-002",
    companyName: "Creative Spark Media",
    industry: "Marketing & Design",
    website: "https://creativespark.example.com",
    openRoles: 2,
  },
  {
    id: "emp-003",
    companyName: "BlockChain Pioneers",
    industry: "Web3 & Crypto",
    website: "https://bcpioneers.example.com",
    openRoles: 8,
  },
];

// --- Mock Candidates ---
export const mockCandidates: Candidate[] = [
  {
    id: "can-001",
    userId: "usr-003", // Charlie Brown
    skills: ["React", "TypeScript", "Node.js", "Web3"],
    experienceYears: 4,
    expectedSalaryRange: "$80,000 - $120,000",
    isActivelyLooking: true,
  },
  {
    id: "can-002",
    userId: "usr-001", // Alice Johnson
    skills: ["HTML", "CSS", "JavaScript", "UI/UX Basics"],
    experienceYears: 1,
    expectedSalaryRange: "$50,000 - $70,000",
    isActivelyLooking: true,
  },
  {
    id: "can-003",
    userId: "usr-004", // Diana Prince
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    experienceYears: 7,
    expectedSalaryRange: "$90,000 - $140,000",
    isActivelyLooking: false,
  },
];

// --- Helper Functions ---

/**
 * Filter modules by a specific category.
 * @param category The category to filter by.
 * @returns Array of modules in that category.
 */
export const getModulesByCategory = (category: Module["category"]): Module[] => {
  return mockModules.filter((mod) => mod.category === category);
};

/**
 * Sort modules by difficulty (Beginner -> Intermediate -> Advanced).
 * @param modules The array of modules to sort.
 * @returns Sorted array of modules.
 */
export const sortModulesByDifficulty = (modules: Module[]): Module[] => {
  const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  return [...modules].sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  );
};

/**
 * Get all transactions for a specific user.
 * @param userId The ID of the user.
 * @returns Array of transactions.
 */
export const getUserTransactions = (userId: string): Transaction[] => {
  return mockTransactions.filter((tx) => tx.userId === userId);
};

/**
 * Filter users by their learning stage.
 * @param stage The learning stage to filter by.
 * @returns Array of users in that stage.
 */
export const getUsersByLearningStage = (
  stage: User["learningStage"]
): User[] => {
  return mockUsers.filter((user) => user.learningStage === stage);
};

/**
 * Get the full candidate profile merged with basic user details.
 * @param candidateId The ID of the candidate.
 * @returns Merged Candidate & User object, or null if not found.
 */
export const getFullCandidateProfile = (
  candidateId: string
): (Candidate & { user: User }) | null => {
  const candidate = mockCandidates.find((c) => c.id === candidateId);
  if (!candidate) return null;

  const user = mockUsers.find((u) => u.id === candidate.userId);
  if (!user) return null;

  return { ...candidate, user };
};

/**
 * Sort transactions by date (newest first).
 * @param transactions The array of transactions to sort.
 * @returns Sorted array of transactions.
 */
export const sortTransactionsByDateDesc = (
  transactions: Transaction[]
): Transaction[] => {
  return [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
