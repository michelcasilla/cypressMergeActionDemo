Feature: User manages milestones for pending compliance engagements

@C1011
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot manage milestones for a pending compliance engagement. @C1011
    Given User 'e1' is logged in
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

@C1011 @C1018
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client verifies milestones for a pending compliance engagement. @C1011 @C1018
    Given User 'i1' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements' 
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements' 
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    # before user actually clicks an engagement, they need to 'target' an engagement name to store
    When User targets random 'Selected Engagement Name' with 'Pending' status
    * Test remembers 'Selected Engagement Name' value as 'Selected Engagement Name string'
    * User clicks 'Manage' button on remembered 'Selected Engagement Name'
    Then Test value 'Selected Engagement Name string' equals 'Selected Engagement Name' value
    When User clicks 'Continue' button in 'Engagement Selected' modal
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks random 'Milestone toggle' icons in 'Milestone toggle' field 
    * Test remembers 'Milestone toggle' value as 'milestone toggle booleans'
    Then Test value 'milestone toggle booleans' equals 'Milestone toggle' value
    # Fix-auto Test compares 'milestones-toggle-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Save & Close' button
    * User clicks 'Confirm' button on 'Close Engagement Creation' modal
    * User clicks 'Select' button on remembered 'Selected Engagement Name'
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User is routed to 'Compliance Engagement - Dashboard'
    Then Test remembered 'Milestone toggle' values equals 'A-SCEND Milestones' value
    When User navigates to 'Home'
    * User navigates to 'Compliance Engagements'
    * User clicks 'Manage' button on remembered 'Selected Engagement Name'
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User clicks on 'Milestone' circle icon
    Then Test remembered 'milestone toggle booleans' value equals 'Milestone toggle' value

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|