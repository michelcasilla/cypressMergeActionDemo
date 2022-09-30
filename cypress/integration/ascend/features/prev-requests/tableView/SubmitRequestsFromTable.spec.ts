import { getAssignableUsernames, getAccounts, CLIENT_NAME, ENGAGEMENT_CYPRESS3 } from "../../../../../helpers/environment";
import { User, UsersListType } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { KanbanUIElements } from "../../../../../support/kanbanPageObjects/ui-elements";
import { RequestSelectors, RequestsSelectors, AgGridSelectors, MatSelectors } from "../../../utils/CssSelectors";

describe('User can submit requests from request page table view', () => {
  const assignableUsers: Array<string> = getAssignableUsernames();
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles('all');
  const users: UsersListType = getAccounts();
  const kanbanViewUIElements = new KanbanUIElements();

  context(
    `Positive users roles should be able to submit requests from request page table view`,
    () => {
      const requestPerRole: {[key: string]: string} = {};
      before(() => {
        const randomString = (Math.random() + 1).toString(36).substring(7);
        userTypes.positive.forEach((user: User, index: number) => {
          const reqNumber = index > 0 ? ` ${index}` : '';
          requestPerRole[user.role] = randomString + reqNumber
        });

        // Creating necesary data 
        cy.pretestCreateAndAssignCR(
          users['i1'],
          CLIENT_NAME,
          ENGAGEMENT_CYPRESS3,
          9,
          randomString,
          users,
          assignableUsers
        );
      });
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} can cancel request submission and submit from table view.`, () => {
          const randomString = requestPerRole[user.role];
          cy.clickElement(kanbanViewUIElements.navigationUserTitle);
          cy.clickElement(kanbanViewUIElements.navigationLogout);
      
          cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS3);
          cy.wait('@getProjectrequests');
          cy.showTableView();
          
          cy.moveRequestFromOpenToSubmitted(0, randomString);
            
          // Validate status

          cy.clearInputField(RequestSelectors.AppSearchbox);
          cy.typeInField(RequestsSelectors.SearchBoxInput, randomString);
          cy.get(AgGridSelectors.AgColumnViewport).scrollTo('right');
          cy.elementContains(MatSelectors.Chip, 'Submitted');
          cy.elementDoesNotExist(`${AgGridSelectors.AgColumnViewport} ${AgGridSelectors.AgRow}[row-index="0"] ${RequestsSelectors.TableStatusSelector} .material-icons`);
        });
      });
    });
})