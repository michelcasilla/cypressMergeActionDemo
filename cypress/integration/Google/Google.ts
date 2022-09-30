import { Before, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Before(()=>{
	Cypress._.times(1000,(index)=>{
		cy.get('div');
	})	
})

Given('I open Google page',()=>{
	expect(true).be.true
})

When('User sees the page',()=>{
	expect(true).be.true
})

Then('I see {string} in the {string}',(name: string, title: string)=>{
	expect(name).not.empty;
})