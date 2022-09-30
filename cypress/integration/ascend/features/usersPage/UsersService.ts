import { faker } from "@faker-js/faker";
import { getAccount } from "../../../../helpers/environment";
import { RootNavigationItems, ComplianceEngagementNavigationItems, ReadinessAssessmentNavigationItems } from "../../interfaces/NavigationTypes";
import { UserLandingAgGridHeadColumns, UserLandingAgGridHeadColumnsTypes } from "../../interfaces/UserLandingAgGridHeadColumnsTypes";
import { UIOption } from "../../interfaces/UIOptionTypes";
import { UserType } from "../../interfaces/UserTypeInterfaces";
import { TableVaildationData, User, UserElementLabels, UserListResponse } from "../../interfaces/UserTypes";
import moment from "moment";

export const UsersMetadata = {
    Interceptors : {
        UsersList : '/v1/users/list/*'
    },
  Ui: {
    SearchBox: "app-searchbox input",
    SearchBoxIcons: "app-searchbox i",
    SearchBoxMagnifyIcon: "app-searchbox i",
    AgGridHeaderLabel: "ag-grid-angular .ag-header-cell",
    AppUserManagementActions: "app-user-management-actions",
    AppUsersComponent: "app-users",
    FormControl: ".form-control",
    ValidationAlert: "ngb-alert",
    OpenProfileMenuInfo: "app-dashboard-top-bar .mat-menu-trigger",
    ProfileNameLabel: "CAPTION.user-nav-header--name",
    AppUserOptions: "app-user-options",
    AgCenterColsContainerRows: ".ag-center-cols-container > div",
    AppNavigation : 'app-navigation',
    SubMenuItem : 'mat-list-item .mat-list-item-content > div',
    AddUserCta: '.add-user-button',
    ContactUserDetailsDialog: '.contact-user-details-dialog',
    RolesDropdown: 'mat-select[formcontrolname="roleName"]',
    RolesDropdownItem: '.mat-select-panel mat-option',
    FilterMenu: '.ag-filter',
    FilterSearchBox: '.ag-filter .ag-input-field .ag-text-field-input',
    UserTable: 'ag-grid-angular',
    FilterMenuReset: {
      selector: 'button',
      text: 'Reset'
    },
    [UserElementLabels.Email] : {
      selector : 'app-contact-modal input[formcontrolname="email"]',
    },
    [UserElementLabels.AddUserCloseButton] : {
      selector : 'app-contact-modal .material-icons-outlined',
      text : 'close'
    },
    [UserElementLabels.AddUserContinueCta] : {
      selector : 'app-contact-modal button',
      text : 'Continue'
    },
    [UserElementLabels.BackButton] : {
      selector : '.contact-user-details-dialog button',
      text : 'Back',
    },
    [UserElementLabels.AddUserModalButton] : {
      selector : '.contact-user-details-dialog button',
      text : 'Add User',
    },
    [UserElementLabels.FirstName] : {
      selector : '.contact-user-details-dialog input[formcontrolname="firstName"]',
    },
    [UserElementLabels.LastName] : {
      selector : '.contact-user-details-dialog input[formcontrolname="lastName"]',
    },
    [UserElementLabels.Title] : {
      selector : '.contact-user-details-dialog input[formcontrolname="title"]',
    },
    [UserElementLabels.UserSuccesfullyAdded] : {
      selector : 'snack-bar-container',
      text: 'User successfully added to this account'
    },
    [UserElementLabels.UserFilter] : {
      selector : '[col-id="name"]',
    },
    [UserElementLabels.EmailFilter] : {
      selector : '[col-id="email"]',
    },
    [UserElementLabels.TitleFilter] : {
      selector : '[col-id="title"]',
    },
    [UserElementLabels.StatusFilter] : {
      selector : '[col-id="status"]',
    },
    [UserElementLabels.CreatedFilter] : {
      selector : '[col-id="dateCreated"]',
    },
    [UserElementLabels.LastLoginFilter] : {
      selector : '[col-id="lastLoggedIn"]',
    },
    [UserElementLabels.Actions] : {
      selector : '[col-id="type"]',
    },
    [UserElementLabels.Edit]: {
      selector: 'mat-icon',
      text: 'edit'
    },
    [UserElementLabels.Recover]: {
      selector: 'mat-icon',
      text: 'history'
    },
    [UserElementLabels.Delete]: {
      selector: 'mat-icon',
      text: 'delete'
    },
  },
};

