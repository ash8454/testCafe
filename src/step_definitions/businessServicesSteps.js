const { Given, When, Then } = require('cucumber');
const dashboardPage = require('../pages/dashboard');
const businessServicesDashboardPage = require('../pages/businessServicesDashboard');
const createNewServicePage = require('../pages/createNewServicePage');
const businessServicePage = require('../pages/businessServicePage');
const createNewTemplatePage = require('../pages/createTemplatePage');
const templateDashboardPage = require('../pages/templateDashboardPage');
const deviceServicesPage = require('../pages/deviceServicesPage');
const itServicesPage = require('../pages/itServicePage');
const util = require('../support/helper');


Given('I am on Business Services page', async (t) => {
    await dashboardPage.navigateToBusinessServicesDashboardPage();
    await businessServicesDashboardPage.validateBusinessServicesDashboardPage();
});

When('I click on Create Service button', async (t) => {
    await createNewServicePage.navigateToNewServicesPage();
    //await createNewServicePage.validateNewServicesPage();
});

When(/^I create new service "(.*)" with "(.*)" name, service owner "(.*)" with description "(.*)" for service with "(.*)"/, async (t,[type, name, owner, description, query]) => {
    await createNewServicePage.createService(type, name, owner, description, query);
});

Given('I am on Create New Services page', async (t) => {
    await dashboardPage.navigateToBusinessServicesDashboardPage();
    await businessServicesDashboardPage.validateBusinessServicesDashboardPage();
    await createNewServicePage.navigateToNewServicesPage();
    await createNewServicePage.validateNewServicesPage();
});

Then(/"(.*)" with "(.*)" name, service type "(.*)" and description "(.*)" is created successfully/, async (t,[type, name, owner, description]) => {
    await businessServicesDashboardPage.validateNewService(type, name, owner, description);
});

When(/^I delete the "(.*)" service/, async (t, [name]) => {
    await businessServicePage.deleteBusinessService(name);
});

When(/^I edit the "(.*)" type of "(.*)" name for "(.*)" service with "(.*)"/, async (t,[type, name, service_type, query]) => {
    await businessServicesDashboardPage.editService(type, name, service_type, query)
});

Then(/"(.*)" service is deleted successfully/, async (t, [name]) => {
    await businessServicesDashboardPage.validateServiceNotPresent(name)
});

When('I create a template from the {string} name for {string} service with {string}', async(t,[name,type,query]) => {
    await createNewTemplatePage.createNewTemplateFromBS(name);
    await createNewTemplatePage.validateNewTemplatePage();
    await createNewTemplatePage.clickNextButton();
    await createNewTemplatePage.enterTemplateDetails(name);
    await createNewTemplatePage.clickNextButton();
    if (await util.equalsIgnoreCase(type, 'Device Service')) {
        await createNewTemplatePage.editDeviceQuery(query);
    }
    await createNewTemplatePage.clickCreateTemplateButton();
    await createNewTemplatePage.validateReviewTemplatePage(name, type);
    await createNewTemplatePage.clickCloseButton();
});

When('{string} template for {string} service is created successfully', async(t,[name, type]) => {
    await templateDashboardPage.validateTemplateDashboardPage();
    await templateDashboardPage.validateNewTemplate(name, type)
});

When('I go to Business Services Template page', async (t) => {
    await templateDashboardPage.navigateToTemplateDashboardPage();
    await templateDashboardPage.validateTemplateDashboardPage();
});

When('I create new service from {string} template for {string} service', async(t,[name, type]) => {
    await templateDashboardPage.validateNewTemplate(name, type);
    await templateDashboardPage.createServiceFromTemplate(name, type);
});

Then('I validate the template for {string} type is created successfully', async(t,[type]) => {
    await templateDashboardPage.validateTemplateService(type);
});

When('I delete the {string} template', async(t,[name]) => {
    await templateDashboardPage.deleteTemplate(name);
});

Then(/"(.*)" template is deleted successfully/, async(t,[name]) => {
    await templateDashboardPage.navigateToTemplateDashboardPage();
    await templateDashboardPage.validateTemplateNotPresent(name);
});
///^I delete the "(.*)" service/
Then(/^I go to "(.*)" service for "(.*)" type to validate service with "(.*)" query$/, async(t,[name,type,query]) => {
    await businessServicesDashboardPage.validateServiceName(name, type);
    await businessServicesDashboardPage.goToService(name, type);
    if (await util.equalsIgnoreCase(type, 'Device Service')) {
        await deviceServicesPage.validateDeviceServicePage(name,query)
    } else if (await util.equalsIgnoreCase(type, 'IT Service')) {
        await itServicesPage.validateITServicePage(name, query);
    } else {
        await businessServicePage.validateBusinessServicePage(name, query);
    }
});

Then(/^I go to "(.*)" service and verify the service is updated successfully with "(.*)"/, async(t,[name, query]) => {
    await businessServicesDashboardPage.validateNewService(name, query);
});
