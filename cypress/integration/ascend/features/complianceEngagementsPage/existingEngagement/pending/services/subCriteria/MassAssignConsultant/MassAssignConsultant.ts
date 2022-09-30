import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { ComplianceEngagementDataGenerator } from "../../../../../../../../../DataGenerator/ComplianceEngagementDataGenerator";
import { DataGenerator } from "../../../../../../../../../DataGenerator/DataGenerator";
import { ServicesDataGenerator } from "../../../../../../../../../DataGenerator/ServicesDataGenerator";
import { StoreService } from "../../../../../../../../../helpers/store";
import { PendingEngagementService, PendingEngagementMetadata } from "../../PendingEngagmentService";

const store = StoreService.getStore();
const page = (): PendingEngagementService =>PendingEngagementService.getInstance();
let Instance!: DataGenerator;
let Service!: ServicesDataGenerator;

before(()=>{
    DataGenerator.run((__Instance: DataGenerator)=>{
        Instance = __Instance;
        Instance.createPublishedComplianceEngagement().then((Engagement: ComplianceEngagementDataGenerator)=>{
            Service = Engagement.service();
            Service.markAllCriteriaAsApplicable().unAssignAllConsultant().save();
            store.setItem('engagementName', Engagement.name);
        });
        Instance.end();
    });
});

beforeEach(()=>{
    Instance.loginAsAdmin().then(()=>{
        Service.unAssignAllConsultant().save();
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
    cy.intercept('GET', PendingEngagementMetadata.Intercepts.EngagementDetails).as('EngagementDetails');
});

When("User clicks 'Next Step' button in the {string} step", () => {
    cy.finishedLoading();
    page().nextStepButton.click({force: true});
});

When("User clicks {string} button on the 'Services' Step",(buttonLabel: string)=>{
    cy.wait('@EngagementDetails').wait(1000);
    page().getAppEngagementServicesButtons.contains(buttonLabel).click({force: true});
})

When("User clicks {string} button from the 'Open Service' modal",(buttonLabel: string)=>{
    page().getAppConfirmDialogButtons.contains(buttonLabel).click({force: true}).wait(600);
});

When("User clicks {string} button on {string} substep",(buttonLabel: string)=>{
    page().getAppEngagementStepperButtons.contains(buttonLabel).click({force: true});
})

When("User clicks multiple 'checkbox' icons for 'unassigned criteria'",()=>{
    cy.wait(1000).then(()=>{
        const selectedCriterias: {id: number; selector: string}[] = [];
        page().getAppEngagementServicesCheckboxes.each((criteriaNode, index)=>{
            // Random toggle
            if(Math.random() > 0.5){
                cy.wrap(criteriaNode).scrollTo('bottom',{ensureScrollable:false}).click({force: true});
                const selector = `[row-id="${criteriaNode.attr('row-id')}"]`;
                selectedCriterias.push({id: index, selector: selector});
            }
        }).then(()=>{
            store.setItem('selectedCriterias', selectedCriterias);
        })
    })
})


When("Test remembers {string} values as {string}", (criteriaId: string, criteriIdString: string)=>{
    const selectedOnes = store.getItem('selectedCriterias');
    store.setItem(criteriaId, selectedOnes);
    store.setItem(criteriIdString, selectedOnes);
});

Then("Test value {string} equals {string} values", (criteriaIdString: string, criteriaId: string)=>{
    const criteriaIdStringValue = store.getItem(criteriaIdString);
    const criteriaIdValue = store.getItem(criteriaId);
    criteriaIdStringValue.forEach((rememberedItem, index)=>{
        expect(rememberedItem.id).to.be.eq(criteriaIdValue[index].id);
    })
})

Then("User clicks {string} button in the 'Criteria' grid", (buttonLabel: string)=>{
    page().getAppEngagementServicesButtons.contains(buttonLabel).click({force: true});
})

Then("User clicks 'consultant' in 'Assign Consultant' modal",()=>{
    cy.wait(1000).then(()=>{
        page().getAppEngagementCriteriaDialogConsultants.first().click({force: true});
    })
});

Then("User clicks {string} button in 'Assign Consultant' modal",(buttonLabel: string)=>{
    page().getAppEngagementCriteriaDialogButtons.contains(buttonLabel).click({force: true});
});

Then("User clicks {string} button",(buttonLabel: string)=>{
    page().nextStepButton.contains(buttonLabel).click({force: true});
});

Then("{string} snackbar is 'displayed'",(snackaBarMsg: string)=>{
    page().getAlignSnackBarSuccess.contains(snackaBarMsg).should('exist');
})

When("Test remembers 'single consultant' icons 'displayed' in 'remembered Criteria id'",()=>{
    const selectedOnes = store.getItem('selectedCriterias');
    selectedOnes.forEach((item)=>{
        cy.get(item.selector).find(PendingEngagementMetadata.Ui.ConsultantIcon).contains('person').should('exist');
    })
})

Then("{string} button is 'clickable'",(buttonLabel: string)=>{
    page().getAppEngagementServicesButtons.contains(buttonLabel).should('not.have.class', 'mat-button-disabled')
})

Then("Test remembered values {string} equals {string} values where 'single consultant' icons were 'displayed'",(criteriaId: string, criteriIdString: string)=>{
    const selectedOnes = store.getItem('selectedCriterias');
    store.setItem(criteriaId, selectedOnes);
    store.setItem(criteriIdString, selectedOnes);
})