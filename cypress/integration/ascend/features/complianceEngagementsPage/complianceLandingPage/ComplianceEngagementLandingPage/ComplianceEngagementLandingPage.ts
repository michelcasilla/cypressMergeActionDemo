import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { ExecAction } from '../../../../../../helpers/commonActionHelper';
import { ComplianceEngagementLandingService } from '../ComplianceEngagementLandingService';
import { ComplianceEngagementsLabels, ComplianceEngagementsTableHeaders } from '../../ComplianceEngagementTypes';
import { StoreService } from '../../../../../../helpers/store';

let page!: ComplianceEngagementLandingService;
const store = StoreService.getStore(true);

const load = (): ComplianceEngagementLandingService => {
    page = page ?? new ComplianceEngagementLandingService();
    return page;
}

When("Test condition {string} starts if at least {quotedInt} engagement is 'visible'", (condition: string, length: number) => {
    const _page = load();
    cy.finishedLoading();
    _page.tableData.then(data => {
        store.condition = data.length >= length;
    });
});

Then("{string}( icon)( dropdown)( button) is {string}", (elementLabel: ComplianceEngagementsLabels, action: string) => {
    if (store.condition) {
        const element = load().getUiOptionByLabel(elementLabel);
        ExecAction(element, action);
    }
});

Then("{string} column is 'sortable'", (elementLabel: ComplianceEngagementsTableHeaders) => {
    if (store.condition) {
        const element = load().getTableHeader(elementLabel);
        element.click({force: true});
    }
});

When("At least {quotedInt} engagement is not 'visible'", (length: number) => {
    if (store.condition) {
        load().tableData.should('have.length.lt', length);
    }
});


Then("{string}( button) is not 'visible'", (elementLabel: ComplianceEngagementsLabels) => {
    if (store.condition) {
        const uiOption = load().getUiOptionByLabel(elementLabel);
        const element = cy.get(uiOption.selector);
        if (uiOption.text) {
            element.contains(uiOption.text).should('not.exist');
        } else {
            element.should('not.exist');
        }
    }
}); 