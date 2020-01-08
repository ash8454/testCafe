var expect  = require('chai').expect;
const util = require('../support/helper');
const deviceServicesPage = require('./deviceServicesPage');
const itServicePage = require('./itServicePage');
const businessServicePage = require('./businessServicePage');
var xpath2css = require('xpath2css');
const { t } = require('testcafe')
require('events').EventEmitter.defaultMaxListeners = Infinity;

//ELEMENT LOCATORS
//Device Service
const deviceServiceLabelImgLocator = 'label[for="DEVICE_SERVICE"] img'
const deviceServiceLabelText = 'label[for="DEVICE_SERVICE"] h3'
const deviceServiceLabelSubText = 'label[for="DEVICE_SERVICE"] h6'

//IT Service
const ITServiceLabelImgLocator = 'label[for="IT_SERVICE"] img'
const ITServiceLabelText = 'label[for="IT_SERVICE"] h3'
const ITServiceLabelSubText = 'label[for="IT_SERVICE"] h6'

//Business Service
const businessServiceLabelImgLocator = 'label[for="BUSINESS_SERVICE"] img'
const businessServiceLabelText = 'label[for="BUSINESS_SERVICE"] h3'
const businessServiceLabelSubText = 'label[for="BUSINESS_SERVICE"] h6'

//Service Creation Elements
const serviceNameXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div/div[1]/input'
const serviceNameLocator = xpath2css(serviceNameXpathLocator)
const serviceDropdownIconXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[1]/div[2]'
const serviceDropdownIconLocator = xpath2css(serviceDropdownIconXpathLocator)
const systemServiceOwnerOptionXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[2]/ul/div/div/li[1]';
const systemServiceOwnerOptionLocator = xpath2css(systemServiceOwnerOptionXpathLocator)
const backendServiceOwnerOptionXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[2]/ul/div/div/li[2]';
const backendServiceOwnerOptionLocator = xpath2css(backendServiceOwnerOptionXpathLocator)
const siloOwnerOptionXpathLocator = '//*[@id="inventory-content"]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[2]/ul/div/div/li[3]';
const siloOwnerOptionLocator = xpath2css(siloOwnerOptionXpathLocator)
const serviceDescriptionTextboxLocator = 'textarea'
const nextButton = 'button#next-button'

//navigate to new services page
export async function navigateToNewServicesPage() {
    await util.select(deviceServiceLabelImgLocator).with({ visibilityCheck: true })();
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();    //expect create service button to be visible
    await t.click(createServiceButton);
    await t.wait(2000);
    await t.expect(await util.select(ITServiceLabelImgLocator)).ok();
}

//validate new services page
export async function validateNewServicesPage() {
    await util.select(deviceServiceLabelImgLocator).with({ visibilityCheck: true })();
    await t.expect(deviceServiceLabelImgLocator).ok(); 
    await t.expect(await util.select(ITServiceLabelImgLocator)).ok();
    await t.expect(await util.select(businessServiceLabelImgLocator)).ok();
    expect(await util.select(deviceServiceLabelText).innerText).eqls('Device Service');
    expect(await util.select(deviceServiceLabelSubText).innerText).eqls('Aggregate status of similar devices');
    expect(await util.select(ITServiceLabelText).innerText).eqls('IT Service');
    expect(await util.select(ITServiceLabelSubText).innerText).eqls('Show how IT delivers value to the business');
    expect(await util.select(businessServiceLabelText).innerText).eqls('Business Service');
    expect(await util.select(businessServiceLabelSubText).innerText).eqls('See how your company provides business value to your customers');
}

//create service
export async function createService(type, name, serviceOwner, serviceDescription, query) {
    expect(await util.select(deviceServiceLabelText).innerText).eqls('Device Service');
    await selectServiceType(type);
    await addServiceName(name, type);
    await selectServiceOwner(serviceOwner);
    await addServiceDescription(serviceDescription);
    await clickNextButton();
    if (await util.equalsIgnoreCase(type, "Device Service")){
        await deviceServicesPage.addDeviceForDeviceServices(query);
    }
    if (await util.equalsIgnoreCase(type, "IT Service")){
        await itServicePage.addITService(query);
    }
    if (await util.equalsIgnoreCase(type, "Business Service")){
        await businessServicePage.addBusinessService(query);
    }
    await t.wait(2000);
    await clickSaveButton();
    await clickBackButton();
}

//select service type
export async function selectServiceType(type) {
    if (await util.equalsIgnoreCase(type.toString(), 'Business Service')) {
        await t.click(await util.select(businessServiceLabelImgLocator));
    }
    else if (await util.equalsIgnoreCase(type.toString(), 'IT Service')) {
        await t.click(await util.select(ITServiceLabelImgLocator));
    }
    else {
        await t.click(await util.select(deviceServiceLabelImgLocator));
    }
}

//add service name
export async function addServiceName(name,type) {
    await t.click(await util.select(serviceNameLocator));
    let randomName = name + ` ${type}${util.getRandomInt(1,1000)}`;
    await t.typeText(await util.select(serviceNameLocator), randomName);
}

//add service description
export async function addServiceDescription(serviceDescription) {
    await t.click(await util.select(serviceDescriptionTextboxLocator));
    await t.typeText(await util.select(serviceDescriptionTextboxLocator), serviceDescription);
}

//add service owner
export async function selectServiceOwner(serviceOwner) {
    await t.click(await util.select(serviceDropdownIconLocator));
    await t.wait(1000);
    //await util.select(systemServiceOwnerOptionLocator).with({ visibilityCheck: true })();
    if (await util.equalsIgnoreCase(serviceOwner, 'System')) {
        await t.click(await util.select(systemServiceOwnerOptionLocator));
    }
    else if (await util.equalsIgnoreCase(serviceOwner, 'backend')) {
        await t.click(await util.select(backendServiceOwnerOptionLocator));
    }
    else {
        await t.click(await util.select(siloOwnerOptionLocator));
    }
}

//click next button
export async function clickNextButton() {
// exports.clickNextButton = async () => {
    await t.click(await util.select(nextButton));
    await t.wait(2000);
}

//click save button
export async function clickSaveButton() {
    const saveDeviceServiceBtn = await util.select('span').withText('Save');
    await t.expect(saveDeviceServiceBtn.exists).ok();    //expect save button to be visible
    await t.click(saveDeviceServiceBtn);    
    await t.wait(2000);
}

//click back button
export async function clickBackButton() {
// exports.clickBackButton = async () => {
    const goBackToBusinessServicesPageBtn = await util.select('span').withText('Back');
    await t.expect(goBackToBusinessServicesPageBtn.exists).ok();    //expect back button to be visible
    await t.click(goBackToBusinessServicesPageBtn);    
    await t.wait(2000);
    const createServiceButton = await util.select('span').withText('Create Service');
    await t.expect(createServiceButton.exists).ok();    //expect create service button to be visible
}