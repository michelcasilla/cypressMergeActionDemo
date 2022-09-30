Feature: User creates new readiness assessment

Scenario Outline: '<userType>' '<fullname>' user cannot create new readiness assessment
    Given User '<userType>' is logged in
    When User is on 'Homepage'
    Then User cannot click the 'A-LIGN' client from 'Client' dropdown
    
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|
    | i4       | Consultant Pentester Test |

@C1048 @C1050 @C1051 @C1076 @C1080 @C1088 @C1087 @C1089 @C1090 @C1093
Scenario Outline:  '<userType>' '<fullname>' user in A-LIGN client creates new readiness assessment.@C1048 @C1050 @C1051 @C1076 @C1080 @C1088 @C1087 @C1089 @C1090 @C1093
    Given User '<userType>' is logged in
    When Test condition 'A-LIGN-not-selected' starts if 'A-LIGN' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'A-LIGN' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Readiness Assessments'
    * Test condition 'A-LIGN-not-selected' else
    * User navigates to 'Readiness Assessments'
    * Test condition 'A-LIGN-not-selected' ends
    Then User clicks 'New Engagement' dropdown
    * User clicks 'Readiness Assessment' 
    When User clicks 'Demo Client' client in 'Client' dropdown
    * Test remembers 'Client' value as 'Client string'
    Then Test value 'Client string' equals 'Client' value
    When User types random 'Short Name string' in 'Short Name' field 
    * Test remembers 'Short Name' value as 'Short Name string'
    Then Test value 'Short Name string' equals 'Short Name' value
    * User clicks contact in 'Select Contact' dropdown
    * Test remembers 'Contact' value as 'Contact email'
    Then Test value 'Contact email' equals 'Contact' value
    When Test condition 'client-logo-exists' starts if 'existing client logo' is 'visible'
    * User clicks 'edit pencil' icon
    * Test condition 'client-logo-exists' else
    * User clicks 'Drag and drop here or browse to upload' hover text
    When Test condition 'client-logo-exists' ends
    * User uploads 'client-logo.png' file
    * Test remembers 'Client Logo' value as 'Client Logo file'
    Then Test value 'Client Logo file' equals 'Client Logo' value
    * User clicks 'Assessment' dropdown
    When User clicks random 'Assessment string' in 'Assessment' dropdown 
    * Test remembers 'Assessment' value as 'Assessment string'
    Then Test value 'Assessment string' equals 'Assessment' value
    When User clicks 'Auditor Assisted boolean' toggle to 'On'
     * Test remembers 'Auditor Assisted' value as 'Auditor Assisted boolean'
    Then Test value 'Auditor Assisted boolean' equals 'Auditor Assisted' value
    * User clicks random 'Year string' in 'Year' dropdown 
    * Test remembers 'Year' value as 'Year string'
    Then Test value 'Year string' equals 'Year' value
    When User types random 'Assessment Name string' in 'Assessment Name' field 
    * Test remembers 'Assessment Name' value as 'Assessment Name string'
    Then Test value 'Assessment Name string' equals 'Assessment Name' value
    * User clicks random 'Version string' in 'Version' dropdown
    * Test remembers 'Version' value as 'Version string'
    Then Test value 'Version string' equals 'Version' value
    When User clicks random 'Categories string' in 'Categories' dropdown
    * Test remembers 'Categories' value as 'Categories string'
    * Test remembered value 'Categories string' equals 'Categories' value
    When  User clicks random 'Executive' in 'Executive' dropdown
    * Test remembers 'Executive' value as 'Executive string'
    Then Test value 'Executive string' equals 'Executive' value
    When User clicks random 'Practice Lead' in 'Practice Lead' dropdown
    * Test remembers 'Practice Lead' value as 'Practice Lead string'
    Then Test value 'Practice Lead string' equals 'Practice Lead' value
    * User clicks random 'Manager' in 'Manager' dropdown
    * Test remembers 'Manager' value as 'Manager string'
    Then Test value 'Manager string' equals 'Manager' value
    * User clicks random 'Consultant' in 'Consultant' dropdown    
    * Test remembers 'Consultant' value as 'Consultant string'
    Then Test value 'Consultant string' equals 'Consultant' value
    # Fix-auto When Test compares 'new-ra-<userType>' screenshot to baseline with a threshold of .2
    * User clicks 'Publish' button on Assessment Details page
    * User clicks 'Publish' button on confirmation modal
    * User views 'Assessments landing page'
    * Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' ends
    * User navigates to 'Readiness Assessments'
    * User types remembered 'Assessment Name string' value in 'Search bar'
    * User clicks 'Manage' button on 'Assessment Name' engagement
    * User clicks 'Continue' button
    Then Test remembered value 'Client string' equals 'Client' value
    * Test remembered value 'Short Name string' equals 'Short Name' value
    * Test remembered value 'Contact email' equals 'Contact' value
    * Test remembered value 'Client Logo file' equals 'Client Logo' value
    * Test remembered value 'Assessment string' equals 'Assessment' value
    * Test remembered value 'Auditor Assisted boolean' equals 'Auditor Assisted' value
    * Test remembered value 'Year string' equals 'Year' value
    * Test remembered value 'Assessment Name string' equals 'Assessment Name' value
    * Test remembered value 'Version string' equals 'Version' value
    * Test remembered value 'Categories string' equals 'Categories' value
    * Test remembered value 'Executive string' equals 'Executive' value
    * Test remembered value 'Practice Lead string' equals 'Practice Lead' value
    * Test remembered value 'Manager string' equals 'Manager' value
    * Test remembered value 'Consultant string' equals 'Consultant' value

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test | 