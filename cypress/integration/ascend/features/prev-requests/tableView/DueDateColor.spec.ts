import { getAccounts } from "../../../../../helpers/environment";
import { UsersListType } from "../../../interfaces/UserTypeInterfaces";
import { GenericUiSelectors, AgGridSelectors, RequestsSelectors } from "../../../utils/CssSelectors";

describe('Verify Request Due Date Color.', () => {
  const positiveRoles: Array<string> = ['e1','e2','e3','e4','e5', 'i1','i2','i3','i4'];

  const users: UsersListType = getAccounts();
  const client = 'A-SCEND Demo';
  const engagement = 'CYPRESS01';

  for (const role in users) {
    const user = users[role];
    if (positiveRoles.includes(role)) {
      it(`Verify ${user.description} - Due Date color should be RED if overdue.`, () => {
        cy.goToRequests(user, client, engagement);
        cy.showTableView();
        cy.clickElementContaining('app-kandban-filter button', 'Show/Hide Filters');
        cy.selectCheckboxContains(GenericUiSelectors.ListOption, 'Status');
        cy.clickElementContaining('app-kandban-filter .mat-menu-trigger', 'Status');
        cy.clickElementContaining('.mat-menu-panel button', 'Deselect All');
        cy.selectCheckboxContains(GenericUiSelectors.ListOption, 'Open');
        cy.selectCheckboxContains(GenericUiSelectors.ListOption, 'In Progress');
        cy.clickElementContaining(AgGridSelectors.AgHeaderLabel, 'Due');
        cy.finishedLoading();
        cy.dateColor(RequestsSelectors.DueDateLabel);
        cy.clickElementContaining(AgGridSelectors.AgHeaderLabel, 'Due');
        cy.finishedLoading();
        cy.dateColor(RequestsSelectors.DueDateLabel);
      })
    }
    /* NO need for a negative test case. Dates should always be either red 
    when past due or black. Manully verified test fails when should via
    cy.pause() */
  }
})