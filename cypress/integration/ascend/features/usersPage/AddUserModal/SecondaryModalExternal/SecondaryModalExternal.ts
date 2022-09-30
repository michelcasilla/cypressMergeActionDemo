import { Then, When, But } from "cypress-cucumber-preprocessor/steps";
import { ExecAction } from "../../../../../../helpers/commonActionHelper";
import { RootNavigationItems } from "../../../../interfaces/NavigationTypes";
import { UserButtons, UserElementLabels } from "../../../../interfaces/UserTypes";
import { UsersService } from "../../UsersService";

let page: UsersService;

const load = (): UsersService => {
  if (!page) {
    page = new UsersService();
  }
  return page;
};


When("User clicks {string} button", (element: UserButtons) => {
    const _page = load();
    switch (element) {
        case UserButtons.AddUser:
            _page.addUserButton.click({force: true});
            break;
        case UserButtons.Continue:
            _page.modalContinueButton.click({force: true});
            break;
        case UserButtons.AddUserModal:
            _page.addUserModalButton.click({force: true});
            break;
        default:
    }
});

Then("{string} is {string}", (elementLabel: UserElementLabels, action: string) => {
    const element = page.getUiOptionByLabel(elementLabel);
    ExecAction(element, action);
});

Then("User types an email address in {string} field", (element: UserElementLabels) => {
    page.typeUserEmail();
});

Then("User views secondary 'Add User' modal", () => {
    page.contactDetailsModal.should('exist');
});

Then("User clicks 'Role' dropdown", () => {
    page.rolesDropdown.click({force: true});
});

Then("User clicks a 'role'", () => {
    page.rolesDropdownItems.first().click({force: true});
});

Then("User types a {string}", (elementLabel: UserElementLabels) => {
    const elementUiOption = page.getUiOptionByLabel(elementLabel);
    cy.typeInField(elementUiOption.selector, elementLabel)
});

But("User cannot view 'Add User' button", () => {
    page.addUserButton.should('not.exist');
});


But("User cannot view {string}", (navItem: RootNavigationItems) => {
    page.shouldntSeeNavItem(navItem);
});