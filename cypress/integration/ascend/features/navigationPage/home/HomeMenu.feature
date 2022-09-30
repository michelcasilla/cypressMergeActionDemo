Feature: User views Home page navigation menu

@C5522 @C5524
Scenario Outline: '<userType>' '<fullnameuser>' user in A-SCEND Demo client views Home Page navigation options.@C5522 @C5524
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' ends
    Then User sees 7 menu options
    * User navigates to 'Home'
    * User navigates to 'Compliance Engagements'
    * User navigates to 'Readiness Assessments'
    * User navigates to 'Policies' feature
    * User navigates to 'Integrations' feature
    * User navigates to 'Monitoring' feature
    * User navigates to 'Users'
    But User cannot navigate to 'Accounts'
    # Fix-auto Then Test compares 'home-page-<userType>' screenshot to baseline with a threshold of 0.2

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    
@C5522 @C5524
Scenario Outline: '<userType>' '<fullnameuser>' user in A-SCEND Demo client views Home Page navigation options.@C5522 @C5524
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' ends
    Then User sees 5 menu options
    * User navigates to 'Home'
    * User navigates to 'Compliance Engagements'
    * User navigates to 'Readiness Assessments'
    * User navigates to 'Policies' feature
    * User navigates to 'Integrations' feature
    But User cannot navigate to 'Users'
    * User cannot navigate to 'Accounts'
    * User cannot navigate to 'Monitoring'
    # Fix-auto Then Test compares 'home-page-<userType>' screenshot to baseline with a threshold of 0.2

    Examples:
    | userType | fullname |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

@C5522 @C5524
Scenario: 'i1' 'Align Admin Test' user in A-SCEND Demo client views Home Page navigation options.@C5522 @C5524
    Given User 'i1' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' ends
    Then User sees 8 menu options
    * User navigates to 'Home'
    * User navigates to 'Compliance Engagements'
    * User navigates to 'Readiness Assessments'
    * User navigates to 'Policies' feature
    * User navigates to 'Integrations' feature
    * User navigates to 'Monitoring' feature
    * User navigates to 'Users'
    * User navigates to 'Accounts'
    # Fix-auto  * Test compares 'home-page-i1' screenshot to baseline with a threshold of 0.2

@C5522 @C5524
Scenario: 'i2' 'Engagement Executive Test' user in A-SCEND Demo client views Home Page navigation options.@C5522 @C5524
    Given User 'i2' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' ends
    Then User sees 7 menu options
    * User navigates to 'Home'
    * User navigates to 'Compliance Engagements'
    * User navigates to 'Readiness Assessments'
    * User navigates to 'Policies' feature
    * User navigates to 'Integrations' feature
    * User navigates to 'Users'
    * User navigates to 'Accounts'
    But User cannot navigate to 'Monitoring'
    # Fix-auto  * Test compares 'home-page-i2' screenshot to baseline with a threshold of 0.2
    
@C5522 @C5524
Scenario Outline: '<userType>' '<fullnameuser>' user in A-SCEND Demo client views Home Page navigation options. @C5522 @C5524
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' ends
    Then User sees 6 menu options
    * User navigates to 'Home'
    * User navigates to 'Compliance Engagements'
    * User navigates to 'Readiness Assessments'
    * User navigates to 'Policies' feature
    * User navigates to 'Integrations' feature
    * User navigates to 'Users'
    But User cannot navigate to 'Accounts'
    * User cannot navigate to 'Monitoring'
    # Fix-auto   * Test compares 'home-page-<userType>' screenshot to baseline with a threshold of 0.2

    Examples:
    | userType | fullname |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
