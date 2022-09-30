import { IDP_URL } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppNavigationSelector, GenericUiSelectors } from "../../../utils/CssSelectors";
import { LoginMetadata } from "../../loginPage/LoginService";


describe("Login and Verify", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['e1','e2','e3','e4','e5','i1','i2','i3','i4']);
  const testRailCase = 'C936';

  context(
    `Positive user should be able to login.`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} user can login ${testRailCase}`, () => {
            cy.login(user.username, user.password);
            cy.get(AppNavigationSelector.appNavigation)
                .find(AppNavigationSelector.navigationHeaderLogo)
                .should('exist');
        });
      });
    }
  );
  
  context(
    `Negative user shouldn't be able to login.`,
    () => {
        const fakeUser = 'fakeuser@domain.com';
        const fakePassword = 'fakePassword';
        it(`${fakeUser} user can login ${testRailCase}`, () => {
            cy.visit(IDP_URL);
            cy.typeInField(LoginMetadata.Ui.EmailAddress, fakeUser);
            cy.typeInField(LoginMetadata.Ui.Password, fakePassword);
            cy.clickElement(LoginMetadata.Ui.LoginButton);
            cy.get(GenericUiSelectors.NgbAlert)
                .should('contain','Invalid e-mail/password combination. Please try again.');
        });
    }
  );
});