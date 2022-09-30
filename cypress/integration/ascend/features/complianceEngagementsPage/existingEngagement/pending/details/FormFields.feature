Feature: User manages details for pending compliance engagements

 @C1057 @C1077 @C1096 @C1103 @C1104
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot manage details for a pending compliance engagement. @C1057 @C1077 @C1096 @C1103 @C1104
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    Then User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' ends
    * 'Manage' button is not 'visible'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

@C1057 @C1077 @C1096 @C1103 @C1104
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client manages details for a pending compliance engagement. @C1057 @C1077 @C1096 @C1103 @C1104
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Manage' button on an engagement with a 'Pending' status
    * User clicks 'Continue' button on 'Engagement Selected' modal
    # Fix-auto Test compares 'ce-form-fields-<userType>' screenshot to baseline with a threshold of 0.2        
    Then 'Client' dropdown is not 'editable' 
    When User types random 'Short Name string' in 'Short Name' field 
    * Test remembers 'Short Name' value as 'Short Name string'
    Then Test value 'Short Name string' equals 'Short Name' value
    When User clicks random 'Engagement Contact email' in 'Engagement Contact' dropdown 
    * Test remembers 'Engagement Contact email' value as 'email'
    Then Test value 'Engagement Contact email' equals 'Engagement Contact' value
    When Test condition 'client-logo-exists' starts if 'existing client logo' is 'visible'
    * User clicks 'edit pencil icon'
    * User clicks on an 'Accepted File Type .png, .jpg, .jpeg' file
    * User uploads 'client-logo.png' file
    * Test condition 'client-logo-exists' else
    * User clicks 'Drag and drop here or browse to upload' hover text
    * User uploads 'client-logo.png' file
    Then Test condition 'client-logo-exists' ends
    When User clicks random 'Year string' in 'Year' dropdown 
    * Test remembers 'Year' dropdown value as 'Year string'
    Then Test value 'Year string' equals 'Year' value
    When User types random 'Engagement Name string' in 'Engagement Name' field 
    * Test remembers 'Engagement Name' value as 'Engagement Name string'
    Then Test value 'Engagement Name string' equals 'Engagement Name' value
    When User clicks 'Save & Close' button
    * User clicks 'Confirm' button in 'Close Engagement Creation' modal
    * User types remembered 'Engagement Name' value in 'Search Bar' field
    * User clicks 'Manage' button on 'Engagement Name' engagement
    * User clicks 'Continue' button on 'Engagement Selected' modal
    Then Test remembered value 'Short Name string' equals 'Short Name' value
    * Test remembered value 'Engagement Contact email' equals 'Engagement Contact' value
    * Test remembered value 'Year string' equals 'Year' value
    * Test remembered value 'Engagement Name string' equals 'Engagement Name' value

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
