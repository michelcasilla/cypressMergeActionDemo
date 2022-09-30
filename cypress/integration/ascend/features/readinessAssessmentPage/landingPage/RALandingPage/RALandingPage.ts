import { When, But, Then } from "cypress-cucumber-preprocessor/steps";
import { StoreService } from "../../../../../../helpers/store";
import { ReadinessAssessmenLabels } from "../../../../interfaces/ReadinessAssessmentDashboardInterface";
import { ReadinessAssessmentService } from "../../ReadinessAssessmentService";

let __page!: ReadinessAssessmentService;
const store = StoreService.getStore(true);

const page = (): ReadinessAssessmentService =>{
    if(!__page){
        __page = new ReadinessAssessmentService();
    }
    return __page
}

When("Test condition {string} starts if at least {quotedInt} assessment is 'visible'", (condition: string, length: number) => {
    const _page = page();
    _page.interceptEngagementList();
    cy.wait('@engagementList');
    cy.finishedLoading();
    _page.tableData.then(data => {
        store.condition = data.length >= length;
    });
});

Then('User views Readiness Assessment Landing Page',()=>{
    page().validateRALandingPage();
});

Then('{string}( icon)( dropdown)( column)( button) is {string}',(option: string, action: string)=>{
    if (store.condition) {
        page().gridHeaderIsVisible(option, action);
    }
});

Then('{string}( icon)( dropdown)( column)( button) is not {string}',(label: ReadinessAssessmenLabels, action: string)=>{
    if (store.condition) {
        page().elementIsNotVisible(label);
    }
});

Then('{string} is {string} button',(option: string, action: string)=>{
    page().validateGridCTAButton(option, action);
});

But('User cannot view {string} button',(gridCta: string)=>{
    page().agGridCTAButtons.contains(gridCta).should('not.exist');
});

When("At least {quotedInt} assessment is not 'visible'", (length: number) => {
    if (store.condition) {
        page().tableData.should('have.length.lt', length);
    }
});
