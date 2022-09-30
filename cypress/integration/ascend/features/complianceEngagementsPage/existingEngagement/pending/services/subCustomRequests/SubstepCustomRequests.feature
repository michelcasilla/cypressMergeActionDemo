Feature: User is viewing the Custom Requests substep of a pending engagement

Scenario: Company Admin Test user in A-SCEND Demo 
    Given User 'e1' is logged in
    When User clicks the 'A-LIGN' client from 'Client' dropdown
    * User Navigates to 'Compliance Engagements' page
    But User can't select New Engagement 'compliance' option
 # to do make scenario outline for all e's

Scenario: Align Admin Test user in A-SCEND Demo 
    When User clicks the 'A-LIGN' client from 'Client' dropdown
    * Navigates to 'Compliance Engagements' page
    * Selects New Engagement 'compliance' option
    * User selects 'Demo Client'
    * User navigates to 'New Engagament Services' Custom Request
    Then 'New Engagament Services Custom Request' is 'viewed'
    * 'Create Custom Request' is 'clickable'
    * 'Mass Upload' is 'clickable'
    * 'Category' is 'clickable'
    * 'Request Type' is 'clickable'
    * 'Description' is 'clickable'
    * 'Criteria' is 'clickable'
    * 'Due Date' is 'clickable'
    * 'Location Icon' is 'clickable'
    * 'More Options' is 'clickable'
    * 'Save Custom Request' is 'clickable'
 # to do make scenario outline for all i's
    