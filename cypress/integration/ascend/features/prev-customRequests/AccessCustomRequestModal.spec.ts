import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { CustomRequestSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

describe("User can access custom requests modal from Requests page", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['i1', 'i2', 'i3', 'i4']);
  const CustomRequest = "Custom Requests";
  const engagementType = 'CYPRESS';
  const testRailId = 'C1333';

  context(
    `Positive users roles should be able to see ${CustomRequest} page`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} can view ${CustomRequest} page ${testRailId}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, engagementType);
          cy.navigate(CustomRequest);
          cy.get(CustomRequestSelectors.customRequest).within(($component)=>{
            expect($component).to.exist;
            // Header [Client Name]
            cy.get(GenericUiSelectors.H6).contains(CLIENT_NAME).should('exist');
            // [Engagement Name] appears at the top left of the page.
            // Subheader Create Custom Requests appears below the header.
            cy.get(GenericUiSelectors.H1).contains(CustomRequest).should('exist');
            // Above the table is the header Custom Requests (#) with the # signifying the number of custom requests on the table.
            cy.get(GenericUiSelectors.H3).contains('Custom Requests ').should('exist');
            // An Export Requests CTA appears on the right of the page above the table.
            cy.get(CustomRequestSelectors.ButtonExportLink).should('exist');
            // A button CTA Create Custom Request should exist.
            cy.get(GenericUiSelectors.Button).contains('Create Custom Request').should('exist');
            // A button CTA Mass Upload should exist.
            cy.get(GenericUiSelectors.Button).contains('Mass Upload').should('exist');
            // The table is displayed with the following columns:
            cy.get(CustomRequestSelectors.TableAddRequestPage).within(($table)=>{
              expect($table).to.exist;
              // A table with the following columns [ Category | Request Type | Request Description | Criteria | Due Date ]
              cy.get(GenericUiSelectors.TrTh).then(($hedings)=>{
                ['Category','Request Type','Description','Criteria','Due Date'].forEach((heading, index)=>{
                  cy.wrap($hedings[index]).contains(heading);
                });
              });
              // A location add icon CTA and 3 ellipsis appear to the right of the table.
              cy.get(GenericUiSelectors.TrTd).last().should('contain.text', 'add_location_alt');
              cy.get(GenericUiSelectors.TrTd).last().should('contain.text', 'more_vert');
            });
            
            // The Add Cancel CTA appears at the bottom of the page.
            cy.get(CustomRequestSelectors.FormControlNameDescription).first().focus().clear().type('Test Request',{parseSpecialCharSequences:false});

            cy.get(CustomRequestSelectors.CustomRequestContainerActionButtons).within(($footerActions)=>{
              expect($footerActions).to.exist;
              // Back CTA appears in bottom left of page.
              cy.get(GenericUiSelectors.Button).first().should('contains.text', 'Cancel');
              // Save & Close and Next Step CTA's appear on the bottom right of page and are always active.
              cy.get(GenericUiSelectors.TypeSubmit).should('contains.text', 'Save Custom Request');
            })

          });
        });
      });
    }
  );

  context(
    `Negative users roles shouldn't be able to see ${CustomRequest} page`,
    () => {
      userTypes.negative.forEach((user: User) => {
        it(`${user.description} cannot view ${CustomRequest} page ${testRailId}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, engagementType);
          cy.hasNavigationItem(CustomRequest).should("not.exist");
          cy.visit(CustomRequestSelectors.url);
          cy.get(CustomRequestSelectors.customRequest).should("not.exist");
        });
      });
    }
  );
});