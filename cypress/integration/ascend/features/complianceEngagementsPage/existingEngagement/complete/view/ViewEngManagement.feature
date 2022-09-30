Feature: User manages details for completed compliance engagement
    
@C7732 @C7733 @C7734 @C7735 @C7736 @C7737 @C7738 @C7739 @C7740 @C7741 @C7742 @C7743
 @C7744 @C7745 @C7746 @C7747  
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client cannot manage details for completed compliance engagement. @C7732 @C7733 @C7734 @C7735 @C7736 @C7737 @C7738 @C7739 @C7740 @C7741 @C7742 @C7743
 @C7744 @C7745 @C7746 @C7747 
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

@C7732 @C7733 @C7734 @C7735 @C7736 @C7737 @C7738 @C7739 @C7740 @C7741 @C7742 @C7743 @C7744 @C7745 @C7746 @C7747 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client manages details for completed compliance engagement. @C7732 @C7733 @C7734 @C7735 @C7736 @C7737 @C7738 @C7739 @C7740 @C7741 @C7742 @C7743 @C7744 @C7745 @C7746 @C7747 
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Compliance Engagements'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Compliance Engagements'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks 'Manage' button on random 'Engagement Name' with 'Completed' status
    * User clicks 'Continue' button in 'Engagement Selected' modal
    # Fix-auto Test compares 'ce-eng-management-<userType>' screenshot to baseline with a threshold of 0.2  
    Then 'Client' dropdown is 'disabled' 
    * 'Short Name' field is 'disabled'
    * 'Engagement Contact' field is 'disabled'
    * 'Client Logo' icon is not 'visible'
    * 'Add Custom Service' button is 'disabled'
    * '+ Add Project' button is 'disabled'
    * 'Year' dropdown is 'disabled' 
    * 'Engagement Name' field is 'disabled'
    * 'Linked Prior Engagement' dropdown is 'disabled' 
    * 'Version' dropdown is 'disabled'
    * 'Executives' dropdown is 'disabled'
    * 'Practice Leads' dropdown is 'disabled'
    * 'Managers' dropdown is 'disabled'
    * 'Consultants' dropdown is 'disabled'
    When Test condition 'project-dropdown' starts if 'project-flyout' has any: ['Level, Family or Cycle']
    # if below are present they are disabled, if not user just clicks continue
    * 'Level' dropdown is 'disabled'
    * 'Family' dropdown is 'disabled'
    * 'Cycle' dropdown is 'disabled'
    * User clicks 'Next Step' button in the 'Engagement Details' step
    * Test condition 'project-dropdown' else
    * User clicks 'Next Step' button in the 'Engagement Details' step
    Then Test condition 'project-dropdown' ends
    # Fix-auto Test compares 'ce-eng-management-milestones-<userType>' screenshot to baseline with a threshold of 0.2  
    Then 'toggle' icon is 'disabled'
    When User clicks 'Next Step' button in the 'Engagement Details - Milestones' step
    # Fix-auto Test compares 'ce-eng-management-locations-<userType>' screenshot to baseline with a threshold of 0.2  
    Then 'Add a Location' field is 'disabled'
    * 'Save Location(s)' button is 'disabled'
    * 'saved location(s)' icon is not 'visible'
    When User clicks 'Next Step' button in the 'Engagement Details - Locations' step
    # Fix-auto Test compares 'ce-eng-management-periodic-rates-<userType>' screenshot to baseline with a threshold of 0.2  
    Then 'Sample Period Start Date' dropdown is 'disabled'
    * 'Sample Period End Date' dropdown is 'disabled'
    * 'Quarterly' dropdown is 'disabled'
    * 'Monthly' dropdown is 'disabled'
    * 'Weekly' dropdown is 'disabled'
    * 'Daily Calendar' is 'disabled'
    # 'Daily Calendar' is the large calender flyout in the bottom of the page
    * User clicks 'Next Step' button in the 'Engagement Details - Periodic Rates' step
    # *** If more than one service exists, then test must 'loop-through-all' services
    * User clicks 'Open' button in 'service request'
    * User clicks 'Confirm' button in 'Open Service' modal
    When Test condition 'custom request' starts if 'custom request exists' 
    # 'custom request exists' mean that at least one custom request has been added to this completed engagement
    Then 'Create Custom Request' button is 'disabled' 
    * 'Mass Upload' button is 'disabled' 
    * 'Export Requests' is 'enabled'
    * 'Category' dropdown on all rows is 'disabled' 
    * 'Request Type' dropdown on all rows is 'disabled' 
    * 'Description' field on all rows is 'disabled' 
    * 'Criteria' dropdown on all rows is 'disabled' 
    * 'Due Date' dropdown on all rows is 'disabled' 
    * 'Location' dropdown on all rows is 'disabled' 
    * 'ellipsis' icon on all rows is 'disabled' 
    * 'Save Custom Request' button is 'disabled' 
    * User clicks 'Next Step' button in the 'Engagement Details - Services - Custom Requests' substep
    When Test condition 'custom request' else
    Then 'Roll Forward Custom Requests From Other Engagement' button is 'disabled'
    * 'Export Custom Requests From All Projects Being Rolled Forward' button is 'disabled'
    * 'Create Custom Requests' button is 'enabled'
    * 'Mass Upload' button is 'enabled'
    * User clicks 'Next Step' button in the 'Engagement Details - Services - Custom Requests' substep
    * Test condition 'custom request' ends
    # Fix-auto Test compares 'ce-eng-management-services-criteria-<userType>' screenshot to baseline with a threshold of 0.2  
    * 'Assign Consultant' button is 'disabled' 
    * 'Consultant(s)' icon in all rows is 'disabled' 
    * 'Applicable toggle' icon in all rows is 'disabled' 
    When User clicks 'Next Step' button in the 'Engagement Details - Services - Criteria' substep
    # Fix-auto Test compares 'ce-eng-management-services-requests-<userType>' screenshot to baseline with a threshold of 0.2  
    Then 'Manage Locations' button is 'disabled'
    * 'Toggle Selected' icon is 'disabled'
    * 'ellipsis' dropdown is 'enabled'
    * 'Auto-Assign Rolled Forward N/As' is 'enabled'
    * 'Auto-Assign Roll Forward Locations' is 'enabled'
    * 'Locations column pencil' icon in all rows is 'disabled'
    * 'Applicable toggle' icon in all rows is 'disabled'
    When User clicks 'Next Step' button in the 'Engagement Details - Services - Requests' substep
    # Fix-auto Test compares 'ce-eng-management-services-dates-<userType>' screenshot to baseline with a threshold of 0.2 
    Then 'Manage Dates' button is 'disabled'
    * 'Due Date column calendar' icon in all rows is 'disabled'
    * 'Due Date' field in all rows is 'disabled'
    * 'Approve' button is 'disabled'
    When User clicks 'Close' button in the 'Engagement Details - Services - Dates' substep
    # User must loop through all services listed on Services Landing page
    * User clicks 'Next Step' button in the 'Engagement Details - Services' step
    # Fix-auto Test compares 'ce-eng-management-publish-<userType>' screenshot to baseline with a threshold of 0.2  
    Then 'Publish' button is 'disabled'
    * 'Engagement Summary' dropdown is 'enabled'
    * All 'Service information' dropdowns are 'enabled'

    Examples:
    | userType | fullname |
    | i1       | Align Admin Test|
    | i2       | Engagement Executive Test|
    | i3       | Manager Test|
    | i4       | Consultant Pentester Test|
    
