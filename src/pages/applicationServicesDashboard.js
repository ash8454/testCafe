var expect = require('chai').expect;
const { t } = require('testcafe')
const basePage = require('./basePage');
const util = require('../support/helper');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
const applicationsPage = require('./applicationsPage');
var xpath2css = require('xpath2css');
require('events').EventEmitter.defaultMaxListeners = Infinity;


//Selectors
const searchTextBoxXpathLocator = '//*[@id="inventory-content"]/div/div/div/div[1]/div/div[1]/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const searchTextBoxLocator = xpath2css(searchTextBoxXpathLocator)
const applicationsLeftNavIconLocator = '#nav-applications';
const searchQueryDropdownOptionXpathLocator = '//*[@id="inventory-content"]/div/div/div/div[1]/div/div[1]/div/div[1]/div[1]/ul/li[1]/div[2]'
const searchQueryDropdownOptionLocator = xpath2css(searchQueryDropdownOptionXpathLocator)
const applicationsDashboardSettingsIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div[1]/div/div[1]/div/div[1]/div[2]/div/a[2]/div/div[1]/i'
const applicationsDashboardSettingsIconLocator = xpath2css(applicationsDashboardSettingsIconXpathLocator)
const clearSearchButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div/div[1]/div/div[1]/div/div[1]/div[2]/div/a[2]/div/div[2]/div[2]'
const clearSearchButtonLocator = xpath2css(clearSearchButtonXpathLocator)


//validate application dashboard page
export async function validateApplicationDashboardPage() {
    //elements
    const searchApplicationsTxtBox = await util.select(searchTextBoxLocator);
    const createApplicationButton = await util.select('span').withText('Create Application');
    //validate common page elements
    await basePage.validateCommonPageElements('Create Application');
    //validate appliation page
    await t
        .expect(searchApplicationsTxtBox.exists).ok()
        .expect(createApplicationButton.exists).ok();
    //validate the column headers
    await util.validateColumnHeaders();
    await t.wait(2000);
}

//validate application and application component
export async function validateApplicationAndComponentName(name, query1, query2, query3) {
    let searchString= name.substring(name.indexOf(' '), name.length).trim();
    console.log(searchString);
    await validateApplicationName(searchString);
    await goToApplication(name);
    await applicationsPage.validateApplicationPage(name);
}

//validate application name
export async function validateApplicationName(name) {
    if (!await util.select('span').withText('Create Application')){
        const applicationsLeftNavIcon = await util.select(applicationsLeftNavIconLocator);
        //await t.expect(applicationsLeftNavIcon.exists).ok();
        await t.click(applicationsLeftNavIcon);    
    }
    const createApplicationButton = await util.select('span').withText('Create Application');
    await t.expect(await util.select(createApplicationButton).exists).ok();
    await searchApplication(name);
    const rowLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", rowLength);
    const applicationName = name;
    //for loop around the table to check the application name on newly created application
    for (let i = 1; i <= rowLength + 1; i++) {
        if (i > rowLength) {
            logger.error("Cannot find the application or component name");
            throw new Error("Cannot find the application or component name");
        }
        let applicationNameExists = false;
        let applicationNameText = '';
        let applicationNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div[@id="content"]/a/span[2]`
        let applicationNameLocator = xpath2css(applicationNameXPathLocator);
        if (await util.select(applicationNameLocator).exists) {
            applicationNameExists = true;
            applicationNameText = await util.select(applicationNameLocator).innerText;
            console.log(`Name: ${applicationName}, ApplicationName: ${applicationNameText}`);
            console.log(`Does the application or Component exist: ${applicationNameText.trim().includes(applicationName.trim())}`);
        }
        if ((applicationNameExists) && applicationNameText.trim().includes(applicationName.trim())) {
            logger.info("Application or Component Name found: ", applicationNameText);
            break;
        }
    }
}

//search for application name
export async function searchApplication(name) {    
    await t.expect(await util.select(applicationsDashboardSettingsIconLocator).exists).ok();
    await t.click(await util.select(applicationsDashboardSettingsIconLocator))
    await t.expect(await util.select(clearSearchButtonLocator).exists).ok();
    await t.click(await util.select(clearSearchButtonLocator));
    await t.wait(2000);
    await t.click(await util.select(searchTextBoxLocator));
    let searchQuery = `${name}`
    await t.typeText(await util.select(searchTextBoxLocator), searchQuery);
    await t.wait(2000);
    await t.expect(await util.select(searchQueryDropdownOptionLocator).exists).ok();
    await t.click(await util.select(searchQueryDropdownOptionLocator));
    await t.wait(2000);
}


//go to application
export async function goToApplication(name) {    
    if (!await util.select('span').withText('Create Application')){
        const applicationsLeftNavIcon = await util.select(applicationsLeftNavIconLocator);
        //await t.expect(applicationsLeftNavIcon.exists).ok();
        await t.click(applicationsLeftNavIcon);    
    }
    const createApplicationButton = await util.select('span').withText('Create Application');
    await t.expect(await util.select(createApplicationButton).exists).ok();
    //await searchApplication(name);
    const rowLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", rowLength);
    const applicationName = name;
    //for loop around the table to check the application name on newly created application
    for (let i = 1; i <= rowLength + 1; i++) {
        if (i > rowLength) {
            logger.error("Cannot find the application or component name");
            throw new Error("Cannot find the application or component name");
        }
        let applicationNameExists = false;
        let applicationNameText = '';
        let applicationNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div[@id="content"]/a/span[2]`
        let applicationNameLocator = xpath2css(applicationNameXPathLocator);
        if (await util.select(applicationNameLocator).exists) {
            applicationNameExists = true;
            applicationNameText = await util.select(applicationNameLocator).innerText;
            console.log(`Name: ${applicationName}, ApplicationName: ${applicationNameText}`);
            console.log(`Does the application or Component exist: ${applicationNameText.trim().includes(applicationName.trim())}`);
        }
        if ((applicationNameExists) && applicationNameText.trim().includes(applicationName.trim())) {
            logger.info("Application or Component Name found: ", applicationNameText);
            await t.click(await util.select(applicationNameLocator));
            await t.expect(await util.select('a').withText('Application Components').exists).ok();
            break;
        }
    }
}

