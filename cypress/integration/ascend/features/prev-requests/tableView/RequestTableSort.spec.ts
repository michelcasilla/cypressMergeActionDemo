/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { CLIENT_NAME, ENGAGEMENT_CYPRESS3 } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { GenericUiSelectors, MatSelectors } from "../../../utils/CssSelectors";


describe('User can view and sort requests from table view.', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);
  const cells: Array<{id: string; valueParser?: (cell: Element) => string | number}> = [
    { id: 'refId' },
    { id: 'className' },
    { id: 'categoryName' },
    { id: 'requestType' },
    { id: 'description' },
    { id: 'auditName' },
    { id: 'projectAudits' },
    { id: 'locationName' },
    {
      id: '0', // Due date cell id
      valueParser: (cell: Element) => {
        const dateString = cell.textContent.trim().split(' ')[0];

        return DateTime.fromFormat(dateString, "MM/dd/yy").toSeconds();
      }
    },
    {
      id: 'attachmentFilter',
      valueParser: (cell: Element) => {
        return cell.querySelector(`.request-attachment-button ${GenericUiSelectors.Icon}`) ? 0 : 1;
      }
    },
    {
      id: 'commentsFilter',
      valueParser: (cell: Element) => {
        return cell.querySelector('#editIcon') ? 0 : 1;
      }
    },
    {
      id: 'request', // Assignee cell id
      valueParser: (cell: Element) => {
        return cell.querySelector('.icon-cell')?.textContent === 'no_accounts' ? 1 : 0;
      }
    },
    {
      id: 'request_1', // Status cell id
      valueParser: (cell: Element) => {
        return cell.querySelector(MatSelectors.Chip)?.textContent?.trim() ?? '';
      }
    }, 
  ];
  const halfColumns = Math.ceil(cells.length / 2);

  userTypes.positive.forEach((user: User) => {
    it(`Verify ${user.description} can view and sort each column from request page table view.`, () => {
      cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS3);
      cy.showTableView();
     
      //Check each column can sort. 
      cells.forEach((cell, index: number) => {
        cy.columnSort(cell, index === halfColumns);
      });
    });
  });

})