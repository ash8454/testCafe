var expect  = require('chai').expect;
const util = require('../support/helper');
const deviceServicesPage = require('./deviceServicesPage');
const itServicePage = require('./itServicePage');
const businessServicePage = require('./businessServicePage');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var xpath2css = require('xpath2css');
const { t } = require('testcafe')
require('events').EventEmitter.defaultMaxListeners = Infinity;

//ELEMENT LOCATORS
//step 1
const applicationNameTextboxLocator = 'input#application-name'
const applicationDescriptionLocator = '[rows]'
const ownerDropdownXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[1]/div/div[3]/div[1]/i'
const ownerDropdownLocator = xpath2css(ownerDropdownXpathLocator)
const systemOptionsXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[1]/div/div[3]/div[2]/ul/div/div/li[1]'
const systemOptionsLocator =xpath2css(systemOptionsXpathLocator)
const nextButton = 'button#next-button'

//step 2
const searchTextBoxXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const searchTextBoxLocator = xpath2css(searchTextBoxXpathLocator)
const closeButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[1]/div/a/div'
const closeButtonLocator = xpath2css(closeButtonXpathLocator)
const hamburgerIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[1]/div[2]/div/a[1]/div/div[1]/i'
const hamburgerIconLocator = xpath2css(hamburgerIconXpathLocator)
const settingsIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[1]/div[2]/div/a[2]/div/div[1]/i'
const settingsIconLocator = xpath2css(settingsIconXpathLocator)
const previewNameXpathLocator = '//*[@id="tableView"]/div[2]/div/div[1]/div[1]/div'
const previewNameLocator = xpath2css(previewNameXpathLocator)
const previewTypeXpathLocator = '//*[@id="tableView"]/div[2]/div/div[2]/div[1]/div'
const previewTypeLocator = xpath2css(previewTypeXpathLocator)
const nodeCountTypeXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[2]/div[@class="table-wrapper"]/div[@id="tableView"]//div[@class="header"]/div[1]/div[@class="cell-content"]/div'
const nodeCountTypeLocator = xpath2css(nodeCountTypeXpathLocator)
const itemsFoundXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[2]/div[@class="table-wrapper"]/div[@id="tableView"]/div[2]/div/div[2]/div[1]/div'
const itemsFoundLocator = xpath2css(itemsFoundXpathLocator)
const devicesImgLocator = 'img[src="/images/devices.svg"]'
const nodesImgLocator = 'img[src="/images/map.svg"]'
const searchTextBoxOptionXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]//div[@class="inventory-search"]/div/div[1]/div[1]/ul/li[1]/div[2]'
const searchTextBoxOptionLocator = xpath2css(searchTextBoxOptionXpathLocator)
const itemsFoundTypeXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div[@class="multi-step"]/div[1]/div[2]/div[2]/div[@class="table-wrapper"]/div[@id="tableView"]/div[@class="table-body"]/div/div/div/div/div/div[1]/div[@id="content"]'
const itemsFoundTypeLocator = xpath2css(itemsFoundTypeXpathLocator)
const itemsFoundCountXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div[@class="multi-step"]/div[1]/div[2]/div[2]/div[@class="table-wrapper"]/div[@id="tableView"]/div[@class="table-body"]/div/div/div/div/div/div[2]/div[@id="content"]'
const itemsFoundCountLocator = xpath2css(itemsFoundCountXpathLocator)


//step 3
const deviceCanvasXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div/canvas[3]'
const deviceCanvasLocator = xpath2css(deviceCanvasXpathLocator)
const includeSelectedApplicationButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[1]/button'
const includeSelectedApplicationButton = xpath2css(includeSelectedApplicationButtonXpathLocator)

