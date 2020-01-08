// const { Selector } = require('testcafe');
// import { t } from 'testcafe';
const { Selector, t } = require('testcafe')
var xpath2css = require('xpath2css');
const util = require('../support/helper.js');
require('events').EventEmitter.defaultMaxListeners = Infinity;

//Selectors
const scienceLogicLogoLocator = 'svg[title="ScienceLogic Logo"]';
const hamburgerIconXPathLocator = '//button[@aria-label="Open drawer"]';
const hamburgerIconLocator = xpath2css(hamburgerIconXPathLocator);
const pageHeaderLocator = 'h6';
const settingsIconXpathLocator = "//div[@id='inventory-content']/div/div/div/div[1]/div/div[@class='search-bar']/div/div[1]/div[2]/div/a[2]/div/div[1]/i"
const settingsIconLocator = xpath2css(settingsIconXpathLocator)
const searchTextHamburgerXPathLocator = '//*[@id="inventory-content"]/div/div/div/div[1]/div/div[1]/div/div[1]/div[2]/div/a[1]/div/div[1]/i';
const searchTextHamburgerIconLocator = xpath2css(searchTextHamburgerXPathLocator)
const searchIconLocator = 'svg[title="search"]'
const dashboardLeftNavIconLocator = 'div[title="Dashboards"] > svg'
const eventsLeftNavIconLocator = 'div[title="Events"] > svg'
const devicesLeftNavIconLocator = 'div[title="Devices"] > svg'
const businessServicesLeftNavIconLocator = 'div[title="Business Services"] > svg'

//validate base common page elements
export async function validateCommonPageElements(title) {
    const scienceLogicLogo = await util.select(scienceLogicLogoLocator);
    const pageHeader = await util.select(pageHeaderLocator).withText(title);
    const hamburgerIcon = await util.select(hamburgerIconLocator);
    const searchOptionsIcon = await util.select(searchTextHamburgerIconLocator);
    const searchIcon = await util.select(searchIconLocator);
    const dashboardLeftNavIcon = await util.select(dashboardLeftNavIconLocator);
    const eventsLeftNavIcon = await util.select(eventsLeftNavIconLocator);
    const devicesLeftNavIcon = await util.select(devicesLeftNavIconLocator);
    const businessServicesLeftNavIcon = await util.select(businessServicesLeftNavIconLocator);
    const settingsIcon = await util.select(settingsIconXpathLocator);
    const userAdminLabel = await util.select('span').withExactText('em7admin');

    await t.expect(scienceLogicLogo).ok();
    if (title.toString() != ""){
        await t.expect(pageHeader).ok();
    }
    await t.expect(hamburgerIcon).ok();
    await t.expect(settingsIcon).ok();
    await t.expect(searchOptionsIcon).ok();
    await t.expect(searchIcon).ok();
    await t.expect(dashboardLeftNavIcon).ok();
    await t.expect(eventsLeftNavIcon).ok();
    await t.expect(devicesLeftNavIcon).ok();
    await t.expect(businessServicesLeftNavIcon).ok();
    await t.expect(userAdminLabel).ok(); 
       
}