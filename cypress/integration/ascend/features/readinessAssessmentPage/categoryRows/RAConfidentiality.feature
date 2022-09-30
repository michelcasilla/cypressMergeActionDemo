Feature: Viewing Readiness Assessments Dashboard Confidentiality buttons
# e1,e2, i3-i4 can view all assessments if assigned to the company-and I's must be assigned in assessment details in addition to the company
# i1, i2 can view all assessments
@C1930 @C1950 @C1952 
    Scenario Outline:  '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Confidentiality row. @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        *  User navigates to 'Readiness Assessments'
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessments'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'confidentiality-visible' starts if 'confidentiality-selected' and 'assigned-to-client'
        # 'assigned-to-client' and 'confidentiality-selected' are arguments for 'confidentiality-visible' condition...
        # if the Readiness Assessment family/category details has 'Confidentiality' selected and logged in user is assigned to the client, then 'confidentiality is visible'
        * 'Confidentiality' row is 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'confidentiality-visible' else
        Then 'Confidentiality' row is not 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Answered No Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'confidentiality-visible' ends
        When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
        # 'assigned-to-category' and 'no-questions-answered’ are arguments for 'start-clickable' condition...
        # if  logged in user has been assigned to the assessment and no assessment questions have been answered then 'start is clickable'
        * 'Start' button is 'clickable'
        * Test condition 'start-clickable' else
        Then 'Start' button is 'disabled'
        * Test condition 'start-clickable' ends
        When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
        # 'assigned-to-category' and 'some-answered' are arguments for 'resume-clickable' condition ...
        # if  logged in user has been assigned to the assessment and some assessment questions have been answered then 'resume is clickable'
        * 'Resume' button is 'clickable'
        * Test condition 'resume-clickable' else
        Then 'Resume' button is not 'visible'
        * Test condition 'resume-clickable' ends
        When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
        # 'assigned-to-category' and 'all-answered' are arguments for 'review-clickable' condition ...
        # if  logged in user has been assigned to the assessment and all assessment questions have been answered then 'review is clickable'
        * 'Review' button is 'clickable'
        * Test condition 'review-clickable' else
        Then 'Review' button is not 'visible'
        * Test condition 'review-clickable' ends
        # Fix-auto Test compares 'confidentiality-row-<userType>' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | e1       | Company Admin Test |
        | e2       | Engagement Admin Test |

@C1930 @C1950 @C1952 
    Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Confidentiality row. @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'confidentiality-visible' starts if 'confidentiality-selected' and 'assigned-to-category'
        # 'assigned-to-category' and 'confidentiality-selected' are arguments for 'confidentiality-visible' condition...
        # if the Readiness Assessment family/category details has 'Confidentiality' selected and logged in user is assigned to the category (on the row in dashboard), then 'confidentiality is visible'
        * 'Confidentiality' row is 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'confidentiality-visible' else
        Then 'Confidentiality' row is not 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Answered No Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'confidentiality-visible' ends
        When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
        # 'assigned-to-category' and 'no-questions-answered’ are arguments for 'start-clickable' condition...
        # if  logged in user has been assigned to the assessment and no assessment questions have been answered then 'start is clickable'
        * 'Start' button is 'clickable'
        * Test condition 'start-clickable' else
        Then 'Start' button is 'disabled'
        * Test condition 'start-clickable' ends
        When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
        # 'assigned-to-category' and 'some-answered' are arguments for 'resume-clickable' condition ...
        # if  logged in user has been assigned to the assessment and some assessment questions have been answered then 'resume is clickable'
        * 'Resume' button is 'clickable'
        * Test condition 'resume-clickable' else
        Then 'Resume' button is 'disabled'
        * Test condition 'resume-clickable' ends
        When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
        # 'assigned-to-category' and 'all-answered' are arguments for 'review-clickable' condition ...
        # if  logged in user has been assigned to the assessment and all assessment questions have been answered then 'review is clickable'
        * 'Review' button is 'clickable'
        * Test condition 'review-clickable' else
        Then 'Review' button is 'disabled'
        * Test condition 'review-clickable' ends
        # Fix-auto Test compares 'confidentiality-row-<userType>' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | e3       | Security Coordinator Test |
        | e4       | Security Analyst 2 Test|
        | e5       | Security Analyst 1 Test|

