import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../../DataGenerator/ASCENDTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { RequestGenerator } from "../../../../../../../../DataGenerator/RequestGenerator";
import { ExecAction, getUIElement } from '../../../../../../../../helpers/commonActionHelper';
import { StoreService } from "../../../../../../../../helpers/store";
import { ExistingengagementService, ExistingengagementMetadata } from "../../..//ExistingEngagementService";
import { ExistingEngagementLabels } from '../../../../ComplianceEngagementTypes';


const store = StoreService.getStore();
const page = () => ExistingengagementService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.service().markAllCriteriaAsNotApplicable().save().then((Request: RequestGenerator)=>{
                Engagement.changeComplianceEngagementStatus(EngagementStatus.Published);
                Request.changeAllRequestToOpen()
                    .changeSomeRequestToInProgress()
                    .changeSomeRequestToSubmitted()
                    .linkEvidence()
                    .changeSomePopulationRequestToAccepted();
                Engagement.changeComplianceEngagementStatus(EngagementStatus.Complete);
            })
            store.setItem('engagementName', Engagement.name);
        });
    });
});

Then("{string} button is not 'visible'", (buttonName: string) => {
    page().appAgEngagementsActionButtons.contains(buttonName).should('not.exist');
});

When("User clicks {string} button on random 'Engagement Name' with 'Completed' status", (buttonName: string) => {
    const engagementNameValue = store.getItem('engagementName');
    page().appEngagementSearchbox.focus().clear().type(engagementNameValue);
    page().appAgEngagementsActionButtons.contains(buttonName).click({force: true});
});

When("User clicks {string} button in {string} modal", (button: string)=>{
    page().appConfirmDialog.contains(button).click();
});

Then("{string} dropdown/field is 'disabled'", (elementLabel: ExistingEngagementLabels) => {
    cy.finishedLoading().wait(600);
    const option = page().getUiOptionByLabel(elementLabel);
    const element = getUIElement(option);

    if(store.getItem('project-dropdown')) {
        if(store.getItem(elementLabel.toString())){
            ExecAction(option, "DisabledOrReadOnly");
        } else {
            element.should('not.exist')
        }
    } else {
        ExecAction(option, "DisabledOrReadOnly");
    }
});

Then("{string} icon is not 'visible'", (elementLabel: ExistingEngagementLabels) => {
    const option = page().getUiOptionByLabel(elementLabel);
    const element = getUIElement(option);

    element.should('not.exist');
});

Then("{string} button is 'disabled'", (elementLabel: ExistingEngagementLabels) => {
    if(store.condition) {
        cy.finishedLoading().wait(600);
        const option = page().getUiOptionByLabel(elementLabel);
        const element = getUIElement(option);

        element.should('have.class', 'mat-button-disabled');
    }
});

Then("'Mass Upload' button is 'enabled'", () => {
    if(store.condition) {
        cy.finishedLoading().wait(600);
        const option = page().getUiOptionByLabel('Mass Upload from Splash Page' as ExistingEngagementLabels);
        const element = getUIElement(option);

        element.should('not.have.class', 'mat-button-disabled');
    }
});

Then("'Create Custom Requests' button is 'enabled'", () => {
    if(store.condition) {
        cy.finishedLoading().wait(600);
        const option = page().getUiOptionByLabel('Create Custom Requests' as ExistingEngagementLabels);
        const element = getUIElement(option);

        element.should('not.have.class', 'disable');
    }
});

Then("User clicks 'Next Step' button in the {string} (sub)step", ()=>{
    if(store.condition){
        cy.finishedLoading().wait(600);
        page().nextStepButton.click({force: true});
    }
})

Then("'toggle' icon is 'disabled'", ()=>{
    page().getMilestonesList.first().within(()=>{
        page().getMatSlideToggle.then($toggle => {
            cy.wrap($toggle).should('not.be.enabled');
        });
    })
})

When("Test condition {string} starts if 'project-flyout' has any: ['Level, Family or Cycle']", (storeKey: string)=>{
    [
        'Level',
        'Family',
        'Cycle'
    ].forEach((field)=>{
        const option = page().getUiOptionByLabel(field as ExistingEngagementLabels);
        const isVisible = Cypress.$(option.selector).length > 0 ? true : false;
        store.setItem(field, isVisible);
        store.condition = store.condition || isVisible;
    });
    
    store.setItem(storeKey, store.condition); 
})

Then("'Daily Calendar' is 'disabled'", () => {
    page().getAvailableDaysFromCalendar().should('have.length', 0);
});

Then("User clicks {string} button in 'service request'", (buttonName: string) => {
    cy.finishedLoading().wait(600);
    page().appEngagementServicesButtons.contains(buttonName).click({force: true});
});

