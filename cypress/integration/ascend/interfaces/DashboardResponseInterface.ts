export interface DashboardResponse {
  projectName: string;
  projectID: string;
  assessment: string;
  assessmentProgress: number;
  lowGapCount: number;
  medGapCount: number;
  highGapCount: number;
  categories: Category[];
  leadAuditor?: unknown;
  status: string;
}

export interface Category {
  categoryID: number;
  name: string;
  percentComplete: number;
  isInReview: boolean;
  questionsAnswered: number;
  questionsSkipped: number;
  gapTotal: number;
  lowGapCount: number;
  medGapCount: number;
  highGapCount: number;
  userHasUnreadComments: boolean;
  hasComments: boolean;
  assignedUsers: AssignedUser[];
  sequence: number;
  isAssigned?: boolean;
}

export interface AssignedUser {
  userID: string;
}