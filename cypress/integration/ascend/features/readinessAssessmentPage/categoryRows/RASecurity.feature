Feature: Viewing Readiness Assessments Dashboard Security Options
# e1,e2, i1-i4 can view all assessments if assigned to the company-and I's must be assigned in assessment details in addition to the company
# i1, i2 can view all assessments

@C1930 @C1950 @C1952 
Scenario Outline:  '<userType>' '<fullname>' user in A-SCEND Demo views Readiness Assessments Dashboard Security (if 'security-selected' and 'assigned-to-client'). @C1930 @C1950 @C1952 
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Readiness Assessment'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks the 'Select' button on a readiness assessment engagement
    * User clicks 'Continue' in the 'Engagement Selected' modal
    * Test condition 'security-visible' starts if 'security-selected' and 'assigned-to-client'
    * 'Security' row is 'visible'
    * Test condition 'security-visible' else
    Then 'Security' row is not 'visible'
    * Test condition 'security-visible' ends
    When 'Security' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
    * Test condition 'assigned-person-clickable' starts if 'security-selected'
    * 'Assigned person' icon is 'clickable'
    * Test condition 'assigned-person-clickable' else
    Then 'Assigned person' icon is not 'visible'
    * Test condition 'assigned-person-clickable' ends
    When Test condition 'assignee-caret-dropdown-clickable' starts if 'security-selected'
    * 'Assignee caret' dropdown is 'clickable'
    * Test condition 'assignee-caret-dropdown-visible' else
    Then 'Assignee caret' dropdown is not 'visible'
    * Test condition 'Assignee caret' ends
    When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
    * 'Start' button is 'clickable'
    * Test condition 'start-clickable' else
    Then 'Start' button is 'disabled'
    * Test condition 'start-clickable' ends
    When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
    * 'Resume' button is 'clickable'
    * Test condition 'resume-clickable' else
    Then 'Resume' button is 'disabled'
    * Test condition 'resume-clickable' ends
    When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
    * 'Review' button is 'clickable'
    * Test condition 'review-clickable' else
    Then 'Review' button is not 'visible' 
    * Test condition 'review-clickable' ends
    # Fix-auto Test compares 'security-row-e1' screenshot to baseline with a threshold of 0.2

    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |

@C1930 @C1950 @C1952 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo views Readiness Assessments Dashboard Security (if 'security-selected' and 'assigned-to-category'). @C1930 @C1950 @C1952 
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Readiness Assessment'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks the 'Select' button on a readiness assessment engagement
    * User clicks 'Continue' in the 'Engagement Selected' modal
    * Test condition 'security-visible' starts if 'security-selected' and 'assigned-to-category'
    * 'Security' row is 'visible'
    * Test condition 'security-visible' else
    Then 'Security' row is not 'visible'
    * Test condition 'security-visible' ends
    When 'Security' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
    * Test condition 'assigned-person-clickable' starts if 'security-selected'
    * 'Assigned person' icon is 'clickable'
    * Test condition 'assigned-person-clickable' else
    Then 'Assigned person' icon is not 'visible'
    * Test condition 'assigned-person-clickable' ends
    When Test condition 'assignee-caret-dropdown-clickable' starts if 'security-selected'
    * 'Assignee caret' dropdown is 'clickable'
    * Test condition 'assignee-caret-dropdown-visible' else
    Then 'Assignee caret' dropdown is not 'visible'
    * Test condition 'Assignee caret' ends
    When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
    * 'Start' button is 'clickable'
    * Test condition 'start-clickable' else
    Then 'Start' button is 'disabled'
    * Test condition 'start-clickable' ends
    When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
    * 'Resume' button is 'clickable'
    * Test condition 'resume-clickable' else
    Then 'Resume' button is 'disabled'
    * Test condition 'resume-clickable' ends
    When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
    * 'Review' button is 'clickable'
    * Test condition 'review-clickable' else
    Then 'Review' button is not 'visible' 
    * Test condition 'review-clickable' ends
    # Fix-auto Test compares 'security-row-e3' screenshot to baseline with a threshold of 0.2

    Examples:
    | userType | fullname |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|

