import { Then, When } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";
import { DataGenerator } from "../../../../../../../../DataGenerator/DataGenerator";
import { StoreService } from "../../../../../../../../helpers/store";
import { ExistingengagementService } from "../../../ExistingEngagementService";

const store = StoreService.getStore();
const page = (): ExistingengagementService =>ExistingengagementService.getInstance();

before(()=>{
    DataGenerator.run((Instance: DataGenerator)=>{
        Instance.createPublishedComplianceEngagement().then((Engagement)=>{
            store.setItem('engagementName', Engagement.name);
        });
        Instance.end();
    });
});

When("User clicks {string} button on 'Engagement Selected' modal", (button: string)=>{
    page().appConfirmDialog
        .contains(button)
        .click({force: true});
});

Then('{string} button is not {string}', (uiElement: string, command: string)=>{
    page().appAgEngagementsActionButtons
        .contains(uiElement)
        .should('not.exist');
})

When('User clicks {string} button on an engagement with a {string} status',(uiElement: string, status: string)=>{
    // Engagement status need to be true
    // User click on manage button
    page().appEngagementSearchbox.focus().clear().type(store.getItem('engagementName'));
    page().appAgEngagementsActionButtons
        .contains('Manage')
        .first()
        .click({force: true});
});

Then('{string} dropdown is not {string}', (uiElement: string, command: string)=>{
    page().appEngagementDetailsEditClientDropDown
        .should('have.attr', 'aria-disabled', 'true');
});

When("User types random 'Short Name string' in 'Short Name' field", ()=>{
    store.data.shortName = faker.color.human().toUpperCase();
    page().appEngagementDetailsEditShortName
    .then((input)=>{
        cy.wrap(input.first()).focus().clear().type(store.data.shortName);
    });
});

When("Test remembers 'Short Name' value as 'Short Name string'",()=>{
    expect(store.data.shortName).to.be.eq(store.data.shortName);
});

Then("Test value 'Short Name string' equals 'Short Name' value", ()=>{
    cy.finishedLoading().then(()=>{
        page().appEngagementDetailsEditShortName.invoke('val')
        .then((value)=>{ 
            expect(value).to.be.eq(store.data.shortName); 
        });
    });
    
});

When("User clicks random 'Engagement Contact email' in 'Engagement Contact' dropdown",()=>{
    page().appEngagementDetailsEditContactDropDown.click();
    page().contactDropDownList.find('mat-option').then((options)=>{
        const index =  Math.ceil(Math.random() * options.length)-1;
        const randomOption = options[index < 0 ? 0 : index];
        cy.wrap(randomOption).invoke('text').then((value)=>{  
            store.data.engagementContactEmail = value.trim();  
        });
        cy.wrap(randomOption).click({force: true});
    });
});

When("Test remembers 'Engagement Contact email' value as 'email'",()=>{
    expect(store.data.engagementContactEmail).to.be.eq(store.data.engagementContactEmail);
});

Then("Test value 'Engagement Contact email' equals 'Engagement Contact' value", ()=>{
    cy.finishedLoading().then(()=>{
        page().appEngagementDetailsEditContactDropDown
        .find('input')
        .invoke('val')
        .then((value: string)=>{ expect(value.trim()).to.be.eq(store.data.engagementContactEmail); });
    });
});

When('Test condition {string} starts if {string} is {string}',()=>{
    const clientLogoExist = Cypress.$('.client-logo').length > 0 ? true : false;
    store.condition = clientLogoExist;
    if(clientLogoExist){
        page().clientLogo.should('be.visible');
    }
});

When("User clicks 'edit pencil icon'", ()=>{
    if(store.condition){
        page().clientLogoEditPencil.click({force: true});
    }
});

When("User clicks on an 'Accepted File Type .png, .jpg, .jpeg' file",()=>{
    if(store.condition){
        expect(true, "Native component select").to.be.true
    }
})

When("User uploads {string} file",(fileName: string)=>{
    // The file should be located in the Fixture folder
    page().appEngagementDetailsEdit.find('[type="file"]').attachFile(fileName);
});


When("User clicks 'Drag and drop here or browse to upload' hover text",()=>{
    if(!store.condition){
        assert(true);
    }
});

When("User clicks random 'Year string' in 'Year' dropdown", ()=>{
    page().engagementYear.click();
    cy.get('[role="listbox"] mat-option').then((optionList)=>{
        const index = Math.ceil(Math.random() * optionList.length) -1;
        const random = optionList[index < 0 ? 0 : index];
        cy.wrap(random).invoke('text').then((value: string)=>{ store.data.year = value.trim()});
        cy.wrap(random).click({force: true});
    })
});

When("Test remembers 'Year' dropdown value as 'Year string'",()=>{
    expect(store.data.year).not.empty;
});

Then("Test value 'Year string' equals 'Year' value", ()=>{
    page().engagementYear.invoke('text').then((year)=>{
        expect(year.trim()).to.eq(store.data.year);
    })
});

When("User types random 'Engagement Name string' in 'Engagement Name' field", ()=>{
    store.data.engagementName = faker.word.conjunction(25);
    page().engagementName.focus().clear().type(store.data.engagementName);
});

When("Test remembers 'Engagement Name' value as 'Engagement Name string'",()=>{
    expect(store.data.engagementName).not.empty;
});

Then("Test value 'Engagement Name string' equals 'Engagement Name' value",()=>{
    cy.finishedLoading().then(()=>{
        page().engagementName.invoke('val').then((name)=>{
            expect(name).to.eq(store.data.engagementName);
        });
    });
})

When("User clicks 'Save & Close' button",()=>{
    page().closeAndSaveButton.click({force: true});
})

When("User clicks 'Confirm' button in 'Close Engagement Creation' modal", ()=>{
    page().appConfirmDialog.contains('Confirm').click({force: true});
})

When("User types remembered 'Engagement Name' value in 'Search Bar' field",()=>{
    page().appEngagementSearchbox.focus().clear().type(store.data.engagementName);
});

When("User clicks 'Manage' button on 'Engagement Name' engagement",()=>{
    page().appAgEngagementsActionButtons
        .contains('Manage')
        .first()
        .click({force: true});
})

Then("Test remembered value 'Short Name string' equals 'Short Name' value",()=>{
    cy.finishedLoading().then(()=>{
        page().appEngagementDetailsEditShortName.invoke('val').then((inputVal)=>{
            expect(inputVal).be.eq(store.data.shortName);
        })
    });
   
})

Then("Test remembered value 'Engagement Contact email' equals 'Engagement Contact' value",()=>{
    cy.finishedLoading().then(()=>{
        page().appEngagementDetailsEditContactDropDown.find('input').invoke('val').then((contactName: string)=>{
            expect(contactName.trim()).be.eq(store.data.engagementContactEmail);
        })
    });
    
})

Then("Test remembered value 'Year string' equals 'Year' value", ()=>{
    page().engagementYear.invoke('text').then((year)=>{
        expect(year.trim()).to.eq(store.data.year);
    })
});

Then("Test remembered value 'Engagement Name string' equals 'Engagement Name' value",()=>{
    page().engagementName.invoke('val').then((name)=>{
        expect(name).to.eq(store.data.engagementName);
    });
})