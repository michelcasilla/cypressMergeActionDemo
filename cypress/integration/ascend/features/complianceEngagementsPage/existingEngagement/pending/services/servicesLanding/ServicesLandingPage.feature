Feature: User manages Services landing page of a pending compliance engagement 

Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot view Services landing page of a pending compliance engagement 
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

Scenario Outline: '<userType>' '<fullname>' user in A-LIGN client manages services in Services landing page
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Manage' button on an engagement with a 'Pending' status
    * User clicks 'Continue' in the 'Engagement Selected' modal
    Then Test condition 'engagement-contact-exists' starts if 'existing-engagement-contact' is 'visible'
    * User clicks 'Next Step' button in the 'Engagement Details' step
    When Test condition 'engagement-contact-exists' else       
    * User clicks 'Engagement Contact' dropdown
    * User clicks random 'Engagement Contact email' in 'Engagement Contact'
    Then User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'engagement-contact-exists' ends
    When User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    * User clicks 'Next Step' button in the 'Engagement Details - Locations' step
    * Test condition 'periodic-rates-complete' starts if 'periodic-rates-calander-flyout-dates-complete'
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    * Test condition 'periodic-rates-complete' else
    # 'periodic-rates-calander-flyout-dates-complete' means validate that start date, end date, quarter, month, week, daily fields all have at least one value
    * User clicks random 'date' in 'Sample Period Start Date' calendar picker
    * User clicks random 'date' in 'Sample Period End Date' calendar picker
    * User clicks random 'quarter' in 'Quarterly' dropdown 
    * User clicks random 'month' in 'Monthly' dropdown 
    * User clicks random 'week' in 'Weekly' dropdown 
    * User clicks random 'dates' in 'Daily Calendar' flyout
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    Then Test condition 'periodic-rates-complete' ends
    # Fix-auto Test compares 'services-landing-<userType>' screenshot to baseline with a threshold of 0.2
    When User hovers over 'Service filter' icon
    Then 'Service' icon is 'clickable' 
    When User hovers over 'Family/Version filter' icon
    Then 'Family/Version' icon is 'clickable' 
    When User hovers over 'Field Date filter' icon
    Then 'Field Date' icon is 'clickable' 
    When User hovers over 'Executive filter' icon
    Then 'Executive' icon is 'clickable' 
    When User hovers over 'Practice Lead filter' icon
    Then 'Practice Lead' icon is 'clickable' 
    When User hovers over 'Manager filter' icon
    Then 'Manager' icon is 'clickable' 
    When User hovers over 'Consultant filter' icon
    Then 'Consultant' icon is 'clickable' 
    When User hovers over 'Status filter' icon
    Then 'Status' icon is 'clickable' 
    #if more than one service listed, then iterate through all services for this next step
    * 'Open' button is 'clickable' on all 'services'

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|