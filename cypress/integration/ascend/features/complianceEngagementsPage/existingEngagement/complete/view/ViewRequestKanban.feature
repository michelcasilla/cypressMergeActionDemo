Feature: User reviews a completed engagement in request kanban view and has limited ability to making edits to that engagement 

@C7708
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client has limited ability when viewing a completed engagement in request kanban view. @C7708
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
    # Fix-auto Test compares 'ce-kanban-card-view-<userType>' screenshot to baseline with a threshold of 0.2       
    * User clicks 'Assignee' icon on a request card
    Then 'Assigned to' dropdown is 'disabled'
    * User clicks 'X' icon in 'request card'
    * User cannot 'click and drag' request card to another 'Status'
    * 'Collect All AEC Requests' icon is 'disabled'
        
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|

@C7708        
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client has limited ability when viewing a completed engagement in request kanban view. @C7708
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
    # Fix-auto Test compares 'ce-kanban-card-view-<userType>' screenshot to baseline with a threshold of 0.2       
    * User clicks 'Assignee' icon on a request card
    Then 'Assigned to' dropdown is 'disabled'
    * User clicks 'X' icon in 'request card'
    * User cannot 'click and drag' request card to another 'Status'
    * 'Collect All AEC Requests' icon is 'disabled'
    * 'Create Custom Request' button is 'disabled'
    * 'Mass Upload' button is 'disabled'
        
    Examples:
    | userType | fullname |
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|
        

