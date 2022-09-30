import { NavigationLabels, RootNavigationItems } from "../../../interfaces/NavigationTypes";
import { UIOption } from "../../../interfaces/UIOptionTypes";
import { ComplianceEngagementsLabels, ComplianceEngagementsTableHeaders } from "../ComplianceEngagementTypes";

export const ComplianceEngagementsMetadata = {
    Title: 'Compliance Engagements',
    Intercepts: {
        Scopes: 'users/scopes',
        AccountOwner: 'homepage/accountowner',
        Engagement: 'engagement',
        AccountManagement: 'accountmanagement'
    },
    Ui: {
        NeedSupportIcon: 'mail',
        IconElement: 'i',
        ClientDropdow: 'app-dashboard-top-bar mat-label',
        ClientDropdowLabel: 'Client Name',
        ClientDropdowSearchBox: '.cdk-overlay-container input[placeholder="Search"]',
        ProfileMenuInfo: 'app-dashboard-top-bar .mat-menu-trigger',
        ProfileMenuOptions: 'app-user-options',
        SearchBar: 'app-engagements input[data-placeholder="Search"]',
        SearchMagnifier: 'search',
        OverlayBackdrop: '.cdk-overlay-backdrop-showing',
        HeaderCellLabel: '.ag-header-cell-label',
        TableCell: '.ag-cell',
        Button: 'button',
        ModalButton: '.mat-dialog-container button',
        TableData: 'ag-grid-angular.compliance',
        [ComplianceEngagementsLabels.NeedSupportOption] : {
            selector : 'app-dashboard-top-bar .support-text + i',
            text : 'Need Support'
        },
        [ComplianceEngagementsLabels.ClientNameDropdown] : {
            selector : 'app-dashboard-top-bar mat-form-field mat-select'
        },
        [ComplianceEngagementsLabels.ProfileDropdown] : {
            selector : 'app-dashboard-top-bar app-user-icon + i'
        },
        [ComplianceEngagementsLabels.SearchBar]: {
            selector: 'app-engagements input[data-placeholder="Search"]',
        },
        [ComplianceEngagementsLabels.SearchMagnifier]: {
            text: 'search',
        },
        [ComplianceEngagementsLabels.Select]: {
            selector: '.ag-cell button',
            text: ComplianceEngagementsLabels.Select,
        },
        [ComplianceEngagementsLabels.Manage]: {
            selector: '.ag-cell button',
            text: ComplianceEngagementsLabels.Manage,
        },
        [NavigationLabels.AccountQuestions] : {
            selector : 'app-dashboard-top-bar .material-icons-outlined',
            text : 'mail'
        },
    },
}

export class ComplianceEngagementLandingService {
    private _supportButton: Cypress.Chainable<JQuery<HTMLElement>>;
    private _clientNameList: Cypress.Chainable<JQuery<HTMLElement>>;
    private _profileMenuOptions: Cypress.Chainable<JQuery<HTMLElement>>;
    private _searchBar: Cypress.Chainable<JQuery<HTMLElement>>;
    private _searchMagnifier: Cypress.Chainable<JQuery<HTMLElement>>;

    get supportButton(): Cypress.Chainable<JQuery<HTMLElement>> {
        if (!this._supportButton) {
            this._supportButton = cy.elementContains(
                ComplianceEngagementsMetadata.Ui.IconElement,
                ComplianceEngagementsMetadata.Ui.NeedSupportIcon
            );
        }
        return this._supportButton;
    }
    get clientNameSearchBox(): Cypress.Chainable<JQuery<HTMLElement>> {
        if (!this._clientNameList) {
            this._clientNameList = cy.get(
                ComplianceEngagementsMetadata.Ui.ClientDropdowSearchBox
            );
        }
        return this._clientNameList;
    }
    get profileMenuOptions(): Cypress.Chainable<JQuery<HTMLElement>> {
        if (!this._profileMenuOptions) {
            this._profileMenuOptions = cy.get(
                ComplianceEngagementsMetadata.Ui.ProfileMenuOptions
            );
        }
        return this._profileMenuOptions;
    }
    get searchBar(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(
            ComplianceEngagementsMetadata.Ui.SearchBar
        );
    }
    get searchMagnifier(): Cypress.Chainable<JQuery<HTMLElement>> {
        if (!this._searchMagnifier) {
            this._searchMagnifier = cy.elementContains(
                ComplianceEngagementsMetadata.Ui.IconElement,
                ComplianceEngagementsMetadata.Ui.SearchMagnifier
            );
        }
        return this._searchMagnifier;
    }

    get tableData(): Cypress.Chainable<any> {
        return cy.get('body').then(($body) => {
            if ($body.find(ComplianceEngagementsMetadata.Ui.TableData).length > 0) {
                return cy.get(ComplianceEngagementsMetadata.Ui.TableData).getAgGridData();
            }
            return cy.wrap([]);
        });
    }

    openClientNameDropdown(): ComplianceEngagementLandingService {
        cy.clickElementContaining(
            ComplianceEngagementsMetadata.Ui.ClientDropdow,
            ComplianceEngagementsMetadata.Ui.ClientDropdowLabel
        );
        return this;
    }

    clickProfileMenu(): ComplianceEngagementLandingService {
        cy.get(ComplianceEngagementsMetadata.Ui.ProfileMenuInfo).click({force : true});

        return this;
    }

    closeOverlay(): ComplianceEngagementLandingService {
        cy.get(ComplianceEngagementsMetadata.Ui.OverlayBackdrop).first().click({force : true});

        return this;
    }

    getUiOptionByLabel(label: ComplianceEngagementsLabels): UIOption {
        return ComplianceEngagementsMetadata.Ui[label];
    }
    
    getTableHeader(label: ComplianceEngagementsTableHeaders): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.elementContains(ComplianceEngagementsMetadata.Ui.HeaderCellLabel, label);
    }

    filter(columnName: ComplianceEngagementsTableHeaders, filterValue: string): ComplianceEngagementLandingService {
        cy.finishedLoading();
        cy.wait("@userScopes");
        cy.get('body').then(($body) => {
            if ($body.find(ComplianceEngagementsMetadata.Ui.TableData).length > 0) {
                cy.get(ComplianceEngagementsMetadata.Ui.TableData)
                    .agGridColumnFilterCheckboxMenu({
                        searchCriteria:{
                            columnName,
                            filterValue
                        },
                        hasApplyButton: false,
                    });
            }
        });
        return this;
    }

    search(value: string): ComplianceEngagementLandingService {
        this.searchBar.type(value);
        return this;
    }

    clickManageEngagement(): ComplianceEngagementLandingService {
        cy.scrollTo("right", { ensureScrollable: false })
        const option = this.getUiOptionByLabel(ComplianceEngagementsLabels.Manage);
        const element = cy.get(option.selector).contains(option.text);
        element.click({force: true});

        return this;
    }

    clickContinueManageEngagement(): ComplianceEngagementLandingService {
        cy.get(ComplianceEngagementsMetadata.Ui.ModalButton).contains('Continue').click({force: true});

        return this;
    }
}
