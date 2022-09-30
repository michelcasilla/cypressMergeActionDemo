import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";

describe("User is able to view all Dashboard elements", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['e1','e2','e3','i1','i2','i3','i4']);
  const client = "A-SCEND Demo";
  const engagement = "CYPRESS02";

  context(
    "Positive users roles should be able to see elements on Dashboard page",
    () => {
      // Check positive roles
      userTypes.positive.forEach((user: User) => {
        it(`Verify ${user.description} can view elements on Dashboard page`, () => {
      cy.login(user.username, user.password);
        cy.clientSetUp(client);
        cy.selectEngagementWithNum(engagement);
        cy.navigate('Dashboard');
          cy.elementExists("data.full-width");
          cy.elementContains(".dashboard", "A-SCEND Milestones");
          cy.elementContains(".dashboard", "A-SCEND Status");
          cy.elementContains(".dashboard", "A-SCEND Crosswalk");
          cy.elementContains("app-status-chart.full-width > .mat-card", "Open");
          cy.elementContains(
            "app-status-chart.full-width > .mat-card",
            "In Progress"
          );
          cy.elementContains(
            "app-status-chart.full-width > .mat-card",
            "Action Required"
          );
          cy.elementContains(
            "app-status-chart.full-width > .mat-card",
            "Submitted"
          );
          cy.elementContains(
            "app-status-chart.full-width > .mat-card",
            "Accepted"
          );
          cy.elementContains(
            ".crosswalk-container_header",
            "How closely will your completed requests map to other services?"
          );
        });
      });
    }
  );
  context("Negative users roles should not be able to access dashboard", () => {
    // Check negative roles
    userTypes.negative.forEach((user: User) => {
      it(`Verify ${user.description} cannot view elements on Dashboard page`, () => {
        cy.login(user.username, user.password);
        cy.clientSetUp(client);
        cy.selectEngagementWithNum(engagement);
        cy.elementDoesNotContain(".navigation_content", "Dashboard");
        //QA Visual Verification of UI placement.
        cy.screenshot();
      });
    });
  });
});

