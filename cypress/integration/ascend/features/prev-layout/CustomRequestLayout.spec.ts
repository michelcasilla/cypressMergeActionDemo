
//NOTE This test requires atleast one already created Custom Request.

import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { CustomRequestSelectors } from "../../utils/CssSelectors";

describe("User is able to view all Dashboard elements", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles([
    "i1",
    "i2",
    "i3",
    "i4",
  ]);
  const client = "A-SCEND Demo";
  const engagement = "CYPRESS02";
  const customRequestTableHeader = [
    "Category",
    "Request Type",
    "Description",
    "Criteria",
    "Due Date",
  ];
  const pageName = "Custom Requests";
  const testRail = "C1333";

  context(
    `Positive users roles should be able to see elements on ${pageName} page`,
    () => {
      // Check positive roles
      userTypes.positive.forEach((user: User) => {
        it(`Verify ${user.description} can view elements on ${pageName} page ${testRail}`, () => {
          cy.login(user.username, user.password);
          cy.clientSetUp(client);
          cy.selectEngagementWithNum(engagement);
          cy.navigate("Custom Requests").wait(800);
          cy.elementExists(CustomRequestSelectors.CustomRequestHeader);
          cy.elementExists(CustomRequestSelectors.ExportRequestButton);
          cy.get(CustomRequestSelectors.CustomRequestTableHeader).each(
            ($tableHeader) => {
              expect(customRequestTableHeader).to.include(
                $tableHeader.text().trim()
              );
            }
          );
          cy.elementExists(CustomRequestSelectors.LocationButton);
          cy.elementExists(CustomRequestSelectors.EllipsisButton);
          cy.elementExists(CustomRequestSelectors.SaveCustomRequestButton);
        });
      });
    }
  );
  context(
    `Negative users roles should not be able to access ${pageName} page`,
    () => {
      // Check negative roles
      userTypes.negative.forEach((user: User) => {
        it(`Verify ${user.description} cannot view elements on ${pageName} page ${testRail}`, () => {
          cy.login(user.username, user.password);
          cy.clientSetUp(client);
          cy.selectEngagementWithNum(engagement);
          cy.elementDoesNotContain(".navigation_content", "Custom Request");
          //QA Visual Verification of UI placement.
          cy.screenshot();
        });
      });
    }
  );
});
