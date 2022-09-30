export enum GenericUiSelectors {
    PrimaryButton = '.btn-primary',
    Button = 'button',
    DisabledButton = 'button[disabled]',
    ListOption = '.mat-list-option',
    Icon = '.mat-icon',
    Accordion = '.mat-accordion',
    AccordionExpanded = '.mat-accordion > .mat-expansion-panel.mat-expanded',
    AccordionClosed = '.mat-accordion > .mat-expansion-panel:not(.mat-expanded)',
    TabGroup = '.mat-tab-group',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H6 = 'h6',
    Nav = 'nav',
    Section = 'section',
    Input = 'input',
    Li = 'li',
    NgbAlert = 'ngb-alert',
    TrTh = 'tr th',
    TrTd = 'tr td',
    TypeSubmit = '[type="submit"]',
    DropDownOptionsContainer = '.dropdown-menu_available-options',
    Snackbar = 'snack-bar-container',
    CaptionMedium = '.caption-medium',
}

export enum NavigationSelectors {
    ProfileName = '.navigation_bottom_user',
    ProfileNameWithPopover = '.profile-name.with-popover',
    NavbarItem = '.navigation_content li'
}

export enum ClientSetUpSelectors{
    ProfileInfo = '.4.user-profile-info.inactive.bd-top',
    PopOver = '.with-popover'
}

export enum AgGridSelectors{
    AgGridAngular = 'ag-grid-angular',
    AgBodyViewPort = '.ag-body-viewport',
    AgCell = '.ag-cell',
    AppAgEngagementsActionButton = 'app-ag-engagements-action-button',
    AgRow = '.ag-row',
    AgHeaderLabel = '.ag-header-cell-label',
    AgHeaderCell = '.ag-header-cell',
    AgColumnViewport = '.ag-center-cols-viewport',
}


export enum ConfirmationDialogSelectors{
    AppConfirmComponent = 'app-confirm-dialog',
    Confirm = 'Confirm',
    Cancel = 'Cancel',
    ChangeEngagementText = 'You are about to change Engagements'
}

export enum AssignmentsSelectors{
    confirmationModalCTAlabel = "Continue"
}

export enum RequestsSelectors {
    Title = 'Requests',
    DueDateLabel = 'app-ag-due-date > div > div',
    Card = 'app-cards',
    FiltersContainer = 'app-kandban-filter',
    FilterButton = 'app-kandban-filter button',
    FilterDropdown = 'app-kandban-filter .mat-menu-trigger',
    SearchBoxInput = 'app-searchbox input',
    SearchBoxIcon = 'app-searchbox .search-icon-button',
    TableSelector = 'ag-grid-angular#requestGrid',
    KanbanSelector = 'app-kanban#requestGrid',
    TableStatusSelector = 'app-ag-status-selector'
}

export enum EngagementSelectors {
  appEngagementStepper = 'app-engagement-stepper',
  appEngagements = 'app-engagements',
  engagementsScreenTitle = '.engagements-screen--title',
  randomEngagementManageUrl = '/a-scend/readiness-assessment/engagements/create?projectId=4357558092934273606&projectStatus=Published&accountId=4357558087441573922',
  ProjectsComplianceDashboardUrl = "ProjectsComplianceDashboardUrl"
}

export enum AppNavigationSelector{
    appNavigation = 'app-navigation',
    navigationBottomUser = '.navigation_bottom_user',
    userOptions = '.user-options',
    navigationHeaderLogo = '.navigaiton_header--logo',
    SideNavNewUI = 'mat-sidenav-content mat-list-item .mat-list-item-content > div'
}

export enum NavSelectors {
    navLi = 'nav li',
    navigationBottomUser = '.navigation_bottom_user',
    userOptions = '.user-options'
}

export enum AppProfileSelectors{
    appProfile = 'app-profile',
    firstNameInput = '[formcontrolname="firstName"]',
    emailInput = '[formcontrolname="email"]',
    navLi = 'nav li'
}

