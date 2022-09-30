import { Interception } from "cypress/types/net-stubbing";
import { ExistingengagementService } from "../ExistingEngagementService";

export const CompleteEngagementMetadata = {
    Intercepts: {
        LocationList: "/v1/locations/list*"
    },
    Ui: {
        ClientDropDown: 'app-dashboard-top-bar mat-select',
        AppAgEngagementsActionButtons : 'app-ag-engagements-action-button button',
        AppEngagementSearchbox: 'app-engagements app-searchbox input',
        AppDashboardButtons: 'app-dashboard button',
        AppConfirmDialogButtons: 'app-confirm-dialog button',
        CompleteEngagementButton: '[data-cy=dashboard__menu-complete-engagement]',
        MatMenuPanelTriggerIcon: "i.mat-menu-trigger",
        AppConfirmDialog: 'app-confirm-dialog',
        MatMenuPanelActions: ".mat-menu-content button",
        AppDashboardButton: "button.mat-primary",
        AlignSnackBar: "align-snack-bar-success",
       AppEngagementStatusSelect: "app-engagement-status-select"
    } 
}
export class CompleteEngagementService extends ExistingengagementService{

    public static instance: CompleteEngagementService;

    get clientDropdown(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.ClientDropDown);
    }
    get appEngagementSearchbox(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.AppEngagementSearchbox);
    }
    get appAgEngagementsActionButtons(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.AppAgEngagementsActionButtons);
    }
    get appDashboardButtons(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.AppDashboardButtons);
    }
    get appCompleteEngagementButton(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.CompleteEngagementButton);
    }
    get getAppEngagementStatusSelectMatTrigger(): Cypress.Chainable{
        return this.getAppEngagementStatusSelect.find(CompleteEngagementMetadata.Ui.MatMenuPanelTriggerIcon)
    }
    get appConfirmDialog(): Cypress.Chainable{
        return  cy.get(CompleteEngagementMetadata.Ui.AppConfirmDialogButtons);
    }
    get getMatMenuPanelActions(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.MatMenuPanelActions);
    }
    get appConfirmDialogModal(): Cypress.Chainable{
        return  cy.get(CompleteEngagementMetadata.Ui.AppConfirmDialog);
    }
    get getAppDashboardButtons(): Cypress.Chainable{
        return this.getAppDashboard.find(CompleteEngagementMetadata.Ui.AppDashboardButton);
    }
    get getSnackBar(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.AlignSnackBar);
    }
    get getEngagementStatusSelect(): Cypress.Chainable{
        return cy.get(CompleteEngagementMetadata.Ui.AppEngagementStatusSelect);
    }

    public static getInstance(): CompleteEngagementService{

        if(!CompleteEngagementService.instance){
            CompleteEngagementService.instance = new CompleteEngagementService();
        }
        return CompleteEngagementService.instance;
    }
}