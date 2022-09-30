Feature: User clicks on Compliance Engagements from navigation menu and views list of compliance engagements

@C2417
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo views Compliance Engagements landing page options. @C2417
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User navigates to 'Compliance Engagements'
    * Test condition 'ce-exists' starts if at least '1' engagement is 'visible'
    # Fix-auto Test compares 'ce-landing-page-<userType>' screenshot to baseline with a threshold of 0.2    
    * 'Account Questions' icon is 'clickable'
    * 'Client Name' dropdown is 'clickable'
    * 'Profile' dropdown is 'clickable' 
    * 'Search bar' is 'visible'
    * 'Search magnifier' icon is 'visible'
    * 'Client' column is 'sortable'
    * 'Engagement' column is 'sortable'
    * 'Engagement Type' column is 'sortable'
    * 'Created' column is 'sortable'
    * 'Status' column is 'sortable'
    * 'Select' button is 'clickable'
    * 'Manage' button is not 'visible'
    * Test condition 'ce-exists' else
    Then At least '1' engagement is not 'visible'
        
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

@C2417
Scenario Outline:  '<userType>''<fullname>' user in A-SCEND Demo views Compliance Engagements landing page options. @C2417 
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' ends
    Then User navigates to 'Compliance Engagements'
    When Test condition 'ce-exists' starts if at least '1' engagement is 'visible'
    # Fix-auto Test compares 'ce-landing-page-<userType>' screenshot to baseline with a threshold of 0.2    
    * 'Account Questions' icon is 'clickable'
    * 'Client Name' dropdown is 'clickable'
    * 'Profile' dropdown is 'clickable' 
    * 'Search bar' is 'visible'
    * 'Search magnifier' icon is 'visible'
    * 'Client' column is 'sortable'
    * 'Engagement' column is 'sortable'
    * 'Engagement Type' column is 'sortable'
    * 'Created' column is 'sortable'
    * 'Status' column is 'sortable'
    * 'Select' button is 'clickable'
    * 'Manage' button is 'clickable'
    * Test condition 'ce-exists' else
    Then At least '1' engagement is not 'visible'

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |