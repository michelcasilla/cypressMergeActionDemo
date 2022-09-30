import { CLIENT_NAME, ENGAGEMENT_CYPRESS1 } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { GenericUiSelectors } from "../../../utils/CssSelectors";

describe('User can clear all the applied filters.', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);

  userTypes.positive.forEach((user: User) => {
    it(`Verify ${user.description} can clear all the applied filters.`, () => {
      cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
      // Check Clear All is not present when no filter is applied
      cy.elementDoesNotContain(GenericUiSelectors.Button, 'Clear All');

      cy.applyFilter('Status', 'Action Required');
      cy.elementContains(GenericUiSelectors.Button, 'Clear All');
      cy.clickElementContaining(GenericUiSelectors.Button, 'Clear All');
      cy.elementDoesNotContain(GenericUiSelectors.Button, 'Clear All');
      cy.selectCheckboxContains(GenericUiSelectors.ListOption, 'Status');
      cy.elementDoesNotExist('mat-list-option[selected="false"]');
    })
  });
});
