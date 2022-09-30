import { CLIENT_NAME, ENGAGEMENT_CYPRESS1 } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { GenericUiSelectors } from "../../utils/CssSelectors";

describe('User can view Requests Table header', () =>  {
  const engagementName = 'CYPRESS01_2021_TYPE1SOC2_TYPE2SOC1_PCIDSSROC_ISO27001_FISMASECURITYASSESSMENT_TYPE1HIPAA';
  const engagementHeaderText = `${CLIENT_NAME} - ${engagementName}`;
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["i1","i2","i3","i4"]);
  const testRailCaseInternal = 'C1139';
  const testRailCaseExternal = 'C1140';

  context("Internal roles should see the corresponding header data",()=>{
    userTypes.positive.forEach((user: User) => {
        it(`${user.description} can view the correct header ${testRailCaseInternal}.`, () => {
            cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
            
            cy.showTableView();

            cy.verifyCommonHeaderData(engagementHeaderText);
            cy.elementContains(GenericUiSelectors.Button, 'Mass Upload');
            cy.elementContains(GenericUiSelectors.Button, 'Create Custom Requests');
        });
    });
  });

  context("External roles should see the corresponding header data",()=>{
    userTypes.negative.forEach((user: User) => {
        it(`${user.description} can view the correct header ${testRailCaseExternal}.`, () => {
            cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
            
            cy.showTableView();

            cy.verifyCommonHeaderData(engagementHeaderText);
            cy.elementDoesNotContain(GenericUiSelectors.Button, 'Mass Upload');
            cy.elementDoesNotContain(GenericUiSelectors.Button, 'Create Custom Requests');
        });
    });
  });
});
