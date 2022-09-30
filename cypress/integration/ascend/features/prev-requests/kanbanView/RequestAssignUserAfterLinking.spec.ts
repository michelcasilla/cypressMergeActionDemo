import { CLIENT_NAME } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { deleteDownloadsFolder } from "../../../../../helpers/fileUtils";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { RequestSelectors, GenericUiSelectors, DashboardSelectors } from "../../../utils/CssSelectors";


describe("User can verify an Unassigned request gets assigned to user who uploads evidence", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles();
  const PageName = "Dashboard";
  const searchString = "CYPRESS";
  const testCase = "C951";

  beforeEach(deleteDownloadsFolder);
  context(
    `Positive users roles should be abble Unassigned request to user who links evidence ${PageName} page`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} assigns Unassigned request to user who links evidence ${testCase}`, () => {
          let fielname = '';
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, searchString);
          cy.intercept(RequestSelectors.EvidenceList).as("evidenceLoad");
          cy.navigate("Requests");
          cy.wait("@evidenceLoad");
          cy.get(RequestSelectors.AppRequestManagement).within(($component) => {
            expect($component).to.exist;

            cy.get(RequestSelectors.AppSearchbox)
              .find(GenericUiSelectors.Input)
              .focus()
              .clear();

            cy.get(RequestSelectors.AppCards).first().click();
          });

          cy.get(RequestSelectors.AppRequestDialog)
            .find(RequestSelectors.AppEvidence)
            .find(RequestSelectors.MatGridTile)
            .contains("Link evidence from this engagement")
            .click();

          cy.get(RequestSelectors.AppEvidenceDialog).within(() => {
            cy.get(RequestSelectors.AppPriorEvidenceActionButtons)
              .get(RequestSelectors.ChildDiv)
              .contains(RequestSelectors.FileDownload)
              .first()
              .then(($file)=>{
                fielname = Cypress.$($file.get(0)).parents('.ag-row').find('[col-id="fileName"]').text()
                cy.log(fielname);
                $file.get(0).click();
              })
            });
          cy.verifyDownload(fielname, { contains: true });
          cy.get(RequestSelectors.AppEvidenceDialog).should("exist");
        });
      });
    }
  );

    context(`Negative users roles shouldn't be abble to see ${PageName} page`,() => {
      userTypes.negative.forEach((user: User) => {
        it(`${user.description} cannot view ${PageName} Page ${testCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, searchString);
          cy.get(GenericUiSelectors.Nav)
            .find(GenericUiSelectors.Li)
            .contains(PageName)
            .should("not.exist");
          cy.visit(DashboardSelectors.url)
            .get(DashboardSelectors.appDashboard)
            .should('not.exist');
        });
      });
    }
  );
});
