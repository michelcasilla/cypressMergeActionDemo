import { But, Then, When } from "cypress-cucumber-preprocessor/steps";
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


When("Test registers 'usersList' interceptor", () => {
    load().registerUserListInterceptor();
});

Then("User hovers on {string} button", (label: UserElementLabels) => {
    load().hoverHeader(label);
});

Then("User clicks on {string} button", (label: UserElementLabels) => {
    load().hoverHeader(label).clickHeader(label);
});

Then("User types text in {string} field", (label: UserElementLabels) => {
    load().searchOnFilter(label);
});

Then("{string} is 'filterable'", (label: UserElementLabels) => {
    load().checkTableData(label).resetFilter();
});

Then("{string} column is not 'filterable'", (label: UserElementLabels) => {
    load().hoverHeader(label).getFilterIcon(label).should('not.exist');
});

But("User cannot view {string}", (navItem: RootNavigationItems) => {
    load().shouldntSeeNavItem(navItem);
});