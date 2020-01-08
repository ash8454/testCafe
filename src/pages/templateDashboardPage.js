var expect = require('chai').expect;
const { t } = require('testcafe')
const util = require('../support/helper');
var log4js = require('log4js');
var logger = log4js.getLogger('app');
var xpath2css = require('xpath2css');
const businessServiceDashboardPage = require('./businessServicesDashboard');
require('events').EventEmitter.defaultMaxListeners = Infinity;

//Locators
const scienceLogicLogoLocator = 'svg[title="ScienceLogic Logo"]'
const userLabelXpathLocator = '//*[@id="account-login"]/span[1]'
const userLabelLocator = xpath2css(userLabelXpathLocator);
const admindropdownXpathLocator = '//*[@id="account-login"]/span[1]/svg/path[1]'
const adminDropdownLocator = xpath2css(admindropdownXpathLocator);
const settingsIconXpathLocator = '//*[@id="settings-content"]/div/div[1]/div/div[1]/div[2]/div/a[2]/div/div[1]/i'
const settingsIconLocator = xpath2css(settingsIconXpathLocator);
const hamburgerIconXpathLocator = '//*[@id="settings-content"]/div/div[1]/div/div[1]/div[2]/div/a[1]/div/div[1]/i'
const hamburgerIconLocator = xpath2css(hamburgerIconXpathLocator);
const searchTextboxXpathLocator = '//*[@id="settings-content"]/div/div[1]/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const searchTextboxLocator = xpath2css(searchTextboxXpathLocator);
const nameColumnHeaderXpathLocator = '//div[@id="tableView"]//div[@class="header"]/div[1]/div[@class="cell-content"]/div'
const nameColumnHeaderLocator = xpath2css(nameColumnHeaderXpathLocator)
const typeColumnHeaderXpathLocator = '//div[@id="tableView"]//div[@class="header"]/div[2]/div[@class="cell-content"]/div'
const typeColumnHeaderLocator = xpath2css(typeColumnHeaderXpathLocator)
const descriptionColumnHeaderXpathLocator = '//div[@id="tableView"]//div[@class="header"]/div[3]/div[@class="cell-content"]/div'
const descriptionColumnHeaderLocator = xpath2css(descriptionColumnHeaderXpathLocator)
const newServiceTextboxLocator = 'input#sessionName-input'
const newServiceDescriptionLocator = 'input#description'
const ownerDropdownXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[3]/div[1]'
const ownerDropdownLocator = xpath2css(ownerDropdownXpathLocator)
const ownerOptionsXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[3]/div[2]/ul/div/div/li[1]'
const ownerOptionsLocator = xpath2css(ownerOptionsXpathLocator)
const serviceImg = 'img[role="presentation"]'
const templateHamburgerIconXpathLocator = '//div[@id="app"]/div/div[1]/div[1]/header/div/div[1]/button[@type="button"]'
const templateHamburgerIconLocator = xpath2css(templateHamburgerIconXpathLocator)
const templatesLinkXpathLocator = '//*[@id="drawer-item-service-templates"]/div/span'
const templatesLinkLocator = xpath2css(templatesLinkXpathLocator)
const templatePageQueryTextboxXpathLocator = '//*[@id="settings-content"]/div/div[1]/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const templatePageQueryTextboxLocator = xpath2css(templatePageQueryTextboxXpathLocator)


//navigate to template page
export async function navigateToTemplateDashboardPage() {
// exports.navigateToTemplateDashboardPage = async () => {
    if (!await util.select(templatesLinkLocator).exists) {
        await t.click(await util.select(templateHamburgerIconLocator));
        await t.expect(await util.select('span').withText('Templates').exists).ok();
    }
    const templatesLink = await util.select('span').withText('Templates');
    await t.expect(templatesLink.exists).ok();
    await t.click(templatesLink)         //click templates link on left nav
    const templatesPageTitle = await util.select('h6').withText('Templates');
    await t.expect(templatesPageTitle.exists).ok();    //expect templates page title
}

//validate template dashboard page
export async function validateTemplateDashboardPage() {
    //elements
    await util.select(scienceLogicLogoLocator).with({ visibilityCheck: true })();
    //await t.expect(await util.select(scienceLogicLogoLocator).exists).ok();
    //await t.expect(await util.select(adminDropdownLocator).exists).ok();
    await t.expect(await util.select(settingsIconLocator).exists).ok();
    await t.expect(await util.select(hamburgerIconLocator).exists).ok();
    await t.expect(await util.select(searchTextboxLocator).exists).ok();
    await validateColumnHeaders();
}

//validate the new template
export async function validateNewTemplate(name, type) {
    const rowLength = await util.select('div.table-row').count;
    logger.info("No of elements is: ", rowLength);
    let templateName = name + 'Template'
    //validate the template name
    await validateTemplateName(templateName, rowLength);
    await validateServiceType(type, rowLength);
    await validateServiceDescription(templateName, rowLength);
}

