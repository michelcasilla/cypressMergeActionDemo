// import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
// import { getAccount } from '../../helpers/environment';
// import { RootNavigationItems } from '../ascend/interfaces/NavigationTypes';
// import { UserType } from '../ascend/interfaces/UserTypeInterfaces';
// import '../ascend/interfaces/ParameterTypes'
// import { StoreService } from '../../helpers/store';
// import { DataGenerator } from '../../DataGenerator/DataGenerator';

// const store = StoreService.getStore();

// Given("User {string} is logged in", (userType: string) => {
//     const account: UserType = getAccount(userType);

//     if (!account) {
//         throw new Error(`No account found for user type: ${userType}`);
//     }
//     store.setItem("currentUser", account);
//     store.setItem("currentUserType", userType);
//     cy.login(account.username, account.password);
// });

// When("User clicks the {string} client from 'Client' dropdown", (clientName: string)=>{
//     let client = clientName;
//     DataGenerator.getIntance().accountObject.then((account)=>{
//         if (clientName === 'Demo Client') {
//             client = account.accountName;
//         }
//         store.setItem(clientName, client);
//         if (store.condition) {
//             cy.selectClient(client);
//         }
//     })
// });

// When("Test condition {string} else", (condition: string) => {
//     if (store.condition !== null) { 
//         store.condition = !store.condition;
//     }
//     store.setItem(condition, false);
// });

// When("Test condition {string} ends", (condition: string) => {
//     store.condition = null;
//     store.setItem(condition, null);
// });

// When('User selects the {string} client', (clientName: string)=>{
//     if (store.condition) {
//         cy.selectClient(store.getItem(clientName));
//     }
// });

// When('User navigates to {string}', (navItem: string)=>{
//     if (store.condition) {
//         cy.navigate(navItem as RootNavigationItems);
//         cy.finishedLoading();
//     }
// });

// Then('Test compares {string} screenshot to baseline', (screen: string) => {
//     if (store.condition) {
//         cy.finishedLoading();
//         cy.compareSnapshot(screen);
//     }
// });

// Then('Test compares {string} screenshot to baseline with a threshold of {float}', (screen: string, threshold: number) => {
//     if (store.condition) {
//         cy.finishedLoading();
//         cy.compareSnapshot(screen, threshold);
//     }
// });

// When("Test condition {string} starts if {string} value is not 'displayed' in 'Client' dropdown", (condition: string, client: string) => {
//     cy.finishedLoading();
//     cy.get('app-dashboard-top-bar mat-select .mat-select-value').then($element => {
//         store.condition = $element.text() !== store.getItem(client);
//     });
// });


// When("User clicks {string} button from the 'View Client Home Page' modal", (buttonLabel: string) => {
//     if (store.condition) {
//         cy.finishedLoading();
//         cy.appConfirmDialogOrReject(buttonLabel);
//     }
// });

// Then("User cannot click the {string} client from 'Client' dropdown", (client: string) => {
//     if (store.condition) {
//         cy.clientDoesNotExist(client);
//     }
// });
