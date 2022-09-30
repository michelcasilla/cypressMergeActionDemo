Feature: User changes status of a request card in an engagement with a pending status

@C2248
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client changes status of a request card in an engagement with a pending status.@C2248
    Given User '<UserType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Select' button on random 'Engagement Name' with 'pending' status
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User navigates to 'Requests' page
    # Fix-auto Test compares 'ce-evidence-upload-<UserType>' screenshot to baseline with a threshold of 0.2       
    * User clicks on 'request card' with 'In Progress' status
    * User clicks 'Request Status' button
    * User clicks 'Submitted' button in 'Request Status' dropdown
    * User clicks 'Confirm Submission' in 'Confirm Request Submission' modal
    * 'Request updated successfully' snackbar is 'displayed'
    * 'Request Status - Submitted' icon is now 'visible'
    * User clicks 'History' substep
    * '<user> changed status: In Progress to submitted' is 'visible'

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