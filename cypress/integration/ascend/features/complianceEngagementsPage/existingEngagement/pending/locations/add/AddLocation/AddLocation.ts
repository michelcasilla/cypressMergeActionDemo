import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import { DataGenerator } from "../../../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../../../helpers/store";
import { ASCENDLocation } from "../../../../../../../interfaces/LocationTypesInterface";
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


Then("'Manage' button is not 'visible'",()=>{
    page().appAgEngagementsActionButtons.contains('Manage').should('not.exist');
});

When("User clicks {string} button on an engagement with a {string} status",(buttonLabel: string, status: string)=>{
    page().appEngagementSearchbox.focus().clear().type(store.getItem('engagementName'))
    page().appAgEngagementsActionButtons
        .contains(buttonLabel)
        .first()
        .click({force: true});
})

When("User clicks {string} button on 'Engagement Selected' modal", (button: string)=>{
    page().appConfirmDialog
        .contains(button)
        .click({force: true});
});

When("User clicks 'Next Step' button in the 'Engagement Details' step",()=>{
    cy.finishedLoading().wait(600);
    page().nextStepButton.click({force: true});
})

When("User clicks {string} button in the 'Engagement Details - Milestones' step",(buttonName: string)=>{
    cy.finishedLoading().wait(600);
    page().engagementStepperButtons.contains(buttonName).click({force: true});
})

When("User clicks into 'Add Location' field",()=>{
    page().addLocationField.should('exist');
})

When("User types random {string} in 'Add Location' field",(keyName: string)=>{
    const cityName = faker.address.cityName();
    page().addLocationField.focus().clear().type(cityName);
    store.setItem(keyName, cityName);
})

When("Test remembers 'Add Location' value as {string}",(keyName: string)=>{
    expect(store.getItem(keyName)).not.empty;
})

Then("Test value {string} equals 'Add Location' value",(keyName: string)=>{
    page().addLocationField.invoke('val').then((fieldValue)=>{
        expect(fieldValue).to.eq(store.getItem(keyName));
    });
})

When("User presses 'Enter' key",()=>{
    page().addLocationField.focus().type('{enter}');
})

When("User clicks {string} button",(buttonName: string)=>{
    if(buttonName == 'Back'){ page().interceptLocationList(); }
    page().engagementStepperButtons.contains(buttonName).click({force: true});
});

Then("Test remembered value {string} equals one of the 'Saved Locations' values",(keyName: string)=>{
    page().locationList.then((locationList: ASCENDLocation[])=>{
        const storedValue = store.getItem(keyName);
        const match = locationList.find((location: ASCENDLocation) => location.locationname == storedValue);
        expect(match, `Location ${storedValue} remembered`).not.null;
    });
})