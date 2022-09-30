Feature: User removes a pending compliance engagement

@C7695
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot remove a pending compliance engagement @C7695
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown. 
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User targets random 'Engagement Name' with any status: ['In Progress', 'Pending', 'Published', 'Report Creation']
    * Test remembers 'Engagement Name' value as 'Remembered Engagement string'
    Then Test value 'Remembered Engagement string' equals 'Engagement Name' value
    When Test condition 'Status-dropdown-visible' starts if 'User clicks' status dropdown
    * User clicks 'Status dropdown' icon on 'Remembered Engagement'
    Then 'Removed' Button is not 'visible'
    * Test condition 'Status-dropdown-visible' else
    * Test condition 'Status-dropdown-visible' ends
    
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |

@C7682 @C7686 @C7687 @C7688
Scenario Outline: Align Admin Test user in A-SCEND Demo client removes a pending compliance engagement. @C7682 @C7686 @C7687 @C7688
    Given User 'i1' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User targets random 'Engagement Name' with any status: ['In Progress', 'Pending', 'Published', 'Report Creation']
    * Test remembers 'Engagement Name' value as 'Remembered Engagement string'
    Then Test value 'Remembered Engagement string' equals 'Engagement Name' value
    When Test condition 'Status-dropdown-visible' starts if 'User clicks' status dropdown
    * User clicks 'Status dropdown' icon on 'Remembered Engagement'
    * User clicks 'Removed' button in 'Status dropdown' menu
    * User clicks 'Cancel, Go Back' button in 'Are you sure you want to remove this engagement?' modal
    * User clicks 'Status dropdown' icon on 'Remembered Engagement'
    * User clicks 'Removed' button in 'Status dropdown' menu
    * User clicks 'Yes, Remove Engagement' button in 'Are you sure you want to remove this engagement?' modal
    * User clicks on 'Remembered Engagement' status 
    Then 'Remembered Engagement' status equals 'Removed'
    * Test condition 'Status-dropdown-visible' else
    * Test condition 'Status-dropdown-visible' ends
    
    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |