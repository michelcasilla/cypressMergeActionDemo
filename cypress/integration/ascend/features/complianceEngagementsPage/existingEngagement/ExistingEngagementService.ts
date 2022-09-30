import { Interception } from "cypress/types/net-stubbing";
import { CustomObjectRequest, CustomObjectResponse } from "../../../interfaces/CustomObjectInterface";
import { UIOption } from "../../../interfaces/UIOptionTypes";
import { getUIElement } from "../../../../../helpers/commonActionHelper";
import { ExistingEngagementLabels } from "../ComplianceEngagementTypes";

export const ExistingengagementMetadata = {
    Intercepts: {
        LocationList: "/v1/locations/list*",
        ProjectRequests: 'v1/requests/projectrequests/*',
        CustomObjects: "/v1/custom/objects/*",
        PeriodicRates: "v1/periodicrates/*"
    },
    Ui: {
        AppDashboard: "app-dashboard",
        AppAuditMilestones: "app-audit-milestones",
        ClientDropDown: 'app-dashboard-top-bar mat-select',
        AppInformativeDialogButtons: 'app-informative-dialog button',
        AppAgEngagementsActionButtons : 'app-ag-engagements-action-button button',
        AppConfirmDialog: 'app-confirm-dialog',
        AppConfirmDialogButtons: 'app-confirm-dialog button',
        AppEngagementDetails: 'app-engagement-details',
        AppEngagementDetailsEdit: 'app-engagement-details-edit',
        AppEngagementDetailsEditClientDropDown: '[formcontrolname="client"]',
        AppEngagementDetailsEditShortName: '[formcontrolname="shortName"]',
        AppEngagementDetailsEditContactDropDown: '[formcontrolname="engagementContact"]',
        ContactDropDownList: '[role="listbox"]',
        ClientLogo: '.engagement-details_logo',
        ClientLogoEditPencil : '.client-logo-preview .edit-logo-icon',
        EngagementYear: '[formcontrolname="year"]',
        EngagementName: '[formcontrolname="engagementName"]',
        AppEngagementSearchbox: 'app-engagements app-searchbox input',
        AppEngagementStepper: 'app-engagement-stepper',
        MatStepHeader: 'mat-step-header',
        EngagementStepperHeader: 'mat-step-header',
        AppEnwizardStep2Milestones: 'app-enwizard-step2-milestones',
        AppEnwizardStep2MilestonesButtons: 'app-enwizard-step2-milestones button',
        AddLocationField: '[formcontrolname="locationName"]',
        AppEngagementLocation: "app-engagement-location",
        LocationList: "mat-chip-list",
        AppEngagementPeriodicRates: "app-engagement-periodic-rates",
        AppEngagementLocationDeleteDialog: "app-engagement-location-delete-dialog",
        AppEngagementLocationRenameDialog: "app-engagement-location-rename-dialog",
        AppKanbanCards: "app-kanban",
        AppRequestManagement: "app-request-management",
        KanbanColumnOpen: ".kanban-column_open app-cards",
        KanbanColumnInProgress: ".kanban-column_in-progress app-cards",
        KanbanColumnActionRequired: ".kanban-column_action-required app-cards",
        KanbanColumnSubmitted: ".kanban-column_submitted app-cards",
        KanbanColumnAccepted: ".kanban-column_accepted app-cards",
        MilestonesList : "[formarrayname='milestones'] .service-milestones_project-milestones--row",
        MilestoneNameSelector : '.service-milestones_project-milestones--milestone-name',
        MilestoneMatToggle : 'mat-slide-toggle',
        MilestoneMatToggleChecked : 'mat-slide-toggle.mat-checked',
        MilestoneMatCaption : '.milestone .mat-caption',
        MilestoneMatBody: '.service-milestones_project-milestones--milestone-name.mat-body-2',
        MatSlideToggle : "mat-slide-toggle",
        AppEngagementStatusSelect: "app-engagement-status-select",
        AppDashboardButtons: "button.mat-primary",
        MatMenuPanelTrigger: "button.mat-menu-trigger",
        MatMenuPanelTriggerIcon: "i.mat-menu-trigger",
        MatMenuPanel: ".mat-menu-panel",
        MatMenuPanelActions: ".mat-menu-content button",
        TableData: 'ag-grid-angular.compliance',
        StatusDropdownList: '.custom-dropdown-container_status',
        AppRequestDialog : "app-request-dialog",
        DisabledButtons : "button.mat-button-disabled",
        AppRequestDialogStatus : "app-ag-status-selector mat-chip-list mat-chip",
        AppSearchboxInput : "app-searchbox input",
        SelectAllCheckBox : ".upload-container_file-list--select-all-checkbox",
        AllAECRequest : '[mattooltip="Collect All AEC Requests"]',
        CustomRequestButtons : "custom-request button",
        CustomRequestDisabledButtons : "custom-request button.mat-button-disabled",
        CustomRequestActionIcons: ".custom-request-container_add-request-page_action-icons",
        AddCustomRequest: "add-custom-request",
        DisabledIcons : "i.icon-disabled",
        AppAssignments : "app-assignments",
        AppAssignUsersIcon: "app-assign-users-ag-grid mat-icon",
        AppEvidence : "app-evidence",
        AgGridAngular : "ag-grid-angular",
        AppEvidenceButtons : "app-evidence button",
        DatePickerToggle: ".mat-datepicker-toggle",
        FormField: ".mat-form-field",
        MatOption: ".mat-option",
        OverlayBackdrop: ".cdk-overlay-backdrop",
        CalendarDaySelector: ".monthly-day-selector_days-of-month_week-container_day-container--item",
        DatePickerCalendar: ".mat-calendar-table",
        DatePickerCell: ".mat-calendar-body-cell",
        AppWarningDialogButtons: 'app-warning-dialog button',
        AppEngagementServices: "app-engagement-services",
        AppCriteriaConsultantIcons: "app-criteria-consultant-cell .mat-icon",
        AppEngagementServiceTableToggleRows: 'app-ag-toggle-switch mat-slide-toggle',
        AppEngagementServiceDatepickerToggleButton: 'app-grid-date-editor mat-datepicker-toggle button',
        AppEngagementSummaryEngagementContainerHeader: '[data-cy=engagement-summary__engagement-container] mat-expansion-panel-header',
        AppEngagementSummaryServicesContainerHeader: '[data-cy=engagement-summary__services-container] mat-expansion-panel-header',
        "add location" : {
            selector : '[mattooltip="Add Location"]',
            text : "add_location_alt",
            icon : "add_location_alt"
        } as UIOption,
        "ellipses" : {
            selector : '[mattooltip="More Options"]',
            text : "more_vert",
            icon : "more_vert"
        } as UIOption,
        "No Custom requests to display" : {
            selector : 'custom-request-splash-page',
            text : "No Custom requests to display"
        } as UIOption,
        "Collect All AEC Requests" : {
            text : "astrophotography_auto"
        } as UIOption,
        "Link" : {
            text : "Link"
        } as UIOption,
        "Link/Unlink" : {
            text : "edit"
        } as UIOption,
        AppDeleteDialog: 'app-delete-dialog',
        AppDeleteDialogButton: 'app-delete-dialog button',
        [ExistingEngagementLabels.SelectedEngagementName]: {
            selector: 'input[formcontrolname="engagementName"]'
        },
        [ExistingEngagementLabels.ShortName]: {
            selector: '[data-cy=engagement-details-edit__short-name] input'
        },
        [ExistingEngagementLabels.SamplePeriodStartDate]: {
            selector: 'input[formcontrolname="startDate"]'
        },
        [ExistingEngagementLabels.SamplePeriodEndDate]: {
            selector: 'input[formcontrolname="endDate"]'
        },
        [ExistingEngagementLabels.Quarterly]: {
            selector: 'mat-select[formcontrolname="quarterly"]'
        },
        [ExistingEngagementLabels.Monthly]: {
            selector: 'mat-select[formcontrolname="monthly"]'
        },
        [ExistingEngagementLabels.Weekly]: {
            selector: 'mat-select[formcontrolname="weekly"]'
        },
        [ExistingEngagementLabels.Calendar]: {
            selector: 'app-yearly-day-selector'
        },
        MatChip : 'mat-chip',

        [ExistingEngagementLabels.Client]: {
            selector: '[data-cy=engagement-details-edit__client]'
        },
        [ExistingEngagementLabels.EngagementContact]: {
            selector: '[data-cy=engagement-details-edit__engagement-contact] input'
        },
        [ExistingEngagementLabels.ClientLogo]: {
            selector: '.engagement-details_logo .edit-logo-icon'
        },
        [ExistingEngagementLabels.AddCustomService]: {
            selector: '[data-cy=engagement-details-edit__add-custom-service]'
        },
        [ExistingEngagementLabels.AddProject]: {
            selector: '[data-cy=engagement-details-edit__add-project]'
        },
        [ExistingEngagementLabels.Year]: {
            selector: '[data-cy=engagement-details-edit__year]'
        },
        [ExistingEngagementLabels.EngagementName]: {
            selector: '[data-cy=engagement-details-edit__engagementName] input'
        },
        [ExistingEngagementLabels.LinkedPriorEngagement]: {
            selector: '[data-cy=engagement-details-edit__linkedPriorEngagement] input'
        },
        [ExistingEngagementLabels.Version]: {
            selector: '[data-cy=service-details-edit__version]'
        },
        [ExistingEngagementLabels.Executives]: {
            selector: '[data-cy=service-details-edit__executives]'
        },
        [ExistingEngagementLabels.Family]: {
            selector: '[data-cy=service-details-edit__family]'
        },
        [ExistingEngagementLabels.PracticeLeads]: {
            selector: '[data-cy=service-details-edit__practiceLeads]'
        },
        [ExistingEngagementLabels.Managers]: {
            selector: '[data-cy=service-details-edit__managers]'
        },
        [ExistingEngagementLabels.Consultants]: {
            selector: '[data-cy=service-details-edit__consultants]'
        },
        [ExistingEngagementLabels.Cycle]: {
            selector: '[data-cy=service-details-edit__cycle]'
        },
        [ExistingEngagementLabels.Level]: {
            selector: '[data-cy=service-details-edit__level]'
        },
        [ExistingEngagementLabels.AddLocation]: {
            selector: '[data-cy=engagement-location__add-location]'
        },
        [ExistingEngagementLabels.SaveLocations]: {
            selector: '[data-cy=engagement-location__save-locations]'
        },
        [ExistingEngagementLabels.SavedLocations]: {
            selector: '[data-cy=engagement-location__locations-list] mat-icon-button'
        },
        [ExistingEngagementLabels.Category]: {
            selector: '[data-cy=add-custom-request__category] input'
        },
        [ExistingEngagementLabels.RequestType]: {
            selector: '[data-cy=add-custom-request__request-type] input'
        },
        [ExistingEngagementLabels.Description]: {
            selector: '[data-cy=add-custom-request__description]'
        },
        [ExistingEngagementLabels.Criteria]: {
            selector: '[data-cy=add-custom-request__criteria] input'
        },
        [ExistingEngagementLabels.DueDate]: {
            selector: '[data-cy=add-custom-request__due-date] input'
        },
        [ExistingEngagementLabels.SelectLocation]: {
            selector: '[data-cy=add-custom-request__location] input'
        },
        [ExistingEngagementLabels.CreateCustomRequest]: {
            selector: '[data-cy=custom-request__create-custom-request-button]'
        },
        [ExistingEngagementLabels.MassUpload]: {
            selector: '[data-cy=custom-request__mass-upload-button]'
        },
        [ExistingEngagementLabels.CreateCustomRequests]: {
            selector: '[data-cy=custom-request-splash-page__create-custom-requests-button]'
        },
        [ExistingEngagementLabels.RollForwardCustomRequests]: {
            selector: '[data-cy=custom-request-splash-page__roll-forward-custom-requests]'
        },
        [ExistingEngagementLabels.ExportCustomRequests]: {
            selector: '[data-cy=custom-request-splash-page__export-custom-requests]'
        },
        [ExistingEngagementLabels.MassUploadSplash]: {
            selector: '[data-cy=custom-request-splash-page__mass-upload-button]'
        },
        [ExistingEngagementLabels.AssignConsultant]: {
            selector: '[data-cy=engagement-service-criteria__assign-consultant-button]'
        },
        [ExistingEngagementLabels.ManageLocations]: {
            selector: '[data-cy=engagement-service-requests__manage-locations-button]'
        },
        [ExistingEngagementLabels.ServiceRequestsToggleSelected]: {
            selector: '[data-cy=engagement-service-requests__toggle-icon]'
        },
        [ExistingEngagementLabels.ServiceRequestsEllipsisDropdown]: {
            selector: '[data-cy=engagement-service-requests__ellipsis]'
        },
        [ExistingEngagementLabels.AutoAssignRolled]: {
            selector: '[data-cy=engagement-service-requests__auto-assign-rolled-button]'
        },
        [ExistingEngagementLabels.AutoAssignRoll]: {
            selector: '[data-cy=engagement-service-requests__auto-assign-roll-button]'
        },
        [ExistingEngagementLabels.LocationColumnPencil]: {
            selector: '[data-cy=ag-location-selection__pencil]'
        },
        [ExistingEngagementLabels.ManageDates]: {
            selector: '[data-cy=engagement-service-dates__manage-dates-button]'
        },
        [ExistingEngagementLabels.Approve]: {
            selector: '[data-cy=engagement-service-dates__approve-button]'
        },
        [ExistingEngagementLabels.Publish]: {
            selector: '[data-cy=engagement-summary__publish-button]'
        },
        [ExistingEngagementLabels.Open]: {
            selector: 'app-ag-grid-button button',
            text: ExistingEngagementLabels.Open
        },
        [ExistingEngagementLabels.ServiceHeaderIcon]: {
            selector: '.ag-header-icon',
        },
        [ExistingEngagementLabels.FamilyVersionHeaderIcon]: {
            selector: '.ag-header-icon',
        },
        [ExistingEngagementLabels.FieldDateHeaderIcon]: {
            selector: '.ag-header-icon',
        },
        [ExistingEngagementLabels.ExecutiveHeaderIcon]: {
            selector: '.ag-header-icon',
        },
        [ExistingEngagementLabels.PracticeLeadHeaderIcon]: {
            selector: '.ag-header-icon',
        },
        [ExistingEngagementLabels.ManagerHeaderIcon]: {
            selector: '.ag-header-icon',
        },
        [ExistingEngagementLabels.ConsultantHeaderIcon]: {
            selector: '.ag-header-icon',
        },
        [ExistingEngagementLabels.StatusHeaderIcon]: {
            selector: '.ag-header-icon',
        },

        [ExistingEngagementLabels.ServiceFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Service'
        },
        [ExistingEngagementLabels.FamilyVersionFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Family/Version'
        },
        [ExistingEngagementLabels.FieldDateFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Field Date'
        },
        [ExistingEngagementLabels.ExecutiveFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Executive'
        },
        [ExistingEngagementLabels.PracticeLeadFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Practice Lead'
        },
        [ExistingEngagementLabels.ManagerFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Manager'
        },
        [ExistingEngagementLabels.ConsultantFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Consultant'
        },
        [ExistingEngagementLabels.StatusFilter]: {
            selector: '.ag-header-cell-label',
            text: 'Status'
        },
    }
}
export class ExistingengagementService{

