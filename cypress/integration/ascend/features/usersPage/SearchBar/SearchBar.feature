Feature: Search Bar

@C1833
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views User Landing Page Search Bar.. @C1833

    Given User '<userType>' is logged in
    When Test registers 'usersList' interceptor
    * Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Users'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Users'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    * User views the 'Search Bar'
    Then the 'Search Bar' is 'clickable'
    * Search bar is 'filterable' when value is entered
    # Fix-auto Test compares 'user-search-e1' screenshot to baseline with a threshold of 0.2
    * Search bar 'X' is clicked
    * Search bar is cleared

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
    
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client does not view User Landing Page Search Bar
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    But User cannot view 'Users'
    * Test condition 'A-SCEND-Demo-not-selected' else
    But User cannot view 'Users'
    Then Test condition 'A-SCEND-Demo-not-selected' ends

    Examples:
    | userType | fullname |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|
