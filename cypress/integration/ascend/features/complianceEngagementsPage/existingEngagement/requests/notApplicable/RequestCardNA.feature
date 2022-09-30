Feature: User is able to mark Requests not applicable for a service in the requests substep of a pending engagement

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client cannot view the Requests Substep in the Engagement Management flow for a pending compliance engagement
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Select' button on random 'Engagement Name' with 'In Progress' status
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User navigates to 'Requests' page   
    * User clicks on 'request card' with a type: [ 'General', 'Policy', 'Sample Frequency'] with any status: [ 'Open', 'In Progress', 'Action Required' ]
    Then 'trash can' icon is not 'visible'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

@C2248
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client can mark a request NA for the service in a request card.@C2248
    Given User '<UserType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Select' button on random 'Engagement Name' with 'In Progress' status
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User navigates to 'Requests' page   
    * User clicks on 'request card' with a type: [ 'General', 'Policy', 'Sample Frequency'] with any status: [ 'Open', 'In Progress', 'Action Required' ]
    * Test remembers 'Request card id' value as 'Request card id string'
    * Test value 'Request card id string' equals 'Request card id' value
    # we want the test to remember the id of the request opened because once the request is marked NA for the service it will no longer show in kanban board
    * User clicks 'trash can' icon in 'Service, Criteria & Consultant' section 
    * User clicks 'Remove' button from the 'N/A Request' modal 
    * 'Service successfully marked as Not Applicable' snackbar is 'displayed'
    Then Test remembered 'Request card id' value does not exist in 'request card list' values
    # we expect request id value/request card to no longer exist in request list 

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
