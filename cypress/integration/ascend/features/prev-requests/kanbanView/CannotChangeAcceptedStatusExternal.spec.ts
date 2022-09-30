import { getAccounts } from "../../../../../helpers/environment";
import { UsersListType } from "../../../interfaces/UserTypeInterfaces";
import { KanbanUIElements } from "../../../../../support/kanbanPageObjects/ui-elements";


const KanbanViewUIElements = new KanbanUIElements();

describe("External users cannot change the status of a request in the Accepted column.", () => {
  const positiveRoles: Array<string> = [
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
  ];
  const negativeRoles: Array<string> = [
    "i1",
    "i2",
    "i3",
    "i4",
  ];
  const users: UsersListType = getAccounts();
  const client = "A-SCEND Demo";
  const engagement = "CYPRESS02";
  const requestStatus = ["SUBMITTED","ACCEPTED"];

  for (const role in users) {
    const user = users[role];
    /** TESTS FOR POSTIVE ROLES **/
    if (positiveRoles.includes(role)) {
      it(`${user.description} cannot change the status of a request in the Accepted column.`, () => {
        cy.login(user.username, user.password);
        cy.selectClient(client);
        cy.selectEngagementWithNum(engagement).then(() => {
          cy.navigate("Requests");
        });
        for (const status in requestStatus) {
          const stat = requestStatus[status];
          cy.wait(3000);
          cy.get(KanbanViewUIElements.kanbanSubmittedColumn).should("have.css", "opacity", "1");
          cy.get(KanbanViewUIElements.kanbanAcceptedFirstCard).click();
          cy.get(KanbanViewUIElements.requestDialogStatusDropdownCaret).should('not.exist');
          cy.get('.content-container_side-bar').type('{esc}');

          cy.get(
            stat.toLocaleLowerCase() === 'submitted' ? KanbanViewUIElements.kanbanSubmittedFirstCard : KanbanViewUIElements.kanbanAcceptedFirstCard
          ).then(($el) => {
            const requestName = $el.text();
            //NOTE This code attempts to drag items from one column to another.
            const dataTransfer = new DataTransfer();
            cy.get(
              `#${stat.toLocaleLowerCase()} > :nth-child(1) > .kanban-column_open_list--item > .card`
            ).trigger("dragstart", {
              dataTransfer,
            });
            cy.get(KanbanViewUIElements.kanbanOpenColumn).trigger("drop", {
              dataTransfer,
            });
            cy.get(KanbanViewUIElements.kanbanOpenColumn).contains(requestName).should("not.exist");
          });
        }
      });
    }
    /** TESTS FOR NEGATIVE ROLES **/

    if (negativeRoles.includes(role)) {
      it(`${user.description} can change the status of a request in the Accepted column..`, () => {
        cy.login(user.username, user.password);
        cy.selectClient(client);
        cy.selectEngagementWithNum(engagement).then(() => {
          cy.navigate("Requests");
        });
        for (const status in requestStatus) {
          const stat = requestStatus[status];
          cy.wait(3000);
          cy.get(KanbanViewUIElements.kanbanSubmittedColumn).should("have.css", "opacity", "1");
          cy.get(KanbanViewUIElements.kanbanAcceptedFirstCard).click();
          cy.get(KanbanViewUIElements.requestDialogStatusDropdownCaret).should('exist');
          cy.get('.content-container_side-bar').type('{esc}');
          cy.get(
            KanbanViewUIElements.kanbanSubmittedFirstCard
          ).then(($el) => {
            const requestName = $el.text();
            //NOTE This code attempts to drag items from one column to another.
            const dataTransfer = new DataTransfer();
            cy.get(
              `#${stat.toLocaleLowerCase()} > :nth-child(1) > .kanban-column_open_list--item > .card`
            ).trigger("dragstart", {
              dataTransfer,
            });
            cy.get(KanbanViewUIElements.kanbanOpenColumn).trigger("drop", {
              dataTransfer,
            });
            cy.get(KanbanViewUIElements.kanbanOpenColumn).contains(requestName).should("not.exist");
          });
        }
      });
    }
  }
});
