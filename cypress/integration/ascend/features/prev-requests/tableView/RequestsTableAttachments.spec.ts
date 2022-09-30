import { getAccounts } from "../../../../../helpers/environment";
import { UsersListType } from "../../../interfaces/UserTypeInterfaces";

describe('User can view attachments linked to requests.', () => {
  const positiveRoles: Array<string> = ['e1', 'e2', 'e3', 'e4', 'e5', 'i1', 'i2','i3','i4'];

  const users: UsersListType = getAccounts();
  const client = 'A-SCEND Demo';
  const engagement = 'CYPRESS01';
  for (const role in users) {
    const user = users[role]

    if (positiveRoles.includes(role)) {
      it(`${user.description} can see attachments are linked to requests.`, () => {
        cy.login(user.username, user.password);
        cy.clientSetUp(client);
        cy.selectEngagementWithNum(engagement);
        cy.navigate('Requests');
        cy.clickElementContaining('.app-button-group > :nth-child(2)', 'Table');
        cy.finishedLoading();
        cy.clickElement('.contents-box > .clear-link');
        cy.openFilterMod('displayStatus');
        cy.selectCheckboxContains('.ag-set-filter-item', 'Submitted');
        cy.deSelectAllFilter('attachmentFilter');
        cy.selectFilterCheckbox(1);
        cy.clickElement('.request-table-records-total');
        cy.clickOpensCard('refId');
        cy.elementIsVisible('#rim-tab-request-link');
        cy.elementContains('.modal-section-header', 'Uploaded Files');
        cy.elementExists('.evidence-name').then(() => {
          const cardEvidenceList = Cypress.$('.evidence-name').map(function () {
            return this.textContent
          }).get().sort()
          console.log(cardEvidenceList);
          cy.clickElement('.close > .material-icons');
          cy.triggerClick('app-request-attachment > img');
          cy.elementExists('.request-attachment-list').find('li').then(() => {
            const tableEvidenceList = Cypress.$('li').map(function () {
              return this.textContent
            }).get().sort()
            console.log(tableEvidenceList);
            expect(cardEvidenceList).to.deep.eq(tableEvidenceList);
          })
        })
      })
    }
    
    if (!positiveRoles.includes(role)) {
      it(`${user.description} cannot access atachments from requests page.`, () => {
        cy.login(user.username, user.password);
        cy.clientSetUp(client);
        cy.elementDoesNotContain('.menu-title', 'Requests');
        
      })
    }
  }
})