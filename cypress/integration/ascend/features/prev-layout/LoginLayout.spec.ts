
describe('Login Page Layout', () => {
  const testRailCase = 'C934';

  beforeEach(() => {
    cy.visit('/idp/login');
  });
  
  it(`Should have A-LIGN mountain background ${testRailCase}.`, () => {
    cy.get('.body-container')
     .should('have.css', 'background',  'rgba(0, 0, 0, 0) url("https://images.a-scend2.com/images/img_login_hero.png") no-repeat fixed 50% 50% / cover padding-box border-box');
  });

  it(`Should contain the A-SCEND logo ${testRailCase}.`, () => {
      cy.elementExists('.loginlogoimage')
        .and('have.attr', 'src', 'https://images.a-scend2.com/images/a-lign-logo.svg')

      cy.elementContains('.logotextcontainer .largelogotext', 'A-SCEND');
      cy.elementContains('.logotextcontainer .smalllogotext', 'powered by A-LIGN');
  });
 
  it(`Should have white box appear in middle of page below A-SCEND logo ${testRailCase}.`, () => {
     cy.get('.centerform.fontweightnormal')
       .should('have.css', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box');
  });

  it(`Should have input field for email and password ${testRailCase}.`, () => {
      cy.elementExists('#email')
        .elementExists('#password')
        .elementExists('#loginbutton');
  });

  it(`Should have "Need Help?" hyperlink at the bottom of the white box ${testRailCase}.`, () => {
      cy.get('.forgotpasswordtext a')
       .should('contain', 'Need Help')
       .and('have.attr', 'href', '/idp/pwdrecovery/resetmail');
  });

  it(`Should have 3 hyperlinks, Privacy Policy, Cookie Policy, and Term of Use at bottom of window ${testRailCase}.`, () => {
    cy.get('.footer').within(() => {
      cy.elementContains('.footer-links a', 'Privacy Policy')
        .and('have.attr', 'href', 'https://a-lign.com/privacy-policy')
        .and('have.attr', 'target', '_blank');
      
      cy.elementContains('.footer-links a', 'Cookie Policy')
        .and('have.attr', 'href', 'https://a-lign.com/cookie-policy')
        .and('have.attr', 'target', '_blank');
      
      cy.elementContains('.footer-links a','Terms of Use')
        .and('have.attr', 'href', 'https://a-lign.com/termsofuse')
        .and('have.attr', 'target', '_blank');
    });
  });
 
  it(`QA Visual Verify: 1) Login box is centered 2) Login Box background is white 3) page background is mountains ${testRailCase}`, () => {
      cy.screenshot();
   })
});