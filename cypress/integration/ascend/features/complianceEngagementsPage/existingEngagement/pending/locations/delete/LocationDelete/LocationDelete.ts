import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import { DataGenerator } from "../../../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../../../helpers/store";
import { ExistingengagementService } from "../../../../ExistingEngagementService";

const store = StoreService.getStore();
const page = (): ExistingengagementService=>ExistingengagementService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement)=>{
            store.setItem('engagementName', Engagement.name);
        });
        Instance.end();
    });
});

Then("{string} button is not 'visible'",(buttonName: string)=>{
    if(store.condition){
        page().appAgEngagementsActionButtons
        .contains(buttonName)
        .should('not.exist');
    }
});

When("User clicks {string} button on random 'Engagement Name'",(buttonName: string)=>{
    page().appEngagementSearchbox.focus().clear().type(store.getItem('engagementName'))
    page().appAgEngagementsActionButtons
        .contains(buttonName)
        .first()
        .click({force: true});
});

When("User clicks {string} button on 'Engagement Selected' modal",(buttonName: string)=>{
    page().appConfirmDialog
    .contains(buttonName)
    .click({force: true});
})

When("User clicks 'Next Step' button in the 'Engagement Details' step",()=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().nextStepButton.click({force: true});
    });
})

When("User clicks {string} button in the 'Engagement Details - Milestones' step",(buttonName: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().engagementStepperButtons.contains(buttonName).click({force: true});
    });
})

When("User types random {string} in 'Add Location' field", (keyName: string)=>{
    if(store.condition){
        const cityName = faker.address.cityName();
        page().addLocationField.focus().clear().type(cityName);
        store.setItem(keyName, cityName);
    }
})

When("User presses 'Enter' key",()=>{
    if(store.condition){
        // User presses 'Enter' key
        page().addLocationField.focus().type('{enter}');
    }
})

When("User clicks 'Save Location' button",()=>{
    if(store.condition){
        cy.finishedLoading().wait(600).then(()=>{
            page().engagementStepperButtons.contains('Save Location').click({force: true});
        });
    }
});

When("Test condition 'multiple-locations-do-not-exist' starts if {string}",(storeKeyName: string)=>{
    page().editLocationList.find('mat-chip').then((locations)=>{
        store.condition = (locations.length <= 1);
    })
});

When("User clicks 'ellipsis' on a random {string}", (locationToDelete: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().editLocationList.find('mat-chip').last().then((location)=>{
            store.setItem(locationToDelete, location.get(0).innerText.trim().replace('\nmore_vert', ''))
            cy.wrap(location.get(0)).find('.mat-menu-trigger').click()
        })
    });
})

Then("Test remembers {string} as a 'Saved Locations string' values", (locationToDelete: string)=>{
    expect(store.getItem(locationToDelete)).not.empty
})

Then("Test value 'Saved Locations string' equals {string} value",(locationToDelete: string)=>{
    expect(store.getItem(locationToDelete)).not.empty
})

When("User clicks {string} icon on the 'Saved Location' panel",(buttonName: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        cy.get('.mat-menu-panel').find('button').contains(buttonName).click()
    });
})

Then("test value {string} equals 'Deleted Location' value",(deletedLocationKey: string)=>{
    expect(store.getItem(deletedLocationKey)).not.empty
})

Then("Test value {string} equals {string} value in 'Confirm Delete Location' modal",(deleteLocationKey: string, savedLocation: string)=>{
    const savedLocationValue = store.getItem(savedLocation);
    page().appEngagementLocationDeleteDialog.find('mat-chip').contains(savedLocationValue);
})

Then("User clicks {string} button in 'Confirm Delete Location' modal", (deleteLocationBtn: string)=>{
    page().appEngagementLocationDeleteDialog.find('button').contains(deleteLocationBtn).click();
})

Then("Test remembered value {string} does not exist in {string} values", (deletedLocation: string, savedLocations: string)=>{
    const savedLocationValue = store.getItem(savedLocations);
    page().editLocationList.find('mat-chip').contains(savedLocationValue).should('not.exist');
})

When("User clicks {string} button in 'Engagement Details - Locations'", (nextStep: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().appEngagementLocation.find('button').contains(nextStep).click();
    });
})

When("User clicks {string} button in 'Engagement Details - Periodic Rates'", (back: string)=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().appEngagementPeriodicRates.find('button').contains(back).click();
    });
})

Then("Test remembered 'Deleted Location' value does not exist in {string} values", (savedLocation: string)=>{
    const savedLocationValue = store.getItem(savedLocation);
    page().editLocationList.find('mat-chip').contains(savedLocationValue).should('not.exist');
})

Then("Test remembers {string} as a 'Saved Locations string' value", (savedLocation: string)=>{
    const savedLocationValue = store.getItem(savedLocation);
    expect(savedLocationValue).not.empty
})

When("Test remembers {string} value as {string}", (savedLocation: string, deletedLocationKey: string)=>{
    store.setItem(deletedLocationKey, store.getItem(savedLocation));
})

When("User clicks 'X' icon in 'Confirm Delete Location' modal",()=>{
    cy.finishedLoading().wait(600).then(()=>{
        page().appEngagementLocationDeleteDialog.find('i').contains('close').click();
    });
})

Then("Test remembered {string} value should exist in 'Saved Location' values", (deletedLocation: string)=>{
    const savedLocationValue = store.getItem(deletedLocation);
    page().editLocationList.find('mat-chip').contains(savedLocationValue).should('exist');
})