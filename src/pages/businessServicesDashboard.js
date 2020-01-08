var expect = require('chai').expect;
const { t } = require('testcafe')
const basePage = require('./basePage');
const deviceServicesPage = require('./deviceServicesPage');
const itServicesPage = require('./itServicePage');
const businessServicesPage = require('./businessServicePage');
const util = require('../support/helper');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var xpath2css = require('xpath2css');
require('events').EventEmitter.defaultMaxListeners = Infinity;


//Selectors
const searchTextBoxLocator = 'div[class="public-DraftEditorPlaceholder-inner"]';
const searchQueryTextBoxXpathLocator = '//*[@id="inventory-content"]/div/div/div/div[1]/div/div[1]/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const searchQueryTextBoxLocator = xpath2css(searchQueryTextBoxXpathLocator);
const businessServicesLeftNavIconLocator = 'div[title="Business Services"] > svg';
const nameColumnHeaderXpathLocator = '//div[@id="tableView"]//div[@class="header"]/div[1]/div[@class="cell-content"]/div';
const nameColumnHeaderLocator = xpath2css(nameColumnHeaderXpathLocator);
const descriptionColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[2]/div[1]/div';
const descriptionColumnHeaderLocator = xpath2css(descriptionColumnHeaderXpathLocator);
const typeColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[3]/div[1]/div';
const typeColumnHeaderLocator = xpath2css(typeColumnHeaderXpathLocator);
const organizationColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[4]/div[1]/div';
const organizationColumnHeaderLocator = xpath2css(organizationColumnHeaderXpathLocator)
const availabilityColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[5]/div[1]/div';
const availabilityColumnHeaderLocator = xpath2css(availabilityColumnHeaderXpathLocator);
const healthColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[6]/div[1]/div';
const healthColumnHeaderLocator = xpath2css(healthColumnHeaderXpathLocator);
const riskColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[7]/div[1]/div';
const riskColumnHeaderLocator = xpath2css(riskColumnHeaderXpathLocator);
const policyColumnHeaderXpathLocator = '//*[@id="tableView"]/div[2]/div/div[8]/div[1]/div';
const policyColumnHeaderLocator = xpath2css(policyColumnHeaderXpathLocator);
const createTemplateButtonXpathLocator = '//*[@id="content"]/div/div/div/div/ul/div[4]/li/a'
const createTemplateButton = xpath2css(createTemplateButtonXpathLocator);


//validate business services page
export async function validateBusinessServicesDashboardPage() {
    //elements
    const searchServicesTxtBox = await util.select(searchTextBoxLocator);
    const createServiceButton = await util.select('span').withText('Create Service');

    await t.expect(await util.select('div').withText('Loading').exists).notOk();
    //validate common page elements
    await basePage.validateCommonPageElements('Business Services');
    //validate dashboard page
    await t
        .expect(searchServicesTxtBox.exists).ok()
        .expect(createServiceButton.exists).ok();
    const placeHolderText = await util.select(searchTextBoxLocator).innerText;
    expect(placeHolderText).includes('Type to search services')  //validate place holder text
    //validate the column headers
    //await validateColumnHeaders();
    await t.wait(2000);
}

//validate new service
export async function validateNewService(type, name, owner, description) {
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();
    const serviceNameLength = await util.getRowLength();
    logger.info("No of elements is: ", serviceNameLength);
    // await searchService(name);
    await validateServiceName(name, type);
    await validateServiceDescription(description, serviceNameLength)
    await validateServiceType(type, serviceNameLength);
    await validateServiceOwner(owner, serviceNameLength);
    await validatePolicyType(type, "default", serviceNameLength);
}

//Edit service
export async function editService(type, name, service_type, query) {
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();    //expect create service button to be visible
    // await searchService(name);  //search for the service
    const serviceNameLength = await util.getRowLength();
    logger.info("No of elements is: ", serviceNameLength);
    let serviceName = name + ` ${service_type}`;
    //for loop to edit the business service by name
    for (let i = 1; i <= serviceNameLength + 1; i++) {
        if (i > serviceNameLength) {
            logger.error("Cannot find the service name");
            throw new Error("Cannot find service name");
        }
        let serviceNameExists = false;
        let serviceNameText = '';
        let serviceNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div/a/span[2]`
        let serviceNameLocator = xpath2css(serviceNameXPathLocator);
        if (await util.select(serviceNameLocator).exists) {
            serviceNameExists = true;
            serviceNameText = await util.select(serviceNameLocator).innerText;
            console.log(serviceNameText);
        }
        if ((serviceNameExists) && serviceNameText.trim().includes(serviceName.trim())) {
            logger.info("Service Name found", serviceNameText)
            const dropdownIconXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div/div/div/div/div/i`
            let dropdownIcon = xpath2css(dropdownIconXpathLocator)
            await t.click(await util.select(dropdownIcon));
            const editButtonXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div[@id='content']//div[@role='toolbar']//ul[@role='menu']/div[1]/li[@role='presentation']/a[@role='menuitem']`
            let editButton = xpath2css(editButtonXPathLocator);
            await util.select(editButton).with({ visibilityCheck: true })();
            await t.click(await util.select(editButton));
            break;
        } 
    }
    if (await util.equalsIgnoreCase(type, "Devices")){
        await deviceServicesPage.editDeviceService(query)
    }
    if (await util.equalsIgnoreCase(type, "Services")){
        if (serviceName.includes('IT')){
            await itServicesPage.editITService(query);
        } else {
            await businessServicesPage.editBusinessService(query);
        }
    }
    if (await util.equalsIgnoreCase(type, "Status Policy")){
        return ('Pending');
    }
    await t.wait(2000);
}

//validate service not available
export async function validateServiceNotPresent(name) {
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();
    const serviceNameLength = await util.select('div.table-row').count;
    logger.info("No of elements is: ", serviceNameLength);
    await validateServiceNameNotPresent(name, serviceNameLength);
}

//validate column headers
export async function validateColumnHeaders() {
    const nameColumnHeader = await util.select(nameColumnHeaderLocator).innerText;
    const descriptionHeaderText = await util.select(descriptionColumnHeaderLocator).innerText;
    const typeHeaderText = await util.select(typeColumnHeaderLocator).innerText;
    const organizationHeaderText = await util.select(organizationColumnHeaderLocator).innerText;
    const availabilityColumnHeader = await util.select(availabilityColumnHeaderLocator).innerText;
    const healthHeaderText = await util.select(healthColumnHeaderLocator).innerText;
    const riskHeaderText = await util.select(riskColumnHeaderLocator).innerText;
    const policyHeaderText = await util.select(policyColumnHeaderLocator).innerText;

    expect(nameColumnHeader).eqls('NAME');
    expect(descriptionHeaderText).eqls('DESCRIPTION');
    expect(typeHeaderText).eqls('TYPE');
    expect(organizationHeaderText).eqls('ORGANIZATION');
    expect(availabilityColumnHeader).eqls('AVAILABILITY');
    expect(healthHeaderText).eqls('HEALTH');
    expect(riskHeaderText).eqls('RISK');
    expect(policyHeaderText).eqls('POLICY');
}


//validate service name
export async function validateServiceName(name, type) {
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();    //expect create service button to be visible
    //await searchService(name);
    //await t.wait(3000);
    const rowLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", rowLength);
    const serviceName = name + ` ${type}`;
    //for loop around the table to check the service name on newly created service
    for (let i = 1; i <= rowLength + 1; i++) {
        if (i > rowLength) {
            logger.error("Cannot find the service name");
            throw new Error("Cannot find the service name");
        }
        let serviceNameExists = false;
        let serviceNameText = '';
        let serviceNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div/a/span[2]`
        let serviceNameLocator = xpath2css(serviceNameXPathLocator);
        if (await util.select(serviceNameLocator).exists) {
            serviceNameExists = true;
            serviceNameText = await util.select(serviceNameLocator).innerText;
            // console.log(`Name: ${serviceName}, ServiceName: ${serviceNameText}`);
            console.log("Service Name Text: ", serviceNameText.trim());
            console.log("Service Name: ", serviceName.trim());
            console.log("Does the service exist: ", serviceNameText.trim().includes(serviceName.trim()));
            //console.log(`Does the service exist: ${serviceNameText.toString().includes(serviceName.toString())}`);
        }
        if ((serviceNameExists) && serviceNameText.trim().includes(serviceName.trim())) {
            logger.info("Service Name found: ", serviceNameText);
            break;
        }
    }
}

//validate service type
export async function validateServiceType(type, length) {
    //for loop around the table to check the service type on newly created service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the device type element");
            throw new Error("Cannot find device type element");
        }
        let serviceTypeXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[3]/div[@id='content']`;
        let serviceTypeLocator = xpath2css(serviceTypeXpathLocator);
        const serviceTypeText = await util.select(serviceTypeLocator).innerText;
        if (await util.equalsIgnoreCase(serviceTypeText, type)) {
            logger.info("Service Type found", serviceTypeText)
            break;
        }
    }
}