export class UsersService {
  username: string;
  tableValidationData: TableVaildationData = {
    [UserElementLabels.UserSearch]: {
      searchTerm: 'name',
      column: 'User',
    },
    [UserElementLabels.EmailSearch]: {
      searchTerm: 'email',
      column: 'Email',
    },
    [UserElementLabels.TitleSearch]: {
      searchTerm: 'title',
      column: 'Title',
    },
    [UserElementLabels.StatusSearch]: {
      searchTerm: 'status',
      column: 'Status',
    },
    [UserElementLabels.CreatedSearch]: {
      searchTerm: 'date_created',
      column: 'Created',
    },
    [UserElementLabels.LastLoginSearch]: {
      searchTerm: 'last_loggedin',
      column: 'Last Login',
    }
  };
  private _usersList: UserListResponse;
  private _selectedUser: User;

  get usersList(): Cypress.Chainable<UserListResponse> {
    if (this._usersList) {
      return cy.wrap(this._usersList);
    }

    return cy.wait('@usersList').then(resp => {
      this._usersList = resp.response.body as UserListResponse;
      return this._usersList;
    });
  }

  get searchBox(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.SearchBox);
  }
  
  get searchBoxMagnifyIcon(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.SearchBoxMagnifyIcon);
  }
  
  get searchBoxIcons(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.SearchBoxIcons);
  }
  
  get appUsersComponent(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.AppUsersComponent);
  }
  
  get appUserManagementActions(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.AppUserManagementActions);
  }
  
  get userManagementActionsIcons(): Cypress.Chainable<JQuery<HTMLElement>>{
    return this.appUserManagementActions.find("mat-icon");
  }
  
  get agCenterColsContainerRows(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.AgCenterColsContainerRows);
  }

  get addUserButton(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(`${UsersMetadata.Ui.AppUsersComponent} ${UsersMetadata.Ui.AddUserCta}`);
  }

  get modalContinueButton(): Cypress.Chainable<JQuery<HTMLElement>>{
    const option = this.getUiOptionByLabel(UserElementLabels.AddUserContinueCta);
    return cy.get(option.selector).contains(option.text).first();
  }

  get addUserModalButton(): Cypress.Chainable<JQuery<HTMLElement>>{
    const option = this.getUiOptionByLabel(UserElementLabels.AddUserModalButton);
    return cy.get(option.selector).contains(option.text).first();
  }

  get emailInput(): Cypress.Chainable<JQuery<HTMLElement>>{
    const option = this.getUiOptionByLabel(UserElementLabels.Email);
    return cy.get(option.selector);
  }

  get contactDetailsModal(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.ContactUserDetailsDialog);
  }

  get rolesDropdown(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.RolesDropdown).first();
  }
  
  get rolesDropdownItems(): Cypress.Chainable<JQuery<HTMLElement>>{
    return cy.get(UsersMetadata.Ui.RolesDropdownItem);
  }

  get tableData(): Cypress.Chainable<any> {
    return cy.get(UsersMetadata.Ui.UserTable).getAgGridData();
  }

  get filterMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(UsersMetadata.Ui.FilterMenu);
  }

  registerUserListInterceptor(): UsersService{
    this._usersList = null;
    this._selectedUser = null;
    cy.intercept('GET', UsersMetadata.Interceptors.UsersList).as('usersList');
    return this;
  }

  loginAsRole(role: string): UsersService {
    const { username, password }: UserType = getAccount(role);
    if (!username || !password) {
      throw new Error(`No account found for user type: ${role}`);
    }
    cy.login(username, password, true);
    return this;
  }

  navigate(navOption: string): UsersService {
    cy.navigate(navOption as RootNavigationItems);
    return this;
  }

  click(): UsersService {
    cy.click();
    return this;
  }

  searchBarIsVisible(): UsersService {
    // User views the 'Search Bar'
    this.searchBox.should('exist');
    return this;
  }

  filterSearchBar(): UsersService {
    this.usersList.then((userListResponse: UserListResponse)=>{
        const user: User = userListResponse.data[0];
        this.searchBox.focus().clear().type(user.email,{parseSpecialCharSequences:false});
        this.agCenterColsContainerRows.should('have.length.greaterThan', 0);
    });

    return this;
  }

  clearSearchBar(): UsersService {
    const searcString: string = faker.internet.email();
    this.searchBox.focus().clear().type(searcString,{parseSpecialCharSequences:true});
    this.searchBoxIcons.contains('close').should('exist');
    this.searchBoxIcons.contains('close').click();
    this.searchBox.should('be.empty');
    return this;
  }

  searchBoxMagnifyingIcon(): UsersService {
    this.searchBoxMagnifyIcon.should('be.visible');
    return this;
  }
  
  addUserCTAIsVisible(): UsersService {
    this.appUsersComponent.should('be.visible');
    return this;
  }

  elementNotVisible(label: UserElementLabels): UsersService {
    let element: Cypress.Chainable<JQuery<HTMLElement>>;
    switch(label) {
      case UserElementLabels.AddUserCTA:
        element = this.appUsersComponent.find("button").contains("Add User");
        break;
      case UserElementLabels.EditAction:
        element = this.appUserManagementActions.find("mat-icon");
        break;
      case UserElementLabels.RestoreAction:
        element = this.userManagementActionsIcons;
        break;
    }
    
    element.should("not.exist");

    return this;
  }

  userPageVerticalEllipsisIsVisible(): UsersService {
    cy.elementExists(`${UsersMetadata.Ui.AppUsersComponent} i`);
    return this;
  }

  canSortUserTable(tableHeader: UserLandingAgGridHeadColumnsTypes): UsersService {
    const collumn = UserLandingAgGridHeadColumns[tableHeader];
    cy.columnSort(collumn, false);
    return this;
  }

  editActionButtonIsVisible(): UsersService {
    this.userManagementActionsIcons.contains("edit").should("be.visible");
    return this;
  }
  editActionButtonIsNotVisible(): UsersService {
    this.userManagementActionsIcons.should("not.exist");
    return this;
  }
  restoreActionButtonIsVisible(): UsersService {
    this.userManagementActionsIcons.contains("history").should("be.visible");
    return this;
  }
  usersTabIsHidden(): UsersService {
    cy.get(UsersMetadata.Ui.AppUsersComponent).should("not.exist");
    return this;
  }

  shouldntSeeNavItem(navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems): UsersService {
    cy.get(UsersMetadata.Ui.AppNavigation)
        .find(UsersMetadata.Ui.SubMenuItem)
        .should('not.contain', navItem.toString());
    return this;
  }

  getUiOptionByLabel(label: UserElementLabels): UIOption {
    return UsersMetadata.Ui[label];
  }

  typeUserEmail(email?: string): UsersService {
    if (!email) {
      const randomString = (Math.random() + 1).toString(36).substring(7);
      email = `auto.testing+${randomString}@a-scend.com`;
    }

    this.emailInput.type(email, { force: true });

    return this;
  }

  hoverHeader(label: UserElementLabels): UsersService {
    const option = this.getUiOptionByLabel(label);
    cy.triggerHover(`.ag-header-cell${option.selector}`);
    
    return this;
  }
  
  clickHeader(label: UserElementLabels): UsersService {
    this.getFilterIcon(label).click({force: true});
    return this;
  }

  getFilterIcon(label: UserElementLabels): Cypress.Chainable<JQuery<HTMLElement>> {
    const option = this.getUiOptionByLabel(label);
    return cy.get(`${option.selector} .ag-icon-menu`);
  }

  searchOnFilter(label: UserElementLabels): UsersService {
    this.usersList.then((userListResponse: UserListResponse)=> {
      this._selectedUser = userListResponse.data.filter(user => !!user.last_loggedin)[0];
      // eslint-disable-next-line @typescript-eslint/camelcase
      this._selectedUser.date_created = moment(new Date(this._selectedUser.date_created)).format('MM/DD/YY');
      if (this._selectedUser.last_loggedin) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this._selectedUser.last_loggedin = moment(new Date(this._selectedUser.last_loggedin)).format('MM/DD/YY');
      }
      const { searchTerm } = this.tableValidationData[label];
      this.selectTerm(this._selectedUser[searchTerm]);
    });

    return this;
  }

  checkTableData(label: UserElementLabels): UsersService {
    const { searchTerm, column } = this.tableValidationData[label];

    this.tableData.should(data => {
      data.forEach(row => {
        expect(row[column]).to.contain(this._selectedUser[searchTerm])
      });
    });

    return this;
  }

  resetFilter(): UsersService {
    this.filterMenu.within(() => {
      cy.get(UsersMetadata.Ui.FilterMenuReset.selector)
        .contains(UsersMetadata.Ui.FilterMenuReset.text)
        .click({force: true});
    });

    // Click the body to close the filter menu popover
    cy.get('body').click({force: true});
    return this;
  }

  setValidationData(element: UserElementLabels, searchTerm: string): UsersService {
    this.tableValidationData[element].searchTerm = searchTerm;
    return this;
  }

  private selectTerm(searchTerm: string): UsersService {
    this.clickFilterCheckbox('(Select All)', 'uncheck');
    cy.get(UsersMetadata.Ui.FilterSearchBox).type(searchTerm);
    this.clickFilterCheckbox(searchTerm);
    return this;
  }

  private clickFilterCheckbox(label: string, action = 'check'): void {
    cy.get('.ag-checkbox-label')
      .contains(label)
      .siblings('.ag-input-wrapper').within(() => {
        cy.get('.ag-checkbox-input')[action]();
      });
  }
}
