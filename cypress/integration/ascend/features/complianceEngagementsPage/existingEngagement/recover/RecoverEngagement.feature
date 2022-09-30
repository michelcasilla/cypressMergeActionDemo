Feature: User recovers an engagement that was removed in compliance engagement

@C7696 @C7699
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot recover an engagement that was removed in compliance engagement.@C7696 @C7699
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' ends
    * 'engagements' with 'Removed' status are not 'visible'

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

@C7689 @C7690 @C7692 @C7693 @C7694 
Scenario: Align Admin Test user in A-SCEND Demo client recovers an engagement that was removed in compliance engagement.@C7689 @C7690 @C7692 @C7693 @C7694 
    Given User 'i1' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    * User targets random 'Engagement Name' with 'Removed' status
    * Test remembers 'Engagement Name' value as 'Remembered Engagement string'
    * Test value 'Remembered Engagement string' equals 'Engagement Name' value
    When User clicks 'Status dropdown' icon on 'Remembered Engagement string'
    * User clicks on any status: ['In Progress', 'Pending', 'Published', 'Report Creation'] button in 'Status dropdown' menu
    Then User clicks 'Cancel, Go Back' button in 'Are you sure you want to recover this engagement?' modal
    When User clicks 'Status dropdown' icon on 'Remembered Engagement string'
    * User clicks on any status: ['In Progress', 'Pending', 'Published', 'Report Creation'] button in 'Status dropdown' menu
    * Test remembers 'status' value as 'status string'
    * Test value 'status string' equals 'status' value
    Then User clicks 'Yes, Recover Engagement' button in 'Are you sure you want to recover this engagement?' modal
    * 'Remembered Engagement string' status equals 'status'
    # the remembered engagaments status is now equal to the selected remembered status in like 35
    * Test condition 'recover-engagament' ends

