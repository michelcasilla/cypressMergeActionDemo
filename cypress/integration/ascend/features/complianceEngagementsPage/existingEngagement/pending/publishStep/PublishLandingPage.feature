@UI

Feature: User publishes compliance engagement with pending status

Scenario Outline: '<userType>' user in A-SCEND Demo client cannot publish engagement with a pending status
    Given User '<userType>' is logged in
    When User clicks the 'Demo Client' from 'Client' dropdown
    * User navigates to 'Compliance Engagements'
    Then 'Manage' button is not 'visible'
        
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|
    | i4       | Consultant Pentester Test|

Scenario: Align Admin Test user in A-SCEND Demo Client publishing pending compliance engagement
    Given User 'i1' is logged in
    When User clicks the 'Demo Client' from 'Client' dropdown
    * User navigates to 'Compliance Engagements' 
    Then User clicks 'Manage' button on an engagement with a 'Pending' status
    When Test condition 'engagement-contact-exists' starts if 'existing-engagement-contact' is 'visible'
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'engagement-contact-exists' else       
    Then User clicks 'Engagement Contact' dropdown
    When User clicks random 'Engagement Contact email' in 'Engagement Contact'
    * User clicks 'Next Step' button in the 'Engagement Details' step 
    Then User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'engagement-contact-exists' ends
    When User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    * User clicks 'Next Step' button in the 'Engagement Details - Locations' step
    * Test condition 'periodic-rates-complete' starts if 'periodic-rates-calander-flyout-dates-complete'
    # 'periodic-rates-calander-flyout-dates-complete' means validate that start date, end date, quarter, month, week, daily fields all have at least one value
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    Then Test condition 'periodic-rates-complete' else
    When User clicks random 'date' in 'Sample Period Start Date' calendar picker
    * User clicks random 'date' in 'Sample Period End Date' calendar picker
    * User clicks random 'quarter' in 'Quarterly' dropdown 
    * User clicks random 'month' in 'Monthly' dropdown 
    * User clicks random 'week' in 'Weekly' dropdown 
    Then User clicks random 'dates' in 'Calendar' flyout
    * 'Save & Close' button is 'clickable'
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    * Test condition 'periodic-rates-complete' ends
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    When Test condition 'services-reviewed' starts if 'service-service project-is-reviewed' 
    #'service-service project-is-reviewed' means that every service/service project listed is in 'Reviewed' status
    * User clicks 'Next Step' button in the 'Engagement Details - Services' step
    Then Test condition 'service-service project-is-reviewed' else
    * User clicks 'Open' button on 'Engagement Details - Services' step
    * User clicks 'Confirm' button on 'Open Service' modal
    * User clicks 'Next Step' button on 'Custom Requests' substep
    * User assigns a 'Consultant' to all criteria on 'Criteria' substep
    # Method must 'select-all' criteria and then click on Assign consultant button and assign a random consultant
    * User clicks 'Next Step' button on 'Criteria' substep
    * User clicks 'Next Step' button on 'Requests' substep
    * User clicks 'Approve' button on 'Dates' substep
    * User clicks 'Confirm' button on 'Confirm Approval' modal
    * User clicks 'Next Step' button in the 'Engagement Details - Services' step
    * Test condition 'periodic-rates-complete' ends
    # Fix-auto Test compares 'publish-landing-page-i1' screenshot to baseline with a threshold of 0.2
    * 'Engagement Summary' dropdown is clickable
    *  All 'service project' dropdowns are 'clickable'
    # Method must check if there is more than one 'service project' to validate, and iterate through all service projects listed
    * 'Milestones' column in all 'service project' dropdowns are 'clickable'
    * 'Criteria' column in all 'service project' dropdowns are 'clickable'
    * 'N/A Criteria' column in all 'service project' dropdowns are 'clickable'
    * 'N/A Request' column in all 'service project' dropdowns are 'clickable'
    * User clicks 'Publish' button
    * User clicks 'Confirm' in 'Confirm Publish' modal
    * '{new engagement name} Engagement Published' snackbar is 'displayed'