    public static instance: ExistingengagementService;

    get clientDropdown(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.ClientDropDown);
    }

    get getAppWarningDialogButtons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppWarningDialogButtons);
    }

    get appInformativeDialogButtons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppInformativeDialogButtons);
    }

    get appAgEngagementsActionButtons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppAgEngagementsActionButtons);
    }

    get appConfirmDialogModal(): Cypress.Chainable{
        return  cy.get(ExistingengagementMetadata.Ui.AppConfirmDialog);
    }
    
    get getAppDeleteDialogButtons(): Cypress.Chainable{
        return  cy.get(ExistingengagementMetadata.Ui.AppDeleteDialogButton);
    }
    
    get appConfirmDialog(): Cypress.Chainable{
        return  cy.get(ExistingengagementMetadata.Ui.AppConfirmDialogButtons);
    }

    get getAppConfirmDialogButtons(): Cypress.Chainable{
		return cy.get(ExistingengagementMetadata.Ui.AppConfirmDialogButtons);
	}

    get appEngagementDetails(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementDetails);
    }

    get appEngagementDetailsEdit(): Cypress.Chainable{
        return this.appEngagementDetails.find(ExistingengagementMetadata.Ui.AppEngagementDetailsEdit);
    }
    
    get appEngagementDetailsEditClientDropDown(): Cypress.Chainable{
        return this.appEngagementDetailsEdit.find(ExistingengagementMetadata.Ui.AppEngagementDetailsEditClientDropDown);
    }
    
    get appEngagementDetailsEditShortName(): Cypress.Chainable{
        return this.appEngagementDetailsEdit.find(ExistingengagementMetadata.Ui.AppEngagementDetailsEditShortName);
    }
    
    get appEngagementDetailsEditContactDropDown(): Cypress.Chainable{
        return this.appEngagementDetailsEdit.find(ExistingengagementMetadata.Ui.AppEngagementDetailsEditContactDropDown);
    }

    get contactDropDownList(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.ContactDropDownList);
    }
    
    get clientLogo(): Cypress.Chainable{
        return this.appEngagementDetailsEdit.find(ExistingengagementMetadata.Ui.ClientLogo);
    }

    get clientLogoEditPencil(): Cypress.Chainable{
        return this.appEngagementDetailsEdit.find(ExistingengagementMetadata.Ui.ClientLogoEditPencil);
    }
    
    get engagementYear(): Cypress.Chainable{
        return this.appEngagementDetailsEdit.find(ExistingengagementMetadata.Ui.EngagementYear);
    }
    
    get engagementName(): Cypress.Chainable{
        return this.appEngagementDetailsEdit.find(ExistingengagementMetadata.Ui.EngagementName);
    }

    get closeAndSaveButton(): Cypress.Chainable{
        return this.engagementStepper.find('button').contains('Save & Close');
    }
    
    get nextStepButton(): Cypress.Chainable{
        return this.engagementStepper.find('button').contains('Next Step');
    }
    
    get closeStepButton(): Cypress.Chainable{
        return this.engagementStepper.find('button').contains('Close');
    }

    get engagementStepper(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementStepper);
    }
    
    get engagementStepperHeader(): Cypress.Chainable{
        return this.engagementStepper.find(ExistingengagementMetadata.Ui.MatStepHeader);
    }
    
    get engagementStepperButtons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementStepper).find('button');
    }
    
    get appEngagementSearchbox(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementSearchbox);
    }
    
    get addLocationField(): Cypress.Chainable{
        return this.engagementStepper.find(ExistingengagementMetadata.Ui.AddLocationField);
    }

    get appEnwizardStep2Milestones(): Cypress.Chainable{
        return this.engagementStepper.find(ExistingengagementMetadata.Ui.AppEnwizardStep2Milestones);
    }
    
    get appEnwizardStep2MilestonesButtons(): Cypress.Chainable{
        return this.engagementStepper.find(ExistingengagementMetadata.Ui.AppEnwizardStep2MilestonesButtons);
    }

    get appEngagementLocation(): Cypress.Chainable{
        return this.engagementStepper.find(ExistingengagementMetadata.Ui.AppEngagementLocation);
    }
    
    get editLocationList(): Cypress.Chainable{
        return this.appEngagementLocation.find(ExistingengagementMetadata.Ui.LocationList);
    }
    
    get appEngagementPeriodicRates(): Cypress.Chainable{
        return this.engagementStepper.find(ExistingengagementMetadata.Ui.AppEngagementPeriodicRates);
    }
    
    get appEngagementLocationDeleteDialog(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementLocationDeleteDialog);
    }
    
    get appEngagementLocationRenameDialog(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementLocationRenameDialog);
    }
    
    get getAppKanban(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppKanbanCards)
    }
    
    get getAppRequestManagement(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppRequestManagement)
    }
    
    get getAllAECRequest(): Cypress.Chainable{
        return this.getAppRequestManagement.find(ExistingengagementMetadata.Ui.AllAECRequest);
    }
    
    get getCustomRequestButtons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.CustomRequestButtons);
    }
    get getCustomRequestDisabledButtons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.CustomRequestDisabledButtons);
    }
    get getCustomRequestActionIcons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.CustomRequestActionIcons);
    }

    getUiOption(optionName: string): UIOption{
        return ExistingengagementMetadata.Ui[optionName];
    }

    waitOnApiCalls(): Cypress.Chainable{
        return cy.waitOnNetworkReq('v1','v1');
    }
    
    get getAppKanbanCards(): Cypress.Chainable{
        return cy.wait('@requests').wait(300).then(()=>{
            const selector = [
                ExistingengagementMetadata.Ui.KanbanColumnOpen,
                ExistingengagementMetadata.Ui.KanbanColumnInProgress,
                ExistingengagementMetadata.Ui.KanbanColumnActionRequired,
                ExistingengagementMetadata.Ui.KanbanColumnAccepted,
            ].join(", ")
            const requests  = Cypress.$(selector);
            return cy.wrap(requests);
        });
    }
    
    get getRequestsCardsOpenInProgressOrActionRequires(): Cypress.Chainable{
        return cy.wait('@requests').wait(300).then(()=>{
            const selector = [
                ExistingengagementMetadata.Ui.KanbanColumnOpen,
                ExistingengagementMetadata.Ui.KanbanColumnInProgress,
                ExistingengagementMetadata.Ui.KanbanColumnActionRequired
            ].join(", ")
            const requests  = Cypress.$(selector);
            return cy.wrap(requests);
        });
    }
    
    get getRequestsCardsAccepted(): Cypress.Chainable{
        return cy.wait('@requests').wait(300).then(()=>{
            const requests  = Cypress.$(`${ExistingengagementMetadata.Ui.KanbanColumnAccepted}`);
            return cy.wrap(requests);
        });
    }

    get getMilestonesList(): Cypress.Chainable{
        return this.appEnwizardStep2Milestones.find(ExistingengagementMetadata.Ui.MilestonesList);
    }
    
    get getMilestoneMatBody(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.MilestoneMatBody);
    }
    
    get getMatSlideToggle(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.MatSlideToggle);
    }
    
    get getAppDashboard(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppDashboard)
    }
    
    get getAppAuditMilestones(): Cypress.Chainable{
        return this.getAppDashboard.find(ExistingengagementMetadata.Ui.AppAuditMilestones);
    }

    get getAppEngagementStatusSelect(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementStatusSelect);
    }
    
    get getAppEngagementStatusSelectMataChip(): Cypress.Chainable{
        return this.getAppEngagementStatusSelect.find(ExistingengagementMetadata.Ui.MatChip);
    }
    
    get getAppEngagementStatusSelectMatTrigger(): Cypress.Chainable{
        return this.getAppEngagementStatusSelect.find(ExistingengagementMetadata.Ui.MatMenuPanelTriggerIcon)
    }
    
    get getAppDashboardButtons(): Cypress.Chainable{
        return this.getAppDashboard.find(ExistingengagementMetadata.Ui.AppDashboardButtons);
    }
    
    get getDashboardMatMenuPanel(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.MatMenuPanel);
    }
    
    get getMatMenuPanelTrigger(): Cypress.Chainable{
        return this.getAppDashboard.find(ExistingengagementMetadata.Ui.MatMenuPanelTrigger);
    }
    
    get getMatMenuPanelActions(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.MatMenuPanelActions);
    }

    get getAppRequestDialog(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppRequestDialog);
    }

    get getSelectAllCheckBox(): Cypress.Chainable{
        return this.getAppRequestDialog.find(ExistingengagementMetadata.Ui.SelectAllCheckBox);
    }
    
    get getAppRequestDialogDisabledButtons(): Cypress.Chainable{
        return this.getAppRequestDialog.find(ExistingengagementMetadata.Ui.DisabledButtons);
    }
    
    get getAppKanbanDisabledButtons(): Cypress.Chainable{
        return this.getAppRequestManagement.find(ExistingengagementMetadata.Ui.DisabledButtons);
    }
    
    get getAppRequestDialogStatus(): Cypress.Chainable{
        return this.getAppRequestDialog.find(ExistingengagementMetadata.Ui.AppRequestDialogStatus);
    }
    
    get getAppSearchboxInput(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppSearchboxInput);
    }
    
    get getAppAssignments(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppAssignments);
    }
    
    get getAppAssignmentsDisabledButtons(): Cypress.Chainable{
        return this.getAppAssignments.find(ExistingengagementMetadata.Ui.DisabledButtons);
    }
    
    get getAppAssignmentsIcons(): Cypress.Chainable{
        return this.getAppAssignments.find(ExistingengagementMetadata.Ui.AppAssignUsersIcon).contains('groups');
    }
    
    get getCustomObjectsRequests(): Cypress.Chainable<CustomObjectRequest[]>{
        return cy.wait('@CustomObjects').then((rsp: Interception)=>{
            const customObjects: CustomObjectResponse = rsp.response.body;
            return cy.wrap(customObjects.requests || []);
        })
    }
    
    get getAppEvidence(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEvidence);
    }
    
    get getAppEvidenceGrids(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AgGridAngular);
    }
    
    get getAppEvidenceButtons(): Cypress.Chainable{
        return this.getAppEvidence.find(ExistingengagementMetadata.Ui.AppEvidenceButtons);
    }
    
    get getAppEvidenceDisabledButtons(): Cypress.Chainable{
        return this.getAppEvidence.find(ExistingengagementMetadata.Ui.DisabledButtons);
    }

    get getEvidenceAllAECRequestIcon(): Cypress.Chainable{
        return this.getAppEvidence.find(ExistingengagementMetadata.Ui.AllAECRequest);
    }

    get getDisabledIcons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.DisabledIcons)
    }

    registerInterceptor(method: 'GET' | 'POST', name: string): Cypress.Chainable{
        return cy.intercept(method, ExistingengagementMetadata.Intercepts[name]).as(name);
    }

    get locationList(): Cypress.Chainable{
        return cy.wait('@locationList').then((rsp: Interception)=>{
            cy.wrap(rsp.response.body);
        });
    }

    interceptLocationList(): ExistingengagementService{
        cy.intercept('GET', ExistingengagementMetadata.Intercepts.LocationList).as('locationList');
        return this;
    }

    public static getInstance(): ExistingengagementService{

        if(!ExistingengagementService.instance){
            ExistingengagementService.instance = new ExistingengagementService();
        }

        return ExistingengagementService.instance;

    }

    get tableData(): Cypress.Chainable<any> {
        return cy.get('body').then(($body) => {
            if ($body.find(ExistingengagementMetadata.Ui.TableData).length > 0) {
                return cy.get(ExistingengagementMetadata.Ui.TableData).getAgGridData();
            }
            return cy.wrap([]);
        });
    }

    get getStatusDropdownMenuList(): Cypress.Chainable {
        return cy.get(ExistingengagementMetadata.Ui.StatusDropdownList);
    }

    getUiOptionByLabel(label: ExistingEngagementLabels): UIOption {
        return ExistingengagementMetadata.Ui[label];
    }

    getValueFromLabel(elementLabel: ExistingEngagementLabels): Cypress.Chainable<string> {
        const option = this.getUiOptionByLabel(elementLabel);
        const element = getUIElement(option);

        return element.then($element => {
            let value: string;
            if (option.selector.includes("input")) {
                value = $element.val().toString();
            }
        
            if (option.selector.includes("mat-select")) {
                value = $element.text();
            }

            if (option.selector.includes("app-yearly-day-selector")) {
                value = $element.find('.day-selected').text();
            }

            return value;
        });
    }

    selectDateFromDatePicker(label: ExistingEngagementLabels, min: number = null): Cypress.Chainable<number> {
        const UI = ExistingengagementMetadata.Ui
        return cy.get(UI.FormField).contains(UI.FormField, label).within(() => {
            const picker = cy.get(UI.DatePickerToggle);
            picker.click({force: true});
        }).then(() => {
            const unselectedCell = `${UI.DatePickerCell}:not(.mat-calendar-body-active)`;
            return cy.get(`${UI.DatePickerCalendar} ${unselectedCell}`).its('length').then(elementCount => {
                let selected: number;
                if (min !== null) {
                    selected = Cypress._.random(min, elementCount - 1) as number;
                } else {
                    selected = Cypress._.random(elementCount - 1) as number;
                }
                cy.get(unselectedCell).eq(selected).click({ force: true });
                return cy.wrap(selected);
            });
        });

    }

    selectFromDropdown(label: ExistingEngagementLabels): ExistingengagementService {
        const option = this.getUiOptionByLabel(label);
        const element = getUIElement(option);
        element.click({force: true});
        let selected = false;
        cy.get(ExistingengagementMetadata.Ui.MatOption).each(option => {
            if (!selected && !option.hasClass('mat-selected')) {
                cy.wrap(option).click({force: true});
                selected = true;
            }
        }).then(() => {
            cy.get(ExistingengagementMetadata.Ui.OverlayBackdrop).first().click({force: true});
        });
        return this;
    }

    selectFromCalendar(): ExistingengagementService {
        const option = this.getUiOptionByLabel(ExistingEngagementLabels.Calendar);
        const element = getUIElement(option);
        element.within(() => {
            cy.get(`${ExistingengagementMetadata.Ui.CalendarDaySelector}:not(.disabled)`).first().click({force: true});
        });
        return this;
    }

    validateStoredValue(elementLabel: ExistingEngagementLabels, storedValue: string): ExistingengagementService {
        const option = this.getUiOptionByLabel(elementLabel);
        const element = getUIElement(option);
        if (option.selector.includes('input')) {
            element.should('have.value', storedValue);
        } else if (option.selector.includes('mat-select')) {
            element.should('contain', storedValue);
        } else if (option.selector.includes('app-yearly-day-selector')) {
            element.find('.day-selected').should('contain', storedValue);
        } else {
            element.contains(storedValue);
        }

        return this;
    }

    getAvailableDaysFromCalendar(): Cypress.Chainable {
        return cy.get(`${ExistingengagementMetadata.Ui.CalendarDaySelector}:not(.disabled):not(.read-only)`);
    }
    
    get appEngagementServicesButtons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementServices).find('button');
    }

    get appCriteriaConsultantIcons(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppCriteriaConsultantIcons);
    }

    get appEngagementServiceTableToggleRows(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementServiceTableToggleRows);
    }

    get appEngagementServiceDatepickerToggleButton(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementServiceDatepickerToggleButton);
    }

    get appEngagementSummaryEngagementContainerHeader(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementSummaryEngagementContainerHeader);
    }

    get appEngagementSummaryServicesContainerHeader(): Cypress.Chainable{
        return cy.get(ExistingengagementMetadata.Ui.AppEngagementSummaryServicesContainerHeader);
    }
    selectContact(): ExistingengagementService {
        this.contactDropDownList.find('mat-option').first().click({force: true});

        return this;
    }

    isPeriodicRatesCompleted(): Cypress.Chainable<boolean> {
        const rateFields = [
            'BeginningDate',
            'Daily',
            'EndingDate',
            'Monthly',
            'Quarterly',
            'Weekly',
        ]

        return cy.wait("@PeriodicRates").then(req => {
            const body = req.response?.body;
            return rateFields.reduce((result, field) => {
                return result && !!body[field];
            }, true);
        });
    }
}