Feature: User completes engagement in existing compliance engagement

@C7619 @C7620 @C7622 @C7623 @C7624 @C7626
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot complete engagement in existing compliance engagement. @C7619 @C7620 @C7622 @C7623 @C7624 @C7626
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Select' button on any 'Status': ['In Progress', 'Published', 'Pending']
    # "any" is "pick one of"
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User clicks 'ellipses' icon in 'selected engagement-dashboard'
    Then 'Complete Engagement' icon is not 'visible'
    
     Examples:
     | userType | fullname |
     | e1       | Company Admin Test|
     | e2       | Engagement Admin Test|
     | e3       | Security Coordinator Test|
     | e4       | Security Analyst 2 Test| 
     | e5       | Security Analyst 1 Test|

@C7619 @C7620 @C7622 @C7623 @C7624 @C7626
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client completes engagement in existing compliance engagement. @C7619 @C7620 @C7622 @C7623 @C7624 @C7626
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User targets random 'Engagement Name' with any status: ['In Progress', 'Published', 'Pending']
    # before user actually clicks an engagement, they need to 'target' an engagement name to store, "any" is "pick one of"
    * Test remembers 'Engagement Name' value as 'Remembered Engagement string'
    Then Test value 'Remembered Engagement string' equals 'Engagement Name' value
    When User clicks 'Select' button on the 'Remembered Engagement'
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User clicks 'ellipses' icon in 'selected engagement-dashboard'
    * User clicks 'Complete Engagement' icon in 'dashboard-ellipses' dropdown
    # Fix-auto Then Test compares 'ce-complete-engagement-modal-<userType>' screenshot to baseline with a threshold of 0.2       
    #user clicks and tests both 'Cancel, Go Back' or 'X' icon to cancel confirmation modal
    When User clicks 'Cancel, Go Back' button in 'Are you sure you want to close the engagement?' modal
    * User clicks 'ellipses' icon in 'selected engagement-dashboard'
    * User clicks 'Complete Engagement' icon in 'dashboard-ellipses' dropdown
    * User clicks 'X' icon in 'Are you sure you want to close the engagement?' modal
    * User clicks 'ellipses' icon in 'selected engagement-dashboard'
    * User clicks 'Complete Engagement' icon in 'dashboard-ellipses' dropdown
    * User clicks 'Yes, Complete Engagement' button in 'Are you sure you want to close the engagement?' modal
    Then 'Engagement has been moved to completed.' snackbar is 'displayed'
    When User is routed to 'Compliance Engagements'
    * User types remembered value 'Remembered Engagement string' in 'Search Bar'
    Then 'Remembered Engagement' 'Status' equals 'Complete'
    * Test compares 'ce-completed-report-status-<userType>' screenshot to baseline with a threshold of 0.2    
    When User clicks 'Select' button on 'Remembered Engagement'  
    * User clicks 'Continue' button in 'Engagement Selected' modal 
    Then 'Engagement Summary' is 'visible' in 'left navigation' menu
    * User clicks 'ellipses' icon in 'selected engagement-dashboard'
    * 'Complete Engagement' icon in 'dashboard-ellipses' dropdown is not 'visible'
    * 'Complete Engagement' button at top right corner on 'selected engagement-dashboard' is not 'visible'
     
    Examples:
    | userType | fullname|
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|

