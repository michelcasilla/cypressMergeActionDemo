import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../../helpers/store";
import { ExistingengagementMetadata, ExistingengagementService } from "../../../ExistingEngagementService";

const store = StoreService.getStore();
const page = (): ExistingengagementService=>ExistingengagementService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.milestones().enableAll().save();
            store.setItem('engagementName', Engagement.name);
        });
        Instance.end();
    });
});

Then("{string} button is not 'visible'",(buttonName: string)=>{
    if(store.condition){
        page().appAgEngagementsActionButtons.contains(buttonName).should('not.exist');
    }
});

When("User targets random {string} with 'Pending' status", (selectedEngagmentName: string)=>{
    const name = store.getItem('engagementName');
    store.setItem(selectedEngagmentName, name);
    page().appEngagementSearchbox.focus().clear().type(name);
})

When("Test remembers {string} value as {string}", (storeValue: string, storeKey: string)=>{
    const storeKeyValue = store.getItem(storeValue);
    expect(storeKeyValue).not.empty;
    store.setItem(storeKey, storeKeyValue);
});

When("User clicks {string} button on remembered 'Selected Engagement Name'", (manageButton: string)=>{
    const name = store.getItem('engagementName');
    page().appEngagementSearchbox.focus().clear().type(name)
    page().appAgEngagementsActionButtons.contains(manageButton).first().click();
})

Then("Test value {string} equals {string} value", (selectedENgagmentNameString: string, selectedEngagmentName: string)=>{
    const selectedENgagmentNameStringValue = store.getItem(selectedENgagmentNameString);
    const selectedEngagmentNameValue = store.getItem(selectedEngagmentName);
    expect(selectedENgagmentNameStringValue).to.eq(selectedEngagmentNameValue);
})

When("User clicks {string} button in 'Engagement Selected' modal", (button: string)=>{
    page().appConfirmDialog.contains(button).click();
});

When("User clicks 'Next Step' button in the 'Engagement Details' step",()=>{
    cy.finishedLoading().wait(2000).then(()=>{
        page().nextStepButton.click();
    });
})

When("User clicks random {string} icons in 'Milestone toggle' field", (milestoneToggle: string)=>{
    page().getMilestonesList.first().within(()=>{
        page().getMilestoneMatBody.invoke('text').then((milesStoneName: string)=>{
            store.setItem(milestoneToggle, milesStoneName.trim());
        });
        page().getMatSlideToggle.then($toggle => {
            if ($toggle.hasClass('mat-checked')) {
                cy.wrap($toggle).click();
            }
        });
    })
})

When("User clicks 'Save & Close' button", ()=>{
    page().appEnwizardStep2MilestonesButtons.contains('Save & Close').click();
})

When("User clicks {string} button on 'Close Engagement Creation' modal", (button: string)=>{
    page().appConfirmDialog.contains(button).click();
})

When("User is routed to 'Compliance Engagement - Dashboard'", ()=>{
    page().getAppDashboard.should('exist');
});

Then("Test remembered {string} values equals 'A-SCEND Milestones' value", (milestoneToggle: string)=>{
    const milestoneToggleValue = store.getItem(milestoneToggle);
    page().getAppAuditMilestones.within(()=>{
        expect(milestoneToggleValue).not.empty;
        cy.get(ExistingengagementMetadata.Ui.MilestoneMatCaption).contains(milestoneToggleValue).should('not.exist');
    })
})

When("User clicks on {string} circle icon", (icon: string)=>{
    page().engagementStepperHeader.contains(icon).click()
})

Then("Test remembered {string} value equals 'Milestone toggle' value", (disabledMilestone: string)=>{
    page().getMilestonesList.first().within(()=>{
        const disabledMilestonevalue = store.getItem(disabledMilestone);
        cy.get(ExistingengagementMetadata.Ui.MilestoneNameSelector).contains(disabledMilestonevalue).should('exist');
        cy.get(ExistingengagementMetadata.Ui.MilestoneMatToggleChecked).should('not.exist');
        cy.get(ExistingengagementMetadata.Ui.MilestoneMatToggle).click();
    })
})