import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppChangeEngagementSelectors, ConfirmationDialogSelectors } from "../../utils/CssSelectors";

describe("User Can Change Engagement", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);
  const engagement = "CYPRESS01";
  let EngagementName;
  userTypes.positive.forEach((user: User) => {
    it(`${user.description} can change engagement from side nav.`, () => {
      cy.login(user.username, user.password);
      cy.setUp(CLIENT_NAME, engagement);
      cy.get(AppChangeEngagementSelectors.AppChangeEngagement).then(($component)=>{
        EngagementName = Cypress.$(AppChangeEngagementSelectors.MenuTabTitle, $component).text();
        cy.selectRandomEngagementFromUserMenu();
        cy.cancelChangeEngagement();
        cy.isSelectedEngagementEqTo(EngagementName);
        cy.get(ConfirmationDialogSelectors.AppConfirmComponent).should('not.exist');
        cy.selectRandomEngagementFromUserMenu();
        cy.confirmChangeEngagement();
        cy.wait(300);
        cy.isSelectedEngagementNotEqTo(EngagementName);
      });
    });
  });
});