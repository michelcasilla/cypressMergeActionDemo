import { CLIENT_NAME } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppNavigationSelector, GenericUiSelectors, CustomRequestSelectors } from "../../utils/CssSelectors";

  
  describe("Add new custom category - single", () => {
    const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["i1","i2","i3","i4"]);
    const engagement = "CYPRESS";
    const testRailCase = 'C1340';
    
    context('Positive users should be able to add new custom category - single',()=>{
        userTypes.positive.forEach((user: User) => {
            it(`${user.description} can add new custom category. ${testRailCase}`, () => {
                cy.login(user.username, user.password);
                cy.setUp(CLIENT_NAME, engagement);
                cy.navigate('Custom Requests');
                cy.createCustomCategory();
            });
        });
    });
    
    context('Negative users shouldn\'t be able to add new custom category - single',()=>{
        userTypes.negative.forEach((user: User) => {
            it(`${user.description} can't add new custom category. ${testRailCase}`, () => {
                cy.login(user.username, user.password);
                cy.setUp(CLIENT_NAME, engagement);
                cy.get(AppNavigationSelector.appNavigation)
                    .get(GenericUiSelectors.Li)
                    .contains('Custom Requests')
                    .should('not.exist')
                cy.visit(CustomRequestSelectors.url);
                cy.get(CustomRequestSelectors.customRequest).should('not.exist');
            });
        });
    })
  
  });