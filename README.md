# AP2 Automation Framework

AP2 Automation Framework uses TestCafe Framework written in JS which uses WebProxy instead of WebDriver to run the tests as well as the Cucumber Framework
which uses ATDD Agile Principle to run the tests based on the business functionality.

Since the TestCafe doesn't officially support Cucumber, "gherkin-testcafe" Framework is used to support Cucumber while using the regular Test Cafe features.

If you want to learn more about TestCafe, please follow this link: https://devexpress.github.io/testcafe/.

Similarly, if you want to learn how gherkin-testcafe framework drives testing serving as a documentation, automated test suite and development aid, please read here https://github.com/kiwigrid/gherkin-testcafe


## Versions
<table>
<tr>
    <td>TestCafé</td>
    <td>1.6.0</td>
</tr>
<tr>
    <td>gherkin-testcafe</td>
    <td>2.4.2</td>
</tr>
</table>

## Installation 

1. Install the Node.js using this link [Node.js](https://nodejs.org/).
2. Install git if you have not installed already using this link [Git](https://www.atlassian.com/git/tutorials/install-git).
2. Clone this repo ```git clone https://code.eng.sciencelogic.com/scm/~ashok.tulachan_sciencelogic.com/em7-automation-framework.git```
3. Navigate to the root directory.
4. Use the `npm install` command.
5. Once the install is complete, Navigate to the `develop` branch by running `git checkout develop`.
5. Once the install is complete, Run `npm run test` command to run the test.

## Running Tests

## Running Tests
You can run `npm run test` in order to run the all the cucumber tests.

## Running particular test or set of tests
You can run particular or set of cucumber tests by using tag feature of cucumber. 
You can run `gherkin-testcafe chrome:headless ./src/step_definitions/*.js ./src/features/*.feature --skip-js-errors --tags @Login` in order to run the test tagged as login.