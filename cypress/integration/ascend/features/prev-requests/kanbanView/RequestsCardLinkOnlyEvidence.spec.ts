import { CLIENT_NAME, ENGAGEMENT_CYPRESS1, ENGAGEMENT_NAME_CYPRESS1 } from "../../../../../helpers/environment";
import { User } from "../../../interfaces/UserTypeInterfaces";
import { GroupedRoles, getGroupedUsersByPosNegRoles } from "../../../../../helpers/getGroupedUsersByPosNegRoles";
import { RequestsSelectors, AppEvidenceSelectors, GenericUiSelectors, AgGridSelectors } from "../../../utils/CssSelectors";

describe('User can link only their own evidence from the selected engagement', () =>  {
    const requestRefId = 'C-1000';
    const userTypes: GroupedRoles = getGroupedUsersByPosNegRoles(["e4", "e5"]);
    const testRailCase = 'C2216';
    const usersEvidences = {
        e4: ['Dar1 copy 128.rtf', 'Dar1 copy 124.rtf', 'Dar1 copy 127.rtf'],
        e5: [],
    }

    context('Positive roles should be able open "Link Evidence From This Engagement" modal',()=>{
        userTypes.positive.forEach((user: User) => {
            it(`${user.description} can only access and link their evidence from the current engagement ${testRailCase}.`, () => {
                cy.goToRequests(user, CLIENT_NAME, ENGAGEMENT_CYPRESS1);
                
                cy.clickElementContaining(RequestsSelectors.Card, requestRefId);
                cy.finishedLoading();
                cy.openEvidenceFromThisEngagement();
                cy.waitOnNetworkReq('evidence/list', 'getEvidenceList');
                cy.get(AppEvidenceSelectors.appEvidenceDialog).within(() => {
                    cy.elementContains(GenericUiSelectors.DisabledButton, 'Link Evidence');
                    cy.elementContains(GenericUiSelectors.H6, `${requestRefId} - ${ENGAGEMENT_NAME_CYPRESS1}`);
                    
                    const evidences = usersEvidences[user.role];
                    if (evidences.length) {
                        cy.get(AgGridSelectors.AgColumnViewport).find(AgGridSelectors.AgRow).should('have.length', evidences.length);
                    } else {
                        cy.elementContains(GenericUiSelectors.H3, 'No Files Found');
                    }
                    evidences.forEach(evidence => {
                        cy.elementContains(AgGridSelectors.AgCell, evidence);
                    });
                });
            });
        });
    });

    // Negative roles cases are covered in RequestsCardLinkAnyEvidence.spec.ts (Testrail C2216)
});
