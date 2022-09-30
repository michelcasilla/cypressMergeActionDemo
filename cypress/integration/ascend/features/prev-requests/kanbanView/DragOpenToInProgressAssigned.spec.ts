import { getAccounts, getAssignableUsernames } from "../../../../../helpers/environment";
import { UsersListType, User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { KanbanUIElements } from "../../../../../support/kanbanPageObjects/ui-elements";
import { RequestsSelectors } from "../../../utils/CssSelectors";


describe("User is able to post a comment on a Request by clicking the comment section then typing a comment and clicking the blue arrow", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles("all");
  const testRailCase = "C2113";
  const client = "A-SCEND Demo";
  const engagement = "CYPRESS02";
  const users: UsersListType = getAccounts();
  const assignableUsers: Array<string> = getAssignableUsernames();
  const kanbanViewUIElements = new KanbanUIElements();

  context(
    `All users should be able to move a Request from Open to In Progress`,
    () => {
      userTypes.positive.forEach((user: User) => {
        const randomString = (Math.random() + 1).toString(36).substring(7);
        it(`${user.description} can drag request from Open to In Progress ${testRailCase}`, () => {
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
          cy.get(kanbanViewUIElements.navigationUserTitle).click({
            force: true,
          });
          cy.get(kanbanViewUIElements.navigationLogout).click({ force: true });
          cy.login(user.username, user.password);
          cy.selectEngagementWithNum(engagement).then(() => {
            cy.navigate("Requests");
            cy.wait(2000);
          });
          cy.typeInField(RequestsSelectors.SearchBoxInput, randomString);
          cy.wait(1000).then(() => {
            cy.get(".card")
              .contains(randomString)
              .then(() => {
                cy.dragAndDrop("#open > div:nth-child(1)", "#in\\ progress");
                cy.log(randomString);
                cy.elementContains("#in\\ progress", randomString);
              });
          });
        });
      });
    }
  );
});
