import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { ComplianceEngagementDataGenerator } from '../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator';
import { DataGenerator } from '../../../../../../../../DataGenerator/DataGenerator';
import { getUIElement } from '../../../../../../../../helpers/commonActionHelper';
import { StoreService } from '../../../../../../../../helpers/store';
import { ComplianceEngagementsLabels, ComplianceEngagementsTableHeaders, ExistingEngagementLabels } from '../../../../ComplianceEngagementTypes';
import { ComplianceEngagementLandingService } from '../../../../complianceLandingPage/ComplianceEngagementLandingService';
import { ExistingengagementService } from '../../../ExistingEngagementService';

const store = StoreService.getStore();
let landingPage!: ComplianceEngagementLandingService;
let page!: ExistingengagementService;

const loadLandingPage = (): ComplianceEngagementLandingService => {
    landingPage = landingPage ?? new ComplianceEngagementLandingService();
    return landingPage;
}
const load = (): ExistingengagementService => {
    page = page ?? new ExistingengagementService();
    return page;
}

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.generateComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.save().then(()=>{
                Engagement.milestones().enableAll().save();
                store.setItem('engagementName', Engagement.name);
            })
        });
        Instance.end();
    });
});

When("User targets random 'Selected Engagement Name' with {string} status", (status: string) => {
    const _page = loadLandingPage();
    cy.wait("@userScopes");
    _page.filter(ComplianceEngagementsTableHeaders.Status, status);
    _page.search(store.getItem('engagementName'));
});

When("User types remembered 'Selected Engagement Name' value in 'Search Bar' field", () => {
    const _page = loadLandingPage();
    cy.finishedLoading();
    cy.wait("@userScopes").wait("@userScopes");
    _page.search(store.getItem('engagementName'));
});

When("User clicks {string} button on an engagement with a 'Pending' status", (elementLabel: ComplianceEngagementsLabels) => {
    if (elementLabel === ComplianceEngagementsLabels.Manage) {
        loadLandingPage().clickManageEngagement();
    }
});

When("User clicks {string} button on 'Selected Engagement Name' engagement", (elementLabel: ComplianceEngagementsLabels) => {
    if (elementLabel === ComplianceEngagementsLabels.Manage) {
        loadLandingPage().clickManageEngagement();
    }
});

When("User clicks {string} in 'Engagement Selected' modal", () => {
    loadLandingPage().clickContinueManageEngagement();
});

When("User clicks 'Next Step' button in the {string} step", () => {
    cy.finishedLoading();
    load().nextStepButton.click({force: true});
});

When("User clicks random {string} in {string} calendar picker", (storeField: string, elementLabel: ExistingEngagementLabels) => {
    const result = load().selectDateFromDatePicker(elementLabel, store.getItem('startDate'));

    if (elementLabel === ExistingEngagementLabels.SamplePeriodStartDate) {
        result.then(selected => {
            store.setItem('startDate', selected)
        });
    }
});

When("User clicks random {string} in {string} dropdown", (storeField: string, elementLabel: ExistingEngagementLabels) => {
    load().selectFromDropdown(elementLabel);
});

When("User clicks on random 'Calendar dates' in 'Calendar' flyout", () => {
    load().selectFromCalendar();
});

When("Test remembers {string} value(s) as {string}", (elementLabel: ExistingEngagementLabels, storeField: string) => {
    load().getValueFromLabel(elementLabel).then(value => {
        store.setItem(storeField, value);
    });
});

Then("Test value {string} equals {string} value(s)", (storeField: string, elementLabel: ExistingEngagementLabels) => {
    const option = load().getUiOptionByLabel(elementLabel);
    const element = getUIElement(option);
    const storedValue = store.getItem(storeField);
    if (option.selector.includes("input")) {
        element.should('have.value', storedValue);
    }

    if (option.selector.includes("mat-select")) {
        element.contains(storedValue).should('exist');
    }
});

Then("{string}( button) is not 'visible'", (elementLabel: ComplianceEngagementsLabels) => {
    const _page = loadLandingPage();
    _page.tableData.then(tableData => {
        if (store.condition && tableData.length) {
            const uiOption = _page.getUiOptionByLabel(elementLabel);
            const element = cy.get(uiOption.selector);
            if (uiOption.text) {
                element.contains(uiOption.text).should('not.exist');
            } else {
                element.should('not.exist');
            }
        }
    })
});

When("User clicks 'Save & Close' button", () => {
    load().closeAndSaveButton.click({force: true});
});

When("User clicks 'Confirm' button on 'Close Engagement Creation' modal", () => {
    load().appConfirmDialog.contains('Confirm').click({force: true});
});

When("User clicks on {string} circle icon", (label: string) => {
    load().engagementStepperHeader.contains(label).click({force: true});
});

Then("Test remembered value {string} equals {string} value(s)", (storeField: string, elementLabel: ExistingEngagementLabels) => {
    const storedValue = store.getItem(storeField);
    load().validateStoredValue(elementLabel, storedValue);
});