//step 4
const applicationComponentNameTextBoxXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[3]/div/div/section/section/div[1]/input'
const applicationComponentNameTextBoxLocator = xpath2css(applicationComponentNameTextBoxXpathLocator)
const applicationComponentDescriptionTextBoxXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[3]/div/div/section/section//textarea'
const applicationComponentDescriptionTextBoxLocator = xpath2css(applicationComponentDescriptionTextBoxXpathLocator)
const dynamicToggleButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[3]/div/div/section/section/div[3]/div/div/div'
const dynamicToggleButtonLocator = xpath2css(dynamicToggleButtonXpathLocator);
const saveComponentButtonXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[3]/div/div/div[2]/button/span[1]'
const saveComponentButtonLocator = xpath2css(saveComponentButtonXpathLocator);
const staticItemIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[3]/div/section/div[2]/div//div'
const staticItemIconLocator = xpath2css(staticItemIconXpathLocator)
const appComponentImageLocator = 'img[src="/images/ai_ops.svg"]'
const deviceItemOneXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/section/div[2]/table/tbody/tr/td[3]'
const deviceItemOneLocator = xpath2css(deviceItemOneXpathLocator)
const deviceItemTwoXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/section/div[2]/table/tbody/tr/td[3]'
const deviceItemTwoLocator = xpath2css(deviceItemTwoXpathLocator)
const applicationComponentBoxOneXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[3]/div/section/div[2]/div/div'
const applicationComponentOneLocator = xpath2css(applicationComponentBoxOneXpathLocator)
const deviceItemXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[3]/div/section/div[2]/div/span/div'
const deviceItemLocator= xpath2css(deviceItemXpathLocator)
const alertTextLocator = 'div[role="alert"]'
const saveButtonLocator= 'button[id="next-button"]'
const componentDeviceQueryTextboxXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[3]/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const componentDeviceQueryTextboxLocator = xpath2css(componentDeviceQueryTextboxXpathLocator)
const addDynamicComponentModalHamburgerIconXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div[@class="multi-step"]/div[1]/div[3]/div/div/div[2]/div[1]/div[2]/div[1]/div[2]/div/a[1]/div/div[1]/i'
const addDynamicComponentModalHamburgerIconLocator = xpath2css(addDynamicComponentModalHamburgerIconXpathLocator)
const addDynamicComponentSettingsIconXpathLocator = '//div[@id="inventory-content"]/div/div/div/div/div[2]/div[@class="multi-step"]/div[1]/div[3]/div/div/div[2]/div[1]/div[2]/div[1]/div[2]/div/a[2]/div/div[1]/i'
const addDynamicComponentSettingsIconLocator = xpath2css(addDynamicComponentSettingsIconXpathLocator)
const addDynamicComponentNameColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[1]/div[1]/div'
const addDynamicComponentNameColumnLocator = xpath2css(addDynamicComponentNameColumnXpathLocator);
const addDynamicComponentStateColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[2]/div[1]/div'
const addDynamicComponentStateColumnLocator = xpath2css(addDynamicComponentStateColumnXpathLocator);
const addDynamicComponentIpAddressColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[3]/div[1]/div'
const addDynamicComponentIpAddressColumnLocator = xpath2css(addDynamicComponentIpAddressColumnXpathLocator);
const addDynamicComponentCategoryColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[4]/div[1]/div'
const addDynamicComponentCategoryColumnLocator = xpath2css(addDynamicComponentCategoryColumnXpathLocator);
const addDynamicComponentClassColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[5]/div[1]/div'
const addDynamicComponentClassColumnLocator = xpath2css(addDynamicComponentClassColumnXpathLocator);
const addDynamicComponentSubClassColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[6]/div[1]/div'
const addDynamicComponentSubClassColumnLocator = xpath2css(addDynamicComponentSubClassColumnXpathLocator);
const addDynamicComponentOrganizationColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[7]/div[1]/div'
const addDynamicComponentOrganizationColumnLocator = xpath2css(addDynamicComponentOrganizationColumnXpathLocator);
const addDynamicComponentIDColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[8]/div[1]/div'
const addDynamicComponentIDColumnLocator = xpath2css(addDynamicComponentIDColumnXpathLocator);
const addDynamicComponentSaveButtonLocator = 'button > span'
const dynamicItemXpathLocator = '//div[@id="tableView"]/div[@class="table-body"]/div/div//div[@class="table-row"]/div[2]/div[@id="content"]/div/span[2]'
const dynamicItemLocator = xpath2css(dynamicItemXpathLocator)

