const { Given, When, Then } = require('cucumber');
const dashboardPage = require('../pages/dashboard');
const applicationDashboardPage = require('../pages/applicationServicesDashboard');
const createNewApplicationPage = require('../pages/createNewApplicationPage');
const businessServicePage = require('../pages/businessServicePage');
const createNewTemplatePage = require('../pages/createTemplatePage');
const templateDashboardPage = require('../pages/templateDashboardPage');
const deviceServicesPage = require('../pages/deviceServicesPage');
const itServicesPage = require('../pages/itServicePage');
const util = require('../support/helper');

Given('I am on Applications page', async (t) => {
    await applicationDashboardPage.validateApplicationDashboardPage();
});

When('I click on Create Application button', async (t) => {
    await createNewApplicationPage.navigateToNewApplicationsPage();
});

When('I create new application with {string} name, owner {string} with description {string} with component type and queries {string}, {string}, {string}', async(t, [name, owner, description, query1, query2, query3]) => {
    await createNewApplicationPage.createNewApplication(name, owner, description, query1, query2, query3);
});

Then('I go to application dashboard and validate the application {string} is displayed', async(t, [name]) => {
    await applicationDashboardPage.validateApplicationAndComponentName(name);
});

When('I delete the {string} application', async(t, [name]) => {
    await applicationDashboardPage.deleteApplication(name);
});

Then('I go to {string} application to validate devices with component types and queries {string}, {string}, {string}', async(t, [name, query1, query2, query3]) => {
    await applicationDashboardPage.validateApplicationAndComponentName(name, query1, query2, query3)
});

Then('{string} application is deleted successfully', async (t, [name]) => {
    await applicationDashboardPage.validateApplicationComponentNotPresent(name)
});
