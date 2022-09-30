import { But,Then, When } from 'cypress-cucumber-preprocessor/steps';
import { DataGenerator } from '../../../../../../DataGenerator/DataGenerator';
import { RAEngagementDataGenerator } from '../../../../../../DataGenerator/RAEngagementDataGenerator';
import { StoreService } from '../../../../../../helpers/store';
import { ReadinessAssessmenLabels } from '../../../../interfaces/ReadinessAssessmentDashboardInterface';
import { ReadinessAssessmentService } from "../../ReadinessAssessmentService";

let page: ReadinessAssessmentService;
const store = StoreService.getStore();

const load = (): ReadinessAssessmentService=>{
    if(!page){
        page = new ReadinessAssessmentService();
    }
    return page;
}
const selectedRA = 'selectedRA';

before(() => {
    DataGenerator.run(()=>{
        DataGenerator.getIntance()
            .generateReadinessAssessmentEngagement()
            .then((Engagement: RAEngagementDataGenerator) => {
                Engagement.withCategory("Availability").save().then(() => {
                    Engagement.publish();
                    Engagement.assignAllUsersToRACategory();
                    store.setItem(selectedRA, Engagement.name);
                });
            });
    });
});

Then("User views Readiness Assessment Dashboard",()=>{
    load().validateDashboard();
});

Then("{string} is {string}",(option: string, action: string)=>{
    load().optionIs(option, action);
});

But("Shouldn't see {string} menu",(navItem: string)=>{
    load().menuItemNotVisible(navItem)
});

Then("User clicks the 'Select' button on a readiness assessment engagement", () => {
    const _page = load();
    _page.interceptEngagementList();
    cy.wait('@engagementList');
    _page.selectReadinessAssessment(store.getItem(selectedRA));
});

When("User clicks {string} in the 'Assessment Selected' modal", () => {
    const _page = load();
    _page.interceptReadinessAssessmentDetails();
    cy.confirmSelectEngagement();
    load().setAuditorAssisted();
});

Then("{string}( icon)( dropdown)( button) is {string}", (elementLabel: ReadinessAssessmenLabels, action: string) => {
    if (store.condition) {
        load().optionIs(elementLabel, action);
    }
});

When("Test condition 'request-upgrade-visible' starts if 'auditor-assited-off'", () => {
    store.condition = !load().raAuditorAssisted;
});

Then("{string}( button) is not 'visible'", (elementLabel: ReadinessAssessmenLabels) => {
    if (store.condition) {
        const uiOption = load().getUIElementFor(elementLabel);
        const element = cy.get(uiOption.selector);
        if (uiOption.text) {
            element.contains(uiOption.text).should('not.exist');
        } else {
            element.should('not.exist');
        }
    }
});