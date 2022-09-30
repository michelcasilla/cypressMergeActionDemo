import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppServiceReviewSelectors } from "../../utils/CssSelectors";

describe('Go to Service Review Page', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['i1','i2','i3','i4']);
  const serviceReview = 'Service Review';
  const testRailCase = 'C956';
  const EngagementType = 'Compliance';

  context(
    `Positive users roles should be able to access ${serviceReview} page`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`User: ${user.description} can't see ${serviceReview} page ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, EngagementType);
          cy.navigate(serviceReview)
          cy.get(AppServiceReviewSelectors.appServiceReview)
            .find('h1')
            .contains(serviceReview)
            .should('exist');
        });
      });
    }
  );

  context(
    `Nagative users roles shouldn't be able to access ${serviceReview} page`,
    () => {
      userTypes.negative.forEach((user: User) => {
        it(`${user.description} can't access ${serviceReview} menu or url ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, EngagementType);
          cy.hasNavigationItem(serviceReview)
            .should('not.exist');
          cy.visit(AppServiceReviewSelectors.componentRouter)
          cy.get(AppServiceReviewSelectors.appServiceReview)
            .should('not.exist');
        });
    });
  });
});