Feature: User clicks on the Add User button from Users page for non-Align client

@C1837 @C1843
Scenario: '<userType>' '<fullname>' user in A-SCEND Demo client clicks on Add User button. @C1837 @C1843
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * User navigates to 'Users'
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Users'
        * Test condition 'A-SCEND-Demo-not-selected' ends
        * User clicks 'Add User' button
        Then 'Modal X' is 'clickable'
        * User types an email address in 'Email' field
        * 'Continue button' is 'clickable'
        # Fix-auto Test compares 'initial-user-modal-e1' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | e1       | Company Admin Test |
        | i1       | Align Admin Test |

@C1837 @C1843
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo cannot view the Add Users button. @C1837 @C1843
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * User navigates to 'Users'
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Users'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        But User cannot view 'Add User' button

        Examples:
        | userType | fullname |
        | e2       | Engagement Admin Test |
        | i2       | Engagement Executive Test |
        | i3       | Manager Test |
        | i4       | Consultant Pentester Test |

@C1837 @C1843
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo cannot navigate to the Users landing page. @C1837 @C1843
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
