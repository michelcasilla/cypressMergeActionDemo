Feature: User applies sort to Users page

@C1833
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client applies sort to Users page.@C1833

    Given User '<userType>' is logged in
    When Test registers 'usersList' interceptor
    *  Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Users'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Users'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    # Fix-auto  Test compares 'user-sort-<user>' screenshot to baseline with a threshold of 0.2
    # Any 'sortable' assertion should include validation that when user clicks the up arrow, down arrow, and back to original - then the ascending, descending and original order in the list should match each type of sort
    * 'User' column is 'sortable'
    * 'Email' column is 'sortable'
    * 'Role' column is 'sortable'
    * 'Title' column is 'sortable'
    * 'Status' column is 'sortable'
    * 'Created' column is 'sortable'
    * 'Last Login' column is 'sortable'
    When Test condition 'icons' starts if any: ['e1', 'i1', 'e2'] is logged in
    * 'Edit' icon is 'clickable'   
    * 'Recover' icon is 'clickable'
    * 'Delete' icon is 'clickable'
    * Test condition 'icons' else
    * 'Edit' icon is not 'visible'
    * 'Recover' icon is not 'visible'
    * 'Delete' icon is not 'visible'
    Then Test condition 'icons' ends

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot navigate to users page
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    Then User cannot view 'Users'
    When Test condition 'A-SCEND-Demo-not-selected' else
    Then User cannot view 'Users'
    * Test condition 'A-SCEND-Demo-not-selected' ends

    Examples:
    | userType | fullname |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|U