//validate service description
export async function validateServiceDescription(description, length) {
    //for loop around the table to check for the description on newly created service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the description element");
            throw new Error("Cannot find element");
        }
        let descriptionXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[2]/div[@id='content']`;
        let descriptionLocator = xpath2css(descriptionXpathLocator);
        const descriptionText = await util.select(descriptionLocator).innerText;
        if (await util.equalsIgnoreCase(descriptionText, description)) {
            logger.info("Description found", descriptionText)
            break;
        }
    }
}


//validate service owner
export async function validateServiceOwner(owner, length) {
    //for loop around the table to check for the owner on newly created service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the service owner");
            throw new Error("Cannot find service owner");
        }
        let serviceOwnerXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[4]/div[@id='content']`
        let serviceOwnerLocator = xpath2css(serviceOwnerXpathLocator);
        const serviceOwnerText = await util.select(serviceOwnerLocator).innerText;
        if (await util.equalsIgnoreCase(serviceOwnerText, owner)) {
            logger.info("Service Owner found", serviceOwnerText)
            break;
        }
    }
}


export async function validatePolicyType(type, name, length) {
    //for loop to check for the right policy based on the service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the policy type");
            throw new Error("Cannot find policy type");
        }
        let policyTypeXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[8]/div[@id='content']/div/span//span[@class='policy-name']`
        let policyTypeLocator = xpath2css(policyTypeXpathLocator);
        const policyTypeText = await util.select(policyTypeLocator).innerText;
        const expectedPolicyTypeText =  type.toString() + " Policy"
        if (await util.equalsIgnoreCase(name, "default")){
            if (await util.equalsIgnoreCase(policyTypeText, expectedPolicyTypeText)) {
                logger.info("Policy Type found", policyTypeText)
                break;
            }
        } else {
            if (await util.equalsIgnoreCase(policyTypeText, name)) {
                logger.info("Policy Type found", policyTypeText)
                break;
            }
        }
    }
}

//validate service name is not present
export async function validateServiceNameNotPresent(name, type, length) {
    let serviceName =  name + ` ${type}`;
    //for loop around the table to check the service name if it is present
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.info("Cannot find the service name");
            return true;
        }
        let serviceNameExists = false;
        let serviceNameText = '';
        let serviceNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div/a/span[2]`
        let serviceNameLocator = xpath2css(serviceNameXPathLocator);
        if (await util.select(serviceNameLocator).exists) {
            serviceNameExists = true;
            serviceNameText = await util.select(serviceNameLocator).innerText;
        }
        if ((serviceNameExists) && serviceNameText.trim().includes(serviceName.trim())) {
            logger.error("Service Name found: ", deviceNameText);
            return false;
        }
    }
}

//search with the service name
export async function searchService(name) {
// exports.searchService = async (name) => {
    await t.click(await util.select(searchQueryTextBoxLocator));
    let searchQuery = `name: ${name}`
    await t.typeText(await util.select(searchQueryTextBoxLocator), searchQuery);
    await t.wait(2000);
}

//validate service name
export async function goToService(name, type) {
// exports.goToService = async (name, type) => {
    let serviceName = name + ` ${type}`
    const rowLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", rowLength);
    //for loop around the table to check the service name on newly created service
    for (let i = 1; i <= rowLength + 1; i++) {
        if (i > rowLength) {
            logger.error("Cannot find the service name");
            throw new Error("Cannot find the service name");
        }
        let serviceNameExists = false;
        let serviceNameText = '';
        let serviceNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div/a/span[2]`
        let serviceNameLocator = xpath2css(serviceNameXPathLocator);
        if (await util.select(serviceNameLocator).exists) {
            serviceNameExists = true;
            serviceNameText = await util.select(serviceNameLocator).innerText;
        }
        if ((serviceNameExists) && serviceNameText.trim().includes(serviceName.trim())) {
            console.log(`Name: ${serviceName}, ServiceName: ${serviceNameText}`);
            console.log(`Does the service exist: ${serviceNameText.trim().includes(serviceName.trim())}`);
            logger.info("Service Name found: ", serviceNameText);
            await t.click(await util.select(serviceNameLocator));
            await t.wait(2000);
            break;
        }
    }
}
