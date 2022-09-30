import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppNavigationSelector, GenericUiSelectors } from "../../utils/CssSelectors";


describe("Access Engagement Management", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);
  const testRailCase = "C965";
  const SUPPORT_URL = 'https://support.a-scend.com/';

  context(`Access help from username menu`, () => {
    userTypes.positive.splice(0, 1).forEach((user: User) => {
      it(`${user.description} can access Help on the user menu ${testRailCase}`, () => {
        cy.login(user.username, user.password);
        cy.selectClient(CLIENT_NAME);
        cy.get(AppNavigationSelector.appNavigation).within(() => {
          cy.wait(300)
            .get(AppNavigationSelector.navigationBottomUser)
            .click({force:true});
          cy.get(AppNavigationSelector.userOptions,{timeout : 5000}).within(() => {
            cy.elementContains(GenericUiSelectors.Li, "Help").should("be.visible");
            cy.window().then((win)=>{
                cy.stub(win, 'open').as('windowOpen');
            })
            cy.elementContains(GenericUiSelectors.Li, "Help").click({force:true});
            cy.get('@windowOpen').should('be.calledWith', SUPPORT_URL);
          });
        });
      });
    });
  });
});
