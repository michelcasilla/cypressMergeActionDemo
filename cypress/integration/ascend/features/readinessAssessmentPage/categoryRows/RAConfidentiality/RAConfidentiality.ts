import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { DataGenerator } from '../../../../../../DataGenerator/DataGenerator';
import { RAEngagementDataGenerator } from '../../../../../../DataGenerator/RAEngagementDataGenerator';
import { StoreService } from '../../../../../../helpers/store';
import { ComparatorTypes } from '../../../../interfaces/ComparatorTypes';
import { ReadinessAssessmentDashboardBlocks, ReadinessAssessmenLabels } from '../../../../interfaces/ReadinessAssessmentDashboardInterface';
import { UIOption } from '../../../../interfaces/UIOptionTypes';
import { ReadinessAssessmentService } from "../../ReadinessAssessmentService";

const store = StoreService.getStore();
let page_: ReadinessAssessmentService;

const page = (): ReadinessAssessmentService=>{
    if(!page_){
        page_ = new ReadinessAssessmentService();
    }
    return page_;
}

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.generateReadinessAssessmentEngagement().then((Engagement: RAEngagementDataGenerator)=>{
            Engagement.withCategory('Confidentiality').publish().then(()=>{
                Engagement.assignAllUsersToRACategory();
            });
            store.setItem('engagementName', Engagement.name);
        });
        Instance.end();
    });
});

When("User navigates to {string} page", (navItem: string)=>{
    page().goTo(navItem)
});

When('Readiness Assessments Dashboard url is {string}',()=>{
    page().validateDashboard();
});

Then("User clicks the 'Select' button on a readiness assessment engagement", () => {
    const _page = page();
    _page.interceptEngagementList();
    // cy.wait('@engagementList');
    _page.selectReadinessAssessment(store.getItem('engagementName'));
});

When("User clicks {string} in the 'Engagement Selected' modal", () => {
    const _page = page();
    if (_page.readinessAssessmentSelected) {
        _page.interceptReadinessAssessmentDetails()
            .readinessAssessmentDashboardIntercept()
            .currentUserInterceptor();
    
        cy.confirmSelectEngagement();
    
        _page.setAuditorAssisted()
            .setCurrentUser()
            .setDashboardData();
    }
});

When("Test condition 'confidentiality-visible' starts if 'confidentiality-selected'", ()=>{
    if (page().readinessAssessmentSelected) {
        const category = page().getCategory(ReadinessAssessmentDashboardBlocks.Confidentiality);
        store.condition = !!category;
        cy.scrollToElement('app-readiness-dashboard-my-categories');
    }
});

When("Test condition 'confidentiality-visible' starts if 'confidentiality-selected' and( 'assigned-to-client')( 'assigned-to-category')", ()=>{
    if (page().readinessAssessmentSelected) {
        const category = page().getCategory(ReadinessAssessmentDashboardBlocks.Confidentiality);
        store.condition = !!category && category.isAssigned;
        cy.scrollToElement('app-readiness-dashboard-my-categories');
    }
});

When("Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'", ()=>{
    if (page().readinessAssessmentSelected) {
        const category = page().getCategory(ReadinessAssessmentDashboardBlocks.Confidentiality);
        store.condition = category && category.isAssigned && category.questionsAnswered === 0;
    }
});

When("Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'", ()=>{
    if (page().readinessAssessmentSelected) {
        const category = page().getCategory(ReadinessAssessmentDashboardBlocks.Confidentiality);
        store.condition = category && category.isAssigned && category.questionsAnswered > 0;
    }
});

When("Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'", ()=>{
    if (page().readinessAssessmentSelected) {
        const category = page().getCategory(ReadinessAssessmentDashboardBlocks.Confidentiality);
        store.condition = category && category.isAssigned && category.isInReview;
    }
});

Then("'Confidentiality' row is 'visible'", (action: string) => {
    if (page().readinessAssessmentSelected && store.condition) {
        page().getBlock(ReadinessAssessmentDashboardBlocks.Confidentiality).should('exist');
    }
});

Then("'Confidentiality' row {string} button is {string} if value is {string} {quotedInt}", (option: string, action: string, comparator: ComparatorTypes, value: number)=>{
    if (page().readinessAssessmentSelected && store.condition) {
        switch(comparator) {
            case ComparatorTypes.GreaterThan:
                page().optionIsGreaterThan(ReadinessAssessmentDashboardBlocks.Confidentiality, action, option, value);
                break;
            default:
        }
    }
});

Then("{string}( icon)( dropdown)( button) is {string}", (option: ReadinessAssessmenLabels, action: string) => {
    if (page().readinessAssessmentSelected && store.condition) {
        page().dashboardBlockOptionIs(option, action, ReadinessAssessmentDashboardBlocks.Confidentiality);
    }
});

Then("'Confidentiality' row is not 'visible'", () => {
    if (page().readinessAssessmentSelected && store.condition) {
        page().getBlock(ReadinessAssessmentDashboardBlocks.Confidentiality).should('not.exist');
    } 
});


Then("('Confidentiality' row ){string}( button)( icon)( dropdown) is not 'visible'", (label: ReadinessAssessmenLabels) => {
    if (page().readinessAssessmentSelected && store.condition) {
        const option: UIOption = page().getUIElementFor(label);
        const element = cy.get(option.selector);
        if (option.text) {
            element.contains(option.text).should('not.exist');
        } else {
            element.should('not.exist');
        }
    }
});