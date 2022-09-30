Feature: User applies filter to Users page

@C1871 @C1873 @C1875 @C1877 @C1879 @C1881 @C1883
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client applies filter to Users page.@C1871 @C1873 @C1875 @C1877 @C1879 @C1881 @C1883
    Given User '<userType>' is logged in
    When Test registers 'usersList' interceptor
    * Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Users'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Users'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    Then User hovers on 'User filter' button
    * User clicks on 'User filter' button
    * User types text in 'User Search' field
    # Fix-auto  Test compares 'user-filter-e1' screenshot to baseline with a threshold of 0.2
    * 'User Search' is 'filterable'
    * User hovers on 'Email filter' button
    * User clicks on 'Email filter' button
    * User types text in 'Email Search' field
    # Fix-auto  Test compares 'email-filter-e1' screenshot to baseline with a threshold of 0.2
    * 'Email Search' is 'filterable'
    * User hovers on 'Title filter' button
    * User clicks on 'Title filter' button
    * User types text in 'Title Search' field
    # Fix-auto  Test compares 'title-filter-e1' screenshot to baseline with a threshold of 0.2
    * 'Title Search' is 'filterable'
    * User hovers on 'Status filter' button
    * User clicks on 'Status filter' button
    * User types text in 'Status Search' field
    # Fix-auto  Test compares 'status-filter-e1' screenshot to baseline with a threshold of 0.2
    * 'Status Search' is 'filterable'
    * User hovers on 'Created filter' button
    * User clicks on 'Created filter' button
    * User types text in 'Created Search' field
    # Fix-auto Test compares 'created-filter-e1' screenshot to baseline with a threshold of 0.2
    * 'Created Search' is 'filterable'
    * User hovers on 'Last Login filter' button
    * User clicks on 'Last Login filter' button
    * User types text in 'Last Login Search' field
    # Fix-auto Test compares 'last-login-filter-e1' screenshot to baseline with a threshold of 0.2
    * 'Last Login Search' is 'filterable'
    * 'Actions' column is not 'filterable'
    # Fix-auto  Test compares 'action-column-e1' screenshot to baseline with a threshold of 0.2

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