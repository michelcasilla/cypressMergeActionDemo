import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../../DataGenerator/ASCENDTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { RequestGenerator } from "../../../../../../../../DataGenerator/RequestGenerator";
import { StoreService } from "../../../../../../../../helpers/store";
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
                Request.changeSomeRequestToInProgress()
                    .changeSomeRequestToSubmitted()
                    .linkEvidence()
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

Then("{string} button is 'disabled'",(buttonLabel: string)=>{
    page().getAppAssignmentsDisabledButtons.contains(buttonLabel);
});

Then("'Assignee' icon is 'disabled'",()=>{
    page().getAppAssignmentsIcons.each((icon: JQuery<HTMLElement>)=>{
        cy.wrap(icon).should('have.class', 'icon-disabled')
    })
})