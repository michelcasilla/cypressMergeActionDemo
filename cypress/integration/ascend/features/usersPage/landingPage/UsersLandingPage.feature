Feature: Users Landing Page options

@C1833
Scenario: Company Admin Test user in A-SCEND Demo views Users Landing Page options.@C1833
        Given User 'e1' is logged in
        When User clicks the 'Demo Client' client from 'Client' dropdown
        * User navigates to 'Users'
        Then 'Search bar' is 'visible'
        * 'Search magnifier' is 'visible'
        * 'Add User CTA' is 'clickable' 
        * 'Vertical ellipsis' is 'clickable' 
        * 'User' column is 'sortable'
        * 'Email' column is 'sortable' 
        * 'Role' column is 'sortable' 
        * 'Title' column is 'sortable' 
        * 'Status' column is 'sortable' 
        * 'Created' column is 'sortable' 
        * 'Last Login' column is 'sortable' 
        * 'Edit Action' is 'clickable' 
        * 'Restore Action' is 'clickable'
        # Fix-auto  Test compares 'user-landing-e1' screenshot to baseline with a threshold of 0.2

@C1833
Scenario: Engagement Admin Test user in A-SCEND Demo views Users Landing Page options.@C1833
        Given User 'e2' is logged in
        When User clicks the 'Demo Client' client from 'Client' dropdown
        * User navigates to 'Users'
        Then 'Search bar' is 'visible'
        * 'Search magnifier' is 'visible'
        * 'Vertical ellipsis' is 'clickable' 
        * 'User' column is 'sortable'
        * 'Email' column is 'sortable' 
        * 'Role' column is 'sortable' 
        * 'Title' column is 'sortable' 
        * 'Status' column is 'sortable' 
        * 'Created' column is 'sortable' 
        * 'Last Login' column is 'sortable' 
        * 'Edit Action' is 'clickable' 
        * 'Restore Action' is 'clickable'
        But 'Add User CTA' is not 'visible'
        # Fix-auto Then Test compares 'user-landing-e2' screenshot to baseline with a threshold of 0.2

@C1833
Scenario: Security Coordinator Test user in A-SCEND Demo does not view Users Landing Page options.@C1833
        Given User 'e3' is logged in
        When User clicks the 'Demo Client' client from 'Client' dropdown
        Then 'Users' is not 'visible'

@C1833
Scenario: Security Analyst 2 Test user in A-SCEND Demo does not view Users Landing Page options.@C1833
        Given User 'e4' is logged in
        When User clicks the 'Demo Client' client from 'Client' dropdown
        Then 'Users' is not 'visible' 

@C1833
Scenario: Security Analyst 1 Test user in A-SCEND Demo does not view Users Landing Page options.@C1833
        Given User 'e5' is logged in
        When User clicks the 'Demo Client' client from 'Client' dropdown
        Then 'Users' is not 'visible' 

@C1833
Scenario: Align Admin Test user in A-SCEND Demo views Users Landing Page options.@C1833
        Given User 'i1' is logged in
        When User clicks the 'A-LIGN' client from 'Client' dropdown
        * User navigates to 'Users'
        Then 'Search bar' is 'visible'
        * 'Search magnifier' is 'visible'
        * 'Add User CTA' is 'clickable' 
        * 'Vertical ellipsis' is 'clickable' 
        * 'User' column is 'sortable'
        * 'Email' column is 'sortable' 
        * 'Role' column is 'sortable' 
        * 'Title' column is 'sortable' 
        * 'Status' column is 'sortable' 
        * 'Created' column is 'sortable' 
        * 'Last Login' column is 'sortable' 
        * 'Edit Action' is 'clickable' 
        * 'Restore Action' is 'clickable'
        # Fix-auto  Test compares 'user-landing-i1' screenshot to baseline with a threshold of 0.2

@C1833
Scenario: Engagement Executive Test user in A-SCEND Demo views Users Landing Page options.@C1833
        Given User 'i2' is logged in
        When User clicks the 'A-LIGN' client from 'Client' dropdown
        * User navigates to 'Users'
        Then 'Search bar' is 'visible'
        * 'Search magnifier' is 'visible'
        * 'Vertical ellipsis' is 'clickable' 
        * 'User' column is 'sortable'
        * 'Email' column is 'sortable' 
        * 'Role' column is 'sortable' 
        * 'Title' column is 'sortable' 
        * 'Status' column is 'sortable' 
        * 'Created' column is 'sortable' 
        * 'Last Login' column is 'sortable' 
        But 'Edit Action' is not 'visible' 
        * 'Restore Action' is not 'visible' 
        * 'Add User CTA' is not 'visible'  
        # Fix-auto Then Test compares 'user-landing-i2' screenshot to baseline with a threshold of 0.2

@C1833
Scenario: Manager Test user in A-SCEND Demo views Users Landing Page options.@C1833
        Given User 'i3' is logged in
        When User clicks the 'A-LIGN' client from 'Client' dropdown
        * User navigates to 'Users'
        Then 'Search bar' is 'visible' 
        * 'Search magnifier' is 'visible'
        * 'Vertical ellipsis' is 'clickable' 
        * 'User' column is 'sortable'
        * 'Email' column is 'sortable' 
        * 'Role' column is 'sortable' 
        * 'Title' column is 'sortable' 
        * 'Status' column is 'sortable' 
        * 'Created' column is 'sortable' 
        * 'Last Login' column is 'sortable' 
        But 'Edit Action' is not 'visible' 
        * 'Restore Action' is not 'visible' 
        * 'Add User CTA' is not 'visible'
        # Fix-auto Then Test compares 'user-landing-i3' screenshot to baseline with a threshold of 0.2         

@C1833
Scenario: Consultant Pentester Test user in A-SCEND Demo views Users Landing Page options.@C1833
        Given User 'i4' is logged in
        When User clicks the 'A-LIGN' client from 'Client' dropdown
        * User navigates to 'Users'
        Then 'Search bar' is 'visible' 
        * 'Search magnifier' is 'visible'
        * 'Vertical ellipsis' is 'clickable' 
        * 'User' column is 'sortable'
        * 'Email' column is 'sortable' 
        * 'Role' column is 'sortable' 
        * 'Title' column is 'sortable' 
        * 'Status' column is 'sortable' 
        * 'Created' column is 'sortable' 
        * 'Last Login' column is 'sortable' 
        But 'Edit Action' is not 'visible' 
        * 'Restore Action' is not 'visible' 
        * 'Add User CTA' is not 'visible'
        # Fix-auto Then Test compares 'user-landing-i4' screenshot to baseline with a threshold of 0.2