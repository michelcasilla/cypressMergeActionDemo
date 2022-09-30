Feature: User reviews a completed engagement in Custom Requests and has limited ability to making edits to that engagement

@C7716 @C7717 @C7718 @C7719
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot navigate to Custom Requests in a completed engagement. @C7716 @C7717 @C7718 @C7719
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
    Then User cannot navigate to 'Custom Requests'
    
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|

@C7716 @C7717 @C7718 @C7719
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo reviews a completed engagement in Custom Requests and has limited ability to making edits to that engagement. @C7716 @C7717 @C7718 @C7719
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
    * User navigates to 'Custom Requests' 
    # Fix-auto Test compares 'ce-custom-requests-<userType>' screenshot to baseline with a threshold of 0.2   
    * Test condition 'custom-requests-exist' starts if 'custom-requests-at-least-one'
    * 'Create Custom Request' button is 'disabled'
    * 'Mass Upload' button is 'disabled'
    * 'Save Custom Request' button is 'disabled'
    * 'add location' icon is 'disabled'
    * 'ellipses' icon is 'disabled'
    * Test condition 'custom-requests-exist' else
    * 'No Custom requests to display' image is 'visible'
    * 'Create Custom Request' button is 'disabled'
    * 'Mass Upload' button is 'disabled'
    Then Test condition 'custom-requests-exist' ends

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|