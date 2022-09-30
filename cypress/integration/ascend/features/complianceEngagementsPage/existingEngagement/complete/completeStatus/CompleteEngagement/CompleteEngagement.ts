import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../../helpers/store";
import { CompleteEngagementService } from "../../CompleteEngagementService";
import { RootNavigationItems } from "../../../../../../interfaces/NavigationTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { EngagementStatus } from "../../../../../../../../DataGenerator/ASCENDTypes";

const page = ()=>CompleteEngagementService.getInstance();
const store = StoreService.getStore();
let Engagement: ComplianceEngagementDataGenerator;
let Instance: DataGenerator;
before(()=>{
    DataGenerator.run((__instance: DataGenerator)=>{
        Instance = __instance
        Instance.createPublishedComplianceEngagement().then((__engagement)=>{
            Engagement = __engagement;
            store.setItem('engagementName', Engagement.name);
        });
        Instance.end();
    });
});

beforeEach(()=>{
    Instance.loginAsAdmin().then(()=>{
        Engagement.changeComplianceEngagementStatus(EngagementStatus.Published)
    })
});

When("User clicks {string} button on any 'Status': ['In Progress', 'Published', 'Pending']", (manageButton: string)=>{
    const name = store.getItem('engagementName');
    page().appEngagementSearchbox.focus().clear().type(name)
    page().appAgEngagementsActionButtons.contains(manageButton).first().click();
})

When("User clicks 'ellipses' icon in 'selected engagement-dashboard'",()=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().appDashboardButtons.contains('more_vert').click();
    });
});
When("User clicks {string} button on the 'Remembered Engagement'", (manageButton: string)=>{
    const name = store.getItem('engagementName');
    page().appEngagementSearchbox.focus().clear().type(name)
    page().appAgEngagementsActionButtons.contains(manageButton).first().click();
})

When("User clicks {string} icon in 'dashboard-ellipses' dropdown",(action: string)=>{
    page().getMatMenuPanelActions.contains(action).click({force: true});
})

When("User clicks {string} button in 'Engagement Selected' modal", (button: string)=>{
    page().appConfirmDialog.contains(button).click();
});

When("User clicks 'X' icon in 'Are you sure you want to close the engagement?' modal",()=>{
    page().appConfirmDialogModal.find('i').contains('close').click();
})

When("User targets random {string} with any status: ['In Progress', 'Published', 'Pending']", (engagementName: string)=>{
    const name = store.getItem('engagementName');
	store.setItem(engagementName, name);
    page().appEngagementSearchbox.focus().clear().type(name)
})

When("User clicks {string} button in 'Are you sure you want to close the engagement?' modal",(confirDialogButton: string)=>{
    page().appConfirmDialog.contains(confirDialogButton).click();
})

When("Test remembers {string} value as {string}",(toRemember: string, rememberAs: string)=>{
	const toRememberValue = store.getItem(toRemember);
	store.setItem(rememberAs, toRememberValue);
});

When("User clicks {string} button on 'Remembered Engagement'", (label: string)=>{
    page().appAgEngagementsActionButtons.contains(label).first().click();
});

When("User is routed to 'Compliance Engagements'",()=>{
    cy.navigate(RootNavigationItems.Home);
    cy.navigate(RootNavigationItems.ComplianceEngagements);
});

When("User types remembered value {string} in 'Search Bar'",(remembedKey: string)=>{
    const remembedKeyValue = store.getItem(remembedKey);
    page().appEngagementSearchbox.focus().clear().type(remembedKeyValue)
})

When("{string} is 'visible' in 'left navigation' menu",(navItem: string)=>{
    cy.finishedLoading().then(()=>{
        cy.hasNavigationItem(navItem as RootNavigationItems).should('exist');
    });
})

When("{string} icon in 'dashboard-ellipses' dropdown is not 'visible'",(action: 'Complete Engagement')=>{
    page().getMatMenuPanelActions.contains(action).should('not.exist');
})

When("{string} button at top right corner on 'selected engagement-dashboard' is not 'visible'",(completeEngagement: string)=>{
    page().getAppDashboardButtons.contains(completeEngagement).should('not.exist');
})

Then("'Remembered Engagement' 'Status' equals {string}",(expectedStatus: string)=>{
    page().getEngagementStatusSelect.find('mat-chip').contains(expectedStatus).should('exist');
    cy.get('app-engagement-status-select')
})

Then("Test value {string} equals {string} value", (rememberedValue: string, engagmentName: string)=>{
	const rememberedValueValue = store.getItem(rememberedValue);
	const engagmentNameValue = store.getItem(engagmentName);
	expect(rememberedValueValue).to.eq(engagmentNameValue);
});
 
Then("'Complete Engagement' icon is not 'visible'",()=>{
    page().appCompleteEngagementButton.should('not.exist');
})

Then("{string} snackbar is 'displayed'",(snackbarMsg: string)=>{
    page().getSnackBar.contains(snackbarMsg).should('exist');
});
