@BusinessServices
Feature: Business Services Page
  As an Engineer, I want to validate all the functionality of the Business Services Page
  
  Background:
    Given I am logged in VM successfully
    And I click on Business Services icon on left nav
    And Business Services page is displayed

  @Regression @Sanity_AppWizards @CreateService
  Scenario Outline: Create New Service
    Given I am on Business Services page
    And I click on Create Service button
    And Create New Service page is displayed
    When I create new service <service_type> with <service_name> name, service owner <service_owner> with description <service_description> for service with <query>
    Then <service_type> with <service_name> name, service type <service_owner> and description <service_description> is created successfully
    And I go to <service_name> service for <service_type> type to validate service with <query> query

    Examples:
    | service_type          | service_name                | service_owner    | service_description                    | query                |
    |  "Device Service"     | " Automation Create"          | "System"          | "Automation for Device Service"        |  "ip: 10.2.2.17"    |
    |  "IT Service"         | "Automation Create"         | "System"         | "Automation for IT Service"            |  "Automation"        |
    |  "Business Service"   | "Automation Create"         | "System"         | "Automation for Business Service"      |  "Automation"        |

  @Regression @Sanity_AppWizards @EditService
  Scenario Outline: Edit Service
    Given I am on Business Services page
    And I click on Create Service button
    And Create New Service page is displayed
    And I create new service <service_type> with <service_name> name, service owner <service_owner> with description <service_description> for service with <query>
    When I edit the <type> type of <service_name> name for <service_type> service with <edit_query>
    Then I go to <service_name> service for <service_type> type to validate service with <edit_query> query
   
    Examples: 
    | service_type          | service_name        | service_owner    | service_description                    | query                     | edit_query            |  type          |
    |  "Device Service"     | "Automation Edit"   | "System"         | "Automation for Device Service"        |  "ip: 10.2.2.17"         | "ip: 10.2.2.11"       | "Devices"      |
    |  "IT Service"         | "Automation Edit"   | "System"         | "Automation for IT Service"            |  "Automation"             | "Automation"          |  "Services"    |
    |  "Business Service"   | "Automation Edit"   | "System"         | "Automation for Business Service"      |  "Automation"             | "Automation"          |  "Services"    |


  @Regression @Sanity_AppWizards @Template
  Scenario Outline: Create Service From Template
    Given I am on Business Services page
    And I click on Create Service button
    And Create New Service page is displayed
    And I create new service <service_type> with <service_name> name, service owner <service_owner> with description <service_description> for service with <query>
    When I create a template from the <service_name> name for <service_type> service with <edit_query>
    Then <service_name> template for <service_type> service is created successfully
    And I create new service from <service_name> template for <service_type> service
    Then I validate the template for <service_type> type is created successfully
   
    Examples:
    | service_type          | service_name               | service_owner    | service_description                 | query                    | edit_query          |  type          |
    |  "Device Service"     | "Template DS Automation"   | "System"         | "Automation for Device Service"     |  "ip: 10.2.2.17"        | "ip: 10.2.2.11"     | "Devices"      |
     |  "IT Service"         | "Template IT Automation"   | "System"         | "Automation for IT Service"         |  "Automation"            |  "Automation"       | "Services"     |
     |  "Business Service"   | "Template BS Automation"   | "System"         | "Automation for Business Service"   |  "Automation"            | "Automation"        | "Services"     |


  @Regression @Sanity_AppWizards @Delete
  Scenario Outline: Delete Service
    Given I am on Business Services page
    When I delete the <service_name> service
    Then <service_name> service is deleted successfully
   
    Examples:
    | service_name   |  
    # | "Template"     |
    | "Automation"   | 


   
  @Regression @Sanity_AppWizards @DeleteTemplate
  Scenario Outline: Delete Template
    Given I am on Business Services page
    When I go to Business Services Template page
    When I delete the <template_name> template
    Then <template_name> template is deleted successfully
   
    Examples:
    | template_name   |  
    | "Template"     |
    | "Automation"   | 
