Feature: User adds multiple locations for a pending compliance engagement

@C1030
Scenario Outline: '<tstid>''<userType>' '<fullname>' user in A-SCEND Demo Client cannot add multiple locations for a pending compliance engagement. @C1030
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

@C1030 @C1041
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo Client adds multiple locations for a pending compliance engagement. @C1030 @C1041
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
    # Fix-auto Test compares 'add-multiple-location-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks into 'Add Location' field
    * User types random 'new location string' in 'Add Location' field
    Then Test remembers 'Add Location' value as 'new location string'
    * Test value 'new location string' equals 'Add Location' value
    * User presses 'Enter' key
    When User clicks into 'Add Location' field
    * User types random 'new location string' in 'Add Location' field
    Then Test remembers 'Add Location' value as 'new location string'
    * Test value 'new location string' equals 'Add Location' value
    * User presses 'Enter' key
    When User clicks into 'Add Location' field
    * User types random 'new location string' in 'Add Location' field
    Then Test remembers 'Add Location' value as 'new location string'
    * Test value 'new location string' equals 'Add Location' value
    * User presses 'Enter' key
    # Fix-auto Test compares 'saved-multiple-location-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks 'Save Location(s)' button
    # assert that all stored values 'new location string exist in the 'Saved Locations' values
    Then Test remembered values 'new location string' exist in 'Saved Locations' values
    * 'Next Step' button is 'clickable'
    * 'Back' button is 'clickable'
    * 'Save & Close' button is 'clickable'

Examples:
| userType | fullname |
| i1       | Align Admin Test |
| i2       | Engagement Executive Test |
| i3       | Manager Test |
| i4       | Consultant Pentester Test |