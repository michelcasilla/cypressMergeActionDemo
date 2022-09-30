import { getAccounts } from '../../../../../helpers/environment';
import { UsersListType } from "../../../interfaces/UserTypeInterfaces";

describe('Requests Table View Request Status', () => {
  const positiveRoles: Array<string> = ['e1', 'e2', 'e3', 'e4', 'i1', 'i2', 'i3', 'i4'];
  
  const users: UsersListType = getAccounts();
  const client = 'A-SCEND Demo';
  const engagement = 'CYPRESS01';

  for (const role in users) {
    const user = users[role]
    if (positiveRoles.includes(role)) {
      it(`${user.description} can view and change the status of a request, including submit.`, () => {
        cy.pretestCreateAndAssignCR(user, client, engagement).then(() => {
          const customReq = Cypress.$('.rim-subtitle').text().trim()
          cy.elementContains('.rim-subtitle', customReq);
          cy.log(customReq);
          cy.clickElement('.close > .material-icons');
          cy.login(user.username, user.password);
          cy.clientSetUp(client);
          cy.selectEngagementWithNum(engagement);
          cy.navigate('Requests');
          cy.clickElementContaining('.app-button-group > :nth-child(2)', 'Table');
          cy.finishedLoading();
          cy.deSelectAllFilter('refId');
          cy.delayedTypeInField('.ag-filter-filter', customReq).clickElement('app-account-logo > app-image-text > .text');
          cy.get('[row-index="0"]').find('.right-bar-value.p-1').trigger('click').then(() => {
            cy.twoStatusOptions('In Progress', 'Submitted');
            cy.changeStatus('In Progress');
            cy.getFindCell(0, 'refId').then(() => {
              const reqID = Cypress.$('[row-index="0"]').find('[col-id="refId"]').text();
              cy.log(reqID)
              cy.clickElementContaining('.app-button-group > :nth-child(1)', 'Cards');
              cy.finishedLoading();
              cy.clickElement('.search-icon-button');
              cy.delayedTypeInField('.top-search-box', reqID).clickElement('app-account-logo > app-image-text > .text').then(() => {
                cy.clickElementContaining('nb-card-body', reqID);
                cy.elementContains('.rim-subtitle', reqID);
                cy.clickElement('.close > .material-icons');
                cy.clickElement('.fa');
              })                  
            })
            cy.clickElementContaining('.app-button-group > :nth-child(2)', 'Table');
            cy.finishedLoading();
            cy.deSelectAllFilter('refId');
            cy.delayedTypeInField('.ag-filter-filter', customReq).clickElement('app-account-logo > app-image-text > .text');
            cy.get('[row-index="0"]').find('.right-bar-value.p-1').trigger('click').then(() => {
              cy.twoStatusOptions('Open', 'Submitted');
              cy.changeStatus('Open');
            })
          })
        });        
      });
    }
    
    if (!positiveRoles.includes(role)) {
      it(`${user.description} can view request page and request status, but not submit.`, () => {
        cy.login(user.username, user.password);
        cy.clientSetUp(client);
        cy.selectEngagementWithNum(engagement);
        cy.navigate('Requests');
        cy.clickElementContaining('.app-button-group > :nth-child(2)', 'Table');
        cy.finishedLoading();
        cy.deSelectAllFilter('displayStatus');
        cy.selectCheckboxContains('.ag-set-filter-item', 'Open');
        cy.deSelectAllFilter('userNames');
        cy.selectFilterCheckbox(1);
        cy.get('[row-index="0"]').find('.right-bar-value.p-1').trigger('click').then(() => {
          cy.oneStatusOption('In Progress')
          .changeStatus('In Progress');
          cy.openStatusDropdown(0);
          cy.oneStatusOption('Open')
          .changeStatus('Open');
        })
      })
    }
  }
})