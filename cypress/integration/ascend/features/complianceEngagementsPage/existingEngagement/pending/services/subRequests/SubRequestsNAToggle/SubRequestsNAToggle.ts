import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../../DataGenerator/DataGenerator";
import { ServicesDataGenerator } from "../../../../../../../../../DataGenerator/ServicesDataGenerator";
import { StoreService } from "../../../../../../../../../helpers/store";
import { PendingEngagementMetadata, PendingEngagementService } from "../../PendingEngagmentService";

const store = StoreService.getStore();
const page = (): PendingEngagementService =>PendingEngagementService.getInstance();
let Service!: ServicesDataGenerator;
let Instance: DataGenerator;

beforeEach(()=>{
    DataGenerator.run((__instance: DataGenerator)=>{
        Instance = __instance
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Service = Engagement.service();
            Service.markAllRequestAsApplicable();
            store.setItem('engagementName', Engagement.name);
        });
        Instance.end();
    });
});

beforeEach(()=>{
    Instance.loginAsAdmin().then(()=>{
        Service.markAllRequestAsApplicable().save();
    })
})

Then("{string} button is not 'visible'", (uiElement: string)=>{
    page().appAgEngagementsActionButtons.contains(uiElement).should('not.exist');
})

When("User clicks {string} button on an engagement with a 'Pending' status",(buttonLabel: string)=>{
    page().appEngagementSearchbox.focus().clear().type(store.getItem('engagementName'));
    page().appAgEngagementsActionButtons.contains(buttonLabel).first().click({force: true});
});


When("User clicks {string} button on 'Engagement Selected' modal", (button: string)=>{
    page().appConfirmDialog.contains(button).click({force: true});
    page().registerInterceptor('GET', 'EngagementDetails');
});

When("User clicks 'Next Step' button in the {string} step", () => {
    cy.finishedLoading().wait(1000).then(()=>{
        page().nextStepButton.click();
    });
});

When("User clicks {string} button on the 'Services' Step",(buttonLabel: string)=>{
    cy.wait('@EngagementDetails').wait(1000);
    page().getAppEngagementServicesButtons.contains(buttonLabel).click({force: true});
})

When("User clicks {string} button in the 'Open Service' modal",(buttonLabel: string)=>{
    page().getAppConfirmDialogButtons.contains(buttonLabel).click({force: true}).wait(600);
});

When("User clicks 'Next Step' button on 'Custom Requests' substep",()=>{
    page().nextStepButton.click({force: true});
})

When("User clicks 'Next Step' button on 'Criteria' substep",()=>{
    page().registerInterceptor('GET', 'EngagementRequest');
    page().nextStepButton.click({force: true});
})

When("User clicks 'applicable toggle' icon on a random 'request'",()=>{
    cy.wait('@EngagementRequest').wait(1000).then(()=>{
        const selectedRequests: {id: number; selector: string; requestId: string}[] = [];
        page().getAppEngagementServicesApplicableToggle.each((requestNode, index)=>{
            // Random toggle
            if(index < 5){
				const parent = requestNode.parents('[row-id]');
                const requestId = parent.find(PendingEngagementMetadata.Ui.RequestIdentifier).text().trim();
				const selector = `[row-id="${parent.attr('row-id')}"]`;
				selectedRequests.push({id: index, selector: selector, requestId});
                requestNode.click();
            }
        }).then(()=>{
            store.setItem('selectedRequests', selectedRequests);
        })
    })
})

When("Test remembers {string} value as {string}", (requestsIDs: string, requestIdString: string)=>{
    const selectedRequests = store.getItem('selectedRequests');
    store.setItem(requestsIDs, selectedRequests);
    store.setItem(requestIdString, selectedRequests);
});

Then("Test value {string} equals {string} value", (requestString: string, requestId: string)=>{
    const requestIdStringValue = store.getItem(requestString);
    const requestIdValue = store.getItem(requestId);
    requestIdStringValue.forEach((rememberedItem, index)=>{
        expect(rememberedItem.id).to.be.eq(requestIdValue[index].id);
    })
})

Then("'not applicable' toggle is 'disabled' in 'remembered Request id'",()=>{
    cy.wait(1000).then(()=>{
        const selectedOnes = store.getItem('selectedRequests');
        selectedOnes.forEach((item)=>{
            cy.get(PendingEngagementMetadata.Ui.RequestIdentifier).contains(item.requestId).then((node)=>{
                const toggle = node.parents('[row-id]').find(PendingEngagementMetadata.Ui.MatToggleSlideInput)
                cy.wrap(toggle).should('have.attr', 'aria-checked', 'false');
            })
        });
    })
})

Then("{string} button is 'enabled'",(buttonLabel: string)=>{
    page().getAppEngagementServicesButtons.contains(buttonLabel).should('not.have.class', 'mat-button-disabled');
})

When("User clicks {string} button on {string} step", (buttonLabel: string) => {
    cy.wait(1000).then(()=>{
        page().getAppEngagementServicesButtons.contains(buttonLabel).click({force: true});
    });
});

Then("Test remembered value {string} equals {string} value",(requestString: string, requestId: string)=>{
    const requestIdStringValue = store.getItem(requestString);
    const requestIdValue = store.getItem(requestId);
    requestIdStringValue.forEach((rememberedItem, index)=>{
        expect(rememberedItem.id).to.be.eq(requestIdValue[index].id);
    })
});

Then("Test remembered 'not applicable' toggle is 'disabled' in 'remembered Request id'",()=>{
    cy.wait('@EngagementRequest').wait(1000).then(()=>{
        const selectedOnes = store.getItem('selectedRequests');
        selectedOnes.forEach((item)=>{
            cy.get(PendingEngagementMetadata.Ui.RequestIdentifier).contains(item.requestId).then((node)=>{
                const toggle = node.parents('[row-id]').find(PendingEngagementMetadata.Ui.MatToggleSlideInput)
                cy.wrap(toggle).should('have.attr', 'aria-checked', 'false');
            })
        });
    })
})