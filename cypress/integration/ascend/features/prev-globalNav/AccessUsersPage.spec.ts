import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { UserPageSelectors, GenericUiSelectors, AgGridSelectors } from "../../utils/CssSelectors";


describe("Visit Users Page", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","i1","i2","i3","i4"]);
  const usersPage = 'Users';
  const testRailCase = 'C958';
  const componentSelector = UserPageSelectors.AppUsers;
  const EngagementType = 'Compliance';

  context(
    `Positive users roles should be able to visit ${usersPage} page`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} can access ${usersPage} page ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, EngagementType);
          cy.navigate(usersPage);
          cy.get(componentSelector)
            .within(()=>{
                cy.elementContains(GenericUiSelectors.H1, UserPageSelectors.PageTitle);
                cy.get(AgGridSelectors.AgGridAngular).should('exist');
            });
        });
      });
    }
  );
  
  context(
    `Negative users roles shouldn't be able to visit ${usersPage} page`,
    () => {
      userTypes.negative.forEach((user: User) => {
        it(`${user.description} can't access ${usersPage} page ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, EngagementType);
          cy.hasNavigationItem(usersPage).should('not.exist');
          cy.visit('/a-scend/compliance/users');
          cy.get(componentSelector).should('not.exist');
        });
      });
    }
  );
});