Scenario:  '<userType>' '<fullname>' user in A-SCEND Demo views Readiness Assessments Dashboard Security (if 'security-selected')
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Readiness Assessment'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks the 'Select' button on a readiness assessment engagement
    * User clicks 'Continue' in the 'Engagement Selected' modal
    * Test condition 'security-visible' starts if 'security-selected'
    * 'Security' row is 'visible'
    * Test condition 'security-visible' else
    Then 'Security' row is not 'visible'
    * Test condition 'security-visible' ends
    When 'Security' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
    * Test condition 'assigned-person-clickable' starts if 'security-selected'
    * 'Assigned person' icon is 'clickable'
    * Test condition 'assigned-person-clickable' else
    Then 'Assigned person' icon is not 'visible'
    * Test condition 'assigned-person-clickable' ends
    When Test condition 'assignee-caret-dropdown-clickable' starts if 'security-selected'
    * 'Assignee caret' dropdown is 'clickable'
    * Test condition 'assignee-caret-dropdown-visible' else
    Then 'Assignee caret' dropdown is not 'visible'
    * Test condition 'Assignee caret' ends
    When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
    * 'Start' button is 'clickable'
    * Test condition 'start-clickable' else
    Then 'Start' button is 'disabled'
    * Test condition 'start-clickable' ends
    When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
    * 'Resume' button is 'clickable'
    * Test condition 'resume-clickable' else
    Then 'Resume' button is 'disabled'
    * Test condition 'resume-clickable' ends
    When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
    * 'Review' button is 'clickable'
    * Test condition 'review-clickable' else
    Then 'Review' button is not 'visible' 
    * Test condition 'review-clickable' ends
    # Fix-auto Test compares 'security-row-i1' screenshot to baseline with a threshold of 0.2

    Examples:
        | userType | fullname |
        | i1       | Align Admin Test |
        | i2       | Engagement Executive Test |

@C1930 @C1950 @C1952 
Scenario: '<userType>' '<fullname>' user in A-SCEND Demo views Readiness Assessments Dashboard Security (if 'security-selected' and 'assigned-to-category'). @C1930 @C1950 @C1952 
    Given User '<userType>' is logged in
    When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
    * User clicks the 'Demo Client' client from 'Client' dropdown
    * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
    * Test condition 'A-SCEND-Demo-not-selected' else
    * User navigates to 'Readiness Assessment'
    Then Test condition 'A-SCEND-Demo-not-selected' ends
    When User clicks the 'Select' button on a readiness assessment engagement
    * User clicks 'Continue' in the 'Engagement Selected' modal
    * Test condition 'security-visible' starts if 'security-selected' and 'assigned-to-category'
    * 'Security' row is 'visible'
    * Test condition 'security-visible' else
    Then 'Security' row is not 'visible'
    * Test condition 'security-visible' ends
    When 'Security' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
    * 'Security' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
    * Test condition 'assigned-person-clickable' starts if 'security-selected'
    * 'Assigned person' icon is 'clickable'
    * Test condition 'assigned-person-clickable' else
    Then 'Assigned person' icon is not 'visible'
    * Test condition 'assigned-person-clickable' ends
    When Test condition 'assignee-caret-dropdown-clickable' starts if 'security-selected'
    * 'Assignee caret' dropdown is 'clickable'
    * Test condition 'assignee-caret-dropdown-visible' else
    Then 'Assignee caret' dropdown is not 'visible'
    * Test condition 'Assignee caret' ends
    When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
    * 'Start' button is 'clickable'
    * Test condition 'start-clickable' else
    Then 'Start' button is 'disabled'
    * Test condition 'start-clickable' ends
    When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
    * 'Resume' button is 'clickable'
    * Test condition 'resume-clickable' else
    Then 'Resume' button is 'disabled'
    * Test condition 'resume-clickable' ends
    When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
    * 'Review' button is 'clickable'
    * Test condition 'review-clickable' else
    Then 'Review' button is not 'visible' 
    * Test condition 'review-clickable' ends
    # Fix-auto Test compares 'security-row-i3' screenshot to baseline with a threshold of 0.2

    Examples:
    | userType | fullname |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |
           
    