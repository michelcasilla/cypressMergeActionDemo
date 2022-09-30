import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { CustomRequestSelectors, GenericUiSelectors } from "../../utils/CssSelectors";

  describe("Access Custom Requests Page", () => {
    const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(['i1','i2','i3','i4']);
    const CustomRequest = "Custom Requests";
    const engagementType = 'Compliance';

    context(`Positive users roles should be abble to see ${CustomRequest} page`,() => {
        userTypes.positive.forEach((user: User) => {
          it(`${user.description} can view ${CustomRequest} page`, () => {
            cy.login(user.username, user.password);
            cy.selectClient();
            cy.selectEngagement(engagementType);
            cy.navigate(CustomRequest);
            cy.get(CustomRequestSelectors.customRequest)
              .find(GenericUiSelectors.H1)
              .contains(CustomRequest);
          });
        });
    });

    context(`Negative users roles shouldn't be abble to see ${CustomRequest} page`,() => {
        userTypes.negative.forEach((user: User) => {
          it(`${user.description} cannot view ${CustomRequest} Page`, () => {
            cy.login(user.username, user.password);
            cy.selectClient();
            cy.selectEngagement(engagementType);
            cy.get(GenericUiSelectors.Nav)
              .find(GenericUiSelectors.Li)
              .contains(CustomRequest)
              .should("not.exist");
            cy.visit(CustomRequestSelectors.url)
              .get(CustomRequestSelectors.customRequest)
              .should('not.exist');
          });
        });
      }
    );
  });
