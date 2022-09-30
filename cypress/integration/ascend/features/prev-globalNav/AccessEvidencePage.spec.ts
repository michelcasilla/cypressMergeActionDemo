import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppEvidenceSelectors, AppNavigationSelector, NavSelectors } from "../../utils/CssSelectors";

describe("Access Evidence Menu", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['e1','e2','e3','i1','i2','i3','i4']);
  const evidence = 'Evidence';
  const testRailCase = "C959";
  const EngagementType = 'Compliance';

  userTypes.positive.forEach((user: User) => {
    context(`Positive users roles ${user.description} should be able to see ${evidence} menu ${testRailCase}`,() => {
      it(`Can toggle ${evidence} menu option`,()=> {
        cy.login(user.username, user.password);
        cy.setUp(CLIENT_NAME, EngagementType);
        cy.hasNavigationItem(evidence)
          .click({force : true})
          .parents('li')
          .find('caption')
          .should('have.length', 2)
      });

      it(`Can see ${evidence} upload page`,()=> {
        cy.login(user.username, user.password);
        cy.setUp(CLIENT_NAME, EngagementType);
        cy.hasNavigationItem(evidence)
          .click({force : true})
          .parents('li')
          .find('caption')
          .contains('Upload')
          .click({force : true});

        cy.get(AppEvidenceSelectors.appEvidence)
          .elementContains('h1', 'Manage Evidence')
          .should('exist');
      });

      it(`Can see ${evidence} download page`,()=> {
        cy.login(user.username, user.password);
        cy.setUp(CLIENT_NAME, EngagementType);
        cy.hasNavigationItem(evidence)
          .click({force : true})
          .parents('li')
          .find('caption')
          .contains('Download')
          .click({force : true});

        cy.get(AppEvidenceSelectors.appEvidenceDownload)
          .elementContains('h1', 'Download Evidence')
          .should('exist');
      });
    });
  });

  context(
    `Nagative users roles shouldn't be able to access ${evidence} menu`,
    () => {
      userTypes.negative.forEach((user: User) => {
        it(`User: ${user.description} can't see ${evidence} menu ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          cy.selectClient(CLIENT_NAME).wait(300);
          cy.get(AppNavigationSelector.appNavigation)
            .find(NavSelectors.navLi)
            .contains(evidence)
            .should('not.exist');
        });
      });
    }
  );
});