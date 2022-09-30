import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../../DataGenerator/ASCENDTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../../helpers/store";
import { RootNavigationItems } from "../../../../../../interfaces/NavigationTypes";
import { ExistingengagementService } from "../../../ExistingEngagementService";

const store = StoreService.getStore();
const page = ()=>ExistingengagementService.getInstance();

beforeEach(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.service().markAllCriteriaAsNotApplicable().save().then(()=>{
                Engagement.changeComplianceEngagementStatus(EngagementStatus.ReportCreation);
            })
            store.setItem('engagementName', Engagement.name);
        });
    });
});


When("User targets random {string} with 'Report Creation' status", (engagementName: string)=>{
    const engagementNameValue = store.getItem('engagementName');
    store.setItem(engagementName, engagementNameValue);
    page().appEngagementSearchbox.focus().clear().type(engagementNameValue)
})

Then("'Complete Engagement' button is not 'visible'", ()=>{
    page().getAppEngagementStatusSelectMatTrigger.should('not.exist');
})

When("Test remembers {string} value as {string}", (storeKey: string, rememberAs: string)=>{
    const engagementNameValue = store.getItem(storeKey);
    expect(engagementNameValue).not.empty;
    store.setItem(rememberAs, engagementNameValue)
})

Then("Test value {string} equals {string} value", (rememberedKey: string, storedKey: string)=>{
    const rememberedValue = store.getItem(rememberedKey);
    const storedKeyValue = store.getItem(storedKey);
    expect(storedKeyValue).to.eq(rememberedValue);
})

When("User clicks {string} button on 'Remembered Engagement'", (manageButton: string)=>{
    const name = store.getItem('engagementName');
    page().appEngagementSearchbox.focus().clear().type(name)
    page().appAgEngagementsActionButtons.contains(manageButton).first().click();
})

When("User clicks {string} button in 'Engagement Selected' modal", (button: string)=>{
    page().appConfirmDialog.contains(button).click();
});

When("{string} button at top right corner on 'selected engagement-dashboard' is 'visible'", (completeEngagement: string)=>{
    page().getAppDashboardButtons.contains(completeEngagement).should('exist');
});

When("User clicks 'ellipses' icon in 'selected engagement-dashboard'", ()=>{
    page().getMatMenuPanelTrigger.click()
});

When("{string} icon is 'visible' in 'dashboard-ellipses' dropdown",(action: string)=>{
    page().getMatMenuPanelActions.contains(action).should('exist');
});

When("User clicks away from 'dashboard-ellipses' dropdown",()=>{
    page().getMatMenuPanelTrigger.click({force: true})
});

When("User clicks {string} button at top right corner on 'selected engagement-dashboard'",(completeEngagment: string)=>{
    page().getAppDashboardButtons.contains(completeEngagment).click();
});

When("User clicks {string} button in 'Are you sure you want to close the engagement?' modal",(confirDialogButton: string)=>{
    page().appConfirmDialog.contains(confirDialogButton).click();
})

When("User clicks 'X' icon in 'Are you sure you want to close the engagement?' modal",()=>{
    page().appConfirmDialogModal.find('i').contains('close').click();
})

When("User clicks {string} icon in 'dashboard-ellipses' dropdown",(action: string)=>{
    page().getMatMenuPanelActions.contains(action).click({force: true});
})

Then("{string} snackbar is 'displayed'",(snackbarMsg: string)=>{
    cy.get('align-snack-bar-success').contains(snackbarMsg).should('exist');
});

When("User is routed to 'Compliance Engagements'",()=>{
    cy.navigate(RootNavigationItems.Home);
    cy.navigate(RootNavigationItems.ComplianceEngagements);
});

When("User types remembered value {string} in 'Search Bar'",(remembedKey: string)=>{
    const remembedKeyValue = store.getItem(remembedKey);
    page().appEngagementSearchbox.focus().clear().type(remembedKeyValue)
})

Then("'Remembered Engagement' 'Status' equals {string}",(expectedStatus: string)=>{
    cy.get('app-engagement-status-select').find('mat-chip').contains(expectedStatus).should('exist');
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