//Delete Application
export async function deleteApplication(name) {   
    const createApplicationButton = await util.select('span').withText('Create Application');
    await t.expect(createApplicationButton.exists).ok();    //expect create service button to be visible
    await searchApplication(name)
    const applicationNameLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", applicationNameLength);
    //for loop to edit the business service by name
    for (let i = 1; i <= applicationNameLength + 1; i++) {
        console.log("Iteration: ", i);
        if (i > applicationNameLength) {
            logger.info("Deleted the service including name: ", name);
            break;
        }
        let applicationNameXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[1]/div/a/span[2]`
        let applicationNameLocator = xpath2css(applicationNameXPathLocator);
        let applicationNameExists = false;
        let applicationNameText = '';
        if (await util.select(applicationNameLocator).exists){
            applicationNameExists = true;
            applicationNameText = await util.select(applicationNameLocator).innerText;
        }
        if ((applicationNameExists) && applicationNameText.trim().includes(name.trim())) {
            logger.info("Service Name found", applicationNameText);
            //[@id='content']//div[@role='toolbar']//i
            const dropdownIconXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div[@id="content"]/div/div/div/div/i`
            let dropdownIcon = xpath2css(dropdownIconXpathLocator)
            await t.click(await util.select(dropdownIcon));
            await t.wait(1000);
            const deleteButtonXpathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div[@id='content']/div/div/div/div/ul/div[5]/li/a`
            //const deleteButtonXPathLocator = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[9]/div[@id='content']//div[@role='toolbar']//ul[@role='menu']/div[5]/li[@role='presentation']/a[@role='menuitem']`
            let deleteButton = xpath2css(deleteButtonXpathLocator);
            //await util.select(deleteButton).with({ visibilityCheck: true })();
            await t.click(await util.select(deleteButton));
            await t.wait(2000);
            let deleteConfirmButton = await util.select('span').withText('Delete');
            await util.select(deleteConfirmButton).with({ visibilityCheck: true })();
            await t.click(await util.select(deleteConfirmButton));
            await t.wait(4000);
            i = 0;
        } 
    }
    await util.select(searchTextBoxLocator).with({ visibilityCheck: true })();
}


//check if is service present
export async function validateApplicationNotPresent(name) {   
    const serviceNameLength = await util.select('div.table-row').count;
    console.log("No of elements is: ", serviceNameLength);
    const serviceNameText = await util.select('span').withText(name);
    await t.expect(await util.select(serviceNameText).exists).notOk();
}

//check if application and component is present
export async function validateApplicationComponentNotPresent(name) {   
    await t.expect(await util.select(applicationsDashboardSettingsIconLocator).exists).ok();
    await t.click(await util.select(applicationsDashboardSettingsIconLocator))
    validateApplicationNotPresent(name);
    validateApplicationNotPresent('Static AutoComponent');
    validateApplicationNotPresent('Dynamic AutoComponent');
}