//validate the new template
export async function createServiceFromTemplate(name, type) {
    const rowLength = await util.select('div.table-row').count;
    logger.info("No of elements is: ", rowLength);
    await clickCreateServiceForTemplate(name, rowLength);
    await completeTemplateDetails(type);
}

export async function validateTemplateService(type) {
    const rowLength = await util.select('div.table-row').count;
    await validateTemplateServiceName(type, rowLength);
}

//validate the new template
export async function validateTemplateNotPresent(name) {
    const length = await util.select('div.table-row').count;
    logger.info("No of elements is: ", length);
    let templateName =  name;
    //for loop around the table to check the service name if it is present
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.info("Cannot find the service name");
            return true;
        }
        let templateNameExists = false;
        let templateNameText = '';
        let templateNameXPathLocator = `//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[${i}]/div/div[1]/div[@id="content"]`
        let templateNameLocator = xpath2css(templateNameXPathLocator);
        if (await util.select(templateNameLocator).exists) {
            templateNameExists = true;
            templateNameText = await util.select(templateNameLocator).innerText;
        }
        if ((templateNameExists) && templateNameText.trim().includes(templateName.trim())) {
            logger.error("Service Name found: ", templateNameText);
            return false;
        }
    }
}

//delete template
export async function deleteTemplate(name) {
    //await businessServiceDashboardPage.searchService('Template');
    await t.wait(3000);
    //let serviceName = `Automation Template ${type}`;
    const length = await util.select('div.table-row').count;
    logger.info("No of elements is: ", length);
    //for loop around the table to check the service name on newly created service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.info("Deleted the template with name:  ", name);
            break;
        }
        let templateNameExists = false;
        let templateNameText = '';
        let templateNameXpathLocator = `//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[${i}]/div/div[1]/div[@id="content"]`
        let templateNameLocator = xpath2css(templateNameXpathLocator)
        if (await util.select(templateNameLocator).exists) {
            templateNameExists = true;
            templateNameText = await util.select(templateNameLocator).innerText;
            console.log(templateNameText);
        }
        if ((templateNameExists) && templateNameText.trim().includes(name.trim())) {
            logger.info("Template Name found: ", templateNameText);
            let dropdownIconXpathSelector = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[4]/div[@id="content"]/button`
            let dropdownIcon = xpath2css(dropdownIconXpathSelector);
            if (!await util.select(dropdownIcon).exists) {
                dropdownIconXpathSelector = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[4]/div[@id='content']//div[@role='toolbar']//i`
                dropdownIcon = xpath2css(dropdownIconXpathSelector)
            }
            await t.click(await util.select(dropdownIcon));
            let deleteTemplateButtonXpathSelector = '//div[@role="tooltip"]/div/div/li[2]'
            let deleteTemplateButtonLocator = xpath2css(deleteTemplateButtonXpathSelector)
            if (!await util.select(deleteTemplateButtonLocator).exists) {
                deleteTemplateButtonLocator = 'div > li:nth-of-type(2)'
            }
            await t.wait(1000);
            await t.click(await util.select(deleteTemplateButtonLocator));
            await util.select('span').withText('Delete Template').with({ visibilityCheck: true })();
            await clickDeleteButton();
            await t.wait(2000);
            i = 0;
        }
    }
}

//validate column headers
export async function validateColumnHeaders() {
    const nameColumnHeader = await util.select(nameColumnHeaderLocator).innerText;
    const descriptionHeaderText = await util.select(descriptionColumnHeaderLocator).innerText;
    const typeHeaderText = await util.select(typeColumnHeaderLocator).innerText;
    expect(nameColumnHeader).eqls('NAME');
    expect(descriptionHeaderText).eqls('DESCRIPTION');
    expect(typeHeaderText).eqls('TYPE');
}

//validate service name
export async function validateTemplateName(name, length) {
    //for loop around the table to check the service name on newly created service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the template name");
            throw new Error("Cannot find the template name");
        }
        let templateNameExists = false;
        let templateNameText = '';
        let templateNameXpathLocator = `//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[${i}]/div/div[1]/div[@id="content"]`
        let templateNameLocator = xpath2css(templateNameXpathLocator)
        if (await util.select(templateNameLocator).exists) {
            templateNameExists = true;
            templateNameText = await util.select(templateNameLocator).innerText;
        }
        if ((templateNameExists) && util.equalsIgnoreCase(templateNameText, name)) {
            logger.info("Template Name found: ", templateNameText);
            break;
        }
    }
}

//validate service type
export async function validateServiceType(type, length) {
    //for loop around the table to check the service type on newly created service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the template type element");
            throw new Error("Cannot find template type element");
        }
        let serviceTypeXpathLocator = `//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[${i}]/div/div[2]/div[@id="content"]`
        let serviceTypeLocator = xpath2css(serviceTypeXpathLocator)
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
            logger.error("Cannot find the template description element");
            throw new Error("Cannot find template description element");
        }
        let deviceDescriptionXpathLocator = `//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[${i}]/div/div[3]/div[@id="content"]`
        let deviceDescriptionLocator = xpath2css(deviceDescriptionXpathLocator)
        const descriptionText = await util.select(deviceDescriptionLocator).innerText;
        if (await util.equalsIgnoreCase(descriptionText, description)) {
            logger.info("Description found", descriptionText)
            break;
        }
    }
}


