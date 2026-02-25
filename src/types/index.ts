export interface Module {
  id: string;
  title: string;
  description: string;
  category: "Development" | "Design" | "Marketing" | "Business" | "Web3" | "AI";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "Draft" | "Published" | "Archived";
  durationMinutes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Instructor" | "Admin";
  progressState: "Not Started" | "In Progress" | "Completed";
  learningStage: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  totalPoints: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "Deposit" | "Withdrawal" | "Reward" | "Purchase";
  amount: number;
  status: "Pending" | "Completed" | "Failed";
  date: string; // ISO 8601 string
}

export interface Credential {
  id: string;
  userId: string;
  title: string;
  issuer: string;
  dateEarned: string; // ISO 8601 string
  url: string;
}

export interface Employer {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  logoUrl?: string;
  openRoles: number;
}

export interface Candidate {
  id: string;
  userId: string; // References User.id
  skills: string[];
  experienceYears: number;
  expectedSalaryRange: string;
  isActivelyLooking: boolean;
}
