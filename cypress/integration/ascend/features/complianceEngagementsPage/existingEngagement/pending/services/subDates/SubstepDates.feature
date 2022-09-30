Feature: User is viewing the Services Dates substep of a pending engagement. 

@C1622
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client cannot view the Dates Substep in the Engagement Management flow for a pending compliance engagement. @C1622
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

@C1622
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client can view the Dates Substep in the Engagement Management flow for a pending compliance engagement. @C1622
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
    * User clicks 'Next Step' button on 'Custom Requests Substep' 
    * User clicks 'Next Step' button 'Criteria Substep'
    * User clicks 'Next Step' button 'Requests Substep'
    # Fix-auto Test compares 'ce-substep-requests<userType>' screenshot to baseline with a threshold of 0.2 
    Then 'Manage Dates' button is 'disabled' 
    * All 'checkboxes' are 'null'
    # 'null' = equals Not checked-marked
    # Any sortable columns below need a matching validation of the sort order (ascending/descending, etc.)
    * 'Control Family' column is 'sortable'
    * 'Request ID' column is 'sortable'
    * 'Request Type' column is 'sortable'
    * 'Class' column is 'sortable'
    * 'Category' column is 'sortable'
    * 'Request' column is 'sortable'
    * 'Services' column is 'sortable'
    * 'Criteria' column is 'sortable'
    * 'Due Date' column is 'sortable'
    * 'Approve' button is 'enabled'
    * 'Save & Close' button is 'enabled'
    * 'Back' button is 'enabled'

Examples:
| userType | fullname |
| i1       | Align Admin Test |
| i2       | Engagement Executive Test |
| i3       | Manager Test |
| i4       | Consultant Pentester Test |




