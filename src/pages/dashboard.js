var expect = require('chai').expect;
const basePage = require('./basePage');
const loginPage = require('./loginPage');
const util = require('../support/helper');
const { t } = require('testcafe')
require('events').EventEmitter.defaultMaxListeners = Infinity;

//Selectors
const searchTextBoxLocator = 'div[class="public-DraftEditorPlaceholder-inner"]';
const spanLocator = 'span';
const businessServicesLeftNavIconLocator = 'div[title="Business Services"] > svg';
const applicationsLeftNavIconLocator = 'div[title="Applications"] > svg';

//validate dashboard page
export async function validateDashboardPage() {
    const createDashboardButton = await util.select(spanLocator).withText('Create Dashboard');
    const searchDashboardTxtBox = await util.select(searchTextBoxLocator);
    await util.select(searchTextBoxLocator).with({ visibilityCheck: true })();
    //validate common page elements
    await basePage.validateCommonPageElements('Dashboards');
    //validate dashboard page
    expect(await createDashboardButton.exists).eqls(true);
    expect(await searchDashboardTxtBox.exists).eqls(true);
    const placeHolderText = await util.select(searchTextBoxLocator).innerText;
    expect(placeHolderText).includes('Type to search')  //validate place holder text
}

//go to dashboard page
export async function goToDashboardPage(ipAddress, username, password) {
    //navigate to URL
    await loginPage.goTo(ipAddress);
    //validate login page
    await loginPage.validateLoginPage();
    //login
    await loginPage.login(username, password);
}

//navigate to business services page
export async function navigateToBusinessServicesDashboardPage() {
    await t.wait(2000);
    await util.select(businessServicesLeftNavIconLocator).with({ visibilityCheck: true })();
    const businessServicesLeftNavIcon = await util.select(businessServicesLeftNavIconLocator);
    await t.expect(businessServicesLeftNavIcon.exists).ok();
    await t.click(businessServicesLeftNavIcon);         //click business services left nav icon
    await t.wait(2000);
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();    //expect create service button to be visible
    //await util.validateColumnHeaders();
}

//navigate to applications page
export async function navigateToApplicationDashboardPage() {
    await util.select(applicationsLeftNavIconLocator).with({ visibilityCheck: true })();
    const applicationsLeftNavIcon = await util.select(applicationsLeftNavIconLocator);
    await t.expect(applicationsLeftNavIcon.exists).ok();
    await t.click(applicationsLeftNavIcon);         //click business services left nav icon
    const createApplicationButton = await util.select('span').withText('Create Application');
    await t.expect(createApplicationButton.exists).ok();    //expect create service button to be visible
    await util.validateColumnHeaders();
}
