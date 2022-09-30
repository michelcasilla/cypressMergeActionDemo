/* eslint-disable @typescript-eslint/no-unused-vars */
import { But, Then, When } from "cypress-cucumber-preprocessor/steps";
import { RootNavigationItems, ComplianceEngagementNavigationItems, ReadinessAssessmentNavigationItems } from "../../../../interfaces/NavigationTypes";
import { UsersService } from "../../UsersService";

let __page: UsersService;

const page = (): UsersService=>{
    if(!__page){
        __page = new UsersService();
    }
    return __page;
}

When("Test registers 'usersList' interceptor", () => {
    page().registerUserListInterceptor();
});

When("User views the 'Search Bar'",()=>{
    page().searchBarIsVisible();
});

Then("the 'Search Bar' is 'clickable'",()=>{
    page().searchBarIsVisible();
});

Then("Search bar is {string} when value is entered",()=>{
    page().filterSearchBar();
});

Then("Search bar 'X' is clicked",()=>{
    page().clearSearchBar();
});

Then('Search bar is cleared',()=>{
    page().clearSearchBar();
});

But("User cannot view {string}", (navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems) => {
    page().shouldntSeeNavItem(navItem);
});