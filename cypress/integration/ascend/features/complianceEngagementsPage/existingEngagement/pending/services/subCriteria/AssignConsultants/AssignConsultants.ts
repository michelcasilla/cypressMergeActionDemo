import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { DataGenerator } from "../../../../../../../../../DataGenerator/DataGenerator";
import { ServicesDataGenerator } from "../../../../../../../../../DataGenerator/ServicesDataGenerator";
import { StoreService } from "../../../../../../../../../helpers/store";
import { PendingEngagementMetadata, PendingEngagementService } from "../../PendingEngagmentService";

const page = (): PendingEngagementService=>PendingEngagementService.getInstance();
const store = StoreService.getStore();
const criteriIdStoreKey = 'criteriId';
const currentAssignIconKey = 'currentAssignIcon';
let ServiceInstance: ServicesDataGenerator;
let Instance: DataGenerator;

before(()=>{
    DataGenerator.run((_instance: DataGenerator)=>{
		Instance = _instance;
        Instance.createPublishedComplianceEngagement().then((Engagement)=>{
			ServiceInstance = Engagement.service();
			ServiceInstance.unAssignAllConsultant().save();
            store.setItem('engagementName', Engagement.name);
        });
    });
});

beforeEach(()=>{
	Instance.loginAsAdmin().then(()=>{
		ServiceInstance.unAssignAllConsultant().save();	
	});
});

Then("{string} button is not 'visible'",(manageButton: string)=>{
    page().appAgEngagementsActionButtons.contains(manageButton).should('not.exist');
});

When("User clicks {string} button on an engagement with a 'Pending' status",(buttonName: string)=>{
    page().appEngagementSearchbox.focus().clear().type(store.getItem('engagementName'))
    page().appAgEngagementsActionButtons.contains(buttonName).first().click({force: true});
});

When("User clicks {string} button on 'Engagement Selected' modal",(buttonName: string)=>{
    page().appConfirmDialog.contains(buttonName).click({force: true});
	cy.intercept('GET', PendingEngagementMetadata.Intercepts.EngagementDetails).as('EngagementDetails');
});

When("User clicks {string} button in the {string} step",(buttonLabel: string)=>{
    page().waitOnApiCalls().wait(600).then(()=>{
        page().engagementStepperButtons.contains(buttonLabel).click();
    });
});

When("User clicks {string} button on the 'Services' Step",(buttonLabel: string)=>{
    page().waitOnApiCalls().wait(600).then(()=>{
		page().getAppEngagementServicesButtons.contains(buttonLabel).click();
	});
});

When("User clicks {string} button from the 'Open Service' modal",(buttonLabel: string)=>{
    page().getAppConfirmDialogButtons.contains(buttonLabel).click({force: true}).wait(600);
});

When("User clicks {string} button on {string} substep",(buttonLabel: string)=>{
    page().getAppEngagementStepperButtons.contains(buttonLabel).click({force: true});
})

When("User clicks 'unassigned' icon",()=>{
	page().getAppCriteriaConsultantCell.then((list)=>{
		const index = Math.floor(Math.random() * list.length);
		const node = Cypress.$(list[index < 0 ? 0 : index]);
		const criteriaID = node.parents(PendingEngagementMetadata.Ui.RowId).find(PendingEngagementMetadata.Ui.CriterionRequirementId).text().trim();
		const icon = node.find(PendingEngagementMetadata.Ui.MatIcon);
		const currentAssignIcon = icon.text().trim();
		store.setItem(criteriIdStoreKey, criteriaID);
		store.setItem(currentAssignIconKey, currentAssignIcon);
		cy.wrap(icon).click({force: true});
	})
});

When("Test remembers 'Criteria id' value as {string}",(rememberAs: string)=>{
	const criteriaIDValue = store.getItem('criteriIdStoreKey');
	store.setItem('Criteria id', criteriaIDValue);
	store.setItem(rememberAs, criteriaIDValue);
});

Then("Test value {string} equals {string} value",(criteriaIdString: string, criteriaId: string)=>{
	const criteriaIdStringValue = store.getItem(criteriaIdString);
	const criteriaIdValue = store.getItem(criteriaId);
	expect(criteriaIdStringValue).to.eq(criteriaIdValue);
});

Then("User clicks 'consultant' in 'Assign Consultant' modal",()=>{
	cy.wait(1000).then(()=>{
		page().getAppEngagementCriteriaDialogConsultants.first().click({force: true});
	});
})

Then("User clicks {string} button",(buttonLabel: string)=>{
	page().getAppEngagementCriteriaDialogButtons.contains(buttonLabel).click({force: true});
})

Then("{string} snackbar is 'displayed'",(snackaBarMsg: string)=>{
	page().getAlignSnackBarSuccess.contains(snackaBarMsg).should('exist');
})

Then("'single consultant' icon is 'displayed' in remembered 'Criteria id' row",()=>{
	const criteriIdStoreValue = store.getItem(criteriIdStoreKey);
	page().getCriterionRequirementId.contains(criteriIdStoreValue).then((node)=>{
		const singleConsultatntIcon = 'person';
		const text = node.parents(PendingEngagementMetadata.Ui.RowId).find(PendingEngagementMetadata.Ui.ConsultantIcon).text().trim();
		expect(text).to.be.eq(singleConsultatntIcon)
	})
})

Then("User clicks 'multiple consultants' in 'Assign Consultant' modal",()=>{
	if(store.condition == false){
		cy.wait(1000).then(()=>{
			page().getAppEngagementCriteriaDialogConsultants.eq(0).click({force: true});
			page().getAppEngagementCriteriaDialogConsultants.eq(2).click({force: true});
			page().getAppEngagementCriteriaDialogConsultants.eq(4).click({force: true});
		})
	}
})


Then("'multiple consultant' icon is 'displayed' in remembered 'Criteria id' row",()=>{
	if(store.condition == false){
		const criteriIdStoreValue = store.getItem(criteriIdStoreKey);
		page().getCriterionRequirementId.contains(criteriIdStoreValue).then((node)=>{
			const multipleConsultant = 'groups';
			const text = node.parents(PendingEngagementMetadata.Ui.RowId).find(PendingEngagementMetadata.Ui.ConsultantIcon).text().trim();
			expect(text).to.be.eq(multipleConsultant)
		})
	}
})

Then("{string} button is 'enabled'",(buttonLabel: string)=>{
    page().getAppEngagementServicesButtons.contains(buttonLabel).should('not.have.class', 'mat-button-disabled')
})