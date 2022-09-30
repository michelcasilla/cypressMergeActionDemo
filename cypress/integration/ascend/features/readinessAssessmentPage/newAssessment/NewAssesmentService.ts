import { NewAssessmentLabels } from "../../../interfaces/ReadinessAssessmentTypes";
import { UIOption } from "../../../interfaces/UIOptionTypes";


export const NewAssessmentMetadata = {
    Intercepts : {
        AccountDetails: '/v1/engagement/accountdetails',
        UserDetails: '/v1/users/userdetails/*',
        SaveUser: '/v1/users/save/*',
        CreateAssessment: '/v1/readinessassessment/create',
        AssessmentsLandingPage: '/a-scend/projects/assessment/dashboard',
        HomePage: '/a-scend/landing-page/dashboard'
    },
    Ui : {
        MatSelectPanel: '.mat-select-panel-wrap',
        MatSelectOption: '.mat-option',
        FormClientSelector: 'mat-select[formcontrolname="client"]',
        [NewAssessmentLabels.NewEngagement]: {
            selector: '.new-engagement-button'
        } as UIOption,
        [NewAssessmentLabels.ReadinessAssessment]: {
            selector: '.mat-menu-item',
            text: 'Readiness Assessment'
        } as UIOption,
        [NewAssessmentLabels.ClientField]: {
            selector: '[formcontrolname="client"]',
        } as UIOption,
        [NewAssessmentLabels.ShortNameField]: {
            selector: 'input[formcontrolname="shortName"]',
        } as UIOption,
        [NewAssessmentLabels.ContactField]: {
            selector: '[formcontrolname="engagementContact"] input',
        } as UIOption,
        [NewAssessmentLabels.DragAndDrop]: {
            selector: '.upload-div .upload-text-link',
        } as UIOption,
        [NewAssessmentLabels.ClientLogoInput]: {
            selector: 'input[type="file"]',
        } as UIOption,
        [NewAssessmentLabels.ClientLogoField]: {
            selector: 'img.client-logo',
        } as UIOption,
        [NewAssessmentLabels.ExistingClientLogo]: {
            selector: 'img.client-logo',
        } as UIOption,
        [NewAssessmentLabels.EditPencilIcon]: {
            selector: '.client-logo-preview .edit-logo-icon',
        } as UIOption,
        [NewAssessmentLabels.AuditorAssistedField]: {
            selector: '.mat-slide-toggle input[type="checkbox"]',
        } as UIOption,
        [NewAssessmentLabels.AssessmentField]: {
            selector: 'mat-select[formcontrolname="salesforceProjects"]'
        } as UIOption,
        [NewAssessmentLabels.YearField]: {
            selector: 'mat-select[formcontrolname="year"]'
        } as UIOption,
        [NewAssessmentLabels.AssessmentNameField]: {
            selector: 'input[formcontrolname="engagementName"]'
        } as UIOption,
        [NewAssessmentLabels.VersionField]: {
            selector: 'mat-select[formcontrolname="version"]'
        } as UIOption,
        [NewAssessmentLabels.CategoriesField]: {
            selector: 'mat-select[formcontrolname="category"].mat-select-multiple'
        } as UIOption,
        [NewAssessmentLabels.ExecutiveField]: {
            selector: 'mat-select[formcontrolname="executiveNames"]'
        } as UIOption,
        [NewAssessmentLabels.PracticeLeadField]: {
            selector: 'mat-select[formcontrolname="practiceLeadNames"]'
        } as UIOption,
        [NewAssessmentLabels.ManagerField]: {
            selector: 'mat-select[formcontrolname="managerNames"]'
        } as UIOption,
        [NewAssessmentLabels.ConsultantField]: {
            selector: 'mat-select[formcontrolname="consultantsNames"]'
        } as UIOption,
        [NewAssessmentLabels.Publish]: {
            selector: 'button',
            text: 'Publish'
        } as UIOption,
        [NewAssessmentLabels.SearchBar]: {
            selector: 'app-searchbox input',
        } as UIOption,
        [NewAssessmentLabels.Manage]: {
            selector: 'button',
            text: 'Manage'
        } as UIOption,
        [NewAssessmentLabels.Continue]: {
            selector: '.mat-dialog-container button',
            text: 'Continue'
        } as UIOption,
    }
}

