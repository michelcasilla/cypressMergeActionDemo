// /* eslint-disable @typescript-eslint/no-explicit-any */
// describe('User is able to view CrossWalk within Dashboard', () => {
//   const positiveRoles: Array<string> = ['e1', 'e2', 'e3','i1', 'i2', 'i3', 'i4'];

//   const users: UsersListType = getAccounts();
//   const client = 'A-SCEND Demo';
//   const engagement = 'CYPRESS02';
//   for (const role in users) {
//     const user = users[role]
    
//     if (positiveRoles.includes(role)) {
//       it(`${user.description} can view Crosswalk details and request info`, () => {
//         cy.login(user.username, user.password);
//         cy.setUp(client, engagement);
//         cy.navItem('Dashboard');
//         cy.scrollToElement('.d-flex.flex-row.justify-content-center.align-items-center');
//         cy.elementContains('.ascend-card > .ascend-card-body > .value-field', '%');
//         //check that there are 3
//         cy.hasLength('round-progress', 3);
//         cy.clickElementContaining('.d-flex.flex-row.justify-content-center.align-items-center', 'Show All');
//         //check that there are 6 after click
//         cy.greaterThan('round-progress', 3);
//         cy.clickElementContaining('.d-flex.flex-row.justify-content-center.align-items-center', 'Show Less');
//         //check that back to 3 after click  
//         cy.hasLength('round-progress', 3);
//         cy.elementContains('.subtitle', 'How closely will your completed requests map to other services?');
//         cy.elementContains('.report-header-with-info button', 'Request Info');
        
//       })
//     }
//     if (!positiveRoles.includes(role)) {
//       it(`${user.description} cannot view Crosswalk details and request info`, () => {
//         cy.login(user.username, user.password);
//         cy.clientSetUp(client);
//         cy.elementDoesNotContain('.menu-title', 'Dashboard');

//       })
//     }
//   }
// });
// function getAccounts(): any {
//   throw new Error("Function not implemented.");
// }

