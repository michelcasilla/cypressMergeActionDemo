Feature: User views Readiness Assessments dashboard 

@C970
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client viewing Readiness Assessments dashboard.@C970
   Given User '<userType>' is logged in
   When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
   * User clicks the 'Demo Client' client from 'Client' dropdown
   * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
   * User navigates to 'Readiness Assessments' 
   * Test condition 'A-SCEND-Demo-not-selected' else
   * User navigates to 'Readiness Assessments' 
   Then Test condition 'A-SCEND-Demo-not-selected' ends
   * User clicks the 'Select' button on a readiness assessment engagement
   * User clicks 'Continue' in the 'Assessment Selected' modal
   Then 'Account Questions' icon is 'clickable'
   * 'Client Name' dropdown is 'clickable'
   * 'Profile' dropdown is 'clickable' 
   * 'Generate Report' button is 'clickable'
   When Test condition 'request-upgrade-visible' starts if 'auditor-assited-off'
   # 'auditor-assited-off' means that in RA details, the Auditor Assisted flag is toggled to 'Off'/is grayed out
   Then 'Request Assessment Upgrade' button is 'clickable'
   When Test condition 'request-upgrade-visible' else
   Then 'Request Assessment Upgrade' button is not 'visible'
   When Test condition 'Demo Client-not-selected' ends
   # Fix-auto Then Test compares 'ra-dashboard-<userType>' screenshot to baseline with a threshold of 0.2

   Examples:
   | userType | fullname |
   | e1       | Company Admin Test |
   | e2       | Engagement Admin Test |
   | e3       | Security Coordinator Test |
   | e4       | Security Analyst 2 Test|
   | e5       | Security Analyst 1 Test|

@C970
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client viewing Readiness Assessments dashboard.@C970
   Given User '<userType>' is logged in
   When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
   * User clicks the 'Demo Client' client from 'Client' dropdown
   * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
   * User navigates to 'Readiness Assessments' 
   * Test condition 'A-SCEND-Demo-not-selected' else
   * User navigates to 'Readiness Assessments' 
   Then Test condition 'A-SCEND-Demo-not-selected' ends
   When User clicks the 'Select' button on a readiness assessment engagement
   * User clicks 'Continue' in the 'Assessment Selected' modal
   * 'Account Questions' icon is 'clickable'
   * 'Client Name' dropdown is 'clickable'
   * 'Profile' dropdown is 'clickable' 
   * 'Generate Report' button is 'clickable'
   * 'Request Assessment Upgrade' button is not 'visible'
    # Fix-auto Test compares 'ra-dashboard-<userType>' screenshot to baseline with a threshold of 0.2

   Examples:
   | userType | fullname |
   | i1       | Align Admin Test|
   | i2       | Engagement Executive Test|
   | i3       | Manager Test|
   | i4       | Consultant Pentester Test|