@C1930 @C1950 @C1952 
Scenario Outline:'<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Confidentiality row. @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'confidentiality-visible' starts if 'confidentiality-selected'
         # 'confidentiality-selected' is an argument for 'confidentiality-visible' condition...
        # if the Readiness Assessment family/category details has 'Confidentiality' selected, then 'confidentiality is visible'
        * 'Confidentiality' row is 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'confidentiality-visible' else
        Then 'Confidentiality' row is not 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Answered No Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'confidentiality-visible' ends
        When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
        # 'assigned-to-category' and 'no-questions-answered’ are arguments for 'start-clickable' condition...
        # if  logged in user has been assigned to the assessment and no assessment questions have been answered then 'start is clickable'
        * 'Start' button is 'clickable'
        * Test condition 'start-clickable' else
        Then 'Start' button is 'disabled'
        * Test condition 'start-clickable' ends
        When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
        # 'assigned-to-category' and 'some-answered' are arguments for 'resume-clickable' condition ...
        # if  logged in user has been assigned to the assessment and some assessment questions have been answered then 'resume is clickable'
        * 'Resume' button is 'clickable'
        * Test condition 'resume-clickable' else
        Then 'Resume' button is 'disabled'
        * Test condition 'resume-clickable' ends
        When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
        # 'assigned-to-category' and 'all-answered' are arguments for 'review-clickable' condition ...
        # if  logged in user has been assigned to the assessment and all assessment questions have been answered then 'review is clickable'
        * 'Review' button is 'clickable'
        * Test condition 'review-clickable' else
        Then 'Review' button is 'disabled'
        * Test condition 'review-clickable' ends
        # Fix-auto Test compares 'confidentiality-row-<userType>' screenshot to baseline with a threshold of 0.2

       Examples:
        | userType | fullname |
        | i1       | Align Admin Test |
        | i2       | Engagement Executive Test |

@C1930 @C1950 @C1952 
    Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Confidentiality row. @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'confidentiality-visible' starts if 'confidentiality-selected' and 'assigned-to-category'
        # 'assigned-to-category' and 'confidentiality-selected' are arguments for 'confidentiality-visible' condition...
        # if the Readiness Assessment family/category details has 'Confidentiality' selected and logged in user is assigned to the category (in the RA details), then 'confidentiality is visible'
        * 'Confidentiality' row is 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Confidentiality' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'confidentiality-visible' else
        Then 'Confidentiality' row is not 'visible'
        * 'Confidentiality' row 'Answered With Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Answered No Gaps' button is not 'visible' 
        * 'Confidentiality' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'confidentiality-visible' ends
        When Test condition 'start-clickable' starts if 'assigned-to-category' and 'no-questions-answered'
        # 'assigned-to-category' and 'no-questions-answered’ are arguments for 'start-clickable' condition...
        # if  logged in user has been assigned to the assessment and no assessment questions have been answered then 'start is clickable'
        * 'Start' button is 'clickable'
        * Test condition 'start-clickable' else
        Then 'Start' button is 'disabled'
        * Test condition 'start-clickable' ends
        When Test condition 'resume-clickable' starts if 'assigned-to-category' and 'some-answered'
        # 'assigned-to-category' and 'some-answered' are arguments for 'resume-clickable' condition ...
        # if  logged in user has been assigned to the assessment and some assessment questions have been answered then 'resume is clickable'
        * 'Resume' button is 'clickable'
        * Test condition 'resume-clickable' else
        Then 'Resume' button is 'disabled'
        * Test condition 'resume-clickable' ends
        When Test condition 'review-clickable' starts if 'assigned-to-category' and 'all-answered'
        # 'assigned-to-category' and 'all-answered' are arguments for 'review-clickable' condition ...
        # if  logged in user has been assigned to the assessment and all assessment questions have been answered then 'review is clickable'
        * 'Review' button is 'clickable'
        * Test condition 'review-clickable' else
        Then 'Review' button is 'disabled'
        * Test condition 'review-clickable' ends
        # Fix-auto Test compares 'confidentiality-row-<userType>' screenshot to baseline with a threshold of 0.2
       
        Examples:
        | userType | fullname |
        | i3       | Manager Test |
        | i4       | Consultant Pentester Test |