//create Service from template
export async function clickCreateServiceForTemplate(name, length) {
    //for loop around the table to check the service name on newly created service
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the template name");
            throw new Error("Cannot find the template name");
        }
        let templateNameExists = false;
        let templateNameText = '';
        let templateNameXpathLocator = `//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[${i}]/div/div[1]/div[@id="content"]`
        let templateNameLocator = xpath2css(templateNameXpathLocator)
        if (await util.select(templateNameLocator).exists) {
            templateNameExists = true;
            templateNameText = await util.select(templateNameLocator).innerText;
            console.log(templateNameText);
        }
        if ((templateNameExists) && templateNameText.trim().includes(name.trim())) {
            logger.info("Template Name found: ", templateNameText);
            let dropdownIconXpathSelector = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[4]/div[@id="content"]/button`
            let dropdownIcon = xpath2css(dropdownIconXpathSelector);
            if (!await util.select(dropdownIcon).exists) {
                dropdownIconXpathSelector = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[4]/div[@id='content']//div[@role='toolbar']//i`
                dropdownIcon = xpath2css(dropdownIconXpathSelector)
            }
            await t.click(await util.select(dropdownIcon));
            let createServiceXpathSelector = `//div[@id='tableView']/div[@class='table-body']/div/div/div/div[${i}]/div/div[4]/div[@id='content']/div/div/div/div/ul/div[1]/li/a`
            let createServiceButtonLocator = xpath2css(createServiceXpathSelector)
            if (!await util.select(createServiceButtonLocator).exists) {
                createServiceButtonLocator = 'div > li:nth-of-type(1)'
            }
            await t.wait(1000);
            await t.click(await util.select(createServiceButtonLocator));
            await util.select(newServiceTextboxLocator).with({ visibilityCheck: true })();
            break;
        }
    }
}

//fill out the service details
export async function completeTemplateDetails(type) {
    await util.select(newServiceTextboxLocator).with({ visibilityCheck: true })();
    await t.click(await util.select(newServiceTextboxLocator));
    await t.pressKey('ctrl+a delete');
    let serviceName = `Automation Template ${type}${util.getRandomInt(1, 100)}`;
    await t.typeText(newServiceTextboxLocator, serviceName);
    await t.click(await util.select(ownerDropdownLocator));
    await t.wait(1000);
    await util.select(ownerOptionsLocator).with({ visibilityCheck: true })();
    await t.click(await util.select(ownerOptionsLocator));
    await t.wait(1000);
    let nextButton = await util.select('button').withText('Next');
    await util.select(nextButton).with({ visibilityCheck: true })();
    await t.click(await util.select(nextButton));
    let createServiceFromTemplateButton = await util.select('button').withText('Create Service from Template');
    await t.click(await util.select(createServiceFromTemplateButton));
    let closeButton = await util.select('span').withText('Close');
    await util.select(closeButton).with({ visibilityCheck: true })();
    await t.expect(await util.select(serviceImg).exists).ok();
    await t.expect(await util.select('div').withText('Create Service from').exists).ok();
    await t.expect(await util.select('div').withText('Generated a').exists).ok();
    await t.click(await util.select(closeButton));
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();
    await t.wait(3000);
}

//validate template service name
export async function validateTemplateServiceName(type, length) {
    await businessServiceDashboardPage.searchService('Template');
    await t.wait(3000);
    let serviceName = `Automation Template ${type}`;
    const serviceNameLength = await util.select('div.table-row').count;
    logger.info("No of elements is: ", serviceNameLength);
    const serviceNameLink = await util.select('span').withText(serviceName);
    await t.expect(serviceNameLink.exists).ok();
}

//Click Delete button
export async function clickDeleteButton() {
    await t.expect(await util.select('span').withText('Delete Template').exists).ok();
    await t.expect(await util.select('h4').withText('Delete Template').exists).ok();
    await t.expect(await util.select('div').withText('Are you sure you want to delete this').exists).ok();
    await t.click(await util.select('span').withText('Delete Template'));
    await t.wait(1000);
}

// //validate service name is not present
// export async function validateTemplateNotPresent(name) {
//     let templateName =  name;
//     //for loop around the table to check the service name if it is present
//     for (let i = 1; i <= length + 1; i++) {
//         if (i > length) {
//             logger.info("Cannot find the service name");
//             return true;
//         }
//         let templateNameExists = false;
//         let templateNameText = '';
//         let templateNameXPathLocator = `//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[${i}]/div/div[1]/div[@id="content"]`
//         let templateNameLocator = xpath2css(templateNameXPathLocator);
//         if (await util.select(templateNameLocator).exists) {
//             templateNameExists = true;
//             templateNameText = await util.select(templateNameLocator).innerText;
//         }
//         if ((templateNameExists) && templateNameText.includes(templateName)) {
//             logger.error("Service Name found: ", templateNameText);
//             return false;
//         }
//     }
// }