import { CLIENT_NAME, IDP_URL } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppNavigationSelector, NavSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

describe("Access Engagement Management", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4",]);
  const testRailCase = "C966";
  const componentSelector = AppNavigationSelector.appNavigation;

  context(`User is able to close the session`, () => {
    userTypes.positive.forEach((user: User) => {
      it(`${user.description} is able to close the session ${testRailCase}`, () => {
        cy.login(user.username, user.password);
        cy.selectClient(CLIENT_NAME);
        cy.get(componentSelector).within(() => {
          cy.get(NavSelectors.navigationBottomUser).click(); 
          cy.get(NavSelectors.userOptions).within(()=>{
            cy.elementContains(GenericUiSelectors.Li, 'Logout').should('be.visible');
            cy.intercept('GET', IDP_URL).as('logOutRoute')
            cy.elementContains(GenericUiSelectors.Li, 'Logout').click();
            cy.wait('@logOutRoute')
              .wait(1000)
              .then(()=>{
                expect(localStorage.getItem('userId')).to.not.exist;
                expect(localStorage.getItem('user-scopes')).to.not.exist;
                expect(localStorage.getItem('fullname')).to.not.exist;
                expect(localStorage.getItem('emailstr')).to.not.exist;
                expect(sessionStorage.getItem('current-projectEngagement')).to.not.exist;
              })
        });
        });
      });
    });
  });
});