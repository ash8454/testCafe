const { Given, When, Then } = require('cucumber');
const dashboardPage = require('../pages/dashboard');
const businessServicesDashboardPage = require('../pages/businessServicesDashboard');
const applicationDashboardPage = require('../pages/applicationServicesDashboard');
const createNewServicePage = require('../pages/createNewServicePage');
const createNewApplicationPage = require('../pages/createNewApplicationPage');
import { t } from 'testcafe';
const util = require('../support/helper');

Given('Dashboard page is displayed', async (t) => {
        //set page time out
    await t.setPageLoadTimeout(40000);
    await dashboardPage.validateDashboardPage();
});

Given('I am on Dashboard page on {string} VM logging in with username {string} and password {string}', async (t,[ipAddress, username, password]) => {
    //set page time out
    await t.setPageLoadTimeout(40000);
    //navigate to dashboard page
    await dashboardPage.goToDashboardPage(ipAddress, username, password)
});

Given('I am on Dashboard page logged in successfully', async (t,[ipAddress, username, password]) => {
    //set page time out
    await t.setPageLoadTimeout(40000);
    //navigate to dashboard page
    await dashboardPage.goToDashboardPage(ipAddress, username, password)
});

When('I click on Business Services icon on left nav', async (t,[string]) => {
    await dashboardPage.navigateToBusinessServicesDashboardPage();
});

When('I click on Applications icon on left nav', async (t,[string]) => {
    await dashboardPage.navigateToApplicationDashboardPage();
});

Then(/^(.*) page is displayed$/, async (t,[string]) => {
    if (await util.equalsIgnoreCase(string, 'Business Services')) {
        await businessServicesDashboardPage.validateBusinessServicesDashboardPage();
    } else if (await util.equalsIgnoreCase(string, 'Applications')){
        return applicationDashboardPage.validateApplicationDashboardPage();
    } else if (await util.equalsIgnoreCase(string, 'Create New Service')){
        await createNewServicePage.validateNewServicesPage();
    } else if (await util.equalsIgnoreCase(string, 'Create New Application')){
        return createNewApplicationPage.validateNewApplicationsPage();
    } else {
        return 'pending'
    }
});

// Then ('Applications page is displayed successfully', async (t) => {
//     await applicationDashboardPage.validateApplicationDashboardPage();
// });

// Then ('Create New Application page is displayed successfully', async (t) => {
//     await createNewApplicationPage.validateNewApplicationsPage();
// });