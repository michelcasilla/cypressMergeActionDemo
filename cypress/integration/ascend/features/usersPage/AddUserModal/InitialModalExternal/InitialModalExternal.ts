import { Then, When, But } from "cypress-cucumber-preprocessor/steps";
import { ExecAction } from "../../../../../../helpers/commonActionHelper";
import { RootNavigationItems } from "../../../../interfaces/NavigationTypes";
import { UserElementLabels } from "../../../../interfaces/UserTypes";
import { UsersService } from "../../UsersService";

let page: UsersService;

const load = (): UsersService => {
  if (!page) {
    page = new UsersService();
  }
  return page;
};


When("User clicks 'Add User' button", () => {
    load().addUserButton.click({force: true});
});

Then("{string} is {string}", (elementLabel: UserElementLabels, action: string) => {
    const element = page.getUiOptionByLabel(elementLabel);
    ExecAction(element, action);
});

Then("User types an email address in {string} field", (element: UserElementLabels) => {
  page.typeUserEmail();
});

But("User cannot view 'Add User' button", () => {
  page.addUserButton.should('not.exist');
});

But("User cannot view {string}", (navItem: RootNavigationItems) => {
  page.shouldntSeeNavItem(navItem);
});