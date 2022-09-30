import { getAccounts } from "../../../../../helpers/environment";
import { UsersListType } from "../../../interfaces/UserTypeInterfaces";

describe('User can verify an Unassigned request gets assigned to user who uploads evidence', () => {
  const users: UsersListType = getAccounts();
  const client = 'A-SCEND Demo';
  const engagement = 'CYPRESS01';

  // Role Variations
    const positiveRoles: Array<string> = ['e1', 'e2', 'e3'];
    const negativeVariation1: Array<string> = ['e4', 'e5'];
    const negativeVariation2: Array<string> = ['i1'];
    const negativeVariation3: Array<string> = ['i2', 'i3', 'i4'];
    
        for (const role in users) {
          const user = users[role]
    
          if (positiveRoles.includes(role)) {
              
            it(`${user.description} assigns Unassigned request to user who uploads evidence`, () => {
              cy.pretestCreateCR(user, client, engagement).then(() => {
                const customReq = Cypress.$('.rim-subtitle').text().trim()
                cy.log(customReq)
                cy.login(user.username, user.password);
                cy.clientSetUp(client);
                cy.selectEngagementWithNum(engagement);
                cy.navigate('Requests');
                cy.finishedLoading();
                cy.delayedTypeInField('.top-search-box', customReq).clickElement('app-account-logo > app-image-text > .text').then(() => {
                  cy.finishedLoading();
                  cy.clickElementContaining('nb-card-body', customReq);
                  cy.elementContains('.rim-subtitle', customReq);

                });
                
                // user uploads file
                cy.elementContains('.evidence-upload-text', 'Evidence Upload');
                cy.uploadEvidenceFile();
                cy.elementContains('.uploaded-file-row', 'Aligntest100.docx');
                
                // check user is Assigned to the request & status equals In Progress
                cy.elementContains('.mt-4 > .right-bar-value', 'In Progress');
                cy.closeCard();
                cy.finishedLoading();
                cy.get('.toaster-msg', {timeout: 20000}).should('not.exist',{timeout: 30000});

                cy.elementContains('.card-topbar', customReq).should('be.visible')
                cy.elementExists('.photo-item > app-image-text').should('be.visible', { timeout: 30000 });
                cy.inspectHoverPopUp('.photo-item > app-image-text', user.name);
              
              })
            })
          }
          // test that negative roles cannot assign or see the dropdown assignee list
          if (!positiveRoles.includes(role)) {
            it(`${user.description} cannot assign themselves to a request`, () => {
              cy.login(user.username, user.password);
              cy.setUp(client, engagement);
              cy.navigate('Requests');

              //check for E4-5
              if (negativeVariation1.includes(role)) {
                cy.selectKanbanFilter(6, 'User', 'Unassigned');
                cy.get('.card-topbar').should('have.length',0);
                cy.elementDoesNotExist('.card-topbar');
              } 
              // check for I1 user
              else if (negativeVariation2.includes(role)) {
                cy.elementExists('.kanban-card-body').first().click();
                cy.log(user.name);
                cy.requestDropdownExcludesI1(user.name);
              } 
              // check that dropdown arrow for Assigned-To box is disabled, so cannot contain internal users(2-4) or assign to others
              else if (negativeVariation3.includes(role)) {
                cy.elementExists('.kanban-card-body').first().click();
                cy.elementDoesNotExist('.right-bar-value > :nth-child(1) > :nth-child(2) > .material-icons');
              } else {
                console.log('user was not in positive or negative roles');
              }
            })
          }
       }
    });