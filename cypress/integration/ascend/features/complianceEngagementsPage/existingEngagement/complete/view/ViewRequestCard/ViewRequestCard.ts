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
            Engagement.service().markAllCriteriaAsApplicable().save().then((Request: RequestGenerator)=>{
                Request.changeAllRequestToInProgress().linkEvidence().changeSomePopulationRequestToAccepted();
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
    page().appConfirmDialog.contains(buttonName).click({force: true}).finishedLoading().wait(2000);
});

Then('User clicks on random "request card" with any status: ["Open", "In Progress", "Action Required"]',()=>{
    page().getRequestsCardsOpenInProgressOrActionRequires.then((cardList: JQuery<HTMLElement[]>)=>{
        const randomReq = cardList[0];
        cy.wrap(randomReq).click({force: true});
    })
});

Then("'Request Status' menu is 'disabled'",()=>{
    cy.finishedLoading();
    page().getAppRequestDialogStatus.should('have.class','mat-chip-disabled');
});

Then("{string} button is 'disabled'",(buttonName: string)=>{
    page().getAppRequestDialogDisabledButtons.contains(buttonName).should('exist')
})

When("Test condition 'download-disabled' starts when 'uploaded-file-checkmark-icon-is-clicked'",()=>{
    page().getSelectAllCheckBox.then((checkbox)=>{
        store.condition = !checkbox.hasClass('disabled-selection');
    });
})

When("User clicks 'checkmark' icon in 'Uploaded Files'",()=>{
    if(store.condition){
        page().getSelectAllCheckBox.click();
    }
})

Then("'Download' button is 'clickable'",()=>{
    if(store.condition){
        page().getAppRequestDialog.find('button').contains('Download').should('not.have.class', 'mat-button-disabled');
    }
})

When("User clicks 'X' icon in 'request card'",()=>{
    page().getAppRequestDialog.find('mat-icon').contains('close').click()
})

When("User clicks on {string} request card with 'Accepted' status",(requestType: string)=>{
    page().getAppSearchboxInput.focus().clear().type(requestType);
    page().getRequestsCardsAccepted.then((cards)=>{
        cy.wrap(cards[0]).click({force: true});
    })
})

Then("'Other Engagement Evidence' button is not 'visible'",()=>{
    page().getAppRequestDialog.find('app-evidence').should('not.exist');
})