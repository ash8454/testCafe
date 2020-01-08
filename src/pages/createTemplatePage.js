var expect = require('chai').expect;
const { t } = require('testcafe')
const util = require('../support/helper');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var xpath2css = require('xpath2css');
const businessServiceDashboardPage = require('./businessServicesDashboard');
require('events').EventEmitter.defaultMaxListeners = Infinity;

//Locators
const createTemplatePageNextButtonLocator = 'button#next-button'
const newTemplateNameTextboxLocator = 'input#sessionName-input'
const newTemplateDescriptionTextboxLocator = 'input#description'
const newTemplateImage='img[src="/images/DeviceService-Illustration.svg"]'
const queryTextboxXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div/div/div[2]/div/div[1]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const queryTextboxLocator = xpath2css(queryTextboxXpathLocator)
const settingsIconXpathLocator = '//div[@id="inventory-content"]/div/div[@class="service-details"]/div[3]/div/div/div/div[2]/div[@class="multi-step"]/div[1]/div[2]/div[2]//div[@class="search-bar"]/div[2]/div/div[2]/div/a/div/div[1]/i'
const settingsIconLocator = xpath2css(settingsIconXpathLocator)
const basicSearchButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div[3]/div/div/div/div[2]/div/div[1]/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div[2]/div/a/div/div[2]/div[1]'
const basicSearchButtonLocator = xpath2css(basicSearchButtonXpathLocator)
const clearQueryButtonXpathLocator = '//div[@id="inventory-content"]/div/div[@class="service-details"]/div[3]/div/div/div/div[2]/div[@class="multi-step"]/div[1]/div[2]/div[2]//div[@class="search-bar"]/div[2]/div/div[2]/div/a/div/div[2]/div[2]'
const clearQueryButtonLocator = xpath2css(clearQueryButtonXpathLocator)

