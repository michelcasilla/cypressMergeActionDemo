import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { DataGenerator } from "../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../helpers/store";
import { NewAssessmentLabels } from "../../../../interfaces/ReadinessAssessmentTypes";
import { AgGridSelectors } from "../../../../utils/CssSelectors";
import { NewAssessmentService, NewAssessmentMetadata } from "../NewAssesmentService";

let page: NewAssessmentService;
const store = StoreService.getStore();

const load = (): NewAssessmentService => {
    page = new NewAssessmentService();
    return page;
};

When("User is on 'Homepage'", () => {
    cy.url().should('include', NewAssessmentMetadata.Intercepts.HomePage);
});

Then("User clicks {string}( dropdown)", (element: NewAssessmentLabels) => {
    if (!page) {
        load();
    }
    if (element === NewAssessmentLabels.NewEngagement) {
        page.interceptUserDetails();
        cy.finishedLoading();
    }
    const elementOption = page.getUIElementFor(element);
    let buttonSelector = cy.get(elementOption.selector)
    if (elementOption.text) {
        buttonSelector = buttonSelector.contains(elementOption.text);
    }
    buttonSelector.click({force: true});
});

When("User clicks {string} client in 'Client' dropdown", (clientName: string) => {
    let client = clientName;
    DataGenerator.getIntance().accountObject.then((account)=>{
        if (clientName === 'Demo Client') {
            client = account.accountName;
        }
        store.setItem(clientName, client);
        cy.openAccountSearch('.assessment-details_account-details');
        page.interceptAccountDetails();
    
        cy.get(`${NewAssessmentMetadata.Ui.MatSelectPanel} .mat-filter-input`).type(client);
        
        cy.get(NewAssessmentMetadata.Ui.MatSelectPanel)
            .find(NewAssessmentMetadata.Ui.MatSelectOption)
            .contains(client).click({force: true});
        cy.wait('@accountDetails');
    });
});

When("User types random {string} in {string} field", (field: NewAssessmentLabels, element: NewAssessmentLabels) => {
    const option = page.getUIElementFor(element);
    const randomString = page.generateRandomString();
    cy.get(option.selector).clear().type(randomString);
});

Then("Test value {string} equals {string} value", (fieldLabel: NewAssessmentLabels, elementLabel: NewAssessmentLabels) => {
    page.validateStoredValue(fieldLabel, elementLabel);
});

Then("User clicks contact in {string} dropdown", () => {
    const elementOption = page.getUIElementFor(NewAssessmentLabels.ContactField);
    cy.get(elementOption.selector).click({force: true});
    const randomString = page.generateRandomString();
    const email =  randomString + '@gmail.com';
    page.fieldValues[NewAssessmentLabels.ContactEmail] = email;
    cy.get('.mat-autocomplete-panel button').click({
        force: true
    });
    cy.typeInField('input[formcontrolname="email"]', email);
    cy.get('button').contains('Continue').click({force: true});
    cy.typeInField('input[formcontrolname="firstName"]', randomString);
    cy.typeInField('input[formcontrolname="lastName"]', randomString);
    cy.typeInField('input[formcontrolname="title"]', randomString);
    page.interceptSaveUser();
    cy.get('button').contains('Add User').click({force: true});
    cy.wait('@saveUser');
    cy.get(elementOption.selector).click({force: true}).type(email);
    cy.get('.mat-autocomplete-panel .mat-option').contains(email).click({
        force: true
    });
});

When("Test condition {string} starts if {string} is 'visible'", (condition: string, elementLabel: NewAssessmentLabels) => {
    const elementOption = page.getUIElementFor(elementLabel);
    const $element = Cypress.$(elementOption.selector)
    store.condition = $element.length > 0;
});

When("User clicks {string} icon", (elementLabel: NewAssessmentLabels) => {
    if (store.condition) {
        const elementOption = page.getUIElementFor(elementLabel);
        cy.get(elementOption.selector).click({force: true});
    }
});

When("User clicks 'Drag and drop here or browse to upload' hover text", () => {
    if (store.condition) {
        const elementOption = page.getUIElementFor(NewAssessmentLabels.DragAndDrop);
        cy.get(elementOption.selector).click({force: true});
    }
});

When("User uploads {string} file", (fileName: string) => {
    page.uploadFile(fileName);
});

When("User clicks {string} toggle to 'On'", () => {
    const option = page.getUIElementFor(NewAssessmentLabels.AuditorAssistedField);
    cy.get(option.selector).click({force: true});
    page.fieldValues[NewAssessmentLabels.AuditorAssistedBoolean] = Cypress.$(option.selector).val().toString();
});

When("User clicks random {string} in {string} dropdown", (elementLabel: NewAssessmentLabels, fieldLabel: NewAssessmentLabels) => {
    cy.finishedLoading();
    page.selectRandomOption(fieldLabel);
});

When("User clicks {string} button on Assessment Details page", (fieldLabel: NewAssessmentLabels) => {
    const fieldOption = page.getUIElementFor(fieldLabel);
    cy.get(fieldOption.selector)
        .contains(fieldOption.text)
        .click({force: true});
});

When("User clicks {string} button on confirmation modal", (fieldLabel: NewAssessmentLabels) => {
    const fieldOption = page.getUIElementFor(fieldLabel);
    page.interceptCreateAssessment();
    cy.get(`.mat-dialog-container ${fieldOption.selector}`)
        .contains(fieldOption.text)
        .click({force: true});
    cy.wait("@createAssessment");
});

When("User views 'Assessments landing page'", () => {
    cy.finishedLoading();
    cy.url().should('include', NewAssessmentMetadata.Intercepts.AssessmentsLandingPage); 
});

When("User types remembered {string} value in {string}", (fieldLabel: NewAssessmentLabels, elementLabel: NewAssessmentLabels) => {
    const assessment = page.getFieldValueFromLabel(fieldLabel);
    const uiOption = page.getUIElementFor(elementLabel);
    cy.get(uiOption.selector).clear().type(assessment);
});

When("User clicks {string} button on 'Assessment Name' engagement", (elementLabel: NewAssessmentLabels) => {
    cy.get(AgGridSelectors.AgBodyViewPort)
        .scrollTo("right", { ensureScrollable: false }) 
    const uiOption = page.getUIElementFor(elementLabel);
    cy.get(uiOption.selector).contains(uiOption.text).click({force: true});
});

When("User clicks {string} button", (elementLabel: NewAssessmentLabels) => {
    const uiOption = page.getUIElementFor(elementLabel);
    cy.get(uiOption.selector).contains(uiOption.text).click({force: true});
    cy.finishedLoading();
    cy.wait("@userDetails");
    cy.wait("@accountDetails");
});

When("Test remembers {string} value as {string}", (elementLabel: NewAssessmentLabels, fieldLabel: NewAssessmentLabels) => {
    page.storeValue(elementLabel, fieldLabel);
});

Then("Test remembered value {string} equals {string} value", (fieldLabel: NewAssessmentLabels, elementLabel: NewAssessmentLabels) => {
    page.validateStoredValue(fieldLabel, elementLabel);
});
