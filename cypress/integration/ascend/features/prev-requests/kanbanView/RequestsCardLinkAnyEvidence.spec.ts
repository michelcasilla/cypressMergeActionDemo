import { CLIENT_NAME, ENGAGEMENT_CYPRESS1, ENGAGEMENT_NAME_CYPRESS1 } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { RequestsSelectors, AppEvidenceSelectors, GenericUiSelectors, AgGridSelectors } from "../../../utils/CssSelectors";

describe('User can link any evidence from the selected engagement', () =>  {
    const requestRefId = 'C-1000';
    const rowsToSelect = [1, 3, 8];
    const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e1", "e2", "e3", "i1", "i2", "i3", "i4"]);
    const testRailCase = 'C2215';

    context('Positive roles should be able open "Link Evidence From This Engagement" modal',()=>{
        userTypes.positive.forEach((user: User) => {
            it(`${user.description} can access and link evidence from the current engagement ${testRailCase}.`, () => {
                cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
                
                cy.clickElementContaining(RequestsSelectors.Card, requestRefId);
                cy.finishedLoading();
                cy.openEvidenceFromThisEngagement();
                cy.waitOnNetworkReq('evidence/list', 'getEvidenceList');
                cy.get(AppEvidenceSelectors.appEvidenceDialog).within(() => {
                    cy.elementContains(GenericUiSelectors.DisabledButton, 'Link Evidence');
                    cy.elementContains(GenericUiSelectors.H6, `${requestRefId} - ${ENGAGEMENT_NAME_CYPRESS1}`);
                    rowsToSelect.forEach(row => {
                        cy.clickElement(`${AgGridSelectors.AgColumnViewport} .ag-row:nth-child(${row})`);
                    });
                    cy.clickElementContaining(GenericUiSelectors.Button, 'Link Evidence');
                });
            });
        });
    });

    // Negative roles cases are covered in RequestsCardLinkOnlyEvidence.spec.ts (Testrail C2216)
});
