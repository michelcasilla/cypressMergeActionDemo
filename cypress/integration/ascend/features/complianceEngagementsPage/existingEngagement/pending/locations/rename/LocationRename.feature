Feature: User renames a location for pending compliance engagements

@C1042
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot rename locations for pending compliance engagements. @C1042
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

@C1042
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client renames a location for pending compliance engagements. @C1042
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Manage' button on random 'Engagement Name'
    * User clicks 'Continue' button on 'Engagement Selected' modal
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    # Fix-auto Test compares 'pre-LocationRename-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks 'ellipsis' on a random 'Saved Location'
    * Test remembers 'Saved Location string' as a 'Saved Location' value
    * User clicks 'Rename' icon on 'Saved Location' panel
    * User types random 'Rename Location string' in 'Rename Location' field
    * Test remembers 'Rename Location' value as 'Rename Location string'
    Then test value 'Rename Location string' equals 'Rename Location' value
    * User clicks 'Save Location' button on 'Rename Location' modal
    * User clicks 'Next Step' button in 'Engagement Details - Locations'
    * User clicks 'Back' button in 'Engagement Details - Periodic Rates'
    * Test remembered value 'Rename Location string' exist in 'Saved Location' values
    * Test remembered value 'Saved Location string' does not exist in 'Saved Location' values
    When User clicks 'ellipsis' on a random 'Saved Location'
    * User clicks 'Rename' icon on 'Saved Location' panel
    * User types random 'Rename Location string' in 'Rename Location' field
    * Test remembers 'Rename Location' value as 'Rename Location string'
    * User clicks 'X' icon on 'Rename Location' modal
    Then Test remembered value 'Rename Location string' does not exist in 'Saved Location' values
    When User clicks 'ellipsis' on a random 'Saved Location'
    * User clicks 'Rename' icon on 'Saved Location' panel
    * User types random 'Rename Location string' in 'Rename Location' field
    * Test remembers 'Rename Location' value as 'Rename Location string'
    Then test value 'Rename Location string' equals 'Rename Location' value
    * User clicks 'Cancel' button on 'Rename Location' modal
    * Test remembered value 'Rename Location string' does not exist in 'Saved Location' values

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |