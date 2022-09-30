import { But, Then, When } from "cypress-cucumber-preprocessor/steps";
import { DataGenerator } from "../../../../../../DataGenerator/DataGenerator";
import { ExecAction, getUIElement } from "../../../../../../helpers/commonActionHelper";
import { StoreService } from "../../../../../../helpers/store";
import { RootNavigationItems } from "../../../../interfaces/NavigationTypes";
import { UserLandingAgGridHeadColumnsTypes } from "../../../../interfaces/UserLandingAgGridHeadColumnsTypes";
import { UserElementLabels } from "../../../../interfaces/UserTypes";
import { UsersService } from "../../UsersService";

let page: UsersService;
const store = StoreService.getStore(true);

const load = (): UsersService => {
  if (!page) {
    page = new UsersService();
  }
  return page;
};


before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement();
    });
});

When("Test registers 'usersList' interceptor", () => {
    load().registerUserListInterceptor();
});

Then("{string} icon is {string}", (elementLabel: UserElementLabels, action: string) => {
    if (store.condition) {
        const uiOption = page.getUiOptionByLabel(elementLabel);
        ExecAction(uiOption, action);
    }
});

Then("{string} icon is not 'visible'", (elementLabel: UserElementLabels) => {
    if (store.condition) {
        const uiOption = page.getUiOptionByLabel(elementLabel);
        const element = getUIElement(uiOption);
        element.should('not.exist');
    }
});

But("User cannot view {string}", (navItem: RootNavigationItems) => {
    page.shouldntSeeNavItem(navItem);
});

Then("{string} column is 'sortable'", (column: UserLandingAgGridHeadColumnsTypes) => {
    page.canSortUserTable(column);
});

When("Test condition 'icons' starts if any: {list} is logged in", (elements: string[]) => {
    store.condition = elements.includes(store.getItem("currentUserType"));
});