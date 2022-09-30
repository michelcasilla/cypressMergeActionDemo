import { getAssignableUsernames, getAccounts } from "../../../../../helpers/environment";
import { UsersListType, User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { KanbanUIElements } from "../../../../../support/kanbanPageObjects/ui-elements";
import { SetFilterToPolicy } from "../../../../../support/setKanbanFilter/setKanbanFilterToPolicy";

describe('User is able to post a comment on a Request by clicking the comment section then typing a comment and clicking the blue arrow', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles('all');
  const testRailCase = 'C2237';
  const client = "A-SCEND Demo";
  const engagement = "CYPRESS02";
  const assignableUsers: Array<string> = getAssignableUsernames();
  const users: UsersListType = getAccounts();
  const kanbanViewUIElements = new KanbanUIElements();
  const setFilterToPolicy = new SetFilterToPolicy();

  context(
    `All users should be able to comment on a Request`,
    () => {
      userTypes.positive.forEach((user: User) => {
        const randomString = (Math.random() + 1).toString(36).substring(7);
        it(`${user.description} is able to comment on Request ${testRailCase}`, () => {
          const useri1 = users["i1"];
          cy.pretestCreateAndAssignCR(
            useri1,
            client,
            engagement,
            1,
            randomString,
            users,
            assignableUsers
          );
        cy.get(kanbanViewUIElements.navigationUserTitle).click({ force: true });
        cy.get(kanbanViewUIElements.navigationLogout).click({ force: true });
        cy.login(user.username, user.password);
        cy.selectEngagementWithNum(engagement).then(() => {
          cy.navigate("Requests");
          cy.wait(2000);
        });
        setFilterToPolicy.setToPolicy();
        cy.wait(2000);
        cy.get("#open").contains(randomString).click({ force: true });
        cy.wait(1000);
        cy.clickCommentSection();
        cy.postComment(true);   
        });
      });
    }
  );
});