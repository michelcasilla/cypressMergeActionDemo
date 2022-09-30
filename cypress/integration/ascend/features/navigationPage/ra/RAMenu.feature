
Feature: User navigates to a Readiness Assessments engagement and views navigation menu options

@C1954
Scenario Outline: <userType> user in A-SCEND Demo Client can access the Readiness Assessments page options.@C1954
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * User navigates to 'Readiness Assessment'
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Readiness Assessment'
    * Test condition 'A-SCEND-Demo-not-selected' ends
    * User selects Readiness Assessment engagement
    * User clicks 'Continue' in the 'Engagement Selected' modal
    Then 'Account Questions' icon is 'clickable'
    * 'Client Name' dropdown is 'clickable'
    * 'Profile' dropdown is 'clickable'
    * 'Home' is 'clickable' on the Navigation menu
    * 'Dashboard' is 'clickable' on the Navigation menu
    * 'Assessment Reports' is 'clickable' on the Navigation menu
    * 'Users' is 'clickable' on the Navigation menu
    * 'Generate Report' button is 'clickable'
    # Fix-auto Test compares 'readiness-assessment-page-<userType>' screenshot to baseline with a threshold of 0.2

    Examples:
    | userType | fullname                   |
    | e1       | Company Admin Test         |
    | e2       | Engagement Admin Test      |
    | e3       | Security Coordinator Test  |
    | e4       | Security Analyst 2 Test    |
    | e5       | Security Analyst 1 Test    |
    | i1       | Align Admin Test           |
    | i2       | Engagement Executive Test  |
    | i3       | Manager Test               |
    | i4       | Consultant Pentester Test  |

