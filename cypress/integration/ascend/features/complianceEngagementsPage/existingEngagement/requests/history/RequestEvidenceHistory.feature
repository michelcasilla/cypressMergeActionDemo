Feature: User makes edits to a request card in an engagement with a pending status

@C2212 @C2258 @C2269 @C2270 @C2271 @C2272 @C2273 @C2265 @C2265
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client navigates to the Requests page and clicks on a request card.@C2212 @C2258 @C2269 @C2270 @C2271 @C2272 @C2273 @C2265 @C2265
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
    * User clicks on 'request card' with any status: [ 'Open', 'In Progress', 'Action Required' ]
    * User clicks and drags file to 'Drag and drop evidence here' icon
    * Test remembers 'file name' value as 'file name string'
    Then Test value 'file name string' equals 'file name' value
    * '1 file uploaded' snackbar is 'displayed'
    When User clicks on 'remembered file name'
    * User clicks the 'trash can' icon
    * User clicks 'delete' button in the 'Confirm Delete' modal
    * 'Sucessfully Deleted Evidence' snackbar is 'displayed'
    * User clicks and drags file to 'Drag and drop evidence here' icon
    * Test remembers 'file name' value as 'file name string'
    Then Test value 'file name string' equals 'file name' value
    When User clicks 'unlink' icon on 'remembered file name'
    * User clicks 'Confirm' button in 'Unlink Files' modal
    * User clicks 'Upload Files' substep
    * User clicks 'Link evidence from this engagement' icon
    * User clicks 'checkmark box' icon on a 'File Name'
    * User clicks 'Link Evidence' button 
    Then 'Evidence linked successfully' snackbar is 'displayed'
    # Fix-auto Test compares 'ce-evidence-history-<UserType>' screenshot to baseline with a threshold of 0.2       
    * '<user> linked Evidence: {remembered file name}' is 'visible'
    * '<user> unlinked Evidence: {remembered file name}' is 'visible'
    * '<user> deleted Evidence: {remembered file name}' is 'visible'
    * '<user> uploaded Evidence: {remembered file name}' is 'visible'

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