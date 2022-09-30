/**
 * Specifies engagement types relevant to A-SCEND.
 */
export enum EngagementTypes {
    ComplianceEngagements = "Compliance Engagements",
    ReadinessAssessments = "Readiness Assessments",
}

/**
 * Specifies navigation items available when neither a compliance engagement or readiness assessment is selected.
 */
export enum RootNavigationItems {
    Home = "Home",
    ComplianceEngagements = "Compliance Engagements",
    ReadinessAssessments = "Readiness Assessments",
    Accounts = "Accounts",
    Users = "Users"
}

/**
 * Specifies navigation items available when a compliance engagement is selected.
 */
export enum ComplianceEngagementNavigationItems {
    Home = "Home",
    Dashboard = "Dashboard",
    Requests = "Requests",
    CustomRequests = "Custom Requests",
    ServiceReview = "Service Review",
    Evidence = "Evidence",
    Assignments = "Assignments",
    Users = "Users"
}

/**
 * Specifies navigation items available in the "evidence" menu in a compliance engagement.
 */
export enum EvidenceNavigationItems {
    EvidenceUpload = "Upload",
    EvidenceDownload = "Download"
}

/**
 * Specifies navigation items available when a readiness assessment engagement is selected.
 */
export enum ReadinessAssessmentNavigationItems {
    Home = "Home",
    Dashboard = "Dashboard",
    AssessmentReports = "Assessment Reports",
    Users = "Users"
}

/**
 * Specifies navigation items available when a user clicks the "user profile" menu.
 */
export enum UserMenuNavigationItems {
    Profile = "Profile",
    Help = "Help",
    Logout = "Logout"
}

export enum NavigationLocation {
    UserMenu = "User",
    Left = "Left"
}
/**
 * Represents a navigation item in A-SCEND.
 */
export type NavigationItem = {
    icon?: string;
    text?: string;
    url?: string;
    location: NavigationLocation;
}

export enum NavigationLabels {
    AccountQuestions = 'Account Questions',
    ClientNameDropdown = 'Client Name',
    Profiledropdown = 'Profile',
    Home = 'Home',
    Dashboard = 'Dashboard',
    AssessmentReports = 'Assessment Reports',
    Users = 'Users',
    GenerateReport = 'Generate Report',
}