//Add Device
const addDeviceTextboxXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/div[2]/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const addDeviceTextboxLocator = xpath2css(addDeviceTextboxXpathLocator)
const addDeviceHamburgerIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/div[2]/div[1]/div[2]/div/a[1]/div/div[1]/i'
const addDeviceHamburgerIconLocator = xpath2css(addDeviceHamburgerIconXpathLocator)
const addDeviceSettingsIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/div[2]/div[1]/div[2]/div/a[2]/div/div[1]/i'
const addDeviceSettingsIconLocator = xpath2css(addDeviceSettingsIconXpathLocator)
const closeDeviceModalIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[1]/div/a/div'
const closeDeviceModalIconLocator = xpath2css(closeDeviceModalIconXpathLocator)
////div[@id='tableView']//div[@class='header']/div[2]/div[@class='cell-content']/div
const addDeviceNameColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[2]/div[1]/div'
const addDeviceNameColumnLocator = xpath2css(addDeviceNameColumnXpathLocator)
const addDeviceStateColumnXpathLocator = '//*[@id="tableView"]/div[2]/div/div[3]/div[1]/div'
const addDeviceStateColumnLocator = xpath2css(addDeviceStateColumnXpathLocator)
const addDeviceIpAddressXpathLocator = '//*[@id="tableView"]/div[2]/div/div[4]/div[1]/div'
const addDeviceIpAddressColumnLocator = xpath2css(addDeviceIpAddressXpathLocator)
const addDeviceCategoryXpathLocator = '//*[@id="tableView"]/div[2]/div/div[5]/div[1]/div'
const addDeviceCategoryColumnLocator = xpath2css(addDeviceCategoryXpathLocator)
const addDeviceClassXpathLocator = '//*[@id="tableView"]/div[2]/div/div[6]/div[1]/div'
const addDeviceClassColumnLocator = xpath2css(addDeviceClassXpathLocator)
const addDeviceSubClassXpathLocator = '//*[@id="tableView"]/div[2]/div/div[7]/div[1]/div'
const addDeviceSubClassColumnLocator = xpath2css(addDeviceSubClassXpathLocator)
const addDeviceOrganizationXpathLocator = '//*[@id="tableView"]/div[2]/div/div[8]/div[1]/div'
const addDeviceOrganizationLocator = xpath2css(addDeviceOrganizationXpathLocator)
const addDeviceIdXpathLocator = '//*[@id="tableView"]/div[2]/div/div[9]/div[1]/div'
const addDeviceIdLocator = xpath2css(addDeviceIdXpathLocator)
const addDeviceSearchTextBoxXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/div[2]/div[1]/div[1]/div/div/div/div[2]/div/div/div/div'
const addDeviceSearchTextBoxLocator = xpath2css(addDeviceSearchTextBoxXpathLocator)
const addDeviceSearchOptionXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[1]/div/div[2]/div[1]/div[2]/div[1]/div[1]/ul/li[1]/div'
const addDeviceSearchOptionLocator = xpath2css(addDeviceSearchOptionXpathLocator)
const addDeviceCheckboxXpathLocator = '//div[@id="tableView"]/div[@class="table-body"]/div/div/div/div[1]/div/div[1]/div[1]'
const addDeviceCheckboxLocator = xpath2css(addDeviceCheckboxXpathLocator)
const addDeviceAddButtonLocator = 'button > span'
const addSectionOneXpathLocator = '//*[@id="tableView"]/div[1]'
const addSectionOneLocator = xpath2css(addSectionOneXpathLocator)
const addSectionTwoXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[3]/div/section[2]'
const addSectionTwoLocator = xpath2css(addSectionTwoXpathLocator)


//navigate to new services page
export async function navigateToNewApplicationsPage() {  
    const createApplicationButton = await util.select('span').withText('Create Application');
    await t.expect(createApplicationButton.exists).ok();    //expect create service button to be visible
    await t.click(createApplicationButton);
    await t.expect(await util.select(applicationNameTextboxLocator)).ok();
}

//validate new services page
export async function validateNewApplicationsPage() {  
    await t.expect(await util.select(applicationNameTextboxLocator)).ok(); 
    await t.expect(await util.select('div').withText('Create Application').exists).ok();
    await t.expect(await util.select('h2').withText('Creating an Application').exists).ok();
    await t.expect(await util.select('h3').withText('Step 1: Application Info').exists).ok();
    await t.expect(await util.select('p').withText('Information about step 1 of creating an application, name, description and organization…').exists).ok();
    await t.expect(await util.select('h3').withText('Step 2: Select a device').exists).ok();
    await t.expect(await util.select('p').withText('Information about step 2 of creating an application—selecting a device to start.').exists).ok();
    await t.expect(await util.select('h3').withText('Step 3: Map').exists).ok();
    await t.expect(await util.select('p').withText('Information about step 3 of creating an application—use map to select the devices that will be included in creating Application Components for this Application').exists).ok();
    await t.expect(await util.select('h3').withText('Step 4: Organize & Confirm Application Components').exists).ok();
    await t.expect(await util.select('p').withText('Information about step 4 of creating an application & how to drag & drop devices into Application Components.').exists).ok();
    await t.expect(await util.select(closeButtonLocator).exists).ok();
}