export enum CustomRequestSelectors{
    customRequest = 'custom-request',
    url = '/a-scend/compliance/custom-request',
    ButtonExportLink = 'button.export-link',
    TableAddRequestPage = 'table#addRequestPage',
    FormControlNameDescription = '[formcontrolname="description"]',
    CustomRequestContainerActionButtons = '.custom-request-container_action-buttons',
    DueDateContainer = '.dueDate',
    DescriptionInput = '.description-input',
    CustomRequestHeader = 'custom-request div.main-header',
    ExportRequestButton ='custom-request > div > div.custom-requests_add-requests > add-custom-request > div.header.full-width > div > button',
    CustomRequestTableHeader = '.mat-sort-header-container > .mat-sort-header-content',
    LocationButton = '.enable-row > :nth-child(6) > .full-width > .pointer',
    EllipsisButton = '.full-width > .mat-menu-trigger',
    SaveCustomRequestButton = '.custom-request-container_action-buttons > div > .mat-focus-indicator',
    CriteriaDropdown = '.criteria-dropdown',
    CustomCriteriaDialog = 'app-add-custom-criteria-dialog',
    Title = 'Custom Requests',
}

export enum DashboardSelectors{
    appDashboard = 'app-dashboard',
    url = '/a-scend/compliance/dashboard',
    MatMenuContent = '.mat-menu-content',
    DashboardPDF = 'dashboard.pdf',
    MatMenuTrigger = '.mat-menu-trigger',
    Dashboard = '.dashboard',
    AppServiceDownloadPdfDialog = 'app-service-download-pdf-dialog',
    FormcontrolnameSelectedService = '[formcontrolname="selectedService"]',
    MatSelectPanelWrap = '.mat-select-panel-wrap',
    MatOption = 'mat-option',
    AppAuditMilestones = 'app-audit-milestones',
    AppMilestonesBar = 'app-milestones-bar',
    AppMilestoneBarInner = 'app-milestones-bar body > div.full-width > div',
    MilestoneLabel = 'app-milestones-bar body > label', 
    AppMilestonesDate = 'label.milestone-description.mat-caption',
    AppMilestonesShortname = 'div.milestone-desc-wrapper > label',
    AppMilestonesOverdueIcon = '.milestones-wrapper.overdue > .milestone > .milestone-image > span > div',
    AppMilestonesCompleteIcon = '.milestones-wrapper.completed > .milestone .milestone-image > span',
    CrossWalkCards = 'app-dashboard mat-card > mat-card-footer',
    CrossWalkMoreCardsButton = '.crosswalk-container_progress-chart_action-container > .ng-star-inserted > div > .material-icons',
    CrossWalkCard = 'app-dashboard mat-grid-tile',
    StatusBar = '.chart > .block',
    OpenBar = 'openClr',
    InProgressBar = 'inprogressClr',
    SubmittedBar = 'submittedClr',
    AcceptedBar = 'acceptedClr'
}

export enum AppEvidenceSelectors{
    appEvidence = 'app-evidence',
    appEvidenceDownload = 'app-evidence-download',
    appEvidenceDialog = 'app-evidence-dialog',
    cardLinkEvidenceCta = '.evidence_container_content',
}

export enum AppServiceReviewSelectors{
    appServiceReview = 'app-service-review',
    componentRouter = '/a-scend/compliance/service-review'
}

export enum AccountSearchSelectors{
    appAccountsSearch = '.mat-select-panel-wrap',
    searchAccountsListItem = 'mat-option',
    appConfirmDialog = 'app-informative-dialog', // 'app-confirm-dialog',
    searchAccountsList = '.search-accounts_list',
    contentContainer = '.content-container',
    menuTab = '.menu-tab',
    input = '[placeholder="Search"]',
    li = 'li',
    noResultsMessage = '.noResultsMessage'
}

export enum RequestPageSelectors{
    appRequestManagement = 'app-request-management',
    requestLoadUrl = '/v1/requests/projectrequests/*'
}

export enum UserPageSelectors{
    AppUsers = 'app-users',
    PageTitle = 'Users',
    AddUserCTA = 'Add User'
}

