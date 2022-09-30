import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../../DataGenerator/ASCENDTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { RequestGenerator } from "../../../../../../../../DataGenerator/RequestGenerator";
import { StoreService } from "../../../../../../../../helpers/store";
import { ExistingengagementService } from "../../../ExistingEngagementService";

const store = StoreService.getStore();
const page = ()=>ExistingengagementService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.service().markAllCriteriaAsNotApplicable().save().then((Request: RequestGenerator)=>{
                Request
                    .changeAllRequestToOpen()
                    .changeSomeRequestToInProgress()
                    .changeSomeRequestToSubmitted()
                    .linkEvidence()
                    .changeSomePopulationRequestToAccepted();
                Engagement.changeComplianceEngagementStatus(EngagementStatus.Complete);
            })
            store.setItem('engagementName', Engagement.name);
        });
    });
});

Then("User clicks {string} button on random 'Engagement Name' with 'Completed' status",(buttonName: string)=>{
    page().appEngagementSearchbox.focus().clear().type(store.getItem('engagementName'));
    page().registerInterceptor('GET', 'ProjectRequests').as('requests');
    page().appAgEngagementsActionButtons.contains(buttonName).first().click({force: true});
});

When("User clicks {string} button in 'Engagement Selected' modal",(buttonName: string)=>{
    page().appConfirmDialog.contains(buttonName).click({force: true}).wait(2000);
});

When("User clicks 'Assignee' icon on a request card",()=>{
    page().getAppKanbanCards.then((cards)=>{
        cy.wrap(cards[0]).click();
    })
});

Then("'Assigned to' dropdown is 'disabled'",()=>{
    cy.finishedLoading();
    page().getAppSssignedMatSelect.should('not.exist');
});

When("User clicks 'X' icon in 'request card'",()=>{
    page().getAppRequestDialog.find('[mat-dialog-close]').click({force: true});
});

Then("User cannot 'click and drag' request card to another 'Status'",()=>{
    page().getAppKanban.find('.cdk-drag').each((card)=>{
        cy.wrap(card).should('have.class', 'cdk-drag-disabled');
    })
});

Then("'Collect All AEC Requests' icon is 'disabled'",()=>{
    page().getAllAECRequest.then((element)=>{
        const button = element.parents('button');
        cy.wrap(button).should('have.class', 'mat-button-disabled')
    });
});

Then("{string} button is 'disabled'",(buttonName: string)=>{
    page().getAppKanbanDisabledButtons.contains(buttonName).should('exist');
});