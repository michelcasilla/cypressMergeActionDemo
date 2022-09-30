import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { LoginService } from '../LoginService';

// SCENARIO 1
let page!: LoginService;

Given("I am on the login page", () => {
    page = LoginService.visit();
});

When("I login as a valid {string} user", (role: string) => {
    page.loginAsRole(role);
});

Then("I should be logged in", () => {
    expect(page.isLoggedIn).to.be.true;
});

Then("I should be logged in as {string}", (fullname: string) => {
    expect(page.isLoggedIn).to.be.true;
    expect(page.profileName).to.equal(fullname, `Profile name does not match ${fullname}`);   
});

// SCENARIO 2
When("I enter {string} as the username", (email: string) => {
    page.email = email;
});

When("I enter {string} as the password", (password: string) => {
    page.password = password;
});

When("I click on Continue CTA", () => {
    page.loginButton.click();
    page.waitForResponse();
});

Then("I should see an error message that says {string}", (errorMessage: string) => {
    page.hasErrorMessage((message: string)=>{
        expect(message).to.contain(errorMessage);
    });
});