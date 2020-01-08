import { Selector as NativeSelector } from 'testcafe';
const { ClientFunction } = require('testcafe');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var expect = require('chai').expect;
import { t } from 'testcafe';

//Common locators
const nameColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.sortable.cl-name.sc-fBuWsC.eeihxG > div.cell-content > div';
const descriptionColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.sortable.cl-description.sc-fBuWsC.eeihxG > div.cell-content > div';
const typeColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.sortable.cl-type.sc-fBuWsC.eeihxG > div.cell-content > div';
const organizationColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.sortable.cl-organization.sc-fBuWsC.eeihxG > div.cell-content > div';
const availabilityColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.sortable.cl-availability.sc-fBuWsC.eeihxG > div.cell-content > div';
const healthColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.sortable.cl-health.sc-fBuWsC.eeihxG > div.cell-content > div';
const riskColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.sortable.cl-risk.sc-fBuWsC.eeihxG > div.cell-content > div';
const policyColumnHeaderLocator = '#tableView > div.header-wrapper > div > div.cell.cl-policy.sc-fBuWsC.eeihxG > div.cell-content > div';

const select = (selector, t) => {
    return NativeSelector(selector).with({ boundTestRun: t });
  };

//string comparision
async function equalsIgnoreCase(strA, strB) {
    return (strA != null && strB != null
            && strA.toUpperCase() === strB.toUpperCase());
}
//get the browser name
async function getBrowserName() {
    const getUA = ClientFunction(() => navigator.userAgent);
    const ua = await getUA();
    const browserAlias =uaParser(ua).browser.name;
    logger.info("Browser is: ", browserAlias)
    return browserAlias;
}

//Random number generator
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function getRowLength ()  {
    return await select('div.table-row').count;
}

//validate column headers
async function validateColumnHeaders() {
    const nameColumnHeader = await select(nameColumnHeaderLocator).innerText;
    const descriptionHeaderText = await select(descriptionColumnHeaderLocator).innerText;
    const typeHeaderText = await select(typeColumnHeaderLocator).innerText;
    const organizationHeaderText = await select(organizationColumnHeaderLocator).innerText;
    const availabilityColumnHeader = await select(availabilityColumnHeaderLocator).innerText;
    const healthHeaderText = await select(healthColumnHeaderLocator).innerText;
    const riskHeaderText = await select(riskColumnHeaderLocator).innerText;
    const policyHeaderText = await select(policyColumnHeaderLocator).innerText;

    expect(nameColumnHeader).eqls('NAME');
    expect(descriptionHeaderText).eqls('DESCRIPTION');
    expect(typeHeaderText).eqls('TYPE');
    expect(organizationHeaderText).eqls('ORGANIZATION');
    expect(availabilityColumnHeader).eqls('AVAILABILITY');
    expect(healthHeaderText).eqls('HEALTH');
    expect(riskHeaderText).eqls('RISK');
    expect(policyHeaderText).eqls('POLICY');
}

//get ip address
async function getIpAddress(query){
    let searchQuery = await getComponentSearchQuery(query);
    return searchQuery.substring(searchQuery.indexOf(':')+1, searchQuery.length).trim();
}

//get search query for dynamic ip address
async function getComponentSearchQuery(query){
    return query.substring(query.indexOf('.')+1, query.length).trim();
}


module.exports = {
    equalsIgnoreCase,
    select,
    getBrowserName,
    getRandomInt,
    getRowLength,
    validateColumnHeaders,
    getIpAddress,
    getComponentSearchQuery
}