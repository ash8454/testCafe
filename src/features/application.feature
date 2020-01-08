@Application
Feature: Application
  As an Engineer, I want to validate all the functionality of the Applications Page
  
  Background:
    Given I am logged in VM successfully
    And I click on Applications icon on left nav
    And Applications page is displayed


  @Regression @Sanity_AppWizards @CreateApplication
  Scenario Outline: Create New Application
    Given I am on Applications page
    And I click on Create Application button
    And Create New Application page is displayed
    When I create new application with <app_name> name, owner <app_owner> with description <app_description> with component type and queries <query1>, <query2>, <query3>
    And I go to <app_name> application to validate devices with component types and queries <query1>, <query2>, <query3>

   Examples:
    | app_name             | app_owner    | app_description                    | query1                     | query2                    | query3                     |
    | "Automation Create"  | "System"     | "Automation for Application"       |  "static.ip: 10.2.2.11"    | "dynamic.ip: 10.2.2.13"   | "dynamic.ip: 10.2.2.17"    |


  @Regression @Sanity_AppWizards @DeleteApplication
  Scenario Outline: Delete Application
    Given I am on Applications page
    When I delete the <app_name> application
    Then <app_name> application is deleted successfully
   
    Examples:
    | app_name        |  
    | "Automation"    | 
    | "Static"        | 
    | "Dynamic"       | 
