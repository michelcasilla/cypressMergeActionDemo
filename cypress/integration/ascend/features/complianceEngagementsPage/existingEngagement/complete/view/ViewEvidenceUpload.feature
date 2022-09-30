Feature: User reviews a completed engagement on upload substep on evidence page and has limited ability to making edits to that engagement 

@C7720 @C7721 @C7722 @C7723 @C7724
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot navigate to upload substep in evidence page. @C7720 @C7721 @C7722 @C7723 @C7724
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
    Then User cannot navigate to 'Evidence' 
  
    Examples:
    | userType | fullname |
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|

@C7720 @C7721 @C7722 @C7723 @C7724
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client navigates to upload substep on evidence page and has limited ability to making edits to that engagement. @C7720 @C7721 @C7722 @C7723 @C7724
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
    * User navigates to 'Evidence' 
    * User navigates to 'Upload' route
    # Fix-auto Test compares 'ce-evidence-upload-<userType>' screenshot to baseline with a threshold of 0.2       
    Then 'Collect All AEC Requests' button is 'disabled'
    * 'Link' button is 'disabled'
    * 'Link-Unlink' icon is 'disabled'
    * 'Delete Evidence' icon on uploaded evidence table is 'disabled'
    # * 'Status' dropdown for request list is 'disabled'
    * 'Delete Evidence' icon on requests table is 'disabled'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|