//create new template from BS
export async function createNewTemplateFromBS(name) {
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();    //expect create service button to be visible
    await t.wait(4000);
    const serviceNameLength = await util.select('div.table-row').count;
    logger.info("No of elements is: ", serviceNameLength);
    //for loop to edit the business service by name
    for (let i = 1; i <= serviceNameLength + 1; i++) {
        if (i > serviceNameLength) {
            logger.error("Cannot find the service name");
            throw new Error("Cannot find service name");
        }
        //let serviceNameLocator = `div:nth-of-type(${i}) > .table-row > div[class="cell cl-name sc-fBuWsC eeihxG"] > div > a > span:nth-of-type(2)`
        let serviceNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div/a/span[2]`
        let serviceNameLocator = xpath2css(serviceNameXPathLocator);
        const serviceNameText = await util.select(serviceNameLocator).innerText;
        if (serviceNameText.includes(name)) {
            logger.info("Service Name found", serviceNameText)
            let dropdownIconXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div[@id='content']/div/div/div/div/i`
            let dropdownIcon = xpath2css(dropdownIconXpathLocator);
            await t.click(await util.select(dropdownIcon));
            let createTemplateButtonXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div[@id="content"]/div/div/div/div/ul/div[4]/li/a`
            let createTemplateButton = xpath2css(createTemplateButtonXpathLocator)
            await util.select(createTemplateButton).with({ visibilityCheck: true })();
            await t.click(await util.select(createTemplateButton));
            break;
        } 
    }
}

//validate new template page
export async function validateNewTemplatePage() {
    await util.select(createTemplatePageNextButtonLocator).with({ visibilityCheck: true })();
    await t.expect(createTemplatePageNextButtonLocator).ok(); 
    const createServiceTemplateTitle = await util.select('div').withText('Create Template from');
    const createServiceTemplateHeader = await util.select('div').withText('Please Read Before Continuing');
    const createServiceTemplateSubHeader = await util.select('div').withText('Before creating a Service template, note the following constraints');
    await t.expect(createServiceTemplateTitle.exists).ok(); //expect create service template title
    await t.expect(createServiceTemplateHeader.exists).ok();    //expect create service template header to contain following text
    await t.expect(createServiceTemplateSubHeader.exists).ok();    //expect create service template sub header to contain following text
    await t.expect(await util.select('div').withText('What can be modified during Service Template creation:').exists).ok();
    await t.expect(await util.select('div').withText('The name of a Service').exists).ok();
    await t.expect(await util.select('div').withText('The annotations on a Service').exists).ok();
    await t.expect(await util.select('div').withText('The annotations on a Status Policy').exists).ok();
    await t.expect(await util.select('div').withText('The annotations on Rulesets or Rules for a Status Policy').exists).ok();
    await t.expect(await util.select('div').withText('The name of a Service').exists).ok();
    await t.expect(await util.select('div').withText('The query to identify Devices for a Device Service').exists).ok();
    await t.expect(await util.select('div').withText('The (optional) query to further restrict Devices for a Rule in a Status Policy').exists).ok();

    await t.expect(await util.select('div').withText('What cannot be modified during Service Template creation:').exists).ok();
    await t.expect(await util.select('div').withText('The description of a Service').exists).ok();
    await t.expect(await util.select('div').withText('The query to identify Services for a Business Service or IT Service').exists).ok();
    await t.expect(await util.select('div').withText('The name of a Status Policy').exists).ok();
    await t.expect(await util.select('div').withText('Selecting a different Status Policy').exists).ok();
    await t.expect(await util.select('div').withText('Other details of a Status Policy associated with a Business Service, IT Service or Device Service').exists).ok();

    await t.expect(await util.select('div').withText('The following values are included in a Service but are removed when you use that Service to create a Service Template:').exists).ok();
    await t.expect(await util.select('div').withText('SL1 will request these values when a user uses the Template to create a Service. Users can add stripped values after SL1 creates the Service').exists).ok();
    await t.expect(await util.select('div').withText('Organization that manages the Service').exists).ok();
    await t.expect(await util.select('div').withText('Organizations that can use this Service').exists).ok();
    await t.expect(await util.select('div').withText('Contact Organization or User for the Service').exists).ok();
    await t.expect(await util.select('div').withText('After you create a Service Template, you cannot edit it.').exists).ok();
}

//click next button
export async function clickNextButton() {
    await util.select(createTemplatePageNextButtonLocator).with({ visibilityCheck: true })();
    await t.expect(createTemplatePageNextButtonLocator).ok(); 
    await t.click(createTemplatePageNextButtonLocator);
    await t.wait(1000);
}

//enter template name and Description
export async function enterTemplateDetails(name) {
    await util.select(newTemplateNameTextboxLocator).with({ visibilityCheck: true })();
    await t.expect(newTemplateNameTextboxLocator).ok(); 
    let templateName = name + 'Template'
    await t.typeText(newTemplateNameTextboxLocator, templateName);
    await util.select(newTemplateDescriptionTextboxLocator).with({ visibilityCheck: true })();
    await t.expect(newTemplateDescriptionTextboxLocator).ok(); 
    await t.typeText(newTemplateDescriptionTextboxLocator, templateName);
}

//enter device query
export async function editDeviceQuery(query) {
    const searchButton = await util.select('span').withText('Search');
    await util.select(settingsIconLocator).with({ visibilityCheck: true })();
    const queryText = await util.select(queryTextboxLocator).innerText;
    console.log("Query text is: ", queryText);
    console.log("Query text length is: ", queryText.length);
    if (parseInt(queryText.length) > 0){
        await t.click(await util.select(settingsIconLocator));
        await util.select(clearQueryButtonLocator).with({ visibilityCheck: true })();
        await t.click(await util.select(clearQueryButtonLocator));
        await t.wait(1000);
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
    const ipAddress = query.split(':').pop().trim();
    const previewIPAddressDevice = await util.select('div#content').withText(ipAddress)
    await t.expect(previewIPAddressDevice.exists).ok();    //expect device with ip address to be visible
}

//click createTemplate button
export async function clickCreateTemplateButton() {
    const createTemplateButton = await util.select('button').withText('Create Template');
    await util.select(createTemplateButton).with({ visibilityCheck: true })();
    await t.click(createTemplateButton);
}

//review template page
export async function validateReviewTemplatePage(name, type) {
    await t.wait(1000);
    // const closeButton = await util.select('span').withText('Close');
    // await util.select(closeButton).with({ visibilityCheck: true })();
    //await t.expect(await util.select(newTemplateImage).exists).ok();
    await t.expect(await util.select('p').withText('Template').exists).ok();
    let templateName =  name + 'Template';
    await t.expect(await util.select('p').withText(templateName).exists).ok();
    await t.expect(await util.select('p').withText('has been created based on the').exists).ok();
    await t.expect(await util.select('p').withText(name).exists).ok();
    //let serviceType = type.toString().toLowerCase();
    //await t.expect(await util.select('p').withText(serviceType).exists).ok();
    await t.expect(await util.select('p').withText('hierarchy.').exists).ok();
}

//click confirm(close) button
export async function clickCloseButton() {
    const closeButton = await util.select('span').withText('Close');
    await util.select(closeButton).with({ visibilityCheck: true })();
    await t.click(closeButton);
    await t.wait(1000);
}