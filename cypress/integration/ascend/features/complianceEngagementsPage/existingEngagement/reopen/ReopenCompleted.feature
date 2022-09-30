Feature: User reopens a completed engagement 

@C7581 @C7582 @C7583 @C7584 @C7587 @C7588 @C7589 @C7590 @C7591 @C7592 @C7593 @C7594 @C7595
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot reopen a completed engagement.@C7581 @C7582 @C7583 @C7584 @C7587 @C7588 @C7589 @C7590 @C7591 @C7592 @C7593 @C7594 @C7595
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    * 'Status dropdown' icon is not 'visible' on 'completed engagement'

Examples:
| userType | fullname |
| e1       | Company Admin Test|
| e2       | Engagement Admin Test|
| e3       | Security Coordinator Test|
| e4       | Security Analyst 2 Test| 
| e5       | Security Analyst 1 Test|
| i4       | Consultant Pentester Test |

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client reopens a completed engagement 
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    * User targets random 'Engagement Name' with 'Completed' status
    * Test remembers 'Engagement Name' value as 'Remembered Engagement string'
    * Test value 'Remembered Engagement string' equals 'Engagement Name' value
    When User clicks 'Status dropdown' icon on 'Remembered Engagement'
    * User clicks on any status: ['In Progress', 'Pending', 'Published', 'Report Creation'] button in 'Status dropdown' menu
    Then User clicks 'Cancel, Go Back' button in 'Are you sure you want to change the engagement status?' modal
    When User clicks 'Status dropdown' icon on 'Remembered Engagement'
    Then User clicks on any status: ['In Progress', 'Pending', 'Published', 'Report Creation'] button in 'Status dropdown' menu
    * Test remembers 'status' value as 'status string'
    * Test value 'status string' equals 'status' value
    * User clicks 'Yes, Reopen Engagement' button in 'Are you sure you want to change the engagement status?' modal
    * 'Remembered Engagement' value 'status string' equals new remembered 'status' value
    #the remembered engagament on the line above now has a new status and we want to validate the selected status was stored correctly

Examples:
| userType | fullname |
| i1       | Align Admin Test |
| i2       | Engagement Executive Test |
| i3       | Manager Test |