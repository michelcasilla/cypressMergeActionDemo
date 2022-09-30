import { Then, When, But } from "cypress-cucumber-preprocessor/steps";
import { ComplianceEngagementNavigationItems, RootNavigationItems } from "../../../../interfaces/NavigationTypes";
import { UserLandingAgGridHeadColumnsTypes } from "../../../../interfaces/UserLandingAgGridHeadColumnsTypes";
import { UserElementLabels } from "../../../../interfaces/UserTypes";
import { UsersService } from "../../UsersService";

let page: UsersService;

const load = (): UsersService => {
  if (!page) {
    page = new UsersService();
  }
  return page;
};

When("User navigates to the Users Landing page", () => {
  load().navigate(ComplianceEngagementNavigationItems.Users);
});

Then("'Search bar' is 'visible'", () => {
  load().searchBarIsVisible();
});

Then("'Search magnifier' is 'visible'", () => {
  load().searchBoxMagnifyingIcon();
});

Then("'Add User CTA' is 'clickable'", () => {
  load().addUserCTAIsVisible();
});

Then("'Vertical ellipsis' is 'clickable'", () => {
  load().userPageVerticalEllipsisIsVisible();
});

Then("{string} column is 'sortable'", (column: UserLandingAgGridHeadColumnsTypes) => {
  load().canSortUserTable(column);
});

Then("'Edit Action' is 'clickable'", () => {
  load().editActionButtonIsVisible();
});

Then("'Restore Action' is 'clickable'", () => {
  load().restoreActionButtonIsVisible();
});

But("{string} is not 'visible'", (label: UserElementLabels) => {
  if (label === UserElementLabels.Users) {
    cy.finishedLoading()
      .doesNothaveNavigationItem(RootNavigationItems.Users);
  } else {
    load().elementNotVisible(label);
  }
});
