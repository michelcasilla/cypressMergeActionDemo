Feature: User views Periodic Rates page when managing a pending compliance engagement

@C1429 @C1434 @C1442 @C1438
Scenario Outline: '<userType>' '<fullnameuser>' user in A-SCEND Demo client cannot manage periodic rates for a pending compliance engagement. @C1429 @C1434 @C1442 @C1438
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements' 
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements' 
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    * 'Manage' button is not 'visible'
        
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

@C1429 @C1434 @C1442 @C1438
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client manages periodic rates for a pending compliance engagement. @C1429 @C1434 @C1442 @C1438
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements' 
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements' 
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User targets random 'Selected Engagement Name' with 'Pending' status
    # before user actually clicks an engagement, they need to 'target' an engagement name to store
    * User clicks 'Manage' button on an engagement with a 'Pending' status
    * User clicks 'Continue' in 'Engagement Selected' modal
    * Test remembers 'Selected Engagement Name' value as 'Selected Engagement Name string'
    Then Test value 'Selected Engagement Name string' equals 'Selected Engagement Name' value
    When User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    * User clicks 'Next Step' button in the 'Engagement Details - Locations' step
    * User clicks random 'Sample Period Start Date string' in 'Sample Period Start Date' calendar picker
    * Test remembers 'Sample Period Start Date' value as 'Sample Period Start Date string'
    Then Test value 'Sample Period Start Date string' equals 'Sample Period Start Date' value
    When User clicks random 'Sample Period End Date string' in 'Sample Period End Date' calendar picker
    * Test remembers 'Sample Period End Date' value as 'Sample Period End Date string'
    Then Test value 'Sample Period End Date string' equals 'Sample Period End Date' value
    When User clicks random 'Quarterly string' in 'Quarterly' dropdown 
    * Test remembers 'Quarterly' value as 'Quarterly string'
    Then Test value 'Quarterly string' equals 'Quarterly' value
    When User clicks random 'Monthly string' in 'Monthly' dropdown 
    * Test remembers 'Monthly' value as 'Monthly string'
    Then Test value 'Monthly string' equals 'Monthly' value
    When User clicks random 'Weekly string' in 'Weekly' dropdown 
    * Test remembers 'Weekly' value as 'Weekly string'
    Then Test value 'Weekly string' equals 'Weekly' value
    When User clicks on random 'Calendar dates' in 'Calendar' flyout
    * Test remembers 'Calendar' values as 'Calendar dates'
    Then Test value 'Calendar dates' equals 'Calendar' values
    # Fix-auto Test compares 'periodic-rates-fields-complete-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Save & Close' button
    * User clicks 'Confirm' button on 'Close Engagement Creation' modal
    * User types remembered 'Selected Engagement Name' value in 'Search Bar' field
    * User clicks 'Manage' button on 'Selected Engagement Name' engagement
    * User clicks 'Continue' in 'Engagement Selected' modal
    * User clicks on 'Periodic Rates' circle icon
    Then Test remembered value 'Sample Period Start Date string' equals 'Sample Period Start Date' value
    * Test remembered value 'Sample Period End Date string' equals 'Sample Period End Date' value
    * Test remembered value 'Quarterly string' equals 'Quarterly' value
    * Test remembered value 'Monthly string' equals 'Monthly' value
    * Test remembered value 'Weekly string' equals 'Weekly' value
    * Test remembered value 'Calendar dates' equals 'Calendar' values

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |