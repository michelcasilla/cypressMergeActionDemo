Feature: User views request card in request page in a completed engagement

@C7702 @C7703 @C7704 @C7705 @C7706 @C7707
Scenario Outline: '<userType>' '<fullname>' user views request card in request page in a completed engagement. @C7702 @C7703 @C7704 @C7705 @C7706 @C7707
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    * User clicks 'Select' button on random 'Engagement Name' with 'Completed' status
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User navigates to 'Requests'
    * User clicks on random "request card" with any status: ["Open", "In Progress", "Action Required"]
    # Fix-auto Test compares 'ce-request-card-view-<userType>' screenshot to baseline with a threshold of 0.2       
    Then 'Request Status' menu is 'disabled'
    * 'Unlink' button is 'disabled'
    * 'Delete' button is 'disabled'
    * 'Download' button is 'disabled'
    When Test condition 'download-disabled' starts when 'uploaded-file-checkmark-icon-is-clicked'
    * User clicks 'checkmark' icon in 'Uploaded Files'
    Then 'Download' button is 'clickable'
    When Test condition 'download-disabled' else
    * Test condition 'download-disabled' ends
    When User clicks 'X' icon in 'request card'
    * User clicks on 'Population' request card with 'Accepted' status
    # Fix-auto Test compares 'ce-population-accepted-request-card-view-<userType>' screenshot to baseline with a threshold of 0.2       
    Then 'Create New Sample' button is 'disabled'
    # Fix-auto Test compares 'ce-accepted-request-card-view-<userType>' screenshot to baseline with a threshold of 0.2       
    Then 'Other Engagement Evidence' button is not 'visible'
    * User clicks 'X' icon in 'request card'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|
        

