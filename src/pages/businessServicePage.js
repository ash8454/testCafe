const { t } = require('testcafe')
var expect = require('chai').expect;
const createNewServicePage = require('./createNewServicePage');
const util = require('../support/helper');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var xpath2css = require('xpath2css');
const businessServiceDashboardPage = require('./businessServicesDashboard');
require('events').EventEmitter.defaultMaxListeners = Infinity;

//ELEMENT LOCATORS
const queryTextboxXpathLocator = '//*[@id="inventory-content"]/div/div/div/div[1]/div/div[1]/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const queryTextboxLocator = xpath2css(queryTextboxXpathLocator);
const settingsXpathLocator = '//div[@id="inventory-content"]/div/div[@class="service-details"]/div[3]/div/div[1]/div[@class="search-bar"]//i'
const settingsIconLocator = xpath2css(settingsXpathLocator);
const basicSearchXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[1]'
const basicSearchButtonLocator = xpath2css(basicSearchXpathLocator);
const clearQueryButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[2]'
const clearQueryButtonLocator = xpath2css(clearQueryButtonXpathLocator);
const saveQueryButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[3]'
const saveQueryButtonLocator = xpath2css(saveQueryButtonXpathLocator);
const savedSearchesButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[4]'
const savedSearchesButtonLocator = xpath2css(savedSearchesButtonXpathLocator);
const editQueryTextboxLocator = '.ace_content'
const servicesTabLocator = 'li#services-block > a'

//Add business service
export async function addBusinessService(query) {
// exports.addBusinessService = async (query) => {
    await t.wait(1000);
    await util.select(queryTextboxLocator).with({ visibilityCheck: true })();
    const queryTextbox = await util.select(queryTextboxLocator);
    await t.typeText(queryTextbox, query);
    await t.wait(500);
    await isServicePresent(query);
}

//validate Business services pages
export async function validateBusinessServicePage(name, query) {
// exports.validateBusinessServicePage = async(name, query) => {
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
    await t.expect(devicesSection.exists).ok();
    await t.expect(devicesServicesSection.exists).ok();
    await t.expect(eventsSection.exists).ok();
    const servicesText = await util.select('h3 > a').withText(query)
    await t.expect(servicesText.exists).ok();    //expect services to be present
    await validateServicesTab(query);
}

//Edit query for ITService
export async function editBusinessService(query) {
    await editQuery(query);  
    await createNewServicePage.clickSaveButton();
    await createNewServicePage.clickBackButton();
}


//Delete Business Service
export async function deleteBusinessService(name) {
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();    //expect create service button to be visible
    //await businessServiceDashboardPage.searchService(name);
    const serviceNameLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", serviceNameLength);
    //for loop to edit the business service by name
    for (let i = 1; i <= serviceNameLength + 1; i++) {
        console.log("Iteration: ", i);
        if (i > serviceNameLength) {
            logger.info("Deleted the service including name: ", name);
            break;
        }
        let serviceNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div/a/span[2]`
        let serviceNameLocator = xpath2css(serviceNameXPathLocator);
        let serviceNameExists = false;
        let serviceNameText = '';
        if (await util.select(serviceNameLocator).exists){
            serviceNameExists = true;
            serviceNameText = await util.select(serviceNameLocator).innerText;
        }
        if ((serviceNameExists) && serviceNameText.trim().includes(name.trim())) {
            logger.info("Service Name found", serviceNameText);
            const dropdownIconXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div/div/div/div/div/i`
            let dropdownIcon = xpath2css(dropdownIconXpathLocator)
            await t.click(await util.select(dropdownIcon));
            await t.wait(1000);
            const deleteButtonXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]//div[@id="content"]/div/div/div/div/ul/div[5]/li/a`
            //const deleteButtonXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div[@id='content']//div[@role='toolbar']//ul[@role='menu']/div[5]/li[@role='presentation']/a[@role='menuitem']`
            let deleteButton = xpath2css(deleteButtonXpathLocator);
            //await util.select(deleteButton).with({ visibilityCheck: true })();
            await t.click(await util.select(deleteButton));
            await t.wait(1000);
            let deleteConfirmButton = await util.select('span').withText('Delete');
            await util.select(deleteConfirmButton).with({ visibilityCheck: true })();
            await t.click(await util.select(deleteConfirmButton));
            await t.wait(2000);
            i = 0;
        } 
    }
    await util.select(queryTextboxLocator).with({ visibilityCheck: true })();
}

//check if is service present
export async function isServicePresent(name){
    const serviceNameLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", serviceNameLength);
    const serviceNameText = await util.select('span').withText(name);
    await t.expect(serviceNameText.exists).ok();
}

//edit query for Business service
export async function editQuery(query) {
    await util.select(settingsIconLocator).with({ visibilityCheck: true })();
    const queryText = await util.select(queryTextboxLocator).innerText;
    console.log("Query text is: ", queryText);
    console.log("Query text length is: ", queryText.trim().length);
    if (parseInt(queryText.length) > 0){
        await t.click(await util.select(settingsIconLocator));
        await util.select(clearQueryButtonLocator).with({ visibilityCheck: true })();
        await t.click(await util.select(clearQueryButtonLocator));
        await t.wait(500);
        await util.select(settingsIconLocator).with({ visibilityCheck: true })();
        await t.click(await util.select(settingsIconLocator));
        await util.select(basicSearchButtonLocator).with({ visibilityCheck: true })();
        await t.click(await util.select(basicSearchButtonLocator));
        await t.wait(500);
    }

    const queryTextbox = await util.select(queryTextboxLocator);
    await t.click(queryTextbox);
    await t.typeText(queryTextbox, query);
    await t.wait(1000);
    // await util.select(querySearchDropdownLocator).with({ visibilityCheck: true })();
    // await t.click(await util.select(queryItemLocator));
    const serviceText = await util.select('div#content').withText(query);
    await t.expect(serviceText.exists).ok();
}


//validate services tab
export async function validateServicesTab(query){
    const servicesTab = await util.select(servicesTabLocator)
    await t.click(servicesTab);
    const previewText = await util.select('span').withText("Preview:");
    await t.expect(previewText.exists).ok(); 
    const serviceText = await util.select('span').withText(query)
    await t.expect(serviceText.exists).ok();    //expect service in services tab
}