export class NewAssessmentService {
    fieldValues: { [key in NewAssessmentLabels]?: string} = {};

    get clientSelector(): Cypress.Chainable<JQuery<HTMLElement>>{
       return cy.get(NewAssessmentMetadata.Ui.FormClientSelector);
    }

    interceptAccountDetails(): NewAssessmentService {
        cy.intercept({
            pathname: NewAssessmentMetadata.Intercepts.AccountDetails
        }).as('accountDetails')
        return this;
    }
    interceptUserDetails(): NewAssessmentService {
        cy.intercept({
            pathname: NewAssessmentMetadata.Intercepts.UserDetails
        }).as('userDetails')
        return this;
    }
    interceptSaveUser(): NewAssessmentService {
        cy.intercept({
            pathname: NewAssessmentMetadata.Intercepts.SaveUser
        }).as('saveUser')
        return this;
    }
    interceptCreateAssessment(): NewAssessmentService {
        cy.intercept({
            pathname: NewAssessmentMetadata.Intercepts.CreateAssessment
        }).as('createAssessment')
        return this;
    }
  
    getUIElementFor(key: NewAssessmentLabels): UIOption {
        try{
            const uiElements = NewAssessmentMetadata.Ui[key];
            return uiElements;
        }catch(e){
            throw "Key is not defined";
        }
    }

    getFieldValueFromLabel(key: NewAssessmentLabels): string {
        return this.fieldValues[key];
    }

    generateRandomString(): string {
        return (Math.random() + 1).toString(36).substring(7);
    }

    selectRandomOption(fieldLabel: NewAssessmentLabels, selection?: string): NewAssessmentService {
        const fieldOption = this.getUIElementFor(fieldLabel);
        cy.get(fieldOption.selector).click({force: true});
        cy.get(NewAssessmentMetadata.Ui.MatSelectPanel)
            .find(NewAssessmentMetadata.Ui.MatSelectOption)
            .then(($list)=> {
                const isMultiple = fieldOption.selector.includes('mat-select-multiple');
                if ((isMultiple && $list.length > 1) || !isMultiple) {
                    const random = Math.floor(Math.random() * $list.length)
                    const selected = cy.wrap(selection ?? $list[random]);
                    selected.scrollIntoView().click({force: true});
                }
            });
        cy.get('.cdk-overlay-backdrop').click({force: true, multiple: true}); // Close select overlay
        return this;
    }

    uploadFile(fileName: string): NewAssessmentService {
        const option = this.getUIElementFor(NewAssessmentLabels.ClientLogoInput);
        cy.get(option.selector)
        .selectFile(`cypress/fixtures/${fileName}`, {force: true});
        return this;
    }

    validateStoredValue(fieldLabel: NewAssessmentLabels, elementLabel: NewAssessmentLabels): NewAssessmentService {
        const fieldValue = this.getFieldValueFromLabel(fieldLabel);
        const option = this.getUIElementFor(elementLabel);
        const element = cy.get(option.selector);
        if (option.selector.includes('input')) {
            element.should('have.value', fieldValue);
        } else if (option.selector.includes('img')) {
            element.invoke('attr', 'src').should('contain', fieldValue);
        } else {
            element.contains(fieldValue);
        }

        return this;
    }

    storeValue(elementLabel: NewAssessmentLabels, fieldLabel: NewAssessmentLabels): NewAssessmentService {
        const uiOption = this.getUIElementFor(elementLabel);
        const $element = Cypress.$(uiOption.selector);
        if (uiOption.selector.includes('input')) {
            this.fieldValues[fieldLabel] = $element.val().toString();
        } else if (uiOption.selector.includes('img')) {
            let src = $element.attr('src');
            if (src.includes('profile_')) {
                src = src.split('profile_')[0];
            }
            this.fieldValues[fieldLabel] = src;
        } else {
            this.fieldValues[fieldLabel] = $element.text();
        }
        return this;
    }
}