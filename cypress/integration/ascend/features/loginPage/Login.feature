Feature: User logs in to A-SCEND

@C936 
Scenario Outline: I am logged in as a '<userType>' user.@C936 
    Given I am on the login page
    # Then Test compares 'login-page' screenshot to baseline with a threshold of 0.2
    When I login as a valid '<userType>' user
    Then I should be logged in as '<fullname>'
    # Fix-auto Test compares 'dashboard-page-<userType>' screenshot to baseline with a threshold of 0.2
        
    Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |

    @C937
    Scenario: Login to A-SCEND as an invalid user. @C937
        Given I am on the login page
        When I enter 'me@mail.com' as the username
        And I enter 'RandomPswd' as the password
        And I click on Continue CTA
        Then I should see an error message that says 'Invalid e-mail/password combination. Please try again.'
        # Fix-auto Test compares 'login-page-error' screenshot to baseline with a threshold of 0.2

        Examples:
    | userType | fullname |
    | e1       | Company Admin Test |
    | e2       | Engagement Admin Test |
    | e3       | Security Coordinator Test |
    | e4       | Security Analyst 2 Test|
    | e5       | Security Analyst 1 Test|
    | i1       | Align Admin Test |
    | i2       | Engagement Executive Test |
    | i3       | Manager Test |
    | i4       | Consultant Pentester Test |