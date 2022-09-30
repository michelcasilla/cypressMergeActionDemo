import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { EngagementStatus } from "../../../../../../../../DataGenerator/ASCENDTypes";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { RequestGenerator } from "../../../../../../../../DataGenerator/RequestGenerator";
import { StoreService } from "../../../../../../../../helpers/store";
import { ComplianceEngagementNavigationItems } from "../../../../../../interfaces/NavigationTypes";
import { UIOption } from "../../../../../../interfaces/UIOptionTypes";
import { NavigationMetadata, NavigationService } from "../../../../../navigationPage/NavigationService";
import { ExistingengagementService } from "../../../ExistingEngagementService";

const store = StoreService.getStore();
const page = (): ExistingengagementService=>ExistingengagementService.getInstance();
const pageNavigation = (): NavigationService=>NavigationService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Engagement.service().markAllCriteriaAsNotApplicable().save().then((Request: RequestGenerator)=>{
                Request.changeSomeRequestToInProgress();
                Request.changeSomeRequestToSubmitted();
                Request.changeSomeRequestToAccepted();
                Request.uploadEvidence(); // upload first evidence
                Request.linkEvidence(); // link the evidence
                Request.uploadEvidence(); // upload a new one unlinked
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
});

Then("User cannot navigate to {string}",(navItem: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        pageNavigation().shouldntSeeNavItem(navItem as ComplianceEngagementNavigationItems);
    })
});

Then("User navigates to {string} route",(subNav: string)=>{
    cy.get(NavigationMetadata.Ui.AppNavigation)
        .find('caption')
        .contains(subNav)
        .click({force: true});
});

Then("{string} button is 'disabled'",(buttonLabel: string)=>{
    const option: UIOption = page().getUiOption(buttonLabel);
    page().getAppEvidenceDisabledButtons.contains(option.text).should('exist');
});

Then("'Link-Unlink' icon is 'disabled'",()=>{
    cy.finishedLoading().then(()=>{
        const option = 'edit';
        page().getAppEvidenceGrids.then((grids: JQuery<HTMLElement>)=>{
            const evidenceGrid = grids.get(0);
            cy.wrap(evidenceGrid).then(()=>{
                page().getDisabledIcons.contains(option).should('exist');
            })
        })
    })
});

Then("'Delete Evidence' icon on uploaded evidence table is 'disabled'",()=>{
    const option = 'edit';
    page().getAppEvidenceGrids.then((grids: JQuery<HTMLElement>)=>{
        const evidenceGrid = grids.get(0);
        cy.wrap(evidenceGrid).then(()=>{
            page().getDisabledIcons.contains(option).should('exist');
        });
    })
});


Then("'Delete Evidence' icon on requests table is 'disabled'",()=>{
    const option = 'delete';
    page().getAppEvidenceGrids.then((grids: JQuery<HTMLElement>)=>{
        const requestGrid = grids.get(1);
        cy.wrap(requestGrid).then(()=>{
            page().getDisabledIcons.contains(option).should('exist');
        });
    })
});