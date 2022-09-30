Feature: User reviews a completed engagement on request page in table view and has limited ability to making edits to that engagement 

@C7709 @C7710 @C7711 @C7712 @C7713
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client is on table view and has limited ability to making edits to that engagement 
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Select' button on random 'Engagement Name' with 'Completed' status
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User navigates to 'Requests' 
    # Fix-auto Test compares 'ce-table-view-<userType>' screenshot to baseline with a threshold of 0.2       
    Then User hovers on 'Table view' icon
    * User clicks on 'Table view' icon
    * 'Assignee' column is 'disabled'
    * 'Status' dropdowns are 'disabled'
    * 'Collect All AEC Requests' icon is 'disabled'
    * 'Create Custom Request' button is 'disabled'
    * 'Mass Upload' button is 'disabled'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|    
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|