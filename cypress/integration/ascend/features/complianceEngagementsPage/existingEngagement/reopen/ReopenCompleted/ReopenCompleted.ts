import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../DataGenerator/ASCENDTypes";
import { DataGenerator } from "../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../helpers/store";
import { ExistingengagementService } from "../../ExistingEngagementService";
import { ComplianceEngagementDataGenerator } from "../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { RequestGenerator } from "../../../../../../../DataGenerator/RequestGenerator";


const page = (): ExistingengagementService =>ExistingengagementService.getInstance();
const store = StoreService.getStore();
let Instance!: DataGenerator;
let Engagement: ComplianceEngagementDataGenerator;

before(()=>{
    DataGenerator.run((__instance: DataGenerator)=>{
        Instance = __instance;
        Instance.createPublishedComplianceEngagement().then((__engagement: ComplianceEngagementDataGenerator)=>{
            Engagement = __engagement;
            Engagement.service().markAllCriteriaAsNotApplicable().save().then((Request: RequestGenerator)=>{
                Engagement.changeComplianceEngagementStatus(EngagementStatus.Published);
                Request.changeAllRequestToOpen()
                    .changeSomeRequestToInProgress()
                    .changeSomeRequestToSubmitted()
                    .changeSomePopulationRequestToAccepted();
                Engagement.changeComplianceEngagementStatus(EngagementStatus.Complete);
            })
            store.setItem('engagementName', Engagement.name);
         });
    });
});

beforeEach(()=>{
    Instance.loginAsAdmin().then(()=>{
        Engagement.changeComplianceEngagementStatus(EngagementStatus.Complete);
    });
})

Then("User targets random 'Engagement Name' with 'Completed' status", (engagementName: string)=>{
    const name = store.getItem('engagementName');
	store.setItem(engagementName, name);
    page().appEngagementSearchbox.focus().clear().type(name)
})

Then("Test remembers 'Engagement Name' value as {string}",(rememberAs: string)=>{
    store.setItem(rememberAs,store.getItem('engagementName'))
    store.setItem('Engagement Name',store.getItem('engagementName'))
});

Then("Test value {string} equals 'Engagement Name' value", (rememberedValue: string)=>{
	const rememberedValueValue = store.getItem(rememberedValue);
	const engagementNameValue = store.getItem('Engagement Name');
	expect(rememberedValueValue).to.eq(engagementNameValue);
});

When("User clicks 'Status dropdown' icon on 'Remembered Engagement'", ()=>{
    if(store.condition){
        page().getAppEngagementStatusSelectMatTrigger.click();
    }
});
When("'Status dropdown' icon is not 'visible' on 'completed engagement'", ()=>{
    const name = store.getItem('engagementName');
    page().appEngagementSearchbox.focus().clear().type(name);
    page().getAppEngagementStatusSelectMatTrigger.should("not.exist");
});

When("User clicks on any status: ['In Progress', 'Pending', 'Published', 'Report Creation'] button in 'Status dropdown' menu", ()=>{
    if(store.condition){
        page().getMatMenuPanelActions.then((element: JQuery<HTMLElement>)=>{
            store.setItem('newStatus', element.text().trim())
            cy.wrap(element).click();
        })
    }
});

Then("User clicks {string} button in 'Are you sure you want to change the engagement status?' modal",(buttonLabel: string)=>{
    page().getAppWarningDialogButtons.contains(buttonLabel).click({force: true}).wait(600);
});

Then("Test remembers 'status' value as {string}",(statusStringKey: string)=>{
    store.setItem(statusStringKey, store.getItem('newStatus'));
	page().getAppEngagementStatusSelectMataChip.invoke('text').then(status=>{
        store.setItem('oldStatus', status);
    })
});

Then("Test value {string} equals 'status' value", (statusString: string)=>{
    expect(store.getItem(statusString)).not.empty
});

When("User clicks {string} button in the 'Open Service' modal",(buttonLabel: string)=>{
    page().getAppWarningDialogButtons.contains(buttonLabel).click({force: true}).wait(600);
});

When("User clicks on 'Remembered Engagement' status", ()=>{
    page().getAppEngagementStatusSelect.click();
});
Then("'Remembered Engagement' status equals {string}",(statusSelected: string)=>{
    page().getAppEngagementStatusSelect.contains(statusSelected).should('exist');
})
Then("Test value 'status string' equals 'status'",(statusSelected: string)=>{
    page().getAppEngagementStatusSelect.contains(statusSelected).should('exist')
})

Then("'Remembered Engagement' value {string} equals new remembered {string} value",(statusSelected: string)=>{
	page().getAppEngagementStatusSelectMataChip.invoke('text').then(status=>{
        const statusSelectedValue = store.getItem(statusSelected);
        expect(statusSelectedValue).to.be.equal(status.trim())
    })
})