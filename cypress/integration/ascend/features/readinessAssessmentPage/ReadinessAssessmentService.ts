import { Interception } from "cypress/types/net-stubbing";
import { getRandom } from "../../../../DataGenerator/Helpers";
import { ExecAction } from "../../../../helpers/commonActionHelper";
import { getAccount } from "../../../../helpers/environment";
import { Category, DashboardResponse } from "../../interfaces/DashboardResponseInterface";
import { EngagementTypes, NavigationLabels, RootNavigationItems } from "../../interfaces/NavigationTypes";
import { ReadinessAssessmentDashboardBlocks, ReadinessAssessmenLabels } from "../../interfaces/ReadinessAssessmentDashboardInterface";
import { UIOption } from "../../interfaces/UIOptionTypes";
import { UserType } from "../../interfaces/UserTypeInterfaces";
import { User } from "../../interfaces/UserTypes";


export const ReadinessAssessmentMetadata = {
    Intercepts : {
        ReadinessAssessmentDashboardInterceptor : '/v1/readinessassessment/dashboard/*',
        ReadinessAssessmentDetailsInterceptor : '/v1/readinessassessment/details/*',
        CurrentUserInterceptor : '/v1/users/currentuser',
        EngagementsList: '/v1/engagement/list',
    },
    Ui : {
        H2 : 'H2',
        AppReadinessDashboard : 'app-readiness-dashboard',
        AppReadinessDashboardContent : '.readiness-dashboard_content',
        AppEngagements : 'app-engagements',
        AppEngagementsAGGridHeaderCellText : 'app-engagements .ag-header-cell-text',
        AppAgEngagementsAtionButton : 'app-ag-engagements-action-button button',
        AppReadinessDashboardAssessmentProgress : 'app-readiness-dashboard-assessment-progress',
        AppReadinessDashboardGapSeverity : 'app-readiness-dashboard-gap-severity',
        AppReadinessDashboardSeverityByCategory : 'app-readiness-dashboard-severity-by-category',
        AppDashboardTopBar : 'app-dashboard-top-bar',
        AppReadinessDashboardMyCategories : 'app-readiness-dashboard-my-categories',
        DashboardMyCategoriesCenterQuestionBlocksNumber : '.dashboard-my-categories_center-question-blocks_number',
        RATable: 'ag-grid-angular',
        'Need Support option' : {
            selector : 'app-dashboard-top-bar .support-text + i',
            text : 'Need Support'
        } as UIOption,
        'Client Name dropdown' : {
            selector : 'app-dashboard-top-bar mat-form-field mat-select'
        } as UIOption,
        'Profile dropdown' : {
            selector : 'app-dashboard-top-bar app-user-icon + i'
        } as UIOption,
        'Home' : {
            selector: 'mat-sidenav-content .mat-list-item-content [fxlayout="column"]',
            text : 'Home'
        } as UIOption,
        'Dashboard' : {
            selector : 'mat-sidenav-content .mat-list-item-content [fxlayout="column"]',
            text : "Dashboard"
        } as UIOption,
        'Assessment Reports' : {
            selector: 'mat-sidenav-content .mat-list-item-content [fxlayout="column"]',
            text : 'Assessment Reports'
        } as UIOption,
        'Users' : {
            selector : 'mat-sidenav-content .mat-list-item-content [fxlayout="column"]',
            text: 'Users'
        } as UIOption,
        'Generate Report CTA' : {
            selector: 'app-readiness-dashboard-header button',
            text:'Generate Report'
        } as UIOption,  
        'Answered With Gaps' : {
            selector: '.dashboard-my-categories_center-question-blocks_answered-with-gaps',
            text:'Answered With Gaps'
        } as UIOption,
        'Answered No Gaps' : {
            selector: '.dashboard-my-categories_center-question-blocks_answered-no-gaps',
            text:'Answered No Gaps'
        } as UIOption,
        'Skipped' : {
            selector: '.dashboard-my-categories_center-question-blocks_skipped',
            text:'Skipped'
        } as UIOption,
        'Assigned person' : {
            selector: '.app-assign-user-dropdown .material-icons-outlined.tooltip',
        } as UIOption,
        'Assigned person icon single' : {
            selector: '.app-assign-user-dropdown .mat-tooltip-trigger',
            text:'Assigned person'
        } as UIOption,
        'Assigned person icon none' : {
            selector: '.app-assign-user-dropdown .mat-tooltip-trigger',
            text:'Assigned person'
        } as UIOption,
        'Assignee caret' : {
            selector: '.app-assign-user-dropdown .mat-select-arrow-wrapper',
            text:'Assignee dropdown'
        } as UIOption,
        'Start' : {
            selector: '.dashboard-my-categories_actions--button',
            text:'Start'
        } as UIOption,
        'Resume' : {
            selector: '.dashboard-my-categories_actions--button',
            text:'Resume'
        } as UIOption,
        'Review' : {
            selector: '.dashboard-my-categories_actions--button',
            text:'Review'
        } as UIOption,
        'Readiness Assessments Dashboard url' : {
            selector: 'app-readiness-dashboard-header button',
            text:'Generate Report'
        } as UIOption,
        [ReadinessAssessmenLabels.Manage]: {
            selector: 'button',
            text:'Manage'
        } as UIOption,
        [ReadinessAssessmenLabels.Select]: {
            selector: 'button',
            text:'Select'
        } as UIOption,
        [ReadinessAssessmenLabels.Continue]: {
            selector: 'button',
            text: 'Continue'
        } as UIOption,
        [ReadinessAssessmenLabels.RequestAssessmentUpgrade]: {
            selector: 'button',
            text: 'Request Assessment Upgrade'
        } as UIOption,
        [NavigationLabels.AccountQuestions] : {
            selector : 'app-dashboard-top-bar .material-icons-outlined',
            text : 'mail'
        },
        [NavigationLabels.ClientNameDropdown] : {
            selector : 'app-dashboard-top-bar .mat-form-field-type-mat-select',
            text : 'Client Name'
        } as UIOption,
        [NavigationLabels.Profiledropdown] : {
            selector : 'app-dashboard-top-bar .mat-menu-trigger',
            text : 'expand_more'
        },
        [NavigationLabels.GenerateReport] : {
            selector : '.readiness-dashboard-header-top-right_button--fill',
            text : 'Generate Report'
        },
    }
}

