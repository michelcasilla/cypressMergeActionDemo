Feature: User reviews a completed engagement in assignments page and is not able to edit request assignments

@C7751 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot navigate to assignments in a completed engagement. @C7751 
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
    Then User cannot navigate to 'Assignments'

    Examples:
    | userType | fullname |
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|  

@C7751 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client reviews a completed engagement in assignments page and is not able to edit request assignments. @C7751 
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
    * User navigates to 'Assignments' 
    # Fix-auto Test compares 'ce-assignments-<userType>' screenshot to baseline with a threshold of 0.2       
    Then 'Assign' button is 'disabled'
    * 'Assignee' icon is 'disabled'
       
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|  
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|

