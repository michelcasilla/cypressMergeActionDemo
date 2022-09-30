import { getAccounts } from "../../../../helpers/environment";
import { UsersListType } from "../../interfaces/UserTypeInterfaces";
import { RequestsSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

describe('User is able to view Request Card elements', () => {
  const users: UsersListType = getAccounts();
  const client = 'A-SCEND Demo';
  const engagement = 'CYPRESS01';
  const request = {
    refId:'R-1029',
    class: 'Training',
    category: 'Training Program',
    type: 'General',
    location: 'Main Office',
    description: 'Training materials used for security awareness training and applicable job responsibility training (S1)(A1)',
  };
  const mainSelector = 'app-request-dialog > .content-container > .content-container_main';
  const sidebarSelector = 'app-request-dialog > .content-container > .content-container_side-bar';
  const internalRoles: Array<string> = ['i1','i2','i3','i4'];
  const assignUserRoles: Array<string> = ['e1','e2','e3','i1'];

  for (const role in users) {
    const user = users[role]
    it(`Verify ${user.description} can view UI elements exist on Request Card.`, () => {
      cy.goToRequests(user, client, engagement);
      cy.typeInField('app-searchbox input', request.refId);
      cy.clickElement(RequestsSelectors.Card);
      cy.finishedLoading();
      
      // Main container
      const firstRow = `${mainSelector} > div:nth-child(1)`;
      cy.elementContains(`${firstRow} h6`, `${request.class} / ${request.category}`);
      cy.elementContains(`${firstRow} h2`, `${request.refId} ${request.type}`);
      
      const secondRow = `${mainSelector} > div:nth-child(2)`;
      cy.elementContains(`${secondRow} h3`, 'Description');
      cy.elementContains(`${secondRow} p`, request.description);
      cy.elementContains(`${mainSelector} > app-align-guidance ${GenericUiSelectors.AccordionClosed}`, 'A-LIGN Guidance');

      if (internalRoles.includes(role)) {
        cy.clickElementContaining(`${mainSelector} ${GenericUiSelectors.Button}`, 'more_vert');
        cy.clickElementContaining(GenericUiSelectors.Button, 'Add Consultant Advice');

        cy.elementContains(`${mainSelector} > app-consultant-advice ${GenericUiSelectors.AccordionExpanded}`, 'Consultant Advice');
      }

      const evidenceRow = `${mainSelector} > app-evidence`;
      cy.elementContains(`${evidenceRow} h3`, 'Evidence');
      cy.elementContains(`${evidenceRow} ${GenericUiSelectors.Button}`, 'Other Engagement Evidence');
      const evidenceGrid = `${mainSelector} app-evidence`;
      cy.elementExists(`${evidenceGrid} .mat-grid-tile:nth-child(1) input`);
      cy.elementContains(`${evidenceGrid} .mat-grid-tile:nth-child(1) .evidence_container_content--description`, 'Drag and drop to upload');
      cy.elementContains(`${evidenceGrid} .mat-grid-tile:nth-child(2) .evidence_container_content--description`, 'Link evidence from this engagement');

      const activityRow = `${mainSelector} app-activity`;
      cy.elementContains(`${activityRow} h3`, 'Activity');
      const tabGroup = `${activityRow} ${GenericUiSelectors.TabGroup}`;
      cy.elementContains(`${tabGroup} .mat-tab-labels .mat-tab-label:nth-child(1)`, 'Uploaded Files');
      cy.elementContains(`${tabGroup} .mat-tab-labels .mat-tab-label:nth-child(2)`, 'Comments');
      cy.elementContains(`${tabGroup} .mat-tab-labels .mat-tab-label:nth-child(3)`, 'History');

      // Sidebar
      cy.elementContains(`${sidebarSelector} h3`, 'Request Status');
      cy.elementExists(`${sidebarSelector} app-ag-status-selector`);

      cy.elementContains(`${sidebarSelector} app-due-date h3`, 'Due Date');

      cy.elementContains(`${sidebarSelector} app-assigned h3`, 'Assigned to');
      if (assignUserRoles.includes(role)) {
        cy.elementContains(`${sidebarSelector} app-assigned div`, 'Edit User(s)');
      }

      cy.elementContains(`${sidebarSelector} app-request-type h3`, 'Request Type');
      cy.elementContains(`${sidebarSelector} app-request-type span`, request.type);

      cy.elementContains(`${sidebarSelector} app-request-dialog-location h3`, 'Location');
      
      cy.elementExists(`${sidebarSelector} .mat-divider.mat-divider-horizontal`);

      const serviceBreakdown = `${sidebarSelector} app-service-breakdown`
      cy.elementContains(`${serviceBreakdown} h3`, 'Service, Criteria & Consultant');
      cy.elementContains(`${serviceBreakdown} table tr:nth-child(1) td:nth-child(1)`, 'Service:');
      cy.elementContains(`${serviceBreakdown} table tr:nth-child(2) td:nth-child(1)`, 'Criteria:');
      cy.elementContains(`${serviceBreakdown} table tr:nth-child(3) td:nth-child(1)`, 'Consultant:');
    });
  }
})