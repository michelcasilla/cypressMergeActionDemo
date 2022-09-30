import { ExistingengagementService } from "../../ExistingEngagementService";

export const PendingEngagementMetadata = {
    Intercepts: {
		EngagementDetails: "v1/engagement/details/*",
		EngagementRequest: "v1/engagement/requests/*"
	},
    Ui: {
		AppEngagementServices: "app-engagement-services",
		AppEngagementServicesButtons: "app-engagement-services button",
		AppEngagementServicesDisabledButtons: "app-engagement-services button.mat-button-disabled",
		AppConfirmDialog : "app-confirm-dialog",
		AppConfirmDialogButtons : "app-confirm-dialog button",
		AppEngagementCriteriaDialog: "app-engagement-criteria-dialog",
		AppEngagementCriteriaDialogConsultants: 'app-engagement-criteria-dialog [formarrayname="users"] [type="checkbox"]',
		AppEngagementCriteriaDialogButtons: 'app-engagement-criteria-dialog button',
		AlignSnackBarSuccess: "align-snack-bar-success",
		AgRootWrapperBodycheckboxes : 'app-engagement-services .ag-center-cols-container [row-id]',
		AgRootWrapperBodyApplicableComponent : 'app-engagement-services .ag-center-cols-viewport .mat-slide-toggle-input',
		ConsultantIcon: "app-criteria-consultant-cell mat-icon",
		AppEngagementStepperButtons: 'app-engagement-stepper button',
		AppCriteriaConsultantCell : ".ag-center-cols-viewport app-criteria-consultant-cell",
		CriterionRequirementId : '[col-id="criterion.requirementId"]',
		RowId : "[row-id]",
		MatIcon : "mat-icon",
		RequestIdentifier: '[col-id="requestIdentifier"]',
		MatToggleSlideInput : 'mat-slide-toggle input'
	}
}

export class PendingEngagementService extends ExistingengagementService{

	public static instance: PendingEngagementService;

	get getAppEngagementServices(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppEngagementServices);
	}
	
	get getAppEngagementServicesCheckboxes(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AgRootWrapperBodycheckboxes);
	}
	
	get getAppEngagementServicesApplicableToggle(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AgRootWrapperBodyApplicableComponent);
	}
	
	get getAppEngagementServicesButtons(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppEngagementServicesButtons);
	}

	get getAppEngagementServicesDisabledButtons(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppEngagementServicesDisabledButtons);
	}

	get getAppConfirmDialog(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppConfirmDialog);
	}
	
	get getAppConfirmDialogButtons(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppConfirmDialogButtons);
	}
	
	get getAppEngagementCriteriaDialog(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppEngagementCriteriaDialog);
	}
	
	get getAppEngagementCriteriaDialogConsultants(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppEngagementCriteriaDialogConsultants);
	}
	
	get getAppEngagementCriteriaDialogButtons(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppEngagementCriteriaDialogButtons);
	}

	get getAlignSnackBarSuccess(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AlignSnackBarSuccess);
	}
	
	get getAppEngagementStepperButtons(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppEngagementStepperButtons);
	}
	
	get getAppCriteriaConsultantCell(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.AppCriteriaConsultantCell);
	}
	
	get getCriterionRequirementId(): Cypress.Chainable{
		return cy.get(PendingEngagementMetadata.Ui.CriterionRequirementId);
	}

	registerInterceptor(method: 'GET' | 'POST', name: string): Cypress.Chainable{
        return cy.intercept(method, PendingEngagementMetadata.Intercepts[name]).as(name);
    }

	public static getInstance(): PendingEngagementService{

        if(!PendingEngagementService.instance){
            PendingEngagementService.instance = new PendingEngagementService();
        }

        return PendingEngagementService.instance;

    }

}