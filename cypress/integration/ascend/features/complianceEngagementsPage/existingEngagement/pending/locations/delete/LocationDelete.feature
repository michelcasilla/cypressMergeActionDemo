@UI

Feature: User deletes a location for pending compliance engagements
@C1045 @C1046
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot delete a location for pending compliance engagements. @C1045 @C1046
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

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client deletes a location for pending compliance engagements. @C1045 @C1046
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
    # Fix-auto Then Test compares 'pre-LocationDelete-<userType>' screenshot to baseline with a threshold of 0.2
    When Test condition 'multiple-locations-do-not-exist' starts if 'less-than-two-locations-exist'
     # less-than-two-locations-exist' means there must be at least 2 locations present for test to run.  When at least 2 exist, then else statement.
    * User types random 'new location string' in 'Add Location' field
    * User presses 'Enter' key
    * User clicks 'Save Location' button
    * Test condition 'multiple-locations-do-not-exist' else
    Then Test condition 'multiple-locations-do-not-exist' ends
    When User clicks 'ellipsis' on a random 'Saved Location'
    Then Test remembers 'Saved Location' as a 'Saved Locations string' values
    * Test value 'Saved Locations string' equals 'Saved Location' value
    When User clicks 'Delete' icon on the 'Saved Location' panel
    * Test remembers 'Saved Location' value as 'Deleted Location string'
     # 'Deleted Location string'represents the location to be deleted once 'Delete' in the modal is clicked
    Then test value 'Deleted Location string' equals 'Deleted Location' value
    * Test value 'Deleted Location' equals 'Saved Location' value in 'Confirm Delete Location' modal
    * User clicks 'Yes, Delete Location' button in 'Confirm Delete Location' modal
    * Test remembered value 'Deleted Location' does not exist in 'Saved Location' values
    * Test compares 'LocationDelete-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Next Step' button in 'Engagement Details - Locations'
    * User clicks 'Back' button in 'Engagement Details - Periodic Rates'
    Then Test remembered 'Deleted Location' value does not exist in 'Saved Location' values
    When User clicks 'ellipsis' on a random 'Saved Location'
    Then Test remembers 'Saved Location' as a 'Saved Locations string' value
    * Test value 'Saved Locations string' equals 'Saved Location' value
    When User clicks 'Delete' icon on the 'Saved Location' panel
    * Test remembers 'Saved Location' value as 'Deleted Location string'
    Then test value 'Deleted Location string' equals 'Deleted Location' value
    When User clicks 'X' icon in 'Confirm Delete Location' modal
    Then Test remembered 'Deleted Location string' value should exist in 'Saved Location' values
    When User clicks 'ellipsis' on a random 'Saved Location'
    Then Test remembers 'Saved Location' as a 'Saved Locations string' value
    * Test value 'Saved Locations string' equals 'Saved Location' value
    When User clicks 'Delete' icon on the 'Saved Location' panel
    * Test remembers 'Saved Location' value as 'Deleted Location string'
    Then test value 'Deleted Location string' equals 'Deleted Location' value
    When User clicks 'Cancel, Go Back' button in 'Confirm Delete Location' modal    
    Then Test remembered 'Deleted Location string' value should exist in 'Saved Location' values
    
    Examples:
        | userType | fullname |
        | i1       | Align Admin Test |
        | i2       | Engagement Executive Test |
        | i3       | Manager Test |
        | i4       | Consultant Pentester Test |