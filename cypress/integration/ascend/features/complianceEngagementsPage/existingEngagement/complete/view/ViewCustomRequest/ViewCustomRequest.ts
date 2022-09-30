import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../../DataGenerator/ASCENDTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { RequestGenerator } from "../../../../../../../../DataGenerator/RequestGenerator";
import { ExecAction } from "../../../../../../../../helpers/commonActionHelper";
import { StoreService } from "../../../../../../../../helpers/store";
import { CustomObjectRequest } from "../../../../../../interfaces/CustomObjectInterface";
import { ComplianceEngagementNavigationItems } from "../../../../../../interfaces/NavigationTypes";
import { NavigationService } from "../../../../../navigationPage/NavigationService";
import { ExistingengagementService } from "../../../ExistingEngagementService";

const store = StoreService.getStore();
const page = ()=>ExistingengagementService.getInstance();
const pageNavigation = ()=>NavigationService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.service().markAllCriteriaAsNotApplicable().save().then((Request: RequestGenerator)=>{
                Engagement.changeComplianceEngagementStatus(EngagementStatus.Published);
                Request.changeAllRequestToOpen()
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
    page().appAgEngagementsActionButtons.contains(buttonName).first().click({force: true});
});

When("User clicks {string} button in 'Engagement Selected' modal",(buttonName: string)=>{
    page().appConfirmDialog.contains(buttonName).click({force: true}).wait(2000);
    page().registerInterceptor('GET', 'CustomObjects');
});

Then("User cannot navigate to {string}",(navItem: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        pageNavigation().shouldntSeeNavItem(navItem as ComplianceEngagementNavigationItems);
    })
});

When("Test condition 'custom-requests-exist' starts if 'custom-requests-at-least-one'",()=>{
    page().getCustomObjectsRequests.then((Requests: CustomObjectRequest[])=>{
        store.condition = Requests.length ? true : false;
    })
})

When("{string} button is 'disabled'",(buttonLabel: string)=>{
    if(store.condition){
        page().getCustomRequestDisabledButtons.contains(buttonLabel).should('exist');
    }
});

When("{string} icon is 'disabled'",(uiOption: string)=>{
    if(store.condition){
        const option = page().getUiOption(uiOption);
        page().getCustomRequestActionIcons.contains(option.icon).each((action)=>{
            cy.wrap(action.parents('tr')).should('have.class', 'disable-row');
        })  
    }
});

When("{string} image is {string}",(uiOption: string, uiOptionState: string)=>{
    const option = page().getUiOption(uiOption)
    ExecAction(option, uiOptionState);
})

