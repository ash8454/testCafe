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
const servicesTabLocator = 'li#services-block > a'
const serviceTypeXpathLocator = '//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div/div/div[2]/div[@id="content"]'
const serviceTypeLocator = xpath2css(serviceTypeXpathLocator)

//add new IT service
export async function addITService(query) {
// exports.addITService = async(query) => {
    await util.select(queryTextboxLocator).with({ visibilityCheck: true })();
    const queryTextbox = await util.select(queryTextboxLocator);
    await t.typeText(queryTextbox, query);
    await t.wait(2000);
    const serviceTypeText = await util.select(serviceTypeLocator).innerText;
    expect(serviceTypeText.toString()).eqls('Device Service');
}

//Edit query for ITService
export async function editITService(query) {
// exports.editITService = async(query) => {
    await editQuery(query);  
    await createNewServicePage.clickSaveButton();
    await createNewServicePage.clickBackButton();
}


//validate IT services pages
export async function validateITServicePage(name, query) {
// exports.validateITServicePage = async(name, query) => {
    const serviceNameLength = await util.getRowLength();
    logger.info("No of elements is: ", serviceNameLength);
    const overviewTab = await util.select('a').withText('Overview');
    const servicesTab = await util.select('a').withText('Services');
    const statusPolicyTab = await util.select('a').withText('Status Policy');
    const backTab = await util.select('span').withText('Back');
    const editButton = await util.select('span').withText('Edit');
    const statusSection = await util.select('span').withText('Status');
    const devicesSection = await util.select('span').withText('Devices');
    const devicesServicesSection = await util.select('span').withText('Device Services');
    const eventsSection = await util.select('span').withText('Events');
    const serviceNameText = await util.select('span').withText(`${name}`);
    await t.expect(overviewTab.exists).ok();
    await t.expect(servicesTab.exists).ok();
    await t.expect(statusPolicyTab.exists).ok();
    await t.expect(backTab.exists).ok();
    await t.expect(editButton.exists).ok();
    await t.expect(statusSection.exists).ok();
    // await t.expect(devicesSection.exists).ok();
    // await t.expect(devicesServicesSection.exists).ok();
    await t.expect(eventsSection.exists).ok();
    const servicesText = await util.select('h3 > a').withText(query)
    await t.expect(servicesText.exists).ok();    //expect services to be present
    await validateServicesTab(query);
}

//edit query for IT service
export async function editQuery(query) {
    await util.select(settingsIcon).with({ visibilityCheck: true })();
    const queryText = await util.select(queryTextboxLocator).innerText;
    console.log("Query text is: ", queryText);
    console.log("Query text length is: ", queryText.length);
    if (parseInt(queryText.length) > 0){
        await t.click(await util.select(settingsIcon));
        await util.select(clearQueryButton).with({ visibilityCheck: true })();
        await t.click(await util.select(clearQueryButton));
        await t.wait(500);
        await util.select(settingsIcon).with({ visibilityCheck: true })();
        await t.click(await util.select(settingsIcon));
        await util.select(basicSearchButton).with({ visibilityCheck: true })();
        await t.click(await util.select(basicSearchButton));
        await t.wait(500);
    }
    const queryTextbox = await util.select(queryTextboxLocator);
    await t.click(queryTextbox);
    await t.typeText(queryTextbox, query);
    await t.wait(1000);
    //await util.select(querySearchDropdownLocator).with({ visibilityCheck: true })();
    //await t.click(await util.select(queryItemLocator));
    const serviceText = await util.select('div#content').withText(query);
    await t.expect(serviceText.exists).ok();
}


//validate devices tab
export async function validateServicesTab(query){
    const servicesTab = await util.select(servicesTabLocator)
    await t.click(servicesTab);
    const previewText = await util.select('span').withText("Preview:");
    await t.expect(previewText.exists).ok(); 
    const serviceText = await util.select('span').withText(query)
    await t.expect(serviceText.exists).ok();    //expect service in services tab
}