export class ReadinessAssessmentService{
    private username: string;
    private __client: string;
    private __currentUser: User;
    private readinessAssessment: string;
    private __appDashboardTopBar: Cypress.Chainable<JQuery<HTMLElement>>;
    private __appReadinessDashboardAssessmentProgress: Cypress.Chainable<JQuery<HTMLElement>>;
    private __appReadinessDashboardGapSeverity: Cypress.Chainable<JQuery<HTMLElement>>;
    private __appReadinessDashboardSeverityByCategory: Cypress.Chainable<JQuery<HTMLElement>>;
    private __dashboardResponse: DashboardResponse;
    readinessAssessmentSelected = false;
    raAuditorAssisted: boolean;
    

    set selectClient(client: string){
        this.__client = client;
        cy.clientSetUp(client);
    }
    

    get appReadinessDashboardAssessmentProgress(): Cypress.Chainable<JQuery<HTMLElement>>{
        if(!this.__appReadinessDashboardAssessmentProgress){
            this.__appReadinessDashboardAssessmentProgress = cy.get(ReadinessAssessmentMetadata.Ui.AppReadinessDashboardAssessmentProgress);
        }
        return this.__appReadinessDashboardAssessmentProgress;
    }
    
    get appReadinessDashboardGapSeverity(): Cypress.Chainable<JQuery<HTMLElement>>{
        if(!this.__appReadinessDashboardGapSeverity){
            this.__appReadinessDashboardGapSeverity = cy.get(ReadinessAssessmentMetadata.Ui.AppReadinessDashboardGapSeverity);
        }
        return this.__appReadinessDashboardGapSeverity;
    }
    
