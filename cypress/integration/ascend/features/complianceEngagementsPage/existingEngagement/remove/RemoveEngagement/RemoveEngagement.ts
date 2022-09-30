import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../DataGenerator/ASCENDTypes";
import { DataGenerator } from "../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../helpers/store";
import { ExistingengagementMetadata, ExistingengagementService } from "../../ExistingEngagementService";

const page = ()=>ExistingengagementService.getInstance();
const store = StoreService.getStore();

beforeEach(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement)=>{
            Engagement.changeComplianceEngagementStatus(EngagementStatus.Published);
            store.setItem('engagementName', Engagement.name);
        });
    });
});

When("User targets random {string} with any status: ['In Progress', 'Pending', 'Published', 'Report Creation']", (engagementName: string)=>{
    const name = store.getItem('engagementName');
	store.setItem(engagementName, name);
    page().appEngagementSearchbox.focus().clear().type(name)
})

When("Test remembers {string} value as {string}",(toRemember: string, rememberAs: string)=>{
	const toRememberValue = store.getItem(toRemember);
	store.setItem(rememberAs, toRememberValue);
});

Then("Test value {string} equals {string} value", (rememberedValue: string, engagmentName: string)=>{
	const rememberedValueValue = store.getItem(rememberedValue);
	const engagmentNameValue = store.getItem(engagmentName);
	expect(rememberedValueValue).to.eq(engagmentNameValue);
});

When("Test condition 'Status-dropdown-visible' starts if 'User clicks' status dropdown",()=>{
    page().getAppEngagementStatusSelect.within((context)=>{
        const exist = Cypress.$(ExistingengagementMetadata.Ui.MatMenuPanelTriggerIcon, context).length ? true : false
        store.condition = exist;
    })
})

When("User clicks 'Status dropdown' icon on 'Remembered Engagement'", ()=>{
    if(store.condition){
        page().getAppEngagementStatusSelectMatTrigger.click();
    }
});

Then("'Removed' Button is not 'visible'", ()=>{
    if(store.condition){
        page().getMatMenuPanelActions.contains('Removed').should('not.exist');
    }
});

When("User clicks 'Removed' button in 'Status dropdown' menu",()=>{
    if(store.condition){
        page().getMatMenuPanelActions.contains('Removed').click();
    }
});

When("User clicks {string} button in 'Are you sure you want to remove this engagement?' modal",(buttonLabel: string)=>{
    page().getAppDeleteDialogButtons.contains(buttonLabel).click();
});

When("User clicks on 'Remembered Engagement' status", ()=>{
    page().getAppEngagementStatusSelect.click();
});

Then("'Remembered Engagement' status equals {string}",(statusSelected: string)=>{
    page().getAppEngagementStatusSelect.contains(statusSelected).should('exist');
})