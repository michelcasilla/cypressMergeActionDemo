import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { DashboardSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

describe('Go to Dashboard', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles();
  const PageName = "Dashboard";
  const engagementType = 'Compliance';
  const testCase = 'C951';

  context(
    `Positive users roles should be abble to see ${PageName} page`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} can view ${PageName} page ${testCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, engagementType);
          cy.navigate(PageName);
          cy.get(DashboardSelectors.appDashboard)
            .find(GenericUiSelectors.H1)
            .contains(PageName);
        });
      });
    }
  );

  context(`Negative users roles shouldn't be abble to see ${PageName} page`,() => {
    userTypes.negative.forEach((user: User) => {
      it(`${user.description} cannot view ${PageName} Page ${testCase}`, () => {
        cy.login(user.username, user.password);
        cy.setUp(CLIENT_NAME, engagementType);
        cy.get(GenericUiSelectors.Nav)
          .find(GenericUiSelectors.Li)
          .contains(PageName)
          .should("not.exist");
        cy.visit(DashboardSelectors.url)
          .get(DashboardSelectors.appDashboard)
          .should('not.exist');
      });
    });
  }
);
  
});
