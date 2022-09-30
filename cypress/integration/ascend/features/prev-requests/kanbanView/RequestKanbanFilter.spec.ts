import { Interception } from "cypress/types/net-stubbing";
import { getCurrentProject } from "../../../../../helpers/engagement.util";
import { CLIENT_NAME } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { AppKanbanFilters, GenericUiSelectors } from "../../../utils/CssSelectors";
import { Engagement } from "../../../interfaces/EngagementInterfaces";

describe("User can filter Requests Kanban by type", () => {
  const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1","e2","e3","e4","e5","i1","i2","i3","i4"]);
  const PageName = "Requests";
  const engagementType = "Compliance";
  const testCase = "C2128";

  context(
    `Positive users roles should be able to see ${PageName} page`,
    () => {
      userTypes.positive.forEach((user: User) => {
        it(`${user.description} can filter kanban by type ${testCase}`, () => {
          cy.login(user.username, user.password);
          cy.setUp(CLIENT_NAME, engagementType);
          cy.navigate(PageName);
          cy.wait(['@projectrequests', '@engagementList']).then(($response: Interception[])=>{ 
            const {projectId, lastKnownProjectId} = getCurrentProject();
            const EngagementList: Engagement[] = $response[1].response.body.data;
            const selectecEngagement = EngagementList.filter((engagement)=>engagement.projectid === (projectId || lastKnownProjectId))[0];
            cy.log(`'Pending: ${selectecEngagement.status}`);
            if(selectecEngagement.status === 'Pending'){
              // If the EngagementStatus is Pending it should't have filters
              cy.get(AppKanbanFilters.AppKanbanFilter).within(() => {
                cy.get(GenericUiSelectors.Button)
                .then(($activeButtons) => {
                  const qtyActiveButtons = $activeButtons.length - 1;
                  expect(qtyActiveButtons, 'Shouldn\'t have selection').to.be.eq(0);
                });
              });
            }else{
              // Located above the columns and under the Requests title [Service,Class,Requirements,Date]
              cy.validateKanbanDefaultFilters();
              // Modal opens with all possible filter options. Only Service, Location, and User are selected.
              // In addition to Service, Location, and User, all other filters are displayed. Filters are selected only after you click out of the modal
              cy.openKanbanFilters();
              cy.validateKanbanFilterSelection();
              // User change filters
              cy.selectRandomKanbanFilters();
              cy.validateKanbanFilterSelection();
              // All check boxes is empty
              // No filters remaining, only Show/Hide Filters link remains
              cy.deselectAllKanbanFilters();
              cy.validateKanbanFilterSelection();
            }
          });
        });
      });
    }
  );
});
