const { t } = require('testcafe')
var expect  = require('chai').expect;
const basePage = require('./basePage');
const createNewServicePage = require('./createNewServicePage');
const businessServicesDashboardPage = require('./businessServicesDashboard');
const util = require('../support/helper');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var xpath2css = require('xpath2css');
require('events').EventEmitter.defaultMaxListeners = Infinity;

//ELEMENT LOCATORS
const queryTextboxXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div/div[2]/div/div/div/div';
const queryTextboxLocator = xpath2css(queryTextboxXpathLocator);
const querySearchDropdownXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div[1]/div[1]/ul'
const querySearchDropdownLocator = xpath2css(querySearchDropdownXpathLocator);
const queryItemLocator = 'li:nth-of-type(1) > div:nth-of-type(2)'
const settingsIconXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[1]/i'
const settingsIcon = xpath2css(settingsIconXpathLocator);
const basicSearchXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[1]'
const basicSearchButton = xpath2css(basicSearchXpathLocator);
const clearQueryXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[2]'
const clearQueryButton = xpath2css(clearQueryXpathLocator);
const editQueryTextboxLocator = '.ace_content'
const availabilityLabelXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div[1]/div[2]/div/div/div/div/div[2]/div[1]'
const availabilityLabelLocator = xpath2css(availabilityLabelXpathLocator);
const healthLabelXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div[1]/div[2]/div/div/div/div/div[2]/div[2]'
const healthLabelLocator = xpath2css(healthLabelXpathLocator)
const riskLabelXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div[1]/div[2]/div/div/div/div/div[2]/div[3]'
const riskLabelLocator = xpath2css(riskLabelXpathLocator);
const devicesTabLocator = 'li#services-block > a'


//Add new device service
export async function addDeviceForDeviceServices(query) {
// exports.addDeviceForDeviceServices = async(query) => {
    await util.select(queryTextboxLocator).with({ visibilityCheck: true })();
    const queryTextbox = await util.select(queryTextboxLocator);
    await t.typeText(queryTextbox, query);
    await t.wait(1000);
    // await util.select(querySearchDropdownLocator).with({ visibilityCheck: true })();
    // await t.click(await util.select(queryItemLocator));
    const ipAddress = query.split(':').pop().trim();
    const previewIPAddressDevice = await util.select('div#content').withText(ipAddress)
    await t.expect(previewIPAddressDevice.exists).ok();    //expect device with ip address to be visible
}

//validate device services pages
export async function validateDeviceServicePage(name, query) {
    const serviceNameLength = await util.getRowLength();
    logger.info("No of elements is: ", serviceNameLength);
    const overviewTab = await util.select('a').withText('Overview');
    const devicesTab = await util.select('a').withText('Devices');
    const statusPolicyTab = await util.select('a').withText('Status Policy');
    const backTab = await util.select('span').withText('Back');
    const editButton = await util.select('span').withText('Edit');
    const statusSection = await util.select('span').withText('Status');
    const devicesSection = await util.select('span').withText('Devices');
    const eventsSection = await util.select('span').withText('Events');
    const serviceNameText = await util.select('span').withText(`${name}`);
    await t.expect(overviewTab.exists).ok();
    await t.expect(devicesTab.exists).ok();
    await t.expect(statusPolicyTab.exists).ok();
    await t.expect(backTab.exists).ok();
    await t.expect(editButton.exists).ok();
    await t.expect(statusSection.exists).ok();
    await t.expect(devicesSection.exists).ok();
    await t.expect(eventsSection.exists).ok();
    await t.wait(2000);
    const ipAddress = query.split(':').pop().trim();
    const previewIPAddressDevice = await util.select('div#content').withText(ipAddress)
    await t.expect(previewIPAddressDevice.exists).ok();    //expect device with ip address to be visible
    await validateDevicesTab(query);
}

//Edit Device Service
export async function editDeviceService(query) {
    await editQueryForDeviceService(query);
    await createNewServicePage.clickSaveButton();
    await createNewServicePage.clickBackButton();
}

//Edit query for DeviceService
export async function editQueryForDeviceService(query) {
    await util.select(settingsIcon).with({ visibilityCheck: true })();
    await t.click(await util.select(settingsIcon));
    await util.select(clearQueryButton).with({ visibilityCheck: true })();
    await t.click(await util.select(clearQueryButton));
    await t.wait(500);
    await util.select(settingsIcon).with({ visibilityCheck: true })();
    await t.click(await util.select(settingsIcon));
    await util.select(basicSearchButton).with({ visibilityCheck: true })();
    await t.click(await util.select(basicSearchButton));
    await t.wait(500);
    const queryTextbox = await util.select(queryTextboxLocator);
    await t.click(queryTextbox);
    await t.typeText(queryTextbox, query);
    await t.wait(1000);
    // await util.select(querySearchDropdownLocator).with({ visibilityCheck: true })();
    // await t.click(await util.select(queryItemLocator));
    const ipAddress = query.split(':').pop().trim();
    const previewIPAddressDevice = await util.select('div#content').withText(ipAddress)
    await t.expect(previewIPAddressDevice.exists).ok();    //expect device with ip address to be visible
}

//validate devices tab
export async function validateDevicesTab(query){
    const devicesTab = await util.select(devicesTabLocator)
    await t.click(devicesTab);
    const previewText = await util.select('span').withText("Preview:");
    await t.expect(previewText.exists).ok(); 
    const ipAddress = query.split(':').pop().trim();
    const previewIPAddressDevice = await util.select('div#content').withText(ipAddress)
    await t.expect(previewIPAddressDevice.exists).ok();    //expect device with ip address to be visible
}