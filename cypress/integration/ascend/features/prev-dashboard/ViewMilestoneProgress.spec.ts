import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { DashboardSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

describe("Verify user is able to view A-SCEND Milestones and information conveys status and timeline of each audit/service", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles("all");
  const PageName = "Dashboard";
  const engagementType =
    "CYPRESS01_2021_TYPE1SOC2_TYPE2SOC1_PCIDSSROC_ISO27001_FISMASECURITYASSESSMENT_TYPE1HIPAA";
  const testCase = "C972";
  const serviceLabelArray = [];
  context(
    `Positive users roles should be able to see ${PageName} page and view Milestones`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} can view ${PageName} page ${testCase}`, () => {
          cy.login(user.username, user.password);
          cy.intercept("/v1/dashboard/reports/milestone/*").as("milestones");
          cy.setUp(CLIENT_NAME, engagementType);
          cy.navigate(PageName);
          cy.get(DashboardSelectors.appDashboard)
            .find(GenericUiSelectors.H1)
            .contains(PageName);
          cy.wait("@milestones").then((response) => {
            const milestones = response.response.body;
            milestones.map((service) => {
              serviceLabelArray.push(service.name);
            });
            cy.get(DashboardSelectors.MilestoneLabel).each(
              ($milestoneLabel) => {
                if (
                  serviceLabelArray.includes($milestoneLabel.text).toString()
                ) {
                  expect(serviceLabelArray).to.include(
                    $milestoneLabel.text().toString()
                  );
                }
              }
            );
            cy.get(DashboardSelectors.AppMilestoneBarInner).each(
              ($milestoneCard) => {
                $milestoneCard.hasClass("completed")
                  ? expect($milestoneCard).to.have.class("completed")
                  : expect($milestoneCard).to.have.class("overdue");
                $milestoneCard.hasClass("overdue")
                  ? cy
                      .get(DashboardSelectors.AppMilestonesOverdueIcon)
                      .should(
                        "have.css",
                        "background-color",
                        "rgb(238, 34, 67)"
                      )
                  : cy
                      .get(DashboardSelectors.AppMilestonesCompleteIcon)
                      .should(
                        "have.css",
                        "background-color",
                        "rgb(69, 141, 189)"
                      );
                expect(DashboardSelectors.AppMilestonesDate).to.exist;
                expect(DashboardSelectors.AppMilestonesShortname).to.exist;
                //FIXME: Hover assertion needed. However as of writing this code, the functionality currently does not work.
              }
            );
          });
        });
      });
    }
  );
});
