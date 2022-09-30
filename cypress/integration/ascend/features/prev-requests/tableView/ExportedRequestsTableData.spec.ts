import { CLIENT_NAME, ENGAGEMENT_CYPRESS1 } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { deleteDownloadsFolder, parseXlsx } from "../../../../../helpers/fileUtils";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { GenericUiSelectors } from "../../../utils/CssSelectors";

describe('User can resolve exception from requests table view.', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);
  const testRailCase = 'C1169';

  const columns = [
    'Req ID',
    'Class',
    'Category',
    'Type',
    'Description',
    'Service',
    'Requirement',
    'Location',
    'Due',
    'Attachment',
    'Comments',
    'Assignee',
    'Status',
  ];

  
  context('Positive users roles should be able to export and open Requests table data', () => {
    beforeEach(deleteDownloadsFolder);
  
    userTypes.positive.forEach((user: User) => {
      it(`${user.description} can export and open requests data ${testRailCase}.`, () => {
        cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
        cy.showTableView();
        cy.clickElementContaining(GenericUiSelectors.Icon, 'more_vert');
        cy.clickElementContaining(GenericUiSelectors.Button, 'Export Requests');
        cy.wait(1000)
        parseXlsx('Report.xlsx').then((sheets: Array<any>) => {
          const irlSheet = sheets.find(sheet => sheet.name = 'IRL');
          const headers = irlSheet && irlSheet.data ? irlSheet.data[0] : [];
          headers.forEach(header => {
            expect(header).to.be.oneOf(columns);
          });
        });
      });
    });
  });
});