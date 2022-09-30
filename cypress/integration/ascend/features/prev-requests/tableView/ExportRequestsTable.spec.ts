import { getAccounts } from "../../../../../helpers/environment";
import { UsersListType } from "../../../interfaces/UserTypeInterfaces";
import { deleteDownloadsFolder } from "../../../../../helpers/fileUtils";
import { GenericUiSelectors } from "../../../utils/CssSelectors";

describe('User can export requests from table view.', () => {
  const positiveRoles: Array<string> = ['e1','e2','e3','e4','e5', 'i1','i2','i3','i4'];

  const users: UsersListType = getAccounts();
  const client = 'A-SCEND Demo';
  const engagement = 'CYPRESS01';

  afterEach(deleteDownloadsFolder);

  for (const role in users) {
    const user = users[role];
    if (positiveRoles.includes(role)) {
      it(`${user.description} can export requests from requests page table view.`, () => {
        cy.goToRequests(user, client, engagement);
        cy.showTableView();
        cy.clickElementContaining(GenericUiSelectors.Icon, 'more_vert');
        cy.clickElementContaining(GenericUiSelectors.Button, 'Export Requests');
        cy.verifyDownload('.xlsx', { contains: true });
      });
    }
    if (!positiveRoles.includes(role)) {
      it(`${user.description} cannot export requests from requests page table view.`, () => {
        cy.goToRequests(user, client, engagement);
        cy.showTableView();
        cy.clickElementContaining(GenericUiSelectors.Icon, 'more_vert');
        cy.elementDisabled(GenericUiSelectors.Button, 'Export Requests');
      });
    }
  }
})