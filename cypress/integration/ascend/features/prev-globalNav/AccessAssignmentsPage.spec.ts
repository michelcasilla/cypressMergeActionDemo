import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";

describe("Access Assignments Page", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles();
  const Assignments = "Assignments";
  const engagementType = 'Compliance';
  const componentSelector = "app-assignments";

  context(
    `Positive users roles should be abble to see ${Assignments} page`,
    () => {
      userTypes.positive.slice(0,1).forEach((user: User) => {
        it(`${user.description} can view Assignments page`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, engagementType);
          cy.navigate(Assignments);
          cy.get(componentSelector).find("h1").contains(Assignments);
        });
      });
    }
  );

  context(
    `Negative users roles shouldn't be abble to see ${Assignments} page`,
    () => {
      userTypes.negative.forEach((user: User) => {
        it(`${user.description} cannot view ${Assignments} Page`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, engagementType);
          cy.hasNavigationItem(Assignments).should("not.exist");
        });
      });
    }
  );
});
