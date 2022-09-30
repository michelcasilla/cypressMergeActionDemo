Feature: Viewing Readiness Assessments Dashboard Privacy buttons
# e1,e2, i1-i4 can view all assessments if assigned to the company-and I's must be assigned in assessment details in addition to the company
# i1, i2 can view all assessments

@C1930 @C1950 @C1952 
Scenario Outline:  '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Privacy row. @C1930 @C1950 @C1952 
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
        * Test condition 'privacy-visible' starts if 'privacy-selected' and 'assigned-to-client'
        # 'assigned-to-client' and privacy-selected' are arguments for 'privacy-visible' condition...
        # if the Readiness Assessment family/category details has 'Privacy' selected and logged in user is assigned to the client, then 'privacy is visible'
        * 'Privacy' row is 'visible'
        * 'Privacy' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'privacy-visible' else
        Then 'Privacy' row is not 'visible'
        * 'Privacy' row 'Answered With Gaps' button is not 'visible' 
        * 'Privacy' row 'Answered No Gaps' button is not 'visible' 
        * 'Privacy' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'privacy-visible' ends
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
        # Fix-auto Test compares privacy-row-<userType>' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | e1       | Company Admin Test |
        | e2       | Engagement Admin Test |

@C1930 @C1950 @C1952 
    Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Privacy row. @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'privacy-visible' starts if 'privacy-selected' and 'assigned-to-category'
        # 'assigned-to-category' and privacy-selected' are arguments for 'privacy-visible' condition...
        # if the Readiness Assessment family/category details has 'Privacy' selected and logged in user is assigned to the category (on the row in dashboard), then 'privacy is visible'
        * 'Privacy' row is 'visible'
        * 'Privacy' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'privacy-visible' else
        Then 'Privacy' row is not 'visible'
        * 'Privacy' row 'Answered With Gaps' button is not 'visible' 
        * 'Privacy' row 'Answered No Gaps' button is not 'visible' 
        * 'Privacy' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'privacy-visible' ends
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
        # Fix-auto Test compares privacy-row-<userType>' screenshot to baseline with a threshold of 0.2

        Examples:
        | userType | fullname |
        | e3       | Security Coordinator Test |
        | e4       | Security Analyst 2 Test|
        | e5       | Security Analyst 1 Test|

@C1930 @C1950 @C1952 
Scenario Outline:'<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Privacy row. @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'privacy-visible' starts if 'privacy-selected'
         # privacy-selected' is an argument for 'privacy-visible' condition...
        # if the Readiness Assessment family/category details has 'ConfidenPrivacytiality' selected, then 'privacy is visible'
        * 'Privacy' row is 'visible'
        * 'Privacy' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'privacy-visible' else
        Then 'Privacy' row is not 'visible'
        * 'Privacy' row 'Answered With Gaps' button is not 'visible' 
        * 'Privacy' row 'Answered No Gaps' button is not 'visible' 
        * 'Privacy' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'privacy-visible' ends
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
        # Fix-auto Test compares privacy-row-<userType>' screenshot to baseline with a threshold of 0.2

       Examples:
        | userType | fullname |
        | i1       | Align Admin Test |
        | i2       | Engagement Executive Test |

@C1930 @C1950 @C1952 
    Scenario Outline: '<userType>' '<fullname>' user in A-SCEND Demo client views Readiness Assessments Dashboard Privacy row. @C1930 @C1950 @C1952 
        Given User '<userType>' is logged in
        When Test condition 'A-SCEND-Demo-not-selected' starts if 'Demo Client' value is not 'displayed' in 'Client' dropdown
        * User clicks the 'Demo Client' client from 'Client' dropdown
        * User clicks 'View Client Home Page' button from the 'View Client Home Page' modal
        * Test condition 'A-SCEND-Demo-not-selected' else
        * User navigates to 'Readiness Assessment'
        Then Test condition 'A-SCEND-Demo-not-selected' ends
        When User clicks the 'Select' button on a readiness assessment engagement
        * User clicks 'Continue' in the 'Engagement Selected' modal
        * Test condition 'privacy-visible' starts if 'privacy-selected' and 'assigned-to-category'
        # 'assigned-to-category' and privacy-selected' are arguments for 'privacy-visible' condition...
        # if the Readiness Assessment family/category details has 'Privacy' selected and logged in user is assigned to the category (in the RA details), then 'privacy is visible'
        * 'Privacy' row is 'visible'
        * 'Privacy' row 'Answered With Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Answered No Gaps' button is 'clickable' if value is 'greater than' '0'
        * 'Privacy' row 'Skipped' button is 'clickable' if value is 'greater than' '0'
        * 'Assigned person' icon is 'clickable'
        * 'Assignee caret' dropdown is 'clickable'
        * Test condition 'privacy-visible' else
        Then 'Privacy' row is not 'visible'
        * 'Privacy' row 'Answered With Gaps' button is not 'visible' 
        * 'Privacy' row 'Answered No Gaps' button is not 'visible' 
        * 'Privacy' row 'Skipped' button is not 'visible' 
        * 'Assigned person' icon is not 'visible'
        * 'Assignee caret' dropdown is not 'visible'
        * Test condition 'privacy-visible' ends
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
        # Fix-auto Test compares privacy-row-<userType>' screenshot to baseline with a threshold of 0.2
       
        Examples:
        | userType | fullname |
        | i3       | Manager Test |
        | i4       | Consultant Pentester Test |