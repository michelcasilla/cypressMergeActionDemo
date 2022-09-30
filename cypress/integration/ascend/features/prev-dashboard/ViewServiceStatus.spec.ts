import { CLIENT_NAME, ENGAGEMENT_CYPRESS1 } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { GenericUiSelectors, DashboardSelectors, NavSelectors } from "../../utils/CssSelectors";

describe('User Can View Dashboard Service Status', () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles('all');
  const testRailCase = 'C973';
  context(
    `Positive roles should be able to view Dashboard Service Status`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} can view Service Status and understand it's information ${testRailCase}.`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, ENGAGEMENT_CYPRESS1);
          cy.navigate('Dashboard');
          cy.scrollToElement('.legend')
          cy.elementContains(GenericUiSelectors.H2, 'A-SCEND Status');
    
          const firstStatusBar = cy.get(`:nth-child(1) > ${DashboardSelectors.StatusBar}`);
          /*
          NOTE: Cypress looks for RGB version of a Hex color - below are the conversions of staus bar colors used:
          rgb(149, 149, 149) = #959595
          rgb(70, 142, 190) =  #468EBE
          rgb(65, 66, 136) = #414288
          rgb(31, 159, 25) = #1F9F19
          */
          const colors = {
            "grayOpen": "rgb(149, 149, 149) none repeat scroll 0% 0% / auto padding-box border-box",
            "blueInProg": "rgb(70, 142, 190) none repeat scroll 0% 0% / auto padding-box border-box",
            "purpleSubmitted": "rgb(65, 66, 136) none repeat scroll 0% 0% / auto padding-box border-box",
            "greenAccepted": "rgb(31, 159, 25) none repeat scroll 0% 0% / auto padding-box border-box"
          }
          
          firstStatusBar.should('exist');
          firstStatusBar.then(($elem) => {
            if ($elem.hasClass(DashboardSelectors.OpenBar)) {
              firstStatusBar.get(`.${DashboardSelectors.OpenBar}`).should('have.css', 'background', colors.grayOpen).first() 
              cy.inspectHoverPopUp(`.${DashboardSelectors.OpenBar}`, "%");
              
            }       
            if ($elem.hasClass(DashboardSelectors.InProgressBar)) {
              firstStatusBar.get(`.${DashboardSelectors.InProgressBar}`).should('have.css', 'background', colors.blueInProg).first()
              cy.inspectHoverPopUp(`.${DashboardSelectors.InProgressBar}`, "%");
            }          
            if ($elem.hasClass(DashboardSelectors.SubmittedBar)) {
              firstStatusBar.get(`.${DashboardSelectors.SubmittedBar}`).should('have.css', 'background', colors.purpleSubmitted).first()
              cy.inspectHoverPopUp(`.${DashboardSelectors.SubmittedBar}`, "%");
            }
            if ($elem.hasClass(DashboardSelectors.AcceptedBar)) {
              firstStatusBar.get(`.${DashboardSelectors.AcceptedBar}`).should('have.css', 'background', colors.greenAccepted).first()
              cy.inspectHoverPopUp(`.${DashboardSelectors.AcceptedBar}`, "%");
            } 
          });
        });
      });
    });
  
    context(
      `Negative roles should not be able to view Dashboard Service Status`,
      () => {
        userTypes.negative.forEach((user: User) => {  
          it(`${user.description} cannot view Service Status ${testRailCase}.`, () => {
            cy.login(user.username, user.password);
            cy.setUp(CLIENT_NAME, ENGAGEMENT_CYPRESS1);
            cy.elementDoesNotContain(NavSelectors.navLi, 'Dashboard');
          });
      });
  });

});