//create new application
export async function createNewApplication(name, owner, description, query1, query2, query3) {  
    await t.expect(await util.select('div').withText('Create Application').exists).ok();
    let randomNum = `${util.getRandomInt(1,1000)}`;
    await addApplicationName(`${name}${randomNum}`); //add application name
    await addApplicationDescription(description); //add application description
    await selectApplicationOwner(owner); //select application owner
    await clickNextButton();   //click next button
    await validateAddNodePage(); //validate step 2 add node page
    let deviceQuery = await util.getComponentSearchQuery(query1);
    await searchQuery(deviceQuery); //search query
    await clickNextButton(); //click next button to go to step 3
    await validateIncludeDevicePage(); //validate step 3 add device page
    await includeDevice(deviceQuery); //include the device
    await clickNextButton(); //click next button
    await validateAddApplicationComponent(); //validate application component page
    await createApplicationComponent(`Static AutoComponent${randomNum}`, query1) //create static application component
    await createApplicationComponent(`Dynamic AutoComponent${randomNum}`, query2) //create dynamic application component
    await addDevice(query3); //add third device via select device
    await selectDevice(query3);
    await clickSaveButton(); //click save button
}

//validate step 2 - addnode page
export async function validateAddNodePage() {  
// exports.validateAddNodePage = async () => {
    await t.expect(await util.select('div').withText('Create Application').exists).ok();
    await t.expect(await util.select('h2').withText('What nodes would you like to start with?').exists).ok();
    await t.expect(await util.select(searchTextBoxLocator).exists).ok();
    await t.expect(await util.select('div').withText('Preview Results').exists).ok();
    await t.expect(await util.select('div').withText('Node Type Counts').exists).ok();
    await t.expect(await util.select(closeButtonLocator).exists).ok();
    await t.expect(await util.select('button').withText('Next').exists).ok();
    expect(await util.select(previewTypeLocator).innerText).eqls('TYPE');
    await t.expect(await util.select('div').withText('NAME').exists).ok();
    await t.expect(await util.select(nodesImgLocator).exists).ok();
    expect(await util.select(nodeCountTypeLocator).innerText).eqls('TYPE');
    await t.expect(await util.select('div').withText('ITEMS FOUND').exists).ok();
}


//add service name
export async function addApplicationName(name) {  
    await t.click(await util.select(applicationNameTextboxLocator));
    await t.typeText(await util.select(applicationNameTextboxLocator), name);
}

//add service description
export async function addApplicationDescription(description) {
    await t.click(await util.select(applicationDescriptionLocator));
    await t.typeText(await util.select(applicationDescriptionLocator), description);
}

//add service owner
export async function selectApplicationOwner(owner) {
    await t.click(await util.select(ownerDropdownLocator));
    await util.select(systemOptionsLocator).with({ visibilityCheck: true })();
    await t.click(await util.select('li').withText(`${owner}`));
}

//click next button
export async function clickNextButton() {
    await t.click(await util.select(nextButton));
    await t.wait(2000);
}

//enter query for device
export async function searchQuery(query) {
    await t.expect(await util.select(searchTextBoxLocator).exists).ok();
    const searchTextbox = await util.select(searchTextBoxLocator);
    await t.typeText(searchTextbox, query)
    //await util.select(searchTextBoxOptionLocator).with({ visibilityCheck: true })();
    const itemFoundTypeText = await util.select(itemsFoundTypeLocator).innerText;
    expect(itemFoundTypeText.toString().trim()).eqls('Device');
    const itemFoundItemsCountText = await util.select(itemsFoundCountLocator).innerText;
    expect(parseInt(itemFoundItemsCountText)).above(0);
}

//validate step 3 - include device page
export async function validateIncludeDevicePage() {
    await t.expect(await util.select('div').withText('Create Application').exists).ok(); 
    await t.expect(await util.select('div').withText('Included in Application:').exists).ok(); 
    //await t.expect(await util.select('span').withText('Include Selected in Application').exists).ok();
    await t.expect(await util.select(includeSelectedApplicationButton).exists).ok();
    await t.expect(await util.select('p').withText('Select devices from map to add to application').exists).ok(); 
    await t.expect(await util.select('h3').withText('No devices have been added to this application').exists).ok();
    await t.expect(await util.select(deviceCanvasLocator).exists).ok();
}