Scenario: Engagement Executive Test user in A-SCEND Demo Client publishing pending compliance engagement
    Given User 'i2' is logged in
    When User clicks the 'Demo Client' from 'Client' dropdown
    * User navigates to 'Compliance Engagements' 
    Then User clicks 'Manage' button on an engagement with a 'Pending' status
    When Test condition 'engagement-contact-exists' starts if 'existing-engagement-contact' is 'visible'
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'engagement-contact-exists' else       
    Then User clicks 'Engagement Contact' dropdown
    When User clicks random 'Engagement Contact email' in 'Engagement Contact'
    * User clicks 'Next Step' button in the 'Engagement Details' step 
    Then User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'engagement-contact-exists' ends
    When User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    * User clicks 'Next Step' button in the 'Engagement Details - Locations' step
    * Test condition 'periodic-rates-complete' starts if 'periodic-rates-calander-flyout-dates-complete'
    # 'periodic-rates-calander-flyout-dates-complete' means validate that start date, end date, quarter, month, week, daily fields all have at least one value
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    Then Test condition 'periodic-rates-complete' else
    When User clicks random 'date' in 'Sample Period Start Date' calendar picker
    * User clicks random 'date' in 'Sample Period End Date' calendar picker
    * User clicks random 'quarter' in 'Quarterly' dropdown 
    * User clicks random 'month' in 'Monthly' dropdown 
    * User clicks random 'week' in 'Weekly' dropdown 
    Then User clicks random 'dates' in 'Calendar' flyout
    * 'Save & Close' button is 'clickable'
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    * Test condition 'periodic-rates-complete' ends
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    When Test condition 'services-reviewed' starts if 'service-service project-is-reviewed' 
    #'service-service project-is-reviewed' means that every service/service project listed is in 'Reviewed' status
    * User clicks 'Next Step' button in the 'Engagement Details - Services' step
    Then Test condition 'service-service project-is-reviewed' else
    * User clicks 'Open' button on 'Engagement Details - Services' step
    * User clicks 'Confirm' button on 'Open Service' modal
    * User clicks 'Next Step' button on 'Custom Requests' substep
    * User assigns a 'Consultant' to all criteria on 'Criteria' substep
    # Method must 'select-all' criteria and then click on Assign consultant button and assign a random consultant
    * User clicks 'Next Step' button on 'Criteria' substep
    * User clicks 'Next Step' button on 'Requests' substep
    * User clicks 'Approve' button on 'Dates' substep
    * User clicks 'Confirm' button on 'Confirm Approval' modal
    * User clicks 'Next Step' button in the 'Engagement Details - Services' step
    * Test condition 'periodic-rates-complete' ends
    # Fix-auto Test compares 'publish-landing-page-i2' screenshot to baseline with a threshold of 0.2
    * 'Engagement Summary' dropdown is 'clickable'
    *  All 'service project' dropdowns are 'clickable'
    # Method must check if there is more than one 'service project' to validate, and iterate through all service projects listed
    * 'Milestones' column in all 'service project' dropdowns are 'clickable'
    * 'Criteria' column in all 'service project' dropdowns are 'clickable'
    * 'N/A Criteria' column in all 'service project' dropdowns are 'clickable'
    * 'N/A Request' column in all 'service project' dropdowns are 'clickable'
    * User clicks 'Publish' button
    * User clicks 'Confirm' in 'Confirm Publish' modal
    * '{new engagement name} Engagement Published' snackbar is 'displayed'

Scenario: Manager Test user in A-SCEND Demo Client publishing pending compliance engagement
    Given User 'i3' is logged in
    When User clicks the 'Demo Client' from 'Client' dropdown
    * User navigates to 'Compliance Engagements' 
    Then User clicks 'Manage' button on an engagement with a 'Pending' status
    When Test condition 'engagement-contact-exists' starts if 'existing-engagement-contact' is 'visible'
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'engagement-contact-exists' else       
    Then User clicks 'Engagement Contact' dropdown
    When User clicks random 'Engagement Contact email' in 'Engagement Contact'
    * User clicks 'Next Step' button in the 'Engagement Details' step 
    Then User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'engagement-contact-exists' ends
    When User clicks 'Next Step' button in the 'Engagement Details' step
    * User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    * User clicks 'Next Step' button in the 'Engagement Details - Locations' step
    * Test condition 'periodic-rates-complete' starts if 'periodic-rates-calander-flyout-dates-complete'
    # 'periodic-rates-calander-flyout-dates-complete' means validate that start date, end date, quarter, month, week, daily fields all have at least one value
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    Then Test condition 'periodic-rates-complete' else
    When User clicks random 'date' in 'Sample Period Start Date' calendar picker
    * User clicks random 'date' in 'Sample Period End Date' calendar picker
    * User clicks random 'quarter' in 'Quarterly' dropdown 
    * User clicks random 'month' in 'Monthly' dropdown 
    * User clicks random 'week' in 'Weekly' dropdown 
    Then User clicks random 'dates' in 'Calendar' flyout
    * 'Save & Close' button is 'clickable'
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    * Test condition 'periodic-rates-complete' ends
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    When Test condition 'services-reviewed' starts if 'service-service project-is-reviewed' 
    #'service-service project-is-reviewed' means that every service/service project listed is in 'Reviewed' status
    * User clicks 'Next Step' button in the 'Engagement Details - Services' step
    Then Test condition 'service-service project-is-reviewed' else
    * User clicks 'Open' button on 'Engagement Details - Services' step
    * User clicks 'Confirm' button on 'Open Service' modal
    * User clicks 'Next Step' button on 'Custom Requests' substep
    * User assigns a 'Consultant' to all criteria on 'Criteria' substep
    # Method must 'select-all' criteria and then click on Assign consultant button and assign a random consultant
    * User clicks 'Next Step' button on 'Criteria' substep
    * User clicks 'Next Step' button on 'Requests' substep
    * User clicks 'Approve' button on 'Dates' substep
    * User clicks 'Confirm' button on 'Confirm Approval' modal
    * User clicks 'Next Step' button in the 'Engagement Details - Services' step
    * Test condition 'periodic-rates-complete' ends
    # Fix-auto Test compares 'publish-landing-page-i3' screenshot to baseline with a threshold of 0.2
    * 'Engagement Summary' dropdown is 'clickable'
    *  All 'service project' dropdowns are 'clickable'
    # Method must check if there is more than one 'service project' to validate, and iterate through all service projects listed
    * 'Milestones' column in all 'service project' dropdowns are 'clickable'
    * 'Criteria' column in all 'service project' dropdowns are 'clickable'
    * 'N/A Criteria' column in all 'service project' dropdowns are 'clickable'
    * 'N/A Request' column in all 'service project' dropdowns are 'clickable'
    * User clicks 'Publish' button
    * User clicks 'Confirm' in 'Confirm Publish' modal
    * '{new engagement name} Engagement Published' snackbar is 'displayed'
