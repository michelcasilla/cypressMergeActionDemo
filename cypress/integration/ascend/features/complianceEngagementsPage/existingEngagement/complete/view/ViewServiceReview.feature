Feature: User reviews a completed engagement in Service Review and has limited ability to making edits to that engagement

@C7714 @C7715
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot review a completed engagement on the Services Review page. @C7714 @C7715

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
    Then User cannot navigate to 'Service Review'
   
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|

@C7714 @C7715
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client reviews a completed engagement in Service Review and has limited ability to making edits to that engagement. @C7714 @C7715
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
    * User navigates to 'Service Review' 
    Then 'Status' dropdown for each request is 'disabled'
    * 'Action Required' icons in the 'Action Required' column are 'disabled'

    Examples:
    | userType | fullname|
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|

