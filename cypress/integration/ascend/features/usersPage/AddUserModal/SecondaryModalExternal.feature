Feature: Users Post Email Entry Modal

@C1839 @C1843
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views secondary Add User modal after email entry
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * User navigates to 'Users'
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Users'
        * Test condition 'A-SCEND-Demo-not-selected' ends
        * User clicks 'Add User' button
        * User types an email address in 'Email' field
        * User clicks 'Continue' button
        # Fix-auto Test compares 'secondary-user-modal-e1' screenshot to baseline with a threshold of 0.2
        Then User views secondary 'Add User' modal
        * User clicks 'Role' dropdown
        * User clicks a 'role'
        * User types a 'First Name'
        * User types a 'Last Name'
        * User types a 'Title'
        * 'Back' is 'clickable'
        * 'Add User' is 'clickable'
        * User clicks 'Add User Modal' button
        * 'User Succesfully Added' is 'displayed'

        Examples:
        | userType | fullname |
        | e1       | Company Admin Test |
        | i1       | Align Admin Test |

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot view the Add Users button
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

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot navigate to the Users landing page
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