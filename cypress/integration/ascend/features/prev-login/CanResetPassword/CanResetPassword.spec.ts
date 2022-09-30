import { LoginMetadata } from "../../loginPage/LoginService";

describe('Can reset password', () => {
    beforeEach('Navigate to Reset Password Page', () => {
        cy.resetPassword();
    });

    afterEach(() => {
        cy.resetPasswordConfirmationPage();
    });

    // START - POSITIVE TEST CASES
    it('Check that user can reset their password with emails not ending in .com', () => {
        cy.typeInField(LoginMetadata.Ui.FormControl, 'john@email.net')
    });

    it('Check that user can reset their password with emails not ending in .com', () => {
        cy.typeInField(LoginMetadata.Ui.FormControl, 'john@email.org')
    });
    // END POSITIVE TEST CASES
});