//include device service
export async function includeDevice(query) {
    await t.expect(await util.select(deviceCanvasLocator).exists).ok();
    await t.click(await util.select(deviceCanvasLocator));
    //const includeSelectedApplicationButton = await util.select('span').withText('Include Selected in Application');
    await t.click(await util.select(includeSelectedApplicationButton));
    await t.expect(await util.select('p').withText('Select devices from map to add to application').exists).notOk('Should not be present after adding device');
    await t.expect(await util.select('h3').withText('No devices have been added to this application').exists).notOk('Should not be present after adding device');
}

//validate step 4 - add application component
export async function validateAddApplicationComponent() {
    await t.expect(await util.select('button').withText('Save').exists).ok();
    await t.expect(await util.select('span').withText('Add Application Component').exists).ok();
    //span - Add Device
    //h3 = Create an Application Component and drag Devices from the list above
    //ip address = //*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/section/div[2]/table/tbody/tr[1]/td[6]
    //checkbox =   //*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/section/div[2]/table/tbody/tr[1]/td[1]/div/input
}

//Add component device
export async function createApplicationComponent(name, query) {
    await clickAddComponentButton();
    await addComponentDetails(name);
    let type = query.substring(0, query.indexOf('.'));
    if(await util.equalsIgnoreCase(type, "Dynamic")){
        await t.click(await util.select(dynamicToggleButtonLocator));
        await t.expect(await util.select('span').withText('Next').exists).ok();
        await t.click(await util.select('span').withText('Next'));
        //componentDeviceQueryTextboxLocator
        await t.expect(await util.select(componentDeviceQueryTextboxLocator).exists).ok();
        await validateAddDynamicComponentModal();
        let componentSearchQuery = await util.getComponentSearchQuery(query);
        await t.typeText(componentDeviceQueryTextboxLocator, componentSearchQuery);
        await t.wait(2000);
        await t.expect(await util.select('div').withText('Loading').exists).notOk();
        const componentNameLength = await util.select('div.table-row').count;
        logger.info("No of elements is: ", componentNameLength);
        expect(parseInt(componentNameLength)).above(0);
        await t.expect(await util.select(addDynamicComponentSaveButtonLocator).withText('Save').exists).ok();
        await t.click(await util.select(addDynamicComponentSaveButtonLocator).withText('Save'));
        await t.wait(2000);
        await t.expect(await util.select('span').withText('Add Device').exists).ok();
    } else {
        await t.expect(await util.select(saveComponentButtonLocator).exists).ok();
        await t.click(await util.select(saveComponentButtonLocator));
        await t.expect(await util.select(appComponentImageLocator).exists).ok();
        await t.expect(await util.select('span').withText(name).exists).ok();
        //need to drag and drop to do
        await addDeviceToComponent(deviceItemOneLocator, applicationComponentOneLocator);
        //await t.dragToElement(deviceItemOneLocator, applicationComponentOneLocator)
        await t.expect(await util.select(deviceItemLocator).exists).ok();
        await t.expect(await util.select(staticItemIconLocator).exists).ok();
    }
}

//click on add component button
export async function clickAddComponentButton() {
    const addApplicationComponentButton = await util.select('span').withText('Add Application Component');
    await t.expect(await util.select(addApplicationComponentButton).exists).ok();
    await t.click(await util.select(addApplicationComponentButton));
    await t.wait(2000);
    await t.expect(await util.select(applicationComponentNameTextBoxLocator).exists).ok();
}

//Add device
export async function addDevice(query) {
    const addDeviceButton = await util.select('span').withText('Add Device');
    await t.expect(await util.select(addDeviceButton).exists).ok();
    await t.click(await util.select(addDeviceButton));
    await t.wait(2000);
    await t.expect(await util.select('span').withText('Add').exists).ok();
    await validateAddDeviceModal();
    let componentSearchQuery = await util.getComponentSearchQuery(query);
    console.log("Search Query is: ", componentSearchQuery);
    await t.click(await util.select(addDeviceSearchTextBoxLocator))
    await t.typeText(await util.select(addDeviceSearchTextBoxLocator), componentSearchQuery);
    await t.wait(2000);
    const componentNameLength = await util.select('div.table-row').count;
    logger.info("No of elements is: ", componentNameLength);
    expect(parseInt(componentNameLength)).above(0);
    await t.expect(await util.select(addDeviceSearchOptionLocator).exists).ok();
    await t.click(await util.select(addDeviceSearchOptionLocator));
    await t.expect(await util.select(addDeviceCheckboxLocator).exists).ok();
    await t.click(await util.select(addDeviceCheckboxLocator));
    await t.expect(await util.select(addDeviceAddButtonLocator).withText('Add').exists).ok();
    await t.click(await util.select(addDeviceAddButtonLocator).withText('Add'));
    await t.wait(2000);
    await t.expect(await util.select('span').withText('Add Application Component').exists).ok();
}