export enum KanBanSelectors{
    appCustomCategory = 'app-custom-category-dropdown',
    appCustomMultiSelect = ' app-custom-multi-select-dropdown',
    appStatusChange = 'app-status-change-confirmation'         
}

export enum AppChangeEngagementSelectors {
    AppChangeEngagement = 'app-change-engagement',
    MenuTabTitle = '.menu-tab--title',
    ChildDiv = '>div',
    UlLi = 'ul li',
    SearchAccountsList = '.search-accounts_list',
    MenuTabTitleDirect = 'app-change-engagement .menu-tab--title'
}

export enum AppTermsOfUseDialogSelectors{
    AppTermsOfUseDialog = 'app-terms-of-use-dialog',
    TosBodyText = '#tos-body--text',
    TosAcceptanceDateUrl = '/v1/users/tosacceptancedate'
}

export enum AppKanbanCardSelectors{
    AppKanban = 'app-kanban',
    AppCards = 'app-cards',
    AppRequestDialog = 'app-request-dialog',
    H6_H2 = 'h6 + h2',
    AppAlignGuidance = 'app-align-guidance',
    AppConsultantAdvice = 'app-consultant-advice',
    AppEvidence = 'app-evidence',
    H3button = 'h3 + button',
    MatGridTile = 'mat-grid-tile',
    AppActivity = 'app-activity',
    MatTabGroup = 'mat-tab-group',
    MatTabHeader = 'mat-tab-header',
    RoleTab = '[role="tab"]',
    MatTabBody = 'mat-tab-body',
    AppUploadedEvidence = 'app-uploaded-evidence',
    AppServiceBreakdown = 'app-service-breakdown',
    ContentContainerSideBar = '.content-container_side-bar',
    AppRequestDialogLocationMatDivider = 'app-request-dialog-location + mat-divider'
}

export enum RequestSelectors {
    EvidenceList = "/v1/evidence/link/project/list/*",
    AppRequestManagement = "app-request-management",
    AppSearchbox = "app-searchbox",
    AppCards = "app-cards",
    AppRequestDialog = "app-request-dialog",
    AppEvidence = "app-evidence",
    MatGridTile = "mat-grid-tile",
    AppEvidenceDialog = "app-evidence-dialog",
    AppPriorEvidenceActionButtons = "app-prior-evidence-action-buttons",
    FileDownload = "file_download",
    ChildDiv = ">div",
}

export enum AppKanbanFilters {
    AppKanbanFilter = 'app-kandban-filter'
}

export enum MatSelectors {
    MatMenuTrigger = '.mat-menu-trigger',
    MatMenuPanel = '.mat-menu-panel',
    MatSelectionList = 'mat-selection-list',
    MatListOption = 'mat-list-option',
    AriaSelected = 'aria-selected',
    TooltipTrigger = '.mat-tooltip-trigger',
    Tooltip = 'mat-tooltip-component',
    Checkbox = '.mat-checkbox',
    SelectPlaceholder = '.mat-select-placeholder',
    SelectOption = '.mat-option',
    MatHint = 'mat-hint',
    MaterialIcon = '.material-icon',
    FormField = '.mat-form-field',
    Label = 'mat-label',
    OutlinedIcons = '.material-icons-outlined',
    MenuItem = '.mat-menu-item',
    Chip = '.mat-chip',
    Ripple = '.mat-ripple',
    InputElement = '.mat-input-element'
}

export enum CustomCategorySelectors{
    DataPlaceholderCategoryName = '[data-placeholder="Category name"]',
    DataPlaceholderTypeSearch = '[data-placeholder="Type to search"]',
    DropdownMenuAvailableOptions = '.dropdown-menu_available-options',
    DropdownMenuAvailableOptionsListOptions = '.dropdown-menu_available-options_list--options',
    AddCtaText = 'Add Category',
    AddCustomCategoryCtaText = 'Add Custom Category',
    CustomCategoryUrl = '/v1/custom/category',
    AlignSnackBarSuccess = 'align-snack-bar-success',
    AddCustomItem = '.add-custom-item',
}