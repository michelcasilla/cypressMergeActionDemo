import { GroupedRoles, getGroupedUsersByPosNegRoles } from '../../../../helpers/getGroupedUsersByPosNegRoles';
import { CLIENT_NAME, User } from '../../../../helpers/environment';

describe('User is able to change client by selecting Client Name in Left Nav Footer', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['e1','e2','e3','e4','e5','i1','i2','i3','i4']);
  const testRailCase = 'C961';

  context(
    `Positive users roles should be able to change client by selecting Client Name in Left Nav Footer`,
    () => {
      userTypes.positive.forEach((user: User) => {

        it(`${user.description} is able to change Client in A-SCEND that their role has access to ${testRailCase}`, () => {
          cy.login(user.username, user.password);
          // set a client
          cy.clientSetUp(CLIENT_NAME);
          // open the search
          cy.selectRandomAccount(CLIENT_NAME);
          // confirm change accountdialog
          cy.appConfirmDialogOrReject('Cancel').wait(300)
          // Check that the account selected is the same that at first
          cy.getCurrentAccount()
            .should(($newClient) => {
              expect($newClient.text().trim()).to.eq(CLIENT_NAME)
            })

          cy.selectRandomAccount(CLIENT_NAME);
          // confirm change accountdialog
          cy.appConfirmDialogOrReject().wait(300)
          // Check that the account selected is not the same that at first was introduces
          cy.getCurrentAccount()
            .should(($newClient) => {
              expect($newClient.text().trim()).not.to.eq(CLIENT_NAME)
            })
        
        });
      });
    }
  );

});