import { getAccounts, getAssignableUsernames } from "../../../../../helpers/environment";
import { UsersListType } from "../../../interfaces/UserTypeInterfaces";
import { KanbanUIElements } from "../../../../../support/kanbanPageObjects/ui-elements";
import { ConfirmSubmission } from "../../../../../support/moveCardToSubmittedAndConfirm";
import { SetFilterToPolicy } from "../../../../../support/setKanbanFilter/setKanbanFilterToPolicy";


const kanbanViewUIElements = new KanbanUIElements();
const confirmSubmission = new ConfirmSubmission();

//NOTE Atleast one already created CR is necessary for this test to run successfully.

describe("User can change status from open to submitted", () => {
  const users: UsersListType = getAccounts();
  const client = "A-SCEND Demo";
  const engagement = "CYPRESS02";
  const testRailCase = "C2248";
  const assignableUsers: Array<string> = getAssignableUsernames();
  const Roles: Array<string> = [
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "i1",
    "i2",
    "i3",
    "i4",
  ];

  const setFilterToPolicy = new SetFilterToPolicy();

  for (const role in users) {
    const user = users[role];
    const randomString = (Math.random() + 1).toString(36).substring(7);

    if (Roles.includes(role)) {
      it(`Verify ${user.description} ${
        role === "e5" ? "cannot" : "can"
      } change status of any request from Open to Submitted ${testRailCase}`, () => {
        const user = users["i1"];
        cy.pretestCreateAndAssignCR(
          user,
          client,
          engagement,
          2,
          randomString,
          users,
          assignableUsers
        );
        cy.get(kanbanViewUIElements.navigationUserTitle).click({ force: true });
        cy.get(kanbanViewUIElements.navigationLogout).click({ force: true });
        const userBeingTested = users[role];
        cy.login(userBeingTested.username, userBeingTested.password);
        cy.selectEngagementWithNum(engagement).then(() => {
          cy.navigate("Requests");
          cy.wait(2000);
        });
        setFilterToPolicy.setToPolicy();
        cy.wait(1000);
        for (let i = 0; i < 2; i++) {
          cy.wait(2000);
          cy.get("#open").contains(randomString).click({ force: true });
          cy.wait(1000);
          cy.clickCommentSection();
          cy.postComment(false);
          if (role === "e5") {
            cy.wait(1000);
            cy.get(".container").contains("Open").click({ force: true });
            cy.wait(1000);
            cy.elementDoesNotContain(
              kanbanViewUIElements.dropdownStatusTab,
              "Submitted"
            );
            cy.wait(1000);
            cy.get(".container").contains("Open").click({ force: true });
            cy.get("#submitted").should("not.include.text", randomString);
            i === 0
              ? cy.get("#submitted").should("not.include.text", randomString)
              : cy
                  .get("#submitted")
                  .should("not.include.text", randomString + " 2");
            cy.get(".content-container_side-bar").type("{esc}");
            break;
          } else {
            cy.wait(1000);
            confirmSubmission.confirmSubmission(i);
            cy.wait(1000);
            i === 0
              ? cy.get("#submitted").should("include.text", randomString)
              : cy
                  .get("#submitted")
                  .should("include.text", randomString + " 2");
          }
        }
      });
    }
  }
});