    get appReadinessDashboardSeverityByCategory(): Cypress.Chainable<JQuery<HTMLElement>>{
        if(!this.__appReadinessDashboardSeverityByCategory){
            this.__appReadinessDashboardSeverityByCategory = cy.get(ReadinessAssessmentMetadata.Ui.AppReadinessDashboardSeverityByCategory);
        }
        return this.__appReadinessDashboardSeverityByCategory;
    }
    
    get appDashboardTopBar(): Cypress.Chainable<JQuery<HTMLElement>>{
        if(!this.__appDashboardTopBar){
            this.__appDashboardTopBar = cy.get(ReadinessAssessmentMetadata.Ui.AppDashboardTopBar);
        }
        return this.__appDashboardTopBar;
    }

    get dashboardCatgoriesTitles(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(`${ReadinessAssessmentMetadata.Ui.AppReadinessDashboardMyCategories} h3`);
    }
    
    get dashboardCategoriesSecurityTitle(): Cypress.Chainable<JQuery<HTMLElement>>{
        return this.dashboardCatgoriesTitles.contains(ReadinessAssessmentDashboardBlocks.Availability);
    }

    get agGridCTAButtons(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(ReadinessAssessmentMetadata.Ui.AppAgEngagementsAtionButton);
    }

    get tableData(): Cypress.Chainable<any> {
        return cy.get('body').then(($body) => {
            if ($body.find(ReadinessAssessmentMetadata.Ui.RATable).length > 0) {
                return cy.get(ReadinessAssessmentMetadata.Ui.RATable).getAgGridData();
            }
            return cy.wrap([]);
        });
    }

    getBlock(dashboardBlock: string): Cypress.Chainable<JQuery<HTMLElement>>{
        return this.dashboardCatgoriesTitles.contains(dashboardBlock)
                .parents(ReadinessAssessmentMetadata.Ui.AppReadinessDashboardMyCategories);
    }

    validateDashboard(): ReadinessAssessmentService {
        cy.get(ReadinessAssessmentMetadata.Ui.AppReadinessDashboard)
            .within(($landing)=>{
                expect($landing).to.exist;
                this.appReadinessDashboardAssessmentProgress.should('be.visible');
                this.appReadinessDashboardGapSeverity.should('be.visible');
                this.appReadinessDashboardSeverityByCategory.should('be.visible');
                this.appDashboardTopBar.should('be.visible');
                cy.get(ReadinessAssessmentMetadata.Ui.H2).contains('My Assessment Categories').should('be.visible');
            });
        return this;
    }

    selectReadinessAssessment(name?: string): ReadinessAssessmentService{
        cy.finishedLoading();
        if (name) {
            this.readinessAssessmentSelected = true;
            cy.selectEngagement(name, 'Readiness Assessments' as EngagementTypes, false);
            return this;
        }

        this.tableData.then(data$ => {
            const row = getRandom(data$) as {Engagement: string};
            if (row) {
                this.readinessAssessmentSelected = true;
                cy.selectEngagement(row.Engagement, 'Readiness Assessments' as EngagementTypes, false);
            }
        });

        return this;
    }

    dashboardBlockOptionIs(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        cy.get(ReadinessAssessmentMetadata.Ui.AppReadinessDashboardContent).scrollTo('bottom',{ensureScrollable:false});
        this.getBlock(block).within(()=>{
            this.optionIs(key, action);
        });
        return this;
    }
    
    getCategory(block: ReadinessAssessmentDashboardBlocks): Category{
        const { categories }  = this.__dashboardResponse;
        const category: Category  = categories.find(x => x.name == block);
        const isAssigned: boolean = category.assignedUsers.some(x=>x.userID == this.__currentUser.userid);
        return {...category, ...{isAssigned:isAssigned}};
    }

    isCategoryStartClickable(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        const category = this.getCategory(block);
        if(category.isAssigned && category.questionsAnswered == 0){
            this.getBlock(block).within(()=>{
                const uiOption = this.getUIElementFor(key);
                // Resume, Clickable
                cy.get(uiOption.selector)
                    .contains(uiOption.text)
                    .should('exist')
                    .and('not.have.attr', 'disabled');
            })
        }
        return this;
    }
    
