Feature: User clicks on Readiness Assessments from navigation menu and views list of readiness assessment engagements
# e1,e2, i1-i4 can view all assessments if assigned to the company-and I's must be assigned in assessment details in addition to the company
# i1, i2 can view all assessments

@C1414
Scenario Outline:  '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments landing page.@C1414
   Given User '<userType>' is logged in
   When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
   * User clicks the 'Demo Client' client from 'Client' dropdown
   * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
   * User navigates to 'Readiness Assessments'
   * Test condition 'A-SCEND-Demo-not-selected' else
   * User navigates to 'Readiness Assessments'
   Then Test condition 'A-SCEND-Demo-not-selected' ends
   * Test condition 'ra-exists' starts if at least '1' assessment is 'visible'
    # Fix-auto Test compares 'ra-landing-page-<userType>' screenshot to baseline with a threshold of 0.2 
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
   * Test condition 'ra-exists' else
   * At least '1' assessment is not 'visible'
   * Test condition 'ra-exists' ends
   
   Examples:
   | userType | fullname |
   | e1       | Company Admin Test |
   | e2       | Engagement Admin Test |
   | e3       | Security Coordinator Test |
   | e4       | Security Analyst 2 Test|
   | e5       | Security Analyst 1 Test|

@C1398 @C1411 @C1410 @C1413 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments landing Page.@C1398 @C1411 @C1410 @C1413 
   Given User '<userType>' is logged in
   When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
   * User clicks the 'Demo Client' client from 'Client' dropdown
   * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
   Then Test condition 'A-SCEND-Demo-not-selected' ends
   * User navigates to 'Readiness Assessments'
   * Test condition 'ra-exists' starts if at least '1' assessment is 'visible'
    # Fix-auto Test compares 'ra-landing-page-<userType>' screenshot to baseline with a threshold of 0.2       
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
   * Test condition 'ra-exists' else
   * At least '1' assessment is not 'visible'
   * Test condition 'ra-exists' ends 
        
   Examples:
   | userType | fullname |
   | i1       | Align Admin Test |
   | i2       | Engagement Executive Test |
   | i3       | Manager Test |
   | i4       | Consultant Pentester Test |
