Feature: User is able to assign a consultant to criteria in the criteria substep of a pending engagement

@C1557 @C1588 @C1599
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client cannot view the Criteria Substep in the Engagement Management flow for a pending compliance engagement. @C1557 @C1588 @C1599
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

@C1557 @C1588 @C1599
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client can assign a single consultant to unassigned criteria in the Criteria Substep in the Engagement Management flow for a pending compliance engagement. @C1557 @C1588 @C1599
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
    * User clicks 'Confirm' button from the 'Open Service' modal
    * User clicks 'Next Step' button on 'Custom Requests' substep 
    * User clicks 'unassigned' icon
    # We want the test to select and remember an individual criteria that has not yet been assigned, for a single assignee
    * Test remembers 'Criteria id' value as 'Criteria id string'
    Then Test value 'Criteria id string' equals 'Criteria id' value
    * User clicks 'consultant' in 'Assign Consultant' modal
    * User clicks 'Add Consultants' button
    * 'Consultant(s) have been updated.' snackbar is 'displayed'
    * 'single consultant' icon is 'displayed' in remembered 'Criteria id' row
    * User clicks 'unassigned' icon
     # We want the test to select and remember an individual criteria that has not yet been assigned, for multiple assignees
    * Test remembers 'Criteria id' value as 'Criteria id string'
    Then Test value 'Criteria id string' equals 'Criteria id' value
    * User clicks 'multiple consultants' in 'Assign Consultant' modal
    * User clicks 'Add Consultants' button
    * 'Consultant(s) have been updated.' snackbar is 'displayed'
    * 'multiple consultant' icon is 'displayed' in remembered 'Criteria id' row
    * 'Next Step' button is 'enabled'
    * 'Save & Close' button is 'enabled'
    * 'Back' button is 'enabled'

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
