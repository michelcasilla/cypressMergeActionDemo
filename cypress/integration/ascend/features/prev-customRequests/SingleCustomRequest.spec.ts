import { CLIENT_NAME, ENGAGEMENT_CYPRESS1 } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { GenericUiSelectors, MatSelectors, CustomRequestSelectors, NavigationSelectors } from "../../utils/CssSelectors";


describe('Create a single custom request from Custom Request Button on Requests Page and view Custom Request', () => {
  const positiveRoles: Array<string> = ['i1', 'i2', 'i3', 'i4'];
  const testRailCase = 'C1337';
  const userTypes = getGroupedUsersByPosNegRoles(positiveRoles);
  userTypes.positive.forEach((user: User) => {
    it(`${user.description} can create custom requests from 'Create Custom Request' button ${testRailCase}.`, () => {
      cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
      cy.clickElementContaining(GenericUiSelectors.Button, 'Create Custom Requests');
      cy.finishedLoading();

      cy.elementContains(GenericUiSelectors.DisabledButton, 'Add Request');

      cy.clickElement(`${GenericUiSelectors.Input}[placeholder="Select Category"]`);
      cy.clickElementContaining(MatSelectors.TooltipTrigger, 'Population');

      cy.clickElementContaining(MatSelectors.SelectPlaceholder, 'Select Request Type');
      cy.clickElementContaining(MatSelectors.SelectOption, 'Population');

      cy.clickElement(`${GenericUiSelectors.Input}[placeholder="Select Criteria"]`);
      cy.get(`${GenericUiSelectors.DropDownOptionsContainer} ${MatSelectors.Checkbox}`).first().click();

      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(2);
      cy.typeInField(`${CustomRequestSelectors.DueDateContainer} ${GenericUiSelectors.Input}`, `${month}/${day}/${year}`);

      cy.typeInField(`${CustomRequestSelectors.DescriptionInput} ${GenericUiSelectors.Input}`, `Automated Test description on ${date}.`);
      
      cy.clickElementContaining(GenericUiSelectors.Button, 'Add Request');

      cy.elementContains(GenericUiSelectors.Snackbar, '1 Custom Request(s) created successfully C-');
    })
  });
  userTypes.negative.forEach((user: User) => {
    it(`${user.description} cannot create custom requests ${testRailCase}.`, () => {
      cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
      cy.elementDoesNotContain(GenericUiSelectors.Button, 'Create Custom Requests');
      cy.elementDoesNotContain(NavigationSelectors.NavbarItem, 'Custom Requests');
    })
  });
})