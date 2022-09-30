@UI
@C1590
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
    * 'Manage' button is not 'visible'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client can mark single requests as not applicable for a service in the Requests Substep in the Engagement Management flow for a pending compliance engagement
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Manage' button on an engagement with a 'Pending' status
    * User clicks 'Continue' button on 'Engagement Selected' modal
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    * User clicks 'Next Step' button in the 'Engagement Details - Locations' step
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    # Fix-auto Test compares 'ce-services<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks 'Open' button on the 'Services' Step
    * User clicks 'Confirm' button in the 'Open Service' modal
    * User clicks 'Next Step' button on 'Custom Requests' substep
    * User clicks 'Next Step' button on 'Criteria' substep 
    * User clicks 'applicable toggle' icon on a random 'request'
    # We want the test to remember the selected request that is marked not applicable
    * Test remembers 'Request id' value as 'Request id string'
    Then Test value 'Request id string' equals 'Request id' value
    * 'not applicable' toggle is 'disabled' in 'remembered Request id'
    * 'Next Step' button is 'enabled'
    * 'Save & Close' button is 'enabled'
    * 'Back' button is 'enabled'
    When User clicks 'Next Step' button on 'Requests' step
    * User clicks "Back" button on "Dates" step
    Then Test remembered value 'Request id string' equals 'Request id' value
    # We want the test to assert that after returning to the page, the 'not applicable' icon remains 'disabled'
    * Test remembered 'not applicable' toggle is 'disabled' in 'remembered Request id'
    * User clicks "Back" button on 'Requests' step
    * User clicks "Next Step" button on 'Criteria' step
    * Test remembered value 'Request id string' equals 'Request id' value
    * Test remembered 'not applicable' toggle is 'disabled' in 'remembered Request id'
    * 'Back' button is 'enabled'
    * 'Save & Close' button is 'enabled'
    * 'Next Step' button is 'enabled'

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