    isCategoryStartDisabled(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        const category = this.getCategory(block);
        if(!category.isAssigned && category.questionsAnswered == 0){
            this.getBlock(block).within(()=>{
                // Start, Disabled
                const uiOption = this.getUIElementFor(key);
                cy.get(`${uiOption.selector}[disabled]`)
                    .contains(uiOption.text)
                    .should('exist')
            })
        }
        return this;
    }
    
    isCategoryResumeClickable(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        const category = this.getCategory(block);
        if(category.isAssigned && category.questionsAnswered > 0){
            this.getBlock(block).within(()=>{
                const uiOption = this.getUIElementFor(key);
                // Resume, Clickable
                cy.get(uiOption.selector)
                    .contains(uiOption.text)
                    .should('exist')
                    .and('not.have.attr', 'disabled');
            })
        }
        return this;
    }
    
    isCategoryResumeDisabled(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        const category = this.getCategory(block);
        if(!category.isAssigned && category.questionsAnswered > 0){
            this.getBlock(block).within(()=>{
                // Resume, Disabled
                const uiOption = this.getUIElementFor(key);
                cy.get(`${uiOption.selector}[disabled]`)
                    .contains(uiOption.text)
                    .should('exist')
            })
        }
        return this;
    }
    
    isCategoryReviewClickable(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        const category = this.getCategory(block);
        if(category.isAssigned && category.isInReview){
            this.getBlock(block).within(()=>{
                // Review, Clickable
                const uiOption = this.getUIElementFor(key);
                cy.get(uiOption.selector)
                    .contains(uiOption.text)
                    .should('exist')
                    .and('not.have.attr', 'disabled');
                expect(true, `${key} to be clickable on ${block}` ).to.be.eq(true)
            })
        }
        return this;
    }
    
