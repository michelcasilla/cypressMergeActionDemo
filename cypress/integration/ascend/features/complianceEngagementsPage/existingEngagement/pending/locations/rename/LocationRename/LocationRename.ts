import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import { DataGenerator } from "../../../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../../../helpers/store";
import { ExistingengagementService } from "../../../../ExistingEngagementService";

const page = (): ExistingengagementService=>ExistingengagementService.getInstance();
const store = StoreService.getStore();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement)=>{
            store.setItem('engagementName', Engagement.name);
        });
    });
});

Then("{string} button is not 'visible'",(manageButton: string)=>{
    page().appAgEngagementsActionButtons.contains(manageButton).should('not.exist');
});

When("User clicks {string} button on random 'Engagement Name'", (manageButton: string)=>{
    const name = store.getItem('engagementName');
    page().appEngagementSearchbox.focus().clear().type(name)
    page().appAgEngagementsActionButtons.contains(manageButton).first().click();
})

When("User clicks {string} button on 'Engagement Selected' modal", (button: string)=>{
    page().appConfirmDialog.contains(button).click();
});

When("User clicks 'Next Step' button in the 'Engagement Details' step",()=>{
    cy.finishedLoading().wait(2000).then(()=>{
        page().nextStepButton.click();
    });
})

When("User clicks {string} button in the 'Engagement Details - Milestones' step",(buttonName: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().appEnwizardStep2Milestones.find('button').contains(buttonName).click();
    });
})

When("User clicks 'ellipsis' on a random {string}", (savedLocation: string)=>{
    page().editLocationList.find('mat-chip').last().then((location)=>{
        store.setItem(savedLocation, location.get(0).innerText.trim().replace('\nmore_vert', ''))
        cy.wrap(location.get(0)).find('.mat-menu-trigger').click()
    })
})

// 'Saved Location string'
// 'Saved Location'
Then("Test remembers {string} as a {string} value", (savedLocationString: string, savedLocation: string)=>{
    const savedLocationValue = store.getItem(savedLocation);
    expect(savedLocationValue).not.null
    store.setItem(savedLocationString, savedLocationValue);
})

// 'Rename'
When("User clicks {string} icon on 'Saved Location' panel", (rename: string)=>{
    cy.get('.mat-menu-panel').find('button').contains(rename).click()
});

// 'Rename Location string'
// 'Rename Location'
When("User types random {string} in {string} field",(randomLocationString: string, renameLocation: string)=>{
    const city = faker.address.cityName();
    store.setItem(randomLocationString, city);
    store.setItem(renameLocation, city);
    page().appEngagementLocationRenameDialog.find('input').focus().clear().type(city);
})

// 'Rename Location'
// 'Rename Location string'
When("Test remembers {string} value as {string}", (renamedLocation: string, renameLocationString: string)=>{
    const location = store.getItem(renamedLocation);
    store.setItem(renameLocationString, location);
})

// 'Rename Location string'
// 'Rename Location'
Then("test value {string} equals {string} value", (renameLocationString: string, renameLocation: string)=>{
    const renameLocationStringValue = store.getItem(renameLocationString);
    const renameLocationValue = store.getItem(renameLocation);
    expect(renameLocationStringValue).to.eq(renameLocationValue)
})

// 'Save Location'
Then("User clicks {string} button on 'Rename Location' modal", (saveLocation: string)=>{
    page().appEngagementLocationRenameDialog.find('button').contains(saveLocation).click();
})

// 'Next Step'
Then("User clicks {string} button in 'Engagement Details - Locations'", (nextStep: string)=>{
    page().appEngagementLocation.find('button').contains(nextStep).click();
})

Then("User clicks {string} button in 'Engagement Details - Periodic Rates'", (back: string)=>{
    page().appEngagementPeriodicRates.find('button').contains(back).click();
})

// 'Rename Location string'
// 'Saved Locations'
Then("Test remembered value {string} exist in {string} values", (renameLocationString: string, savedLocation: string)=>{
    const renameLocationStringValue = store.getItem(renameLocationString);
    const savedLocationValue = store.getItem(savedLocation);
    page().editLocationList.find('mat-chip').contains(renameLocationStringValue).should('exist');
})

// 'Saved Location string'
// 'Saved Location'
Then("Test remembered value {string} does not exist in 'Saved Location' values", (savedLocationString: string)=>{
    const savedLocationStringValue = store.getItem(savedLocationString);
    page().editLocationList.find('mat-chip').contains(savedLocationStringValue).should('not.exist');
})

When("User clicks 'X' icon on 'Rename Location' modal",()=>{
    page().appEngagementLocationRenameDialog.find('i').contains('close').click();
})