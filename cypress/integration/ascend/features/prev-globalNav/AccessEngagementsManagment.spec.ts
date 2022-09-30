import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { EngagementSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

describe('Access Engagement Management', () => {
    const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['i1','i2','i3','i4']);
    const engagements = 'Engagements';
    const engagementType = 'Compliance';
    const testRailCase = 'C1412';
    const componentTitle = 'Engagement Details';

    context(
        `Positive users roles should be able to manage ${engagements}`,
        () => {
          userTypes.positive.forEach((user: User) => {
            it(`User: ${user.description} can manage engagements ${testRailCase}`, () => {
              cy.login(user.username, user.password);
              cy.selectClient(CLIENT_NAME);
              cy.navigate(engagements);
              cy.selectEngagement(engagementType);
              cy.get(EngagementSelectors.appEngagementStepper)
                .find(GenericUiSelectors.H1)
                .contains(componentTitle);
            });
          });
        }
      );
    
    context(
        `Nagative users roles shouldn't be able to manage ${engagements}`,
        () => {
          userTypes.negative.forEach((user: User) => {
            it(`User: ${user.description} can't manage engagements ${testRailCase}`, () => {
              cy.login(user.username, user.password);
              cy.selectClient(CLIENT_NAME)
                .wait(300); // navegation re-render is taking to long for E3
              cy.navigate(engagements);
              cy.selectEngagement(engagementType);
              cy.get(EngagementSelectors.appEngagementStepper)
                .should('not.exist');
              cy.visit(EngagementSelectors.randomEngagementManageUrl)
                .get(EngagementSelectors.appEngagementStepper)
                .should('not.exist')
            });
          });
        }
      );

})
