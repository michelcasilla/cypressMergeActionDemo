@UI
Feature: User creates a new compliance enagagement

Scenario Outline: '<userType>' '<fullname>' user cannot create new compliance enagagement
    Given User '<userType>' is logged in
    When User navigates to 'Homepage'
    Then User cannot select the 'A-LIGN' client in 'Client' dropdown
    # Fix-auto Test compares 'cannot-create-compliance-<userType>' screenshot to baseline with a threshold of 0.2
    
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|
    | i4       | Consultant Pentester Test |
@focus 
Scenario: '<userType>' '<fullname> user in A-LIGN client creates new compliance enagagement  
    Given User '<userType>' is logged in    
    When Test condition 'A-LIGN-not-selected' starts if 'A-LIGN' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'A-LIGN' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-LIGN-not-selected' else
    * User navigates to 'Compliance Engagements'
    * User clicks 'New Engagement' dropdown
    * User clicks 'Compliance'
    Then Test condition 'A-LIGN-not-selected' ends
    # Fix-auto Test compares 'create-engagement-details-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Demo Client' in 'Client' dropdown 
    * Test remembers 'Client' value as 'Client string'
    Then Test value 'Client string' equals 'Client' value
    When User types random 'Short Name string' in 'Short Name' field 
    * Test remembers 'Short Name' value as 'Short Name string'
    Then Test value 'Short Name string' equals 'Short Name' value
    When User selects random 'Engagement Contact email' in 'Engagement Contact' dropdown 
    * Test remembers 'Engagement Contact' value as 'Engagement Contact email'
    Then Test value 'Engagement Contact email' equals 'Engagement Contact' value
    When Test condition 'client-logo-exists' starts if 'existing client logo' is 'visible'
    * User clicks 'edit pencil icon'
    * User clicks on an 'Accepted File Type .png, .jpg, .jpeg' file
    * User uploads 'cient-logo.png' file
    * Test remembers 'Client Logo' value as 'Client Logo file'
    Then Test value 'Client Logo file' equals 'Client Logo' value
    When Test condition 'client-logo-exists' else
    * User clicks 'Drag and drop here or browse to upload' hover text
    * User uploads 'cient-logo.png' file
    * Test remembers 'Client Logo' value as 'Client Logo file'
    * Test value 'Client Logo file' equals 'Client Logo' value
    Then Test condition 'client-logo-exists' ends
    When User clicks random project in 'Add Project' dropdown 
    * Test remembers 'Add Project' value as 'Add Project string'
    Then Test value 'Add Project string' equals 'Add Project' value
    When User clicks random 'Year string' in 'Year' dropdown 
    * Test remembers 'Year' value as 'Year string'
    Then Test value 'Year string' equals 'Year' value
    When User types random 'Engagement Name string' in 'Engagement Name' field 
    * Test remembers 'Engagement Name' value as 'Engagement Name string'
    Then Test value 'Engagement Name string' equals 'Engagement Name' value
    When User clicks random 'Linked Prior Engagement string' in 'Linked Prior Engagement' dropdown 
    * Test remembers 'Linked Prior Engagement' value as 'Linked Prior Engagement string'
    Then Test value 'Linked Prior Engagement string' equals 'Linked Prior Engagement' value
    When User clicks random 'Version string' in 'Version' dropdown
    * Test remembers 'Version' value as 'Version string'
    Then Test value 'Version string' equals 'Version' value
    When User clicks random 'Categories string' in 'Categories' dropdown
    * Test remembers 'Categories' value as 'Categories string'
    Then Test remembered value 'Categories string' equals 'Categories' value
    When  User clicks random 'Executive string' in 'Executive' dropdown
    * Test remembers 'Executive' value as 'Executive string'
    Then Test value 'Executive string' equals 'Executive' value
    When User clicks random 'Practice Lead string' in 'Practice Lead' dropdown
    * Test remembers 'Practice Lead' value as 'Practice Lead string'
    Then Test value 'Practice Lead string' equals 'Practice Lead' value
    When User clicks random 'Manager string' in 'Manager' dropdown
    * Test remembers 'Manager' value as 'Manager string'
    Then Test value 'Manager string' equals 'Manager' value
    When User clicks random 'Consultant string' in 'Consultant' dropdown    
    * Test remembers 'Consultant' value as 'Consultant string'
    Then Test value 'Consultant string' equals 'Consultant' value
    When Test condition 'level-dropdown-exists' starts if  'Level' dropdown is 'visible'
    * User clicks random 'Level string'  in 'Level' dropdown
    * Test remembers 'Level' value as 'Level string'
    Then Test value 'Level string' equals 'Level' value
    When Test condition 'level-dropdown-exists'  else
    Then Test condition 'level-dropdown-exists' ends
    When Test condition 'cycle-dropdown-exists' starts if  'Cycle' dropdown is 'visible'
    * User clicks random 'Cycle string'  in 'Cycle' dropdown
    * Test remembers 'Cycle' value as 'Cycle string'
    Then Test value 'Cycle string' equals 'Cycle' value
    When Test condition 'cycle-dropdown-exists'  else
    Then Test condittion 'cycle-dropdown-exists' ends
    * Test compares 'details-step-fields-complete-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Next Step' button on 'Engagement Details' step
    * Test compares 'milestone-step-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks 'Next Step' button on 'Engagement Details - Milestones' step
    # Fix-auto Test compares 'locations-step-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks 'Next Step' button on 'Engagement Details - Location' step
     # Fix-auto Test compares 'periodic-rates-step-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks random 'Sample Period Start Date string' in 'Sample Period Start Date' calendar picker
    * Test remembers 'Sample Period Start Date' value as 'Sample Period Start Date string'
    Then Test value 'Sample Period Start Date string' equals 'Sample Period Start Date' value
    When User clicks random 'Sample Period End Date string' in 'Sample Period End Date' calendar picker
    * Test remembers 'Sample Period End Date' value as 'Sample Period End Date string'
    Then Test value 'Sample Period End Date string' equals 'Sample Period End Date' value
    When User clicks random 'Quarterly string' in 'Quarterly' dropdown 
    * Test remembers 'Quarterly' value as 'Quarterly string'
    Then Test value 'Quarterly string' equals 'Quarterly' value
    When User clicks random 'Monthly string' in 'Monthly' dropdown 
    * Test remembers 'Monthly' value as 'Monthly string'
    Then Test value 'Monthly string' equals 'Monthly' value
    When User clicks random 'Weekly' in 'Weekly' dropdown 
    * Test remembers 'Weekly' value as 'Weekly string'
    Then Test value 'Weekly string' equals 'Weekly' value
    When User clicks on random 'Daily dates' in 'Daily Calendar'
    * Test remembers 'Daily Calendar' values as 'Daily dates'
    Then Test value ''Daily dates' equals 'Daily Calendar' values
    * Test compares 'periodic-step-fields-complete-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Next Step' button on 'Engagement Details - Periodic Rates' step
     # Fix-auto Test compares 'services-step-<userType>' screenshot to baseline with a threshold of 0.2
    When Test condition 'open-multiple-services' starts if 'services-more-than-1'
    # 'open-multiple-services' means to iterate the following steps for each listed service if more than one service/project is listed
    # 'services-more-than-1' means if more than one service/project is listed in Services step
    Then User clicks 'Open' button
    * User clicks 'Confirm' on 'Open Service' modal
     # Fix-auto Test compares 'custrequests-substep-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Next Step' button on 'Custom Requests' substep
    * Test compares 'criteria-substep-<userType>' screenshot to baseline with a threshold of 0.2
    * User clicks 'Select all' checkbox
    * User clicks 'Assign Consultant' button
    * User clicks a random 'consultant' 
    * User clicks 'Add Consultants' button
    * 'Consultants have been updated' toast message is 'displayed'
    * User clicks 'Next Step' button on 'Criteria' substep
     # Fix-auto Test compares 'requests-substep-<userType>' screenshot to baseline with a threshold of 0.2
    When  User clicks 'Next Step' button on 'Requests' substep
    Then Test compares 'dates-substep-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Approve' button on 'Dates' substep
    * User clicks 'Confirm' on 'Confirm Approval' modal
     # Fix-auto Test compares 'services-step-<userType>' screenshot to baseline with a threshold of 0.2
    When User clicks 'Next Step' button on 'Service' step
    Then Test compares 'publish-step-<userType>' screenshot to baseline with a threshold of 0.2
    * 'Engagement Summary' dropdown is 'clickable'
    * Any 'Service project' dropdown is 'clickable'
    * User clicks 'Publish' button on 'Publish' step
    * Test remembered 'Engagement Name string' value as '{Engagement Name string} Engagement Published' snackbar 
    When User types remembered 'Engagement Name string' value in 'Search Bar' field
    * User clicks 'Manage' button on 'Engagement Name' engagement
    * User clicks 'Continue' button on 'Engagement Selected' modal
    Then Test remembered value 'Client string' equals 'Client' value
    * Test remembered value 'Short Name string' equals 'Short Name' value
    * Test remembered value 'Engagement Contact email' equals 'Engagement Contact' value
    * Test remembered value 'Client Logo file' equals 'Client Logo' value
    * Test remembered value 'Add Project string' equals 'Add Project' value
    * Test remembered value 'Year string' equals 'Year' value
    * Test remembered value 'Engagement Name string' equals 'Engagement Name' value
    * Test remembered value 'Linked Prior Engagement string' equals 'Linked Prior Engagement' value
    * Test remembered value 'Engagement Name string' equals 'Engagement Name' value
    * Test remembered value 'Version string' equals 'Version' value
    * Test remembered value 'Categories string' equals 'Categories' value
    * Test remembered value 'Executive string' equals 'Executive' value
    * Test remembered value 'Practice Lead string' equals 'Practice Lead' value
    * Test remembered value 'Manager string' equals 'Manager' value
    * Test remembered value 'Consultant string' equals 'Consultant' value
    * Test remembered value 'Level string' equals 'Level' value
    * Test remembered value 'Cycle string' equals 'Cycle' value
     # Fix-auto Test compares 'details-step-fields-complete-<userType>' screenshot to baseline with a threshold of 0.2
    * Test condition 'open-multiple-services' else    
    # Steps in the 'else' condition are same as 'if' condition but only run once   
    Then Test condition 'open-multiple-services' ends



    
    
    
   
    