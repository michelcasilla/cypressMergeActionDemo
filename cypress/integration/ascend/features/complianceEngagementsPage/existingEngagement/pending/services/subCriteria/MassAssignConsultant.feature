Feature: User is able to assign a consultant to multiple criteria in the criteria substep of a pending engagement

@C1561 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client cannot view the Criteria Substep in the Engagement Management flow for a pending compliance engagement. @C1561 
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

@C1561 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client can assign a single consultant to multiple unassigned criteria in the Criteria Substep in the Engagement Management flow for a pending compliance engagement. @C1561 
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
    * User clicks multiple 'checkbox' icons for 'unassigned criteria'
    # 'unassigned criteria' means criteria in the list that have not been assigned consultants yet
    # We want the test to select and remember multiple criteria that have not yet been assigned
    * Test remembers 'Criteria id' values as 'Criteria id strings'
    Then Test value 'Criteria id strings' equals 'Criteria id' values
    # note: criteria id is the unique id given to each specific criterion 
    * User clicks 'Assign Consultant' button in the 'Criteria' grid
    * User clicks 'consultant' in 'Assign Consultant' modal
    * User clicks 'Add Consultants' button in 'Assign Consultant' modal
    * 'Consultant(s) have been updated.' snackbar is 'displayed'
    When Test remembers 'single consultant' icons 'displayed' in 'remembered Criteria id'
    * User clicks 'Next Step' button
    * User clicks 'Back' button on 'Requests' substep
    Then Test remembered values 'Criteria id' equals 'Criteria id' values where 'single consultant' icons were 'displayed'

Examples:
| userType | fullname |
| i1       | Align Admin Test |
| i2       | Engagement Executive Test |
| i3       | Manager Test |
| i4       | Consultant Pentester Test |
