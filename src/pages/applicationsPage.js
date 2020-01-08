const { t } = require('testcafe')
var expect  = require('chai').expect;
const createNewServicePage = require('./createNewServicePage');
const util = require('../support/helper');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var xpath2css = require('xpath2css');
require('events').EventEmitter.defaultMaxListeners = Infinity;

//ELEMENT LOCATORS
const queryTextboxXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const queryTextboxLocator = xpath2css(queryTextboxXpathLocator)
const settingsIconXpathLocator = '//div[@id="inventory-content"]/div/div[@class="service-details"]/div[3]/div/div[1]/div[@class="search-bar"]//i'
const settingsIcon = xpath2css(settingsIconXpathLocator)
const basicSearchButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[1]'
const basicSearchButton = xpath2css(basicSearchButtonXpathLocator)
const clearQueryXpathLocator = '//div[@id="inventory-content"]/div/div[@class="service-details"]/div[3]/div/div[1]/div[@class="search-bar"]/div[2]/div/div[2]/div/a/div/div[2]/div[2]'
const clearQueryButton = xpath2css(clearQueryXpathLocator)
const applicationComponentsTabXpathLocator = '//*[@id="children-block"]/a'
const applicationComponentsTabLocator = xpath2css(applicationComponentsTabXpathLocator)
const componentNameColumnHeaderXpathLocator = '//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div/div/div[2]/div[@id="content"]'
const componentNameColumnHeaderLocator = xpath2css(componentNameColumnHeaderXpathLocator)
const deviceNameColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[1]/div[1]/div'
const deviceNameColumnHeaderLocator = xpath2css(deviceNameColumnHeaderXpathLocator)


//validate application page
export async function validateApplicationPage(name) {   
    const overviewTab = await util.select('a').withText('Overview');
    const applicationComponentsTab = await util.select('a').withText('Application Components');
    const statusPolicyTab = await util.select('a').withText('Status Policy');
    const backTab = await util.select('span').withText('Back');
    const editButton = await util.select('span').withText('Edit');
    const statusSection = await util.select('span').withText('Status');
    const applicationComponentsSection = await util.select('span').withText('Application Components');
    const eventsSection = await util.select('span').withText('Events');
    const serviceNameText = await util.select('span').withText(`${name}`);
    await t.expect(overviewTab.exists).ok();
    await t.expect(applicationComponentsTab.exists).ok();
    await t.expect(statusPolicyTab.exists).ok();
    await t.expect(backTab.exists).ok();
    await t.expect(editButton.exists).ok();
    await t.expect(statusSection.exists).ok();
    await t.expect(applicationComponentsSection.exists).ok();
    await t.expect(serviceNameText.exists).ok();
    await t.expect(eventsSection.exists).ok();
    await t.expect(await util.select('h3 > a').withText(`Static AutoComponent`).exists).ok();    //expect app component to be present
    await t.expect(await util.select('h3 > a').withText(`Dynamic AutoComponent`).exists).ok();    //expect app component to be present
    await validateApplicationComponentsTab(name)
}


//validate devices tab
export async function validateApplicationComponentsTab(name) {  
// async function validateApplicationComponentsTab(name){
    const componentsTab = await await util.select(applicationComponentsTabLocator)
    await t.click(componentsTab);
    await t.expect(await util.select(componentNameColumnHeaderLocator).exists).ok();
    await t.expect(await util.select('span').withText(`Static AutoComponent`).exists).ok();    //expect static component in application components tab
    await t.expect(await util.select('span').withText(`Dynamic AutoComponent`).exists).ok();    //expect dynamic component in application components tab
}

//validate application component page
export async function validateApplicationComponentPage(name, query) {  
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
    await t.expect(serviceNameText.exists).ok();
    await t.expect(eventsSection.exists).ok();
    //await validateDevicesTab(query);
}

//click back button
export async function clickBackButton() {  
    await t.click(await util.select('span').withText('Back'));
    const createApplicationButton = await util.select('span').withText('Create Application');
    await t.expect(await util.select(createApplicationButton).exists).ok();
}

//validate devices tab
export async function validateDevicesTab(query) {  
    await t.click(await util.select('a').withText('Devices'));
    await t.expect(await util.select(deviceNameColumnHeaderLocator).exists).ok();
    await t.expect(await util.select('span').withText(util.getIpAddress(query)).exists).ok();    //expect ip address on the search box
    await t.expect(await util.select('div').withText(util.getIpAddress(query)).exists).ok();    //expect ip address on the table
}