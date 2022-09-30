import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { ComplianceEngagementDataGenerator } from '../../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator';
import { DataGenerator } from '../../../../../../../../../DataGenerator/DataGenerator';
import { ExecAction, getUIElement } from '../../../../../../../../../helpers/commonActionHelper';
import { StoreService } from '../../../../../../../../../helpers/store';
import { ComplianceEngagementsLabels, ComplianceEngagementsTableHeaders, ExistingEngagementLabels } from '../../../../../ComplianceEngagementTypes';
import { ComplianceEngagementLandingService } from '../../../../../complianceLandingPage/ComplianceEngagementLandingService';
import { ExistingengagementService } from '../../../../ExistingEngagementService';

const store = StoreService.getStore();
let landingPage!: ComplianceEngagementLandingService;
let page!: ExistingengagementService;

const loadLandingPage = (): ComplianceEngagementLandingService => {
    landingPage = landingPage ?? new ComplianceEngagementLandingService();
    return landingPage;
}
const load = (): ExistingengagementService => {
    page = page ?? new ExistingengagementService();
    page.registerInterceptor('GET', "PeriodicRates");
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

When("User targets random 'Selected Engagement Name' with {string} status", (status: string) => {
    const _page = loadLandingPage();
    cy.wait("@userScopes");
    _page.filter(ComplianceEngagementsTableHeaders.Status, status);
    _page.search(store.getItem('engagementName'));
});

When("User clicks {string} in the 'Engagement Selected' modal", () => {
    loadLandingPage().clickContinueManageEngagement();
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
        load();
    }
});

When("User clicks {string} button on 'Selected Engagement Name' engagement", (elementLabel: ComplianceEngagementsLabels) => {
    if (elementLabel === ComplianceEngagementsLabels.Manage) {
        loadLandingPage().clickManageEngagement();
        load();
    }
});

Then("Test condition 'engagement-contact-exists' starts if 'existing-engagement-contact' is 'visible'", () => {
    cy.finishedLoading();
    page.appEngagementDetailsEditContactDropDown.find('input').then($element => {
        store.condition = !!$element.val();
    });
});

When("User clicks 'Next Step' button in the {string} step", () => {
    if (store.condition) {
        cy.finishedLoading().wait(2000).then(()=>{
            page.nextStepButton.click({force: true});
        });
    }
});

When("User clicks 'Engagement Contact' dropdown", () => {
    if (store.condition) {
        cy.finishedLoading();
        page.appEngagementDetailsEditContactDropDown.find('input').click({force: true});
    }
});

When("User clicks random 'Engagement Contact email' in 'Engagement Contact'", () => {
    if (store.condition) {
        page.selectContact();
    }
});

When("User clicks random {string} in {string} calendar picker", (storeField: string, elementLabel: ExistingEngagementLabels) => {
    if (store.condition) {
        const result = page.selectDateFromDatePicker(elementLabel, store.getItem('startDate'));
    
        if (elementLabel === ExistingEngagementLabels.SamplePeriodStartDate) {
            result.then(selected => {
                store.setItem('startDate', selected)
            });
        }
    }
});

When("User clicks random {string} in {string} dropdown", (storeField: string, elementLabel: ExistingEngagementLabels) => {
    if (store.condition) {
        page.selectFromDropdown(elementLabel);
    }
});

When("User clicks random 'dates' in 'Daily Calendar' flyout", () => {
    if (store.condition) {
        page.selectFromCalendar();
    }
});

When("Test condition 'periodic-rates-complete' starts if 'periodic-rates-calander-flyout-dates-complete'", () => {
    page.isPeriodicRatesCompleted().then(result => {
        store.condition = result;
    });
});

When("User hovers over {string} icon", (elementLabel: ExistingEngagementLabels) => {
    const uiOption = page.getUiOptionByLabel(elementLabel);
    const element = getUIElement(uiOption);
    element.trigger('mouseenter');
});

Then("{string}( icon)( dropdown)( button) is {string}", (elementLabel: ExistingEngagementLabels, action: string) => {
    const uiOption = page.getUiOptionByLabel(elementLabel);
    ExecAction(uiOption, action);
});

Then("'Open' button is 'clickable' on all 'services'", () => {
    const uiOption = page.getUiOptionByLabel(ExistingEngagementLabels.Open);
    const element = getUIElement(uiOption)
    element.each(button => {
        cy.wrap(button).should('be.visible').and('not.be.disabled');
    });
});