//click next button
export async function clickSaveButton() {
    await t.click(await util.select(saveButtonLocator));
    await t.wait(4000);
    const createApplicationButton = await util.select('span').withText('Create Application');
    await t.expect(await util.select(createApplicationButton).exists).ok();
}

//Add component name description and other details
export async function addComponentDetails(name) {
    const applicationComponentName = await util.select(applicationComponentNameTextBoxLocator);
    await t.typeText(applicationComponentName, name);
    const applicationComponentDescription = await util.select(applicationComponentDescriptionTextBoxLocator);
    await t.typeText(applicationComponentDescription, name);
}

//Validate Dynamic Component Modal
export async function validateAddDynamicComponentModal(){
    await t.expect(await util.select(componentDeviceQueryTextboxLocator).exists).ok();
    await t.expect(await util.select('div').withText('Create Application Component').exists).ok();
    await t.expect(await util.select('div').withText('Query for the right set of devices').exists).ok();
    await t.expect(await util.select(addDynamicComponentModalHamburgerIconLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentSettingsIconLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentNameColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentStateColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentIpAddressColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentCategoryColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentClassColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentSubClassColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentOrganizationColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentIDColumnLocator).exists).ok();
    await t.expect(await util.select(addDynamicComponentSaveButtonLocator).withText('Save').exists).ok();
}

//Validate Add Device Modal
export async function validateAddDeviceModal(){
    await t.expect(await util.select(addDeviceTextboxLocator).exists).ok();
    await t.expect(await util.select('div').withText('Add Devices').exists).ok();
    await t.expect(await util.select('div').withText('Query for the right set of devices').exists).ok();
    await validateColumnHeaders();
}


//validate column headers
export async function validateColumnHeaders() {
    const nameColumnHeaderText = await util.select(addDeviceNameColumnLocator).innerText;
    const stateHeaderText = await util.select(addDeviceStateColumnLocator).innerText;
    const ipAddressHeaderText = await util.select(addDeviceIpAddressColumnLocator).innerText;
    const categoryHeaderText = await util.select(addDeviceCategoryColumnLocator).innerText;
    const classHeaderText = await util.select(addDeviceClassColumnLocator).innerText;
    const subClassHeaderText = await util.select(addDeviceSubClassColumnLocator).innerText;
    const organizationHeaderText = await util.select(addDeviceOrganizationLocator).innerText;
    const deviceIdHeaderText = await util.select(addDeviceIdLocator).innerText;

    expect(nameColumnHeaderText).eqls('NAME');
    expect(stateHeaderText).eqls('STATE');
    expect(ipAddressHeaderText).eqls('IP ADDRESS');
    expect(categoryHeaderText).eqls('CATEGORY');
    expect(classHeaderText).eqls('CLASS');
    expect(subClassHeaderText).eqls('SUB-CLASS');
    expect(organizationHeaderText).eqls('ORGANIZATION');
    expect(deviceIdHeaderText).eqls('DEVICE ID');
}

//select device
export async function selectDevice(query) {
    //for loop around the table to check the service type on newly created service
    let ipAddress = await util.getIpAddress(query);
    const length = await util.getRowLength();
    logger.info("No of elements is: ", length);
    for (let i = 1; i <= length + 1; i++) {
        if (i > length) {
            logger.error("Cannot find the device ip element");
            throw new Error("Cannot find device ip element");
        }
        let deviceIpXpathLocator = `//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/section/div[2]/table/tbody/tr[${i}]/td[6]`;
        let deviceIpLocator = xpath2css(deviceIpXpathLocator);
        const deviceIpText = await util.select(deviceIpLocator).innerText;
        if (await util.equalsIgnoreCase(deviceIpText, ipAddress)) {
            logger.info("Ip Address found", deviceIpText);
            //select checkbox
            let selectedDeviceCheckboxXpathLocator = `//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/section/div[2]/table/tbody/tr[${i}]/td[1]/div`
            let selectedDeviceCheckboxLocator = xpath2css(selectedDeviceCheckboxXpathLocator)
            await t.click(await util.select(selectedDeviceCheckboxLocator));
            await addDeviceToComponent(selectedDeviceCheckboxLocator, addSectionTwoLocator);
            break;
        }
    }
}
//add device to component
export async function addDeviceToComponent(device, component){
    await t.dragToElement(device, component);
}