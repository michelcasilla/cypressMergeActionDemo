import { User } from "../../interfaces/UserTypeInterfaces";
import { getGroupedUsersByPosNegRoles, GroupedRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppKanbanCardSelectors, GenericUiSelectors } from "../../utils/CssSelectors";


describe('Verify Request Card Layout.',() => {
  const users: GroupedRoles = getGroupedUsersByPosNegRoles(['e1', 'e2', 'e3', 'e4', 'e5', 'i1', 'i2','i3','i4']);
  const client = 'A-SCEND Demo';
  const testRailCase = 'C2197';
  users.positive.forEach((user: User) => {
    
    
    it(`${user.description} can verify kaban cards ${testRailCase}`, { numTestsKeptInMemory : 2 }, () => {
      cy.login(user.username, user.password);
      cy.setUp(client, 'CYPRESS');
      cy.navigate('Requests');
      cy.wait('@projectrequests').then(($response)=>{
        cy.get(AppKanbanCardSelectors.AppKanban).then(()=>{
          cy.get(AppKanbanCardSelectors.AppCards).then(($cardList)=>{
            const index = Math.floor(Math.random() * $cardList.length);
            const card = $cardList[index];
            card.click();
          });
         
          cy.get(AppKanbanCardSelectors.AppRequestDialog).within(($dialog)=>{
            const requestId = Cypress.$(AppKanbanCardSelectors.H6_H2, $dialog).first().text().split(' ')[0];
            cy.log(`requestId: ${requestId}`);
            const request = ($response.response.body || []).filter(req => req.refid == requestId)[0];
            expect($dialog).to.exist;
            cy.get(GenericUiSelectors.H6).should('exist').should('not.be.empty');
            cy.get(AppKanbanCardSelectors.H6_H2).should('exist').should('not.be.empty');
            cy.get(GenericUiSelectors.H3).contains('Description').should('exist');
            
            if(request){
              const showGuide = (request.auditName || []).some((audit) => {
                return Boolean(audit.requirementDefinition && audit.requirementDefinition.length > 0 && audit.requirementDefinition[0]);
              });
              
              if(showGuide){
                cy.get(AppKanbanCardSelectors.AppAlignGuidance)
                  .should('exist')
                  .should('contain', "A-LIGN Guidance");
              }
              
              if(request.consultant_advice){
                cy.get(AppKanbanCardSelectors.AppConsultantAdvice)
                  .should('be.visible')
                  .and('contain', 'Consultant Advice');
              }
            }else{
              cy.log(`NOT_FOUND_IN_REQUEST_LISt: ${requestId}`);
            }
            cy.get(AppKanbanCardSelectors.AppEvidence)
              .within(($appEvidenceComponent)=>{
                expect($appEvidenceComponent).to.exist;
                cy.get(GenericUiSelectors.H3).contains('Evidence').should('exist');
                cy.get(AppKanbanCardSelectors.H3button).contains('Other Engagement Evidence').should('exist');
                // Below the evidence header is the Drag and drop to upload or browse to choose a file feature, and the Link Evidence from this engagement CTA.
                cy.get(AppKanbanCardSelectors.MatGridTile).contains('Drag and drop to upload').should('exist');
                cy.get(AppKanbanCardSelectors.MatGridTile).contains('Link evidence from this engagement').should('exist');            
              });
            // Below the Evidence section is the Activity section with a header Activity.
            cy.get(AppKanbanCardSelectors.AppActivity).within(($evidenceComponent)=>{
              expect($evidenceComponent).to.exist;
              cy.get(GenericUiSelectors.H3).contains('Activity').should('exist');
    
              // Below the Activity header are the 3 tabs Uploaded Files (default selected), Comments, and History.
              cy.get(AppKanbanCardSelectors.MatTabGroup).within(($tabs)=>{
                expect($tabs).to.exist;
                cy.get(AppKanbanCardSelectors.MatTabHeader).within(($headers)=>{
                  expect($headers).to.exist;
                  cy.get(AppKanbanCardSelectors.RoleTab).contains('Uploaded Files').should('exist'); // .should('have.attr','aria-selected');
                  cy.get(AppKanbanCardSelectors.RoleTab).contains('Comments').should('exist');
                  cy.get(AppKanbanCardSelectors.RoleTab).contains('History').should('exist');
                })
                // Upload evidence should be active by default.
                cy.get(AppKanbanCardSelectors.MatTabBody).find(AppKanbanCardSelectors.AppUploadedEvidence).should('exist');
              });
            });
  
            // The right side of the page displays the following fields with their corresponding values in the following order:
            cy.get(AppKanbanCardSelectors.ContentContainerSideBar)
              .within(($sideBar)=>{
                expect($sideBar).to.exist;
                // Request Status [Status CTA]
                // Due Date [Due date for request]
                // Assigned to [Edit User(s) CTA]
                // Request Type [request's type]
                // Location [request's location]
                [
                  'Request Status',
                  'Due Date',
                  'Assigned to',
                  'Request Type',
                  'Location'
                ].forEach((description)=> {
                  cy.get(GenericUiSelectors.H3).contains(description).should('exist');
                } );
                // Page break
                cy.get(AppKanbanCardSelectors.AppRequestDialogLocationMatDivider).should('exist');
                // Service, Criteria,  Consultant header
                cy.get(AppKanbanCardSelectors.AppServiceBreakdown).within(($appServiceBreakDownComponent)=>{
                  expect($appServiceBreakDownComponent).to.exist;
                  // Service: [service that the request is tied to in the engagement]
                  // Criteria: [List of active criteria the request is tied to, comma separated.]
                  // Consultant [consultants that are assigned to the listed criteria.]
                  [
                    'Service, Criteria & Consultant',
                    'Service',
                    'Criteria',
                    'Consultant'
                  ].forEach((description)=>{
                    cy.get(GenericUiSelectors.H3).contains(description).should('exist')
                  });
                  
                });
  
              });
          });
  
        });
      })
      
    });

  });

})