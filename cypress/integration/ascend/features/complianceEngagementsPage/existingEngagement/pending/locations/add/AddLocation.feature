Feature: User adds a location for a pending compliance engagement

@C1030 @C1039
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot add location for a pending compliance engagement. @C1029 @C1030 @C1039
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' ends
    Then 'Manage' button is not 'visible'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

@C1029 @C1030 @C1039
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client adds a location for a pending compliance engagement. @C1029 @C1030 @C1039
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Manage' button on an engagement with a 'Pending' status
    * User clicks 'Continue' button on 'Engagement Selected' modal
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    # Fix-auto Test compares 'add-location-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks into 'Add Location' field
    * User types random 'new location string' in 'Add Location' field
    * Test remembers 'Add Location' value as 'new location string'
    Then Test value 'new location string' equals 'Add Location' value
    # Fix-auto Test compares 'add-location-<userType>' screenshot to baseline with a threshold of 0.2
    When User presses 'Enter' key
    * User clicks 'Save Location(s)' button
    * User clicks 'Next Step' button
    * User clicks 'Back' button
    Then Test remembered value 'new location string' equals one of the 'Saved Locations' values

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |