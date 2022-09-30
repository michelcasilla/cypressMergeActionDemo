import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { EngagementSelectors } from "../../utils/CssSelectors";


describe("Access Engagement Management", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4",]);
  const engagements = "Engagements";
  const testRailCase = "C955";
  const componentSelector = EngagementSelectors.appEngagements;

  context(
    `Positive users roles should be able to access ${engagements} page`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`User: ${user.description} can access engagements page ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.selectClient(CLIENT_NAME);
          cy.navigate(engagements);
          cy.get(componentSelector)
            .find(EngagementSelectors.engagementsScreenTitle)
            .contains(engagements);
        });
      });
    }
  );
});
