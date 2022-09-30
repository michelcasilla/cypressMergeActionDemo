Feature: User edits details for published Readiness Assessment

Scenario: Company Admin Test user in A-SCEND Demo client cannot edit published Readiness Assessments
    Given User 'e1' is logged in
    When User clicks the 'Demo Client' client from 'Client' dropdown
    * User navigates to 'Readiness Assessment' page
    Then 'Manage' button is not 'visible'

@C1067 @C1093 @C1079 @C1104 @C1096 @C1077 @C1054 @C1051
Scenario: Align Admin Test user in A-SCEND Demo client edits details page for a published Readiness Assessment.@C1067 @C1093 @C1079 @C1104 @C1096 @C1077 @C1054 @C1051
    Given User 'i1' is logged in
    When User clicks the 'A-LIGN' client from 'Client' dropdown
    * User navigates to 'Readiness Assessment' page
    * User clicks 'Manage' button on an assessment with a 'Published' status
    Then User views 'Edit Assessment - Details' step
    * User types new 'Short Name' in field
    * User clicks in 'Assessment Contact' field
    * User selects new 'Assessment Contact'
    * User clicks 'Client Logo' 
    * User clicks 'Auditor Assisted' toggle 
    * User clicks 'Year dropdown' 
    * User selects new 'Year'
    * User types new 'Assessment Name'
    * User clicks 'X' icon
    * User views 'Exit Engagement Creation'
    * User clicks 'Cancel'
    * User clicks 'Save and Close'
    * User Verifies 'Edit Assessment - Details' changes are 'saved'






