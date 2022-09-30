Feature: User is viewing the Services Requests substep of a pending engagement

Precondition: The engagement is in pending status and a roll forward engagement has been linked for the service.  New requests are avaiable for the service and all requests are marked applicable.

@C1583
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

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client can view the Requests Substep in the Engagement Management flow for a pending compliance engagement
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
    # Fix-auto Test compares 'ce-substep-requests<userType>' screenshot to baseline with a threshold of 0.2 
    * Test condition 'roll-forward-features-enabled' starts if 'linked-and-new-requests'
    Then 'Manage Location(s)' button is 'disabled'
    * 'Toggle Selected' icon is 'disabled'
    * 'New Requests' button is 'enabled' 
    * 'Ellipsis' icon is 'enabled'
    * All 'checkboxes' are 'null'
     # 'null' = equals Not checked-marked
    * Test condition  'roll-forward-features-enabled' else
    * 'Manage Location(s)' button is 'disabled' 
    * 'Toggle Selected' icon is 'disabled'
    * 'New Requests' button is not 'visible' 
    * 'Ellipsis' icon is not 'visible'
    * All 'checkboxes' are 'null'
    * Test condition 'roll-forward-features-enabled' ends
    # Any sortable columns below need a matching validation of the sort order (ascending/descending, etc.)
    * 'Request ID' column is 'sortable'
    * 'Request Type' column is 'sortable'
    * 'Class' column is 'sortable'
    * 'Cateogry' column is 'sortable'
    * 'Request' column is 'sortable'
    * 'Services' column is 'sortable'
    * 'Criteria' column is 'sortable'
    * 'Locations(s)' column is 'sortable'
    * 'Applicable' column is 'sortable'
    * 'Next Step' button is 'enabled'
    * 'Save & Close' button is 'enabled'
    * 'Back' button is 'enabled'
    
    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
