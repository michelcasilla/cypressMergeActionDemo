import { But, Then } from 'cypress-cucumber-preprocessor/steps';
import { NavigationService } from '../../NavigationService';
import { RootNavigationItems, ComplianceEngagementNavigationItems, ReadinessAssessmentNavigationItems, NavigationLocation } from '../../../../interfaces/NavigationTypes';

let page: NavigationService;

const load = (): NavigationService => {
    if (!page) {
        page = new NavigationService();
    }
    return page;
}

Then('User sees {int} menu options', (count: number) => {
    load().loadNavigationItems().client = 'A-SCEND Demo';
    page.navigationItems.then((items) => {
        expect(items.length).to.equal(count);
    });
});

Then('User sees {int} menu options in the {string} menu', (count: number, location: NavigationLocation) => {
    load().navigationItems
        .then(items => expect(items.filter(i => i.location === location).length).to.equal(count));
});

Then('User can navigate to {string}', (navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems) => {
    load().isVisible(navItem);
});

Then('User navigates to {string} feature', (navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems) => {
    load().navigateIfFeatureOn(navItem);
});

But("User cannot navigate to {string}", (navItem: RootNavigationItems | ComplianceEngagementNavigationItems | ReadinessAssessmentNavigationItems) => {
    load().isNotVisible(navItem);
})
