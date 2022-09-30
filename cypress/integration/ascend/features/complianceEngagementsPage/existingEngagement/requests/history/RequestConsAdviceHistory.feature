@C2203 @C2204 @C2205 @C2206 @C2207 @C2208 @C2209 @C2210

Feature: User adds consultant advice in request card of an engagement

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client can add consultant advice in request card of an engagement
    Given User '<UserType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Select' button on 'Engagement Name' with any: ['In Progress', 'Published', 'Removed', 'Report Creation' ]
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User navigates to 'Requests' page
    * User clicks on 'request card' 
    Then 'ellipsis' is not 'visible'

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test|
    | e2       | Engagement Admin Test|
    | e3       | Security Coordinator Test|
    | e4       | Security Analyst 2 Test| 
    | e5       | Security Analyst 1 Test|

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client can add consultant advice in request card of an engagement
    Given User '<UserType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Select' button on 'Engagement Name' with any: ['In Progress', 'Published', 'Removed', 'Report Creation' ] status
    * User clicks 'Continue' button in 'Engagement Selected' modal
    * User navigates to 'Requests' page
    * User clicks on 'request card' 
    * Test remembers 'request card id' value as 'request card id string'
    Then Test value 'request card id string' equals 'request card id' value
    * User clicks 'ellipsis' on 'request card'
    * User clicks 'Add Consultant Advice' button
    * Test condition 'add-advice' starts if 'consultant-advice-exists'
    # 'consultant-advice-exists' means if there is already a comment in the consultant advice text box
    When User types 'more advice' after existing text in 'Add Consultant Advice' field 
    * Test condition 'add-advice' else
    * User types 'new advice' in 'Add Consultant Advice' field 
    Then Test condition 'add-advice' ends
    * Test remembers 'Consultant Advice' value as 'Consultant Advice string'
    * Test value 'Consultant Advice string' equals 'Consultant Advice' value
    When User clicks 'Save' button
    * User clicks 'X' icon on the card
    * Test types remembered 'request card id string' in search bar
    * User clicks on the remembered 'request card'
    * User clicks 'History' tab in 'Activity' section
    * Test condition 'history-note' starts if 'consultant-advice-exists'
    * '(User name) Edited Consultant Advice: (added consultant advice)' is 'displayed'
    * Test condition 'history-note' else
    * '(User name) Added Consultant Advice: (added consultant advice)' is 'displayed'
    Then Test condition  'history-note' ends
    * Test remembered value 'Consultant Advice string' equals 'Consultant Advice' value
    # Fix-auto Test compares 'request-con-advice-<UserType>' screenshot to baseline with a threshold of 0.2       

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|
