@LoginPage @XRAY-14
Feature: AP2 Login Page
  As a User, I want to login into AP2 page successfully

  Background:
    Given I am on AP2 home page in "http://10.2.2.16" VM
  
  @Regression @Login @XRAY-12
  Scenario: Successfully Login
    When I login with username "em7admin" and  password "em7admin"
    Then I am logged in successfully
