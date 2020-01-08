'use strict';
var expect  = require('chai').expect;
const util = require('../support/helper.js');
var log4js = require('log4js');
var logger = log4js.getLogger('app.log');
var xpath2css = require('xpath2css');
const { t } = require('testcafe')
require('custom-env').env(process.env.NODE_ENV, 'config')
require('events').EventEmitter.defaultMaxListeners = Infinity;

//Locator properties
const userNameTextBoxXpathLocator = 'input#inputUsername'
const userNameTextBoxLocator = xpath2css(userNameTextBoxXpathLocator);
const passwordTextBoxLocator = 'input#inputPassword';
const logoBtn = '#logo';

//get the url
export async function goTo(baseUrl) {
    // await t.navigateTo(url);
    await t.navigateTo(`${baseUrl}/ap2`);
    await t.wait(3000);
    await util.select(userNameTextBoxLocator).with({ visibilityCheck: true })();
    await util.select('span').withText('Log In').with({ visibilityCheck: true })();
};

//go to base url
export async function goToUrl() {    
    let baseRoute = `${process.env.VM_IP_ADDRESS}/ap2`
    console.log('Base Url is: ', baseRoute)
    await t.navigateTo(baseRoute);
    await util.select(userNameTextBoxLocator).with({ visibilityCheck: true })();
    await util.select('span').withText('Log In').with({ visibilityCheck: true })();
}

//validate login page
export async function validateLoginPage() {        
    //wait until username textbox is visible
    await util.select(userNameTextBoxLocator).with({ visibilityCheck: true })();
    const userNameTxtBox = await util.select(userNameTextBoxLocator);
    expect(await userNameTxtBox.exists).eqls(true);
    await t
        .expect(await util.select(logoBtn).exists).ok()
        .expect(await util.select(userNameTextBoxLocator).exists).ok()
        .expect(await util.select(passwordTextBoxLocator).exists).ok();
    await t.expect(await util.select('span').withText('Log In').exists).ok();
}

//login with username, password
export async function login(username, password) {      
    //wait until username textbox is visible
    await util.select(userNameTextBoxLocator).with({ visibilityCheck: true })();
    await util.select('span').withText('Log In').with({ visibilityCheck: true })();
    //get username
    const userNameTxtBox = await util.select(userNameTextBoxLocator);
    //password textbox
    const pwdTxtBox = await util.select(passwordTextBoxLocator);
    const logInButton = await util.select('span').withText('Log In');
    //type username
    await t.typeText(userNameTxtBox, username); //type username
    await t.typeText(pwdTxtBox, password)   //type password
    await t.click(logInButton)         //click login button
    await t.wait(3000);
    await t.expect(await util.select('span').withText('Create')).ok();    //expect dashboard button to be visible
}

//login with username, password
export async function loginWithEnv() {      
    //wait until username textbox is visible
    await util.select(userNameTextBoxLocator).with({ visibilityCheck: true })();
    //get username
    const userNameTxtBox = await util.select(userNameTextBoxLocator);
    //password textbox
    const pwdTxtBox = await util.select(passwordTextBoxLocator);
    const logInButton = await util.select('span').withText('Log In');
    //type username
    await t.typeText(userNameTxtBox, process.env.USER_NAME); //type username
    await t.typeText(pwdTxtBox, process.env.PASSWORD)   //type password
    await t.click(logInButton)         //click login button
    await t.wait(3000);
    await t.expect(await util.select('span').withText('Create')).ok();    //expect dashboard button to be visible
}