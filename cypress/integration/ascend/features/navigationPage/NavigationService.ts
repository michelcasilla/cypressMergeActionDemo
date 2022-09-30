import {
    NavigationItem,
    NavigationLocation,
    RootNavigationItems,
    ComplianceEngagementNavigationItems,
    ReadinessAssessmentNavigationItems,
    EngagementTypes,
    NavigationLabels
} from "../../interfaces/NavigationTypes";
import { UIOption } from "../../interfaces/UIOptionTypes";
import { FeatureUtil } from "../../utils/FeatureUtil";
import { Features } from "../FeaturesTypes";
import { LoginMetadata } from "../loginPage/LoginService";

export const NavigationMetadata = {
    Intercepts: {
        AccountsFeatures : '/v1/feature/accounts'
    },
    Ui: {
        AppNavigation: 'app-navigation',
        ProfileMenuLink: LoginMetadata.Ui.OpenProfileMenuInfo,
        ProfileMenuOptions: `${LoginMetadata.Ui.AppUserOptions} > ul > li`,
        SubMenuItem: '.navigation_content--item',
        SubMenuItemChild: '.navigation_content--item .child-routes',
        SubMenuItemsOnly: 'mat-list-item .mat-list-item-content > div[fxlayout="column"]',
        AppReadinessDashboard : 'app-readiness-dashboard',
        AppDashboardTopBar : 'app-dashboard-top-bar',
        [NavigationLabels.AccountQuestions] : {
            selector : 'app-dashboard-top-bar .material-icons-outlined',
            text : 'mail'
        },
        [NavigationLabels.ClientNameDropdown] : {
            selector : 'app-dashboard-top-bar .mat-form-field-type-mat-select',
            text : 'Client Name'
        },
        [NavigationLabels.Profiledropdown] : {
            selector : 'app-dashboard-top-bar .mat-menu-trigger',
            text : 'expand_more'
        },
        [NavigationLabels.GenerateReport] : {
            selector : '.readiness-dashboard-header-top-right_button--fill',
            text : 'Generate Report'
        },
    },
}

export class NavigationService {
    private __client: string;
    private featureUtil: FeatureUtil;
    public static instance: NavigationService;

    constructor() {
        this.featureUtil = new FeatureUtil();
    }

    /**
     * Gets an array of navigation items on the page.
     */
    get navigationItems(): Cypress.Chainable<NavigationItem[]> {
        return cy.get("@navigationItems") as unknown as Cypress.Chainable<NavigationItem[]>;
    }
    
    set client(client: string) {
        this.__client = client;
    }

    get enabledFeatures(): Cypress.Chainable<Features[]>{
        return this.featureUtil.getEnabledFeatures(this.__client);
    }
    /**
     * Loads navigation items
     * * @returns Instance of the navigation page.
    */
    loadNavigationItems(): NavigationService{
        const navItems: NavigationItem[] = [];
            cy.wait(500)
                .get(NavigationMetadata.Ui.AppNavigation)
                .find(NavigationMetadata.Ui.SubMenuItemsOnly)
                .each($element => {
                    navItems.push({
                        icon: $element.find("div > i").text(),
                        text: $element.find("div > label").text(),
                        location: NavigationLocation.Left
                    });
                }).then(() => {
                    cy.wrap(navItems).as("navigationItems");
                });
        return this;
    }

    /**
     * Navigates to a specified page if it is visible in the navigation menu.
     * @param navItem The page to navigate to
     * @returns Instance of the navigation page.
     */
     navigate(navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems): NavigationService {
        cy.navigate(navItem);
        return this;
    }

    /**
     * Determines if an item is visible within the navigation pane.
     * @param item Navigation Item to determine if it is visible
     * @returns Instance of the navigation page.
     */
    isVisible(item: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems): NavigationService {
        cy.get(NavigationMetadata.Ui.AppNavigation)
            .find(NavigationMetadata.Ui.SubMenuItem)
            .should('contain', item.toString());
        return this;
    }

    /**
     * Determines if an item is not visible within the navigation pane.
     * @param item Navigation Item to determine if it is not visible
     * @returns Instance of the navigation page.
     */
     isNotVisible(item: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems): NavigationService {
        cy.get(NavigationMetadata.Ui.AppNavigation)
            .find(NavigationMetadata.Ui.SubMenuItem)
            .should('not.contain', item.toString());

        return this;
    }

    /**
     * Validate if a user can navigate to and option
     * @params navItem of types RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems
     * @returns Instance of the navigation page.
    */
    cantNavigateTo(navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems): NavigationService {
        this.navigationItems.then((items: NavigationItem[])=>{
            const match = items.filter((item: NavigationItem) => item.text == navItem).length;
            expect(match, `User can't navigate to ${navItem}`).eq(0);
        });
        return this;
    }

    /**
     * Navigate if a feature is enabled
     * @params feature of types RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems
     * @returns Instance of the navigation page.
    */
    navigateIfFeatureOn(feature: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems): NavigationService{
        this.featureUtil.isFeatureAvailable(feature, this.__client).then((isAvailable)=>{
            if(isAvailable){
                this.cantNavigateTo(feature as RootNavigationItems);
            }else{
                cy.log(`${feature} feature if off`)
            }
        });
        return this;
    }

    selectReadinessAssessment(): NavigationService {
        cy.finishedLoading();
        cy.selectEngagement('STeal_upgradeCTA', 'Readiness Assessments' as EngagementTypes);
        return this;
    }

    getUiOptionByLabel(label: NavigationLabels): UIOption {
        return NavigationMetadata.Ui[label];
    }

    shouldntSeeNavItem(navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems): UsersService {
        cy.get(NavigationMetadata.Ui.AppNavigation)
            .find(NavigationMetadata.Ui.SubMenuItem)
            .should('not.contain', navItem.toString());
        return this;
      }

    public static getInstance(): NavigationService{

        if(!NavigationService.instance){
            NavigationService.instance = new NavigationService();
        }

        return NavigationService.instance;

    }
}