Feature: Viewing Readiness Assessments Dashboard Availability buttons
# e1,e2, i1-i4 can view all assessments if assigned to the company-and I's must be assigned in assessment details in addition to the company
# i1, i2 can view all assessments

@C1930 @C1950 @C1952 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Availability row (if 'availability-selected' and 'assigned-to-client'). @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessments'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'availability-visible' starts if 'availability-selected' and 'assigned-to-client'
        * 'Availability' row is 'visible'
        * Test condition 'availability-visible' else
        Then 'Availability' row is not 'visible'
         * Test condition 'availability-visible' ends
        When 'Availability' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * Test condition 'assigned-person-clickable' starts if 'availability-selected'
        # 'availability-selected' is an argument for 'assigned-person-clickable' condition...
        # if the Readiness Assessment family/categories details has 'Availability' selected then 'assigned person icon is clickable'
        * 'Assigned person' icon is 'clickable'
        * Test condition 'assigned-person-clickable' else
        Then 'Assigned person' icon is not 'visible'
        * Test condition 'assigned-person-clickable' ends
        When Test condition 'assignee-caret-dropdown-clickable' starts if 'availability-selected'
        # 'availability-selected' is an argument for 'assignee-caret-dropdown-visible' condition ...
        # if the Readiness Assessment family/categories details has 'Availability' selected then 'assignee caret dropdown is clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'assignee-caret-dropdown-visible' else
        Then 'Assignee caret' dropdown is not 'visible'
        * Test condition 'Assignee caret' ends
        When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
        # 'assigned-to-category' and 'no-questions-answered’ are arguments for 'start-clickable' condition...
        # if assessment has been assigned to the logged in user and no assessment questions have been answered then 'start is clickable'
        * 'Start' button is 'clickable'
        * Test condition 'start-clickable' else
        Then 'Start' button is 'disabled'
        * Test condition 'start-clickable' ends
        When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
        # 'assigned-to-category' and 'some-answered' are arguments for 'resume-clickable' condition ...
        # if assessment has been assigned to the logged in user and some assessment questions have been answered then 'resume is clickable'
        * 'Resume' button is 'clickable'
        * Test condition 'resume-clickable' else
        Then 'Resume' button is 'disabled'
        * Test condition 'resume-clickable' ends
        When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
         # 'assigned-to-category' and 'all-answered' are arguments for 'review-clickable' condition ...
        # if assessment has been assigned to the logged in user and all assessment questions have been answered then 'review is clickable'
        * 'Review' button is 'clickable'
        * Test condition 'review-clickable' else
        Then 'Review' button is not 'visible' 
        * Test condition 'review-clickable' ends
        # Fix-auto Test compares 'availability-row-<userType>' screenshot to baseline with a threshold of 0.2
        
         Examples:
        | userType | fullname |
        | e1       | Company Admin Test |
        | e2       | Engagement Admin Test |

@C1930 @C1950 @C1952 
Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Availability row (if 'availability-selected' and 'assigned-to-category'). @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        * User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'availability-visible' starts if 'availability-selected' and 'assigned-to-category'
        * 'Availability' row is 'visible'
        * Test condition 'availability-visible' else
        Then 'Availability' row is not 'visible'
         * Test condition 'availability-visible' ends
        When 'Availability' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * Test condition 'assigned-person-clickable' starts if 'availability-selected'
        * 'Assigned person' icon is 'clickable'
        * Test condition 'assigned-person-clickable' else
        Then 'Assigned person' icon is not 'visible'
        * Test condition 'assigned-person-clickable' ends
        When Test condition 'assignee-caret-dropdown-clickable' starts if 'availability-selected'
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
        # Fix-auto Test compares 'availability-row-<userType>' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | e3       | Security Coordinator Test |
        | e4       | Security Analyst 2 Test|
        | e5       | Security Analyst 1 Test|

Scenario Outline:  '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Availability row (if 'availability-selected')
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'availability-visible' starts if 'availability-selected'
        * 'Availability' row is 'visible'
        * Test condition 'availability-visible' else
        Then 'Availability' row is not 'visible'
         * Test condition 'availability-visible' ends
        When 'Availability' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * Test condition 'assigned-person-clickable' starts if 'availability-selected'
        * 'Assigned person' icon is 'clickable'
        * Test condition 'assigned-person-clickable' else
        Then 'Assigned person' icon is not 'visible'
        * Test condition 'assigned-person-clickable' ends
        When Test condition 'assignee-caret-dropdown-clickable' starts if 'availability-selected'
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
        # Fix-auto Test compares 'availability-row-<userType>' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | i1       | Align Admin Test |
        | i2       | Engagement Executive Test |

@C1930 @C1950 @C1952 
Scenario Outline:  '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Availability row (if 'availability-selected' and 'assigned-to-category'). @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'availability-visible' starts if 'availability-selected' and 'assigned-to-category'
        * 'Availability' row is 'visible'
        * Test condition 'availability-visible' else
        Then 'Availability' row is not 'visible'
         * Test condition 'availability-visible' ends
        When 'Availability' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Availability' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * Test condition 'assigned-person-clickable' starts if 'availability-selected'
        * 'Assigned person' icon is 'clickable'
        * Test condition 'assigned-person-clickable' else
        Then 'Assigned person' icon is not 'visible'
        * Test condition 'assigned-person-clickable' ends
        When Test condition 'assignee-caret-dropdown-clickable' starts if 'availability-selected'
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
        # Fix-auto Test compares 'availability-row-<userType>' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | i3       | Manager Test |
        | i4       | Consultant Pentester Test |
