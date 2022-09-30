import { UIOption } from "../e2e/ascend/interfaces/UIOptionTypes";

export const Clickable = (option: UIOption): void=>{
    cy.get(option.selector)
    .should('exist');
}

export const Displayed = (option: UIOption): void=>{
    cy.get(option.selector)
        .contains(option.selector, option.text)
        .should('be.visible');
}

export const Active = (option: UIOption): void=>{
    cy.get(option.selector)
        .contains(option.selector, option.text)
        .should('be.visible');
}

export const Disabled = (option: UIOption): void=>{
    cy.get(option.selector)
        .contains(option.selector, option.text)
        .should('be.disabled');
}

export const IconDisabled = (option: UIOption): void=>{
    cy.get(option.selector)
        .contains(option.selector, option.icon)
        .should('be.disabled');
}

export const getUIElement = (option: UIOption): Cypress.Chainable<JQuery<HTMLElement>> => {
    let element = cy.get(option.selector);
    if (option.text) {
        element = element.contains(option.selector, option.text);
    }

    if (option.icon) {
        element = element.contains(option.selector, option.icon);
    }

    return element;
}

export const DisabledOrReadOnly = (option: UIOption): void=>{
    getUIElement(option)
        .then(($elem) => {
            const isDisabled = $elem.attr('aria-disabled') === 'true' || $elem.is(':disabled');
            
            if(isDisabled) {
                cy.wrap($elem).should('not.be.enabled');
            } else {
                cy.wrap($elem).should('have.attr', 'readonly');
            }
        });
}

export const ExecAction = (uiOption: UIOption, action: string): void =>{
    switch(action){
        case "clickable":
            Clickable(uiOption);
            break;
        case "displayed":
            Displayed(uiOption);
            break;
        case "active":
            Active(uiOption);
            break;
        case "disabled":
            Disabled(uiOption);
            break;
        case "Icondisabled":
            IconDisabled(uiOption);
            break;
        case "DisabledOrReadOnly":
            DisabledOrReadOnly(uiOption);
            break;
        default:
            break;
    }
}