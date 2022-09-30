import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppNavigationSelector, NavSelectors, GenericUiSelectors, AppProfileSelectors } from "../../utils/CssSelectors";


describe("User gains access to view/edit their own Profile and its information", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4",]);
  const testRailCase = "C964";
  const componentSelector = AppNavigationSelector.appNavigation;

  context(
    `Verify Profle tab exists in Username Menu and is able to navigate to Profile page.`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} is able to navigate to Profile page. ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.selectClient(CLIENT_NAME);
          cy.get(componentSelector)
            .find(NavSelectors.navigationBottomUser)
            .click();
          cy.get(NavSelectors.userOptions)
            .elementContains(GenericUiSelectors.Li, "Profile")
            .click();
          cy.get(AppProfileSelectors.appProfile).within(($component) => {
            expect($component).to.exist;
            cy.get(AppProfileSelectors.firstNameInput).should('exist');
            cy.get(AppProfileSelectors.firstNameInput)
              .invoke("val")
              .then((firstName) => {
                expect(firstName).not.empty;
              });
            cy.get(AppProfileSelectors.emailInput)
              .invoke("val")
              .then((email) => {
                expect(email).not.empty;
                expect(email).to.be.eq(user.username);
              });
          });
        });
      });
    }
  );
});