When("Test condition {string} starts if 'custom request exists'", (storeKey: string)=>{
    cy.finishedLoading().wait(600);
    const selector = ExistingengagementMetadata.Ui.AddCustomRequest;
    const isVisible = Cypress.$(selector).length > 0 ? true : false;
    
    store.condition = isVisible;
    
    store.setItem(storeKey, store.condition);
})

Then("{string} dropdown/field on all rows is 'disabled'", (elementLabel: ExistingEngagementLabels) => {
    const condition = store.getItem('custom request');
    if(condition) {
        const option = page().getUiOptionByLabel(elementLabel);
        const elements = getUIElement(option);
        elements.each($elem => {
            const isDisabled = $elem.attr('aria-disabled') === 'true' || $elem.is(':disabled');
            
            if(isDisabled) {
                cy.wrap($elem).should('not.be.enabled')
            } else {
                cy.wrap($elem).should('have.attr', 'readonly');
            }
        });
    }
});

Then("'ellipsis' icon on all rows is 'disabled'", () => {
    if(store.getItem('custom request')) {
        const elements = page().getCustomRequestActionIcons.parent();
        elements.each($elem => {
            cy.wrap($elem).should('have.class', 'disable-row');
        });
    }
});

Then("'Consultant\\(s)' icon in all rows is 'disabled'", () => {
    const elements = page().appCriteriaConsultantIcons;
    elements.each($elem => {
        cy.wrap($elem).should('have.class', 'icon-disabled');
    });
});

Then("'Applicable toggle' icon in all rows is 'disabled'", () => {
    const elements = page().appEngagementServiceTableToggleRows;
    elements.each($elem => {
        cy.wrap($elem).should('have.class', 'mat-disabled');
    });
});

Then("'Toggle Selected' icon is 'disabled'", () => {
    const option = page().getUiOptionByLabel('Toggle Selected' as ExistingEngagementLabels);
    const element = getUIElement(option);

    element.should('have.class', 'mat-disabled');
});

Then("'Export Requests' is 'enabled'", () => {
    if(store.getItem('custom request')) {
        const element = page().getCustomRequestButtons.contains('Export Requests');
        element.should('be.enabled');
    }
});

Then("'ellipsis' dropdown is 'enabled'", () => {
    const option = page().getUiOptionByLabel('Service Requests Ellipsis Dropdown' as ExistingEngagementLabels);
    const element = getUIElement(option);

    element.should('not.be.disabled');
});

Then("'Auto-Assign Rolled Forward N\\/As' is 'enabled'", () => {
    const ellipsisOption = page().getUiOptionByLabel('Service Requests Ellipsis Dropdown' as ExistingEngagementLabels);
    const ellipsisElement = getUIElement(ellipsisOption);

    ellipsisElement.click({force: true})

    const option = page().getUiOptionByLabel('Auto-Assign Rolled Forward N/As' as ExistingEngagementLabels);
    const element = getUIElement(option);

    element.should('be.enabled');

    ellipsisElement.click({force: true})
});

Then("'Auto-Assign Roll Forward Locations' is 'enabled'", () => {
    const ellipsisOption = page().getUiOptionByLabel('Service Requests Ellipsis Dropdown' as ExistingEngagementLabels);
    const ellipsisElement = getUIElement(ellipsisOption);

    ellipsisElement.click({force: true})

    const option = page().getUiOptionByLabel('Auto-Assign Roll Forward Locations' as ExistingEngagementLabels);
    const element = getUIElement(option);

    element.should('be.enabled');

    ellipsisElement.click({force: true})
});

Then("'Locations column pencil' icon in all rows is 'disabled'", () => {
    const option = page().getUiOptionByLabel('Locations column pencil' as ExistingEngagementLabels);
    const elements = getUIElement(option);
    elements.each($elem => {
        cy.wrap($elem).should('have.class', 'icon-disabled');
    });
});

Then("'Due Date column calendar' icon in all rows is 'disabled'", () => {
    const elements = page().appEngagementServiceDatepickerToggleButton;
    elements.each($elem => {
        cy.wrap($elem).should('be.disabled');
    });
});

Then("'Engagement Summary' dropdown is 'enabled'", () => {
    const element = page().appEngagementSummaryEngagementContainerHeader;
    element.should('not.be.disabled');    
});

Then("All 'Service information' dropdowns are 'enabled'", () => {
    const elements = page().appEngagementSummaryServicesContainerHeader;
    elements.each($elem => {
        cy.wrap($elem).should('not.be.disabled');
    });
});

Then("'Due Date' field in all rows is 'disabled'", () => {
    const option = page().getUiOptionByLabel('Due Date' as ExistingEngagementLabels);
    const elements = getUIElement(option);
    elements.each($elem => {
        cy.wrap($elem).should('be.disabled')
    });
});

When("User clicks 'Close' button in the {string} (sub)step", ()=>{
    page().closeStepButton.click({force: true});
})