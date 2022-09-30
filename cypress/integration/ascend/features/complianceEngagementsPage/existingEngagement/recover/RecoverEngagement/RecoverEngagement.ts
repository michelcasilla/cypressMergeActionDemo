import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../DataGenerator/ASCENDTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../helpers/store";
import { ExistingengagementService } from "../..//ExistingEngagementService";

const store = StoreService.getStore();
const page = () => ExistingengagementService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.service().markAllCriteriaAsNotApplicable().save().then(()=>{
                Engagement.changeComplianceEngagementStatus(EngagementStatus.Removed);
            })
            store.setItem('engagementName', Engagement.name);
        });
    });
});

Then("{string} with 'Removed' status are not 'visible'", (engagementName: string) => {
    const engagementNameValue = store.getItem('engagementName');
    store.setItem(engagementName, engagementNameValue);
    page().appEngagementSearchbox.focus().clear().type(engagementNameValue);
    page().tableData.should('have.length', 0);
});

Then("User targets random {string} with 'Removed' status", (engagementName: string) => {
    const engagementNameValue = store.getItem('engagementName');
    store.setItem(engagementName, engagementNameValue);
    page().appEngagementSearchbox.focus().clear().type(engagementNameValue);
});

Then("Test remembers {string} value as {string}", (storeKey: string, rememberAs: string)=>{
    const storeKeyValue = store.getItem(storeKey);
    expect(storeKeyValue).not.empty;
    store.setItem(rememberAs, storeKeyValue)
})

Then("Test value {string} equals {string} value", (rememberedKey: string, storedKey: string)=>{
    const rememberedValue = store.getItem(rememberedKey);
    expect(rememberedValue).not.empty;
    const storedKeyValue = store.getItem(storedKey);
    expect(storedKeyValue).not.empty;
    expect(storedKeyValue).to.eq(rememberedValue);
})

When("User clicks 'Status dropdown' icon on {string}", (rememberedKey: string)=>{
    const rememberedValue = store.getItem(rememberedKey);
    page().appEngagementSearchbox.focus().clear().type(rememberedValue);
    page().getAppEngagementStatusSelect.find('.mat-menu-trigger').click({force: true});
})

When("User clicks on any status: ['In Progress', 'Pending', 'Published', 'Report Creation'] button in 'Status dropdown' menu",()=>{
    page().getStatusDropdownMenuList.then((optionList)=>{
        const index = Math.ceil(Math.random() * optionList.length) -1;
        const randomOption = optionList[index < 0 ? 0 : index];
        cy.wrap(randomOption).invoke('text').then((value)=>{  
            store.data.status = value.trim();  
        });
        cy.wrap(randomOption).parent().parent().click({force: true});
    })
});

Then("User clicks {string} button in 'Are you sure you want to recover this engagement?' modal", (dialogModalButton: string)=>{
    page().appInformativeDialogButtons.contains(dialogModalButton).click({force: true});
})

Then("{string} status equals {string}", (engagementKey: string, statusKey: string)=>{
    const rememberedValue = store.getItem(engagementKey);
    const statusValue = store.getItem(statusKey);
    page().appEngagementSearchbox.focus().clear().type(rememberedValue);
    page().getAppEngagementStatusSelect.find('mat-chip').last().then((status)=>{
        expect(statusValue).to.eq(status.get(0).innerText.trim());
    })
})
