import { CLIENT_NAME, ENGAGEMENT_CYPRESS1 } from "../../../../helpers/environment";
import { User } from "../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../helpers/getGroupedUsersByPosNegRoles";
import { RequestsSelectors } from "../../utils/CssSelectors";


describe('User can toggle Requests between Kanban and Table views', () =>  {
    const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);
    const testRailCase = 'C1167';

    userTypes.positive.forEach((user: User) => {
        it(`${user.description} can toggle between Kanban and Table view ${testRailCase}.`, () => {
            cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
            
            cy.showTableView();
            cy.elementExists(RequestsSelectors.TableSelector);

            cy.showKanbanView();
            cy.elementExists(RequestsSelectors.KanbanSelector);
        });
    });
});
