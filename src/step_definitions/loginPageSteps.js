const { Given, When, And, Then } = require('cucumber');
const loginPage = require('../pages/loginPage');
import { t } from 'testcafe';
const basePage = require('../pages/basePage')

Given(/^I am on AP2 home page in "(.*?)" VM$/, async (t, [ipAddress]) => {
    //navigate to URL
    //await loginPage.url(ipAddress);
    await loginPage.goTo(ipAddress)
    //validate login page
    await loginPage.validateLoginPage();
});

When('I login with username {string} and  password {string}', async (t, [username, password]) => {
    // login with credentials
    await loginPage.login(username, password);
});

Then('I am logged in successfully', async (t) => {
    // login with credentials
    await basePage.validateCommonPageElements('')
});

Then('I am logged in VM successfully', async (t) => {
    // login with credentials
    await loginPage.goToUrl();
    //validate login page
    await loginPage.validateLoginPage();
    await loginPage.loginWithEnv();
});