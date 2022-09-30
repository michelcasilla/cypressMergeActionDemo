import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { RequestPageSelectors, AgGridSelectors } from "../../utils/CssSelectors";

describe("Go to Request Page", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);
  const testRailCase = "C953";
  const searchString = "Compliance";

  context(
    `Positive roles can access Request Page then click Cards view and then click Table view`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} is able to access Request Page then click Cards view and then click Table view. ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, searchString);
          cy.navigate("Requests");
          cy.get(RequestPageSelectors.appRequestManagement).should("exist");
          cy.intercept("GET", RequestPageSelectors.requestLoadUrl).as(
            "requestLoad"
          );
          cy.cardTableToggle();
          cy.wait("@requestLoad");
          cy.get(RequestPageSelectors.appRequestManagement).within(
            ($component) => {
              expect($component).to.exist;
              cy.get(AgGridSelectors.AgGridAngular).should("be.visible");
            }
          );
        });
      });
    }
  );
});
