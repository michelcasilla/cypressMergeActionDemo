import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { DashboardSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

describe("User Can Change Engagement", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['e1','e2','e3','i1','i2','i3','i4']);
  const engagement = "CYPRESS01";
  const testRailsCases = ['C978', 'C975', 'C976', 'C979'].join(', ');
  
  context("Positive roles should be able to access dashboard",()=>{
    userTypes.positive.forEach((user: User) => {
      it(`${user.description} can change engagement from side nav. ${testRailsCases}`, () => {
        cy.goToDashboard(user, engagement)
        .then(()=>{
          // click dashboard mat menu
          cy.get(DashboardSelectors.MatMenuContent)
            .find(GenericUiSelectors.Button)
            .contains('Print Dashboard')
            .should('exist')
            .click();
          cy.verifyDownload(DashboardSelectors.DashboardPDF, { contains: true, timeout  :4000 })
          .then(()=>{
            cy.validateDashPrintOptions()
              .then(()=>{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cy.wait(2500)
                  .readFile(`cypress/downloads/${DashboardSelectors.DashboardPDF}`, 'base64')
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .then(($file: any)=>{
                  cy.document().then($document => {
                    cy.get('body').first().then(($body) => {
                      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                      const iframeInjector = ()=>{
                        const iframe = $document.createElement("iframe");
                        iframe.setAttribute('data-cy','dashboard-iframe')
                        iframe.src = `data:application/pdf;base64,${$file}`;
                        iframe.style.position = 'absolute';
                        iframe.style.top = '0';
                        iframe.style.left = '0';
                        iframe.style.right = '0';
                        iframe.style.bottom = '0';
                        iframe.style.zIndex = '99';
                        iframe.style.width = '100vw';
                        iframe.style.height = '100vh';
                        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                        iframe.onload = ()=>iframe.setAttribute('data-cy', 'frame-loaded');
                        return iframe;
                      }
                      $body.append(iframeInjector);
                      cy.get('[data-cy="dashboard-iframe"]').then(($frame)=>{
                        expect($frame).to.exist;
                        // Means that the pdf was loaded correctly.
                        cy.get('[data-cy="frame-loaded"]').should('exist');
                      })
                    })
                  });
                });
              })
          })
        })
      });
    });
  })

  context("Negative roles shouldn't be able to access dashboard",()=>{
    userTypes.negative.forEach((user: User)=>{
      it(`${user.description} cannot view Dashboard ${testRailsCases}`, () => {
        cy.login(user.username, user.password);
        cy.setUp(CLIENT_NAME, '');
        cy.get(GenericUiSelectors.Nav)
          .find(GenericUiSelectors.Li)
          .contains('Dashboard')
          .should("not.exist");

        cy.visit(DashboardSelectors.url)
        cy.get(DashboardSelectors.appDashboard).should('not.exist');
      });
    })
  })
});