import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { DataGenerator } from '../../../../../../DataGenerator/DataGenerator';
import { RAEngagementDataGenerator } from '../../../../../../DataGenerator/RAEngagementDataGenerator';
import { ExecAction } from '../../../../../../helpers/commonActionHelper';
import { StoreService } from '../../../../../../helpers/store';
import {
    ComplianceEngagementNavigationItems,
    NavigationLabels,
    ReadinessAssessmentNavigationItems,
    RootNavigationItems
} from '../../../../interfaces/NavigationTypes';
import { ReadinessAssessmentService } from '../../../readinessAssessmentPage/ReadinessAssessmentService';
import { NavigationMetadata, NavigationService } from '../../NavigationService';
// const DataTable = require("cucumber/lib/models/data_table").default;

// SCENARIO 1
let page!: NavigationService;
let raPage!: ReadinessAssessmentService;
const store = StoreService.getStore();

function initPage(): NavigationService {
    if (!page) {
        page = new NavigationService();
    }
    return page;
}
function initRAPage(): ReadinessAssessmentService {
    if (!raPage) {
        raPage = new ReadinessAssessmentService();
    }
    return raPage;
}

before(() => {
    DataGenerator.run(()=>{
        DataGenerator.getIntance()
            .generateReadinessAssessmentEngagement()
            .then((Engagement: RAEngagementDataGenerator) => {
                Engagement.withCategory("Availability").save().then(() => {
                    Engagement.publish();
                    Engagement.assignAllUsersToRACategory();
                    store.setItem('engagementName', Engagement.name);
                });
            });
    });
});

When('I have navigated to the {string} page', (navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems)=>{
    initPage().navigate(navItem);
});

When("User selects Readiness Assessment engagement",()=>{
    initRAPage();
    raPage.interceptEngagementList().selectReadinessAssessment(store.getItem('engagementName'));
});

When("User clicks {string} in the 'Engagement Selected' modal", () => {
    initRAPage();
    if (raPage.readinessAssessmentSelected) {
        raPage.interceptReadinessAssessmentDetails()
            .readinessAssessmentDashboardIntercept()
            .currentUserInterceptor();
    
        cy.confirmSelectEngagement();
    
        raPage.setAuditorAssisted()
            .setCurrentUser()
            .setDashboardData();
    }
});

Then("{string}( icon)( button)( dropdown) is {string}", (elementLabel: NavigationLabels, action: string) => {
    const element = initPage().getUiOptionByLabel(elementLabel);
    ExecAction(element, action);
});

Then("{string} is {string} on the Navigation menu", (elementLabel: NavigationLabels, action: string) => {
    ExecAction({selector: NavigationMetadata.Ui.AppNavigation, text: elementLabel}, action);
});