    isAssignedIconClickable(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        const category = this.getCategory(block);
        if(category.assignedUsers.length == 1){
            this.getBlock(block).within(()=>{
                const uiOption = this.getUIElementFor(key);
                cy.get(uiOption.selector)
                .contains('person')
                    .should('exist')
            })
        } else if(category.assignedUsers.length > 1 ){
            this.getBlock(block).within(()=>{
                const uiOption = this.getUIElementFor(key);
                cy.get(uiOption.selector)
                .contains('group')
                    .should('exist')
            })
        } else {
            this.getBlock(block).within(()=>{
                const uiOption = this.getUIElementFor(key);
                cy.get(uiOption.selector)
                .contains('no_accounts')
                    .should('exist')
            })
        }
        return this;
    }

    
    isCategoryReviewDisabled(key: string, action: string, block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService{
        const category = this.getCategory(block);
        if(!category.isAssigned && category.isInReview){
            this.getBlock(block).within(()=>{
                // Review, Disabled
                const uiOption = this.getUIElementFor(key);
                cy.get(`${uiOption.selector}[disabled]`)
                    .contains(uiOption.text)
                    .should('exist')
            })
        }
        return this;
    }
    
    optionIs(key: string, action: string): ReadinessAssessmentService{
        const selector: UIOption = this.getUIElementFor(key);
        ExecAction(selector, action) 
        return this;
    }
   
    dasboardRowExist(block: ReadinessAssessmentDashboardBlocks): ReadinessAssessmentService {
        cy.get(ReadinessAssessmentMetadata.Ui.AppReadinessDashboardContent).scrollTo('bottom',{ensureScrollable:false});
        this.dashboardCatgoriesTitles.contains(block as string)
        .should('exist');
        return this;
    }

    interceptEngagementList(): ReadinessAssessmentService {
        cy.intercept({ pathname : ReadinessAssessmentMetadata.Intercepts.EngagementsList}).as('engagementList')
        return this;
    }
    
    interceptReadinessAssessmentDetails(): ReadinessAssessmentService {
        cy.intercept({ pathname : ReadinessAssessmentMetadata.Intercepts.ReadinessAssessmentDetailsInterceptor}).as('readinessAssessmentDetails')
        return this;
    }
    
    optionIsGreaterThan(block: ReadinessAssessmentDashboardBlocks, action: string, option: string, value: number): ReadinessAssessmentService{
        const uiOption = this.getUIElementFor(option);
        this.getBlock(block).within(()=>{
            cy.get(uiOption.selector).within(()=>{
                cy.get(ReadinessAssessmentMetadata.Ui.DashboardMyCategoriesCenterQuestionBlocksNumber).then(($element)=>{
                    const quantity: number = (parseInt($element.text()) || 0);
                    if(quantity > value){
                        ExecAction(uiOption, action);
                    }else{
                        cy.wrap($element).should('have.attr', 'disabled');
                    }
                });
            });
        });
        return this;
    }

    setCurrentUser(): ReadinessAssessmentService{
        cy.wait('@currentUser').then((resp: Interception)=>{
            this.__currentUser = resp.response.body as User
        });
        return this;
    }

    currentUserInterceptor(): ReadinessAssessmentService{
        cy.intercept('GET', ReadinessAssessmentMetadata.Intercepts.CurrentUserInterceptor).as('currentUser');
        return this;
    }

    readinessAssessmentDashboardIntercept(): ReadinessAssessmentService{
        cy.intercept('GET', ReadinessAssessmentMetadata.Intercepts.ReadinessAssessmentDashboardInterceptor)
            .as('readinessAssessmentDashboardInterceptor');
        return this;
    }

    setDashboardData(): ReadinessAssessmentService{
        cy.wait('@readinessAssessmentDashboardInterceptor').then((resp: Interception)=>{
            const dashboardResponse = resp.response.body as DashboardResponse;
            this.__dashboardResponse = dashboardResponse;
        }).wait(500);
        return this;
    }


    loginAsRole(role: string): ReadinessAssessmentService {
        const { username, password }: UserType = getAccount(role);
        if (!username || !password) {
        throw new Error(`No account found for user type: ${role}`);
        }

        cy.login(username, password, true);
        return this;
    }
  
    getUIElementFor(key: string): UIOption {
        try{
            const uiElements = ReadinessAssessmentMetadata.Ui[key];
            return uiElements;
        }catch(e){
            throw "Key is not defined";
        }
    }

    menuItemVisible(navItem: string): ReadinessAssessmentService{
     const item = this.getUIElementFor(navItem)
     cy.get(item.selector).contains(navItem).should('be.visible');
     return this;
    }

    menuItemNotVisible(navItem: string): ReadinessAssessmentService{
        const item = this.getUIElementFor(navItem)
        cy.get(item.selector).contains(navItem).should('not.exist');
        return this;
       }

    goTo(navOption: string): ReadinessAssessmentService {
        cy.wait(500).navigate(navOption as RootNavigationItems);
        return this;
    }
    
    gridHeaderIsVisible(key: string, action: string): ReadinessAssessmentService{
        const uiOption: UIOption = {
            selector : ReadinessAssessmentMetadata.Ui.AppEngagementsAGGridHeaderCellText,
            text : key
        }
        ExecAction(uiOption, action);
        return this;
    }
    
    validateGridCTAButton(key: string, action: string): ReadinessAssessmentService{
        this.agGridCTAButtons.contains(key).should('exist');
        return this;
    }
    
    validateRALandingPage(): ReadinessAssessmentService {
        cy.get(ReadinessAssessmentMetadata.Ui.AppEngagements)
            .within(($landing)=>{
                expect($landing).to.exist;
                expect($landing).to.be.visible;
            });
        return this;
    }

    elementIsNotVisible(label: ReadinessAssessmenLabels): ReadinessAssessmentService{
        const uiOption = ReadinessAssessmentMetadata.Ui[label];
        cy.get(uiOption.selector).contains(uiOption.text).should('not.exist');
        return this;
    }

    setAuditorAssisted(): ReadinessAssessmentService {
        cy.wait('@readinessAssessmentDetails').then($data => {
            $data.response.body.projectsAudits.forEach(audit => {
                this.raAuditorAssisted = audit.raAuditorAssisted;
            })
        });
        return this;
    }
}
