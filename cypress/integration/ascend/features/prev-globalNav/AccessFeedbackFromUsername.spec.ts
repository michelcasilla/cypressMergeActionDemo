import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppNavigationSelector, GenericUiSelectors } from "../../utils/CssSelectors";


describe("Access Engagement Management", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["i1","i2","i3","i4"]);
  const testRailCase = "C968";
  const page = 'Feedback';
  const FEEDBACK_URL = 'https://feedback.a-scend.com/';

  context(`Positive user roles can Verify ${page} button in Username Menu.`, () => {
    userTypes.positive.forEach((user: User) => {
      it(`${user.description} can access ${page} on the user menu ${testRailCase}`, () => {
        cy.login(user.username, user.password);
        cy.selectClient(CLIENT_NAME);
        cy.get(AppNavigationSelector.appNavigation,{timeout : 5000}).within(() => {
          cy.get(AppNavigationSelector.navigationBottomUser).click();
          cy.get(AppNavigationSelector.userOptions).within(() => {
            cy.elementContains(GenericUiSelectors.Li, page)
                .should("be.visible");
                cy.window().then((win)=>{
                    cy.stub(win, 'open').as('windowOpen');
                })
                cy.elementContains(GenericUiSelectors.Li, page).click({force:true});
                cy.get('@windowOpen').should('be.calledWith', FEEDBACK_URL);
          });
        });
      });
    });
  });
  
  context(`Negative user roles can't Verify ${page} button in Username Menu.`, () => {
    userTypes.negative.forEach((user: User) => {
      it(`${user.description} can't access ${page} on the user menu ${testRailCase}`, () => {
        cy.login(user.username, user.password);
        cy.selectClient(CLIENT_NAME);
        cy.get(AppNavigationSelector.appNavigation,{timeout : 5000}).within(() => {
          cy.get(AppNavigationSelector.navigationBottomUser).click();
          cy.get(AppNavigationSelector.userOptions).within(() => {
            cy.elementContains(GenericUiSelectors.Li, page).should("not.exist");
          });
        });
      });
    });
  });
});