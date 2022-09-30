import { CLIENT_NAME, ENGAGEMENT_CYPRESS3, ENGAGEMENT_NAME_CYPRESS3 } from "../../../../helpers/environment";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { CustomRequestSelectors, MatSelectors, GenericUiSelectors, AppNavigationSelector, NavSelectors } from "../../utils/CssSelectors";

describe('User is able to view Custom Criteria Modal', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['i1','i2','i3','i4']);
  context(
    "Positive users roles should be able to see elements on Custom Criteria Modal",
    () => {
      userTypes.positive.forEach(user => {
        it(`${user.description} can view UI elements exist on Custom Criteria Modal.`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, ENGAGEMENT_CYPRESS3);
          cy.navigate(CustomRequestSelectors.Title);
          cy.finishedLoading();
    
          cy.clickElement(CustomRequestSelectors.CriteriaDropdown);
          cy.clickElementContaining(`${MatSelectors.MatMenuPanel} ${GenericUiSelectors.Button}`, 'Add / View Custom Criteria');
          cy.waitOnNetworkReq('custom/criteria', 'getCustomCriteria')
          
          cy.get(CustomRequestSelectors.CustomCriteriaDialog).within(() => {
            cy.elementContains(GenericUiSelectors.CaptionMedium, `${CLIENT_NAME} - ${ENGAGEMENT_NAME_CYPRESS3}`);
            cy.elementContains(GenericUiSelectors.H4, 'Custom Criteria');
    
            cy.elementContains(MatSelectors.OutlinedIcons, 'close');
    
            cy.get('form').within(() => {
              cy.elementContains(`${MatSelectors.FormField} ${MatSelectors.Label}`, 'Service');
              cy.elementContains(`${MatSelectors.FormField} ${MatSelectors.Label}`, 'Name');
              cy.elementContains(`${MatSelectors.FormField} ${MatSelectors.Label}`, 'Description');
              cy.elementContains(`${MatSelectors.FormField} ${MatSelectors.Label}`, 'Consultants');
              cy.elementContains(`${MatSelectors.OutlinedIcons}`, 'content_copy');
              cy.elementContains(`${MatSelectors.OutlinedIcons}`, 'more_vert');
            });
            cy.elementContains(GenericUiSelectors.Button, 'Create More Criteria');
          });
        });
      });
    });
  
    context(
      "Negative users roles should not be able to see elements on Custom Criteria Modal",
      () => {
        userTypes.negative.forEach(user => {
          it(`${user.description} cannot access Custom Requests page.`, () => {
            cy.login(user.username, user.password);
            cy.setUp(CLIENT_NAME, ENGAGEMENT_CYPRESS3);
            cy.elementDoesNotContain(`${AppNavigationSelector.appNavigation} ${NavSelectors.navLi}`, CustomRequestSelectors.Title);
          });
        });
      });
})